<script lang="ts">
  import type { Creation } from '$lib/data/creations';
  import type { Dict, Lang } from '$lib/i18n';

  interface Props {
    creation: Creation;
    lang: Lang;
    dict: Dict;
    index: number;
  }

  const { creation, lang, dict, index }: Props = $props();
  const href = $derived(`/${lang}/creations/${creation.slug}`);
  const anchorId = $derived(`creation-${creation.slug}`);
  const number = $derived(String(index).padStart(2, '0'));
</script>

<a id={anchorId} class="creation-card" {href}>
  <figure>
    <div class="creation-thumb" aria-hidden="true">
      <span class="creation-no">№ {number}</span>
      <img src={creation.thumbnail} alt="" loading="lazy" width="600" height="375" />
    </div>
    <figcaption class="creation-meta">
      <h3 class="creation-title">{creation.titleNative}</h3>
      <span class="creation-time">{dict.creations.builtAt} {creation.builtAt}</span>
    </figcaption>
  </figure>
</a>

<style>
  .creation-card {
    position: relative;
    display: block;
    min-width: 0;
    padding: 0.95rem 0.85rem 1rem;

    color: var(--fg);
    text-decoration: none;
    scroll-margin-top: 1rem;
  }

  figure {
    margin: 0;
  }

  .creation-thumb {
    position: relative;
    padding: 2px;
    border: 1px solid rgba(24, 20, 16, 0.56);
    background: var(--surface-2);
  }

  .creation-thumb img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    filter: grayscale(0.2) contrast(1.07) sepia(0.08) saturate(0.92);
  }

  .creation-no {
    position: absolute;
    top: 5px;
    left: 6px;
    z-index: 1;
    padding: 1px 5px 2px;
    border: 1px solid rgba(24, 20, 16, 0.42);
    background: var(--bg);
    color: var(--accent);
    font-family: var(--font-sans);
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    line-height: 1.2;
    text-transform: uppercase;
  }

  .creation-meta {
    display: grid;
    grid-template-columns: minmax(0, 1fr) max-content;
    gap: 0.18rem 0.65rem;
    align-items: baseline;
    padding: 0.52rem 0 0.12rem;
  }

  .creation-title {
    overflow-wrap: anywhere;
    font-family: var(--font-body);
    font-size: 1.05rem;
    font-style: italic;
    font-weight: 400;
    line-height: 1.18;
  }

  .creation-time {
    justify-self: end;
    font-family: var(--font-sans);
    font-size: 0.66rem;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    white-space: nowrap;
    text-align: right;
  }

  .creation-card:hover {
    background-color: rgba(122, 29, 29, 0.035);
    color: var(--fg);
  }

  .creation-card:hover .creation-thumb {
    border-color: var(--accent);
  }

  .creation-card:hover .creation-title {
    color: var(--accent);
  }
</style>
