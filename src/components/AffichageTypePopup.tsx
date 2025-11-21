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

function ListIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 12C22 16.714 22 19.071 20.535 20.535C19.072 22 16.714 22 12 22C7.286 22 4.929 22 3.464 20.535C2 19.072 2 16.714 2 12C2 7.286 2 4.929 3.464 3.464C4.93 2 7.286 2 12 2C16.714 2 19.071 2 20.535 3.464C22 4.93 22 7.286 22 12Z" fill="#475569" />
      <path d="M7 16.75C6.80109 16.75 6.61032 16.829 6.46967 16.9697C6.32902 17.1103 6.25 17.3011 6.25 17.5C6.25 17.6989 6.32902 17.8897 6.46967 18.0303C6.61032 18.171 6.80109 18.25 7 18.25H13C13.1989 18.25 13.3897 18.171 13.5303 18.0303C13.671 17.8897 13.75 17.6989 13.75 17.5C13.75 17.3011 13.671 17.1103 13.5303 16.9697C13.3897 16.829 13.1989 16.75 13 16.75H7ZM7 13.25C6.80109 13.25 6.61032 13.329 6.46967 13.4697C6.32902 13.6103 6.25 13.8011 6.25 14C6.25 14.1989 6.32902 14.3897 6.46967 14.5303C6.61032 14.671 6.80109 14.75 7 14.75H16C16.1989 14.75 16.3897 14.671 16.5303 14.5303C16.671 14.3897 16.75 14.1989 16.75 14C16.75 13.8011 16.671 13.6103 16.5303 13.4697C16.3897 13.329 16.1989 13.25 16 13.25H7ZM22 5C22 5.79565 21.6839 6.55871 21.1213 7.12132C20.5587 7.68393 19.7956 8 19 8C18.2044 8 17.4413 7.68393 16.8787 7.12132C16.3161 6.55871 16 5.79565 16 5C16 4.20435 16.3161 3.44129 16.8787 2.87868C17.4413 2.31607 18.2044 2 19 2C19.7956 2 20.5587 2.31607 21.1213 2.87868C21.6839 3.44129 22 4.20435 22 5Z" fill="white" />
    </svg>

  )
}

function AffichageTypePopup({ isOpen, onClose, selectedTab, onTabChange, position }: AffichageTypePopupProps) {
  if (!isOpen) return null;

  const tabs = [
    {
      id: 'parliste',
      label: 'Par liste',
      icon: <ListIcon />,
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
        className="fixed bg-white rounded-[24px] shadow-2xl z-50 p-[14px]"
        style={{
          top: position ? `${position.top - 4}px` : '50%',
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
  )
}

export default AffichageTypePopup