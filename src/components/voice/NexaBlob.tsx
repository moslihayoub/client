
import React, { useMemo } from 'react';

interface NexaBlobProps {
  volume: number; // Normalized 0 to 1
  isAiSpeaking: boolean;
  isActive: boolean;
  isDarkMode: boolean;
}

// Create a React component wrapper for the dotlottie-wc web component
const DotLottieWC: React.FC<React.HTMLAttributes<HTMLElement> & { src: string; autoplay?: boolean; loop?: boolean; }> = (props) => {
  return React.createElement('dotlottie-wc', props);
};

const NexaBlob: React.FC<NexaBlobProps> = ({ volume, isAiSpeaking, isActive, isDarkMode }) => {
  // Scale calculation for the main blob based on volume
  // Ensure it stays "100% visible" by limiting max scale
  const scale = isActive ? (1 + volume * 0.12) : 0.9;
  const opacity = isActive ? 1 : 0.6;
  
  // Animation URLs from Lottielab
  const userSpeakingUrl = "https://cdn.lottielab.com/l/DhDh5VGEaqQvVH.json";
  const aiSpeakingUrl = "https://cdn.lottielab.com/l/7rdwDYNqktxoVi.json";

  // Generate stable random particles
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      size: Math.random() * 3 + 1.5 + 'px',
      delay: Math.random() * 5 + 's',
      duration: Math.random() * 12 + 6 + 's',
      opacity: Math.random() * 0.3 + 0.1,
    }));
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center transition-all duration-700 ease-out relative">
      
      {/* Container for floating micro-particles */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
        {particles.map(p => (
          <div 
            key={p.id}
            className={`absolute rounded-full blur-[1px] animate-float transition-colors duration-1000 ${
              isAiSpeaking ? 'bg-indigo-400' : 'bg-emerald-400'
            }`}
            style={{
               top: p.top,
               left: p.left,
               width: p.size,
               height: p.size,
               animationDelay: p.delay,
               animationDuration: p.duration,
               opacity: p.opacity
            }}
          />
        ))}
      </div>

      {/* Outer Glow / Soft Aura focused behind the blob */}
      <div 
        className={`absolute w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full blur-[100px] transition-all duration-1000 ${
          isAiSpeaking ? 'bg-indigo-500/25' : 'bg-emerald-500/25'
        } ${!isActive ? 'bg-slate-900/10 scale-75' : 'scale-110 animate-pulse-slow'}`}
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Lottie Container - Centered and Scale-limited */}
      <div 
        className="relative z-10 flex items-center justify-center w-[280px] h-[280px] md:w-[420px] md:h-[420px] transition-transform duration-300"
        style={{ 
          transform: `scale(${scale})`,
          opacity: opacity,
        }}
      >
        <DotLottieWC 
          key={isAiSpeaking ? 'ai' : 'user'}
          src={isAiSpeaking ? aiSpeakingUrl : userSpeakingUrl} 
          autoplay 
          loop 
          style={{ 
            width: '100%', 
            height: '100%',
            filter: isDarkMode ? 'brightness(1.15) contrast(1.1)' : 'none'
          }}
        ></DotLottieWC>
      </div>
    </div>
  );
};

export default NexaBlob;
