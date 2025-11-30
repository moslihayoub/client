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
      className="flex flex-col gap-[11px] items-start bg-white rounded-[36px] w-[297px] cursor-pointer p-[16px]"
      onClick={handleCardClick}
    >
      {/* Carousel container */}
      <div 
        ref={containerRef}
        className="relative w-full h-[254px] rounded-[26px] overflow-hidden group"
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
                className="w-full h-full object-cover rounded-[26px]"
              />
              <div
                className="absolute inset-0 rounded-[26px]"
                style={{
                  background: 'linear-gradient(180deg, rgba(2, 6, 23, 0.50) 0%, rgba(2, 6, 23, 0.00) 30%, rgba(2, 6, 23, 0.00) 70%, rgba(2, 6, 23, 0.50) 100%)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Top action buttons */}
        <div className="absolute top-[10px] left-[10px] right-[10px] flex justify-between items-center z-10">
          {/* Heart button */}
          <button 
            className="w-[28px] h-[28px] flex items-center justify-center transition-all group/heart z-20"
            onClick={handleFavorite}
          >
            {favoriteStatus ? (
              <RHeart className="absolute opacity-100 transition-opacity duration-300" />
            ) : (
              <>
                <BlHeart className="absolute opacity-100 group-hover/heart:opacity-0 transition-opacity duration-300" />
                <RHeart className="absolute opacity-0 group-hover/heart:opacity-100 transition-opacity duration-300" />
              </>
            )}
          </button>

          {/* Comparator button */}
          {type === 'hotel' && (
            <button 
              onClick={(e) => e.stopPropagation()}
              className="w-[36px] h-[36px] flex items-center justify-center transition-all group/comparator z-20"
            >
              <BlComparator className="absolute opacity-80 group-hover/comparator:opacity-0 transition-opacity duration-300" />
              <RComparator className="absolute opacity-0 group-hover/comparator:opacity-100 transition-opacity duration-300" />
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
              className="absolute top-1/2 left-[6px] -translate-y-1/2 w-[28px] h-[28px] flex items-center justify-center bg-black/40 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60 z-20"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute top-1/2 right-[6px] -translate-y-1/2 w-[28px] h-[28px] flex items-center justify-center bg-black/40 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60 z-20"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Carousel indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 flex items-center gap-[6px] z-20">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(i);
                }}
                className={`transition-all duration-300 rounded-full ${
                  i === currentIndex
                    ? "w-[32px] h-[8px] bg-white"
                    : "w-[8px] h-[8px] bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Item info */}
      <div className="flex flex-col gap-[14px] items-start w-full">
        {/* Title and description */}
        <div className="flex flex-col items-start w-full">
          <h2 className="text-[16px] font-semibold text-slate-800 leading-[18px] font-bricolagegrotesque w-full ">
            {title}
          </h2>
          <span className="text-[14px] font-normal text-slate-600 font-bricolagegrotesque w-full mt-0 mb-0">
            {type === 'hotel' && nbLit && nbChambre && nbNuit && `${nbLit} lits, ${nbChambre} chambres / ${nbNuit} nuits`}
            {type === 'service' && genre && genre.join(', ')}
            {type === 'experience' && genre && genre.join(', ')}
            {type === 'health' && jourDebut && jourFin && heureDebut && heureFin && (
              <span className="w-full text-start ">
                Du {jourDebut} au {jourFin} / <span className="text-sky-500"> {heureDebut} à {heureFin}</span>
              </span>
            )}
          </span>
        </div>

        {/* Price section */}
        <div className="flex items-stretch h-[32px] w-full">
          {type === 'health' ? (
            <div className={`flex items-center justify-center px-[8px] py-[6px] rounded-[10px] w-full ${status === 'Ouvert' ? 'bg-green-100' : 'bg-red-100'}`}>
              <p className={`text-[14px] font-bold ${status === 'Ouvert' ? 'text-green-600' : 'text-red-600'} leading-[14px] font-bricolagegrotesque`}>
                {status}
              </p>
            </div>
          ) : (
            <>
              <div
                className="flex items-center justify-center px-[10px] rounded-tl-[10px] rounded-bl-[10px]"
                style={{
                  background: 'linear-gradient(270deg, var(--colors-slate-100, #F1F5F9) 0%, var(--colors-sky-200, #BAE6FD) 45%)'
                }}
              >
                <p className="text-[14px] font-bold text-slate-900 leading-[14px] font-bricolagegrotesque">
                  {type === 'hotel' && totalPrice && `${formatPrice(totalPrice)} MAD`}
                  {type === 'service' && minimumPrice && maximumPrice && `${formatPrice(minimumPrice)} - ${formatPrice(maximumPrice)} MAD`}
                  {type === 'experience' && price && `${formatPrice(price)} MAD`}
                </p>
              </div>

              <div 
                className="bg-green-100 flex items-center px-[8px] rounded-tr-[10px] rounded-br-[10px]"
                style={{
                  background: type === 'hotel' ? 'var(--colors-slate-100, #F1F5F9)' : 'var(--colors-green-100, #DCFCE7)'
                }}
              >
                <p 
                  className="text-[12px] font-medium text-green-600 leading-[16px] font-bricolagegrotesque"
                  style={{ color: type === 'hotel' ? 'var(--colors-slate-600, #475569)' : 'var(--colors-green-600, #166534)' }}
                >
                  {type === 'hotel' && pricePerNight && `${formatPrice(pricePerNight)}/nuit`}
                  {type === 'service' && status}
                  {type === 'experience' && nbPeople && `${nbPeople} personne`}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Rating and distance */}
        <div className="flex justify-start gap-[8px] items-center w-full">
          {/* Rating */}
          <div className="flex gap-[6px] items-center justify-center">
            <span className="text-[14px] font-semibold text-slate-800 font-bricolagegrotesque">
              {rating}
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.15323 5.408C10.4202 3.136 11.0532 2 12.0002 2C12.9472 2 13.5802 3.136 14.8472 5.408L15.1752 5.996C15.5352 6.642 15.7152 6.965 15.9952 7.178C16.2752 7.391 16.6252 7.47 17.3252 7.628L17.9612 7.772C20.4212 8.329 21.6502 8.607 21.9432 9.548C22.2352 10.488 21.3972 11.469 19.7202 13.43L19.2862 13.937C18.8102 14.494 18.5712 14.773 18.4642 15.117C18.3572 15.462 18.3932 15.834 18.4652 16.577L18.5312 17.254C18.7842 19.871 18.9112 21.179 18.1452 21.76C17.3792 22.341 16.2272 21.811 13.9252 20.751L13.3282 20.477C12.6742 20.175 12.3472 20.025 12.0002 20.025C11.6532 20.025 11.3262 20.175 10.6722 20.477L10.0762 20.751C7.77323 21.811 6.62123 22.341 5.85624 21.761C5.08924 21.179 5.21623 19.871 5.46923 17.254L5.53523 16.578C5.60723 15.834 5.64323 15.462 5.53523 15.118C5.42923 14.773 5.19024 14.494 4.71424 13.938L4.28024 13.43C2.60324 11.47 1.76523 10.489 2.05723 9.548C2.34923 8.607 3.58024 8.328 6.04024 7.772L6.67624 7.628C7.37524 7.47 7.72424 7.391 8.00524 7.178C8.28624 6.965 8.46523 6.642 8.82523 5.996L9.15323 5.408Z" fill="#FBBF24" />
            </svg>
          </div>
          
          {/* Number of ratings */}
          {nbRating !== undefined && (type === 'service' || type === 'experience') && (
            <span className="text-[14px] font-semibold text-slate-600 leading-[16px] font-bricolagegrotesque">
              {nbRating >= 100 ? '+99' : nbRating.toLocaleString()}
            </span>
          )}
          
          {/* Distance */}
          <span className="text-[12px] font-normal text-slate-600 leading-[16px] font-bricolagegrotesque">
            {distance.toFixed(1)} km du centre
          </span>
        </div>
      </div>
    </div>
  );
};

export default MapPopupCard;
