/**
 * Unit tests for rehypeCopyButton (lib/posts.ts).
 *
 * Drives the real plugin through the same remark → rehype → highlight →
 * rehypeCopyButton → stringify pipeline that getPostData() uses, so the
 * tests exercise the production code — not a duplicated copy.
 */
import { describe, expect, it } from 'bun:test';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import { rehypeCopyButton } from '../../../lib/posts';

async function process(md: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeCopyButton)
    .use(rehypeStringify)
    .process(md);
  return result.toString();
}

describe('rehypeCopyButton plugin', () => {
  // --- <pre> branch ---

  it('injects a copy-btn button inside every <pre> block', async () => {
    const html = await process('```js\nconsole.log("hi");\n```');
    expect(html).toContain('class="copy-btn"');
  });

  it('sets tabindex="0" on <pre> elements', async () => {
    const html = await process('```\nplain\n```');
    expect(html).toMatch(/tabindex="0"/);
  });

  it('includes both copy-icon and check-icon spans', async () => {
    const html = await process('```ts\nconst x = 1;\n```');
    expect(html).toContain('copy-icon');
    expect(html).toContain('check-icon');
  });

  it('renders copy SVG with two <path> elements and check SVG with one', async () => {
    const html = await process('```bash\necho hello\n```');
    // copy-icon SVG has 2 paths, check-icon SVG has 1 — total must be exactly 3.
    // rehype-highlight never injects <path> elements, so any deviation is a regression.
    const pathMatches = html.match(/<path /g) ?? [];
    expect(pathMatches.length).toBe(3);
  });

  it('button has type="button" and aria-label="Copy code"', async () => {
    const html = await process('```\ncode\n```');
    expect(html).toContain('type="button"');
    expect(html).toContain('aria-label="Copy code"');
  });

  it('injects copy buttons for multiple code blocks', async () => {
    const html = await process('```js\nfoo();\n```\n\n```ts\nbar();\n```');
    const buttonCount = (html.match(/class="copy-btn"/g) ?? []).length;
    expect(buttonCount).toBe(2);
  });

  // --- <table> branch ---

  it('sets tabindex="0" on <table> elements from GFM tables', async () => {
    const md = `| a | b |\n| - | - |\n| 1 | 2 |\n`;
    const html = await process(md);
    expect(html).toMatch(/<table[^>]+tabindex="0"/);
  });

  it('does NOT inject a copy-btn inside a table', async () => {
    const md = `| a | b |\n| - | - |\n| 1 | 2 |\n`;
    const html = await process(md);
    expect(html).not.toContain('copy-btn');
  });

  // --- non-matching elements are untouched ---

  it('does not add tabindex to non-pre/table elements (e.g. <p>)', async () => {
    const html = await process('Hello world');
    expect(html).not.toContain('tabindex');
  });

  // --- SVG helper: hastSvg produces correct attributes ---

  it('SVG elements carry aria-hidden', async () => {
    const html = await process('```\ntest\n```');
    expect(html).toContain('aria-hidden="true"');
  });

  it('SVG viewBox is 0 0 16 16', async () => {
    const html = await process('```\ntest\n```');
    expect(html).toContain('viewBox="0 0 16 16"');
  });

  // --- both pre and table on same page ---

  it('handles mixed content (code block + table)', async () => {
    const md = `\`\`\`js\nfoo();\n\`\`\`\n\n| h |\n| - |\n| v |\n`;
    const html = await process(md);
    expect(html).toContain('copy-btn');
    expect(html).toMatch(/<table[^>]+tabindex="0"/);
  });
});
