import { describe, expect, it, mock } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

mock.module('../../../lib/posts', () => ({
  getSortedPostsData: () => [
    { id: 'newest', title: 'Newest Post', date: '2026-05-20' },
    { id: 'middle', title: 'Middle Post', date: '2026-04-15' },
    { id: 'oldest', title: 'Oldest Post', date: '2026-01-01' },
  ],
}));

import NextPostCard from '../../../components/Blog/NextPostCard';

describe('NextPostCard', () => {
  it('links to the chronologically-next (older) post', () => {
    const html = renderToStaticMarkup(<NextPostCard currentPostId="newest" />);
    expect(html).toContain('/posts/middle');
    expect(html).toContain('Middle Post');
  });

  it('wraps around to the most recent when at the oldest post', () => {
    const html = renderToStaticMarkup(<NextPostCard currentPostId="oldest" />);
    expect(html).toContain('/posts/newest');
    expect(html).toContain('Newest Post');
  });

  it('renders the "turn the page" label', () => {
    const html = renderToStaticMarkup(<NextPostCard currentPostId="middle" />);
    expect(html).toContain('turn the page');
    expect(html).toContain('Oldest Post');
  });

  it('returns null when the current post is not found', () => {
    const html = renderToStaticMarkup(<NextPostCard currentPostId="missing" />);
    expect(html).toBe('');
  });
});
