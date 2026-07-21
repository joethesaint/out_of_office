<script>
  import { onMount } from 'svelte';

  // Kept for API compatibility with existing callers, but now read as a
  // low-res pixel grid (columns x rows) instead of a monospace character
  // grid — chunky pixel-art blocks, not a Doom-fire text simulation.
  export let width = 29;
  export let height = 32;

  let canvas;

  const PEAK_ROWS = 6; // twin flame-tongue tips at the top
  const LOG_ROWS = 6; // wood-log bed at the bottom

  const PALETTE = {
    outline: '#1a0e07',
    band1: '#c33e18', // outer rim — deep red-orange
    band2: '#f07c1c', // orange
    band3: '#ffb63a', // amber
    band4: '#ffe98a', // bright yellow
    band5: '#fffaf0', // white-hot core
    logBed: '#4a2a15',
    logCap: '#c99a63',
    logCapRing: '#8a5c34',
  };

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // Builds one frame of the pixel grid. `time` (ms) drives a gentle,
  // continuous flicker in the tip height, silhouette edges, and the
  // white-hot core — instead of a full re-scramble every frame, which
  // would read as noise rather than a flame breathing.
  function buildFireGrid(cols, rows, time) {
    const center = (cols - 1) / 2;
    const flameRows = rows - LOG_ROWS;
    const bodyRows = flameRows - PEAK_ROWS;
    const grid = Array.from({ length: rows }, () => Array(cols).fill(null));

    const tipFlicker = Math.sin(time * 0.004) * 0.6;

    // --- twin peaks ---
    for (let r = 0; r < PEAK_ROWS; r++) {
      const t = Math.max(0, Math.min(1, r / (PEAK_ROWS - 1) + tipFlicker * 0.08));
      const peakHalf = lerp(0.6, 2.3, t);
      const gapHalf = lerp(3.4, 0.3, t);
      const wobble = Math.sin(time * 0.003 + r) * 0.35;
      const leftCenter = center - gapHalf - peakHalf + wobble;
      const rightCenter = center + gapHalf + peakHalf - wobble;
      for (let c = 0; c < cols; c++) {
        const dL = Math.abs(c - leftCenter);
        const dR = Math.abs(c - rightCenter);
        const band = t < 0.45 ? 'band1' : 'band2';
        if (dL <= peakHalf) grid[r][c] = band;
        if (dR <= peakHalf) grid[r][c] = band;
      }
    }

    // --- body ---
    for (let i = 0; i < bodyRows; i++) {
      const r = PEAK_ROWS + i;
      const bt = i / (bodyRows - 1);
      const eased = easeOutCubic(bt);
      const jitter =
        Math.sin(time * 0.0022 + r * 0.9) * 1.1 + Math.sin(time * 0.0037 + r * 1.6) * 0.5;
      const halfWidth = lerp(3.2, center - 0.4, eased) + jitter;

      for (let c = 0; c < cols; c++) {
        const dist = Math.abs(c - center);
        if (dist > halfWidth) continue;
        const edgeFrac = dist / Math.max(halfWidth, 0.001);

        let band;
        if (edgeFrac > 0.82) band = 'band1';
        else if (edgeFrac > 0.52) band = 'band2';
        else if (edgeFrac > 0.28) band = 'band3';
        else band = 'band4';

        // white-hot core: a narrow zone in the middle-lower body only —
        // a real flame's hottest point isn't at its very tip or its root
        const corePulse = 0.1 + Math.sin(time * 0.005 + i) * 0.03;
        if (bt > 0.3 && bt < 0.82 && edgeFrac < corePulse + 0.06) band = 'band5';
        if (bt > 0.86 && (band === 'band4' || band === 'band5')) band = 'band3';

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

    // --- log bed ---
    const logStart = flameRows;
    const capCols = [2, 8, 14, 20, 26].map((c) =>
      Math.round((c / 28) * (cols - 1))
    );
    for (let i = 0; i < LOG_ROWS; i++) {
      if (i >= LOG_ROWS - 1) continue; // leave the very bottom row empty
      const r = logStart + i;
      for (let c = 0; c < cols; c++) grid[r][c] = 'logBed';
    }
    // wood-grain end caps: a 3-wide x 2-tall oval with a darker ring dot,
    // like the cut ends visible where each log meets the fire
    for (const cc of capCols) {
      const r = logStart + 1;
      for (let dc = -1; dc <= 1; dc++) {
        if (grid[r]) grid[r][cc + dc] = 'logCap';
        if (grid[r + 1]) grid[r + 1][cc + dc] = 'logCap';
      }
      if (grid[r]) grid[r][cc] = 'logCapRing';
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
