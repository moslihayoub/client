import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlHeart from "../svgs/black/BlHeart";
import RHeart from "../svgs/red/RHeart";
import BlComparator from "../svgs/black/BlComparator";
import RComparator from "../svgs/red/RComparator";
import Bookmark2 from "../svgs/icons/Bookmark2";
import Bookmark from "../svgs/icons/Bookmark";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";

export interface MenuProps {
  tag: string;
  images: string[];
}

export interface FormuleProps {
  title: string;
  description: string;
  tag: string;
  images: string[];
}

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
  genre: string[];
  rating: number;
  nbRating: number;
  distance: number;
  minimumPrice: number;
  maximumPrice: number;
  status: 'Ouvert' | 'Fermé';
  menu: MenuProps[];
  images: string[];
}

interface ExperienceCardProps {
  id: number;
  title: string;
  genre: string[];
  rating: number;
  nbRating: number;
  distance: number;
  price: number;
  nbPeople: number;
  formules: FormuleProps[];
  images: string[];
}

interface HealthCardProps {
  id: number;
  title: string;
  genre: string[];
  jourDebut: string;
  jourFin: string;
  heureDebut: string;
  heureFin: string;
  rating: number;
  nbRating: number;
  distance: number;
  status: 'Ouvert' | 'Fermé';
  images: string[];
}

interface ItemCardProps {
  id: number;
  type: 'Hotel' | 'Service' | 'Experience' | 'Health';
  hotel?: HotelCardProps;
  service?: ServiceCardProps;
  experience?: ExperienceCardProps;
  health?: HealthCardProps;
  onClick?: () => void;
  onImageClick?: (index: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ id, type, hotel, service, experience, health, onClick, onImageClick }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Get images and title based on type
  const images = type === 'Hotel' ? hotel?.images! : type === 'Service' ? service?.images! : type === 'Experience' ? experience?.images! : health?.images!;
  const title = type === 'Hotel' ? hotel?.title! : type === 'Service' ? service?.title! : type === 'Experience' ? experience?.title! : health?.title!;
  const rating = type === 'Hotel' ? hotel?.rating! : type === 'Service' ? service?.rating! : type === 'Experience' ? experience?.rating! : health?.rating!;
  const distance = type === 'Hotel' ? hotel?.distancce! : type === 'Service' ? service?.distance! : type === 'Experience' ? experience?.distance! : health?.distance!;

  const [currentIndex, setCurrentIndex] = useState(0);
  const favorite = isFavorite(id, type);

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleFavorite = () => {
    toggleFavorite({ id, type, hotel, service, experience, health });
  };

