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
  secondsLeft: number | null;
}

const Ctx = createContext<PostBannerCtx>({
  post: null,
  setPost: () => {},
  registerTitleEl: () => {},
  progress: 0,
  secondsLeft: null,
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
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [titleEl, setTitleEl] = useState<HTMLElement | null>(null);

  const registerTitleEl = useCallback((el: HTMLElement | null) => {
    setTitleEl(el);
  }, []);

  const rafRef = useRef(0);
  const totalMins = post?.mins;

  useEffect(() => {
    if (!titleEl) {
      setProgress(0);
      setSecondsLeft(totalMins !== undefined ? totalMins * 60 : null);
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

      // Read-progress through the content body. The PostTitle wrapper's next
      // sibling is the dangerouslySetInnerHTML div (see app/posts/[id]/page.tsx).
      // Reading is complete when the content's bottom reaches the viewport
      // bottom — i.e. you can see the whole tail of the article.
      if (totalMins !== undefined) {
        const totalSecs = totalMins * 60;
        const contentEl = titleEl.nextElementSibling as HTMLElement | null;
        if (contentEl) {
          const cRect = contentEl.getBoundingClientRect();
          const visibleArea = Math.max(1, window.innerHeight - headerH);
          const scrolled = headerH - cRect.top;
          const total = Math.max(1, cRect.height - visibleArea);
          const read = Math.max(0, Math.min(1, scrolled / total));
          setSecondsLeft(Math.max(0, Math.ceil(totalSecs * (1 - read))));
        } else {
          setSecondsLeft(totalSecs);
        }
      } else {
        setSecondsLeft(null);
      }
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
  }, [titleEl, totalMins]);

  return (
    <Ctx.Provider
      value={{ post, setPost, registerTitleEl, progress, secondsLeft }}
    >
      {children}
    </Ctx.Provider>
  );
}

export { BANNER_RANGE };
