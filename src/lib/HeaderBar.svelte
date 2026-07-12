<script>
</script>

<header class="bar">
  <div class="block block-brand">
    <span class="line">CRUSH ON</span>
    <span class="line">BOW</span>
  </div>

  <div class="block block-trend">
    <span class="tag">NEW TREND</span>
    <span class="butterfly">BUTTERFLY</span>
    <span class="sub">ORIGINAL WILD</span>
  </div>

  <div class="block block-logo">
    <svg class="bow-mark" viewBox="0 0 32 20" aria-hidden="true">
      <path d="M14 10 3 3v14z" fill="#e85d75" />
      <path d="M18 10 29 3v14z" fill="#e85d75" />
      <circle cx="16" cy="10" r="3.2" fill="#fff" stroke="#e85d75" stroke-width="1.4" />
    </svg>
    <div class="wordmark-col">
      <span class="wordmark">bow</span>
      <span class="cn">蝴蝶结原创</span>
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
    font-weight: 800;
    font-size: clamp(0.45rem, 1.1vw, 0.6rem);
    color: var(--pink);
    letter-spacing: 0.08em;
  }
  .block-trend .butterfly {
    font-size: clamp(0.85rem, 2.4vw, 1.3rem);
  }
  .block-trend .sub {
    font-family: var(--sans);
    font-weight: 700;
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
  .bow-mark {
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
  .cn {
    font-family: var(--sans);
    font-size: clamp(0.4rem, 0.9vw, 0.5rem);
    color: #6b6b6b;
    letter-spacing: 0.05em;
  }
</style>
