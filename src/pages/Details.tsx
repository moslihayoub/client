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

interface DetailsProps {
    title: string;
    description: string;
    tags: TagProps[];
    rating: number;
    nbRating: number;
    avis: AvisProps[];
    hoteInfo: HoteInfoProps;
    images: string[];
}

function Details({ title, description, tags, rating, nbRating, avis, hoteInfo, images }: DetailsProps) {
    const { isCollapsed: isSidebarCollapsed } = useSideListing();
    const desc1 = "Un restaurant convivial offrant une vue imprenable sur la place des Saveurs."
    const desc2 = "Un restaurant chaleureux avec une vue magnifique sur la place des Saveurs."
    const desc3 = "Un restaurant convivial offrant une vue imprenable sur la place des Saveurs."

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
                <div className="flex-1 overflow-y-auto scrollbar-hide mt-[5%] sm:mt-[15%] md:mt-[10%] lg:mt-[5%] xl:mt-[5%]">
                    <div className="flex flex-col items-center justify-center px-5 pb-10">
                        {/* Breadcrumb */}
                        <div className="flex flex-row gap-2 items-center justify-start w-full mb-5">
                            <span className="text-sm font-outfit">
                                <Link to="/hotels" className="text-blue-500 underline">
                                    Accueil
                                </Link>
                            </span>
                            <span className="text-gray-500">/</span>
                            <span className="text-sm text-gray-500 font-outfit">{title}</span>
                        </div>

                        {/* Header */}
                        <div className="text-left items-start justify-center w-full mb-8">
                            <h1 className="text-4xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4">
                                {title}
                            </h1>
                            {/* Search Criteria Component */}
                            <div className="flex gap-6 items-center">
                                {/* Date Range */}
                                <div className="flex gap-1.5 items-center">
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#475569" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15.6947 13.7H15.7037M15.6947 16.7H15.7037M11.9955 13.7H12.0045M11.9955 16.7H12.0045M8.29431 13.7H8.30329M8.29431 16.7H8.30329" stroke="#475569" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <p className="font-bold text-md text-slate-600 font-outfit leading-8">
                                        Du 6 au 18 octobre
                                    </p>
                                </div>

                                {/* Guest Count */}
                                <div className="flex gap-1.5 items-center">
                                    <div className="w-6 h-6 flex items-center justify-center">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#475569" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" stroke="#475569" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <p className="font-bold text-md text-slate-600 font-outfit leading-8">
                                        2 Personnes
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/*Rating and nbRating */}
                        <div className="flex flex-row gap-2 items-center justify-start w-full mb-8">
                            <p className="text-sm text-gray-500 font-outfit">
                                {rating}
                            </p>
                            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0742 7.68569L13.5508 10.7607L14.6062 15.3388C14.7204 15.8281 14.5306 16.3382 14.1242 16.6338C13.7179 16.9293 13.1741 16.9529 12.7437 16.6935L8.75078 14.2716L4.76641 16.6935C4.33607 16.9529 3.79227 16.9293 3.38593 16.6338C2.9796 16.3382 2.78972 15.8281 2.90391 15.3388L3.95781 10.7654L0.433594 7.68569C0.052482 7.357 -0.0943371 6.8318 0.0610719 6.35312C0.216481 5.87444 0.643804 5.53565 1.14531 5.49351L5.79063 5.09116L7.60391 0.766162C7.79753 0.302116 8.25108 -8.83341e-05 8.75391 -8.83341e-05C9.25673 -8.83341e-05 9.71028 0.302116 9.90391 0.766162L11.7227 5.09116L16.3664 5.49351C16.8679 5.53565 17.2952 5.87444 17.4506 6.35312C17.6061 6.8318 17.4592 7.357 17.0781 7.68569H17.0742Z" fill="#FACC15" />
                            </svg>
                            <span className='text-sm text-gray-500 font-outfit'>
                                /
                            </span>
                            <div className='flex flex-row gap-2 items-center justify-center bg-slate-800 rounded-[8px] p-2'>
                                <p className="text-sm text-white font-outfit">
                                    {nbRating} avis
                                </p>
                            </div>
                        </div>
                        <div className='w-full'>
                            <ImageDisplay images={images} />
                        </div>
                        <div className="flex flex-col gap-5 items-start justify-center w-full">
                            <div className="flex flex-col gap-3 items-start justify-center w-full">
                                <p className="text-2xl font-bold">A propos de ce lieu</p>
                                <p className="text-normal text-gray-500 whitespace-pre-line">{description}</p>
                            </div>

                            <div className="flex flex-col gap-3 items-start justify-center w-full">
                                <p className="text-2xl font-bold">Ce que cet endroit offre</p>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <Tags key={tag.text} text={tag.text} Icon={tag.Icon} />
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 items-start justify-center w-full">
                                <p className='text-2xl font-bold'>Découvrez les {avis.length} avis</p>
                                <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-5 items-start justify-center w-full">
                                    {avis.slice(0, 8).map((avis) => (
                                        <Avis key={avis.name} name={avis.name} userImg={avis.userImg} rating={avis.rating} comment={avis.comment} date={avis.date} like={avis.like} dislike={avis.dislike} />
                                    ))}
                                    {avis.length > 8 && (
                                        <div className="sm:col-span-2 md:col-span-1 lg:col-span-1 flex flex-col gap-3 items-center justify-center w-full h-full">
                                            <button className="w-[80%] h-[48px] flex flex-col gap-4 items-center justify-center bg-slate-200 rounded-[12px] group">
                                                <div className="flex flex-row gap-2 items-center justify-center text-center">
                                                    <p className="text-sm text-gray-500 mt-1">Afficher les {avis.length - 8} avis supplémentaires</p>
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.5" d="M22 10.5V12C22 16.714 22 19.071 20.535 20.535C19.072 22 16.714 22 12 22C7.286 22 4.929 22 3.464 20.535C2 19.072 2 16.714 2 12C2 7.286 2 4.929 3.464 3.464C4.93 2 7.286 2 12 2H13.5" stroke="#334155" stroke-width="1.5" stroke-linecap="round" />
                                                        <path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" stroke="#334155" stroke-width="1.5" />
                                                        <path d="M7 14H16M7 17.5H13" stroke="#334155" stroke-width="1.5" stroke-linecap="round" />
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className='flex flex-col gap-3 items-start justify-center w-full'>
                                <p className='text-2xl font-bold'>Où vous serez</p>
                                {/* map des images */}
                                <div className='flex flex-row gap-2 items-center justify-center w-full h-[480px]'>
                                    <img src={'/images/carte.png'} alt='Image 1' className='w-[80%] h-full object-cover rounded-[12px]' />
                                </div>
                            </div>

                            <div className='flex flex-col gap-3 items-start justify-center w-full'>
                                <Hote name={hoteInfo.name} userImg={hoteInfo.userImg} description={hoteInfo.description} anciennete={hoteInfo.anciennete} />
                            </div>

                            <div className='flex flex-col gap-3 items-start justify-center w-full'>
                                <Recommendation type='Experiences'
                                    cards={[{ title: 'Experience 1', description: desc1, image: '/images/bg1.png' },
                                    { title: 'Experience 2', description: desc2, image: '/images/bg2.png' },
                                    { title: 'Experience 3', description: desc3, image: '/images/bg3.png' },
                                    { title: 'Experience 4', description: desc1, image: '/images/bg1.png' },
                                    { title: 'Experience 5', description: desc2, image: '/images/bg2.png' },
                                    { title: 'Experience 6', description: desc3, image: '/images/bg3.png' },
                                    { title: 'Experience 7', description: desc1, image: '/images/bg1.png' },
                                    { title: 'Experience 8', description: desc2, image: '/images/bg2.png' }
                                    ]} />
                                <Recommendation type='Services'
                                    cards={[{ title: 'Service 1', description: desc2, image: '/images/bg1.png' },
                                    { title: 'Service 2', description: desc2, image: '/images/bg2.png' },
                                    { title: 'Service 3', description: desc3, image: '/images/bg3.png' },
                                    { title: 'Service 4', description: desc1, image: '/images/bg1.png' },
                                    { title: 'Service 5', description: desc2, image: '/images/bg2.png' },
                                    { title: 'Service 6', description: desc3, image: '/images/bg3.png' },
                                    { title: 'Service 7', description: desc1, image: '/images/bg1.png' },
                                    { title: 'Service 8', description: desc2, image: '/images/bg2.png' }]} />
                            </div>
                        </div>

                        <div className='flex flex-row gap-3 items-start w-full pt-5'>
                            <button className='w-[150px] h-[38px] bg-nexastay-gradient rounded-[12px]'>
                                <p className='text-sm text-white font-normal text-center'>Contacter l'hôte</p>
                            </button>
                            <button className='w-[150px] h-[38px] bg-slate-950 rounded-[12px]'>
                                <p className='text-sm text-white font-normal text-center'>Valider la réservation</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details