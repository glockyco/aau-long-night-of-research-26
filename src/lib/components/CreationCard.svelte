<script lang="ts">
  import type { Creation } from '$lib/data/creations';
  import type { Dict, Lang } from '$lib/i18n';

  interface Props {
    creation: Creation;
    lang: Lang;
    dict: Dict;
  }

  const { creation, lang, dict }: Props = $props();

  const href = $derived(`/${lang}/creations/${creation.slug}`);
</script>

<a class="creation-card" {href}>
  <div class="creation-thumb">
    <img
      src={creation.thumbnail}
      alt={creation.titleNative}
      loading="lazy"
      width="600"
      height="375"
    />
  </div>
  <div class="creation-meta">
    <h3 class="creation-title">{creation.titleNative}</h3>
    <div class="creation-time">{dict.creations.builtAt} {creation.builtAt}</div>
  </div>
</a>

<style>
  .creation-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface);
    color: var(--fg);
    text-decoration: none;
    transition:
      border-color 0.15s ease,
      transform 0.15s ease;
  }

  .creation-card:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  .creation-thumb {
    overflow: hidden;
    background: var(--bg);
    aspect-ratio: 16 / 10;
  }

  .creation-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .creation-meta {
    padding: 0.9rem 1rem 1rem;
  }

  .creation-title {
    margin-bottom: 0.15rem;
    font-size: 1.05rem;
  }

  .creation-time {
    color: var(--fg-muted);
    font-size: 0.8rem;
    font-variant-numeric: tabular-nums;
  }
</style>
