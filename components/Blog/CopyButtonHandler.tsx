'use client';

import { useEffect } from 'react';

const COPY_FEEDBACK_MS = 2000;

export default function CopyButtonHandler() {
  useEffect(() => {
    const container = document.querySelector<HTMLDivElement>(
      '[data-post-content]'
    );
    if (!container) return;

    const timers = new Map<HTMLButtonElement, ReturnType<typeof setTimeout>>();

    const onClick = async (e: MouseEvent) => {
      const btn = (e.target as Element).closest<HTMLButtonElement>('.copy-btn');
      if (!btn) return;

      const pre = btn.closest('pre');
      const text = (pre?.querySelector('code') ?? pre)?.innerText ?? '';

      try {
        await navigator.clipboard.writeText(text);
      } catch {
        return;
      }

      const existing = timers.get(btn);
      if (existing) clearTimeout(existing);

      btn.dataset.copied = 'true';
      btn.setAttribute('aria-label', 'Copied!');

      timers.set(
        btn,
        setTimeout(() => {
          delete btn.dataset.copied;
          btn.setAttribute('aria-label', 'Copy code');
          timers.delete(btn);
        }, COPY_FEEDBACK_MS)
      );
    };

    container.addEventListener('click', onClick);
    return () => {
      container.removeEventListener('click', onClick);
      for (const timer of timers.values()) clearTimeout(timer);
    };
  }, []);

  return null;
}
