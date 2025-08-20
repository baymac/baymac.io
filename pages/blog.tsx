import cn from 'classnames';
import Link from 'next/link';
import Date from '../components/Blog/Date';
import AiBadge from '../components/Blog/AiBadge';
import RootLayout from '../layouts/RootLayout';
import { getSortedPostsData } from '../lib/posts';
import blogStyles from '../styles/pageStyles/blog.module.css';
import rootStyles from '../styles/root.module.css';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Blog({ allPostsData }) {
  return (
    <RootLayout>
      <section className={rootStyles.section}>
        <div
          className={cn(
            blogStyles.blog__container,
            rootStyles.container,
            rootStyles.grid,
          )}
        >
          <h2 className={blogStyles.blog__heading}>Blog</h2>
          <ul className={blogStyles.blog__list}>
            {allPostsData.map(({ id, date, title, 'ai-gen': aiGen }) => (
              <li
                className={cn(
                  blogStyles.blog__listItem,
                )}
                key={id}
              >
                <Link href={`/posts/${id}`}>
                  <a className={blogStyles.blog__postLink}>{title}</a>
                </Link>
                <br />
                <small className={blogStyles.lightText}>
                  <Date dateString={date} />
                </small>
                {aiGen && (
                  <AiBadge />
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </RootLayout>
  );
}
