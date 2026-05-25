#!/usr/bin/env node
/**
 * Regenerate content/wallets.checksum after editing content/wallets.json.
 *
 * The build-time gate (scripts/validateWallets.js) refuses to ship if the
 * recorded SHA-256 doesn't match the file. Run this whenever you change
 * an address, label, network — or the JSON shape — so the gate has a
 * fresh signature to verify against.
 *
 * Usage: node scripts/walletsChecksum.js
 */

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const REPO_ROOT = path.resolve(__dirname, '..');
const WALLETS_PATH = path.join(REPO_ROOT, 'content', 'wallets.json');
const CHECKSUM_PATH = path.join(REPO_ROOT, 'content', 'wallets.checksum');

if (!fs.existsSync(WALLETS_PATH)) {
  process.stderr.write(`walletsChecksum: not found: ${WALLETS_PATH}\n`);
  process.exit(1);
}

const raw = fs.readFileSync(WALLETS_PATH, 'utf-8');
const hash = crypto.createHash('sha256').update(raw, 'utf-8').digest('hex');
fs.writeFileSync(CHECKSUM_PATH, `${hash}\n`, 'utf-8');
process.stdout.write(`walletsChecksum: ${hash} → ${CHECKSUM_PATH}\n`);
