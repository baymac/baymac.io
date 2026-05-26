'use client';

import { useEffect, useState } from 'react';
import styles from './back-to-top-fab.module.css';

const SHOW_AFTER_PX = 400;

export default function BackToTopFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const top = window.scrollY || document.documentElement.scrollTop || 0;
      setVisible(top > SHOW_AFTER_PX);
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={styles.fab}
      data-visible={visible || undefined}
    >
      <span aria-hidden="true" className={styles.arrow}>
        ↑
      </span>
    </button>
  );
}
