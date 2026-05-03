import { SECTION_IDS, type SectionId } from '$lib/data/sections';

/**
 * Reactive map from section id → 1-based "page" number.
 *
 * The number reflects how many viewport-heights down the document the
 * section's top edge sits. A section starting at scroll offset `0` is
 * page 1; one starting near the top of the second viewport is page 2;
 * and so on. The computation runs on the client in `attachPageNumberTracker`
 * and re-runs whenever any tracked section or the document body resizes
 * (so toggling filters in the creations grid, switching orientation, or
 * loading late images all keep the values honest).
 *
 * The initial values mirror the hand-authored layout the page used to
 * ship with — so SSR and the first paint show plausible numbers and
 * the client recomputation is, at worst, a small correction rather
 * than a flash of `1`s everywhere.
 */
const INITIAL: Record<SectionId, number> = {
  station: 1,
  creations: 2,
  tasks: 5,
  how: 6,
  crossword: 8,
  team: 9
};

export const pageNumbers = $state<Record<SectionId, number>>({ ...INITIAL });

/**
 * Reactive 1-based page number for the user's *current* scroll position
 * — i.e. how many viewport-heights down the document the top of the
 * viewport currently sits. The lens pill reads this so the page label
 * updates as the reader scrolls within a long section, rather than
 * snapping only when a new section becomes active.
 */
export const scroll = $state({ page: 1 });

/** Replace the `{n}` placeholder in the locale's page-label template. */
export function formatPage(template: string, n: number): string {
  return template.replace('{n}', String(n));
}

/**
 * Wire up viewport-relative page-number tracking. Call from a Svelte
 * `$effect` and use the returned teardown for cleanup. Safe to call on
 * the server — it no-ops when `window` is unavailable.
 */
export function attachPageNumberTracker(): () => void {
  if (typeof window === 'undefined') return () => {};

  function recompute() {
    const vh = window.innerHeight;
    if (vh <= 0) return;
    const scrollY = window.scrollY;
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top + scrollY;
      pageNumbers[id] = Math.max(1, Math.floor(top / vh) + 1);
    }
    scroll.page = Math.max(1, Math.floor(scrollY / vh) + 1);
  }

  function onScroll() {
    const vh = window.innerHeight;
    if (vh <= 0) return;
    scroll.page = Math.max(1, Math.floor(window.scrollY / vh) + 1);
  }

  recompute();

  const observer = new ResizeObserver(recompute);
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  }
  // Body height changes whenever any section reflows or filters toggle —
  // observing it catches moves that don't change a section's own size.
  observer.observe(document.body);

  window.addEventListener('resize', recompute);
  window.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    observer.disconnect();
    window.removeEventListener('resize', recompute);
    window.removeEventListener('scroll', onScroll);
  };
}
