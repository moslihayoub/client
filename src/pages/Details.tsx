import React, { useState, useEffect } from 'react'
import ImageDisplay from '../components/details/ImageDisplay';
import Tags, { TagProps } from '../components/details/Tags';
import Avis, { AvisProps } from '../components/details/Avis';
import Hote, { HoteInfoProps } from '../components/details/Hote';
import Recommendation from '../components/details/Recommendation';
import SideListing from '../components/SideListing';
import Navbar from '../components/Navbar';
import { useSideListing } from '../contexts/SideListingContext';
import { Link } from 'react-router-dom';
import ImgDetails from '../components/details/ImgDetails';
import MenuComponent from '../components/details/MenuComponent';
import FormuleComponent from '../components/details/Formule';
import Horaires from '../components/details/Horaires';
import { MenuProps, FormuleProps } from '../components/HoltelCard';
import listingData from '../data/listingData.json';
import Map from '../components/details/Map';
import ItemCard from '../components/HoltelCard';
import ImagePopup from '../components/details/ImagePopup';

interface DetailsProps {
    id?: number;
    title: string;
    type: 'Hotel' | 'Service' | 'Experience' | 'Health';
    genre: string[];
    minPrice: number;
    pricePerNight?: number;
    totalPrice?: number;
    status: 'Ouvert' | 'Fermé';
    description: string;
    tags: TagProps[];
    rating: number;
    nbRating: number;
    avis: AvisProps[];
    hoteInfo: HoteInfoProps;
    images: string[];
    menu?: MenuProps[];
    formules?: FormuleProps[];
    jourDebut?: string;
    jourFin?: string;
    heureDebut?: string;
    heureFin?: string;
    // Additional props for ItemCard
    nbLit?: number;
    nbChambre?: number;
    nbNuit?: number;
    maximumPrice?: number;
    nbPeople?: number;
    distance?: number;
    address?: string;
}

