import fs from 'node:fs';
import path from 'node:path';

export interface Wallet {
  coin: string;
  label: string;
  network: string;
  address: string;
}

const WALLETS_PATH = path.join(
  /*turbopackIgnore: true*/ process.cwd(),
  'content',
  'wallets.json'
);

/**
 * Read content/wallets.json (object keyed by chain code) and flatten it
 * into a UI-friendly array. The checksum gate in scripts/validateWallets.js
 * already enforces shape + placeholder + format at build time, so here we
 * only need to handle "file missing" (fresh clone without `git submodule
 * update --init`) — fall back to an empty list rather than crashing.
 */
export function getWallets(): Wallet[] {
  let raw: string;
  try {
    raw = fs.readFileSync(WALLETS_PATH, 'utf-8');
  } catch {
    return [];
  }
  const parsed = JSON.parse(raw) as Record<
    string,
    { label: string; network: string; address: string }
  >;
  return Object.entries(parsed).map(([coin, data]) => ({
    coin: coin.toUpperCase(),
    label: data.label,
    network: data.network,
    address: data.address,
  }));
}
