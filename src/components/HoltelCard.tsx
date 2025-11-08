import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlHeart from "../svgs/black/BlHeart";
import RHeart from "../svgs/red/RHeart";
import BlComparator from "../svgs/black/BlComparator";
import RComparator from "../svgs/red/RComparator";
import { useNavigate } from "react-router-dom";

interface HotelCardProps {
  id: number;
  title: string;
  nbLit: number;
  nbChambre: number;
  nbNuit: number;
  totalPrice: number;
  pricePerNight: number;
  rating: number;
  distancce: number;
  images: string[];
}

interface ServiceCardProps {
  id: number;
  title: string;
  type: string[];
  rating: number;
  nbRating: number;
  distance: number;
  minimumPrice: number;
  maximumPrice: number;
  status: 'Ouvert' | 'Fermé';
  images: string[];
}

interface ExperienceCardProps {
  id: number;
  title: string;
  type: string[];
  rating: number;
  nbRating: number;
  distance: number;
  price: number;
  nbPeople: number;
  images: string[];
}

interface ItemCardProps {
  id: number;
  type: 'Hotel' | 'Service' | 'Experience';
  hotel?: HotelCardProps;
  service?: ServiceCardProps;
  experience?: ExperienceCardProps;
  onClick?: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ id, type, hotel, service, experience, onClick }) => {
  const navigate = useNavigate();
  // Get images and title based on type
  const images = type === 'Hotel' ? hotel?.images! : type === 'Service' ? service?.images! : experience?.images!;
  const title = type === 'Hotel' ? hotel?.title! : type === 'Service' ? service?.title! : experience?.title!;
  const rating = type === 'Hotel' ? hotel?.rating! : type === 'Service' ? service?.rating! : experience?.rating!;
  const distance = type === 'Hotel' ? hotel?.distancce! : type === 'Service' ? service?.distance! : experience?.distance!;

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className="flex flex-col gap-[11px] items-start bg-transparent sm:bg-white md:bg-white lg:bg-transparent xl:bg-transparent rounded-[26px] w-full h-full cursor-pointer"
    >
      {/* Carousel container */}
      <div className="relative w-full h-[350px] sm:h-[350px] md:h-[254px] lg:h-[265px] xl:h-[265px] rounded-[26px] overflow-hidden group">
        {/* Images with fade transitions */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={image}
              alt={`${title}-${index}`}
              className="w-full h-full object-cover rounded-[26px]"
            />
            <div className="absolute inset-0 bg-black/10 rounded-[26px]" />
          </div>
        ))}

        {/* Top action buttons */}
        <div className="absolute top-[9px] left-[9px] right-[9px] flex justify-between items-center z-10">
          {/* Heart button */}
          <button className="w-[34px] h-[34px] flex items-center justify-center transition-all group/heart">
            <BlHeart className="absolute opacity-100 group-hover/heart:opacity-0 transition-opacity duration-300" />
            <RHeart className="absolute opacity-0 group-hover/heart:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Comparator button */}
          {type === 'Hotel' && (
            <button className="w-[46px] h-[46px] flex items-center justify-center transition-all group/comparator">
              <BlComparator className="absolute opacity-100 group-hover/comparator:opacity-0 transition-opacity duration-300" />
              <RComparator className="absolute opacity-0 group-hover/comparator:opacity-100 transition-opacity duration-300" />
            </button>
          )}
        </div>

        {/* Manual navigation arrows */}
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-[9px] -translate-y-1/2 w-[34px] h-[34px] flex items-center justify-center bg-black/40 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-[9px] -translate-y-1/2 w-[34px] h-[34px] flex items-center justify-center bg-black/40 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/60"
        >
          <ChevronRight size={20} />
        </button>

        {/* Carousel indicators */}
        <div className="absolute bottom-[9px] left-1/2 -translate-x-1/2 flex items-center gap-[8px]">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`transition-all duration-300 rounded-full ${i === currentIndex
                ? "w-[40px] h-[10px] bg-white"      // Active = full bar
                : "w-[10px] h-[10px] bg-white/50"  // Inactive = small circle
                }`}
            />
          ))}
        </div>

      </div>

      {/* Item info */}
      <button onClick={onClick} className="w-full">
        <div className="flex flex-col gap-[14px] sm:gap-[20px] md:gap-[14px] lg:gap-[14px] xl:gap-[14px] items-start w-full">
          {/* Title and description */}
          <div className="flex flex-col gap-[2px] sm:gap-[10px] md:gap-[2px] lg:gap-[2px] xl:gap-[2px] items-start w-full">
            <h2 className="text-[14px] sm:text-[20px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-semibold font-weight-600 text-slate-800 leading-[20px] font-outfit">
              {title}
            </h2>
            <p className="text-[14px] sm:text-[20px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-normal text-slate-600 leading-[20px] font-outfit font-weight-400">
              {type === 'Hotel' && `${hotel?.nbLit} lits, ${hotel?.nbChambre} chambres / ${hotel?.nbNuit} nuits`}
              {type === 'Service' && service?.type.join(', ')}
              {type === 'Experience' && experience?.type.join(', ')}
            </p>
          </div>

          {/* Price section */}
          <div className="flex items-stretch h-[36px] sm:h-[54px] md:h-[36px] lg:h-[36px] xl:h-[36px] w-full">
            {/* Total price */}
            <div
              className="flex items-center justify-center px-[12px] rounded-tl-[12px] rounded-bl-[12px] sm:rounded-tl-[18px] sm:rounded-bl-[18px] md:rounded-tl-[12px] md:rounded-bl-[12px] lg:rounded-tl-[10px] lg:rounded-bl-[10px] xl:rounded-tl-[12px] xl:rounded-bl-[12px]"
              style={{
                background: 'linear-gradient(270deg, var(--colors-slate-100, #F1F5F9) 0%, var(--colors-sky-200, #BAE6FD) 45%)'
              }}
            >
              <p className="text-[16px] sm:text-[24px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-bold text-slate-900 leading-[16px] font-outfit">
                {type === 'Hotel' && `${hotel?.totalPrice.toLocaleString()} MAD`}
                {type === 'Service' && `${service?.minimumPrice.toLocaleString()} - ${service?.maximumPrice.toLocaleString()} MAD`}
                {type === 'Experience' && `${experience?.price.toLocaleString()} MAD`}
              </p>
            </div>

            {/* Additional info */}
            <div className="bg-green-100 flex items-center px-[10px] rounded-tr-[12px] rounded-br-[12px] sm:rounded-tr-[18px] sm:rounded-br-[18px] md:rounded-tr-[12px] md:rounded-br-[12px] lg:rounded-tr-[10px] lg:rounded-br-[10px] xl:rounded-tr-[12px] xl:rounded-br-[12px]"
              style={{
                background: type === 'Hotel' ? 'var(--colors-slate-100, #F1F5F9)' : 'var(--colors-green-100, #DCFCE7)'
              }}>
              <p className="text-[14px] sm:text-[20px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-medium text-green-600 leading-[20px] font-outfit"
                style={{ color: type === 'Hotel' ? 'var(--colors-slate-600, #475569)' : 'var(--colors-green-600, #166534)' }}>
                {type === 'Hotel' && `${hotel?.pricePerNight}/nuit`}
                {type === 'Service' && service?.status}
                {type === 'Experience' && `${experience?.nbPeople} personne`}
              </p>
            </div>
          </div>

          {/* Rating and distance */}
          <div className="flex justify-start gap-[12px] sm:gap-[18px] md:gap-[12px] lg:gap-[12px] xl:gap-[12px] items-center w-full h-[24px] sm:h-[36px] md:h-[24px] lg:h-[24px] xl:h-[24px]">
            {/* Rating */}
            <div className="flex gap-[6px] sm:gap-[9px] md:gap-[9px] lg:gap-[9px] xl:gap-[9px] items-center justify-center">
              <p className="text-[16px] sm:text-[24px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-semibold text-slate-800 font-outfit">
                {rating}
              </p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="block sm:hidden md:block lg:block xl:block">
                <path d="M9.15323 5.408C10.4202 3.136 11.0532 2 12.0002 2C12.9472 2 13.5802 3.136 14.8472 5.408L15.1752 5.996C15.5352 6.642 15.7152 6.965 15.9952 7.178C16.2752 7.391 16.6252 7.47 17.3252 7.628L17.9612 7.772C20.4212 8.329 21.6502 8.607 21.9432 9.548C22.2352 10.488 21.3972 11.469 19.7202 13.43L19.2862 13.937C18.8102 14.494 18.5712 14.773 18.4642 15.117C18.3572 15.462 18.3932 15.834 18.4652 16.577L18.5312 17.254C18.7842 19.871 18.9112 21.179 18.1452 21.76C17.3792 22.341 16.2272 21.811 13.9252 20.751L13.3282 20.477C12.6742 20.175 12.3472 20.025 12.0002 20.025C11.6532 20.025 11.3262 20.175 10.6722 20.477L10.0762 20.751C7.77323 21.811 6.62123 22.341 5.85624 21.761C5.08924 21.179 5.21623 19.871 5.46923 17.254L5.53523 16.578C5.60723 15.834 5.64323 15.462 5.53523 15.118C5.42923 14.773 5.19024 14.494 4.71424 13.938L4.28024 13.43C2.60324 11.47 1.76523 10.489 2.05723 9.548C2.34923 8.607 3.58024 8.328 6.04024 7.772L6.67624 7.628C7.37524 7.47 7.72424 7.391 8.00524 7.178C8.28624 6.965 8.46523 6.642 8.82523 5.996L9.15323 5.408Z" fill="#FBBF24" />
              </svg>



              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden sm:block md:hidden lg:hidden xl:hidden">
                <path d="M13.5742 8.02288C15.4532 4.65346 16.3919 2.96875 17.7964 2.96875C19.2008 2.96875 20.1395 4.65346 22.0185 8.02288L22.5049 8.89489C23.0388 9.85292 23.3058 10.3319 23.721 10.6478C24.1363 10.9637 24.6553 11.0809 25.6934 11.3152L26.6366 11.5287C30.2849 12.3548 32.1075 12.7671 32.542 14.1626C32.9751 15.5566 31.7323 17.0115 29.2453 19.9197L28.6016 20.6715C27.8957 21.4976 27.5413 21.9113 27.3826 22.4215C27.2239 22.9331 27.2773 23.4848 27.3841 24.5867L27.482 25.5907C27.8572 29.4718 28.0455 31.4116 26.9095 32.2732C25.7735 33.1348 24.0651 32.3488 20.6512 30.7768L19.7658 30.3705C18.7959 29.9226 18.311 29.7002 17.7964 29.7002C17.2817 29.7002 16.7968 29.9226 15.8269 30.3705L14.943 30.7768C11.5276 32.3488 9.8192 33.1348 8.68469 32.2747C7.54721 31.4116 7.73556 29.4718 8.11076 25.5907L8.20864 24.5882C8.31542 23.4848 8.36881 22.9332 8.20864 22.423C8.05144 21.9114 7.697 21.4976 6.99108 20.673L6.34745 19.9197C3.86043 17.0129 2.61766 15.5581 3.0507 14.1626C3.48374 12.7671 5.30934 12.3533 8.95757 11.5287L9.90077 11.3152C10.9374 11.0809 11.455 10.9637 11.8717 10.6478C12.2884 10.3319 12.5539 9.85292 13.0878 8.89489L13.5742 8.02288Z" fill="#FBBF24" />
              </svg>
            </div>
            {/* Number of ratings */}
            <p className="text-[14px] sm:text-[21px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-semibold text-slate-600 leading-[20px] font-outfit">
              {service ? service?.nbRating >= 100 ? '+99' : service?.nbRating!.toLocaleString() : experience?.nbRating && experience?.nbRating >= 100 ? '+99' : experience?.nbRating!.toLocaleString()}
            </p>
            {/* Distance */}
            <p className="text-[14px] sm:text-[21px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-normal text-slate-600 leading-[20px] font-outfit">
              {distance} km du centre
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ItemCard;
export type { HotelCardProps, ServiceCardProps, ExperienceCardProps };
