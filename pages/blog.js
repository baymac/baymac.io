import Head from "next/head";
import BlogLayout, { siteTitle } from "../components/Blog/BlogLayout";
import Date from "../components/Blog/Date";
import blogStyles from "../styles/blog.module.css";
import Link from "next/link";
import rootStyles from '../components/Root/root.module.css'
import cn from 'classnames'

import Root from '../components/Root/Root'

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
    <Root>
      <Head>
        <title>{siteTitle}</title>
      </Head>
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
    </Root>
  )
}
