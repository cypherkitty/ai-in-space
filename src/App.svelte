<script lang="ts">
  import { onMount } from 'svelte';
  import Gallery from './lib/Gallery.svelte';
  import Landing from './lib/Landing.svelte';
  import { designAnalyticsContext, initAnalytics, trackPageView } from './lib/analytics';
  import { crazyMix, designs, generateDesign, randomSeed, remixCopy, type Design } from './lib/designs';
  import { localizeDesign, t, type Locale } from './lib/i18n';

  type View = 'landing' | 'gallery';
  let view: View = 'landing';
  let active: Design = designs[0]!;
  let isMix = false;
  let analyticsReady = false;
  let lastTrackedLocation = '';
  let remixCursor = randomSeed();
  let locale: Locale = 'en';
  $: localizedActive = localizeDesign(active, locale);
  $: localizedDesigns = designs.map((design) => localizeDesign(design, locale));

  const REMIX_STEP = 0x9e3779b9;

  $: if (analyticsReady && typeof window !== 'undefined' && window.location.href !== lastTrackedLocation) {
    lastTrackedLocation = window.location.href;
    queueMicrotask(() => trackPageView(view === 'gallery'
      ? { page_type: 'design_gallery' }
      : { page_type: 'landing_design', ...designAnalyticsContext(active) }
    ));
  }

  function syncRoute() {
    requestAnimationFrame(() => window.scrollTo({ top: 0 }));
    const hash = window.location.hash;
    if (hash === '#/gallery') {
      view = 'gallery';
      isMix = false;
      return;
    }
    if (hash.startsWith('#/v/')) {
      const id = hash.slice(4);
      active = designs.find((design) => design.id === id) ?? generateDesign(randomSeed());
      view = 'landing';
      isMix = active.generated ?? false;
      return;
    }
    if (hash.startsWith('#/c/')) {
      const [id, copyValue] = hash.slice(4).split('/');
      const base = designs.find((design) => design.id === id) ?? designs[0]!;
      const copySeed = Number.parseInt(copyValue ?? '', 10);
      active = remixCopy(base, Number.isFinite(copySeed) ? copySeed : randomSeed());
      view = 'landing';
      isMix = active.generated ?? false;
      return;
    }
    if (hash.startsWith('#/g/')) {
      const [seedValue, copyValue] = hash.slice(4).split('/');
      const seed = Number.parseInt(seedValue ?? '', 10);
      const copySeed = Number.parseInt(copyValue ?? '', 10);
      const validSeed = Number.isFinite(seed) ? seed : randomSeed();
      active = generateDesign(validSeed, undefined, Number.isFinite(copySeed) ? copySeed : validSeed);
      view = 'landing';
      isMix = true;
      return;
    }
    if (hash === '#/mix') {
      active = crazyMix();
      view = 'landing';
      isMix = true;
      return;
    }
    active = generateDesign(randomSeed());
    view = 'landing';
    isMix = true;
  }

  onMount(() => {
    const savedLocale = window.localStorage.getItem('ai-in-space-locale');
    const linkedLocale = new URL(window.location.href).searchParams.get('lang');
    locale = linkedLocale === 'ru' ? 'ru' : linkedLocale === 'en' ? 'en' : savedLocale === 'ru' ? 'ru' : 'en';
    document.documentElement.lang = locale;
    initAnalytics();
    syncRoute();
    analyticsReady = true;
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  });

  function setLocale(next: Locale) {
    locale = next;
    window.localStorage.setItem('ai-in-space-locale', next);
    document.documentElement.lang = next;
  }

  function open(design: Design) {
    window.location.hash = `/v/${design.id}`;
    window.scrollTo({ top: 0 });
  }

  function gallery() {
    window.location.hash = '/gallery';
    window.scrollTo({ top: 0 });
  }

  function nextRemixSeed() {
    const currentSeed = Number.isFinite(active.seed) ? active.seed! : remixCursor;
    remixCursor = (currentSeed + REMIX_STEP) >>> 0;
    if (remixCursor === 0) remixCursor = REMIX_STEP;
    return remixCursor;
  }

  function launchRemix() {
    const seed = nextRemixSeed();
    const previousSlogan = `${active.title} ${active.titleLine2}`;
    let copySeed = seed;
    let candidate = generateDesign(seed, undefined, copySeed);
    for (let attempt = 0; attempt < 8 && `${candidate.title} ${candidate.titleLine2}` === previousSlogan; attempt += 1) {
      copySeed = (copySeed + REMIX_STEP) >>> 0 || REMIX_STEP;
      candidate = generateDesign(seed, undefined, copySeed);
    }
    active = candidate;
    view = 'landing';
    isMix = true;
    window.history.pushState({}, '', `${window.location.pathname}${window.location.search}#/g/${seed}/${copySeed}`);
    window.scrollTo({ top: 0 });
  }

  const shuffle = launchRemix;
  const mix = launchRemix;

  function changeCopy() {
    const previousSlogan = `${active.title} ${active.titleLine2}`;
    const base = designs.find((design) => design.id === active.id) ?? active;
    let copySeed = randomSeed();
    let candidate = active.generated && active.seed
      ? generateDesign(active.seed, undefined, copySeed)
      : remixCopy(base, copySeed);
    for (let attempt = 0; attempt < 8 && `${candidate.title} ${candidate.titleLine2}` === previousSlogan; attempt += 1) {
      copySeed = randomSeed();
      candidate = active.generated && active.seed
        ? generateDesign(active.seed, undefined, copySeed)
        : remixCopy(base, copySeed);
    }
    window.location.hash = active.generated && active.seed
      ? `/g/${active.seed}/${copySeed}`
      : `/c/${active.id}/${copySeed}`;
    window.scrollTo({ top: 0 });
  }

  function randomRoot() {
    launchRemix();
  }

  function canonicalShareUrl(): string {
    const url = new URL(window.location.href);
    url.search = '';
    if (locale === 'ru') url.searchParams.set('lang', 'ru');
    if (active.generated && active.seed !== undefined) {
      url.hash = `/g/${active.seed}/${active.copySeed ?? active.seed}`;
    } else if (active.copySeed !== undefined) {
      url.hash = `/c/${active.id}/${active.copySeed}`;
    } else {
      url.hash = `/v/${active.id}`;
    }
    return url.toString();
  }

  async function shareCurrent(): Promise<boolean> {
    const shareUrl = canonicalShareUrl();
    window.history.replaceState({}, '', shareUrl);
    try {
      await navigator.clipboard.writeText(shareUrl);
      return true;
    } catch {
      const input = document.createElement('textarea');
      input.value = shareUrl;
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.append(input);
      input.select();
      const copied = document.execCommand('copy');
      input.remove();
      return copied;
    }
  }
</script>

<svelte:head>
  <title>{view === 'gallery' ? t(locale, 'atlas') : `${localizedActive.name} — AI in Space`}</title>
  <meta name="theme-color" content={active.bg} />
</svelte:head>

{#if view === 'gallery'}
  <Gallery designs={localizedDesigns} {locale} onLocaleChange={setLocale} onOpen={open} onRandom={randomRoot} onMix={mix} />
{:else}
  <Landing design={localizedActive} designCount={designs.length} {locale} onLocaleChange={setLocale} {isMix} onShuffle={shuffle} onCopy={changeCopy} onMix={mix} onGallery={gallery} onShare={shareCurrent} />
{/if}
