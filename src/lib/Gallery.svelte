<script lang="ts">
  import Brand from './Brand.svelte';
  import { designAnalyticsContext, trackEvent } from './analytics';
  import type { Design } from './designs';
  export let designs: Design[];
  export let onOpen: (design: Design) => void;
  export let onRandom: () => void;
  export let onMix: () => void;
  let filter: 'curated' | 'generated' | 'all' = 'curated';
  $: curatedCount = designs.filter((design) => !design.generated).length;
  $: generatedCount = designs.length - curatedCount;
  $: visibleDesigns = designs.filter((design) => filter === 'all' || (filter === 'generated' ? design.generated : !design.generated));

  function openDesign(design: Design) {
    trackEvent('select_content', { content_type: 'landing_design', item_id: design.id, ...designAnalyticsContext(design) });
    onOpen(design);
  }

  function launchExperience(controlName: string, action: () => void) {
    trackEvent('experience_control', { control_name: controlName, page_type: 'design_gallery' });
    action();
  }

  function setFilter(next: typeof filter) {
    filter = next;
    trackEvent('gallery_filter', { filter_name: next });
  }
</script>

<svelte:head><title>Design Atlas — AI in Space</title></svelte:head>

<main class="gallery">
  <header>
    <Brand />
    <div class="header-actions"><button type="button" onclick={() => launchExperience('random_launch', onRandom)}>Random launch</button><button class="mix" type="button" onclick={() => launchExperience('crazy_mix', onMix)}>Crazy mix ✦</button></div>
  </header>

  <section class="intro">
    <p>Design atlas / {designs.length} transmissions</p>
    <h1>One system.<br /><em>Millions of skies.</em></h1>
    <div class="intro-note"><span>Coherent by design</span><p>{curatedCount} art-direction families constrain the generator. {generatedCount} saved signals demonstrate the range without sacrificing the shared visual language.</p></div>
  </section>

  <nav class="filters" aria-label="Design atlas filters">
    <button class:active={filter === 'curated'} type="button" onclick={() => setFilter('curated')}>Curated <span>{curatedCount}</span></button>
    <button class:active={filter === 'generated'} type="button" onclick={() => setFilter('generated')}>Generated <span>{generatedCount}</span></button>
    <button class:active={filter === 'all'} type="button" onclick={() => setFilter('all')}>All <span>{designs.length}</span></button>
  </nav>

  <section class="design-grid" aria-label="Landing page designs">
    {#each visibleDesigns as design, i}
      <button
        type="button"
        data-design-id={design.id}
        class:feature={filter === 'curated' ? i === 0 || i === 3 || i === 8 || design.id === 'gravity-well' || design.id === 'three-body' || design.id === 'constellation-engine' || design.id === 'periapsis-control' : i % 13 === 0}
        class:light={design.tone === 'light'}
        class={`design-card preview-${design.layout}`}
        style={`--accent:${design.accent};--accent2:${design.accent2};--bg:${design.bg};--text:${design.text};--muted:${design.muted};--scene:url(${design.scene})`}
        onclick={() => openDesign(design)}
      >
        <div class="preview">
          <div class="preview-bg"></div>
          <div class="preview-nav"><i></i><span>AI IN SPACE</span><b>{design.index}</b></div>
          <div class="preview-copy"><small>{design.kicker}</small><strong>{design.title}<br />{design.titleLine2}</strong><i></i></div>
          <div class:neural={design.visual === 'neural'} class="preview-orbit"><i></i><i></i><i></i></div>
        </div>
        <div class="card-meta"><span>{design.index}</span><div><strong>{design.name}</strong><small>{design.note}</small></div><b>↗</b></div>
      </button>
    {/each}
    <button class="generator-card" type="button" onclick={() => launchExperience('generative_mix', onMix)}>
      <span>∞</span><div><strong>Generative mix</strong><small>Layout × scene × palette × widgets</small></div><b>Generate ↗</b>
    </button>
  </section>

  <footer><Brand /><p>Choose what survives.<br />Everything else stays possible.</p><span>AI IN SPACE / DESIGN ATLAS</span></footer>
</main>

<style>
  .gallery { min-height: 100vh; --font-display: 'Space Grotesk Variable', sans-serif; --font-mono: 'IBM Plex Mono', monospace; color: #f4f6f7; background: #07090b; }
  header { height: 92px; display: flex; justify-content: space-between; align-items: center; padding: 0 clamp(1.2rem, 4vw, 4.5rem); border-bottom: 1px solid #24282c; }
  button { color: inherit; font: inherit; cursor: pointer; }
  .header-actions { display: flex; gap: .5rem; }
  .header-actions button { padding: .7rem 1rem; border: 1px solid #30353a; border-radius: 99px; background: transparent; font-family: var(--font-mono); font-size: .55rem; letter-spacing: .1em; text-transform: uppercase; }
  .header-actions .mix { color: #08100e; border-color: #a7fce4; background: #a7fce4; }
  .intro { display: grid; grid-template-columns: .6fr 1.6fr .8fr; gap: 3rem; padding: clamp(4rem, 8vw, 8rem) clamp(1.2rem, 4vw, 4.5rem); border-bottom: 1px solid #24282c; }
  .intro > p, .intro-note span { color: #7b858c; font-family: var(--font-mono); font-size: .58rem; letter-spacing: .14em; text-transform: uppercase; }
  .intro h1 { margin: 0; font-family: var(--font-display); font-size: clamp(3.8rem, 8vw, 9rem); font-weight: 400; letter-spacing: -.075em; line-height: .82; }
  .intro h1 em { color: #a7fce4; font-family: Georgia, serif; font-weight: 400; }
  .intro-note { align-self: end; }
  .intro-note p { color: #8f989e; font-size: .75rem; line-height: 1.7; }
  .filters { position: sticky; z-index: 10; top: 0; display: flex; gap: .45rem; padding: 1rem clamp(1.2rem, 4vw, 4.5rem); border-bottom: 1px solid #24282c; background: color-mix(in srgb, #07090b 88%, transparent); backdrop-filter: blur(18px); }
  .filters button { display: flex; gap: .6rem; padding: .65rem .9rem; border: 1px solid #30353a; border-radius: 99px; background: transparent; color: #788289; font-family: var(--font-mono); font-size: .55rem; letter-spacing: .08em; text-transform: uppercase; }
  .filters button span { color: #a7fce4; }
  .filters button.active { color: #07100d; border-color: #a7fce4; background: #a7fce4; }
  .filters button.active span { color: inherit; }
  .design-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-flow: dense; gap: 1px; background: #24282c; }
  .design-card { display: block; min-width: 0; padding: 0; border: 0; background: #07090b; text-align: left; }
  .design-card.feature { grid-column: span 2; }
  .preview { position: relative; height: min(34vw, 520px); min-height: 260px; overflow: hidden; color: var(--text); background: var(--bg); }
  .design-card:not(.feature) .preview { height: min(30vw, 410px); }
  .preview-bg { position: absolute; inset: 0; background-image: linear-gradient(90deg, var(--bg), transparent 70%), var(--scene); background-size: cover; background-position: center; opacity: .72; transition: transform .7s cubic-bezier(.2,.7,.1,1), opacity .4s; }
  .design-card:hover .preview-bg { transform: scale(1.035); opacity: .9; }
  .preview::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg,transparent 49.9%,color-mix(in srgb,var(--accent) 15%,transparent) 50%,transparent 50.1%),linear-gradient(transparent 49.9%,color-mix(in srgb,var(--accent) 15%,transparent) 50%,transparent 50.1%); }
  .preview-nav { position: absolute; z-index: 2; top: 8%; left: 6%; right: 6%; display: flex; align-items: center; gap: .5rem; font-family: var(--font-mono); font-size: .42rem; letter-spacing: .15em; }
  .preview-nav i { width: 12px; height: 12px; border: 1px solid var(--accent); border-radius: 50%; }
  .preview-nav b { margin-left: auto; color: var(--accent); font-weight: 500; }
  .preview-copy { position: absolute; z-index: 2; left: 8%; top: 34%; display: flex; flex-direction: column; align-items: start; }
  .preview-copy small { max-width: 38ch; color: var(--accent); font-family: var(--font-mono); font-size: .42rem; letter-spacing: .13em; text-transform: uppercase; }
  .preview-copy strong { margin-top: .8rem; font-family: var(--font-display); font-size: clamp(1.9rem, 4.7vw, 5.8rem); font-weight: 400; letter-spacing: -.06em; line-height: .84; text-transform: none; }
  .design-card:not(.feature) .preview-copy strong { font-size: clamp(1.8rem, 3.6vw, 4.2rem); }
  .preview-copy > i { width: 62px; margin-top: 1.3rem; border-top: 2px solid var(--accent); }
  .preview-orbit { position: absolute; z-index: 2; right: 12%; top: 28%; width: min(21vw, 260px); aspect-ratio: 1; border: 1px solid color-mix(in srgb, var(--accent) 38%, transparent); border-radius: 50%; }
  .preview-orbit i { position: absolute; inset: 18%; border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent); border-radius: 50%; transform: scaleY(.35) rotate(28deg); }
  .preview-orbit i:nth-child(2) { transform: scaleY(.35) rotate(-28deg); }
  .preview-orbit i:nth-child(3) { inset: 48%; border: 0; background: var(--accent); box-shadow: 0 0 16px var(--accent); }
  .preview-orbit.neural { border: 0; border-radius: 50%; background: radial-gradient(circle, var(--accent) 0 1.5%, transparent 2% 8%, color-mix(in srgb, var(--accent) 18%, transparent) 9%, transparent 28%), repeating-conic-gradient(from 18deg, transparent 0 8deg, color-mix(in srgb, var(--accent) 18%, transparent) 9deg 9.5deg, transparent 10deg 24deg); filter: drop-shadow(0 0 18px color-mix(in srgb, var(--accent) 38%, transparent)); }
  .preview-orbit.neural i { inset: 12%; border-style: dotted; transform: scaleY(.48) rotate(18deg); }
  .preview-orbit.neural i:nth-child(2) { transform: scaleY(.55) rotate(-36deg); }
  .preview-orbit.neural i:nth-child(3) { inset: 46%; border: 0; transform: none; }

  /* New visual studies keep their real composition in the atlas instead of collapsing into one generic card. */
  .preview-horizon .preview-bg { background-image: linear-gradient(90deg, var(--bg) 0 18%, transparent 55%), var(--scene); background-position: center; opacity: .94; }
  .preview-horizon .preview-copy { top: 30%; }
  .preview-horizon .preview-copy strong { max-width: 7ch; font-family: Georgia, serif; font-style: italic; }

  .preview-aperture .preview { isolation: isolate; }
  .preview-aperture .preview-bg { inset: 0; background-image: linear-gradient(90deg, var(--bg) 0 12%, color-mix(in srgb, var(--bg) 52%, transparent) 36%, transparent 58%), var(--scene); background-position: center; opacity: 1; filter: contrast(1.08) saturate(.9); }
  .preview-aperture .preview::before { content: ''; position: absolute; z-index: 1; right: 5.5%; top: 10%; width: min(39vw, 470px); aspect-ratio: 1; border: 1px solid color-mix(in srgb, var(--accent) 38%, transparent); border-radius: 50%; box-shadow: 0 0 0 3vw color-mix(in srgb, var(--accent) 4%, transparent), 0 0 58px color-mix(in srgb, var(--accent) 18%, transparent); }
  .preview-aperture .preview-copy { left: 6%; top: 28%; width: 36%; }
  .preview-aperture .preview-copy strong { font-family: var(--font-mono); font-size: clamp(2rem, 4.6vw, 5.3rem); line-height: .86; }
  .preview-aperture .preview-orbit { right: 7.5%; top: 14%; width: min(35vw, 425px); opacity: .28; }

  .preview-zenith .preview-bg { background-image: linear-gradient(180deg, var(--bg) 0 5%, transparent 58%), var(--scene); background-position: center bottom; opacity: .9; }
  .preview-zenith .preview-copy { left: 50%; top: 22%; align-items: center; width: 76%; text-align: center; transform: translateX(-50%); }
  .preview-zenith .preview-copy strong { font-size: clamp(2.3rem, 5.2vw, 6rem); }
  .preview-zenith .preview-orbit { left: 50%; right: auto; top: 34%; transform: translateX(-50%); opacity: .35; }

  .preview-broadcast .preview-bg { clip-path: polygon(47% 0, 100% 0, 100% 100%, 34% 100%); background-image: linear-gradient(90deg, var(--bg), transparent 38%), var(--scene); background-position: center; opacity: .95; }
  .preview-broadcast .preview-copy strong { max-width: 8ch; font-family: var(--font-mono); text-transform: uppercase; }
  .preview-broadcast .preview-copy strong::first-line { color: var(--text); }

  .preview-ledger .preview-bg { left: 38%; background-image: linear-gradient(90deg, var(--bg), transparent 40%), var(--scene); background-position: center; opacity: .88; filter: grayscale(.3); }
  .preview-ledger .preview-copy { width: 34%; }
  .preview-ledger .preview-copy strong { font-family: var(--font-mono); font-size: clamp(1.9rem, 3.8vw, 4.3rem); }
  .preview-ledger .preview::after { background: linear-gradient(90deg,transparent 49.8%,color-mix(in srgb,var(--accent) 18%,transparent) 50%,transparent 50.2%), linear-gradient(transparent 49.8%,color-mix(in srgb,var(--accent) 18%,transparent) 50%,transparent 50.2%); background-size: 10% 10%; }

  .preview-triptych .preview { background-image: linear-gradient(90deg, transparent 33.2%, color-mix(in srgb,var(--text) 18%,transparent) 33.3% 33.4%, transparent 33.5% 66.5%, color-mix(in srgb,var(--text) 18%,transparent) 66.6% 66.7%, transparent 66.8%); }
  .preview-triptych .preview-bg { left: 33.4%; right: 33.4%; background-image: linear-gradient(0deg,var(--bg),transparent 45%),var(--scene); opacity: .9; }
  .preview-triptych .preview-copy { left: 4.5%; top: 29%; width: 25%; }
  .preview-triptych .preview-copy strong { font-size: clamp(1.8rem, 3.8vw, 4.6rem); }
  .preview-triptych .preview-orbit { right: 5%; width: min(23vw, 275px); }

  .preview-timeline .preview-bg { bottom: 49%; background-image: linear-gradient(0deg,var(--bg),transparent 48%),var(--scene); opacity: .9; }
  .preview-timeline .preview-copy { left: 5%; top: 58%; width: 80%; }
  .preview-timeline .preview-copy strong { font-size: clamp(2rem, 4.2vw, 5.1rem); }
  .preview-timeline .preview-copy::before { content: ''; position: absolute; left: 0; right: -12%; top: -28%; border-top: 1px solid var(--accent); }
  .preview-timeline .preview-orbit { right: 9%; top: 8%; width: min(17vw, 210px); }

  .preview-specimen .preview-bg { inset: 10% 54% 10% 6%; background-image: var(--scene); opacity: .74; filter: grayscale(.7) contrast(1.15); }
  .preview-specimen .preview-copy { left: 53%; top: 26%; width: 40%; }
  .preview-specimen .preview-copy strong { font-family: Georgia,serif; font-size: clamp(2rem, 4vw, 4.8rem); font-style: italic; }
  .preview-specimen .preview-orbit { display: none; }
  .preview-specimen .preview::before { content: '46'; position: absolute; left: 2%; bottom: -8%; color: color-mix(in srgb,var(--text) 9%,transparent); font-family: var(--font-display); font-size: 18vw; font-weight: 650; line-height: .8; }

  .preview-constellation .preview-bg { background-image: radial-gradient(circle,transparent 0 15%,var(--bg) 72%),var(--scene); opacity: .5; }
  .preview-constellation .preview-copy { left: 50%; top: 22%; width: 80%; align-items: center; text-align: center; transform: translateX(-50%); }
  .preview-constellation .preview-copy strong { font-size: clamp(2.2rem, 5vw, 6rem); }
  .preview-constellation .preview-orbit { left: 50%; right: auto; top: 32%; width: min(27vw, 330px); transform: translateX(-50%); opacity: .6; }

  .preview-command .preview { background: linear-gradient(90deg,var(--bg) 0 35%,color-mix(in srgb,var(--accent) 12%,var(--bg)) 35% 35.2%,var(--bg) 35.3%); }
  .preview-command .preview-bg { inset: 18% 4% 18% 39%; border: 1px solid color-mix(in srgb,var(--accent) 25%,transparent); background-image: linear-gradient(90deg,var(--bg),transparent),var(--scene); opacity: .75; filter: grayscale(.5); }
  .preview-command .preview-copy { left: 5%; top: 29%; width: 29%; }
  .preview-command .preview-copy strong { font-family: var(--font-mono); font-size: clamp(1.8rem, 3.4vw, 4.2rem); text-transform: uppercase; }
  .preview-command .preview-orbit { right: 13%; top: 26%; width: min(20vw, 250px); }
  .preview-command .preview::before { content: 'FLIGHT / AIS-20     UPLINK: STABLE     MODEL: NOMINAL'; position: absolute; z-index: 2; left: 39%; right: 4%; top: 11%; color: var(--accent); font-family: var(--font-mono); font-size: .4rem; letter-spacing: .12em; }

  .preview-signalstack .preview-bg { background-image: linear-gradient(90deg,var(--bg),transparent 55%),radial-gradient(circle at 72% 50%,transparent,var(--bg) 62%),var(--scene); opacity: .76; }
  .preview-signalstack .preview-copy { left: 6%; top: 27%; width: 62%; }
  .preview-signalstack .preview-copy strong { font-family: var(--font-mono); font-size: clamp(2rem, 4.5vw, 5.4rem); line-height: .78; text-transform: uppercase; }
  .preview-signalstack .preview-copy > i { width: 34vw; }
  .preview-signalstack .preview-orbit { right: 5%; opacity: .42; }
  .preview-signalstack .preview::before { content: '91.40 MHZ — CARRIER LOCKED — PATTERN 06'; position: absolute; z-index: 2; left: 0; right: 0; top: 63%; padding: .45rem 5%; border-block: 1px solid color-mix(in srgb,var(--accent) 30%,transparent); color: var(--accent); font-family: var(--font-mono); font-size: .4rem; letter-spacing: .14em; }

  .light .preview-bg { mix-blend-mode: multiply; }
  .card-meta { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem 1.5rem; background: #0b0e10; border-top: 1px solid #24282c; }
  .card-meta > span { color: var(--accent); font-family: var(--font-mono); font-size: .55rem; }
  .card-meta div { display: flex; flex-direction: column; gap: .2rem; }
  .card-meta strong { font-family: var(--font-display); font-size: .9rem; font-weight: 520; }
  .card-meta small { color: #707a80; font-family: var(--font-mono); font-size: .52rem; letter-spacing: .06em; text-transform: uppercase; }
  .card-meta b { font-weight: 400; transition: transform .2s; }
  .design-card:hover .card-meta b { transform: translate(3px,-3px); }
  .generator-card { min-height: 240px; padding: 2rem; border: 0; background: #a7fce4; color: #07100d; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 2rem; text-align: left; }
  .generator-card > span { font-family: Georgia, serif; font-size: 5rem; }
  .generator-card div { display: flex; flex-direction: column; gap: .35rem; }
  .generator-card strong { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 4rem); font-weight: 450; letter-spacing: -.05em; }
  .generator-card small, .generator-card b { font-family: var(--font-mono); font-size: .57rem; letter-spacing: .08em; text-transform: uppercase; }
  footer { display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: end; padding: 7rem 4vw 3rem; }
  footer p { margin: 0; color: #8b949a; font-family: var(--font-display); font-size: 1.2rem; line-height: 1.4; }
  footer > span { justify-self: end; color: #616b72; font-family: var(--font-mono); font-size: .5rem; letter-spacing: .12em; }
  @media (max-width: 800px) { .intro { grid-template-columns: 1fr; } .intro > p { margin: 0; } .intro-note { max-width: 40ch; } .design-grid { grid-template-columns: 1fr; grid-auto-flow: row; } .design-card.feature { grid-column: auto; } .preview, .design-card:not(.feature) .preview { height: 63vw; min-height: 280px; } .preview-copy strong, .design-card:not(.feature) .preview-copy strong { font-size: clamp(2.2rem, 9vw, 4.5rem); } .preview-orbit { width: 34vw; } .preview-aperture .preview-copy { left: 7%; width: 44%; } .preview-aperture .preview-copy strong { font-size: clamp(1.8rem, 8vw, 4rem); } .preview-aperture .preview::before { right: -8%; top: 12%; width: 58vw; } .preview-aperture .preview-orbit { right: -2%; width: 50vw; } .generator-card { grid-template-columns: auto 1fr; } .generator-card > b { display: none; } footer { grid-template-columns: 1fr; gap: 3rem; } footer > span { justify-self: start; } }
  @media (max-width: 520px) { header { height: 78px; } .header-actions button:first-child { display: none; } .intro { padding-top: 4rem; } .intro h1 { font-size: 17vw; } .preview, .design-card:not(.feature) .preview { height: 105vw; } .preview-orbit { opacity: .45; } .preview-copy { top: 30%; } .generator-card { gap: 1rem; padding: 1.25rem; } .generator-card > span { font-size: 3rem; } }
</style>
