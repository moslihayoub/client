
import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { AppState, LogMessage } from '../types';
import { createPcmBlob, decodeAudioData, base64ToArrayBuffer, calculateRMS } from '../utils/audioUtils';

const MODEL_NAME = 'gemini-2.5-flash-native-audio-preview-09-2025';
const SYSTEM_INSTRUCTION = `
Tu t'appelles Nexa, l'assistant vocal intelligent de NexaStay. 
Ton expertise porte exclusivement sur la réservation de logements, la gestion de propriétés et le voyage.

COMPÉTENCES LINGUISTIQUES CRITIQUES :
- Tu es parfaitement polyglotte : Français, Anglais, Arabe Standard et surtout le **DARIJA (Arabe Marocain)**.
- RÈGLE D'OR : Réponds TOUJOURS dans la langue exacte utilisée par l'utilisateur. S'il te parle en Darija, réponds en Darija. S'il mélange le français et le darija, fais de même.

TON ET PERSONNALITÉ :
- Tu es chaleureux, efficace et très concis (réponses courtes pour la voix).
- Tu es un expert en hospitalité.

MISSIONS :
1. Aider à la réservation de logements (hôtels, appartements, riads).
2. Expliquer les détails d'un logement ou d'un contrat de location.
3. Gérer les demandes liées aux services (check-in, ménage, wifi).
4. Fournir des recommandations locales.

INTERDICTION :
- Ne jamais mentionner de code, de JSON ou de termes techniques.
- Ne jamais changer de langue de toi-même si l'utilisateur ne l'a pas fait.
`;

declare global {
  // Fix: Property 'aistudio' must be of type 'AIStudio'. 
  // We use 'any' here to resolve the conflict with the global type definition 
  // while still allowing access to its methods.
  interface Window {
    aistudio?: any;
  }
}

export const useGeminiLive = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [volume, setVolume] = useState(0);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const isAiSpeakingRef = useRef(false);
  const [logs, setLogs] = useState<LogMessage[]>([]);
  
  useEffect(() => {
    isAiSpeakingRef.current = isAiSpeaking;
  }, [isAiSpeaking]);

  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const inputSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  
  const sessionRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const scheduledSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const currentStreamRef = useRef<MediaStream | null>(null);
  const aiSpeakingTimerRef = useRef<number | null>(null);

  const addLog = (role: 'user' | 'system' | 'model', text: string) => {
    setLogs(prev => [...prev, { role, text, timestamp: new Date() }]);
  };

  const disconnect = useCallback(() => {
    if (currentStreamRef.current) {
      currentStreamRef.current.getTracks().forEach(track => track.stop());
      currentStreamRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (inputSourceRef.current) {
      inputSourceRef.current.disconnect();
      inputSourceRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    scheduledSourcesRef.current.forEach(source => { try { source.stop(); } catch(e) {} });
    scheduledSourcesRef.current.clear();

    setState(AppState.IDLE);
    setVolume(0);
    setIsAiSpeaking(false);
  }, []);

  const connect = useCallback(async () => {
    try {
      setState(AppState.CONNECTING);

      // Handle API Key selection if helper is available (for certain environments/models)
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          await window.aistudio.openSelectKey();
          // After calling openSelectKey, we proceed immediately assuming success as per rules
        }
      }
      
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      outputNodeRef.current = outputAudioContextRef.current.createGain();
      outputNodeRef.current.connect(outputAudioContextRef.current.destination);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: {
        sampleRate: 16000,
        channelCount: 1,
        echoCancellation: true,
        autoGainControl: true,
        noiseSuppression: true
      }});
      currentStreamRef.current = stream;

      // Always create a new instance with latest key
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY || process.env.API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not configured. Please set REACT_APP_GEMINI_API_KEY in your .env file.');
      }
      const ai = new GoogleGenAI({ apiKey });

      sessionRef.current = ai.live.connect({
        model: MODEL_NAME,
        callbacks: {
          onopen: () => {
            setState(AppState.ACTIVE);
            addLog('system', 'Nexa est prête à vous aider.');
            
            if (!inputAudioContextRef.current || !currentStreamRef.current) return;
            const source = inputAudioContextRef.current.createMediaStreamSource(currentStreamRef.current);
            inputSourceRef.current = source;
            const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            processorRef.current = scriptProcessor;

            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              if (!isAiSpeakingRef.current) {
                const rms = calculateRMS(inputData);
                setVolume(v => Math.max(rms * 5, v * 0.85)); 
              }
              const pcmBlob = createPcmBlob(inputData);
              
              sessionRef.current?.then(session => {
                session.sendRealtimeInput({ media: pcmBlob });
              }).catch(err => {
                console.error("Error sending realtime input:", err);
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (
              base64Audio &&
              outputAudioContextRef.current &&
              outputNodeRef.current
            ) {
              setIsAiSpeaking(true);
              setVolume(0.6);
              if (aiSpeakingTimerRef.current) window.clearTimeout(aiSpeakingTimerRef.current);
              
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const audioBytes = new Uint8Array(base64ToArrayBuffer(base64Audio));
              const audioBuffer = await decodeAudioData(audioBytes, ctx);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNodeRef.current);
              source.start(nextStartTimeRef.current);
              scheduledSourcesRef.current.add(source);
              
              const duration = audioBuffer.duration * 1000;
              aiSpeakingTimerRef.current = window.setTimeout(() => {
                 setIsAiSpeaking(false);
              }, duration + 100);

              source.addEventListener('ended', () => {
                scheduledSourcesRef.current.delete(source);
              });
              nextStartTimeRef.current += audioBuffer.duration;
            }

            const interrupt = message.serverContent?.interrupted;
            if (interrupt) {
                scheduledSourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
                scheduledSourcesRef.current.clear();
                nextStartTimeRef.current = 0;
                setIsAiSpeaking(false);
            }
          },
          onclose: (e) => {
            console.debug('Session closed:', e);
            setState(AppState.IDLE);
            setIsAiSpeaking(false);
          },
          onerror: (e) => {
            console.error("Gemini Live connection error:", e);
            setState(AppState.ERROR);
            
            // Check for specific "entity not found" error to reset key selection
            const errorMsg = (e as any).message || '';
            if (errorMsg.includes("Requested entity was not found") && window.aistudio) {
               window.aistudio.openSelectKey();
            }
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION,
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          }
        }
      });
    } catch (error) {
      console.error("Failed to initiate connection:", error);
      setState(AppState.ERROR);
    }
  }, []);

  return { state, volume, isAiSpeaking, logs, connect, disconnect };
};
