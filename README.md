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

The Astro site post's build, GitHub Actions, and Railway diagrams have light and
dark PNG variants in `src/resources/diagrams/`, prefixed `saleh-hassen-site-`.
Edit and regenerate them and the request-flow diagram with
`node scripts/generate-site-diagrams.mjs`.

Blog and work entries can use a theme-aware preview and hero image. Keep `img`
as the light/default image and optionally add `img_dark`. Use `img_fit: contain`
for diagrams so they remain fully visible; the default is `cover` for photos.
Both views use `ThemedImage` and follow the site's theme picker.

```yaml
img: ../../resources/diagrams/saleh-hassen-site-build.png
img_dark: ../../resources/diagrams/saleh-hassen-site-build-dark.png
img_fit: contain
img_alt: Build diagram for saleh-hassen-site.
```

## Ask me about templates

The two consolidated entries use the same preview component and full-page layout
as every other blog post and project:

- `src/content/blog/ask-me-about.md` → `/blog/ask-me-about/`
- `src/content/work/ask-me-about.md` → `/work/ask-me-about/`

Replace the bracketed prompts in each file, including the preview `description`.
Topic headings carry over from the former placeholders; HTML comments preserve
those previews as reference. Duplicate or remove topic sections as needed. Adjust
the date, tags, and image in frontmatter before publishing. The Astro site entry
stays separate at `/blog/this-astro-site/`.

# Credits & Attribution

Thanks to [Astro](https://astro.build/) and the [Portfolio starter kit on Github](https://github.com/withastro/astro/tree/latest/examples/portfolio?on=github) for the starters, documentation, and the Astro framework.

Thanks to [astro-tips.dev](https://astro-tips.dev/recipes/dark-mode/#styles) on guidance creating a responsive theme manager in Astro.

Thanks to [svgrepo.com](https://svgrepo.com) for some of the SVG icons.
