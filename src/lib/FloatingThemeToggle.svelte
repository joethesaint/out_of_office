<script>
  import { isDark, toggleTheme } from './theme.js';
</script>

<button
  type="button"
  class="floating-theme-toggle"
  on:click={toggleTheme}
  aria-label={$isDark ? 'Switch to DAY theme' : 'Switch to NIGHT theme'}
  title="Switch between Light and Dark mode"
>
  <span class="toggle-icon" aria-hidden="true">{$isDark ? '🌙' : '☀️'}</span>
  <span class="toggle-text">{$isDark ? 'NIGHT' : 'DAY'} MODE</span>
</button>

<style>
  .floating-theme-toggle {
    position: fixed;
    top: 1.2rem;
    right: 1.2rem;
    z-index: 999999;
    display: flex;
    align-items: center;
    gap: 0.45rem;
    background: var(--ink, #181818);
    color: var(--bg, #f6f4f1);
    border: 2px solid var(--blue, #00bfff);
    border-radius: 999px;
    padding: 0.55rem 1.1rem;
    font-family: var(--sans, sans-serif);
    font-weight: 700;
    font-size: clamp(0.75rem, 1.3vw, 0.9rem);
    letter-spacing: 0.08em;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .floating-theme-toggle:hover {
    transform: translateY(-2px) scale(1.04);
    background: var(--blue, #00bfff);
    color: #fff;
    border-color: #fff;
    box-shadow: 0 12px 30px rgba(0, 191, 255, 0.5);
  }
  .floating-theme-toggle:active {
    transform: translateY(0) scale(0.96);
  }
  .toggle-icon {
    font-size: 1.2em;
    line-height: 1;
  }
  .toggle-text {
    line-height: 1;
  }
  @media (max-width: 600px) {
    .floating-theme-toggle {
      top: 0.8rem;
      right: 0.8rem;
      padding: 0.45rem 0.85rem;
      font-size: 0.75rem;
    }
  }
</style>
