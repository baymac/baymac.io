'use client';

import cn from 'classnames';
import { type CSSProperties, useEffect, useRef } from 'react';
import { usePostBanner } from '../../context/PostBannerProvider';
import blogStyles from '../../styles/pageStyles/blog.module.css';
import AiBadge from './AiBadge';
import BlogDate from './Date';
import styles from './post-title.module.css';

interface Props {
  title: string;
  date: string;
  aiGen?: boolean;
  mins?: number;
}

export default function PostTitle({ title, date, aiGen, mins }: Props) {
  const { setPost, registerTitleEl, progress } = usePostBanner();
  const ref = useRef<HTMLDivElement | null>(null);

  // Register this title with the banner provider on mount; clear on unmount.
  useEffect(() => {
    setPost({ title, mins });
    registerTitleEl(ref.current);
    return () => {
      registerTitleEl(null);
      setPost(null);
    };
  }, [title, mins, setPost, registerTitleEl]);

  // Pure scroll-tied math (no CSS transitions) — reversing the scroll
  // reverses the whole animation in perfect sync with the banner.
  const style = {
    '--p': progress,
  } as CSSProperties;

  return (
    <div ref={ref} className={styles.wrapper} style={style}>
      <h1
        className={cn(
          blogStyles.headingXl,
          blogStyles.blog__headingColor,
          blogStyles.blog__headingFont
        )}
      >
        {title}
      </h1>
      <div
        className={cn(blogStyles.blog__SlugColor, blogStyles.blog__SlugFont)}
      >
        <BlogDate dateString={date} />
        {mins !== undefined && <span> · {mins} min read</span>}
        {aiGen && <AiBadge />}
      </div>
    </div>
  );
}
