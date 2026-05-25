import BuyMeCryptoModalShell from '../../../components/BuyMeCrypto/BuyMeCryptoModalShell';
import { getWallets } from '../../../lib/wallets';

export default function InterceptedBuyMeCrypto() {
  const wallets = getWallets();
  return <BuyMeCryptoModalShell wallets={wallets} />;
}
