/**
 * Navbar Component
 * 
 * A flexible navigation bar component that supports different icon variants and backgrounds.
 * 
 * @example
 * // Transparent navbar with transparent icons (default)
 * <Navbar />
 * 
 * // White navbar with white icons
 * <Navbar iconVariant="white" background="white" />
 * 
 * // Transparent navbar with white logo and transparent icons
 * <Navbar logoColor="white" iconVariant="transparent" background="transparent" />
 * 
 * @param iconVariant - "white" | "transparent" - Choose between white or transparent icons
 * @param logoColor - "normal" | "white" - Choose between normal or white logo
 * @param background - "white" | "transparent" - Choose between white or transparent background
 */

import React, { useState } from "react";
import LanguagePopup from "./LanguagePopup";
import Heart from "../svgs/white/Heart";
import Bell from "../svgs/white/Bell";
import Comparator from "../svgs/white/Comparator";
import Earth from "../svgs/white/Earth";
import Profile from "../svgs/white/Profile";
import Moon from "../svgs/white/Moon";
import ColHeart from "../svgs/colored/ColHeart";
import ColBell from "../svgs/colored/ColBell";
import ColComparator from "../svgs/colored/ColComparator";
import ColEarth from "../svgs/colored/ColEarth";
import ColProfile from "../svgs/colored/ColProfile";
import ColMoon from "../svgs/colored/ColMoon";
import NexaLogo from "../svgs/logos/NexaLogo";
import WhiteNexaLogo from "../svgs/logos/WhiteNexaLogo";
import TrHeart from "../svgs/transparent/TrHeart";
import TrBell from "../svgs/transparent/TrBell";
import TrComparator from "../svgs/transparent/TrComparator";
import TrProfile from "../svgs/transparent/TrProfile";
import TrEarth from "../svgs/transparent/TrEarth";
import TrMoon from "../svgs/transparent/TrMoon";
import AppModePopup from "./AppModePopup";
import CliHeart from "../svgs/clicked/CliHeart";
import CliBell from "../svgs/clicked/CliBell";
import CliComparator from "../svgs/clicked/CliComparator";
import CliEarth from "../svgs/clicked/CliEarth";
import CliProfile from "../svgs/clicked/CliProfile";
import TrSun from "../svgs/transparent/TrSun";
import TrSystem from "../svgs/transparent/TrSystem";
import ColSun from "../svgs/colored/ColSun";
import Sun from "../svgs/white/Sun";
import System from "../svgs/white/System";
import ColSystem from "../svgs/colored/ColSystem";
import CliSun from "../svgs/clicked/CliSun";
import CliMoon from "../svgs/clicked/CliMoon";
import CliSystem from "../svgs/clicked/CliSystem";
import ColSide from "../svgs/colored/ColSide";
import Sidebar from "./Sidebar";
import { Icon } from "lucide-react";

interface NavbarProps {
    iconVariant?: "white" | "transparent"; // optional prop, defaults to transparent
    logoColor?: "normal" | "white"; // optional prop, defaults to normal
    background?: "white" | "transparent"; // optional prop, defaults to transparent
    profileImg?: string; // optional prop, defaults to empty string
    setIsMobileMenu?: (isOpen: boolean) => void; // optional prop, defaults to empty function
    blur?: boolean; // optional prop, defaults to false
    Icon?: React.ComponentType; // optional prop, defaults to transparent
}

interface NavItem {
    id: string;
    name: string;
    TransparentIcon: React.ComponentType;
    WhiteIcon: React.ComponentType;
    ColoredIcon: React.ComponentType;
    ClickedIcon: React.ComponentType;
    size: "normal" | "large";
    onClick?: () => void;
    img?: string;
}

