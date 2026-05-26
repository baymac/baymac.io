'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface PostInfo {
  title: string;
  mins?: number;
}

interface PostBannerCtx {
  post: PostInfo | null;
  setPost: (p: PostInfo | null) => void;
  registerTitleEl: (el: HTMLElement | null) => void;
  progress: number;
}

const Ctx = createContext<PostBannerCtx>({
  post: null,
  setPost: () => {},
  registerTitleEl: () => {},
  progress: 0,
});

export function usePostBanner() {
  return useContext(Ctx);
}

// Last BANNER_RANGE pixels of the post H1's exit drive 0 → 1 progress.
const BANNER_RANGE = 52;

export default function PostBannerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [post, setPost] = useState<PostInfo | null>(null);
  const [progress, setProgress] = useState(0);
  const [titleEl, setTitleEl] = useState<HTMLElement | null>(null);

  const registerTitleEl = useCallback((el: HTMLElement | null) => {
    setTitleEl(el);
  }, []);

  const rafRef = useRef(0);

  useEffect(() => {
    if (!titleEl) {
      setProgress(0);
      return;
    }

    const check = () => {
      rafRef.current = 0;
      const rect = titleEl.getBoundingClientRect();
      const isMobile = window.matchMedia('(max-width: 600px)').matches;
      // Header is position:fixed and out of body flow, so banner growth does
      // not push body content. rect.bottom is purely a function of scroll.
      const headerH = isMobile ? 64 : 83;
      const triggerOffset = isMobile ? 70 : 24;
      const fullyOpenAt = headerH + triggerOffset;
      const p = Math.max(
        0,
        Math.min(1, (fullyOpenAt + BANNER_RANGE - rect.bottom) / BANNER_RANGE)
      );
      setProgress(p);
    };

    const onScroll = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(check);
    };

    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [titleEl]);

  return (
    <Ctx.Provider value={{ post, setPost, registerTitleEl, progress }}>
      {children}
    </Ctx.Provider>
  );
}

export { BANNER_RANGE };
