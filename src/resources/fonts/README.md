# Local web fonts

These Latin-subset WOFF2 assets are vendored from Fontsource 5.3.0:

- `archivo-latin-wght-normal.woff2`: [@fontsource-variable/archivo](https://www.npmjs.com/package/@fontsource-variable/archivo/v/5.3.0), variable Archivo used at weights 400–700.
- `ibm-plex-mono-latin-400-normal.woff2` and `ibm-plex-mono-latin-500-normal.woff2`: [@fontsource/ibm-plex-mono](https://www.npmjs.com/package/@fontsource/ibm-plex-mono/v/5.3.0).

Original copyright notices and SIL Open Font License texts are served at
`/fonts/OFL-Archivo.txt` and `/fonts/OFL-IBM-Plex-Mono.txt` from `public/fonts/`.
Keep those files with the fonts when updating or redistributing these assets.

`src/styles/global.css` defines the faces. Vite fingerprints the assets into
`/_astro/`, where the existing Caddy policy caches them immutably. MainHead
preloads Archivo; the mono faces load when used. No font service is contacted
at build time or by visitors. Other scripts use the existing fallback fonts.
