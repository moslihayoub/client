import React, { useState, useEffect } from 'react'
import Navbar from '@/layouts/Navbar'
import SearchBar from '@/features/Marketplace/SearchBar'
import MobileSearchbar from '@/features/Marketplace/MobileSearchbar'
import WhSide from '@/assets/icons/WhSide';

interface HomePage4Props {
    // Add props if needed
}

function HomePage4({ }: HomePage4Props) {
    const [fullscreen, setFullscreen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [input, setInput] = useState<{ type: 'background' | 'component' }>({ type: 'background' });


    useEffect(() => {
        setIsMobile(window.innerWidth < 400);

    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 400);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Image / Video - Absolute Position */}
            <img
                src="/images/riad.jpg"
                alt="Riad in Marrakech"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />

            {/* Simple Overlay for text readability */}
            <div className={`absolute top-0 left-0 w-full h-full bg-black/30 z-0 transition-all duration-500 ease-in-out ${fullscreen ? "backdrop-blur-sm bg-black/50" : ""}`} />

            {/* Content Container - Z-Index 10 */}
            <div className="relative z-10 flex flex-col h-full w-full">
                <Navbar logoColor="white" background="transparent" iconVariant="white" Icon={WhSide} />

                {/* Main Heading Area */}
                <div className={`flex-1 flex flex-col items-center justify-center -mt-20 px-4 transition-all duration-500 ${fullscreen ? "opacity-0 translate-y-[-20px] pointer-events-none" : "opacity-100"}`}>
                    <h1 className="text-[42px] md:text-[64px] font-bricolagegrotesque font-bold text-white text-center leading-tight drop-shadow-lg max-w-4xl mx-auto">
                        Votre logement idéal, un espace où l'IA améliore votre expérience !
                    </h1>
                    <p className="text-[18px] md:text-[24px] font-vendsans text-white/90 text-center mt-6 max-w-2xl drop-shadow-md">
                        Découvrez notre marketplace intelligente et trouvez le séjour parfait.
                    </p>
                </div>


                {/* Search Bar Area */}
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

                {/* Bot Image */}
                <div className="absolute  sm:hidden md:hidden bottom-0 right-0 w-[172px] h-[172px] z-10 pointer-events-none">
                    <img
                        src="/images/bot.png"
                        alt="NexaVoice Assistant"
                        className="w-full h-full animate-float object-contain"
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage4
