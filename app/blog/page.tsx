import cn from 'classnames';
import type { Metadata } from 'next';
import Link from 'next/link';
import AiBadge from '../../components/Blog/AiBadge';
import BlogDate from '../../components/Blog/Date';
import { getSortedPostsData } from '../../lib/posts';
import blogStyles from '../../styles/pageStyles/blog.module.css';
import rootStyles from '../../styles/root.module.css';

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

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <section className={rootStyles.section}>
      <div
        className={cn(
          rootStyles.container,
          rootStyles.grid,
          blogStyles.blog__container
        )}
      >
        <h2 className={blogStyles.blog__heading}>Blog</h2>
        <ul className={blogStyles.blog__list}>
          {allPostsData.map(({ id, date, title, 'ai-gen': aiGen }) => (
            <li
              className={cn(
                blogStyles.blog__listItem,
                aiGen && blogStyles.blog__listItemAi
              )}
              key={id}
            >
              <Link href={`/posts/${id}`} className={blogStyles.blog__postLink}>
                {title}
              </Link>
              <br />
              <small className={blogStyles.lightText}>
                <BlogDate dateString={date} />
                {aiGen && <AiBadge />}
              </small>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
