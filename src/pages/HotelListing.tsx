import React, { useState, useEffect, useRef } from "react";
import ItemCard from "../components/HoltelCard";
import { ServiceCardProps, ExperienceCardProps } from "../components/HoltelCard";
import SideListing from "../components/SideListing";
import Navbar from "../components/Navbar";
import TabSelection from "../components/TabSelection";
import TabSelectionMobile from "../components/TabSelectionMobile";
import BRButton from "../components/BRButton";
import MobileSearchbar from "../components/MobileSearchbar";
import MobileOverlay from "../components/MobileOverlay";
import { useNavigate } from "react-router-dom";
import { useSideListing } from "../contexts/SideListingContext";
import SearchBar from "../components/SearchBar";
import TabSelectionMobilePopup from "../components/TabSelectionMobilePopup";
import AffichageTypePopup from "../components/AffichageTypePopup";

// Sample hotel data
const hotels = [
  {
    id: 1,
    title: "Résidence Les Jardins de Marrakech",
    nbLit: 2,
    nbChambre: 1,
    nbNuit: 3,
    totalPrice: 450,
    pricePerNight: 150,
    rating: 4.8,
    distancce: 2.5,
    images: [
      '/hotels/hotel1.png',
      '/hotels/hotel2.png',
      '/hotels/hotel3.png',
      '/hotels/hotel4.png',
      '/hotels/hotel5.png',
      '/hotels/hotel6.png'
    ]
  },
  {
    id: 2,
    title: "Resort Paradise Beach",
    nbLit: 4,
    nbChambre: 2,
    nbNuit: 5,
    totalPrice: 1200,
    pricePerNight: 240,
    rating: 4.9,
    distancce: 1.2,
    images: [
      '/hotels/hotel2.png',
      '/hotels/hotel3.png',
      '/hotels/hotel4.png'
    ]
  },
  {
    id: 3,
    title: "Boutique Hotel Central",
    nbLit: 1,
    nbChambre: 1,
    nbNuit: 2,
    totalPrice: 180,
    pricePerNight: 90,
    rating: 4.5,
    distancce: 0.8,
    images: [
      '/hotels/hotel3.png',
      '/hotels/hotel6.png',
      '/hotels/hotel5.png'
    ]
  },
  {
    id: 4,
    title: "Luxury Mountain Lodge",
    nbLit: 6,
    nbChambre: 3,
    nbNuit: 7,
    totalPrice: 2100,
    pricePerNight: 300,
    rating: 4.7,
    distancce: 5.3,
    images: [
      '/hotels/hotel6.png',
      '/hotels/hotel4.png',
      '/hotels/hotel1.png'
    ]
  },
  {
    id: 5,
    title: "City Business Hotel",
    nbLit: 2,
    nbChambre: 1,
    nbNuit: 1,
    totalPrice: 120,
    pricePerNight: 120,
    rating: 4.3,
    distancce: 0.5,
    images: [
      '/hotels/hotel5.png',
      '/hotels/hotel6.png',
      '/hotels/hotel1.png'
    ]
  },
  {
    id: 6,
    title: "Seaside Villa Resort",
    nbLit: 8,
    nbChambre: 4,
    nbNuit: 10,
    totalPrice: 3500,
    pricePerNight: 350,
    rating: 4.9,
    distancce: 3.1,
    images: [
      '/hotels/hotel6.png',
      '/hotels/hotel4.png',
      '/hotels/hotel1.png'
    ]
  },
  {
    id: 7,
    title: "Hotel Marrakech",
    nbLit: 2,
    nbChambre: 1,
    nbNuit: 1,
    totalPrice: 120,
    pricePerNight: 120,
    rating: 4.5,
    distancce: 0.5,
    images: [
      '/hotels/hotel1.png',
      '/hotels/hotel2.png',
      '/hotels/hotel3.png'
    ]
  },
  {
    id: 8,
    title: "Hotel Marrakech de rire pour les enfants",
    nbLit: 2,
    nbChambre: 1,
    nbNuit: 1,
    totalPrice: 120,
    pricePerNight: 120,
    rating: 4.5,
    distancce: 0.5,
    images: [
      '/hotels/hotel1.png',
      '/hotels/hotel2.png',
      '/hotels/hotel3.png'
    ]
  },
  {
    id: 9,
    title: "Hotel Marrakech de rire pour les enfants",
    nbLit: 2,
    nbChambre: 1,
    nbNuit: 1,
    totalPrice: 120,
    pricePerNight: 120,
    rating: 4.5,
    distancce: 0.5,
    images: [
      '/hotels/hotel1.png',
      '/hotels/hotel2.png',
      '/hotels/hotel3.png'
    ]
  },
  {
    id: 10,
    title: "Hotel Marrakech de rire pour les enfants",
    nbLit: 2,
    nbChambre: 1,
    nbNuit: 1,
    totalPrice: 120,
    pricePerNight: 120,
    rating: 4.5,
    distancce: 0.5,
    images: [
      '/hotels/hotel1.png',
      '/hotels/hotel2.png',
      '/hotels/hotel3.png'
    ]
  }
];

