<script lang="ts">
  import { onMount, tick } from 'svelte';
  import Brand from './Brand.svelte';
  import LayoutChrome from './LayoutChrome.svelte';
  import NeuralCore from './NeuralCore.svelte';
  import OrbitalArt from './OrbitalArt.svelte';
  import Widget from './Widget.svelte';
  import { designAnalyticsContext, trackEvent } from './analytics';
  import { researchPrinciplesFor, type Design, type Layout, type WidgetName } from './designs';

  export let design: Design;
  export let designCount = 61;
  export let isMix = false;
  export let onShuffle: () => void;
  export let onCopy: () => void;
  export let onMix: () => void;
  export let onGallery: () => void;

  const scrollToStory = () => document.querySelector('.story')?.scrollIntoView({ behavior: 'smooth' });
  let signupOpen = false;
  let signupSent = false;
  let signupEmail = '';
  let emailInput: HTMLInputElement;
  let storySection: HTMLElement;
  type TelemetryComposition = 'dock' | 'duo' | 'stack' | 'rail' | 'scatter' | 'focus';

  const telemetryByLayout: Record<Layout, TelemetryComposition> = {
    origin: 'dock', split: 'stack', editorial: 'duo', console: 'rail', poster: 'focus', manifesto: 'scatter',
    radar: 'dock', diagonal: 'stack', monolith: 'duo', terminal: 'rail', atlas: 'focus', horizon: 'scatter',
    aperture: 'duo', zenith: 'dock', broadcast: 'stack', ledger: 'rail', triptych: 'stack', timeline: 'rail',
    specimen: 'focus', constellation: 'scatter', command: 'rail', signalstack: 'stack'
  };
  const telemetryVariations: Record<TelemetryComposition, readonly TelemetryComposition[]> = {
    dock: ['dock', 'duo', 'scatter'],
    duo: ['duo', 'focus', 'dock'],
    stack: ['stack', 'duo', 'focus'],
    rail: ['focus', 'stack', 'duo'],
    scatter: ['scatter', 'duo', 'dock'],
    focus: ['focus', 'duo', 'scatter']
  };
  const curatedTelemetryOverrides: Partial<Record<string, TelemetryComposition>> = {
    'event-horizon': 'focus',
    'ring-observer': 'focus',
    'far-observatory': 'stack',
    'light-year-route': 'focus',
    'periapsis-control': 'stack'
  };
  const dialWidgets = new Set<WidgetName>(['anomaly', 'orbit', 'progress', 'thermal', 'delay']);

  const telemetryHash = (value: string): number => {
    let result = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      result ^= value.charCodeAt(index);
      result = Math.imul(result, 16777619);
    }
    return result >>> 0;
  };

  const telemetryFor = (value: Design): TelemetryComposition => {
    const primary = telemetryByLayout[value.layout];
    if (!value.generated) return curatedTelemetryOverrides[value.id] ?? primary;
    const options = telemetryVariations[primary];
    return options[telemetryHash(`${value.id}:${value.seed ?? 0}:telemetry`) % options.length]!;
  };

  const shellFor = (composition: TelemetryComposition, widget: WidgetName, index: number) => {
    if (composition === 'rail') return 'strip' as const;
    if (composition === 'focus') return dialWidgets.has(widget) ? 'dial' as const : 'cut' as const;
    if (composition === 'stack') return index === 0 ? 'cut' as const : 'ghost' as const;
    if (composition === 'duo') return index === 1 && dialWidgets.has(widget) ? 'dial' as const : index === 0 ? 'cut' as const : 'capsule' as const;
    if (composition === 'scatter') return dialWidgets.has(widget) ? 'dial' as const : index === 1 ? 'capsule' as const : 'ghost' as const;
    return index === 0 ? 'panel' as const : index === 1 ? 'cut' as const : 'ghost' as const;
  };

  $: principles = researchPrinciplesFor(design);
  $: telemetry = telemetryFor(design);
  $: telemetryWidgets = telemetry === 'focus'
    ? design.widgets.slice(0, 1)
    : telemetry === 'duo' || telemetry === 'stack'
      ? design.widgets.slice(0, 2)
      : design.widgets;

  const analyticsContext = () => designAnalyticsContext(design);

  async function openSignup(location: 'header' | 'hero') {
    trackEvent('cta_click', { cta_name: 'join_mission', cta_location: location, ...analyticsContext() });
    signupOpen = true;
    signupSent = false;
    await tick();
    emailInput?.focus();
    trackEvent('signup_form_view', { cta_location: location, ...analyticsContext() });
  }

  function closeSignup() {
    signupOpen = false;
  }

  function submitSignup() {
    signupSent = true;
    trackEvent('generate_lead', { method: 'mission_signup', ...analyticsContext() });
  }

  function exploreResearch() {
    trackEvent('cta_click', { cta_name: 'explore_research', cta_location: 'hero', ...analyticsContext() });
    scrollToStory();
  }

  function runExperience(controlName: string, action: () => void) {
    trackEvent('experience_control', { control_name: controlName, ...analyticsContext() });
    action();
  }

  onMount(() => {
    let researchSeen = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !researchSeen) {
        researchSeen = true;
        trackEvent('research_section_view', analyticsContext());
      }
    }, { threshold: .35 });
    observer.observe(storySection);
    return () => observer.disconnect();
  });
</script>

<svelte:window onkeydown={(event) => event.key === 'Escape' && signupOpen && closeSignup()} />

<div
  class={`site layout-${design.layout} treatment-${design.treatment ?? 'native'} texture-${design.texture ?? 'grid'} scene-${design.sceneAlign ?? 'center'} exposure-${design.exposureBand ?? 'deep'}`}
  class:generated={design.generated}
  data-exposure={design.exposureBand ?? 'deep'}
  style={`--accent:${design.accent};--accent2:${design.accent2};--bg:${design.bg};--text:${design.text};--muted:${design.muted};--panel:${design.panel};--scene:url(${design.scene})`}
