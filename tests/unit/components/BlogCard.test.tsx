import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import BlogCard from '../../../components/Blog/BlogCard';

describe('BlogCard', () => {
  const base = {
    id: 'shipping-a-cardano-dapp',
    title: 'Shipping a Cardano dApp',
    date: '2024-11-12',
    tags: ['crypto', 'cardano'],
    color: 1 as const,
  };

  it('renders title and link to /posts/[id]', () => {
    const html = renderToStaticMarkup(<BlogCard {...base} />);
    expect(html).toContain('Shipping a Cardano dApp');
    expect(html).toContain('/posts/shipping-a-cardano-dapp');
  });

  it('renders all tags with # prefix', () => {
    const html = renderToStaticMarkup(<BlogCard {...base} />);
    expect(html).toContain('#crypto');
    expect(html).toContain('#cardano');
  });

  it('omits ai badge when aiGen is false/missing', () => {
    const html = renderToStaticMarkup(<BlogCard {...base} />);
    expect(html).not.toContain('AI Badge');
  });

  it('renders ai badge when aiGen is true', () => {
    const html = renderToStaticMarkup(<BlogCard {...base} aiGen={true} />);
    expect(html).toContain('AI Badge');
  });

  it('applies the requested postit color class', () => {
    const html = renderToStaticMarkup(<BlogCard {...base} color={3} />);
    expect(html).toMatch(/color3/);
  });

  it('applies rotate transform on the link wrapper', () => {
    const html = renderToStaticMarkup(<BlogCard {...base} rotate={-1.2} />);
    expect(html).toContain('rotate(-1.2deg)');
  });

  it('uses data-wobble on the card (paper element, per DESIGN.md)', () => {
    const html = renderToStaticMarkup(<BlogCard {...base} />);
    expect(html).toContain('data-wobble');
  });
});
