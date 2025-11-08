import React, { useState } from 'react'
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

interface DetailsProps {
    title: string;
    type: 'hotel' | 'experience' | 'service';
    minPrice: number;
    status: 'Ouvert' | 'Fermé';
    description: string;
    tags: TagProps[];
    rating: number;
    nbRating: number;
    avis: AvisProps[];
    hoteInfo: HoteInfoProps;
    images: string[];
}

function Details({ title, type, minPrice, status, description, tags, rating, nbRating, avis, hoteInfo, images }: DetailsProps) {
    const { isCollapsed: isSidebarCollapsed } = useSideListing();
    const [showAllAvis, setShowAllAvis] = useState(false);
    const desc1 = "Un restaurant convivial offrant une vue imprenable sur la place des Saveurs."
    const desc2 = "Un restaurant chaleureux avec une vue magnifique sur la place des Saveurs."
    const desc3 = "Un restaurant convivial offrant une vue imprenable sur la place des Saveurs."

    const formatNumber = (num: number): string => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar at the top */}
            <Navbar logoColor="normal" background="white" iconVariant="transparent" profileImg="/images/boy.png" />

            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
                {/* SideListing - Dynamic width */}
                <div className={`flex-shrink-0 sm:hidden md:block lg:block xl:block  ml-[2%] transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-[80px]' : 'w-[22%]'
                    }`}>
                    <SideListing />
                </div>

                {/* Content area */}
                <div className="flex-1 overflow-y-auto scrollbar-hide ">
                    <div className={`flex flex-col items-center justify-center pl-8 pr-5 pb-24 mt-[8%] sm:mt-[15%] md:mt-[8%] lg:mt-[8%] xl:mt-[8%] ${isSidebarCollapsed ? 'sm:w-full md:w-full lg:w-[87%] xl:w-[87%]' : 'sm:w-full md:w-full lg:w-[82%] xl:w-[82%]'} ml-[68px] sm:ml-0 md:ml-0 lg:ml-[68px] xl:ml-[68px] ${isSidebarCollapsed ? 'sm:w-full md:w-full lg:w-[87%] xl:w-[87%]' : 'sm:w-full md:w-full lg:w-[82%] xl:w-[82%]'}`}>
                        {/* Breadcrumb */}
                        <div className="flex flex-row gap-2 items-center justify-start w-full mb-[24px]">
                            <span className="text-[16px] font-outfit">
                                <Link to="/hotels" className="text-sky-500 underline font-outfit">
                                    Accueil
                                </Link>
                            </span>
                            <span className="text-gray-500 font-outfit">/</span>
                            <span className="text-[16px] text-gray-500 font-outfit">{title}</span>
                        </div>

                        {/* Header */}
                        <div className="text-left items-start justify-center w-full mb-[24px]">
                            <h1 className="text-[36px] sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-slate-800 leading-[48px] font-outfit">
                                {title}
                            </h1>
                            {/*Service*/}
                            <div className={`${type === 'service' || type === 'experience' ? 'flex' : 'hidden'} flex gap-[24px] items-center`}>
                                <div className="flex gap-[6px] items-center">
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.5" d="M3 10C3 6.229 3 4.343 4.172 3.172C5.344 2.001 7.229 2 11 2H13C16.771 2 18.657 2 19.828 3.172C20.999 4.344 21 6.229 21 10V14C21 17.771 21 19.657 19.828 20.828C18.656 21.999 16.771 22 13 22H11C7.229 22 5.343 22 4.172 20.828C3.001 19.656 3 17.771 3 14V10Z" stroke="#020617" stroke-width="1.5" />
                                            <path d="M12 6V8M12 8V10M12 8H10M12 8H14M8 14H16M9 18H15" stroke="#020617" stroke-width="1.5" stroke-linecap="round" />
                                        </svg>
                                    </div>
                                    <p className="font-bold text-[20px] text-slate-600 font-outfit leading-[32px]">A partir de {formatNumber(minPrice)} MAD</p>
                                </div>
                                <div className="flex gap-[6px] items-center">
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 12C2 8.229 2 6.343 3.172 5.172C4.344 4.001 6.229 4 10 4H14C17.771 4 19.657 4 20.828 5.172C21.999 6.344 22 8.229 22 12V14C22 17.771 22 19.657 20.828 20.828C19.656 21.999 17.771 22 14 22H10C6.229 22 4.343 22 3.172 20.828C2.001 19.656 2 17.771 2 14V12Z" stroke="#475569" stroke-width="1.5" />
                                            <path opacity="0.5" d="M7 4V2.5M17 4V2.5M2.5 9H21.5" stroke="#475569" stroke-width="1.5" stroke-linecap="round" />
                                            <path d="M18 17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18C16.7348 18 16.4804 17.8946 16.2929 17.7071C16.1054 17.5196 16 17.2652 16 17C16 16.7348 16.1054 16.4804 16.2929 16.2929C16.4804 16.1054 16.7348 16 17 16C17.2652 16 17.5196 16.1054 17.7071 16.2929C17.8946 16.4804 18 16.7348 18 17ZM18 13C18 13.2652 17.8946 13.5196 17.7071 13.7071C17.5196 13.8946 17.2652 14 17 14C16.7348 14 16.4804 13.8946 16.2929 13.7071C16.1054 13.5196 16 13.2652 16 13C16 12.7348 16.1054 12.4804 16.2929 12.2929C16.4804 12.1054 16.7348 12 17 12C17.2652 12 17.5196 12.1054 17.7071 12.2929C17.8946 12.4804 18 12.7348 18 13ZM13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17C11 16.7348 11.1054 16.4804 11.2929 16.2929C11.4804 16.1054 11.7348 16 12 16C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17ZM13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13ZM8 17C8 17.2652 7.89464 17.5196 7.70711 17.7071C7.51957 17.8946 7.26522 18 7 18C6.73478 18 6.48043 17.8946 6.29289 17.7071C6.10536 17.5196 6 17.2652 6 17C6 16.7348 6.10536 16.4804 6.29289 16.2929C6.48043 16.1054 6.73478 16 7 16C7.26522 16 7.51957 16.1054 7.70711 16.2929C7.89464 16.4804 8 16.7348 8 17ZM8 13C8 13.2652 7.89464 13.5196 7.70711 13.7071C7.51957 13.8946 7.26522 14 7 14C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12C7.26522 12 7.51957 12.1054 7.70711 12.2929C7.89464 12.4804 8 12.7348 8 13Z" fill="#475569" />
                                        </svg>
                                    </div>
                                    <p className="font-bold text-[20px] text-green-600 font-outfit leading-[32px]">{status === 'Ouvert' ? 'Ouvert' : 'Fermé'}</p>
                                </div>
                            </div>
                        {/* Search Criteria Component */}
                        <div className={`${type === 'hotel' ? 'flex' : 'hidden'} flex gap-[24px] items-center`}>
                            {/* Date Range */}
                            <div className="flex gap-[6px] items-center">
                                <div className="w-6 h-6 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 12C2 8.229 2 6.343 3.172 5.172C4.344 4.001 6.229 4 10 4H14C17.771 4 19.657 4 20.828 5.172C21.999 6.344 22 8.229 22 12V14C22 17.771 22 19.657 20.828 20.828C19.656 21.999 17.771 22 14 22H10C6.229 22 4.343 22 3.172 20.828C2.001 19.656 2 17.771 2 14V12Z" stroke="#475569" stroke-width="1.5" />
                                        <path opacity="0.5" d="M7 4V2.5M17 4V2.5M2.5 9H21.5" stroke="#475569" stroke-width="1.5" stroke-linecap="round" />
                                        <path d="M18 17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8946 17.2652 18 17 18C16.7348 18 16.4804 17.8946 16.2929 17.7071C16.1054 17.5196 16 17.2652 16 17C16 16.7348 16.1054 16.4804 16.2929 16.2929C16.4804 16.1054 16.7348 16 17 16C17.2652 16 17.5196 16.1054 17.7071 16.2929C17.8946 16.4804 18 16.7348 18 17ZM18 13C18 13.2652 17.8946 13.5196 17.7071 13.7071C17.5196 13.8946 17.2652 14 17 14C16.7348 14 16.4804 13.8946 16.2929 13.7071C16.1054 13.5196 16 13.2652 16 13C16 12.7348 16.1054 12.4804 16.2929 12.2929C16.4804 12.1054 16.7348 12 17 12C17.2652 12 17.5196 12.1054 17.7071 12.2929C17.8946 12.4804 18 12.7348 18 13ZM13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17C11 16.7348 11.1054 16.4804 11.2929 16.2929C11.4804 16.1054 11.7348 16 12 16C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17ZM13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13ZM8 17C8 17.2652 7.89464 17.5196 7.70711 17.7071C7.51957 17.8946 7.26522 18 7 18C6.73478 18 6.48043 17.8946 6.29289 17.7071C6.10536 17.5196 6 17.2652 6 17C6 16.7348 6.10536 16.4804 6.29289 16.2929C6.48043 16.1054 6.73478 16 7 16C7.26522 16 7.51957 16.1054 7.70711 16.2929C7.89464 16.4804 8 16.7348 8 17ZM8 13C8 13.2652 7.89464 13.5196 7.70711 13.7071C7.51957 13.8946 7.26522 14 7 14C6.73478 14 6.48043 13.8946 6.29289 13.7071C6.10536 13.5196 6 13.2652 6 13C6 12.7348 6.10536 12.4804 6.29289 12.2929C6.48043 12.1054 6.73478 12 7 12C7.26522 12 7.51957 12.1054 7.70711 12.2929C7.89464 12.4804 8 12.7348 8 13Z" fill="#475569" />
                                    </svg>
                                </div>
                                <p className="font-bold text-[20px] text-slate-600 font-outfit leading-[32px]">
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
                                <p className="font-bold text-[20px] text-slate-600 font-outfit leading-[32px]">
                                    2 Personnes
                                </p>
                            </div>
                        </div>
                    </div>
                    {/*Rating and nbRating */}
                    <div className="flex flex-row gap-[12px] items-center justify-start w-full mb-[40px]">
                        <p className="text-[14px] text-slate-800 font-bold font-outfit">
                            {rating}
                        </p>
                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0742 7.68569L13.5508 10.7607L14.6062 15.3388C14.7204 15.8281 14.5306 16.3382 14.1242 16.6338C13.7179 16.9293 13.1741 16.9529 12.7437 16.6935L8.75078 14.2716L4.76641 16.6935C4.33607 16.9529 3.79227 16.9293 3.38593 16.6338C2.9796 16.3382 2.78972 15.8281 2.90391 15.3388L3.95781 10.7654L0.433594 7.68569C0.052482 7.357 -0.0943371 6.8318 0.0610719 6.35312C0.216481 5.87444 0.643804 5.53565 1.14531 5.49351L5.79063 5.09116L7.60391 0.766162C7.79753 0.302116 8.25108 -8.83341e-05 8.75391 -8.83341e-05C9.25673 -8.83341e-05 9.71028 0.302116 9.90391 0.766162L11.7227 5.09116L16.3664 5.49351C16.8679 5.53565 17.2952 5.87444 17.4506 6.35312C17.6061 6.8318 17.4592 7.357 17.0781 7.68569H17.0742Z" fill="#FACC15" />
                        </svg>
                        <span className='text-[14px] text-slate-800 font-normal font-outfit'>
                            /
                        </span>
                        <div className='flex flex-row gap-2 items-center justify-center bg-slate-800 rounded-[8px] px-[12px] py-[4px]'>
                            <p className="text-[14px] text-slate-200 font-bold font-outfit">
                                {formatNumber(nbRating)} avis
                            </p>
                        </div>
                    </div>
                    <div className='w-full mb-[40px]'>
                        <ImgDetails images={images} />
                    </div>
                    <div className="flex flex-col gap-5 items-start justify-center w-full mb-[40px]">
                        <div className="flex flex-col gap-3 items-start justify-center w-full mb-8">
                            <p className="text-2xl font-bold font-outfit mb-[16px]">A propos de ce lieu</p>
                            <p className="text-normal text-gray-500 whitespace-pre-line font-outfit">{description}</p>
                        </div>

                        <div className="flex flex-col gap-3 items-start justify-center w-full mb-[40px]">
                            <p className="text-2xl font-bold font-outfit mb-[16px]">Ce que cet endroit offre</p>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <Tags key={tag.text} text={tag.text} Icon={tag.Icon} />
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 items-start justify-center w-full mb-[40px]">
                            <p className='text-2xl font-bold font-outfit mb-[16px]'>Découvrez {avis.length} avis fascinants</p>
                            <div className="grid grid-cols-3 gap-[80px] sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 items-start justify-center w-full">
                                {avis.slice(0, showAllAvis ? avis.length : 8).map((avis) => (
                                    <Avis key={avis.name} name={avis.name} userImg={avis.userImg} rating={avis.rating} comment={avis.comment} date={avis.date} like={avis.like} dislike={avis.dislike} />
                                ))}
                                {avis.length > 8 && (
                                    <div className="sm:col-span-2 md:col-span-2 lg:col-span-1 flex flex-col gap-3 items-center justify-center w-full h-full">
                                        <button
                                            onClick={() => setShowAllAvis(!showAllAvis)}
                                            className="w-[90%] h-[48px] flex flex-col items-center justify-center bg-slate-200 rounded-[12px] group"
                                        >
                                            <div className="flex flex-row w-full gap-[12px] pl-[29px] pr-[22px] items-center justify-center text-center">
                                                <p className="font-normal text-[16px] text-slate-700 font-outfit">
                                                    {showAllAvis ? 'Afficher moins' : `Afficher les ${avis.length - 8} commentaires`}
                                                </p>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path opacity="0.5" d="M22 10.5V12C22 16.714 22 19.071 20.535 20.535C19.072 22 16.714 22 12 22C7.286 22 4.929 22 3.464 20.535C2 19.072 2 16.714 2 12C2 7.286 2 4.929 3.464 3.464C4.93 2 7.286 2 12 2H13.5" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
                                                    <path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" stroke="#334155" strokeWidth="1.5" />
                                                    <path d="M7 14H16M7 17.5H13" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='flex flex-col gap-3 items-start justify-center w-full mb-[40px]'>
                            <p className='text-2xl font-bold font-outfit mb-[16px]'>Où vous serez</p>
                            {/* map des images */}
                            <div className='flex flex-row gap-2 items-center justify-center w-full h-[480px]'>
                                <img src={'/images/carte.png'} alt='Image 1' className='w-full h-full object-cover rounded-[12px]' />
                            </div>
                        </div>

                        <div className='flex flex-col gap-3 items-start justify-center w-full mb-[40px]'>
                            <Hote name={hoteInfo.name} userImg={hoteInfo.userImg} description={hoteInfo.description} anciennete={hoteInfo.anciennete} />
                        </div>

                        <div className='flex flex-col gap-3 items-start justify-center w-full mb-[40px]'>
                            <Recommendation type='Services'
                                cards={[{ title: 'Le Petit Délice', description: desc1, image: '/services/service-prop5.png' },
                                { title: 'La Table Enchantée', description: desc2, image: '/services/service-prop1.png' },
                                { title: 'Le Jardin des Saveurs', description: desc3, image: '/services/service-prop2.png' },
                                { title: 'L\'Escapade Gourmande', description: desc1, image: '/services/service-prop3.png' },
                                { title: 'La Cuisine des Rêves', description: desc2, image: '/services/service-prop4.png' },
                                { title: 'Le Petit Délice', description: desc3, image: '/services/service-prop5.png' },
                                { title: 'Le Petit Délice', description: desc3, image: '/services/service-prop5.png' },
                                { title: 'Le Petit Délice', description: desc3, image: '/services/service-prop5.png' },
                                ]} />
                            <Recommendation type='Experiences'
                                cards={[{ title: 'L\'Escalade des Équipes', description: desc2, image: '/experiences/exp1.png' },
                                { title: 'L\'Escalade en Équipe', description: desc2, image: '/experiences/exp2.png' },
                                { title: 'L\'Escalade des Équipes : un défi à relever ensemble.', description: desc3, image: '/experiences/exp1.png' },
                                { title: 'L\'Escalade en Équipe', description: desc1, image: '/experiences/exp3.png' },
                                { title: 'L\'Escalade en Équipe', description: desc2, image: '/experiences/exp4.png' },
                                { title: 'L\'Escalade en Équipe', description: desc3, image: '/experiences/exp5.png' },
                                { title: 'L\'Escalade en Équipe', description: desc1, image: '/experiences/exp3.png' },
                                { title: 'L\'Escalade en Équipe', description: desc2, image: '/experiences/exp1.png' }]} />
                        </div>
                    </div>

                    <div className={`fixed bottom-0 left-0 sm:left-0 ${isSidebarCollapsed ? 'md:left-[calc(2%+80px+2px)] lg:left-[calc(2%+80px+2px)] xl:left-[calc(2%+80px+2px)]' : 'md:left-[calc(2%+22%+1px)] lg:left-[calc(2%+22%+1px)] xl:left-[calc(2%+22%+1px)]'} right-0 flex flex-row gap-[12px] items-center justify-center sm:justify-center md:justify-start lg:justify-start xl:justify-start w-full px-4 sm:px-4 md:px-5 lg:px-5 xl:px-5 py-3 sm:py-3 md:py-4 lg:py-4 xl:py-4 bg-white z-20 transition-all duration-300 ease-in-out`}>
                        <div className='flex flex-row gap-[12px] md:ml-2 lg:ml-[80px] xl:ml-[80px]'>
                            <button className='w-full sm:w-[150px] md:w-[150px] lg:w-[150px] xl:w-[150px] h-[40px] sm:h-[38px] md:h-[38px] lg:h-[38px] xl:h-[38px] rounded-[12px] flex items-center justify-center' style={{ background: 'radial-gradient(262.5% 262.5% at 50% -97.5%, var(--colors-teal-400, #2DD4BF) 0%, var(--colors-sky-500, #0EA5E9) 55%, var(--colors-fuchsia-500, #D946EF) 100%)' }}>
                                <p className='text-sm text-white font-normal text-center'>Contacter l'hôte</p>
                            </button>
                            <button className='w-full sm:w-[150px] md:w-[150px] lg:w-[150px] xl:w-[150px] h-[40px] sm:h-[38px] md:h-[38px] lg:h-[38px] xl:h-[38px] bg-slate-950 rounded-[12px] flex items-center justify-center'>
                                <p className='text-sm text-white font-normal text-center'>Valider la réservation</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div >
    )
}

export default Details