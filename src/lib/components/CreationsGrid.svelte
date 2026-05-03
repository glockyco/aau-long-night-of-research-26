<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import { creations, isMobileFriendly, isMultiplayer, type Creation } from '$lib/data/creations';
  import type { Dict, Lang } from '$lib/i18n';
  import CreationCard from './CreationCard.svelte';
  import SectionKicker from './SectionKicker.svelte';
  import { formatPage, pageNumbers } from '$lib/state/page-numbers.svelte';

  let { lang, dict }: { lang: Lang; dict: Dict } = $props();

  const trialAll = creations.filter((c) => c.builtAt < '17:00');
  const eventAll = creations.filter((c) => c.builtAt >= '17:00');

  /** Indexed once over the full archive — kept stable when filters hide cards. */
  const trialIndexed = trialAll.map((creation, i) => ({ creation, index: i + 1 }));
  const eventIndexed = eventAll.map((creation, i) => ({
    creation,
    index: trialAll.length + i + 1
  }));

  // Filter state lives in URL search params for shareability, but the page is
  // statically prerendered — accessing `page.url.searchParams` during SSR
  // throws. We default to `false` server-side and sync from the URL on the
  // client via an effect that tracks `page.url` for reactivity.
  let mobileFilter = $state(false);
  let multiFilter = $state(false);
  const anyFilter = $derived(mobileFilter || multiFilter);

  $effect(() => {
    const params = new URLSearchParams(page.url.search);
    mobileFilter = params.has('mobile');
    multiFilter = params.has('multi');
  });

  function matchesFilters(c: Creation): boolean {
    if (mobileFilter && !isMobileFriendly(c)) return false;
    if (multiFilter && !isMultiplayer(c)) return false;
    return true;
  }

  const filteredTrial = $derived(trialIndexed.filter((e) => matchesFilters(e.creation)));
  const filteredEvent = $derived(eventIndexed.filter((e) => matchesFilters(e.creation)));

  const sectionPage = $derived(formatPage(dict.hero.pageLabelTemplate, pageNumbers.creations));

  async function toggleFilter(key: 'mobile' | 'multi') {
    const url = new URL(page.url);
    if (url.searchParams.has(key)) url.searchParams.delete(key);
    else url.searchParams.set(key, '1');
    await goto(url.pathname + url.search + url.hash, {
      replaceState: true,
      keepFocus: true,
      noScroll: true
    });
  }

  function formatCount(shown: number, total: number): string {
    return dict.creations.filterCount
      .replace('{shown}', String(shown))
      .replace('{total}', String(total));
  }
</script>

<section class="section" id="creations">
  <div class="container">
    <SectionKicker section="§ 2" label={dict.creations.sectionLabel} page={sectionPage} />

    <div class="section-title-row">
      <h2>{dict.creations.sectionTitle}</h2>
      <div class="print-meta">{dict.creations.sectionMeta}</div>
    </div>

    <p class="creations-intro">{dict.creations.intro}</p>

    <div class="filters-row" role="group" aria-label={dict.creations.filterLabel}>
      <span class="filters-label">{dict.creations.filterLabel}</span>
      <button
        type="button"
        class="filter-chip"
        aria-pressed={mobileFilter}
        onclick={() => toggleFilter('mobile')}
      >
        {dict.creations.filterMobile}
      </button>
      <button
        type="button"
        class="filter-chip"
        aria-pressed={multiFilter}
        onclick={() => toggleFilter('multi')}
      >
        {dict.creations.filterMultiplayer}
      </button>
    </div>

    {#if creations.length === 0}
      <p class="creations-empty">…</p>
    {:else}
      <section class="creation-group" aria-labelledby="trial-title">
        <div class="group-head">
          <h3 id="trial-title">{dict.creations.trialLabel}</h3>
          <span>
            {#if anyFilter}
              {formatCount(filteredTrial.length, trialAll.length)}
            {:else}
              {dict.creations.trialMeta}
            {/if}
          </span>
        </div>
        {#if filteredTrial.length === 0}
          <p class="creations-empty">{dict.creations.filterEmpty}</p>
        {:else}
          <div class="creations-grid trial-grid">
            {#each filteredTrial as entry (entry.creation.slug)}
              <CreationCard creation={entry.creation} {lang} {dict} index={entry.index} />
            {/each}
          </div>
        {/if}
      </section>

      <section class="creation-group" aria-labelledby="event-title">
        <div class="group-head">
          <h3 id="event-title">{dict.creations.eventLabel}</h3>
          <span>
            {#if anyFilter}
              {formatCount(filteredEvent.length, eventAll.length)}
            {:else}
              {dict.creations.eventMeta}
            {/if}
          </span>
        </div>
        {#if filteredEvent.length === 0}
          <p class="creations-empty">{dict.creations.filterEmpty}</p>
        {:else}
          <div class="creations-grid">
            {#each filteredEvent as entry (entry.creation.slug)}
              <CreationCard creation={entry.creation} {lang} {dict} index={entry.index} />
            {/each}
          </div>
        {/if}
      </section>
    {/if}
  </div>
</section>

<style>
  .section-title-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 1.25rem;
    align-items: end;
    padding: 0.84rem 0 0.7rem;
    border-bottom: 1px solid var(--hair);
  }

  h2 {
    font-size: clamp(2rem, 4.2vw, 3.45rem);
    letter-spacing: -0.015em;
  }

  .creations-intro {
    max-width: 82ch;
    margin-top: 0.88rem;
    color: var(--fg);
    font-size: 1.04rem;
    line-height: 1.5;
    text-align: justify;
    hyphens: auto;
    -webkit-hyphens: auto;
  }

  .filters-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 0.6rem;
    margin-top: 1.1rem;
  }

  .filters-label {
    color: var(--fg-muted);
    font-family: var(--font-sans);
    font-size: 0.7rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .filter-chip {
    padding: 0.28rem 0.7rem 0.32rem;
    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--fg-muted);
    font-family: var(--font-sans);
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    line-height: 1.2;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      background-color 0.15s,
      color 0.15s,
      border-color 0.15s;
  }

  .filter-chip:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .filter-chip[aria-pressed='true'] {
    border-color: var(--accent);
    background: var(--accent);
    color: var(--bg);
  }

  .filter-chip:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .creation-group {
    margin-top: 1.25rem;
  }

  .creation-group + .creation-group {
    margin-top: 2.1rem;
  }

  .group-head {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: baseline;
    margin-bottom: 0;
    padding: 0.55rem 0 0.45rem;
    border-top: 1px solid var(--fg);
    border-bottom: 1px solid var(--hair);
  }

  .group-head h3,
  .group-head span:last-child {
    font-family: var(--font-sans);
    font-size: 0.72rem;
    letter-spacing: 0.15em;
    line-height: 1.35;
    text-transform: uppercase;
  }

  .group-head h3 {
    color: var(--accent);
  }

  .group-head span:last-child {
    color: var(--fg-muted);
    text-align: right;
  }

  .creations-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0;
  }

  .trial-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .creations-empty {
    padding: 1.1rem 0 0.4rem;
    color: var(--fg-muted);
    font-style: italic;
  }

  @media (max-width: 920px) {
    .section-title-row {
      grid-template-columns: 1fr;
    }

    .creations-grid,
    .trial-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 560px) {
    .group-head {
      display: block;
    }

    .group-head span:last-child {
      display: block;
      margin-top: 0.25rem;
      text-align: left;
    }

    .creations-grid,
    .trial-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
