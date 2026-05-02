<script lang="ts">
  import { page } from '$app/state';
  import CreationFrame from '$lib/components/CreationFrame.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { breadcrumbJsonLd, creationJsonLd } from '$lib/seo/jsonld';

  let { data } = $props();

  const creation = $derived(data.creation);
  const lang = $derived(data.lang);
  const dict = $derived(data.dict);
  const previousCreation = $derived(data.previousCreation);
  const nextCreation = $derived(data.nextCreation);

  const title = $derived(`${creation.titleNative} — LNF 2026 / U27`);
  const description = $derived(
    lang === 'de'
      ? `${creation.titleNative} — gebaut um ${creation.builtAt} an Station U27, Lange Nacht der Forschung 2026.`
      : `${creation.titleNative} — built at ${creation.builtAt} at Station U27, Long Night of Research 2026.`
  );
  const standalone = $derived(`/raw/${creation.slug}.html`);
  const indexHref = $derived(`/${lang}#creation-${creation.slug}`);
  const creationNumber = $derived(String(data.creationIndex + 1).padStart(2, '0'));
  const previousNumber = $derived(String(data.creationIndex).padStart(2, '0'));
  const nextNumber = $derived(String(data.creationIndex + 2).padStart(2, '0'));
  const previousHref = $derived(
    previousCreation ? `/${lang}/creations/${previousCreation.slug}` : null
  );
  const nextHref = $derived(nextCreation ? `/${lang}/creations/${nextCreation.slug}` : null);

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
  <nav class="creation-nav" aria-label={dict.creationPage.backToIndex}>
    <a class="creation-back" href={indexHref}>{dict.creationPage.backToIndex}</a>

    <div class="top-pager">
      {#if previousCreation && previousHref}
        <a class="nav-link" href={previousHref}>
          <span>{dict.creationPage.previous}</span>
          <small>{dict.creationPage.entryLabel} {previousNumber}</small>
        </a>
      {:else}
        <span class="nav-link muted">
          <span>{dict.creationPage.firstEntry}</span>
        </span>
      {/if}

      {#if nextCreation && nextHref}
        <a class="nav-link next" href={nextHref}>
          <span>{dict.creationPage.next}</span>
          <small>{dict.creationPage.entryLabel} {nextNumber}</small>
        </a>
      {:else}
        <span class="nav-link muted next">
          <span>{dict.creationPage.lastEntry}</span>
        </span>
      {/if}
    </div>
  </nav>

  <header class="creation-header">
    <div class="creation-title-wrap">
      <p class="print-meta">
        {dict.creationPage.entryLabel} {creationNumber}/{data.totalCreations} · {dict.creations.builtAt} {creation.builtAt}
      </p>
      <h1 class="creation-title">{creation.titleNative}</h1>
    </div>
  </header>

  <CreationFrame {creation} />

  <div class="creation-actions">
    <a class="creation-standalone" href={standalone} target="_blank" rel="noopener">
      ↗ {dict.creationPage.openStandalone}
    </a>
  </div>

  <nav class="creation-pagination" aria-label={dict.creationPage.backToIndex}>
    {#if previousCreation && previousHref}
      <a class="pagination-link" href={previousHref}>
        <span>{dict.creationPage.previous}</span>
        <small>{dict.creationPage.entryLabel} {previousNumber} · {previousCreation.builtAt}</small>
        <strong>{previousCreation.titleNative}</strong>
      </a>
    {:else}
      <span class="pagination-link muted">
        <span>{dict.creationPage.firstEntry}</span>
      </span>
    {/if}

    {#if nextCreation && nextHref}
      <a class="pagination-link next" href={nextHref}>
        <span>{dict.creationPage.next}</span>
        <small>{dict.creationPage.entryLabel} {nextNumber} · {nextCreation.builtAt}</small>
        <strong>{nextCreation.titleNative}</strong>
      </a>
    {:else}
      <span class="pagination-link muted next">
        <span>{dict.creationPage.lastEntry}</span>
      </span>
    {/if}
  </nav>
</main>

<style>
  .creation-page {
    max-width: 1280px;
    margin: 0 auto;
    padding: 1rem 1.5rem 3rem;
  }

  .creation-nav {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1rem;
    align-items: start;
    padding: 0.75rem 0 0.35rem;
  }

  .creation-back,
  .nav-link,
  .creation-standalone,
  .pagination-link {
    color: var(--fg-muted);
    font-family: var(--font-sans);
    font-size: 0.74rem;
    letter-spacing: 0.14em;
    line-height: 1.35;
    text-decoration: none;
    text-transform: uppercase;
  }

  .creation-back:hover,
  .nav-link:hover,
  .creation-standalone:hover,
  .pagination-link:hover {
    color: var(--accent);
  }

  .top-pager {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.8rem 1.2rem;
    text-align: right;
  }

  .nav-link {
    display: grid;
    gap: 0.12rem;
  }

  .nav-link small,
  .pagination-link small {
    color: var(--accent);
    font-size: 0.64rem;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.12em;
  }

  .muted {
    color: var(--fg-faint);
  }

  .creation-header {
    margin-bottom: 1rem;
    padding: 0.7rem 0 1rem;
    border-bottom: 1px solid var(--hair);
    text-align: center;
  }

  .creation-title-wrap {
    min-width: 0;
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

  .creation-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.85rem;
  }

  .creation-standalone {
    border-bottom: 1px dotted currentColor;
  }

  .creation-pagination {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 1.25rem;
    padding-top: 0.85rem;
    border-top: 1px solid var(--fg);
  }

  .pagination-link {
    display: grid;
    min-height: 4rem;
    gap: 0.18rem;
    align-content: start;
    padding-right: 1rem;
  }

  .pagination-link.next {
    justify-items: end;
    padding-right: 0;
    padding-left: 1rem;
    text-align: right;
  }

  .pagination-link strong {
    overflow-wrap: anywhere;
    color: var(--fg);
    font-family: var(--font-body);
    font-size: 1.2rem;
    font-style: italic;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.15;
    text-transform: none;
  }

  .pagination-link:hover strong {
    color: var(--accent);
  }

  @media (max-width: 720px) {
    .creation-page {
      padding-right: 1rem;
      padding-left: 1rem;
    }

    .creation-nav {
      grid-template-columns: 1fr;
    }

    .top-pager {
      justify-content: space-between;
      text-align: left;
    }

    .nav-link.next {
      text-align: right;
    }

    .creation-header {
      text-align: left;
    }

    .creation-actions {
      justify-content: flex-start;
    }

    .creation-pagination {
      grid-template-columns: 1fr;
    }

    .pagination-link.next {
      justify-items: start;
      padding-left: 0;
      text-align: left;
    }
  }
</style>
