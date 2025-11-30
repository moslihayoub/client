import React, { useState, useRef, useEffect } from 'react';
import { FormuleProps } from '../HoltelCard';
import ImgDetails from './ImgDetails';

interface FormuleComponentProps {
    formules: FormuleProps[];
    description?: string;
}

function FormuleComponent({ formules, description = "Découvrez notre menu riche et varié, mettant en avant les traditions marocaines à Paris" }: FormuleComponentProps) {
    const [selectedTag, setSelectedTag] = useState<string>(formules[0]?.tag || '');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    // Extract all unique tags from formules
    const uniqueTags = Array.from(new Set(formules.map(item => item.tag)));
    const allTags = uniqueTags.length > 0 ? uniqueTags : [];

    // Get selected formule based on tag
    const selectedFormule = formules.find(item => item.tag === selectedTag) || formules[0];

    // Check if scroll is needed
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            const checkScroll = () => {
                setShowScrollButton(container.scrollWidth > container.clientWidth);
            };
            checkScroll();
            window.addEventListener('resize', checkScroll);
            return () => window.removeEventListener('resize', checkScroll);
        }
    }, []);

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    if (!formules || formules.length === 0) return null;

    return (
        <div className="flex flex-col gap-[26px] items-start justify-center w-full mb-[40px]">
            {/* Header */}
            <div className="flex flex-col gap-[16px] items-start justify-center w-full">
                <div className="flex flex-col gap-[12px] items-start justify-center w-full">
                    <p className="text-2xl font-bold font-bricolagegrotesque text-slate-800">Nos formules</p>
                    <p className="text-base text-slate-700 font-vendsans leading-[24px]">
                    Découvrez notre formules riche et varié, mettant en avant les activités et les expériences à Paris
                    </p>
                </div>

                {/* Tags - Horizontal scroll */}
                {allTags.length > 0 && (
                    <div className="relative w-full">
                        <div
                            ref={scrollContainerRef}
                            className={`flex gap-[16px] justify-start items-start overflow-x-auto scrollbar-hide ${showScrollButton ? 'pr-[190px]' : ''}`}
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {allTags.map((tag, index) => {
                                const isActive = selectedTag === tag;
                                const formuleForTag = formules.find(item => item.tag === tag);
                                return (
                                    <div
                                        key={index}
                                        className="rounded-full p-[1px] shrink-0"
                                        style={{
                                            background: 'radial-gradient(141.56% 141.56% at 50% -7.74%, #2DD4BF 0%, #0EA5E9 50.96%, #D946EF 100%)'
                                        }}
                                    >
                                        <button
                                            onClick={() => {
                                                setSelectedTag(tag);
                                            }}
                                            className={`flex gap-[6px] items-center pl-[6px] pr-[12px] py-[6px] rounded-full shrink-0 transition-colors w-full h-full ${isActive
                                                ? 'bg-sky-100'
                                                : 'bg-white'
                                                }`}
                                        >
                                            <div className="w-[32px] h-[32px] rounded-full overflow-hidden shrink-0 bg-slate-200">
                                                <img
                                                    src={formuleForTag?.images[0] || '/experiences/exp1.png'}
                                                    alt={tag}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <p className={`font-semibold text-sm font-bricolagegrotesque ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-500' : 'text-slate-600'
                                                }`}>
                                                {tag}
                                            </p>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Scroll button - Desktop only */}
                        {showScrollButton && (
                            <div className="absolute right-0 top-0 h-full w-[190px] bg-gradient-to-l from-white via-white to-transparent flex items-center justify-end pr-[12px] pointer-events-none sm:hidden md:flex">
                                <button
                                    onClick={scrollRight}
                                    className="w-[58px] h-[58px] rounded-full border-[1.5px] border-slate-300 bg-white flex items-center justify-center cursor-pointer pointer-events-auto hover:bg-slate-50 transition-colors"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.99951 19L14.9995 12L8.99951 5" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Content - Desktop: Flex row layout, Mobile: ImgDetails */}
            {selectedFormule && (
                <>
                    {/* Desktop: Flex row layout */}
                    <div className="hidden md:flex lg:flex xl:flex gap-[12px] items-start w-full">
                        {/* Images section */}
                        <div className="flex gap-[12px] items-start shrink-0">
                            {/* Large image */}
                            <div className="h-[268px] w-[357px] rounded-3xl overflow-hidden shrink-0">
                                <img
                                    src={selectedFormule.images[0] || '/experiences/exp1.png'}
                                    alt={selectedFormule.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Two small images stacked */}
                            <div className="flex flex-col gap-[12px] shrink-0">
                                {selectedFormule.images.slice(1, 3).map((image, index) => (
                                    <div key={index} className="h-[128px] w-[170px] rounded-3xl overflow-hidden">
                                        <img
                                            src={image}
                                            alt={`${selectedFormule.title} ${index + 2}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content section */}
                        <div className="flex-1 flex flex-col gap-[16px] items-start justify-between min-h-[268px]">
                            <div className="flex flex-col gap-[16px] items-start w-full">
                                <p className="text-xl font-bold font-bricolagegrotesque text-sky-500 leading-[32px]">
                                    {selectedFormule.title}
                                </p>
                                <div className="text-base text-slate-700 font-vendsans leading-[24px]">
                                    {selectedFormule.description.split('\n').map((line, index) => {
                                        const trimmedLine = line.trim();
                                        if (trimmedLine.startsWith('-')) {
                                            return (
                                                <p key={index} className="mb-0 leading-[24px]">
                                                    {trimmedLine}
                                                </p>
                                            );
                                        }
                                        return (
                                            <p key={index} className={index === 0 ? 'font-medium mb-0 leading-[24px]' : 'mb-0 leading-[24px]'}>
                                                {trimmedLine}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Photo de formule button */}
                            <button className="bg-slate-200 hover:bg-slate-300 rounded-xl px-[29px] py-[12px] flex gap-[12px] items-center justify-center transition-colors">
                                <p className="text-base font-medium text-slate-700 font-bricolagegrotesque">
                                    Photo de formule
                                </p>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.9688 11.1309C16.4167 11.1315 16.79 11.501 16.79 11.9678H16.7891L16.79 11.9707C16.7907 12.0797 16.7696 12.1881 16.7285 12.2891C16.6874 12.39 16.6264 12.4821 16.5498 12.5596C16.4733 12.6369 16.3825 12.6989 16.2822 12.7412C16.1825 12.7832 16.075 12.8037 15.9668 12.8047C15.8589 12.8037 15.7518 12.7831 15.6523 12.7412C15.552 12.699 15.4613 12.6369 15.3848 12.5596C15.3081 12.482 15.2472 12.39 15.2061 12.2891C15.1649 12.1881 15.1439 12.0798 15.1445 11.9707V11.9648C15.144 11.856 15.165 11.7482 15.2061 11.6475C15.2472 11.5465 15.3081 11.4544 15.3848 11.377C15.4614 11.2995 15.5529 11.2375 15.6533 11.1953C15.7532 11.1534 15.8604 11.1316 15.9688 11.1309Z" stroke="#334155" />
                                    <path d="M9.17285 7.78809H14.8271C16.2038 7.78809 17.2555 7.78948 18.0615 7.90332C18.881 8.02013 19.4742 8.25708 19.9062 8.75586C20.2848 9.19292 20.4503 9.72834 20.4902 10.4189L20.5 10.7246C20.5057 11.5479 20.3674 12.6037 20.1855 13.9834L19.8203 16.7559C19.6778 17.8352 19.5676 18.6639 19.4004 19.3037C19.2501 19.8758 19.0505 20.3133 18.7295 20.6562L18.585 20.7979C18.2282 21.1134 17.8026 21.2849 17.2588 21.3799L17.0186 21.416C16.3704 21.499 15.5439 21.5 14.4668 21.5H9.5332C8.45594 21.5 7.63014 21.499 6.98242 21.415H6.98145C6.32113 21.3309 5.82218 21.1576 5.41602 20.7969H5.41504C5.00712 20.436 4.77146 19.9577 4.59961 19.3037C4.43244 18.6639 4.32218 17.8351 4.17969 16.7559L3.81445 13.9834C3.63265 12.6037 3.4943 11.5479 3.5 10.7246C3.50562 9.8845 3.66226 9.25505 4.09473 8.75488L4.09375 8.75391C4.47166 8.31801 4.97371 8.08346 5.6416 7.95312L5.93848 7.90332C6.543 7.8179 7.28575 7.7957 8.2002 7.79004L9.17285 7.78809ZM9.22559 8.125C7.99103 8.125 7.03733 8.12511 6.29004 8.2002L5.98145 8.2373C5.19888 8.34941 4.69272 8.56701 4.33496 8.98047C3.9755 9.39356 3.82877 9.92755 3.82227 10.7256V10.7266C3.81698 11.5304 3.95461 12.5744 4.1416 13.9902L4.19141 14.3691L4.30176 15.2061L4.98242 14.707L5.35352 14.4355C6.13117 13.8661 7.29281 13.8978 8.02539 14.5107L11.4092 17.3438C11.8971 17.7523 12.6793 17.8128 13.2529 17.4756L13.2539 17.4746L13.4863 17.335L13.4873 17.3359C14.4428 16.7737 15.7332 16.837 16.6055 17.4941L18.4375 18.874L19.085 19.3623L19.2305 18.5645C19.3231 18.0551 19.4054 17.4327 19.5068 16.666V16.665L19.8594 13.9902L19.8584 13.9893C20.022 12.7517 20.1482 11.7971 20.1729 11.0391L20.1768 10.7266C20.1714 9.92893 20.0249 9.39561 19.667 8.9834H19.668C19.3541 8.61996 18.9272 8.4069 18.2998 8.28418L18.0176 8.2373L17.71 8.2002C16.9628 8.12505 16.0102 8.125 14.7754 8.125H9.22559Z" fill="#475569" stroke="#334155" />
                                    <path d="M6.87988 5H17.2764C17.959 5.00003 18.5626 5.3092 18.9717 5.79004C18.9404 5.78528 18.9082 5.77979 18.877 5.77539C17.8613 5.63055 16.5925 5.63184 15.1787 5.63184H8.97656C7.56211 5.63184 6.29232 5.63036 5.27734 5.77539C5.24574 5.77982 5.21424 5.78523 5.18262 5.79004C5.59138 5.3092 6.19564 5.00011 6.87988 5Z" fill="#475569" stroke="#334155" />
                                    <path d="M8.85943 2H15.1414C15.3504 2 15.5114 2 15.6514 2.015C16.1302 2.06826 16.5851 2.25251 16.966 2.54748C17.3469 2.84246 17.6391 3.23675 17.8104 3.687H6.19043C6.36179 3.23675 6.65398 2.84246 7.03488 2.54748C7.41577 2.25251 7.87062 2.06826 8.34943 2.015C8.48943 2 8.64943 2 8.85943 2Z" fill="#475569" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile: ImgDetails component */}
                    <div className="block md:hidden w-full">
                        <ImgDetails key={selectedTag} images={selectedFormule.images} />
                    </div>
                </>
            )}
        </div>
    );
}

export default FormuleComponent;
