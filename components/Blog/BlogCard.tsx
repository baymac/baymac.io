import cn from 'classnames';
import Link from 'next/link';
import Tape from '../Common/Tape';
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
 * Sticky-note blog list card. Two washi-tape strips at the top corners
 * (per design F15). Pairs with the postit color ramp tokens defined in
 * styles/global.css. Wobble filter via `data-wobble` per DESIGN.md.
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
      <div className={styles.cardOuter}>
        {/* Two tape strips straddling the top edge — half above, half on
            the card. cardOuter padding-top reserves space for the top half;
            negative `top` pulls the tape up so its center sits on the
            article's top edge. Matches design ref 2jyMDW. */}
        <Tape
          rotate={-10 + rotate * 2}
          style={{ left: 32, top: 0, width: 84, height: 28 }}
        />
        <Tape
          rotate={8 - rotate * 2}
          style={{ right: 44, top: 1, width: 76, height: 26 }}
        />
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
      </div>
    </Link>
  );
}
