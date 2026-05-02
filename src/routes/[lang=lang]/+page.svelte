<script lang="ts">
  import { page } from '$app/state';
  import Crossword from '$lib/components/Crossword.svelte';
  import CreationsGrid from '$lib/components/CreationsGrid.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import HowItWorked from '$lib/components/HowItWorked.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import StationContext from '$lib/components/StationContext.svelte';
  import TaskTier from '$lib/components/TaskTier.svelte';
  import TeamSection from '$lib/components/TeamSection.svelte';
  import { websiteJsonLd } from '$lib/seo/jsonld';

  let { data } = $props();

  const title = $derived(`${data.dict.hero.metaWhen} — Showcase`);
  const description = $derived(
    data.lang === 'de'
      ? 'Was Besucher:innen am 24. April 2026 an Station U27 mit KI gebaut haben.'
      : 'What visitors built with AI at Station U27 on 24 April 2026.'
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
<StationContext dict={data.dict} />
<CreationsGrid lang={data.lang} dict={data.dict} />
<TaskTier lang={data.lang} dict={data.dict} />
<HowItWorked dict={data.dict} />
<Crossword lang={data.lang} dict={data.dict} />
<TeamSection lang={data.lang} dict={data.dict} />
