import React, { useState, useRef } from 'react'

interface ImgDetailsProps {
  images: string[];
  onImageClick?: (index: number) => void;
}
function ImgDetails({ images, onImageClick }: ImgDetailsProps) {
  const [showAll, setShowAll] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [mouseStart, setMouseStart] = useState(0);
  const [mouseEnd, setMouseEnd] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const displayedImages = showAll ? images : images.slice(0, 6);
  const remainingCount = images.length - 6;

  // Touch handlers for mobile carousel
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

    if (isLeftSwipe && currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      // Scroll to the new index
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: newIndex * scrollContainerRef.current.clientWidth,
          behavior: 'smooth'
        });
      }
    }
    if (isRightSwipe && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      // Scroll to the new index
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: newIndex * scrollContainerRef.current.clientWidth,
          behavior: 'smooth'
        });
      }
    }
    // Reset touch values
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Mouse handlers for desktop carousel swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setMouseStart(e.clientX);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;
    setMouseEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isMouseDown) return;
    if (!mouseStart || !mouseEnd) {
      setIsMouseDown(false);
      return;
    }
    const distance = mouseStart - mouseEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      // Scroll to the new index
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: newIndex * scrollContainerRef.current.clientWidth,
          behavior: 'smooth'
        });
      }
    }
    if (isRightSwipe && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      // Scroll to the new index
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: newIndex * scrollContainerRef.current.clientWidth,
          behavior: 'smooth'
        });
      }
    }
    // Reset mouse values
    setIsMouseDown(false);
    setMouseStart(0);
    setMouseEnd(0);
  };

  const handleMouseLeave = () => {
    // Reset on mouse leave to prevent stuck state
    setIsMouseDown(false);
    setMouseStart(0);
    setMouseEnd(0);
  };

  // One indicator per image

  const renderImageRow = (imageSlice: string[], startIndex: number, isSecondRow: boolean = false) => {
    return (
      <div className='flex flex-row gap-[8px] w-full h-[305px] sm:h-[200px] md:h-[200px] lg:h-[305px] xl:h-[305px] rounded-[26px] overflow-hidden'>
        {imageSlice.map((image, index) => {
          const actualIndex = startIndex + index;
          let widthClass = '';
          if (isSecondRow) {
            widthClass = index === 0 ? 'w-[32%]' : index === 1 ? 'w-[25%]' : 'w-[43%]';
          } else {
            widthClass = index === 0 ? 'w-[32%]' : index === 1 ? 'w-[36%]' : 'w-[32%]';
          }
          return (
            <div 
              key={actualIndex} 
              className={`${widthClass} h-[305px] sm:h-[200px] md:h-[200px] lg:h-[305px] xl:h-[305px] rounded-[26px] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity`}
              onClick={() => onImageClick?.(actualIndex)}
            >
              <img src={image} alt={`Image ${actualIndex}`} className='w-full h-full object-cover' />
            </div>
          );
        })}
      </div>
    );
  };

  const renderImageGroups = () => {
    const groups = [];
    for (let i = 0; i < displayedImages.length; i += 6) {
      const group = displayedImages.slice(i, i + 6);
      const firstRow = group.slice(0, 3);
      const secondRow = group.slice(3, 6);

      groups.push(
        <div key={i} className='flex flex-col gap-[8px] w-full'>
          {firstRow.length > 0 && renderImageRow(firstRow, i, false)}
          {secondRow.length > 0 && renderImageRow(secondRow, i + 3, true)}
        </div>
      );
    }
    return groups;
  };

  return (
    <div className='w-full flex flex-col gap-[8px] items-center justify-center'>
      {/* Mobile carousel view (sm devices only) */}
      <div className='sm:block md:hidden lg:hidden xl:hidden w-full'>
        <div
          className='relative w-full h-[254px] rounded-[26px] overflow-hidden cursor-grab active:cursor-grabbing'
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {/* Images container with horizontal scroll - showing all images */}
          <div
            ref={scrollContainerRef}
            className='flex flex-row gap-[8px] h-full overflow-x-auto scrollbar-hide'
            style={{
              scrollSnapType: 'x mandatory',
              touchAction: 'pan-x',
            }}
            onScroll={(e) => {
              const container = e.currentTarget;
              const scrollLeft = container.scrollLeft;
              const imageWidth = container.clientWidth;
              const newIndex = Math.round(scrollLeft / imageWidth);
              if (newIndex !== currentIndex && newIndex >= 0 && newIndex < images.length) {
                setCurrentIndex(newIndex);
              }
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className='flex-shrink-0 w-full h-full rounded-[26px] overflow-hidden'
                style={{
                  scrollSnapAlign: 'start',
                  minWidth: '100%'
                }}
              >
                <img
                  src={image}
                  alt={`Image ${index}`}
                  className="w-full h-full object-cover rounded-[26px] select-none"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
            ))}
          </div>

          {/* Indicators at the bottom - one per image */}
          <div className='absolute bottom-[16px] left-1/2 -translate-x-1/2 flex items-center gap-[8px] z-10'>
            {images.map((_, i) => {
              const isActive = i === currentIndex;

              return (
                <button
                  key={i}
                  onClick={() => {
                    // Navigate to specific image
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollTo({
                        left: i * scrollContainerRef.current.clientWidth,
                        behavior: 'smooth'
                      });
                      setCurrentIndex(i);
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
        </div>
      </div>

      {/* Desktop grid view (md and above) */}
      <div className='hidden md:flex lg:flex xl:flex flex-col gap-[8px] items-center justify-center w-full'>
        {renderImageGroups()}
        {images.length > 6 && !showAll && (
          <div className='flex gap-[10px] items-center justify-end w-full mt-[8px] '>
            <button
              onClick={() => setShowAll(true)}
              className='bg-slate-200 hover:bg-slate-300 rounded-xl px-[29px] py-[12px] flex gap-[12px] items-center justify-center transition-colors duration-200'
            >
              <p className='text-base font-medium text-slate-700 font-bricolagegrotesque'>
                Voir plus de photos
              </p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.9692 11.1309C16.4172 11.1315 16.7905 11.501 16.7905 11.9678H16.7896L16.7905 11.9707C16.7912 12.0797 16.7701 12.1881 16.729 12.2891C16.6879 12.39 16.6269 12.4821 16.5503 12.5596C16.4738 12.6369 16.383 12.6989 16.2827 12.7412C16.183 12.7832 16.0755 12.8037 15.9673 12.8047C15.8594 12.8037 15.7523 12.7831 15.6528 12.7412C15.5525 12.699 15.4618 12.6369 15.3853 12.5596C15.3086 12.482 15.2477 12.39 15.2065 12.2891C15.1654 12.1881 15.1444 12.0798 15.145 11.9707V11.9648C15.1445 11.856 15.1655 11.7482 15.2065 11.6475C15.2477 11.5465 15.3086 11.4544 15.3853 11.377C15.4619 11.2995 15.5534 11.2375 15.6538 11.1953C15.7537 11.1534 15.8609 11.1316 15.9692 11.1309Z" stroke="#334155" />
                <path d="M9.17261 7.78809H14.8269C16.2036 7.78809 17.2553 7.78948 18.0613 7.90332C18.8808 8.02013 19.4739 8.25708 19.906 8.75586C20.2845 9.19292 20.4501 9.72834 20.49 10.4189L20.4998 10.7246C20.5055 11.5479 20.3671 12.6037 20.1853 13.9834L19.8201 16.7559C19.6776 17.8352 19.5673 18.6639 19.4001 19.3037C19.2498 19.8758 19.0503 20.3133 18.7292 20.6562L18.5847 20.7979C18.228 21.1134 17.8023 21.2849 17.2585 21.3799L17.0183 21.416C16.3702 21.499 15.5436 21.5 14.4666 21.5H9.53296C8.4557 21.5 7.6299 21.499 6.98218 21.415H6.9812C6.32089 21.3309 5.82193 21.1576 5.41577 20.7969H5.41479C5.00687 20.436 4.77121 19.9577 4.59937 19.3037C4.4322 18.6639 4.32193 17.8351 4.17944 16.7559L3.81421 13.9834C3.6324 12.6037 3.49406 11.5479 3.49976 10.7246C3.50538 9.8845 3.66201 9.25505 4.09448 8.75488L4.09351 8.75391C4.47142 8.31801 4.97347 8.08346 5.64136 7.95312L5.93823 7.90332C6.54276 7.8179 7.2855 7.7957 8.19995 7.79004L9.17261 7.78809ZM9.22534 8.125C7.99078 8.125 7.03709 8.12511 6.28979 8.2002L5.9812 8.2373C5.19863 8.34941 4.69247 8.56701 4.33472 8.98047C3.97526 9.39356 3.82853 9.92755 3.82202 10.7256V10.7266C3.81674 11.5304 3.95437 12.5744 4.14136 13.9902L4.19116 14.3691L4.30151 15.2061L4.98218 14.707L5.35327 14.4355C6.13092 13.8661 7.29256 13.8978 8.02515 14.5107L11.4089 17.3438C11.8969 17.7523 12.6791 17.8128 13.2527 17.4756L13.2537 17.4746L13.4861 17.335L13.4871 17.3359C14.4425 16.7737 15.733 16.837 16.6052 17.4941L18.4373 18.874L19.0847 19.3623L19.2302 18.5645C19.3228 18.0551 19.4052 17.4327 19.5066 16.666V16.665L19.8591 13.9902L19.8582 13.9893C20.0217 12.7517 20.148 11.7971 20.1726 11.0391L20.1765 10.7266C20.1711 9.92893 20.0247 9.39561 19.6667 8.9834H19.6677C19.3538 8.61996 18.927 8.4069 18.2996 8.28418L18.0173 8.2373L17.7097 8.2002C16.9626 8.12505 16.0099 8.125 14.7751 8.125H9.22534Z" fill="#475569" stroke="#334155" />
                <path d="M6.87964 5H17.2761C17.9588 5.00003 18.5624 5.3092 18.9714 5.79004C18.9401 5.78528 18.908 5.77979 18.8767 5.77539C17.8611 5.63055 16.5923 5.63184 15.1785 5.63184H8.97632C7.56186 5.63184 6.29208 5.63036 5.2771 5.77539C5.24549 5.77982 5.21399 5.78523 5.18237 5.79004C5.59113 5.3092 6.19539 5.00011 6.87964 5Z" fill="#475569" stroke="#334155" />
                <path d="M8.85894 2H15.1409C15.3499 2 15.5109 2 15.6509 2.015C16.1297 2.06826 16.5846 2.25251 16.9655 2.54748C17.3464 2.84246 17.6386 3.23675 17.8099 3.687H6.18994C6.3613 3.23675 6.65349 2.84246 7.03439 2.54748C7.41528 2.25251 7.87013 2.06826 8.34894 2.015C8.48894 2 8.64894 2 8.85894 2Z" fill="#475569" />
              </svg>
            </button>
          </div>
        )}
        {images.length > 6 && showAll && (
          <div className='flex gap-[10px] items-center justify-end w-full mt-[8px]'>
            <button
              onClick={() => setShowAll(false)}
              className='bg-slate-200 hover:bg-slate-300 rounded-xl px-[29px] py-[12px] flex gap-[12px] items-center justify-center transition-colors duration-200'
            >
              <p className='text-base font-medium text-slate-700 font-bricolagegrotesque'>
                Afficher moins
              </p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.9692 11.1309C16.4172 11.1315 16.7905 11.501 16.7905 11.9678H16.7896L16.7905 11.9707C16.7912 12.0797 16.7701 12.1881 16.729 12.2891C16.6879 12.39 16.6269 12.4821 16.5503 12.5596C16.4738 12.6369 16.383 12.6989 16.2827 12.7412C16.183 12.7832 16.0755 12.8037 15.9673 12.8047C15.8594 12.8037 15.7523 12.7831 15.6528 12.7412C15.5525 12.699 15.4618 12.6369 15.3853 12.5596C15.3086 12.482 15.2477 12.39 15.2065 12.2891C15.1654 12.1881 15.1444 12.0798 15.145 11.9707V11.9648C15.1445 11.856 15.1655 11.7482 15.2065 11.6475C15.2477 11.5465 15.3086 11.4544 15.3853 11.377C15.4619 11.2995 15.5534 11.2375 15.6538 11.1953C15.7537 11.1534 15.8609 11.1316 15.9692 11.1309Z" stroke="#334155" />
                <path d="M9.17261 7.78809H14.8269C16.2036 7.78809 17.2553 7.78948 18.0613 7.90332C18.8808 8.02013 19.4739 8.25708 19.906 8.75586C20.2845 9.19292 20.4501 9.72834 20.49 10.4189L20.4998 10.7246C20.5055 11.5479 20.3671 12.6037 20.1853 13.9834L19.8201 16.7559C19.6776 17.8352 19.5673 18.6639 19.4001 19.3037C19.2498 19.8758 19.0503 20.3133 18.7292 20.6562L18.5847 20.7979C18.228 21.1134 17.8023 21.2849 17.2585 21.3799L17.0183 21.416C16.3702 21.499 15.5436 21.5 14.4666 21.5H9.53296C8.4557 21.5 7.6299 21.499 6.98218 21.415H6.9812C6.32089 21.3309 5.82193 21.1576 5.41577 20.7969H5.41479C5.00687 20.436 4.77121 19.9577 4.59937 19.3037C4.4322 18.6639 4.32193 17.8351 4.17944 16.7559L3.81421 13.9834C3.6324 12.6037 3.49406 11.5479 3.49976 10.7246C3.50538 9.8845 3.66201 9.25505 4.09448 8.75488L4.09351 8.75391C4.47142 8.31801 4.97347 8.08346 5.64136 7.95312L5.93823 7.90332C6.54276 7.8179 7.2855 7.7957 8.19995 7.79004L9.17261 7.78809ZM9.22534 8.125C7.99078 8.125 7.03709 8.12511 6.28979 8.2002L5.9812 8.2373C5.19863 8.34941 4.69247 8.56701 4.33472 8.98047C3.97526 9.39356 3.82853 9.92755 3.82202 10.7256V10.7266C3.81674 11.5304 3.95437 12.5744 4.14136 13.9902L4.19116 14.3691L4.30151 15.2061L4.98218 14.707L5.35327 14.4355C6.13092 13.8661 7.29256 13.8978 8.02515 14.5107L11.4089 17.3438C11.8969 17.7523 12.6791 17.8128 13.2527 17.4756L13.2537 17.4746L13.4861 17.335L13.4871 17.3359C14.4425 16.7737 15.733 16.837 16.6052 17.4941L18.4373 18.874L19.0847 19.3623L19.2302 18.5645C19.3228 18.0551 19.4052 17.4327 19.5066 16.666V16.665L19.8591 13.9902L19.8582 13.9893C20.0217 12.7517 20.148 11.7971 20.1726 11.0391L20.1765 10.7266C20.1711 9.92893 20.0247 9.39561 19.6667 8.9834H19.6677C19.3538 8.61996 18.927 8.4069 18.2996 8.28418L18.0173 8.2373L17.7097 8.2002C16.9626 8.12505 16.0099 8.125 14.7751 8.125H9.22534Z" fill="#475569" stroke="#334155" />
                <path d="M6.87964 5H17.2761C17.9588 5.00003 18.5624 5.3092 18.9714 5.79004C18.9401 5.78528 18.908 5.77979 18.8767 5.77539C17.8611 5.63055 16.5923 5.63184 15.1785 5.63184H8.97632C7.56186 5.63184 6.29208 5.63036 5.2771 5.77539C5.24549 5.77982 5.21399 5.78523 5.18237 5.79004C5.59113 5.3092 6.19539 5.00011 6.87964 5Z" fill="#475569" stroke="#334155" />
                <path d="M8.85894 2H15.1409C15.3499 2 15.5109 2 15.6509 2.015C16.1297 2.06826 16.5846 2.25251 16.9655 2.54748C17.3464 2.84246 17.6386 3.23675 17.8099 3.687H6.18994C6.3613 3.23675 6.65349 2.84246 7.03439 2.54748C7.41528 2.25251 7.87013 2.06826 8.34894 2.015C8.48894 2 8.64894 2 8.85894 2Z" fill="#475569" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImgDetails