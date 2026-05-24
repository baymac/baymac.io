import cn from 'classnames';
import Link from 'next/link';
import AiBadge from './AiBadge';
import BlogDate from './Date';
import styles from './blog-card.module.css';

export interface IBlogCardProps {
  id: string;
  title: string;
  date: string;
  tags: string[];
  aiGen?: boolean;
  /** Color from the postit rotation (1–5). Consumer picks per index. */
  color: 1 | 2 | 3 | 4 | 5;
  /** Subtle per-card rotation in degrees for scrapbook feel. */
  rotate?: number;
}

/**
 * Sticky-note blog list card. Pairs with the postit color ramp tokens defined
 * in styles/global.css. Wobble filter via `data-wobble` per DESIGN.md.
 */
export default function BlogCard({
  id,
  title,
  date,
  tags,
  aiGen,
  color,
  rotate = 0,
}: IBlogCardProps) {
  return (
    <Link
      href={`/posts/${id}`}
      className={styles.cardLink}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <article
        className={cn(styles.card, styles[`color${color}`])}
        data-wobble
      >
        <div className={styles.meta}>
          <span className={styles.date}>
            <BlogDate dateString={date} />
          </span>
          {tags.length > 0 && (
            <span className={styles.tags}>
              {tags.map((t) => (
                <span key={t} className={styles.tag}>
                  #{t}
                </span>
              ))}
            </span>
          )}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.footer}>
          <span className={styles.readIt}>read it →</span>
          {aiGen && <AiBadge className={styles.aiBadge} />}
        </div>
      </article>
    </Link>
  );
}
