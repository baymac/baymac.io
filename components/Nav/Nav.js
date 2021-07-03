import {
  UilApps,
  UilArrowLeft,
  UilMoon,
  UilMultiply,
  UilSun
} from '@iconscout/react-unicons';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createElement, useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContextProvider';
import rootStyles from '../../styles/root.module.css';
import styles from './nav.module.css';
import NavLinkMobile from './NavLinkMobile.tsx';
import NavLinkBigScreen from './NavLinkBigScreen.tsx';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function Nav() {
  const { navBarOpen, setNavBarOpen } = useAppContext();

  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const router = useRouter();

  return (
    <>
      <header className={styles.header}>
        <nav className={cn(styles.nav, rootStyles.container)}>

          {!router.pathname.startsWith('/posts') && (
            <Link href="/" passHref>
              <button className={styles.nav__logo_button}>
                <a className={styles.nav__logo}><Image
                  src={'/images/logo.svg'}
                  priority
                  height={24}
                  width={24}
                  alt={'logo'}
                  layout="fixed"
                />
                </a>
              </button>
            </Link>
          )}
          {router.pathname.startsWith('/posts') && (
            <Link href={`/blog`} passHref>
              <button className={styles.nav__logo_button}>
                <a className={styles.nav__logo}>
                  <UilArrowLeft />
                </a>
              </button>
            </Link>
          )}
          <NavLinkBigScreen />
          <div className={styles.nav__btns}>
            {mounted &&
              createElement('button', {
                className: cn(styles.nav__changeTheme),
                onClick: () =>
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
              },
                createElement(
                  resolvedTheme === 'dark' ? UilSun : UilMoon,
                  {
                    id: 'theme-button',
                    width: 30,
                    height: 30
                  },
                  null
                ))}
            {!mounted &&
              createElement(
                'div',
                {
                  className: cn(styles.skeleton_loader)
                },
                null
              )}
            {!navBarOpen && (
              <button onClick={() => setNavBarOpen(true)} className={styles.nav__toggle}>
                <UilApps
                  id="nav_toggle"
                  width={30}
                  height={30}
                />
              </button>
            )}
            {navBarOpen && (
              <button className={styles.nav__toggle}
                onClick={() => setNavBarOpen(false)}>
                <UilMultiply
                  width={30}
                  height={30}
                  id="nav_toggle"
                />
              </button>
            )}
          </div>
        </nav>
      </header>
      <NavLinkMobile />
    </>
  );
}
