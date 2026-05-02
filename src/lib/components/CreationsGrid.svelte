<script lang="ts">
  import { creations } from '$lib/data/creations';
  import type { Dict, Lang } from '$lib/i18n';
  import CreationCard from './CreationCard.svelte';
  import SectionKicker from './SectionKicker.svelte';

  let { lang, dict }: { lang: Lang; dict: Dict } = $props();

  const trialCreations = $derived(creations.filter((creation) => creation.builtAt < '17:00'));
  const eventCreations = $derived(creations.filter((creation) => creation.builtAt >= '17:00'));
  const sectionPage = $derived(dict.hero.contents[1]?.page);
</script>

<section class="section" id="creations">
  <div class="container">
    <SectionKicker section="§ 2" label={dict.creations.sectionLabel} page={sectionPage} />

    <div class="section-title-row">
      <h2>{dict.creations.sectionTitle}</h2>
      <div class="print-meta">{dict.creations.sectionMeta}</div>
    </div>

    <p class="creations-intro">{dict.creations.intro}</p>

    {#if creations.length === 0}
      <p class="creations-empty">…</p>
    {:else}
      <section class="creation-group" aria-labelledby="trial-title">
        <div class="group-head">
          <h3 id="trial-title"><span>№</span> {dict.creations.trialLabel}</h3>
          <span>{dict.creations.trialMeta}</span>
        </div>
        <div class="creations-grid trial-grid">
          {#each trialCreations as creation, i (creation.slug)}
            <CreationCard {creation} {lang} {dict} index={i + 1} />
          {/each}
        </div>
      </section>

      <section class="creation-group" aria-labelledby="event-title">
        <div class="group-head">
          <h3 id="event-title"><span>№</span> {dict.creations.eventLabel}</h3>
          <span>{dict.creations.eventMeta}</span>
        </div>
        <div class="creations-grid">
          {#each eventCreations as creation, i (creation.slug)}
            <CreationCard {creation} {lang} {dict} index={trialCreations.length + i + 1} />
          {/each}
        </div>
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

  .group-head h3 span {
    font-family: var(--font-display);
    font-size: 0.98rem;
    font-style: italic;
    font-weight: 400;
    letter-spacing: 0;
    text-transform: none;
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
