<script lang="ts">
  import { onMount } from 'svelte';
  import Gallery from './lib/Gallery.svelte';
  import Landing from './lib/Landing.svelte';
  import { designAnalyticsContext, initAnalytics, trackPageView } from './lib/analytics';
  import { crazyMix, designs, generateDesign, randomSeed, remixCopy, type Design } from './lib/designs';

  type View = 'landing' | 'gallery';
  let view: View = 'landing';
  let active: Design = designs[0]!;
  let isMix = false;
  let analyticsReady = false;
  let lastTrackedLocation = '';

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
    initAnalytics();
    syncRoute();
    analyticsReady = true;
    window.addEventListener('hashchange', syncRoute);
    return () => window.removeEventListener('hashchange', syncRoute);
  });

  function open(design: Design) {
    window.location.hash = `/v/${design.id}`;
    window.scrollTo({ top: 0 });
  }

  function gallery() {
    window.location.hash = '/gallery';
    window.scrollTo({ top: 0 });
  }

  function shuffle() {
    window.location.hash = `/g/${randomSeed()}`;
    window.scrollTo({ top: 0 });
  }

  function mix() {
    window.location.hash = `/g/${randomSeed()}`;
    window.scrollTo({ top: 0 });
  }

  function changeCopy() {
    const copySeed = randomSeed();
    window.location.hash = active.generated && active.seed
      ? `/g/${active.seed}/${copySeed}`
      : `/c/${active.id}/${copySeed}`;
    window.scrollTo({ top: 0 });
  }

  function randomRoot() {
    active = generateDesign(randomSeed());
    window.history.pushState({}, '', window.location.pathname + window.location.search);
    view = 'landing';
    isMix = true;
    window.scrollTo({ top: 0 });
  }
</script>

<svelte:head>
  <title>{view === 'gallery' ? 'Design Atlas' : `${active.name} — AI in Space`}</title>
  <meta name="theme-color" content={active.bg} />
</svelte:head>

{#if view === 'gallery'}
  <Gallery {designs} onOpen={open} onRandom={randomRoot} onMix={mix} />
{:else}
  <Landing design={active} designCount={designs.length} {isMix} onShuffle={shuffle} onCopy={changeCopy} onMix={mix} onGallery={gallery} />
{/if}
