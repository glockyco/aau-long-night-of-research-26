<script lang="ts">
  import { page } from '$app/state';
  import Hero from '$lib/components/Hero.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import TaskTier from '$lib/components/TaskTier.svelte';
  import { websiteJsonLd } from '$lib/seo/jsonld';

  let { data } = $props();

  const title = $derived(`${data.dict.hero.metaWhen} — Showcase`);
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

<Hero dict={data.dict} />
<TaskTier lang={data.lang} dict={data.dict} />
