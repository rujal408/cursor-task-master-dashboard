import React, { createContext, useContext, useState, useEffect } from 'react';

type LayoutType = 'sidebar' | 'topnav';

interface LayoutContextProps {
  layoutType: LayoutType;
  setLayoutType: (type: LayoutType) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [layoutType, setLayoutTypeState] = useState<LayoutType>(() => {
    const saved = localStorage.getItem('layoutType');
    return saved === 'sidebar' || saved === 'topnav' ? saved : 'sidebar';
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const setLayoutType = (type: LayoutType) => {
    setLayoutTypeState(type);
    localStorage.setItem('layoutType', type);
  };

  useEffect(() => {
    localStorage.setItem('layoutType', layoutType);
  }, [layoutType]);

  return (
    <LayoutContext.Provider value={{ layoutType, setLayoutType, sidebarOpen, setSidebarOpen }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}; 