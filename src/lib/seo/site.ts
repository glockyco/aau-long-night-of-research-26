/**
 * URL helpers and image dimensions for SEO.
 *
 * Localized strings (siteName, titles, descriptions, OG image path/alt)
 * live in `Dict.seo`; everything here is language-neutral.
 */
import type { Lang } from '$lib/i18n';

export const SITE_URL = 'https://lnf26.glockyco.com';

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

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

/** Absolute URL for an OG image path. */
export function ogImageUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

/** Absolute URL for the alternate-language version of a path. */
export function altLangUrl(currentPath: string, target: Lang): string {
  const swapped = currentPath.replace(/^\/(de|en)(\/|$)/, `/${target}$2`);
  return canonicalUrl(swapped);
}
