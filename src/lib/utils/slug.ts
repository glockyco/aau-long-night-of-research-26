/**
 * Parse a `creations/*.html` filename of the form `YYYYMMDD-HHMM-<name>.html`.
 *
 * - `slug` becomes `<name>-HHMM` (kebab-case, time disambiguates same-name files).
 * - `builtAt` becomes `HH:MM`.
 * - `titleNative` becomes the name in Title Case, treating `-` and spaces as
 *   word boundaries. The visitor's chosen name is preserved except for filename
 *   separator cleanup and capitalization.
 */
const FILENAME_RE = /^(\d{8})-(\d{2})(\d{2})-(.+)\.html$/;

export interface ParsedCreation {
  slug: string;
  builtAt: string;
  titleNative: string;
  filename: string;
}

export function parseCreationFilename(filename: string): ParsedCreation {
  const match = FILENAME_RE.exec(filename);
  if (!match) {
    throw new Error(`Filename does not match YYYYMMDD-HHMM-<name>.html: ${filename}`);
  }

  const [, , hh, mm, rawName] = match;
  const name = rawName.trim();
  const slug = `${name.replace(/\s+/g, '-')}-${hh}${mm}`;
  const titleNative = name
    .replace(/-/g, ' ')
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    slug,
    builtAt: `${hh}:${mm}`,
    titleNative,
    filename
  };
}
