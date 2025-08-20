import Link from 'next/link';
import styles from '../styles/pageStyles/error.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h2>Not Found</h2>
      <p>Could not find the requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
