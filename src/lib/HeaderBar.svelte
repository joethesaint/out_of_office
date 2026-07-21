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
      <span class="icon-wrap" data-theme={$isDark ? 'dark' : 'light'}>
        <svg class="theme-icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" />
          <line x1="12" y1="2" x2="12" y2="4.6" />
          <line x1="12" y1="19.4" x2="12" y2="22" />
          <line x1="2" y1="12" x2="4.6" y2="12" />
          <line x1="19.4" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="6.75" y2="6.75" />
          <line x1="17.25" y1="17.25" x2="19.07" y2="19.07" />
          <line x1="4.93" y1="19.07" x2="6.75" y2="17.25" />
          <line x1="17.25" y1="6.75" x2="19.07" y2="4.93" />
        </svg>
        <svg class="theme-icon moon-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.2 14.7A8.6 8.6 0 1 1 9.3 3.8a7 7 0 0 0 10.9 10.9z" />
          <circle cx="18.2" cy="6.1" r="0.9" />
          <circle cx="15" cy="3.4" r="0.55" />
        </svg>
      </span>
    </button>
  </div>

  <a href="#/about" class="block block-logo" title="What We Are">
    <span class="status-dot" aria-hidden="true"></span>
    <div class="wordmark-col">
      <span class="wordmark">ooo</span>
      <span class="meta">Lagos</span>
    </div>
  </a>
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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: clamp(0.9rem, 1.8vw, 1.1rem);
    height: clamp(0.9rem, 1.8vw, 1.1rem);
  }
  .theme-icon {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transition: opacity var(--dur-base) var(--ease-out-expo),
                transform var(--dur-base) var(--ease-out-expo);
  }
  /* Sun reads danfo-warm, moon reads sea-calm — the same chaos->calm color
     arc as the notification pill, carried into the theme switch. */
  .sun-icon {
    color: var(--chaos-yellow);
  }
  .moon-icon {
    color: var(--blue, #00bfff);
  }
  .icon-wrap[data-theme="light"] .sun-icon {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
  .icon-wrap[data-theme="light"] .moon-icon {
    opacity: 0;
    transform: rotate(45deg) scale(0.5);
  }
  .icon-wrap[data-theme="dark"] .sun-icon {
    opacity: 0;
    transform: rotate(-45deg) scale(0.5);
  }
  .icon-wrap[data-theme="dark"] .moon-icon {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }

  .block-logo {
    background: transparent;
    flex-direction: row;
    align-items: center;
    gap: 0.6em;
    flex: 0 0 auto;
    cursor: pointer;
    text-decoration: none;
    transition: opacity 0.2s ease;
  }
  .block-logo:hover {
    opacity: 0.7;
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
    font-size: clamp(1.2rem, 3.5vw, 1.8rem);
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.04em;
  }
  .meta {
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
