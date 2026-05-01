<script lang="ts">
  import { page } from '$app/state';
  import Seo from '$lib/components/Seo.svelte';
  import { websiteJsonLd } from '$lib/seo/jsonld';

  let { data } = $props();

  const title = $derived('LNF 2026 — Station U27');
  const description = $derived(
    data.lang === 'de'
      ? 'Was Besucher:innen am 24. April 2026 an Station U27 mit Claude Code gebaut haben.'
      : 'What visitors built with Claude Code at Station U27 on 24 April 2026.'
  );
</script>

<Seo
  {title}
  {description}
  path={page.url.pathname}
  lang={data.lang}
  jsonLd={websiteJsonLd(data.lang)}
/>

<main style="padding: 2rem; max-width: 800px; margin: 0 auto;">
  <p>{data.dict.hero.line1}</p>
</main>
