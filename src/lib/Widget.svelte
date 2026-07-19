<script lang="ts">
  import type { Design, WidgetName } from './designs';
  import { telemetryText, type Locale } from './i18n';

  export let type: WidgetName;
  export let design: Design;
  export let shell: 'panel' | 'cut' | 'ghost' | 'capsule' | 'dial' | 'strip' | 'orb' | 'hex' | 'arc' | 'tag' | 'bare' = 'panel';
  export let locale: Locale = 'en';
  const tt = (value: string) => telemetryText(locale, value);

  const signalVariants = [
    { label: 'Signal analysis', mode: 'LIVE', status: 'Carrier stable', value: '98.42%' },
    { label: 'Pulsar timing', mode: 'LOCK', status: 'Phase drift', value: '+0.003' },
    { label: 'Optical downlink', mode: 'RX', status: 'Photon return', value: '74.8%' },
    { label: 'Magnetic survey', mode: 'FIELD', status: 'Flux variance', value: '12.6 nT' },
    { label: 'Neutrino watch', mode: 'QUIET', status: 'Background rate', value: '0.08 Hz' }
  ];

  const coordinateVariants = [
    { label: 'Current field', mode: 'RA/DEC', a: '18ʰ 36ᵐ 56ˢ', b: '+38° 47′ 01″', footer: 'LYR / KEPLER FIELD', state: 'TRACKING' },
    { label: 'Lagrange fix', mode: 'L2', a: '01.52M KM', b: 'SUNWARD / 0.4°', footer: 'HALO ORBIT', state: 'NOMINAL' },
    { label: 'Lunar baseline', mode: 'SELENE', a: '172.4° E', b: '−43.2° S', footer: 'FAR-SIDE ARRAY', state: 'FIXED' },
    { label: 'Transit chord', mode: 'ECLIPTIC', a: 'λ 284.11°', b: 'β −12.08°', footer: 'PARALLAX SOLUTION', state: 'SOLVED' },
    { label: 'Deep field', mode: 'J2000', a: '03ʰ 32ᵐ 39ˢ', b: '−27° 47′ 29″', footer: 'SOUTHERN WINDOW', state: 'HOLD' }
  ];

  const progressVariants = [
    { label: 'Model traversal', progress: 68, amount: '12,409 sectors', time: '04:22:18' },
    { label: 'Survey mosaic', progress: 41, amount: '804 / 1,960 tiles', time: '11:08:02' },
    { label: 'Spectral reduction', progress: 83, amount: '6.2 TB normalized', time: '00:17:44' },
    { label: 'Orbit solution', progress: 57, amount: '19 passes linked', time: '02:31:09' },
    { label: 'Archive recovery', progress: 92, amount: '44 years indexed', time: '00:03:18' }
  ];

  const quoteVariants = [
    ['The universe is not obliged to be obvious. Our tools should be patient enough to notice.', '03'],
    ['A useful model leaves the evidence more interesting than it found it.', '07'],
    ['Distance does not make a question smaller. It makes attention more precise.', '12'],
    ['The anomaly is not the answer. It is permission to look again.', '18'],
    ['Good instruments preserve doubt until another observation can reach it.', '24']
  ];

  const missionVariants = [
    { code: 'AIS–04', title: 'ORPHEUS', subtitle: 'DEEP FIELD', window: '2031.184' },
    { code: 'AIS–07', title: 'KITE', subtitle: 'SOLAR POLAR', window: '2032.041' },
    { code: 'AIS–11', title: 'PELAGIC', subtitle: 'OCEAN WATCH', window: '2033.229' },
    { code: 'AIS–16', title: 'JANUS', subtitle: 'LENS ARRAY', window: '2035.072' },
    { code: 'AIS–21', title: 'VESPER', subtitle: 'NIGHT RELAY', window: '2036.311' },
    { code: 'AIS–28', title: 'LYRA', subtitle: 'DUST SURVEY', window: '2038.146' }
  ];

  const spectrumVariants = [
    { source: 'Atmosphere 04-B', range: '0.38—2.4 μm', peaks: 'H₂O / CH₄', state: 'CANDIDATE' },
    { source: 'Quasar J0313', range: '91—320 GHz', peaks: 'CO / C⁺', state: 'REDUCED' },
    { source: 'Ring plane 07', range: '8—14 μm', peaks: 'Si / NH₃', state: 'MAPPED' },
    { source: 'Plume sample', range: '120—190 nm', peaks: 'H / O / S', state: 'NEW' }
  ];

  const delayVariants = [
    { target: 'Mars relay', time: '08:22', distance: '148.7M KM', state: 'ONE WAY' },
    { target: 'Jovian array', time: '43:16', distance: '777.4M KM', state: 'ONE WAY' },
    { target: 'Lunar far side', time: '01.28', distance: '384,400 KM', state: 'SECONDS' },
    { target: 'Solar sail 03', time: '16:41', distance: '2.01 AU', state: 'ONE WAY' }
  ];

  const anomalyVariants = [
    { label: 'Transit asymmetry', confidence: 87, source: 'PASS 14 / OBJECT B' },
    { label: 'Uncatalogued pulse', confidence: 74, source: 'ARRAY 08 / 1.42 GHz' },
    { label: 'Thermal excess', confidence: 92, source: 'NIGHT ARC / SECTOR 31' },
    { label: 'Orbital deviation', confidence: 68, source: 'SOLUTION 22-C' },
    { label: 'Chemical mismatch', confidence: 81, source: 'PLUME SAMPLE 006' }
  ];

  const orbitVariants = [
    { body: 'KEPLER–186 F', phase: 63, period: '129.9 D', altitude: '0.43 AU' },
    { body: 'LUNAR L2 HALO', phase: 28, period: '14.8 D', altitude: '64,500 KM' },
    { body: 'RING NODE 07', phase: 81, period: '18.2 H', altitude: '142,090 KM' },
    { body: 'SOLAR POLAR', phase: 46, period: '203.1 D', altitude: '0.71 AU' }
  ];

  const solarVariants = [
    { label: 'Solar weather', level: 'G1', flux: 'B7.4', wind: '438 KM/S', density: '5.2 P/CM³' },
    { label: 'Radiation watch', level: 'S2', flux: 'M1.2', wind: '612 KM/S', density: '8.9 P/CM³' },
    { label: 'Sail pressure', level: 'NOM', flux: '1.36 KW/M²', wind: '401 KM/S', density: '4.7 P/CM³' },
    { label: 'Auroral forecast', level: 'Kp 6', flux: 'C9.8', wind: '721 KM/S', density: '11.1 P/CM³' }
  ];

  const memoryVariants = [
    { label: 'Onboard memory', used: '18.4 TB', total: '24 TB', cells: 18, state: 'SYNC 72%' },
    { label: 'Observation cache', used: '6.8 TB', total: '12 TB', cells: 14, state: 'HOLD 11H' },
    { label: 'Model archive', used: '92 GB', total: '128 GB', cells: 17, state: 'CLEAN' },
    { label: 'Event buffer', used: '1.2 PB', total: '2 PB', cells: 13, state: 'PRIORITY' }
  ];

  const thermalVariants = [
    { label: 'Thermal envelope', temp: '−118°C', low: '−164', high: '−72', marker: 52, state: 'SHADOW' },
    { label: 'Cryogenic stage', temp: '37.4 K', low: '22 K', high: '65 K', marker: 36, state: 'STABLE' },
    { label: 'Ocean surface', temp: '281 K', low: '249 K', high: '306 K', marker: 64, state: 'MODELED' },
    { label: 'Sail membrane', temp: '416 K', low: '180 K', high: '620 K', marker: 54, state: 'SUNWARD' }
  ];

  const archiveVariants = [
    { label: 'Field archive', code: 'LOG 7A', entries: [['03:14', 'transit ingress'], ['03:22', 'spectrum stored'], ['03:41', 'model revised']] },
    { label: 'Decision ledger', code: 'TRACE 12', entries: [['18:02', 'threshold met'], ['18:07', 'array retasked'], ['18:19', 'Earth notified']] },
    { label: 'Night log', code: 'SOL 184', entries: [['21:11', 'carrier lost'], ['21:15', 'local mode'], ['22:48', 'science resumed']] },
    { label: 'Discovery chain', code: 'OBS 031', entries: [['07:04', 'difference found'], ['07:31', 'cross-check clean'], ['08:12', 'follow-up queued']] }
  ];

  const hash = (value: string): number => {
    let result = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      result ^= value.charCodeAt(index);
      result = Math.imul(result, 16777619);
    }
    return result >>> 0;
  };

  const choose = <T,>(values: readonly T[], key: string, salt: string): T => values[hash(`${key}:${salt}`) % values.length]!;
  const range = (key: string, salt: string, min: number, max: number): number => min + (hash(`${key}:${salt}`) % (max - min + 1));

  $: widgetKey = `${design.id}:${design.seed ?? 'curated'}:${design.copySeed ?? 'copy'}:${type}`;
  $: signal = choose(signalVariants, widgetKey, 'signal');
  $: coordinates = choose(coordinateVariants, widgetKey, 'coordinates');
  $: progress = choose(progressVariants, widgetKey, 'progress');
  $: quote = choose(quoteVariants, widgetKey, 'quote');
  $: mission = choose(missionVariants, widgetKey, 'mission');
  $: spectrum = choose(spectrumVariants, widgetKey, 'spectrum');
  $: delay = choose(delayVariants, widgetKey, 'delay');
  $: anomaly = choose(anomalyVariants, widgetKey, 'anomaly');
  $: orbit = choose(orbitVariants, widgetKey, 'orbit');
  $: solar = choose(solarVariants, widgetKey, 'solar');
  $: memory = choose(memoryVariants, widgetKey, 'memory');
  $: thermal = choose(thermalVariants, widgetKey, 'thermal');
  $: archive = choose(archiveVariants, widgetKey, 'archive');
  $: waveHeights = Array.from({ length: 14 }, (_, index) => range(widgetKey, `wave-${index}`, 22, 88));
  $: solarHeights = Array.from({ length: 18 }, (_, index) => range(widgetKey, `solar-${index}`, 12, 92));
