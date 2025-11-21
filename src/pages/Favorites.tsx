import React, { useState, useEffect, useRef } from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useSideListing } from '../contexts/SideListingContext';
import ItemCard from '../components/HoltelCard';
import Navbar from '../components/Navbar';
import SideListing from '../components/SideListing';
import TabSelection from '../components/TabSelection';
import TabSelectionMobile from '../components/TabSelectionMobile';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const { isCollapsed: isSidebarCollapsed } = useSideListing();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<string>('logement');
  const [fullscreen, setFullscreen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchBarPosition, setSearchBarPosition] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const listRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  // Filter favorites based on selected tab
  const filteredFavorites = favorites.filter(item => {
    if (selectedTab === 'logement') return item.type === 'Hotel';
    if (selectedTab === 'service') return item.type === 'Service';
    if (selectedTab === 'experience') return item.type === 'Experience';
    if (selectedTab === 'health') return item.type === 'Health';
    return true;
  });

  // Show SearchBar after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearchBarVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll to show/hide SearchBar
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const lastScrollTopRef = { current: 0 };
    const scrollTickingRef = { current: false };

    const handleScroll = () => {
      if (scrollTickingRef.current) return;

      scrollTickingRef.current = true;
      requestAnimationFrame(() => {
        const currentTop = container.scrollTop;
        const delta = currentTop - lastScrollTopRef.current;
        const threshold = 8;

        if (currentTop < 10) {
          setIsSearchBarVisible(true);
        } else if (delta > threshold) {
          // scrolling down → hide
          setIsSearchBarVisible(false);
        } else if (delta < -threshold) {
          // scrolling up → show
          setIsSearchBarVisible(true);
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
      const container = cardsContainerRef.current || cardsGridRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + (rect.width / 2);
        setSearchBarPosition({
          left: centerX,
          width: rect.width
        });
      }
    };

    const timeoutId = setTimeout(() => {
      updateSearchBarPosition();
    }, 300);

    updateSearchBarPosition();

    window.addEventListener('resize', updateSearchBarPosition);
    window.addEventListener('scroll', updateSearchBarPosition, true);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateSearchBarPosition);
      window.removeEventListener('scroll', updateSearchBarPosition, true);
    };
  }, [isSidebarCollapsed]);

  return (
    <>
      <div className="flex flex-col h-screen bg-slate-50">
        {/* Navbar at the top */}
        <Navbar iconVariant="transparent" logoColor="normal" background="white" blur={true} currentActiveItem="heart" profileImg="/users/user1.png" />

        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* SideListing - Dynamic width */}
          <div className={`flex-shrink-0 sm:hidden md:block lg:block xl:block ml-[2%] transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-[80px]' : 'w-[22%]'}`}>
            <SideListing />
          </div>

          {/* Card listings - Takes remaining width */}
          <div ref={listRef} className="flex-1 flex overflow-y-auto scrollbar-hide mt-[5%] sm:mt-[15%] md:mt-[5%] lg:mt-[5%] xl:mt-[5%]">
            <div ref={cardsContainerRef} className={`p-6 sm:p-3 md:p-6 lg:p-6 xl:p-6 sm:pt-[28%] md:pt-6 lg:pt-6 xl:pt-6 ${isSidebarCollapsed ? 'sm:w-full md:w-full lg:w-[87%] xl:w-[87%]' : 'sm:w-full md:w-full lg:w-[82%] xl:w-[82%]'} ml-[68px] sm:ml-0 md:ml-0 lg:ml-[68px] xl:ml-[68px]`}>
              
              {/* Mobile Tab Selection - Fixed position on small devices */}
              <div className="fixed top-20 left-0 right-0 z-20 sm:block md:hidden lg:hidden xl:hidden px-[12px] mt-1 h-[8%]">
                <TabSelectionMobile
                  selectedTab={selectedTab}
                  onTabChange={setSelectedTab}
                  selectedAffichageType="parliste"
                  onAffichageTypeChange={() => {}}
                  onOpenTabPopup={() => {}}
                  onOpenAffichagePopup={() => {}}
                />
              </div>

              <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center w-[44px] h-[44px] rounded-[12px] bg-white hover:bg-slate-100 transition-all duration-200 shadow-sm hover:shadow-md group"
              aria-label="Retour au listing"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:-translate-x-1 transition-transform duration-200">
                <path d="M15 18L9 12L15 6" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1 className="text-[40px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[40px] font-bold text-slate-800 font-bricolagegrotesque">
              Mes Favoris
            </h1>
          </div>
          
        </div>

        {/* Tab Selection Component - Desktop only */}
        <div className="sm:hidden md:block lg:block xl:block">
          <TabSelection
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            affichageType="parliste"
            setAffichageType={() => {}}
          />
        </div>

        {filteredFavorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 mb-6 flex items-center justify-center">
              <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M64 112C38.4 112 16 89.6 16 64C16 38.4 38.4 16 64 16C89.6 16 112 38.4 112 64C112 89.6 89.6 112 64 112ZM64 24C42.88 24 24 42.88 24 64C24 85.12 42.88 104 64 104C85.12 104 104 85.12 104 64C104 42.88 85.12 24 64 24Z" fill="#CBD5E1"/>
                <path d="M64 92C46.32 92 32 77.68 32 60C32 42.32 46.32 28 64 28C81.68 28 96 42.32 96 60C96 77.68 81.68 92 64 92ZM64 36C50.8 36 40 46.8 40 60C40 73.2 50.8 84 64 84C77.2 84 88 73.2 88 60C88 46.8 77.2 36 64 36Z" fill="#E11D48"/>
              </svg>
            </div>
            <p className="text-[20px] text-slate-500 font-vendsans mb-4">
              Aucun favori dans {selectedTab === 'logement' ? 'Logement' : selectedTab === 'service' ? 'Services' : selectedTab === 'experience' ? 'Expériences' : 'Health'}
            </p>
            <button 
              onClick={() => navigate('/hotels')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 via-sky-500 to-fuchsia-500 text-white rounded-[12px] font-bricolagegrotesque font-medium hover:scale-105 transition-transform duration-200"
            >
              Découvrir des {selectedTab === 'logement' ? 'logements' : selectedTab === 'service' ? 'services' : selectedTab === 'experience' ? 'expériences' : 'health'}
            </button>
          </div>
        ) : (
          <div ref={cardsGridRef} className={`grid gap-x-[28px] gap-y-[54px] w-full ${isSidebarCollapsed
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
          }`}>
            {filteredFavorites.map((item) => (
              <ItemCard
                key={`${item.type}-${item.id}`}
                id={item.id}
                type={item.type}
                hotel={item.hotel}
                service={item.service}
                experience={item.experience}
                health={item.health}
                onClick={() => {
                  if (item.type === 'Hotel') {
                    navigate(`/details/${item.id}`);
                  } else {
                    navigate('/details');
                  }
                }}
              />
            ))}
          </div>
        )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;

