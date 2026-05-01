import type { Dict, Lang } from './types';
import { de } from './de';
import { en } from './en';

export { DEFAULT_LANG, LANGS } from './types';
export type { Dict, Lang };

const dicts: Record<Lang, Dict> = { de, en };

export function dict(lang: Lang): Dict {
  return dicts[lang];
}
