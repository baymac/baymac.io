import type { Metadata } from 'next';
import BuyMeCryptoCard from '../../components/BuyMeCrypto/BuyMeCryptoCard';
import styles from './buymecrypto-page.module.css';

export const metadata: Metadata = {
  title: 'Buy Me Crypto - Parichay',
  description: 'Support Parichay by tipping a wallet address',
};

export default function BuyMeCryptoPage() {
  return (
    <section className={styles.section} aria-labelledby="modal-title">
      <BuyMeCryptoCard />
    </section>
  );
}
