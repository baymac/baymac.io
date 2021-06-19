import { useAppContext } from "../context/AppContextProvider";
import { useEffect } from "react";

const useDarkMode = () => {
    const { darkMode, setDarkMode } = useAppContext()

    useEffect(() => {
        if (localStorage.getItem("theme") === "dark_theme") {
            document.querySelector("body").classList.add("dark_theme");
            setDarkMode(true);
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            localStorage.setItem("theme", "dark_theme");
            document.querySelector("body").classList.add("dark_theme");
        } else {
            localStorage.removeItem("theme");
            document.querySelector("body").classList.remove("dark_theme");
        }
    }, [darkMode]);

    return [darkMode, setDarkMode]
}

export default useDarkMode
