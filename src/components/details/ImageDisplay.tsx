import React, { useState } from "react";

interface ImageDisplayProps {
  images: string[];
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ images }) => {
  const [showAll, setShowAll] = useState(false);
  
  const displayImages = showAll ? images : images.slice(0, 6);
  const hasMore = images.length > 6;

  const getImageLayout = (index: number, total: number) => {
    // First image - large, takes full width
    if (index === 0) {
      return "col-span-2 row-span-2 h-96";
    }
    // Second and third images - medium height
    if (index === 1 || index === 2) {
      return "col-span-1 row-span-1 h-48";
    }
    // Fourth image - takes remaining right side space
    if (index === 3) {
      return "col-span-1 row-span-1 h-48";
    }
    // Fifth and sixth images - bottom row
    if (index === 4 || index === 5) {
      return "col-span-1 row-span-1 h-48";
    }
    // Additional images after clicking show more
    return "col-span-1 row-span-1 h-48";
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-3 gap-2 auto-rows-min">
        {displayImages.map((img, i) => (
          <div 
            key={i} 
            className={`relative overflow-hidden rounded-lg group ${getImageLayout(i, displayImages.length)}`}
          >
            <img
              src={img}
              alt={`Image ${i + 1}`}
              className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>
      
      {hasMore && !showAll && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Show More ({images.length - 6} more images)
          </button>
        </div>
      )}
      
      {showAll && hasMore && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(false)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;