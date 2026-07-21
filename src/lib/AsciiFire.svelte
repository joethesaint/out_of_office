<script>
  import { onMount } from 'svelte';

  // Kept for API compatibility with existing callers, but now read as a
  // low-res pixel grid (columns x rows) instead of a monospace character
  // grid — chunky pixel-art blocks, not a Doom-fire text simulation.
  export let width = 31;
  export let height = 36;

  let canvas;

  const PEAK_ROWS = 7; // twin flame-tongue tips at the top
  const LOG_ROWS = 8; // wood-log bed at the bottom

  const PALETTE = {
    outline: '#160b05',
    band1: '#c33e18', // outer rim — deep red-orange
    band2: '#f07c1c', // orange
    band3: '#ffb63a', // amber
    band4: '#ffe98a', // bright yellow
    band5: '#fff5da', // white-hot core
    logLight: '#8a4a2a', // log body, lit side
    logDark: '#5c2f18', // log body, shadow side
    logCap: '#d9b483',
    logCapRing: '#a97a4a',
  };

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  // 0 at t=0 and t=1, 1 at t=0.5 — for tapering a shape in from both ends
  function hump(t) {
    return Math.max(0, Math.sin(Math.max(0, Math.min(1, t)) * Math.PI));
  }

  // Gentle, sparse irregularity along the body's silhouette (indexed by
  // body row) — a couple of soft undulations, not a sawtooth. Values are
  // added to the smooth base half-width.
  const BODY_NOTCHES = [0, 0, 0.6, 0, -0.5, 0, 0.5, 0, 0, -0.6, 0, 0.5, 0, 0, -0.4, 0, 0, 0, 0, 0, 0];

  // Builds one frame of the pixel grid. `time` (ms) drives a gentle,
  // continuous flicker in the tip height, silhouette edges, and the
  // white-hot core — instead of a full re-scramble every frame, which
  // would read as noise rather than a flame breathing.
  function buildFireGrid(cols, rows, time) {
    const center = (cols - 1) / 2;
    const flameRows = rows - LOG_ROWS;
    const bodyRows = flameRows - PEAK_ROWS;
    const grid = Array.from({ length: rows }, () => Array(cols).fill(null));

    // --- twin peaks, each with an inward "hook" partway down its inner
    // edge (a concave notch), not a plain triangle ---
    for (let r = 0; r < PEAK_ROWS; r++) {
      const t = r / (PEAK_ROWS - 1);
      const outerHalf = lerp(0.6, 2.1, t);
      const hookPinch = hump((t - 0.35) / 0.5) * 0.35; // subtle notch mid-way down
      const innerHalf = Math.max(0.4, outerHalf - hookPinch);
      const gapHalf = lerp(2.5, 0.15, t);
      const wobble = Math.sin(time * 0.0026 + r) * 0.3;

      const leftOuter = center - gapHalf - outerHalf + wobble;
      const leftInner = center - gapHalf + innerHalf + wobble;
      const rightInner = center + gapHalf - innerHalf - wobble;
      const rightOuter = center + gapHalf + outerHalf - wobble;
      const band = t < 0.4 ? 'band1' : 'band2';
      for (let c = 0; c < cols; c++) {
        if (c >= leftOuter && c <= leftInner) grid[r][c] = band;
        if (c >= rightInner && c <= rightOuter) grid[r][c] = band;
      }
    }

    // --- body ---
    for (let i = 0; i < bodyRows; i++) {
      const r = PEAK_ROWS + i;
      const bt = i / (bodyRows - 1);
      const eased = easeOutCubic(bt);
      // pinch the flame back in right before it meets the logs, so the
      // log caps below visibly splay out wider than the flame's base
      const waist = bt > 0.88 ? lerp(1, 0.72, (bt - 0.88) / 0.12) : 1;
      const notch = BODY_NOTCHES[Math.min(i, BODY_NOTCHES.length - 1)] || 0;
      const flicker = Math.sin(time * 0.0022 + r * 0.9) * 0.5 + Math.sin(time * 0.0037 + r * 1.6) * 0.3;
      const halfWidth = (lerp(3.2, center - 0.4, eased) + notch) * waist + flicker;

      // tapered white-hot core: narrow at the top and bottom of its
      // range, widest in the middle — reads as a small flame-within-the-
      // flame instead of a flat disc
      const coreShape = hump((bt - 0.28) / 0.56);
      const corePulse = 1 + Math.sin(time * 0.005 + i) * 0.12;
      const coreHalf = halfWidth * 0.34 * coreShape * corePulse;

      for (let c = 0; c < cols; c++) {
        const dist = Math.abs(c - center);
        if (dist > halfWidth) continue;
        const edgeFrac = dist / Math.max(halfWidth, 0.001);

        let band;
        if (edgeFrac > 0.82) band = 'band1';
        else if (edgeFrac > 0.52) band = 'band2';
        else if (edgeFrac > 0.28) band = 'band3';
        else band = 'band4';

        if (dist < coreHalf) band = 'band5';

        grid[r][c] = band;
      }
    }

    // outline: empty cells touching a flame cell
    for (let r = 0; r < flameRows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c]) continue;
        const up = grid[r - 1]?.[c];
        const down = grid[r + 1]?.[c];
        const left = grid[r][c - 1];
        const right = grid[r][c + 1];
        if (
          (up && up !== 'outline') ||
          (down && down !== 'outline') ||
          (left && left !== 'outline') ||
          (right && right !== 'outline')
        ) {
          grid[r][c] = 'outline';
        }
      }
    }

    // --- logs: five individual logs, caps splayed wide at the top of the
    // log region, bodies angling inward as they descend, crossing near
    // the bottom center — a teepee lay, not a flat log "bed" ---
    const logStart = flameRows;
    const logRows = rows - logStart;
    const capFractions = [0.06, 0.28, 0.5, 0.72, 0.94];
    const logs = capFractions.map((f) => {
      const cap = f * (cols - 1);
      // drift gently toward center, don't funnel all the way to a point —
      // each log stays a distinct, mostly-vertical shape
      return { cap, target: lerp(cap, center, 0.32) };
    });
    for (const log of logs) {
      for (let j = 0; j < logRows; j++) {
        const jt = j / Math.max(1, logRows - 1);
        const colF = lerp(log.cap, log.target, jt);
        const col = Math.round(colF);
        for (let dc = -1; dc <= 1; dc++) {
          const c = col + dc;
          if (c < 0 || c >= cols) continue;
          const r = logStart + j;
          // highlight down each log's own center, shadow at its own edges —
          // a per-log cylindrical read, independent of where it sits
          grid[r][c] = dc === 0 ? 'logLight' : 'logDark';
        }
      }
      // wood-grain cap at the top of the log, wider than the body
      const r0 = logStart;
      const c0 = Math.round(log.cap);
      for (let dc = -1; dc <= 1; dc++) {
        if (grid[r0]) grid[r0][c0 + dc] = 'logCap';
        if (grid[r0 + 1]) grid[r0 + 1][c0 + dc] = 'logCap';
      }
      if (grid[r0]) grid[r0][c0] = 'logCapRing';
    }
    for (let r = logStart; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c]) continue;
        const up = grid[r - 1]?.[c];
        const left = grid[r][c - 1];
        const right = grid[r][c + 1];
        if ((up && up !== 'outline') || (left && left !== 'outline') || (right && right !== 'outline')) {
          grid[r][c] = 'outline';
        }
      }
    }

    return grid;
  }

  onMount(() => {
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    let frameId;
    let lastTime = 0;
    function loop(time) {
      // ~12fps — a flame flickers, it doesn't need 60fps to read as alive
      if (time - lastTime > 80) {
        lastTime = time;
        const grid = buildFireGrid(width, height, time);
        ctx.clearRect(0, 0, width, height);
        for (let r = 0; r < height; r++) {
          for (let c = 0; c < width; c++) {
            const key = grid[r][c];
            if (!key) continue;
            ctx.fillStyle = PALETTE[key];
            ctx.fillRect(c, r, 1, 1);
          }
        }
      }
      frameId = requestAnimationFrame(loop);
    }
    frameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frameId);
  });
</script>

<div class="fire-container">
  <canvas
    bind:this={canvas}
    class="pixel-fire"
    style="aspect-ratio: {width} / {height};"
    aria-hidden="true"
  ></canvas>
</div>

<style>
  .fire-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .pixel-fire {
    width: min(80vw, 420px);
    height: auto;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
    filter: drop-shadow(0 0 22px rgba(255, 120, 20, 0.35));
  }
</style>
