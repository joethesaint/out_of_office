<script>
  import { isDark, toggleTheme } from './theme.js';
</script>

<header class="bar">
  <div class="block block-brand">
    <span class="line">STATUS:</span>
    <span class="line">AWAY</span>
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

  .block-theme {
    background: var(--ink);
    color: var(--bg);
    border: none;
    cursor: pointer;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    gap: 0.15em;
    padding: 0 clamp(0.6rem, 2.2vw, 1.2rem);
    transition: background 0.3s ease, color 0.3s ease, transform 0.15s ease;
  }
  .block-theme:hover {
    background: var(--blue);
    color: #fff;
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
    background: #d9a441;
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
