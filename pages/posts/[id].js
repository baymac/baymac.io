import cn from 'classnames';
import Date from "../../components/Blog/Date";
import RootLayout from "../../layouts/RootLayout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import blogStyles from "../../styles/blog.module.css";
import rootStyles from "../../styles/root.module.css";

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
    <RootLayout>
      <article className={rootStyles.section}>
        <div
          className={cn(
            rootStyles.container,
            rootStyles.grid,
            blogStyles.blog__container
          )}
        >
          <h1 className={blogStyles.headingXl}>{postData.title}</h1>
          <div className={cn(blogStyles.lightText, blogStyles.postDate)}>
            <Date dateString={postData.date} />
          </div>
          <div className={blogStyles.lightText} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </article>
    </RootLayout>
  )
}
