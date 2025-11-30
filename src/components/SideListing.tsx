import React, { useState, useEffect } from "react";
import { Share2, Eye, ExternalLink, Pencil, Trash2 } from "lucide-react";
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
        <div className="absolute -right-3 top-[19%] z-20">
          <button
            onClick={handleCollapseToggle}
            className="
              w-[44px] h-[44px] 
              bg-white rounded-[12px]
              flex items-center justify-center
              hover:scale-105
              transition-all duration-300 ease-out
              border border-gray-100
              group relative
            "
            style={{
              boxShadow: 'var(--shadow-xl-offsetX2, 0) var(--shadow-xl-offsetY2, 8px) var(--shadow-xl-radius2, 10px) var(--shadow-xl-spread2, -6px) var(--shadow-xl-color2, rgba(0, 0, 0, 0.10)), var(--shadow-xl-offsetX1, 0) var(--shadow-xl-offsetY1, 20px) var(--shadow-xl-radius1, 25px) var(--shadow-xl-spread1, -5px) var(--shadow-xl-color1, rgba(0, 0, 0, 0.10))'
            }}
          >
            <IcMenu />
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/85 text-white text-[10px] font-vendsans rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
              Réduire
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-3 border-transparent border-b-black/85"></span>
            </span>
          </button>
        </div>
      )}

      {/* Sidebar Container */}
      <div
        className={`
          fixed mt-[7%] rounded-[12px]
          shadow-md
          flex flex-col items-start
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-[80px] h-[80%] px-3 rounded-[26px] overflow-visible' : 'w-[22%] h-[80%]'}
        `}
        style={{
          background: 'var(--colors-slate-50, #F8FAFC)'
        }}
      >
        {/* Top icons - Fixed at top */}
        <div className={`flex items-center w-full gap-[12px] py-6 px-4 ${isCollapsed ? 'flex-col px-3' : 'flex-row'} flex-shrink-0`}>
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
                group relative z-50
              "
            >
              <IcMenu />
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/85 text-white text-[10px] font-vendsans rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-[100]">
                Agrandir
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-3 border-transparent border-b-black/85"></span>
              </span>
            </button>
          )}

          {iconButtons.map((icon) => {
            const tooltipText = icon.id === 'home' ? 'Logements' : 
                              icon.id === 'telescope' ? 'Expériences' : 
                              icon.id === 'art' ? 'Services' : 
                              icon.id === 'health' ? 'Santé' : icon.alt;
            return (
              <button
                key={icon.id}
                onClick={() => setSelectedIcon(icon.id)}
                className={`
                  w-[58px] h-[58px] flex items-center justify-center rounded-[15px] transition-all duration-200 ease-in-out group relative
                  ${selectedIcon === icon.id
                    ? 'border-[2px] border-slate-200 bg-slate-50'
                    : 'border-[2px] border-transparent hover:bg-gray-200 transition-all duration-200 ease-in-out'
                  }
                `}
              >
                <img src={icon.src} alt={icon.alt} className="w-[38px] h-[38px]" />
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/85 text-white text-[10px] font-vendsans rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                  {tooltipText}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-3 border-transparent border-b-black/85"></span>
                </span>
              </button>
            );
          })}

          {/* Spacer for menu button when not collapsed */}
          {!isCollapsed && <div className="w-12 h-12"></div>}
        </div>

        {/* Scrollable content area - starts below top icons */}
        <div
          className={`
            flex-1 w-full overflow-y-auto
            scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-transparent
            scrollbar-thumb-[linear-gradient(to_bottom,#2dd4bf,#0ea5e9,#d946ef)]
            ${isCollapsed ? 'scrollbar-hide overflow-y-hidden px-3 overflow-x-visible' : 'px-4'}
          `}
        >

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
  // Hide menu button for Connect section
  const showMenuButton = title !== "Connect";
  // Hide "Voir tout" button for Connect section
  const showVoirTout = title !== "Connect";
  // Remove hover effect for Connect section
  const showHover = title !== "Connect";

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
    <div className={`w-full ${isCollapsed ? 'h-[34px]' : 'h-auto'} mb-[22px] ${isCollapsed ? 'overflow-visible' : ''}`}>
      {/* Header */}
      <div className={`flex items-center mb-4 group ${isCollapsed ? 'justify-center relative' : 'gap-3'}`}>
        {isCollapsed ? (
          <div className="relative w-full flex items-center justify-center">
            <div className="opacity-100 group-hover:opacity-0 transition-opacity duration-300 ease-in-out">
              {icon2}
            </div>
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              {coloredIcon}
            </div>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-black/85 text-white text-[10px] font-vendsans rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-[100]">
              {title}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 border-3 border-transparent border-b-black/85"></span>
            </span>
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
                className={`text-slate-800 text-[14px] font-bricolagegrotesque font-normal flex justify-between items-center py-[4px] rounded-lg px-[10px] transition-colors duration-200 relative ${showHover ? 'hover:bg-[#EFF3F9]' : ''}`}
              >
                <span className={`${showMenuButton ? 'w-[93%]' : 'w-full'} leading-relaxed font-vendsans ${shouldTruncate ? 'truncate' : ''}`}>{item}</span>
                {showMenuButton && (
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
                        className="menu-popup absolute right-0 top-full mt-1 w-[255px] bg-white rounded-[24px] p-[14px] z-50"
                        style={{
                          boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.10)'
                        }}
                      >
                        <button
                          onClick={() => setOpenMenuIndex(null)}
                          className="w-full text-left px-4 py-2 text-[14px] rounded-[7px] text-slate-700 hover:bg-slate-50 transition-colors duration-150 font-vendsans flex items-center gap-3"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12C9 12.663 8.73661 13.2989 8.26777 13.7678C7.79893 14.2366 7.16304 14.5 6.5 14.5C5.83696 14.5 5.20107 14.2366 4.73223 13.7678C4.26339 13.2989 4 12.663 4 12C4 11.337 4.26339 10.7011 4.73223 10.2322C5.20107 9.76339 5.83696 9.5 6.5 9.5C7.16304 9.5 7.79893 9.76339 8.26777 10.2322C8.73661 10.7011 9 11.337 9 12Z" stroke="#475569" stroke-width="1.5" />
                            <path d="M14 6.5L9 10M14 17.5L9 14" stroke="#475569" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M19 18.5C19 19.163 18.7366 19.7989 18.2678 20.2678C17.7989 20.7366 17.163 21 16.5 21C15.837 21 15.2011 20.7366 14.7322 20.2678C14.2634 19.7989 14 19.163 14 18.5C14 17.837 14.2634 17.2011 14.7322 16.7322C15.2011 16.2634 15.837 16 16.5 16C17.163 16 17.7989 16.2634 18.2678 16.7322C18.7366 17.2011 19 17.837 19 18.5ZM19 5.5C19 6.16304 18.7366 6.79893 18.2678 7.26777C17.7989 7.73661 17.163 8 16.5 8C15.837 8 15.2011 7.73661 14.7322 7.26777C14.2634 6.79893 14 6.16304 14 5.5C14 4.83696 14.2634 4.20107 14.7322 3.73223C15.2011 3.26339 15.837 3 16.5 3C17.163 3 17.7989 3.26339 18.2678 3.73223C18.7366 4.20107 19 4.83696 19 5.5Z" stroke="#475569" stroke-width="1.5" />
                          </svg>

                          Partager le chat
                        </button>
                        <button
                          onClick={() => setOpenMenuIndex(null)}
                          className="w-full text-left px-4 py-2 text-[14px] rounded-[7px] text-slate-700 hover:bg-slate-50 transition-colors duration-150 font-vendsans flex items-center gap-3"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 10C3 6.229 3 4.343 4.172 3.172C5.344 2.001 7.229 2 11 2H13C16.771 2 18.657 2 19.828 3.172C20.999 4.344 21 6.229 21 10V14C21 17.771 21 19.657 19.828 20.828C18.656 21.999 16.771 22 13 22H11C7.229 22 5.343 22 4.172 20.828C3.001 19.656 3 17.771 3 14V10Z" stroke="#475569" stroke-width="1.5" />
                            <path d="M12 6V8M12 8V10M12 8H10M12 8H14M8 14H16M9 18H15" stroke="#475569" stroke-width="1.5" stroke-linecap="round" />
                          </svg>

                          Voir les détails
                        </button>
                        <button
                          onClick={() => setOpenMenuIndex(null)}
                          className="w-full text-left px-4 py-2 text-[14px] rounded-[7px] text-slate-700 hover:bg-slate-50 transition-colors duration-150 font-vendsans flex items-center gap-3"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 11.9995C22 13.3128 21.7414 14.6132 21.2388 15.8265C20.7362 17.0399 19.9996 18.1423 19.0709 19.0709C18.1423 19.9996 17.0399 20.7362 15.8265 21.2388C14.6132 21.7414 13.3128 22 11.9995 22C10.6862 22 9.38581 21.7414 8.1725 21.2388C6.95918 20.7362 5.85673 19.9996 4.9281 19.0709C3.99947 18.1423 3.26284 17.0399 2.76027 15.8265C2.25769 14.6132 1.99902 13.3128 1.99902 11.9995C1.99902 9.34723 3.05264 6.80356 4.9281 4.9281C6.80356 3.05264 9.34723 1.99902 11.9995 1.99902C14.6518 1.99902 17.1955 3.05264 19.0709 4.9281C20.9464 6.80356 22 9.34723 22 11.9995Z" stroke="#475569" stroke-width="1.5" />
                            <path d="M16.0001 12C16.0001 13.313 15.8961 14.614 15.6951 15.827C15.4951 17.04 15.2001 18.142 14.8281 19.071C14.4571 20 14.0161 20.736 13.5311 21.239C13.0451 21.741 12.5251 22 12.0001 22C11.4751 22 10.9551 21.741 10.4701 21.239C9.98406 20.736 9.54305 19.999 9.17205 19.071C8.80005 18.142 8.50505 17.041 8.30405 15.827C8.09896 14.5617 7.99729 13.2818 8.00005 12C8.00005 10.687 8.10305 9.386 8.30405 8.173C8.50505 6.96 8.80005 5.858 9.17205 4.929C9.54305 4 9.98405 3.264 10.4691 2.761C10.9551 2.26 11.4751 2 12.0001 2C12.5251 2 13.0451 2.259 13.5301 2.761C14.0161 3.264 14.4571 4.001 14.8281 4.929C15.2001 5.858 15.4951 6.959 15.6951 8.173C15.8971 9.386 16.0001 10.687 16.0001 12Z" stroke="#475569" stroke-width="1.5" />
                            <path d="M2 12H22" stroke="#475569" stroke-width="1.5" stroke-linecap="round" />
                          </svg>

                          Ouvrir dans le navigateur
                        </button>
                        <hr className="my-[12px] border-slate-200" />
                        <button
                          onClick={() => setOpenMenuIndex(null)}
                          className="w-full text-left px-4 py-2 text-[14px] rounded-[7px] text-slate-700 hover:bg-slate-50 transition-colors duration-150 font-vendsans flex items-center gap-3"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1003 2.39077C14.8335 1.67227 15.8206 1.27216 16.8471 1.27739C17.8736 1.28263 18.8566 1.69277 19.5824 2.41871C20.3082 3.14464 20.7182 4.12768 20.7232 5.1542C20.7283 6.18071 20.328 7.16774 19.6093 7.90077L12.0153 15.4948C11.5873 15.9228 11.3253 16.1848 11.0353 16.4118C10.6919 16.6793 10.3204 16.9086 9.92734 17.0958C9.59334 17.2548 9.24234 17.3718 8.66834 17.5628L5.99634 18.4538L5.35434 18.6678C5.07269 18.7619 4.7704 18.7756 4.48137 18.7075C4.19234 18.6394 3.92802 18.492 3.71804 18.2821C3.50807 18.0721 3.36075 17.8078 3.29263 17.5187C3.2245 17.2297 3.23825 16.9274 3.33234 16.6458L4.43734 13.3318C4.62834 12.7578 4.74534 12.4068 4.90434 12.0728C5.09185 11.68 5.32153 11.3088 5.58934 10.9658C5.81634 10.6748 6.07734 10.4128 6.50534 9.98577L14.1003 2.39077ZM5.96034 16.8848L5.11634 16.0388L5.84434 13.8538C6.05634 13.2178 6.14434 12.9588 6.25834 12.7188C6.39967 12.4234 6.57067 12.1468 6.77134 11.8888C6.93534 11.6788 7.12734 11.4848 7.60134 11.0098L13.4923 5.11977C13.7984 5.88452 14.2575 6.5787 14.8413 7.15977C15.4225 7.74327 16.1167 8.20197 16.8813 8.50777L10.9903 14.3978C10.5153 14.8728 10.3223 15.0648 10.1123 15.2278C9.85367 15.4291 9.57701 15.6004 9.28234 15.7418C9.04234 15.8558 8.78234 15.9438 8.14634 16.1558L5.96034 16.8848ZM18.0763 7.31177C17.9223 7.27778 17.7703 7.23471 17.6213 7.18277C16.9728 6.95738 16.3845 6.58659 15.9013 6.09877C15.4146 5.61476 15.044 5.02668 14.8173 4.37877C14.7651 4.2298 14.7217 4.07787 14.6873 3.92377L15.1603 3.45177C15.6121 3.0146 16.2176 2.77248 16.8462 2.77764C17.4748 2.78279 18.0763 3.0348 18.5208 3.47933C18.9653 3.92385 19.2173 4.52528 19.2225 5.15391C19.2276 5.78254 18.9855 6.38802 18.5483 6.83977L18.0763 7.31177ZM3.25034 21.9998C3.25034 21.8009 3.32936 21.6101 3.47001 21.4694C3.61066 21.3288 3.80143 21.2498 4.00034 21.2498H20.0003V22.7498H4.00034C3.80143 22.7498 3.61066 22.6708 3.47001 22.5301C3.32936 22.3895 3.25034 22.1987 3.25034 21.9998Z" fill="#475569" />
                          </svg>

                          Renommer
                        </button>
                        <button
                          onClick={() => setOpenMenuIndex(null)}
                          className="w-full text-left px-4 py-2 text-[14px] rounded-[7px] text-rose-500 hover:bg-slate-50 transition-colors duration-150 font-vendsans flex items-center gap-3"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#EF4444" stroke-width="1.5" />
                            <path d="M14.5 9.5L9.5 14.5M9.5 9.5L14.5 14.5" stroke="#EF4444" stroke-width="1.5" stroke-linecap="round" />
                          </svg>

                          Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Footer link */}
          {showVoirTout && (
            <button className="mt-4 w-full text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-outfit flex items-center justify-start gap-[8px]">
              <More />
              Voir tout
            </button>
          )}
        </>
      )}
    </div>
  );
};
