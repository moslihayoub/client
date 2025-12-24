import React, { useState, useEffect } from 'react'
import Navbar from '@/layouts/Navbar'
import SearchBar from '@/features/Marketplace/SearchBar'
import MobileSearchbar from '@/features/Marketplace/MobileSearchbar'
import WhSide from '@/assets/icons/WhSide';

interface HomePage5Props {
    // Add props
}

function HomePage5({ }: HomePage5Props) {
    const [fullscreen, setFullscreen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [input, setInput] = useState<{ type: 'background' | 'component' }>({ type: 'background' });

    useEffect(() => {
        setIsMobile(window.innerWidth < 400);

    }, []);

    //ok hsjhsjh

    return (
        <div className="relative w-full h-screen overflow-hidden bg-slate-900">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-60"
            // src="/videos/hero-background.mp4" // You would need a video here
            // style={{ backgroundImage: 'url("/images/riad.jpg")' }} // Fallback
            >
                 <source src="/videos/hero-background.mp4" type="video/mp4" />
                {/* Fallback image if video fails or not supported */}
                <img src="/images/riad.jpg" className="w-full h-full object-cover" alt="Background" />
            </video>

            <div className="z-10 flex flex-col h-full fixed w-full">
                <Navbar logoColor="white" background="transparent" iconVariant="white" Icon={WhSide} />

                {/* Main content area - takes remaining space and centers content */}
                {input.type === 'background' && (
                    <div className={`flex-1 flex items-center justify-center  ${fullscreen ? "blur-md" : ""}`}>
                        <div className='flex flex-col gap-[26px] justify-center items-center w-[1160px] h-[198px] px-0 sm:px-[16px] md:px-0 '>
                            <p className='font-bricolagegrotesque font-semibold text-[56px] sm:text-[36px] md:text-[56px] text-center text-white leading-[64px] sm:leading-[48px] md:leading-[64px]'>Votre logement idéal, un espace où l'IA améliore votre expérience !</p>
                            <p className=' text-[24px] sm:text-[20px] md:text-[24px] text-center font-vendsans font-medium text-white leading-[36px] sm:leading-[24px] md:leading-[36px]'>Découvrez notre marketplace intelligente</p>
                        </div>
                    </div>
                )}

                <div className={`fixed rounded-[22px] z-20 bottom-0 left-0 h-[25%] w-[30%] sm:w-full md:w-[50%] flex items-end justify-center p-4 mx-0 md:mx-[25%] transition-all duration-500 ease-in-out ${isMobile ? 'mb-[50px]' : ''} `}
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
                        alt="NexaVoice Assistant - Votre aide intelligente pour vos voyages"
                        className="w-full h-full animate-float"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage5
