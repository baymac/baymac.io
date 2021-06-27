import { UilHome, UilMessage, UilPen } from "@iconscout/react-unicons";
import cn from "classnames";
import Link from "next/link";
import rootStyles from "../../styles/root.module.css";
import styles from "./navlink.module.css";

export default function NavBarLinks({ navBarOpen }: { navBarOpen?: boolean }) {
  return (
    <div className={cn(styles.nav__menu)} id="nav-menu">
      <ul className={cn(rootStyles.grid, styles.nav__list)}>
        <li>
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
    </div>
  );
}
