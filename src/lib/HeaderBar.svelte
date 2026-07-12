<script>
</script>

<header class="bar">
  <div class="block block-brand">
    <span class="line">STATUS:</span>
    <span class="line">AWAY</span>
  </div>

  <div class="block block-trend">
    <span class="tag">NOW ACTIVE</span>
    <span class="word">ESCAPE</span>
    <span class="sub">LAGOS TO TARKWA</span>
  </div>

  <div class="block block-logo">
    <svg class="ooo-mark" viewBox="0 0 32 20" aria-hidden="true">
      <circle cx="8" cy="10" r="6.5" fill="none" stroke="#00bfff" stroke-width="1.6" />
      <circle cx="16" cy="10" r="6.5" fill="none" stroke="#08cabd" stroke-width="1.6" />
      <circle cx="24" cy="10" r="6.5" fill="none" stroke="#181818" stroke-width="1.6" />
    </svg>
    <div class="wordmark-col">
      <span class="wordmark">ooo</span>
      <span class="meta">Lagos</span>
    </div>
  </div>
</header>

<style>
  .bar {
    display: flex;
    width: 100%;
    height: clamp(52px, 9vh, 72px);
    font-family: var(--display);
    color: #fff;
    overflow: hidden;
  }

  .block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 clamp(0.5rem, 2vw, 1rem);
    white-space: nowrap;
  }

  .block-brand {
    background: var(--ink);
    flex: 0 0 auto;
    line-height: 1;
    gap: 0.15em;
  }
  .block-brand .line {
    font-size: clamp(0.6rem, 1.6vw, 0.85rem);
    letter-spacing: 0.01em;
  }

  .block-trend {
    background: var(--ink);
    flex: 1 1 auto;
    align-items: center;
    text-align: center;
    gap: 0.1em;
  }
  .block-trend .tag {
    font-family: var(--sans);
    font-weight: 700;
    font-size: clamp(0.45rem, 1.1vw, 0.6rem);
    color: var(--blue);
    letter-spacing: 0.08em;
  }
  .block-trend .word {
    font-size: clamp(0.85rem, 2.4vw, 1.3rem);
  }
  .block-trend .sub {
    font-family: var(--sans);
    font-weight: 600;
    font-size: clamp(0.4rem, 1vw, 0.55rem);
    letter-spacing: 0.12em;
    color: #cfcfcf;
  }

  .block-logo {
    background: var(--bg);
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    gap: 0.4rem;
  }
  .ooo-mark {
    width: clamp(20px, 4vw, 28px);
    height: auto;
    flex: none;
  }
  .wordmark-col {
    display: flex;
    flex-direction: column;
    line-height: 1;
    gap: 0.15em;
  }
  .wordmark {
    color: var(--ink);
    font-size: clamp(0.9rem, 2.2vw, 1.2rem);
    text-transform: lowercase;
  }
  .meta {
    font-family: var(--sans);
    font-size: clamp(0.4rem, 0.9vw, 0.5rem);
    color: #6b6b6b;
    letter-spacing: 0.05em;
  }
</style>
