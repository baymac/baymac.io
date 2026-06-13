import blogStyles from '../../styles/pageStyles/blog.module.css';
import CopyButtonHandler from './CopyButtonHandler';

export default function PostContent({ contentHtml }: { contentHtml: string }) {
  return (
    <>
      <div
        data-post-content=""
        className={blogStyles.blog__contentFont}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted markdown content compiled at build time
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      <CopyButtonHandler />
    </>
  );
}
