import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

/**
 * Run axe-core against the current page and fail the test on any AA violation.
 *
 * Usage:
 *   import { checkA11y } from '../helpers/a11y';
 *   await checkA11y(page);
 *
 * Skips rules that are known false positives in this codebase via the second arg.
 */
export async function checkA11y(page: Page, options?: { exclude?: string[] }) {
  const builder = new AxeBuilder({ page }).withTags([
    'wcag2a',
    'wcag2aa',
    'wcag21a',
    'wcag21aa',
  ]);

  if (options?.exclude?.length) {
    for (const sel of options.exclude) builder.exclude(sel);
  }

  const results = await builder.analyze();
  expect(
    results.violations,
    JSON.stringify(results.violations, null, 2)
  ).toEqual([]);
}
