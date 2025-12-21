import React, { createContext, useContext, useState, ReactNode } from 'react';
import { HotelCardProps, ServiceCardProps, ExperienceCardProps, HealthCardProps } from '../components/HoltelCard';

interface FavoriteItem {
  id: string | number; // Support both UUID strings and numeric IDs
  type: 'Hotel' | 'Service' | 'Experience' | 'Health';
  hotel?: HotelCardProps;
  service?: ServiceCardProps;
  experience?: ExperienceCardProps;
  health?: HealthCardProps;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: string | number, type: 'Hotel' | 'Service' | 'Experience' | 'Health') => void;
  isFavorite: (id: string | number, type: 'Hotel' | 'Service' | 'Experience' | 'Health') => boolean;
  toggleFavorite: (item: FavoriteItem) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addFavorite = (item: FavoriteItem) => {
    setFavorites(prev => {
      // Check if already exists (by both id AND type)
      if (prev.some(fav => fav.id === item.id && fav.type === item.type)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFavorite = (id: string | number, type: 'Hotel' | 'Service' | 'Experience' | 'Health') => {
    setFavorites(prev => prev.filter(fav => !(fav.id === id && fav.type === type)));
  };

  const isFavorite = (id: string | number, type: 'Hotel' | 'Service' | 'Experience' | 'Health') => {
    return favorites.some(fav => fav.id === id && fav.type === type);
  };

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.id, item.type)) {
      removeFavorite(item.id, item.type);
    } else {
      addFavorite(item);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

