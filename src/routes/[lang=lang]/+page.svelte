<script lang="ts">
  import { page } from '$app/state';
  import Crossword from '$lib/components/Crossword.svelte';
  import CreationsGrid from '$lib/components/CreationsGrid.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import HowItWorked from '$lib/components/HowItWorked.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import SectionLens from '$lib/components/SectionLens.svelte';
  import StationContext from '$lib/components/StationContext.svelte';
  import TaskTier from '$lib/components/TaskTier.svelte';
  import TeamSection from '$lib/components/TeamSection.svelte';
  import { eventJsonLd, websiteJsonLd } from '$lib/seo/jsonld';

  let { data } = $props();

  const seo = $derived(data.dict.seo);
  const eventName = $derived(
    data.lang === 'de'
      ? 'Lange Nacht der Forschung 2026 · Station U27'
      : 'Long Night of Research 2026 · Station U27'
  );
  const jsonLd = $derived([
    websiteJsonLd({ lang: data.lang, siteName: seo.siteName }),
    eventJsonLd({
      lang: data.lang,
      name: eventName,
      description: seo.homeDescription,
      imagePath: seo.ogImagePath
    })
  ]);
</script>

<Seo
  title={seo.homeTitle}
  description={seo.homeDescription}
  path={page.url.pathname}
  lang={data.lang}
  siteName={seo.siteName}
  image={seo.ogImagePath}
  imageAlt={seo.ogImageAlt}
  {jsonLd}
/>

<Hero dict={data.dict} />
<StationContext dict={data.dict} />
<CreationsGrid lang={data.lang} dict={data.dict} />
<TaskTier lang={data.lang} dict={data.dict} />
<HowItWorked dict={data.dict} />
<Crossword lang={data.lang} dict={data.dict} />
<TeamSection lang={data.lang} dict={data.dict} />

<SectionLens dict={data.dict} lang={data.lang} />
