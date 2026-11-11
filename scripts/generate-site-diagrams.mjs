// Run with: node scripts/generate-site-diagrams.mjs
// Sharp is included by Astro. Keep these assets static: no browser diagram runtime.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const output = new URL('../src/resources/diagrams/', import.meta.url);
await mkdir(output, { recursive: true });

const themes = {
  light: { page: '#f6f7f5', surface: '#ffffff', ink: '#131a1e', muted: '#55666b', rail: '#dde2e0', accent: '#2f6e6a', soft: '#e7f0ee' },
  dark: { page: '#0c1214', surface: '#121a1d', ink: '#e8edec', muted: '#9aabac', rail: '#223034', accent: '#6fbdb2', soft: '#16302f' },
};
const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

for (const [theme, c] of Object.entries(themes)) {
  const text = (x, y, value, size = 24, fill = c.ink, weight = 400, anchor = 'middle') =>
    `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${fill}" font-size="${size}" font-weight="${weight}" font-family="DejaVu Sans, sans-serif">${escape(value)}</text>`;
  const card = (x, y, width, title, detail, highlighted = false) =>
    `<rect x="${x}" y="${y}" width="${width}" height="86" rx="12" fill="${highlighted ? c.soft : c.surface}" stroke="${highlighted ? c.accent : c.rail}" stroke-width="2"/>`
    + text(x + width / 2, y + 34, title, 25, c.ink, 600)
    + text(x + width / 2, y + 64, detail, 20, c.muted);
  const arrow = (path) => `<path d="${path}" fill="none" stroke="${c.accent}" stroke-width="2.5" marker-end="url(#arrow)"/>`;
  const render = async (name, label, height, body, { width = 720, prefix = 'saleh-hassen-site-' } = {}) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill="${c.accent}"/></marker></defs>
      <rect width="${width}" height="${height}" fill="${c.page}"/>
      ${text(32, 41, 'saleh-hassen-site', 20, c.accent, 600, 'start')}
      ${text(32, 82, label, 30, c.ink, 600, 'start')}
      ${body}
    </svg>`;
    const suffix = theme === 'dark' ? '-dark' : '';
    await sharp(Buffer.from(svg)).resize({ width: width * 2 }).png().toFile(fileURLToPath(new URL(`${prefix}${name}${suffix}.png`, output)));
  };

  await render('build', 'Build', 520,
    card(32, 114, 312, 'Markdown & MDX', 'src/content/')
    + card(376, 114, 312, 'Pages & components', 'Astro layouts and UI')
    + arrow('M188 200 V232 H360 V267')
    + arrow('M532 200 V232 H360 V267')
    + card(120, 272, 480, 'Astro static build', 'npm run build · Tailwind + Lucide', true)
    + arrow('M360 358 V401')
    + card(120, 406, 480, 'dist/', 'HTML + hashed /_astro/ assets'));

  await render('github-actions', 'GitHub Actions', 590,
    card(32, 114, 656, 'Workflow triggers', 'Push to main · PR · merge queue · manual')
    + arrow('M80 200 V276 H123')
    + arrow('M80 276 V398 H123')
    + arrow('M80 398 V520 H123')
    + card(128, 233, 560, 'Check, build & smoke test', 'npm ci → check → build → preview URLs', true)
    + card(128, 355, 560, 'Scan Git history for secrets', 'Gitleaks')
    + card(128, 477, 560, 'Review dependency changes', 'PRs only · reject high-severity issues'));

  await render('railway', 'Railway', 610,
    card(32, 114, 656, 'GitHub main branch', 'Deployment source')
    + arrow('M360 200 V235')
    + card(32, 240, 656, 'Railpack · Node builder', 'npm run build → dist/', true)
    + arrow('M360 326 V361')
    + card(32, 366, 656, 'Caddy serves dist/', 'Custom Caddyfile · cache headers · gzip/zstd')
    + arrow('M360 452 V487')
    + card(32, 492, 656, 'Railway edge · HTTPS', 'Visitor ↔ edge proxy ↔ Caddy on $PORT'));

  const participant = (x, label, detail) =>
    `<path d="M${x} 174 V758" stroke="${c.rail}" stroke-width="2" stroke-dasharray="5 5"/>`
    + `<rect x="${x - 82}" y="112" width="164" height="62" rx="10" fill="${c.surface}" stroke="${c.rail}" stroke-width="2"/>`
    + text(x, 138, label, 20, c.ink, 600)
    + text(x, 160, detail, 16, c.muted);
  const message = (from, to, y, label, response = false) =>
    `<path d="M${from} ${y} H${to}" fill="none" stroke="${c.accent}" stroke-width="2" ${response ? 'stroke-dasharray="5 4"' : ''} marker-end="url(#arrow)"/>`
    + text((from + to) / 2, y - 11, label, 18, c.ink);
  const note = (y, lines) =>
    `<rect x="20" y="${y}" width="960" height="${lines.length * 25 + 14}" rx="8" fill="${c.soft}"/>`
    + lines.map((line, index) => text(500, y + 25 + index * 25, line, 18, c.ink)).join('');

  await render('request-flow', 'How a visit reaches the site', 855,
    participant(105, 'Visitor', 'Browser')
    + participant(300, 'DNS', 'salehh.dev')
    + participant(495, 'Railway edge', 'TLS / HTTPS')
    + participant(690, 'Caddy', 'Container')
    + participant(905, 'dist/', 'Static files')
    + message(105, 300, 214, 'Look up salehh.dev')
    + message(300, 105, 254, 'Railway edge address', true)
    + message(105, 495, 294, 'HTTPS GET /blog/')
    + message(495, 690, 334, 'HTTP to $PORT')
    + message(690, 905, 374, 'Resolve file path')
    + `<rect x="455" y="389" width="520" height="173" rx="8" fill="none" stroke="${c.rail}" stroke-width="2"/>`
    + text(465, 409, 'Page found', 16, c.muted, 600, 'start')
    + message(905, 690, 431, 'index.html', true)
    + message(690, 495, 465, '200 · no-cache · gzip/zstd', true)
    + `<path d="M455 477 H975" stroke="${c.rail}" stroke-dasharray="5 5"/>`
    + text(465, 498, 'Not found', 16, c.muted, 600, 'start')
    + message(690, 905, 521, 'Read /404.html')
    + message(690, 495, 555, '404 + 404.html', true)
    + message(495, 105, 595, 'Response', true)
    + note(612, ['Browser parses HTML and requests assets'])
    + message(105, 495, 681, 'GET /_astro/* CSS, JS, images')
    + message(495, 690, 721, 'Forward')
    + message(690, 105, 761, '200 · max-age=31536000, immutable', true)
    + note(780, ['Repeat visit: pages revalidate (304 if unchanged).', 'Hashed assets come from the browser cache.']),
    { width: 1000, prefix: '' });
}
