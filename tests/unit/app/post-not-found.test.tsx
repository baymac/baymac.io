import { describe, expect, it, mock } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

mock.module('../../../lib/posts', () => ({
  getSortedPostsData: () => [
    { id: 'a', title: 'A', date: '2026-05-01' },
    { id: 'b', title: 'B', date: '2026-04-01' },
  ],
}));

import PostNotFound from '../../../app/posts/[id]/not-found';

describe('post not-found', () => {
  it('renders the "composted" headline', () => {
    const html = renderToStaticMarkup(<PostNotFound />);
    expect(html).toContain('this post got composted');
  });

  it('renders both recovery links', () => {
    const html = renderToStaticMarkup(<PostNotFound />);
    expect(html).toContain('href="/blog"');
    expect(html).toMatch(/href="\/posts\/(a|b)"/);
    expect(html).toContain('browse all posts');
    expect(html).toContain('random post');
  });
});
