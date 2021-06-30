import {
  UilCopy,
  UilGithub,
  UilLinkedin,
  UilCheckCircle
} from '@iconscout/react-unicons';
import cn from 'classnames';
import Link from 'next/link';
import React, { createElement, useState } from 'react';
import Modal from '../Modal/Modal';
import rootStyles from '../../styles/root.module.css';
import footerStyles from './footer.module.css';
import useCopy from '../../hooks/useCopy';
import Snackbar from '../Snackbar/Snackbar';

export default function Footer() {
  const [showCryptoAddress, setShowCryptoAddress] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [handleCopy, copied] = useCopy('bitcoin-address', 5000);

  const handleCopyClick = () => {
    handleCopy();
    setShowSnackbar(true);
  };

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
              <a
                onClick={() => setShowCryptoAddress(true)}
                className={footerStyles.footer__link}
              >
                Buy Me Crypto
              </a>
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
        open={showCryptoAddress}
        handleClose={() => setShowCryptoAddress(false)}
      >
        <div className={footerStyles.footer__crypto}>
          <p className={footerStyles.footer__crypto_label}>Bitcoin Address</p>
          <div className={footerStyles.footer__crypto_address}>
            <div
              className={footerStyles.footer__crypto_address_text}
              id="bitcoin-address"
            >
              bc1qvrl9t4d9gk438v4k3qfwdj2kqquzma2ses7tqw
            </div>
            {!copied ? (
              <UilCopy
                onClick={handleCopyClick}
                className={cn(
                  footerStyles.footer__crypto_icon,
                  footerStyles.footer__crypto_copy_icon
                )}
              />
            ) : (
              <UilCheckCircle
                className={cn(
                  footerStyles.footer__crypto_icon,
                  footerStyles.footer__crypto_copied_icon
                )}
              />
            )}
          </div>
        </div>
      </Modal>
      {showSnackbar &&
        createElement(
          Snackbar,
          {
            message: 'Copied!',
            show: showSnackbar,
            reset: setShowSnackbar,
            duration: 1500
          },
          null
        )}
    </footer>
  );
}
