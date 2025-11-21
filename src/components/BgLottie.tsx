import React from 'react'
import Lottie from 'lottie-react'
import animationData from '../components/Lottie/BackgroundLight.json'

function BgLottie() {
  return (
    <div className='fixed inset-0 w-full h-full opacity-100 sm:opacity-20 md:opacity-100 lg:opacity-100 xl:opacity-100 overflow-hidden '>
        <video src="/videos/BackgroundLight.mp4" autoPlay loop muted className='w-full h-full object-cover' />
    </div>
  )
}

export default BgLottie