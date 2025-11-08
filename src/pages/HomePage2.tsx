import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import MobileSearchbar from '../components/MobileSearchbar'
import Navbar from '../components/Navbar';
import BgLottie from '../components/BgLottie';

function HomePage2() {
    const [fullscreen, setFullscreen] = useState(false);
    const [mobileFullscreen, setMobileFullscreen] = useState(false);

    return (
        <div className="fixed w-full h-screen overflow-hidden">
            {/* Animated background */}
            <BgLottie />

            {/* Foreground content */}
            <div className="z-10 flex flex-col h-full fixed w-full">
                {/* Navbar */}
                <Navbar logoColor="normal" background="transparent" iconVariant="transparent" />

                {/* Desktop Layout - Hidden on mobile */}
                <div className="hidden md:flex flex-col justify-center items-center h-full mt-2">
                    <div className="flex flex-row items-center justify-center gap-[72px] w-full">
                        {/* Left Section */}
                        <div className='flex flex-col gap-[18px] justify-center items-center w-[559px] h-[335px]'>
                            <div className='flex flex-col gap-[8px] justify-center items-center'>
                                <p className="font-youngserif font-normal text-[38px] text-center text-nexastay-gradient leading-[36px]">Votre logement idéal!</p>
                                <p className="font-outfit font-medium text-[24px] text-center leading-[36px] text-slate-900">Découvrez notre marketplace intelligente</p>
                            </div>
                            <SearchBar fullscreen={fullscreen} setFullscreen={setFullscreen} width={100} height={40} fullHeight={100} />
                        </div>

                        {/* Right Section (Banner) */}
                        <div className="w-[39%] h-[80%] overflow-hidden rounded-[14px] bg-transparent flex items-center justify-center max-w-full max-h-full">
                            <img
                                src={'/images/banner2.png'}
                                alt="Banner"
                                className="object-cover max-w-full max-h-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Mobile Layout - Visible only on mobile */}
                <div className="md:hidden flex flex-col items-center justify-center mt-[20%] gap-[18px] h-full w-full ">
                    {/* Title */}
                    <div className={`flex flex-col gap-[8px] justify-center items-center transition-all duration-500 ${mobileFullscreen ? 'blur-sm' : ''}`}>
                        <p className="font-youngserif font-normal text-[24px] text-center text-nexastay-gradient leading-[24px]">Votre logement idéal!</p>
                        <p className="font-outfit font-medium text-[18px] text-center leading-[24px] text-slate-900">Découvrez notre marketplace intelligente</p>
                    </div>
                    {/* Image Section - Pushed up */}
                    <div className={`flex-1 flex items-start justify-center w-full px-4 pb-24 transition-all duration-500 ${mobileFullscreen ? 'blur-sm' : ''}`}>
                        <div className="w-full h-[85%] overflow-hidden rounded-[30px] bg-transparent flex items-start justify-center">
                            <img
                                src={'/images/banner-mobile.png'}
                                alt="Banner"
                                className="object-cover h-full max-w-full max-h-full rounded-[30px]"
                            />
                        </div>
                    </div>

                    {/* Mobile Search Bar - Fixed at bottom */}
                    <div className='fixed rounded-[22px] z-20 bottom-0 left-0 h-[25%] w-[30%] sm:w-full md:w-[50%] flex items-end justify-center px-[16px] mx-0 md:mx-[25%] transition-all duration-500 ease-in-out mb-2 '
                    style={{ height: mobileFullscreen ? '70%' : '' }}
                >
                        <MobileSearchbar
                        fullscreen={mobileFullscreen}
                        setFullscreen={setMobileFullscreen}
                        width={100}
                        fullHeight={90}
                        height={80}
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage2