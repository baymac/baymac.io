# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev          # start dev server (runs on :3000, falls back to next available port)
yarn build        # production build (also generates sitemap + RSS feed via webpack hooks)
yarn lint         # check with Biome
yarn lint:fix     # auto-fix lint issues
yarn format       # format with Biome
yarn update-content "<msg>"  # commit + push content submodule and parent in one step
```

To pull the latest blog posts from the content submodule:

```bash
git submodule update --remote
```

## Architecture

### Content submodule

Blog posts live in a separate repo (`github.com/baymac/content`) mounted at `content/`. When cloning fresh, run `git submodule update --init --recursive`. Adding a post means committing to `content/posts/` first, then committing the updated submodule pointer in the parent repo. `yarn update-content` does both.

### Blog post format

Posts are Markdown files in `content/posts/` with gray-matter frontmatter:

```md
---
title: 'Post title'
date: 'YYYY-MM-DD'
tags: tag1, tag2
ai-gen: true   # optional — shows an AI badge on the listing and post
---
```

`lib/posts.ts` reads and parses them at build time. Posts are statically generated via `generateStaticParams` in `app/posts/[id]/page.tsx`. Markdown is processed through `remark → remark-rehype → rehype-highlight → rehype-stringify` for syntax highlighting.

### Build-time side effects

`next.config.js` runs two scripts on every server build via the webpack hook:

- `scripts/generateSitemap.js` — writes `public/sitemap.xml`
- `scripts/generateRss.js` — writes `public/feed.xml`

### Styling

CSS Modules throughout — each component has its own `.module.css`. Global styles in `styles/global.css`. Root layout utilities in `styles/root.module.css`. Theme (dark/light) is handled by `next-themes` with a `data-theme` attribute on `<html>`.

### App context

`context/AppContextProvider.tsx` provides a single piece of global state: `navBarOpen` (mobile nav toggle). Access it with `useAppContext()`.

### Linter / formatter

Biome (not ESLint/Prettier). Config in `biome.json`: 2-space indent, single quotes, trailing commas (`es5`), 80-char line width.
