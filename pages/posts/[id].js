import { getAllPostIds, getPostData } from "../../lib/posts";
import BlogLayout from "../../components/Blog/BlogLayout";
import Head from "next/head";
import blogStyles from "../../styles/blog.module.css";
import Date from "../../components/Blog/Date";
import cn from 'classnames'

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <BlogLayout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={blogStyles.headingXl}>{postData.title}</h1>
        <div className={cn(blogStyles.lightText, blogStyles.postDate)}>
          <Date dateString={postData.date} />
        </div>
        <div className={blogStyles.lightText} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </BlogLayout>
  )
}
