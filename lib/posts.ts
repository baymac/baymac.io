import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import constants from './constants';

interface PostData {
  id: string;
  date: string;
  title: string;
  tags?: string;
  'ai-gen'?: boolean;
  mins?: number;
}

const postsDirectory = path.join(
  /*turbopackIgnore: true*/ process.cwd(),
  constants.postsPath
);

export function getSortedPostsData(): PostData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    } as PostData;
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark/rehype to convert markdown into HTML string with syntax highlighting
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(matterResult.content);
  // Add tabindex="0" to every scrollable region so keyboard users can scroll
  // long code blocks + wide tables (axe-core flags both `<pre>` and `<table>`
  // with `overflow-x: auto` as serious WCAG 2.1.1 / 2.1.3 violations when
  // they lack focusable content). Cheap post-process beats a rehype plugin.
  const contentHtml = processedContent
    .toString()
    .replace(/<pre>/g, '<pre tabindex="0">')
    .replace(/<table>/g, '<table tabindex="0">');

  // ~220 wpm reading speed; min 1 so very short notes still show "1 min".
  const wordCount = matterResult.content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const mins = Math.max(1, Math.round(wordCount / 220));

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    mins,
    ...matterResult.data,
  } as PostData & { contentHtml: string; mins: number };
}
