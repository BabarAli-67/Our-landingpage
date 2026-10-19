// @ts-check
/**
 * Generates `lib/image-placeholders.ts` — a tiny base64 WebP for every local
 * image in `public/assets`, used as `next/image`'s `blurDataURL`.
 *
 * WHY
 * The project cards sit below the fold, so their screenshots are lazily
 * loaded and the optimiser still has to produce each variant on a cache miss.
 * Until the real file arrives the card showed an empty `bg-ink-700` well and
 * then popped. A ~10px-wide blurred preview is inlined in the HTML, costs
 * well under a kilobyte, and gives the card its real colours immediately —
 * which is most of what "loading slowly" actually feels like.
 *
 * Run with `npm run blur` after adding or replacing an image.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, posix, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const ASSETS = join(ROOT, 'public', 'assets');
const OUT = join(ROOT, 'lib', 'image-placeholders.ts');

/** Width of the generated preview, in pixels. Small enough to stay inline. */
const BLUR_WIDTH = 12;
const EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif']);

/** @param {string} dir @returns {Promise<string[]>} */
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return walk(full);
      const dot = entry.name.lastIndexOf('.');
      const ext = dot === -1 ? '' : entry.name.slice(dot).toLowerCase();
      return EXTENSIONS.has(ext) ? [full] : [];
    })
  );
  return files.flat();
}

async function main() {
  const files = (await walk(ASSETS)).sort();
  /** @type {Array<[string, string]>} */
  const entries = [];

  for (const file of files) {
    const buffer = await sharp(file)
      .resize(BLUR_WIDTH, null, { fit: 'inside' })
      .webp({ quality: 45, effort: 6 })
      .toBuffer();

    // Public URL path, always POSIX separators.
    const url = '/' + relative(join(ROOT, 'public'), file).split(sep).join(posix.sep);
    entries.push([url, `data:image/webp;base64,${buffer.toString('base64')}`]);
  }

  const totalBytes = entries.reduce((sum, [, data]) => sum + data.length, 0);

  const body = `/**
 * GENERATED FILE — do not edit by hand.
 * Run \`npm run blur\` to regenerate after changing anything in public/assets.
 *
 * ${entries.length} placeholders, ${(totalBytes / 1024).toFixed(1)} kB total inline.
 * See scripts/generate-blur-placeholders.mjs.
 */

/** Maps a public image path to a base64 blur preview for \`next/image\`. */
export const blurPlaceholders: Readonly<Record<string, string>> = {
${entries.map(([url, data]) => `  '${url}': '${data}',`).join('\n')}
};

/**
 * Returns the blur preview for a local asset, or \`undefined\` for remote URLs
 * and anything not in \`public/assets\` — callers must treat it as optional.
 */
export function blurFor(src: string): string | undefined {
  return blurPlaceholders[src];
}
`;

  await writeFile(OUT, body, 'utf8');

  const hash = createHash('sha256').update(body).digest('hex').slice(0, 8);
  console.log(
    `lib/image-placeholders.ts: ${entries.length} placeholders, ` +
      `${(totalBytes / 1024).toFixed(1)} kB inline (${hash})`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
