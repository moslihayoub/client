import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AssistantContextType {
  isAssistantOpen: boolean;
  setIsAssistantOpen: (isOpen: boolean) => void;
  toggleAssistant: () => void;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error('useAssistant must be used within AssistantProvider');
  }
  return context;
};

interface AssistantProviderProps {
  children: ReactNode;
}

export const AssistantProvider: React.FC<AssistantProviderProps> = ({ children }) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const toggleAssistant = () => {
    setIsAssistantOpen((prev) => !prev);
  };

  return (
    <AssistantContext.Provider
      value={{
        isAssistantOpen,
        setIsAssistantOpen,
        toggleAssistant,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
};

export default AssistantContext;

