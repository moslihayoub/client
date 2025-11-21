import React from "react";
import Logement from "../svgs/icons/Logement";
import Services from "../svgs/icons/Services";
import Experiences from "../svgs/icons/Experiences";
import ColLogement from "../svgs/icons/ColLogement";
import ColServices from "../svgs/icons/ColServices";
import ColExperiences from "../svgs/icons/ColExperiences";
import Filtre from "../svgs/icons/Filtre";
import Zone from "../svgs/icons/Zone";
import GrListe from "../svgs/icons/GrListe";
import Health from "../svgs/icons/Health";
import WhHealth from "../svgs/icons/white/WhHealth";
import ColHealth from "../svgs/icons/ColHealth";

interface TabSelectionProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  affichageType: string;
  setAffichageType: (affichageType: 'parzone' | 'parliste') => void;
}

const TabSelection: React.FC<TabSelectionProps> = ({ selectedTab, onTabChange, affichageType, setAffichageType }) => {
  return (
    <div className="flex gap-6 items-center justify-between mb-[28px]">
      {/* Left side - Tab buttons */}
      <div className="flex gap-[26px] items-center">
        {/* Logement Tab */}
        <button 
          onClick={() => onTabChange('logement')}
          className={`flex gap-2 items-center transition-all duration-200 group ${
            selectedTab === 'logement' 
              ? 'text-slate-700' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="w-[18px] h-[18px] flex items-center justify-center relative">
            <Logement className={`absolute transition-opacity duration-200 ${
              selectedTab === 'logement' ? 'opacity-0' : 'opacity-100'
            }`} />
            <ColLogement className={`absolute transition-opacity duration-200 ${
              selectedTab === 'logement' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`} />
          </div>
          <p className="font-semibold text-base font-bricolagegrotesque leading-6">
            Logement
          </p>
        </button>

        {/* Service Tab */}
        <button 
          onClick={() => onTabChange('service')}
          className={`flex gap-2 items-center transition-all duration-200 group ${
            selectedTab === 'service' 
              ? 'text-slate-700' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="w-[18px] h-[18px] flex items-center justify-center relative">
            <Services className={`absolute transition-opacity duration-200 ${
              selectedTab === 'service' ? 'opacity-0' : 'opacity-100'
            }`} />
            <ColServices className={`absolute transition-opacity duration-200 ${
              selectedTab === 'service' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`} />
          </div>
          <p className="font-semibold text-base font-bricolagegrotesque leading-6">
            Service
          </p>
        </button>

        {/* Expérience Tab */}
        <button 
          onClick={() => onTabChange('experience')}
          className={`flex gap-2 items-center transition-all duration-200 group ${
            selectedTab === 'experience' 
              ? 'text-slate-700' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="w-[18px] h-[18px] flex items-center justify-center relative">
            <Experiences className={`absolute transition-opacity duration-200 ${
              selectedTab === 'experience' ? 'opacity-0' : 'opacity-100'
            }`} />
            <ColExperiences className={`absolute transition-opacity duration-200 ${
              selectedTab === 'experience' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`} />
          </div>
          <p className="font-semibold text-base font-bricolagegrotesque leading-6">
            Expérience
          </p>
        </button>

        {/* NexaHealth Tab */}
        <button 
          onClick={() => onTabChange('health')}
          className={`flex gap-2 items-center transition-all duration-200 group ${
            selectedTab === 'health' 
              ? 'text-slate-700' 
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div className="w-[18px] h-[18px] flex items-center justify-center relative">
            <Health className={`absolute transition-opacity duration-200 ${
              selectedTab === 'health' ? 'opacity-0' : 'opacity-100'
            }`} />
            <ColHealth className={`absolute transition-opacity duration-200 ${
              selectedTab === 'health' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`} />
          </div>
          <p className="font-semibold text-base font-bricolagegrotesque leading-6">
            Health
          </p>
        </button>
      </div>

      {/* Right side - Action buttons */}
      <div className="flex gap-3 items-center">
        {/* Filter Button 
        <button className="bg-slate-800 flex gap-[12px] items-center justify-center pl-[15px] pr-[8px] py-1.5 rounded-xl">
          <p className="font-medium text-base text-white font-bricolagegrotesque leading-6">
            Filtre
          </p>
          <div className="w-6 h-6 flex items-center justify-center">
            <Filtre />
          </div>
        </button>
        */}

        {/* Show Area Button */}
        <button className="bg-cyan-500 hover:bg-slate-800 transition-all duration-300 ease-in-out flex gap-[12px] items-center justify-center pl-[15px] pr-[8px] py-1.5 rounded-xl"
        onClick={() => {
          affichageType === 'parzone' ? setAffichageType('parliste') : setAffichageType('parzone');
        }}>
          <p className="font-medium text-base text-white font-bricolagegrotesque leading-6">
            {affichageType === 'parzone' ? 'Affiche la liste' : 'Affiche la zone'}
          </p>
          <div className="w-6 h-6 flex items-center justify-center">
            {affichageType === 'parzone' ? <GrListe /> : ''}
            {affichageType === 'parliste' ? <Zone /> : ''}
          </div>
        </button>
      </div>
    </div>
  );
};

export default TabSelection;
