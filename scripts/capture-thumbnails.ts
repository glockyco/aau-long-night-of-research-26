#!/usr/bin/env node
/**
 * Interactive thumbnail capture for one creation at a time.
 *
 * Usage:
 *   pnpm capture <slug>
 *
 * Looks up `slug` in `src/lib/data/creations.ts`, opens the corresponding
 * `creations/<filename>` in a visible Chromium window at 1280x800. The user
 * drives the page into a screenshot-worthy state (clicks Start, types, etc.).
 * When they press Enter in the terminal, the script captures and writes:
 *
 *   static/creations/<slug>.webp     (1200x750, retina)
 *   static/creations/<slug>@1x.webp  (600x375, default DPR)
 *   static/creations/<slug>-og.webp  (1200x630, social preview)
 *
 * Requires `playwright` and `sharp` (already dev deps).
 */
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { stdin, stdout } from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { creations } from '../src/lib/data/creations.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const slug = process.argv[2];
if (!slug) {
  console.error('usage: pnpm capture <slug>');
  process.exit(1);
}

const creation = creations.find((item) => item.slug === slug);
if (!creation) {
  console.error(`No creation found with slug=${slug}`);
  process.exit(1);
}

const sourcePath = resolve(projectRoot, 'creations', creation.filename);
if (!existsSync(sourcePath)) {
  console.error(`Creation source file does not exist: ${sourcePath}`);
  process.exit(1);
}

const fileUrl = pathToFileURL(sourcePath).toString();
const outDir = resolve(projectRoot, 'static/creations');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
await page.goto(fileUrl);

console.log('\n>>> Drive the page into a good state, then press <Enter> here to capture.');
await new Promise<void>((resolveCapture) => {
  stdin.resume();
  stdin.once('data', () => resolveCapture());
});

const png = await page.screenshot({ type: 'png' });
await browser.close();

const retinaPath = resolve(outDir, `${slug}.webp`);
const onexPath = resolve(outDir, `${slug}@1x.webp`);
const ogPath = resolve(outDir, `${slug}-og.webp`);

await sharp(png).resize(1200, 750, { fit: 'cover' }).webp({ quality: 88 }).toFile(retinaPath);
await sharp(png).resize(600, 375, { fit: 'cover' }).webp({ quality: 85 }).toFile(onexPath);
await sharp(png).resize(1200, 630, { fit: 'cover' }).webp({ quality: 88 }).toFile(ogPath);

stdout.write(`Wrote ${retinaPath}\nWrote ${onexPath}\nWrote ${ogPath}\n`);
