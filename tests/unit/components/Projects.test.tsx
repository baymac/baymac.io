import { describe, expect, it, mock } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

mock.module('next/image', () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    // biome-ignore lint/performance/noImgElement: intentional <img> in a test mock — see Hero.test.tsx for the same pattern + rationale.
    <img alt={alt} src={src} />
  ),
}));

import Projects from '../../../components/Projects/Projects';

describe('Projects', () => {
  it('marks all paid projects as featured with ★', () => {
    const html = renderToStaticMarkup(<Projects />);
    // Star is now an absolute element at top-right (B3) — match the
    // aria-label attribute, not the inline string position.
    const starMatches = html.match(/aria-label="featured project"/g) ?? [];
    expect(starMatches.length).toBe(5);
  });

  it('renders all projects in a single uniform grid (no two-tier split)', () => {
    const html = renderToStaticMarkup(<Projects />);
    const cards = html.match(/data-wobble="true"/g) ?? [];
    expect(cards.length).toBe(16);
  });

  it('does NOT render the +$prize line on featured cards (B3)', () => {
    // Per B3 the explicit "+$3k" / "+$5k" lines were removed so all cards
    // stay the same size; prize amount lives in the star's `title` tooltip.
    const html = renderToStaticMarkup(<Projects />);
    expect(html).not.toMatch(/>\+\$3k<|>\+\$5k</);
  });

  it('keeps the prize amount discoverable via the star title attribute', () => {
    const html = renderToStaticMarkup(<Projects />);
    expect(html).toContain('Featured — $3k');
    expect(html).toContain('Featured — $5k');
  });

  it('renders the section annotation "(★ = got paid)"', () => {
    const html = renderToStaticMarkup(<Projects />);
    expect(html).toContain('= got paid');
  });
});
