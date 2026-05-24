// Vitest setup file — runs once before any test in any project.
// Add global mocks, polyfills, or extensions here.

// React 19 act() needs this global to recognize the test environment.
// Otherwise it logs "The current testing environment is not configured
// to support act(...)" warnings on every call.
// biome-ignore lint/suspicious/noExplicitAny: globalThis typing edge case
(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;

// matchMedia polyfill for happy-dom (needed by useViewport hook + CSS @media tests)
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
