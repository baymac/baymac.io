'use client';

import cn from 'classnames';
import { FocusTrap } from 'focus-trap-react';
import { usePathname } from 'next/navigation';
import { type KeyboardEvent, useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContextProvider';
import usePreventScroll from '../../hooks/usePreventScroll';
import NavbarLinks from './NavbarLinks';
import styles from './navlink.module.css';

export default function NavLinkMobile() {
  const { navBarOpen, setNavBarOpen } = useAppContext();
  const pathname = usePathname();
  const lastPathnameRef = useRef(pathname);

  usePreventScroll(navBarOpen);

  // Close on route change.
  useEffect(() => {
    if (lastPathnameRef.current !== pathname) {
      lastPathnameRef.current = pathname;
      if (navBarOpen) setNavBarOpen(false);
    }
  }, [pathname, navBarOpen, setNavBarOpen]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape') return;
    event.stopPropagation();
    setNavBarOpen(false);
  };

  const menu = (
    // biome-ignore lint/a11y/noStaticElementInteractions: drawer captures Escape for dismiss
    <div
      className={cn(styles.nav__menu, {
        [styles.nav__mobile_menu]: navBarOpen,
        [styles.nav__menu_hidden]: !navBarOpen,
      })}
      onKeyDown={handleKeyDown}
    >
      <NavbarLinks />
    </div>
  );

  return (
    <div className={styles.nav__mobile_menu_wrapper}>
      {navBarOpen ? <FocusTrap>{menu}</FocusTrap> : menu}
    </div>
  );
}
