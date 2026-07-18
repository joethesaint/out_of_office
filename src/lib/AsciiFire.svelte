<script>
  import { onMount } from 'svelte';

  export let width = 70;
  export let height = 35;

  // AsciiGen reverse string for bright-on-dark mapping, padded to 36 levels
  // Original reverse: " .:-=+*#%@" (10 chars)
  // We'll expand it to 36 indices for smoother heat mapping
  const baseChars = " .:-=+*#%@";
  const chars = Array.from({length: 36}, (_, i) => {
    const idx = Math.min(baseChars.length - 1, Math.floor((i / 35) * baseChars.length));
    return baseChars[idx];
  });

  let firePixels = Array(width * height).fill(0);
  let asciiText = "";

  // Initialize the bottom row to create a bonfire shape
  // Center is white-hot (35), tapering off at the edges
  for (let x = 0; x < width; x++) {
    const dist = Math.abs(x - width / 2);
    const bottomIndex = (height - 1) * width + x;
    if (dist < 8) {
      firePixels[bottomIndex] = 35; // Core
    } else if (dist < 15) {
      firePixels[bottomIndex] = 35 - (dist - 8) * 3; // Tapering
    } else {
      firePixels[bottomIndex] = 0;
    }
  }

  function doFire() {
    // Doom fire algorithm
    for (let x = 0; x < width; x++) {
      for (let y = 1; y < height; y++) {
        const src = y * width + x;
        const heat = firePixels[src];

        if (heat === 0) {
          if (src - width >= 0) firePixels[src - width] = 0;
        } else {
          const randIdx = Math.floor(Math.random() * 3);
          const dst = src - width - randIdx + 1;
          if (dst >= 0 && dst < width * height) {
            firePixels[dst] = Math.max(0, heat - (randIdx & 1));
          }
        }
      }
    }

    // Render to text
    let lines = [];
    for (let y = 0; y < height; y++) {
      let row = "";
      for (let x = 0; x < width; x++) {
        const heat = firePixels[y * width + x];
        row += chars[heat] || " ";
      }
      lines.push(row);
    }
    // We can cut off the bottom-most row since it's perfectly flat
    asciiText = lines.slice(0, height - 1).join("\n");
  }

  onMount(() => {
    let frameId;
    let lastTime = 0;
    // Throttle to ~30fps for authentic retro feel
    function loop(time) {
      if (time - lastTime > 40) {
        doFire();
        lastTime = time;
      }
      frameId = requestAnimationFrame(loop);
    }
    frameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frameId);
  });
</script>

<div class="fire-container">
  <pre class="ascii-fire" aria-hidden="true">{asciiText}</pre>
</div>

<style>
  .fire-container {
    display: flex;
    justify-content: center;
    width: 100%;
    overflow: hidden;
  }
  .ascii-fire {
    font-family: var(--mono, monospace);
    font-size: clamp(0.6rem, 1.5vw, 1.2rem);
    line-height: 0.85; /* Tight vertical spacing for continuous ascii */
    font-weight: bold;
    text-align: center;
    white-space: pre;
    margin: 0;
    /* Gradient mapping heat to color */
    background: linear-gradient(0deg, #ffcc00 0%, #ff3e00 40%, rgba(255,62,0,0.5) 70%, transparent 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 8px rgba(255, 62, 0, 0.4));
  }
</style>
