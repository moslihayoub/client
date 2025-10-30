import React, { useState } from "react";
import TabSelectionMobilePopup from "./TabSelectionMobilePopup";
import WhHome from "../svgs/icons/white/WhHome";
import WhTelescope from "../svgs/icons/white/WhTelescope";
import WhRuler from "../svgs/icons/white/WhRuler";
import GTelescope from "../svgs/icons/gray/GTelescope";
import GRuler from "../svgs/icons/gray/GRuler";
import ParListe from "../svgs/icons/gray/ParListe";
import AffichageTypePopup from "./AffichageTypePopup";
import Parzone from "../svgs/icons/gray/Parzone";

interface TabSelectionMobileProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  selectedAffichageType: string;
  onAffichageTypeChange: (affichageType: string) => void;
}

const TabSelectionMobile: React.FC<TabSelectionMobileProps> = ({ selectedTab, onTabChange, selectedAffichageType, onAffichageTypeChange }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAffichageTypePopupOpen, setIsAffichageTypePopupOpen] = useState(false);
  // Dynamic button label and icon based on selectedTab
  const currentTabInfo = {
    logement: {
      label: "Logement",
      icon: <WhHome />,
    },
    service: {
      label: "Service",
      icon: <GTelescope />,
    },
    experience: {
      label: "Expérience",
      icon: <GRuler />,
    },
  }[selectedTab] || { label: "Logement", icon: null };

  const currentAffichageTypeInfo = {
    parliste: {
      label: "Par liste",
      icon: <ParListe />,
    },
    parzone: {
      label: "Par zone",
      icon: <Parzone />,
    },
  }[selectedAffichageType] || { label: "Par liste", icon: <ParListe /> };


  return (
    <div className="bg-white border-[1.5px] border-solid cursor-pointer flex gap-2 items-center px-[14px] py-3 rounded-full w-full relative">
      {/* Gradient Border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 p-[1.5px]">
        <div className="bg-white rounded-full h-full w-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex gap-2 items-center w-full">
        {/* Dynamic Main Button (Logement / Service / Expérience) */}
        <button
          onClick={() => setIsPopupOpen(true)}
          className="flex-1 flex w-[45%] gap-3 items-center justify-center px-6 py-3.5 rounded-full shadow-sm transition-all duration-200 text-white"
          style={{
            background: 'radial-gradient(141.56% 141.56% at 50% -7.74%, #2DD4BF 0%, #0EA5E9 50.96%, #D946EF 100%)',
          }}
        >
          <div className="w-6 h-6 flex items-center justify-center">{currentTabInfo.icon}</div>
          <p className="font-semibold text-lg font-outfit leading-7">{currentTabInfo.label}</p>
        </button>

        {/* "Par liste" tab stays visible always */}
        <button
          onClick={() => {
            setIsAffichageTypePopupOpen(true);
          }}
          className={`flex-1 flex gap-3 items-center justify-center px-6 py-3.5 rounded-full bg-slate-900 text-white shadow-sm transition-all duration-200 `}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {currentAffichageTypeInfo.icon} 
          </div>
          <p className="font-semibold text-lg font-outfit leading-7 w-auto text-nowrap">{currentAffichageTypeInfo.label}</p>
        </button>
      </div>

      {isPopupOpen && (
        <TabSelectionMobilePopup
          selectedTab={selectedTab}
          onTabChange={(tab) => {
            onTabChange(tab);
            setIsPopupOpen(false);
          }}
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      )}

      {isAffichageTypePopupOpen && (
        <AffichageTypePopup
          isOpen={isAffichageTypePopupOpen}
          onClose={() => setIsAffichageTypePopupOpen(false)}
          selectedTab={selectedAffichageType}
          onTabChange={(affichageType) => onAffichageTypeChange(affichageType)}
        />
      )}
    </div>
  );
};

export default TabSelectionMobile;