  return (
    <div
      className="flex flex-col gap-[11px] items-start bg-transparent sm:bg-white md:bg-white lg:bg-transparent xl:bg-transparent rounded-[26px] w-full h-full cursor-pointer"
    >
      {/* Carousel container */}
      <div
        className="relative w-full h-[350px] sm:h-[350px] md:h-[254px] lg:h-[265px] xl:h-[265px] rounded-[26px] overflow-hidden group cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          onImageClick?.(currentIndex);
        }}
      >
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
            <div
              className="absolute inset-0 rounded-[26px]"
              style={{
                background: 'linear-gradient(180deg, rgba(2, 6, 23, 0.50) 0%, rgba(2, 6, 23, 0.00) 30%, rgba(2, 6, 23, 0.00) 70%, rgba(2, 6, 23, 0.50) 100%)'
              }}
            />
          </div>
        ))}

        {/* Top action buttons */}
        <div className="absolute top-[9px] left-[9px] right-[9px] flex justify-between items-center z-10">
          {/* Heart button */}
          <button className="w-[34px] h-[34px] flex items-center justify-center transition-all group/heart"
            onClick={() => handleFavorite()}>
            {favorite ? (
              <RHeart className="absolute opacity-100 transition-opacity duration-300" />
            ) : (
              <>
                <BlHeart className="absolute opacity-100 group-hover/heart:opacity-0 transition-opacity duration-300" />
                <RHeart className="absolute opacity-0 group-hover/heart:opacity-100 transition-opacity duration-300" />
              </>
            )}
          </button>

          {/* Comparator button */}
          {type === 'Hotel' && (
            <button className="w-[46px] h-[46px] flex items-center justify-center transition-all group/comparator">
              <BlComparator className="absolute opacity-80 group-hover/comparator:opacity-0 transition-opacity duration-300" />
              <RComparator className="absolute opacity-0 group-hover/comparator:opacity-100 transition-opacity duration-300" />
            </button>
          )}

          {/* Bookmark button */}
          {type === 'Health' && (
            <button className="w-[46px] h-[46px] flex items-center justify-center transition-all group/bookmark">
              <div className="absolute opacity-80 group-hover/bookmark:opacity-0 transition-opacity duration-300">
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M28.4115 15.0151V21.7703C28.4115 25.9591 28.4115 28.0548 27.4185 28.9693C26.945 29.4063 26.3469 29.681 25.7097 29.7541C24.3744 29.9069 22.8144 28.5269 19.6959 25.7683C18.3159 24.5493 17.6272 23.9391 16.8304 23.7795C16.4375 23.6993 16.0326 23.6993 15.6398 23.7795C14.8415 23.9391 14.1529 24.5493 12.7742 25.7683C9.65571 28.5269 8.09577 29.9069 6.76042 29.7527C6.1222 29.6793 5.52382 29.405 5.05165 28.9693C4.05859 28.0548 4.05859 25.9604 4.05859 21.7703V15.0138C4.05859 9.2137 4.05859 6.313 5.84177 4.50953C7.62495 2.70605 10.4959 2.70605 16.2351 2.70605C21.9742 2.70605 24.8452 2.70605 26.6284 4.50817C28.4115 6.31029 28.4115 9.2137 28.4115 15.0151ZM11.1615 8.11782C11.1615 7.8487 11.2684 7.59061 11.4587 7.40031C11.649 7.21002 11.9071 7.10311 12.1762 7.10311H20.2939C20.563 7.10311 20.8211 7.21002 21.0114 7.40031C21.2017 7.59061 21.3086 7.8487 21.3086 8.11782C21.3086 8.38694 21.2017 8.64503 21.0114 8.83532C20.8211 9.02562 20.563 9.13252 20.2939 9.13252H12.1762C11.9071 9.13252 11.649 9.02562 11.4587 8.83532C11.2684 8.64503 11.1615 8.38694 11.1615 8.11782Z" fill="white" />
                </svg>

              </div>
              <div className="absolute opacity-0 group-hover/bookmark:opacity-100 transition-opacity duration-300">
                <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M28.4118 15.0151V21.7703C28.4118 25.9591 28.4118 28.0548 27.4187 28.9693C26.9452 29.4063 26.3472 29.681 25.71 29.7541C24.3746 29.9069 22.8147 28.5269 19.6961 25.7683C18.3161 24.5493 17.6275 23.9391 16.8306 23.7795C16.4378 23.6993 16.0328 23.6993 15.64 23.7795C14.8418 23.9391 14.1531 24.5493 12.7745 25.7683C9.65596 28.5269 8.09601 29.9069 6.76066 29.7527C6.12244 29.6793 5.52406 29.405 5.0519 28.9693C4.05884 28.0548 4.05884 25.9604 4.05884 21.7703V15.0138C4.05884 9.2137 4.05884 6.313 5.84201 4.50953C7.62519 2.70605 10.4961 2.70605 16.2353 2.70605C21.9745 2.70605 24.8454 2.70605 26.6286 4.50817C28.4118 6.31029 28.4118 9.2137 28.4118 15.0151ZM11.1618 8.11782C11.1618 7.8487 11.2687 7.59061 11.459 7.40031C11.6493 7.21002 11.9074 7.10311 12.1765 7.10311H20.2941C20.5632 7.10311 20.8213 7.21002 21.0116 7.40031C21.2019 7.59061 21.3088 7.8487 21.3088 8.11782C21.3088 8.38694 21.2019 8.64503 21.0116 8.83532C20.8213 9.02562 20.5632 9.13253 20.2941 9.13253H12.1765C11.9074 9.13253 11.6493 9.02562 11.459 8.83532C11.2687 8.64503 11.1618 8.38694 11.1618 8.11782Z" fill="#22D3EE" />
                </svg>
              </div>
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
        <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex items-center gap-[8px]">
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
            <h2 className="text-[14px] sm:text-[20px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-semibold text-start font-weight-600 text-slate-800 leading-[20px] font-bricolagegrotesque w-full truncate">
              {title}
            </h2>
            <p className="text-[14px] sm:text-[20px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-normal text-slate-600 leading-[20px] font-vendsans font-weight-400 text-start w-full truncate">
              {type === 'Hotel' && `${hotel?.nbLit} lits, ${hotel?.nbChambre} chambres / ${hotel?.nbNuit} nuits`}
              {type === 'Service' && service?.genre.join(', ')}
              {type === 'Experience' && experience?.genre.join(', ')}
              {type === 'Health' && (
                <span className="w-full text-start truncate">
                  Du {health?.jourDebut} au {health?.jourFin} / <span className="text-sky-500"> {health?.heureDebut} à {health?.heureFin}</span>
                </span>
              )}
            </p>
          </div>

          {/* Price section */}
          <div className="flex items-stretch h-[36px] sm:h-[54px] md:h-[36px] lg:h-[36px] xl:h-[36px] w-full">
            {/* Total price */}
            {type === 'Health' ? (
              <div className={`flex items-center justify-center px-[10px] py-[8px] rounded-[12px] w-full ${health?.status === 'Ouvert' ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className={`text-[16px] sm:text-[24px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-bold ${health?.status === 'Ouvert' ? 'text-green-600' : 'text-red-600'} leading-[16px] font-bricolagegrotesque`}>
                  {health?.status}
                </p>
              </div>
            ) : (
              <>
                <div
                  className="flex items-center justify-center px-[12px] rounded-tl-[12px] rounded-bl-[12px] sm:rounded-tl-[18px] sm:rounded-bl-[18px] md:rounded-tl-[12px] md:rounded-bl-[12px] lg:rounded-tl-[10px] lg:rounded-bl-[10px] xl:rounded-tl-[12px] xl:rounded-bl-[12px]"
                  style={{
                    background: 'linear-gradient(270deg, var(--colors-slate-100, #F1F5F9) 0%, var(--colors-sky-200, #BAE6FD) 45%)'
                  }}
                >
                  <p className="text-[16px] sm:text-[24px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-bold text-slate-900 leading-[16px] font-bricolagegrotesque">
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
                  <p className="text-[14px] sm:text-[20px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-medium text-green-600 leading-[20px] font-bricolagegrotesque"
                    style={{ color: type === 'Hotel' ? 'var(--colors-slate-600, #475569)' : 'var(--colors-green-600, #166534)' }}>
                    {type === 'Hotel' && `${hotel?.pricePerNight}/nuit`}
                    {type === 'Service' && service?.status}
                    {type === 'Experience' && `${experience?.nbPeople} personne`}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Rating and distance */}
          <div className="flex justify-start gap-[12px] sm:gap-[18px] md:gap-[12px] lg:gap-[12px] xl:gap-[12px] items-center w-full h-[24px] sm:h-[36px] md:h-[24px] lg:h-[24px] xl:h-[24px]">
            {/* Rating */}
            <div className="flex gap-[6px] sm:gap-[9px] md:gap-[9px] lg:gap-[9px] xl:gap-[9px] items-center justify-center">
              <p className="text-[16px] sm:text-[24px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-semibold text-slate-800 font-bricolagegrotesque">
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
            <p className="text-[14px] sm:text-[21px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-semibold text-slate-600 leading-[20px] font-bricolagegrotesque">
              {service ? service?.nbRating >= 100 ? '+99' : service?.nbRating!.toLocaleString() : experience?.nbRating && experience?.nbRating >= 100 ? '+99' : experience?.nbRating!.toLocaleString()}
            </p>
            {/* Distance */}
            <p className="text-[14px] sm:text-[21px] md:text-[16px] lg:text-[14px] xl:text-[16px] font-normal text-slate-600 leading-[20px] font-bricolagegrotesque">
              {distance} km du centre
            </p>
          </div>

          {/* Health contact info */}
          {type === 'Health' && (
            <div className="flex gap-[6px] items-start w-full h-[36px] sm:h-[53px] md:h-[36px] lg:h-[36px] xl:h-[36px] mb-2">
              {/* Contactez Button */}
              <button
                className="flex-1 rounded-[13px] sm:rounded-[18px] md:rounded-[13px] lg:rounded-[13px] xl:rounded-[13px] h-full px-[15px] py-[6px] flex items-center justify-center gap-[4px] cursor-pointer hover:opacity-90 transition-opacity"
                style={{
                  background: 'linear-gradient(180deg, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-teal-600, #0D9488) 100%)'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.718 3.09179C5.944 1.80079 7.972 2.04179 8.986 3.47579L10.246 5.25979C11.057 6.40679 10.989 7.99979 10.021 9.01979L9.776 9.27679L9.774 9.28279C9.761 9.31879 9.729 9.43479 9.761 9.65479C9.828 10.1098 10.179 11.0358 11.607 12.5388C13.039 14.0468 13.907 14.4018 14.31 14.4678C14.4071 14.4899 14.5081 14.4875 14.604 14.4608L15.012 14.0308C15.886 13.1108 17.248 12.9298 18.347 13.5618L20.257 14.6618C21.89 15.6018 22.27 17.9008 20.965 19.2748L19.545 20.7698C19.102 21.2368 18.497 21.6358 17.75 21.7098C15.926 21.8898 11.701 21.6548 7.272 16.9908C3.138 12.6398 2.353 8.85479 2.254 7.00579C2.205 6.09179 2.612 5.30879 3.148 4.74379L4.718 3.09179ZM7.761 4.34179C7.249 3.61779 6.328 3.57379 5.805 4.12479L4.235 5.77679C3.905 6.12679 3.73 6.52679 3.752 6.92579C3.832 8.43579 4.483 11.8778 8.359 15.9578C12.423 20.2378 16.168 20.3578 17.603 20.2168C17.886 20.1888 18.178 20.0308 18.457 19.7368L19.877 18.2418C20.491 17.5958 20.33 16.4338 19.509 15.9618L17.599 14.8618C17.086 14.5668 16.485 14.6578 16.1 15.0638L15.644 15.5438L15.117 15.0428C15.644 15.5428 15.644 15.5438 15.643 15.5448L15.642 15.5458L15.639 15.5498L15.632 15.5558L15.618 15.5698C15.5761 15.611 15.5305 15.6485 15.482 15.6818C15.402 15.7378 15.296 15.8008 15.161 15.8538C14.885 15.9628 14.521 16.0208 14.07 15.9478C13.192 15.8058 12.042 15.1748 10.52 13.5718C8.992 11.9638 8.407 10.7648 8.277 9.87179C8.21 9.41779 8.263 9.05479 8.361 8.77979C8.41552 8.62659 8.49308 8.4826 8.591 8.35279L8.621 8.31579L8.635 8.30079L8.641 8.29379L8.644 8.29079L8.646 8.28979C8.646 8.28979 8.646 8.28779 9.179 8.79279L8.647 8.28779L8.934 7.98579C9.379 7.51679 9.444 6.72279 9.022 6.12579L7.761 4.34179Z" fill="white" />
                  <path d="M14.0378 1.75195C14.0436 1.75307 14.0498 1.75478 14.0554 1.75586C14.0673 1.75812 14.0801 1.76108 14.0935 1.76367C14.123 1.76939 14.1466 1.77372 14.158 1.77637V1.77734L14.1687 1.7793C14.2381 1.79383 14.3427 1.82054 14.4871 1.86133V1.86035C14.6933 1.92094 14.9639 2.01218 15.2849 2.14453L15.6248 2.29199C16.5721 2.72669 17.8465 3.49325 19.1765 4.82227C20.3401 5.98584 21.072 7.1079 21.5281 8.00488L21.7078 8.375C21.9244 8.84813 22.0576 9.23881 22.1384 9.51562V9.5166C22.1584 9.58532 22.1778 9.6542 22.1951 9.72363L22.2419 9.93262L22.2429 9.94141L22.2439 9.94336C22.2553 10.012 22.239 10.0828 22.199 10.1396C22.16 10.1951 22.1012 10.2326 22.0349 10.2461C21.9712 10.2552 21.9067 10.2398 21.8542 10.2021C21.8007 10.1637 21.7646 10.106 21.7537 10.041L21.7517 10.0303L21.7097 9.83789C21.694 9.77426 21.6753 9.71111 21.656 9.64844C21.5745 9.37526 21.4794 9.10641 21.3689 8.84375L21.2527 8.58105C20.8401 7.68247 20.1048 6.45861 18.822 5.17578C17.5391 3.89294 16.3164 3.15955 15.4167 2.74707H15.4177C15.0711 2.58612 14.7127 2.45094 14.3464 2.3418L14.3396 2.33984L13.9949 2.25293L13.9822 2.25L13.9685 2.24805L13.9197 2.23438C13.8728 2.21662 13.8315 2.18564 13.8015 2.14453C13.7623 2.09053 13.7449 2.02312 13.7537 1.95703C13.7591 1.92564 13.7711 1.89528 13.7878 1.86816C13.8051 1.84038 13.8277 1.81599 13.8542 1.79688C13.8809 1.77775 13.9112 1.76435 13.9431 1.75684C13.9741 1.74955 14.0063 1.74718 14.0378 1.75195Z" fill="white" stroke="white" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.486 5.3299C13.513 5.23513 13.5584 5.14661 13.6195 5.06939C13.6807 4.99217 13.7565 4.92776 13.8426 4.87984C13.9287 4.83192 14.0234 4.80143 14.1213 4.79012C14.2191 4.7788 14.3183 4.78688 14.413 4.8139L14.207 5.5349L14.414 4.8149H14.416L14.42 4.8159L14.427 4.8179L14.447 4.8249C14.4623 4.8289 14.4813 4.83523 14.504 4.8439C14.5487 4.85923 14.6077 4.88256 14.681 4.9139C14.826 4.9759 15.025 5.0719 15.27 5.2169C15.76 5.5069 16.427 5.9869 17.212 6.7729C17.997 7.5579 18.479 8.2259 18.768 8.7149C18.913 8.9599 19.009 9.1589 19.072 9.3049C19.1049 9.3813 19.1346 9.45903 19.161 9.5379L19.167 9.5579L19.169 9.5659L19.17 9.5689V9.5709L18.45 9.7779L19.171 9.5719C19.227 9.76285 19.2048 9.96822 19.1093 10.1428C19.0139 10.3174 18.853 10.4469 18.662 10.5029C18.4711 10.5589 18.2657 10.5367 18.0911 10.4412C17.9165 10.3458 17.787 10.1849 17.731 9.9939L17.728 9.9839L17.693 9.8959C17.6292 9.75279 17.5571 9.61355 17.477 9.4789C17.254 9.1029 16.852 8.5329 16.152 7.8329C15.452 7.1329 14.882 6.7309 14.506 6.5079C14.3441 6.41284 14.1757 6.3293 14.002 6.2579L13.992 6.2539C13.8029 6.19731 13.6438 6.06847 13.549 5.89532C13.4543 5.72216 13.4317 5.51964 13.486 5.3299Z" fill="white" />
                </svg>
                <p className="text-[16px] sm:text-[24px] md:text-[16px] lg:text-[16px] xl:text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-white whitespace-nowrap">
                  Contactez
                </p>

              </button>

              {/* Localisé Button */}
              <button
                className="flex-1 rounded-[13px] sm:rounded-[18px] md:rounded-[13px] lg:rounded-[13px] xl:rounded-[13px] h-full px-[15px] py-[6px] flex items-center justify-center gap-[4px] cursor-pointer hover:opacity-90 transition-opacity"
                style={{
                  background: 'radial-gradient(141.56% 141.56% at 50% -7.74%, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-sky-500, #0EA5E9) 50.96%, var(--colors-fuchsia-500, #D946EF) 100%)'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 10.143C4 5.646 7.582 2 12 2C16.418 2 20 5.646 20 10.143C20 14.605 17.447 19.813 13.463 21.674C13.0051 21.8884 12.5056 21.9996 12 21.9996C11.4944 21.9996 10.9949 21.8884 10.537 21.674C6.553 19.812 4 14.606 4 10.144V10.143Z" stroke="white" stroke-width="1.5" />
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" stroke-width="1.5" />
                </svg>
                <p className="text-[16px] sm:text-[24px] md:text-[16px] lg:text-[16px] xl:text-[16px] font-bricolagegrotesque font-medium leading-[24px] text-white whitespace-nowrap">
                  Localisé
                </p>

              </button>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};

export default ItemCard;
export type { HotelCardProps, ServiceCardProps, ExperienceCardProps, HealthCardProps };
