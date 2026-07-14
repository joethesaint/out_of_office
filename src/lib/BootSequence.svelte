<script>
  import { onMount } from 'svelte';

  const LINES = [
    'Sending auto-reply…',
    '✓ Emails muted',
    '✓ Notifications paused',
    '✓ Lagos stress suspended',
    'Redirecting to Out of Office…',
  ];
  const LINE_DELAY = 380;
  const HOLD_AFTER = 500;

  let shownCount = 0;
  let leaving = false;
  let removed = false;

  onMount(() => {
    // Skip boot animation on return visits within the same session
    if (sessionStorage.getItem('ooo-booted')) {
      removed = true;
      return;
    }
    sessionStorage.setItem('ooo-booted', '1');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      removed = true;
      return;
    }

    const timers = LINES.map((_, i) =>
      setTimeout(() => { shownCount = i + 1; }, i * LINE_DELAY)
    );
    const leaveAt = LINES.length * LINE_DELAY + HOLD_AFTER;
    timers.push(setTimeout(() => { leaving = true; }, leaveAt));
    timers.push(setTimeout(() => { removed = true; }, leaveAt + 900));
    return () => timers.forEach(clearTimeout);
  });
</script>

{#if !removed}
  <div class="boot" class:leaving>
    <div class="lines" aria-live="polite" aria-atomic="false">
      {#each LINES.slice(0, shownCount) as line}
        <p class="line">{line}</p>
      {/each}
    </div>
    <svg class="wave" viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 30 Q 50 5 100 30 T 200 30 T 300 30 T 400 30 V60 H0 Z"
        fill="#00bfff"
      />
    </svg>
  </div>
{/if}

<style>
  .boot {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: #181818;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    opacity: 1;
    transition: opacity 0.9s ease;
  }
  .boot.leaving {
    opacity: 0;
    pointer-events: none;
  }

  .lines {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  .line {
    margin: 0;
    font-family: var(--sans);
    font-size: clamp(0.85rem, 3vw, 1.15rem);
    color: #f6f4f1;
    letter-spacing: 0.02em;
    animation: rise 0.4s ease both;
  }
  .line:first-child {
    color: var(--pink);
    font-weight: 500;
  }

  @keyframes rise {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .wave {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    width: 100%;
    height: 30vh;
    transform: translateY(100%);
    transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .boot.leaving .wave {
    transform: translateY(0%);
  }
</style>
