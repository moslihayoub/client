import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGeminiLive } from '../components/voice/hooks/useGeminiLive';
import NexaBlob from '../components/voice/NexaBlob';
import { AppState } from '../components/voice/types';
import { playFeedbackSound } from '../components/voice/utils/audioUtils';

// Icons
const MicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
    <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
  </svg>
);

const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const VoiceChat: React.FC = () => {
  const { state, volume, isAiSpeaking, connect, disconnect } = useGeminiLive();
  const [showIntro, setShowIntro] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Handle Theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Load Lottie script once
  useEffect(() => {
    const scriptId = 'dotlottie-wc-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';
      script.src = 'https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.5/dist/dotlottie-wc.js';
      document.body.appendChild(script);
    }
  }, []);

  // Check system preference on mount
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(isDark);
    };
    checkDarkMode();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);
    return () => mediaQuery.removeEventListener('change', checkDarkMode);
  }, []);

  // Handle SFX and View Transitions
  const handleStart = () => {
    playFeedbackSound('on');
    setShowIntro(false);
    connect();
  };

  const handleStop = () => {
    playFeedbackSound('off');
    disconnect();
    setShowIntro(true);
  };

  // Watch for state errors to play sound
  useEffect(() => {
    if (state === AppState.ERROR) playFeedbackSound('error');
  }, [state]);

  const isActive = state === AppState.ACTIVE;
  const isConnecting = state === AppState.CONNECTING;
  const isError = state === AppState.ERROR;

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden flex flex-col text-slate-900 dark:text-white transition-colors duration-700 font-bricolagegrotesque">
      
      {/* Background Layer */}
      <div className={`absolute inset-0 transition-all duration-1000 z-0 
         bg-gradient-to-br from-indigo-500/5 via-white to-emerald-500/5
         dark:from-[#050510] dark:via-[#020205] dark:to-[#050c14]
      `} />

      {/* Header UI - Top Controls */}
      <header className="absolute top-0 left-0 right-0 p-6 z-40 flex justify-between items-center pointer-events-none">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-full bg-white/40 dark:bg-black/30 backdrop-blur-xl border border-white/30 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/10 transition-all shadow-sm pointer-events-auto"
          aria-label="Retour"
        >
          <ArrowLeftIcon />
        </button>

        {/* Right Controls */}
        <div className="flex items-center gap-3 pointer-events-auto">
            {isActive && (
                <div className={`px-4 py-1.5 rounded-full border backdrop-blur-md text-[11px] font-bold tracking-wider flex items-center gap-2 transition-all duration-500 shadow-lg
                    ${isAiSpeaking 
                        ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-300 shadow-indigo-500/10' 
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-300 shadow-emerald-500/10'
                    }`}>
                    <span className={`w-2 h-2 rounded-full animate-pulse ${isAiSpeaking ? 'bg-indigo-500' : 'bg-emerald-400'}`}></span>
                    {isAiSpeaking ? 'NEXA PARLE' : 'NEXA ÉCOUTE'}
                </div>
            )}
            
            <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-full bg-white/40 dark:bg-black/30 backdrop-blur-xl border border-white/30 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/10 transition-all shadow-sm"
            >
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-30 flex flex-col items-center justify-between w-full h-full max-w-4xl mx-auto px-6 py-12 md:py-16 text-center">
        
        {/* TOP SECTION: Title and Description stacked vertically */}
        <div className={`transition-all duration-1000 ${isConnecting ? 'opacity-30 blur-sm scale-95' : 'opacity-100 scale-100'}`}>
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight font-bricolagegrotesque whitespace-nowrap mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-500 to-indigo-500 bg-[length:200%_auto] animate-gradient-text">
                Votre logement idéal!
              </span>
            </h1>
            <p className="text-base md:text-xl text-slate-500 dark:text-slate-400 font-medium font-bricolagegrotesque whitespace-nowrap overflow-hidden text-ellipsis max-w-[90vw]">
              Discutez avec Nexa pour planifier vos vacances.
            </p>
          </div>
        </div>

        {/* CENTER SECTION: The Animation */}
        <div className="flex-1 w-full flex items-center justify-center relative min-h-[300px]">
          <div className={`w-full h-full transition-all duration-1000 ease-out transform ${showIntro ? 'opacity-60 scale-90' : 'opacity-100 scale-100'}`}>
            <NexaBlob 
                volume={volume} 
                isAiSpeaking={isAiSpeaking} 
                isActive={isActive} 
                isDarkMode={isDarkMode}
            />
          </div>

          {/* Loading Indicator Overlay */}
          {isConnecting && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 animate-fade-in bg-white/5 dark:bg-black/5 backdrop-blur-sm rounded-full">
              <div className="w-14 h-14 rounded-full border-4 border-slate-200 dark:border-white/10 border-t-emerald-500 animate-spin" />
              <p className="text-[10px] font-black text-emerald-500 tracking-[0.3em] uppercase font-bricolagegrotesque">Initialisation</p>
            </div>
          )}
        </div>

        {/* BOTTOM SECTION: CTA Button */}
        <div className="w-full flex flex-col items-center justify-center gap-4 min-h-[140px]">
          {showIntro && !isConnecting && (
            <button 
              onClick={handleStart}
              className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-300 
              bg-slate-900 dark:bg-white dark:text-black rounded-full 
              hover:scale-105 hover:shadow-2xl dark:hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)]
              focus:outline-none shadow-xl active:scale-95 overflow-hidden font-bricolagegrotesque"
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-3 scale-110"><MicIcon /></span>
                <span className="text-lg">Discuter avec Nexa</span>
              </span>
            </button>
          )}

          {isActive && (
            <div className="flex flex-col items-center gap-4 animate-fade-in">
              <p className={`text-slate-500 dark:text-slate-300 text-sm md:text-base font-semibold tracking-wide transition-all duration-500 font-bricolagegrotesque ${isAiSpeaking ? 'opacity-20 blur-sm' : 'opacity-100'}`}>
                 Je vous écoute...
              </p>
              <button 
                onClick={handleStop}
                className="group relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full 
                bg-red-500/10 dark:bg-red-500/20 backdrop-blur-2xl border border-red-500/20
                text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500
                shadow-2xl transition-all duration-300 hover:scale-110 active:scale-90"
                aria-label="End Conversation"
              >
                <CrossIcon />
              </button>
            </div>
          )}
        </div>

        {/* Error Notification Overlay */}
        {isError && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-white/40 dark:bg-black/40 backdrop-blur-md">
                <div className="p-8 bg-white dark:bg-[#1a1a25] border border-red-500/20 rounded-[2.5rem] text-center shadow-2xl w-full max-w-sm animate-fade-in font-bricolagegrotesque">
                    <div className="text-red-500 mb-4 flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Erreur</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">
                        Impossible de se connecter aux services Nexa. Vérifiez votre connexion et votre clé API.
                    </p>
                    <div className="flex gap-3">
                        <button 
                            onClick={handleStart}
                            className="flex-1 px-6 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold text-sm transition-all active:scale-95"
                        >
                            Réessayer
                        </button>
                        <button 
                            onClick={() => { disconnect(); setShowIntro(true); }}
                            className="flex-1 px-6 py-4 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-700 dark:text-white rounded-2xl font-bold text-sm transition-all"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </div>
        )}

      </main>
    </div>
  );
};

export default VoiceChat;