</script>

<article class={`widget shell-${shell}`} class:stats={type === 'stats'} aria-label={`${type} mission widget`}>
  {#if type === 'stats'}
    {#each design.stats as stat}
      <div class="stat"><strong>{stat[0]}</strong><span>{stat[1]}<br />{stat[2]}</span></div>
    {/each}
  {:else if type === 'signal'}
    <header><span>{tt(signal.label)}</span><b>{signal.mode}</b></header>
    <div class="wave" aria-hidden="true">{#each waveHeights as height}<i style={`height:${height}%`}></i>{/each}</div>
    <footer>{signal.status} <span>{signal.value}</span></footer>
  {:else if type === 'coordinates'}
    <header><span>{tt(coordinates.label)}</span><b>{coordinates.mode}</b></header>
    <strong class="coords">{coordinates.a}<br />{coordinates.b}</strong>
    <footer>{coordinates.footer} <span>{coordinates.state}</span></footer>
  {:else if type === 'progress'}
    <header><span>{tt(progress.label)}</span><b>{String(progress.progress).padStart(3, '0')}%</b></header>
    <div class="progress"><i style={`width:${progress.progress}%`}></i></div>
    <footer>{progress.amount} <span>{progress.time}</span></footer>
  {:else if type === 'quote'}
    <span class="quote-mark">“</span>
    <p class="quote">{quote[0]}</p>
    <footer>{tt('FIELD PRINCIPLE')} <span>№ {quote[1]}</span></footer>
  {:else if type === 'mission'}
    <header><span>{tt('Next mission')}</span><b>{mission.code}</b></header>
    <div class="mission-line"><i></i><i></i><i></i><i></i></div>
    <strong class="mission-title">{mission.title}<br />{mission.subtitle}</strong>
    <footer>{tt('LAUNCH WINDOW')} <span>{mission.window}</span></footer>
  {:else if type === 'spectrum'}
    <header><span>{tt('Spectral fingerprint')}</span><b>{spectrum.state}</b></header>
    <div class="spectrum" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <strong class="compact-title">{spectrum.source}</strong>
    <footer>{spectrum.range} <span>{spectrum.peaks}</span></footer>
  {:else if type === 'delay'}
    <header><span>{tt('Light delay')}</span><b>{delay.state}</b></header>
    <div class="delay-clock">{delay.time}<small>{tt('MIN')}</small></div>
    <div class="delay-path" aria-hidden="true"><i></i><b></b><i></i></div>
    <footer>{delay.target} <span>{delay.distance}</span></footer>
  {:else if type === 'anomaly'}
    <header><span>{tt('Anomaly review')}</span><b>{tt('OPEN')}</b></header>
    <div class="anomaly-body">
      <div class="confidence" style={`--confidence:${anomaly.confidence}%`}><strong>{anomaly.confidence}</strong><small>%</small></div>
      <div><strong class="compact-title">{anomaly.label}</strong><small>{anomaly.source}</small></div>
    </div>
    <footer>{tt('MODEL AGREEMENT')} <span>{tt('REVIEW')}</span></footer>
  {:else if type === 'orbit'}
    <header><span>{tt('Orbital phase')}</span><b>{orbit.phase}%</b></header>
    <div class="orbit-body">
      <div class="orbit-map" style={`--phase:${orbit.phase * 3.6}deg`} aria-hidden="true"><i></i><b></b></div>
      <strong class="compact-title">{orbit.body}</strong>
    </div>
    <footer>{orbit.period} {tt('PERIOD')} <span>{orbit.altitude}</span></footer>
  {:else if type === 'solar'}
    <header><span>{solar.label}</span><b>{solar.level}</b></header>
    <div class="solar-chart" aria-hidden="true">{#each solarHeights as height}<i style={`height:${height}%`}></i>{/each}</div>
    <strong class="solar-flux">{solar.flux}</strong>
    <footer>{solar.wind} <span>{solar.density}</span></footer>
  {:else if type === 'memory'}
    <header><span>{memory.label}</span><b>{memory.state}</b></header>
    <div class="memory-grid" aria-hidden="true">{#each Array(24) as _, index}<i class:filled={index < memory.cells}></i>{/each}</div>
    <footer>{memory.used} {tt('USED')} <span>{memory.total} {tt('CAPACITY')}</span></footer>
  {:else if type === 'thermal'}
    <header><span>{thermal.label}</span><b>{thermal.state}</b></header>
    <strong class="temperature">{thermal.temp}</strong>
    <div class="thermal-scale" style={`--marker:${thermal.marker}%`} aria-hidden="true"><i></i></div>
    <footer>{thermal.low} {tt('LOW')} <span>{thermal.high} {tt('HIGH')}</span></footer>
  {:else}
    <header><span>{archive.label}</span><b>{archive.code}</b></header>
    <div class="archive-list">
      {#each archive.entries as entry}
        <div><time>{entry[0]}</time><span>{entry[1]}</span><i></i></div>
      {/each}
    </div>
    <footer>{tt('TRACE PRESERVED')} <span>03 {tt('EVENTS')}</span></footer>
  {/if}
</article>

<style>
  .widget { position: relative; min-width: 220px; overflow: hidden; padding: 1rem; color: var(--text); border: 1px solid color-mix(in srgb, var(--text) 14%, transparent); background: var(--panel); backdrop-filter: blur(14px); font-family: var(--font-mono); font-size: .62rem; letter-spacing: .08em; }
  .shell-cut { clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px)); border-color: color-mix(in srgb, var(--accent) 34%, transparent); }
  .shell-ghost { border: 0; border-left: 2px solid var(--accent); background: linear-gradient(90deg, color-mix(in srgb, var(--panel) 92%, transparent), transparent); backdrop-filter: none; }
  .shell-capsule { min-width: 280px; padding: 1.25rem 1.8rem; border-radius: 999px; border-color: color-mix(in srgb, var(--accent) 28%, transparent); }
  .shell-dial { width: 240px; min-width: 240px; aspect-ratio: 1; display: grid; align-content: center; padding: 2rem; border-radius: 50%; border-color: color-mix(in srgb, var(--accent) 46%, transparent); background: radial-gradient(circle, color-mix(in srgb, var(--panel) 94%, transparent) 0 58%, color-mix(in srgb, var(--panel) 72%, transparent)); box-shadow: inset 0 0 0 10px color-mix(in srgb, var(--accent) 3%, transparent), 0 0 45px color-mix(in srgb, var(--accent) 8%, transparent); }
  .shell-dial header { padding-bottom: .55rem; }
  .shell-dial footer { margin-top: .55rem; font-size: .46rem; }
  .shell-dial .progress { margin: 1.35rem 0; }
  .shell-orb { width: 270px; min-width: 270px; aspect-ratio: 1; display: grid; align-content: center; padding: 2.25rem; border-radius: 50%; border-color: color-mix(in srgb, var(--accent) 52%, transparent); background: radial-gradient(circle at 44% 38%, color-mix(in srgb, var(--accent) 10%, var(--panel)), color-mix(in srgb, var(--panel) 92%, transparent) 64%, transparent 65%), conic-gradient(from 205deg, transparent, color-mix(in srgb, var(--accent) 18%, transparent), transparent 72%); box-shadow: inset 0 0 0 1rem color-mix(in srgb, var(--accent) 2%, transparent), 0 0 50px color-mix(in srgb, var(--accent) 9%, transparent); }
  .shell-orb header { padding-bottom: .55rem; }
  .shell-orb footer { margin-top: .55rem; font-size: .45rem; }
  .shell-orb .progress { margin: 1.2rem 0; }
  .shell-hex { width: 300px; min-width: 260px; aspect-ratio: 1.18; display: grid; align-content: center; padding: 2rem 2.65rem; border: 0; clip-path: polygon(25% 0, 88% 0, 100% 50%, 83% 100%, 17% 100%, 0 50%); background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 13%, var(--panel)), var(--panel) 55%, color-mix(in srgb, var(--accent2) 7%, var(--panel))); }
  .shell-hex::before { content: ''; position: absolute; inset: 7px; clip-path: inherit; border: 1px solid color-mix(in srgb, var(--accent) 34%, transparent); pointer-events: none; }
  .shell-arc { width: 300px; min-width: 260px; aspect-ratio: 1.42; display: grid; align-content: end; padding: 2.5rem 1.7rem 1.25rem; border-radius: 50% 50% 8px 8px / 72% 72% 8px 8px; border-color: color-mix(in srgb, var(--accent) 38%, transparent); background: radial-gradient(ellipse at 50% 16%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 48%), var(--panel); }
  .shell-tag { width: 100%; min-width: 260px; padding-inline: 1.5rem 2.2rem; border: 0; clip-path: polygon(0 0, calc(100% - 30px) 0, 100% 50%, calc(100% - 30px) 100%, 0 100%, 14px 50%); background: linear-gradient(90deg, color-mix(in srgb, var(--accent) 14%, var(--panel)), var(--panel) 72%); }
  .shell-tag::after { content: ''; position: absolute; right: 14px; top: 50%; width: 6px; height: 6px; border: 1px solid var(--accent); border-radius: 50%; transform: translateY(-50%); }
  .shell-bare { min-width: 220px; padding: .7rem 0 .7rem 1.2rem; border: 0; border-left: 2px solid var(--accent); background: transparent; backdrop-filter: none; overflow: visible; }
  .shell-bare::before { content: ''; position: absolute; left: -5px; top: 18%; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 14px var(--accent); }
  .shell-strip { width: 100%; height: 150px; min-width: 0; padding: .8rem 1rem; border-width: 1px 0; background: linear-gradient(90deg, color-mix(in srgb, var(--panel) 96%, transparent), color-mix(in srgb, var(--panel) 55%, transparent)); backdrop-filter: blur(8px); }
  .shell-strip header { padding-bottom: .5rem; }
  .shell-strip footer { margin-top: .5rem; }
  .shell-strip .coords { padding: .65rem 0 .2rem; font-size: .68rem; line-height: 1.35; }
  .shell-strip .memory-grid, .shell-strip .archive-list { margin: .55rem 0; }
  .shell-strip .archive-list { gap: .3rem; }
  .shell-strip .anomaly-body { margin: .55rem 0 .2rem; }
  header, footer { display: flex; justify-content: space-between; gap: 1rem; text-transform: uppercase; }
  header { color: var(--muted); padding-bottom: .8rem; border-bottom: 1px solid color-mix(in srgb, var(--text) 12%, transparent); }
  header b { color: var(--accent); font-weight: 500; }
  footer { margin-top: .8rem; color: var(--muted); font-size: .54rem; }
  footer span { color: var(--text); text-align: right; }
  .wave { height: 52px; display: flex; align-items: center; gap: 4px; margin-top: .6rem; }
  .wave i { flex: 1; min-width: 2px; background: var(--accent); opacity: .72; animation: wave 2.4s ease-in-out infinite alternate; }
  .wave i:nth-child(3n) { animation-delay: -.8s; }
  .coords { display: block; padding: 1.1rem 0 .6rem; font-weight: 420; line-height: 1.6; letter-spacing: .16em; }
  .progress { height: 2px; margin: 2rem 0; background: color-mix(in srgb, var(--text) 12%, transparent); }
  .progress i { display: block; height: 100%; background: var(--accent); box-shadow: 0 0 12px var(--accent); }
  .quote-mark { display: block; height: 1.7rem; color: var(--accent); font-family: Georgia, serif; font-size: 2.7rem; }
  .quote { max-width: 32ch; font-family: var(--font-display); font-size: .78rem; line-height: 1.55; letter-spacing: -.01em; }
  .mission-line { position: relative; display: flex; align-items: center; justify-content: space-between; margin: 1rem 0; }
  .mission-line i { position: relative; z-index: 1; width: 6px; height: 6px; border: 1px solid var(--accent); border-radius: 50%; background: var(--panel); }
  .mission-line::before { content: ''; position: absolute; left: 2px; right: 2px; border-top: 1px dashed color-mix(in srgb, var(--accent) 50%, transparent); }
  .mission-title { font-size: .85rem; line-height: 1.35; letter-spacing: .15em; }
  .compact-title { display: block; font-size: .72rem; font-weight: 500; line-height: 1.4; letter-spacing: .08em; text-transform: uppercase; }
  .spectrum { position: relative; height: 48px; margin: .85rem 0 .65rem; background: linear-gradient(90deg, color-mix(in srgb,var(--accent) 4%,transparent), color-mix(in srgb,var(--accent2) 15%,transparent)); }
  .spectrum i { position: absolute; top: 0; bottom: 0; width: 2px; background: var(--accent); box-shadow: 0 0 8px var(--accent); }
  .spectrum i:nth-child(1) { left: 8%; opacity: .25; } .spectrum i:nth-child(2) { left: 21%; opacity: .65; } .spectrum i:nth-child(3) { left: 39%; } .spectrum i:nth-child(4) { left: 43%; opacity: .45; } .spectrum i:nth-child(5) { left: 68%; opacity: .8; } .spectrum i:nth-child(6) { left: 82%; opacity: .35; } .spectrum i:nth-child(7) { left: 91%; opacity: .62; }
  .delay-clock { display: flex; align-items: baseline; gap: .45rem; margin: .9rem 0 .35rem; font-family: var(--font-display); font-size: 1.8rem; letter-spacing: -.03em; }
  .delay-clock small { color: var(--accent); font-family: var(--font-mono); font-size: .48rem; letter-spacing: .16em; }
  .delay-path { display: flex; align-items: center; }
  .delay-path i { width: 7px; height: 7px; border: 1px solid var(--accent); border-radius: 50%; }
  .delay-path b { flex: 1; border-top: 1px dashed color-mix(in srgb,var(--accent) 60%,transparent); }
  .anomaly-body { display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 1rem; margin: .85rem 0 .4rem; }
  .anomaly-body > div:last-child { display: grid; gap: .45rem; }
  .anomaly-body small { color: var(--muted); font-size: .46rem; line-height: 1.5; }
  .confidence { width: 58px; aspect-ratio: 1; display: grid; place-content: center; border-radius: 50%; background: radial-gradient(circle, var(--panel) 0 55%, transparent 57%), conic-gradient(var(--accent) var(--confidence), color-mix(in srgb,var(--text) 10%,transparent) 0); box-shadow: 0 0 18px color-mix(in srgb,var(--accent) 12%,transparent); text-align: center; }
  .confidence strong { font-size: .9rem; font-weight: 500; } .confidence small { color: var(--accent); font-size: .4rem; }
  .orbit-body { display: grid; grid-template-columns: 68px 1fr; align-items: center; gap: .85rem; margin: .75rem 0 .2rem; }
  .orbit-map { position: relative; width: 66px; aspect-ratio: 1; border: 1px solid color-mix(in srgb,var(--accent) 48%,transparent); border-radius: 50%; transform: scaleY(.55) rotate(-16deg); }
  .orbit-map i { position: absolute; inset: 30%; border: 1px solid color-mix(in srgb,var(--accent) 35%,transparent); border-radius: 50%; }
  .orbit-map i::after { content: ''; position: absolute; inset: 40%; border-radius: 50%; background: var(--accent2); box-shadow: 0 0 12px var(--accent); }
  .orbit-map b { position: absolute; inset: -4px; transform: rotate(var(--phase)); }
  .orbit-map b::after { content: ''; position: absolute; left: 50%; top: -1px; width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 10px var(--accent); }
  .solar-chart { height: 42px; display: flex; align-items: end; gap: 2px; margin: .75rem 0 -.15rem; border-bottom: 1px solid color-mix(in srgb,var(--accent) 30%,transparent); }
  .solar-chart i { flex: 1; background: linear-gradient(var(--accent), transparent); opacity: .62; }
  .solar-flux { display: block; margin: .45rem 0; font-family: var(--font-display); font-size: 1.1rem; font-weight: 450; letter-spacing: -.02em; }
  .memory-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px; margin: 1rem 0; }
  .memory-grid i { aspect-ratio: 1.5; border: 1px solid color-mix(in srgb,var(--text) 14%,transparent); background: color-mix(in srgb,var(--text) 3%,transparent); }
  .memory-grid i.filled { border-color: color-mix(in srgb,var(--accent) 42%,transparent); background: color-mix(in srgb,var(--accent) 55%,transparent); box-shadow: 0 0 6px color-mix(in srgb,var(--accent) 18%,transparent); }
  .temperature { display: block; margin: .9rem 0 .7rem; font-family: var(--font-display); font-size: 1.75rem; font-weight: 430; letter-spacing: -.04em; }
  .thermal-scale { position: relative; height: 8px; border-radius: 8px; background: linear-gradient(90deg, var(--accent2), var(--accent), #ff6c4a); opacity: .8; }
  .thermal-scale i { position: absolute; top: -4px; left: var(--marker); width: 1px; height: 16px; background: var(--text); box-shadow: 0 0 6px var(--text); }
  .archive-list { display: grid; gap: .55rem; margin: .85rem 0; }
  .archive-list div { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: .55rem; color: var(--muted); font-size: .5rem; text-transform: uppercase; }
  .archive-list time { color: var(--accent); }
  .archive-list i { width: 5px; height: 5px; border: 1px solid var(--accent); border-radius: 50%; }
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); min-width: min(620px, 90vw); padding: 0; }
  .stats.shell-tag, .stats.shell-bare { width: 100%; min-width: 0; }
  .stat { min-height: 130px; padding: 1.1rem; display: flex; flex-direction: column; justify-content: flex-end; gap: .55rem; border-right: 1px solid color-mix(in srgb, var(--text) 12%, transparent); }
  .stat:last-child { border: 0; }
  .stat strong { font-family: var(--font-display); font-size: clamp(1.15rem, 2vw, 1.7rem); font-weight: 430; letter-spacing: .04em; }
  .stat span { color: var(--muted); line-height: 1.5; text-transform: uppercase; }
  @keyframes wave { to { transform: scaleY(.55); opacity: .35; } }
  @media (prefers-reduced-motion: reduce) { .wave i { animation: none; } }
  @media (max-width: 700px) { .widget { min-width: 0; } .shell-orb, .shell-dial { width: min(240px, 100%); min-width: 0; } .shell-hex, .shell-arc, .shell-tag { width: 100%; min-width: 0; } .stats { min-width: 0; width: 100%; } .stat { min-height: 105px; padding: .75rem; } }
</style>
