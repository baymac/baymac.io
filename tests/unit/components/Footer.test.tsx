import { readFileSync } from 'node:fs';
import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Footer from '../../../components/Footer/Footer';

const MIXCLOUD_HTML =
  '<iframe width="100%" height="120" src="https://player-widget.mixcloud.com/widget/iframe/?feed=%2Fjake_fk%2Flatest%2F" frameborder="0"></iframe>';

describe('Footer (async Server Component)', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('renders the Mixcloud embed when oEmbed succeeds', async () => {
    globalThis.fetch = vi.fn(async () => ({
      ok: true,
      json: async () => ({ html: MIXCLOUD_HTML, title: 'latest set' }),
    })) as unknown as typeof fetch;

    const element = await Footer();
    const html = renderToStaticMarkup(element);

    expect(html).toContain('now playing');
    expect(html).toContain('<iframe');
    expect(html).toContain('player-widget.mixcloud.com');
    // Perf 4B: iframe should be lazy-loaded.
    expect(html).toContain('loading="lazy"');
  });

  it('calls the Mixcloud oEmbed endpoint with a 24h revalidate hint', async () => {
    const fetchMock = vi.fn(async () => ({
      ok: true,
      json: async () => ({ html: MIXCLOUD_HTML }),
    })) as unknown as typeof fetch;
    globalThis.fetch = fetchMock;

    await Footer();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [calledUrl, calledInit] = (
      fetchMock as unknown as ReturnType<typeof vi.fn>
    ).mock.calls[0];
    expect(String(calledUrl)).toContain('mixcloud.com/oembed');
    expect(String(calledUrl)).toContain('jake_fk');
    expect(calledInit).toMatchObject({ next: { revalidate: 86400 } });
  });

  it('falls back to the 3-col grid when oEmbed fails (network error)', async () => {
    globalThis.fetch = vi.fn(async () => {
      throw new Error('boom');
    }) as unknown as typeof fetch;

    const element = await Footer();
    const html = renderToStaticMarkup(element);

    expect(html).not.toContain('<iframe');
    expect(html).toContain('Home');
    expect(html).toContain('Blog');
    expect(html).toContain('Buy Me Crypto');
    expect(html).toContain('github');
    expect(html).toContain('linkedin');
  });

  it('falls back to the 3-col grid when oEmbed responds non-OK', async () => {
    globalThis.fetch = vi.fn(async () => ({
      ok: false,
      status: 404,
      json: async () => ({}),
    })) as unknown as typeof fetch;

    const element = await Footer();
    const html = renderToStaticMarkup(element);

    expect(html).not.toContain('<iframe');
    expect(html).toContain('Home');
    expect(html).toContain('Blog');
  });

  it('falls back when oEmbed returns no html field', async () => {
    globalThis.fetch = vi.fn(async () => ({
      ok: true,
      json: async () => ({ title: 'no embed' }),
    })) as unknown as typeof fetch;

    const element = await Footer();
    const html = renderToStaticMarkup(element);

    expect(html).not.toContain('<iframe');
    expect(html).toContain('Home');
  });
});

describe('next.config.js CSP', () => {
  it('contains a frame-src directive allowing Mixcloud domains', () => {
    const configPath = path.resolve(__dirname, '../../../next.config.js');
    const source = readFileSync(configPath, 'utf-8');

    expect(source).toMatch(
      /frame-src[^;]*https:\/\/www\.mixcloud\.com[^;]*https:\/\/player-widget\.mixcloud\.com/
    );
  });
});
