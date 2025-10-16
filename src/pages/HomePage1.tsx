import React, { useState } from 'react'
import AnimatedGradientBackground from '../components/AnimatedGradientBackground'
import SearchBar from '../components/SearchBar'
import Navbar from '../components/Navbar';

export default function HomePage1() {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated background */}
      <AnimatedGradientBackground />

      {/* Foreground content */}
      <div className="z-10 flex flex-col h-full fixed w-full">
        {/* Navbar */}
        <Navbar logoColor="normal" background="white" iconVariant="transparent" />

        {/* Main content */}
        <div className="flex flex-1 h-full">
          {/* Left Section */}
          <div className='flex flex-col gap-2 w-[50%] justify-center items-center z-10'>
            <p className="font-youngserif font-normal text-[38px] text-center text-nexastay-gradient">Votre logement idéal!</p>
            <p className="font-zalando text-[18px] text-center">Découvrez notre marketplace intelligente</p>
            <SearchBar fullscreen={fullscreen} setFullscreen={setFullscreen} width={80} height={30} fullHeight={60} />
          </div>

          {/* Right Section (Banner) */}
          <div className="w-[60%] h-full flex justify-end items-center overflow-hidden">
            <img
              src="/images/banner.png"
              alt="Banner"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-[172px] h-[172px] z-10">
            <img
              src="/images/bot.png"
              alt="Bot"
              className="w-full h-full animate-float"
            />
          </div>
        </div>
      </div>
    </div>

  )
}
