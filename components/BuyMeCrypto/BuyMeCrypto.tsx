'use client';

import { UilCheckCircle, UilCopy } from '@iconscout/react-unicons';
import { createElement, useState } from 'react';
import useCopy from '../../hooks/useCopy';
import Snackbar from '../Snackbar/Snackbar';
import styles from './buymecrypto.module.css';
import cn from 'classnames';

export default function BuyMeCrypto() {
  const [handleCopy, copied] = useCopy('bitcoin-address', 5000);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCopyClick = () => {
    //@ts-ignore
    handleCopy();
    setShowSnackbar(true);
  };

  return (
    <>
      <div className={styles.footer__crypto}>
        <p className={styles.footer__crypto_label}>Bitcoin Address</p>
        <div className={styles.footer__crypto_address}>
          <div
            className={styles.footer__crypto_address_text}
            id="bitcoin-address"
          >
            bc1qvrl9t4d9gk438v4k3qfwdj2kqquzma2ses7tqw
          </div>
          {!copied ? (
            <UilCopy
              onClick={handleCopyClick}
              className={cn(
                styles.footer__crypto_icon,
                styles.footer__crypto_copy_icon
              )}
            />
          ) : (
            <UilCheckCircle
              className={cn(
                styles.footer__crypto_icon,
                styles.footer__crypto_copied_icon
              )}
            />
          )}
        </div>
      </div>
      {showSnackbar &&
        createElement(
          Snackbar,
          {
            message: 'Copied!',
            show: showSnackbar,
            // @ts-ignore
            reset: setShowSnackbar,
            duration: 1500,
          },
          null
        )}
    </>
  );
}
