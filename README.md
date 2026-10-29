# Saleh's Astro site.

Hi, welcome to my Astro site repo. The site is a static site that I host on Railway. This is based off the Astro Starter kit for a Portfolio.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run check`           | Checks Astro files, content, and TypeScript      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Hosting

Railway builds the site with Railpack and serves `dist/` with Caddy. The `Caddyfile` in the repo root replaces Railpack's default one so we control caching:

- `/_astro/*` files have a content hash in their name, so they're cached for a year (`immutable`).
- Pages and other files are sent with `no-cache`: browsers keep a copy but check for a newer one on each visit, so a deploy never leaves anyone on an old page that points at deleted CSS.
- There's no fallback to `index.html`; missing pages and files return a real 404.

# Credits & Attribution

Thanks to [Astro](https://astro.build/) and the [Portfolio starter kit on Github](https://github.com/withastro/astro/tree/latest/examples/portfolio?on=github) for the starters, documentation, and the Astro framework.

Thanks to [astro-tips.dev](https://astro-tips.dev/recipes/dark-mode/#styles) on guidance creating a responsive theme manager in Astro.

Thanks to [svgrepo.com](https://svgrepo.com) for some of the SVG icons.
