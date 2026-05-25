/**
 * Tests for scripts/validateWallets.js — wallet manifest verification gate
 * (T18, Arch 1D).
 *
 * Strategy: each case writes fixture files into a per-test temp directory and
 * runs the validator as a subprocess with VALIDATE_WALLETS_PATH +
 * VALIDATE_WALLETS_CHECKSUM_PATH env overrides pointing at the temp files.
 * This avoids depending on (or clobbering) the real content/ submodule files.
 */

import { execFileSync } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import * as validator from '../../../scripts/validateWallets.js';

const REPO_ROOT = path.resolve(__dirname, '../../..');
const SCRIPT_PATH = path.join(REPO_ROOT, 'scripts', 'validateWallets.js');

function sha256(s: string): string {
  return crypto.createHash('sha256').update(s, 'utf-8').digest('hex');
}

let tmpDir: string;
let walletsPath: string;
let checksumPath: string;

function setFixture(opts: {
  walletsJson?: string | null;
  checksum?: string | null;
}) {
  if (opts.walletsJson != null) fs.writeFileSync(walletsPath, opts.walletsJson);
  if (opts.checksum != null) fs.writeFileSync(checksumPath, opts.checksum);
}

interface RunResult {
  code: number;
  stdout: string;
  stderr: string;
}

function runScript(): RunResult {
  try {
    const stdout = execFileSync(process.execPath, [SCRIPT_PATH], {
      encoding: 'utf-8',
      // Pipe ALL three streams so the child's stderr is captured (asserted
      // on by negative-path tests) instead of inheriting the parent's
      // stderr — which would print "validateWallets: ..." noise to the
      // terminal even on green runs.
      stdio: 'pipe',
      env: {
        ...process.env,
        VALIDATE_WALLETS_PATH: walletsPath,
        VALIDATE_WALLETS_CHECKSUM_PATH: checksumPath,
      },
    });
    return { code: 0, stdout, stderr: '' };
  } catch (err: unknown) {
    const e = err as {
      status?: number;
      stdout?: string | Buffer;
      stderr?: string | Buffer;
    };
    return {
      code: e.status ?? 1,
      stdout:
        typeof e.stdout === 'string' ? e.stdout : (e.stdout?.toString() ?? ''),
      stderr:
        typeof e.stderr === 'string' ? e.stderr : (e.stderr?.toString() ?? ''),
    };
  }
}

describe('validateWallets — pure helpers', () => {
  it('exports the chain validators', () => {
    expect(validator.CHAIN_VALIDATORS.btc).toBeTypeOf('function');
    expect(validator.CHAIN_VALIDATORS.sui).toBeTypeOf('function');
    // ETH/SOL/ADA were dropped when the supported chain list was trimmed.
    expect(Object.keys(validator.CHAIN_VALIDATORS).sort()).toEqual([
      'btc',
      'sui',
    ]);
  });

  describe('BTC validator', () => {
    it('accepts a valid bech32 mainnet address', () => {
      const addr = 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq';
      expect(validator.CHAIN_VALIDATORS.btc(addr)).toBeNull();
    });
    it('rejects non-bc1 prefix', () => {
      expect(
        validator.CHAIN_VALIDATORS.btc('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa')
      ).toMatch(/bc1/);
    });
    it('rejects out-of-range length', () => {
      expect(validator.CHAIN_VALIDATORS.btc('bc1qshort')).toMatch(/length/);
    });
    it('rejects non-bech32 chars', () => {
      const bad = `bc1${'1'.repeat(40)}`;
      expect(validator.CHAIN_VALIDATORS.btc(bad)).toMatch(/bech32/);
    });
  });

  describe('SUI validator', () => {
    it('accepts 0x + 64 hex', () => {
      const addr = `0x${'a'.repeat(64)}`;
      expect(validator.CHAIN_VALIDATORS.sui(addr)).toBeNull();
    });
    it('rejects missing 0x', () => {
      expect(validator.CHAIN_VALIDATORS.sui('a'.repeat(64))).toMatch(/0x/);
    });
    it('rejects wrong length', () => {
      expect(validator.CHAIN_VALIDATORS.sui('0xdeadbeef')).toMatch(/64 hex/);
    });
    it('rejects non-hex chars', () => {
      expect(validator.CHAIN_VALIDATORS.sui(`0x${'z'.repeat(64)}`)).toMatch(
        /64 hex/
      );
    });
  });

  describe('placeholder patterns', () => {
    it('matches the SOL placeholder', () => {
      expect(
        validator.PLACEHOLDER_PATTERNS.some((re) =>
          re.test('Bay4mAcCryptoPariChAypArich9aybBaybayMacM4cS0l')
        )
      ).toBe(true);
    });
    it('matches the ETH placeholder', () => {
      expect(
        validator.PLACEHOLDER_PATTERNS.some((re) =>
          re.test('0x4a3bC5a8e7c1c9a5d4F9b2eEf7c8a91Bf3D2C4e6A')
        )
      ).toBe(true);
    });
    it('matches the ADA placeholder', () => {
      expect(
        validator.PLACEHOLDER_PATTERNS.some((re) =>
          re.test(
            'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj0'
          )
        )
      ).toBe(true);
    });
    it('does NOT match a benign address', () => {
      expect(
        validator.PLACEHOLDER_PATTERNS.some((re) =>
          re.test('0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe')
        )
      ).toBe(false);
    });
  });
});

