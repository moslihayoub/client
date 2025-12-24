import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from '@google/genai';
import { AppState, LogMessage } from '../types';
import { createPcmBlob, decodeAudioData, base64ToArrayBuffer, calculateRMS } from '../utils/audioUtils';

// Note: Ensure your API KEY is available in your env variables.
// The original code used process.env.API_KEY or aistudio helper.
const MODEL_NAME = 'gemini-2.0-flash-exp';

const SYSTEM_INSTRUCTION = `
Tu es Nexa, l'assistante vocale intelligente de NexaStay.
TON IDENTITÉ : Une marocaine native ("Bent l'blad"), experte en immobilier et hospitalité.

RÈGLES DE LANGUE (COUCHE DARIJABERT) :
1. DARIJA PUR & POPULAIRE : Tu parles le Darija de Casablanca/Rabat, fluide et naturel. ÉVITE absolument l'arabe classique (Fusha).
2. GRAMMAIRE LOCALE : Utilise "ghadi" pour le futur, "tannedir" pour le présent continu, et la négation en "ma...ch" (ex: "ma-fhamtch" au lieu de "lam afham").
3. EXPRESSIONS TYPES : Utilise "Wakha", "Safi", "Hanya", "Daba", "Chouf", "Marhba bik alf marhba", "Koulchi i koun nadi", "Rezervit lik chi blassa wa3ra".
4. TON "PRO-PROCHE" : Tu es professionnelle (immobilier) mais avec une chaleur humaine marocaine. Ne sois pas rigide. Si l'utilisateur est stressé, dis lui "Hanya, koulchi i koun mzyan".
5. CODE-SWITCHING : Mélange naturellement le français uniquement pour les termes de voyage/tech (ex: "Check-in", "Réservation", "Wifi", "Appartement").
6. CONCISION : Réponds par des phrases courtes et percutantes. C'est de la voix, pas du texte.

MISSIONS :
- Réservation de riads, villas et appartements.
- Support client pour les séjours NexaStay.
- Recommandations locales (bouffe, sorties, transport).
`;

const DARIJA_CONTEXT_TOOL: FunctionDeclaration = {
    name: 'get_darija_context',
    description: 'Récupère des informations spécifiques sur les logements ou le contexte marocain.',
    parameters: {
        type: Type.OBJECT,
        properties: {
            question: { type: Type.STRING, description: 'La question en Darija.' }
        },
        required: ['question']
    }
};

