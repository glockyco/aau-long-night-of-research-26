<script lang="ts">
  import { page } from '$app/state';
  import CreationFrame from '$lib/components/CreationFrame.svelte';
  import CreationTags from '$lib/components/CreationTags.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { breadcrumbJsonLd, creationJsonLd } from '$lib/seo/jsonld';
  import { MediaQuery } from 'svelte/reactivity';

  let { data } = $props();

  const creation = $derived(data.creation);
  const lang = $derived(data.lang);
  const dict = $derived(data.dict);
  const previousCreation = $derived(data.previousCreation);
  const nextCreation = $derived(data.nextCreation);

  const siteName = $derived(dict.seo.siteName);
  const title = $derived(`${creation.titleNative} · ${siteName}`);
  const description = $derived(
    lang === 'de'
      ? `${creation.titleNative} — gebaut um ${creation.builtAt} an Station U27, Lange Nacht der Forschung 2026.`
      : `${creation.titleNative} — built at ${creation.builtAt} at Station U27, Long Night of Research 2026.`
  );
  const ogImage = $derived(`/creations/${creation.slug}-og.webp`);
  const ogImageAlt = $derived(
    lang === 'de'
      ? `Screenshot der Kreation „${creation.titleNative}", gebaut an Station U27 um ${creation.builtAt}.`
      : `Screenshot of the creation "${creation.titleNative}", built at Station U27 at ${creation.builtAt}.`
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

  const coarsePointer = new MediaQuery('(pointer: coarse)');
  const mobileNote = $derived.by(() => {
    if (!coarsePointer.current) return null;
    if (creation.mobile === 'limited') return dict.creationPage.mobileNoteLimited;
    if (creation.mobile === 'no') return dict.creationPage.mobileNoteNo;
    return null;
  });

  const jsonLd = $derived([
    breadcrumbJsonLd([
      { name: lang === 'de' ? 'Startseite' : 'Home', path: `/${lang}` },
      { name: creation.titleNative, path: `/${lang}/creations/${creation.slug}` }
    ]),
    creationJsonLd({
      title: creation.titleNative,
      slug: creation.slug,
      builtAt: creation.builtAt,
      lang,
      siteName
    })
  ]);
</script>

<Seo
  {title}
  {description}
  path={page.url.pathname}
  {lang}
  {siteName}
  image={ogImage}
  imageAlt={ogImageAlt}
  {jsonLd}
/>

<main class="creation-page">
  <nav class="creation-nav" aria-label={dict.creationPage.backToIndex}>
    <a class="creation-back" href={indexHref}>{dict.creationPage.backToIndex}</a>
    <span class="mobile-entry-meta" aria-hidden="true">{creationNumber}/{data.totalCreations}</span>

    <div class="top-pager">
      {#if previousCreation && previousHref}
        <a class="nav-link" href={previousHref}>
          <span class="desktop-nav-label">{dict.creationPage.previous}</span>
          <small class="desktop-nav-meta">{dict.creationPage.entryLabel} {previousNumber} · {previousCreation.builtAt}</small>
          <strong class="desktop-nav-title">{previousCreation.titleNative}</strong>
          <span class="mobile-nav-label">← {dict.creationPage.entryLabel} {previousNumber}</span>
        </a>
      {:else}
        <span class="nav-link muted">
          <span class="desktop-nav-label">{dict.creationPage.firstEntry}</span>
          <span class="mobile-nav-label">{dict.creationPage.firstEntry}</span>
        </span>
      {/if}

      {#if nextCreation && nextHref}
        <a class="nav-link next" href={nextHref}>
          <span class="desktop-nav-label">{dict.creationPage.next}</span>
          <small class="desktop-nav-meta">{dict.creationPage.entryLabel} {nextNumber} · {nextCreation.builtAt}</small>
          <strong class="desktop-nav-title">{nextCreation.titleNative}</strong>
          <span class="mobile-nav-label">{dict.creationPage.entryLabel} {nextNumber} →</span>
        </a>
      {:else}
        <span class="nav-link muted next">
          <span class="desktop-nav-label">{dict.creationPage.lastEntry}</span>
          <span class="mobile-nav-label">{dict.creationPage.lastEntry}</span>
        </span>
      {/if}
    </div>
  </nav>

  <header class="creation-header">
    <div class="creation-title-wrap">
      <p class="print-meta">
        <span class="entry-count">{dict.creationPage.entryLabel} {creationNumber}/{data.totalCreations}</span>
        <span class="meta-sep" aria-hidden="true">·</span>
        <span>{dict.creations.builtAt} {creation.builtAt}</span>
      </p>
      <h1 class="creation-title">{creation.titleNative}</h1>
      <div class="creation-tags-wrap">
        <CreationTags {creation} {dict} />
      </div>
    </div>
  </header>

  <CreationFrame {creation} />

  <div class="creation-actions">
    <a class="creation-standalone" href={standalone} target="_blank" rel="noopener">
      ↗ {dict.creationPage.openStandalone}
    </a>
    {#if mobileNote}
      <p class="creation-mobile-note">{mobileNote}</p>
    {/if}
  </div>

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
  .nav-link:hover,
  .creation-standalone:hover {
    color: var(--accent);
  }

  .top-pager {
    display: grid;
    grid-template-columns: repeat(2, 12.5rem);
    justify-content: flex-end;
    gap: 0.8rem 1.2rem;
    text-align: right;
  }

  .nav-link {
    display: grid;
    min-width: 0;
    width: 100%;
    gap: 0.12rem;
  }

  .nav-link small {
    color: var(--accent);
    font-size: 0.64rem;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.12em;
  }

  .desktop-nav-title {
    overflow: hidden;
    min-width: 0;
    color: var(--fg);
    font-family: var(--font-body);
    font-size: 1.05rem;
    font-style: italic;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.12;
    text-overflow: ellipsis;
    text-transform: none;
    white-space: nowrap;
  }

  .nav-link:hover .desktop-nav-title {
    color: var(--accent);
  }

  .mobile-entry-meta {
    display: none;
  }

  .mobile-nav-label {
    display: none;
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

  .creation-tags-wrap {
    display: flex;
    justify-content: center;
    margin-top: 0.7rem;
  }

  .creation-title-wrap .print-meta {
    margin-bottom: 0.3rem;
    color: var(--accent);
  }

  .creation-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.4rem;
    margin-top: 0.85rem;
  }

  .creation-mobile-note {
    max-width: 42ch;
    color: var(--fg-muted);
    font-style: italic;
    font-size: 0.86rem;
    line-height: 1.35;
    text-align: right;
  }

  .creation-standalone {
    border-bottom: 1px dotted currentColor;
  }


  @media (max-width: 720px) {
    .creation-page {
      padding: 0.55rem 1rem 2.35rem;
    }

    .creation-nav {
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 0.38rem 0.85rem;
      align-items: baseline;
      padding: 0.28rem 0 0.4rem;
      border-bottom: 1px solid var(--hair);
    }

    .mobile-entry-meta {
      display: inline-block;
      justify-self: end;
      color: var(--accent);
      font-family: var(--font-sans);
      font-size: 0.68rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.12em;
      line-height: 1.35;
      text-transform: uppercase;
    }

    .top-pager {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.55rem;
      justify-content: stretch;
      padding-top: 0.15rem;
      text-align: left;
    }

    .desktop-nav-label,
    .desktop-nav-meta,
    .desktop-nav-title {
      display: none;
    }

    .mobile-nav-label {
      display: inline;
    }

    .nav-link {
      min-width: 0;
      padding-top: 0.18rem;
      border-top: 1px dotted var(--hair);
      font-size: 0.66rem;
      letter-spacing: 0.12em;
    }

    .nav-link.next {
      justify-items: end;
      text-align: right;
    }

    .creation-header {
      margin-bottom: 0.45rem;
      padding: 0.42rem 0 0.52rem;
      text-align: left;
    }

    .creation-title {
      font-size: clamp(2rem, 10.6vw, 3rem);
      line-height: 1.14;
    }

    .entry-count,
    .meta-sep {
      display: none;
    }

    .creation-title-wrap .print-meta {
      margin-bottom: 0.55rem;
      font-size: 0.68rem;
    }

    .creation-tags-wrap {
      justify-content: flex-start;
      margin-top: 0.48rem;
    }

    .creation-actions {
      align-items: flex-start;
      justify-content: flex-start;
      margin-top: 0.7rem;
    }

    .creation-mobile-note {
      text-align: left;
    }

  }
</style>
