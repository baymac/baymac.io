import { expect, test } from '@playwright/test';
import { checkA11y } from '../helpers/a11y';

test.describe('/ (home)', () => {
  test('renders Hero with cat polaroid + signal sentence', async ({ page }) => {
    await page.goto('/');
    // Hero renders BOTH desktop + mobile compositions in the same DOM (pure
    // CSS responsive per Arch 1A), so heading + image + sentence appear twice.
    // `.first()` is the desktop variant, `.last()` is the mobile variant.
    // Whichever viewport we're in, exactly ONE is visible per @media query.
    // Hero renders both desktop + mobile in same DOM. Both contain the
    // headline + polaroid + signal sentence (verified by curling the
    // built HTML: 2 of each). Use plain locators that don't rely on
    // role+name filtering (which had inconsistent match counts).
    const headings = page.locator('h1', { hasText: /hey, i'm parichay/i });
    const polaroids = page.locator(
      'img[alt*="red tabby cat wearing DJ headphones"]'
    );
    const sentences = page.locator(
      'p', { hasText: 'writes about cardano' }
    );

    // Both compositions exist in DOM (one is hidden via @media).
    await expect(headings).toHaveCount(2);
    await expect(polaroids).toHaveCount(2);
    await expect(sentences).toHaveCount(2);

    // At least one of each is visible (whichever composition the @media chose).
    const visibilities = await Promise.all([
      headings.first().isVisible(),
      headings.last().isVisible(),
    ]);
    expect(visibilities.some((v) => v)).toBe(true);
  });

  test('renders Projects featured + secondary tiers', async ({ page }) => {
    await page.goto('/');
    // Featured stars on the 3 hackathon wins
    const stars = page.locator('text=★');
    await expect(stars).toHaveCount(3);
    await expect(page.getByText('Noodles.fi')).toBeVisible();
    await expect(page.getByText('Cred Jack')).toBeVisible();
    await expect(page.getByText('Wallet Connect Cardano')).toBeVisible();
  });

  test('renders Timeline section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#experience').first()).toBeVisible();
  });

  test('no console errors on cold load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });

  test('passes axe-core a11y AA', async ({ page }) => {
    await page.goto('/');
    await checkA11y(page);
  });
});
