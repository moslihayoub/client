import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchResult } from '../services/api';

interface ConversationResultsProps {
  results: SearchResult[];
  searchType?: string;
}

export default function ConversationResults({ results, searchType }: ConversationResultsProps) {
  const navigate = useNavigate();

  const handleViewAll = () => {
    // Determine tab based on search type
    let selectedTab = 'logement'; // default
    
    if (searchType === 'Hotel') {
      selectedTab = 'logement';
    } else if (searchType === 'Service') {
      selectedTab = 'service';
    } else if (searchType === 'Experience') {
      selectedTab = 'experience';
    } else if (searchType === 'Health') {
      selectedTab = 'sante';
    }

    navigate('/hotels', {
      state: {
        selectedTab: selectedTab,
        results: results,
      },
    });
  };

  const handleItemClick = (item: SearchResult) => {
    navigate(`/details/${item.id}`);
  };

  // Show max 3 results in conversation
  const displayResults = results.slice(0, 3);

  return (
    <div className="mt-4 space-y-3">
      <div className="grid grid-cols-1 gap-3">
        {displayResults.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item)}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-slate-200 hover:border-sky-300"
          >
            <div className="flex gap-4">
              {/* Image */}
              {item.images && item.images.length > 0 && (
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-200">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 text-sm sm:text-base font-bricolagegrotesque truncate">
                  {item.title}
                </h3>
                
                <div className="mt-1.5 flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                  {item.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span>{item.rating}</span>
                    </div>
                  )}
                  {item.city && (
                    <span className="truncate">{item.city}</span>
                  )}
                  {item.distance !== undefined && (
                    <span>{item.distance.toFixed(1)} km</span>
                  )}
                </div>

                {/* Price */}
                <div className="mt-2">
                  {item.type === 'Hotel' && item.pricePerNight && (
                    <span className="text-sky-600 font-semibold text-sm sm:text-base">
                      {item.pricePerNight} MAD{item.nbNuit ? ` × ${item.nbNuit} nuits` : '/nuit'}
                      {item.totalPrice && ` = ${item.totalPrice} MAD`}
                    </span>
                  )}
                  {item.type === 'Service' && item.minimumPrice && item.maximumPrice && (
                    <span className="text-sky-600 font-semibold text-sm sm:text-base">
                      {item.minimumPrice}-{item.maximumPrice} MAD
                    </span>
                  )}
                  {item.type === 'Service' && item.minimumPrice && !item.maximumPrice && (
                    <span className="text-sky-600 font-semibold text-sm sm:text-base">
                      À partir de {item.minimumPrice} MAD
                    </span>
                  )}
                  {item.type === 'Experience' && item.price && (
                    <span className="text-sky-600 font-semibold text-sm sm:text-base">
                      {item.price} MAD{item.nbPeople ? ` / ${item.nbPeople} pers.` : ''}
                    </span>
                  )}
                  {item.type === 'Health' && (
                    <span className="text-sky-600 font-semibold text-sm sm:text-base">
                      Service médical
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button - Always show if there are results */}
      {results.length > 0 && (
        <button
          onClick={handleViewAll}
          className="w-full mt-3 bg-sky-500 hover:bg-sky-600 text-white font-bricolagegrotesque font-semibold text-sm sm:text-base rounded-xl py-2.5 px-4 shadow-md transition-all duration-200 hover:shadow-lg"
        >
          Voir tous les résultats ({results.length})
        </button>
      )}
    </div>
  );
}

