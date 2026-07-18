<script lang="ts">
  export let kind: 'orbit' | 'grid' | 'signal' = 'orbit';
</script>

<div class="orbital-art" class:grid={kind === 'grid'} class:signal={kind === 'signal'} aria-hidden="true">
  <div class="orbit o1"></div><div class="orbit o2"></div><div class="orbit o3"></div>
  <div class="axis x"></div><div class="axis y"></div>
  <div class="core"></div><div class="sweep"></div>
  {#each Array(8) as _, i}<i style={`--i:${i}`}></i>{/each}
</div>

<style>
  .orbital-art { position: relative; width: clamp(180px, 34vw, 520px); aspect-ratio: 1; color: var(--accent); filter: drop-shadow(0 0 24px color-mix(in srgb, var(--accent) 20%, transparent)); }
  .orbit, .axis, .core, .sweep, i { position: absolute; }
  .orbit { inset: 12%; border: 1px solid color-mix(in srgb, currentColor 42%, transparent); border-radius: 50%; }
  .o2 { inset: 25%; transform: rotate(62deg) scaleY(.35); }
  .o3 { inset: 25%; transform: rotate(-28deg) scaleY(.35); border-style: dashed; }
  .axis.x { left: 4%; right: 4%; top: 50%; border-top: 1px solid color-mix(in srgb, currentColor 35%, transparent); }
  .axis.y { top: 4%; bottom: 4%; left: 50%; border-left: 1px solid color-mix(in srgb, currentColor 35%, transparent); }
  .core { inset: 47%; border-radius: 50%; background: white; box-shadow: 0 0 8px 2px white, 0 0 48px 16px currentColor; }
  .sweep { inset: 12%; border-radius: 50%; background: conic-gradient(from 40deg, transparent 0 78%, color-mix(in srgb, currentColor 15%, transparent), transparent 98%); animation: spin 9s linear infinite; }
  i { width: 3px; height: 3px; background: currentColor; border-radius: 50%; left: calc(50% + cos(calc(var(--i) * 45deg)) * 38%); top: calc(50% + sin(calc(var(--i) * 45deg)) * 38%); }
  .grid .orbit { border-radius: 0; transform: rotate(45deg); }
  .grid .o2 { transform: rotate(15deg) scale(.65); }
  .grid .o3 { transform: rotate(75deg) scale(.65); }
  .signal .o2, .signal .o3 { transform: scaleX(.28); }
  @keyframes spin { to { transform: rotate(360deg); } }
  @media (prefers-reduced-motion: reduce) { .sweep { animation: none; } }
</style>
