import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Element } from 'hast';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import { visit } from 'unist-util-visit';
import constants from './constants';

// SVG path data (GitHub Octicons)
const COPY_P1 =
  'M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z';
const COPY_P2 =
  'M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z';
const CHECK_P =
  'M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z';

function hastSvg(...paths: string[]): Element {
  return {
    type: 'element',
    tagName: 'svg',
    properties: {
      width: '16',
      height: '16',
      viewBox: '0 0 16 16',
      fill: 'currentColor',
      ariaHidden: 'true',
    },
    children: paths.map((d) => ({
      type: 'element',
      tagName: 'path',
      properties: { d },
      children: [],
    })),
  };
}

function hastSpan(className: string, ...svgPaths: string[]): Element {
  return {
    type: 'element',
    tagName: 'span',
    properties: { className: [className] },
    children: [hastSvg(...svgPaths)],
  };
}

export function rehypeCopyButton() {
  return (tree: Parameters<typeof visit>[0]) => {
    visit(tree, 'element', (node: Element) => {
      if (node.tagName === 'pre') {
        node.properties = { ...node.properties, tabIndex: 0 };
        const copyButton: Element = {
          type: 'element',
          tagName: 'button',
          properties: {
            type: 'button',
            className: ['copy-btn'],
            ariaLabel: 'Copy code',
          },
          children: [
            hastSpan('copy-icon', COPY_P1, COPY_P2),
            hastSpan('check-icon', CHECK_P),
          ],
        };
        node.children.push(copyButton);
      } else if (node.tagName === 'table') {
        node.properties = { ...node.properties, tabIndex: 0 };
      }
    });
  };
}

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

  // Use remark/rehype to convert markdown into HTML string with syntax
  // highlighting and copy buttons. rehypeCopyButton also adds tabindex="0" to
  // pre/table for keyboard accessibility (replaces the old regex post-process).
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeCopyButton)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

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
