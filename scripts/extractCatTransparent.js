// Remove the solid-black background from public/images/parichay-cat.jpg
// and write a real PNG with alpha for favicon generation.
//
// The source the user shared was named "no bg.jpg" but JPEG can't store
// an alpha channel — it's RGB with the background baked in as pure black.
// We can't undo the bake, but we can mask the background back out by
// flood-filling from the corners through near-black pixels. Interior dark
// areas (headphones, eyes, collar) stay opaque because they aren't
// connected to the image boundary.
//
// Usage: node scripts/extractCatTransparent.js
// Output: public/images/parichay-cat-transparent.png

const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', 'public', 'images', 'parichay-cat.jpg');
const DST = path.join(
  __dirname,
  '..',
  'public',
  'images',
  'parichay-cat-transparent.png'
);

// Pixels with avg(R,G,B) below this are treated as background-black.
// JPEG compression leaves a halo of dark-but-not-pure-black pixels around
// the subject; bumping past 35 starts eating into the cat's outline.
const BG_THRESHOLD = 32;

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`extractCatTransparent: source not found: ${SRC}`);
    process.exit(1);
  }

  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info; // 4 with ensureAlpha
  const total = width * height;

  const isBackground = (idx) => {
    const off = idx * channels;
    const avg = (data[off] + data[off + 1] + data[off + 2]) / 3;
    return avg < BG_THRESHOLD;
  };

  // BFS from every edge pixel. Visited == background-connected-to-edge.
  const visited = new Uint8Array(total);
  const queue = new Int32Array(total);
  let head = 0;
  let tail = 0;

  const seed = (idx) => {
    if (!visited[idx] && isBackground(idx)) {
      visited[idx] = 1;
      queue[tail++] = idx;
    }
  };

  for (let x = 0; x < width; x++) {
    seed(x);
    seed((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    seed(y * width);
    seed(y * width + (width - 1));
  }

  while (head < tail) {
    const idx = queue[head++];
    const x = idx % width;
    const y = (idx - x) / width;

    if (x > 0) {
      const n = idx - 1;
      if (!visited[n] && isBackground(n)) {
        visited[n] = 1;
        queue[tail++] = n;
      }
    }
    if (x < width - 1) {
      const n = idx + 1;
      if (!visited[n] && isBackground(n)) {
        visited[n] = 1;
        queue[tail++] = n;
      }
    }
    if (y > 0) {
      const n = idx - width;
      if (!visited[n] && isBackground(n)) {
        visited[n] = 1;
        queue[tail++] = n;
      }
    }
    if (y < height - 1) {
      const n = idx + width;
      if (!visited[n] && isBackground(n)) {
        visited[n] = 1;
        queue[tail++] = n;
      }
    }
  }

  let stripped = 0;
  for (let i = 0; i < total; i++) {
    if (visited[i]) {
      data[i * channels + 3] = 0;
      stripped++;
    }
  }

  await sharp(data, { raw: { width, height, channels } })
    .png({ compressionLevel: 9 })
    .toFile(DST);

  const pct = ((stripped / total) * 100).toFixed(1);
  console.log(
    `extractCatTransparent: ${width}x${height}, alpha-cleared ${stripped} px (${pct}%) → ${DST}`
  );
}

main().catch((err) => {
  console.error('extractCatTransparent: error', err);
  process.exit(1);
});
