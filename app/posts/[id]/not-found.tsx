import Link from 'next/link';
import Postit from '../../../components/Common/Postit';
import { getSortedPostsData } from '../../../lib/posts';
import styles from './not-found.module.css';

/**
 * Per-segment 404 for /posts/[id]. The root app/not-found.tsx is unchanged
 * (per the plan — this is a deliberate scope-narrow). "random post" link
 * is computed at build time (Server Component); the randomness is
 * deterministic per build, refreshes when posts change.
 */
export default function PostNotFound() {
  const posts = getSortedPostsData();
  const randomPost =
    posts.length > 0
      ? posts[Math.floor(Math.random() * posts.length)]
      : null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Postit color={5} rotate={-2} className={styles.postit}>
          <h1 className={styles.heading}>this post got composted</h1>
        </Postit>
        <p className={styles.copy}>
          the post you&apos;re looking for moved, was unpublished, or never
          existed in the first place. these still work:
        </p>
        <div className={styles.links}>
          <Link href="/blog" className={styles.link}>
            browse all posts
          </Link>
          {randomPost && (
            <Link href={`/posts/${randomPost.id}`} className={styles.link}>
              random post
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
