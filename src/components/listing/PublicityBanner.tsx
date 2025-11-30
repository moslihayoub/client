import React, { useRef, useState, useEffect } from 'react';

interface PublicityBannerProps {
  banners: Array<{
    image: string;
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonAction?: () => void;
  }>;
}

function PublicityBanner({ banners }: PublicityBannerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
      autoScrollRef.current = setInterval(() => {
        if (!isScrollingRef.current && scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const scrollLeft = container.scrollLeft;
          const cardWidth = container.offsetWidth;
          const nextIndex = (currentIndex + 1) % banners.length;
          
          container.scrollTo({
            left: nextIndex * cardWidth,
            behavior: 'smooth',
          });
          
          // Update index after scroll completes
          setTimeout(() => {
            setCurrentIndex(nextIndex);
          }, 500);
        }
      }, 5000);
    };

    startAutoScroll();
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [banners.length, currentIndex]);

  // Handle scroll to update current index
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      isScrollingRef.current = true;
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
      
      // Reset scrolling flag after scroll ends
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [currentIndex]);

  return (
    <div className="w-full flex flex-col gap-[20px]">
      <div
        ref={scrollContainerRef}
        className="flex gap-[26px] overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className="h-[209px] rounded-[20px] overflow-hidden relative shrink-0 w-full snap-center"
          >
            <img
              src={banner.image}
              alt={banner.title || 'Publicity banner'}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Pagination dots */}
      <div className="flex gap-[8px] items-center justify-center py-[12px]">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTo({
                  left: index * scrollContainerRef.current.offsetWidth,
                  behavior: 'smooth',
                });
              }
            }}
            style={{
              ...(index === currentIndex
                ? {
                    width: '40px',
                    height: '10px',
                    background: 'radial-gradient(141.56% 141.56% at 50% -7.74%, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-sky-500, #0EA5E9) 50.96%, var(--colors-fuchsia-500, #D946EF) 100%)',
                  }
                : {
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#CBD5E1',
                  }),
            }}
            className="transition-all duration-300 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

export default PublicityBanner;

