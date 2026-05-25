import { expect, test } from '@playwright/test';

// Regression for B7: opening the mobile drawer used to leave the user
// stranded because focus-trap-react blocked clicks on the close (X) and
// theme buttons that live OUTSIDE the drawer.
test.describe('mobile drawer', () => {
  // Only the mobile viewport project shows the drawer toggle.
  test.skip(
    ({ viewport }) => !viewport || viewport.width > 600,
    'drawer toggle is hidden above 600px'
  );

  test('opens via Apps icon, closes via X icon', async ({ page }) => {
    await page.goto('/');
    // Wait for client hydration so the onClick handler is attached.
    await page.waitForLoadState('networkidle');

    const openBtn = page.getByRole('button', { name: 'nav-open-button' });
    await expect(openBtn).toBeVisible();
    await openBtn.click();

    // Drawer should now be visible; close button replaces open button.
    const closeBtn = page.getByRole('button', { name: 'nav-close-button' });
    await expect(closeBtn).toBeVisible();

    // The blocked-click bug: this click used to be swallowed by FocusTrap.
    await closeBtn.click();
    await expect(closeBtn).toBeHidden();
    await expect(openBtn).toBeVisible();
  });

  test('closes on Escape key', async ({ page }) => {
    await page.goto('/');
    // Wait for client hydration so the onClick handler is attached.
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'nav-open-button' }).click();
    await expect(
      page.getByRole('button', { name: 'nav-close-button' })
    ).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(
      page.getByRole('button', { name: 'nav-close-button' })
    ).toBeHidden();
    await expect(
      page.getByRole('button', { name: 'nav-open-button' })
    ).toBeVisible();
  });

  test('theme-toggle stays clickable while drawer is open', async ({ page }) => {
    // Regression for B7: aria-hidden on #app-root was hiding the header
    // (including the theme button) from a11y/test queries. Theme toggle
    // should remain reachable and functional while the drawer is open.
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'nav-open-button' }).click();
    const themeBtn = page.getByRole('button', { name: 'change-theme-button' });
    await expect(themeBtn).toBeVisible();
    await themeBtn.click();
    // Drawer stays open (intentional — toggling theme isn't a dismissal),
    // but the click did fire, proving the header isn't a11y-hidden.
    await expect(
      page.getByRole('button', { name: 'nav-close-button' })
    ).toBeVisible();
  });

  test('closes on route change (click a nav link)', async ({ page }) => {
    await page.goto('/');
    // Wait for client hydration so the onClick handler is attached.
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'nav-open-button' }).click();
    // Click a link inside the drawer
    await page.getByRole('link', { name: /^Blog$/i }).first().click();
    await page.waitForURL(/\/blog/);

    await expect(
      page.getByRole('button', { name: 'nav-open-button' })
    ).toBeVisible();
  });
});
