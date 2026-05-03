<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/state';
  import {
    restoreLanguageScroll,
    switchLanguagePreservingScroll
  } from '$lib/navigation/language-scroll';

  let { data, children } = $props();

  // Derive the alternate-language URL by swapping /de ↔ /en in the current path.
  const altLang = $derived(data.lang === 'de' ? 'en' : 'de');
  const altPath = $derived(page.url.pathname.replace(/^\/(de|en)(\/|$)/, `/${altLang}$2`));
  const isCreationPage = $derived(/^\/(de|en)\/creations\//.test(page.url.pathname));
  const hasNameplateMiddle = $derived(data.dict.nav.nameplateMiddle.trim().length > 0);
  const nameplateLabel = $derived(
    hasNameplateMiddle
      ? `${data.dict.nav.nameplatePrefix} — ${data.dict.nav.nameplateMiddle}${data.dict.nav.nameplateTitle}`
      : `${data.dict.nav.nameplatePrefix} ${data.dict.nav.nameplateTitle}`
  );

  $effect(() => {
    const path = page.url.pathname;
    return restoreLanguageScroll(path);
  });
</script>

<header class="site-masthead" class:compact={isCreationPage} id="top">
  <div class="masthead-inner">
    <div class="folio-row">
      <a class="site-brand" href="/{data.lang}"
        >{isCreationPage ? data.dict.nav.folio : data.dict.nav.runningHead}</a
      >
      <span class="site-rule" aria-hidden="true"></span>
      {#if !isCreationPage}
        <span class="archive-line">{data.dict.nav.archiveLine}</span>
      {/if}
      <a
        class="lang-toggle"
        href={altPath}
        hreflang={altLang}
        onclick={(event) => switchLanguagePreservingScroll(event, altPath)}
        >{data.dict.nav.langSwitch}</a
      >
    </div>

    {#if !isCreationPage}
      <div class="masthead-grid">
        <div class="dateline">
          {#each data.dict.nav.dateline as line (line)}
            <span>{line}</span>
          {/each}
        </div>

        <a class="nameplate" href="/{data.lang}" aria-label={nameplateLabel}>
          <span class="nameplate-prefix">{data.dict.nav.nameplatePrefix}</span
          >{#if hasNameplateMiddle}<span class="nameplate-dash" aria-hidden="true">—</span><span
              class="nameplate-middle">{data.dict.nav.nameplateMiddle}</span
            >{:else}&nbsp;{/if}<span class="nameplate-title">{data.dict.nav.nameplateTitle}</span>
        </a>

        <div class="editionline">
          {#each data.dict.nav.editionLines as line (line)}
            <span>{line}</span>
          {/each}
        </div>
      </div>

      <div class="double-rule" aria-hidden="true"></div>

      <p class="standfirst">
        {#each data.dict.nav.standfirst as item, index (item)}
          <span>{item}</span>
          {#if index < data.dict.nav.standfirst.length - 1}
            <span class="ornament" aria-hidden="true">✥</span>
          {/if}
        {/each}
      </p>

      <div class="red-banner">
        <span>{data.dict.nav.pressBannerLead}</span>
        <span class="pip" aria-hidden="true"></span>
        <span>{data.dict.nav.pressBannerTrail}</span>
      </div>
    {/if}
  </div>
</header>

{@render children()}
<Footer dict={data.dict} />

<style>
  .site-masthead {
    padding: 0.85rem 0 0;
  }

  .masthead-inner {
    position: relative;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 1.5rem 1.05rem;
    border-top: 3px solid var(--fg);
    border-bottom: 1px solid var(--fg);
  }

  .folio-row {
    display: grid;
    grid-template-columns: minmax(0, auto) minmax(2rem, 1fr) minmax(0, auto) auto;
    gap: 0.75rem;
    align-items: center;
    padding: 0.52rem 0 0.46rem;
    border-bottom: 1px solid var(--hair);
    color: var(--fg-muted);
    font-family: var(--font-sans);
    font-size: 0.64rem;
    letter-spacing: 0.14em;
    line-height: 1.35;
    text-transform: uppercase;
  }

  .compact .masthead-inner {
    padding-bottom: 0.45rem;
  }

  .compact .folio-row {
    grid-template-columns: auto minmax(2rem, 1fr) auto;
    border-bottom: 0;
    padding-bottom: 0;
  }

  .site-brand,
  .lang-toggle,
  .nameplate {
    color: inherit;
    text-decoration: none;
  }

  .site-brand {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .site-brand::first-letter {
    color: var(--accent);
  }

  .site-rule {
    height: 1px;
    background: var(--hair);
  }

  .archive-line {
    overflow: hidden;
    font-variant-numeric: tabular-nums;
    text-align: right;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .lang-toggle {
    color: var(--accent);
    font-weight: 600;
    white-space: nowrap;
  }

  .masthead-grid {
    display: grid;
    grid-template-columns: minmax(6rem, 0.75fr) minmax(0, auto) minmax(6rem, 0.75fr);
    gap: clamp(0.8rem, 2vw, 1.4rem);
    align-items: end;
    padding: 1.15rem 0 0.34rem;
  }

  .dateline,
  .editionline {
    display: grid;
    gap: 0.08rem;
    padding-bottom: 0.6rem;
    font-family: var(--font-sans);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    line-height: 1.35;
    text-transform: uppercase;
  }

  .editionline {
    text-align: right;
  }

  .nameplate {
    min-width: 0;
    max-width: 100%;
    color: var(--fg);
    font-family: var(--font-masthead);
    font-size: clamp(2.7rem, 6.5vw, 5.35rem);
    font-weight: 400;
    letter-spacing: -0.01em;
    line-height: 0.92;
    text-align: center;
    white-space: nowrap;
  }

  .nameplate-prefix {
    margin-right: 0.08em;
  }

  .nameplate-dash {
    margin: 0 0.1em 0 0.05em;
    font-size: 0.82em;
  }

  .nameplate-title {
    color: var(--accent);
    font-style: italic;
  }

  .double-rule {
    height: 6px;
    margin: 0.7rem 0 0.72rem;
    border-top: 3px solid var(--fg);
    border-bottom: 1px solid var(--fg);
  }

  .standfirst {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.18rem 0.52rem;
    margin: 0 auto 1.1rem;
    color: var(--fg-muted);
    font-size: 1rem;
    font-style: italic;
    text-align: center;
  }

  .standfirst .ornament {
    color: var(--accent);
    font-style: normal;
  }

  .red-banner {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: baseline;
    gap: 0.62rem 0.9rem;
    margin: 0;
    padding: 0.68rem 1rem;
    border-top: 1px solid var(--accent-deep);
    border-bottom: 1px solid var(--accent-deep);
    background: var(--accent);
    color: var(--surface);
    font-family: var(--font-sans);
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    line-height: 1.35;
    text-align: center;
    text-transform: uppercase;
  }

  .red-banner .pip {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.72;
    transform: translateY(-0.12rem);
  }

  .site-brand:hover,
  .lang-toggle:hover,
  .nameplate:hover {
    color: var(--accent);
  }

  @media (max-width: 980px) {
    .masthead-grid {
      grid-template-columns: 1fr;
      gap: 0.55rem;
      justify-items: center;
      padding-top: 1rem;
    }

    .dateline,
    .editionline {
      display: none;
    }

    .nameplate {
      white-space: normal;
    }
  }

  @media (max-width: 640px) {
    .site-masthead {
      padding-top: 0.55rem;
    }

    .masthead-inner {
      padding-right: 1rem;
      padding-left: 1rem;
    }

    .folio-row,
    .compact .folio-row {
      grid-template-columns: 1fr auto;
    }

    .site-rule,
    .archive-line {
      display: none;
    }

    .nameplate {
      font-size: clamp(2.35rem, 12vw, 3.7rem);
    }

    .red-banner {
      font-size: 0.7rem;
    }
  }
</style>
