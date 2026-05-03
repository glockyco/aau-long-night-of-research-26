<script lang="ts">
  import { page } from '$app/state';
  import { buildSections, SECTION_IDS, type SectionId } from '$lib/data/sections';
  import type { Dict, Lang } from '$lib/i18n';
  import { switchLanguagePreservingScroll } from '$lib/navigation/language-scroll';
  import { SvelteSet } from 'svelte/reactivity';
  import {
    attachPageNumberTracker,
    formatPage,
    pageNumbers,
    scroll
  } from '$lib/state/page-numbers.svelte';

  interface Props {
    dict: Dict;
    lang: Lang;
  }

  const { dict, lang }: Props = $props();
  const sections = $derived(buildSections(dict));
  const altLang: Lang = $derived(lang === 'de' ? 'en' : 'de');
  const altPath = $derived(page.url.pathname.replace(/^\/(de|en)(\/|$)/, `/${altLang}$2`));

  /**
   * The currently in-view section. Detected via IntersectionObserver
   * with a thin spy band in the upper third of the viewport — when a
   * section's top crosses into that band, it becomes active. Defaults
   * to the first section so the lens has something useful to display
   * before the user has scrolled.
   */
  let activeId = $state<SectionId>('station');
  let menuOpen = $state(false);

  const activeSection = $derived(sections.find((s) => s.id === activeId) ?? sections[0]);

  $effect(() => {
    if (typeof window === 'undefined') return;

    const visible = new SvelteSet<Element>();

    function isAtPageBottom() {
      return window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    }

    function selectVisibleSection() {
      if (isAtPageBottom()) {
        activeId = SECTION_IDS[SECTION_IDS.length - 1];
        return;
      }
      if (visible.size === 0) return;

      // Pick the topmost intersecting section so the lens tracks
      // reading position rather than whichever section happens to
      // appear last in observer batch order.
      const topmost = [...visible].reduce((a, b) =>
        a.getBoundingClientRect().top < b.getBoundingClientRect().top ? a : b
      );
      const id = topmost.id;
      if ((SECTION_IDS as readonly string[]).includes(id)) {
        activeId = id as SectionId;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        selectVisibleSection();
      },
      { rootMargin: '-25% 0% -65% 0%', threshold: 0 }
    );

    window.addEventListener('scroll', selectVisibleSection, { passive: true });
    window.addEventListener('resize', selectVisibleSection);

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    selectVisibleSection();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', selectVisibleSection);
      window.removeEventListener('resize', selectVisibleSection);
    };
  });

  /**
   * Track the print-style page number for each section: how many
   * viewport-heights down the document each section's top edge sits.
   */
  $effect(() => attachPageNumberTracker());

  /**
   * Close the menu on outside click, Escape, and after a TOC click
   * (the browser will smooth-scroll to the destination, so we don't
   * want the menu obscuring it).
   */
  $effect(() => {
    if (!menuOpen) return;

    function onPointerDown(e: PointerEvent) {
      const target = e.target as Element;
      if (!target.closest('.lens-container')) menuOpen = false;
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') menuOpen = false;
    }

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKey);
    };
  });
</script>

