import React, { useState, useContext, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlHeart from "../svgs/black/BlHeart";
import RHeart from "../svgs/red/RHeart";
import BlComparator from "../svgs/black/BlComparator";
import RComparator from "../svgs/red/RComparator";
import { FavoritesContext } from "../contexts/FavoritesContext";

interface MapPopupCardProps {
  id: number;
  type: 'hotel' | 'service' | 'experience' | 'health';
  title: string;
  images: string[];
  rating: number;
  distance: number;
  // For hotels
  nbLit?: number;
  nbChambre?: number;
  nbNuit?: number;
  totalPrice?: number;
  pricePerNight?: number;
  // For services/restaurants
  genre?: string[];
  minimumPrice?: number;
  maximumPrice?: number;
  status?: 'Ouvert' | 'Fermé';
  nbRating?: number;
  // For experiences
  price?: number;
  nbPeople?: number;
  // For health
  jourDebut?: string;
  jourFin?: string;
  heureDebut?: string;
  heureFin?: string;
  // Common
  onClick?: () => void;
}

const MapPopupCard: React.FC<MapPopupCardProps> = ({
  id,
  type,
  title,
  images,
  rating,
  distance,
  nbLit,
  nbChambre,
  nbNuit,
  totalPrice,
  pricePerNight,
  genre,
  minimumPrice,
  maximumPrice,
  status,
  nbRating,
  price,
  nbPeople,
  jourDebut,
  jourFin,
  heureDebut,
  heureFin,
  onClick
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  
  // Safely get favorites context
  const favoritesContext = useContext(FavoritesContext);
  const typeUpper = type.charAt(0).toUpperCase() + type.slice(1) as 'Hotel' | 'Service' | 'Experience' | 'Health';
  const favoriteStatus = favoritesContext?.isFavorite(id, typeUpper) ?? false;
  
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };
  
  // Measure container width for accurate sliding
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favoritesContext) {
      favoritesContext.toggleFavorite({
        id,
        type: typeUpper
      });
    }
  };

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div
      className="flex flex-col items-start bg-white rounded-[20px] w-[320px] cursor-pointer overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      onClick={handleCardClick}
    >
      {/* Carousel container - Full width at top */}
      <div 
        ref={containerRef}
        className="relative w-full h-[240px] overflow-hidden group"
      >
        {/* Images container */}
        <div
          className="flex h-full"
          style={{
            transform: containerWidth > 0
              ? `translateX(-${currentIndex * containerWidth}px)`
              : `translateX(-${currentIndex * (100 / images.length)}%)`,
            transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            width: containerWidth > 0 ? `${images.length * containerWidth}px` : `${images.length * 100}%`
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 h-full"
              style={{ 
                width: containerWidth > 0 ? `${containerWidth}px` : `calc(100% / ${images.length})`,
                minWidth: containerWidth > 0 ? `${containerWidth}px` : `calc(100% / ${images.length})`
              }}
            >
              <img
                src={image}
                alt={`${title}-${index}`}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.1) 100%)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Top action buttons */}
        <div className="absolute top-[12px] left-[12px] right-[12px] flex justify-between items-center z-10">
          {/* Heart button */}
          <button 
            className="w-[32px] h-[32px] flex items-center justify-center transition-all group/heart z-20 hover:scale-110"
            onClick={handleFavorite}
          >
            {favoriteStatus ? (
              <RHeart className="absolute opacity-100 transition-opacity duration-300 drop-shadow-md" />
            ) : (
              <>
                <BlHeart className="absolute opacity-100 group-hover/heart:opacity-0 transition-opacity duration-300 drop-shadow-md" />
                <RHeart className="absolute opacity-0 group-hover/heart:opacity-100 transition-opacity duration-300 drop-shadow-md" />
              </>
            )}
          </button>

          {/* Comparator button */}
          {type === 'hotel' && (
            <button 
              onClick={(e) => e.stopPropagation()}
              className="w-[32px] h-[32px] flex items-center justify-center transition-all group/comparator z-20 hover:scale-110"
            >
              <BlComparator className="absolute opacity-80 group-hover/comparator:opacity-0 transition-opacity duration-300 drop-shadow-md" />
              <RComparator className="absolute opacity-0 group-hover/comparator:opacity-100 transition-opacity duration-300 drop-shadow-md" />
            </button>
          )}
        </div>

        {/* Manual navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[32px] h-[32px] flex items-center justify-center bg-white/90 backdrop-blur-sm text-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-105 shadow-md z-20"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute top-1/2 right-[8px] -translate-y-1/2 w-[32px] h-[32px] flex items-center justify-center bg-white/90 backdrop-blur-sm text-slate-800 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-105 shadow-md z-20"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </>
        )}

        {/* Carousel indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex items-center gap-[4px] z-20">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(i);
                }}
                className={`transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? "w-[6px] h-[6px] bg-white shadow-sm"
                    : "w-[6px] h-[6px] bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Item info */}
      <div className="flex flex-col gap-[12px] items-start w-full px-[16px] py-[12px]">
        {/* Title and description */}
        <div className="flex flex-col items-start w-full gap-[4px]">
          <h2 className="text-[15px] font-semibold text-slate-900 leading-[20px] font-bricolagegrotesque w-full truncate">
            {title}
          </h2>
          <span className="text-[13px] font-normal text-slate-600 font-vendsans w-full mt-0 mb-0 line-clamp-1">
            {type === 'hotel' && nbLit && nbChambre && nbNuit && `${nbLit} lits · ${nbChambre} chambres · ${nbNuit} nuits`}
            {type === 'service' && genre && genre.slice(0, 2).join(' · ')}
            {type === 'experience' && genre && genre.slice(0, 2).join(' · ')}
            {type === 'health' && jourDebut && jourFin && heureDebut && heureFin && (
              <span className="w-full text-start">
                {jourDebut} - {jourFin} · <span className="text-sky-500">{heureDebut} - {heureFin}</span>
              </span>
            )}
          </span>
        </div>

        {/* Rating and distance */}
        <div className="flex justify-between items-center w-full">
          {/* Rating */}
          <div className="flex gap-[6px] items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.15323 5.408C10.4202 3.136 11.0532 2 12.0002 2C12.9472 2 13.5802 3.136 14.8472 5.408L15.1752 5.996C15.5352 6.642 15.7152 6.965 15.9952 7.178C16.2752 7.391 16.6252 7.47 17.3252 7.628L17.9612 7.772C20.4212 8.329 21.6502 8.607 21.9432 9.548C22.2352 10.488 21.3972 11.469 19.7202 13.43L19.2862 13.937C18.8102 14.494 18.5712 14.773 18.4642 15.117C18.3572 15.462 18.3932 15.834 18.4652 16.577L18.5312 17.254C18.7842 19.871 18.9112 21.179 18.1452 21.76C17.3792 22.341 16.2272 21.811 13.9252 20.751L13.3282 20.477C12.6742 20.175 12.3472 20.025 12.0002 20.025C11.6532 20.025 11.3262 20.175 10.6722 20.477L10.0762 20.751C7.77323 21.811 6.62123 22.341 5.85624 21.761C5.08924 21.179 5.21623 19.871 5.46923 17.254L5.53523 16.578C5.60723 15.834 5.64323 15.462 5.53523 15.118C5.42923 14.773 5.19024 14.494 4.71424 13.938L4.28024 13.43C2.60324 11.47 1.76523 10.489 2.05723 9.548C2.34923 8.607 3.58024 8.328 6.04024 7.772L6.67624 7.628C7.37524 7.47 7.72424 7.391 8.00524 7.178C8.28624 6.965 8.46523 6.642 8.82523 5.996L9.15323 5.408Z" fill="#1E293B" />
            </svg>
            <span className="text-[13px] font-semibold text-slate-900 font-vendsans">
              {rating}
            </span>
            {nbRating !== undefined && (type === 'service' || type === 'experience') && (
              <span className="text-[13px] font-normal text-slate-600 font-vendsans">
                ({nbRating >= 100 ? '+99' : nbRating})
              </span>
            )}
          </div>
          
          {/* Distance */}
          <span className="text-[13px] font-normal text-slate-600 font-vendsans">
            {distance.toFixed(1)} km
          </span>
        </div>

        {/* Price section */}
        <div className="flex items-center justify-between w-full">
          {type === 'health' ? (
            <div className={`flex items-center justify-center px-[12px] py-[6px] rounded-full ${status === 'Ouvert' ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className={`text-[13px] font-semibold ${status === 'Ouvert' ? 'text-green-700' : 'text-red-700'} font-bricolagegrotesque`}>
                {status}
              </p>
            </div>
          ) : (
            <div className="flex flex-row gap-[4px]">
              <span className="text-[16px] font-semibold text-slate-900 font-bricolagegrotesque">
                {type === 'hotel' && totalPrice && `${formatPrice(totalPrice)} MAD`}
                {type === 'service' && minimumPrice && `${formatPrice(minimumPrice)} MAD`}
                {type === 'experience' && price && `${formatPrice(price)} MAD`}
              </span>
              {type === 'hotel' && pricePerNight && (
                <span className="text-[13px] font-normal text-slate-600 font-vendsans mt-[2.5px]">
                  / {formatPrice(pricePerNight)} nuit
                </span>
              )}
              {type === 'service' && status && (
                <span className={`text-[12px] font-medium px-[8px] py-[2px] rounded-full mt-[2px] ${
                  status === 'Ouvert' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {status}
                </span>
              )}
              {type === 'experience' && nbPeople && (
                <span className="text-[13px] font-normal text-slate-600 font-vendsans mt-[2px]">
                  · {nbPeople} pers.
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPopupCard;
