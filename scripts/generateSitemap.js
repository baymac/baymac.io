const fs = require('node:fs');

(async () => {
  const { globby } = await import('globby');

  const pages = await globby([
    'app/**/page.tsx',
    'content/**/*.md',
    '!content/*.md',
    '!app/layout.tsx',
    '!app/not-found.tsx',
  ]);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    const path = page
      .replace('app', '')
      .replace('content', '')
      .replace('/page.tsx', '')
      .replace('.md', '');
    const route = path === '' ? '' : path;
    return `  <url>
    <loc>https://baymac.lol${route}</loc>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', sitemap);
})();