function Details({ id, title, type, genre, minPrice, pricePerNight, totalPrice, status, description, tags, rating, nbRating, avis, hoteInfo, images, menu, formules, jourDebut, jourFin, heureDebut, heureFin, nbLit, nbChambre, nbNuit, maximumPrice, nbPeople, distance, address }: DetailsProps) {
    const { isCollapsed: isSidebarCollapsed } = useSideListing();
    const [showAllAvis, setShowAllAvis] = useState(false);
    const [showAllTags, setShowAllTags] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const apropos =
        type === 'Hotel' ? "À propos de cet endroit" :
            type === 'Service' ? "À propos de cet restaurant" :
                type === 'Experience' ? "À propos de cet expérience" :
                    type === 'Health' ? "À propos de ce N-Health" :
                        "À propos";

    const ceque =
        type === 'Hotel' ? "Ce que cet endroit offre" :
            type === 'Service' ? "Ce que ce service offre" :
                type === 'Experience' ? "Ce que cette expérience offre" :
                    type === 'Health' ? "Ce que ce N-Health offre" :
                        "Ce que cet endroit offre";

    const contactButtonText =
        type === 'Hotel' ? "Contacter l'hôte" :
            type === 'Service' ? "Contacter le restaurant" :
                type === 'Experience' ? "Contacter l'hôte" :
                    type === 'Health' ? "Contacter" :
                        "Contacter";

    const reservationButtonText =
        type === 'Hotel' ? "Valider la réservation" :
            type === 'Service' ? "Réserver" :
                type === 'Experience' ? "Réserver" :
                    type === 'Health' ? "Réserver" :
                        "Valider la réservation";

    // Detect mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    const desc1 = "Un restaurant convivial offrant une vue imprenable sur la place des Saveurs."
    const desc2 = "Un restaurant chaleureux avec une vue magnifique sur la place des Saveurs."
    const desc3 = "Un restaurant convivial offrant une vue imprenable sur la place des Saveurs."

    const formatNumber = (num: number): string => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
    };

    // Get listing data
    const { services, experiences, healths } = listingData as {
        services: any[];
        experiences: any[];
        healths: any[];
    };

    // Helper function to convert services/experiences/healths to cards format
    const convertToCards = (items: any[]): Array<{ title: string; description: string; image: string; hoverImage?: string }> => {
        return items.map((item) => ({
            title: item.title,
            description: item.hoteInfo?.description || item.description || `Découvrez ${item.title}`,
            image: item.images?.[0] || '/services/service-prop1.png',
            hoverImage: item.images?.[1] || item.images?.[0] || '/services/service-prop1.png'
        }));
    };

    // Filter out current item and get recommendations
    // For Hotel: use cards format (hover mode)
    // For Service/Experience: use items format (ItemCard list)
    const recommendedServices = (type === 'Hotel' || type === 'Service')
        ? services.filter(service => service.id !== id).slice(0, 8)
        : [];

    const recommendedExperiences = (type === 'Hotel' || type === 'Experience')
        ? experiences.filter(experience => experience.id !== id).slice(0, 8)
        : [];

    const recommendedHealths = (type === 'Health')
        ? healths.filter(health => health.id !== id).slice(0, 8)
        : [];

    // Convert to cards format for Hotel and Health
    const serviceCards = type === 'Hotel' ? convertToCards(recommendedServices) : [];
    const experienceCards = type === 'Hotel' ? convertToCards(recommendedExperiences) : [];
    const healthCards = type === 'Health' ? convertToCards(recommendedHealths) : [];

    return (
        <>
        <div className="flex flex-col h-screen">
            {/* Navbar at the top */}
            <Navbar logoColor="normal" background="white" iconVariant="transparent" profileImg="/users/user1.png" />

            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
                {/* SideListing - Dynamic width */}
                <div className={`flex-shrink-0 sm:hidden md:block lg:block xl:block  ml-[2%] transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-[80px]' : 'w-[22%]'
                    }`}>
                    <SideListing />
                </div>

                {/* Content area */}
                <div className="flex-1 overflow-y-auto scrollbar-hide mb-[50px]">
                    <div className={`flex flex-col items-center justify-center px-[12px]  mt-[8%] sm:mt-[28%] md:mt-[8%] lg:mt-[8%] xl:mt-[8%] ${isSidebarCollapsed ? 'sm:w-full md:w-full lg:w-[87%] xl:w-[87%]' : 'sm:w-full md:w-full lg:w-[82%] xl:w-[82%]'} ml-[68px] sm:ml-0 md:ml-0 lg:ml-[68px] xl:ml-[68px] ${isSidebarCollapsed ? 'sm:w-full md:w-full lg:w-[87%] xl:w-[87%]' : 'sm:w-full md:w-full lg:w-[82%] xl:w-[82%]'}`}>
                        {/* Breadcrumb - desktop only */}
                        <div className="hidden md:flex flex-row gap-2 items-center justify-start w-full mb-[24px]">
                            <span className="text-[16px] font-bricolagegrotesque">
                                <Link to="/hotels" className="text-sky-500 font-bricolagegrotesque">
                                    Accueil
                                </Link>
                            </span>
                            <span className="text-gray-500 font-bricolagegrotesque">/</span>
                            <span className="text-[16px] text-gray-500 font-bricolagegrotesque">{title}</span>
                        </div>

                        {/* Header */}
                        <div className={`text-left items-start justify-center w-full ${type === 'Health' ? '' : 'mb-[24px]'} `}>
                            <h1 className="text-[36px] sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-slate-800 leading-[48px] font-bricolagegrotesque mb-[11px]">
                                {title}
                            </h1>
                            {/*Health*/}
                            {type === 'Health' && (
                                <div className="hidden md:flex gap-[24px] items-center mb-[11px]">
                                    <div className="flex gap-[6px] items-center">
                                        <div className="w-6 h-6 flex items-center justify-center">
                                            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.75 8.75C0.75 4.979 0.75 3.093 1.922 1.922C3.094 0.751 4.979 0.75 8.75 0.75H10.75C14.521 0.75 16.407 0.75 17.578 1.922C18.749 3.094 18.75 4.979 18.75 8.75V12.75C18.75 16.521 18.75 18.407 17.578 19.578C16.406 20.749 14.521 20.75 10.75 20.75H8.75C4.979 20.75 3.093 20.75 1.922 19.578C0.751 18.406 0.75 16.521 0.75 12.75V8.75Z" stroke="#020617" stroke-width="1.5" />
                                                <path d="M9.75 4.75V6.75M9.75 6.75V8.75M9.75 6.75H7.75M9.75 6.75H11.75M5.75 12.75H13.75M6.75 16.75H12.75" stroke="#020617" stroke-width="1.5" stroke-linecap="round" />
                                            </svg>
                                        </div>
                                        <p className="font-bold text-[20px] sm:text-[14px] md:text-[20px] lg:text-[20px] xl:text-[20px] text-slate-600 font-bricolagegrotesque leading-[32px]">Consultation</p>
                                    </div>
                                    <div className="flex gap-[6px] items-center">
                                        <div className="w-6 h-6 flex items-center justify-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4.34315 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V12Z" stroke="#475569" strokeWidth="1.5" />
                                                <path d="M7 4V2M17 4V2M7 8H7.01M12 8H12.01M17 8H17.01M7 12H7.01M12 12H12.01M17 12H17.01M7 16H7.01M12 16H12.01M17 16H17.01" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <p className={`font-bold text-[20px] sm:text-[14px] md:text-[20px] lg:text-[20px] xl:text-[20px] font-bricolagegrotesque leading-[32px] ${status === 'Ouvert' ? 'text-green-600' : 'text-red-600'}`}>
                                            {status}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {/*Service and Experience*/}
                                <div className={`${type === 'Service' || type === 'Experience' ? 'flex' : 'hidden'} flex gap-[24px] items-center`}>
                                <div className="flex gap-[6px] items-center">
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.5" d="M3 10C3 6.229 3 4.343 4.172 3.172C5.344 2.001 7.229 2 11 2H13C16.771 2 18.657 2 19.828 3.172C20.999 4.344 21 6.229 21 10V14C21 17.771 21 19.657 19.828 20.828C18.656 21.999 16.771 22 13 22H11C7.229 22 5.343 22 4.172 20.828C3.001 19.656 3 17.771 3 14V10Z" stroke="#020617" stroke-width="1.5" />
                                            <path d="M12 6V8M12 8V10M12 8H10M12 8H14M8 14H16M9 18H15" stroke="#020617" stroke-width="1.5" stroke-linecap="round" />
                                        </svg>
                                    </div>
                                    <p className="font-bold text-[20px] sm:text-[14px] md:text-[20px] lg:text-[20px] xl:text-[20px] text-slate-600 font-bricolagegrotesque leading-[32px]">A partir de {formatNumber(minPrice)} MAD</p>
                                </div>
                                <div className="flex gap-[6px] items-center">
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 12C2 8.229 2 6.343 3.172 5.172C4.344 4.001 6.229 4 10 4H14C17.771 4 19.657 4 20.828 5.172C21.999 6.344 22 8.229 22 12V14C22 17.771 22 19.657 20.828 20.828C19.656 21.999 17.771 22 14 22H10C6.229 22 4.343 22 3.172 20.828C2.001 19.656 2 17.771 2 14V12Z" stroke="#475569" stroke-width="1.5" />
                                            <path opacity="0.5" d="M7 4V2.5M17 4V2.5M2.5 9H21.5" stroke="#475569" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M18 17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18C16.7348 18 16.4804 17.8946 16.2929 17.7071C16.1054 17.5196 16 17.2652 16 17C16 16.7348 16.1054 16.4804 16.2929 16.2929C16.4804 16.1054 16.7348 16 17 16C17.2652 16 17.5196 16.1054 17.7071 16.2929C17.8946 16.4804 18 16.7348 18 17ZM18 13C18 13.2652 17.8946 13.5196 17.7071 13.7071C17.5196 13.8946 17.2652 14 17 14C16.7348 14 16.4804 13.8946 16.2929 13.7071C16.1054 13.5196 16 13.2652 16 13C16 12.7348 16.1054 12.4804 16.2929 12.2929C16.4804 12.1054 16.7348 12 17 12C17.2652 12 17.5196 12.1054 17.7071 12.2929C17.8946 12.4804 18 12.7348 18 13ZM13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17C11 16.7348 11.1054 16.4804 11.2929 16.2929C11.4804 16.1054 11.7348 16 12 16C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17ZM13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13ZM8 17C8 17.2652 7.89464 17.5196 7.70711 17.7071C7.51957 17.8946 7.26522 18 7 18C6.73478 18 6.48043 17.8946 6.29289 17.7071C6.10536 17.5196 6 17.2652 6 17C6 16.7348 6.10536 16.4804 6.29289 16.2929C6.48043 16.1054 6.73478 16 7 16C7.26522 16 7.51957 16.1054 7.70711 16.2929C7.89464 16.4804 8 16.7348 8 17ZM8 13C8 13.2652 7.89464 13.5196 7.70711 13.7071C7.51957 13.8946 7.26522 14 7 14C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12C7.26522 12 7.51957 12.1054 7.70711 12.2929C7.89464 12.4804 8 12.7348 8 13Z" fill="#475569" />
                                        </svg>
                                    </div>
                                    <p className="font-bold text-[20px] sm:text-[14px] md:text-[20px] lg:text-[20px] xl:text-[20px] text-green-600 font-bricolagegrotesque leading-[32px]">{status === 'Ouvert' ? 'Ouvert' : 'Fermé'}</p>
                                </div>
                            </div>
                        {/* Search Criteria Component */}
                        <div className={`${type === 'Hotel' ? 'flex' : 'hidden'} flex gap-[24px] sm:gap-[14px] md:gap-[24px] lg:gap-[24px] xl:gap-[24px] items-center`}>
                            {/* Date Range */}
                            <div className="flex gap-[6px] items-center">
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 12C2 8.229 2 6.343 3.172 5.172C4.344 4.001 6.229 4 10 4H14C17.771 4 19.657 4 20.828 5.172C21.999 6.344 22 8.229 22 12V14C22 17.771 22 19.657 20.828 20.828C19.656 21.999 17.771 22 14 22H10C6.229 22 4.343 22 3.172 20.828C2.001 19.656 2 17.771 2 14V12Z" stroke="#475569" stroke-width="1.5" />
                                        <path opacity="0.5" d="M7 4V2.5M17 4V2.5M2.5 9H21.5" stroke="#475569" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M18 17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18C16.7348 18 16.4804 17.8946 16.2929 17.7071C16.1054 17.5196 16 17.2652 16 17C16 16.7348 16.1054 16.4804 16.2929 16.2929C16.4804 16.1054 16.7348 16 17 16C17.2652 16 17.5196 16.1054 17.7071 16.2929C17.8946 16.4804 18 16.7348 18 17ZM18 13C18 13.2652 17.8946 13.5196 17.7071 13.7071C17.5196 13.8946 17.2652 14 17 14C16.7348 14 16.4804 13.8946 16.2929 13.7071C16.1054 13.5196 16 13.2652 16 13C16 12.7348 16.1054 12.4804 16.2929 12.2929C16.4804 12.1054 16.7348 12 17 12C17.2652 12 17.5196 12.1054 17.7071 12.2929C17.8946 12.4804 18 12.7348 18 13ZM13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17C11 16.7348 11.1054 16.4804 11.2929 16.2929C11.4804 16.1054 11.7348 16 12 16C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17ZM13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13ZM8 17C8 17.2652 7.89464 17.5196 7.70711 17.7071C7.51957 17.8946 7.26522 18 7 18C6.73478 18 6.48043 17.8946 6.29289 17.7071C6.10536 17.5196 6 17.2652 6 17C6 16.7348 6.10536 16.4804 6.29289 16.2929C6.48043 16.1054 6.73478 16 7 16C7.26522 16 7.51957 16.1054 7.70711 16.2929C7.89464 16.4804 8 16.7348 8 17ZM8 13C8 13.2652 7.89464 13.5196 7.70711 13.7071C7.51957 13.8946 7.26522 14 7 14C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12C7.26522 12 7.51957 12.1054 7.70711 12.2929C7.89464 12.4804 8 12.7348 8 13Z" fill="#475569" />
                                    </svg>
                                </div>
                                <p className="font-bold text-[20px] sm:text-[14px] md:text-[20px] lg:text-[20px] xl:text-[20px] text-slate-600 font-bricolagegrotesque leading-[32px] sm:leading-[24px] md:leading-[32px] lg:leading-[32px] xl:leading-[32px]">
                                    Du 6 au 18 octobre
                                </p>
                            </div>

                            {/* Guest Count */}
                            <div className="flex gap-[6px] items-center">
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z" stroke="#475569" stroke-width="1.5" />
                                        <path opacity="0.5" d="M12 21C15.866 21 19 19.2091 19 17C19 14.7909 15.866 13 12 13C8.13401 13 5 14.7909 5 17C5 19.2091 8.13401 21 12 21Z" stroke="#475569" stroke-width="1.5" />
                                    </svg>
                                </div>
                                <p className="font-bold text-[20px] sm:text-[14px] md:text-[20px] lg:text-[20px] xl:text-[20px] text-slate-600 font-bricolagegrotesque leading-[32px] sm:leading-[24px] md:leading-[32px] lg:leading-[32px] xl:leading-[32px]">
                                    2 Personnes
                                </p>
                            </div>
                        </div>
                    </div>
                    {/*Rating and nbRating */}
                        <div className={`flex flex-row gap-[12px] items-center ${type === 'Health' || type === 'Hotel' ? 'justify-between' : 'justify-start'} w-full mb-[34px]`}>
                            <div className="flex flex-row gap-[12px] items-center">
                        <p className="text-[14px] text-slate-800 font-bold font-bricolagegrotesque">
                            {rating}
                        </p>
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.0742 7.68569L13.5508 10.7607L14.6062 15.3388C14.7204 15.8281 14.5306 16.3382 14.1242 16.6338C13.7179 16.9293 13.1741 16.9529 12.7437 16.6935L8.75078 14.2716L4.76641 16.6935C4.33607 16.9529 3.79227 16.9293 3.38593 16.6338C2.9796 16.3382 2.78972 15.8281 2.90391 15.3388L3.95781 10.7654L0.433594 7.68569C0.052482 7.357 -0.0943371 6.8318 0.0610719 6.35312C0.216481 5.87444 0.643804 5.53565 1.14531 5.49351L5.79063 5.09116L7.60391 0.766162C7.79753 0.302116 8.25108 -8.83341e-05 8.75391 -8.83341e-05C9.25673 -8.83341e-05 9.71028 0.302116 9.90391 0.766162L11.7227 5.09116L16.3664 5.49351C16.8679 5.53565 17.2952 5.87444 17.4506 6.35312C17.6061 6.8318 17.4592 7.357 17.0781 7.68569H17.0742Z" fill="#FACC15" />
                        </svg>
                        <span className='text-[14px] text-slate-800 font-normal font-bricolagegrotesque'>
                            /
                        </span>
                        <div className='flex flex-row gap-2 items-center justify-center bg-slate-800 rounded-[8px] px-[12px] py-[4px]'>
                            <p className="text-[14px] text-slate-200 font-bold font-bricolagegrotesque">
                                {formatNumber(nbRating)} avis
                            </p>
                        </div>
                    </div>
                            {/* Hotel price display */}
                            {type === 'Hotel' && (pricePerNight || totalPrice || minPrice) && (
                                <div className="hidden md:flex flex-row items-center h-[36px]">
                                    <div
                                        className="rounded-l-[12px] h-full flex items-center px-[10px]"
                                        style={{
                                            background: 'linear-gradient(270deg, var(--colors-slate-100, #F1F5F9) 0%, var(--colors-sky-200, #BAE6FD) 45%)'
                                        }}
                                    >
                                        <p className="text-[20px] font-bold font-bricolagegrotesque text-slate-900 leading-[32px] flex items-center h-full">
                                            {totalPrice ? `${formatNumber(totalPrice)} MAD` : `${formatNumber(pricePerNight || minPrice)} MAD`}
                                        </p>
                                    </div>
                                    <div className="rounded-r-[12px] bg-slate-100 h-full flex items-center px-[10px]">
                                        {pricePerNight && totalPrice && (
                                            <p className="text-[14px] font-normal font-vendsans text-slate-600 leading-[20px] flex items-center h-full">
                                                {formatNumber(pricePerNight)} / nuit
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                            {/* Health buttons: Contacter and Localiser */}
                            {type === 'Health' && (
                                <div className="hidden md:flex gap-[6px] items-center">
                                    <button
                                        className="flex gap-[4px] items-center justify-center px-[15px] py-[6px] rounded-[12px] transition-colors"
                                        style={{ background: 'var(--Green-GR, linear-gradient(180deg, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-teal-600, #0D9488) 100%))' }}
                                    >
                                        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.718 3.09227C5.944 1.80127 7.972 2.04227 8.986 3.47627L10.246 5.26027C11.057 6.40727 10.989 8.00027 10.021 9.02027L9.776 9.27727L9.774 9.28327C9.761 9.31927 9.729 9.43527 9.761 9.65527C9.828 10.1103 10.179 11.0363 11.607 12.5393C13.039 14.0473 13.907 14.4023 14.31 14.4683C14.4071 14.4904 14.5081 14.488 14.604 14.4613L15.012 14.0313C15.886 13.1113 17.248 12.9303 18.347 13.5623L20.257 14.6623C21.89 15.6023 22.27 17.9013 20.965 19.2753L19.545 20.7703C19.102 21.2373 18.497 21.6363 17.75 21.7103C15.926 21.8903 11.701 21.6553 7.272 16.9913C3.138 12.6403 2.353 8.85527 2.254 7.00627C2.205 6.09227 2.612 5.30927 3.148 4.74427L4.718 3.09227ZM7.761 4.34227C7.249 3.61827 6.328 3.57427 5.805 4.12527L4.235 5.77727C3.905 6.12727 3.73 6.52727 3.752 6.92627C3.832 8.43627 4.483 11.8783 8.359 15.9583C12.423 20.2383 16.168 20.3583 17.603 20.2173C17.886 20.1893 18.178 20.0313 18.457 19.7373L19.877 18.2423C20.491 17.5963 20.33 16.4343 19.509 15.9623L17.599 14.8623C17.086 14.5673 16.485 14.6583 16.1 15.0643L15.644 15.5443L15.117 15.0433C15.644 15.5433 15.644 15.5443 15.643 15.5453L15.642 15.5463L15.639 15.5503L15.632 15.5563L15.618 15.5703C15.5761 15.6115 15.5305 15.649 15.482 15.6823C15.402 15.7383 15.296 15.8013 15.161 15.8543C14.885 15.9633 14.521 16.0213 14.07 15.9483C13.192 15.8063 12.042 15.1753 10.52 13.5723C8.992 11.9643 8.407 10.7653 8.277 9.87227C8.21 9.41827 8.263 9.05527 8.361 8.78027C8.41552 8.62708 8.49308 8.48309 8.591 8.35327L8.621 8.31627L8.635 8.30127L8.641 8.29427L8.644 8.29127L8.646 8.29027C8.646 8.29027 8.646 8.28827 9.179 8.79327L8.647 8.28827L8.934 7.98627C9.379 7.51727 9.444 6.72327 9.022 6.12627L7.761 4.34227Z" fill="white" />
                                                <path d="M14.0381 1.75195C14.0439 1.75307 14.05 1.75478 14.0557 1.75586C14.0675 1.75812 14.0804 1.76108 14.0938 1.76367C14.1233 1.76939 14.1468 1.77372 14.1582 1.77637V1.77734L14.1689 1.7793C14.2383 1.79383 14.3429 1.82054 14.4873 1.86133V1.86035C14.6936 1.92094 14.9641 2.01218 15.2852 2.14453L15.625 2.29199C16.5723 2.72669 17.8468 3.49325 19.1768 4.82227C20.3403 5.98584 21.0722 7.1079 21.5283 8.00488L21.708 8.375C21.9246 8.84813 22.0578 9.23881 22.1387 9.51562V9.5166C22.1586 9.58532 22.178 9.6542 22.1953 9.72363L22.2422 9.93262L22.2432 9.94141L22.2441 9.94336C22.2555 10.012 22.2392 10.0828 22.1992 10.1396C22.1602 10.1951 22.1014 10.2326 22.0352 10.2461C21.9714 10.2552 21.9069 10.2398 21.8545 10.2021C21.8009 10.1637 21.7649 10.106 21.7539 10.041L21.752 10.0303L21.71 9.83789C21.6942 9.77426 21.6756 9.71111 21.6562 9.64844C21.5748 9.37526 21.4796 9.10641 21.3691 8.84375L21.2529 8.58105C20.8404 7.68247 20.1051 6.45861 18.8223 5.17578C17.5393 3.89294 16.3166 3.15955 15.417 2.74707H15.418C15.0713 2.58612 14.7129 2.45094 14.3467 2.3418L14.3398 2.33984L13.9951 2.25293L13.9824 2.25L13.9688 2.24805L13.9199 2.23438C13.873 2.21662 13.8317 2.18564 13.8018 2.14453C13.7625 2.09053 13.7451 2.02312 13.7539 1.95703C13.7594 1.92564 13.7713 1.89528 13.7881 1.86816C13.8053 1.84038 13.828 1.81599 13.8545 1.79688C13.8811 1.77775 13.9115 1.76435 13.9434 1.75684C13.9744 1.74955 14.0066 1.74718 14.0381 1.75195Z" fill="white" stroke="white" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.486 5.3299C13.513 5.23513 13.5584 5.14661 13.6195 5.06939C13.6807 4.99217 13.7565 4.92776 13.8426 4.87984C13.9287 4.83192 14.0234 4.80143 14.1213 4.79012C14.2191 4.7788 14.3183 4.78688 14.413 4.8139L14.207 5.5349L14.414 4.8149H14.416L14.42 4.8159L14.427 4.8179L14.447 4.8249C14.4623 4.8289 14.4813 4.83523 14.504 4.8439C14.5487 4.85923 14.6077 4.88256 14.681 4.9139C14.826 4.9759 15.025 5.0719 15.27 5.2169C15.76 5.5069 16.427 5.9869 17.212 6.7729C17.997 7.5579 18.479 8.2259 18.768 8.7149C18.913 8.9599 19.009 9.1589 19.072 9.3049C19.1049 9.3813 19.1346 9.45903 19.161 9.5379L19.167 9.5579L19.169 9.5659L19.17 9.5689V9.5709L18.45 9.7779L19.171 9.5719C19.227 9.76285 19.2048 9.96822 19.1093 10.1428C19.0139 10.3174 18.853 10.4469 18.662 10.5029C18.4711 10.5589 18.2657 10.5367 18.0911 10.4412C17.9165 10.3458 17.787 10.1849 17.731 9.9939L17.728 9.9839L17.693 9.8959C17.6292 9.75279 17.5571 9.61355 17.477 9.4789C17.254 9.1029 16.852 8.5329 16.152 7.8329C15.452 7.1329 14.882 6.7309 14.506 6.5079C14.3441 6.41284 14.1757 6.3293 14.002 6.2579L13.992 6.2539C13.8029 6.19731 13.6438 6.06847 13.549 5.89532C13.4543 5.72216 13.4317 5.51964 13.486 5.3299Z" fill="white" />
                                            </svg>
                                        </div>
                                        <p className="text-base font-medium text-white font-bricolagegrotesque leading-[24px] whitespace-nowrap">
                                            Contactez
                                        </p>
                                    </button>
                                    <button
                                        className="flex gap-[4px] items-center justify-center px-[15px] py-[6px] rounded-[12px]"
                                        style={{
                                            background: 'radial-gradient(141.56% 141.56% at 50% -7.74%, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-sky-500, #0EA5E9) 50.96%, var(--colors-fuchsia-500, #D946EF) 100%)'
                                        }}
                                    >
                                        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                                            <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.75 8.893C0.75 4.396 4.332 0.75 8.75 0.75C13.168 0.75 16.75 4.396 16.75 8.893C16.75 13.355 14.197 18.563 10.213 20.424C9.75508 20.6384 9.25563 20.7496 8.75 20.7496C8.24437 20.7496 7.74492 20.6384 7.287 20.424C3.303 18.562 0.75 13.356 0.75 8.894V8.893Z" stroke="white" stroke-width="1.5" />
                                                <path d="M8.75 11.75C10.4069 11.75 11.75 10.4069 11.75 8.75C11.75 7.09315 10.4069 5.75 8.75 5.75C7.09315 5.75 5.75 7.09315 5.75 8.75C5.75 10.4069 7.09315 11.75 8.75 11.75Z" stroke="white" stroke-width="1.5" />
                                            </svg>

                                        </div>
                                        <p className="text-base font-medium text-white font-bricolagegrotesque leading-[24px] whitespace-nowrap">
                                            Localisé
                                        </p>
                                        
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className='w-full mb-[34px]'>
                            {/* Mobile: ItemCard */}
                            <div className='sm:block md:hidden'>
                                <ItemCard
                                    id={id || 0}
                                    type={type}
                                    hotel={type === 'Hotel' ? {
                                        id: id || 0,
                                        title,
                                        nbLit: nbLit || 2,
                                        nbChambre: nbChambre || 1,
                                        nbNuit: nbNuit || 1,
                                        totalPrice: totalPrice || minPrice,
                                        pricePerNight: pricePerNight || minPrice,
                                        rating,
                                        distancce: distance || 0,
                                        images
                                    } : undefined}
                                    service={type === 'Service' ? {
                                        id: id || 0,
                                        title,
                                        genre,
                                        rating,
                                        nbRating,
                                        distance: distance || 0,
                                        minimumPrice: minPrice,
                                        maximumPrice: maximumPrice || minPrice,
                                        status,
                                        menu: menu || [],
                                        images
                                    } : undefined}
                                    experience={type === 'Experience' ? {
                                        id: id || 0,
                                        title,
                                        genre,
                                        rating,
                                        nbRating,
                                        distance: distance || 0,
                                        price: minPrice,
                                        nbPeople: nbPeople || 1,
                                        formules: formules || [],
                                        images
                                    } : undefined}
                                    health={type === 'Health' ? {
                                        id: id || 0,
                                        title,
                                        genre,
                                        jourDebut: jourDebut || '',
                                        jourFin: jourFin || '',
                                        heureDebut: heureDebut || '',
                                        heureFin: heureFin || '',
                                        rating,
                                        nbRating,
                                        distance: distance || 0,
                                        status,
                                        images
                                    } : undefined}
                                    onClick={() => {}}
                                    onImageClick={(index) => {
                                        setSelectedImageIndex(index);
                                        setIsImagePopupOpen(true);
                                    }}
                                />
                            </div>
                            {/* Desktop: ImgDetails - Special layout for Health */}
                            {type === 'Health' ? (
                                <div className='hidden md:flex gap-[40px] items-start justify-start w-full'>
                                    {/* Single image for Health */}
                                    <div className='flex-shrink-0 w-[50%]'>
                                        <img
                                            src={images[0] || '/images/default.png'}
                                            alt={title}
                                            className="w-full h-full rounded-[26px] object-cover cursor-pointer"
                                            onClick={() => {
                                                setSelectedImageIndex(0);
                                                setIsImagePopupOpen(true);
                                            }}
                                        />
                                    </div>
                                    {/* Horaires information next to image */}
                                    {jourDebut && jourFin && heureDebut && heureFin && (
                                        <div className='flex-1 flex flex-col gap-[40px]'>
                                            {/* Address */}
                                            {address && (
                                                <div className='flex flex-col gap-[6px]'>
                                                    <p className="text-[24px] font-bold font-bricolagegrotesque text-slate-800 leading-[36px]">
                                                        Adresse
                                                    </p>
                                                    <div className="flex gap-[12px] items-start">
                                                        <p className="text-[16px] font-normal text-slate-700 font-vendsans leading-[24px]">
                                                            {address}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            <Horaires
                                                jourDebut={jourDebut}
                                                jourFin={jourFin}
                                                heureDebut={heureDebut}
                                                heureFin={heureFin}
                                            />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className='hidden md:block'>
                                    <ImgDetails 
                                        images={images} 
                                        onImageClick={(index) => {
                                            setSelectedImageIndex(index);
                                            setIsImagePopupOpen(true);
                                        }}
                                    />
                    </div>
                            )}
                        </div>
                        <div className="flex flex-col items-start justify-center w-full mb-[34px]">
                            {/* À propos section - hidden for Experience */}
                            {type !== 'Experience' && (
                                <div className="flex flex-col gap-[10px] items-start justify-center w-full mb-[34px]">
                                    <p className="text-[20px] font-bold font-bricolagegrotesque">{apropos}</p>
                                    <p className="text-normal text-slate-700 whitespace-pre-line font-vendsans">{description}</p>
                                </div>
                            )}

                            {type === 'Experience' && formules && formules.length > 0 && (
                                <FormuleComponent formules={formules} />
                            )}

                            {/*type === 'Hotel' && (
                        <div className="flex flex-col gap-[16px] items-start justify-center w-full mb-[40px]">
                            <p className="text-2xl font-bold font-bricolagegrotesque">Ce que cet endroit offre</p>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                            <Tags key={tag.text} text={tag.text} />
                                ))}
                            </div>
                        </div>
                            )*/}

                            {type === 'Service' && menu && menu.length > 0 && (
                                <MenuComponent menu={menu} />
                            )}
                            {/* Health Horaires - only show on mobile (desktop is shown next to image) */}
                            {type === 'Health' && jourDebut && jourFin && heureDebut && heureFin && (
                                <div className='md:hidden'>
                                    <Horaires
                                        jourDebut={jourDebut}
                                        jourFin={jourFin}
                                        heureDebut={heureDebut}
                                        heureFin={heureFin}
                                    />
                                </div>
                            )}

                            {/* Tags section - hidden for Health */}
                            {type !== 'Health' && (
                                <div className="flex flex-col gap-[16px] items-start justify-center w-full mb-[34px]">
                                    <p className="text-[20px] font-bold font-bricolagegrotesque">Nos options</p>
                                    <div className="flex flex-wrap gap-[8px] sm:gap-[16px] md:gap-[8px] lg:gap-[8px] xl:gap-[8px] w-full">
                                        {/* Show limited tags on mobile (4) and desktop (5 initially) */}
                                        {tags.map((tag, index) => {
                                            // On mobile (sm and below), hide tags after index 3 if not showing all
                                            // On desktop (md and above), hide tags after index 4 if not showing all
                                            const isVisible = isMobile 
                                                ? (index < 4 || showAllTags)
                                                : (index < 5 || showAllTags);
                                            return (
                                                <div key={tag.text} className={`${isVisible ? 'block' : 'hidden'}`}>
                                                    <Tags text={tag.text} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/* Mobile: show button if more than 4 tags */}
                                    {tags.length > 4 && (
                                        <button
                                            onClick={() => setShowAllTags(!showAllTags)}
                                            className="bg-slate-200 hover:bg-slate-300 rounded-[13.639px] px-[39px] py-[16px] flex gap-[16px] items-center justify-center transition-colors w-full sm:flex md:hidden"
                                        >
                                            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M29.694 14.1718V16.1964C29.694 22.5589 29.694 25.7402 27.7167 27.7162C25.742 29.6935 22.5594 29.6935 16.1969 29.6935C9.8343 29.6935 6.65302 29.6935 4.67569 27.7162C2.69971 25.7415 2.69971 22.5589 2.69971 16.1964C2.69971 9.83381 2.69971 6.65253 4.67569 4.6752C6.65437 2.69922 9.8343 2.69922 16.1969 2.69922H18.2214" stroke="#334155" stroke-width="2.02457" stroke-linecap="round" />
                                                <path d="M25.6448 10.7975C27.8811 10.7975 29.694 8.98464 29.694 6.74836C29.694 4.51208 27.8811 2.69922 25.6448 2.69922C23.4086 2.69922 21.5957 4.51208 21.5957 6.74836C21.5957 8.98464 23.4086 10.7975 25.6448 10.7975Z" stroke="#334155" stroke-width="2.02457" />
                                                <path d="M9.44824 18.896H21.5957M9.44824 23.62H17.5465" stroke="#334155" stroke-width="2.02457" stroke-linecap="round" />
                                            </svg>
                                            <p className="text-base font-medium text-slate-700 font-bricolagegrotesque leading-[32px]">
                                                {showAllTags ? 'Afficher moins' : 'Afficher tout'}
                                            </p>
                                        </button>
                                    )}
                                    {/* Desktop: show button at the right if more than 5 tags */}
                                    {!isMobile && tags.length > 5 && (
                                        <div className="w-full flex items-start justify-end mt-[16px]">
                                            <button
                                                onClick={() => setShowAllTags(!showAllTags)}
                                                className="bg-slate-200 hover:bg-slate-300 rounded-[12px] px-[29px] py-[12px] flex gap-[12px] items-center justify-center transition-colors"
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.5" d="M22 10.5V12C22 16.714 22 19.071 20.535 20.535C19.072 22 16.714 22 12 22C7.286 22 4.929 22 3.464 20.535C2 19.072 2 16.714 2 12C2 7.286 2 4.929 3.464 3.464C4.93 2 7.286 2 12 2H13.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" stroke="#334155" strokeWidth="1.5" />
                                                    <path d="M7 14H16M7 17.5H13" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                                <p className="font-normal text-[16px] text-slate-700 font-bricolagegrotesque">
                                                    {showAllTags ? 'Afficher moins' : `Afficher les ${tags.length - 5} tags`}
                                                </p>
                                                
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="flex flex-col gap-[16px] items-start justify-center w-full mb-[34px]">
                                <p className='text-[20px] font-bold font-bricolagegrotesque'>Découvrez {avis.length} avis fascinants</p>
                                <div className="grid grid-cols-3 gap-[58px] sm:gap-[52px] md:gap-[58px] lg:gap-[58px] xl:gap-[58px]  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-center w-full">
                                    {/* Show 6 initially */}
                                    {avis.slice(0, showAllAvis ? avis.length : (isMobile ? 4 : 6)).map((avis) => (
                                    <Avis key={avis.name} name={avis.name} userImg={avis.userImg} rating={avis.rating} comment={avis.comment} date={avis.date} like={avis.like} dislike={avis.dislike} />
                                ))}
                                    {/* Mobile: show button if more than 4 comments */}
                                    {isMobile && avis.length > 4 && (
                                        <div className="sm:col-span-1 flex flex-col gap-3 items-center justify-center w-full h-full">
                                        <button
                                            onClick={() => setShowAllAvis(!showAllAvis)}
                                            className="w-full h-[65px] flex flex-col items-center justify-center bg-slate-200 rounded-[12px] group"
                                        >
                                            <div className="flex flex-row w-full gap-[12px] pl-[29px] pr-[22px] items-center justify-center text-center">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                                    <path opacity="0.5" d="M22 10.5V12C22 16.714 22 19.071 20.535 20.535C19.072 22 16.714 22 12 22C7.286 22 4.929 22 3.464 20.535C2 19.072 2 16.714 2 12C2 7.286 2 4.929 3.464 3.464C4.93 2 7.286 2 12 2H13.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" stroke="#334155" strokeWidth="1.5" />
                                                    <path d="M7 14H16M7 17.5H13" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                                <p className="font-normal text-[16px] text-slate-700 font-bricolagegrotesque">
                                                        {showAllAvis ? 'Afficher moins' : `Afficher les ${avis.length - 4} commentaires`}
                                                </p>  
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                                {/* Desktop: show button below grid if more than 6 comments */}
                                {!isMobile && avis.length > 6 && (
                                    <div className="w-full flex items-start justify-end mt-[16px]">
                                        <button
                                            onClick={() => setShowAllAvis(!showAllAvis)}
                                            className="bg-slate-200 hover:bg-slate-300 rounded-[12px] px-[29px] py-[12px] flex gap-[12px] items-center justify-center transition-colors"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.5" d="M22 10.5V12C22 16.714 22 19.071 20.535 20.535C19.072 22 16.714 22 12 22C7.286 22 4.929 22 3.464 20.535C2 19.072 2 16.714 2 12C2 7.286 2 4.929 3.464 3.464C4.93 2 7.286 2 12 2H13.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" stroke="#334155" strokeWidth="1.5" />
                                                <path d="M7 14H16M7 17.5H13" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                            <p className="font-normal text-[16px] text-slate-700 font-bricolagegrotesque">
                                                {showAllAvis ? 'Afficher moins' : `Afficher les ${avis.length - 6} commentaires`}
                                            </p>
                                            
                                        </button>
                                    </div>
                                )}
                        </div>

                            <div className='flex flex-col gap-[16px] items-start justify-center w-full mb-[34px]'>
                                <p className='text-[20px] font-bold font-bricolagegrotesque'>Où vous serez</p>
                                {/* Interactive map */}
                            <div className='flex flex-row gap-2 items-center justify-center w-full h-[480px]'>
                                    <Map
                                        latitude={31.6295}
                                        longitude={-7.9811}
                                        height="480px"
                                        className="w-full"
                                    />
                            </div>
                        </div>

                            {/* Hote section - hidden for Health */}
                            {type !== 'Health' && (
                                <div className='flex flex-col items-start justify-center w-full mb-[34px]'>
                                    <Hote type={type} name={hoteInfo.name} restaurantName={hoteInfo.restaurantName} userImg={hoteInfo.userImg} description={hoteInfo.description} anciennete={hoteInfo.anciennete} />
                                </div>
                            )}

                            <div className='flex flex-col gap-[34px] items-start justify-center w-full'>
                                {/* Hotel details: Show Services, Experiences, and Urgences as hover mode cards */}
                                {type === 'Hotel' && (
                                    <>
                                        {serviceCards.length > 0 && (
                                            <Recommendation
                                                type='Services'
                                                cards={serviceCards}
                                            />
                                        )}
                                        {experienceCards.length > 0 && (
                                            <Recommendation
                                                type='Experiences'
                                                cards={experienceCards}
                                            />
                                        )}
                                        <Recommendation
                                            type='Urgences'
                                cards={[{ title: 'Clinique Nexa Health', description: desc2, image: '/cliniques/cli1.png', hoverImage: '/cliniques/cli2.png' },
                                { title: 'Clinique Akdital', description: desc2, image: '/cliniques/cli2.png', hoverImage: '/cliniques/cli3.png' },
                                { title: 'Pharmacie Hassan', description: desc3, image: '/cliniques/cli3.png', hoverImage: '/cliniques/cli4.png' },
                                { title: 'Para pharmacie', description: desc1, image: '/cliniques/cli4.png', hoverImage: '/cliniques/cli5.png' },
                                { title: 'Pharmacie Nexa Health', description: desc2, image: '/cliniques/cli5.png', hoverImage: '/cliniques/cli6.png' },
                                { title: 'Urgence medicale', description: desc3, image: '/cliniques/cli6.png', hoverImage: '/cliniques/cli1.png' },
                                { title: 'Urgence Nexa Health', description: desc1, image: '/cliniques/cli1.png', hoverImage: '/cliniques/cli2.png' },
                                { title: 'Urgence Quick Care', description: desc2, image: '/cliniques/cli2.png', hoverImage: '/cliniques/cli3.png' }]} 
                                        />
                                    </>
                                )}

                                {/* Service details: Show Services as ItemCard list */}
                                {type === 'Service' && recommendedServices.length > 0 && (
                                    <Recommendation
                                        type='Services'
                                        items={recommendedServices}
                                    />
                                )}

                                {/* Experience details: Show Experiences as ItemCard list */}
                                {type === 'Experience' && recommendedExperiences.length > 0 && (
                                    <Recommendation
                                        type='Experiences'
                                        items={recommendedExperiences}
                                    />
                                )}

                                {/* Health details: Show Health recommendations as ItemCard list */}
                                {type === 'Health' && recommendedHealths.length > 0 && (
                                    <Recommendation
                                        type='Urgences'
                                        items={recommendedHealths}
                                    />
                                )}
                        </div>
                    </div>

                        {/* Mobile Footer */}
                        {/* Hotels and Experiences Layout */}
                        {(type === 'Service' || type === 'Health') && (
                            <div className={`fixed bottom-0 w-full rounded-t-[25px] z-20 sm:flex md:hidden`} style={{
                                // Brighter shadow: lighter color, less purple opacity, a touch more spread
                                boxShadow: '0px 12px 32px -4px #E879F9, 0px 2px 12px 0px #F0ABFC'
                            }}>
                                <div className='w-full bg-white rounded-[25px] p-[12px] flex flex-col gap-[8px] items-center justify-center'>
                                    
                                    {/* Reservation Button */}
                                    <button className='w-full rounded-2xl px-[24px] py-[14px] flex gap-[12px] items-center justify-center shadow-sm' style={{ 
                                        background: 'radial-gradient(262.5% 262.5% at 50% -97.5%, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-sky-500, #0EA5E9) 55%, var(--colors-fuchsia-500, #D946EF) 100%)', 
                                        boxShadow: '0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1)' 
                                    }}>
                                        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                            <path d="M0.75 10.25C0.75 6.479 0.75 4.593 1.922 3.422C3.094 2.251 4.979 2.25 8.75 2.25H12.75C16.521 2.25 18.407 2.25 19.578 3.422C20.749 4.594 20.75 6.479 20.75 10.25V12.25C20.75 16.021 20.75 17.907 19.578 19.078C18.406 20.249 16.521 20.25 12.75 20.25H8.75C4.979 20.25 3.093 20.25 1.922 19.078C0.751 17.906 0.75 16.021 0.75 12.25V10.25Z" stroke="white" strokeWidth="1.5" />
                                            <path d="M5.75 2.25V0.75M15.75 2.25V0.75M1.25 7.25H20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M16.75 15.25C16.75 15.5152 16.6446 15.7696 16.4571 15.9571C16.2696 16.1446 16.0152 16.25 15.75 16.25C15.4848 16.25 15.2304 16.1446 15.0429 15.9571C14.8554 15.7696 14.75 15.5152 14.75 15.25C14.75 14.9848 14.8554 14.7304 15.0429 14.5429C15.2304 14.3554 15.4848 14.25 15.75 14.25C16.0152 14.25 16.2696 14.3554 16.4571 14.5429C16.6446 14.7304 16.75 14.9848 16.75 15.25ZM16.75 11.25C16.75 11.5152 16.6446 11.7696 16.4571 11.9571C16.2696 12.1446 16.0152 12.25 15.75 12.25C15.4848 12.25 15.2304 12.1446 15.0429 11.9571C14.8554 11.7696 14.75 11.5152 14.75 11.25C14.75 10.9848 14.8554 10.7304 15.0429 10.5429C15.2304 10.3554 15.4848 10.25 15.75 10.25C16.0152 10.25 16.2696 10.3554 16.4571 10.5429C16.6446 10.7304 16.75 10.9848 16.75 11.25ZM11.75 15.25C11.75 15.5152 11.6446 15.7696 11.4571 15.9571C11.2696 16.1446 11.0152 16.25 10.75 16.25C10.4848 16.25 10.2304 16.1446 10.0429 15.9571C9.85536 15.7696 9.75 15.5152 9.75 15.25C9.75 14.9848 9.85536 14.7304 10.0429 14.5429C10.2304 14.3554 10.4848 14.25 10.75 14.25C11.0152 14.25 11.2696 14.3554 11.4571 14.5429C11.6446 14.7304 11.75 14.9848 11.75 15.25ZM11.75 11.25C11.75 11.5152 11.6446 11.7696 11.4571 11.9571C11.2696 12.1446 11.0152 12.25 10.75 12.25C10.4848 12.25 10.2304 12.1446 10.0429 11.9571C9.85536 11.7696 9.75 11.5152 9.75 11.25C9.75 10.9848 9.85536 10.7304 10.0429 10.5429C10.2304 10.3554 10.4848 10.25 10.75 10.25C11.0152 10.25 11.2696 10.3554 11.4571 10.5429C11.6446 10.7304 11.75 10.9848 11.75 11.25ZM6.75 15.25C6.75 15.5152 6.64464 15.7696 6.45711 15.9571C6.26957 16.1446 6.01522 16.25 5.75 16.25C5.48478 16.25 5.23043 16.1446 5.04289 15.9571C4.85536 15.7696 4.75 15.5152 4.75 15.25C4.75 14.9848 4.85536 14.7304 5.04289 14.5429C5.23043 14.3554 5.48478 14.25 5.75 14.25C6.01522 14.25 6.26957 14.3554 6.45711 14.5429C6.64464 14.7304 6.75 14.9848 6.75 15.25ZM6.75 11.25C6.75 11.5152 6.64464 11.7696 6.45711 11.9571C6.26957 12.1446 6.01522 12.25 5.75 12.25C5.48478 12.25 5.23043 12.1446 5.04289 11.9571C4.85536 11.7696 4.75 11.5152 4.75 11.25C4.75 10.9848 4.85536 10.7304 5.04289 10.5429C5.23043 10.3554 5.48478 10.25 5.75 10.25C6.01522 10.25 6.26957 10.3554 6.45711 10.5429C6.64464 10.7304 6.75 10.9848 6.75 11.25Z" fill="white" />
                                        </svg>
                                        <p className='text-lg font-semibold text-white font-bricolagegrotesque leading-[28px] whitespace-nowrap'>{reservationButtonText}</p>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Services and Health Layout */}
                        {(type === 'Hotel' || type === 'Experience') && (
                            <div className={`fixed bg-white bottom-0 w-full rounded-t-[25px] z-20 sm:flex flex-row md:hidden gap-[12px] px-[10px] py-[12px]`} style={{
                                // Brighter shadow: lighter color, less purple opacity, a touch more spread
                                boxShadow: '0px 12px 32px -4px #E879F9, 0px 2px 12px 0px #F0ABFC'
                            }}>
                                    {/* Contact Button */}
                                    <button className='w-full rounded-[12px] px-[13px] py-[12px] flex gap-[8px] items-center justify-center ' style={{ 
                                        background: 'radial-gradient(262.5% 262.5% at 50% -97.5%, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-sky-500, #0EA5E9) 55%, var(--colors-fuchsia-500, #D946EF) 100%)',  
                                    }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                            <path d="M14 5.75098C14.0663 5.75098 14.1299 5.7774 14.1768 5.82422L20.1768 11.8242C20.2232 11.871 20.2489 11.9341 20.249 12C20.249 12.0662 20.2226 12.1299 20.1758 12.1768L14.1768 18.1768L14.1699 18.1826L14.1641 18.1895C14.1412 18.214 14.1136 18.2334 14.083 18.2471C14.0523 18.2607 14.0189 18.268 13.9854 18.2686C13.9519 18.2691 13.9187 18.2635 13.8877 18.251C13.8567 18.2385 13.8284 18.2199 13.8047 18.1963C13.7809 18.1725 13.7616 18.1434 13.749 18.1123C13.7366 18.0813 13.7309 18.048 13.7314 18.0146C13.732 17.9811 13.7393 17.9477 13.7529 17.917C13.7666 17.8865 13.7861 17.8588 13.8105 17.8359L13.8174 17.8301L19.3975 12.25H4C3.9337 12.25 3.87013 12.2236 3.82324 12.1768C3.77646 12.1299 3.75 12.0662 3.75 12C3.75008 11.9338 3.77643 11.8701 3.82324 11.8232C3.87011 11.7765 3.93377 11.75 4 11.75H19.3975L18.5439 10.8965L13.8242 6.17676C13.7774 6.12988 13.751 6.06625 13.751 6C13.7511 5.93412 13.7768 5.87097 13.8232 5.82422C13.8701 5.7774 13.9337 5.75098 14 5.75098Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className='text-lg font-semibold text-white font-bricolagegrotesque leading-[28px] whitespace-nowrap'>{contactButtonText}</p>
                                    </button>
                                    {/* Reservation Button */}
                                    <button className='w-full bg-slate-900 rounded-[12px] px-[13px] py-[12px] flex gap-[12px] items-center justify-center'>
                                        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                            <path d="M0.75 10.25C0.75 6.479 0.75 4.593 1.922 3.422C3.094 2.251 4.979 2.25 8.75 2.25H12.75C16.521 2.25 18.407 2.25 19.578 3.422C20.749 4.594 20.75 6.479 20.75 10.25V12.25C20.75 16.021 20.75 17.907 19.578 19.078C18.406 20.249 16.521 20.25 12.75 20.25H8.75C4.979 20.25 3.093 20.25 1.922 19.078C0.751 17.906 0.75 16.021 0.75 12.25V10.25Z" stroke="white" strokeWidth="1.5" />
                                            <path d="M5.75 2.25V0.75M15.75 2.25V0.75M1.25 7.25H20.25" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                            <path d="M16.75 15.25C16.75 15.5152 16.6446 15.7696 16.4571 15.9571C16.2696 16.1446 16.0152 16.25 15.75 16.25C15.4848 16.25 15.2304 16.1446 15.0429 15.9571C14.8554 15.7696 14.75 15.5152 14.75 15.25C14.75 14.9848 14.8554 14.7304 15.0429 14.5429C15.2304 14.3554 15.4848 14.25 15.75 14.25C16.0152 14.25 16.2696 14.3554 16.4571 14.5429C16.6446 14.7304 16.75 14.9848 16.75 15.25ZM16.75 11.25C16.75 11.5152 16.6446 11.7696 16.4571 11.9571C16.2696 12.1446 16.0152 12.25 15.75 12.25C15.4848 12.25 15.2304 12.1446 15.0429 11.9571C14.8554 11.7696 14.75 11.5152 14.75 11.25C14.75 10.9848 14.8554 10.7304 15.0429 10.5429C15.2304 10.3554 15.4848 10.25 15.75 10.25C16.0152 10.25 16.2696 10.3554 16.4571 10.5429C16.6446 10.7304 16.75 10.9848 16.75 11.25ZM11.75 15.25C11.75 15.5152 11.6446 15.7696 11.4571 15.9571C11.2696 16.1446 11.0152 16.25 10.75 16.25C10.4848 16.25 10.2304 16.1446 10.0429 15.9571C9.85536 15.7696 9.75 15.5152 9.75 15.25C9.75 14.9848 9.85536 14.7304 10.0429 14.5429C10.2304 14.3554 10.4848 14.25 10.75 14.25C11.0152 14.25 11.2696 14.3554 11.4571 14.5429C11.6446 14.7304 11.75 14.9848 11.75 15.25ZM11.75 11.25C11.75 11.5152 11.6446 11.7696 11.4571 11.9571C11.2696 12.1446 11.0152 12.25 10.75 12.25C10.4848 12.25 10.2304 12.1446 10.0429 11.9571C9.85536 11.7696 9.75 11.5152 9.75 11.25C9.75 10.9848 9.85536 10.7304 10.0429 10.5429C10.2304 10.3554 10.4848 10.25 10.75 10.25C11.0152 10.25 11.2696 10.3554 11.4571 10.5429C11.6446 10.7304 11.75 10.9848 11.75 11.25ZM6.75 15.25C6.75 15.5152 6.64464 15.7696 6.45711 15.9571C6.26957 16.1446 6.01522 16.25 5.75 16.25C5.48478 16.25 5.23043 16.1446 5.04289 15.9571C4.85536 15.7696 4.75 15.5152 4.75 15.25C4.75 14.9848 4.85536 14.7304 5.04289 14.5429C5.23043 14.3554 5.48478 14.25 5.75 14.25C6.01522 14.25 6.26957 14.3554 6.45711 14.5429C6.64464 14.7304 6.75 14.9848 6.75 15.25ZM6.75 11.25C6.75 11.5152 6.64464 11.7696 6.45711 11.9571C6.26957 12.1446 6.01522 12.25 5.75 12.25C5.48478 12.25 5.23043 12.1446 5.04289 11.9571C4.85536 11.7696 4.75 11.5152 4.75 11.25C4.75 10.9848 4.85536 10.7304 5.04289 10.5429C5.23043 10.3554 5.48478 10.25 5.75 10.25C6.01522 10.25 6.26957 10.3554 6.45711 10.5429C6.64464 10.7304 6.75 10.9848 6.75 11.25Z" fill="white" />
                                        </svg>
                                        <p className='text-lg font-semibold text-white font-bricolagegrotesque leading-[28px] whitespace-nowrap'>Réservez</p>
                                    </button>
                            </div>
                        )}

                        {/* Desktop Footer */}
                        <div className={`fixed bottom-0 left-0 sm:left-0 ${isSidebarCollapsed ? 'md:left-[calc(2%+80px+2px)] lg:left-[calc(2%+80px+2px)] xl:left-[calc(2%+80px+2px)]' : 'md:left-[calc(2%+22%+1px)] lg:left-[calc(2%+22%+1px)] xl:left-[calc(2%+22%+1px)]'} right-0 flex flex-row gap-[12px] items-center justify-center sm:justify-center md:justify-start lg:justify-start xl:justify-start w-full px-4 sm:px-4 md:px-5 lg:px-5 xl:px-5 py-3 sm:py-3 md:py-4 lg:py-4 xl:py-4 bg-white z-20 transition-all duration-300 ease-in-out sm:hidden md:flex`}>
                        <div className='flex flex-row gap-[12px] md:ml-2 lg:ml-[80px] xl:ml-[80px]'>
                                <button className='h-[40px] sm:h-[38px] md:h-[38px] lg:h-[38px] xl:h-[38px] rounded-[12px] px-[16px] flex gap-[12px] items-center justify-center whitespace-nowrap min-w-[150px] sm:min-w-[150px] md:min-w-[150px] lg:min-w-[171px] xl:min-w-[171px]' style={{ background: 'radial-gradient(262.5% 262.5% at 50% -97.5%, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-sky-500, #0EA5E9) 55%, var(--colors-fuchsia-500, #D946EF) 100%)', boxShadow: '0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1)' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 5.75098C14.0663 5.75098 14.1299 5.7774 14.1768 5.82422L20.1768 11.8242C20.2232 11.871 20.2489 11.9341 20.249 12C20.249 12.0662 20.2226 12.1299 20.1758 12.1768L14.1768 18.1768L14.1699 18.1826L14.1641 18.1895C14.1412 18.214 14.1136 18.2334 14.083 18.2471C14.0523 18.2607 14.0189 18.268 13.9854 18.2686C13.9519 18.2691 13.9187 18.2635 13.8877 18.251C13.8567 18.2385 13.8284 18.2199 13.8047 18.1963C13.7809 18.1725 13.7616 18.1434 13.749 18.1123C13.7366 18.0813 13.7309 18.048 13.7314 18.0146C13.732 17.9811 13.7393 17.9477 13.7529 17.917C13.7666 17.8865 13.7861 17.8588 13.8105 17.8359L13.8174 17.8301L19.3975 12.25H4C3.9337 12.25 3.87013 12.2236 3.82324 12.1768C3.77646 12.1299 3.75 12.0662 3.75 12C3.75008 11.9338 3.77643 11.8701 3.82324 11.8232C3.87011 11.7765 3.93377 11.75 4 11.75H19.3975L18.5439 10.8965L13.8242 6.17676C13.7774 6.12988 13.751 6.06625 13.751 6C13.7511 5.93412 13.7768 5.87097 13.8232 5.82422C13.8701 5.7774 13.9337 5.75098 14 5.75098Z" stroke="white" />
                                    </svg>

                                    <p className='text-sm text-white font-normal text-center font-bricolagegrotesque whitespace-nowrap'>{contactButtonText}</p>
                                </button>
                                <button className='w-full sm:w-[150px] md:w-[150px] lg:w-[171px] xl:w-[171px] h-[40px] sm:h-[38px] md:h-[38px] lg:h-[38px] xl:h-[38px] bg-slate-900 rounded-[12px] px-[16px] flex gap-[12px] items-center justify-center' 
                                style={{ boxShadow: '0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1)' }}>
                                    <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.75 10.25C0.75 6.479 0.75 4.593 1.922 3.422C3.094 2.251 4.979 2.25 8.75 2.25H12.75C16.521 2.25 18.407 2.25 19.578 3.422C20.749 4.594 20.75 6.479 20.75 10.25V12.25C20.75 16.021 20.75 17.907 19.578 19.078C18.406 20.249 16.521 20.25 12.75 20.25H8.75C4.979 20.25 3.093 20.25 1.922 19.078C0.751 17.906 0.75 16.021 0.75 12.25V10.25Z" stroke="white" stroke-width="1.5" />
                                        <path d="M5.75 2.25V0.75M15.75 2.25V0.75M1.25 7.25H20.25" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M16.75 15.25C16.75 15.5152 16.6446 15.7696 16.4571 15.9571C16.2696 16.1446 16.0152 16.25 15.75 16.25C15.4848 16.25 15.2304 16.1446 15.0429 15.9571C14.8554 15.7696 14.75 15.5152 14.75 15.25C14.75 14.9848 14.8554 14.7304 15.0429 14.5429C15.2304 14.3554 15.4848 14.25 15.75 14.25C16.0152 14.25 16.2696 14.3554 16.4571 14.5429C16.6446 14.7304 16.75 14.9848 16.75 15.25ZM16.75 11.25C16.75 11.5152 16.6446 11.7696 16.4571 11.9571C16.2696 12.1446 16.0152 12.25 15.75 12.25C15.4848 12.25 15.2304 12.1446 15.0429 11.9571C14.8554 11.7696 14.75 11.5152 14.75 11.25C14.75 10.9848 14.8554 10.7304 15.0429 10.5429C15.2304 10.3554 15.4848 10.25 15.75 10.25C16.0152 10.25 16.2696 10.3554 16.4571 10.5429C16.6446 10.7304 16.75 10.9848 16.75 11.25ZM11.75 15.25C11.75 15.5152 11.6446 15.7696 11.4571 15.9571C11.2696 16.1446 11.0152 16.25 10.75 16.25C10.4848 16.25 10.2304 16.1446 10.0429 15.9571C9.85536 15.7696 9.75 15.5152 9.75 15.25C9.75 14.9848 9.85536 14.7304 10.0429 14.5429C10.2304 14.3554 10.4848 14.25 10.75 14.25C11.0152 14.25 11.2696 14.3554 11.4571 14.5429C11.6446 14.7304 11.75 14.9848 11.75 15.25ZM11.75 11.25C11.75 11.5152 11.6446 11.7696 11.4571 11.9571C11.2696 12.1446 11.0152 12.25 10.75 12.25C10.4848 12.25 10.2304 12.1446 10.0429 11.9571C9.85536 11.7696 9.75 11.5152 9.75 11.25C9.75 10.9848 9.85536 10.7304 10.0429 10.5429C10.2304 10.3554 10.4848 10.25 10.75 10.25C11.0152 10.25 11.2696 10.3554 11.4571 10.5429C11.6446 10.7304 11.75 10.9848 11.75 11.25ZM6.75 15.25C6.75 15.5152 6.64464 15.7696 6.45711 15.9571C6.26957 16.1446 6.01522 16.25 5.75 16.25C5.48478 16.25 5.23043 16.1446 5.04289 15.9571C4.85536 15.7696 4.75 15.5152 4.75 15.25C4.75 14.9848 4.85536 14.7304 5.04289 14.5429C5.23043 14.3554 5.48478 14.25 5.75 14.25C6.01522 14.25 6.26957 14.3554 6.45711 14.5429C6.64464 14.7304 6.75 14.9848 6.75 15.25ZM6.75 11.25C6.75 11.5152 6.64464 11.7696 6.45711 11.9571C6.26957 12.1446 6.01522 12.25 5.75 12.25C5.48478 12.25 5.23043 12.1446 5.04289 11.9571C4.85536 11.7696 4.75 11.5152 4.75 11.25C4.75 10.9848 4.85536 10.7304 5.04289 10.5429C5.23043 10.3554 5.48478 10.25 5.75 10.25C6.01522 10.25 6.26957 10.3554 6.45711 10.5429C6.64464 10.7304 6.75 10.9848 6.75 11.25Z" fill="white" />
                                    </svg>

                                    <p className='text-sm text-white font-normal text-center font-bricolagegrotesque'>Resérvez</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

            {/* Image Popup */}
            <ImagePopup
                images={images}
                initialIndex={selectedImageIndex}
                isOpen={isImagePopupOpen}
                onClose={() => setIsImagePopupOpen(false)}
            />
        </>
    )
}

export default Details