import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT ?? '3000';
const BASE_URL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

/* C9 — dev-server handling:
   In local runs Playwright will REUSE whatever server is already responding
   on BASE_URL (whether you started `bun run dev` yourself or it's a different
   long-running process). Only if nothing is listening does it spawn one
   itself. In CI we always spawn `bun run start` against the production build
   so test failures aren't masked by HMR/dev-only behavior. */
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    { name: 'mobile', use: { ...devices['iPhone 14'] } },
    { name: 'tablet', use: { ...devices['iPad (gen 7)'] } },
    {
      name: 'desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 900 },
      },
    },
  ],

  webServer: {
    command: isCI ? 'bun run start' : 'bun run dev',
    url: BASE_URL,
    // Local: attach to an existing dev server on :3000 instead of failing.
    reuseExistingServer: !isCI,
    // Bumped from 120s — Next.js cold-start on first compile can exceed
    // the default when the page isn't pre-warmed.
    timeout: 180_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
