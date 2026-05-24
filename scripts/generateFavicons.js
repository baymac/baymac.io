// Generate favicons + apple-touch-icons + maskable icons from the cat
// hero image. One-shot script — runs locally when the source image
// changes. Output lives in public/favicons/ and is committed to git.
//
// Usage: node scripts/generateFavicons.js
//
// Source: public/images/parichay-cat.jpg (the optimized DJ cat polaroid).
// next/app metadata config points at /favicons/*.

const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', 'public', 'images', 'parichay-cat.jpg');
const OUT_DIR = path.join(__dirname, '..', 'public', 'favicons');

const SIZES = {
  // square PNGs
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'favicon-96x96.png': 96,
  'apple-icon-57x57.png': 57,
  'apple-icon-60x60.png': 60,
  'apple-icon-72x72.png': 72,
  'apple-icon-76x76.png': 76,
  'apple-icon-114x114.png': 114,
  'apple-icon-120x120.png': 120,
  'apple-icon-144x144.png': 144,
  'apple-icon-152x152.png': 152,
  'apple-icon-180x180.png': 180,
  'apple-icon.png': 192,
  'apple-icon-precomposed.png': 180,
  'android-icon-36x36.png': 36,
  'android-icon-48x48.png': 48,
  'android-icon-72x72.png': 72,
  'android-icon-96x96.png': 96,
  'android-icon-144x144.png': 144,
  'android-icon-192x192.png': 192,
  'ms-icon-70x70.png': 70,
  'ms-icon-144x144.png': 144,
  'ms-icon-150x150.png': 150,
  'ms-icon-310x310.png': 310,
};

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`generateFavicons: source not found: ${SRC}`);
    process.exit(1);
  }
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log(`generateFavicons: source = ${SRC}`);
  console.log(`generateFavicons: output dir = ${OUT_DIR}`);

  const tasks = Object.entries(SIZES).map(async ([name, size]) => {
    const out = path.join(OUT_DIR, name);
    await sharp(SRC)
      .resize(size, size, { fit: 'cover', position: 'center' })
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log(`  ${name}  (${size}x${size})`);
  });

  // favicon.ico (multi-resolution) — sharp doesn't write .ico directly,
  // so generate a 32x32 PNG and rename. Most browsers handle a PNG with
  // .ico extension fine; for fancier .ico use a tool like png2ico.
  tasks.push(
    (async () => {
      const out = path.join(OUT_DIR, 'favicon.ico');
      await sharp(SRC)
        .resize(32, 32, { fit: 'cover', position: 'center' })
        .png()
        .toFile(out);
      console.log('  favicon.ico  (32x32 PNG renamed)');
    })()
  );

  await Promise.all(tasks);
  console.log('generateFavicons: done.');
}

main().catch((err) => {
  console.error('generateFavicons: error', err);
  process.exit(1);
});
