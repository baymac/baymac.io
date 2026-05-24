import CryptoTipButton from './CryptoTipButton';
import styles from './social-tip-row.module.css';

/**
 * Tiny inline row at the bottom of a post: RSS, X follow, tip button.
 * Server Component wrapper + client `<CryptoTipButton>` leaf (per CQ 2A).
 */
export default function SocialTipRow() {
  return (
    <div className={styles.row}>
      <a
        href="/feed.xml"
        className={styles.link}
        rel="noopener noreferrer"
      >
        rss
      </a>
      <span className={styles.dot} aria-hidden="true">
        ·
      </span>
      <a
        href="https://x.com/parichayayy"
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        follow on x
      </a>
      <span className={styles.dot} aria-hidden="true">
        ·
      </span>
      <CryptoTipButton />
    </div>
  );
}
