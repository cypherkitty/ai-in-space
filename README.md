# AI in Space

A Svelte + TypeScript concept site with sixteen art-direction families, fifty reproducible procedural editions, a gallery, random-on-visit selection, and a constrained generative widget mixer.

## Local development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run check
npm run build
```

## Routes

- `/` — a fresh coherent procedural design on every load
- `#/gallery` — sixteen curated and fifty generated editions
- `#/v/orbital-zero` — a stable link to one design
- `#/g/12345` — a stable seed for a generated combination
- `#/g/12345/67890` — the same visual seed with a separate copy seed
- `#/c/orbital-zero/67890` — curated design with remixed copy
- `#/mix` — backwards-compatible unseeded generation route

Hash routes keep every view compatible with GitHub Pages without server-side rewrites.

## GitHub Pages deployment

The workflow in `.github/workflows/deploy-pages.yml` checks and builds every push to `main`, then deploys `dist` through GitHub Pages.

1. Push this repository to GitHub.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. Push to `main` or run **Deploy to GitHub Pages** manually from the Actions tab.

The Vite base is relative, so the build works both at `username.github.io/repository/` and on a custom domain.

## Custom domain

The production site uses `ai-in.space`. GitHub Pages is configured through the Actions workflow, and `public/CNAME` preserves the apex domain in every build. Namecheap DNS points the apex to GitHub Pages and `www` to `cypherkitty.github.io`; GitHub redirects `www.ai-in.space` to the apex domain.

## Design system

Content and style tokens live in `src/lib/designs.ts`. `Landing.svelte` composes the same semantic pieces—brand, copy, scene, orbital or neural-core visualization, telemetry widgets, and research story—into sixteen layouts. The procedural engine is conditional: every generated edition inherits a family before it selects only compatible visuals, copy lengths, widget groups, textures, and title treatments. Brand, navigation, type hierarchy, spacing, and motion remain shared across every result.

Visual and copy seeds are independent. The **New message** control selects one of 24 complete editorial hero packs and one of 32 supporting section slogans while preserving the current layout, palette, scene, widgets, texture, and visualization. Seeded URLs make both layers reproducible.

`NeuralCore.svelte` is a container-aware canvas component. It responds to pointer movement, inherits each design's palette, pauses offscreen, and renders a static frame when reduced motion is requested.

The generator now draws from eight cinematic scene assets. Generated artwork used by the project is in `src/lib/assets/`.
