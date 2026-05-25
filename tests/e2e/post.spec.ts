import { expect, test } from '@playwright/test';
import { checkA11y } from '../helpers/a11y';

test.describe('/posts/[id]', () => {
  // Navigate via the blog list so we land on a real post regardless of which
  // posts the user has in their content/ submodule.
  async function gotoFirstPost(page: import('@playwright/test').Page) {
    await page.goto('/blog');
    const firstPost = page.locator('article').first();
    await firstPost.locator('..').click();
    await page.waitForURL(/\/posts\/[^/]+$/);
  }

  test('renders post heading + body', async ({ page }) => {
    await gotoFirstPost(page);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('renders next-post exit ramp at bottom', async ({ page }) => {
    await gotoFirstPost(page);
    // Next-post card exists somewhere on the page
    await expect(page.locator('a[href^="/posts/"]').first()).toBeVisible();
    // Social/tip row: RSS link
    await expect(page.getByRole('link', { name: /rss|feed/i })).toBeVisible();
  });

  test('passes axe-core a11y AA', async ({ page }) => {
    await gotoFirstPost(page);
    // Wait for full network idle so streaming-SSR <head> (incl. document title)
    // is fully populated before axe walks the DOM.
    await page.waitForLoadState('networkidle');
    await page.waitForFunction(() => document.title.length > 0);
    await checkA11y(page);
  });

  test('custom 404 fires on /posts/totally-bogus-slug', async ({ page }) => {
    const response = await page.goto('/posts/totally-bogus-slug');
    expect(response?.status()).toBe(404);
    // Should be the custom post-404, not the root not-found
    await expect(
      page.getByText(/composted|browse all posts/i).first()
    ).toBeVisible();
  });
});
