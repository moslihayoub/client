import React from 'react';
import PublicityBanner from './PublicityBanner';
import MostFrequentSection from './MostFrequentSection';
import NearestSection from './NearestSection';
import { ServiceCardProps, ExperienceCardProps } from '../HoltelCard';

interface MobileListingPageProps {
  type: 'Service' | 'Experience';
  title: string;
  allItems: (ServiceCardProps | ExperienceCardProps)[];
  mostFrequentItems: (ServiceCardProps | ExperienceCardProps)[];
  nearestItems: (ServiceCardProps | ExperienceCardProps)[];
}

function MobileListingPage({
  type,
  title,
  allItems,
  mostFrequentItems,
  nearestItems,
}: MobileListingPageProps) {
  // Mock publicity banners - in real app, these would come from props or API
  const publicityBanners = [
    {
      image: '/services/service-prop1.png',
      title: 'Réservez vos billets',
      subtitle: 'Profitez de 30 % de réduction sur les trois premiers matchs de la Coupe du Monde 2030 ! Réservez dès maintenant !',
      buttonText: 'Contactez-nous au : 0522 67 67 67',
    },
    {
      image: '/services/service-prop2.png',
      title: 'Découvrez notre atelier de travail du bois !',
      subtitle: 'Réservez vos places dès maintenant pour une expérience créative inoubliable.',
      buttonText: 'Contactez-nous au : 0522 67 67 67',
    },
  ];

  const singlePublicityBanner = {
    image: '/services/service-prop3.png',
    title: 'Découvrez notre atelier de travail du bois !',
    subtitle: 'Réservez vos places dès maintenant pour une expérience créative inoubliable.',
    buttonText: 'Contactez-nous au : 0522 67 67 67',
  };

  return (
    <div className="w-full flex flex-col gap-[20px] px-[12px] py-[20px]">
      {/* First Publicity Banner */}
      <PublicityBanner banners={publicityBanners} />

      {/* Most Frequent Section */}
      {mostFrequentItems.length > 0 && (
        <MostFrequentSection
          type={type}
          items={mostFrequentItems}
          distance="1.2 km"
          count={mostFrequentItems.length}
        />
      )}

      {/* Nearest Section */}
      {nearestItems.length > 0 && (
        <NearestSection
          type={type}
          items={nearestItems}
          distance="3.2 km"
          count={nearestItems.length}
        />
      )}

      {/* Second Publicity Banner (Single) */}
      <div className="w-full">
        <div className="h-[209px] rounded-[20px] overflow-hidden relative">
          <img
            src={singlePublicityBanner.image}
            alt={singlePublicityBanner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-start items-start px-[25px] py-[24px]">
            <div className="flex flex-col gap-[6px] items-start mb-[12px]">
              <p className="text-[19.96px] font-bold font-bricolagegrotesque text-white leading-[21.9px] mb-0">
                {singlePublicityBanner.title}
              </p>
              <p className="text-[12.96px] font-normal font-bricolagegrotesque text-white leading-[16px]">
                {singlePublicityBanner.subtitle}
              </p>
            </div>
            <button
              className="bg-black rounded-[836.92px] px-[19.93px] py-[11.63px] flex gap-[9.97px] items-center justify-center shadow-lg mt-auto"
            >
              <p className="text-[13.29px] font-medium font-bricolagegrotesque text-white leading-[19.93px]">
                {singlePublicityBanner.buttonText}
              </p>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileListingPage;

