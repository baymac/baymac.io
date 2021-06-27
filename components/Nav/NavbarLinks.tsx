import { UilHome, UilMessage, UilPen } from "@iconscout/react-unicons";
import cn from "classnames";
import Link from "next/link";
import { useAppContext } from "../../context/AppContextProvider";
import styles from "./navlink.module.css";

export default function NavBarLinks() {
  // @ts-ignore
  const { navBarOpen, setNavBarOpen } = useAppContext();

  return (
    <div className={styles.nav__mobile_menu_wrapper}>
      <div
        className={cn(styles.nav__menu, {
          [styles.nav__mobile_menu]: navBarOpen,
          [styles.nav__menu_hidden]: !navBarOpen,
        })}
        id="nav-menu"
      >
        <ul className={cn(styles.nav__list)}>
          <li className={styles.nav__item}>
            <Link href="/">
              <a
                className={styles.nav__link}
                onClick={() => setNavBarOpen(false)}
              >
                <UilHome className={styles.nav__icon} />
                Home
              </a>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link href="/about">
              <a
                className={styles.nav__link}
                onClick={() => setNavBarOpen(false)}
              >
                <UilMessage className={styles.nav__icon} />
                About
              </a>
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link href="/blog">
              <a
                className={styles.nav__link}
                onClick={() => setNavBarOpen(false)}
              >
                <UilPen className={styles.nav__icon} />
                Blog
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
