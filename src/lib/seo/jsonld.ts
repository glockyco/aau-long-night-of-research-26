import type { Lang } from '$lib/i18n';
import { SITE_URL, canonicalUrl, ogImageUrl } from './site';

/** Klagenfurt is in Europe/Vienna, UTC+02:00 in late April (CEST). */
const EVENT_DATE_PREFIX = '2026-04-24';
const EVENT_TZ_OFFSET = '+02:00';
const EVENT_START = `${EVENT_DATE_PREFIX}T17:00:00${EVENT_TZ_OFFSET}`;
const EVENT_END = `${EVENT_DATE_PREFIX}T23:00:00${EVENT_TZ_OFFSET}`;

const ORGANIZER = {
  '@type': 'Organization',
  name: 'Alpen-Adria-Universität Klagenfurt',
  url: 'https://www.aau.at/'
} as const;

const LOCATION = {
  '@type': 'Place',
  name: 'Alpen-Adria-Universität Klagenfurt — Station U27',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Universitätsstraße 65–67',
    addressLocality: 'Klagenfurt am Wörthersee',
    postalCode: '9020',
    addressCountry: 'AT'
  }
} as const;

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface WebSiteJsonLdInput {
  lang: Lang;
  siteName: string;
}

export function websiteJsonLd({ lang, siteName }: WebSiteJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: canonicalUrl(`/${lang}`),
    inLanguage: lang
  };
}

export interface EventJsonLdInput {
  lang: Lang;
  /** Event name as it should appear in SERP rich results. */
  name: string;
  /** One-sentence event blurb. */
  description: string;
  /** Locale-appropriate OG image path; absolutized for `image`. */
  imagePath: string;
}

export function eventJsonLd({ lang, name, description, imagePath }: EventJsonLdInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate: EVENT_START,
    endDate: EVENT_END,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    inLanguage: lang,
    location: LOCATION,
    organizer: ORGANIZER,
    image: [ogImageUrl(imagePath)],
    url: canonicalUrl(`/${lang}`),
    isAccessibleForFree: true
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
  siteName: string;
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
      name: 'Visitor at AAU Station U27'
    },
    inLanguage: input.lang,
    isPartOf: {
      '@type': 'WebSite',
      name: input.siteName,
      url: SITE_URL
    }
  };
}
