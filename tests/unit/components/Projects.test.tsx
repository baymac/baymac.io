import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}));

import Projects from '../../../components/Projects/Projects';

describe('Projects', () => {
  it('marks exactly 3 cards as featured with ★', () => {
    const html = renderToStaticMarkup(<Projects />);
    const starMatches = html.match(/aria-label="featured project">★/g) ?? [];
    expect(starMatches.length).toBe(3);
  });

  it('renders all projects in a single uniform grid (no two-tier split)', () => {
    const html = renderToStaticMarkup(<Projects />);
    const cards = html.match(/data-wobble="true"/g) ?? [];
    // 14 projects total in the data set, all rendered as same-size cards.
    expect(cards.length).toBe(14);
  });

  it('renders prize annotation on featured cards', () => {
    const html = renderToStaticMarkup(<Projects />);
    expect(html).toContain('+$3k');
    expect(html).toContain('+$5k');
  });

  it('renders the section annotation "(★ = won money)"', () => {
    const html = renderToStaticMarkup(<Projects />);
    expect(html).toContain('= won money');
  });
});
