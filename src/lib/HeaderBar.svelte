<script>
  import { isDark, toggleTheme } from './theme.js';
</script>

<header class="bar">
  <div class="block block-brand">
    <div class="status-row">
      <span class="live-indicator" aria-hidden="true"></span>
      <span class="line">STATUS:</span>
    </div>
    <span class="line status-val">AWAY</span>
  </div>

  <div class="block block-trend">
    <span class="tag">AUTO-REPLY</span>
    <span class="word">ENABLED</span>
    <span class="sub">MAINLAND &rarr; ISLAND</span>
  </div>

  <!-- Integrated Phone UI Day/Night Control beside the topbar -->
  <div class="theme-control-wrap">
    <button
      type="button"
      class="island-switch-pill"
      on:click={toggleTheme}
      aria-label={$isDark ? 'Switch to DAY theme' : 'Switch to NIGHT theme'}
      title="Switch between Light and Dark mode"
    >
      <span class="icon-wrap">
        <span class="theme-icon" aria-hidden="true">{$isDark ? '🌙' : '☀️'}</span>
      </span>
    </button>
  </div>

  <div class="block block-logo">
    <span class="status-dot" aria-hidden="true"></span>
    <div class="wordmark-col">
      <span class="wordmark">ooo</span>
      <span class="meta">Lagos</span>
    </div>
  </div>
</header>

<style>
  .bar {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: stretch;
    width: 100%;
    margin: 0;
    min-height: clamp(58px, 9.5vh, 76px);
    font-family: var(--display);
    color: var(--ink);
    background: transparent;
    border-bottom: 2px solid var(--ink);
    border-radius: 0;
  }

  .block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 clamp(1rem, 2.5vw, 1.5rem);
    white-space: nowrap;
  }

  .block-brand {
    border-right: 2px solid var(--ink);
    flex: 0 0 auto;
    line-height: 1;
    gap: 0.2em;
  }
  .status-row {
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
  .live-indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--blue, #00bfff);
    box-shadow: 0 0 8px var(--blue, #00bfff);
    animation: dotPulse 2s infinite ease-in-out;
  }
  @keyframes dotPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.6; }
  }
  .block-brand .line {
    font-size: clamp(0.65rem, 1.6vw, 0.85rem);
    letter-spacing: 0.08em;
    color: var(--muted);
    font-family: var(--sans);
    font-weight: 700;
  }
  .block-brand .status-val {
    font-size: clamp(0.9rem, 2.2vw, 1.25rem);
    font-weight: 700;
    color: var(--ink);
  }

  .block-trend {
    border-right: 2px solid var(--ink);
    flex: 1 1 auto;
    align-items: center;
    text-align: center;
    gap: 0.1em;
  }
  .block-trend .tag {
    font-family: var(--sans);
    font-weight: 700;
    font-size: clamp(0.45rem, 1.1vw, 0.6rem);
    color: var(--pink-deep);
    letter-spacing: 0.15em;
  }
  .block-trend .word {
    font-size: clamp(0.9rem, 2.4vw, 1.4rem);
    color: var(--ink);
    font-weight: 700;
  }
  .block-trend .sub {
    font-family: var(--sans);
    font-weight: 600;
    font-size: clamp(0.4rem, 1vw, 0.55rem);
    letter-spacing: 0.12em;
    color: var(--muted);
  }

  .theme-control-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 clamp(0.8rem, 2vw, 1.2rem);
    border-right: 2px solid var(--ink);
    flex: 0 0 auto;
  }

  .island-switch-pill {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: var(--ink);
    border: 2px solid var(--ink);
    width: clamp(28px, 4.5vw, 36px);
    height: clamp(28px, 4.5vw, 36px);
    border-radius: 50%;
    padding: 0;
    cursor: pointer;
    box-shadow: none;
    transition: background 0.2s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .island-switch-pill:hover {
    background: var(--ink);
    color: var(--bg);
    transform: translateY(-2px);
  }

  .island-switch-pill:active {
    transform: translateY(0) scale(0.92);
  }

  .island-switch-pill:focus-visible {
    outline: 2px solid var(--ink);
    outline-offset: 3px;
  }

  .icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(0.9rem, 1.8vw, 1.1rem);
    line-height: 1;
  }

  .block-logo {
    background: transparent;
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    gap: 0.6rem;
  }
  .status-dot {
    width: clamp(8px, 1.6vw, 10px);
    height: clamp(8px, 1.6vw, 10px);
    border-radius: 50%;
    background: var(--pink-deep);
  }
  .wordmark-col {
    display: flex;
    flex-direction: column;
    line-height: 0.9;
  }
  .wordmark {
    font-family: var(--display);
    font-size: clamp(1.2rem, 3.5vw, 1.8rem);
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.04em;
  }
  .meta {
    font-family: var(--sans);
    font-size: clamp(0.45rem, 1vw, 0.6rem);
    font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  @media (max-width: 650px) {
    .block {
      padding: 0 0.8rem;
    }
    .theme-control-wrap {
      padding: 0 0.6rem;
    }
  }
</style>
