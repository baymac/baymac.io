import Head from "next/head";
import Footer from "./Footer";
import Main from "./Main";
import Nav from "./Nav";
import styles from "./root.module.css";
import { useState, useEffect } from "react";

export default function Root() {
  const [darkMode, setDarkMode] = useState(false);

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
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Parichay's personal website using Next.js"
        />
      </Head>
      <Nav darkMode={darkMode} setDarkMode={setDarkMode} />
      <Main />
      <Footer />
    </div>
  );
}
