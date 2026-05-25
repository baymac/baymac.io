'use client';

import { UilCheckCircle, UilCopy } from '@iconscout/react-unicons';
import cn from 'classnames';
import { useState } from 'react';
import useCopy from '../../hooks/useCopy';
import type { Wallet } from '../../lib/wallets';
import Tape from '../Common/Tape';
import Snackbar from '../Snackbar/Snackbar';
import styles from './buymecrypto-card.module.css';

interface CopyableProps {
  addressId: string;
  onCopyError: () => void;
}

function CopyableAddress({ addressId, onCopyError }: CopyableProps) {
  const [handleCopy, copied] = useCopy(addressId, 1800);

  const onClick = () => {
    try {
      // useCopy's tuple signature returns the trigger at [0]
      // @ts-expect-error tuple-typed callable
      handleCopy();
    } catch {
      onCopyError();
      return;
    }
    if (typeof navigator !== 'undefined' && !navigator.clipboard?.writeText) {
      onCopyError();
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(styles.copyBtn, copied && styles.copyBtnCopied)}
      aria-label="Copy address"
    >
      {copied ? (
        <>
          <UilCheckCircle className={styles.copyIcon} />
          copied
        </>
      ) : (
        <>
          <UilCopy className={styles.copyIcon} />
          copy
        </>
      )}
    </button>
  );
}

interface BuyMeCryptoCardProps {
  wallets: Wallet[];
}

export default function BuyMeCryptoCard({ wallets }: BuyMeCryptoCardProps) {
  const [active, setActive] = useState<string>(wallets[0]?.coin ?? '');
  const [errorOpen, setErrorOpen] = useState(false);

  if (wallets.length === 0) {
    return (
      <div className={styles.paper}>
        <div className={styles.body}>
          <h1 className={styles.heading} id="modal-title">
            buy me crypto
          </h1>
          <p className={styles.intro}>
            no wallets configured — drop one into{' '}
            <code>content/wallets.json</code> and regenerate the checksum with{' '}
            <code>node scripts/walletsChecksum.js</code>.
          </p>
        </div>
      </div>
    );
  }

  const wallet = wallets.find((w) => w.coin === active) ?? wallets[0];
  const addressId = `wallet-address-${wallet.coin.toLowerCase()}`;

  return (
    <>
      <div className={styles.paper}>
        <div className={styles.marginLine} aria-hidden="true" />
        {/* Disconnected tape — sits above the paper with a visible gap (B4). */}
        <Tape
          rotate={-22}
          style={{ left: 24, top: -18, width: 70, height: 18, zIndex: 2 }}
        />
        <Tape
          rotate={20}
          style={{ right: 24, top: -18, width: 70, height: 18, zIndex: 2 }}
        />

        <div className={styles.body}>
          <h1 className={styles.heading} id="modal-title">
            buy me crypto
          </h1>
          <p className={styles.subheading}>
            (or just{' '}
            <a
              href="https://x.com/parichayayy"
              target="_blank"
              rel="noreferrer"
              className={styles.sayHiLink}
            >
              say hi
            </a>{' '}
            — that&apos;s free)
          </p>

          <p className={styles.intro}>
            if a post helped you, or you liked something i made, here&apos;s
            where you can drop a tip. no fee, no platform — just a wallet
            address.
          </p>

          <div className={styles.coinTabs} role="tablist" aria-label="Coin">
            {wallets.map((w) => {
              const isSelected = w.coin === active;
              return (
                <button
                  key={w.coin}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActive(w.coin)}
                  className={cn(
                    styles.coinTab,
                    isSelected && styles.coinTabActive
                  )}
                >
                  {w.coin}
                </button>
              );
            })}
          </div>

          <div className={styles.addressRow}>
            <div className={styles.coinMeta}>
              {wallet.label} · {wallet.network}
            </div>
            <div className={styles.addressBox}>
              <code
                id={addressId}
                className={styles.address}
                style={{ userSelect: 'all' }}
              >
                {wallet.address}
              </code>
              <CopyableAddress
                addressId={addressId}
                onCopyError={() => setErrorOpen(true)}
              />
            </div>
            <p className={styles.caption}>
              shown above is the full address — please verify before sending
            </p>
          </div>

          <div className={styles.signatureRow}>
            <p className={styles.disclaimer}>
              don&apos;t send NFTs. don&apos;t send memecoins. or do. i
              can&apos;t stop you.
            </p>
            <p className={styles.signature}>— parichay</p>
          </div>
        </div>
      </div>
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
