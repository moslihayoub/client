import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, ArrowLeft } from 'lucide-react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const botResponses = [
  "Parfait ! J'ai bien compris votre demande. Je vais maintenant vous présenter une sélection d'hôtels qui correspondent à vos critères.",
  "Excellent ! J'ai analysé vos préférences et j'ai trouvé plusieurs options qui pourraient vous intéresser.",
  "Merci pour ces informations ! Laissez-moi vous montrer les meilleures options disponibles pour votre séjour."
];

export default function Voice3DVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBotResponse, setShowBotResponse] = useState(false);
  const [botText, setBotText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isListeningRef = useRef(false);

  // Start microphone
  const startListening = async () => {
    try {
      setError(null);
      setShowBotResponse(false);
      setBotText('');
      setIsTyping(false);
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

      setIsListening(true);
      isListeningRef.current = true;
    } catch (err) {
      setError('Microphone access denied. Please allow microphone access.');
      console.error('Error accessing microphone:', err);
    }
  };

  // Stop microphone
  const stopListening = () => {
    const wasListening = isListeningRef.current;
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    setIsListening(false);
    isListeningRef.current = false;
    
    // Trigger bot response after stopping if we were listening
    if (wasListening) {
      setShowBotResponse(true);
      setIsTyping(true);
      setBotText('');
    }
  };

  // Bot typing animation
  useEffect(() => {
    if (!showBotResponse || !isTyping) return;

    const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < randomResponse.length) {
        setBotText(randomResponse.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30); // Adjust speed here (lower = faster)

    return () => clearInterval(typingInterval);
  }, [showBotResponse, isTyping]);

  // Initialize Three.js scene - only once
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.Fog(0x0a0a0a, 50, 200);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create particle system
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const basePositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const angles = new Float32Array(particleCount);
    const orbitRadii = new Float32Array(particleCount);
    const orbitSpeeds = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x2dd4bf),
      new THREE.Color(0x0ea5e9),
      new THREE.Color(0x7476ec),
      new THREE.Color(0xa65eee),
      new THREE.Color(0xd946ef),
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 15 + Math.random() * 25;
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      basePositions[i3] = x;
      basePositions[i3 + 1] = y;
      basePositions[i3 + 2] = z;
      
      angles[i] = theta;
      orbitRadii[i] = radius;
      orbitSpeeds[i] = (Math.random() - 0.5) * 0.01 + 0.005;
      
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create sparkle texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
      gradient.addColorStop(0.4, 'rgba(255,255,255,0.4)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const sparkleTexture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      map: sparkleTexture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x2dd4bf, 2, 100);
    light1.position.set(30, 30, 30);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xd946ef, 2, 100);
    light2.position.set(-30, -30, 30);
    scene.add(light2);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      let audioLevel = 0;
      
      if (isListeningRef.current && analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);
        const sum = dataArrayRef.current.reduce((a, b) => a + b, 0);
        audioLevel = sum / dataArrayRef.current.length / 255;
      }

      // Update particles
      const posAttr = geometry.getAttribute('position');

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Update orbital angle
        angles[i] += orbitSpeeds[i] * (1 + audioLevel * 3);
        
        // Calculate orbital position
        const radius = orbitRadii[i] * (1 + audioLevel * 0.5);
        const phi = Math.acos(Math.max(-1, Math.min(1, basePositions[i3 + 2] / orbitRadii[i])));
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(angles[i]);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(angles[i]);
        positions[i3 + 2] = radius * Math.cos(phi) * (1 + Math.sin(angles[i] * 2) * audioLevel * 0.3);
      }

      posAttr.needsUpdate = true;
      
      // Rotate entire particle system
      particlesMesh.rotation.y += 0.001 + audioLevel * 0.01;
      particlesMesh.rotation.x = Math.sin(Date.now() * 0.0001) * 0.2;

      // Animate camera
      const time = Date.now() * 0.0001;
      camera.position.x = Math.sin(time) * 5;
      camera.position.y = Math.cos(time * 0.7) * 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      sparkleTexture.dispose();
      renderer.dispose();
      stopListening();
    };
  }, []); // Empty dependency array - only runs once

  return (
    <div className="fixed inset-0 w-full h-full bg-black overflow-hidden">
        <div className="z-10 flex flex-col h-full bg-transparent fixed w-full">
            <Navbar logoColor="white" background="transparent" iconVariant="white" />
        </div>
        
      {/* Return Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-24 left-6 z-20 p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-black/80 transition-all duration-300 border border-white/10 hover:scale-110"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>
        
      {/* Three.js container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Controls */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none z-10">
        <div className="pointer-events-auto">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`rounded-full h-20 w-20 p-0 flex items-center justify-center transition-all shadow-2xl ${
              isListening
                ? "bg-red-500 text-white hover:bg-red-600 shadow-red-500/50"
                : "bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-blue-500/50"
            }`}
            style={{
              boxShadow: isListening 
                ? '0 0 40px rgba(239, 68, 68, 0.6)' 
                : '0 0 40px rgba(59, 130, 246, 0.6)'
            }}
          >
            {isListening ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </button>
        </div>
        
        <p className="pointer-events-auto px-6 py-3 bg-black/60 backdrop-blur-md rounded-full text-white text-lg font-light border border-white/10">
          {isListening ? '🎤 Listening... Speak to see the magic' : '✨ Click to start the experience'}
        </p>
        
        {error && (
          <div className="pointer-events-auto px-6 py-3 bg-red-500/90 backdrop-blur-md rounded-full text-white border border-red-400/30">
            {error}
          </div>
        )}

        {/* Bot Response */}
        {showBotResponse && (
          <div className="pointer-events-auto max-w-2xl px-8 py-6 bg-black/70 backdrop-blur-md rounded-2xl text-white border border-white/20 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 via-sky-500 to-fuchsia-500 flex items-center justify-center text-xl">
                🤖
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-fuchsia-500">
                  Assistant IA
                </p>
                <p className="text-base leading-relaxed">
                  {botText}
                  {isTyping && (
                    <span className="inline-block w-2 h-5 bg-white ml-1 animate-pulse">|</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Button */}
        {showBotResponse && !isTyping && (
          <button
            onClick={() => {
              stopListening();
              navigate('/hotels');
            }}
            className="pointer-events-auto px-8 py-4 bg-gradient-to-r from-teal-400 via-sky-500 to-fuchsia-500 text-white font-semibold rounded-full hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            style={{
              boxShadow: '0 0 30px rgba(45, 212, 191, 0.5)'
            }}
          >
            Confirmer et voir les hôtels
          </button>
        )}
      </div>
    </div>
  );
}