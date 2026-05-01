<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>LNF 2026 — Station U27 ({data.lang.toUpperCase()})</title>
</svelte:head>

<main style="padding: 2rem; max-width: 800px; margin: 0 auto;">
  <p>Lang: {data.lang}</p>
  <p>Hero line 1: {data.dict.hero.line1}</p>
</main>
