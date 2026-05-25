import Link from 'next/link';
import { getSortedPostsData } from '../../lib/posts';
import Postit from '../Common/Postit';
import styles from './next-post-card.module.css';

export interface INextPostCardProps {
  currentPostId: string;
}

/**
 * "Turn the page" exit ramp at the bottom of a post. Picks the next
 * chronologically-older post (since `getSortedPostsData` returns posts
 * sorted desc by date, "next" = `currentIndex + 1`). If the current post
 * is the oldest, wraps around to the most-recent.
 *
 * Server Component — runs at build time via SSG.
 */
export default function NextPostCard({ currentPostId }: INextPostCardProps) {
  const posts = getSortedPostsData();
  if (posts.length < 2) return null;

  const currentIndex = posts.findIndex((p) => p.id === currentPostId);
  if (currentIndex === -1) return null;

  const nextIndex = currentIndex < posts.length - 1 ? currentIndex + 1 : 0; // wrap to most recent
  const nextPost = posts[nextIndex];

  return (
    <aside className={styles.wrapper}>
      <Link
        href={`/posts/${nextPost.id}`}
        className={styles.link}
        aria-label={`Next post: ${nextPost.title}`}
      >
        <Postit color={3} rotate={-2} className={styles.postit}>
          <div className={styles.label}>turn the page →</div>
          <div className={styles.title}>{nextPost.title}</div>
        </Postit>
      </Link>
    </aside>
  );
}
