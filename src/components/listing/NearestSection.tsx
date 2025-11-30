import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../HoltelCard';
import { ServiceCardProps, ExperienceCardProps } from '../HoltelCard';

interface NearestSectionProps {
  type: 'Service' | 'Experience';
  items: (ServiceCardProps | ExperienceCardProps)[];
  distance: string;
  count: number;
}

function NearestSection({ type, items, distance, count }: NearestSectionProps) {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 213;
  const gap = 10;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(newIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCards = items.length;
  const visibleCards = Math.ceil((typeof window !== 'undefined' ? window.innerWidth : 375) / (cardWidth + gap));
  const totalPages = Math.ceil(totalCards / visibleCards);
  const progress = totalPages > 0 ? ((currentIndex + 1) / totalPages) * 100 : 0;

  return (
    <div className="w-full flex flex-col gap-[8px]">
      <div className="flex flex-row items-start gap-[6px] w-full">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0" >
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#020617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex flex-col gap-[4px] flex-1 mt-[3px]">
          <p className="text-base font-bold font-vendsans text-slate-950 leading-[16px]">
            Dans la région
          </p>
          <p
            className="text-base font-semibold font-bricolagegrotesque text-transparent bg-clip-text leading-[24px]"
            style={{
              background: 'radial-gradient(141.56% 141.56% at 50% -7.74%, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-sky-500, #0EA5E9) 50.96%, var(--colors-fuchsia-500, #D946EF) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Plus de {distance}
          </p>
        </div>
        <div
          className="rounded-[6px] px-[8px] py-[4px] flex-shrink-0"
          style={{
            background: 'radial-gradient(141.56% 141.56% at 50% -7.74%, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-sky-500, #0EA5E9) 50.96%, var(--colors-fuchsia-500, #D946EF) 100%)',
          }}
        >
          <p className="text-base font-semibold font-bricolagegrotesque text-white leading-[24px] whitespace-nowrap">
            {count} {type === 'Service' ? 'services' : 'expériences'}
          </p>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-[10px] overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="shrink-0 w-[213px] cursor-pointer"
            onClick={() => {
              if (type === 'Service') {
                navigate(`/details/${item.id}`, { state: { service: item } });
              } else {
                navigate(`/details/${item.id}`, { state: { experience: item } });
              }
            }}
          >
            <div className="rounded-[31px] bg-white border border-slate-200 p-[12px] flex flex-col gap-[14px] h-full" style={{ minHeight: '280px' }}>
              <div className="h-[134px] rounded-[24px] overflow-hidden flex-shrink-0">
                <img
                  src={item.images[0] || '/services/service-prop1.png'}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-[6px] items-start flex-1 min-h-0 overflow-hidden w-full">
                <p className="text-xl font-bold font-bricolagegrotesque text-slate-800 leading-[32px] w-full truncate" style={{ lineHeight: '32px' }}>
                  {item.title}
                </p>
                <p
                  className="text-base font-normal font-vendsans text-slate-700 leading-[24px] w-full overflow-hidden"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                    lineHeight: '24px',
                    maxHeight: '72px' // 3 lines * 24px line height
                  }}
                >
                  {(item as any).hoteInfo?.description || `Découvrez ${item.title}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      {totalPages > 1 && (
        <div className="flex gap-[8px] items-center justify-center py-[12px]">
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageIndex = Math.floor(currentIndex / visibleCards);
            return (
              <button
                key={index}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: index * (cardWidth + gap) * visibleCards,
                      behavior: 'smooth',
                    });
                  }
                }}
                style={{
                  ...(pageIndex === index
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
            );
          })}
        </div>
      )}
    </div>
  );
}

export default NearestSection;

