import { useEffect, useRef, useState } from 'react';
import { X, Check } from 'lucide-react';
import api from '../services/api';

interface VoiceTranscriberProps {
  onTranscription: (text: string) => void;
  onCancel: () => void;
  isVisible: boolean; // used only for modal mode
  inline?: boolean; // when true, render compact inline version
  className?: string; // optional extra classes for inline container
}

export default function VoiceTranscriber({ onTranscription, onCancel, isVisible, inline = false, className }: VoiceTranscriberProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const animationRef = useRef<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Initialize audio context and start recording
  const startRecording = async () => {
    try {
      setError(null);
      setTranscript('');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Initialize MediaRecorder for actual audio recording
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // Convert audio chunks to blob
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        // Convert to File for API
        const audioFile = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
        
        // Send to backend for transcription
        setIsProcessing(true);
        try {
          const response = await api.transcribeAudio(audioFile);
          setTranscript(response.transcript);
        } catch (err: any) {
          setError(err.message || 'Failed to transcribe audio. Please try again.');
          console.error('Transcription error:', err);
        } finally {
          setIsProcessing(false);
        }
      };

      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
      
    } catch (err) {
      setError('Microphone access denied. Please allow microphone access.');
      console.error('Error accessing microphone:', err);
    }
  };

  // Stop recording
  const stopRecording = () => {
    // Stop MediaRecorder first
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    setIsRecording(false);
  };

  // Draw waveform visualization
  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas || !analyserRef.current || !dataArrayRef.current) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / dataArrayRef.current.length;
    const centerY = canvas.height / 2;

    // Create NexaStay gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#2DD4BF'); // teal-400
    gradient.addColorStop(0.55, '#0EA5E9'); // sky-500
    gradient.addColorStop(1, '#D946EF'); // fuchsia-500

    ctx.fillStyle = gradient;
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.5;

    // Draw waveform bars (ChatGPT style - minimal bars)
    const barSpacing = 2;
    const maxBarWidth = 3;
    for (let i = 0; i < dataArrayRef.current.length; i += 2) {
      const barHeight = Math.max(2, (dataArrayRef.current[i] / 255) * canvas.height * 0.6);
      const x = i * barWidth;
      const barW = Math.min(maxBarWidth, barWidth - barSpacing);
      
      // Draw vertical bars centered
      ctx.fillRect(x, centerY - barHeight / 2, barW, barHeight);
    }
  };

  // Animation loop
  useEffect(() => {
    if (isRecording) {
      const animate = () => {
        drawWaveform();
        animationRef.current = requestAnimationFrame(animate);
      };
      animate();
    }
  }, [isRecording]);

  // Initialize recording when component becomes visible (for modal) or when inline is true
  useEffect(() => {
    if ((isVisible || inline) && !isRecording && !isProcessing) {
      startRecording();
    }
  }, [isVisible, inline]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  const handleConfirm = () => {
    onTranscription(transcript);
    stopRecording();
  };

  const handleCancel = () => {
    stopRecording();
    onCancel();
  };

  // Inline compact layout: ChatGPT-style minimal design
  if (inline) {
    return (
      <div className={"flex items-center gap-2 w-full h-full max-w-full overflow-hidden " + (className || '')}>
        <canvas
          ref={canvasRef}
          width={400}
          height={24}
          className="flex-1 h-6 bg-transparent"
          style={{ maxWidth: '100%' }}
        />
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {isRecording && (
            <button
              onClick={stopRecording}
              className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors"
              title="Stop"
            >
              <div className="w-2 h-2 rounded-sm bg-white" />
            </button>
          )}
          <button
            onClick={handleCancel}
            className="w-6 h-6 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
            title="Cancel"
          >
            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={handleConfirm}
            disabled={!transcript || isProcessing || isRecording}
            className="w-6 h-6 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title="Confirm"
          >
            <Check className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </div>
    );
  }

  // Modal layout
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black/90 rounded-2xl p-8 w-full max-w-4xl mx-4">
        <div className="mb-8">
          <canvas
            ref={canvasRef}
            width={800}
            height={200}
            className="w-full h-48 bg-black rounded-lg"
          />
        </div>
        {transcript && (
          <div className="mb-8 text-center">
            <p className="text-white text-lg font-medium leading-relaxed">
              {transcript}
            </p>
          </div>
        )}
        <div className="mb-8 text-center">
          <p className="text-white/70 text-sm">
            {isRecording ? '🎤 Listening... Speak clearly' : isProcessing ? '🔄 Processing audio...' : 'Click to start recording'}
          </p>
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
        </div>
        <div className="flex justify-center gap-6">
          <button
            onClick={handleCancel}
            className="w-12 h-12 rounded-full border-2 border-red-500 bg-transparent flex items-center justify-center hover:bg-red-500/10 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          {isRecording && (
            <button
              onClick={stopRecording}
              className="w-12 h-12 rounded-full border-2 border-orange-500 bg-orange-500/20 flex items-center justify-center hover:bg-orange-500/30 transition-colors"
              title="Stop Recording"
            >
              <div className="w-4 h-4 rounded-sm bg-orange-500" />
            </button>
          )}
          <button
            onClick={handleConfirm}
            disabled={!transcript || isProcessing || isRecording}
            className="w-12 h-12 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-600/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
