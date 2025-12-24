import React, { useState } from 'react';
import NLogo from '@/assets/icons/NLogo';
import WhLogo from '@/assets/icons/WhLogo';
import WhSearch from '@/assets/icons/WhSearch';
import WhSide from '@/assets/icons/WhSide';
import MobileMenu from '@/features/Marketplace/MobileMenu';

interface NavbarProps {
    logoColor?: 'white' | 'normal';
    iconVariant?: 'white' | 'transparent';
    background?: 'transparent' | 'white';
    blur?: boolean;
    profileImg?: string;
    Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    setIsMobileMenu?: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ logoColor = 'normal', background = 'white', blur = false, iconVariant = 'transparent', profileImg, Icon, setIsMobileMenu }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('fr'); // Default language
    const [currentAppMode, setCurrentAppMode] = useState('guest'); // Default app mode

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (setIsMobileMenu) setIsMobileMenu(!isMenuOpen);
    };

    const handleLanguageChange = (languageCode: string) => {
        setCurrentLanguage(languageCode);
        // Here you can add logic to change the app language

    };

    const handleAppModeChange = (appModeCode: string) => {
        setCurrentAppMode(appModeCode);
        // Here you can add logic to change the app mode

    };

    const handleItemPress = (itemId: string) => {
        if (itemId === 'profile') {
           // Navigate to profile
        }
        // Handle other items
    }

    return (
        <nav className={`w-full flex items-center justify-between px-6 py-4 z-50 transition-all duration-300 ${background === 'transparent' ? 'bg-transparent' : 'bg-white'} ${blur ? 'backdrop-blur-md bg-white/30' : ''}`}>
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
                {logoColor === 'white' ? <WhLogo /> : <NLogo />}
            </div>

            {/* Icons (Mobile/Desktop) */}
            <div className="flex items-center gap-4">
                {/* Search Icon (Visible on all sizes logic can be adjusted) */}
                <button className="p-2 rounded-full hover:bg-black/5 transition-colors">
                    <WhSearch color={logoColor === 'white' ? 'white' : 'black'} />
                </button>

                {/* Menu/Profile Icon */}
                <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-black/5 transition-colors focus:outline-none">
                     {/* Dynamic Icon based on props or default WhSide */}
                     {Icon ? <Icon /> : <WhSide color={logoColor === 'white' ? 'white' : 'black'} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <MobileMenu
                isOpen={isMenuOpen}
                onClose={() => {setIsMenuOpen(false); if(setIsMobileMenu) setIsMobileMenu(false);}}
                userProfileImage={profileImg}
                onLanguageChange={handleLanguageChange}
                onAppModeChange={handleAppModeChange}
                onItemClick={handleItemPress}
            />
        </nav>
    );
};

export default Navbar;
