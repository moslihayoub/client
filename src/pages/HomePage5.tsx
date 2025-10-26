import React from 'react'
import DarkAnimatedBg from '../components/DarkAnimatedBg'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import { useState, useEffect } from 'react'
import AnimatedGradients from '../components/AnimatedGradients'
import MobileSearchbar from '../components/MobileSearchbar'

interface Input {
    type: 'video' | 'background';
}

function HomePage5({ input }: { input: Input }) {
    const [fullscreen, setFullscreen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const videoUrl = 'https://ik.imagekit.io/oyludbk2o/NexaBg.mp4?updatedAt=1761479238342';

    useEffect(() => {
        setIsMobile(window.innerWidth < 400);
        console.log(isMobile);
    }, []);

    return (
        <div className="fixed w-full h-screen overflow-hidden">
            {input.type === 'video' && (
                <video
                    src={videoUrl}
                    autoPlay
                    playsInline
                    muted
                    loop
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'
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
                            <p className='font-youngserif font-normal text-[56px] sm:text-[40px] md:text-[56px] text-center text-white leading-tight'>Votre logement idéal, un espace où l'IA améliore votre expérience !</p>
                            <p className='font-zalando text-[18px] sm:text-[16px] md:text-[18px] text-center text-white'>Découvrez notre marketplace intelligente</p>
                        </div>
                    </div>
                )}

                <div className='fixed rounded-[22px] z-20 bottom-0 left-0 h-[25%] w-[30%] sm:w-full md:w-[50%] flex items-end justify-center p-4 mx-0 md:mx-[25%] transition-all duration-500 ease-in-out bg-gradient-to-b from-transparent sm:from-[24.52%] to-transparent backdrop-blur-[2px]'
                    style={{ height: fullscreen ? '70%' : '' }}
                >
                    {isMobile ? ( 
                    <MobileSearchbar
                        fullscreen={fullscreen}
                        setFullscreen={setFullscreen}
                        width={100}
                        fullHeight={90}
                        height={100}
                    />
                    ) : (
                        <SearchBar
                            fullscreen={fullscreen}
                            setFullscreen={setFullscreen}
                            width={100}
                        fullHeight={90}
                        height={100}
                    />
                    )}

                </div>

                <div className="absolute sm:hidden md:hidden bottom-0 right-0 w-[172px] h-[172px]">
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