import { creations } from '$lib/data/creations';
import { LANGS } from '$lib/i18n';
import { SITE_URL } from '$lib/seo/site';

export const prerender = true;

export function GET() {
  const urls: string[] = [];

  for (const lang of LANGS) {
    urls.push(`${SITE_URL}/${lang}`);
    for (const creation of creations) {
      urls.push(`${SITE_URL}/${lang}/creations/${creation.slug}`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
