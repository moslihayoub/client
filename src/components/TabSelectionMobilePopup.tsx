import React from "react";
import SkHome from "../svgs/icons/sky/SkHome";
import WhHome from "../svgs/icons/white/WhHome";
import WhTelescope from "../svgs/icons/white/WhTelescope";
import WhRuler from "../svgs/icons/white/WhRuler";
import GHome from "../svgs/icons/gray/GHome";
import SkTelescope from "../svgs/icons/sky/SkTelescope";
import SkRuler from "../svgs/icons/sky/SkRuler";
import GHealth from "../svgs/icons/gray/GHealth";
import SkHealth from "../svgs/icons/sky/SkHealth";

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
    },
    {
      id: 'health',
      label: 'NexaHealth',
      icon: <GHealth />,
      selectedIcon: <SkHealth />
    }
  ];

  return (
    <>
      {/* Popup - Positioned directly under TabSelectionMobile */}
      <div
        className="fixed bg-white rounded-[24px] shadow-2xl z-50 p-[14px]"
        style={{
          top: position ? `${position.top}px` : '50%',
          left: position ? `calc(${position.left}px + 0.75rem)` : '50%',
          width: position ? `calc(${position.width}px - 1.5rem)` : 'auto',
          transform: position ? 'none' : 'translate(-50%, -50%)',
          overflowY: 'auto'
        }}
      >


        <div className="flex flex-col gap-[22px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id);
                onClose();
              }}
              className={`flex items-center w-full h-[48px] px-[12px] py-[8px] rounded-xl transition-all duration-200 `}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-lg`}>
                {selectedTab === tab.id ? tab.selectedIcon : tab.icon}
              </div>
              <span className={`font-semibold text-base font-bricolagegrotesque ${selectedTab === tab.id ? 'text-sky-500' : 'text-slate-900'
                }`}>
                {tab.label}
              </span>
              {/* Selected Icon */}
              {selectedTab === tab.id ? (
                <div className="w-[24px] h-[24px] flex items-end justify-end ml-auto">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L15 12L9 19" stroke="#0EA5E9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              ) : (
                <div className="w-[24px] h-[24px] flex items-end justify-end ml-auto">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L15 12L9 19" stroke="#475569" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default TabSelectionMobilePopup;

