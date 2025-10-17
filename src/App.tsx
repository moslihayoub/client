import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage1 from "./pages/HomePage1";
import HomePage2 from "./pages/HomePage2";
import HomePage4 from "./pages/HomePage4";
import TestPage from "./pages/TestPage";
import HomePage5 from './pages/HomePage5';
import Homepage3 from './pages/Homepage3';
import VoiceAiVisualizer from './components/VoiceAiVisualizer';
import BgCyan from './components/BgCyan';
import AnimatedBg from './components/AnimatedBg';
import Bg from './components/Bg';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage1 />} />
        <Route path="/homepage2" element={<HomePage2 />} />
        <Route path="/homepage3" element={<Homepage3 />} />
        <Route path="/homepage4" element={<HomePage4 />} />
        <Route path="/homepage5" element={<HomePage5 input={{type: 'background',videos: [] }} />} />
        <Route path="/bg-video" element={<HomePage5 input={{
          type: 'video',
          videos: [
            { url: '/videos/stars.mp4' },
            { url: '/videos/ruisseau.mp4' },
            { url: '/videos/nejar.mp4' },
            { url: '/videos/husky.mp4' }
          ]
        }} />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/voiceai" element={<VoiceAiVisualizer />} />
        <Route path="/bg" element={<Bg />} />
      </Routes>
    </Router>
  );
}