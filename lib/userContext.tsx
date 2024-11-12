"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { USER_TYPE } from '@/constants/USER_TYPE'

// Define the structure of your global state
interface GlobalStateContextType {
  user: {name: string, type: USER_TYPE, password: string}| null;
  setUser: React.Dispatch<React.SetStateAction<{name: string, type: USER_TYPE, password: string} | null>>;
}

// Create the context with an undefined initial value
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

// Define the provider component
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{name: string, type: USER_TYPE, password: string} | null>(null);

  return (
    <GlobalStateContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Create a custom hook to access the context
export const useGlobalState = (): GlobalStateContextType => {
  const context = useContext(GlobalStateContext);

  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }

  return context;
};
