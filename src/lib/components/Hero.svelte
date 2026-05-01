<script lang="ts">
  import type { Dict } from '$lib/i18n';

  let { dict }: { dict: Dict } = $props();
</script>

<section class="hero">
  <div class="container">
    <h1 class="hero-title">
      <span>{dict.hero.line1}</span>
      <span>{dict.hero.line2}</span>
      <span class="hero-line3">{dict.hero.line3}</span>
    </h1>
    <p class="hero-meta">
      {dict.hero.metaWhen}<br />
      {dict.hero.metaWhere}
    </p>
  </div>
</section>

<style>
  .hero {
    padding: 5rem 0 4rem;
  }

  .hero-title {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 1.5rem;
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: 700;
    line-height: 1.25;
  }

  .hero-line3 {
    color: var(--accent);
  }

  .hero-meta {
    color: var(--fg-muted);
    font-size: 0.95rem;
    line-height: 1.5;
  }
</style>
