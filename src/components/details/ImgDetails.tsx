import React, { useState } from 'react'

interface ImgDetailsProps {
    images: string[];
}
function ImgDetails({ images }: ImgDetailsProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedImages = showAll ? images : images.slice(0, 6);
  const remainingCount = images.length - 6;

  const renderImageRow = (imageSlice: string[], startIndex: number, isSecondRow: boolean = false) => {
    return (
      <div className='flex flex-row gap-[8px] w-full h-[305px] rounded-[26px] overflow-hidden'>
        {imageSlice.map((image, index) => {
          const actualIndex = startIndex + index;
          let widthClass = '';
          if (isSecondRow) {
            widthClass = index === 0 ? 'w-[32%]' : index === 1 ? 'w-[25%]' : 'w-[43%]';
          } else {
            widthClass = index === 0 ? 'w-[32%]' : index === 1 ? 'w-[36%]' : 'w-[32%]';
          }
          return (
            <div key={actualIndex} className={`${widthClass} h-[305px] rounded-[26px] overflow-hidden`}>
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
      {renderImageGroups()}
      {images.length > 6 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className='w-full h-[48px] bg-slate-200 hover:bg-slate-300 rounded-[26px] flex items-center justify-center transition-colors duration-200 mt-2'
        >
          <p className='text-sm font-normal text-slate-700 font-outfit'>
            Afficher {remainingCount} image{remainingCount > 1 ? 's' : ''} de plus
          </p>
        </button>
      )}
      {images.length > 6 && showAll && (
        <button
          onClick={() => setShowAll(false)}
          className='w-full h-[48px] bg-slate-200 hover:bg-slate-300 rounded-[26px] flex items-center justify-center transition-colors duration-200 mt-2'
        >
          <p className='text-sm font-normal text-slate-700 font-outfit'>
            Afficher moins
          </p>
        </button>
      )}
    </div>
  )
}

export default ImgDetails