export default function Navbar({
    iconVariant = "transparent",
    logoColor = "normal",
    background = "transparent",
    profileImg = "",
    setIsMobileMenu = (isOpen: boolean) => {},
    blur = false,
    Icon = ColSide
}: NavbarProps) {
    const [isLanguagePopupOpen, setIsLanguagePopupOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('fr'); // Default to French
    const [isAppModePopupOpen, setIsAppModePopupOpen] = useState(false);
    const [currentAppMode, setCurrentAppMode] = useState('system'); // Default to System
    const [pressedItems, setPressedItems] = useState<Set<string>>(new Set());
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLanguageChanging = () => {
        setIsLanguagePopupOpen(!isLanguagePopupOpen);
    };

    const handleLanguageChange = (languageCode: string) => {
        setCurrentLanguage(languageCode);
        // Here you can add logic to change the app language
        console.log('Language changed to:', languageCode);
    };

    const handleAppModeChanging = () => {
        setIsAppModePopupOpen(!isAppModePopupOpen);
    };

    const handleAppModeChange = (appModeCode: string) => {
        setCurrentAppMode(appModeCode);
        // Here you can add logic to change the app mode
        console.log('App mode changed to:', appModeCode);
    };

    const handleItemPress = (itemId: string) => {
        // Show pressed state
        setPressedItems(prev => new Set(prev).add(itemId));
    };

    const handleItemRelease = (itemId: string, originalOnClick?: () => void) => {
        // Hide pressed state after a short delay
        setTimeout(() => {
            setPressedItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(itemId);
                return newSet;
            });
        }, 150); // Show pressed state for 150ms

        // Call original onClick if it exists
        if (originalOnClick) {
            originalOnClick();
        }
    };

    // Get current app mode icon based on currentAppMode
    const getCurrentAppModeIcon = () => {
        switch (currentAppMode) {
            case 'light':
                return {
                    TransparentIcon: TrSun,
                    WhiteIcon: Sun, // Using transparent as fallback for white
                    ColoredIcon: ColSun,
                    ClickedIcon: CliSun
                };
            case 'dark':
                return {
                    TransparentIcon: TrMoon,
                    WhiteIcon: Moon,
                    ColoredIcon: ColMoon,
                    ClickedIcon: CliMoon
                };
            case 'system':
            default:
                return {
                    TransparentIcon: TrSystem,
                    WhiteIcon: System, // Using transparent as fallback for white
                    ColoredIcon: ColSystem, // Using transparent as fallback for colored
                    ClickedIcon: CliSystem
                };
        }
    };

    // Navigation items configuration
    const navItems: NavItem[] = [
        {
            id: "heart",
            name: "Heart",
            TransparentIcon: TrHeart,
            WhiteIcon: Heart,
            ColoredIcon: ColHeart,
            ClickedIcon: CliHeart,
            size: "normal"
        },
        {
            id: "bell",
            name: "Bell",
            TransparentIcon: TrBell,
            WhiteIcon: Bell,
            ColoredIcon: ColBell,
            ClickedIcon: CliBell,
            size: "normal"
        },
        {
            id: "comparator",
            name: "Comparator",
            TransparentIcon: TrComparator,
            WhiteIcon: Comparator,
            ColoredIcon: ColComparator,
            ClickedIcon: CliComparator,
            size: "normal"
        },
        {
            id: "earth",
            name: "Earth",
            TransparentIcon: TrEarth,
            WhiteIcon: Earth,
            ColoredIcon: ColEarth,
            ClickedIcon: CliEarth,
            size: "normal",
            onClick: handleLanguageChanging
        },
        {
            id: "profile",
            name: "Profile",
            TransparentIcon: TrProfile,
            WhiteIcon: Profile,
            ColoredIcon: ColProfile,
            ClickedIcon: CliProfile,
            size: "large",
            img: profileImg
        },
        {
            id: "moon",
            name: "Moon",
            TransparentIcon: TrMoon,
            WhiteIcon: Moon,
            ColoredIcon: ColMoon,
            ClickedIcon: CliMoon,
            size: "normal",
            onClick: handleAppModeChanging
        }
    ];

    // Determine background class
    const backgroundClass = background === "white" ? "bg-white" : "bg-transparent";

  return (
        <>
            <nav className={`z-30 w-full h-[10%] flex fixed items-center justify-between ${backgroundClass} sm:bg-gradient-to-b ${blur ? 'sm:from-white sm:from-[24.52%] sm:to-transparent sm:backdrop-blur-[2px]' : ''} px-[36px] py-[18px] opacity-100`}>

                {/* Left: Desktop Logo - Visible on lg and xl devices */}
      <div className="flex items-center gap-2">
                    {logoColor === "normal" ? <NexaLogo /> : <WhiteNexaLogo />}
      </div>

                {/* Desktop: Icons */}
                <div className="hidden md:flex items-center gap-[24px]">
                    {navItems.map((item) => {
                        const { id, name, TransparentIcon, WhiteIcon, ColoredIcon, ClickedIcon, size, onClick, img } = item;
                        const buttonSize = size === "large" ? "w-[36px] h-[34px]" : "w-[34px] h-[34px]";
                        const isPressed = pressedItems.has(id);

                        // Special handling for moon/app mode button
                        if (id === "moon") {
                            const currentModeIcons = getCurrentAppModeIcon();
                            const DefaultIcon = iconVariant === "white" ? currentModeIcons.WhiteIcon : currentModeIcons.TransparentIcon;
                            const IconToShow = isPressed ? currentModeIcons.ClickedIcon : DefaultIcon;

                            return (
                                <button
                                    key={id}
                                    className={`${buttonSize} group transition-all duration-150 hover:scale-105 active:scale-95`}
                                    onMouseDown={() => handleItemPress(id)}
                                    onMouseUp={() => handleItemRelease(id, onClick)}
                                    onTouchStart={() => handleItemPress(id)}
                                    onTouchEnd={() => handleItemRelease(id, onClick)}
                                    aria-label={`App Mode: ${currentAppMode}`}
                                >
                                    <IconToShow />
                                    {!isPressed && <currentModeIcons.ColoredIcon />}
                                </button>
                            );
                        }

                        // Regular handling for other buttons
                        const DefaultIcon = iconVariant === "white" ? WhiteIcon : TransparentIcon;
                        const IconToShow = isPressed ? ClickedIcon : DefaultIcon;

                        return (
                            <button
                                key={id}
                                className={`${buttonSize} group transition-all duration-150 hover:scale-105 active:scale-95`}
                                onMouseDown={() => handleItemPress(id)}
                                onMouseUp={() => handleItemRelease(id, onClick)}
                                onTouchStart={() => handleItemPress(id)}
                                onTouchEnd={() => handleItemRelease(id, onClick)}
                                aria-label={name}
                            >
                                {img ? (
                                    <img src={img} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <>
                                        <IconToShow />
                                        {!isPressed && <ColoredIcon />}
                                    </>
                                )}
          </button>
                        );
                    })}
      </div>

                {/* Mobile: Hamburger Menu */}
                <button
                    className="md:hidden w-[34px] h-[34px] flex flex-col justify-center items-center gap-1"
                    onClick={() => {
                        setIsMobileMenuOpen(!isMobileMenuOpen);
                        setIsMobileMenu(!isMobileMenuOpen);
                    }}
                    aria-label="Toggle mobile menu"
                >
                    <Icon />
                </button>
    </nav>

            {/* Mobile Sidebar */}
            <Sidebar 
                isOpen={isMobileMenuOpen} 
                onClose={() => {
                    setIsMobileMenuOpen(false);
                    setIsMobileMenu(false);
                }} 
            />

            {/* Language Popup */}
            <LanguagePopup
                isOpen={isLanguagePopupOpen}
                onClose={() => setIsLanguagePopupOpen(false)}
                onLanguageChange={handleLanguageChange}
                currentLanguage={currentLanguage}
            />

            {/* App Mode Popup */}
            <AppModePopup
                isOpen={isAppModePopupOpen}
                onClose={() => setIsAppModePopupOpen(false)}
                onAppModeChange={handleAppModeChange}
                currentAppMode={currentAppMode}
            />
        </>
  );
}
