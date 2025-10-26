import React, { useState, useEffect } from 'react'
import MobileSearchbar from './MobileSearchbar'

function MobileOverlay({ setIsMobileSearchOpen }: { setIsMobileSearchOpen: (isOpen: boolean) => void }) {
    const [isVisible, setIsVisible] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);

    useEffect(() => {
        // Trigger fade-in animation
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        // Wait for animation to complete before closing
        setTimeout(() => {
            setIsMobileSearchOpen(false);
        }, 300);
    };

    return (
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-30 flex flex-col justify-end items-center pb-8 transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
            <div className={`relative gap-2 flex flex-col items-end justify-end w-full max-w-md px-4 transition-transform duration-300 ${
                isVisible ? 'translate-y-0' : 'translate-y-full'
            }`}
            style={{
                height: `${fullscreen ? '50%' : 'auto'}`,
            }}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className=" w-[56px] h-[56px] flex items-center justify-center rounded-full shadow-lg"
                    style={{
                        background:
                            'radial-gradient(141.56% 141.56% at 50% -7.74%, #2DD4BF 0%, #0EA5E9 50.96%, #D946EF 100%)',
                    }}
                >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.6666 13.9987C25.6666 20.4422 20.4434 25.6654 13.9999 25.6654C7.55642 25.6654 2.33325 20.4422 2.33325 13.9987C2.33325 7.5552 7.55642 2.33203 13.9999 2.33203C20.4434 2.33203 25.6666 7.5552 25.6666 13.9987ZM10.4649 10.4637C10.629 10.2998 10.8514 10.2078 11.0833 10.2078C11.3151 10.2078 11.5375 10.2998 11.7016 10.4637L13.9999 12.762L16.2983 10.4637C16.4641 10.3091 16.6835 10.225 16.9102 10.229C17.1369 10.233 17.3532 10.3248 17.5135 10.4851C17.6738 10.6455 17.7656 10.8617 17.7696 11.0884C17.7736 11.3151 17.6895 11.5345 17.5349 11.7004L15.2366 13.9987L17.5349 16.297C17.6895 16.4629 17.7736 16.6823 17.7696 16.909C17.7656 17.1357 17.6738 17.3519 17.5135 17.5123C17.3532 17.6726 17.1369 17.7644 16.9102 17.7684C16.6835 17.7724 16.4641 17.6883 16.2983 17.5337L13.9999 15.2354L11.7016 17.5337C11.5357 17.6883 11.3163 17.7724 11.0896 17.7684C10.863 17.7644 10.6467 17.6726 10.4864 17.5123C10.326 17.3519 10.2342 17.1357 10.2302 16.909C10.2262 16.6823 10.3104 16.4629 10.4649 16.297L12.7633 13.9987L10.4649 11.7004C10.3011 11.5363 10.209 11.3139 10.209 11.082C10.209 10.8502 10.3011 10.6278 10.4649 10.4637Z" fill="white" />
                    </svg>
                </button>

                {/* Mobile Search Bar */}
                <div className="w-full bg-transparent"
                style={{
                    height: `${fullscreen ? '100%' : 'auto'}`,
                }}>
                    <MobileSearchbar
                        fullscreen={fullscreen}
                        setFullscreen={setFullscreen}
                        width={100}
                        height={100}
                        fullHeight={100}
                    />
                </div>
                </div>
        </div>

    )
}

export default MobileOverlay