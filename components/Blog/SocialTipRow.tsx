import styles from './social-tip-row.module.css';

/**
 * Tiny inline row at the bottom of a post: RSS, X follow.
 * The crypto tip button (F8) is removed; visitors hit /buymecrypto via
 * nav/footer if they want to tip.
 */
export default function SocialTipRow() {
  return (
    <div className={styles.row}>
      <a href="/feed.xml" className={styles.link} rel="noopener noreferrer">
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
    </div>
  );
}
