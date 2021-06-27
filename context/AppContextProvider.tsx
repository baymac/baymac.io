import React, { useState, createContext, useContext, ReactNode } from "react";

const AppContext = createContext({});

export function useAppContext() {
  return useContext(AppContext);
}

export interface IAppContextValues {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  navBarOpen: boolean;
  setNavBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AppContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

  const [navBarOpen, setNavBarOpen] = useState(false);

  const value: IAppContextValues = {
    darkMode,
    setDarkMode,
    navBarOpen,
    setNavBarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
