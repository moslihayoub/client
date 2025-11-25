import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface Card {
    type: 'Note' | 'Memory' | 'Icon' | 'Favoris' | 'Urgences'
    title: string;
    description?: string;
    images?: string[];
    backgroundColor?: string;
    icon?: React.ReactNode;
    number?: number;
    text?: string;
    onNavigate?: () => void;
}

interface Input {
    cards: Card[];
}

// Color picker popup component
function ColorPickerPopup({
    isOpen,
    onClose,
    onColorSelect
}: {
    isOpen: boolean;
    onClose: () => void;
    onColorSelect: (color: string) => void;
}) {
    const colors = [
        { name: 'black', value: '#000000' },
        { name: 'sky', value: '#0EA5E9' },
        { name: 'teal', value: '#14B8A6' },
        { name: 'red', value: '#F87171' },
        { name: 'yellow', value: '#FACC15' },
        { name: 'fuchsia', value: '#D946EF' },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={onClose}>
            <div
                className="bg-white rounded-full p-[14px] shadow-xl flex flex-wrap gap-[18px] items-center justify-center w-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {colors.map((color) => (
                    <button
                        key={color.name}
                        onClick={() => {
                            onColorSelect(color.value);
                            onClose();
                        }}
                        className="w-[22px] h-[22px] rounded-full"
                        style={{ backgroundColor: color.value }}
                    />
                ))}
            </div>
        </div>
    );
}

function Cards({ cards }: Input) {
    return (
        <div className='flex flex-wrap gap-[22px] items-start justify-center w-full pb-[40px] sm:pb-[40px] md:pb-0 lg:pb-0 xl:pb-0 pt-0 px-0'>
            {cards.map((card, index) => (
                <CardItem key={index} card={card} />
            ))}
        </div>
    )
}

