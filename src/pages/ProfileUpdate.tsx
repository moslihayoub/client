import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import InfoPerso from '../components/profile/update/InfoPerso';
import Security from '../components/profile/update/Security';

interface ProfileUpdateProps {
    onBack?: () => void;
}

function ProfileUpdate({ onBack }: ProfileUpdateProps) {
    const handleUpdate = (data: any) => {
        // Here you would typically send the data to your backend API
    };

    return (
        <motion.div
            className={`${onBack ? 'h-full' : 'min-h-screen'} bg-slate-50 w-full overflow-x-hidden overflow-y-auto `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {!onBack && (
                <Navbar
                    iconVariant="transparent"
                    logoColor="normal"
                    background="white"
                    blur={true}
                    profileImg="/users/user1.png"
                />
            )}

            <div className={`${onBack ? 'pt-6' : 'pt-[10%]'} px-[36px] sm:px-[12px] md:px-[36px] lg:px-[36px] xl:px-[36px] ${onBack ? 'pb-[120px]' : 'pb-8'}`}>
                <div className="max-w-4xl mx-auto flex flex-col gap-[12px]">
                    <InfoPerso onUpdate={handleUpdate} />
                    <Security />
                </div>
            </div>

            {/* Fixed Bottom Section */}
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-tl-[32px] rounded-tr-[32px] shadow-[0px_-2px_10px_-6px_rgba(0,0,0,0.1),0px_20px_25px_-5px_rgba(0,0,0,0.1)] px-[10px] pt-[14px] pb-[10px] z-50">
                <div className="max-w-4xl mx-auto flex gap-[10px] items-center">
                    {/* Annuler Button */}
                    <button className="flex-1 bg-slate-900 rounded-full px-[24px] py-[18px] flex items-center justify-center gap-[12px] cursor-pointer hover:opacity-90 transition-opacity shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12ZM8.97 8.97C9.11063 8.82955 9.30125 8.75066 9.5 8.75066C9.69875 8.75066 9.88937 8.82955 10.03 8.97L12 10.94L13.97 8.97C14.1122 8.83752 14.3002 8.7654 14.4945 8.76882C14.6888 8.77225 14.8742 8.85097 15.0116 8.98838C15.149 9.12579 15.2277 9.31118 15.2312 9.50548C15.2346 9.69978 15.1625 9.88783 15.03 10.03L13.06 12L15.03 13.97C15.1625 14.1122 15.2346 14.3002 15.2312 14.4945C15.2277 14.6888 15.149 14.8742 15.0116 15.0116C14.8742 15.149 14.6888 15.2277 14.4945 15.2312C14.3002 15.2346 14.1122 15.1625 13.97 15.03L12 13.06L10.03 15.03C9.88783 15.1625 9.69978 15.2346 9.50548 15.2312C9.31118 15.2277 9.12579 15.149 8.98838 15.0116C8.85097 14.8742 8.77225 14.6888 8.76882 14.4945C8.7654 14.3002 8.83752 14.1122 8.97 13.97L10.94 12L8.97 10.03C8.82955 9.88937 8.75066 9.69875 8.75066 9.5C8.75066 9.30125 8.82955 9.11063 8.97 8.97Z" fill="white" />
                        </svg>


                        <p className="text-[18px] font-bricolagegrotesque font-semibold leading-[28px] text-white">
                            Annuler
                        </p>
                    </button>

                    {/* Confirmer Button */}
                    <button
                        className="flex-1 rounded-full px-[24px] py-[18px] flex items-center justify-center gap-[12px] cursor-pointer hover:opacity-90 transition-opacity shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]"
                        style={{
                            background: 'radial-gradient(141.56% 141.56% at 50% -7.74%, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-sky-500, #0EA5E9) 50.96%, var(--colors-fuchsia-500, #D946EF) 100%)'
                        }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12ZM16.03 8.97C16.1705 9.11063 16.2493 9.30125 16.2493 9.5C16.2493 9.69875 16.1705 9.88937 16.03 10.03L11.03 15.03C10.8894 15.1705 10.6988 15.2493 10.5 15.2493C10.3012 15.2493 10.1106 15.1705 9.97 15.03L7.97 13.03C7.89631 12.9613 7.83721 12.8785 7.79622 12.7865C7.75523 12.6945 7.73319 12.5952 7.73141 12.4945C7.72963 12.3938 7.74816 12.2938 7.78588 12.2004C7.8236 12.107 7.87974 12.0222 7.95096 11.951C8.02218 11.8797 8.10701 11.8236 8.2004 11.7859C8.29379 11.7482 8.39382 11.7296 8.49452 11.7314C8.59522 11.7332 8.69454 11.7552 8.78654 11.7962C8.87854 11.8372 8.96134 11.8963 9.03 11.97L10.5 13.44L12.735 11.205L14.97 8.97C15.1106 8.82955 15.3012 8.75066 15.5 8.75066C15.6988 8.75066 15.8894 8.82955 16.03 8.97Z" fill="white" />
                        </svg>

                        <p className="text-[18px] font-bricolagegrotesque font-semibold leading-[28px] text-white">
                            Confirmer
                        </p>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default ProfileUpdate;