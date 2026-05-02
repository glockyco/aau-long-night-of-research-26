<script lang="ts">
  import { page } from '$app/state';
  import CreationFrame from '$lib/components/CreationFrame.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { breadcrumbJsonLd, creationJsonLd } from '$lib/seo/jsonld';

  let { data } = $props();

  const creation = $derived(data.creation);
  const lang = $derived(data.lang);
  const dict = $derived(data.dict);

  const title = $derived(`${creation.titleNative} — LNF 2026 / U27`);
  const description = $derived(
    lang === 'de'
      ? `${creation.titleNative} — gebaut um ${creation.builtAt} an Station U27, Lange Nacht der Forschung 2026.`
      : `${creation.titleNative} — built at ${creation.builtAt} at Station U27, Long Night of Research 2026.`
  );
  const caveat = $derived(creation.caveat?.[lang]);
  const standalone = $derived(`/raw/${creation.slug}.html`);

  const jsonLd = $derived([
    breadcrumbJsonLd([
      { name: lang === 'de' ? 'Startseite' : 'Home', path: `/${lang}` },
      { name: creation.titleNative, path: `/${lang}/creations/${creation.slug}` }
    ]),
    creationJsonLd({
      title: creation.titleNative,
      slug: creation.slug,
      builtAt: creation.builtAt,
      lang
    })
  ]);
</script>

<Seo
  {title}
  {description}
  path={page.url.pathname}
  {lang}
  image="/creations/{creation.slug}-og.webp"
  {jsonLd}
/>

<main class="creation-page">
  <header class="creation-header">
    <a class="creation-back" href="/{lang}">{dict.creationPage.back}</a>
    <div class="creation-title-wrap">
      <p class="print-meta">{dict.creations.builtAt} {creation.builtAt}</p>
      <h1 class="creation-title">{creation.titleNative}</h1>
    </div>
    <a class="creation-standalone" href={standalone} target="_blank" rel="noopener">
      ↗ {dict.creationPage.openStandalone}
    </a>
  </header>

  <CreationFrame {creation} />

  {#if caveat}
    <p class="creation-caveat">{caveat}</p>
  {/if}
</main>

<style>
  .creation-page {
    max-width: 1280px;
    margin: 0 auto;
    padding: 1rem 1.5rem 3rem;
  }

  .creation-header {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 1rem;
    align-items: end;
    margin-bottom: 1rem;
    padding: 0.75rem 0;
    border-top: 1px solid var(--fg);
    border-bottom: 1px solid var(--hair);
  }

  .creation-back,
  .creation-standalone {
    color: var(--fg-muted);
    font-family: var(--font-sans);
    font-size: 0.74rem;
    letter-spacing: 0.14em;
    line-height: 1.35;
    text-decoration: none;
    text-transform: uppercase;
  }

  .creation-back:hover,
  .creation-standalone:hover {
    color: var(--accent);
  }

  .creation-title-wrap {
    min-width: 0;
    text-align: center;
  }

  .creation-title {
    overflow-wrap: anywhere;
    font-size: clamp(2.25rem, 5.4vw, 4.6rem);
    letter-spacing: -0.018em;
    line-height: 0.98;
  }

  .creation-title-wrap .print-meta {
    margin-bottom: 0.3rem;
    color: var(--accent);
  }

  .creation-standalone {
    border-bottom: 1px dotted currentColor;
  }

  .creation-caveat {
    margin-top: 0.75rem;
    color: var(--fg-muted);
    font-size: 0.9rem;
    font-style: italic;
    text-align: center;
  }

  @media (max-width: 720px) {
    .creation-page {
      padding-right: 1rem;
      padding-left: 1rem;
    }

    .creation-header {
      grid-template-columns: 1fr;
      align-items: start;
    }

    .creation-title-wrap {
      text-align: left;
    }
  }
</style>
