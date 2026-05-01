#!/usr/bin/env node
/**
 * Vendor featured creations into static/raw/.
 *
 * Reads `src/lib/data/creations.ts`, then for each entry copies
 * `creations/<filename>` to `static/raw/<slug>.html`. Wired via `prebuild`.
 *
 * Pure file copy; no transformation. Idempotent — clears static/raw first.
 */
import { copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { creations } from '../src/lib/data/creations.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const sourceDir = resolve(projectRoot, 'creations');
const targetDir = resolve(projectRoot, 'static/raw');

if (existsSync(targetDir)) {
  rmSync(targetDir, { recursive: true, force: true });
}
mkdirSync(targetDir, { recursive: true });

let written = 0;
for (const creation of creations) {
  const src = resolve(sourceDir, creation.filename);
  const dest = resolve(targetDir, `${creation.slug}.html`);

  if (!existsSync(src)) {
    throw new Error(
      `Featured creation source not found: creations/${creation.filename} (slug=${creation.slug})`
    );
  }

  copyFileSync(src, dest);
  written += 1;
}

console.log(`Vendored ${written} creation(s) into static/raw/`);
