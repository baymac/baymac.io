// bun:test preload — runs once before any test (configured in bunfig.toml).
// Registers a DOM via happy-dom and wires up the globals our component and
// hook tests rely on.

import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { plugin } from 'bun';

// CSS Modules: bun doesn't class-map .module.css imports in the test runtime,
// so `styles.foo` would be undefined. Identity-map every key to its own name
// (`styles.foo === 'foo'`) so component tests can assert on class names. Plain
// .css imports become no-ops.
plugin({
  name: 'css-modules-identity',
  setup(build) {
    build.onLoad({ filter: /\.module\.css$/ }, () => ({
      loader: 'js',
      contents:
        'export default new Proxy({}, { get: (_, k) => typeof k === "string" ? k : undefined });',
    }));
    build.onLoad({ filter: /(?<!\.module)\.css$/ }, () => ({
      loader: 'js',
      contents: 'export default {};',
    }));
  },
});

GlobalRegistrator.register();

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
