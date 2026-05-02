<script lang="ts">
  import type { Dict } from '$lib/i18n';
  import SectionKicker from './SectionKicker.svelte';

  let { dict }: { dict: Dict } = $props();

  const pageNo = $derived(dict.hero.contents[0]?.page);
</script>

<section class="section station-context" id="station">
  <div class="container">
    <SectionKicker
      section="§ 1"
      label={`${dict.context.sectionLabel} — Klagenfurt, AAU`}
      page={pageNo}
    />

    <div class="station-header">
      <h2>{dict.context.heading}</h2>
    </div>

    <article class="station-copy">
      {#each dict.context.paragraphs as paragraph (paragraph)}
        <p>{paragraph}</p>
      {/each}
    </article>
  </div>
</section>

<style>
  .station-context {
    padding-top: 2.15rem;
  }

  .station-header {
    display: grid;
    gap: 0.48rem;
    padding: 0.86rem 0 0.75rem;
    border-bottom: 1px solid var(--hair);
  }

  h2 {
    max-width: none;
    font-size: clamp(2rem, 4.2vw, 3.45rem);
    letter-spacing: -0.015em;
  }

  .station-copy {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0;
    margin-top: 0.95rem;
    border-bottom: 1px solid var(--hair);
  }

  .station-copy p {
    position: relative;
    min-width: 0;
    padding: 0 1.2rem 1.05rem;
    font-size: 1.04rem;
    line-height: 1.52;
    text-align: justify;
    hyphens: auto;
    -webkit-hyphens: auto;
  }

  .station-copy p:first-child {
    padding-left: 0;
  }

  .station-copy p:first-child::first-letter {
    float: left;
    margin: 0.18rem 0.55rem 0 0;
    color: var(--accent);
    font-family: var(--font-display);
    font-size: 4.1rem;
    font-weight: 700;
    line-height: 0.82;
  }

  .station-copy p + p {
    text-indent: 1.2em;
  }

  .station-copy p + p::before {
    position: absolute;
    top: 0;
    bottom: 1.05rem;
    left: 0;
    width: 1px;
    background: var(--hair);
    content: '';
  }

  .station-copy p:last-child {
    padding-right: 0;
  }

  @media (max-width: 1000px) {
    .station-copy {
      grid-template-columns: 1fr;
      max-width: 74ch;
      border-bottom: 0;
    }

    .station-copy p,
    .station-copy p:first-child,
    .station-copy p:last-child {
      padding: 0 0 0.85rem;
    }

    .station-copy p + p {
      text-indent: 0;
    }

    .station-copy p + p::before {
      content: none;
    }
  }
</style>
