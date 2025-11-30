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
      image: '/pub/pub1.png',
      title: 'Réservez vos billets',
      subtitle: 'Profitez de 30 % de réduction sur les trois premiers matchs de la Coupe du Monde 2030 ! Réservez dès maintenant !',
      buttonText: 'Contactez-nous au : 0522 67 67 67',
    },
    {
      image: '/pub/pub2.png',
      title: 'Découvrez notre atelier de travail du bois !',
      subtitle: 'Réservez vos places dès maintenant pour une expérience créative inoubliable.',
      buttonText: 'Contactez-nous au : 0522 67 67 67',
    },
  ];

  const singlePublicityBanner = {
    image: '/pub/pub2.png',
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
        </div>
      </div>
    </div>
  );
}

export default MobileListingPage;

