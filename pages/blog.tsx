import cn from 'classnames';
import Link from 'next/link';
import Date from '../components/Blog/Date';
import RootLayout from '../layouts/RootLayout';
import { getSortedPostsData } from '../lib/posts';
import blogStyles from '../styles/blog.module.css';
import rootStyles from '../styles/root.module.css';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
}

export default function Blog({ allPostsData }) {
  return (
    <RootLayout>
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
            {allPostsData.map(({ id, date, title }) => (
              <li className={blogStyles.blog__listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a className={blogStyles.blog__postLink}>{title}</a>
                </Link>
                <br />
                <small className={blogStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </RootLayout>
  );
}
