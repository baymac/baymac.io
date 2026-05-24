'use client';

import { useState } from 'react';
import BuyMeCrypto from '../BuyMeCrypto/BuyMeCrypto';
import Modal from '../Modal/Modal';
import styles from './social-tip-row.module.css';

/**
 * Tip button — opens the BuyMeCrypto component inside a Modal. The only
 * client island in SocialTipRow; RSS/X links stay server-rendered.
 */
export default function CryptoTipButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className={styles.tipButton}
        onClick={() => setOpen(true)}
      >
        buy me crypto
      </button>
      <Modal open={open} handleClose={() => setOpen(false)}>
        <h2 id="modal-title" className={styles.modalTitle}>
          Buy Me Crypto
        </h2>
        <BuyMeCrypto />
      </Modal>
    </>
  );
}
