import type { Metadata } from 'next';
import BackToTopFab from '../../components/Blog/BackToTopFab';
import BlogCard from '../../components/Blog/BlogCard';
import { getSortedPostsData } from '../../lib/posts';
import styles from './blog-page.module.css';

export const metadata: Metadata = {
  title: 'Blog - Parichay',
  description:
    'Technical blog posts about web development, security and software engineering',
  openGraph: {
    title: 'Blog - Parichay',
    description:
      'Technical blog posts about web development, security and software engineering',
  },
};

function parseTags(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

const POSTIT_COLORS = [1, 2, 3, 4, 5] as const;

export default function BlogPage() {
  const posts = getSortedPostsData().map((p) => ({
    id: p.id,
    title: p.title,
    date: p.date,
    tags: parseTags(p.tags),
    aiGen: p['ai-gen'] === true,
  }));

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.headerRow}>
          <h1 className={styles.heading}>
            things i wrote{' '}
            <span className={styles.headingAnnot}>
              (blogs = searchable memories)
            </span>
          </h1>
          <p className={styles.headerMeta}>
            {posts.length} posts · sorted by date ↓
          </p>
        </header>

        {posts.length === 0 ? (
          <p className={styles.emptyZero}>
            no posts yet — check back. or contribute one over at{' '}
            <a
              href="https://github.com/baymac/baymac.io"
              target="_blank"
              rel="noreferrer"
            >
              github.com/baymac/baymac.io
            </a>
            .
          </p>
        ) : (
          <div className={styles.grid}>
            {posts.map((post, i) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                date={post.date}
                tags={post.tags}
                aiGen={post.aiGen}
                color={POSTIT_COLORS[i % POSTIT_COLORS.length]}
                rotate={((i % 4) - 1.5) * 0.6}
              />
            ))}
          </div>
        )}

        <p className={styles.rss}>
          rss?{' '}
          <a href="/feed.xml" className={styles.rssLink}>
            /feed.xml
          </a>
        </p>
      </div>
      <BackToTopFab />
    </section>
  );
}
