import Head from "next/head";
import BlogLayout, { siteTitle } from "../components/Blog/BlogLayout";
import Date from "../components/Blog/Date";
import blogStyles from "../styles/blog.module.css";
import Link from "next/link";

import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default function Blog({ allPostsData }) {
  return (
    <BlogLayout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${blogStyles.blog__section}`}>
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
      </section>
    </BlogLayout>
  )
}
