import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NoteModalContextType {
  isNoteModalOpen: boolean;
  setIsNoteModalOpen: (isOpen: boolean) => void;
  openNoteModal: () => void;
  closeNoteModal: () => void;
}

const NoteModalContext = createContext<NoteModalContextType | undefined>(undefined);

export const useNoteModal = () => {
  const context = useContext(NoteModalContext);
  if (!context) {
    throw new Error('useNoteModal must be used within NoteModalProvider');
  }
  return context;
};

interface NoteModalProviderProps {
  children: ReactNode;
}

export const NoteModalProvider: React.FC<NoteModalProviderProps> = ({ children }) => {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const openNoteModal = () => {
    setIsNoteModalOpen(true);
  };

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
  };

  return (
    <NoteModalContext.Provider
      value={{
        isNoteModalOpen,
        setIsNoteModalOpen,
        openNoteModal,
        closeNoteModal,
      }}
    >
      {children}
    </NoteModalContext.Provider>
  );
};

export default NoteModalContext;

