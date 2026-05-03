#!/usr/bin/env node
/**
 * Build-time favicon generator.
 *
 * Produces:
 *   - static/favicon.svg            (round disc, "U27" baked in as a <path>)
 *   - static/favicon-32x32.png      (32×32, browser tab fallback)
 *   - static/apple-touch-icon.png   (180×180, iOS home screen)
 *
 * The wordmark is converted to a <path> using the actual DM Serif Display
 * outlines so the favicon renders identically everywhere — browsers do not
 * load webfonts when rendering favicons, so the previous text-based SVG fell
 * back to whichever serif each renderer happened to pick, leaving "U27"
 * visibly off-centre. Baking the glyphs in fixes both the centring and the
 * cross-renderer drift.
 *
 * Outputs are committed so deploys do not depend on this script running.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const TEXT = 'U27';
const FONT_PATH = resolve(__dirname, 'fonts/DMSerifDisplay-Regular.ttf');

// Gazette palette — must stay in sync with src/app.css.
const DISC_FILL = '#7a1d1d'; // --accent
const TEXT_FILL = '#f3eee2'; // --bg

// 64×64 viewBox; the wordmark is wider than tall so we scale-to-width.
// 44/64 ≈ 69% leaves a comfortable cushion around the U's left curve and the 7's tail.
const VIEW = 64;
const TEXT_WIDTH = 44;

// 1. Extract glyph outlines as a single SVG path in font units.
const fontBuffer = readFileSync(FONT_PATH);
const arrayBuffer = fontBuffer.buffer.slice(
  fontBuffer.byteOffset,
  fontBuffer.byteOffset + fontBuffer.byteLength
);
const font = opentype.parse(arrayBuffer);
const glyphPath = font.getPath(TEXT, 0, 0, font.unitsPerEm);
const { x1, y1, x2, y2 } = glyphPath.getBoundingBox();
const visualW = x2 - x1;
const cx = (x1 + x2) / 2;
const cy = (y1 + y2) / 2;
const scale = TEXT_WIDTH / visualW;

const round = (n) => Math.round(n * 1000) / 1000;

// 2. Compose the SVG. The transform centres the path's *visual* bbox on the
//    disc — using the bbox (not the glyph metrics) means oldstyle figures and
//    asymmetric side-bearings are accounted for automatically.
const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW} ${VIEW}" width="${VIEW}" height="${VIEW}">
  <title>${TEXT}</title>
  <circle cx="${VIEW / 2}" cy="${VIEW / 2}" r="${VIEW / 2}" fill="${DISC_FILL}"/>
  <path
    d="${glyphPath.toPathData(1)}"
    fill="${TEXT_FILL}"
    transform="translate(${VIEW / 2} ${VIEW / 2}) scale(${round(scale)}) translate(${round(-cx)} ${round(-cy)})"
  />
</svg>
`;

writeFileSync(resolve(projectRoot, 'static/favicon.svg'), faviconSvg);

// 3. Rasterize PNG variants directly from the freshly-generated SVG. No system
//    fonts needed — every glyph is already a path.
function rasterize(svg, width) {
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng();
}

writeFileSync(resolve(projectRoot, 'static/favicon-32x32.png'), rasterize(faviconSvg, 32));
writeFileSync(resolve(projectRoot, 'static/apple-touch-icon.png'), rasterize(faviconSvg, 180));

console.log('Generated favicon.svg, favicon-32x32.png (32×32), apple-touch-icon.png (180×180)');
