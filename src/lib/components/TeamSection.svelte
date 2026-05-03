<script lang="ts">
  import { team } from '$lib/data/team';
  import type { Dict, Lang } from '$lib/i18n';
  import SectionKicker from './SectionKicker.svelte';
  import { formatPage, pageNumbers } from '$lib/state/page-numbers.svelte';

  let { lang, dict }: { lang: Lang; dict: Dict } = $props();

  const sectionPage = $derived(formatPage(dict.hero.pageLabelTemplate, pageNumbers.team));
</script>

<section class="section" id="team">
  <div class="container">
    <SectionKicker section="§ 6" label={dict.team.sectionLabel} page={sectionPage} />

    <div class="section-title-row">
      <h2>{dict.team.heading}</h2>
    </div>

    <div class="team-grid">
      {#each team as member (member.name)}
        <a class="team-card" href={member.url} target="_blank" rel="noopener noreferrer">
          <div class="team-name">{member.name}</div>
          <div class="team-url">{member.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</div>
        </a>
      {/each}
    </div>
    <p class="team-affiliation">
      {#if lang === 'de'}
        Wir gehören zur <a href="https://www.aau.at/en/isys/serg/"
          >Software Engineering Research Group (SERG)</a
        > an der Universität Klagenfurt.
      {:else}
        We are with the <a href="https://www.aau.at/en/isys/serg/"
          >Software Engineering Research Group (SERG)</a
        > at the University of Klagenfurt.
      {/if}
    </p>
    <p class="team-colophon">{dict.team.colophon}</p>
  </div>
</section>

<style>
  .section-title-row {
    padding: 0.84rem 0 0.7rem;
    border-bottom: 1px solid var(--hair);
  }

  h2 {
    font-size: clamp(2rem, 4.2vw, 3.45rem);
    letter-spacing: -0.015em;
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0;
    border-bottom: 1px solid var(--hair);
  }

  .team-card {
    min-width: 0;
    padding: 0.95rem 1rem 1rem;
    border-left: 1px solid var(--hair);
    color: var(--fg);
    text-decoration: none;
  }

  .team-card:first-child {
    border-left: 0;
    padding-left: 0;
  }

  .team-name {
    margin-bottom: 0.2rem;
    font-family: var(--font-display);
    font-size: 1.7rem;
    font-weight: 400;
    line-height: 1.04;
  }

  .team-url {
    color: var(--fg-muted);
    font-family: var(--font-sans);
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    line-height: 1.35;
    text-transform: uppercase;
    word-break: break-word;
  }

  .team-card:hover .team-name,
  .team-card:hover .team-url {
    color: var(--accent);
  }

  .team-affiliation {
    margin-top: 0.9rem;
    color: var(--fg-muted);
  }

  .team-colophon {
    margin-top: 0.55rem;
    color: var(--fg-muted);
    font-style: italic;
  }

  @media (max-width: 720px) {
    .team-grid {
      grid-template-columns: 1fr;
    }

    .team-card,
    .team-card:first-child {
      padding-right: 0;
      padding-left: 0;
      border-left: 0;
      border-bottom: 1px solid var(--hair);
    }

    .team-card:last-child {
      border-bottom: 0;
    }
  }
</style>
