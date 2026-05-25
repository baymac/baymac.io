#!/usr/bin/env node
/**
 * scripts/validateWallets.js — wallet manifest verification gate (T18, Arch 1D).
 *
 * Checks:
 *   1. `content/wallets.json` exists (submodule must be initialized)
 *   2. `content/wallets.checksum` exists and matches SHA-256 of wallets.json
 *   3. No address matches a known placeholder (prototype scaffolding values)
 *   4. Each address matches its chain's format (basic regex per chain)
 *
 * Run from CI (`.github/workflows/validate-wallets.yml`) and locally as part of
 * the `build` script. Exits non-zero on any failure with a clear message.
 *
 * The file is intentionally framework-free (plain Node) so it can run before
 * `next build` without paying for the Next.js boot.
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const REPO_ROOT = path.resolve(__dirname, '..');
// Path overrides via env vars exist only for test isolation — production
// always reads from content/.
const WALLETS_PATH =
  process.env.VALIDATE_WALLETS_PATH ||
  path.join(REPO_ROOT, 'content', 'wallets.json');
const CHECKSUM_PATH =
  process.env.VALIDATE_WALLETS_CHECKSUM_PATH ||
  path.join(REPO_ROOT, 'content', 'wallets.checksum');

// Known placeholder addresses from the prototype. Any of these in production
// → ship blocker. Patterns are deliberately loose (substring or regex) so a
// re-paste of the same garbage with whitespace still trips.
const PLACEHOLDER_PATTERNS = [
  /Bay4mAcCryptoPariChAypArich9aybBaybayMacM4cS0l/i,
  /0x4a3bC5a8e7c1c9a5d4F9b2eEf7c8a91Bf3D2C4e6A/i,
  /^addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj0/i,
];

// Chain format validators. Returns null on success, or an error string.
const BECH32_CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

function isBech32Body(body) {
  for (const ch of body.toLowerCase()) {
    if (!BECH32_CHARSET.includes(ch)) return false;
  }
  return true;
}

const CHAIN_VALIDATORS = {
  btc(addr) {
    if (typeof addr !== 'string') return 'BTC address must be a string';
    if (!addr.startsWith('bc1')) return 'BTC address must start with "bc1"';
    if (addr.length < 39 || addr.length > 62) {
      return `BTC address length ${addr.length} outside 39–62 range`;
    }
    const body = addr.slice(3);
    if (!isBech32Body(body)) {
      return 'BTC address contains non-bech32 characters';
    }
    return null;
  },
  eth(addr) {
    if (typeof addr !== 'string') return 'ETH address must be a string';
    if (!/^0x[0-9a-fA-F]{40}$/.test(addr)) {
      return 'ETH address must be "0x" + 40 hex chars';
    }
    return null;
  },
  sol(addr) {
    if (typeof addr !== 'string') return 'SOL address must be a string';
    if (addr.length < 32 || addr.length > 44) {
      return `SOL address length ${addr.length} outside 32–44 range`;
    }
    if (!/^[1-9A-HJ-NP-Za-km-z]+$/.test(addr)) {
      return 'SOL address contains non-base58 characters';
    }
    return null;
  },
  ada(addr) {
    if (typeof addr !== 'string') return 'ADA address must be a string';
    if (!addr.startsWith('addr1')) return 'ADA address must start with "addr1"';
    const body = addr.slice(5);
    if (!isBech32Body(body)) {
      return 'ADA address contains non-bech32 characters';
    }
    return null;
  },
  sui(addr) {
    if (typeof addr !== 'string') return 'SUI address must be a string';
    if (!/^0x[0-9a-fA-F]{64}$/.test(addr)) {
      return 'SUI address must be "0x" + 64 hex chars';
    }
    return null;
  },
};

function fail(message) {
  process.stderr.write(`validateWallets: ${message}\n`);
  process.exit(1);
}

function readFileOrFail(filePath, description) {
  if (!fs.existsSync(filePath)) {
    fail(
      `${description} not found at ${filePath}. ` +
        'The `content/` submodule is required. Run `git submodule update --init --recursive` and try again.'
    );
  }
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    fail(`failed to read ${description} at ${filePath}: ${err.message}`);
  }
}

function sha256(str) {
  return crypto.createHash('sha256').update(str, 'utf-8').digest('hex');
}

function collectAddresses(wallets) {
  // wallets is expected to be an object keyed by chain → address (or
  // { address, label, ... }). Be liberal in what we accept so the gate
  // catches placeholders regardless of exact JSON shape.
  const out = [];
  function walk(node, parentKey) {
    if (node == null) return;
    if (typeof node === 'string') {
      out.push({ key: parentKey, value: node });
      return;
    }
    if (Array.isArray(node)) {
      for (const item of node) walk(item, parentKey);
      return;
    }
    if (typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) {
        // Treat common "address" fields as the address for their parent chain.
        if (k === 'address' || k === 'addr') {
          if (typeof v === 'string') out.push({ key: parentKey, value: v });
        } else {
          walk(v, k);
        }
      }
    }
  }
  walk(wallets, null);
  return out;
}

function main() {
  const walletsRaw = readFileOrFail(WALLETS_PATH, 'wallets.json');
  const checksumRaw = readFileOrFail(CHECKSUM_PATH, 'wallets.checksum');

  // SHA-256 comparison.
  const expected = checksumRaw.trim().split(/\s+/)[0].toLowerCase();
  const actual = sha256(walletsRaw).toLowerCase();
  if (expected !== actual) {
    fail(
      `wallets.json checksum mismatch.\n  expected: ${expected}\n  actual:   ${actual}\n` +
        'Owner must re-sign by updating content/wallets.checksum to match wallets.json.'
    );
  }

  // Parse JSON.
  let wallets;
  try {
    wallets = JSON.parse(walletsRaw);
  } catch (err) {
    fail(`wallets.json is not valid JSON: ${err.message}`);
  }

  const entries = collectAddresses(wallets);
  if (entries.length === 0) {
    fail('wallets.json contains no addresses');
  }

  // Placeholder check (runs against every string in the file, not just
  // known chain keys — defence in depth).
  for (const { key, value } of entries) {
    for (const pattern of PLACEHOLDER_PATTERNS) {
      if (pattern.test(value)) {
        fail(
          `placeholder address detected at "${key ?? '?'}": ${value}\n` +
            'Replace with a real owner-confirmed address before shipping.'
        );
      }
    }
  }

  // Format check per chain (only for known chain keys).
  for (const { key, value } of entries) {
    const chain = (key || '').toLowerCase();
    const validator = CHAIN_VALIDATORS[chain];
    if (!validator) continue; // unknown chain key → skip format check (still gated by checksum + placeholders)
    const err = validator(value);
    if (err) {
      fail(`${chain.toUpperCase()} address invalid: ${err} (value: ${value})`);
    }
  }

  process.stdout.write('wallets.json verified\n');
}

// Run unless required as a module (so tests can import helpers).
if (require.main === module) {
  main();
}

module.exports = {
  CHAIN_VALIDATORS,
  PLACEHOLDER_PATTERNS,
  collectAddresses,
  sha256,
  isBech32Body,
  __main: main,
};
