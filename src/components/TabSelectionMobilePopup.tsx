import React from "react";
import SkHome from "../svgs/icons/sky/SkHome";
import WhHome from "../svgs/icons/white/WhHome";
import WhTelescope from "../svgs/icons/white/WhTelescope";
import WhRuler from "../svgs/icons/white/WhRuler";
import GHome from "../svgs/icons/gray/GHome";
import SkTelescope from "../svgs/icons/sky/SkTelescope";
import SkRuler from "../svgs/icons/sky/SkRuler";

interface TabSelectionMobilePopupProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  position?: { top: number; left: number; width: number };
}

const TabSelectionMobilePopup: React.FC<TabSelectionMobilePopupProps> = ({
  selectedTab,
  onTabChange,
  isOpen,
  onClose,
  position
}) => {
  if (!isOpen) return null;

  const tabs = [
    {
      id: 'logement',
      label: 'Logement',
      icon: <GHome />,
      selectedIcon: <SkHome />
    },
    {
      id: 'service',
      label: 'Service',
      icon: <WhTelescope />,
      selectedIcon: <SkTelescope />
    },
    {
      id: 'experience',
      label: 'Expérience',
      icon: <WhRuler />,
      selectedIcon: <SkRuler />
    }
  ];

  return (
    <>
      {/* Popup - Positioned directly under TabSelectionMobile */}
      <div 
        className="fixed bg-white rounded-[26px] shadow-lg z-50 p-6"
        style={{
          top: position ? `${position.top}px` : '50%',
          left: position ? `calc(${position.left}px + 0.75rem)` : '50%',
          width: position ? `calc(${position.width}px - 1.5rem)` : 'auto',
          transform: position ? 'none' : 'translate(-50%, -50%)',
          overflowY: 'auto'
        }}
      >
        <div className="flex flex-col gap-4">
          

          <div className="flex flex-col gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  onClose();
                }}
                className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-200 `}
              >
                <div className={`w-10 h-10 flex items-center justify-center rounded-lg`}>
                  {selectedTab === tab.id ? tab.selectedIcon : tab.icon}
                </div>
                <span className={`font-semibold text-base font-outfit ${
                  selectedTab === tab.id ? 'text-sky-500' : 'text-slate-900'
                }`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TabSelectionMobilePopup;

