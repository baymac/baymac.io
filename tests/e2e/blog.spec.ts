import { expect, test } from '@playwright/test';
import { checkA11y } from '../helpers/a11y';

test.describe('/blog', () => {
  test('renders the handwritten heading and sticky-note grid', async ({
    page,
  }) => {
    await page.goto('/blog');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'the blog'
    );
    // Heading annotation
    await expect(page.getByText('(things i wrote down)')).toBeVisible();
    // Filter row with at least "all"
    await expect(page.getByRole('tab', { name: /all/i })).toBeVisible();
  });

  test('clicking a tag filter narrows the list', async ({ page }) => {
    await page.goto('/blog');
    // Pick any non-"all" tab if available
    const tabs = page.getByRole('tab');
    const tabCount = await tabs.count();
    if (tabCount > 1) {
      const firstTagTab = tabs.nth(1);
      const beforeCards = await page.locator('article').count();
      await firstTagTab.click();
      // Wait for transition; cards re-render
      await page.waitForLoadState('networkidle');
      const afterCards = await page.locator('article').count();
      expect(afterCards).toBeLessThanOrEqual(beforeCards);
    }
  });

  test('clicking a post navigates to /posts/[id]', async ({ page }) => {
    await page.goto('/blog');
    const firstPost = page.locator('article').first();
    await firstPost.locator('..').click();
    await page.waitForURL(/\/posts\/[^/]+$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('passes axe-core a11y AA', async ({ page }) => {
    await page.goto('/blog');
    await checkA11y(page);
  });
});
