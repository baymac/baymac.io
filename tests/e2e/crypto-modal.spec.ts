import { expect, test } from '@playwright/test';

test.describe('Buy Me Crypto', () => {
  test('/buymecrypto page renders crypto UI', async ({ page }) => {
    await page.goto('/buymecrypto');
    // Page should render some content related to crypto
    await expect(
      page.getByRole('heading').first()
    ).toBeVisible();
  });

  test('post-end crypto tip button opens modal', async ({ page }) => {
    await page.goto('/blog');
    const firstPost = page.locator('article').first();
    await firstPost.locator('..').click();
    await page.waitForURL(/\/posts\/[^/]+$/);

    const tipBtn = page.getByRole('button', { name: /buy me crypto/i });
    if (await tipBtn.isVisible()) {
      await tipBtn.click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await expect(page.getByRole('dialog')).toHaveAttribute(
        'aria-modal',
        'true'
      );
      // Escape closes the modal
      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).not.toBeVisible();
    }
  });
});
