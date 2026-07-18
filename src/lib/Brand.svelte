<script lang="ts">
  export let compact = false;
</script>

<div class:compact class="brand" aria-label="AI in Space">
  <svg viewBox="0 0 40 40" aria-hidden="true">
    <circle cx="20" cy="20" r="10.5" />
    <circle cx="20" cy="20" r="2.2" class="fill" />
    <path d="M20 2v10M20 28v10M2 20h10M28 20h10" />
    <path d="m20 7 2.2 10.8L33 20l-10.8 2.2L20 33l-2.2-10.8L7 20l10.8-2.2L20 7Z" class="fine" />
  </svg>
  {#if !compact}<span>AI IN SPACE</span>{/if}
</div>

<style>
  .brand { display: inline-flex; align-items: center; gap: .85rem; color: inherit; font-family: var(--font-display); font-size: .8rem; font-weight: 580; letter-spacing: .28em; white-space: nowrap; }
  svg { width: 2rem; height: 2rem; fill: none; stroke: currentColor; stroke-width: .7; overflow: visible; }
  .fine { stroke-width: .35; opacity: .7; }
  .fill { fill: currentColor; stroke: none; }
  .compact { gap: 0; }
</style>
