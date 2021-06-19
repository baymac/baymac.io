import React, { useState, createContext, useContext } from "react";

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export default function AppContextProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    const value = {
        darkMode,
        setDarkMode,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
