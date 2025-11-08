import { useState, useEffect } from "react";
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
        <div 
            className={`rounded-[22px] bg-nexastay-border shadow-nexastay-default transition-all duration-500 ease-in-out ${
                fullscreen ? ' shadow-2xl z-50' : 'transform scale-100'
            }`}
            style={{
                width: `${width}%`,
                height: `${fullscreen ? Math.min(fullHeight, 90) : height}%`,
                padding: '1px'
            }}
        >
            <div
                className="flex flex-col justify-between rounded-[22px] bg-white p-[12px_18px] transition-all duration-500 ease-in-out w-full h-full"
            >
            {/* Textarea wrapper */}
            <div className="relative flex-1">
                    <ColSearch />

                    <div className="flex flex-col gap-[5px] h-full pr-[45px]">
                        {/* Column text above textarea */}
                        <div className="flex flex-col gap-1 text-base pointer-events-none pl-[26px]">
                            <span className="font-semibold text-nexastay-gradient bg-clip-text">
                        Questionner NexaStay
                    </span>{" "}
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
                        className="w-full h-full resize-none outline-none border-none text-gray-800 text-base bg-transparent pl-[26px] "
                    />
                )}
                </div>

                {/* Custom styled placeholder (only visible when empty) */}
                {value === "" && (
                    <div className="absolute top-0 left-[26px] flex items-center gap-1 text-base pointer-events-none">
                            <div className={width <= 492 ? "flex flex-col" : "flex gap-1"}>
                            <span className="font-semibold bg-nexastay-gradient bg-clip-text text-transparent">
                                Questionner NexaStay
                                </span>
                                <span
                                    className={`text-gray-400 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
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
                        onClick={() => {
                            navigate("/hotels");
                            console.log("send button clicked");
                        }}
                        className={`w-[44px] h-[44px] flex items-center justify-center absolute top-0 right-0 ${value.trim().length === 0 ? 'cursor-not-allowed' : ''
                            }`}
                    >
                        {value.trim().length === 0 ? (
                            <TrSend />
                        ) : (
                            <ColSend />

                        )}
                </button>
            </div>

            {/* Buttons row */}
                <div className="flex items-center justify-end gap-[16px] mt-1">
                    {/*Enhancement button*/}
                <button className="w-[34px] h-[34px] flex items-center justify-center group relative">
                        <TrEnhance className="absolute opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
                        <ColEnhance className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                    {/*Mic Button */}
                    <button className="w-[34px] h-[34px] flex items-center justify-center group relative"
                        onClick={() => setShowVoiceTranscriber(true)}>
                        <TrMic />
                        <ColMic />
                </button>

                    {/*Voice Button*/}
                    <button
                        className="w-[34px] h-[34px] flex items-center justify-center group relative"
                        onClick={() => navigate("/voiceai")}
                    >
                        <TrWave />
                        <ColWave />
                </button>

                    {/*Fullscreen Button*/}
                <button className="w-[34px] h-[34px] flex items-center justify-center group relative" onClick={() => setFullscreen(!fullscreen)}>
                        <TrMinScreen />
                        <ColFullScreen />
                </button>

                    {/* Only show percentage when user has started typing */}
                    {wordCount > 0 && (
                        <div className="flex items-center gap-[15px] w-[86px] h-[28px]">
                            {/* Percentage text */}
                            <span className="text-semibold font-semibold text-slate-400 w-[51px] h-[28px] text-right">
                                {percentage.toFixed(2)}%
                            </span>

                            {/* Circular progress */}
                            <div className="relative w-[22px] h-[22px]">
                                <svg className="transform -rotate-90" viewBox="0 0 36 36">
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
