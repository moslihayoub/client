import React from "react";
// import { useNavigate } from "react-router-dom"; // Commented out for now
import {
    Home,
    MessageSquare,
    Heart,
    User,
    LogOut,
    Languages,
    History,
    FileText,
    Wifi,
    Settings,
    HelpCircle,
    Bell,
    Globe,
    Moon
} from "lucide-react";
import Menu from '@/features/Marketplace/details/MenuComponent';
import MonProfile from '@/assets/icons/MonProfile';
import Bookmark from '@/assets/icons/Bookmark';
import Historique from '@/assets/icons/Historique';
import Logement from '@/assets/icons/Logement';
import Services from '@/assets/icons/Services';
import Experiences from '@/assets/icons/Experiences';
import Connect from '@/assets/icons/Connect';
import NexaHealth from '@/assets/icons/NexaHealth';

interface SidebarLayoutProps {
    children?: React.ReactNode;
    userProfileImage?: string ;
    setIsMobileMenu?: (isOpen: boolean) => void;
}

const Sidebar = ({ children, userProfileImage, setIsMobileMenu }: SidebarLayoutProps) => {
    // const navigate = useNavigate(); // Commented out

    // Helper to close menu if function provided (mobile context)
    const handleItemClick = (action?: () => void) => {
        if (action) action();
        if (setIsMobileMenu) setIsMobileMenu(false);
    }
    
    // --- 1. User Profile Items (Top Section) ---
    const userItems = [
        {
            id: "profile",
            name: "Voir le profil",
            icon: "profile",
            svg: <MonProfile />,
            onClick: () => {}
        },
        {
            id: "bookmark",
            name: "Enregistrés",
            icon: "bookmark",
            svg: <Bookmark />,
            onClick: () => {}
        },
        {
            id: "history",
            name: "Historique",
            icon: "history",
            svg: <Historique />,
            onClick: () => {}
        },
        {
            id: "logement",
            name: "Mettre mon logement",
            icon: "home",
            svg: <Logement />,
            onClick: () => {}
        },
        {
            id: "services",
            name: "Services",
            icon: "wifi",
            svg: <Services />,
            onClick: () => {}
        },
        {
            id: "experiences",
            name: "Expériences",
            icon: "star",
            svg: <Experiences />,
            onClick: () => {}
        },
        {
            id: "connect",
            name: "Nexa Connect",
            icon: "message-square",
            svg: <Connect />,
            onClick: () => {}
        },
        {
            id: "health",
            name: "Nexa Health",
            icon: "heart",
            svg: <NexaHealth />,
            onClick: () => {}
        }
    ];

    // --- 2. Settings Items (Bottom Section) ---
    const settingsItems = [
        {
            id: "language",
            name: "Langue et traduction",
            icon: "globe",
            rightIcon: <Globe size={18} />,
            onClick: () => {}
        },
        {
            id: "mode",
            name: "Passer en mode hôte",
            icon: "toggle-left", // Abstract representation
            onClick: () => {}
        },
        {
            id: "notifications",
            name: "Notifications",
            icon: "bell",
            rightIcon: <Bell size={18} />,
            onClick: () => {}
        },
        {
            id: "help",
            name: "Centre d'aide",
            icon: "help-circle",
            rightIcon: <HelpCircle size={18} />,
            onClick: () => {}
        },
        {
            id: "support",
            name: "Obtenir de l'aide",
            icon: "life-buoy",
            onClick: () => {}
        },
    ];


    return (
        <div className="flex flex-col w-full h-full bg-white overflow-y-auto">
            {/* User Profile Header (Mobile style) */}
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                     <img
                        src={userProfileImage || "/users/user1.png"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                   <h3 className="font-semibold text-gray-900">John Doe</h3>
                   <p className="text-sm text-gray-500">Afficher le profil</p>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="flex-1 p-4 space-y-6">

                {/* Section 1: Main Actions */}
                <div className="space-y-1">
                     {userItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item.onClick)}
                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                        >
                             <div className="text-gray-600">
                                {item.svg ? item.svg : <User size={20}/>}
                            </div>
                            <span className="font-medium text-gray-700">{item.name}</span>
                        </button>
                    ))}
                </div>
                
                 <div className="h-px bg-gray-100 mx-2" />

                {/* Section 2: Settings */}
                <div className="space-y-1">
                    <h4 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Paramètres
                    </h4>
                    {settingsItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item.onClick)}
                            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-gray-600">
                                   {/* Ideally convert string icon names to Lucide components map */}
                                   <Settings size={20} /> 
                                </div>
                                <span className="font-medium text-gray-700">{item.name}</span>
                            </div>
                             {item.rightIcon && <div className="text-gray-400">{item.rightIcon}</div>}
                        </button>
                    ))}
                </div>

                 <div className="h-px bg-gray-100 mx-2" />
                 
                {/* Logout */}
                <button
                     onClick={() => handleItemClick(() => { localStorage.clear(); window.location.reload();})}
                    className="w-full flex items-center gap-3 p-3 hover:bg-red-50 text-red-600 rounded-xl transition-colors text-left mt-auto"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Déconnexion</span>
                </button>

            </div>

             {/* Bottom Navigation (Redundant if strictly Sidebar, but kept for layout completeness) */}
            <div className="p-4 border-t border-gray-100">
                 {/*  Small footer or copyright could go here */}
            </div>
        </div>
    );
};

export default Sidebar;
