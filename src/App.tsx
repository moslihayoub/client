import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage1 from "./pages/HomePage1";
import HomePage2 from "./pages/HomePage2";
import HomePage4 from "./pages/HomePage4";
import TestPage from "./pages/TestPage";
import HomePage5 from './pages/HomePage5';
import Homepage3 from './pages/Homepage3';
import VoiceAiVisualizer from './components/VoiceAiVisualizer';
import { AnimatePresence } from 'framer-motion';
import ProfileCard from './pages/ProfileCard';
import ProfileUpdate from './pages/ProfileUpdate';
import HotelListing from './pages/HotelListing';
import ImageDisplay from './components/details/ImageDisplay';
import Details from './pages/Details';
import HotelDetailWrapper from './pages/HotelDetailWrapper';
import SkHome from './svgs/icons/sky/SkHome';
import { SideListingProvider } from './contexts/SideListingContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import ImgDetails from './components/details/ImgDetails';
import Sitemap from './pages/Sitemap';
import Cards from './components/Cards';
import Favorites from './pages/Favorites';

// Component that randomly displays a homepage (excluding HomePage1)
function RandomHomepage() {
  const [selectedHomepage, setSelectedHomepage] = useState<string | null>(null);

  useEffect(() => {
    // Array of homepage names (excluding HomePage1)
    const homepages = ['HomePage2', 'Homepage3', 'HomePage4', 'HomePage5', 'Video'];

    // Randomly select a homepage
    const randomIndex = Math.floor(Math.random() * homepages.length);
    const selected = homepages[randomIndex];
    
    console.log(`🎲 Randomly selected: ${selected}`);
    setSelectedHomepage(selected);
  }, []); // Empty dependency array means this runs only once on mount

  // Show loading or fallback while random homepage is being selected
  if (!selectedHomepage) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render the randomly selected homepage based on the selected name
  switch (selectedHomepage) {
    case 'HomePage2':
      return <HomePage2 />;
    case 'Homepage3':
      return <Homepage3 />;
    case 'HomePage4':
      return <HomePage4 />;
    case 'HomePage5':
      return <HomePage5 input={{ type: 'background'}} />;
    case 'Video':
      return <HomePage5 input={{ type: 'video'}} />;
    default:
      return <HomePage2 />; // Fallback
  }
}

