import rootStyles from "./root.module.css";
import footerStyles from "./footer.module.css";
import cn from "classnames";
import Link from "next/link";
import { UilGithub, UilLinkedin } from "@iconscout/react-unicons";

export default function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.footer__bg}>
        <div
          className={cn(
            footerStyles.footer__container,
            rootStyles.container,
            rootStyles.grid
          )}
        >
          <div>
            <h1 className={footerStyles.footer__title}>Parichay</h1>
            <span className={footerStyles.footer__subtitle}>
              Software Engineer
            </span>
          </div>
          <ul className={footerStyles.footer__links}>
            <li>
              <Link href="/blog">
                <a className={footerStyles.footer__link}>Blog</a>
              </Link>
            </li>
            <li>
              <a
                className={footerStyles.footer__link}>Buy me some crypto</a>
            </li>
            <li>
              <Link href="/subscribe">
                <a className={footerStyles.footer__link}>Newsletter</a>
              </Link>
            </li>
          </ul>
          <div className={footerStyles.footer__social}>
            <a
              href="https://github.com/baymac"
              target="_blank"
              rel="noreferrer"
              className={footerStyles.footer__social_icon}
            >
              <UilGithub />
            </a>
            <a
              href="https://linkedin.com/in/parichaybarpanda"
              target="_blank"
              rel="noreferrer"
              className={footerStyles.footer__social_icon}
            >
              <UilLinkedin />
            </a>
          </div>
        </div>
        <p className={footerStyles.footer__copy}>
          By Parichay. Under MIT license
        </p>
      </div>
    </footer>
  );
}
