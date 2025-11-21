import React, { useState, useRef, useEffect } from 'react';
import { MenuProps } from '../HoltelCard';
import ImgDetails from './ImgDetails';

interface MenuComponentProps {
    menu: MenuProps[];
    description?: string;
}

function MenuComponent({ menu, description = "Découvrez notre menu riche et varié, mettant en avant les traditions marocaines à Paris" }: MenuComponentProps) {
    const [selectedTag, setSelectedTag] = useState<string>('Tout');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    // Extract all unique tags from menu, with "Tout" as first option
    const uniqueTags = Array.from(new Set(menu.map(item => item.tag)));
    const allTags = ['Tout', ...uniqueTags];

    // Get images based on selected tag
    const getImagesForTag = (tag: string): string[] => {
        if (tag === 'Tout') {
            return menu.flatMap(item => item.images);
        }
        const menuItem = menu.find(item => item.tag === tag);
        return menuItem?.images || [];
    };

    const currentImages = getImagesForTag(selectedTag);

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

    return (
        <div className="flex flex-col gap-[16px] sm:gap-[22px] items-start justify-center w-full mb-[40px]">
            {/* Header */}
            <div className="flex flex-col gap-[12px] items-start justify-center w-full">
                <p className="text-2xl font-bold font-bricolagegrotesque text-slate-800">Menu</p>
                <p className="text-[16px] sm:text-lg text-slate-700 font-vendsans leading-[24px] sm:leading-[28px]">
                    {description}
                </p>
            </div>

            {/* Tags - Desktop: Horizontal scroll with gradient fade, Mobile: Horizontal scroll */}
            <div className="relative w-full">
                <div
                    ref={scrollContainerRef}
                    className={`flex gap-[16px] justify-start items-start overflow-x-auto scrollbar-hide ${showScrollButton ? 'pr-[190px]' : ''}`}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {allTags.map((tag, index) => {
                        const isActive = selectedTag === tag;
                        return (
                            <div
                                key={index}
                                className="rounded-full p-[1.5px] shrink-0"
                                style={{
                                    background: 'radial-gradient(141.56% 141.56% at 50% -7.74%, #2DD4BF 0%, #0EA5E9 50.96%, #D946EF 100%)'
                                }}
                            >
                                <button
                                    onClick={() => {
                                        setSelectedTag(tag);
                                    }}
                                    className={`flex gap-[8px] items-center pl-[8px] pr-[16px] py-[8px] rounded-full shrink-0 transition-colors w-full h-full ${isActive
                                            ? 'bg-sky-100'
                                            : 'bg-white'
                                        }`}
                                >
                                    <div className="w-[42px] h-[42px] rounded-full overflow-hidden shrink-0 bg-slate-200">
                                        <img
                                            src={
                                                tag === 'Tout'
                                                    ? (menu.flatMap(item => item.images)[0] || '/services/service-prop1.png')
                                                    : (menu.find(item => item.tag === tag)?.images[0] || '/services/service-prop1.png')
                                            }
                                            alt={tag}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className={`font-semibold text-base font-bricolagegrotesque ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-sky-500' : 'text-slate-600'
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
                    <div className="absolute right-0 top-0 h-full w-[190px] bg-gradient-to-l from-white via-white to-transparent  flex items-center justify-end pr-[12px] pointer-events-none sm:hidden md:flex">
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

            {/* Image Gallery using ImgDetails component */}
            {currentImages.length > 0 && (
                <div className="w-full">
                    <ImgDetails key={selectedTag} images={currentImages} />
                </div>
            )}
        </div>
    );
}

export default MenuComponent;
