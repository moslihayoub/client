import React, { useRef, useEffect } from 'react';
import {
    User,
    Settings,
    Calendar,
    Globe,
    LogOut,
    Smartphone,
    X,
    ChevronRight,
    HelpCircle
} from 'lucide-react';

interface ProfilePopupProps {
    isOpen: boolean;
    onClose: () => void;
    userProfileImage?: string;
    userName?: string;
    userEmail?: string;
    triggerRef?: React.RefObject<HTMLButtonElement>; // To position relative to trigger if needed
}

const ProfilePopup = ({ isOpen, onClose, userProfileImage, userName, userEmail, triggerRef }: ProfilePopupProps) => {
    const popupRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node) &&
                triggerRef?.current && !triggerRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, triggerRef]);

    if (!isOpen) return null;

    const menuItems = [
        {
            id: 'profile',
            label: 'Mon profil',
            icon: <User size={20} className="text-slate-600" />,
            onClick: () => {
                // Action
                onClose();
            }
        },
        {
            id: 'language',
            label: 'Langue et traduction',
            icon: <Globe size={20} className="text-slate-600" />,
            extra: (
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-900">Français (FR)</span>
                    <ChevronRight size={16} className="text-slate-400" />
                </div>
            ),
            onClick: () => {
                // Action
                onClose();
            }
        },
        // ... add more items as per design
        {
            id: 'calendar',
            label: 'Calendrier',
            icon: <Calendar size={20} className="text-slate-600" />,
            onClick: () => {
                 // Action
                onClose();
            }
        },
        {
            id: 'system',
            label: 'Système',
            icon: <Smartphone size={20} className="text-slate-600" />,
            onClick: () => {
                 // Action
                onClose();
            }
        },
        {
            id: 'settings',
            label: 'Paramètres',
            icon: <Settings size={20} className="text-slate-600" />,
            onClick: () => {
                 // Action
                onClose();
            }
        },
        {
            id: 'help',
            label: "Besoin d'aide ?",
            icon: <HelpCircle size={20} className="text-slate-600" />,
            onClick: () => {
                // Action
                onClose();
            }
        }
    ];

    return (
        <div
            ref={popupRef}
            className="absolute top-16 right-4 w-[320px] bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
            {/* Header */}
            <div className="p-4 flex items-center gap-3 border-b border-slate-50 bg-slate-50/50">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow-sm">
                     <img
                        src={userProfileImage || "/users/user1.png"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 truncate">{userName || "John Doe"}</h3>
                    <p className="text-xs text-slate-500 truncate">{userEmail || "john.doe@example.com"}</p>
                </div>
            </div>

            {/* Menu List */}
            <div className="p-2 py-3">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={item.onClick}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 group transition-all duration-200"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all duration-200 bg-slate-100/50 text-slate-600">
                                {item.icon}
                            </div>
                            <span className="font-medium text-slate-700 text-[15px]">{item.label}</span>
                        </div>
                        {item.extra}
                    </button>
                ))}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-slate-50 mt-1">
                <button
                    onClick={() => {
                        // Logout logic
                        onClose();
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 hover:text-red-600 text-slate-600 transition-colors"
                >
                    <LogOut size={18} />
                    <span className="font-medium text-[15px]">Déconnexion</span>
                </button>
            </div>
        </div>
    );
};

export default ProfilePopup;
