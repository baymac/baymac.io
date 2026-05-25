'use client';

import cn from 'classnames';
import { useMemo, useState, useTransition } from 'react';
import BlogCard from './BlogCard';
import styles from './blog-list-client.module.css';
import Skeleton from './Skeleton';

export interface IBlogListPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  aiGen?: boolean;
}

export interface IBlogListClientProps {
  posts: IBlogListPost[];
}

const POSTIT_COLORS = [1, 2, 3, 4, 5] as const;

/**
 * Client wrapper for the blog list. Owns tag-filter state + Skeleton transition.
 * Pure server data comes in via `posts` prop from the parent server component.
 */
export default function BlogListClient({ posts }: IBlogListClientProps) {
  const [filter, setFilter] = useState<string>('all');
  const [isPending, startTransition] = useTransition();

  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const p of posts) for (const t of p.tags) set.add(t);
    return ['all', ...Array.from(set).sort()];
  }, [posts]);

  const visible = useMemo(
    () =>
      filter === 'all' ? posts : posts.filter((p) => p.tags.includes(filter)),
    [filter, posts]
  );

  const handleFilter = (next: string) => {
    startTransition(() => setFilter(next));
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.filterRow}
        role="tablist"
        aria-label="Filter posts by tag"
      >
        {tags.map((t) => {
          const isSelected = filter === t;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => handleFilter(t)}
              className={cn(styles.tagPill, isSelected && styles.tagPillActive)}
            >
              {t === 'all' ? '＊ all' : `#${t}`}
            </button>
          );
        })}
      </div>

      {isPending ? (
        <Skeleton count={3} />
      ) : visible.length === 0 ? (
        <p className={styles.empty}>
          nothing here yet under <b>#{filter}</b> — try another tag
        </p>
      ) : (
        <div className={styles.grid}>
          {visible.map((post, i) => (
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
        </a>{' '}
        · or just check back when you remember
      </p>
    </div>
  );
}
