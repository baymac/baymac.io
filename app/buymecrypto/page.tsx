import type { Metadata } from 'next';
import BuyMeCryptoCard from '../../components/BuyMeCrypto/BuyMeCryptoCard';
import { getWallets } from '../../lib/wallets';
import styles from './buymecrypto-page.module.css';

export const metadata: Metadata = {
  title: 'Buy Me Crypto - Parichay',
  description: 'Support Parichay by tipping a wallet address',
};

export default function BuyMeCryptoPage() {
  const wallets = getWallets();
  return (
    <section className={styles.section} aria-labelledby="modal-title">
      <BuyMeCryptoCard wallets={wallets} />
    </section>
  );
}
