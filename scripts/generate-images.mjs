#!/usr/bin/env node
/**
 * Build-time renderer for raster icons + OG image.
 *
 * Sources `static/favicon.svg` (round disc with "U27"). Produces:
 *   - static/favicon-32x32.png
 *   - static/apple-touch-icon.png  (180x180)
 *   - static/og-default.png        (1200x630, embeds the favicon)
 *
 * Outputs are committed so deploys do not depend on this step succeeding in CI.
 * Adapted from ~/Projects/ancient-kingdoms-mods/website/scripts/generate-og-image.mjs.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const faviconSvg = readFileSync(resolve(projectRoot, 'static/favicon.svg'), 'utf8');

function rasterize(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { loadSystemFonts: true }
  });
  return resvg.render().asPng();
}

// 1. Favicon variants — straight rasterize.
writeFileSync(resolve(projectRoot, 'static/favicon-32x32.png'), rasterize(faviconSvg, 32));
writeFileSync(resolve(projectRoot, 'static/apple-touch-icon.png'), rasterize(faviconSvg, 180));

// 2. OG image — 1200x630, dark gradient bg + U27 disc + brand text.
//    Fonts fall back to system sans-serif via resvg.

const OG_W = 1200;
const OG_H = 630;
const ogSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f0f1a"/>
      <stop offset="100%" stop-color="#1a1a2e"/>
    </linearGradient>
  </defs>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#bg)"/>
  <rect x="20" y="20" width="${OG_W - 40}" height="${OG_H - 40}" rx="18" fill="none" stroke="#2a2a44" stroke-width="2"/>

  <circle cx="225" cy="315" r="135" fill="#1a1a2e"/>
  <text x="225" y="315" text-anchor="middle" dominant-baseline="central" font-family="Inter, Helvetica, Arial, sans-serif" font-size="88" font-weight="700" fill="#ffffff" letter-spacing="-2">U27</text>

  <text x="410" y="280" font-family="Inter, Helvetica, Arial, sans-serif" font-size="52" font-weight="700" fill="#f0f0f5">Lange Nacht der Forschung</text>
  <text x="410" y="350" font-family="Inter, Helvetica, Arial, sans-serif" font-size="56" font-weight="700" fill="#ffdd44">Station U27</text>
  <text x="410" y="430" font-family="Inter, Helvetica, Arial, sans-serif" font-size="30" font-weight="500" fill="#9999b3">Webseiten, mit KI in Alltagssprache gebaut.</text>
</svg>`;

writeFileSync(resolve(projectRoot, 'static/og-default.png'), rasterize(ogSvg, OG_W));

console.log(
  'Generated: favicon-32x32.png (32x32), apple-touch-icon.png (180x180), og-default.png (1200x630)'
);
