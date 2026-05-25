import { expect, test } from '@playwright/test';

test.describe('Buy Me Crypto', () => {
  test('direct /buymecrypto loads the home page with the modal open', async ({
    page,
  }) => {
    await page.goto('/buymecrypto');
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog')).toHaveAttribute(
      'aria-modal',
      'true'
    );

    // closing returns to "/" since there's no in-app history to pop
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page).toHaveURL(/\/(?:$|#)/);
  });

  test('nav link opens /buymecrypto as a modal over the current page', async ({
    page,
  }) => {
    await page.goto('/blog');
    await page
      .getByRole('link', { name: /buy me crypto/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/buymecrypto$/);

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');

    // blog content still mounted underneath the modal
    await expect(page.locator('article').first()).toBeAttached();

    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(page).toHaveURL(/\/blog$/);
  });
});