// Sample service data
const services = [
  {
    id: 1,
    title: "Restaurant Marrakech Gourmet",
    type: ["Restaurant", "Cuisine locale"],
    rating: 4.7,
    distance: 0.3,
    minimumPrice: 150,
    maximumPrice: 300,
    status: 'Ouvert',
    images: [
      '/services/service-prop1.png',
      '/services/service-prop2.png',
      '/services/service-prop3.png'
    ]
  },
  {
    id: 2,
    title: "Spa & Wellness Center",
    type: ["Spa", "Bien-être"],
    rating: 4.9,
    distance: 1.5,
    minimumPrice: 200,
    maximumPrice: 500,
    status: 'Ouvert',
    images: [
      '/services/service-prop2.png',
    ]
  },
  {
    id: 3,
    title: "Night Club Le Riad",
    type: ["Nightlife", "Bar"],
    rating: 4.5,
    distance: 0.8,
    minimumPrice: 100,
    maximumPrice: 250,
    status: 'Ouvert',
    images: [
      '/services/service-prop4.png',
    ]
  },
  {
    id: 4,
    title: "Golf Club Marrakech",
    type: ["Sport", "Golf"],
    rating: 4.8,
    distance: 5.2,
    minimumPrice: 400,
    maximumPrice: 800,
    status: 'Ouvert',
    images: [
      '/services/service-prop5.png',
    ]
  },
  {
    id: 5,
    title: "Boutique Artisanale",
    type: ["Shopping", "Artisanat"],
    rating: 4.3,
    distance: 0.5,
    minimumPrice: 50,
    maximumPrice: 500,
    status: 'Ouvert',
    images: [
      '/services/service-prop2.png',
      '/services/service-prop4.png',
    ]
  },
  {
    id: 6,
    title: "Cinéma Majorelle",
    type: ["Divertissement", "Cinéma"],
    rating: 4.6,
    distance: 1.1,
    minimumPrice: 80,
    maximumPrice: 120,
    status: 'Ouvert',
    images: [
      '/services/service-prop5.png',
    ]
  }
];

