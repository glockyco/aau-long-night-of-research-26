import type { Lang } from '$lib/i18n';
import { SITE_NAME, SITE_URL, canonicalUrl } from './site';

/** Klagenfurt is in Europe/Vienna, UTC+02:00 in late April (CEST). */
const EVENT_DATE_PREFIX = '2026-04-24';
const EVENT_TZ_OFFSET = '+02:00';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function websiteJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: canonicalUrl(`/${lang}`),
    inLanguage: lang
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: canonicalUrl(item.path)
    }))
  };
}

export interface CreationJsonLdInput {
  title: string;
  slug: string;
  /** "HH:MM" — the time-of-day from the creation filename. */
  builtAt: string;
  lang: Lang;
}

export function creationJsonLd(input: CreationJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: input.title,
    url: canonicalUrl(`/${input.lang}/creations/${input.slug}`),
    dateCreated: `${EVENT_DATE_PREFIX}T${input.builtAt}:00${EVENT_TZ_OFFSET}`,
    creator: {
      '@type': 'Person',
      name: 'Anonymous LNF 2026 visitor'
    },
    inLanguage: input.lang,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL
    }
  };
}
