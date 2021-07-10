import {
  UilBitcoinCircle,
  UilHome,
  UilPen,
  // UilUser,
} from '@iconscout/react-unicons';
import cn from 'classnames';
import Link from 'next/link';
import { createElement } from 'react';
import { useAppContext } from '../../context/AppContextProvider';
import useModalRouteRedirect from '../../hooks/useModalRouteRedirect';
import useNavSelection from '../../hooks/useNavSelection';
import styles from './navlink.module.css';

export interface INavItem {
  label: string;
  path?: string;
  selector: string;
  icon: any;
}

const navItems: INavItem[] = [
  {
    label: 'Home',
    icon: UilHome,
    path: '/',
    selector: 'home',
  },
  // {
  //   label: 'About',
  //   path: '/about',
  //   icon: UilUser,
  //   selector: 'about',
  // },
  {
    label: 'Blog',
    path: '/blog',
    icon: UilPen,
    selector: 'blog',
  },
];

const buyMeCryptoNavItem: INavItem = {
  label: 'Buy Me Crypto',
  icon: UilBitcoinCircle,
  selector: 'buymecrypto',
};

export default function NavBarLinks() {
  const { setNavBarOpen } = useAppContext();

  const [selectedMenu] = useNavSelection();
  // eslint-disable-next-line no-unused-vars
  const [_, hrefRoute, asRoute] = useModalRouteRedirect('buymecrypto');

  return (
    <>
      <div className={cn(styles.nav__list)}>
        {navItems.map((navItem) => (
          <Link href={`${navItem.path}`} key={navItem.label}>
            <a
              className={cn(styles.nav__item, {
                [styles.nav__item_selected]:
                  selectedMenu === `${navItem.selector}`,
              })}
              onClick={() => setNavBarOpen(false)}
              tabIndex={0}
            >
              <span className={styles.nav__link}>
                {createElement(
                  navItem.icon,
                  { className: styles.nav__icon },
                  null
                )}
                {navItem.label}
              </span>
            </a>
          </Link>
        ))}
        <Link href={`${hrefRoute}`} as={asRoute} scroll={false}>
          <a
            onClick={() => setNavBarOpen(false)}
            className={cn(styles.nav__item, {
              [styles.nav__item_selected]:
                selectedMenu === `${buyMeCryptoNavItem.selector}`,
            })}
            tabIndex={0}
          >
            <span className={styles.nav__link}>
              {createElement(
                buyMeCryptoNavItem.icon,
                { className: styles.nav__icon },
                null
              )}
              {buyMeCryptoNavItem.label}
            </span>
          </a>
        </Link>
      </div>
    </>
  );
}
