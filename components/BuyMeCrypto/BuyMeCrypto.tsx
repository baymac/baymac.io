'use client';

import { UilCheckCircle, UilCopy } from '@iconscout/react-unicons';
import cn from 'classnames';
import { useState } from 'react';
import useCopy from '../../hooks/useCopy';
import Snackbar from '../Snackbar/Snackbar';
import styles from './buymecrypto.module.css';

interface Wallet {
  id: string;
  label: string;
  address: string;
}

// T14 will replace this with content/wallets.json (gated by checksum).
// Until then, the production wallet stays inlined where it always was.
const WALLETS: Wallet[] = [
  {
    id: 'bitcoin-address',
    label: 'Bitcoin Address',
    address: 'bc1qvrl9t4d9gk438v4k3qfwdj2kqquzma2ses7tqw',
  },
];

interface CopyableAddressProps {
  wallet: Wallet;
  onError: () => void;
}

function CopyableAddress({ wallet, onError }: CopyableAddressProps) {
  const [handleCopy, copied] = useCopy(wallet.id, 5000);

  const handleClick = () => {
    try {
      // @ts-expect-error — useCopy returns a tuple with the callback at [0]
      handleCopy();
    } catch {
      onError();
      return;
    }
    // Detect "copy didn't actually happen" by checking clipboard API access.
    if (typeof navigator !== 'undefined' && !navigator.clipboard?.writeText) {
      onError();
    }
  };

  return (
    <div className={styles.footer__crypto}>
      <p className={styles.footer__crypto_label}>{wallet.label}</p>
      <div className={styles.footer__crypto_address}>
        <div
          className={styles.footer__crypto_address_text}
          id={wallet.id}
          style={{ userSelect: 'all' }}
        >
          {wallet.address}
        </div>
        {!copied ? (
          <button
            type="button"
            onClick={handleClick}
            aria-label={`Copy ${wallet.label}`}
            className={styles.footer__crypto_copy_button}
          >
            <UilCopy
              className={cn(
                styles.footer__crypto_icon,
                styles.footer__crypto_copy_icon
              )}
            />
          </button>
        ) : (
          <UilCheckCircle
            aria-label="Copied"
            className={cn(
              styles.footer__crypto_icon,
              styles.footer__crypto_copied_icon
            )}
          />
        )}
      </div>
      <p className={styles.footer__crypto_caption}>
        shown above is the full address — please verify before sending
      </p>
    </div>
  );
}

export default function BuyMeCrypto() {
  const [errorOpen, setErrorOpen] = useState(false);

  return (
    <>
      {WALLETS.map((wallet) => (
        <CopyableAddress
          key={wallet.id}
          wallet={wallet}
          onError={() => setErrorOpen(true)}
        />
      ))}
      {errorOpen && (
        <Snackbar
          show={errorOpen}
          reset={() => setErrorOpen(false)}
          variant="error"
          message="copy failed — select address manually"
          duration={3000}
        />
      )}
    </>
  );
}
