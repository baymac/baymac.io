'use client';

import {
  UilApps,
  UilArrowLeft,
  UilMoon,
  UilMultiply,
  UilSun,
} from '@iconscout/react-unicons';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createElement, useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContextProvider';
import { useTheme } from '../../context/ThemeProvider';
import rootStyles from '../../styles/root.module.css';
import Logo from '../Logo/Logo';
import NavLinkBigScreen from './NavLinkBigScreen';
import NavLinkMobile from './NavLinkMobile';
import styles from './nav.module.css';
import PostBanner from './PostBanner';

export default function Nav() {
  const { navBarOpen, setNavBarOpen } = useAppContext();

  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const pathname = usePathname();
  const router = useRouter();

  // Browser-style back: if there's history to pop, return to the previous
  // page (typically /blog, with its scroll position restored by App Router).
  // If the user landed on this post directly (no history), push to /blog.
  const goBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/blog');
    }
  };

  return (
    <header className={styles.header}>
      <nav className={cn(styles.nav, rootStyles.container)}>
        {pathname && !pathname.startsWith('/posts') && (
          <Link href="/" passHref>
            <button
              className={styles.nav__logo_button}
              aria-label="logo-button"
              type="button"
            >
              <div className={styles.nav__logo}>
                <Logo />
              </div>
            </button>
          </Link>
        )}
        {pathname?.startsWith('/posts') && (
          <button
            onClick={goBack}
            className={styles.nav__logo_button}
            aria-label="back-button"
            type="button"
          >
            <div className={styles.nav__logo}>
              <UilArrowLeft />
            </div>
          </button>
        )}
        <NavLinkBigScreen />
        <div className={styles.nav__btns}>
          {mounted ? (
            createElement(
              'button',
              {
                className: cn(styles.nav__changeTheme),
                onClick: () =>
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
                'aria-label': 'change-theme-button',
                type: 'button',
              },
              createElement(
                resolvedTheme === 'dark' ? UilSun : UilMoon,
                {
                  id: 'theme-button',
                  width: 28,
                  height: 28,
                },
                null
              )
            )
          ) : (
            <div className={styles.skeleton_loader_container}>
              {createElement(
                'div',
                {
                  className: cn(styles.skeleton_loader),
                },
                null
              )}
            </div>
          )}
          {!navBarOpen && (
            <button
              onClick={() => setNavBarOpen(true)}
              className={styles.nav__toggle}
              aria-label="nav-open-button"
              type="button"
            >
              <UilApps id="nav_toggle" width={28} height={28} />
            </button>
          )}
          {navBarOpen && (
            <button
              onClick={() => setNavBarOpen(false)}
              className={styles.nav__toggle}
              aria-label="nav-close-button"
              type="button"
            >
              <UilMultiply id="nav_close" width={28} height={28} />
            </button>
          )}
        </div>
      </nav>
      <PostBanner />
      <NavLinkMobile />
    </header>
  );
}
