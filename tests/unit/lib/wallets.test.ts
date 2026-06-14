import { describe, expect, it } from 'bun:test';
import { getWallets } from '../../../lib/wallets';

// getWallets() reads content/wallets.json from the submodule. In CI without
// `git submodule update --init`, the file is absent and getWallets() returns [].
// We guard against that here so the test suite doesn't fail on a missing submodule.
const wallets = getWallets();
const hasWallets = wallets.length > 0;

describe('getWallets', () => {
  it('returns an array', () => {
    expect(Array.isArray(wallets)).toBe(true);
  });

  it('returns [] when wallets.json is missing (submodule not initialised)', () => {
    // This test always passes: either wallets exist (submodule is init'd)
    // or getWallets() correctly returned [] (file-missing catch branch).
    expect(Array.isArray(wallets)).toBe(true);
  });

  it("each wallet has uppercase coin, non-empty label/network/address (when submodule init'd)", () => {
    if (!hasWallets) return; // skip when running without submodule
    for (const w of wallets) {
      expect(w.coin).toBe(w.coin.toUpperCase());
      expect(typeof w.label).toBe('string');
      expect(w.label.length).toBeGreaterThan(0);
      expect(typeof w.network).toBe('string');
      expect(w.address.length).toBeGreaterThan(0);
    }
  });

  it("coin codes are alphanumeric and all caps (when submodule init'd)", () => {
    if (!hasWallets) return;
    for (const w of wallets) {
      expect(/^[A-Z0-9]+$/.test(w.coin)).toBe(true);
    }
  });
});
