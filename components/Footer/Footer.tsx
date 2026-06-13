import cn from 'classnames';
import Link from 'next/link';
import rootStyles from '../../styles/root.module.css';
import { UilGithub } from '../Icons/UilIcons';
import footerStyles from './footer.module.css';

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
      width="1em"
      height="1em"
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function SocialIcons() {
  return (
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
        <XIcon />
      </a>
    </div>
  );
}

function SignOff() {
  return (
    <p className={footerStyles.footer__signoff}>
      &copy; parichay &middot; baymac.lol &middot; made with rolling bassline
      energy
    </p>
  );
}

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
          <SocialIcons />
        </div>
        <div
          className={cn(
            rootStyles.container,
            footerStyles.footer__signoff_wrap
          )}
        >
          <SignOff />
        </div>
      </div>
    </footer>
  );
}
