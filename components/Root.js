import styles from "./root.module.css";
// import dynamic from "next/dynamic";
import { useState, createElement } from "react";
import {
  UilHome,
  UilUser,
  UilMessage,
  UilTimes,
  UilApps,
} from "@iconscout/react-unicons";
import cn from "classnames";
// const UilReact = dynamic(import("@iconscout/react-unicons/icons/uil-react"), {
//   ssr: false,
// });
import Head from "next/head";

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

export default function Root() {
  const [navBarOpen, setNavBarOpen] = useState(false);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Parichay's personal website using Next.js"
        />
      </Head>
      <header className={styles.header} id="header">
        <nav className={cn(styles.nav, styles.container)}>
          <a href="#" className={styles.nav__logo}>
            Parichay
          </a>
          <div
            className={cn(styles.nav__menu, {
              [styles.show_menu]: navBarOpen,
            })}
            id="nav-menu"
          >
            <ul className={cn(styles.nav__list, styles.grid)}>
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
          <div className="nav__btns">
            <div
              className={cn(styles.nav__toggle)}
              id="nav_toggle"
              onClick={() => setNavBarOpen(true)}
            >
              <UilApps size="25" color="#61DAFB" />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
