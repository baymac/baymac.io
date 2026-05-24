import type { Metadata } from 'next';
import BlogListClient, {
  type IBlogListPost,
} from '../../components/Blog/BlogListClient';
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

// Normalize the raw frontmatter tags string ("tag1, tag2") into a string array
// so the client filter doesn't have to split per render.
function parseTags(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function BlogPage() {
  const posts: IBlogListPost[] = getSortedPostsData().map((p) => ({
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
            the blog{' '}
            <span className={styles.headingAnnot}>(things i wrote down)</span>
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
          <BlogListClient posts={posts} />
        )}
      </div>
    </section>
  );
}
