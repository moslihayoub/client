import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Zone from '../../svgs/icons/Zone';
import ItemCard from '../HoltelCard';

interface RecommendationProps {
    title: string;
    description: string;
    image: string;
    hoverImage?: string;
}

interface ServiceItem {
    id: number;
    title: string;
    genre: string[];
    rating: number;
    nbRating: number;
    distance: number;
    minimumPrice: number;
    maximumPrice: number;
    status: 'Ouvert' | 'Fermé';
    menu: any[];
    images: string[];
}

interface ExperienceItem {
    id: number;
    title: string;
    genre: string[];
    rating: number;
    nbRating: number;
    distance: number;
    price: number;
    nbPeople: number;
    formules: any[];
    images: string[];
}

interface Inputprops {
    type: 'Hotels' | 'Services' | 'Experiences' | 'Urgences';
    cards?: RecommendationProps[];
    items?: (ServiceItem | ExperienceItem)[];
}
//Search bar slide up on move to page details
function Recommendation({ type, cards, items }: Inputprops) {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Helper function to get tab name for navigation
    const getTabName = (recommendationType: string): string => {
        switch (recommendationType) {
            case 'Services':
                return 'service';
            case 'Experiences':
                return 'experience';
            case 'Urgences':
                return 'health';
            case 'Hotels':
                return 'logement';
            default:
                return 'logement';
        }
    };

    // Handle navigation to listing with tab selection
    const handleViewAll = () => {
        const tabName = getTabName(type);
        localStorage.setItem('selectedListingTab', tabName);
        navigate('/hotels');
    };

    // Convert items to cards format for mobile
    const convertItemsToCards = (itemsList: (ServiceItem | ExperienceItem)[]): RecommendationProps[] => {
        return itemsList.map((item) => ({
            title: item.title,
            description: (item as any).hoteInfo?.description || `Découvrez ${item.title}`,
            image: item.images?.[0] || '/services/service-prop1.png',
            hoverImage: item.images?.[1] || item.images?.[0] || '/services/service-prop1.png'
        }));
    };

    // Determine if we should use cards format
    const shouldUseCards = isMobile || (cards && cards.length > 0);
    const displayCards = isMobile && items && items.length > 0 
        ? convertItemsToCards(items) 
        : (cards || []);

    return (
        <>
            {(type === 'Services' || type === 'Experiences') ? (
                // On mobile: always use hover mode cards
                // On desktop: use cards if provided (Hotel details), otherwise use items (Service/Experience details)
                shouldUseCards && displayCards.length > 0 ? (
                    <>
                        <div className='flex flex-col items-start justify-center w-full mb-5'>
                            <div className='flex flex-row gap-2 items-center justify-between w-full mb-[12px] flex-shrink-0'>
                                <p className='text-[24px] sm:text-[20px] md:text-[16px] lg:text-[24px] xl:text-[24px] font-bold font-bricolagegrotesque'>{type} {isMobile ? '' : 'au allentours'}</p>
                                <button className='text-[16px] w-[171px] h-[36px] bg-cyan-500 hover:bg-slate-800 transition-all duration-300 ease-in-out text-white pl-[15px] pr-[8px] py-[6px] rounded-[12px] flex flex-row items-center justify-center gap-[12px] flex-shrink-0 sm:hidden md:flex'>
                                    <p className='text-[16px] font-medium font-bricolagegrotesque w-full'>Affiche la zone</p>
                                    <div className='w-6 h-6 flex items-center justify-center'>
                                        <Zone />
                                    </div>
                                </button>
                            </div>
                            <div className='flex flex-row pl-[10px] items-stretch justify-start gap-2 overflow-x-auto overflow-y-visible scrollbar-hide w-full py-2 pb-8' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {displayCards.map((card, index) => (
                                    <RecommendationCard key={`${card.title}-${index}`} card={card} />
                                ))}
                            </div>
                            {/* Mobile: Show "Affichez tout" button */}
                            {isMobile && (
                                <button 
                                    onClick={handleViewAll}
                                    className='w-full bg-slate-200 rounded-[13.639px] px-[39px] py-[16px] flex gap-[16px] items-center justify-center transition-colors hover:bg-slate-300'
                                >
                                    <p className='text-base font-medium text-slate-700 font-bricolagegrotesque leading-[32px]'>
                                        Affichez tout
                                    </p>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 10.5V12C22 16.714 22 19.071 20.535 20.535C19.072 22 16.714 22 12 22C7.286 22 4.929 22 3.464 20.535C2 19.072 2 16.714 2 12C2 7.286 2 4.929 3.464 3.464C4.93 2 7.286 2 12 2H13.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
                                        <path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" stroke="#334155" strokeWidth="1.5" />
                                        <path d="M7 14H16M7 17.5H13" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className='w-full mt-[20px]'>
                        <div className='flex flex-col items-start justify-center w-full mb-5'>
                            <div className='flex flex-row gap-2 items-center justify-between w-full mb-[16px] flex-shrink-0'>
                                <p className='text-[24px] sm:text-[20px] md:text-[16px] lg:text-[24px] xl:text-[24px] font-bold font-bricolagegrotesque'>{type} au allentours</p>
                                <button className='text-[16px] w-[171px] h-[36px] bg-cyan-500 hover:bg-slate-800 transition-all duration-300 ease-in-out text-white pl-[15px] pr-[8px] py-[6px] rounded-[12px] flex flex-row items-center justify-center gap-[12px] flex-shrink-0'>
                                    <p className='text-[16px] font-medium font-bricolagegrotesque w-full'>Affiche la zone</p>
                                    <div className='w-6 h-6 flex items-center justify-center'>
                                        <Zone />
                                    </div>
                                </button>
                            </div>
                            <div className='w-full overflow-x-auto scrollbar-hide' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                <div className='flex flex-row gap-[28px] items-start'>
                                    {items && items.length > 0 ? (
                                        items.map((item) => (
                                            <div key={item.id} className='flex-shrink-0 w-[280px]'>
                                                <ItemCard
                                                    id={item.id}
                                                    type={type === 'Services' ? 'Service' : 'Experience'}
                                                    onClick={() => {
                                                        if (type === 'Services') {
                                                            navigate(`/details/${item.id}`, { state: { service: item } });
                                                        } else {
                                                            navigate(`/details/${item.id}`, { state: { experience: item } });
                                                        }
                                                    }}
                                                    service={type === 'Services' ? {
                                                        id: item.id,
                                                        title: item.title,
                                                        genre: (item as ServiceItem).genre,
                                                        rating: item.rating,
                                                        nbRating: item.nbRating || 10,
                                                        distance: item.distance,
                                                        minimumPrice: (item as ServiceItem).minimumPrice,
                                                        maximumPrice: (item as ServiceItem).maximumPrice,
                                                        status: (item as ServiceItem).status,
                                                        menu: (item as ServiceItem).menu || [],
                                                        images: item.images
                                                    } : undefined}
                                                    experience={type === 'Experiences' ? {
                                                        id: item.id,
                                                        title: item.title,
                                                        genre: (item as ExperienceItem).genre,
                                                        rating: item.rating,
                                                        nbRating: item.nbRating || 10,
                                                        distance: item.distance,
                                                        price: (item as ExperienceItem).price,
                                                        nbPeople: (item as ExperienceItem).nbPeople,
                                                        formules: (item as ExperienceItem).formules || [],
                                                        images: item.images
                                                    } : undefined}
                                                />
                                            </div>
                                        ))
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <>
                    <div className='flex flex-col items-start justify-center w-full mb-5'>
                        <div className='flex flex-row gap-2 items-center justify-between w-full mb-[16px] flex-shrink-0'>
                            {type === 'Hotels' && (
                                <p className='text-[24px] sm:text-[20px] md:text-[16px] lg:text-[24px] xl:text-[24px] text-slate-700 font-bold font-bricolagegrotesque'>Nexa Health</p>
                            )}
                            {type !== 'Hotels' && (
                                <p className='text-[24px] sm:text-[20px] md:text-[16px] lg:text-[24px] xl:text-[24px] font-bold font-bricolagegrotesque'>{type} au allentours</p>
                            )}
                            <button className='text-[16px] w-[171px] h-[36px] bg-cyan-500 hover:bg-slate-800 transition-all duration-300 ease-in-out text-white pl-[15px] pr-[8px] py-[6px] rounded-[12px] flex flex-row items-center justify-center gap-[12px] flex-shrink-0 sm:hidden md:flex'>
                                <p className='text-[16px] font-medium font-bricolagegrotesque w-full'>Affiche la zone</p>
                                <div className='w-6 h-6 flex items-center justify-center'>
                                    <Zone />
                                </div>
                            </button>
                        </div>
                        <div className='flex flex-row pl-[10px] items-stretch justify-start gap-2 overflow-x-auto overflow-y-visible scrollbar-hide w-full py-2 pb-8' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            {cards && cards.map((card, index) => (
                                <RecommendationCard key={`${card.title}-${index}`} card={card} />
                            ))}
                        </div>
                        {/* Mobile: Show "Affichez tout" button */}
                        {isMobile && cards && cards.length > 0 && (
                            <button 
                                onClick={handleViewAll}
                                className='w-full bg-slate-200 rounded-[13.639px] px-[39px] py-[16px] flex gap-[16px] items-center justify-center transition-colors hover:bg-slate-300'
                            >
                                <p className='text-base font-medium text-slate-700 font-bricolagegrotesque leading-[32px]'>
                                    Affichez tout
                                </p>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 10.5V12C22 16.714 22 19.071 20.535 20.535C19.072 22 16.714 22 12 22C7.286 22 4.929 22 3.464 20.535C2 19.072 2 16.714 2 12C2 7.286 2 4.929 3.464 3.464C4.93 2 7.286 2 12 2H13.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" stroke="#334155" strokeWidth="1.5" />
                                    <path d="M7 14H16M7 17.5H13" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

function RecommendationCard({ card }: { card: RecommendationProps }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div
            className={`flex flex-col gap-2 flex-shrink-0 ${isMobile ? 'w-[220px]' : 'w-[240px]'} py-2 group cursor-pointer transition-transform duration-500 ease-in-out`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
        >
            {/* Outer wrapper for gradient border */}
            <div
                className='relative rounded-[38px] transition-opacity duration-500 ease-in-out'
                style={{
                    background: isHovered
                        ? 'radial-gradient(141.56% 141.56% at 50% -7.74%, #2DD4BF 0%, #0EA5E9 50.96%, #D946EF 100%)'
                        : 'transparent',
                    padding: isHovered ? '1px' : '0px',
                    boxShadow: isHovered ? '0 14px 11px var(--shadow-none-spread, 0) rgba(217, 70, 239, 0.18)' : 'none',
                }}
            >
                {/* Card container */}
                <div className='relative bg-white rounded-[38px] p-[23px] flex flex-col gap-[14px]'>
                    {/* Image container */}
                    <div className='relative w-full h-[134px] rounded-[24px] overflow-hidden'>
                        {/* Default image */}
                        <img
                            src={card.image}
                            alt={card.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isHovered && card.hoverImage ? 'opacity-0' : 'opacity-100'
                                }`}
                        />
                        {/* Hover image - only render if hoverImage exists */}
                        {card.hoverImage && (
                            <img
                                src={card.hoverImage}
                                alt={`${card.title} hover`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'
                                    }`}
                                style={{ zIndex: 10 }}
                            />
                        )}
                    </div>

                    {/* Text content */}
                    <div className='flex flex-col gap-[6px] items-start'>
                        <p className='text-[20px] font-bold font-bricolagegrotesque leading-[32px] text-slate-800'>{card.title}</p>
                        <p className='text-[16px] leading-[24px] text-slate-700 font-vendsans'>{card.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recommendation