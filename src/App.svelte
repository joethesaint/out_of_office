<script>
  import RotatingCube from "./lib/RotatingCube.svelte";
  import HeaderBar from "./lib/HeaderBar.svelte";
  import FooterBar from "./lib/FooterBar.svelte";
</script>

<div class="stage-wrap">
  <main class="frame">
    <HeaderBar />

    <div class="hero">
      <button class="icon-btn icon-heart" aria-label="Like">
        <svg viewBox="0 0 24 24"
          ><path
            fill="#e85d75"
            d="M12 21s-7.5-4.6-10.2-9.3C-.1 8.1 1.4 4 5.3 3.2c2.1-.4 4.1.5 5.3 2.2C11.8 3.7 13.8 2.8 15.9 3.2c3.9.8 5.4 4.9 3.5 8.5C19.5 16.4 12 21 12 21z"
          /></svg
        >
      </button>
      <button class="icon-btn icon-share" aria-label="Share">
        <svg viewBox="0 0 24 24"
          ><path
            fill="none"
            stroke="#111"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 15c0-5 3-8 8-8m0 0V3l6 5-6 5V9"
          /></svg
        >
      </button>

      <div class="headline">
        <span class="eyebrow">CHINESE VALENTINE'S DAY</span>
        <div class="stack">
          <span class="word">CRUSH</span>
          <span class="word">ON</span>
          <span class="word">BOW</span>
          <div class="cube-slot">
            <RotatingCube />
          </div>
        </div>
        <div class="subhead">
          <span class="year">2020</span>
          <span class="soon">COMING SOON</span>
        </div>
        <div class="tagline">
          <span>LOVE IS SUPREME, PLAYERS GATHER</span>
          <span class="cn">热爱至上 玩家集结</span>
        </div>
      </div>
    </div>

    <FooterBar />
  </main>
</div>

<style>
  .stage-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
  }

  .frame {
    width: min(100%, 480px);
    aspect-ratio: 9 / 16;
    max-height: 100vh;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 40px 100px rgba(0, 0, 0, 0.55);
  }

  @media (max-width: 480px) {
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
  }

  .hero {
    position: relative;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    padding: 0 clamp(1rem, 6vw, 2rem);
    overflow: hidden;
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
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: clamp(0.5rem, 1.5vh, 0.9rem);
  }

  .eyebrow {
    font-family: var(--sans);
    font-weight: 800;
    font-size: clamp(0.6rem, 1.8vw, 0.8rem);
    letter-spacing: 0.06em;
    color: var(--pink);
  }

  .stack {
    position: relative;
    display: flex;
    flex-direction: column;
    line-height: 0.92;
  }
  .stack .word {
    font-family: var(--display);
    font-size: clamp(2.6rem, 12vw, 4.2rem);
    color: var(--ink);
    letter-spacing: -0.01em;
  }

  .subhead {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }
  .subhead .year {
    font-family: var(--display);
    font-size: clamp(1.1rem, 4.5vw, 1.6rem);
    color: var(--ink);
  }
  .subhead .soon {
    font-family: var(--sans);
    font-weight: 600;
    font-size: clamp(0.75rem, 3vw, 1rem);
    color: #4a4a4a;
  }

  .tagline {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-family: var(--sans);
    font-weight: 700;
    font-size: clamp(0.5rem, 1.6vw, 0.65rem);
    color: #4a4a4a;
  }
  .tagline .cn {
    letter-spacing: 0.15em;
  }

  .cube-slot {
    position: absolute;
    z-index: 2;
    pointer-events: auto;
    width: clamp(180px, 48vw, 260px);
    height: clamp(180px, 48vw, 260px);
    /* anchored on the ON / BOW boundary (2nd of 3 stacked lines) so it
       overlaps ON above and BOW below, per the source design spec */
    top: 63%;
    left: 62%;
    transform: translate(-50%, -50%);
  }
</style>
