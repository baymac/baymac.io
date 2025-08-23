import cn from 'classnames';
import type { Metadata } from 'next';
import BuyMeCrypto from '../../components/BuyMeCrypto/BuyMeCrypto';
import blogStyles from '../../styles/pageStyles/blog.module.css';
import rootStyles from '../../styles/root.module.css';

export const metadata: Metadata = {
  title: 'Buy Me Crypto - Parichay',
  description: 'Support Parichay by buying crypto',
};

export default function BuyMeCryptoPage() {
  return (
    <section className={rootStyles.section}>
      <div
        className={cn(
          rootStyles.container,
          rootStyles.grid,
          blogStyles.blog__container
        )}
      >
        <BuyMeCrypto />
      </div>
    </section>
  );
}
