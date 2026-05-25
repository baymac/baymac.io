import { expect, test } from '@playwright/test';
import { checkA11y } from '../helpers/a11y';

test.describe('/blog', () => {
  test('renders the handwritten heading and sticky-note grid', async ({
    page,
  }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'things i wrote'
    );
    await expect(page.getByText('(blogs = searchable memories)')).toBeVisible();
    // F13: tag filter is removed. Just verify the grid renders cards.
    await expect(page.locator('article').first()).toBeVisible();
  });

  test('does NOT render a tag filter (per F13)', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.getByRole('tab')).toHaveCount(0);
  });

  test('clicking a post navigates to /posts/[id]', async ({ page }) => {
    await page.goto('/blog');
    // Each card wraps its <article> in a real <Link>. Click the link directly.
    await page.locator('a[href^="/posts/"]').first().click();
    await page.waitForURL(/\/posts\/[^/]+$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('passes axe-core a11y AA', async ({ page }) => {
    await page.goto('/blog');
    await checkA11y(page);
  });
});
