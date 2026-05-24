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
  it('renders exactly 3 featured cards', () => {
    const html = renderToStaticMarkup(<Projects />);
    const starMatches = html.match(/aria-hidden="true">★</g) ?? [];
    expect(starMatches.length).toBe(3);
  });

  it('renders the remaining 13 projects in the secondary grid', () => {
    const html = renderToStaticMarkup(<Projects />);
    // 16 projects total, 3 featured, 13 secondary
    const secondaryMatches = html.match(/secondaryCard/g) ?? [];
    expect(secondaryMatches.length).toBe(13);
  });

  it('renders prize annotation on featured cards', () => {
    const html = renderToStaticMarkup(<Projects />);
    expect(html).toContain('+$3k');
    expect(html).toContain('+$5k');
  });

  it('renders prize context (hackathon / grant name) on featured cards', () => {
    const html = renderToStaticMarkup(<Projects />);
    expect(html).toContain('SUI Bangkok Hacker House');
    expect(html).toContain('Solana Building Out Loud');
    expect(html).toContain('dcSpark grant');
  });
});
