# The U27 Gazette

The U27 Gazette lets you browse and play a selection of webpages built with AI at the University of Klagenfurt's Long Night of Research station. The bilingual site also publishes the task cards and explains how the station worked.

[Open the Gazette](https://lnf26.glockyco.com/en).

This is the public showcase, not the station workspace. The separate private repository `aau-long-night-of-research` holds station materials and the larger collection of visitor creations.

## Run locally

You need Node.js with support for the TypeScript execution flags in [package.json](package.json), and the pnpm version declared there.

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm dev
```

Build once before opening a creation locally. The build copies the selected HTML files into the static assets, while the development server does not.

To preview the production site:

```sh
pnpm build
pnpm preview
```

## Change the site

- Edit German and English copy in [src/lib/i18n](src/lib/i18n).
- Edit creation metadata in [src/lib/data/creations.ts](src/lib/data/creations.ts) and the corresponding HTML in [creations](creations).
- Edit task content in [src/lib/data/tasks.ts](src/lib/data/tasks.ts). Printable task sheets and their screenshots live in [static/tasks](static/tasks).
- Edit the displayed station instructions in [src/lib/content/system-prompt.md](src/lib/content/system-prompt.md).

`pnpm build` generates icons and social cards, then replaces `static/raw/` with copies of the selected creations. Do not edit that generated directory. [scripts/vendor-creations.ts](scripts/vendor-creations.ts) defines the copy step.

To refresh a creation thumbnail, pass its slug from the metadata:

```sh
pnpm exec playwright install chromium
pnpm capture wuerfelspiel-1323
```

The capture script runs the source HTML in a visible browser. Put the page in the state you want to show, then press Enter in the terminal. It writes images to [static/creations](static/creations). Review the HTML before running it. The published site embeds creations in sandboxed frames that allow scripts and pointer lock.

## Checks and publishing

```sh
pnpm check
pnpm lint
```

To format only a changed file, use `pnpm exec prettier --write <file>`. The `format` script formats the whole repository.

With access to the Cloudflare account, build and publish the local checkout:

```sh
pnpm run deploy
```

[wrangler.toml](wrangler.toml) defines the public deployment target.

## License

[MIT](LICENSE).
