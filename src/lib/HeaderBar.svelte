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

  <button type="button" class="block block-theme" on:click={toggleTheme} aria-label={$isDark ? 'Switch to DAY theme' : 'Switch to NIGHT theme'} title="Switch between Light and Dark mode">
    <span class="theme-icon">{$isDark ? '🌙' : '☀️'}</span>
    <span class="theme-label">{$isDark ? 'NIGHT' : 'DAY'}</span>
  </button>

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
    z-index: 0;
    display: flex;
    width: 100%;
    height: clamp(54px, 9.5vh, 74px);
    font-family: var(--display);
    color: #fff;
    overflow: hidden;
    border-radius: 12px 12px 0 0;
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
    background: rgba(15, 17, 21, 0.9);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-right: 1px solid rgba(255, 255, 255, 0.16);
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
    background: rgba(15, 17, 21, 0.9);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-right: 1px solid rgba(255, 255, 255, 0.16);
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

  .block-theme {
    background: rgba(0, 191, 255, 0.88);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    color: #fff;
    border-left: 1px solid rgba(255, 255, 255, 0.25);
    border-right: 1px solid rgba(255, 255, 255, 0.25);
    border-top: none;
    border-bottom: none;
    cursor: pointer;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    gap: 0.25em;
    padding: 0 clamp(0.7rem, 2.5vw, 1.4rem);
    transition: background 0.3s ease, color 0.3s ease, transform 0.15s ease;
  }
  .block-theme:hover {
    background: var(--pink, #fc9ce0);
    color: var(--ink, #181818);
  }
  .block-theme:active {
    transform: scale(0.95);
  }
  .theme-icon {
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    line-height: 1;
  }
  .theme-label {
    font-family: var(--sans);
    font-weight: 700;
    font-size: clamp(0.4rem, 0.9vw, 0.55rem);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .block-logo {
    background: var(--bg);
    flex: 0 0 auto;
    flex-direction: row;
    align-items: center;
    gap: 0.4rem;
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
    color: var(--ink);
    letter-spacing: -0.04em;
  }
  .meta {
    font-family: var(--sans);
    font-size: clamp(0.4rem, 0.9vw, 0.55rem);
    font-weight: 600;
    color: #6b6b6b;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
</style>
