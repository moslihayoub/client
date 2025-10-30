import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage1 from "./pages/HomePage1";
import HomePage2 from "./pages/HomePage2";
import HomePage4 from "./pages/HomePage4";
import TestPage from "./pages/TestPage";
import HomePage5 from './pages/HomePage5';
import Homepage3 from './pages/Homepage3';
import VoiceAiVisualizer from './components/VoiceAiVisualizer';
import Bg from './components/Bg';
import { AnimatePresence } from 'framer-motion';
import ProfileCard from './pages/ProfileCard';
import HotelCard from './components/HoltelCard';
import HotelListing from './pages/HotelListing';
import ItemCard from './components/HoltelCard';
import ImageDisplay from './components/details/ImageDisplay';
import Details from './pages/Details';
import HotelDetailWrapper from './pages/HotelDetailWrapper';
import Zone from './svgs/icons/Zone';
import SkHome from './svgs/icons/sky/SkHome';
import { SideListingProvider } from './contexts/SideListingContext';

// Component that randomly displays a homepage (excluding HomePage1)
function RandomHomepage() {
  const [selectedHomepage, setSelectedHomepage] = useState<string | null>(null);

  useEffect(() => {
    // Array of homepage names (excluding HomePage1)
    const homepages = ['HomePage2', 'Homepage3', 'HomePage4', 'HomePage5'];

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
    default:
      return <HomePage2 />; // Fallback
  }
}

const desc = "Plongez dans l'envoûtement d'un riad marocain traditionnel, où chaque coin respire l'authenticité. Imaginez-vous vous détendre au bord d'une piscine scintillante, entouré de chambres somptueusement décorées qui allient confort moderne et touches artisanales.\n \n Ne manquez pas la terrasse sur le toit, un véritable havre de paix, offrant une vue panoramique à couper le souffle sur les toits de Marrakech, surtout au coucher du soleil. Ce riad est l'endroit idéal pour vivre une expérience inoubliable, mêlant luxe et culture."
const hoteDesc = "Plongez dans l'envoûtement d'un riad marocain traditionnel, où chaque coin respire l'authenticité. Imaginez-vous vous détendre au bord d'une piscine scintillante, entouré de chambres somptueusement décorées qui allient confort moderne et touches artisanales.\n \n Ne manquez pas la terrasse sur le toit, un véritable havre de paix, offrant une vue panoramique à couper le souffle sur les toits de Marrakech, surtout au coucher du soleil. Ce riad est l'endroit idéal pour vivre une expérience inoubliable, mêlant luxe et culture."
export default function App() {
  return (
    <SideListingProvider>
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
        <Route path="/bg" element={<Bg />} />
        <Route path="/profile" element={<ProfileCard />} />
        <Route path="/hotels" element={<HotelListing />} />
        <Route path="/images" element={<ImageDisplay images={['/images/bg1.png','/images/bg2.png','/images/bg3.png']} />} />
        <Route path="/details/:hotelId" element={<HotelDetailWrapper />} />
        <Route path="/details" element={
          <Details 
              title='Hotel 5 etoiles' description={desc} 
              tags={[{text: 'Service 1', Icon: SkHome}, {text: 'Service 2', Icon: SkHome}, {text: 'Service 3', Icon: SkHome}, {text: 'Service 4', Icon: SkHome}, {text: 'Service 5', Icon: SkHome}, {text: 'Service 6', Icon: SkHome}, {text: 'Service 7', Icon: SkHome}, {text: 'Service 8', Icon: SkHome}, {text: 'Service 9', Icon: SkHome}, {text: 'Service 10', Icon: SkHome}]} 
              rating={4.5} nbRating={10} 
              avis={[
                {name: 'John Doe', userImg: '/images/bg1.png', like: 10, dislike: 2, comment: 'Le riad était tout simplement exceptionnel ! La piscine était un vrai répit face à la chaleur de Marrakech.', rating: 2.5, date: '2025-01-01'},
                {name: 'Kamal', userImg: '/images/boy.png', like: 10, dislike: 2, comment: 'Comment 2', rating: 4.5, date: '2025-01-01'},
                {name: 'Mohamed', userImg: '/images/bg1.png', like: 10, dislike: 2, comment: 'Comment 3', rating: 4.5, date: '2025-01-01'},
                {name: 'Ali', userImg: '/images/bg1.png', like: 10, dislike: 2, comment: 'Comment 4', rating: 4.5, date: '2025-01-01'},
                {name: 'Ahmed', userImg: '/images/bg1.png', like: 10, dislike: 2, comment: 'Comment 5', rating: 4.5, date: '2025-01-01'},
                {name: 'Youssef', userImg: '/images/bg1.png', like: 10, dislike: 2, comment: 'Comment 6', rating: 4.5, date: '2025-01-01'},
                {name: 'Hassan', userImg: '/images/bg1.png', like: 10, dislike: 2, comment: 'Comment 7', rating: 4.5, date: '2025-01-01'},
                {name: 'Ilyas', userImg: '/images/bg1.png', like: 10, dislike: 2, comment: 'Comment 8', rating: 4.5, date: '2025-01-01'},
                {name: 'Omar', userImg: '/images/bg1.png', like: 10, dislike: 2, comment: 'Comment 9', rating: 4.5, date: '2025-01-01'},
                {name: 'Nassim', userImg: '/images/bg1.png', like: 10, dislike: 2, comment: 'Comment 10', rating: 4.5, date: '2025-01-01'},
                ]} 
                hoteInfo={{name: 'John Doe', userImg: '/images/bg1.png', description: hoteDesc, anciennete: 10}} 
                images={['/hotels/hotel1.png','/hotels/hotel2.png','/hotels/hotel3.png', '/hotels/hotel4.png', '/hotels/hotel5.png','/images/bg1.png','/images/bg2.png','/images/bg3.png']} 
                />} />
      </Routes>
        </Router>
      </AnimatePresence>
    </SideListingProvider>
  );
}