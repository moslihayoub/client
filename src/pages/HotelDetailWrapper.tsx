import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Details from './Details';
import SkHome from '../svgs/icons/sky/SkHome';
import Wifi from '../svgs/Tags/Wifi';
import Piscine from '../svgs/Tags/Piscine';
import Climatisation from '../svgs/Tags/Climatisation';
import Cuisine from '../svgs/Tags/Cuisine';
import SmartTV from '../svgs/Tags/SmartTV';
import LaveLinge from '../svgs/Tags/LaveLinge';
import Cafetiere from '../svgs/Tags/Cafetiere';
import Jaccouzi from '../svgs/Tags/Jaccouzi';
import Balcon from '../svgs/Tags/Balcon';

interface HotelDetailWrapperProps {
  hotelData?: any;
}

const HotelDetailWrapper: React.FC<HotelDetailWrapperProps> = ({ hotelData: propHotelData }) => {
  const location = useLocation();
  const { hotelId } = useParams<{ hotelId: string }>();

  // Get hotel data from props or navigation state
  const hotelData = propHotelData || location.state?.hotel || location.state?.service || location.state?.experience;

  // Default description
  const defaultDescription = "Plongez dans l'envoûtement d'un riad marocain traditionnel, où chaque coin respire l'authenticité. Imaginez-vous vous détendre au bord d'une piscine scintillante, entouré de chambres somptueusement décorées qui allient confort moderne et touches artisanales.";

  // Mock avis data
  const defaultAvis = [
    { name: 'John Doe', userImg: '/images/boy.png', like: 10, dislike: 2, comment: 'Le riad était tout simplement exceptionnel ! La piscine était un vrai répit face à la chaleur de Marrakech.', rating: 4.8, date: '2025-01-01' },
    { name: 'Kamal', userImg: '/images/boy.png', like: 8, dislike: 1, comment: 'Très belle architecture traditionnelle. Les espaces communs sont magnifiques.', rating: 4.5, date: '2025-01-05' },
    { name: 'Sarah', userImg: '/images/boy.png', like: 12, dislike: 0, comment: 'Service impeccable, personnel très attentionné. Je recommande vivement !', rating: 5.0, date: '2025-01-10' },
    { name: 'Ahmed', userImg: '/images/boy.png', like: 5, dislike: 3, comment: 'Excellent rapport qualité-prix. La terrasse offre une vue magnifique.', rating: 4.6, date: '2025-01-12' },
    { name: 'Marie', userImg: '/images/boy.png', like: 15, dislike: 1, comment: 'Riad authentique et charmant. Petit-déjeuner délicieux. Très bon séjour.', rating: 4.9, date: '2025-01-15' },
    { name: 'Omar', userImg: '/images/boy.png', like: 7, dislike: 2, comment: 'Bon emplacement, près des attractions principales. Chambres confortables.', rating: 4.4, date: '2025-01-18' },
    { name: 'Sophie', userImg: '/images/boy.png', like: 9, dislike: 0, comment: 'Atmosphère magique et relaxante. Piscine très agréable. Parfait pour se détendre.', rating: 4.7, date: '2025-01-20' },
    { name: 'Youssef', userImg: '/images/boy.png', like: 11, dislike: 1, comment: 'Accueil chaleureux et professionnel. Décoration soignée. Excellent séjour !', rating: 4.8, date: '2025-01-22' },
    { name: 'Nassim', userImg: '/images/boy.png', like: 6, dislike: 2, comment: 'Très agréable séjour dans ce riad authentique. Je recommande !', rating: 4.5, date: '2025-01-25' },
    { name: 'Hassan', userImg: '/images/boy.png', like: 4, dislike: 1, comment: 'Bel endroit avec une décoration soignée. Personnel très accueillant.', rating: 4.3, date: '2025-01-28' },
  ];

  // Default images if none provided
  const defaultImages = [
    '/hotels/hotel1.png',
    '/hotels/hotel2.png',
    '/hotels/hotel3.png',
    '/hotels/hotel4.png',
    '/hotels/hotel5.png',
    '/hotels/hotel6.png'
  ];

  // Default tags
  const defaultTags = [
    { text: 'WiFi', Icon: Wifi },
    { text: 'Piscine', Icon: Piscine },
    { text: 'Cuisine', Icon: Cuisine },
    { text: 'Smart TV', Icon: SmartTV },
    { text: 'Climatisation', Icon: Climatisation },
    { text: 'Lave-linge', Icon: LaveLinge },
    { text: 'Cafetière', Icon: Cafetiere },
    { text: 'Jaccouzi', Icon: Jaccouzi },
    { text: 'Balcon privé', Icon: Balcon },
  ];

  // If hotel data exists, use it; otherwise use defaults
  const title = hotelData?.title || 'Hotel Plaza Premium';
  const description = hotelData?.description || defaultDescription;
  const images = hotelData?.images || defaultImages;
  const tags = defaultTags;
  const rating = hotelData?.rating || 4.8;
  const nbRating = hotelData?.nbRating || 245;
  const avis = defaultAvis;
  const hoteInfo = {
    name: 'Fatima Bennani',
    userImg: '/images/boy.png',
    description: 'Passionnée de l\'hospitalité marocaine depuis 15 ans, je suis ravie de partager ma culture avec mes invités.',
    anciennete: 5
  };

  return (
    <Details
      title={title}
      description={description}
      tags={tags}
      rating={rating}
      nbRating={nbRating}
      avis={avis}
      hoteInfo={hoteInfo}
      images={images}
    />
  );
};

export default HotelDetailWrapper;

