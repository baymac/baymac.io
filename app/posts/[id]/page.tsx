import cn from 'classnames';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AiBadge from '../../../components/Blog/AiBadge';
import BlogDate from '../../../components/Blog/Date';
import NextPostCard from '../../../components/Blog/NextPostCard';
import SocialTipRow from '../../../components/Blog/SocialTipRow';
import { getAllPostIds, getPostData } from '../../../lib/posts';
import blogStyles from '../../../styles/pageStyles/blog.module.css';
import rootStyles from '../../../styles/root.module.css';

interface PostData {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
  'ai-gen'?: boolean;
  tags?: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map(({ params }) => ({
    id: params.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const postData = await getPostData(id);

    return {
      title: `${postData.title} - Parichay`,
      description: `Blog post: ${postData.title}`,
      openGraph: {
        title: postData.title,
        description: `Blog post: ${postData.title}`,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: postData.title,
        description: `Blog post: ${postData.title}`,
      },
    };
  } catch {
    return {
      title: 'Post Not Found - Parichay',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default async function PostPage({ params }: PageProps) {
  let postData: PostData;
  let resolvedId: string;

  try {
    const { id } = await params;
    resolvedId = id;
    postData = await getPostData(id);
  } catch {
    notFound();
  }

  return (
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
        <div
          className={cn(blogStyles.blog__SlugColor, blogStyles.blog__SlugFont)}
        >
          <BlogDate dateString={postData.date} />
          {postData['ai-gen'] && <AiBadge />}
        </div>
        <div
          className={cn(blogStyles.blog__contentFont)}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted markdown content compiled at build time
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
        <NextPostCard currentPostId={resolvedId} />
        <SocialTipRow />
      </div>
    </article>
  );
}
