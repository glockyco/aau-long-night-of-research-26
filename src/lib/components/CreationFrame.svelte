<script lang="ts">
  import type { Creation } from '$lib/data/creations';

  interface Props {
    creation: Creation;
  }

  const { creation }: Props = $props();
  const src = $derived(`/raw/${creation.slug}.html`);
</script>

<div class="frame-wrapper">
  <iframe
    {src}
    title={creation.titleNative}
    sandbox="allow-scripts allow-pointer-lock"
    loading="lazy"
    referrerpolicy="no-referrer"
  ></iframe>
</div>

<style>
  .frame-wrapper {
    overflow: hidden;
    width: 100%;
    height: calc(100vh - 8rem);
    min-height: 480px;
    padding: 3px;
    border: 1px solid var(--fg);
    background: var(--surface-3);
    box-shadow:
      0 0 0 1px var(--hair),
      0 0 0 6px rgba(24, 20, 16, 0.05);
  }

  iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    background: #000;
  }
</style>