export const useGeminiLive = () => {
    const [state, setState] = useState<AppState>(AppState.IDLE);
    const [volume, setVolume] = useState(0);
    const [isAiSpeaking, setIsAiSpeaking] = useState(false);
    const isAiSpeakingRef = useRef(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
        scheduledSourcesRef.current.forEach(source => { try { source.stop(); } catch (e) { } });
        scheduledSourcesRef.current.clear();

        setState(AppState.IDLE);
        setVolume(0);
        setIsAiSpeaking(false);
        connectingRef.current = false;
    }, []);

    const connectingRef = useRef(false);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            disconnect();
        };
    }, [disconnect]);



    const connect = useCallback(async () => {
        if (connectingRef.current || state === AppState.CONNECTING || state === AppState.ACTIVE) {
            console.warn("[NexaVoice] Already connecting or active. Ignoring request.");
            return;
        }

        connectingRef.current = true;
        // console.log("[NexaVoice] Starting connection process...");
        try {
            setState(AppState.CONNECTING);
            setErrorMessage(null);

            // IMPORTANT: Replace this with your actual method of getting the API key.
            let apiKey = import.meta.env.VITE_GEMINI_API_KEY || (process as any).env?.API_KEY || (process as any).env?.REACT_APP_GEMINI_API_KEY;

            // console.log("[NexaVoice] Checking API Key...", apiKey ? "Found (Length: " + apiKey.length + ")" : "Not Found");

            if (!apiKey) {
                console.error("[NexaVoice] API Key missing!");
                connectingRef.current = false;
                setErrorMessage("Clé API manquante. Vérifiez le fichier .env");
                setState(AppState.ERROR);
                return;
            }

            // console.log("[NexaVoice] Requesting microphone access...");
            let stream: MediaStream;
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        sampleRate: 16000,
                        channelCount: 1,
                        echoCancellation: true,
                        autoGainControl: true,
                        noiseSuppression: true,
                        latency: 0
                    }
                });
                // console.log("[NexaVoice] Microphone access granted.");
            } catch (e) {
                console.error("[NexaVoice] Microphone access denied or failed:", e);
                connectingRef.current = false;
                setErrorMessage("Microphone bloqué. J'ai besoin de t'entendre pour t'aider !");
                setState(AppState.ERROR);
                return;
            }

            currentStreamRef.current = stream;

            // Audio Context Setup
            try {
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (!inputAudioContextRef.current) {
                    inputAudioContextRef.current = new AudioContextClass({ sampleRate: 16000 });
                }
                if (!outputAudioContextRef.current) {
                    outputAudioContextRef.current = new AudioContextClass({ sampleRate: 24000 });
                }

                // CRITICAL: Resume contexts after user gesture (click)
                if (inputAudioContextRef.current.state === 'suspended') {
                    await inputAudioContextRef.current.resume();
                }
                if (outputAudioContextRef.current.state === 'suspended') {
                    await outputAudioContextRef.current.resume();
                }

                // console.log("[NexaVoice] AudioContexts Ready. Input:", inputAudioContextRef.current.state, "Output:", outputAudioContextRef.current.state);

            } catch (e) {
                console.error("[NexaVoice] Failed to create/resume AudioContext:", e);
                connectingRef.current = false;
                setErrorMessage("Erreur système audio (AudioContext).");
                setState(AppState.ERROR);
                return;
            }

            outputNodeRef.current = outputAudioContextRef.current.createGain();
            outputNodeRef.current.connect(outputAudioContextRef.current.destination);

            const ai = new GoogleGenAI({ apiKey });

            // console.log("[NexaVoice] Connecting to Gemini WebSocket...");
            // Use flash-1.5 if 2.0-flash-exp causes issues, but typically 2.0 is better for voice
            // We stick to 2.0-flash-exp as per original code unless user specifically requested change
            sessionRef.current = ai.live.connect({
                model: MODEL_NAME,
                callbacks: {
                    onopen: async () => {
                        // console.log("[NexaVoice] WebSocket Open!");
                        setState(AppState.ACTIVE);
                        connectingRef.current = false;
                        addLog('system', 'Connexion établie.');

                        setTimeout(() => {
                            if (sessionRef.current) {
                                Promise.resolve(sessionRef.current).then(session => {
                                    if (!session) return;
                                    // console.log("[NexaVoice] Sending initial trigger...");
                                    session.send({ parts: [{ text: "Bonjour, présente-toi brièvement en Darija et finis par 'Je t'écoute'." }] });
                                }).catch(e => console.error("[NexaVoice] Initial trigger failed:", e));
                            }
                        }, 500);

                        if (!inputAudioContextRef.current || !currentStreamRef.current) return;

                        const source = inputAudioContextRef.current.createMediaStreamSource(currentStreamRef.current);
                        inputSourceRef.current = source;

                        const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
                        processorRef.current = scriptProcessor;

                        scriptProcessor.onaudioprocess = (e) => {
                            const inputData = e.inputBuffer.getChannelData(0);
                            if (!isAiSpeakingRef.current) {
                                const rms = calculateRMS(inputData);
                                // Increase sensitivity for visual feedback
                                setVolume(v => Math.max(rms * 12, v * 0.9));
                            }
                            const pcmBlob = createPcmBlob(inputData);
                            if (sessionRef.current) {
                                Promise.resolve(sessionRef.current).then(session => {
                                    if (session) {
                                        try {
                                            // The Multimodal Live SDK expects an array of Blob parts
                                            if ((session as any).sendRealtimeInput) {
                                                (session as any).sendRealtimeInput([pcmBlob]);
                                            }
                                        } catch (e) {
                                            // console.error("[NexaVoice] Stream send failed:", e);
                                        }
                                    }
                                }).catch(() => { });
                            }
                        };

                        source.connect(scriptProcessor);
                        scriptProcessor.connect(inputAudioContextRef.current.destination);
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        // // console.log("[NexaVoice] Raw Message:", JSON.stringify(message)); 

                        // Handle AI Text transcripts
                        const modelTurn = message.serverContent?.modelTurn;
                        if (modelTurn?.parts) {
                            const text = modelTurn.parts.map(p => p.text).filter(Boolean).join(' ');
                            if (text) {
                                // console.log("[NexaVoice] Model Text:", text);
                                addLog('model', text);
                            }
                        }

                        // Handle Tool Calls
                        if (message.toolCall?.functionCalls) {
                            // console.log("[NexaVoice] Tool Call received:", message.toolCall);
                            for (const fc of message.toolCall.functionCalls) {
                                if (fc.name === 'get_darija_context') {
                                    const result = "Hania, kolchi i koun nadi.";
                                    sessionRef.current?.then((session) => {
                                        session.sendToolResponse({
                                            functionResponses: [{ id: fc.id, name: fc.name, response: { result } }]
                                        });
                                    });
                                }
                            }
                        }

                        const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                        if (base64Audio && outputAudioContextRef.current && outputNodeRef.current) {
                            setIsAiSpeaking(true);
                            setVolume(0.6);
                            if (aiSpeakingTimerRef.current) window.clearTimeout(aiSpeakingTimerRef.current);

                            const ctx = outputAudioContextRef.current;
                            if (ctx.state === 'suspended') await ctx.resume();

                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                            const audioBytes = new Uint8Array(base64ToArrayBuffer(base64Audio));

                            try {
                                const audioBuffer = await decodeAudioData(audioBytes, ctx);
                                const source = ctx.createBufferSource();
                                source.buffer = audioBuffer;
                                source.connect(outputNodeRef.current);
                                source.start(nextStartTimeRef.current);
                                scheduledSourcesRef.current.add(source);

                                const duration = audioBuffer.duration * 1000;
                                aiSpeakingTimerRef.current = window.setTimeout(() => setIsAiSpeaking(false), duration + 100);
                                source.addEventListener('ended', () => scheduledSourcesRef.current.delete(source));
                                nextStartTimeRef.current += audioBuffer.duration;
                            } catch (decodeErr) {
                                console.error("[NexaVoice] Audio Decode Error:", decodeErr);
                            }
                        }

                        if (message.serverContent?.interrupted) {
                            // console.log("[NexaVoice] Interrupted by user.");
                            scheduledSourcesRef.current.forEach(s => { try { s.stop(); } catch (e) { } });
                            scheduledSourcesRef.current.clear();
                            nextStartTimeRef.current = 0;
                            setIsAiSpeaking(false);
                        }
                    },
                    onclose: (e) => {
                        // console.log("[NexaVoice] Connection Closed", e);
                        connectingRef.current = false;
                        setState(AppState.IDLE);
                        setIsAiSpeaking(false);
                        // Clean up session reference
                        sessionRef.current = null;
                        disconnect(); // Clean up audio tracks on close
                    },
                    onerror: (e: any) => {
                        console.error("[NexaVoice] Gemini Error:", e);
                        connectingRef.current = false;
                        const msg = e?.message || "";
                        if (msg.includes("403") || msg.includes("permission_denied")) {
                            setErrorMessage("Accès refusé. Vérifiez le fichier .env");
                        } else {
                            setErrorMessage(`Erreur de connexion (${msg}).`);
                        }
                        setState(AppState.ERROR);
                    }
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    systemInstruction: SYSTEM_INSTRUCTION,
                    tools: [{ functionDeclarations: [DARIJA_CONTEXT_TOOL] }],
                    speechConfig: {
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
                    }
                }
            });

            // Connection Timeout Safety
            setTimeout(() => {
                if (connectingRef.current) {
                    console.error("[NexaVoice] Connection timed out (15s).");
                    connectingRef.current = false;
                    setErrorMessage("La connexion a pris trop de temps. Réessayez.");
                    setState(AppState.ERROR);
                }
            }, 15000);
        } catch (error: any) {
            console.error("[NexaVoice] Fatal Initialization Error:", error);
            connectingRef.current = false;
            setErrorMessage("Erreur d'initialisation du service.");
            setState(AppState.ERROR);
        }
    }, [state]);

    return { state, volume, isAiSpeaking, errorMessage, logs, connect, disconnect };
};
