<script lang="ts">
  import { creations } from '$lib/data/creations';
  import type { Dict, Lang } from '$lib/i18n';
  import CreationCard from './CreationCard.svelte';

  let { lang, dict }: { lang: Lang; dict: Dict } = $props();
</script>

<section class="section" id="creations">
  <div class="container">
    <div class="section-label">{dict.creations.sectionLabel}</div>
    {#if creations.length === 0}
      <p class="creations-empty">…</p>
    {:else}
      <div class="creations-grid">
        {#each creations as creation (creation.slug)}
          <CreationCard {creation} {lang} {dict} />
        {/each}
      </div>
    {/if}
  </div>
</section>

<style>
  .creations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.25rem;
  }

  .creations-empty {
    color: var(--fg-muted);
    font-style: italic;
  }
</style>