const desc = "Plongez dans l'envoûtement d'un riad marocain traditionnel, où chaque coin respire l'authenticité. Imaginez-vous vous détendre au bord d'une piscine scintillante, entouré de chambres somptueusement décorées qui allient confort moderne et touches artisanales.\n \n Ne manquez pas la terrasse sur le toit, un véritable havre de paix, offrant une vue panoramique à couper le souffle sur les toits de Marrakech, surtout au coucher du soleil. Ce riad est l'endroit idéal pour vivre une expérience inoubliable, mêlant luxe et culture."
const hoteDesc = "Plongez dans l'envoûtement d'un riad marocain traditionnel, où chaque coin respire l'authenticité. Imaginez-vous vous détendre au bord d'une piscine scintillante, entouré de chambres somptueusement décorées qui allient confort moderne et touches artisanales.\n \n Ne manquez pas la terrasse sur le toit, un véritable havre de paix, offrant une vue panoramique à couper le souffle sur les toits de Marrakech, surtout au coucher du soleil. Ce riad est l'endroit idéal pour vivre une expérience inoubliable, mêlant luxe et culture."
export default function App() {
  return (
    <SideListingProvider>
      <FavoritesProvider>
        <AnimatePresence mode='wait'>
          <Router>
            <Routes>
        <Route path="/" element={<RandomHomepage />} />
        <Route path="/homepage1" element={<HomePage1 />} />
        <Route path="/homepage2" element={<HomePage2 />} />
        <Route path="/homepage3" element={<Homepage3 />} />
        <Route path="/homepage4" element={<HomePage4 />} />
        <Route path="/homepage5" element={<HomePage5 input={{type: 'background'}} />} />
        <Route path="/bg-video" element={<HomePage5 input={{ type: 'video'}} />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/voiceai" element={<VoiceAiVisualizer />} />
        <Route path="/profile" element={<ProfileCard />} />
        <Route path="/profile-update" element={<ProfileUpdate />} />
        <Route path="/hotels" element={<HotelListing />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/images" element={<ImageDisplay images={['/images/bg1.png','/images/bg2.png','/images/bg3.png']} />} />
        <Route path="/details/:hotelId" element={<HotelDetailWrapper />} />
        <Route path="/img-details" element={<ImgDetails images={['/hotels/hotel1.png','/hotels/hotel2.png','/hotels/hotel3.png', '/hotels/hotel4.png', '/hotels/hotel5.png','/images/bg1.png','/images/bg2.png','/images/bg3.png']} />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/cards" element={<Cards cards={[
          // Memory cards
          {
            type: 'Memory',
            title: 'Mémoires',
            description: 'Intéresser cette expérience de poterie à Arfoud.',
            images: ['/hotels/hotel1.png', '/hotels/hotel2.png', '/hotels/hotel3.png', '/hotels/hotel4.png'],
            onNavigate: () => console.log('Navigate to memory page')
          },
          {
            type: 'Memory',
            title: 'Mes favoris',
            description: 'Hôtel à Geliz',
            images: ['/images/bg1.png', '/images/bg2.png', '/images/bg3.png'],
            onNavigate: () => console.log('Navigate to favorites page')
          },
          // Note cards
          {
            type: 'Note',
            title: 'Évent a venir',
            description: '12/10/2025\nSalut Snoussi, il te reste deux jours avant ton départ pour Marrakech.',
            backgroundColor: '#FACC15',
            onNavigate: () => console.log('Navigate to event page')
          },
          {
            type: 'Note',
            title: 'Note',
            description: 'Voyager à Taghazoute la première semaine de décembre',
            backgroundColor: '#F8FAFC',
            onNavigate: () => console.log('Navigate to note page')
          },
          // Icon cards
          {
            type: 'Icon',
            title: 'Voyages',
            icon: (
              <img src="/cards/valise.png" alt="Voyage" className="w-full h-full object-cover" />
            ),
            number: 5,
            text: 'Voyages',
            onNavigate: () => console.log('Navigate to voyages page')
          },
          {
            type: 'Icon',
            title: 'Réservations',
            icon: (
              <img src="/cards/teles.png" alt="Business" className="w-full h-full object-cover" />
            ),
            number: 12,
            text: 'Réservations',
            onNavigate: () => console.log('Navigate to reservations page')
          },
          {
            type: 'Icon',
            title: 'Expériences',
            icon: (
              <img src="/cards/agric.png" alt="Experiences" className="w-full h-full object-cover" />
            ),
            number: 8,
            text: 'Expériences',
            onNavigate: () => console.log('Navigate to experiences page')
          },
          // More Memory cards
          {
            type: 'Memory',
            title: 'Calendrier',
            description: 'Intéresser cette expérience de poterie à Arfoud.',
            images: ['/hotels/hotel5.png', '/hotels/hotel6.png'],
            onNavigate: () => console.log('Navigate to calendar page')
          },
          {
            type: 'Memory',
            title: 'Urgences',
            description: 'Clinique mère et enfant Rabat Agdal',
            images: ['/images/bg1.png', '/images/bg2.png', '/images/bg3.png', '/hotels/hotel1.png', '/hotels/hotel2.png'],
            onNavigate: () => console.log('Navigate to emergencies page')
          },
          // More Note cards with different colors
          {
            type: 'Note',
            title: 'Rappel important',
            description: 'N\'oubliez pas de confirmer votre réservation avant le 15 décembre.',
            backgroundColor: '#14B8A6',
            onNavigate: () => console.log('Navigate to reminder page')
          },
          {
            type: 'Note',
            title: 'Idées de voyage',
            description: 'Explorer les souks de Marrakech et visiter la place Jemaa el-Fnaa.',
            backgroundColor: '#0EA5E9',
            onNavigate: () => console.log('Navigate to ideas page')
          }
        ]} />} />
      </Routes>
        </Router>
      </AnimatePresence>
      </FavoritesProvider>
    </SideListingProvider>
  );
}