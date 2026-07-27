<script>
  import { isDark, toggleTheme } from './theme.js';
  import AudioControlDeck from './AudioControlDeck.svelte';
  import { createDialKit } from 'dialkit/svelte';

  export let onOpenCmdK = () => {};
  export let onOpenDrawer = () => {};
  export let onOpenOooGen = () => {};
  export let onStatusChange = (onlineState) => {};

  // Register Dialkit topbar animation & glass parameters
  const physics = createDialKit('topbar-physics', {
    topPadding: [8, 0, 24],
    glassBlur: [16, 4, 32],
    hoverExpandSpeed: [0.35, 0.1, 1.0],
  });

  let isOnline = false;
  let statusToast = false;
  let statusMessage = '';

  function toggleStatus() {
    isOnline = !isOnline;
    onStatusChange(isOnline);
    statusMessage = isOnline 
      ? 'STATUS: ONLINE ⚡ — Live popups & notifications active!' 
      : 'STATUS: AWAY 🌴 — Disconnected & popups muted.';
    statusToast = true;
    setTimeout(() => { statusToast = false; }, 3200);
  }
</script>

<header class="bar-container" style="--pt: {physics.topPadding}px; --blur: {physics.glassBlur}px; --speed: {physics.hoverExpandSpeed}s;">
  <div class="bar">
    <!-- Clickable Away/Online Status Toggle -->
    <button 
      type="button" 
      class="block block-brand status-btn" 
      class:online={isOnline}
      on:click={toggleStatus} 
      title="Click to toggle status (AWAY ↔ ONLINE)"
      aria-label="Toggle user status"
    >
      <div class="status-row">
        <span class="live-indicator" class:active-online={isOnline} aria-hidden="true"></span>
        <span class="line">STATUS:</span>
      </div>
      <span class="line status-val">{isOnline ? 'ONLINE ⚡' : 'AWAY'}</span>
    </button>

    <!-- Mainland -> Island Trend Pill -->
    <div class="block block-trend">
      <span class="tag">AUTO-REPLY</span>
      <span class="word">ENABLED</span>
      <span class="sub">MAINLAND &rarr; ISLAND</span>
    </div>

    <!-- Icon-Only Action Navigation with Hover Label Expansion -->
    <nav class="actions-wrap" aria-label="Main Navigation">
      <button type="button" class="action-pill cmd-pill" on:click={onOpenCmdK} title="Quick Command Palette (⌘K)">
        <span class="pill-icon">🔍</span>
        <span class="pill-label">⌘K Command</span>
      </button>

      <button type="button" class="action-pill drawer-pill" on:click={onOpenDrawer} title="Claim OOO Event Pass">
        <span class="pill-icon">🎫</span>
        <span class="pill-label">Event Pass</span>
      </button>

      <button type="button" class="action-pill ooo-pill" on:click={onOpenOooGen} title="What to tell your boss">
        <span class="pill-icon">📧</span>
        <span class="pill-label">What to tell your boss</span>
      </button>

      <div class="audio-deck-wrap" title="Soundscape Audio Mixer">
        <AudioControlDeck />
      </div>

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
    </nav>

    <!-- Wordmark Block -->
    <a href="#/about" class="block block-logo" title="What We Are" aria-label="Out of Office Lagos - About & Manifesto">
      <span class="status-dot" aria-hidden="true"></span>
      <div class="wordmark-col">
        <span class="wordmark">ooo</span>
        <span class="meta">Lagos</span>
      </div>
    </a>
  </div>

  {#if statusToast}
    <div class="status-toast" class:online={isOnline}>
      {statusMessage}
    </div>
  {/if}
</header>

<style>
  /* Positioning Floating Topbar Close to Top Border Edge */
  .bar-container {
    position: sticky;
    top: 0.5rem;
    z-index: 1000;
    width: calc(100% - 2rem);
    max-width: 1400px;
    margin: var(--pt, 8px) auto 0 auto;
    font-family: var(--font-mono, 'JetBrains Mono', 'Fira Code', 'Courier New', monospace);
    transition: margin-top 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* Glassmorphic Container Design System */
  .bar {
    display: flex;
    align-items: stretch;
    width: 100%;
    min-height: 56px;
    color: var(--ink);
    background: rgba(18, 20, 24, 0.78);
    backdrop-filter: blur(var(--blur, 16px)) saturate(180%);
    -webkit-backdrop-filter: blur(var(--blur, 16px)) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.28);
    transition: border-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
  }

  :global([data-theme="light"]) .bar {
    background: rgba(255, 255, 255, 0.82);
    border-color: rgba(0, 0, 0, 0.12);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  .block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 1rem;
    white-space: nowrap;
    font-family: inherit;
  }

  /* Status Toggle Button */
  .status-btn {
    background: transparent;
    border: none;
    border-right: 1px solid rgba(255, 255, 255, 0.12);
    cursor: pointer;
    text-align: left;
    transition: background 0.2s ease;
  }
  :global([data-theme="light"]) .status-btn {
    border-right-color: rgba(0, 0, 0, 0.12);
  }
  .status-btn:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  .status-row {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .live-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--pink-deep, #ff2e63);
    box-shadow: 0 0 8px var(--pink-deep, #ff2e63);
    animation: dotPulse 2s infinite ease-in-out;
  }
  .live-indicator.active-online {
    background: #00ff88;
    box-shadow: 0 0 10px #00ff88;
  }
  @keyframes dotPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.35); opacity: 0.6; }
  }

  .line {
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    color: var(--muted);
    font-weight: 700;
  }
  .status-val {
    font-size: 0.9rem;
    font-weight: 800;
    color: var(--ink);
  }
  .status-btn.online .status-val {
    color: #00ff88;
  }

  /* Trend Center Block */
  .block-trend {
    border-right: 1px solid rgba(255, 255, 255, 0.12);
    flex: 1 1 auto;
    align-items: center;
    text-align: center;
    gap: 0.05rem;
  }
  :global([data-theme="light"]) .block-trend {
    border-right-color: rgba(0, 0, 0, 0.12);
  }
  .block-trend .tag {
    font-weight: 700;
    font-size: 0.55rem;
    color: var(--pink-deep);
    letter-spacing: 0.15em;
  }
  .block-trend .word {
    font-size: 0.95rem;
    color: var(--ink);
    font-weight: 800;
  }
  .block-trend .sub {
    font-weight: 600;
    font-size: 0.55rem;
    letter-spacing: 0.12em;
    color: var(--muted);
  }

  /* Actions Navigation with Icon-Only Default & Hover Label Expansion */
  .actions-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0 0.8rem;
    border-right: 1px solid rgba(255, 255, 255, 0.12);
    flex: 0 0 auto;
  }
  :global([data-theme="light"]) .actions-wrap {
    border-right-color: rgba(0, 0, 0, 0.12);
  }

  .action-pill {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    color: var(--ink);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 999px;
    height: 36px;
    padding: 0 0.6rem;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    transition: all var(--speed, 0.35s) cubic-bezier(0.16, 1, 0.3, 1);
    font-family: inherit;
  }
  :global([data-theme="light"]) .action-pill {
    background: rgba(0, 0, 0, 0.04);
    border-color: rgba(0, 0, 0, 0.12);
  }

  .pill-icon {
    font-size: 0.95rem;
    flex-shrink: 0;
  }

  .pill-label {
    max-width: 0;
    opacity: 0;
    margin-left: 0;
    white-space: nowrap;
    transition: max-width var(--speed, 0.35s) cubic-bezier(0.16, 1, 0.3, 1),
                opacity 0.25s ease,
                margin-left var(--speed, 0.35s) cubic-bezier(0.16, 1, 0.3, 1);
  }

  .action-pill:hover {
    background: var(--ink);
    color: var(--bg);
    border-color: var(--ink);
    padding: 0 0.85rem;
  }

  .action-pill:hover .pill-label {
    max-width: 260px;
    opacity: 1;
    margin-left: 0.45rem;
  }

  .island-switch-pill {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    color: var(--ink);
    border: 1px solid rgba(255, 255, 255, 0.15);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    padding: 0;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;
  }
  :global([data-theme="light"]) .island-switch-pill {
    background: rgba(0, 0, 0, 0.04);
    border-color: rgba(0, 0, 0, 0.12);
  }
  .island-switch-pill:hover {
    background: var(--ink);
    color: var(--bg);
    transform: scale(1.08);
  }

  .icon-wrap {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
  }
  .theme-icon {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .sun-icon { color: #ffca28; }
  .moon-icon { color: #00bfff; }

  .icon-wrap[data-theme="light"] .sun-icon { opacity: 1; transform: scale(1); }
  .icon-wrap[data-theme="light"] .moon-icon { opacity: 0; transform: scale(0.5); }
  .icon-wrap[data-theme="dark"] .sun-icon { opacity: 0; transform: scale(0.5); }
  .icon-wrap[data-theme="dark"] .moon-icon { opacity: 1; transform: scale(1); }

  /* Hallmark Logo & Wordmark Styling */
  .block-logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0 1rem;
    margin-left: auto; /* Push to the far right edge */
    text-decoration: none;
    transition: transform 0.3s var(--ease-out-expo), opacity 0.3s ease;
  }
  .block-logo:hover {
    transform: translateY(-1px) scale(1.04);
    opacity: 0.95;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--ink);
    opacity: 0.8;
    animation: dotPulse 2.5s infinite ease-in-out;
  }

  .wordmark-col {
    display: flex;
    flex-direction: column;
    line-height: 0.92;
  }

  .wordmark {
    font-size: 1.45rem;
    font-weight: 900;
    letter-spacing: -0.05em;
    color: var(--ink);
  }

  .meta {
    font-size: 0.58rem;
    font-weight: 800;
    color: var(--ink);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    opacity: 0.85;
  }

  /* Status Change Toast */
  .status-toast {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: rgba(18, 20, 24, 0.92);
    color: #fff;
    border: 1px solid var(--border-soft);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-size: 0.78rem;
    font-weight: 700;
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
    white-space: nowrap;
    animation: fadeIn 0.25s ease-out;
  }
  .status-toast.online {
    background: #00ff88;
    color: #042f1a;
  }

  /* Responsive Adjustments to fix horizontal squishing on mobile */
  @media (max-width: 900px) {
    .block-trend {
      display: none;
    }
    .wordmark-col .meta {
      display: none;
    }
    .status-val {
      font-size: 0.8rem;
    }
    .status-btn {
      padding: 0 0.5rem;
    }
    .block-logo {
      padding: 0 0.5rem;
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translate(-50%, -6px); }
    to { opacity: 1; transform: translate(-50%, 0); }
  }

  @media (max-width: 768px) {
    .bar-container {
      width: calc(100% - 1rem);
      margin-top: 0.25rem;
    }
    .block-trend {
      display: none;
    }
    .action-pill:hover .pill-label {
      max-width: 0;
      opacity: 0;
      margin-left: 0;
    }
  }
</style>
