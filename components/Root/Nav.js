import { useState, createElement } from "react";
import {
  UilHome,
  UilArrowLeft,
  UilMessage,
  UilTimes,
  UilApps,
  UilMoon,
  UilSun,
  UilPen,
} from "@iconscout/react-unicons";
import rootStyles from "./root.module.css";
import styles from "./nav.module.css";
import cn from "classnames";
import { useAppContext } from "../../context/AppContextProvider";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
  const [navBarOpen, setNavBarOpen] = useState(false);
  const { darkMode, setDarkMode } = useAppContext();

  const router = useRouter();

  return (<div className={styles.header}>
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
      <div
        className={cn(styles.nav__menu, {
          [styles.nav__show_menu]: navBarOpen,
        })}
        id="nav-menu"
      >
        <ul className={cn(rootStyles.grid, styles.nav__list)}>
          <li className="nav__item">
            <Link href="/">
              <a className={styles.nav__link}>
                <UilHome className={styles.nav__icon} />
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className={styles.nav__link}>
                <UilMessage className={styles.nav__icon} />
                About
              </a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a className={styles.nav__link}>
                <UilPen className={styles.nav__icon} />
                Blog
              </a>
            </Link>
          </li>
        </ul>
        <UilTimes
          className={styles.nav__close}
          onClick={() => setNavBarOpen(false)}
        />
      </div>
      <div className={styles.nav__btns}>
        {createElement(
          darkMode ? UilSun : UilMoon,
          {
            className: cn(styles.nav__changeTheme),
            id: "theme-button",
            onClick: () => setDarkMode(!darkMode),
          },
          null
        )}
        <UilApps
          className={styles.nav__toggle}
          id="nav_toggle"
          onClick={() => setNavBarOpen(true)}
        />
      </div>
    </nav>
  </div>
  );
}
