import { goto } from '$app/navigation';
import { resolve } from '$app/paths';

const STORAGE_KEY = 'lnf:language-scroll';
const MAX_AGE_MS = 10_000;

interface ScrollSnapshot {
  targetPath: string;
  ratio: number;
  atBottom: boolean;
  createdAt: number;
}

function scrollLimit() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function clampRatio(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

/**
 * Store a one-shot approximate scroll position before swapping languages.
 * The target page may be taller or shorter, so ratio beats raw pixels.
 */
export function preserveLanguageScroll(targetPath: string) {
  if (typeof window === 'undefined') return;

  const limit = scrollLimit();
  const snapshot: ScrollSnapshot = {
    targetPath,
    ratio: limit > 0 ? clampRatio(window.scrollY / limit) : 0,
    atBottom: window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2,
    createdAt: Date.now()
  };

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

/**
 * Restore the one-shot language-switch scroll position after navigation.
 * A couple of delayed passes cover font/image/layout settling without
 * fighting normal navigation when no language switch happened.
 */
export function restoreLanguageScroll(
  currentPath = typeof window === 'undefined' ? '' : window.location.pathname
) {
  if (typeof window === 'undefined') return () => {};

  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return () => {};
  window.sessionStorage.removeItem(STORAGE_KEY);

  let snapshot: ScrollSnapshot;
  try {
    snapshot = JSON.parse(raw) as ScrollSnapshot;
  } catch {
    return () => {};
  }

  if (snapshot.targetPath !== currentPath) return () => {};
  if (Date.now() - snapshot.createdAt > MAX_AGE_MS) return () => {};

  function apply() {
    const limit = scrollLimit();
    const top = snapshot.atBottom ? limit : Math.round(limit * clampRatio(snapshot.ratio));
    window.scrollTo({ top, left: 0, behavior: 'instant' });
  }

  let frame = 0;
  frame = window.requestAnimationFrame(() => {
    frame = window.requestAnimationFrame(apply);
  });
  const settlingTimers = [window.setTimeout(apply, 250), window.setTimeout(apply, 800)];

  return () => {
    window.cancelAnimationFrame(frame);
    for (const timer of settlingTimers) window.clearTimeout(timer);
  };
}

/**
 * Client-side language switches should not briefly jump to the top.
 * Intercept the normal anchor navigation, keep SvelteKit's current
 * scroll position through the route update, then let the ratio restore
 * nudge the reader into the equivalent spot after layout settles.
 */
export function switchLanguagePreservingScroll(event: MouseEvent, targetPath: string) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  event.preventDefault();
  preserveLanguageScroll(targetPath);
  void goto(resolve(targetPath as `/${string}`), { noScroll: true, keepFocus: true });
}
