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
import { Link, useNavigate } from "react-router-dom";
import { useSideListing } from "../contexts/SideListingContext";
import SearchBar from "../components/SearchBar";
import TabSelectionMobilePopup from "../components/TabSelectionMobilePopup";
import AffichageTypePopup from "../components/AffichageTypePopup";
import listingData from "../data/listingData.json";
import MobileListingPage from "../components/listing/MobileListingPage";
import PublicityBanner from "../components/listing/PublicityBanner";
import Map from "../components/details/Map";

// Import data from JSON file
const { hotels, services, experiences, healths } = listingData as {
  hotels: any[];
  services: any[];
  experiences: any[];
  healths: any[];
};

const HotelListing: React.FC = () => {
  const { isCollapsed: isSidebarCollapsed } = useSideListing();
  // Restore selected tab from localStorage on mount
  const [selectedTab, setSelectedTab] = useState(() => {
    const savedTab = localStorage.getItem('selectedListingTab');
    return savedTab || 'logement';
  });
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [selectedAffichageType, setSelectedAffichageType] = useState('parliste');
  const [fullscreen, setFullscreen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
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
  const [currentActiveItem, setCurrentActiveItem] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Generate markers dynamically from hotels/services/experiences based on selected tab
  const generateMarkers = () => {
    const baseLat = 31.6295; // Marrakech base latitude
    const baseLng = -7.9811; // Marrakech base longitude
    
    let items: any[] = [];
    let itemType: 'hotel' | 'service' | 'experience' | 'health' = 'hotel';
    
    if (selectedTab === 'logement') {
      items = hotels;
      itemType = 'hotel';
    } else if (selectedTab === 'service') {
      items = services;
      itemType = 'service';
    } else if (selectedTab === 'experience') {
      items = experiences;
      itemType = 'experience';
    } else if (selectedTab === 'sante') {
      items = healths;
      itemType = 'health';
    }

    return items.map((item, index) => {
      // Generate slightly different coordinates for each item
      const latOffset = (Math.sin(index * 0.5) * 0.02); // ~2km variation
      const lngOffset = (Math.cos(index * 0.5) * 0.02); // ~2km variation
      
      // Calculate distance from center (in km)
      const distance = Math.sqrt(latOffset * latOffset + lngOffset * lngOffset) * 111; // Convert to km
      
      const images = item.images || [];
      
      return {
        id: item.id,
        latitude: baseLat + latOffset,
        longitude: baseLng + lngOffset,
        title: item.title,
        rating: item.rating || 0,
        distance: distance,
        images: images,
        type: itemType,
        // Hotel fields
        nbLit: item.nbLit,
        nbChambre: item.nbChambre,
        nbNuit: item.nbNuit,
        totalPrice: item.totalPrice,
        pricePerNight: item.pricePerNight,
        // Service/Experience fields
        genre: item.genre,
        minimumPrice: item.minimumPrice,
        maximumPrice: item.maximumPrice,
        status: item.status,
        nbRating: item.nbRating,
        // Experience fields
        price: item.price,
        nbPeople: item.nbPeople,
        // Health fields
        jourDebut: item.jourDebut,
        jourFin: item.jourFin,
        heureDebut: item.heureDebut,
        heureFin: item.heureFin,
        onCardClick: () => {
          // Dynamic navigation based on type with state
          if (itemType === 'hotel') {
            navigate(`/details/${item.id}`, { state: { hotel: item } });
          } else if (itemType === 'service') {
            navigate(`/details/${item.id}`, { state: { service: item } });
          } else if (itemType === 'experience') {
            navigate(`/details/${item.id}`, { state: { experience: item } });
          } else if (itemType === 'health') {
            navigate(`/details/${item.id}`, { state: { health: item } });
          }
        }
      };
    }).filter(marker => (marker.pricePerNight || marker.minimumPrice || marker.price) && marker.images.length > 0);
  };

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animate searchbar on initial page load (slide up from bottom)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearchBarVisible(true);
    }, 350); // Slight delay so it slides up after content renders
    return () => clearTimeout(timer);
  }, []);

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
        <Navbar logoColor="normal" background="white" blur={true} iconVariant="transparent" profileImg="/users/user1.png"  />

        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* SideListing - Dynamic width */}
          <div className={`flex-shrink-0 sm:hidden md:block lg:block xl:block  ml-[2%] transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-[80px]' : 'w-[22%]'
            }`}>
            <SideListing />
          </div>

          {/* Card listings - Takes remaining width */}
          <div ref={listRef} className="flex-1 flex overflow-y-auto scrollbar-hide pt-[5%] sm:pt-[10%] md:pt-[5%] lg:pt-[5%] xl:pt-[5%]">
            <div ref={cardsContainerRef} className={`p-6 sm:p-3 md:p-6 lg:p-6 xl:p-6 sm:pt-[28%] md:pt-6 lg:pt-6 xl:pt-6 ${isSidebarCollapsed ? 'sm:w-full md:w-full lg:w-[87%] xl:w-[87%]' : 'sm:w-full md:w-full lg:w-[82%] xl:w-[82%]'} ml-[68px] sm:ml-0 md:ml-0 lg:ml-[68px] xl:ml-[68px]`}>
              {/* Mobile Tab Selection - Fixed position on small devices */}
              <div ref={tabSelectionRef} className={`fixed top-[8%] left-0 right-0 z-20 sm:block md:hidden lg:hidden xl:hidden px-[12px] mt-1 h-[8%] transform transition-all duration-500 ease-in-out ${isMobileTabVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
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
              {/* Breadcrumb - desktop only */}
              <div className="hidden md:flex flex-row gap-2 items-center justify-start w-full mb-[8px]">
                            <span className="text-[16px] font-bricolagegrotesque">
                                <Link to="/" className="text-sky-500 font-bricolagegrotesque">
                                    Accueil
                                </Link>
                            </span>
                            <span className="text-gray-500 font-bricolagegrotesque">/</span>
                            <span className="text-[16px] text-gray-500 font-bricolagegrotesque">
                                {selectedTab === "Hotel" && "Hôtels"}
                                {selectedTab === "Service" && "Services"}
                                {selectedTab === "Experience" && "Expériences"}
                                {selectedTab === "Health" && "Santé"}
                                {/* fallback if new types are added in the future */}
                                {["Hotel", "Service", "Experience", "Health"].indexOf(selectedTab) === -1 && selectedTab}
                            </span>
                        </div>
              {/* Header */}
              <div className="text-left mb-[28px]">
                {
                  currentActiveItem === 'heart' && (
                    <h1 className="text-[30px] sm:text-[24px] md:text-[30px] lg:text-[30px] xl:text-[30px] sm:leading-[36px] md:leading-[48px] lg:leading-[48px] xl:leading-[48px] font-bold font-bricolagegrotesque text-slate-800 mb-4">
                      Mes Favoris
                    </h1>
                  )
                }
                {
                  currentActiveItem !== 'heart' && (
                    <h1 className="text-[30px] sm:text-[24px] md:text-[30px] lg:text-[30px] xl:text-[30px] sm:leading-[36px] md:leading-[48px] lg:leading-[48px] xl:leading-[48px] font-bold font-bricolagegrotesque text-slate-800 mb-4">
                      Voyage pour un riad traditionnel à Marrakech
                    </h1>
                  )
                }
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
                    <p className="font-bold sm:font-semibold md:font-bold lg:font-bold xl:font-bold text-[20px] sm:text-[18px] md:text-[20px] lg:text-[20px] xl:text-[20px] text-slate-600 font-bricolagegrotesque">
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
                    <p className="font-bold sm:font-semibold md:font-bold lg:font-bold xl:font-bold text-[20px] sm:text-[18px] md:text-[20px] lg:text-[20px] xl:text-[20px] text-slate-600 font-bricolagegrotesque">
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

              {/* Mobile Listing Page for Services and Experiences */}
              {isMobile && (selectedTab === 'service' || selectedTab === 'experience') ? (
                <MobileListingPage
                  type={selectedTab === 'service' ? 'Service' : 'Experience'}
                  title={selectedTab === 'service' ? 'Services' : 'Expériences'}
                  allItems={selectedTab === 'service' 
                    ? services.map((s: any) => ({
                        id: s.id,
                        title: s.title,
                        genre: s.genre,
                        rating: s.rating,
                        nbRating: s.nbRating || 10,
                        distance: s.distance,
                        minimumPrice: s.minimumPrice,
                        maximumPrice: s.maximumPrice,
                        status: s.status as 'Ouvert' | 'Fermé',
                        menu: s.menu || [],
                        images: s.images,
                        hoteInfo: s.hoteInfo
                      }))
                    : experiences.map((e: any) => ({
                        id: e.id,
                        title: e.title,
                        genre: e.genre,
                        rating: e.rating,
                        nbRating: e.nbRating || 10,
                        distance: e.distance,
                        price: e.price,
                        nbPeople: e.nbPeople,
                        formules: e.formules || [],
                        images: e.images,
                        hoteInfo: e.hoteInfo
                      }))}
                  mostFrequentItems={(selectedTab === 'service' ? services : experiences)
                    .sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0))
                    .slice(0, 6)
                    .map((item: any) => selectedTab === 'service' 
                      ? {
                          id: item.id,
                          title: item.title,
                          genre: item.genre,
                          rating: item.rating,
                          nbRating: item.nbRating || 10,
                          distance: item.distance,
                          minimumPrice: item.minimumPrice,
                          maximumPrice: item.maximumPrice,
                          status: item.status as 'Ouvert' | 'Fermé',
                          menu: item.menu || [],
                          images: item.images,
                          hoteInfo: item.hoteInfo
                        }
                      : {
                          id: item.id,
                          title: item.title,
                          genre: item.genre,
                          rating: item.rating,
                          nbRating: item.nbRating || 10,
                          distance: item.distance,
                          price: item.price,
                          nbPeople: item.nbPeople,
                          formules: item.formules || [],
                          images: item.images,
                          hoteInfo: item.hoteInfo
                        })}
                  nearestItems={(selectedTab === 'service' ? services : experiences)
                    .sort((a: any, b: any) => (a.distance || 0) - (b.distance || 0))
                    .slice(0, 6)
                    .map((item: any) => selectedTab === 'service' 
                      ? {
                          id: item.id,
                          title: item.title,
                          genre: item.genre,
                          rating: item.rating,
                          nbRating: item.nbRating || 10,
                          distance: item.distance,
                          minimumPrice: item.minimumPrice,
                          maximumPrice: item.maximumPrice,
                          status: item.status as 'Ouvert' | 'Fermé',
                          menu: item.menu || [],
                          images: item.images,
                          hoteInfo: item.hoteInfo
                        }
                      : {
                          id: item.id,
                          title: item.title,
                          genre: item.genre,
                          rating: item.rating,
                          nbRating: item.nbRating || 10,
                          distance: item.distance,
                          price: item.price,
                          nbPeople: item.nbPeople,
                          formules: item.formules || [],
                          images: item.images,
                          hoteInfo: item.hoteInfo
                        })}
                />
              ) : (
                <>
              {/* Publicity Banner - Only for Hotels and Health in list mode, hidden on desktop */}
              {(selectedTab === 'logement' || selectedTab === 'health') && selectedAffichageType === 'parliste' && (
                <div className="w-full mb-[20px] sm:block md:hidden">
                  <PublicityBanner banners={[
                    {
                      image: '/services/service-prop1.png',
                      title: 'Réservez vos billets',
                      subtitle: 'Profitez de 30 % de réduction sur les trois premiers matchs de la Coupe du Monde 2030 ! Réservez dès maintenant !',
                      buttonText: 'Contactez-nous au : 0522 67 67 67',
                    },
                    {
                      image: '/services/service-prop2.png',
                      title: 'Découvrez notre atelier de travail du bois !',
                      subtitle: 'Réservez vos places dès maintenant pour une expérience créative inoubliable.',
                      buttonText: 'Contactez-nous au : 0522 67 67 67',
                    },
                  ]} />
                </div>
              )}

              {/* Cards Grid */}
              {selectedAffichageType === 'parliste' && (
                <div ref={cardsGridRef} className={`grid gap-x-[28px] gap-y-[54px] w-full ${isSidebarCollapsed
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
                  }`}>
                  {/* Render based on selected tab */}
                  {
                    
                  }
                  {selectedTab === 'logement' && hotels.map((hotel, index) => (
                    <React.Fragment key={hotel.id}>
                      <ItemCard
                        onClick={() => navigate(`/details/${hotel.id}`, { state: { hotel } })}
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
                      {index === 2 && (
                        <div className="w-full col-span-full sm:block md:hidden">
                          <div className="h-[209px] rounded-[20px] overflow-hidden relative">
                            <img
                              src="/services/service-prop3.png"
                              alt="Publicity Banner"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col justify-start items-start px-[25px] py-[24px]">
                              <div className="flex flex-col gap-[6px] items-start mb-[12px]">
                                <p className="text-[19.96px] font-bold font-bricolagegrotesque text-white leading-[21.9px] mb-0">
                                  Découvrez notre atelier de travail du bois !
                                </p>
                                <p className="text-[12.96px] font-normal font-bricolagegrotesque text-white leading-[16px]">
                                  Réservez vos places dès maintenant pour une expérience créative inoubliable.
                                </p>
                              </div>
                              <button
                                className="bg-black rounded-[836.92px] px-[19.93px] py-[11.63px] flex gap-[9.97px] items-center justify-center shadow-lg mt-auto"
                              >
                                <p className="text-[13.29px] font-medium font-bricolagegrotesque text-white leading-[19.93px]">
                                  Contactez-nous au : 0522 67 67 67
                                </p>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
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
                        genre: service.genre,
                        rating: service.rating,
                        nbRating: 10,
                        distance: service.distance,
                        minimumPrice: service.minimumPrice,
                        maximumPrice: service.maximumPrice,
                        status: service.status as 'Ouvert' | 'Fermé',
                        menu: service.menu,
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
                        genre: experience.genre,
                        rating: experience.rating,
                        nbRating: 10,
                        distance: experience.distance,
                        price: experience.price,
                        nbPeople: experience.nbPeople,
                        formules: experience.formules,
                        images: experience.images
                      }}
                    />
                  ))}
                  {selectedTab === 'health' && healths.map((health, index) => (
                    <React.Fragment key={health.id}>
                      <ItemCard
                        id={health.id}
                        type="Health"
                        onClick={() => navigate(`/details/${health.id}`, { state: { health } })}
                        health={{
                          id: health.id,
                          title: health.title,
                          genre: health.genre,
                          jourDebut: health.jourDebut,
                          jourFin: health.jourFin,
                          heureDebut: health.heureDebut,
                          heureFin: health.heureFin,
                          rating: health.rating,
                          nbRating: 10,
                          distance: health.distance,
                          status: health.status as 'Ouvert' | 'Fermé',
                          images: health.images
                        }}
                      />
                      {index === 2 && (
                        <div className="w-full col-span-full sm:block md:hidden">
                          <div className="h-[209px] rounded-[20px] overflow-hidden relative">
                            <img
                              src="/services/service-prop3.png"
                              alt="Publicity Banner"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col justify-start items-start px-[25px] py-[24px]">
                              <div className="flex flex-col gap-[6px] items-start mb-[12px]">
                                <p className="text-[19.96px] font-bold font-bricolagegrotesque text-white leading-[21.9px] mb-0">
                                  Découvrez notre atelier de travail du bois !
                                </p>
                                <p className="text-[12.96px] font-normal font-bricolagegrotesque text-white leading-[16px]">
                                  Réservez vos places dès maintenant pour une expérience créative inoubliable.
                                </p>
                              </div>
                              <button
                                className="bg-black rounded-[836.92px] px-[19.93px] py-[11.63px] flex gap-[9.97px] items-center justify-center shadow-lg mt-auto"
                              >
                                <p className="text-[13.29px] font-medium font-bricolagegrotesque text-white leading-[19.93px]">
                                  Contactez-nous au : 0522 67 67 67
                                </p>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {selectedAffichageType === 'parzone' && (
                <div className="grid gap-x-2 gap-y-3 w-full mb-[20px]">
                  {/* Render Leaflet Map */}
                  <div className="w-full h-[480px] mb-[30px]">
                    <Map 
                      key={`map-${selectedTab}-${selectedAffichageType}`}
                      latitude={31.6295}
                      longitude={-7.9811}
                      height="480px"
                      className="w-full"
                      markers={generateMarkers()}
                    />
                  </div>
                </div>
              )}

              {/*Searchbar component for desktop - hides on scroll down */}
              {/* Fixed SearchBar at bottom center - aligned with cards grid */}
              <div
                className={`fixed sm:hidden md:block lg:block xl:block z-20 bottom-4 
                    flex items-end justify-center 
                    p-4 transition-all duration-500 ease-out
                 ${isSearchBarVisible
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
                  }`}
                style={{
                  left: `${searchBarPosition.left}px`,
                  transform: `translateX(-50%) translateY(${isSearchBarVisible ? '0' : '160%'})`,
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
                </>
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
