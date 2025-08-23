'use client';

import { UilGithub, UilLinkedin, UilTwitter } from '@iconscout/react-unicons';
import cn from 'classnames';
import Link from 'next/link';
import rootStyles from '../../styles/root.module.css';
import footerStyles from './footer.module.css';

export default function Footer() {
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
              <Link href="/" className={footerStyles.footer__link}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/blog" className={footerStyles.footer__link}>
                Blog
              </Link>
            </li>
          </ul>
          <ul className={footerStyles.footer__links_2}>
            <li>
              <Link href="/buymecrypto" className={footerStyles.footer__link}>
                Buy Me Crypto
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
              <UilGithub />
            </a>
            <a
              href="https://x.com/parichayayy"
              target="_blank"
              rel="noreferrer"
              className={cn(
                footerStyles.footer__social_icon,
                footerStyles.footer__social_icon_gh
              )}
              aria-label="x"
            >
              <UilTwitter />
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
    </footer>
  );
}
