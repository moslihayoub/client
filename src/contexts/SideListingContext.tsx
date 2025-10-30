import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SideListingContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const SideListingContext = createContext<SideListingContextType | undefined>(undefined);

export const SideListingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <SideListingContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SideListingContext.Provider>
  );
};

export const useSideListing = () => {
  const context = useContext(SideListingContext);
  if (!context) {
    throw new Error('useSideListing must be used within a SideListingProvider');
  }
  return context;
};

