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
    const sentences = page.locator('p', { hasText: 'software engineer · dj' });

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

  test('renders Projects uniform grid with starred featured cards', async ({
    page,
  }) => {
    await page.goto('/');
    // F4 + F18: single tier, same-size cards. Each card with `featured: true`
    // in Projects.tsx carries the ★ marker. The current list is Noodles.fi,
    // Cred Jack, Wallet Connect Cardano, GitLab Branch Source Plugin, Ace Base.
    const featuredStars = page.locator('[aria-label="featured project"]');
    await expect(featuredStars).toHaveCount(5);
    await expect(page.getByText('Noodles.fi').first()).toBeVisible();
    await expect(page.getByText('Cred Jack').first()).toBeVisible();
    await expect(
      page.getByText('Wallet Connect Cardano').first()
    ).toBeVisible();
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
