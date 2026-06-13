import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import PostBannerProvider, {
  usePostBanner,
} from '../../../context/PostBannerProvider';

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  document.body.innerHTML = '';
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(async () => {
  await act(async () => {
    root?.unmount();
  });
  document.body.innerHTML = '';
});

// Renders a consumer child that captures context values into `out`.
function ContextCapture({ out }: { out: Record<string, unknown> }) {
  const ctx = usePostBanner();
  Object.assign(out, ctx);
  return null;
}

async function renderProvider(out: Record<string, unknown>) {
  await act(async () => {
    root = createRoot(container);
    root.render(
      createElement(PostBannerProvider, null, createElement(ContextCapture, { out }))
    );
  });
}

describe('PostBannerProvider', () => {
  it('provides default context values on first render', async () => {
    const out: Record<string, unknown> = {};
    await renderProvider(out);
    expect(out.post).toBeNull();
    expect(out.progress).toBe(0);
    expect(out.secondsLeft).toBeNull();
    expect(typeof out.setPost).toBe('function');
    expect(typeof out.registerTitleEl).toBe('function');
  });

  it('setPost propagates new post to consumers', async () => {
    const out: Record<string, unknown> = {};
    await renderProvider(out);

    await act(async () => {
      (out.setPost as (p: { title: string; mins?: number } | null) => void)({
        title: 'Hello World',
        mins: 3,
      });
    });

    expect((out.post as { title: string } | null)?.title).toBe('Hello World');
  });

  it('setPost with null clears the post', async () => {
    const out: Record<string, unknown> = {};
    await renderProvider(out);

    await act(async () => {
      (out.setPost as (p: { title: string } | null) => void)({ title: 'Test' });
    });
    await act(async () => {
      (out.setPost as (p: null) => void)(null);
    });

    expect(out.post).toBeNull();
  });

  it('registerTitleEl with null keeps progress at 0', async () => {
    const out: Record<string, unknown> = {};
    await renderProvider(out);

    await act(async () => {
      (out.registerTitleEl as (el: HTMLElement | null) => void)(null);
    });

    expect(out.progress).toBe(0);
  });

  it('secondsLeft is null when no post is set', async () => {
    const out: Record<string, unknown> = {};
    await renderProvider(out);
    expect(out.secondsLeft).toBeNull();
  });

  it('provides stable registerTitleEl reference (useCallback)', async () => {
    const out: Record<string, unknown> = {};
    await renderProvider(out);
    const first = out.registerTitleEl;

    // Trigger a re-render via setPost.
    await act(async () => {
      (out.setPost as (p: { title: string }) => void)({ title: 're-render' });
    });

    expect(out.registerTitleEl).toBe(first);
  });
});
