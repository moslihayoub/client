import React, { useState } from 'react';
import Maroc from '../svgs/flags/Maroc';
import England from '../svgs/flags/England';
import France from '../svgs/flags/France';

interface LanguagePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageChange: (language: string) => void;
  currentLanguage: string;
  position?: { top: number; right: number };
}

interface Language {
  code: string;
  name: string;
  flag: React.ComponentType;
}

const languages: Language[] = [
  {
    code: 'ar',
    name: 'العربية',
    flag: Maroc
  },
  {
    code: 'en',
    name: 'English',
    flag: England
  },
  {
    code: 'fr',
    name: 'Français',
    flag: France
  }
];

export default function LanguagePopup({ isOpen, onClose, onLanguageChange, currentLanguage, position }: LanguagePopupProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    onLanguageChange(languageCode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
    {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-transparent z-40"
        onClick={onClose}
      />

      {/* Popup */}
      <div 
        className="fixed z-50"
        style={{
          top: position?.top ?? 54,
          right: position?.right ?? 172
        }}
      >
        <div className="bg-white rounded-3xl p-[14px] shadow-lg min-w-[180px]">
          <div className="flex flex-col gap-[2px]">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className={`flex items-center gap-[10px] px-[8px] py-[4px] rounded-lg transition-all duration-200 hover:bg-slate-50 ${
                  selectedLanguage === language.code ? 'bg-slate-200' : ''
                }`}
              >
                {/* Flag */}
                <div className="w-6 h-6 flex items-center justify-center text-lg">
                  <language.flag />
                </div>
                
                {/* Language name */}
                <span className="text-sm font-normal font-bricolagegrotesque text-slate-700 leading-5">
                  {language.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
