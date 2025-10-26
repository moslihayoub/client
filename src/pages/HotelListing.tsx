import React, { useState } from "react";
import ItemCard from "../components/HoltelCard";
import { ServiceCardProps, ExperienceCardProps } from "../components/HoltelCard";
import SideListing from "../components/SideListing";
import Navbar from "../components/Navbar";
import TabSelection from "../components/TabSelection";
import TabSelectionMobile from "../components/TabSelectionMobile";
import BRButton from "../components/BRButton";
import MobileSearchbar from "../components/MobileSearchbar";
import MobileOverlay from "../components/MobileOverlay";

// Sample hotel data
const hotels = [
  {
    id: 1,
    title: "Hotel Plaza Premium",
    nbLit: 2,
    nbChambre: 1,
    nbNuit: 3,
    totalPrice: 450,
    pricePerNight: 150,
    rating: 4.8,
    distancce: 2.5,
    images: [
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
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
      '/images/bg1.png',
      '/images/bg2.png',
      '/images/bg3.png'
    ]
  }
];

const HotelListing: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState('logement');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Navbar at the top */}
        <Navbar logoColor="normal" background="white" iconVariant="transparent" profileImg="/images/boy.png" />

        {/* Main content area */}
        <div className="flex flex-1 overflow-hidden">
          {/* SideListing - Dynamic width */}
          <div className={`flex-shrink-0 sm:hidden md:block lg:block xl:block  ml-[2%] transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? 'w-[80px]' : 'w-[22%]'
          }`}>
            <SideListing onCollapseChange={setIsSidebarCollapsed} />
          </div>

          {/* Card listings - Takes remaining width */}
          <div className="flex-1 overflow-y-auto scrollbar-hide mt-[5%] sm:mt-[15%] md:mt-[5%] lg:mt-[5%] xl:mt-[5%]">
            <div className="p-6 sm:pt-[28%] md:pt-6 lg:pt-6 xl:pt-6">
              {/* Mobile Tab Selection - Fixed position on small devices */}
              <div className="fixed top-20 left-0 right-0 z-20 sm:block md:hidden lg:hidden xl:hidden px-6 mt-1">
                <TabSelectionMobile 
                  selectedTab={selectedTab} 
                  onTabChange={setSelectedTab} 
                />
              </div>
              {/* Header */}
              <div className="text-left mb-8">
                <h1 className="text-4xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4">
                  Voyage pour un riad traditionnel à Marrakech
                </h1>
                {/* Search Criteria Component */}
                <div className="flex gap-6 items-center">
                  {/* Date Range */}
                  <div className="flex gap-1.5 items-center">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#475569" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15.6947 13.7H15.7037M15.6947 16.7H15.7037M11.9955 13.7H12.0045M11.9955 16.7H12.0045M8.29431 13.7H8.30329M8.29431 16.7H8.30329" stroke="#475569" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-bold text-md text-slate-600 font-outfit leading-8">
                      Du 6 au 18 octobre
                    </p>
                  </div>
                  
                  {/* Guest Count */}
                  <div className="flex gap-1.5 items-center">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#475569" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" stroke="#475569" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-bold text-md text-slate-600 font-outfit leading-8">
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
                />
              </div>

              {/* Cards Grid */}
              <div className={`grid gap-x-2 gap-y-3 w-full ${
                isSidebarCollapsed 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
              }`}>
                {/* Render based on selected tab */}
                {selectedTab === 'logement' && hotels.map((hotel) => (
                  <ItemCard
                    key={hotel.id}
                    type="Hotel"
                    hotel={{
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
                    key={service.id}
                    type="Service"
                    service={{
                      title: service.title,
                      type: service.type,
                      rating: service.rating,
                      nbRating: 10,
                      distance: service.distance,
                      minimumPrice: service.minimumPrice,
                      maximumPrice: service.maximumPrice,
                      status: service.status as 'Ouvert' | 'Fermé'  ,
                      images: service.images
                    }}
                  />
                ))}
                {selectedTab === 'experience' && experiences.map((experience) => (
                  <ItemCard
                    key={experience.id}
                    type="Experience"
                    experience={{
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
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="fixed sm:hidden md:hidden lg:block xl:block z-20 bottom-4 right-4 w-[172px] h-[172px]">
        <img
          src="/images/bot.png"
          alt="Bot"
          className="w-full h-full animate-float"
        />
      </div>
      <BRButton onClick={() => setIsMobileSearchOpen(true)} />

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <MobileOverlay setIsMobileSearchOpen={setIsMobileSearchOpen} />
      )}

    </>
  );
};

export default HotelListing;
