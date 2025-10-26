import React, { useState, createContext, useContext } from "react";
import SideHeader from "./SideHeader";
import ColMenu from "../svgs/colored/ColMenu";
import MonProfile from "../svgs/sideTitle/MonProfile";
import ProfileCard from "../pages/ProfileCard";

// Create context for sidebar navigation
interface SidebarContextType {
    currentView: 'menu' | 'profile';
    handleProfileClick: () => void;
    handleBackToMenu: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebarContext must be used within a SidebarLayout');
    }
    return context;
};

interface SidebarLayoutProps {
    children?: React.ReactNode;
    onClose: () => void;
    onProfileClick?: () => void;
}

export default function SidebarLayout({ children, onClose, onProfileClick }: SidebarLayoutProps) {
    const [currentView, setCurrentView] = useState<'menu' | 'profile'>('menu');

    const getCurrentTitle = () => {
        switch (currentView) {
            case 'profile':
                return MonProfile;
            default:
                return ColMenu;
        }
    };

    const getCurrentContent = () => {
        switch (currentView) {
            case 'profile':
                return <ProfileCard />;
            default:
                return children;
        }
    };

    const handleProfileClick = () => {
        setCurrentView('profile');
    };

    const handleBackToMenu = () => {
        setCurrentView('menu');
    };

    return (
        <SidebarContext.Provider value={{ currentView, handleProfileClick, handleBackToMenu }}>
            <div className="flex flex-col h-full">
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
                    <SideHeader 
                        Title={getCurrentTitle()} 
                        onClose={currentView === 'profile' ? handleBackToMenu : onClose} 
                    />
                </div>

                {/* Dynamic Content */}
                <div className="flex-1 overflow-y-auto">
                    {getCurrentContent()}
                </div>
            </div>
        </SidebarContext.Provider>
    );
}

