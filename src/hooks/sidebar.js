import React, { createContext, useCallback, useState, useContext } from 'react';

const SidebarContext = createContext({});

export const SidebarProvider = ({ children }) => {
  const [sidebarShow, setSidebarShow] = useState('responsive');

  const toggleSidebar = useCallback(type => {
    setSidebarShow(type);
  }, []);

  return (
    <SidebarContext.Provider value={{ sidebarShow, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within an SidebarProvider');
  }
  return context;
}
