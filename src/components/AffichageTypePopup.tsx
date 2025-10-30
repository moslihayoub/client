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
}

function AffichageTypePopup({ isOpen, onClose, selectedTab, onTabChange }: AffichageTypePopupProps) {
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
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={onClose}
          />
    
          {/* Popup */}
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-[26px] shadow-2xl z-50 p-6 max-w-sm mx-auto">
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