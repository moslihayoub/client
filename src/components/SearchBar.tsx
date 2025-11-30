import { useState, useEffect, useRef } from "react";
import VoiceTranscriber from "./VoiceTranscriber";
import TrSend from "../svgs/transparent/TrSend";
import ColSend from "../svgs/colored/ColSend";
import TrEnhance from "../svgs/transparent/TrEnhance";
import ColEnhance from "../svgs/colored/ColEnhance";
import TrMic from "../svgs/transparent/TrMic";
import ColMic from "../svgs/colored/ColMic";
import TrWave from "../svgs/transparent/TrWave";
import ColWave from "../svgs/colored/ColWave";
import TrMinScreen from "../svgs/transparent/TrMinScreen";
import ColFullScreen from "../svgs/colored/ColFullScreen";
import ColSearch from "../svgs/colored/ColSearch";
import { useNavigate } from "react-router-dom";

interface NexaStayTextareaProps {
    fullscreen: boolean;
    setFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
    width: number;
    height: number;
    fullHeight: number;
}

export default function NexaStayTextarea({ fullscreen, setFullscreen, width, height, fullHeight }: NexaStayTextareaProps) {
    const [value, setValue] = useState("");
    const maxWords = 200;
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const navigate = useNavigate();
    // Debug logging
    const [isVisible, setIsVisible] = useState(true);
    const [showVoiceTranscriber, setShowVoiceTranscriber] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

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

    // Responsive padding and spacing
    const padding = width <= 492 ? '10px 14px' : width <= 768 ? '12px 16px' : '12px 18px';
    const buttonSize = width <= 492 ? '30px' : width <= 768 ? '32px' : '34px';
    const buttonGap = width <= 492 ? '10px' : width <= 768 ? '12px' : '16px';

    return (
        <div 
            className={`rounded-[22px] bg-nexastay-border shadow-nexastay-default transition-all duration-500 ease-in-out ${
                fullscreen ? 'shadow-2xl z-50' : 'transform scale-100'
            }`}
            style={{
                width: `${width}%`,
                height: `${fullscreen ? Math.min(fullHeight, 90) : height}%`,
                padding: '1px'
            }}
        >
            <div
                className="rounded-[22px] bg-white transition-all duration-500 ease-in-out w-full h-full"
                style={{
                    padding,
                    display: 'grid',
                    gridTemplateRows: '1fr auto',
                    gridTemplateColumns: '1fr',
                    gap: '8px'
                }}
            >
                {/* Textarea area - Grid Row 1 */}
                <div 
                    className="relative cursor-text" 
                    style={{ minHeight: 0 }}
                    onClick={() => {
                        if (textareaRef.current && !showVoiceTranscriber) {
                            textareaRef.current.focus();
                        }
                    }}
                >
                    <ColSearch />

                    <div className="flex flex-col gap-[5px] h-full" style={{ paddingRight: '45px' }}>
                        {/* Column text above textarea */}
                        <div className="flex flex-col gap-1 text-base pointer-events-none" style={{ paddingLeft: '26px' }}>
                            <span className="font-bricolagegrotesque font-semibold text-nexastay-gradient bg-clip-text">
                                Questionner NexaStay
                            </span>
                        </div>
                        
                        {showVoiceTranscriber ? (
                            <VoiceTranscriber
                                inline
                                isVisible={false}
                                onTranscription={(text) => {
                                    setValue(text);
                                    setShowVoiceTranscriber(false);
                                }}
                                onCancel={() => setShowVoiceTranscriber(false)}
                                className="pl-[26px] py-2"
                            />
                        ) : (
                            <textarea
                                ref={textareaRef}
                                value={value}
                                placeholder={width <= 492 ? "" : "Type here..."}
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
                                className="w-full h-full resize-none outline-none border-none text-gray-800 text-base bg-transparent cursor-text"
                                style={{ paddingLeft: '26px', position: 'relative', zIndex: 0 }}
                            />
                        )}
                    </div>

                    {/* Custom styled placeholder (only visible when empty) */}
                    {value === "" && (
                        <div 
                            className="absolute top-0 pointer-events-none select-none" 
                            style={{ left: '26px', zIndex: 1 }}
                        >
                            <div className={width <= 492 ? "flex flex-col" : "flex gap-1"}>
                                <span className="font-bricolagegrotesque font-semibold bg-nexastay-gradient bg-clip-text text-transparent">
                                    Questionner NexaStay
                                </span>
                                <span
                                    className={`text-slate-500 font-[16px] font-bricolagegrotesque transition-opacity duration-300 ${
                                        isVisible ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    {" "}{animatedTexts[currentTextIndex]}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Send button - disabled when empty, colorful when active */}
                    <button
                        type="submit"
                        disabled={value.trim().length === 0}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate("/hotels");
                            console.log("send button clicked");
                        }}
                        className={`absolute top-0 right-0 w-[44px] h-[44px] flex items-center justify-center group ${
                            value.trim().length === 0 ? 'cursor-not-allowed' : ''
                        }`}
                    >
                        {value.trim().length === 0 ? (
                            <TrSend />
                        ) : (
                            <ColSend />
                        )}
                        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/85 text-white text-[10px] font-vendsans rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                            Envoyer
                        </span>
                    </button>
                </div>

                {/* Buttons row - Grid Row 2 */}
                <div 
                    className="flex items-center justify-end pr-[8px]"
                    style={{
                        gap: '26px',
                        paddingTop: '4px'
                    }}
                >
                    {/*Enhancement button*/}
                    <button 
                        className="flex items-center justify-center group relative"
                        style={{ width: buttonSize, height: buttonSize }}
                    >
                        <TrEnhance className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                        <ColEnhance className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/85 text-white text-[10px] font-vendsans rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                            Améliorer
                        </span>
                    </button>

                    {/*Mic Button */}
                    <button 
                        className="flex items-center justify-center group relative"
                        onClick={() => setShowVoiceTranscriber(true)}
                        style={{ width: buttonSize, height: buttonSize }}
                    >
                        <TrMic className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                        <ColMic className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/85 text-white text-[10px] font-vendsans rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                            Microphone
                        </span>
                    </button>

                    {/*Voice Button*/}
                    <button
                        className="flex items-center justify-center group relative"
                        onClick={() => navigate("/voiceai")}
                        style={{ width: buttonSize, height: buttonSize }}
                    >
                        <TrWave className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                        <ColWave className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/85 text-white text-[10px] font-vendsans rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                            Voix
                        </span>
                    </button>

                    {/*Fullscreen Button*/}
                    <button 
                        className="flex items-center justify-center group relative" 
                        onClick={() => setFullscreen(!fullscreen)}
                        style={{ width: buttonSize, height: buttonSize }}
                    >
                        <TrMinScreen className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                        <ColFullScreen className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/85 text-white text-[10px] font-vendsans rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                            {fullscreen ? 'Réduire' : 'Plein écran'}
                        </span>
                    </button>

                    {/* Only show percentage when user has started typing */}
                    {wordCount > 0 && (
                        <div 
                            className="flex items-center"
                            style={{
                                gap: width <= 492 ? '10px' : '15px',
                                width: width <= 492 ? '76px' : '86px',
                                height: width <= 492 ? '24px' : '28px'
                            }}
                        >
                            {/* Percentage text */}
                            <span 
                                className="font-bricolagegrotesque font-semibold text-slate-400 text-right"
                                style={{
                                    width: width <= 492 ? '45px' : '51px',
                                    fontSize: width <= 492 ? '13px' : '16px'
                                }}
                            >
                                {percentage.toFixed(2)}%
                            </span>

                            {/* Circular progress */}
                            <div 
                                className="relative"
                                style={{
                                    width: width <= 492 ? '20px' : '22px',
                                    height: width <= 492 ? '20px' : '22px'
                                }}
                            >
                                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 36 36">
                                    {/* Background circle */}
                                    <path
                                        className="text-gray-200"
                                        stroke="currentColor"
                                        strokeWidth="5"
                                        strokeLinecap="round"
                                        fill="none"
                                        d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />

                                    {/* Gradient progress */}
                                    <path
                                        stroke="url(#nexastayGradient)"
                                        strokeWidth="5"
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
            </div>
            
            {/* Voice Transcriber Modal */}
            <VoiceTranscriber
                isVisible={showVoiceTranscriber}
                onTranscription={(text) => {
                    setValue(text);
                    setShowVoiceTranscriber(false);
                }}
                onCancel={() => setShowVoiceTranscriber(false)}
            />
        </div>
    );
}
