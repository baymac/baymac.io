import Head from "next/head";
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContextProvider";
import { siteTitle } from '../../utils/info';
import Footer from "./Footer";
import Main from "./Main";
import Nav from "./Nav";
import styles from "./root.module.css";

export default function Root() {
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

  return (
    <div className={styles.root}>
      <Head>
        <link rel="icon" href="logo.svg" />
        {/* <meta name="theme-color" content="#ffffff" />
        <link rel="mask-icon" href="mask-icon.svg" color="#000000" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" /> */}
        <meta
          name="description"
          content="Parichay's personal website using Next.js"
        />
        <title>{siteTitle}</title>
      </Head>
      <Nav />
      <Main />
      <Footer />
    </div>
  );
}
