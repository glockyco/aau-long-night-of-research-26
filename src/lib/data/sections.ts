import type { Dict } from '$lib/i18n';

/**
 * Canonical section order on the landing page. The strings double as
 * the DOM `id` on each `<section>` and (with a leading `#`) as the
 * anchor used by the in-hero contents block and the floating rail.
 *
 * Keeping this in one place ensures the contents block, the section
 * rail, and the actual anchored sections never drift apart.
 */
export const SECTION_IDS = ['station', 'creations', 'tasks', 'how', 'crossword', 'team'] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export const SECTION_ANCHORS = SECTION_IDS.map((id) => `#${id}`);

export interface SectionEntry {
  id: SectionId;
  /** 1-based section number, matches `§ N` markers in SectionKicker. */
  number: number;
  /** Localized section label, e.g. "Was entstanden ist" / "What got built". */
  label: string;
}

/**
 * Combine the canonical id list with localized labels. Page numbers
 * are computed at runtime from viewport position — see
 * `$lib/state/page-numbers.svelte.ts` — and joined at the render site.
 * The `dict.hero.contents` array is positionally aligned with `SECTION_IDS`.
 */
export function buildSections(dict: Dict): SectionEntry[] {
  return SECTION_IDS.map((id, i) => ({
    id,
    number: i + 1,
    label: dict.hero.contents[i]?.label ?? ''
  }));
}