<div class="lens-container">
  <button
    type="button"
    class="lens-pill"
    aria-haspopup="dialog"
    aria-expanded={menuOpen}
    aria-controls="section-lens-menu"
    aria-label={dict.hero.sectionLensLabel}
    onclick={() => (menuOpen = !menuOpen)}
  >
    <span class="lens-section">§ {activeSection.number}</span>
    <span class="lens-sep" aria-hidden="true">·</span>
    <span class="lens-page">{formatPage(dict.hero.pageLabelTemplate, scroll.page)}</span>
    <span class="lens-sep" aria-hidden="true">·</span>
    <span class="lens-lang">{lang.toUpperCase()}</span>
  </button>

  {#if menuOpen}
    <div
      id="section-lens-menu"
      class="lens-menu"
      role="dialog"
      aria-label={dict.hero.sectionLensLabel}
    >
      <ol class="lens-toc">
        {#each sections as section (section.id)}
          {@const isActive = section.id === activeId}
          <li class:active={isActive}>
            <a
              href="#{section.id}"
              aria-current={isActive ? 'true' : undefined}
              onclick={() => (menuOpen = false)}
            >
              <span class="toc-num">§ {section.number}</span>
              <span class="toc-label">{section.label}</span>
              <span class="toc-page"
                >{formatPage(dict.hero.pageLabelTemplate, pageNumbers[section.id])}</span
              >
            </a>
          </li>
        {/each}
      </ol>

      <div class="lens-langs">
        <span class="langs-label">{dict.hero.languageSwitchLabel}</span>
        <span class="langs-current" aria-current="true">{lang.toUpperCase()}</span>
        <span class="langs-sep" aria-hidden="true">·</span>
        <a
          class="langs-link"
          href={altPath}
          hreflang={altLang}
          onclick={(event) => {
            switchLanguagePreservingScroll(event, altPath);
            menuOpen = false;
          }}>{altLang.toUpperCase()}</a
        >
      </div>
    </div>
  {/if}
</div>

<style>
  .lens-pill {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    z-index: 50;

    display: inline-flex;
    align-items: baseline;
    gap: 0.32rem;
    margin: 0;
    padding: 0.42rem 0.7rem 0.46rem;

    border: 1px solid var(--border);
    background: var(--bg);
    color: var(--fg);
    font-family: var(--font-sans);
    font-size: 0.74rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    line-height: 1;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      background-color 0.12s,
      border-color 0.12s,
      color 0.12s;
  }

  .lens-pill:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .lens-pill:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .lens-section {
    font-family: var(--font-display);
    font-size: 0.95rem;
    font-style: italic;
    font-weight: 400;
    letter-spacing: 0;
    text-transform: none;
  }

  .lens-sep {
    color: var(--fg-faint);
  }

  .lens-page,
  .lens-lang {
    font-variant-numeric: tabular-nums;
  }

  .lens-lang {
    color: var(--accent);
  }

  /* ── Menu ──────────────────────────────────────────────────── */

  .lens-menu {
    position: fixed;
    right: 1rem;
    bottom: calc(1rem + 2.4rem + 0.45rem);
    z-index: 50;

    width: min(22rem, calc(100vw - 2rem));
    max-height: min(70vh, 32rem);
    overflow-y: auto;

    border: 1px solid var(--fg);
    background: var(--bg);
    color: var(--fg);
  }

  .lens-toc {
    margin: 0;
    padding: 0.4rem 0 0.45rem;
    list-style: none;
  }

  .lens-toc a {
    display: grid;
    grid-template-columns: 2.4rem minmax(0, 1fr) max-content;
    align-items: baseline;
    gap: 0.4rem 0.55rem;
    padding: 0.5rem 0.95rem;
    color: var(--fg);
    font-family: var(--font-sans);
    font-size: 0.86rem;
    line-height: 1.25;
    text-decoration: none;
    transition:
      background-color 0.1s,
      color 0.1s;
  }

  .lens-toc a:hover {
    background: rgba(122, 29, 29, 0.06);
    color: var(--accent);
  }

  .lens-toc a:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: -2px;
  }

  .toc-num {
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-style: italic;
    font-weight: 400;
    color: var(--fg-muted);
  }

  .toc-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .toc-page {
    color: var(--accent);
    font-size: 0.7rem;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  li.active a {
    background: rgba(122, 29, 29, 0.08);
  }

  li.active .toc-num {
    color: var(--accent);
  }

  li.active .toc-label {
    font-weight: 600;
  }

  /* ── Language switcher ─────────────────────────────────────── */

  .lens-langs {
    display: flex;
    align-items: baseline;
    gap: 0.55rem;
    padding: 0.65rem 0.95rem 0.7rem;
    border-top: 1px solid var(--hair);
    font-family: var(--font-sans);
    font-size: 0.74rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .langs-label {
    color: var(--fg-muted);
    font-size: 0.66rem;
    margin-right: auto;
  }

  .langs-current {
    color: var(--fg);
    font-weight: 600;
  }

  .langs-sep {
    color: var(--fg-faint);
  }

  .langs-link {
    color: var(--accent);
    font-weight: 600;
    text-decoration: none;
  }

  .langs-link:hover {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  .langs-link:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  /* ── Mobile: full-width sheet sliding up from bottom ───────── */

  @media (max-width: 560px) {
    .lens-pill {
      right: 0.7rem;
      bottom: 0.7rem;
      padding: 0.4rem 0.62rem 0.44rem;
      font-size: 0.7rem;
    }

    .lens-menu {
      right: 0.5rem;
      left: 0.5rem;
      width: auto;
      max-height: 70vh;
      bottom: calc(0.7rem + 2.3rem + 0.4rem);
    }
  }

  /* Hide on print — irrelevant on a paper artifact. */
  @media print {
    .lens-pill,
    .lens-menu {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .lens-pill,
    .lens-toc a {
      transition: none;
    }
  }
</style>
