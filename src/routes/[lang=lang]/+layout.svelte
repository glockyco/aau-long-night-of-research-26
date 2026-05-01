<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/state';

  let { data, children } = $props();

  // Derive the alternate-language URL by swapping /de ↔ /en in the current path.
  const altLang = $derived(data.lang === 'de' ? 'en' : 'de');
  const altPath = $derived(page.url.pathname.replace(/^\/(de|en)(\/|$)/, `/${altLang}$2`));
</script>

<svelte:head>
  <html lang={data.lang}></html>
</svelte:head>

<header class="site-nav">
  <a class="site-brand" href="/{data.lang}">LNF 2026 · U27</a>
  <a class="lang-toggle" href={altPath} hreflang={altLang}>{data.dict.nav.langSwitch}</a>
</header>

{@render children()}
<Footer dict={data.dict} />

<style>
  .site-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border);
    font-size: 0.9rem;
  }

  .site-brand {
    font-weight: 600;
    text-decoration: none;
  }

  .lang-toggle {
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.3rem 0.6rem;
    text-decoration: none;
    font-variant: small-caps;
  }

  .lang-toggle:hover {
    border-color: var(--accent);
    color: var(--accent);
  }
</style>
