'use client';

import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useAppContext } from '../../context/AppContextProvider';
import NavbarLinks from './NavbarLinks';
import styles from './navlink.module.css';

/**
 * Mobile-only drawer. No FocusTrap — mobile users primarily interact via
 * tap, and FocusTrap (even with allowOutsideClick) was eating the second
 * click event on webkit/mobile, breaking the close button + escape (B7).
 *
 * Dismissal paths:
 *   - X button in the Nav header (its own onClick → setNavBarOpen(false))
 *   - Escape key → window-level keydown listener below
 *   - Click any nav link → route change → useEffect below closes
 *   - Click theme toggle → also outside drawer, fires its own handler
 *
 * For keyboard-only desktop users the desktop nav (NavLinkBigScreen) is
 * always visible at >=600px, so the drawer + its focus management aren't
 * relevant there.
 */
export default function NavLinkMobile() {
  const { navBarOpen, setNavBarOpen } = useAppContext();
  const pathname = usePathname();
  const lastPathnameRef = useRef(pathname);

  // Body scroll lock ONLY — do NOT aria-hide #app-root, because the Nav
  // header (which holds the X close button) lives inside #app-root. Hiding
  // it would make the close button unreachable for assistive tech AND for
  // Playwright's getByRole (which is what was breaking the regression
  // test). The drawer is part of the nav, not a layered modal — hiding
  // the rest of the page from screen readers isn't appropriate here.
  useEffect(() => {
    if (!navBarOpen) return;
    document.body.classList.add('prevent-scroll');
    return () => document.body.classList.remove('prevent-scroll');
  }, [navBarOpen]);

  // Close on route change.
  useEffect(() => {
    if (lastPathnameRef.current !== pathname) {
      lastPathnameRef.current = pathname;
      if (navBarOpen) setNavBarOpen(false);
    }
  }, [pathname, navBarOpen, setNavBarOpen]);

  // Escape closes the drawer from anywhere on the page.
  useEffect(() => {
    if (!navBarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavBarOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navBarOpen, setNavBarOpen]);

  return (
    <div className={styles.nav__mobile_menu_wrapper}>
      <div
        className={cn(styles.nav__menu, {
          [styles.nav__mobile_menu]: navBarOpen,
          [styles.nav__menu_hidden]: !navBarOpen,
        })}
      >
        <NavbarLinks />
      </div>
    </div>
  );
}