>
  <section class="hero" aria-labelledby="hero-title" aria-hidden={signupOpen} inert={signupOpen}>
    <div class="scene"></div><div class="grain"></div><div class="grid-lines"></div>
    <LayoutChrome layout={design.layout} />

    <header class="topbar">
      <button class="brand-button" type="button" onclick={onGallery}><Brand /></button>
      <nav aria-label="Primary">
        <button type="button" onclick={scrollToStory}>Mission</button>
        <button type="button" onclick={scrollToStory}>Technology</button>
        <button type="button" onclick={scrollToStory}>Research</button>
      </nav>
      <button class="explore mission-cta compact" type="button" onclick={() => openSignup('header')}>
        <span><small>Mission channel open</small><strong>Join the Mission</strong></span>
        <b aria-hidden="true">↗</b>
      </button>
    </header>

    <div class="edition"><span>{design.index}</span><i></i><span>{design.name}</span></div>

    <main class="hero-copy">
      <p class="kicker">{design.kicker}</p>
      <h1 id="hero-title"><span>{design.title}</span><span>{design.titleLine2}</span></h1>
      <p class="summary">{design.summary}</p>
      <div class="actions">
        <button class="primary mission-cta" type="button" onclick={() => openSignup('hero')}>Join the Mission <span>→</span></button>
        <button class="secondary-action" type="button" onclick={exploreResearch}>Explore the Research</button>
        <button class="text-action" type="button" onclick={() => runExperience('new_message', onCopy)}><i>✎</i> New message</button>
      </div>
    </main>

    <div class="design-tools" aria-label="Generative design controls">
      <button class="signal-control" type="button" onclick={() => runExperience('alternate_signal', onShuffle)} aria-label="Receive alternate signal">
        <span class="signal-status"><i></i> Alternate signal available</span>
        <strong>Receive a new interface <b aria-hidden="true">↻</b></strong>
        <small>Every transmission retunes the page.</small>
      </button>
      <div class="design-utilities">
        <button type="button" onclick={() => runExperience('open_gallery', onGallery)} aria-label="Open design gallery">All {designCount}</button>
        <button type="button" onclick={() => runExperience('remix', onMix)} class:active={isMix} aria-label="Generate a widget mix">Remix</button>
      </div>
    </div>

    <div class:neural={design.visual === 'neural'} class="art">
      {#if design.visual === 'neural'}
        <NeuralCore accent={design.accent} accent2={design.accent2} />
      {:else}
        <OrbitalArt kind={design.layout === 'console' || design.layout === 'atlas' ? 'grid' : design.layout === 'terminal' ? 'signal' : 'orbit'} />
      {/if}
    </div>

    <aside class={`widgets telemetry-${telemetry}`} aria-label={`Mission telemetry / ${telemetry} composition`}>
      {#each telemetryWidgets as widget, i}
        <div class="widget-slot" class:secondary={i > 0}>
          <Widget type={widget} {design} shell={shellFor(telemetry, widget, i)} />
        </div>
      {/each}
    </aside>

    <div class="coordinate">41° 18′ 14″ N&nbsp;&nbsp; / &nbsp;&nbsp;72° 55′ 03″ W</div>
    <div class="scroll-cue" aria-hidden="true"><span>Scroll to transmit</span><i></i></div>

  </section>

  <section bind:this={storySection} class="story" id="story" aria-labelledby="story-title" aria-hidden={signupOpen} inert={signupOpen}>
    <p class="section-label">{design.index} / Working beyond Earth</p>
    <div class="story-grid">
      <h2 id="story-title">{design.storyTitle ?? 'The next observation changes the map.'}</h2>
      <div>
        <p>Not replacing people. Extending what a small team can observe, compare, and decide when the answer is millions of kilometres away.</p>
        <p>AI in Space develops legible, resilient systems for autonomous science, mission planning, and the discovery of patterns too faint for a hurried eye.</p>
      </div>
    </div>
    {#key `${design.id}-${design.copySeed ?? design.seed ?? 'curated'}`}
      <div class="principles">
        {#each principles as principle, index}
          <article style={`--principle-delay:${index * 70}ms`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </article>
        {/each}
      </div>
    {/key}
    <footer><Brand /><p>INTELLIGENCE FOR ELSEWHERE<br />© 2031 / EARTH</p></footer>
  </section>

  {#if signupOpen}
    <div class="signup-layer" role="presentation">
      <button class="signup-backdrop" type="button" aria-label="Close signup form" onclick={closeSignup}></button>
      <div class="signup-dialog" role="dialog" aria-modal="true" aria-labelledby="signup-title" aria-describedby="signup-copy">
        <button class="signup-close" type="button" aria-label="Close signup form" onclick={closeSignup}>×</button>
        <p class="signup-label"><i></i> Mission channel / open</p>
        {#if signupSent}
          <div class="signup-success" aria-live="polite">
            <span>Transmission received</span>
            <h2 id="signup-title">You’re on the manifest.</h2>
            <p id="signup-copy">The next meaningful signal will find its way to <strong>{signupEmail}</strong>.</p>
            <button type="button" onclick={closeSignup}>Return to the mission →</button>
          </div>
        {:else}
          <h2 id="signup-title">Join the Mission</h2>
          <p id="signup-copy">Receive occasional transmissions from AI in Space. No noise—only meaningful updates.</p>
          <form onsubmit={(event) => { event.preventDefault(); submitSignup(); }}>
            <label for="mission-email">Your email</label>
            <div class="signup-field">
              <input bind:this={emailInput} bind:value={signupEmail} id="mission-email" name="email" type="email" autocomplete="email" placeholder="you@earth.system" required />
              <button type="submit">Join <span>→</span></button>
            </div>
            <small>Project updates · Research notes · Launch announcements</small>
          </form>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .site { --font-display: 'Space Grotesk Variable', sans-serif; --font-body: 'Manrope Variable', sans-serif; --font-mono: 'IBM Plex Mono', monospace; color: var(--text); background: var(--bg); }
  button { color: inherit; font: inherit; }
  .hero { position: relative; min-height: max(720px, 100svh); overflow: hidden; isolation: isolate; background: var(--bg); }
  .scene, .grain, .grid-lines { position: absolute; inset: 0; pointer-events: none; }
  .scene { z-index: -3; background-image: linear-gradient(90deg, var(--bg) 0%, color-mix(in srgb, var(--bg) 92%, transparent) 23%, transparent 65%), var(--scene); background-size: cover; background-position: center; opacity: .9; transform: scale(1.025); }
  .grain { z-index: 8; opacity: .025; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E"); }
  .grid-lines { z-index: -1; opacity: .14; background-image: linear-gradient(color-mix(in srgb, var(--accent) 16%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--accent) 16%, transparent) 1px, transparent 1px); background-size: 8vw 8vw; mask-image: linear-gradient(90deg, transparent 10%, #000 75%, transparent); }
  .scene-left .scene { background-position: left center; }
  .scene-center .scene { background-position: center; }
  .scene-right .scene { background-position: right center; }
  .texture-clean .grain, .texture-clean .grid-lines { display: none; }
  .texture-grain .grid-lines { display: none; }
  .texture-scan .grid-lines { opacity: .22; background-image: repeating-linear-gradient(0deg, transparent 0 5px, color-mix(in srgb, var(--accent) 12%, transparent) 5px 6px); background-size: auto; }
  .topbar { position: absolute; z-index: 10; top: 0; left: 0; right: 0; height: 104px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 0 clamp(1.25rem, 4.5vw, 5rem); border-bottom: 1px solid color-mix(in srgb, var(--text) 9%, transparent); }
  .brand-button, nav button, .explore, .design-tools button { border: 0; background: transparent; cursor: pointer; }
  .brand-button { justify-self: start; padding: 0; }
  nav { display: flex; gap: clamp(1rem, 3.5vw, 3.7rem); }
  nav button, .explore { color: var(--muted); font-family: var(--font-mono); font-size: .61rem; letter-spacing: .18em; text-transform: uppercase; transition: color .2s; }
  nav button:hover, .explore:hover { color: var(--text); }
  .explore { justify-self: end; padding: .75rem 1.1rem; border: 1px solid color-mix(in srgb, var(--text) 20%, transparent); border-radius: 99px; color: var(--text); }
  .explore span { margin-right: .5rem; }
  .mission-cta.compact { display: flex; align-items: center; gap: .65rem; padding: .55rem .8rem; border-color: color-mix(in srgb, var(--accent) 64%, transparent); border-radius: 5px; background: color-mix(in srgb, var(--accent) 8%, transparent); text-align: left; }
  .mission-cta.compact > span { display: flex; flex-direction: column; gap: .12rem; margin: 0; }
  .mission-cta.compact small { color: var(--accent); font-family: var(--font-mono); font-size: .43rem; font-weight: 500; letter-spacing: .14em; white-space: nowrap; }
  .mission-cta.compact strong { color: var(--text); font-family: var(--font-mono); font-size: .53rem; font-weight: 500; letter-spacing: .11em; white-space: nowrap; }
  .mission-cta.compact b { color: var(--accent); font-size: .8rem; font-weight: 400; transition: transform .2s ease; }
  .mission-cta.compact:hover { color: var(--bg); border-color: var(--accent); background: var(--accent); }
  .mission-cta.compact:hover small, .mission-cta.compact:hover strong, .mission-cta.compact:hover b { color: var(--bg); }
  .mission-cta.compact:hover b { transform: translate(2px, -2px); }
  .edition { position: absolute; z-index: 2; left: calc(clamp(1.25rem, 4.5vw, 5rem) + min(340px, 29vw) + 1.25rem); top: 132px; display: flex; align-items: center; gap: .65rem; color: var(--muted); font-family: var(--font-mono); font-size: .55rem; letter-spacing: .16em; text-transform: uppercase; }
  .edition i { display: block; width: 40px; border-top: 1px solid currentColor; }
  .hero-copy { position: absolute; z-index: 3; left: clamp(1.25rem, 7vw, 7.5rem); top: 27%; width: min(540px, 48vw); }
  .kicker { margin: 0 0 1.2rem; color: var(--accent); font-family: var(--font-mono); font-size: .62rem; letter-spacing: .23em; line-height: 1.5; text-transform: uppercase; }
  h1 { margin: 0; font-family: var(--font-display); font-size: clamp(3.7rem, 7.6vw, 8.3rem); font-weight: 390; letter-spacing: -.065em; line-height: .82; text-wrap: balance; }
  h1 span { display: block; }
  h1 span:nth-child(2) { color: var(--accent2); }
  .treatment-outline h1 span:nth-child(2) { color: transparent !important; -webkit-text-stroke: 1px var(--accent2); }
  .treatment-editorial h1 span:nth-child(2) { color: var(--accent2) !important; font-family: Georgia, serif; font-style: italic; font-weight: 400; }
  .treatment-mono h1 { font-family: var(--font-mono); letter-spacing: -.07em; }
  .summary { max-width: 41ch; margin: 1.55rem 0 0; color: var(--muted); font-size: clamp(.78rem, 1vw, .95rem); line-height: 1.75; }
  .actions { display: flex; align-items: center; gap: 1.5rem; margin-top: 1.8rem; }
  .actions button { cursor: pointer; }
  .primary { padding: .95rem 1.25rem; border: 1px solid var(--accent); border-radius: 2px; background: var(--accent); color: var(--bg); font-family: var(--font-mono); font-size: .59rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; box-shadow: 0 0 32px -18px var(--accent); transition: .25s; }
  .primary:hover { transform: translateY(-2px); box-shadow: 0 0 38px -10px var(--accent); }
  .primary span { margin-left: 1.5rem; }
  .secondary-action { padding: .9rem 0; border: 0; border-bottom: 1px solid color-mix(in srgb, var(--text) 45%, transparent); background: transparent; color: var(--text); font-family: var(--font-mono); font-size: .57rem; letter-spacing: .11em; text-transform: uppercase; }
  .secondary-action:hover { border-color: var(--accent); color: var(--accent); }
  .text-action { border: 0; background: transparent; color: var(--muted); font-family: var(--font-mono); font-size: .57rem; letter-spacing: .12em; text-transform: uppercase; }
  .text-action i { display: inline-grid; place-items: center; width: 1.45rem; height: 1.45rem; margin-right: .5rem; border: 1px solid currentColor; border-radius: 50%; font-style: normal; }
  .art { position: absolute; z-index: 1; right: 14%; top: 22%; opacity: .62; }
  .art.neural { top: 13%; right: 3%; width: min(62vw, 900px); height: min(72vw, 720px); opacity: .88; }
  .widgets { position: absolute; z-index: 4; left: clamp(1.25rem, 4.5vw, 5rem); bottom: 2.2rem; display: flex; align-items: end; gap: .75rem; max-width: calc(100vw - 10rem); }
  .widget-slot { display: block; min-width: 0; }
  .widget-slot :global(.widget:not(.shell-dial)) { width: 100%; height: 100%; }
  .coordinate { position: absolute; right: 3rem; top: 50%; color: var(--muted); font-family: var(--font-mono); font-size: .48rem; letter-spacing: .12em; writing-mode: vertical-rl; }
  .scroll-cue { position: absolute; right: 4.5vw; bottom: 3rem; display: flex; align-items: center; gap: .8rem; color: var(--muted); font-family: var(--font-mono); font-size: .5rem; letter-spacing: .16em; text-transform: uppercase; transform: rotate(90deg); transform-origin: right bottom; }
  .scroll-cue i { width: 55px; border-top: 1px solid var(--accent); }
  .design-tools { position: absolute; z-index: 6; left: clamp(1.25rem, 4.5vw, 5rem); top: 120px; width: min(340px, 29vw); display: grid; grid-template-columns: minmax(0, 1fr) 64px; margin: 0; border: 1px solid color-mix(in srgb, var(--text) 18%, transparent); border-radius: 7px; background: color-mix(in srgb, var(--bg) 78%, transparent); box-shadow: 0 18px 55px -32px color-mix(in srgb, var(--accent) 72%, #000); backdrop-filter: blur(18px); overflow: hidden; }
  .design-tools::before { content: ''; position: absolute; z-index: 1; top: -1px; left: 1rem; width: 44px; border-top: 2px solid var(--accent); }
  .signal-control { display: grid; gap: .28rem; min-width: 0; padding: .72rem .85rem .68rem; border: 0 !important; background: color-mix(in srgb, var(--accent) 4%, transparent) !important; text-align: left; transition: background .2s, transform .2s; }
  .signal-status { display: flex; align-items: center; gap: .5rem; color: var(--accent); font-family: var(--font-mono); font-size: .43rem; letter-spacing: .13em; text-transform: uppercase; }
  .signal-status i { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 12%, transparent), 0 0 12px var(--accent); animation: signal-pulse 2s ease-in-out infinite; }
  .signal-control strong { display: flex; justify-content: space-between; align-items: center; gap: 1rem; color: var(--text); font-family: var(--font-mono); font-size: .56rem; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; }
  .signal-control strong b { color: var(--accent); font-size: .9rem; font-weight: 400; transition: transform .2s; }
  .signal-control small { color: var(--muted); font-family: var(--font-mono); font-size: .43rem; letter-spacing: .04em; }
  .signal-control:hover { background: color-mix(in srgb, var(--accent) 11%, transparent) !important; transform: translateX(2px); }
  .signal-control:hover strong b { transform: rotate(40deg); }
  .design-utilities { display: grid; grid-template-rows: 1fr 1fr; border-left: 1px solid color-mix(in srgb, var(--text) 12%, transparent); }
  .design-utilities button { min-width: 0; padding: .35rem; color: var(--muted); font-family: var(--font-mono); font-size: .42rem; letter-spacing: .06em; text-transform: uppercase; }
  .design-utilities button + button { border-top: 1px solid color-mix(in srgb, var(--text) 12%, transparent); }
  .design-utilities button:hover, .design-utilities button.active { color: var(--bg); background: var(--accent); }

  .signup-layer { position: fixed; z-index: 100; inset: 0; display: grid; place-items: center; padding: 1.25rem; }
  .signup-backdrop { position: absolute; inset: 0; border: 0; background: color-mix(in srgb, #000 72%, transparent); backdrop-filter: blur(12px); cursor: pointer; }
  .signup-dialog { position: relative; width: min(540px, 100%); padding: clamp(1.6rem, 4vw, 3rem); border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent); background: color-mix(in srgb, var(--bg) 94%, #000); box-shadow: 0 30px 100px rgba(0,0,0,.58), 0 0 70px color-mix(in srgb, var(--accent) 9%, transparent); }
  .signup-dialog::before { content: ''; position: absolute; inset: 8px; border: 1px solid color-mix(in srgb, var(--text) 8%, transparent); pointer-events: none; }
  .signup-close { position: absolute; z-index: 1; top: .9rem; right: 1rem; width: 2rem; height: 2rem; border: 0; background: transparent; color: var(--muted); font-size: 1.4rem; cursor: pointer; }
  .signup-label { display: flex; align-items: center; gap: .65rem; margin: 0 0 2.5rem; color: var(--accent); font-family: var(--font-mono); font-size: .52rem; letter-spacing: .14em; text-transform: uppercase; }
  .signup-label i { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); }
  .signup-dialog h2 { max-width: 10ch; margin: 0; font-family: var(--font-display); font-size: clamp(2.8rem, 7vw, 4.6rem); font-weight: 400; letter-spacing: -.065em; line-height: .88; }
  .signup-dialog > p:not(.signup-label), .signup-success p { max-width: 42ch; margin: 1.35rem 0 0; color: var(--muted); font-size: .82rem; line-height: 1.7; }
  .signup-dialog form { margin-top: 2rem; }
  .signup-dialog label { display: block; margin-bottom: .65rem; color: var(--muted); font-family: var(--font-mono); font-size: .5rem; letter-spacing: .14em; text-transform: uppercase; }
  .signup-field { display: grid; grid-template-columns: 1fr auto; border: 1px solid color-mix(in srgb, var(--text) 20%, transparent); background: color-mix(in srgb, var(--panel) 65%, transparent); }
  .signup-field:focus-within { border-color: var(--accent); box-shadow: 0 0 22px color-mix(in srgb, var(--accent) 10%, transparent); }
  .signup-field input { min-width: 0; padding: 1rem; border: 0; outline: 0; background: transparent; color: var(--text); font: .8rem var(--font-mono); }
  .signup-field input::placeholder { color: color-mix(in srgb, var(--muted) 64%, transparent); }
  .signup-field button, .signup-success button { border: 0; background: var(--accent); color: var(--bg); font-family: var(--font-mono); font-size: .57rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; cursor: pointer; }
  .signup-field button { padding: 0 1.15rem; }
  .signup-field button span { margin-left: .7rem; }
  .signup-dialog form > small { display: block; margin-top: .8rem; color: var(--muted); font-family: var(--font-mono); font-size: .46rem; letter-spacing: .07em; }
  .signup-success > span { display: block; margin-bottom: .75rem; color: var(--accent); font-family: var(--font-mono); font-size: .55rem; letter-spacing: .14em; text-transform: uppercase; }
  .signup-success p strong { color: var(--text); font-weight: 500; overflow-wrap: anywhere; }
  .signup-success button { margin-top: 2rem; padding: .95rem 1.1rem; }

  .story { min-height: 100svh; padding: clamp(5rem, 10vw, 9rem) clamp(1.25rem, 7vw, 7.5rem) 3rem; background: var(--bg); border-top: 1px solid color-mix(in srgb, var(--text) 10%, transparent); }
  .section-label { color: var(--accent); font-family: var(--font-mono); font-size: .6rem; letter-spacing: .18em; text-transform: uppercase; }
  .story-grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(280px, .75fr); gap: 8vw; margin: 5rem 0 8rem; }
  .story h2 { max-width: 13ch; margin: 0; font-family: var(--font-display); font-size: clamp(2.8rem, 6vw, 6.8rem); font-weight: 390; letter-spacing: -.06em; line-height: .95; }
  .story-grid > div { align-self: end; max-width: 46ch; color: var(--muted); font-size: .9rem; line-height: 1.8; }
  .principles { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid color-mix(in srgb, var(--text) 12%, transparent); }
  .principles article { padding: 2rem 6vw 3rem 0; border-right: 1px solid color-mix(in srgb, var(--text) 12%, transparent); animation: principle-arrival .5s cubic-bezier(.2,.8,.2,1) both; animation-delay: var(--principle-delay); }
  .principles article + article { padding-left: 2rem; }
  .principles span { color: var(--accent); font-family: var(--font-mono); font-size: .57rem; }
  .principles h3 { margin: 3.5rem 0 1rem; font-family: var(--font-display); font-size: 1.8rem; font-weight: 450; }
  .principles p { max-width: 27ch; color: var(--muted); font-size: .75rem; line-height: 1.7; }
  .story footer { display: flex; justify-content: space-between; align-items: end; margin-top: 8rem; padding-top: 2rem; border-top: 1px solid color-mix(in srgb, var(--text) 12%, transparent); }
  .story footer p { color: var(--muted); font-family: var(--font-mono); font-size: .5rem; line-height: 1.7; letter-spacing: .12em; text-align: right; }

  /* Art directions share semantic widgets, not identical layouts. */
  .layout-split .scene { background-image: linear-gradient(90deg, var(--bg) 0 25%, transparent 65%), var(--scene); }
  .layout-split .hero-copy { top: 22%; width: min(620px, 48vw); }
  .layout-split h1 { font-size: clamp(4rem, 8vw, 9.5rem); text-transform: uppercase; }
  .layout-split h1 span:nth-child(2) { -webkit-text-stroke: 1px var(--accent2); color: transparent; }
  .layout-split .widgets { left: auto; right: 8vw; bottom: 5rem; }
  .layout-split .art { right: 25%; opacity: .25; }

  .layout-editorial .scene, .layout-atlas .scene { inset: 10% 3% 5% 48%; border-radius: 50% 0 0 50%; background-image: linear-gradient(90deg, transparent, color-mix(in srgb, var(--bg) 20%, transparent)), var(--scene); background-position: center; opacity: .95; filter: saturate(.75); }
  .layout-editorial .grid-lines, .layout-atlas .grid-lines { display: none; }
  .layout-editorial .hero-copy { top: 24%; width: min(660px, 49vw); }
  .layout-editorial h1, .layout-atlas h1 { color: var(--text); font-size: clamp(3.8rem, 7.5vw, 8.4rem); }
  .layout-editorial h1 span:nth-child(2), .layout-atlas h1 span:nth-child(2) { color: inherit; font-family: Georgia, serif; font-style: italic; font-weight: 400; }
  .layout-editorial .widgets { bottom: 4rem; }
  .layout-editorial .art { display: none; }

  .layout-console .hero { padding-left: 28vw; }
  .layout-console .topbar { left: 25vw; }
  .layout-console::before { content: 'AIS / INDEX\A\A 01  OBSERVATIONS\A 02  MODELS\A 03  MISSIONS\A 04  FIELD NOTES\A\A NETWORK: LIVE'; white-space: pre; position: absolute; z-index: 5; top: 0; bottom: 0; width: 25vw; padding: 9rem 2.4rem; border-right: 1px solid color-mix(in srgb, var(--accent) 24%, transparent); background: color-mix(in srgb, var(--bg) 88%, transparent); color: var(--muted); font-family: var(--font-mono); font-size: .6rem; line-height: 2.5; letter-spacing: .1em; }
  .layout-console .hero-copy { left: 31vw; top: 23%; width: 46vw; }
  .layout-console h1 { font-family: var(--font-mono); font-size: clamp(3rem, 6.5vw, 7rem); line-height: .92; letter-spacing: -.07em; }
  .layout-console .edition { left: 31vw; }
  .layout-console .widgets { left: 31vw; bottom: 3rem; }
  .layout-console .art { right: 7%; top: 28%; opacity: .45; }
  .layout-console .art.neural { top: 12%; right: 1%; width: min(68vw, 960px); opacity: .92; }

  .layout-manifesto .scene { opacity: .46; filter: grayscale(.25); background-position: 80% center; }
  .layout-manifesto .hero-copy { left: 50%; top: 50%; width: min(1000px, 80vw); text-align: center; transform: translate(-50%, -50%); }
  .layout-manifesto h1 { font-size: clamp(4rem, 9.5vw, 10rem); line-height: .84; }
  .layout-manifesto .summary { margin-left: auto; margin-right: auto; }
  .layout-manifesto .actions { justify-content: center; }
  .layout-manifesto .widgets { right: 4.5vw; left: auto; bottom: 2rem; }
  .layout-manifesto .art { left: 50%; right: auto; top: 15%; transform: translateX(-50%); opacity: .2; }
  .layout-manifesto .art.neural { top: 9%; width: min(78vw, 1040px); opacity: .68; }

  .layout-poster .scene { clip-path: polygon(45% 0,100% 0,100% 100%,30% 100%); background-image: linear-gradient(90deg, var(--bg), transparent 40%), var(--scene); }
  .layout-poster .hero-copy { top: 19%; }
  .layout-poster h1 { font-size: clamp(4.8rem, 10.5vw, 11rem); line-height: .75; text-transform: uppercase; }
  .layout-poster h1 span:nth-child(2) { color: transparent; -webkit-text-stroke: 1px var(--accent); }
  .layout-poster .widgets { left: auto; right: 12vw; }
  .layout-poster .art { right: 20%; top: 18%; opacity: .18; }

  .layout-radar .hero-copy { top: 20%; left: 50%; width: min(800px, 76vw); text-align: center; transform: translateX(-50%); }
  .layout-radar h1 { font-size: clamp(4.2rem, 8vw, 9rem); }
  .layout-radar .summary { margin-inline: auto; }
  .layout-radar .actions { justify-content: center; }
  .layout-radar .art { right: auto; left: 50%; top: 34%; transform: translateX(-50%); opacity: .8; }
  .layout-radar .widgets { left: 50%; bottom: 2rem; transform: translateX(-50%); }

  .layout-diagonal .scene { clip-path: polygon(38% 0, 100% 0, 100% 100%, 58% 100%); filter: contrast(1.1) saturate(.7); }
  .layout-diagonal::after { content: ''; position: absolute; z-index: 0; inset: 0; background: linear-gradient(118deg, transparent 0 48%, var(--accent) 48.1% 48.25%, transparent 48.35%); opacity: .55; }
  .layout-diagonal .hero-copy { top: 24%; }
  .layout-diagonal h1 { font-family: var(--font-mono); text-transform: uppercase; font-size: clamp(3.8rem, 8vw, 8rem); line-height: .86; }
  .layout-diagonal .widgets { left: auto; right: 5vw; }
  .layout-diagonal .art { right: 8%; top: 20%; opacity: .35; }

  .layout-monolith .scene { opacity: .6; background-image: linear-gradient(var(--bg), transparent 25% 70%, var(--bg)), var(--scene); }
  .layout-monolith .hero-copy { top: 18%; left: 50%; width: min(920px, 85vw); text-align: center; transform: translateX(-50%); }
  .layout-monolith .kicker { display: inline-block; padding: .5rem .8rem; border: 1px solid var(--accent); border-radius: 99px; }
  .layout-monolith h1 { font-size: clamp(4rem, 9vw, 10rem); }
  .layout-monolith .summary { margin-inline: auto; }
  .layout-monolith .actions { justify-content: center; }
  .layout-monolith .widgets { left: 50%; transform: translateX(-50%); }
  .layout-monolith .art:not(.neural) { display: none; }
  .layout-monolith .art.neural { top: 23%; left: 50%; right: auto; width: min(78vw, 1050px); transform: translateX(-50%); opacity: .58; }

  .layout-atlas .hero-copy { top: 23%; width: 42vw; }
  .layout-atlas .hero-copy::before { content: 'AIS—09'; display: block; margin-bottom: 3rem; color: var(--accent); font-family: var(--font-mono); font-size: .62rem; letter-spacing: .15em; }
  .layout-atlas .widgets { bottom: 3rem; }
  .layout-atlas .art { right: 9%; top: 26%; opacity: .25; }

  .layout-terminal { --font-display: 'IBM Plex Mono', monospace; }
  .layout-terminal .scene { opacity: .42; filter: grayscale(1) sepia(.3) hue-rotate(75deg) saturate(1.6); }
  .layout-terminal .hero::after { content: ''; position: absolute; z-index: 7; inset: 0; pointer-events: none; background: repeating-linear-gradient(0deg,transparent 0 3px,color-mix(in srgb,var(--accent) 5%,transparent) 3px 4px); }
  .layout-terminal .topbar { border-color: color-mix(in srgb, var(--accent) 24%, transparent); }
  .layout-terminal .hero-copy { top: 25%; }
  .layout-terminal h1 { font-size: clamp(3.5rem, 7.2vw, 7.8rem); text-transform: uppercase; }
  .layout-terminal .summary::after { content: '█'; color: var(--accent); animation: blink 1s step-end infinite; }
  .layout-terminal .widgets { left: auto; right: 8vw; bottom: 5rem; }
  .layout-terminal .art { right: 12%; opacity: .65; }
  .layout-terminal .art.neural { right: 2%; top: 13%; opacity: .9; }

  .layout-horizon .scene { background-image: linear-gradient(90deg, var(--bg) 0 24%, color-mix(in srgb, var(--bg) 58%, transparent) 48%, transparent 72%), linear-gradient(0deg, var(--bg), transparent 28%), var(--scene); background-position: center; }
  .layout-horizon .hero-copy { top: 20%; width: min(760px, 57vw); }
  .layout-horizon h1 { max-width: 8ch; font-size: clamp(4.4rem, 8.8vw, 9.6rem); line-height: .78; }
  .layout-horizon h1 span:nth-child(2) { font-family: Georgia, serif; font-style: italic; font-weight: 400; }
  .layout-horizon .widgets { left: auto; right: 7vw; bottom: 3.5rem; }
  .layout-horizon .art { right: 22%; top: 28%; opacity: .2; }

  .layout-aperture .scene { inset: 13% 4% 8% 46%; border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent); border-radius: 50%; background-image: var(--scene); background-position: center; box-shadow: 0 0 0 7vw color-mix(in srgb, var(--accent) 3%, transparent), 0 0 80px color-mix(in srgb, var(--accent) 14%, transparent); filter: saturate(.82) contrast(1.12); }
  .layout-aperture .grid-lines { mask-image: radial-gradient(circle at 73% 50%, #000 0 27%, transparent 42%); }
  .layout-aperture .hero-copy { top: 23%; width: min(580px, 39vw); }
  .layout-aperture h1 { font-family: var(--font-mono); font-size: clamp(3.4rem, 6.5vw, 7rem); line-height: .88; }
  .layout-aperture .widgets { left: auto; right: 5vw; bottom: 3rem; }
  .layout-aperture .art.neural { top: 19%; right: 7%; width: min(50vw, 700px); height: min(58vw, 650px); opacity: .62; }

  .layout-zenith .scene { background-image: linear-gradient(180deg, var(--bg) 0 10%, color-mix(in srgb, var(--bg) 54%, transparent) 38%, transparent 68%), var(--scene); background-position: center bottom; }
  .layout-zenith .hero-copy { left: 50%; top: 17%; width: min(960px, 78vw); text-align: center; transform: translateX(-50%); }
  .layout-zenith h1 { font-size: clamp(4.5rem, 9vw, 9.5rem); line-height: .8; }
  .layout-zenith .summary { margin-inline: auto; }
  .layout-zenith .actions { justify-content: center; }
  .layout-zenith .widgets { left: 50%; bottom: 2.5rem; transform: translateX(-50%); }
  .layout-zenith .art.neural { left: 50%; right: auto; top: 25%; width: min(72vw, 960px); transform: translateX(-50%); opacity: .46; }

  .layout-broadcast .scene { clip-path: polygon(48% 0, 100% 0, 100% 100%, 35% 100%); background-image: linear-gradient(90deg, var(--bg), transparent 42%), var(--scene); background-position: center; filter: contrast(1.08) saturate(.7); }
  .layout-broadcast .hero-copy { top: 21%; width: min(760px, 55vw); }
  .layout-broadcast h1 { max-width: 8ch; font-family: var(--font-mono); font-size: clamp(4.3rem, 9vw, 9.7rem); line-height: .76; text-transform: uppercase; }
  .layout-broadcast h1 span:nth-child(2) { color: transparent; -webkit-text-stroke: 1px var(--accent); }
  .layout-broadcast .widgets { left: auto; right: 7vw; bottom: 3rem; }
  .layout-broadcast .art { right: 13%; top: 20%; opacity: .26; }

  .layout-ledger .scene { inset: 0 0 0 38%; background-image: linear-gradient(90deg, var(--bg), transparent 38%), linear-gradient(0deg, var(--bg), transparent 30%), var(--scene); background-position: center; filter: grayscale(.35) contrast(1.08); }
  .layout-ledger .grid-lines { opacity: .28; background-size: 5vw 5vw; mask-image: linear-gradient(90deg, transparent 8%, #000 45%, #000 95%, transparent); }
  .layout-ledger .hero-copy { top: 22%; width: min(520px, 35vw); }
  .layout-ledger .hero-copy::before { content: 'OBSERVATION LEDGER / ARRAY 15'; display: block; margin-bottom: 2.5rem; padding-bottom: .75rem; border-bottom: 1px solid color-mix(in srgb, var(--accent) 48%, transparent); color: var(--accent); font-family: var(--font-mono); font-size: .5rem; letter-spacing: .15em; }
  .layout-ledger h1 { font-family: var(--font-mono); font-size: clamp(3.25rem, 5.9vw, 6.5rem); line-height: .88; }
  .layout-ledger .widgets { left: auto; right: 6vw; bottom: 3rem; }
  .layout-ledger .art { right: 10%; top: 26%; opacity: .3; }

  /* Six composition systems use different structural chrome, not just a different crop. */
  .layout-triptych .scene { inset: 104px 33.333% 0; background-image: linear-gradient(0deg, var(--bg), transparent 32%), var(--scene); background-position: center; opacity: .82; filter: grayscale(.2) contrast(1.08); }
  .layout-triptych .grid-lines { display: none; }
  .layout-triptych .hero-copy { left: 4.5vw; top: 23%; width: 24vw; }
  .layout-triptych h1 { font-size: clamp(3.4rem, 5.3vw, 6.5rem); line-height: .88; }
  .layout-triptych .actions { align-items: flex-start; flex-direction: column; gap: .75rem; }
  .layout-triptych .widgets { left: auto; right: 3.2vw; top: 24%; bottom: auto; width: 27vw; max-width: none; flex-direction: column; }
  .layout-triptych .art { left: 36%; right: auto; top: 22%; width: 28vw; opacity: .68; }
  .layout-triptych .coordinate, .layout-triptych .scroll-cue { display: none; }
  .layout-triptych .story-grid { grid-template-columns: 1fr 1fr 1fr; gap: 2rem; }
  .layout-triptych .story-grid h2 { grid-column: span 2; }
  .layout-triptych .principles { gap: 1rem; border: 0; }
  .layout-triptych .principles article, .layout-triptych .principles article + article { padding: 2rem; border: 1px solid color-mix(in srgb, var(--text) 14%, transparent); }

  .layout-timeline .scene { bottom: 51%; background-image: linear-gradient(0deg, var(--bg), transparent 48%), linear-gradient(90deg, color-mix(in srgb, var(--bg) 70%, transparent), transparent), var(--scene); background-position: center; opacity: .9; }
  .layout-timeline .grid-lines { display: none; }
  .layout-timeline .edition { top: 125px; }
  .layout-timeline .hero-copy { left: 4.5vw; top: 52%; width: min(1080px, 78vw); }
  .layout-timeline .kicker { display: none; }
  .layout-timeline h1 { display: grid; grid-template-columns: .78fr 1.22fr; gap: 2vw; font-size: clamp(3.8rem, 7.5vw, 8.5rem); line-height: .82; }
  .layout-timeline h1 span:last-child { font-family: Georgia, serif; font-style: italic; }
  .layout-timeline .summary { margin-left: 41%; }
  .layout-timeline .actions { margin-left: 41%; }
  .layout-timeline .widgets { left: auto; right: 4.5vw; top: 18%; bottom: auto; }
  .layout-timeline .art { left: 50%; right: auto; top: 8%; opacity: .28; }
  .layout-timeline .coordinate, .layout-timeline .scroll-cue { display: none; }
  .layout-timeline .story h2 { max-width: 18ch; }
  .layout-timeline .principles { position: relative; gap: 5vw; border: 0; }
  .layout-timeline .principles::before { content: ''; position: absolute; left: 0; right: 0; top: 2.25rem; border-top: 1px solid var(--accent); opacity: .5; }
  .layout-timeline .principles article, .layout-timeline .principles article + article { position: relative; padding: 1.9rem 0 3rem; border: 0; }
  .layout-timeline .principles span { display: grid; place-items: center; width: 1.2rem; height: 1.2rem; border: 1px solid var(--accent); border-radius: 50%; background: var(--bg); font-size: .42rem; }

  .layout-specimen .scene { inset: 14% 55% 10% 6%; border: 1px solid color-mix(in srgb, var(--text) 24%, transparent); background-image: var(--scene); background-position: center; opacity: .78; filter: grayscale(.65) contrast(1.14); }
  .layout-specimen .grain, .layout-specimen .grid-lines { display: none; }
  .layout-specimen .hero-copy { left: 52%; top: 19%; width: 40vw; }
  .layout-specimen h1 { font-family: Georgia, serif; font-size: clamp(4rem, 7.2vw, 8.2rem); font-weight: 400; line-height: .84; }
  .layout-specimen h1 span:last-child { color: var(--accent); font-style: italic; }
  .layout-specimen .widgets { left: 52%; bottom: 3.5rem; }
  .layout-specimen .art, .layout-specimen .coordinate, .layout-specimen .scroll-cue { display: none; }
  .layout-specimen .story-grid { grid-template-columns: .75fr 1.25fr; border-top: 1px solid color-mix(in srgb, var(--text) 18%, transparent); padding-top: 3rem; }
  .layout-specimen .story h2 { font-family: Georgia, serif; font-weight: 400; }
  .layout-specimen .principles { gap: 3vw; border: 0; }
  .layout-specimen .principles article, .layout-specimen .principles article + article { padding: 2rem 0; border: 0; border-top: 5px solid var(--accent); }
  .layout-specimen .principles article:nth-child(2) { transform: translateY(3rem); }

  .layout-constellation .scene { background-image: radial-gradient(circle at center, transparent 0 18%, color-mix(in srgb, var(--bg) 35%, transparent) 42%, var(--bg) 82%), var(--scene); background-position: center; opacity: .5; filter: saturate(.6); }
  .layout-constellation .grid-lines { mask-image: radial-gradient(circle at center, #000, transparent 68%); }
  .layout-constellation .hero-copy { left: 50%; top: 16%; width: min(1120px, 88vw); text-align: center; transform: translateX(-50%); }
  .layout-constellation h1 { font-size: clamp(4.2rem, 8.8vw, 9.8rem); line-height: .8; }
  .layout-constellation .summary { margin-inline: auto; }
  .layout-constellation .actions { justify-content: center; }
  .layout-constellation .widgets { left: auto; right: 4vw; bottom: 3rem; }
  .layout-constellation .art.neural { left: 50%; right: auto; top: 25%; width: min(60vw, 820px); transform: translateX(-50%); opacity: .48; }
  .layout-constellation .coordinate, .layout-constellation .scroll-cue { display: none; }
  .layout-constellation .story { text-align: center; }
  .layout-constellation .story-grid { grid-template-columns: 1fr; justify-items: center; margin-inline: auto; }
  .layout-constellation .story-grid > div { text-align: left; }
  .layout-constellation .principles { gap: 2vw; border: 0; }
  .layout-constellation .principles article, .layout-constellation .principles article + article { padding: 3rem 2rem; border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent); border-radius: 50%; aspect-ratio: 1; display: grid; align-content: center; text-align: left; }
  .layout-constellation .principles h3 { margin: 1rem 0; }

  .layout-command { --font-display: 'IBM Plex Mono', monospace; }
  .layout-command .scene { inset: 174px 3vw 13rem 38%; border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent); background-image: linear-gradient(90deg, color-mix(in srgb, var(--bg) 60%, transparent), transparent), var(--scene); opacity: .72; filter: grayscale(.4) contrast(1.2) saturate(.8); }
  .layout-command .edition { display: none; }
  .layout-command .hero-copy { left: 4.5vw; top: 22%; width: 29vw; }
  .layout-command h1 { font-size: clamp(3.2rem, 5.7vw, 6.4rem); line-height: .9; text-transform: uppercase; }
  .layout-command .summary { font-family: var(--font-mono); font-size: .66rem; }
  .layout-command .actions { align-items: flex-start; flex-direction: column; gap: .65rem; }
  .layout-command .widgets { left: 38%; right: 3vw; bottom: 3.5rem; max-width: none; }
  .layout-command .art { right: 12%; top: 25%; opacity: .48; }
  .layout-command .coordinate, .layout-command .scroll-cue { display: none; }
  .layout-command .story { font-family: var(--font-mono); }
  .layout-command .story-grid { padding: 2rem; border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent); }
  .layout-command .story h2 { font-family: var(--font-mono); font-size: clamp(2.5rem, 5vw, 5.5rem); text-transform: uppercase; }
  .layout-command .principles { gap: 1px; border: 1px solid color-mix(in srgb, var(--accent) 24%, transparent); background: color-mix(in srgb, var(--accent) 24%, transparent); }
  .layout-command .principles article, .layout-command .principles article + article { padding: 2rem; border: 0; background: var(--bg); }
  .layout-command .principles h3 { font-family: var(--font-mono); text-transform: uppercase; }

  .layout-signalstack .scene { background-image: linear-gradient(90deg, var(--bg) 0 18%, transparent 52%), radial-gradient(ellipse at 72% 50%, transparent 0 20%, var(--bg) 58%), var(--scene); background-position: center; opacity: .72; filter: saturate(.7) contrast(1.18); }
  .layout-signalstack .hero-copy { left: 5vw; top: 22%; width: 58vw; }
  .layout-signalstack h1 { font-family: var(--font-mono); font-size: clamp(4.4rem, 9.2vw, 10rem); line-height: .76; text-transform: uppercase; }
  .layout-signalstack h1 span:last-child { color: transparent; -webkit-text-stroke: 1px var(--accent); transform: translateX(7vw); }
  .layout-signalstack .summary, .layout-signalstack .actions { margin-left: 7vw; }
  .layout-signalstack .widgets { left: auto; right: 4vw; top: 28%; bottom: auto; width: 24vw; max-width: none; flex-direction: column; }
  .layout-signalstack .art.neural { left: auto; right: 3%; top: 17%; width: 48vw; opacity: .45; }
  .layout-signalstack .coordinate, .layout-signalstack .scroll-cue { display: none; }
  .layout-signalstack .story-grid { grid-template-columns: 1fr; }
  .layout-signalstack .story h2 { max-width: 18ch; font-family: var(--font-mono); text-transform: uppercase; }
  .layout-signalstack .story-grid > div { margin-left: 48%; }
  .layout-signalstack .principles { border: 0; gap: .5rem; transform: rotate(-1deg); }
  .layout-signalstack .principles article, .layout-signalstack .principles article + article { padding: 2rem; border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent); background: color-mix(in srgb, var(--accent) 4%, transparent); }

  .site.exposure-graphite .scene { opacity: .82; filter: saturate(.78) contrast(.96); }
  .site.exposure-dusk .scene { opacity: .72; filter: saturate(.64) contrast(.92); }
  .site.exposure-dusk .grain { opacity: .018; }
  .site.exposure-graphite .summary, .site.exposure-dusk .summary { color: color-mix(in srgb, var(--text) 78%, var(--muted)); text-shadow: 0 2px 18px var(--bg), 0 0 4px var(--bg); }

  /* Telemetry is a composition layer of its own: dock, asymmetric pair, stack, rail, scatter, or single instrument. */
  .widgets.telemetry-dock { left: 50%; right: auto; bottom: 2rem; width: min(88vw, 980px); max-width: none; justify-content: center; transform: translateX(-50%); }
  .telemetry-dock .widget-slot { flex: 1 1 220px; max-width: 380px; }
  .telemetry-dock .widget-slot:only-child { flex-basis: auto; max-width: 680px; }
  .layout-origin .widgets.telemetry-dock { left: auto; right: 3vw; width: min(50vw, 720px); justify-content: flex-end; transform: none; }

  .widgets.telemetry-duo { left: auto; right: 4vw; top: auto; bottom: 1.5rem; width: min(52vw, 700px); max-width: none; display: grid; grid-template-columns: minmax(250px, 1.15fr) minmax(240px, .85fr); align-items: end; gap: 1rem; transform: none; }
  .telemetry-duo .widget-slot:first-child { transform: translateY(-1.5rem); }
  .telemetry-duo .widget-slot:last-child { justify-self: end; }

  .widgets.telemetry-stack { left: auto; right: 3.5vw; top: 22%; bottom: auto; width: min(27vw, 360px); max-width: none; flex-direction: column; align-items: stretch; gap: .65rem; transform: none; }
  .telemetry-stack .widget-slot:nth-child(2) { width: 86%; margin-left: 14%; }

  .widgets.telemetry-rail { left: 3vw; right: 3vw; top: auto; bottom: 1.5rem; width: auto; max-width: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); align-items: stretch; gap: 0; transform: none; }
  .telemetry-rail .widget-slot + .widget-slot { border-left: 1px solid color-mix(in srgb, var(--accent) 20%, transparent); }

  .widgets.telemetry-scatter { inset: 104px 0 0; width: auto; max-width: none; display: block; transform: none; pointer-events: none; }
  .telemetry-scatter .widget-slot { position: absolute; width: min(28vw, 340px); }
  .telemetry-scatter .widget-slot:nth-child(1) { left: 3.5vw; bottom: 11rem; }
  .telemetry-scatter .widget-slot:nth-child(2) { right: 4vw; bottom: 9rem; transform: rotate(-1.5deg); }
  .telemetry-scatter .widget-slot:nth-child(3) { right: 4vw; top: 7%; width: min(24vw, 300px); transform: rotate(1deg); }

  .widgets.telemetry-focus { left: auto; right: 5vw; top: auto; bottom: 4rem; width: min(32vw, 430px); max-width: none; display: block; transform: none; }
  .telemetry-focus .widget-slot { display: grid; justify-items: end; }
  .layout-specimen .widgets.telemetry-focus { left: 7vw; right: auto; bottom: 4rem; }
  .layout-poster .widgets.telemetry-focus { right: 7vw; bottom: 5rem; }
  .layout-timeline .widgets.telemetry-focus { right: .5vw; width: min(24vw, 340px); }

  @media (min-width: 901px) {
    .layout-manifesto .hero, .layout-radar .hero, .layout-monolith .hero, .layout-zenith .hero, .layout-constellation .hero { min-height: max(860px, calc(100svh + 140px)); }
  }

  @keyframes blink { 50% { opacity: 0; } }
  @keyframes signal-pulse { 50% { opacity: .45; transform: scale(.72); } }
  @keyframes principle-arrival { from { opacity: 0; transform: translateY(10px); } }

  @media (min-width: 901px) and (max-height: 820px) {
    .hero { min-height: 920px; }
  }

  @media (max-width: 900px) {
    .topbar { height: 82px; grid-template-columns: 1fr auto; }
    nav { display: none; }
    .edition { left: 1.25rem; top: 205px; }
    .hero-copy, .layout-console .hero-copy, .layout-atlas .hero-copy, .layout-horizon .hero-copy, .layout-aperture .hero-copy, .layout-zenith .hero-copy, .layout-broadcast .hero-copy, .layout-ledger .hero-copy { left: 1.25rem; top: 22%; width: calc(100vw - 2.5rem); transform: none; text-align: left; }
    h1, .layout-split h1, .layout-poster h1, .layout-console h1, .layout-manifesto h1, .layout-radar h1, .layout-monolith h1, .layout-horizon h1, .layout-aperture h1, .layout-zenith h1, .layout-broadcast h1, .layout-ledger h1 { font-size: clamp(3.6rem, 14vw, 7rem); }
    .summary { max-width: 34ch; }
    .art { right: -8rem; top: 35%; opacity: .35; }
    .art.neural, .layout-monolith .art.neural, .layout-terminal .art.neural { top: 27%; left: auto; right: -35%; width: 115vw; height: 115vw; transform: none; opacity: .5; }
    .widgets, .layout-split .widgets, .layout-console .widgets, .layout-manifesto .widgets, .layout-poster .widgets, .layout-radar .widgets, .layout-diagonal .widgets, .layout-monolith .widgets, .layout-atlas .widgets, .layout-terminal .widgets, .layout-horizon .widgets, .layout-aperture .widgets, .layout-zenith .widgets, .layout-broadcast .widgets, .layout-ledger .widgets { left: 1.25rem; right: 1.25rem; bottom: 1.25rem; width: auto; max-width: none; transform: none; }
    .widget-slot.secondary { display: none; }
    .layout-console .hero { padding-left: 0; }
    .layout-console .topbar { left: 0; }
    .layout-console::before { display: none; }
    .layout-editorial .scene, .layout-atlas .scene { inset: 30% -30% 8% 52%; }
    .layout-aperture .scene { inset: 34% -30% 10% 45%; }
    .layout-ledger .scene { inset: 0; }
    .layout-manifesto .hero-copy, .layout-radar .hero-copy, .layout-monolith .hero-copy { left: 1.25rem; top: 20%; width: calc(100vw - 2.5rem); transform: none; text-align: left; }
    .layout-manifesto .summary, .layout-radar .summary, .layout-monolith .summary, .layout-zenith .summary { margin-left: 0; }
    .layout-manifesto .actions, .layout-radar .actions, .layout-monolith .actions, .layout-zenith .actions { justify-content: flex-start; }
    .design-tools { left: 1.25rem; top: 94px; width: min(340px, calc(100vw - 2.5rem)); }
    .scroll-cue, .coordinate { display: none; }
    .story-grid { grid-template-columns: 1fr; margin: 4rem 0 5rem; }
    .layout-triptych .hero-copy, .layout-timeline .hero-copy, .layout-specimen .hero-copy, .layout-constellation .hero-copy, .layout-command .hero-copy, .layout-signalstack .hero-copy { left: 1.25rem; top: 20%; width: calc(100vw - 2.5rem); text-align: left; transform: none; }
    .layout-triptych h1, .layout-timeline h1, .layout-specimen h1, .layout-constellation h1, .layout-command h1, .layout-signalstack h1 { display: block; font-size: clamp(3.6rem, 14vw, 7rem); }
    .layout-timeline .summary, .layout-timeline .actions, .layout-signalstack .summary, .layout-signalstack .actions { margin-left: 0; }
    .layout-constellation .summary { margin-left: 0; }
    .layout-constellation .actions { justify-content: flex-start; }
    .layout-signalstack h1 span:last-child { transform: none; }
    .layout-triptych .scene, .layout-specimen .scene, .layout-command .scene { inset: 32% -12% 9% 38%; }
    .layout-timeline .scene { inset: 0 0 48%; }
    .layout-constellation .scene, .layout-signalstack .scene { inset: 0; }
    .layout-triptych .art, .layout-timeline .art, .layout-command .art { right: -20%; left: auto; top: 34%; width: 90vw; }
    .layout-triptych .widgets, .layout-timeline .widgets, .layout-specimen .widgets, .layout-constellation .widgets, .layout-command .widgets, .layout-signalstack .widgets { left: 1.25rem; right: 1.25rem; top: auto; bottom: 1.25rem; width: auto; max-width: none; flex-direction: row; transform: none; }
    .widgets[class*="telemetry-"] { left: 1.25rem; right: 1.25rem; top: auto; bottom: 1.25rem; width: auto; max-width: none; display: flex; align-items: end; transform: none; }
    .widgets[class*="telemetry-"] .widget-slot { position: static; width: 100%; max-width: none; margin: 0; transform: none; }
    .widgets[class*="telemetry-"] .widget-slot :global(.widget) { width: 100%; height: auto; min-width: 0; }
    .widgets[class*="telemetry-"] .widget-slot :global(.shell-dial) { width: min(240px, 100%); }
    .layout-triptych .story-grid, .layout-specimen .story-grid { grid-template-columns: 1fr; }
    .layout-triptych .story-grid h2 { grid-column: auto; }
    .layout-constellation .principles article, .layout-constellation .principles article + article { border-radius: 0; aspect-ratio: auto; }
    .layout-specimen .principles article:nth-child(2) { transform: none; }
    .layout-signalstack .story-grid > div { margin-left: 0; }
  }
  @media (max-width: 600px) {
    .hero { min-height: 1160px; }
    .layout-signalstack .hero { min-height: 1200px; }
    .topbar { padding-inline: 1.1rem; }
    .explore { padding: .65rem .75rem; font-size: .5rem; }
    .mission-cta.compact { gap: .5rem; }
    .mission-cta.compact small { display: none; }
    .mission-cta.compact strong { font-size: .46rem; letter-spacing: .08em; }
    .mission-cta.compact b { display: none; }
    .edition { left: 1.25rem; }
    .hero-copy { top: 24%; }
    h1, .layout-split h1, .layout-poster h1, .layout-console h1, .layout-manifesto h1, .layout-radar h1, .layout-monolith h1, .layout-horizon h1, .layout-aperture h1, .layout-zenith h1, .layout-broadcast h1, .layout-ledger h1, .layout-triptych h1, .layout-timeline h1, .layout-specimen h1, .layout-constellation h1, .layout-command h1, .layout-signalstack h1 { font-size: clamp(3.25rem, 17vw, 5.2rem); line-height: .87; }
    .actions { align-items: flex-start; flex-direction: column; gap: .9rem; }
    .primary { padding: .8rem 1rem; }
    .widgets { bottom: 2rem !important; }
    .design-tools { left: 1.25rem; top: 94px; width: calc(100vw - 2.5rem); max-width: 380px; }
    .story { padding-top: 5rem; }
    .story-grid { gap: 2rem; }
    .principles { grid-template-columns: 1fr; }
    .principles article, .principles article + article { padding: 2rem 0; border-right: 0; border-bottom: 1px solid color-mix(in srgb, var(--text) 12%, transparent); }
    .principles h3 { margin-top: 1.5rem; }
    .story footer { align-items: start; flex-direction: column; gap: 2rem; }
    .story footer p { text-align: left; }
  }
  @media (prefers-reduced-motion: reduce) { .scene, .signal-status i, .principles article { animation: none; } .layout-terminal .summary::after { animation: none; } }
</style>
