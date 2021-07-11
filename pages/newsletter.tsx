import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/buymecryptopage.module.css';

export default function NewsLetterPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/?newsletter=1', '/newsletter');
    }, 500);
  }, [router]);

  return <div className={styles.redirecting}>Redirecting</div>;
}
