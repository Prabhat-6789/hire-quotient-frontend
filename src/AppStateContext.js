import React, { createContext, useContext, useState,useEffect } from 'react';

const AppStateContext = createContext();

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

 
export const AppStateProvider = ({ children }) => {
     const [visibleData,setVisibleData] = useState([]);

  const state = {
    visibleData,
    setVisibleData
  };

  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};