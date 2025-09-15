'use client';

import {
  UilBitcoinCircle,
  UilHome,
  UilPen,
} from '@iconscout/react-unicons';
import cn from 'classnames';
import Link from 'next/link';
import { createElement } from 'react';
import { useAppContext } from '../../context/AppContextProvider';
import useNavSelection from '../../hooks/useNavSelection';
import styles from './navlink.module.css';

export interface INavItem {
  label: string;
  path?: string;
  selector: string;
  icon: React.ElementType;
}

const navItems: INavItem[] = [
  {
    label: 'Home',
    icon: UilHome,
    path: '/',
    selector: 'home',
  },
  {
    label: 'Blog',
    path: '/blog',
    icon: UilPen,
    selector: 'blog',
  },
  {
    label: 'Buy Me Crypto',
    path: '/buymecrypto',
    icon: UilBitcoinCircle,
    selector: 'buymecrypto',
  },
];

export default function NavBarLinks() {
  const { setNavBarOpen } = useAppContext();

  const [selectedMenu] = useNavSelection();

  return (
    <>
      <div className={cn(styles.nav__list)}>
        {navItems.map((navItem) => (
          <Link
            href={`${navItem.path}`}
            key={navItem.label}
            className={cn(styles.nav__item, {
              [styles.nav__item_selected]:
                selectedMenu === `${navItem.selector}`,
            })}
            onClick={() => setNavBarOpen(false)}
            tabIndex={0}
          >
            <span className={styles.nav__link} id={`${navItem.selector}`}>
              {createElement(
                navItem.icon,
                { className: styles.nav__icon },
                null
              )}
              {navItem.label}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
