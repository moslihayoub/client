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

export default function App() {
  return (
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
        <Route path='/service' element={<ItemCard type='Service' service={{ title: 'Service 5 etoiles', type: ['Service 1', 'Service 2'], rating: 3.4, nbRating: 105, distance: 0.5, minimumPrice: 350, maximumPrice: 400, status: 'Ouvert', images: ['/images/bg1.png','/images/bg2.png','/images/bg3.png'] }} />}/>
        <Route path='/experience' element={<ItemCard type='Experience' experience={{ title: 'Experience 5 etoiles', type: ['Experience 1', 'Experience 2'], rating: 3.4, nbRating: 10, distance: 0.5, price: 350, nbPeople: 2, images: ['/images/bg1.png','/images/bg2.png','/images/bg3.png'] }} />}/>
        <Route path="/hotels" element={<HotelListing />} />

      </Routes>
    </Router>
    </AnimatePresence>
  );
}