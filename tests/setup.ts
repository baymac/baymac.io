// Vitest setup file — runs once before any test in any project.
// Add global mocks, polyfills, or extensions here.

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
