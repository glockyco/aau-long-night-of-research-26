<script lang="ts">
  import { team } from '$lib/data/team';
  import type { Dict, Lang } from '$lib/i18n';

  let { lang, dict }: { lang: Lang; dict: Dict } = $props();
</script>

<section class="section" id="team">
  <div class="container">
    <div class="section-label">{dict.team.sectionLabel}</div>
    <div class="team-grid">
      {#each team as member (member.name)}
        <a class="team-card" href={member.url} target="_blank" rel="noopener noreferrer">
          <div class="team-name">{member.name}</div>
          <div class="team-role">{member.role[lang]}</div>
          <div class="team-url">{member.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</div>
        </a>
      {/each}
    </div>
    <p class="team-affiliation">
      {#if lang === 'de'}
        Wir gehören zur <a href="https://www.aau.at/en/isys/serg/">SERG-Gruppe</a> an der Universität
        Klagenfurt.
      {:else}
        We are with the <a href="https://www.aau.at/en/isys/serg/">SERG group</a> at the University of
        Klagenfurt.
      {/if}
    </p>
  </div>
</section>

<style>
  .team-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .team-card {
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    padding: 1.25rem;
    background: var(--surface);
    color: var(--fg);
    text-decoration: none;
    transition: border-color 0.15s ease;
  }

  .team-card:hover {
    border-color: var(--accent);
  }

  .team-name {
    margin-bottom: 0.15rem;
    font-size: 1.05rem;
    font-weight: 600;
  }

  .team-role {
    margin-bottom: 0.5rem;
    color: var(--fg-muted);
    font-size: 0.9rem;
  }

  .team-url {
    color: var(--fg-muted);
    font-family: var(--font-mono);
    font-size: 0.8rem;
  }

  .team-affiliation {
    color: var(--fg-muted);
    font-size: 0.95rem;
  }

  @media (max-width: 720px) {
    .team-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
