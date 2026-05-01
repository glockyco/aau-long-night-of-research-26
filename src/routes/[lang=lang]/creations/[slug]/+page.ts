import { error } from '@sveltejs/kit';
import { creations, findCreation } from '$lib/data/creations';
import { LANGS } from '$lib/i18n';
import type { EntryGenerator, PageLoad } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () => {
  const out: { lang: 'de' | 'en'; slug: string }[] = [];

  for (const lang of LANGS) {
    for (const creation of creations) {
      out.push({ lang, slug: creation.slug });
    }
  }

  return out;
};

export const load: PageLoad = ({ params }) => {
  const creation = findCreation(params.slug);
  if (!creation) {
    error(404, `Creation not found: ${params.slug}`);
  }
  return { creation };
};
