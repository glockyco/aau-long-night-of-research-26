<script lang="ts">
  import {
    OG_IMAGE_HEIGHT,
    OG_IMAGE_WIDTH,
    OG_LOCALES,
    altLangUrl,
    canonicalUrl,
    ogImageUrl
  } from '$lib/seo/site';
  import type { Lang } from '$lib/i18n';

  interface Props {
    /** <title>. Should already include the brand suffix per page conventions. */
    title: string;
    /** <meta name="description"> body. Plain prose, no semicolons. */
    description: string;
    /** Current path, e.g. "/de/creations/snake". Drives canonical + alternates. */
    path: string;
    /** Current language. Drives og:locale and hreflang ordering. */
    lang: Lang;
    /** Localized brand name for og:site_name. */
    siteName: string;
    /** Path to the OG image (defaults to the locale's home card). */
    image: string;
    /** Alt text describing the OG image. */
    imageAlt: string;
    /** Optional JSON-LD object(s) to embed as <script type="application/ld+json">. */
    jsonLd?: object | object[];
  }

  const { title, description, path, lang, siteName, image, imageAlt, jsonLd }: Props = $props();

  const url = $derived(canonicalUrl(path));
  const ogImage = $derived(ogImageUrl(image));
  const altLang: Lang = $derived(lang === 'de' ? 'en' : 'de');
  const altUrl = $derived(altLangUrl(path, altLang));
  const xDefault = $derived(altLangUrl(path, 'de'));
  const ldArray = $derived(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []);
  const scriptTag = 'script';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />

  <link rel="alternate" hreflang={lang} href={url} />
  <link rel="alternate" hreflang={altLang} href={altUrl} />
  <link rel="alternate" hreflang="x-default" href={xDefault} />

  <meta property="og:type" content="website" />
  <meta property="og:locale" content={OG_LOCALES[lang]} />
  <meta property="og:locale:alternate" content={OG_LOCALES[altLang]} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:width" content={OG_IMAGE_WIDTH.toString()} />
  <meta property="og:image:height" content={OG_IMAGE_HEIGHT.toString()} />
  <meta property="og:image:alt" content={imageAlt} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:image:alt" content={imageAlt} />

  {#each ldArray as ld, index (index)}
    <svelte:element this={scriptTag} type="application/ld+json">{JSON.stringify(ld)}</svelte:element
    >
  {/each}
</svelte:head>
