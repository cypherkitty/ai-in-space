<script lang="ts">
  import type { Layout } from './designs';

  export let layout: Layout;
</script>

{#if layout === 'triptych'}
  <div class="layout-chrome triptych-chrome" aria-hidden="true">
    <span>01 / QUESTION</span><span>02 / OBSERVATION</span><span>03 / VERDICT</span>
  </div>
{:else if layout === 'timeline'}
  <div class="layout-chrome timeline-chrome" aria-hidden="true">
    <span><i></i>DEPARTURE</span><span><i></i>CRUISE</span><span><i></i>INFERENCE</span><span><i></i>RETURN</span>
  </div>
{:else if layout === 'specimen'}
  <div class="layout-chrome specimen-chrome" aria-hidden="true">
    <strong>46</strong><span>ANOMALOUS OBJECT<br />EVIDENCE PLATE</span><i></i>
  </div>
{:else if layout === 'constellation'}
  <div class="layout-chrome constellation-chrome" aria-hidden="true">
    <i></i><i></i><i></i><i></i><i></i><i></i><span>SHARED CONTEXT / 81 NODES</span>
  </div>
{:else if layout === 'command'}
  <div class="layout-chrome command-chrome" aria-hidden="true">
    <span>FLIGHT / AIS-20</span><span>UPLINK<br /><b>STABLE</b></span><span>EDGE MODEL<br /><b>NOMINAL</b></span><span>DECISION WINDOW<br /><b>04:22:18</b></span>
  </div>
{:else if layout === 'signalstack'}
  <div class="layout-chrome signalstack-chrome" aria-hidden="true">
    <span>91.40 MHZ — CARRIER LOCKED — PATTERN 06 —</span>
    <span>TRANSMISSION LAYER / PHASE / NOISE / INTENT</span>
    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
  </div>
{/if}

<style>
  .layout-chrome { position: absolute; z-index: 2; inset: 0; pointer-events: none; font-family: var(--font-mono); }

  .triptych-chrome { display: grid; grid-template-columns: repeat(3, 1fr); padding-top: 128px; }
  .triptych-chrome span { padding: 0 1.25rem; border-right: 1px solid color-mix(in srgb, var(--text) 18%, transparent); color: var(--muted); font-size: .48rem; letter-spacing: .15em; }
  .triptych-chrome span:last-child { border-right: 0; }

  .timeline-chrome { top: 38%; bottom: auto; left: 4.5vw; right: 4.5vw; height: 50px; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid color-mix(in srgb, var(--accent) 55%, transparent); }
  .timeline-chrome span { position: relative; padding-top: 1rem; color: var(--muted); font-size: .46rem; letter-spacing: .13em; }
  .timeline-chrome i { position: absolute; top: -5px; left: 0; width: 9px; height: 9px; border: 1px solid var(--accent); border-radius: 50%; background: var(--bg); box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 55%, transparent); }

  .specimen-chrome strong { position: absolute; left: 3.5vw; top: 15%; color: color-mix(in srgb, var(--text) 9%, transparent); font-family: var(--font-display); font-size: min(34vw, 31rem); font-weight: 600; line-height: .7; letter-spacing: -.1em; }
  .specimen-chrome span { position: absolute; left: 4.5vw; bottom: 5rem; color: var(--muted); font-size: .48rem; line-height: 1.8; letter-spacing: .14em; }
  .specimen-chrome i { position: absolute; left: 45.5%; top: 15%; bottom: 7%; border-left: 1px solid color-mix(in srgb, var(--text) 18%, transparent); }

  .constellation-chrome { opacity: .8; }
  .constellation-chrome::before, .constellation-chrome::after { content: ''; position: absolute; left: 50%; top: 51%; width: min(45vw, 610px); aspect-ratio: 1; border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent); border-radius: 50%; transform: translate(-50%, -50%); }
  .constellation-chrome::after { width: min(27vw, 370px); border-style: dashed; }
  .constellation-chrome i { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 20px var(--accent); }
  .constellation-chrome i:nth-child(1) { left: 31%; top: 31%; }
  .constellation-chrome i:nth-child(2) { left: 64%; top: 25%; }
  .constellation-chrome i:nth-child(3) { left: 73%; top: 51%; }
  .constellation-chrome i:nth-child(4) { left: 58%; top: 74%; }
  .constellation-chrome i:nth-child(5) { left: 36%; top: 68%; }
  .constellation-chrome i:nth-child(6) { left: 49%; top: 47%; width: 13px; height: 13px; }
  .constellation-chrome span { position: absolute; left: 50%; bottom: 3.2rem; color: var(--accent); font-size: .48rem; letter-spacing: .18em; transform: translateX(-50%); }

  .command-chrome { inset: 118px 2.5vw 2.5rem 2.5vw; display: grid; grid-template-columns: 1.1fr .65fr .65fr .8fr; grid-template-rows: auto 1fr; gap: 1px; background: color-mix(in srgb, var(--accent) 18%, transparent); border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent); }
  .command-chrome span { padding: .8rem 1rem; background: var(--bg); color: var(--muted); font-size: .45rem; line-height: 1.7; letter-spacing: .12em; }
  .command-chrome span:first-child { color: var(--accent); }
  .command-chrome b { color: var(--text); font-weight: 500; }
  .command-chrome::after { content: 'AUTONOMY ENVELOPE / BOUNDED'; grid-column: 1 / -1; align-self: end; padding: .75rem 1rem; background: var(--bg); color: var(--muted); font-size: .43rem; letter-spacing: .15em; }

  .signalstack-chrome span { position: absolute; left: 0; right: 0; overflow: hidden; padding: .55rem 4.5vw; border-block: 1px solid color-mix(in srgb, var(--accent) 28%, transparent); background: color-mix(in srgb, var(--bg) 70%, transparent); color: var(--accent); font-size: .48rem; letter-spacing: .18em; white-space: nowrap; }
  .signalstack-chrome span:first-child { top: 17%; }
  .signalstack-chrome span:nth-child(2) { top: 64%; color: var(--muted); transform: rotate(-2deg) scale(1.02); }
  .signalstack-chrome i { position: absolute; bottom: 7%; width: 2.5vw; min-width: 16px; background: color-mix(in srgb, var(--accent) 42%, transparent); }
  .signalstack-chrome i:nth-of-type(1) { right: 36%; height: 5%; }
  .signalstack-chrome i:nth-of-type(2) { right: 32%; height: 12%; }
  .signalstack-chrome i:nth-of-type(3) { right: 28%; height: 7%; }
  .signalstack-chrome i:nth-of-type(4) { right: 24%; height: 18%; }
  .signalstack-chrome i:nth-of-type(5) { right: 20%; height: 27%; }
  .signalstack-chrome i:nth-of-type(6) { right: 16%; height: 15%; }
  .signalstack-chrome i:nth-of-type(7) { right: 12%; height: 22%; }
  .signalstack-chrome i:nth-of-type(8) { right: 8%; height: 10%; }
  .signalstack-chrome i:nth-of-type(9) { right: 4%; height: 4%; }

  @media (max-width: 900px) {
    .triptych-chrome, .timeline-chrome, .specimen-chrome, .constellation-chrome, .command-chrome, .signalstack-chrome { opacity: .34; }
    .triptych-chrome { grid-template-columns: 1fr; }
    .triptych-chrome span { display: none; }
    .triptych-chrome span:first-child { display: block; border-right: 0; }
    .timeline-chrome { top: 58%; grid-template-columns: repeat(4, 1fr); }
    .timeline-chrome span { font-size: .36rem; }
    .specimen-chrome strong { top: 28%; font-size: 60vw; }
    .specimen-chrome i { left: 72%; }
    .command-chrome { inset: 96px 1rem 12rem; grid-template-columns: repeat(2, 1fr); }
    .command-chrome span:nth-child(n + 3) { display: none; }
    .signalstack-chrome span:first-child { top: 14%; }
  }
</style>
