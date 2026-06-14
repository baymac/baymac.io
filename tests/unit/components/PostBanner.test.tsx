import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test';
import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';

// Stub out the PostBannerProvider context with controllable values.
let ctxValues = {
  post: null as { title: string; mins?: number } | null,
  progress: 0,
  secondsLeft: null as number | null,
  setPost: () => {},
  registerTitleEl: () => {},
};

mock.module('../../../context/PostBannerProvider', () => ({
  usePostBanner: () => ctxValues,
  default: ({ children }: { children: React.ReactNode }) => children,
  BANNER_RANGE: 52,
}));

import PostBanner from '../../../components/Nav/PostBanner';

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  document.body.innerHTML = '';
  container = document.createElement('div');
  document.body.appendChild(container);
  // Reset to defaults.
  ctxValues = {
    post: null,
    progress: 0,
    secondsLeft: null,
    setPost: () => {},
    registerTitleEl: () => {},
  };
});

afterEach(async () => {
  await act(async () => {
    root?.unmount();
  });
  document.body.innerHTML = '';
});

async function render() {
  await act(async () => {
    root = createRoot(container);
    root.render(createElement(PostBanner));
  });
}

describe('PostBanner', () => {
  it('renders nothing when post is null', async () => {
    ctxValues.post = null;
    await render();
    expect(container.innerHTML).toBe('');
  });

  it('renders banner when post is set', async () => {
    ctxValues.post = { title: 'My Post' };
    ctxValues.progress = 0.5;
    await render();
    expect(container.textContent).toContain('My Post');
  });

  it('is aria-hidden when progress <= 0.001', async () => {
    ctxValues.post = { title: 'Test' };
    ctxValues.progress = 0;
    await render();
    const banner = container.firstElementChild as HTMLElement;
    expect(banner?.getAttribute('aria-hidden')).toBe('true');
  });

  it('is not aria-hidden when progress > 0.001', async () => {
    ctxValues.post = { title: 'Test' };
    ctxValues.progress = 0.5;
    await render();
    const banner = container.firstElementChild as HTMLElement;
    expect(banner?.getAttribute('aria-hidden')).toBe('false');
  });

  it('shows "N min left" when secondsLeft >= 60', async () => {
    ctxValues.post = { title: 'Test', mins: 5 };
    ctxValues.secondsLeft = 180;
    await render();
    expect(container.textContent).toContain('3 min left');
  });

  it('shows "N sec left" when 0 < secondsLeft < 60', async () => {
    ctxValues.post = { title: 'Test', mins: 5 };
    ctxValues.secondsLeft = 42;
    await render();
    expect(container.textContent).toContain('42 sec left');
  });

  it('shows done message when secondsLeft is 0', async () => {
    ctxValues.post = { title: 'Test', mins: 5 };
    ctxValues.secondsLeft = 0;
    await render();
    expect(container.textContent).toContain('purr purr ~');
  });

  it('shows no time label when secondsLeft is null', async () => {
    ctxValues.post = { title: 'No time' };
    ctxValues.secondsLeft = null;
    await render();
    expect(container.textContent).not.toContain('min left');
    expect(container.textContent).not.toContain('sec left');
    expect(container.textContent).not.toContain('purr');
  });
});
