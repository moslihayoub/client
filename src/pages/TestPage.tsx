import React, { useState } from 'react';
import ImageDisplay from '../components/details/ImageDisplay';

export default function TestPage() {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500', 'bg-orange-500'];
  const currentColor = colors[count % colors.length];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-white mb-4 animate-pulse">
          🚀 Test Page
        </h1>
        <p className="text-xl text-gray-300">
          A random test page to experiment with React components
        </p>
      </div>
      <div className="flex justify-center items-center p-8 h-auto w-full">
        <ImageDisplay images={['/images/bg1.png','/images/bg2.png','/images/hotel.png','/images/banner.png','/images/art.png','/images/boy.png']} />
      </div>

      {/* Interactive Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full space-y-6">
        {/* Counter Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Counter</h2>
          <div className={`${currentColor} text-white text-6xl font-bold py-8 rounded-2xl mb-4 transition-all duration-300 transform hover:scale-105`}>
            {count}
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setCount(count - 1)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-110"
            >
              - Decrease
            </button>
            <button
              onClick={() => setCount(0)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-110"
            >
              Reset
            </button>
            <button
              onClick={() => setCount(count + 1)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-110"
            >
              + Increase
            </button>
          </div>
        </div>

        {/* Toggle Section */}
        <div className="border-t-2 border-gray-200 pt-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Toggle Switch</h2>
          <div className="flex items-center justify-center gap-4">
            <span className={`text-lg font-semibold ${!isActive ? 'text-gray-800' : 'text-gray-400'}`}>
              OFF
            </span>
            <button
              onClick={() => setIsActive(!isActive)}
              className={`relative w-20 h-10 rounded-full transition-all duration-300 ${
                isActive ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-8 h-8 bg-white rounded-full shadow-md transition-all duration-300 transform ${
                  isActive ? 'translate-x-10' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-lg font-semibold ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
              ON
            </span>
          </div>
          {isActive && (
            <div className="mt-4 p-4 bg-green-100 rounded-lg text-center animate-fade-in">
              <p className="text-green-800 font-semibold">✨ The switch is ON! ✨</p>
            </div>
          )}
        </div>

        {/* Animated Boxes */}
        <div className="border-t-2 border-gray-200 pt-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Animated Boxes</h2>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`h-20 rounded-lg ${colors[i % colors.length]} animate-float-slow hover:animate-float-fast transform hover:scale-110 transition-all duration-300 cursor-pointer`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="border-t-2 border-gray-200 pt-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white text-center">
              <div className="text-4xl font-bold mb-2">{count * 10}</div>
              <div className="text-sm opacity-90">Points</div>
            </div>
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-6 text-white text-center">
              <div className="text-4xl font-bold mb-2">{isActive ? '✓' : '✗'}</div>
              <div className="text-sm opacity-90">Status</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-400 text-sm">
          Built with React + TypeScript + Tailwind CSS
        </p>
      </div>
    </div>
  );
}
