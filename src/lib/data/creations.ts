import { z } from 'zod';

const localizedTextSchema = z.object({
  de: z.string(),
  en: z.string()
});

export const creationSchema = z.object({
  /** Stable URL slug — typically `<filename-stem>-<HHMM>`. */
  slug: z.string().regex(/^[a-z0-9-]+$/),
  /** Source filename in `creations/`. Spaces allowed (some files have them). */
  filename: z.string().regex(/\.html$/),
  /** The visitor's chosen title — left in its original language. */
  titleNative: z.string(),
  /** Time of day from filename, formatted as HH:MM. */
  builtAt: z.string().regex(/^\d{2}:\d{2}$/),
  /** Optional ≤90-char per-language caption shown below the card title. */
  caption: localizedTextSchema.optional(),
  /** Path under /creations/ — produced by the thumbnail capture script. */
  thumbnail: z.string().regex(/^\/creations\/[a-z0-9-]+\.webp$/),
  /** Optional caveat ("needs sound", "best on desktop", etc.). */
  caveat: localizedTextSchema.optional()
});

export const creationsSchema = z.array(creationSchema);

export type Creation = z.infer<typeof creationSchema>;

/**
 * Curated, featured creations. Hand-authored in `feat(content): curate
 * featured creations from station/`. Empty until curation completes.
 */
export const creations: Creation[] = [];

export function findCreation(slug: string): Creation | undefined {
  return creations.find((creation) => creation.slug === slug);
}
