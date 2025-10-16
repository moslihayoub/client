import React from 'react'
import DarkAnimatedBg from '../components/DarkAnimatedBg'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import { useState, useEffect } from 'react'
import AnimatedGradients from '../components/AnimatedGradients'

interface Video {
    url: string;
}

interface Input {
    type: 'video' | 'background';
    videos: Video[];
}

function HomePage5({ input }: { input: Input }) {
    const [fullscreen, setFullscreen] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(() => 
        input.type === 'video' && input.videos.length > 0 
            ? Math.floor(Math.random() * input.videos.length) 
            : 0
    );
    const [isTransitioning, setIsTransitioning] = useState(false);

    return (
        <div className="fixed w-full h-screen overflow-hidden">
            {input.type === 'video' && input.videos.length > 0 && (
                <video
                    key={currentVideoIndex}
                    src={input.videos[currentVideoIndex].url}
                    autoPlay
                    muted
                    loop
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        isTransitioning ? 'opacity-0' : 'opacity-100'
                    }`}
                />
            )}
            {input.type === 'background' && (
                <AnimatedGradients />
            )}

            {/* Top-to-middle gradient shadow overlay */}
            <div
                    className="absolute inset-0 pointer-events-none h-[217px]"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.00) 100%)",
                    }}
                />
            
            <div className="z-10 flex flex-col h-full fixed w-full">
                <Navbar logoColor="white" background="transparent" iconVariant="white" />

                {/* Main content area - takes remaining space and centers content */}
                {input.type === 'background' && (
                    <div className={`flex-1 flex items-center justify-center ${fullscreen ? "blur-md" : ""}`}>
                        <div className='flex flex-col gap-[26px] justify-center items-center w-[1160px] h-[198px]'>
                            <p className='font-youngserif font-normal text-[56px] text-center text-white leading-tight'>Votre logement idéal, un espace où l'IA améliore votre expérience !</p>
                            <p className='font-zalando text-[18px] text-center text-white'>Découvrez notre marketplace intelligente</p>
                        </div>
                    </div>
                )}

                <div className="fixed z-10 bottom-0 left-0 w-full flex justify-center p-4">
                    <SearchBar fullscreen={fullscreen} setFullscreen={setFullscreen} width={774} fullHeight={500} height={162} />
                </div>

                <div className="absolute bottom-0 right-0 w-[172px] h-[172px]">
                    <img
                        src="/images/bot.png"
                        alt="Bot"
                        className="w-full h-full animate-float"
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage5