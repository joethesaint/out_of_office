<script>
  import { onMount, onDestroy } from "svelte";
  import RotatingCube from "./lib/RotatingCube.svelte";
  import HeaderBar from "./lib/HeaderBar.svelte";
  import FooterBar from "./lib/FooterBar.svelte";
  import BootSequence from "./lib/BootSequence.svelte";
  import Postcard from "./lib/Postcard.svelte";
  import EscapeMetrics from "./lib/EscapeMetrics.svelte";
  import Community from "./lib/Community.svelte";
  import MemoryTimeline from "./lib/MemoryTimeline.svelte";
  import Playlist from "./lib/Playlist.svelte";
  import Tickets from "./lib/Tickets.svelte";

  let scrollTrack;
  let progress = 0;

  function updateProgress() {
    if (!scrollTrack) return;
    const rect = scrollTrack.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    if (total <= 0) {
      progress = 1;
      return;
    }
    progress = Math.max(0, Math.min(1, -rect.top / total));
  }

  onMount(() => {
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  });
  onDestroy(() => {
    window.removeEventListener("scroll", updateProgress);
    window.removeEventListener("resize", updateProgress);
  });

  $: activated = progress >= 0.995;
</script>

<BootSequence />

<div class="scroll-track" bind:this={scrollTrack}>
  <div class="pinned">
    <div class="stage-wrap">
      <div class="grain"></div>
      <main class="frame">
        <HeaderBar />

        <div class="hero">
          <button class="icon-btn icon-heart" aria-label="Like">
            <svg viewBox="0 0 24 24"
              ><path
                fill="#00bfff"
                d="M12 21s-7.5-4.6-10.2-9.3C-.1 8.1 1.4 4 5.3 3.2c2.1-.4 4.1.5 5.3 2.2C11.8 3.7 13.8 2.8 15.9 3.2c3.9.8 5.4 4.9 3.5 8.5C19.5 16.4 12 21 12 21z"
              /></svg
            >
          </button>
          <button class="icon-btn icon-share" aria-label="Share">
            <svg viewBox="0 0 24 24"
              ><path
                fill="none"
                stroke="#181818"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 15c0-5 3-8 8-8m0 0V3l6 5-6 5V9"
              /></svg
            >
          </button>

          <div class="hero-row">
            <div class="headline">
              <span class="eyebrow">Auto-reply for real life</span>
              <div class="stack">
                <span class="word">OUT OF</span>
                <span class="word">OFFICE</span>
              </div>
              <div class="subhead">
                <span class="stamp">OOO 002</span>
                <span class="venue">Tarkwa Bay · Apr 11</span>
              </div>
              <div class="tagline">
                <span>Release. Unwind. Reconnect.</span>
                <span class="sub">Auto replies enabled. Stress disabled.</span>
              </div>
            </div>
            <div class="cube-slot">
              <RotatingCube {progress} />
            </div>
          </div>
        </div>

        <FooterBar />
      </main>
    </div>
  </div>
</div>

<section class="activated" class:visible={activated}>
  <p class="activated-eyebrow">Status update</p>
  <h2 class="activated-title">Out of Office Activated</h2>
  <p class="activated-sub">You've found a little order and peace.</p>
</section>

<Postcard />
<EscapeMetrics />
<Community />
<MemoryTimeline />
<Playlist />
<Tickets />

<style>
  .scroll-track {
    position: relative;
    height: 220vh;
  }

  .pinned {
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .stage-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
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

  .frame {
    position: relative;
    width: min(94vw, 900px);
    aspect-ratio: 16 / 9;
    max-height: 92vh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.16);
  }

  @media (max-width: 700px) {
    .stage-wrap {
      padding: 0;
    }
    .frame {
      width: 100vw;
      height: 100vh;
      aspect-ratio: auto;
      border-radius: 0;
      box-shadow: none;
    }
    .hero-row {
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;
    }
    .cube-slot {
      margin-left: 0;
    }
  }

  .hero {
    position: relative;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    padding: 0 clamp(1.25rem, 5vw, 3rem);
    overflow: hidden;
  }

  .hero-row {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(0.5rem, 2vw, 1.5rem);
    width: 100%;
  }

  .icon-btn {
    position: absolute;
    top: clamp(0.75rem, 2.5vh, 1.5rem);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    width: clamp(26px, 6vw, 34px);
    height: clamp(26px, 6vw, 34px);
  }
  .icon-btn svg {
    width: 100%;
    height: 100%;
  }
  .icon-heart {
    left: clamp(0.75rem, 4vw, 1.5rem);
  }
  .icon-share {
    right: clamp(0.75rem, 4vw, 1.5rem);
  }

  .headline {
    display: flex;
    flex-direction: column;
    gap: clamp(0.5rem, 1.5vh, 0.9rem);
  }

  .eyebrow {
    font-family: var(--sans);
    font-weight: 600;
    font-size: clamp(0.6rem, 1.8vw, 0.8rem);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
  }

  .stack {
    position: relative;
    display: flex;
    flex-direction: column;
    line-height: 0.95;
  }
  .stack .word {
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(2.6rem, 12vw, 4.2rem);
    color: var(--blue);
    letter-spacing: -0.01em;
  }

  .subhead {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
  }
  .subhead .stamp {
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(1rem, 4vw, 1.4rem);
    color: var(--ink);
  }
  .subhead .venue {
    font-family: var(--sans);
    font-weight: 500;
    font-size: clamp(0.75rem, 3vw, 1rem);
    color: #5a5a5a;
  }

  .tagline {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-family: var(--sans);
    font-size: clamp(0.7rem, 2vw, 0.9rem);
    color: var(--ink);
  }
  .tagline .sub {
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-size: clamp(0.5rem, 1.6vw, 0.65rem);
    font-weight: 600;
    color: #6b6b6b;
  }

  .cube-slot {
    position: relative;
    z-index: 2;
    flex: none;
    pointer-events: auto;
    width: clamp(150px, 20vw, 260px);
    height: clamp(150px, 20vw, 260px);
    /* sits to the right of "OUT OF / OFFICE" in its own flex column, with
       a small negative margin so it only nudges into the empty space past
       the text rather than ever covering a letter — the landscape frame
       gives it room to sit clear of the words instead of overlapping them */
    margin-left: clamp(-1.5rem, -3vw, -0.5rem);
  }

  .activated {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    text-align: center;
    padding: 2rem;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .activated.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .activated-eyebrow {
    margin: 0;
    font-family: var(--sans);
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
  }
  .activated-title {
    margin: 0;
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(2rem, 7vw, 3.2rem);
    color: var(--blue);
  }
  .activated-sub {
    margin: 0;
    font-family: var(--sans);
    color: var(--ink);
  }
</style>
