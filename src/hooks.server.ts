import type { Handle } from '@sveltejs/kit';
import { DEFAULT_LANG, LANGS, type Lang } from '$lib/i18n/types';

function langFromPath(pathname: string): Lang {
  const segment = pathname.split('/')[1];
  return LANGS.includes(segment as Lang) ? (segment as Lang) : DEFAULT_LANG;
}

export const handle: Handle = ({ event, resolve }) => {
  const lang = langFromPath(event.url.pathname);

  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('%lang%', lang)
  });
};
