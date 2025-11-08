import { useEffect, useRef, useState } from 'react';
import { X, Check } from 'lucide-react';

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
  const animationRef = useRef<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Initialize audio context and start recording
  const startRecording = async () => {
    try {
      setError(null);
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

      setIsRecording(true);
      
      // Start transcription (mock implementation)
      setTimeout(() => {
        setTranscript("Je veux passer un séjour à Marrakech");
      }, 2000);
      
    } catch (err) {
      setError('Microphone access denied. Please allow microphone access.');
      console.error('Error accessing microphone:', err);
    }
  };

  // Stop recording
  const stopRecording = () => {
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

    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, '#d946ef'); // Purple/magenta
    gradient.addColorStop(0.3, '#7476ec'); // Blue
    gradient.addColorStop(0.6, '#0ea5e9'); // Sky blue
    gradient.addColorStop(1, '#2dd4bf'); // Cyan

    ctx.fillStyle = gradient;
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;

    // Draw waveform bars
    for (let i = 0; i < dataArrayRef.current.length; i++) {
      const barHeight = (dataArrayRef.current[i] / 255) * canvas.height * 0.8;
      const x = i * barWidth;
      
      // Draw vertical bars
      ctx.fillRect(x, centerY - barHeight / 2, barWidth - 1, barHeight);
    }

    // Draw horizontal line
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();
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

  // Initialize recording when component becomes visible
  useEffect(() => {
    if (isVisible && !isRecording) {
      startRecording();
    }
  }, [isVisible]);

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

  // Inline compact layout: transparent, canvas + buttons on the right
  if (inline) {
    return (
      <div className={"flex items-center gap-3 w-full " + (className || '')}>
        <canvas
          ref={canvasRef}
          width={600}
          height={56}
          className="flex-1 h-14 bg-transparent rounded-lg"
        />
        <div className="flex items-center gap-2">
          <button
            onClick={handleCancel}
            className="w-9 h-9 rounded-full border border-red-500/60 bg-transparent flex items-center justify-center hover:bg-red-500/10 transition-colors"
            title="Cancel"
          >
            <X className="w-5 h-5 text-red-400" />
          </button>
          <button
            onClick={handleConfirm}
            disabled={!transcript}
            className="w-9 h-9 rounded-full border border-emerald-500/60 bg-transparent flex items-center justify-center hover:bg-emerald-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Confirm"
          >
            <Check className="w-5 h-5 text-emerald-400" />
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
            {isRecording ? '🎤 Listening... Speak clearly' : 'Processing...'}
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
          <button
            onClick={handleConfirm}
            disabled={!transcript}
            className="w-12 h-12 rounded-full border-2 border-gray-600 bg-transparent flex items-center justify-center hover:bg-gray-600/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
