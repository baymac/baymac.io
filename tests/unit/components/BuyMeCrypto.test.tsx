import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('use-clipboard-copy', () => ({
  useClipboard: () => {
    const state = { copied: false };
    return {
      copy: (_v: string) => {
        // Default mock: simulate successful copy.
        state.copied = true;
      },
      copied: state.copied,
    };
  },
}));

import BuyMeCrypto from '../../../components/BuyMeCrypto/BuyMeCrypto';

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

async function render(ui: React.ReactNode) {
  await act(async () => {
    root = createRoot(container);
    root.render(ui);
  });
}

describe('BuyMeCrypto', () => {
  it('renders a wallet address and the verify caption', async () => {
    await render(<BuyMeCrypto />);
    expect(container.textContent).toContain(
      'bc1qvrl9t4d9gk438v4k3qfwdj2kqquzma2ses7tqw'
    );
    expect(container.textContent).toContain(
      'shown above is the full address — please verify before sending'
    );
  });

  it('renders a copy button with an accessible label', async () => {
    await render(<BuyMeCrypto />);
    const btn = container.querySelector('button[aria-label^="Copy"]');
    expect(btn).not.toBeNull();
  });

  it('shows the error Snackbar when clipboard API is missing', async () => {
    // Strip clipboard API to force the error branch.
    const original = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    });

    await render(<BuyMeCrypto />);
    const btn = container.querySelector(
      'button[aria-label^="Copy"]'
    ) as HTMLButtonElement;
    await act(async () => {
      btn.click();
    });

    expect(container.textContent).toContain(
      'copy failed — select address manually'
    );

    if (original) Object.defineProperty(navigator, 'clipboard', original);
  });
});
