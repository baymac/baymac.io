import { useEffect } from 'react';

/**
 * Locks body scroll while `dep` is true, and marks the `#app-root` wrapper
 * `aria-hidden` so screen readers don't read background content. If
 * `#app-root` is missing (defensive: shouldn't happen in this app), the
 * scroll lock still toggles cleanly without throwing.
 *
 * Targets `#app-root` (App Router wrapper added in app/layout.tsx) — the
 * previous `__next` ID was a Pages Router legacy and never matched.
 */
export default function usePreventScroll(dep: boolean) {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    const appRoot = document.getElementById('app-root');
    if (dep) {
      body.classList.add('prevent-scroll');
      if (appRoot) appRoot.setAttribute('aria-hidden', 'true');
    } else {
      body.classList.remove('prevent-scroll');
      if (appRoot) appRoot.removeAttribute('aria-hidden');
    }
  }, [dep]);
}
