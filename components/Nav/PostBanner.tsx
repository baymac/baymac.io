'use client';

import { type CSSProperties, useMemo } from 'react';
import { usePostBanner } from '../../context/PostBannerProvider';
import styles from './post-banner.module.css';

// easeInOutQuad — matches the spec; keeps banner growth feeling smooth.
function eased(p: number) {
  return p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
}

export default function PostBanner() {
  const { post, progress } = usePostBanner();

  // Inline style carries the live scroll-driven values; the module css
  // consumes them via custom properties so visual identity (colors, font,
  // padding, max-width) stays in the stylesheet.
  const style = useMemo<CSSProperties>(() => {
    const p = progress;
    const e = eased(p);
    return {
      '--p': p,
      '--eased': e,
    } as CSSProperties;
  }, [progress]);

  if (!post) return null;

  const visible = progress > 0.001;

  return (
    <div
      className={styles.banner}
      style={style}
      aria-hidden={!visible}
      data-visible={visible || undefined}
    >
      <div className={styles.inner}>
        <span className={styles.title}>{post.title}</span>
        {post.mins !== undefined && (
          <span className={styles.mins}>{post.mins} min</span>
        )}
      </div>
    </div>
  );
}
