import {
  UilApps, UilArrowLeft, UilMoon, UilMultiply, UilSun
} from "@iconscout/react-unicons";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { createElement, useEffect } from "react";
import { useAppContext } from "../../context/AppContextProvider";
import rootStyles from "../../styles/root.module.css";
import styles from "./nav.module.css";
import NavLinkMobile from './NavLinkMobile.tsx';
import NavLinkBigScreen from './NavLinkBigScreen.tsx';
import { useTheme } from 'next-themes';

export default function Nav() {
  const { navBarOpen, setNavBarOpen } = useAppContext();

  const { theme, setTheme } = useTheme()


  useEffect(() => {
    if (navBarOpen) {
      document.querySelector("body").classList.add('mobile-menu-visible')
    } else {
      document.querySelector("body").classList.remove('mobile-menu-visible')
    }
  }, [navBarOpen])

  const router = useRouter();

  return (
    <>
      <header className={styles.header}>
        <nav className={cn(styles.nav, rootStyles.container)}>
          {!router.pathname.startsWith("/posts") && (
            <Link href="/">
              <a className={styles.nav__logo}>PB</a>
            </Link>
          )}
          {router.pathname.startsWith("/posts") && (
            <Link href={`/blog`}>
              <a className={styles.nav__logo}>
                <UilArrowLeft />
              </a>
            </Link>
          )}
          <NavLinkBigScreen />
          <div className={styles.nav__btns}>
            {createElement(
              theme === 'dark' ? UilSun : UilMoon,
              {
                className: cn(styles.nav__changeTheme),
                id: "theme-button",
                onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'),
                width: 30,
                height: 30
              },
              null
            )}
            {!navBarOpen && <UilApps
              className={styles.nav__toggle}
              id="nav_toggle"
              onClick={() => setNavBarOpen(true)}
              width={30}
              height={30}
            />}
            {navBarOpen && <UilMultiply
              className={styles.nav__toggle}
              width={30}
              height={30}
              id="nav_toggle"
              onClick={() => setNavBarOpen(false)}
            />}
          </div>
        </nav>
      </header>
      <NavLinkMobile />
    </>
  );
}
