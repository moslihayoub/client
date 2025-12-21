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
import { AssistantProvider } from './contexts/AssistantContext';
import { NoteModalProvider } from './contexts/NoteModalContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import RequireAuth from './routes/RequireAuth';
import { useNavigate } from 'react-router-dom';
import ImgDetails from './components/details/ImgDetails';
import Sitemap from './pages/Sitemap';
import Cards from './components/Cards';
import Favorites from './pages/Favorites';
import ConversationPage from './pages/ConversationPage';
import Memories from './pages/Memories';
import VoiceChat from './pages/VoiceChat';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Unauthorized from './pages/Unauthorized';

// Component that displays homepage based on auth status
function HomePageRouter() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // User is authenticated, redirect to Homepage3
        navigate('/homepage3', { replace: true });
      } else {
        // User is not authenticated, show random homepage (excluding Homepage3)
        const homepages = ['HomePage2', 'HomePage4', 'HomePage5', 'Video'];
        const randomIndex = Math.floor(Math.random() * homepages.length);
        const selected = homepages[randomIndex];
        
        switch (selected) {
          case 'HomePage2':
            navigate('/homepage2', { replace: true });
            break;
          case 'HomePage4':
            navigate('/homepage4', { replace: true });
            break;
          case 'HomePage5':
            navigate('/homepage5', { replace: true });
            break;
          case 'Video':
            navigate('/bg-video', { replace: true });
            break;
          default:
            navigate('/homepage2', { replace: true });
        }
      }
    }
  }, [user, isLoading, navigate]);

  // Show loading while checking auth status
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

const desc = "Plongez dans l'envoûtement d'un riad marocain traditionnel, où chaque coin respire l'authenticité. Imaginez-vous vous détendre au bord d'une piscine scintillante, entouré de chambres somptueusement décorées qui allient confort moderne et touches artisanales.\n \n Ne manquez pas la terrasse sur le toit, un véritable havre de paix, offrant une vue panoramique à couper le souffle sur les toits de Marrakech, surtout au coucher du soleil. Ce riad est l'endroit idéal pour vivre une expérience inoubliable, mêlant luxe et culture."
const hoteDesc = "Plongez dans l'envoûtement d'un riad marocain traditionnel, où chaque coin respire l'authenticité. Imaginez-vous vous détendre au bord d'une piscine scintillante, entouré de chambres somptueusement décorées qui allient confort moderne et touches artisanales.\n \n Ne manquez pas la terrasse sur le toit, un véritable havre de paix, offrant une vue panoramique à couper le souffle sur les toits de Marrakech, surtout au coucher du soleil. Ce riad est l'endroit idéal pour vivre une expérience inoubliable, mêlant luxe et culture."
export default function App() {
  const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
  
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <NoteModalProvider>
          <AssistantProvider>
            <SideListingProvider>
              <FavoritesProvider>
                <AnimatePresence mode='wait'>
                  <Router>
            <Routes>
        <Route path="/" element={<HomePageRouter />} />
        <Route path="/homepage1" element={<HomePage1 />} />
        <Route path="/homepage2" element={<HomePage2 />} />
        <Route path="/homepage3" element={<RequireAuth><Homepage3 /></RequireAuth>} />
        <Route path="/homepage4" element={<HomePage4 />} />
        <Route path="/homepage5" element={<HomePage5 input={{type: 'background'}} />} />
        <Route path="/bg-video" element={<HomePage5 input={{ type: 'video'}} />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/voiceai" element={<VoiceAiVisualizer />} />
        <Route path="/voice-chat" element={<VoiceChat />} />
        <Route path="/conversation" element={<RequireAuth><ConversationPage /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><ProfileCard /></RequireAuth>} />
        <Route path="/profile-update" element={<RequireAuth><ProfileUpdate /></RequireAuth>} />
        <Route path="/hotels" element={<RequireAuth><HotelListing /></RequireAuth>} />
        <Route path="/favorites" element={<RequireAuth><Favorites /></RequireAuth>} />
        <Route path="/memories" element={<RequireAuth><Memories /></RequireAuth>} />
        <Route path="/images" element={<ImageDisplay images={['/images/bg1.png','/images/bg2.png','/images/bg3.png']} />} />
        <Route path="/details/:hotelId" element={<RequireAuth><HotelDetailWrapper /></RequireAuth>} />
        <Route path="/img-details" element={<ImgDetails images={['/hotels/hotel1.png','/hotels/hotel2.png','/hotels/hotel3.png', '/hotels/hotel4.png', '/hotels/hotel5.png','/images/bg1.png','/images/bg2.png','/images/bg3.png']} />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
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
          </AssistantProvider>
        </NoteModalProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}