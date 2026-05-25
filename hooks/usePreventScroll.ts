import { useEffect } from 'react';

/**
 * Locks body scroll while `dep` is true, and marks the `#app-root` wrapper
 * `aria-hidden` so screen readers don't read background content. Cleans up
 * on unmount so the lock never leaks past the lifetime of the consumer
 * (modal unmount → body must scroll again).
 *
 * Targets `#app-root` (App Router wrapper added in app/layout.tsx) — the
 * previous `__next` ID was a Pages Router legacy and never matched.
 */
export default function usePreventScroll(dep: boolean) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    const appRoot = document.getElementById('app-root');
    if (!dep) {
      body.classList.remove('prevent-scroll');
      if (appRoot) appRoot.removeAttribute('aria-hidden');
      return;
    }
    body.classList.add('prevent-scroll');
    if (appRoot) appRoot.setAttribute('aria-hidden', 'true');
    return () => {
      body.classList.remove('prevent-scroll');
      if (appRoot) appRoot.removeAttribute('aria-hidden');
    };
  }, [dep]);
}
