<script lang="ts">
  import { onMount } from 'svelte';

  export let accent = '#76efff';
  export let accent2 = '#754cff';

  let canvas: HTMLCanvasElement;
  let refreshCanvas = () => {};

  $: {
    accent;
    accent2;
    refreshCanvas();
  }

  type NodePoint = {
    angle: number;
    distance: number;
    speed: number;
    depth: number;
    phase: number;
    tilt: number;
    color: number;
    x: number;
    y: number;
  };

  const MAX_CANVAS_PIXELS = 800_000;
  const MAX_FRAME_RATE = 20;
  const ARRIVAL_ANIMATION_MS = 1_800;
  const INTERACTION_ANIMATION_MS = 420;

  const hexToRgb = (value: string, fallback: [number, number, number]): [number, number, number] => {
    const hex = value.trim().replace('#', '');
    if (!/^[\da-f]{6}$/i.test(hex)) return fallback;
    return [Number.parseInt(hex.slice(0, 2), 16), Number.parseInt(hex.slice(2, 4), 16), Number.parseInt(hex.slice(4, 6), 16)];
  };

  const rgba = (color: [number, number, number], alpha: number) => `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;

  onMount(() => {
    const context = canvas.getContext('2d');
    const host = canvas.parentElement;
    if (!context || !host) return;

    const nodes: NodePoint[] = [];
    const pointer = { x: 0, y: 0 };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 1;
    let height = 1;
    let time = 0;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let visible = true;
    let activeUntil = 0;

    const canRender = () => visible && !document.hidden;

    function queueFrame() {
      if (animationFrame || !canRender()) return;
      animationFrame = requestAnimationFrame(draw);
    }

    function wake(duration = INTERACTION_ANIMATION_MS) {
      activeUntil = Math.max(activeUntil, performance.now() + duration);
      queueFrame();
    }

    refreshCanvas = () => wake();

    function stopAnimation() {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      lastFrameTime = 0;
    }

    function createNetwork() {
      nodes.length = 0;
      const count = Math.max(56, Math.min(100, Math.floor((width * height) / 7200)));
      const radius = Math.min(width, height) * 0.39;
      for (let i = 0; i < count; i += 1) {
        nodes.push({
          angle: Math.random() * Math.PI * 2,
          distance: radius * Math.pow(Math.random(), 0.58),
          speed: (Math.random() - 0.5) * 0.0017,
          depth: 0.28 + Math.random() * 0.9,
          phase: Math.random() * Math.PI * 2,
          tilt: (Math.random() - 0.5) * 0.48,
          color: Math.random(),
          x: 0,
          y: 0
        });
      }
    }

    function resize() {
      const bounds = host!.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      const preferredScale = Math.min(window.devicePixelRatio || 1, 1.25);
      const pixelBudgetScale = Math.sqrt(MAX_CANVAS_PIXELS / (width * height));
      const renderScale = Math.max(1, Math.min(preferredScale, pixelBudgetScale));
      canvas.width = Math.floor(width * renderScale);
      canvas.height = Math.floor(height * renderScale);
      context!.setTransform(renderScale, 0, 0, renderScale, 0, 0);
      createNetwork();
      wake(ARRIVAL_ANIMATION_MS);
    }

    function draw(frameTime: number) {
      animationFrame = 0;
      if (!canRender()) return;

      const animated = !reducedMotion.matches;
      const minimumFrameDuration = 1000 / MAX_FRAME_RATE;
      if (animated && lastFrameTime && frameTime - lastFrameTime < minimumFrameDuration) {
        queueFrame();
        return;
      }

      const elapsed = lastFrameTime ? Math.min(frameTime - lastFrameTime, 50) : minimumFrameDuration;
      lastFrameTime = frameTime;
      time += animated ? elapsed * 0.00072 : 0;
      context!.clearRect(0, 0, width, height);

      const primary = hexToRgb(accent, [118, 239, 255]);
      const secondary = hexToRgb(accent2, [117, 76, 255]);
      const spark: [number, number, number] = [210, 255, 52];
      const centerX = width * 0.5 + pointer.x * 18;
      const centerY = height * 0.5 + pointer.y * 12;
      const radius = Math.min(width, height) * 0.39;
      const aura = context!.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.35);
      aura.addColorStop(0, rgba(secondary, 0.23));
      aura.addColorStop(0.22, rgba(primary, 0.11));
      aura.addColorStop(0.58, rgba(primary, 0.04));
      aura.addColorStop(1, rgba(primary, 0));
      context!.fillStyle = aura;
      context!.fillRect(0, 0, width, height);

      for (const node of nodes) {
        if (animated) node.angle += node.speed * elapsed / 16.67;
        const breathe = 1 + Math.sin(time * 1.4 + node.phase) * 0.07;
        const turbulence = Math.sin(time * 0.8 + node.angle * 4 + node.phase) * radius * 0.055;
        node.x = centerX + Math.cos(node.angle) * (node.distance * breathe + turbulence);
        node.y = centerY + Math.sin(node.angle) * node.distance * (0.54 + node.tilt) * breathe;
      }

      context!.globalCompositeOperation = 'lighter';
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const linkRange = 82 + (a.depth + b.depth) * 9;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared < linkRange * linkRange) {
            const distance = Math.sqrt(distanceSquared);
            context!.strokeStyle = rgba(primary, (1 - distance / linkRange) * 0.2);
            context!.lineWidth = 0.42 + Math.min(a.depth, b.depth) * 0.38;
            context!.beginPath();
            context!.moveTo(a.x, a.y);
            context!.lineTo(b.x, b.y);
            context!.stroke();
          }
        }
      }

      nodes.forEach((node, index) => {
        const pulse = 1 + Math.sin(time * 2.2 + node.phase) * 0.35;
        const color = node.color > 0.94 ? spark : node.color > 0.86 ? secondary : primary;
        context!.shadowColor = rgba(color, 1);
        context!.shadowBlur = node.color > 0.86 ? 10 : 0;
        context!.fillStyle = rgba(color, 0.55 + node.depth * 0.35);
        context!.beginPath();
        context!.arc(node.x, node.y, node.depth * 1.75 * pulse, 0, Math.PI * 2);
        context!.fill();
        if (index % 23 === 0) {
          context!.strokeStyle = rgba(color, 0.18);
          context!.lineWidth = 0.7;
          context!.beginPath();
          context!.arc(node.x, node.y, 7 + pulse * 3, 0, Math.PI * 2);
          context!.stroke();
        }
      });

      const coreSize = 44 + Math.sin(time * 2.1) * 6;
      const core = context!.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize);
      core.addColorStop(0, 'rgba(255,255,255,1)');
      core.addColorStop(0.08, rgba(primary, 0.98));
      core.addColorStop(0.25, rgba(primary, 0.76));
      core.addColorStop(0.48, rgba(secondary, 0.34));
      core.addColorStop(1, rgba(secondary, 0));
      context!.shadowColor = rgba(primary, 1);
      context!.shadowBlur = 32;
      context!.fillStyle = core;
      context!.beginPath();
      context!.arc(centerX, centerY, coreSize, 0, Math.PI * 2);
      context!.fill();
      context!.shadowBlur = 0;
      context!.globalCompositeOperation = 'source-over';
      if (animated && frameTime < activeUntil) queueFrame();
    }

    function movePointer(event: PointerEvent) {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) / bounds.width - 0.5;
      pointer.y = (event.clientY - bounds.top) / bounds.height - 0.5;
      wake();
    }

    function resetPointer() {
      pointer.x = 0;
      pointer.y = 0;
      wake();
    }

    function handleMotionPreference() {
      lastFrameTime = 0;
      wake(ARRIVAL_ANIMATION_MS);
    }

    function handleDocumentVisibility() {
      if (document.hidden) stopAnimation();
      else wake(ARRIVAL_ANIMATION_MS);
    }

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) wake(ARRIVAL_ANIMATION_MS);
      else stopAnimation();
    });
    resizeObserver.observe(host);
    visibilityObserver.observe(canvas);
    canvas.addEventListener('pointermove', movePointer);
    canvas.addEventListener('pointerleave', resetPointer);
    reducedMotion.addEventListener('change', handleMotionPreference);
    document.addEventListener('visibilitychange', handleDocumentVisibility);
    resize();

    return () => {
      refreshCanvas = () => {};
      stopAnimation();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener('pointermove', movePointer);
      canvas.removeEventListener('pointerleave', resetPointer);
      reducedMotion.removeEventListener('change', handleMotionPreference);
      document.removeEventListener('visibilitychange', handleDocumentVisibility);
    };
  });
</script>

<canvas bind:this={canvas} aria-label="Animated neural intelligence network"></canvas>

<style>
  canvas { display: block; width: 100%; height: 100%; cursor: crosshair; touch-action: pan-y; }
</style>
