<script>
  import { onMount, onDestroy } from 'svelte';
  import { fade } from 'svelte/transition';

  let visible = false;

  function checkScroll() {
    visible = typeof window !== 'undefined' && window.scrollY > 800;
  }

  function scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onMount(() => {
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', checkScroll);
    }
  });
</script>

{#if visible}
  <button 
    class="scroll-top-btn" 
    on:click={scrollToTop}
    transition:fade={{ duration: 250 }}
    aria-label="Scroll back to top"
    title="Back to Top"
  >
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  </button>
{/if}

<style>
  .scroll-top-btn {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--card-surface, #fff) 85%, transparent);
    color: var(--ink, #181818);
    border: 1px solid var(--border-soft);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    z-index: 999;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  }

  .scroll-top-btn:hover {
    transform: translateY(-4px);
    background: var(--card-surface, #fff);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  }

  .scroll-top-btn:focus-visible {
    outline: 2px solid var(--blue, #0033a0);
    outline-offset: 4px;
  }

  @media (max-width: 768px) {
    .scroll-top-btn {
      bottom: 1.5rem;
      right: 1.5rem;
      width: 3rem;
      height: 3rem;
    }
  }
</style>
