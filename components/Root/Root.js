import Head from "next/head";
import useDarkMode̦ from '../../hooks/useDarkMode';
import useKeyboardShortcut from '../../hooks/useKeyBoardShortCut';
import { siteTitle } from '../../utils/info';
import Footer from "./Footer";
import Home from "./Home";
import Nav from "./Nav";
import styles from "./root.module.css";

export default function Root() {
  useDarkMode̦()

  useKeyboardShortcut(['Shift', 'H'], () => setDarkMode, { overrideSystem: false })

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
      <Home />
      <Footer />
    </div>
  );
}
