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

function ZoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.55391 21.529C5.35091 22.75 8.49691 21.491 14.7899 18.975C16.1319 18.438 16.8029 18.169 17.3299 17.708C17.4639 17.59 17.5899 17.464 17.7079 17.33C18.1689 16.803 18.4379 16.132 18.9749 14.79C21.4899 8.49697 22.7499 5.34997 21.5289 3.55397C21.2391 3.12815 20.8717 2.76074 20.4459 2.47097C18.6489 1.24997 15.5019 2.50797 9.20991 5.02497C7.86791 5.56197 7.19691 5.83097 6.66991 6.29197C6.53591 6.40997 6.40991 6.53597 6.29191 6.66997C5.83091 7.19697 5.56191 7.86797 5.02491 9.20997C2.50791 15.502 1.24991 18.649 2.47091 20.446C2.76091 20.872 3.12791 21.239 3.55391 21.529ZM8.24991 12C8.24991 11.0054 8.645 10.0516 9.34826 9.34832C10.0515 8.64506 11.0053 8.24997 11.9999 8.24997C12.9945 8.24997 13.9483 8.64506 14.6516 9.34832C15.3548 10.0516 15.7499 11.0054 15.7499 12C15.7499 12.9945 15.3548 13.9484 14.6516 14.6516C13.9483 15.3549 12.9945 15.75 11.9999 15.75C11.0053 15.75 10.0515 15.3549 9.34826 14.6516C8.645 13.9484 8.24991 12.9945 8.24991 12ZM9.74991 12C9.74991 11.4032 9.98696 10.8309 10.4089 10.409C10.8309 9.98702 11.4032 9.74997 11.9999 9.74997C12.5966 9.74997 13.1689 9.98702 13.5909 10.409C14.0129 10.8309 14.2499 11.4032 14.2499 12C14.2499 12.5967 14.0129 13.169 13.5909 13.591C13.1689 14.0129 12.5966 14.25 11.9999 14.25C11.4032 14.25 10.8309 14.0129 10.4089 13.591C9.98696 13.169 9.74991 12.5967 9.74991 12Z" fill="white" />
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
      icon: <ZoneIcon />,
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