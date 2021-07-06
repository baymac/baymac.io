import { UilGithub, UilLinkedin } from '@iconscout/react-unicons';
import cn from 'classnames';
import Link from 'next/link';
import useModalRouteRedirect from '../../hooks/useModalRouteRedirect';
import rootStyles from '../../styles/root.module.css';
import footerStyles from './footer.module.css';

export default function Footer() {
  // eslint-disable-next-line no-unused-vars
  const [_, hrefRoute, asRoute] = useModalRouteRedirect('buymecrypto');

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
              <Link href={`${hrefRoute}`} as={asRoute} scroll={false}>
                <a className={footerStyles.footer__link}>Buy Me Crypto</a>
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
    </footer>
  );
}
