import React, { useState, useEffect } from "react";
import IcMenu from "../svgs/icons/IcMenu";
import Bookmark from "../svgs/icons/Bookmark";
import Historique from "../svgs/icons/Historique";
import Connect from "../svgs/icons/Connect";
import More from "../svgs/icons/More";
import { useSideListing } from "../contexts/SideListingContext";
import Bookmark2 from "../svgs/icons/Bookmark2";
import Historique2 from "../svgs/icons/Historique2";
import Connect2 from "../svgs/icons/Connect2";
import ColConn from "../svgs/colored/ColConn";

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
    { id: 'art', src: '/images/art.png', alt: 'art' },
    { id: 'health', src: '/images/health.png', alt: 'health' },
  ];

  // Mock data for each type
  const mockData = {
    home: {
      bookmarks: [
        "Résidence Les Jardins de Marrakech - 2 chambres",
        "Villa avec piscine privée à Essaouira",
        "Riad traditionnel dans la médina de Fès",
        "Appartement moderne à Casablanca",
        "Chalet de montagne dans l'Atlas",
        "Studio cosy au centre de Rabat",
        "Maison d'hôtes à Chefchaouen",
      ],
      history: [
        "Recherche: Hôtels 5 étoiles à Marrakech",
        "Consulté: Resort Paradise Beach",
        "Riad avec spa et hammam traditionnel",
        "Logements disponibles du 15 au 22 août",
        "Prix moyens des hébergements à Agadir",
        "Comparaison: Hôtels vs Riads",
      ]
    },
    telescope: {
      bookmarks: [
        "Balade en chameau dans le désert d'Erg Chebbi",
        "Vol en montgolfière au lever du soleil",
        "Cours de cuisine marocaine traditionnelle",
        "Visite guidée des souks de Marrakech",
        "Randonnée dans les gorges du Todra",
        "Spectacle de danse berbère",
        "Safari quad dans le désert",
      ],
      history: [
        "Recherche: Activités de plein air à Marrakech",
        "Consulté: Balade à vélo dans la Palmeraie",
        "Expériences culturelles à Fès",
        "Prix des excursions dans le désert",
        "Durée moyenne des tours guidés",
        "Activités pour familles avec enfants",
      ]
    },
    art: {
      bookmarks: [
        "Restaurant Marrakech Gourmet - Cuisine locale",
        "Spa & Wellness Center - Massage argan",
        "Night Club Le Riad - Ambiance orientale",
        "Golf Club Marrakech - Parcours 18 trous",
        "Hammam traditionnel dans la médina",
        "Boutique Artisanale - Tapis berbères",
        "Salon de thé avec terrasse panoramique",
      ],
      history: [
        "Recherche: Restaurants gastronomiques à Casablanca",
        "Consulté: Cinéma Majorelle - Séances VIP",
        "Services de spa à proximité de l'hôtel",
        "Horaires d'ouverture des clubs",
        "Tarifs des cours de golf pour débutants",
        "Meilleurs hammams recommandés",
      ]
    },
    health: {
      bookmarks: [
        "Réservation de rendez-vous avec un médecin",
        "Consultation de médecin en ligne",
        "Suivi de santé avec une application mobile",
        "Programme de bien-être et de relaxation",
        "Réservation de séances de massage",
        "Suivi de santé avec une application mobile",
        "Programme de bien-être et de relaxation",
      ],
      history: [
        "Recherche: Médecin spécialisé en cardiologie",
        "Consulté: Resort Paradise Beach",
        "Réservation de rendez-vous avec un médecin",
        "Consultation de médecin en ligne",
        "Suivi de santé avec une application mobile",
        "Programme de bien-être et de relaxation",
      ]
    }
  };

  // Get current data based on selected icon
  const currentData = mockData[selectedIcon as keyof typeof mockData] || mockData.home;

  return (
    <div className="relative w-full h-full">
      {/* 3D Menu Button - Only visible when sidebar is expanded */}
      {!isCollapsed && (
        <button
          onClick={handleCollapseToggle}
          className="
            absolute -right-3 top-[20%] z-20 
            w-[44px] h-[44px] 
            bg-white rounded-[12px]
            flex items-center justify-center
            hover:scale-105
            transition-all duration-300 ease-out
            border border-gray-100
          "
          style={{
            boxShadow: 'var(--shadow-xl-offsetX2, 0) var(--shadow-xl-offsetY2, 8px) var(--shadow-xl-radius2, 10px) var(--shadow-xl-spread2, -6px) var(--shadow-xl-color2, rgba(0, 0, 0, 0.10)), var(--shadow-xl-offsetX1, 0) var(--shadow-xl-offsetY1, 20px) var(--shadow-xl-radius1, 25px) var(--shadow-xl-spread1, -5px) var(--shadow-xl-color1, rgba(0, 0, 0, 0.10))'
          }}
        >
          <IcMenu />
        </button>
      )}

      {/* Sidebar Container */}
      <div
        className={`
          fixed mt-[7%] rounded-[12px]
          shadow-md
          flex flex-col items-start py-6 pb-8
          overflow-y-auto
          scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-transparent
          scrollbar-thumb-[linear-gradient(to_bottom,#2dd4bf,#0ea5e9,#d946ef)]
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-[80px] h-[80%] px-3 rounded-[26px] scrollbar-hide overflow-y-hidden' : 'w-[22%] px-4 h-[85%]'}
        `}
        style={{
          background: 'var(--colors-slate-50, #F8FAFC)'
        }}
      >
        {/* Top icons */}
        <div className={`flex items-center w-full mb-[22px] gap-[12px] ${isCollapsed ? 'flex-col' : 'flex-row '}`}>
          {/* Menu button inside collapsed sidebar - First position */}
          {isCollapsed && (
            <button
              onClick={handleCollapseToggle}
              className="
                w-[44px] h-[44px] mb-[10px]
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
                w-[58px] h-[58px] flex items-center justify-center rounded-[15px] transition-all duration-200 ease-in-out
                ${selectedIcon === icon.id
                  ? 'border-[2px] border-slate-200 bg-slate-50'
                  : 'border-[2px] border-transparent hover:bg-gray-200 transition-all duration-200 ease-in-out'
                }
              `}
            >
              <img src={icon.src} alt={icon.alt} className="w-[38px] h-[38px]" />
            </button>
          ))}

          {/* Spacer for menu button when not collapsed */}
          {!isCollapsed && <div className="w-12 h-12"></div>}
        </div>

        {/* Single divider separating PNG icons from outline icons */}
        {isCollapsed && (
          <hr className="h-[1px] w-full bg-slate-200 mb-[20px]" />
        )}

        {/* Sections */}
        <Section
          title="Bookmark"
          icon={<Bookmark />}
          icon2={<Bookmark2 />}
          coloredIcon={<Bookmark />}
          items={currentData.bookmarks}
          isCollapsed={isCollapsed}
        />

        <Section
          title="Historique"
          icon={<Historique />}
          icon2={<Historique2 />}
          coloredIcon={<Historique />} 
          items={currentData.history}
          isCollapsed={isCollapsed}
        />

        <Section
          title="Connect"
          icon={<Connect />}
          icon2={<Connect2 />}
          coloredIcon={<ColConn />}
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
  icon2: React.ReactNode;
  items: string[];
  isCollapsed: boolean;
  coloredIcon: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, icon, icon2, coloredIcon, items, isCollapsed }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  
  // Only truncate for Bookmark and Historique sections
  const shouldTruncate = title === "Bookmark" || title === "Historique";
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openMenuIndex !== null) {
        const target = e.target as HTMLElement;
        if (!target.closest('.menu-popup') && !target.closest('.menu-button')) {
          setOpenMenuIndex(null);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuIndex]);
  
  const handleMenuClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };
  
  return (
    <div className={`w-full ${isCollapsed ? 'h-[34px]' : 'h-auto'} mb-[22px]`}>
      {/* Header */}
      <div className={`flex items-center mb-4 group ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
        {isCollapsed ? (
          <div className="relative w-full flex items-center justify-center">
            <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
              {icon2}
            </div>
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              {coloredIcon}
            </div>
          </div>
        ) : (
          <>
            {icon}
            <h3 className="font-semibold text-slate-700 text-normal font-outfit">{title}</h3>
          </>
        )}
      </div>

      {/* Content - Hidden when collapsed */}
      {!isCollapsed && (
        <>
          <ul className="flex flex-col gap-[6px]">
            {items.map((item, i) => (
              <li
                key={i}
                className="text-slate-800 text-[14px] font-bricolagegrotesque font-normal flex justify-between items-center py-[4px] hover:bg-[#EFF3F9] rounded-lg px-[10px] transition-colors duration-200 relative"
              >
                <span className={`w-[93%] leading-relaxed font-vendsans ${shouldTruncate ? 'truncate' : ''}`}>{item}</span>
                <div className="relative">
                  <button 
                    onClick={(e) => handleMenuClick(i, e)}
                    className="text-slate-500 hover:text-slate-700 transition-colors duration-200 menu-button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="4" viewBox="0 0 13 4" fill="none">
                      <path d="M1.53125 0C1.73234 -4.23758e-09 1.93145 0.0396068 2.11723 0.116559C2.30301 0.193512 2.47182 0.306303 2.61401 0.448493C2.7562 0.590683 2.86899 0.759486 2.94594 0.945266C3.02289 1.13105 3.0625 1.33016 3.0625 1.53125C3.0625 1.73234 3.02289 1.93145 2.94594 2.11723C2.86899 2.30301 2.7562 2.47182 2.61401 2.61401C2.47182 2.7562 2.30301 2.86899 2.11723 2.94594C1.93145 3.02289 1.73234 3.0625 1.53125 3.0625C1.12514 3.0625 0.735658 2.90117 0.448493 2.61401C0.161328 2.32684 0 1.93736 0 1.53125C0 1.12514 0.161328 0.735658 0.448493 0.448493C0.735658 0.161328 1.12514 8.55819e-09 1.53125 0ZM6.125 0C6.32609 -4.23758e-09 6.5252 0.0396068 6.71098 0.116559C6.89676 0.193512 7.06557 0.306303 7.20776 0.448493C7.34995 0.590683 7.46274 0.759486 7.53969 0.945266C7.61664 1.13105 7.65625 1.33016 7.65625 1.53125C7.65625 1.73234 7.61664 1.93145 7.53969 2.11723C7.46274 2.30301 7.34995 2.47182 7.20776 2.61401C7.06557 2.7562 6.89676 2.86899 6.71098 2.94594C6.5252 3.02289 6.32609 3.0625 6.125 3.0625C5.71889 3.0625 5.32941 2.90117 5.04224 2.61401C4.75508 2.32684 4.59375 1.93736 4.59375 1.53125C4.59375 1.12514 4.75508 0.735658 5.04224 0.448493C5.32941 0.161328 5.71889 8.55819e-09 6.125 0ZM10.7188 0C10.9198 -4.23758e-09 11.119 0.0396068 11.3047 0.116559C11.4905 0.193512 11.6593 0.306303 11.8015 0.448493C11.9437 0.590683 12.0565 0.759486 12.1334 0.945266C12.2104 1.13105 12.25 1.33016 12.25 1.53125C12.25 1.73234 12.2104 1.93145 12.1334 2.11723C12.0565 2.30301 11.9437 2.47182 11.8015 2.61401C11.6593 2.7562 11.4905 2.86899 11.3047 2.94594C11.119 3.02289 10.9198 3.0625 10.7188 3.0625C10.3126 3.0625 9.92316 2.90117 9.63599 2.61401C9.34883 2.32684 9.1875 1.93736 9.1875 1.53125C9.1875 1.12514 9.34883 0.735658 9.63599 0.448493C9.92316 0.161328 10.3126 8.55819e-09 10.7188 0Z" fill="#64748B" />
                    </svg>
                  </button>
                  
                  {/* Popup Menu */}
                  {openMenuIndex === i && (
                    <div 
                      className="menu-popup absolute right-0 top-full mt-1 w-[220px] bg-white rounded-[24px] p-[14px] z-50"
                      style={{
                        boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.10)'
                      }}
                    >
                      <button 
                        onClick={() => setOpenMenuIndex(null)}
                        className="w-full text-left px-4 py-2 text-[14px] rounded-[7px] text-slate-700 hover:bg-slate-50 transition-colors duration-150 font-vendsans"
                      >
                        Partager le chat
                      </button>
                      <button 
                        onClick={() => setOpenMenuIndex(null)}
                        className="w-full text-left px-4 py-2 text-[14px] rounded-[7px] text-slate-700 hover:bg-slate-50 transition-colors duration-150 font-vendsans"
                      >
                        Voir les détails
                      </button>
                      <button 
                        onClick={() => setOpenMenuIndex(null)}
                        className="w-full text-left px-4 py-2 text-[14px] rounded-[7px] text-slate-700 hover:bg-slate-50 transition-colors duration-150 font-vendsans"
                      >
                        Ouvrir dans le navigateur
                      </button>
                      <hr className="my-[12px] border-slate-200" />
                      <button 
                        onClick={() => setOpenMenuIndex(null)}
                        className="w-full text-left px-4 py-2 text-[14px] rounded-[7px] text-slate-700 hover:bg-slate-50 transition-colors duration-150 font-vendsans"
                      >
                        Renommer
                      </button>
                      <button 
                        onClick={() => setOpenMenuIndex(null)}
                        className="w-full text-left px-4 py-2 text-[14px] rounded-[7px] text-[#D946EF] hover:bg-slate-50 transition-colors duration-150 font-vendsans"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>
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
    </div>
  );
};
