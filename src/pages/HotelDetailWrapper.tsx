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
import { HoteInfoProps } from '../components/details/Hote';

interface HotelDetailWrapperProps {
  hotelData?: any;
}

const HotelDetailWrapper: React.FC<HotelDetailWrapperProps> = ({ hotelData: propHotelData }: HotelDetailWrapperProps) => {
  const location = useLocation();
  const { hotelId } = useParams<{ hotelId: string }>();

  // Get hotel data from props or navigation state
  const hotelData = propHotelData || location.state?.hotel || location.state?.service || location.state?.experience || location.state?.health;

  // Default description
  const defaultDescription = "Plongez dans l'envoûtement d'un riad marocain traditionnel, où chaque coin respire l'authenticité. Imaginez-vous vous détendre au bord d'une piscine scintillante, entouré de chambres somptueusement décorées qui allient confort moderne et touches artisanales.\n \n Ne manquez pas la terrasse sur le toit, un véritable havre de paix, offrant une vue panoramique à couper le souffle sur les toits de Marrakech, surtout au coucher du soleil. Ce riad est l'endroit idéal pour vivre une expérience inoubliable, mêlant luxe et culture.";

  // Mock avis data
  const defaultAvis = [
    { name: 'John Doe', userImg: '/users/user1.png', like: 10, dislike: 2, comment: 'Le riad était tout simplement exceptionnel ! La piscine était un vrai répit face à la chaleur de Marrakech.', rating: 4.8, date: 'Janvier 2024  ' },
    { name: 'Kamal', userImg: '/users/user2.png', like: 8, dislike: 1, comment: 'Très belle architecture traditionnelle. Les espaces communs sont magnifiques.', rating: 4.5, date: 'Février 2024' },
    { name: 'Sarah', userImg: '/users/user3.png', like: 12, dislike: 0, comment: 'Service impeccable, personnel très attentionné. Je recommande vivement !', rating: 5.0, date: 'Mars 2024' },
    { name: 'Ahmed', userImg: '/users/user4.png', like: 5, dislike: 3, comment: 'Excellent rapport qualité-prix. La terrasse offre une vue magnifique.', rating: 4.6, date: 'Avril 2024' },
    { name: 'Marie', userImg: '/users/user5.png', like: 15, dislike: 1, comment: 'Riad authentique et charmant. Petit-déjeuner délicieux. Très bon séjour.', rating: 4.9, date: 'Mai 2024' },
    { name: 'Omar', userImg: '/users/user6.png', like: 7, dislike: 2, comment: 'Bon emplacement, près des attractions principales. Chambres confortables.', rating: 4.4, date: 'Juin 2024' },
    { name: 'Sophie', userImg: '/users/user1.png', like: 9, dislike: 0, comment: 'Atmosphère magique et relaxante. Piscine très agréable. Parfait pour se détendre.', rating: 4.7, date: 'Juillet 2024' },
    { name: 'Youssef', userImg: '/users/user2.png', like: 11, dislike: 1, comment: 'Accueil chaleureux et professionnel. Décoration soignée. Excellent séjour !', rating: 4.8, date: 'Août 2024' },
    { name: 'Nassim', userImg: '/users/user3.png', like: 6, dislike: 2, comment: 'Très agréable séjour dans ce riad authentique. Je recommande !', rating: 4.5, date: 'Septembre 2024' },
    { name: 'Hassan', userImg: '/users/user4.png', like: 4, dislike: 1, comment: 'Bel endroit avec une décoration soignée. Personnel très accueillant.', rating: 4.3, date: 'Octobre 2024' },
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
  const type = (hotelData?.type as 'Hotel' | 'Service' | 'Experience' | 'Health') || 'Hotel';
  const genre = hotelData?.genre as string[];
  
  // Extract price based on type
  let minPrice = 100;
  let pricePerNight: number | undefined;
  let totalPrice: number | undefined;
  
  if (hotelData) {
    if (type === 'Service' && hotelData.minimumPrice) {
      minPrice = hotelData.minimumPrice;
    } else if (type === 'Experience' && hotelData.price) {
      minPrice = hotelData.price;
    } else if (type === 'Hotel') {
      if (hotelData.minPrice || hotelData.pricePerNight) {
        minPrice = hotelData.minPrice || hotelData.pricePerNight;
      }
      pricePerNight = hotelData.pricePerNight;
      totalPrice = hotelData.totalPrice;
    }
  }
  
  const defaultMenu = [
    {
      tag: 'Menu du jour',
      images: [
        '/images/menu1.png',
        '/images/menu2.png',
        '/images/menu3.png',
        '/images/menu4.png',
      ]
    }
  ];

  const status = hotelData?.status || 'Ouvert';
  const description = hotelData?.description || defaultDescription;
  const images = hotelData?.images || defaultImages;
  const tags = hotelData?.tags || defaultTags;
  const rating = hotelData?.rating || 4.8;
  const nbRating = hotelData?.nbRating || 2230;
  const avis = defaultAvis;
  const menu = hotelData?.menu || defaultMenu;
  const formules = hotelData?.formules || [];
  const hoteInfo = hotelData?.hoteInfo || {
    name: 'Omar',
    type: type,
    userImg: '/images/hote.png',
    description: 'Bienvenue dans ce superbe appartement de standing au cœur d’un domaine golfique, avec vue imprenable sur le golf depuis le jardin privé.\n\n Entièrement meublé et équipé, l’appartement offre 2 chambres confortables, un salon lumineux avec Smart TV, 2 salles de bain et une cuisine. Climatisation et Wi-Fi Fibre sont à disposition pour un séjour tout confort.\n\n Accès libre aux piscines, jardins et golf. À 5 min de l’aéroport, 8 min de M Avenue et 3 min de Carrefour. Parking gratuit sécurisé 24h/24.',
    anciennete: 10
  };
  const currentId = hotelData?.id || (hotelId ? parseInt(hotelId) : undefined);

  // Extract health schedule data
  const jourDebut = hotelData?.jourDebut;
  const jourFin = hotelData?.jourFin;
  const heureDebut = hotelData?.heureDebut;
  const heureFin = hotelData?.heureFin;

  // Extract additional props for ItemCard
  const nbLit = hotelData?.nbLit;
  const nbChambre = hotelData?.nbChambre;
  const nbNuit = hotelData?.nbNuit;
  const maximumPrice = hotelData?.maximumPrice;
  const nbPeople = hotelData?.nbPeople;
  const distance = hotelData?.distance || hotelData?.distancce || 0;
  const address = hotelData?.address || hotelData?.adresse || '';

  return (
    <Details
      id={currentId}
      title={title}
      type={type}
      genre={genre}
      minPrice={minPrice}
      pricePerNight={pricePerNight}
      totalPrice={totalPrice}
      status={status}
      description={description}
      tags={tags}
      rating={rating}
      nbRating={nbRating}
      avis={avis}
      hoteInfo={hoteInfo}
      images={images}
      menu={menu}
      formules={formules}
      jourDebut={jourDebut}
      jourFin={jourFin}
      heureDebut={heureDebut}
      heureFin={heureFin}
      nbLit={nbLit}
      nbChambre={nbChambre}
      nbNuit={nbNuit}
      maximumPrice={maximumPrice}
      nbPeople={nbPeople}
      distance={distance}
      address={address}
    />
  );
};

export default HotelDetailWrapper;