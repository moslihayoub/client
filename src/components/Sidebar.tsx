import React from "react";
import ColLeftArrow from "../svgs/colored/ColLeftArrow";
import ColMenu from "../svgs/colored/ColMenu";
import NexaLogo from "../svgs/logos/NexaLogo";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const sidebarItems = [
        {
            id: "profil",
            name: "Voir le profil",
            icon: "profile",
            onClick: () => console.log("Profil clicked")
        },
        {
            id: "bookmark",
            name: "Bookmark",
            icon: "bookmark",
            onClick: () => console.log("Bookmark clicked")
        },
        {
            id: "historique",
            name: "Historique",
            icon: "calendar",
            onClick: () => console.log("Historique clicked")
        },
        {
            id: "logement",
            name: "Logement",
            icon: "home",
            onClick: () => console.log("Logement clicked")
        },
        {
            id: "services",
            name: "Services",
            icon: "telescope",
            onClick: () => console.log("Services clicked")
        },
        {
            id: "experiences",
            name: "Expériences",
            icon: "ruler",
            onClick: () => console.log("Expériences clicked")
        },
        {
            id: "connect",
            name: "Connect",
            icon: "atom",
            onClick: () => console.log("Connect clicked")
        }
    ];

    const settingsItems = [
        {
            id: "langues",
            name: "Langues",
            icon: "earth",
            onClick: () => console.log("Langues clicked")
        },
        {
            id: "mode",
            name: "Mode jour",
            icon: "sun",
            onClick: () => console.log("Mode clicked")
        },
        {
            id: "notifications",
            name: "Notifications",
            icon: "bell",
            onClick: () => console.log("Notifications clicked")
        },
        {
            id: "aide",
            name: "Obtenir de l'aide",
            icon: "info",
            onClick: () => console.log("Aide clicked")
        },
        {
            id: "support",
            name: "Contactez support",
            icon: "chat",
            onClick: () => console.log("Support clicked")
        }
    ];

    const handleItemClick = (onClick: () => void) => {
        onClick();
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-30 md:hidden transition-all duration-300 ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            >
                <div
                    className="absolute inset-0 bg-black bg-opacity-50"
                    onClick={onClose}
                ></div>

                {/* Sidebar */}
                <div className={`absolute right-0 top-0 h-full w-full bg-white shadow-2xl transition-transform duration-300 flex flex-col ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <ColMenu />
                        </div>
                        <button
                            className="w-8 h-8 flex items-center justify-center"
                            onClick={onClose}
                            aria-label="Close menu"
                        >
                            <ColLeftArrow />
                        </button>
                    </div>

                    {/* Sidebar Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="flex flex-col gap-7">
                            {/* Search Bar */}
                            <div className="bg-white border-[1.5px] border-teal-400 border-solid rounded-[22px] px-[18px] py-[12px] flex items-center gap-4">
                                <div className="flex items-center gap-2 flex-1">
                                    <div className="w-7 h-7 flex items-center justify-center">
                                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 21C17.1944 21 21 17.1944 21 12.5C21 7.80558 17.1944 4 12.5 4C7.80558 4 4 7.80558 4 12.5C4 17.1944 7.80558 21 12.5 21Z" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M19.5 19.5L24 24" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <span className="text-slate-400 text-xl font-outfit">Rechercher</span>
                                </div>
                                <div className="w-11 h-11 flex items-center justify-center">
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36C28.8366 36 36 28.8366 36 20C36 11.1634 28.8366 4 20 4Z" fill="url(#paint0_radial_ai)" />
                                        <path d="M20 12C15.5817 12 12 15.5817 12 20C12 24.4183 15.5817 28 20 28C24.4183 28 28 24.4183 28 20C28 15.5817 24.4183 12 20 12Z" fill="white" />
                                        <defs>
                                            <radialGradient id="paint0_radial_ai" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 4) rotate(90) scale(32)">
                                                <stop stopColor="#2DD4BF" />
                                                <stop offset="0.509615" stopColor="#0EA5E9" />
                                                <stop offset="1" stopColor="#D946EF" />
                                            </radialGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>

                            {/* Accueil - Special item with Nexa logo */}
                            <button
                                className="flex items-center gap-3 px-0 py-2 rounded-lg hover:bg-gray-100 transition-all duration-150 w-full"
                                onClick={() => handleItemClick(() => console.log("Accueil clicked"))}
                            >
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <NexaLogo />
                                </div>
                                <span className="text-slate-950 text-xl font-outfit font-normal leading-8 flex-1 text-left">
                                    Accueil
                                </span>
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 18L15 12L9 6" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </button>

                            {/* Main Navigation Items */}
                            <div className="flex flex-col gap-7">
                                {sidebarItems.map((item) => {
                                    const getIcon = (iconType: string) => {
                                        switch (iconType) {
                                            case "profile":
                                                return (
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16 16C18.7614 16 21 13.7614 21 11C21 8.23858 18.7614 6 16 6C13.2386 6 11 8.23858 11 11C11 13.7614 13.2386 16 16 16Z" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M26 26C26 21.5817 21.5228 18 16 18C10.4772 18 6 21.5817 6 26" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                );
                                            case "bookmark":
                                                return (
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 4C6.89543 4 6 4.89543 6 6V28L16 22L26 28V6C26 4.89543 25.1046 4 24 4H8Z" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                );
                                            case "calendar":
                                                return (
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M26 6H6C4.89543 6 4 6.89543 4 8V26C4 27.1046 4.89543 28 6 28H26C27.1046 28 28 27.1046 28 26V8C28 6.89543 27.1046 6 26 6Z" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M22 2V6M10 2V6M4 10H28" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                );
                                            case "home":
                                                return (
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4 12L16 2L28 12V26C28 27.1046 27.1046 28 26 28H6C4.89543 28 4 27.1046 4 26V12Z" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M12 28V18H20V28" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                );
                                            case "telescope":
                                                return (
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 8L16 16L24 8" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M16 16V28" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M12 20L20 20" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                );
                                            case "ruler":
                                                return (
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M4 8H28M4 16H28M4 24H28" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M8 4V28M16 4V28M24 4V28" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                );
                                            case "atom":
                                                return (
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="16" cy="16" r="3" stroke="#475569" strokeWidth="1.5"/>
                                                        <path d="M16 4C20.4183 4 24 7.58172 24 12C24 16.4183 20.4183 20 16 20C11.5817 20 8 16.4183 8 12C8 7.58172 11.5817 4 16 4Z" stroke="#475569" strokeWidth="1.5"/>
                                                        <path d="M16 12C20.4183 12 24 15.5817 24 20C24 24.4183 20.4183 28 16 28C11.5817 28 8 24.4183 8 20C8 15.5817 11.5817 12 16 12Z" stroke="#475569" strokeWidth="1.5"/>
                                                    </svg>
                                                );
                                            default:
                                                return (
                                                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                                                );
                                        }
                                    };

                                    return (
                                        <button
                                            key={item.id}
                                            className="flex items-center gap-3 px-0 py-2 rounded-lg hover:bg-gray-100 transition-all duration-150 w-full"
                                            onClick={() => handleItemClick(item.onClick)}
                                        >
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                {getIcon(item.icon)}
                                            </div>
                                            <span className="text-slate-950 text-xl font-outfit font-normal leading-8 flex-1 text-left">
                                                {item.name}
                                            </span>
                                            <div className="w-6 h-6 flex items-center justify-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 18L15 12L9 6" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Divider */}
                            <div className="w-full h-px bg-slate-200"></div>

                            {/* Settings Items */}
                            <div className="flex flex-col gap-7">
                                {settingsItems.map((item) => {
                                    const getSettingsIcon = (iconType: string) => {
                                        switch (iconType) {
                                            case "earth":
                                                return (
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="16" cy="16" r="12" stroke="#475569" strokeWidth="1.5"/>
                                                        <path d="M4 16H28M16 4C19.3137 4 22 6.68629 22 10C22 13.3137 19.3137 16 16 16C12.6863 16 10 13.3137 10 10C10 6.68629 12.6863 4 16 4ZM16 16C19.3137 16 22 18.6863 22 22C22 25.3137 19.3137 28 16 28C12.6863 28 10 25.3137 10 22C10 18.6863 12.6863 16 16 16Z" stroke="#475569" strokeWidth="1.5"/>
                                                    </svg>
                                                );
                                            case "sun":
                                                return (
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="16" cy="16" r="6" stroke="#475569" strokeWidth="1.5"/>
                                                        <path d="M16 2V6M16 26V30M30 16H26M6 16H2M25.6569 6.34314L23.5355 8.46447M8.46447 23.5355L6.34314 25.6569M25.6569 25.6569L23.5355 23.5355M8.46447 8.46447L6.34314 6.34314" stroke="#475569" strokeWidth="1.5" strokeLinecap="round"/>
                                                    </svg>
                                                );
                                            case "bell":
                                                return (
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 26C12 27.1046 12.8954 28 14 28H18C19.1046 28 20 27.1046 20 26H12Z" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M16 2C12.6863 2 10 4.68629 10 8C10 8 8 10 8 14H24C24 10 22 8 22 8C22 4.68629 19.3137 2 16 2Z" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                );
                                            case "info":
                                                return (
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="16" cy="16" r="12" stroke="#475569" strokeWidth="1.5"/>
                                                        <path d="M16 12V16M16 20H16.01" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                );
                                            case "chat":
                                                return (
                                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 4C5.79086 4 4 5.79086 4 8V20C4 22.2091 5.79086 24 8 24H12L16 28L20 24H24C26.2091 24 28 22.2091 28 20V8C28 5.79086 26.2091 4 24 4H8Z" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M10 12H22M10 16H18" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                );
                                            default:
                                                return (
                                                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                                                );
                                        }
                                    };

                                    return (
                                        <button
                                            key={item.id}
                                            className="flex items-center gap-3 px-0 py-2 rounded-lg hover:bg-gray-100 transition-all duration-150 w-full"
                                            onClick={() => handleItemClick(item.onClick)}
                                        >
                                            <div className="w-8 h-8 flex items-center justify-center">
                                                {getSettingsIcon(item.icon)}
                                            </div>
                                            <span className="text-slate-950 text-xl font-outfit font-normal leading-8 flex-1 text-left">
                                                {item.name}
                                            </span>
                                            <div className="w-6 h-6 flex items-center justify-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 18L15 12L9 6" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
