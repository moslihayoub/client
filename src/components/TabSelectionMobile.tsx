import React from "react";
import WhHome from "../svgs/icons/white/WhHome";
import WhTelescope from "../svgs/icons/white/WhTelescope";
import WhRuler from "../svgs/icons/white/WhRuler";
import GTelescope from "../svgs/icons/gray/GTelescope";
import GRuler from "../svgs/icons/gray/GRuler";
import ParListe from "../svgs/icons/gray/ParListe";
import Parzone from "../svgs/icons/gray/Parzone";
import GHealth from "../svgs/icons/gray/GHealth";
import WhHealth from "../svgs/icons/white/WhHealth";

interface TabSelectionMobileProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  selectedAffichageType: string;
  onAffichageTypeChange: (affichageType: string) => void;
  onOpenTabPopup: () => void;
  onOpenAffichagePopup: () => void;
}

const TabSelectionMobile: React.FC<TabSelectionMobileProps> = ({ 
  selectedTab, 
  onTabChange, 
  selectedAffichageType, 
  onAffichageTypeChange,
  onOpenTabPopup,
  onOpenAffichagePopup
}) => {
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
    health: {
      label: "NexaHealth",
      icon: <WhHealth />,
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
    <div className="bg-white cursor-pointer flex items-center rounded-full w-full relative mt-1"
      style={{
        padding: '3% 3.5%',
        gap: '2%'
      }}
    >
      {/* Gradient Border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600"
        style={{
          padding: '1.5px'
        }}
      >
        <div className="bg-white rounded-full h-full w-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center w-full"
        style={{
          gap: '2%'
        }}
      >
        {/* Dynamic Main Button (Logement / Service / Expérience) */}
        <button
          onClick={onOpenTabPopup}
          className="flex-[1_0_0] flex items-center justify-center rounded-full shadow-sm transition-all duration-200 text-white font-bricolagegrotesque"
          style={{
            background: 'radial-gradient(141.56% 141.56% at 50% -7.74%, #2DD4BF 0%, #0EA5E9 50.96%, #D946EF 100%)',
            padding: '3.5% 6%',
            gap: '12px',
            minHeight: '0',
            minWidth: '0'
          }}
        >
          <div className="flex items-center justify-center" style={{ width: '6%', height: '6%', minWidth: '20px', minHeight: '20px' }}>
            {currentTabInfo.icon}
          </div>
          <p className="text-[18px] font-normal font-weight-600 font-outfit whitespace-nowrap" style={{ fontSize: 'clamp(14px, 4.5vw, 18px)', lineHeight: '1.56' }}>
            {currentTabInfo.label}
          </p>
        </button>

        {/* "Par liste" tab stays visible always */}
        <button
          onClick={onOpenAffichagePopup}
          className="flex-[1_0_0] flex items-center justify-center rounded-full bg-slate-900 text-white font-bricolagegrotesque shadow-sm transition-all duration-200"
          style={{
            padding: '3.5% 6%',
            gap: '12px',
            minHeight: '0',
            minWidth: '0'
          }}
        >
          <div className="flex items-center justify-center" style={{ width: '6%', height: '6%', minWidth: '20px', minHeight: '20px' }}>
            {currentAffichageTypeInfo.icon} 
          </div>
          <p className="text-[18px] font-normal font-weight-600 font-bricolagegrotesque whitespace-nowrap" style={{ fontSize: 'clamp(14px, 4.5vw, 18px)', lineHeight: '1.56' }}>
            {currentAffichageTypeInfo.label}
          </p>
        </button>
      </div>
    </div>
  );
};

export default TabSelectionMobile;
