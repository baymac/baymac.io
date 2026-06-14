import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';

mock.module('use-clipboard-copy', () => ({
  useClipboard: () => ({
    copy: (_v: string) => {},
    copied: false,
  }),
}));

import BuyMeCryptoCard from '../../../components/BuyMeCrypto/BuyMeCryptoCard';
import type { Wallet } from '../../../lib/wallets';

const WALLETS: Wallet[] = [
  { coin: 'BTC', label: 'Bitcoin', network: 'mainnet', address: 'bc1qtest123' },
  { coin: 'SUI', label: 'Sui', network: 'mainnet', address: '0xsuiaddress' },
];

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

describe('BuyMeCryptoCard', () => {
  it('shows empty-state message when wallets array is empty', async () => {
    await render(<BuyMeCryptoCard wallets={[]} />);
    expect(container.textContent).toContain('no wallets configured');
    expect(container.textContent).toContain('wallets.json');
  });

  it('renders the first wallet address by default', async () => {
    await render(<BuyMeCryptoCard wallets={WALLETS} />);
    expect(container.textContent).toContain('bc1qtest123');
    expect(container.textContent).toContain('Bitcoin');
  });

  it('renders coin tab buttons for each wallet', async () => {
    await render(<BuyMeCryptoCard wallets={WALLETS} />);
    const tabs = container.querySelectorAll('[role="tab"]');
    expect(tabs.length).toBe(2);
    expect(tabs[0].textContent).toBe('BTC');
    expect(tabs[1].textContent).toBe('SUI');
  });

  it('first tab is selected by default', async () => {
    await render(<BuyMeCryptoCard wallets={WALLETS} />);
    const tabs = container.querySelectorAll('[role="tab"]');
    expect((tabs[0] as HTMLElement).getAttribute('aria-selected')).toBe('true');
    expect((tabs[1] as HTMLElement).getAttribute('aria-selected')).toBe(
      'false'
    );
  });

  it('switching coin tab shows the selected wallet address', async () => {
    await render(<BuyMeCryptoCard wallets={WALLETS} />);
    const suiTab = container.querySelectorAll(
      '[role="tab"]'
    )[1] as HTMLButtonElement;
    await act(async () => {
      suiTab.click();
    });
    expect(container.textContent).toContain('0xsuiaddress');
    expect(container.textContent).toContain('Sui');
  });

  it('copy button renders with accessible label', async () => {
    await render(<BuyMeCryptoCard wallets={WALLETS} />);
    const btn = container.querySelector('button[aria-label="Copy address"]');
    expect(btn).not.toBeNull();
  });

  it('shows error snackbar when clipboard is unavailable', async () => {
    const original = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    });

    await render(<BuyMeCryptoCard wallets={WALLETS} />);
    const btn = container.querySelector(
      'button[aria-label="Copy address"]'
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
