---
title: This site
publishDate: 2026-05-30 00:00:00
img: ../../resources/stock-2.jpg
img_alt: Soft pink and baby blue water ripples together in a subtle texture.
description: |
  How I made this portfolio site with Astro
tags:
  - Full-Stack
  - Infra
  
---

This website is based off the Astro portfolio example of [Jeanine White](https://astro-portfolio.birki.io/).

Changes I made:
- I applied my own color theme 
- Modified default theme behavior to match system theme (but respect user override of toggled theme)
- Added tags to work/blog preview
- Adjust Call to Actions to contact info I was comfortable providing publicly.

## Tech stack

<a href="/diagrams/tech-stack.png">
  <picture>
    <source srcset="/diagrams/tech-stack-dark.png" media="(prefers-color-scheme: dark)" />
    <img src="/diagrams/tech-stack.png" alt="Tech stack: Markdown content, Astro components, Tailwind CSS and Lucide icons build with Astro into dist/. Code goes to GitHub, where Actions checks, builds and smoke-tests it, and Railway builds it with Railpack and serves it with Caddy." loading="lazy" />
  </picture>
</a>

## How a visit reaches the site

<a href="/diagrams/request-flow.png">
  <picture>
    <source srcset="/diagrams/request-flow-dark.png" media="(prefers-color-scheme: dark)" />
    <img src="/diagrams/request-flow.png" alt="Request flow: the browser looks up salehh.dev, connects over HTTPS to Railway's edge proxy, which forwards to Caddy. Caddy serves pages with no-cache, hashed /_astro/ assets with a one-year immutable cache, and a real 404 for missing pages. Fonts load from Google Fonts." loading="lazy" />
  </picture>
</a>

## Stay Tuned