function CardItem({ card }: { card: Card }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [selectedColor, setSelectedColor] = useState<string | undefined>(card.backgroundColor);

    const handleColorSelect = (color: string) => {
        // Update card background color
        if (card.type === 'Note') {
            setSelectedColor(color);
        }
    };

    // Touch handlers for image carousel
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (card.type === 'Memory' && card.images) {
            if (isLeftSwipe && currentImageIndex < card.images.length - 1) {
                setCurrentImageIndex(currentImageIndex + 1);
            }
            if (isRightSwipe && currentImageIndex > 0) {
                setCurrentImageIndex(currentImageIndex - 1);
            }
        }
    };

    // Note card
    if (card.type === 'Note') {
        const bgColor = selectedColor || card.backgroundColor || '#FACC15';
        return (
            <>
                <div
                    className='flex flex-col gap-[10px] rounded-[22px] overflow-hidden w-[calc(50%-11px)] sm:w-[calc(50%-11px)] md:w-[180px] lg:w-[180px] xl:w-[180px] h-[189px] md:h-[180px] p-[13px]'
                    style={{ backgroundColor: bgColor }}
                >
                    {/* Header with icon, title, and color picker button */}
                    <div className='flex items-center gap-[6px] w-full'>
                        {/* Calendar icon for Calendrier, Heart icon for other Note cards */}
                        {card.title === 'Calendrier' ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                <path d="M17.29 11.968C17.2911 12.1426 17.2577 12.3158 17.1919 12.4776C17.126 12.6393 17.0289 12.7865 16.9062 12.9108C16.7834 13.035 16.6374 13.1339 16.4764 13.2017C16.3154 13.2695 16.1427 13.3049 15.968 13.306C15.7933 13.3051 15.6204 13.2697 15.4594 13.202C15.2983 13.1342 15.1521 13.0354 15.0293 12.9111C14.9064 12.7869 14.8092 12.6396 14.7433 12.4778C14.6774 12.316 14.644 12.1427 14.645 11.968C14.6441 11.7933 14.6776 11.6202 14.7436 11.4585C14.8096 11.2968 14.9068 11.1496 15.0296 11.0255C15.1525 10.9013 15.2986 10.8026 15.4596 10.7349C15.6206 10.6672 15.7934 10.6319 15.968 10.631C16.698 10.631 17.29 11.23 17.29 11.968Z" fill="url(#paint0_radial_calendar_note)" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M18.1319 7.40796C17.2829 7.28796 16.1899 7.28796 14.8269 7.28796H9.17294C7.80994 7.28796 6.71694 7.28796 5.86794 7.40796C4.99094 7.53296 4.25994 7.79996 3.71594 8.42796C3.17294 9.05596 3.00594 9.82396 2.99994 10.721C2.99394 11.587 3.13894 12.683 3.31894 14.049L3.68394 16.821C3.82494 17.889 3.93894 18.754 4.11594 19.431C4.30094 20.135 4.57294 20.719 5.08394 21.171C5.59394 21.624 6.20394 21.82 6.91794 21.911C7.60494 22 8.46794 22 9.53294 22H14.4669C15.5319 22 16.3949 22 17.0819 21.912C17.7969 21.82 18.4049 21.624 18.9159 21.172C19.4269 20.719 19.6989 20.135 19.8839 19.431C20.0609 18.754 20.1749 17.889 20.3159 16.821L20.6809 14.049C20.8609 12.683 21.0059 11.587 20.9999 10.721C20.9929 9.82396 20.8279 9.05596 20.2839 8.42796C19.7399 7.79996 19.0089 7.53296 18.1319 7.40796ZM6.05194 8.73196C5.32594 8.83596 4.95794 9.02396 4.71194 9.30896C4.46394 9.59396 4.32794 9.98796 4.32194 10.73C4.31694 11.491 4.44794 12.494 4.63694 13.925L4.68694 14.304L5.05794 14.032C6.01794 13.329 7.43394 13.364 8.34594 14.127L11.7299 16.96C12.0499 17.228 12.6009 17.278 12.9989 17.044L13.2339 16.905C14.3589 16.243 15.8679 16.313 16.9059 17.095L18.7379 18.475C18.8279 17.98 18.9089 17.371 19.0109 16.6L19.3629 13.925C19.5519 12.495 19.6829 11.491 19.6769 10.73C19.6719 9.98796 19.5359 9.59396 19.2889 9.30996C19.0419 9.02396 18.6739 8.83596 17.9469 8.73196C17.2019 8.62596 16.2019 8.62496 14.7749 8.62496H9.22494C7.79794 8.62496 6.79694 8.62596 6.05194 8.73196Z" fill="url(#paint0_radial_calendar_note)" />
                                <path d="M6.88001 4.5C5.62801 4.5 4.60101 5.34 4.25901 6.454L4.23901 6.524C4.59701 6.404 4.96901 6.324 5.34701 6.271C6.31901 6.132 7.54801 6.132 8.97601 6.132H15.178C16.606 6.132 17.835 6.132 18.808 6.271C19.185 6.324 19.558 6.403 19.916 6.524L19.896 6.454C19.553 5.34 18.526 4.5 17.276 4.5H6.88001Z" fill="url(#paint0_radial_calendar_note)" />
                                <path d="M8.85894 2H15.1409C15.3499 2 15.5109 2 15.6509 2.015C16.1297 2.06826 16.5846 2.25251 16.9655 2.54748C17.3464 2.84246 17.6386 3.23675 17.8099 3.687H6.18994C6.3613 3.23675 6.65349 2.84246 7.03439 2.54748C7.41528 2.25251 7.87013 2.06826 8.34894 2.015C8.48894 2 8.64894 2 8.85894 2Z" fill="url(#paint0_radial_calendar_note)" />
                                <defs>
                                    <radialGradient id="paint0_radial_calendar_note" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 1.60727) rotate(90) scale(25.481 28.3122)">
                                        <stop stop-color="#2DD4BF" />
                                        <stop offset="0.509615" stop-color="#0EA5E9" />
                                        <stop offset="1" stop-color="#D946EF" />
                                    </radialGradient>
                                </defs>
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                                <path d="M2 9.11901C2 14.2037 6.02 16.9128 8.962 19.3386C10 20.1939 11 21 12 21C13 21 14 20.1949 15.038 19.3375C17.981 16.9138 22 14.2037 22 9.12005C22 4.03641 16.5 0.428094 12 5.31725C7.5 0.428094 2 4.03432 2 9.11901Z" fill="url(#paint0_radial_3116_4162)" />
                                <defs>
                                    <radialGradient id="paint0_radial_3116_4162" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 1.60727) rotate(90) scale(25.481 28.3122)">
                                        <stop stopColor="#2DD4BF" />
                                        <stop offset="0.509615" stopColor="#0EA5E9" />
                                        <stop offset="1" stopColor="#D946EF" />
                                    </radialGradient>
                                </defs>
                            </svg>
                        )}

                        <h3 className='text-base font-bold text-black font-bricolagegrotesque leading-[16px] flex-1'>
                            {card.title}
                        </h3>
                        {/* Color picker button */}
                        <button
                            onClick={() => setShowColorPicker(true)}
                            className="w-[14px] h-[14px] cursor-pointer"
                        >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7" cy="7" r="7" fill="url(#paint0_radial_3116_4165)" />
                                <defs>
                                    <radialGradient id="paint0_radial_3116_4165" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(16.5 -2.5) rotate(119.932) scale(19.0394)">
                                        <stop stop-color="#2DD4BF" />
                                        <stop offset="0.509615" stop-color="#0EA5E9" />
                                        <stop offset="1" stop-color="#D946EF" />
                                    </radialGradient>
                                </defs>
                            </svg>

                        </button>
                    </div>

                    {/* Description */}
                    {card.description && (
                        <p className='flex-1 text-sm font-medium text-slate-950 font-vendsans leading-[16px] whitespace-pre-line'>
                            {card.description}
                        </p>
                    )}

                    {/* Navigation button */}
                    <div className='flex items-center justify-end pt-[4px]'>
                        <button
                            onClick={card.onNavigate}
                            className="bg-black/40 border border-white rounded-full w-[32px] h-[32px] flex items-center justify-center hover:bg-black/60 transition-all duration-200"
                        >
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.61548 3.53882C8.6561 3.53882 8.69506 3.55512 8.72388 3.58374L12.4163 7.27612C12.445 7.30494 12.4611 7.34381 12.4612 7.38452C12.4612 7.42522 12.445 7.46409 12.4163 7.49292L8.72388 11.1853L8.71704 11.1931C8.70296 11.2082 8.68513 11.2208 8.66626 11.2292C8.64753 11.2375 8.62717 11.2416 8.60669 11.2419C8.58608 11.2423 8.56525 11.2389 8.54614 11.2312C8.5271 11.2235 8.5099 11.2116 8.49536 11.197C8.48081 11.1824 8.4689 11.1653 8.46118 11.1462C8.45344 11.1271 8.45008 11.1063 8.45044 11.0857C8.45081 11.0652 8.45485 11.0449 8.46313 11.0261L8.49927 10.9763L11.9368 7.53882H2.46216C2.42142 7.53882 2.38162 7.52267 2.35278 7.4939C2.32393 7.46505 2.30786 7.42532 2.30786 7.38452C2.30789 7.34388 2.32411 7.30492 2.35278 7.27612C2.38164 7.24727 2.42136 7.2312 2.46216 7.2312H11.9368L11.4114 6.70581L8.5061 3.80054C8.47779 3.77177 8.46216 3.73253 8.46216 3.69214C8.46218 3.67184 8.46626 3.65195 8.47388 3.63354L8.50708 3.58374C8.53587 3.55506 8.57484 3.53886 8.61548 3.53882Z" fill="white" stroke="white" stroke-width="0.615385" />
                            </svg>

                        </button>
                    </div>
                </div>
                <ColorPickerPopup
                    isOpen={showColorPicker}
                    onClose={() => setShowColorPicker(false)}
                    onColorSelect={handleColorSelect}
                />
            </>
        );
    }

    // Memory card
    if (card.type === 'Memory') {
        const images = card.images || [];
        const maxIndicators = Math.min(images.length, 3);

        return (
            <div
                className='relative flex rounded-[22px] overflow-hidden w-[calc(50%-11px)] sm:w-[calc(50%-11px)] md:w-[180px] lg:w-[180px] xl:w-[180px] h-[189px] md:h-[180px] group'
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Image carousel with fade transitions */}
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img src={image} alt={`${card.title}-${index}`} className='w-full h-full object-cover' />
                        {/* Shadow overlay layer matching Figma */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.22) 0%, rgba(0, 0, 0, 0.22) 100%), linear-gradient(180deg, rgba(2, 6, 23, 0.45) 0%, rgba(2, 6, 23, 0.00) 28.24%, rgba(2, 6, 23, 0.00) 48.41%, rgba(2, 6, 23, 0.45) 80.69%)'
                            }}
                        />
                    </div>
                ))}

                {/* Content overlay */}
                <div className='relative z-10 flex flex-col justify-between w-full h-full p-[11px_13px]'>
                    {/* Title at the top */}
                    <div className='flex items-center gap-[6px]'>
                        {/* Album icon */}
                        {(card.title === 'Mémoires' || card.title === 'Calendrier') && (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.29 11.968C17.2911 12.1426 17.2577 12.3158 17.1919 12.4776C17.126 12.6393 17.0289 12.7865 16.9062 12.9108C16.7834 13.035 16.6374 13.1339 16.4764 13.2017C16.3154 13.2695 16.1427 13.3049 15.968 13.306C15.7933 13.3051 15.6204 13.2697 15.4594 13.202C15.2983 13.1342 15.1521 13.0354 15.0293 12.9111C14.9064 12.7869 14.8092 12.6396 14.7433 12.4778C14.6774 12.316 14.644 12.1427 14.645 11.968C14.6441 11.7933 14.6776 11.6202 14.7436 11.4585C14.8096 11.2968 14.9068 11.1496 15.0296 11.0255C15.1525 10.9013 15.2986 10.8026 15.4596 10.7349C15.6206 10.6672 15.7934 10.6319 15.968 10.631C16.698 10.631 17.29 11.23 17.29 11.968Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1319 7.40796C17.2829 7.28796 16.1899 7.28796 14.8269 7.28796H9.17294C7.80994 7.28796 6.71694 7.28796 5.86794 7.40796C4.99094 7.53296 4.25994 7.79996 3.71594 8.42796C3.17294 9.05596 3.00594 9.82396 2.99994 10.721C2.99394 11.587 3.13894 12.683 3.31894 14.049L3.68394 16.821C3.82494 17.889 3.93894 18.754 4.11594 19.431C4.30094 20.135 4.57294 20.719 5.08394 21.171C5.59394 21.624 6.20394 21.82 6.91794 21.911C7.60494 22 8.46794 22 9.53294 22H14.4669C15.5319 22 16.3949 22 17.0819 21.912C17.7969 21.82 18.4049 21.624 18.9159 21.172C19.4269 20.719 19.6989 20.135 19.8839 19.431C20.0609 18.754 20.1749 17.889 20.3159 16.821L20.6809 14.049C20.8609 12.683 21.0059 11.587 20.9999 10.721C20.9929 9.82396 20.8279 9.05596 20.2839 8.42796C19.7399 7.79996 19.0089 7.53296 18.1319 7.40796ZM6.05194 8.73196C5.32594 8.83596 4.95794 9.02396 4.71194 9.30896C4.46394 9.59396 4.32794 9.98796 4.32194 10.73C4.31694 11.491 4.44794 12.494 4.63694 13.925L4.68694 14.304L5.05794 14.032C6.01794 13.329 7.43394 13.364 8.34594 14.127L11.7299 16.96C12.0499 17.228 12.6009 17.278 12.9989 17.044L13.2339 16.905C14.3589 16.243 15.8679 16.313 16.9059 17.095L18.7379 18.475C18.8279 17.98 18.9089 17.371 19.0109 16.6L19.3629 13.925C19.5519 12.495 19.6829 11.491 19.6769 10.73C19.6719 9.98796 19.5359 9.59396 19.2889 9.30996C19.0419 9.02396 18.6739 8.83596 17.9469 8.73196C17.2019 8.62596 16.2019 8.62496 14.7749 8.62496H9.22494C7.79794 8.62496 6.79694 8.62596 6.05194 8.73196Z" fill="white" />
                                <path d="M6.88001 4.5C5.62801 4.5 4.60101 5.34 4.25901 6.454L4.23901 6.524C4.59701 6.404 4.96901 6.324 5.34701 6.271C6.31901 6.132 7.54801 6.132 8.97601 6.132H15.178C16.606 6.132 17.835 6.132 18.808 6.271C19.185 6.324 19.558 6.403 19.916 6.524L19.896 6.454C19.553 5.34 18.526 4.5 17.276 4.5H6.88001Z" fill="white" />
                                <path d="M8.85894 2H15.1409C15.3499 2 15.5109 2 15.6509 2.015C16.1297 2.06826 16.5846 2.25251 16.9655 2.54748C17.3464 2.84246 17.6386 3.23675 17.8099 3.687H6.18994C6.3613 3.23675 6.65349 2.84246 7.03439 2.54748C7.41528 2.25251 7.87013 2.06826 8.34894 2.015C8.48894 2 8.64894 2 8.85894 2Z" fill="white" />
                            </svg>
                        )}
                        {card.title === 'Mes favoris' && (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 9.11901C2 14.2037 6.02 16.9128 8.962 19.3386C10 20.1939 11 21 12 21C13 21 14 20.1949 15.038 19.3375C17.981 16.9138 22 14.2037 22 9.12005C22 4.03641 16.5 0.428094 12 5.31725C7.5 0.428094 2 4.03432 2 9.11901Z" fill="white" />
                            </svg>
                        )}
                        {card.title === 'Urgences' && (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 11.75C12.1989 11.75 12.3897 11.829 12.5303 11.9697C12.671 12.1103 12.75 12.3011 12.75 12.5V13.25H13.5C13.6989 13.25 13.8897 13.329 14.0303 13.4697C14.171 13.6103 14.25 13.8011 14.25 14C14.25 14.1989 14.171 14.3897 14.0303 14.5303C13.8897 14.671 13.6989 14.75 13.5 14.75H12.75V15.5C12.75 15.6989 12.671 15.8897 12.5303 16.0303C12.3897 16.171 12.1989 16.25 12 16.25C11.8011 16.25 11.6103 16.171 11.4697 16.0303C11.329 15.8897 11.25 15.6989 11.25 15.5V14.75H10.5C10.3011 14.75 10.1103 14.671 9.96967 14.5303C9.82902 14.3897 9.75 14.1989 9.75 14C9.75 13.8011 9.82902 13.6103 9.96967 13.4697C10.1103 13.329 10.3011 13.25 10.5 13.25H11.25V12.5C11.25 12.3011 11.329 12.1103 11.4697 11.9697C11.6103 11.829 11.8011 11.75 12 11.75Z" fill="white" />
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.948 1.25C11.049 1.25 10.3 1.25 9.706 1.33C9.078 1.414 8.511 1.6 8.056 2.055C7.6 2.511 7.414 3.078 7.33 3.705C7.25 4.3 7.25 5.05 7.25 5.948V6.026C5.229 6.092 4.015 6.328 3.172 7.172C2 8.343 2 10.229 2 14C2 17.771 2 19.657 3.172 20.828C4.344 21.999 6.229 22 10 22H14C17.771 22 19.657 22 20.828 20.828C21.999 19.656 22 17.771 22 14C22 10.229 22 8.343 20.828 7.172C19.985 6.328 18.771 6.092 16.75 6.026V5.948C16.75 5.05 16.75 4.3 16.67 3.706C16.586 3.078 16.4 2.511 15.944 2.056C15.489 1.6 14.922 1.414 14.294 1.33C13.7 1.25 12.95 1.25 12.052 1.25H11.948ZM15.25 6.002V6C15.25 5.036 15.248 4.388 15.184 3.905C15.121 3.444 15.014 3.246 14.884 3.116C14.754 2.986 14.556 2.879 14.094 2.816C13.612 2.752 12.964 2.75 12 2.75C11.036 2.75 10.388 2.752 9.905 2.817C9.444 2.879 9.246 2.986 9.116 3.117C8.986 3.248 8.879 3.444 8.816 3.905C8.753 4.388 8.75 5.036 8.75 6V6.002C9.14133 6.00067 9.558 6 10 6H14C14.4413 6 14.858 6.00067 15.25 6.002ZM16 14C16 15.0609 15.5786 16.0783 14.8284 16.8284C14.0783 17.5786 13.0609 18 12 18C10.9391 18 9.92172 17.5786 9.17157 16.8284C8.42143 16.0783 8 15.0609 8 14C8 12.9391 8.42143 11.9217 9.17157 11.1716C9.92172 10.4214 10.9391 10 12 10C13.0609 10 14.0783 10.4214 14.8284 11.1716C15.5786 11.9217 16 12.9391 16 14Z" fill="white" />
                            </svg>
                        )}
                        <h3 className='text-base font-bold text-white font-bricolagegrotesque leading-[16px]'>
                            {card.title}
                        </h3>
                    </div>

                    {/* Bottom section with description, indicators and navigation */}
                    <div className='flex flex-col gap-[6px] w-full'>
                        {/* Description */}
                        {card.description && (
                            <p className='text-sm font-medium text-white font-vendsans leading-[16px] [text-shadow:0px_1px_6px_rgba(0,0,0,0.35)]'>
                                {card.description}
                            </p>
                        )}
                        {/* Indicators and navigation */}
                        <div className='flex items-center justify-between w-full'>
                            {/* Carousel indicators (3 dots) */}
                            <div className="flex items-center gap-[8px]">
                                {Array.from({ length: maxIndicators }).map((_, i) => {
                                    // Show active indicator based on current position
                                    // First dot = first image, second dot = middle images, third dot = last images
                                    let isActive = false;
                                    if (maxIndicators === 1) {
                                        isActive = true;
                                    } else if (maxIndicators === 2) {
                                        isActive = i === 0 ? currentImageIndex === 0 : currentImageIndex > 0;
                                    } else {
                                        // 3 indicators
                                        if (i === 0) {
                                            isActive = currentImageIndex === 0;
                                        } else if (i === 1) {
                                            isActive = currentImageIndex > 0 && currentImageIndex < images.length - 1;
                                        } else {
                                            isActive = currentImageIndex === images.length - 1;
                                        }
                                    }

                                    return (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                // Navigate to appropriate image
                                                if (maxIndicators === 1) {
                                                    setCurrentImageIndex(0);
                                                } else if (maxIndicators === 2) {
                                                    setCurrentImageIndex(i === 0 ? 0 : Math.floor(images.length / 2));
                                                } else {
                                                    // 3 indicators
                                                    if (i === 0) setCurrentImageIndex(0);
                                                    else if (i === 1) setCurrentImageIndex(Math.floor(images.length / 2));
                                                    else setCurrentImageIndex(images.length - 1);
                                                }
                                            }}
                                            className={`transition-all duration-300 rounded-full ${isActive
                                                ? "w-[40px] h-[10px] bg-white"      // Active = full bar
                                                : "w-[10px] h-[10px] bg-white/50"  // Inactive = small circle
                                                }`}
                                        />
                                    );
                                })}
                            </div>

                            {/* Navigation button to memory page */}
                            <button
                                onClick={card.onNavigate}
                                className="bg-black/40 border border-white rounded-full w-[32px] h-[32px] flex items-center justify-center hover:bg-black/60 transition-all duration-200"
                            >
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.61548 3.53882C8.6561 3.53882 8.69506 3.55512 8.72388 3.58374L12.4163 7.27612C12.445 7.30494 12.4611 7.34381 12.4612 7.38452C12.4612 7.42522 12.445 7.46409 12.4163 7.49292L8.72388 11.1853L8.71704 11.1931C8.70296 11.2082 8.68513 11.2208 8.66626 11.2292C8.64753 11.2375 8.62717 11.2416 8.60669 11.2419C8.58608 11.2423 8.56525 11.2389 8.54614 11.2312C8.5271 11.2235 8.5099 11.2116 8.49536 11.197C8.48081 11.1824 8.4689 11.1653 8.46118 11.1462C8.45344 11.1271 8.45008 11.1063 8.45044 11.0857C8.45081 11.0652 8.45485 11.0449 8.46313 11.0261L8.49927 10.9763L11.9368 7.53882H2.46216C2.42142 7.53882 2.38162 7.52267 2.35278 7.4939C2.32393 7.46505 2.30786 7.42532 2.30786 7.38452C2.30789 7.34388 2.32411 7.30492 2.35278 7.27612C2.38164 7.24727 2.42136 7.2312 2.46216 7.2312H11.9368L11.4114 6.70581L8.5061 3.80054C8.47779 3.77177 8.46216 3.73253 8.46216 3.69214C8.46218 3.67184 8.46626 3.65195 8.47388 3.63354L8.50708 3.58374C8.53587 3.55506 8.57484 3.53886 8.61548 3.53882Z" fill="white" stroke="white" stroke-width="0.615385" />
                                </svg>

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Icon card (with icon, number, and text)
    if (card.type === 'Icon') {
        return (
            <div className='bg-white rounded-[22px] overflow-hidden w-[calc(50%-11px)] sm:w-[calc(50%-11px)] md:w-[180px] lg:w-[180px] xl:w-[180px] h-[189px] md:h-[180px] p-[16px] pb-[22px] pt-[4px] flex flex-col items-center justify-center shadow-md'>
                {/* Icon */}
                {card.icon && (
                    <div className='mb-[-6px] w-[94px] h-[94px] relative'>
                        {card.icon}
                    </div>
                )}

                {/* Number and text */}
                <div className='flex flex-col items-center mb-[-6px] pb-[6px] text-center w-full'>
                    {card.number !== undefined && (
                        <p className='bg-nexastay-gradient bg-clip-text text-transparent text-4xl font-extrabold font-bricolagegrotesque leading-[48px]'>
                            {card.number}
                        </p>
                    )}
                    {card.text && (
                        <p className='text-lg font-semibold text-slate-700 font-bricolagegrotesque leading-[28px]'>
                            {card.text}
                        </p>
                    )}
                </div>
            </div>
        );
    }

    return null;
}

export default Cards
