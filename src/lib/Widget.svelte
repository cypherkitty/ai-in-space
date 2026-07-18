<script lang="ts">
  import type { Design, WidgetName } from './designs';
  export let type: WidgetName;
  export let design: Design;
</script>

<article class="widget" class:stats={type === 'stats'}>
  {#if type === 'stats'}
    {#each design.stats as stat}
      <div class="stat"><strong>{stat[0]}</strong><span>{stat[1]}<br />{stat[2]}</span></div>
    {/each}
  {:else if type === 'signal'}
    <header><span>Signal analysis</span><b>LIVE</b></header>
    <div class="wave" aria-hidden="true">{#each [22,42,31,68,48,88,39,62,28,75,52,34,65,29] as h}<i style={`height:${h}%`}></i>{/each}</div>
    <footer>Carrier stable <span>98.42%</span></footer>
  {:else if type === 'coordinates'}
    <header><span>Current field</span><b>RA/DEC</b></header>
    <strong class="coords">18ʰ 36ᵐ 56ˢ<br />+38° 47′ 01″</strong>
    <footer>LYR / KEPLER FIELD <span>TRACKING</span></footer>
  {:else if type === 'progress'}
    <header><span>Model traversal</span><b>068%</b></header>
    <div class="progress"><i></i></div>
    <footer>12,409 sectors <span>04:22:18</span></footer>
  {:else if type === 'quote'}
    <span class="quote-mark">“</span>
    <p class="quote">The universe is not obliged to be obvious. Our tools should be patient enough to notice.</p>
    <footer>FIELD PRINCIPLE <span>NO. 03</span></footer>
  {:else}
    <header><span>Next mission</span><b>AIS–04</b></header>
    <div class="mission-line"><i></i><i></i><i></i><i></i></div>
    <strong class="mission-title">ORPHEUS<br />DEEP FIELD</strong>
    <footer>LAUNCH WINDOW <span>2031.184</span></footer>
  {/if}
</article>

<style>
  .widget { min-width: 220px; padding: 1rem; color: var(--text); border: 1px solid color-mix(in srgb, var(--text) 14%, transparent); background: var(--panel); backdrop-filter: blur(14px); font-family: var(--font-mono); font-size: .62rem; letter-spacing: .08em; }
  header, footer { display: flex; justify-content: space-between; gap: 1rem; text-transform: uppercase; }
  header { color: var(--muted); padding-bottom: .8rem; border-bottom: 1px solid color-mix(in srgb, var(--text) 12%, transparent); }
  header b { color: var(--accent); font-weight: 500; }
  footer { margin-top: .8rem; color: var(--muted); font-size: .54rem; }
  footer span { color: var(--text); }
  .wave { height: 52px; display: flex; align-items: center; gap: 4px; margin-top: .6rem; }
  .wave i { flex: 1; min-width: 2px; background: var(--accent); opacity: .72; animation: wave 2.4s ease-in-out infinite alternate; }
  .wave i:nth-child(3n) { animation-delay: -.8s; }
  .coords { display: block; padding: 1.1rem 0 .6rem; font-weight: 420; line-height: 1.6; letter-spacing: .16em; }
  .progress { height: 2px; margin: 2rem 0; background: color-mix(in srgb, var(--text) 12%, transparent); }
  .progress i { display: block; width: 68%; height: 100%; background: var(--accent); box-shadow: 0 0 12px var(--accent); }
  .quote-mark { display: block; height: 1.7rem; color: var(--accent); font-family: Georgia, serif; font-size: 2.7rem; }
  .quote { max-width: 32ch; font-family: var(--font-display); font-size: .78rem; line-height: 1.55; letter-spacing: -.01em; }
  .mission-line { display: flex; align-items: center; gap: 0; margin: 1rem 0; }
  .mission-line i { width: 6px; height: 6px; border: 1px solid var(--accent); border-radius: 50%; }
  .mission-line i + i { margin-left: 22%; }
  .mission-line::before { content: ''; position: absolute; width: 70%; border-top: 1px dashed color-mix(in srgb, var(--accent) 50%, transparent); }
  .mission-title { font-size: .85rem; line-height: 1.35; letter-spacing: .15em; }
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); min-width: min(620px, 90vw); padding: 0; }
  .stat { min-height: 130px; padding: 1.1rem; display: flex; flex-direction: column; justify-content: flex-end; gap: .55rem; border-right: 1px solid color-mix(in srgb, var(--text) 12%, transparent); }
  .stat:last-child { border: 0; }
  .stat strong { font-family: var(--font-display); font-size: clamp(1.15rem, 2vw, 1.7rem); font-weight: 430; letter-spacing: .04em; }
  .stat span { color: var(--muted); line-height: 1.5; text-transform: uppercase; }
  @keyframes wave { to { transform: scaleY(.55); opacity: .35; } }
  @media (prefers-reduced-motion: reduce) { .wave i { animation: none; } }
  @media (max-width: 700px) { .widget { min-width: 0; } .stats { min-width: 0; width: 100%; } .stat { min-height: 105px; padding: .75rem; } }
</style>
