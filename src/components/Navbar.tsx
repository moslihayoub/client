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

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAssistant } from "../contexts/AssistantContext";
import LanguagePopup from "./LanguagePopup";
import MorePopup from "./MorePopup";
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
import Assistant from "../svgs/white/Assistant";
import Plus from "../svgs/white/Plus";
import TrPlus from "../svgs/transparent/TrPlus";
import TrAssistant from "../svgs/transparent/TrAssistant";
import Connect from "../svgs/icons/Connect";
import Connect2 from "../svgs/icons/Connect2";
import ColConnect from "../svgs/colored/ColConnect";
import CliConnect from "../svgs/clicked/CliConnect";
import WhConnect from "../svgs/white/WhConnect";
import ActHeart from "../svgs/active/ActHeart";
import ActBell from "../svgs/active/ActBell";
import ActComparator from "../svgs/active/ActComparator";
import ActConnect from "../svgs/active/ActConnect";
import ColAssistant from "../svgs/colored/ColAssistant";
import CliAssistant from "../svgs/clicked/CliAssistant";
import ColPlus from "../svgs/colored/ColPlus";
import CliPlus from "../svgs/clicked/CliPlus";
import AssistantChat from "./Assistant";
import { useAuth } from "../contexts/AuthContext";

interface NavbarProps {
    iconVariant?: "white" | "transparent"; // optional prop, defaults to transparent
    logoColor?: "normal" | "white"; // optional prop, defaults to normal
    background?: "white" | "transparent"; // optional prop, defaults to transparent
    profileImg?: string; // optional prop, defaults to empty string
    setIsMobileMenu?: (isOpen: boolean) => void; // optional prop, defaults to empty function
    blur?: boolean; // optional prop, defaults to false
    Icon?: React.ComponentType; // optional prop, defaults to transparent
    currentActiveItem?: string; // optional prop, defaults to empty string
}

