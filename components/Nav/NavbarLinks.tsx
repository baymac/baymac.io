import {
  UilBitcoinCircle,
  UilHome,
  UilMessage,
  UilPen
} from '@iconscout/react-unicons';
import cn from 'classnames';
import Link from 'next/link';
import { useAppContext } from '../../context/AppContextProvider';
import useModalRoute from '../../hooks/useModalRoute';
import useNavSelection from '../../hooks/useNavSelection';
import BuyMeCrypto from '../BuyMeCrypto/BuyMeCrypto';
import Modal from '../Modal/Modal';
import styles from './navlink.module.css';

export default function NavBarLinks() {
  const { setNavBarOpen } = useAppContext();

  const [selectedMenu] = useNavSelection();

  const [prevRoute, isOpen, handleClose] = useModalRoute('/buymecrypto');

  return (
    <>
      <ul className={cn(styles.nav__list)}>
        <Link href="/" passHref>
          <li
            className={cn(styles.nav__item, {
              [styles.nav__item_selected]: selectedMenu === 'home'
            })}
            onClick={() => setNavBarOpen(false)}
          >
            <a className={styles.nav__link}>
              <UilHome className={styles.nav__icon} />
              Home
            </a>
          </li>
        </Link>
        <Link href="/about" passHref>
          <li
            className={cn(styles.nav__item, {
              [styles.nav__item_selected]: selectedMenu === 'about'
            })}
            onClick={() => setNavBarOpen(false)}
          >
            <a className={styles.nav__link}>
              <UilMessage className={styles.nav__icon} />
              About
            </a>
          </li>
        </Link>
        <Link href="/blog" passHref>
          <li
            className={cn(styles.nav__item, {
              [styles.nav__item_selected]: selectedMenu === 'blog'
            })}
            onClick={() => setNavBarOpen(false)}
          >
            <a className={styles.nav__link}>
              <UilPen className={styles.nav__icon} />
              Blog
            </a>
          </li>
        </Link>
        <Link
          href={`${prevRoute}?buymecrypto=1`}
          as="/buymecrypto"
          scroll={false}
          passHref
        >
          <li
            className={cn(styles.nav__item, styles.hide_big_screen, {
              [styles.nav__item_selected]: selectedMenu === 'buymecrypto'
            })}
            onClick={() => setNavBarOpen(false)}
          >
            <a className={styles.nav__link}>
              <UilBitcoinCircle className={styles.nav__icon} />
              Buy Me Crypto
            </a>
          </li>
        </Link>
      </ul>
      <Modal open={isOpen} handleClose={handleClose}>
        {/*@ts-ignore*/}
        <BuyMeCrypto />
      </Modal>
    </>
  );
}
