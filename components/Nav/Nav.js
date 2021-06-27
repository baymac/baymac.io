import {
  UilApps, UilArrowLeft, UilMoon,
  UilSun, UilMultiply
} from "@iconscout/react-unicons";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { createElement, useState } from "react";
import { useAppContext } from "../../context/AppContextProvider";
import rootStyles from "../../styles/root.module.css";
import styles from "./nav.module.css";
import NavBarLinks from './NavBarLinks'

export default function Nav() {
  const [navBarOpen, setNavBarOpen] = useState(false);
  const { darkMode, setDarkMode } = useAppContext();

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

          <NavBarLinks />
          <div className={styles.nav__btns}>
            {createElement(
              darkMode ? UilSun : UilMoon,
              {
                className: cn(styles.nav__changeTheme),
                id: "theme-button",
                onClick: () => setDarkMode(!darkMode),
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
      {navBarOpen && <div className={styles.nav__mobile_menu}>
        <NavBarLinks />
      </div>}
    </>
  );
}