// Sample experience data
const experiences = [
  {
    id: 1,
    title: "Balade en chameau dans le désert",
    type: ["Aventure", "Desert"],
    rating: 4.8,
    distance: 8.5,
    price: 350,
    nbPeople: 2,
    images: [
      '/experiences/exp1.png',
      '/experiences/exp2.png',
      '/experiences/exp3.png'
    ]
  },
  {
    id: 2,
    title: "Visite guidée des souks de Marrakech",
    type: ["Culture", "Shopping"],
    rating: 4.9,
    distance: 0.5,
    price: 120,
    nbPeople: 4,
    images: [
      '/experiences/exp4.png',
      '/experiences/exp5.png'
    ]
  },
  {
    id: 3,
    title: "Cours de cuisine marocaine",
    type: ["Gastronomie", "Atelier"],
    rating: 4.7,
    distance: 1.2,
    price: 250,
    nbPeople: 6,
    images: [
      '/experiences/exp2.png',
      '/experiences/exp4.png',
    ]
  },
  {
    id: 4,
    title: "Vol en montgolfière au lever du soleil",
    type: ["Aventure", "Panoramique"],
    rating: 5.0,
    distance: 12.0,
    price: 850,
    nbPeople: 2,
    images: [
      '/experiences/exp5.png',
      '/experiences/exp1.png'
    ]
  },
  {
    id: 5,
    title: "Balade à vélo dans la Palmeraie",
    type: ["Sport", "Nature"],
    rating: 4.6,
    distance: 4.0,
    price: 180,
    nbPeople: 4,
    images: [
      '/experiences/exp1.png',
      '/experiences/exp2.png',
      '/experiences/exp4.png'
    ]
  },
  {
    id: 6,
    title: "Spectacle de danse berbère",
    type: ["Spectacle", "Culture"],
    rating: 4.5,
    distance: 0.3,
    price: 150,
    nbPeople: 2,
    images: [
      '/experiences/exp3.png',
      '/experiences/exp4.png',
      '/experiences/exp5.png'
    ]
  }
];

