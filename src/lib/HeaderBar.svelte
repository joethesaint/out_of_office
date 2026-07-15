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
      <span class="theme-label">{$isDark ? 'NIGHT' : 'DAY'}</span>
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
    width: auto;
    margin: clamp(0.6rem, 1.8vh, 1.2rem) clamp(0.6rem, 2vw, 1.2rem) clamp(0.8rem, 2vh, 1.4rem);
    min-height: clamp(58px, 9.5vh, 76px);
    font-family: var(--display);
    color: #fff;
    background: rgba(15, 17, 21, 0.9);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 16px;
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.42);
    overflow: hidden;
  }

  .block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 clamp(0.6rem, 2.2vw, 1.2rem);
    white-space: nowrap;
  }

  .block-brand {
    background: transparent;
    border-right: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;
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
    background: #08cabd;
    box-shadow: 0 0 8px #08cabd, 0 0 14px rgba(8, 202, 189, 0.6);
    animation: dotPulse 2s infinite ease-in-out;
  }
  @keyframes dotPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.6; }
  }
  .block-brand .line {
    font-size: clamp(0.6rem, 1.6vw, 0.85rem);
    letter-spacing: 0.04em;
    color: #e2e8f0;
  }
  .block-brand .status-val {
    font-size: clamp(0.85rem, 2.2vw, 1.15rem);
    font-weight: 700;
    color: var(--blue, #00bfff);
  }

  .block-trend {
    background: transparent;
    border-right: 1px solid rgba(255, 255, 255, 0.15);
    color: #ffffff;
    flex: 1 1 auto;
    align-items: center;
    text-align: center;
    gap: 0.1em;
  }
  .block-trend .tag {
    font-family: var(--sans);
    font-weight: 700;
    font-size: clamp(0.45rem, 1.1vw, 0.6rem);
    color: var(--blue, #00bfff);
    letter-spacing: 0.08em;
  }
  .block-trend .word {
    font-size: clamp(0.85rem, 2.4vw, 1.3rem);
    color: #ffffff;
  }
  .block-trend .sub {
    font-family: var(--sans);
    font-weight: 600;
    font-size: clamp(0.4rem, 1vw, 0.55rem);
    letter-spacing: 0.12em;
    color: #cfcfcf;
  }

  .theme-control-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 clamp(0.5rem, 1.8vw, 1.1rem);
    background: transparent;
    border-right: 1px solid rgba(255, 255, 255, 0.15);
    flex: 0 0 auto;
  }

  .island-switch-pill {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    background: rgba(0, 191, 255, 0.22);
    color: #fff;
    border: 1px solid rgba(0, 191, 255, 0.65);
    border-radius: 999px;
    padding: 0.42rem 1.15rem;
    cursor: pointer;
    font-family: var(--sans);
    font-weight: 700;
    font-size: clamp(0.7rem, 1.3vw, 0.85rem);
    letter-spacing: 0.1em;
    box-shadow: 0 4px 14px rgba(0, 191, 255, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: background 0.3s ease, border-color 0.3s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  }

  .island-switch-pill:hover {
    background: var(--blue, #00bfff);
    border-color: #fff;
    color: #fff;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 8px 24px rgba(0, 191, 255, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }

  .island-switch-pill:active {
    transform: translateY(0) scale(0.94);
  }

  .icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.15em;
    line-height: 1;
  }

  .theme-label {
    line-height: 1;
  }

  .block-logo {
    background: rgba(255, 255, 255, 0.05);
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    gap: 0.45rem;
  }
  .status-dot {
    width: clamp(7px, 1.4vw, 9px);
    height: clamp(7px, 1.4vw, 9px);
    border-radius: 50%;
    background: var(--blue);
  }
  .wordmark-col {
    display: flex;
    flex-direction: column;
    line-height: 0.9;
  }
  .wordmark {
    font-family: var(--display);
    font-size: clamp(1.1rem, 3vw, 1.6rem);
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.04em;
  }
  .meta {
    font-family: var(--sans);
    font-size: clamp(0.4rem, 0.9vw, 0.55rem);
    font-weight: 600;
    color: #b0b0b0;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  @media (max-width: 650px) {
    .bar {
      margin: 0.4rem;
      border-radius: 12px;
    }
    .block {
      padding: 0 0.45rem;
    }
    .theme-control-wrap {
      padding: 0 0.4rem;
    }
    .island-switch-pill {
      padding: 0.32rem 0.75rem;
      gap: 0.3rem;
    }
  }
</style>
