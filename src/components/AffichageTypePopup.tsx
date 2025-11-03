import React, { useState } from 'react'
import ParListe from '../svgs/icons/gray/ParListe';
import Parzone from '../svgs/icons/gray/Parzone';
import SkParListe from '../svgs/icons/sky/SkParListe';
import SkParzone from '../svgs/icons/sky/SkParzone';

interface AffichageTypePopupProps {
    isOpen: boolean;
    onClose: () => void;
    selectedTab: string;
    onTabChange: (tab: string) => void;
    position?: { top: number; left: number; width: number };
}

function AffichageTypePopup({ isOpen, onClose, selectedTab, onTabChange, position }: AffichageTypePopupProps) {
    if(!isOpen) return null;
    
    const tabs = [
        {
          id: 'parliste',
          label: 'Par liste',
          icon: <ParListe />,
          selectedIcon: <SkParListe />
        },
        {
          id: 'parzone',
          label: 'Par zone',
          icon: <Parzone />,
          selectedIcon: <SkParzone />
        }
      ];

    return (
        <>
          {/* Popup - Positioned directly under TabSelectionMobile */}
          <div 
            className="fixed bg-white rounded-[26px] shadow-lg z-50 p-6"
            style={{
              top: position ? `${position.top - 4}px` : '50%',
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
                        {selectedTab === tab.id ? tab.selectedIcon  : tab.icon }
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
  )
}

export default AffichageTypePopup