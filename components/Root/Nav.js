import { useState, createElement } from "react";
import {
  UilHome,
  UilUser,
  UilMessage,
  UilTimes,
  UilApps,
  UilMoon,
  UilSun,
} from "@iconscout/react-unicons";
import rootStyles from "./root.module.css";
import styles from "./nav.module.css";
import cn from "classnames";

const NavMenuItems = [
  {
    label: "Home",
    icon: UilHome,
    ref: "home",
  },
  {
    label: "About Me",
    icon: UilUser,
    ref: "aboutme",
  },
  {
    label: "Contact",
    icon: UilMessage,
    ref: "contact",
  },
];

export default function Nav({ darkMode, setDarkMode }) {
  const [navBarOpen, setNavBarOpen] = useState(false);

  return (
    <header className={rootStyles.header} id="header">
      <nav className={cn(styles.nav, rootStyles.container)}>
        <a href="#" className={styles.nav__logo}>
          Parichay
        </a>
        <div
          className={cn(styles.nav__menu, {
            [styles.show_menu]: navBarOpen,
          })}
          id="nav-menu"
        >
          <ul className={cn(rootStyles.grid, styles.nav__list)}>
            {NavMenuItems.map((NavMenuItem) => (
              <li className="nav__item" key={NavMenuItem.label}>
                <a
                  href={`#${NavMenuItem.ref}`}
                  className={styles.nav__link}
                  onClick={() => setNavBarOpen(false)}
                >
                  {createElement(NavMenuItem.icon, {
                    className: styles.nav__icon,
                  })}
                  {NavMenuItem.label}
                </a>
              </li>
            ))}
          </ul>
          <UilTimes
            className={styles.nav__close}
            onClick={() => setNavBarOpen(false)}
          />
        </div>
        <div className={styles.nav__btns}>
          {!darkMode && (
            <UilMoon
              className={cn(styles.changeTheme)}
              id="theme-button"
              onClick={() => setDarkMode(true)}
            ></UilMoon>
          )}
          {darkMode && (
            <UilSun
              className={cn(styles.changeTheme)}
              id="theme-button"
              onClick={() => setDarkMode(false)}
            ></UilSun>
          )}
          <UilApps
            className={styles.nav__toggle}
            id="nav_toggle"
            onClick={() => setNavBarOpen(true)}
          />
        </div>
      </nav>
    </header>
  );
}
