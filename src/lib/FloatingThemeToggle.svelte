<script>
  import { isDark, toggleTheme } from './theme.js';
</script>

<div class="dynamic-island-wrap" role="region" aria-label="System Theme & Status Control">
  <div class="dynamic-island">
    <!-- Left: Phone UI Live Status Indicator -->
    <div class="island-status">
      <span class="pulse-dot" aria-hidden="true"></span>
      <span class="status-label">OOO SYSTEM</span>
    </div>

    <!-- Center divider -->
    <div class="island-divider" aria-hidden="true"></div>

    <!-- Right: Tactile Phone UI Theme Switch -->
    <button
      type="button"
      class="island-toggle-btn"
      on:click={toggleTheme}
      aria-label={$isDark ? 'Switch to DAY theme' : 'Switch to NIGHT theme'}
      title="Switch between Light and Dark mode"
    >
      <span class="icon-wrap">
        <span class="toggle-icon">{$isDark ? '🌙' : '☀️'}</span>
      </span>
      <span class="toggle-text">{$isDark ? 'NIGHT' : 'DAY'}</span>
    </button>
  </div>
</div>

<style>
  .dynamic-island-wrap {
    position: fixed;
    top: 0.85rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999999;
    pointer-events: none;
  }

  .dynamic-island {
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: 0.55rem;
    background: rgba(15, 17, 21, 0.92);
    backdrop-filter: blur(24px) saturate(200%);
    -webkit-backdrop-filter: blur(24px) saturate(200%);
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 999px;
    padding: 0.35rem 0.45rem 0.35rem 0.85rem;
    box-shadow: 0 14px 38px rgba(0, 0, 0, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
  }

  .dynamic-island:hover {
    transform: scale(1.035);
    border-color: rgba(0, 191, 255, 0.5);
    box-shadow: 0 18px 45px rgba(0, 191, 255, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .island-status {
    display: flex;
    align-items: center;
    gap: 0.45rem;
  }

  .pulse-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #08cabd;
    box-shadow: 0 0 8px #08cabd, 0 0 14px rgba(8, 202, 189, 0.6);
    animation: dotPulse 2s infinite ease-in-out;
  }

  @keyframes dotPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.3); opacity: 0.7; }
  }

  .status-label {
    font-family: var(--sans, sans-serif);
    font-weight: 700;
    font-size: clamp(0.62rem, 1.3vw, 0.72rem);
    letter-spacing: 0.14em;
    color: #e2e8f0;
    text-transform: uppercase;
    line-height: 1;
  }

  .island-divider {
    width: 1px;
    height: 14px;
    background: rgba(255, 255, 255, 0.15);
  }

  .island-toggle-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    padding: 0.32rem 0.75rem;
    cursor: pointer;
    font-family: var(--sans, sans-serif);
    font-weight: 700;
    font-size: clamp(0.65rem, 1.3vw, 0.75rem);
    letter-spacing: 0.08em;
    transition: background 0.25s ease, border-color 0.25s ease, transform 0.15s ease, box-shadow 0.25s ease;
  }

  .island-toggle-btn:hover {
    background: var(--blue, #00bfff);
    border-color: #fff;
    color: #fff;
    box-shadow: 0 0 16px rgba(0, 191, 255, 0.5);
  }

  .island-toggle-btn:active {
    transform: scale(0.93);
  }

  .icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1em;
    line-height: 1;
  }

  .toggle-text {
    line-height: 1;
  }

  @media (max-width: 600px) {
    .dynamic-island-wrap {
      top: 0.5rem;
    }
    .dynamic-island {
      gap: 0.4rem;
      padding: 0.28rem 0.35rem 0.28rem 0.65rem;
    }
    .status-label {
      font-size: 0.58rem;
    }
    .island-toggle-btn {
      padding: 0.25rem 0.55rem;
      font-size: 0.62rem;
    }
  }
</style>
