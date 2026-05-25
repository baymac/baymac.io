import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

// next/image renders a <img> in SSR — minimal stub keeps the test isolated
// from next's transformer.
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({
    alt,
    src,
    width,
    height,
  }: {
    alt: string;
    src: string;
    width: number;
    height: number;
  }) => (
    // biome-ignore lint/performance/noImgElement: intentional <img> in a test mock — replacing next/image with a plain element keeps the unit test free of next runtime + image-optimizer wiring.
    <img alt={alt} src={src} width={width} height={height} />
  ),
}));

import Hero from '../../../components/Hero/Hero';

describe('Hero', () => {
  it('renders the polaroid alt text with full descriptive copy', () => {
    const html = renderToStaticMarkup(<Hero />);
    expect(html).toContain(
      'Parichay&#x27;s avatar — a red tabby cat wearing DJ headphones'
    );
  });

  it('renders both desktop and mobile compositions in the DOM', () => {
    const html = renderToStaticMarkup(<Hero />);
    // Both compositions render — CSS @media queries hide the wrong one.
    expect(html).toMatch(/desktop/);
    expect(html).toMatch(/mobile/);
    // The name appears twice (once per composition).
    const matches = html.match(/hey, i&#x27;m parichay/g) ?? [];
    expect(matches.length).toBe(2);
  });

  it('renders the two hero postits with their color tokens', () => {
    const html = renderToStaticMarkup(<Hero />);
    // Postit color classes: color1 (currently in), color2 (dj sets)
    expect(html).toMatch(/color1/);
    expect(html).toMatch(/color2/);
    expect(html).toContain('currently in:');
    expect(html).toContain('mixcloud.com/jake_fk');
  });
});
