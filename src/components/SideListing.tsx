import React, { useState, useEffect } from "react";
import IcMenu from "../svgs/icons/IcMenu";
import Bookmark from "../svgs/icons/Bookmark";
import Historique from "../svgs/icons/Historique";
import Connect from "../svgs/icons/Connect";
import More from "../svgs/icons/More";
import { useSideListing } from "../contexts/SideListingContext";

interface SideListingProps {
  onCollapseChange?: (isCollapsed: boolean) => void;
}

const SideListing: React.FC<SideListingProps> = ({ onCollapseChange }) => {
  const [selectedIcon, setSelectedIcon] = useState('home');
  const { isCollapsed, setIsCollapsed } = useSideListing();

  const handleCollapseToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapseChange?.(newCollapsedState);
  };

  useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  const iconButtons = [
    { id: 'home', src: '/images/home.png', alt: 'home' },
    { id: 'telescope', src: '/images/telescope.png', alt: 'telescope' },
    { id: 'art', src: '/images/art.png', alt: 'art' }
  ];

  return (
    <div className="relative w-full h-full">
      {/* 3D Menu Button - Only visible when sidebar is expanded */}
      {!isCollapsed && (
        <button 
          onClick={handleCollapseToggle}
          className="
            absolute -right-3 top-[12%] z-20 
            w-12 h-12 
            bg-white rounded-xl
            shadow-2xl
            flex items-center justify-center
            hover:shadow-3xl hover:scale-105
            transition-all duration-300 ease-out
            border border-gray-100
          "
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
          }}
        >
          <IcMenu />
        </button>
      )}

      {/* Sidebar Container */}
      <div
        className={`
          h-screen fixed mt-[5%] rounded-[26px] 
          shadow-md
          flex flex-col items-start py-6
          overflow-y-auto
          scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-transparent
          scrollbar-thumb-[linear-gradient(to_bottom,#2dd4bf,#0ea5e9,#d946ef)]
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-[80px] px-3' : 'w-[22%] px-4'}
        `}
        style={{
          background: 'var(--colors-slate-50, #F8FAFC)'
        }}
      >
        {/* Top icons */}
        <div className={`flex items-center w-full mb-8 ${isCollapsed ? 'flex-col gap-3' : 'justify-between'}`}>
          {/* Menu button inside collapsed sidebar - First position */}
          {isCollapsed && (
            <button 
              onClick={handleCollapseToggle}
              className="
                w-10 h-10 
                bg-white rounded-[12px]
                shadow-lg
                flex items-center justify-center
                hover:shadow-xl hover:scale-105
                transition-all duration-200 ease-out
                border border-gray-100
              "
            >
              <IcMenu />
            </button>
          )}
          
          {iconButtons.map((icon) => (
            <button
              key={icon.id}
              onClick={() => setSelectedIcon(icon.id)}
              className={`
                w-10 h-10 flex items-center justify-center rounded-[12px] transition-all duration-200
                ${selectedIcon === icon.id 
                  ? 'border-2 border-[#a1a9b2] bg-gray-50' 
                  : 'border-2 border-transparent hover:border-gray-200 hover:bg-gray-50'
                }
              `}
            >
              <img src={icon.src} alt={icon.alt} className="w-10 h-10" />
            </button>
          ))}
          
          {/* Spacer for menu button when not collapsed */}
          {!isCollapsed && <div className="w-12 h-12"></div>}
        </div>

      {/* Sections */}
      <Section
        title="Bookmark"
        icon={<Bookmark />}
        items={[
          "Où se situe le charmant Chalet historique ?",
          "L'emplacement du Chalet historique ?",
          "Où peut-on trouver le Chalet historique ?",
          "Peux-tu me dire où se trouve le Chalet ?",
          "Où est le Chalet historique, s'il te plaît ?",
          "Peux-tu me dire où se trouve le Chalet ?",
          "Où se trouve le Chalet historique ?",
        ]}
        isCollapsed={isCollapsed}
      />

      <Section
        title="Historique"
        icon={<Historique />}
        items={[
          "Où se situe le charmant Chalet historique ?",
          "L'emplacement du Chalet historique ?",
          "Où peut-on trouver le Chalet historique ?",
          "Peux-tu me dire où se trouve le Chalet ?",
          "Où est le Chalet historique, s'il te plaît ?",
        ]}
        isCollapsed={isCollapsed}
      />

    <Section
      title="Connect"
      icon={<Connect />}
      items={[
        "Bientôt notre nouvelle fonctionnalité de réseau social qui vous permettra de partager vos expériences de voyage avec d'autres passionnés.",
      ]}
      isCollapsed={isCollapsed}
    />
      </div>
    </div>
  );
};

export default SideListing;

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  isCollapsed: boolean;
}

const Section: React.FC<SectionProps> = ({ title, icon, items, isCollapsed }) => (
  <div className="w-full mb-10">
    {/* Header */}
    <div className={`flex items-center mb-4 ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
      {icon}
      {!isCollapsed && (
        <h3 className="font-semibold text-base text-gray-900 font-outfit">{title}</h3>
      )}
    </div>

    {/* Content - Hidden when collapsed */}
    {!isCollapsed && (
      <>
        <ul className="">
          {items.map((item, i) => (
            <li
              key={i}
              className="text-gray-600 text-sm flex justify-between items-start py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors duration-200"
            >
              <span className="w-[93%] leading-relaxed font-outfit">{item}</span>
              <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="2" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="14" r="1.5" fill="currentColor"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>

        {/* Footer link */}
        <button className="mt-4 w-full text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-outfit flex items-center justify-between">
          Voir tout
          <More />
        </button>
      </>
    )}

    {/* Divider */}
    <div className="w-full h-[1px] bg-gray-200 mt-6" />
  </div>
);
