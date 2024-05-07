import cn from 'classnames';
import Date from '../../components/Blog/Date';
import RootLayout from '../../layouts/RootLayout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import blogStyles from '../../styles/pageStyles/blog.module.css';
import rootStyles from '../../styles/root.module.css';

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
    <RootLayout head={postData.title} description={postData.id}>
      <article className={cn(rootStyles.section, blogStyles.blog__article)}>
        <div
          className={cn(
            rootStyles.container,
            rootStyles.grid,
            blogStyles.blog__container
          )}
        >
          <h1
            className={cn(
              blogStyles.headingXl,
              blogStyles.blog__headingColor,
              blogStyles.blog__headingFont
            )}
          >
            {postData.title}
          </h1>
          <p
            className={cn(
              blogStyles.blog__SlugColor,
              blogStyles.blog__SlugFont,
              blogStyles.blog__slugContainer
            )}
          >
            <Date dateString={postData.date} />
          </p>
          <div
            className={cn(blogStyles.blog__contentFont)}
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          />
        </div>
      </article>
    </RootLayout>
  );
}
