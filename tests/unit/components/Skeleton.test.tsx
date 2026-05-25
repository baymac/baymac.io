import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Skeleton from '../../../components/Blog/Skeleton';

describe('Skeleton', () => {
  it('renders 3 placeholder cards by default', () => {
    const html = renderToStaticMarkup(<Skeleton />);
    const matches =
      html.match(/_card_/g) ?? html.match(/class="[^"]*card/g) ?? [];
    expect(matches.length).toBe(3);
  });

  it('renders the requested number of cards', () => {
    const html = renderToStaticMarkup(<Skeleton count={5} />);
    const matches =
      html.match(/_card_/g) ?? html.match(/class="[^"]*card/g) ?? [];
    expect(matches.length).toBe(5);
  });

  it('is aria-hidden so the screen reader skips it', () => {
    const html = renderToStaticMarkup(<Skeleton />);
    expect(html).toContain('aria-hidden="true"');
  });
});
