import { act, createElement, type FC } from 'react';
import { createRoot, type Root } from 'react-dom/client';

interface RenderHookResult<T> {
  current: { value: T | undefined };
  unmount: () => Promise<void>;
  rerender: () => Promise<void>;
}

/**
 * Minimal renderHook helper — runs the hook inside a real React render so
 * `useEffect` fires. Suitable for hooks that mutate the DOM directly
 * (e.g. usePreventScroll). The returned `current.value` reflects the last
 * value the hook returned.
 */
export async function renderHook<T>(
  hook: () => T
): Promise<RenderHookResult<T>> {
  const result: { value: T | undefined } = { value: undefined };
  const container = document.createElement('div');
  document.body.appendChild(container);
  let root: Root | null = null;

  const HookHost: FC = () => {
    result.value = hook();
    return null;
  };

  await act(async () => {
    root = createRoot(container);
    root.render(createElement(HookHost));
  });

  return {
    current: result,
    rerender: async () => {
      await act(async () => {
        root?.render(createElement(HookHost));
      });
    },
    unmount: async () => {
      await act(async () => {
        root?.unmount();
      });
      container.remove();
    },
  };
}