const HotelListing: React.FC = () => {
  const { isCollapsed: isSidebarCollapsed } = useSideListing();
  const [selectedTab, setSelectedTab] = useState('logement');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [selectedAffichageType, setSelectedAffichageType] = useState('parliste');
  const [fullscreen, setFullscreen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const [isMobileTabVisible, setIsMobileTabVisible] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);
  const tabSelectionRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef(0);
  const scrollTickingRef = useRef(false);
  const [isTypeListingPopupOpen, setIsTypeListingPopupOpen] = useState(false);
  const [isAffTypePopupOpen, setIsAffTypePopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const [searchBarPosition, setSearchBarPosition] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (scrollTickingRef.current) return;
      scrollTickingRef.current = true;
      window.requestAnimationFrame(() => {
        const currentTop = container.scrollTop;
        const delta = currentTop - lastScrollTopRef.current;
        const threshold = 8; // small threshold to avoid flicker

        if (currentTop < 10) {
          setIsSearchBarVisible(true);
          setIsMobileTabVisible(true);
        } else if (delta > threshold) {
          // scrolling down → hide
          setIsSearchBarVisible(false);
          setIsMobileTabVisible(false);
        } else if (delta < -threshold) {
          // scrolling up → show
          setIsSearchBarVisible(true);
          setIsMobileTabVisible(true);
        }

        lastScrollTopRef.current = currentTop <= 0 ? 0 : currentTop;
        scrollTickingRef.current = false;
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll as EventListener);
  }, []);

  // Update SearchBar position based on cards grid width
  useEffect(() => {
    const updateSearchBarPosition = () => {
      // Use the container that holds the grid for more accurate positioning
      const container = cardsContainerRef.current || cardsGridRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        // Calculate center: left edge + half width
        const centerX = rect.left + (rect.width / 2);
        setSearchBarPosition({
          left: centerX,
          width: rect.width
        });
      }
    };

    // Add a small delay to ensure layout has updated after sidebar state change
    const timeoutId = setTimeout(() => {
      updateSearchBarPosition();
    }, 300); // Increased delay to account for sidebar transition

    // Also update immediately in case layout is already stable
    updateSearchBarPosition();

    window.addEventListener('resize', updateSearchBarPosition);
    window.addEventListener('scroll', updateSearchBarPosition, true);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateSearchBarPosition);
      window.removeEventListener('scroll', updateSearchBarPosition, true);
    };
  }, [isSidebarCollapsed, selectedAffichageType]);

  // Calculate popup position when opened
  useEffect(() => {
    const updatePosition = () => {
      if ((isTypeListingPopupOpen || isAffTypePopupOpen) && tabSelectionRef.current) {
        const rect = tabSelectionRef.current.getBoundingClientRect();
        setPopupPosition({
          top: rect.bottom + 8, // 8px gap below the component
          left: rect.left,
          width: rect.width
        });
      }
    };

    updatePosition();

    // Update position on scroll or resize
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isTypeListingPopupOpen, isAffTypePopupOpen]);

  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Navbar at the top */}
        <Navbar logoColor="normal" background="white" blur={true} iconVariant="transparent" profileImg="/images/boy.png" />

        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* SideListing - Dynamic width */}
          <div className={`flex-shrink-0 sm:hidden md:block lg:block xl:block  ml-[2%] transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-[80px]' : 'w-[22%]'
            }`}>
            <SideListing />
          </div>

          {/* Card listings - Takes remaining width */}
          <div ref={listRef} className="flex-1 flex overflow-y-auto scrollbar-hide mt-[5%] sm:mt-[15%] md:mt-[5%] lg:mt-[5%] xl:mt-[5%]">
            <div ref={cardsContainerRef} className={`p-6 sm:p-3 md:p-6 lg:p-6 xl:p-6 sm:pt-[28%] md:pt-6 lg:pt-6 xl:pt-6 ${isSidebarCollapsed ? 'sm:w-full md:w-full lg:w-[87%] xl:w-[87%]' : 'sm:w-full md:w-full lg:w-[82%] xl:w-[82%]'} ml-[68px] sm:ml-0 md:ml-0 lg:ml-[68px] xl:ml-[68px]`}>
              {/* Mobile Tab Selection - Fixed position on small devices */}
              <div ref={tabSelectionRef} className={`fixed top-20 left-0 right-0 z-20 sm:block md:hidden lg:hidden xl:hidden px-[12px] mt-1 h-[8%] transform transition-all duration-500 ease-in-out ${isMobileTabVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
                }`}>
                <TabSelectionMobile
                  selectedTab={selectedTab}
                  onTabChange={setSelectedTab}
                  selectedAffichageType={selectedAffichageType}
                  onAffichageTypeChange={setSelectedAffichageType}
                  onOpenTabPopup={() => setIsTypeListingPopupOpen(true)}
                  onOpenAffichagePopup={() => setIsAffTypePopupOpen(true)}
                />
              </div>
              {/* Header */}
              <div className="text-left mb-[28px]">
                <h1 className="text-[36px] sm:text-[24px] md:text-[36px] lg:text-[36px] xl:text-[36px] sm:leading-[36px] md:leading-[48px] lg:leading-[48px] xl:leading-[48px] font-bold font-outfit text-slate-800 mb-4">
                  Voyage pour un riad traditionnel à Marrakech
                </h1>
                {/* Search Criteria Component */}
                <div className="flex gap-[24px] items-center">
                  {/* Date Range */}
                  <div className="flex gap-1.5 items-center">
                    <div className="w-[24px] h-[24px] flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 12C2 8.229 2 6.343 3.172 5.172C4.344 4.001 6.229 4 10 4H14C17.771 4 19.657 4 20.828 5.172C21.999 6.344 22 8.229 22 12V14C22 17.771 22 19.657 20.828 20.828C19.656 21.999 17.771 22 14 22H10C6.229 22 4.343 22 3.172 20.828C2.001 19.656 2 17.771 2 14V12Z" stroke="#475569" stroke-width="1.5" />
                        <path opacity="0.5" d="M7 4V2.5M17 4V2.5M2.5 9H21.5" stroke="#475569" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M18 17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18C16.7348 18 16.4804 17.8946 16.2929 17.7071C16.1054 17.5196 16 17.2652 16 17C16 16.7348 16.1054 16.4804 16.2929 16.2929C16.4804 16.1054 16.7348 16 17 16C17.2652 16 17.5196 16.1054 17.7071 16.2929C17.8946 16.4804 18 16.7348 18 17ZM18 13C18 13.2652 17.8946 13.5196 17.7071 13.7071C17.5196 13.8946 17.2652 14 17 14C16.7348 14 16.4804 13.8946 16.2929 13.7071C16.1054 13.5196 16 13.2652 16 13C16 12.7348 16.1054 12.4804 16.2929 12.2929C16.4804 12.1054 16.7348 12 17 12C17.2652 12 17.5196 12.1054 17.7071 12.2929C17.8946 12.4804 18 12.7348 18 13ZM13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17C11 16.7348 11.1054 16.4804 11.2929 16.2929C11.4804 16.1054 11.7348 16 12 16C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17ZM13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13ZM8 17C8 17.2652 7.89464 17.5196 7.70711 17.7071C7.51957 17.8946 7.26522 18 7 18C6.73478 18 6.48043 17.8946 6.29289 17.7071C6.10536 17.5196 6 17.2652 6 17C6 16.7348 6.10536 16.4804 6.29289 16.2929C6.48043 16.1054 6.73478 16 7 16C7.26522 16 7.51957 16.1054 7.70711 16.2929C7.89464 16.4804 8 16.7348 8 17ZM8 13C8 13.2652 7.89464 13.5196 7.70711 13.7071C7.51957 13.8946 7.26522 14 7 14C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12C7.26522 12 7.51957 12.1054 7.70711 12.2929C7.89464 12.4804 8 12.7348 8 13Z" fill="#475569" />
                      </svg>
                    </div>
                    <p className="font-bold sm:font-semibold md:font-bold lg:font-bold xl:font-bold text-[20px] sm:text-[18px] md:text-[20px] lg:text-[20px] xl:text-[20px] text-slate-600 font-outfit">
                      Du 6 au 18 octobre
                    </p>
                  </div>

                  {/* Guest Count */}
                  <div className="flex gap-1.5 items-center">
                    <div className="w-[24px] h-[24px] flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z" stroke="#475569" stroke-width="1.5" />
                        <path opacity="0.5" d="M12 21C15.866 21 19 19.2091 19 17C19 14.7909 15.866 13 12 13C8.13401 13 5 14.7909 5 17C5 19.2091 8.13401 21 12 21Z" stroke="#475569" stroke-width="1.5" />
                      </svg>
                    </div>
                    <p className="font-bold sm:font-semibold md:font-bold lg:font-bold xl:font-bold text-[20px] sm:text-[18px] md:text-[20px] lg:text-[20px] xl:text-[20px] text-slate-600 font-outfit">
                      2 Personnes
                    </p>
                  </div>
                </div>
              </div>

              {/* Tab Selection Component - Desktop only */}
              <div className="sm:hidden md:block lg:block xl:block">
                <TabSelection
                  selectedTab={selectedTab}
                  onTabChange={setSelectedTab}
                  affichageType={selectedAffichageType}
                  setAffichageType={setSelectedAffichageType}
                />
              </div>

              {/* Cards Grid */}
              {selectedAffichageType === 'parliste' && (
                <div ref={cardsGridRef} className={`grid gap-x-[28px] gap-y-[54px] w-full ${isSidebarCollapsed
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                  }`}>
                  {/* Render based on selected tab */}
                  {selectedTab === 'logement' && hotels.map((hotel) => (
                    <ItemCard
                      onClick={() => navigate(`/details/${hotel.id}`, { state: { hotel } })}
                      key={hotel.id}
                      id={hotel.id}
                      type="Hotel"
                      hotel={{
                        id: hotel.id,
                        title: hotel.title,
                        nbLit: hotel.nbLit,
                        nbChambre: hotel.nbChambre,
                        nbNuit: hotel.nbNuit,
                        totalPrice: hotel.totalPrice,
                        pricePerNight: hotel.pricePerNight,
                        rating: hotel.rating,
                        distancce: hotel.distancce,
                        images: hotel.images
                      }}
                    />
                  ))}
                  {selectedTab === 'service' && services.map((service) => (
                    <ItemCard
                      onClick={() => navigate(`/details/${service.id}`, { state: { service } })}
                      key={service.id}
                      id={service.id}
                      type="Service"
                      service={{
                        id: service.id,
                        title: service.title,
                        type: service.type,
                        rating: service.rating,
                        nbRating: 10,
                        distance: service.distance,
                        minimumPrice: service.minimumPrice,
                        maximumPrice: service.maximumPrice,
                        status: service.status as 'Ouvert' | 'Fermé',
                        images: service.images
                      }}
                    />
                  ))}
                  {selectedTab === 'experience' && experiences.map((experience) => (
                    <ItemCard
                      key={experience.id}
                      id={experience.id}
                      type="Experience"
                      onClick={() => navigate(`/details/${experience.id}`, { state: { experience } })}
                      experience={{
                        id: experience.id,
                        title: experience.title,
                        type: experience.type,
                        rating: experience.rating,
                        nbRating: 10,
                        distance: experience.distance,
                        price: experience.price,
                        nbPeople: experience.nbPeople,
                        images: experience.images
                      }}
                    />
                  ))}
                  {/*Searchbar component for desktop - hides on scroll down */}
                  {/* Fixed SearchBar at bottom center - aligned with cards grid */}
                  <div
                    className={`fixed sm:hidden md:block lg:block xl:block z-20 bottom-4 
                        flex items-end justify-center 
                        p-4 transition-all duration-500 ease-in-out
                     ${isSearchBarVisible
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none'
                      }`}
                    style={{
                      left: `${searchBarPosition.left}px`,
                      transform: `translateX(-50%) translateY(${isSearchBarVisible ? '0' : '100%'})`,
                      width: `${Math.min(searchBarPosition.width * 0.9, 700)}px`,
                      height: fullscreen ? '70%' : 'auto',
                      willChange: 'transform, opacity',
                    }}
                  >
                    <SearchBar
                      fullscreen={fullscreen}
                      setFullscreen={setFullscreen}
                      width={100}
                      fullHeight={90}
                      height={100}
                    />
                  </div>
                </div>
              )}

              {selectedAffichageType === 'parzone' && (
                <div className="grid gap-x-2 gap-y-3 w-full">
                  {/* Render Map */}
                  <div className="w-full h-[480px]">
                    <img src="/images/carte.png" alt="Map" className="w-full h-full object-cover flex sm:hidden md:hidden lg:flex xl:flex" />
                    <img src="/images/map-mobile.png" alt="Map" className="w-full h-full object-cover hidden sm:flex md:flex lg:hidden xl:hidden" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BRButton onClick={() => setIsMobileSearchOpen(true)} />

      {/* Tab Selection Popup */}
      {isTypeListingPopupOpen && (
        <>
          {/* Backdrop - Full page shadow */}
          <div
            className="fixed h-screen w-screen inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={() => setIsTypeListingPopupOpen(false)}
          />
          <TabSelectionMobilePopup
            selectedTab={selectedTab}
            onTabChange={(tab) => {
              setSelectedTab(tab);
              setIsTypeListingPopupOpen(false);
            }}
            isOpen={isTypeListingPopupOpen}
            onClose={() => setIsTypeListingPopupOpen(false)}
            position={popupPosition || undefined}
          />
        </>
      )}

      {/* Affichage Type Popup */}
      {isAffTypePopupOpen && (
        <>
          {/* Backdrop - Full page shadow */}
          <div
            className="fixed h-screen w-screen inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={() => setIsAffTypePopupOpen(false)}
          />
          <AffichageTypePopup
            isOpen={isAffTypePopupOpen}
            onClose={() => setIsAffTypePopupOpen(false)}
            selectedTab={selectedAffichageType}
            onTabChange={(affichageType) => {
              setSelectedAffichageType(affichageType);
              setIsAffTypePopupOpen(false);
            }}
            position={popupPosition || undefined}
          />
        </>
      )}

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <MobileOverlay setIsMobileSearchOpen={setIsMobileSearchOpen} />
      )}

    </>
  );
};

export default HotelListing;
