import cn from 'classnames';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BackToTopFab from '../../../components/Blog/BackToTopFab';
import NextPostCard from '../../../components/Blog/NextPostCard';
import PostTitle from '../../../components/Blog/PostTitle';
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
  mins?: number;
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
      <div className={cn(rootStyles.grid, blogStyles.blog__container)}>
        <PostTitle
          title={postData.title}
          date={postData.date}
          aiGen={postData['ai-gen']}
          mins={postData.mins}
        />
        <div
          className={cn(blogStyles.blog__contentFont)}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted markdown content compiled at build time
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
        <NextPostCard currentPostId={resolvedId} />
        <SocialTipRow />
      </div>
      <BackToTopFab />
    </article>
  );
}
