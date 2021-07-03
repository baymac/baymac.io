import {
  UilGithub,
  UilLinkedin
} from '@iconscout/react-unicons';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import rootStyles from '../../styles/root.module.css';
import BuyMeCrypto from '../BuyMeCrypto/BuyMeCrypto';
import Modal from '../Modal/Modal';
import footerStyles from './footer.module.css';

export default function Footer() {

  const router = useRouter()

  // Using this ref to redirect to the prevRoute in case of buymecrypto
  const prevRoute = useRef(router.asPath === '/buymecrypto' || router.asPath.includes('?') ? '/' : router.asPath)

  useEffect(() => {
    // In case of ?buymecrypto=1, we are preventing prevRoute change and set it to / as the default value so that modal can be closed.
    if (router.asPath !== '/buymecrypto' && !router.asPath.includes('?')) {
      prevRoute.current = router.asPath
    }
  }, [router])

  console.log(router)

  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footer__bg}>
        <div
          className={cn(
            rootStyles.grid,
            rootStyles.container,
            footerStyles.footer__container
          )}
        >
          <ul className={footerStyles.footer__links_1}>
            <li>
              <Link href="/">
                <a className={footerStyles.footer__link}>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className={footerStyles.footer__link}>About</a>
              </Link>
            </li>
            <li>
              <Link href="/uses">
                <a className={footerStyles.footer__link}>Uses</a>
              </Link>
            </li>
          </ul>
          <ul className={footerStyles.footer__links_2}>
            <li>
              <Link href="/blog">
                <a className={footerStyles.footer__link}>Blog</a>
              </Link>
            </li>
            <li>
              <Link href="/subscribe">
                <a className={footerStyles.footer__link}>Newsletter</a>
              </Link>
            </li>
            <li>
              <Link href={`${prevRoute.current}?buymecrypto=1`} as={"/buymecrypto"} scroll={false}>
                <a
                  className={footerStyles.footer__link}
                >
                  Buy Me Crypto
                </a>
              </Link>
            </li>
          </ul>
          <div className={footerStyles.footer__social}>
            <a
              href="https://github.com/baymac"
              target="_blank"
              rel="noreferrer"
              className={cn(
                footerStyles.footer__social_icon,
                footerStyles.footer__social_icon_gh
              )}
              aria-label="github"
            >
              <UilGithub alt="github" />
            </a>
            <a
              href="https://linkedin.com/in/parichaybarpanda"
              target="_blank"
              rel="noreferrer"
              className={footerStyles.footer__social_icon}
              aria-label="linkedin"
            >
              <UilLinkedin />
            </a>
          </div>
        </div>
      </div>
      <Modal
        open={!!router.query.buymecrypto}
        handleClose={() => {
          router.push(prevRoute.current, prevRoute.current, { scroll: false })
        }}
      >
        <BuyMeCrypto />
      </Modal>
    </footer>
  );
}
