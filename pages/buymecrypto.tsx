import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/buymecryptopage.module.css';

export default function BuyMeCryptoPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/?buymecrypto=1', '/buymecrypto');
    }, 500);
  }, [router]);

  return <div className={styles.redirecting}>Redirecting</div>;
}
