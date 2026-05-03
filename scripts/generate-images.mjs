#!/usr/bin/env node
/**
 * Build-time renderer for OG social cards.
 *
 * Sources the Gazette palette. Produces:
 *   - static/og-card.png             (1200x630, German social card)
 *   - static/og-card-en.png          (1200x630, English social card)
 *
 * Outputs are committed so deploys do not depend on this step running.
 *
 * Fonts ship in `scripts/fonts/` as static + variable TTFs sourced from
 * the Google Fonts mirror (OFL/SIL). Resvg-js does not load WOFF, hence
 * the TTFs rather than the @fontsource packages.
 *
 * Favicon variants are produced by `scripts/generate-favicon.mjs`.
 */
import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const FONT_DIR = resolve(__dirname, 'fonts');
const FONT_FILES = [
  'DMSerifDisplay-Regular.ttf',
  'LibreBaskerville-Variable.ttf',
  'LibreBaskerville-Italic-Variable.ttf',
  'IBMPlexSans-Variable.ttf'
].map((f) => resolve(FONT_DIR, f));

// Gazette palette — must stay in sync with src/app.css.
const COLORS = {
  bg: '#f3eee2',
  fg: '#181410',
  fgMuted: '#5d564d',
  accent: '#7a1d1d',
  hair: 'rgba(24, 20, 16, 0.32)',
  rule: '#181410'
};

function rasterize(svg, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: {
      fontFiles: FONT_FILES,
      loadSystemFonts: false,
      defaultFontFamily: 'Libre Baskerville'
    }
  });
  return resvg.render().asPng();
}

// OG cards — 1200×630 cream Gazette card per language.
const OG_W = 1200;
const OG_H = 630;

/** Escape XML special chars for safe embedding in SVG text nodes. */
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Build the Gazette card SVG for a given language.
 *
 * Layout (top to bottom):
 *   - Hairline frame inset 24px from each edge.
 *   - Kicker row: dateline · edition label.
 *   - Masthead "Die U27 Gazette" / "The U27 Gazette" in DM Serif Display.
 *   - Thick rule.
 *   - Italic deck describing the issue.
 *   - Stats line with three dot-separated counts.
 *   - Footer: section number + page slug.
 */
function ogCardSvg({ kicker, mastheadHead, mastheadTail, deck, stats, footerLeft, footerRight }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">
  <rect width="${OG_W}" height="${OG_H}" fill="${COLORS.bg}"/>
  <rect x="24" y="24" width="${OG_W - 48}" height="${OG_H - 48}" fill="none" stroke="${COLORS.fg}" stroke-width="2"/>
  <rect x="36" y="36" width="${OG_W - 72}" height="${OG_H - 72}" fill="none" stroke="${COLORS.fg}" stroke-width="0.75"/>

  <!-- Kicker row -->
  <text x="80" y="120"
        font-family="IBM Plex Sans"
        font-weight="600"
        font-size="22"
        letter-spacing="4"
        fill="${COLORS.accent}">${esc(kicker.toUpperCase())}</text>

  <!-- Hairline above masthead -->
  <line x1="80" y1="148" x2="${OG_W - 80}" y2="148" stroke="${COLORS.fg}" stroke-width="1"/>

  <!-- Masthead -->
  <text x="${OG_W / 2}" y="295"
        text-anchor="middle"
        font-family="DM Serif Display"
        font-weight="400"
        font-size="120"
        letter-spacing="-2"
        fill="${COLORS.fg}">${esc(mastheadHead)} <tspan fill="${COLORS.accent}">${esc(mastheadTail)}</tspan></text>

  <!-- Thick rule under masthead -->
  <line x1="80" y1="340" x2="${OG_W - 80}" y2="340" stroke="${COLORS.fg}" stroke-width="3"/>
  <line x1="80" y1="350" x2="${OG_W - 80}" y2="350" stroke="${COLORS.fg}" stroke-width="1"/>

  <!-- Deck -->
  <text x="${OG_W / 2}" y="425"
        text-anchor="middle"
        font-family="Libre Baskerville"
        font-style="italic"
        font-weight="400"
        font-size="34"
        fill="${COLORS.fg}">${esc(deck)}</text>

  <!-- Stats -->
  <text x="${OG_W / 2}" y="500"
        text-anchor="middle"
        font-family="IBM Plex Sans"
        font-weight="600"
        font-size="30"
        letter-spacing="2"
        fill="${COLORS.fg}">${esc(stats.toUpperCase())}</text>

  <!-- Footer -->
  <line x1="80" y1="555" x2="${OG_W - 80}" y2="555" stroke="${COLORS.fg}" stroke-width="0.75"/>
  <text x="80" y="585"
        font-family="IBM Plex Sans"
        font-weight="600"
        font-size="18"
        letter-spacing="3"
        fill="${COLORS.fgMuted}">${esc(footerLeft.toUpperCase())}</text>
  <text x="${OG_W - 80}" y="585"
        text-anchor="end"
        font-family="IBM Plex Sans"
        font-weight="600"
        font-size="18"
        letter-spacing="3"
        fill="${COLORS.fgMuted}">${esc(footerRight.toUpperCase())}</text>
</svg>`;
}

const cards = [
  {
    out: 'static/og-card.png',
    svg: ogCardSvg({
      kicker: 'Klagenfurt · 24. April 2026 · Nachtausgabe',
      mastheadHead: 'Die U27',
      mastheadTail: 'Gazette',
      deck: 'Sonderausgabe zur Langen Nacht der Forschung 2026',
      stats: '91 Webseiten · 6 Stunden · 1 Station',
      footerLeft: 'Bogen I · Archiv-Nr. 7459',
      footerRight: 'lnf26.glockyco.com'
    })
  },
  {
    out: 'static/og-card-en.png',
    svg: ogCardSvg({
      kicker: 'Klagenfurt · 24 April 2026 · Night edition',
      mastheadHead: 'The U27',
      mastheadTail: 'Gazette',
      deck: 'Special issue for the Long Night of Research 2026',
      stats: '91 webpages · 6 hours · 1 station',
      footerLeft: 'Sheet I · Archive No. 7459',
      footerRight: 'lnf26.glockyco.com'
    })
  }
];

for (const card of cards) {
  writeFileSync(resolve(projectRoot, card.out), rasterize(card.svg, OG_W));
}

console.log('Generated og-card.png (1200×630), og-card-en.png (1200×630)');