interface MiddleNavItem {
    id: string;
    name: string;
    TransparentIcon: React.ComponentType;
    WhiteIcon: React.ComponentType;
    ColoredIcon: React.ComponentType;
    ClickedIcon: React.ComponentType;
    ActiveIcon: React.ComponentType;
    size: "normal" | "large";
    onClick?: () => void;
    img?: string;
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
    iconVariant = "white",
    logoColor = "normal",
    background = "white",
    profileImg = "",
    setIsMobileMenu = (isOpen: boolean) => { },
    blur = false,
    Icon = ColSide,
    currentActiveItem = ''
}: NavbarProps) {
    // Force white background and transparent icons on all pages
    iconVariant = "transparent";
    background = "white";
    
    const navigate = useNavigate();
    const [isLanguagePopupOpen, setIsLanguagePopupOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('fr'); // Default to French
    const [isAppModePopupOpen, setIsAppModePopupOpen] = useState(false);
    const [currentAppMode, setCurrentAppMode] = useState('system'); // Default to System
    const [pressedItems, setPressedItems] = useState<Set<string>>(new Set());
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentActiveItemState, setCurrentActiveItemState] = useState(currentActiveItem);
    const { isAssistantOpen, toggleAssistant } = useAssistant();
    const [isMorePopupOpen, setIsMorePopupOpen] = useState(false);
    const [morePopupPosition, setMorePopupPosition] = useState<{ top: number; right: number } | null>(null);
    const moreButtonRef = useRef<HTMLButtonElement>(null);
    const [languagePopupPosition, setLanguagePopupPosition] = useState<{ top: number; right: number } | null>(null);
    const [appModePopupPosition, setAppModePopupPosition] = useState<{ top: number; right: number } | null>(null);
    const { logout, user } = useAuth();
    const isAuthenticated = !!user;

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
        setCurrentActiveItemState(itemId);
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
    const middleNavItems: MiddleNavItem[] = [
        {
            id: "heart",
            name: "Heart",
            TransparentIcon: TrHeart,
            WhiteIcon: Heart,
            ColoredIcon: ColHeart,
            ClickedIcon: CliHeart,
            ActiveIcon: ActHeart,
            size: "normal",
            onClick: () => navigate('/favorites')
        },
        {
            id: "bell",
            name: "Bell",
            TransparentIcon: TrBell,
            WhiteIcon: Bell,
            ColoredIcon: ColBell,
            ClickedIcon: CliBell,
            ActiveIcon: ActBell,
            size: "normal"
        },
        {
            id: "comparator",
            name: "Comparator",
            TransparentIcon: TrComparator,
            WhiteIcon: Comparator,
            ColoredIcon: ColComparator,
            ClickedIcon: CliComparator,
            ActiveIcon: ColComparator,
            size: "normal"
        },
        {
            id: "connect",
            name: "Connect",
            TransparentIcon: Connect,
            WhiteIcon: WhConnect,
            ColoredIcon: ColConnect,
            ClickedIcon: CliConnect,
            ActiveIcon: ActConnect,
            size: "normal",
        },
    ];

    const rightNavItems: NavItem[] = [
        {
            id: "profile",
            name: "Profile",
            TransparentIcon: TrProfile,
            WhiteIcon: Profile,
            ColoredIcon: ColProfile,
            ClickedIcon: CliProfile,
            size: "normal",
            img: profileImg
        },
        {
            id: "assistant",
            name: "Assistant",
            TransparentIcon: TrAssistant,
            WhiteIcon: Assistant,
            ColoredIcon: ColAssistant,
            ClickedIcon: CliAssistant,
            size: "large",
            onClick: toggleAssistant
        },
        {
            id: "more",
            name: "More",
            TransparentIcon: TrPlus,
            WhiteIcon: Plus,
            ColoredIcon: ColPlus,
            ClickedIcon: CliPlus,
            size: "normal",
            onClick: () => {
                if (moreButtonRef.current) {
                    const rect = moreButtonRef.current.getBoundingClientRect();
                    setMorePopupPosition({
                        top: rect.bottom + 8, // 8px below the button
                        right: window.innerWidth - rect.right
                    });
                }
                setIsMorePopupOpen(!isMorePopupOpen);
            }
        }
    ]

    // Determine background class
    const backgroundClass = background === "white" ? "bg-white" : "bg-transparent";

    return (
        <>
            <nav className={`fixed z-30 h-[60px] flex items-center justify-between ${backgroundClass} sm:bg-gradient-to-b ${blur ? 'sm:from-white sm:from-[60.52%] sm:to-transparent' : ''} px-[18px] sm:px-[12px] md:px-[18px] lg:px-[18px] xl:px-[18px] mt-[10px] opacity-100 rounded-full left-[36px] right-[36px] sm:left-[12px] sm:right-[12px] md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-[1000px] lg:left-1/2 lg:-translate-x-1/2 lg:right-auto lg:w-[1000px] xl:left-1/2 xl:-translate-x-1/2 xl:right-auto xl:w-[1000px]`} style={{
                border: '1.5px solid transparent',
                backgroundImage: `${backgroundClass === 'bg-white' ? 'linear-gradient(white, white),' : 'linear-gradient(transparent, transparent),'} radial-gradient(141.56% 141.56% at 50% -7.74%, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-sky-500, #0EA5E9) 50.96%, var(--colors-fuchsia-500, #D946EF) 100%)`,
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box',
            }}>

                {/* Left: Desktop Logo - Visible on lg and xl devices */}
                <div className="flex items-center gap-2 justify-start">
                    {/*logoColor === "normal" ? <NexaLogo /> : <WhiteNexaLogo />*/}
                    <button onClick={() => navigate('/')} className="cursor-pointer">
                        <NexaLogo />
                    </button>
                </div>

                {/* Desktop: Icons */}
                {/* Middle Icons */}
                <div className="hidden md:flex items-center gap-[40px] justify-center h-full">
                    {middleNavItems.map((item) => {
                        const { id, name, TransparentIcon, WhiteIcon, ColoredIcon, ClickedIcon, ActiveIcon, size, onClick, img } = item;
                        if (!isAuthenticated && ["heart", "bell", "comparator", "connect"].includes(id)) {
                            return null;
                        }
                        const buttonSize = size === "large" ? "w-[36px] h-[34px]" : "w-[34px] h-full";
                        const isPressed = pressedItems.has(id);

                        // Special handling for moon/app mode button
                        if (id === "moon") {
                            const currentModeIcons = getCurrentAppModeIcon();
                            const DefaultIcon = currentModeIcons.TransparentIcon;
                            const IconToShow = isPressed ? currentModeIcons.ClickedIcon : DefaultIcon;

                            return (
                                <button
                                    key={id}
                                    className={`${buttonSize} group transition-all duration-150 hover:scale-105 active:scale-95 tooltip-container`}
                                    onMouseDown={() => handleItemPress(id)}
                                    onMouseUp={() => handleItemRelease(id, onClick)}
                                    onTouchStart={() => handleItemPress(id)}
                                    onTouchEnd={() => handleItemRelease(id, onClick)}
                                    aria-label={`App Mode: ${currentAppMode}`}
                                    data-tooltip={`Mode: ${currentAppMode === 'light' ? 'Clair' : currentAppMode === 'dark' ? 'Sombre' : 'Système'}`}
                                >
                                    <IconToShow />
                                    {!isPressed && <currentModeIcons.ColoredIcon />}
                                </button>
                            );
                        }

                        // Regular handling for other buttons
                        const DefaultIcon = TransparentIcon;
                        const isActive = id === currentActiveItemState;
                        const tooltipText = id === "heart" ? "Favoris" : 
                                          id === "bell" ? "Notifications" : 
                                          id === "comparator" ? "Comparateur" : 
                                          id === "connect" ? "Connect" : name;

                        return (
                            <button
                                key={id}
                                className={`${buttonSize} group transition-all duration-150 h-full w-[45px] flex items-center justify-center relative tooltip-container`}
                                onMouseDown={() => handleItemPress(id)}
                                onMouseUp={() => handleItemRelease(id, onClick)}
                                onTouchStart={() => handleItemPress(id)}
                                onTouchEnd={() => handleItemRelease(id, onClick)}
                                aria-label={name}
                                data-tooltip={tooltipText}
                            >
                                {/* Removed gradient underline for active state */}

                                {img ? (
                                    <img src={img} alt="Profile" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <>
                                        {/* Pressed state */}
                                        {isPressed && (
                                            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out">
                                                <ClickedIcon />
                                            </div>
                                        )}
                                        
                                        {/* Active state - always show ActiveIcon */}
                                        {!isPressed && isActive && (
                                            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out">
                                                <ActiveIcon />
                                            </div>
                                        )}
                                        
                                        {/* Default and hover states - both icons rendered simultaneously */}
                                        {!isPressed && !isActive && (
                                            <>
                                                <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-800">
                                                    <DefaultIcon />
                                                </div>
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-800">
                                                    <ColoredIcon />
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Right Icons */}
                <div className="hidden md:flex items-center gap-[24px] justify-end">
                    {!isAuthenticated && (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-3 py-2 text-[15px] font-semibold text-slate-800 rounded-md hover:text-slate-600"
                            >
                                Connexion
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-4 py-2 rounded-full text-slate-600 font-semibold shadow-sm bg-transparent border-2 border-slate-200 transition"
                            >
                                Inscription
                            </button>
                        </div>
                    )}
                    {rightNavItems.map((item) => {
                        const { id, name, TransparentIcon, WhiteIcon, ColoredIcon, ClickedIcon, size, onClick, img } = item;
                        if (!isAuthenticated && ["profile", "assistant", "more"].includes(id)) {
                            return null;
                        }
                        const buttonSize = size === "large" ? "w-[36px] h-[34px]" : "w-[34px] h-[34px]";
                        const isPressed = pressedItems.has(id);

                        // Special handling for moon/app mode button
                        if (id === "moon") {
                            const currentModeIcons = getCurrentAppModeIcon();
                            const DefaultIcon = currentModeIcons.TransparentIcon;
                            const IconToShow = isPressed ? currentModeIcons.ClickedIcon : DefaultIcon;

                            return (
                                <button
                                    key={id}
                                    className={`${buttonSize} group transition-all duration-150 hover:scale-105 active:scale-95 justify-center items-center`}
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

                        const DefaultIcon = TransparentIcon;
                        const IconToShow = isPressed ? ClickedIcon : DefaultIcon;
                        const tooltipText = id === "profile" ? "Profil" : 
                                          id === "assistant" ? "Assistant" : 
                                          id === "more" ? "Plus" : name;

                        return (
                            <button 
                                key={id} 
                                ref={id === "more" ? moreButtonRef : null}
                                className={`${buttonSize} group transition-all duration-150 hover:scale-105 active:scale-95 tooltip-container justify-center items-center`} 
                                onMouseDown={() => handleItemPress(id)} 
                                onMouseUp={() => handleItemRelease(id, onClick)} 
                                onTouchStart={() => handleItemPress(id)} 
                                onTouchEnd={() => handleItemRelease(id, onClick)} 
                                aria-label={name}
                                data-tooltip={tooltipText}
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
                    className="md:hidden w-[34px] h-[34px] flex flex-col justify-center items-center gap-1 tooltip-container"
                    onClick={() => {
                        setIsMobileMenuOpen(!isMobileMenuOpen);
                        setIsMobileMenu(!isMobileMenuOpen);
                    }}
                    aria-label="Toggle mobile menu"
                    data-tooltip="Menu"
                >
                    {/*<Icon />*/}
                    <ColSide />
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
                position={languagePopupPosition || undefined}
            />

            {/* App Mode Popup */}
            <AppModePopup
                isOpen={isAppModePopupOpen}
                onClose={() => setIsAppModePopupOpen(false)}
                onAppModeChange={handleAppModeChange}
                currentAppMode={currentAppMode}
                position={appModePopupPosition || undefined}
            />

            {/* More Popup */}
            <MorePopup
                isOpen={isMorePopupOpen}
                onClose={() => {
                    setIsMorePopupOpen(false);
                    setIsAppModePopupOpen(false);
                    setIsLanguagePopupOpen(false);
                }}
                position={morePopupPosition || undefined}
                onAppModeClick={() => {
                    setIsLanguagePopupOpen(false);
                    if (morePopupPosition) {
                        // Position AppMode popup to the right of More popup
                        setAppModePopupPosition({
                            top: morePopupPosition.top,
                            right: morePopupPosition.right - 180 - 8 // Language popup width (~180px) + gap (8px)
                        });
                    }
                    setIsAppModePopupOpen(true);
                }}
                onLanguageClick={() => {
                    setIsAppModePopupOpen(false);
                    if (morePopupPosition) {
                        // Position Language popup to the right of More popup
                        setLanguagePopupPosition({
                            top: morePopupPosition.top,
                            right: morePopupPosition.right - 180 - 8 // Language popup width (~180px) + gap (8px)
                        });
                    }
                    setIsLanguagePopupOpen(true);
                }}
                onLogout={
                    user
                        ? () => {
                            logout();
                            navigate('/login');
                        }
                        : undefined
                }
            />

            {/* Assistant Chat */}
            <AssistantChat isOpen={isAssistantOpen} onClose={() => toggleAssistant()} />
        </>
    );
}
