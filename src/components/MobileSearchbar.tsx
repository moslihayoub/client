import React, { useState, useEffect } from 'react';
import ColSearch from '../svgs/colored/ColSearch';
import TrSend from '../svgs/transparent/TrSend';
import ColSend from '../svgs/colored/ColSend';
import TrEnhance from '../svgs/transparent/TrEnhance';
import ColEnhance from '../svgs/colored/ColEnhance';
import TrMic from '../svgs/transparent/TrMic';
import ColMic from '../svgs/colored/ColMic';
import TrWave from '../svgs/transparent/TrWave';
import ColWave from '../svgs/colored/ColWave';
import TrMinScreen from '../svgs/transparent/TrMinScreen';
import ColFullScreen from '../svgs/colored/ColFullScreen';
import { useNavigate } from 'react-router-dom';

interface MobileSearchbarProps {
  fullscreen?: boolean;
  setFullscreen?: React.Dispatch<React.SetStateAction<boolean>>;
  width?: number;
  height?: number;
  fullHeight?: number;
}

function MobileSearchbar({
  fullscreen = false,
  setFullscreen = () => { },
  width = 100,
  height = 30,
  fullHeight = 60
}: MobileSearchbarProps) {
  const [value, setValue] = useState("");
  const maxWords = 200;
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showVoiceTranscriber, setShowVoiceTranscriber] = useState(false);
  const navigate = useNavigate();
  const animatedTexts = [
    "Où vous voulez passer vos vacances",
    "Comment je peux vous aidez",
    "Comment vous voulez vivre votre séjour",
    "Si vous voulez découvrir les activités"
  ];

  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
  const percentage = ((wordCount / maxWords) * 100);

  // Text animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length);
        setIsVisible(true);
      }, 300); // Fade out duration
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full flex flex-col items-cente gap-4 px-4 transition-all duration-500 ease-in-out `}
    style={{
      width: `${width}%`,
      height: `${fullscreen ? fullHeight : height}%`,
      padding: '1px'
    }}
    >
      {/* Search Bar Container */}
      <div
        className={`rounded-[22px] bg-nexastay-border shadow-nexastay-default transition-all duration-500 ease-in-out w-full`}
        style={{
          width: `${width}%`,
          height: `${fullscreen ? fullHeight : height}%`,
          padding: '1px'
        }}
      >
        <div className="flex flex-col justify-between rounded-[22px] bg-white p-[12px_18px] transition-all duration-500 ease-in-out w-full h-full">
          {/* Textarea wrapper */}
          <div className="relative flex-1">
            <ColSearch />

             <div className="flex flex-col gap-[5px] h-full">
               {/* Column text above textarea */}
               <div className="flex flex-col gap-1 text-base pointer-events-none pl-[26px]">
                 <span className="font-semibold text-nexastay-gradient bg-clip-text">
                   Questionner NexaStay
                 </span>
               </div>

               {/* Textarea */}
               <textarea
                 value={value}
                 placeholder=""
                 name="chat-input"
                 id="chat-input"
                 onChange={(e) => {
                   const newValue = e.target.value;
                   const words = newValue.trim().split(/\s+/).filter(Boolean);

                   // Prevent typing if word limit is reached
                   if (words.length > maxWords) {
                     return; // Don't update if trying to add more words
                   }

                   setValue(newValue);
                 }}
                 className="w-full flex-1 resize-none outline-none border-none text-gray-800 text-base bg-transparent pl-[26px]"
               />

               {/* Word count progress - positioned below textarea */}
               {wordCount > 0 && (
                 <div className="flex items-center justify-end gap-2 pr-2">
                   {/* Percentage text */}
                   <span className="text-xs font-medium text-slate-400">
                     {percentage.toFixed(0)}%
                   </span>

                   {/* Circular progress */}
                   <div className="relative w-[20px] h-[20px]">
                     <svg className="transform -rotate-90" viewBox="0 0 36 36">
                       {/* Background circle */}
                       <path
                         className="text-gray-200"
                         stroke="currentColor"
                         strokeWidth="2"
                         strokeLinecap="round"
                         fill="none"
                         d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                       />

                       {/* Gradient progress */}
                       <path
                         stroke="url(#nexastayGradient)"
                         strokeWidth="2"
                         strokeDasharray={`${percentage}, 100`}
                         strokeLinecap="round"
                         fill="none"
                         d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                       />

                       <defs>
                         <linearGradient id="nexastayGradient" x1="0" y1="0" x2="1" y2="1">
                           <stop offset="0%" stopColor="#2DD4BF" />
                           <stop offset="55%" stopColor="#0EA5E9" />
                           <stop offset="100%" stopColor="#D946EF" />
                         </linearGradient>
                       </defs>
                     </svg>
                   </div>
                 </div>
               )}
             </div>

            {/* Custom styled placeholder (only visible when empty) */}
            {value === "" && (
              <div className="absolute top-0 left-[26px] flex items-center gap-1 text-base pointer-events-none">
                <div className="flex flex-col">
                  <span className="font-semibold bg-nexastay-gradient bg-clip-text text-transparent">
                    Questionner NexaStay
                  </span>
                  <span
                    className={`text-gray-400 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                      }`}
                  >
                    {animatedTexts[currentTextIndex]}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center justify-center gap-4 w-full">
        {/* Clear button - appears when user types */}
        {value.trim().length > 0 && (
          <button
            onClick={() => setValue("")}
            className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-white shadow-lg border transition-all duration-200"
            aria-label="Clear text"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.5" d="M13.9998 25.4586C20.3278 25.4586 25.4576 20.3288 25.4576 14.0008C25.4576 7.67281 20.3278 2.54297 13.9998 2.54297C7.67183 2.54297 2.54199 7.67281 2.54199 14.0008C2.54199 20.3288 7.67183 25.4586 13.9998 25.4586Z" stroke="#EF4444" stroke-width="1.71867" />
              <path d="M16.8646 11.1367L11.1357 16.8656M11.1357 11.1367L16.8646 16.8656" stroke="#EF4444" stroke-width="1.71867" stroke-linecap="round" />
            </svg>
          </button>
        )}

        {/* Fullscreen Button */}
        <button
          className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200 group relative"
          onClick={() => setFullscreen(!fullscreen)}
        >
          <TrMinScreen />
          <ColFullScreen />
        </button>

        {/* Mic Button */}
        <button
          className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200 group relative"
          onClick={() => setShowVoiceTranscriber(true)}
        >
          <TrMic />
          <ColMic />
        </button>

        {/* Voice Button */}
        <button
          className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200 group relative"
          onClick={() => setShowVoiceTranscriber(true)}
        >
          <TrWave />
          <ColWave />
        </button>

        {/* Enhancement button */}
        <button className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200 group relative">
          <TrEnhance className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
          <ColEnhance className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>


        {/* Send button */}
        <button
          type="submit"
          disabled={value.trim().length === 0}
          className={`w-[48px] h-[48px] flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 ${value.trim().length === 0 ? 'cursor-not-allowed opacity-50' : 'hover:shadow-xl transition-shadow duration-200'
            }`}
            onClick={() => {
              console.log("send button clicked");
              navigate("/hotels");
            }}
        >
          {value.trim().length === 0 ? (
            <TrSend />
          ) : (
            <ColSend />
          )}
        </button>
      </div>
    </div>
  );
}

export default MobileSearchbar;