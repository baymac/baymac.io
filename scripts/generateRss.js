const { promises: fs } = require('node:fs');
const path = require('node:path');
const RSS = require('rss');
const matter = require('gray-matter');

(async function generateRss() {
  const feed = new RSS({
    title: 'Parichay Barpanda',
    site_url: 'https://baymac.lol',
    feed_url: 'https://baymac.lol/feed.xml',
  });

  const postsDirectory = path.join(process.cwd(), 'content/posts');

  const fileNames = await fs.readdir(postsDirectory);

  await Promise.all(
    fileNames.map(async (fileName) => {
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath);

      // Use gray-matter to parse the post metadata section
      const frontmatter = matter(fileContents);

      // Combine the data with the id
      feed.item({
        title: frontmatter.data.title,
        url: `https://baymac.lol/blog/${fileName.replace(/\.md?/, '')}`,
        date: frontmatter.data.date,
      });
    })
  );

  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }));
})();
