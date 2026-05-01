import type { LayoutLoad } from './$types';
import type { Lang } from '$lib/i18n';
import { dict } from '$lib/i18n';

export const load: LayoutLoad = ({ params }) => {
  const lang = params.lang as Lang;
  return {
    lang,
    dict: dict(lang)
  };
};

export const prerender = true;
