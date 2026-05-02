import { error } from '@sveltejs/kit';
import { creations } from '$lib/data/creations';
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
  const creationIndex = creations.findIndex((creation) => creation.slug === params.slug);
  if (creationIndex === -1) {
    error(404, `Creation not found: ${params.slug}`);
  }

  return {
    creation: creations[creationIndex],
    creationIndex,
    totalCreations: creations.length,
    previousCreation: creations[creationIndex - 1] ?? null,
    nextCreation: creations[creationIndex + 1] ?? null
  };
};