describe('validateWallets — main() via subprocess', () => {
  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'validate-wallets-'));
    walletsPath = path.join(tmpDir, 'wallets.json');
    checksumPath = path.join(tmpDir, 'wallets.checksum');
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('errors clearly when wallets.json is missing', () => {
    const { code, stderr } = runScript();
    expect(code).toBe(1);
    expect(stderr).toMatch(/wallets\.json not found/);
    expect(stderr).toMatch(/git submodule update --init/);
  });

  it('errors clearly when wallets.checksum is missing', () => {
    setFixture({
      walletsJson: '{"btc":"bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq"}',
    });
    const { code, stderr } = runScript();
    expect(code).toBe(1);
    expect(stderr).toMatch(/wallets\.checksum not found/);
  });

  it('detects a checksum mismatch and names both hashes', () => {
    const json = '{"btc":"bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq"}';
    const wrongHash = 'a'.repeat(64);
    setFixture({ walletsJson: json, checksum: wrongHash });
    const { code, stderr } = runScript();
    expect(code).toBe(1);
    expect(stderr).toMatch(/checksum mismatch/);
    expect(stderr).toContain(wrongHash);
    expect(stderr).toContain(sha256(json));
  });

  it('detects the SOL placeholder address', () => {
    const json = JSON.stringify({
      sol: 'Bay4mAcCryptoPariChAypArich9aybBaybayMacM4cS0l',
    });
    setFixture({ walletsJson: json, checksum: sha256(json) });
    const { code, stderr } = runScript();
    expect(code).toBe(1);
    expect(stderr).toMatch(/placeholder address detected/);
  });

  it('passes with valid BTC + SUI addresses + matching checksum', () => {
    const json = JSON.stringify({
      btc: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
      sui: `0x${'a'.repeat(64)}`,
    });
    setFixture({ walletsJson: json, checksum: sha256(json) });
    const { code, stdout, stderr } = runScript();
    expect(stderr).toBe('');
    expect(code).toBe(0);
    expect(stdout).toContain('wallets.json verified');
  });

  it('fails when a BTC address has invalid format', () => {
    const json = JSON.stringify({ btc: 'bc1nope' });
    setFixture({ walletsJson: json, checksum: sha256(json) });
    const { code, stderr } = runScript();
    expect(code).toBe(1);
    expect(stderr).toMatch(/BTC address invalid/);
  });

  it('fails when a SUI address has invalid format', () => {
    const json = JSON.stringify({ sui: '0xnothex' });
    setFixture({ walletsJson: json, checksum: sha256(json) });
    const { code, stderr } = runScript();
    expect(code).toBe(1);
    expect(stderr).toMatch(/SUI address invalid/);
  });
});
