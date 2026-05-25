import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import Footer from '../../../components/Footer/Footer';

describe('Footer', () => {
  it('renders the 3-column nav links (Home / Blog / Buy Me Crypto)', () => {
    const html = renderToStaticMarkup(<Footer />);
    expect(html).toContain('Home');
    expect(html).toContain('Blog');
    expect(html).toContain('Buy Me Crypto');
  });

  it('renders the social icon row (github / x / linkedin)', () => {
    const html = renderToStaticMarkup(<Footer />);
    expect(html).toContain('aria-label="github"');
    expect(html).toContain('aria-label="x"');
  });

  it('renders the sign-off line', () => {
    const html = renderToStaticMarkup(<Footer />);
    expect(html).toContain('parichay');
    expect(html).toContain('baymac.lol');
    expect(html).toContain('rolling bassline energy');
  });

  it('does NOT embed a Mixcloud iframe (now playing was removed per F1)', () => {
    const html = renderToStaticMarkup(<Footer />);
    expect(html).not.toContain('<iframe');
    expect(html).not.toContain('now playing');
  });
});
