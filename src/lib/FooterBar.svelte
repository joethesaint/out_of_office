<script>
</script>

<footer class="bar">
  <div class="row">
    <div class="block block-left">
      <svg class="arrow" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 6 6 18M6 18h9M6 18V9" fill="none" stroke="#e85d75" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <div class="lines">
        <span class="line">SURPRISE MAKER</span>
        <span class="line">PARTY</span>
      </div>
    </div>

    <div class="block block-right">
      <div class="cn-lines">
        <span class="cn">苏绝场</span>
        <span class="en">SUZHOU</span>
      </div>
      <svg class="diamond" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 1 18 7l-8 12L2 7z" fill="none" stroke="#e85d75" stroke-width="1.3" />
        <path d="M10 1 18 7H2z" fill="none" stroke="#e85d75" stroke-width="1" />
        <path d="M6.5 7 10 19M13.5 7 10 19" fill="none" stroke="#e85d75" stroke-width="0.8" />
      </svg>
    </div>
  </div>

  <p class="fine-print">SHOWING THE MARKED DEPARTURE FROM PREVIOUS EXPERIENCE</p>
</footer>

<style>
  .bar {
    width: 100%;
    padding: clamp(0.6rem, 2vh, 1.1rem) clamp(0.75rem, 3vw, 1.5rem);
    display: flex;
    flex-direction: column;
    gap: clamp(0.4rem, 1.2vh, 0.7rem);
    color: var(--ink);
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .block-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .arrow {
    width: clamp(16px, 3vw, 20px);
    height: auto;
    flex: none;
  }
  .lines {
    display: flex;
    flex-direction: column;
    font-family: var(--display);
    line-height: 1.05;
  }
  .lines .line {
    font-size: clamp(0.55rem, 1.4vw, 0.75rem);
  }

  .block-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .cn-lines {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    line-height: 1.1;
  }
  .cn-lines .cn {
    color: var(--pink);
    font-weight: 700;
    font-size: clamp(0.6rem, 1.5vw, 0.8rem);
  }
  .cn-lines .en {
    font-family: var(--sans);
    font-weight: 700;
    font-size: clamp(0.45rem, 1.1vw, 0.6rem);
    letter-spacing: 0.08em;
    color: #6b6b6b;
  }
  .diamond {
    width: clamp(14px, 2.6vw, 18px);
    height: auto;
    flex: none;
  }

  .fine-print {
    margin: 0;
    text-align: center;
    font-family: var(--sans);
    font-size: clamp(0.35rem, 0.9vw, 0.5rem);
    letter-spacing: 0.15em;
    color: #8a8a8a;
  }
</style>
