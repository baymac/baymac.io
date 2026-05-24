'use client';

import { UilCheckCircle, UilCopy } from '@iconscout/react-unicons';
import cn from 'classnames';
import { useState } from 'react';
import useCopy from '../../hooks/useCopy';
import Tape from '../Common/Tape';
import Snackbar from '../Snackbar/Snackbar';
import styles from './buymecrypto-card.module.css';

interface Wallet {
  coin: 'BTC' | 'ETH' | 'SOL' | 'ADA';
  label: string;
  network: string;
  address: string;
}

// T14 will replace this with content/wallets.json (gated by the
// scripts/validateWallets.js checksum). For now the only real address
// is the bitcoin one; the others stay placeholders until the owner
// fills them in.
const WALLETS: Wallet[] = [
  {
    coin: 'BTC',
    label: 'Bitcoin',
    network: 'mainnet',
    address: 'bc1qvrl9t4d9gk438v4k3qfwdj2kqquzma2ses7tqw',
  },
  {
    coin: 'ETH',
    label: 'Ethereum',
    network: 'mainnet / L2',
    address: '0x4a3bC5a8e7c1c9a5d4F9b2eEf7c8a91Bf3D2C4e6A',
  },
  {
    coin: 'SOL',
    label: 'Solana',
    network: 'mainnet',
    address: 'Bay4mAcCryptoPariChAypArich9aybBaybayMacM4cS0l',
  },
  {
    coin: 'ADA',
    label: 'Cardano',
    network: 'mainnet',
    address:
      'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj0',
  },
];

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
    if (
      typeof navigator !== 'undefined' &&
      (!navigator.clipboard || !navigator.clipboard.writeText)
    ) {
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

export default function BuyMeCryptoCard() {
  const [active, setActive] = useState<Wallet['coin']>('BTC');
  const [errorOpen, setErrorOpen] = useState(false);
  const wallet = WALLETS.find((w) => w.coin === active) ?? WALLETS[0];
  const addressId = `wallet-address-${wallet.coin.toLowerCase()}`;

  return (
    <>
      <div className={styles.paper}>
        <div className={styles.marginLine} aria-hidden="true" />
        <Tape
          rotate={-22}
          style={{ left: -10, top: -8, width: 64, zIndex: 2 }}
        />
        <Tape
          rotate={20}
          style={{ right: -10, top: -8, width: 64, zIndex: 2 }}
        />

        <div className={styles.body}>
          <h1 className={styles.heading} id="modal-title">
            buy me crypto
          </h1>
          <p className={styles.subheading}>
            (or just say hi — that&apos;s free)
          </p>

          <p className={styles.intro}>
            if a post helped you, or you liked something i made, here&apos;s
            where you can drop a tip. no fee, no platform — just a wallet
            address.
          </p>

          <div className={styles.coinTabs} role="tablist" aria-label="Coin">
            {WALLETS.map((w) => {
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
