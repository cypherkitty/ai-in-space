import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { materializedPages } from '../src/lib/materialized-pages';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(projectRoot, 'dist');
const sourceHtml = await readFile(join(distDir, 'index.html'), 'utf8');
const assetFiles = await readdir(join(distDir, 'assets'));

const staticLandingPages = [
  {
    path: '/landing/orbital-zero/',
    canonicalUrl: 'https://ai-in.space/landing/orbital-zero/',
    template: join(projectRoot, 'static-pages/orbital-zero/index.html'),
    video: join(projectRoot, 'static-pages/orbital-zero/ai-discovery.mp4')
  }
] as const;

function replaceOnce(html: string, pattern: RegExp, replacement: string, label: string): string {
  if (!pattern.test(html)) throw new Error(`Could not find ${label} in built index.html`);
  return html.replace(pattern, replacement);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

for (const page of materializedPages) {
  const outputPath = join(distDir, page.path, 'index.html');
  const sceneAsset = assetFiles.find((name) => name.startsWith(`${page.scene}-`) && !name.includes('-preview-') && name.endsWith('.jpg'));
  if (!sceneAsset) throw new Error(`Could not find the built ${page.scene} scene asset`);

  const title = escapeHtml(page.metaTitle);
  const description = escapeHtml(page.metaDescription);
  const imageUrl = `https://ai-in.space/assets/${sceneAsset}`;
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.metaTitle,
    description: page.metaDescription,
    url: page.canonicalUrl,
    image: imageUrl,
    isPartOf: { '@type': 'WebSite', name: 'AI in Space', url: 'https://ai-in.space/' }
  }).replaceAll('<', '\\u003c');

  let html = sourceHtml;
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, 'title');
  html = replaceOnce(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`, 'description');
  html = replaceOnce(html, /<meta name="theme-color" content="[^"]*" \/>/, `<meta name="theme-color" content="${page.design.bg}" />`, 'theme color');
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${page.canonicalUrl}" />`, 'canonical URL');
  html = replaceOnce(html, /<\/head>/, `    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="AI in Space" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${page.canonicalUrl}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <script type="application/ld+json">${structuredData}</script>
  </head>`, 'closing head tag');
  html = replaceOnce(html, /<div id="app"><\/div>/, `<div id="app"></div>
    <noscript><main><h1>${escapeHtml(page.design.title)} ${escapeHtml(page.design.titleLine2)}</h1><p>${escapeHtml(page.design.summary)}</p></main></noscript>`, 'application root');

  // Vite's root entry uses ./assets. This page is two path segments deeper.
  html = html.replaceAll('./assets/', '../../assets/');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

function findAsset(prefix: string, suffix: string, exclude = ''): string {
  const asset = assetFiles.find((name) => name.startsWith(prefix) && name.endsWith(suffix) && (!exclude || !name.includes(exclude)));
  if (!asset) throw new Error(`Could not find built asset matching ${prefix}*${suffix}`);
  return asset;
}

for (const page of staticLandingPages) {
  const outputPath = join(distDir, page.path, 'index.html');
  const orbitalEarth = findAsset('orbital-earth-', '.jpg', '-preview-');
  const replacements = new Map([
    ['{{ORBITAL_EARTH_ASSET}}', `../../assets/${orbitalEarth}`],
    ['{{ORBITAL_EARTH_SOCIAL_URL}}', `https://ai-in.space/assets/${orbitalEarth}`],
    ['{{AI_DISCOVERY_VIDEO}}', './ai-discovery.mp4'],
    ['{{SPACE_GROTESK_FONT}}', `../../assets/${findAsset('space-grotesk-latin-wght-normal-', '.woff2')}`],
    ['{{IBM_PLEX_MONO_FONT}}', `../../assets/${findAsset('ibm-plex-mono-latin-400-normal-', '.woff2')}`],
    ['{{MANROPE_FONT}}', `../../assets/${findAsset('manrope-latin-wght-normal-', '.woff2')}`]
  ]);
  let html = await readFile(page.template, 'utf8');
  for (const [token, value] of replacements) html = html.replaceAll(token, value);
  if (/\{\{[A-Z0-9_]+\}\}/.test(html)) throw new Error(`Unresolved template token in ${page.template}`);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
  await copyFile(page.video, join(dirname(outputPath), 'ai-discovery.mp4'));
}

const sitemapUrls = [
  'https://ai-in.space/',
  ...materializedPages.map((page) => page.canonicalUrl),
  ...staticLandingPages.map((page) => page.canonicalUrl)
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n')}
</urlset>
`;
await writeFile(join(distDir, 'sitemap.xml'), sitemap);

console.log(`Materialized ${materializedPages.length} app page, ${staticLandingPages.length} static landing page, and ${sitemapUrls.length} sitemap URLs.`);
