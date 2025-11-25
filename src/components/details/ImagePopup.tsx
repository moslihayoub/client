import React, { useState, useEffect } from 'react';

interface ImagePopupProps {
  images: string[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImagePopup: React.FC<ImagePopupProps> = ({ images, initialIndex, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrev();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Dark overlay with shadow */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        style={{
          boxShadow: 'inset 0 0 200px rgba(0, 0, 0, 0.5)'
        }}
      />

      {/* Popup content */}
      <div
        className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image container */}
        <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
          {/* Previous arrow */}
          {images.length > 1 && (
            <button
              onClick={goToPrev}
              className="absolute left-4 sm:left-6 md:left-8 z-20 w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 group"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform group-hover:scale-110 transition-transform"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {/* Image */}
          <div className="relative w-full h-full flex items-center justify-center px-16 sm:px-20 md:px-24">
            <img
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            
            {/* Close button - inside image layer */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-20 w-[44px] h-[44px] bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Pagination dots - inside image layer */}
            {images.length > 1 && (
              <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? 'w-[40px] h-[10px] bg-white'
                        : 'w-[10px] h-[10px] bg-white/50 hover:bg-white/75'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Image counter - inside image layer */}
            <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 right-4 sm:right-6 md:right-8 z-20 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
              <p className="text-white text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          </div>

          {/* Next arrow */}
          {images.length > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 sm:right-6 md:right-8 z-20 w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 group"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform group-hover:scale-110 transition-transform"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;

