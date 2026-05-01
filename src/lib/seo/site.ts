/**
 * Canonical site identity for SEO.
 * Updating any constant here flows into <Seo>, the sitemap, and OG/Twitter.
 */
import type { Lang } from '$lib/i18n';

export const SITE_URL = 'https://lnf26.glockyco.com';
export const SITE_NAME = 'LNF 2026 — Station U27';

export const OG_IMAGE_PATH = '/og-default.png';
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT = 'LNF 2026 Station U27 logo and title card';

export const OG_LOCALES: Record<Lang, string> = {
  de: 'de_AT',
  en: 'en_US'
};

/**
 * Compute the absolute canonical URL for a page path.
 * Accepts both "/foo" and "foo"; root maps to "${SITE_URL}/", everything else
 * has no trailing slash.
 */
export function canonicalUrl(path: string): string {
  if (path === '/' || path === '') return `${SITE_URL}/`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized.replace(/\/$/, '')}`;
}

/** Absolute URL for an OG image. Defaults to the site OG image. */
export function ogImageUrl(path: string = OG_IMAGE_PATH): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/** Absolute URL for the alternate-language version of a path. */
export function altLangUrl(currentPath: string, target: Lang): string {
  const swapped = currentPath.replace(/^\/(de|en)(\/|$)/, `/${target}$2`);
  return canonicalUrl(swapped);
}
