<script>
  import RotatingCube from './lib/RotatingCube.svelte';
</script>

<main>
  <div class="grain"></div>
  <div class="hero">
    <p class="eyebrow">Auto-reply for real life</p>
    <h1 class="wordmark">Out of Office</h1>
    <div class="stage">
      <RotatingCube />
    </div>
    <p class="tagline">Release. Unwind. Reconnect.</p>
  </div>
</main>

<style>
  :global(html, body) {
    margin: 0;
    height: 100%;
    background: #f6f4f1;
  }
  main {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .grain {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.05;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .hero {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 3rem 1.5rem;
  }
  .eyebrow {
    margin: 0;
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #08cabd;
    font-weight: 500;
  }
  .wordmark {
    margin: 0;
    font-family: 'Fredoka', system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(2.75rem, 9vw, 5.5rem);
    color: #00bfff;
    line-height: 0.95;
    text-align: center;
  }
  .stage {
    width: min(60vh, 80vw);
    height: min(60vh, 80vw);
    margin: -1rem 0;
  }
  .tagline {
    margin: 0;
    font-family: 'Space Grotesk', system-ui, sans-serif;
    font-size: 1rem;
    letter-spacing: 0.04em;
    color: #181818;
  }
</style>
