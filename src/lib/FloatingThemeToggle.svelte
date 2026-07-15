<script>
  import { isDark, toggleTheme } from './theme.js';
</script>

<div class="dynamic-island-wrap" role="region" aria-label="Theme Control">
  <!-- Tactile Phone UI Dynamic Island Theme Switch -->
  <button
    type="button"
    class="dynamic-island-btn"
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

<style>
  .dynamic-island-wrap {
    position: fixed;
    top: 0.9rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999999;
  }

  .dynamic-island-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(15, 17, 21, 0.92);
    color: #fff;
    backdrop-filter: blur(24px) saturate(200%);
    -webkit-backdrop-filter: blur(24px) saturate(200%);
    border: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 999px;
    padding: 0.5rem 1.25rem;
    cursor: pointer;
    font-family: var(--sans, sans-serif);
    font-weight: 700;
    font-size: clamp(0.75rem, 1.4vw, 0.88rem);
    letter-spacing: 0.1em;
    box-shadow: 0 14px 38px rgba(0, 0, 0, 0.48), inset 0 1px 0 rgba(255, 255, 255, 0.25);
    transition: background 0.3s ease, border-color 0.3s ease, transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
  }

  .dynamic-island-btn:hover {
    background: var(--blue, #00bfff);
    border-color: #fff;
    color: #fff;
    transform: translateY(-2px) scale(1.04);
    box-shadow: 0 18px 45px rgba(0, 191, 255, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }

  .dynamic-island-btn:active {
    transform: translateY(0) scale(0.94);
  }

  .icon-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    line-height: 1;
  }

  .toggle-text {
    line-height: 1;
  }

  @media (max-width: 600px) {
    .dynamic-island-wrap {
      top: 0.6rem;
    }
    .dynamic-island-btn {
      padding: 0.42rem 1rem;
      font-size: 0.72rem;
      gap: 0.4rem;
    }
  }
</style>
