import type { Metadata } from 'next';
import BuyMeCryptoModalShell from '../../components/BuyMeCrypto/BuyMeCryptoModalShell';
import { getWallets } from '../../lib/wallets';
import HomePage from '../page';

export const metadata: Metadata = {
  title: 'Buy Me Crypto - Parichay',
  description: 'Support Parichay by tipping a wallet address',
};

// Direct loads (deep link, refresh) render the home page with the modal
// overlaid on top — same visual as the intercepted route from anywhere
// else in the app. Closing the modal pushes to "/" because there's no
// in-app history to pop.
export default function BuyMeCryptoPage() {
  const wallets = getWallets();
  return (
    <>
      <HomePage />
      <BuyMeCryptoModalShell wallets={wallets} closeFallback="/" />
    </>
  );
}
