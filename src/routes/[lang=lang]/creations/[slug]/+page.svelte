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
  const caption = $derived(creation.caption?.[lang]);
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
      <h1 class="creation-title">{creation.titleNative}</h1>
      <span class="creation-time">{creation.builtAt}</span>
    </div>
    <a class="creation-standalone" href={standalone} target="_blank" rel="noopener">
      ↗ {dict.creationPage.openStandalone}
    </a>
  </header>

  {#if caption}
    <p class="creation-caption">{caption}</p>
  {/if}

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
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .creation-back {
    color: var(--fg-muted);
    font-size: 0.9rem;
    text-decoration: none;
  }

  .creation-back:hover {
    color: var(--accent);
  }

  .creation-title-wrap {
    display: flex;
    flex: 1;
    align-items: baseline;
    gap: 0.75rem;
    min-width: 0;
  }

  .creation-title {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .creation-time {
    color: var(--fg-muted);
    font-size: 0.85rem;
    font-variant-numeric: tabular-nums;
  }

  .creation-standalone {
    border-bottom: 1px dotted var(--fg-muted);
    color: var(--fg-muted);
    font-size: 0.9rem;
    text-decoration: none;
  }

  .creation-standalone:hover {
    border-bottom-color: var(--accent);
    color: var(--accent);
  }

  .creation-caption {
    max-width: 70ch;
    margin-bottom: 1rem;
    color: var(--fg-muted);
  }

  .creation-caveat {
    margin-top: 0.75rem;
    color: var(--fg-muted);
    font-size: 0.85rem;
    text-align: center;
  }
</style>
