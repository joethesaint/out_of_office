<script>
  import { toasts, removeToast } from './toastStore.js';
</script>

<div class="toast-container" aria-live="polite" aria-atomic="true">
  {#each $toasts as toast (toast.id)}
    <div class="toast toast-{toast.type}">
      <div class="toast-content">
        {#if toast.title}
          <div class="toast-title">{toast.title}</div>
        {/if}
        {#if toast.description}
          <div class="toast-desc">{toast.description}</div>
        {/if}
      </div>
      <button class="toast-close" on:click={() => removeToast(toast.id)} aria-label="Close notification">&times;</button>
    </div>
  {/each}
</div>

<style>
  .toast-container {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    pointer-events: none;
    max-width: 380px;
    width: calc(100vw - 3rem);
  }

  .toast {
    pointer-events: auto;
    background: var(--card-surface);
    color: var(--ink);
    border: 1px solid var(--border-soft-deep);
    border-left: 4px solid var(--blue, #00bfff);
    border-radius: 10px;
    padding: 0.85rem 1.1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.8rem;
    animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .toast-success {
    border-left-color: #10b981;
  }

  .toast-info {
    border-left-color: var(--blue, #00bfff);
  }

  .toast-warning {
    border-left-color: var(--chaos-yellow, #eab308);
  }

  .toast-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .toast-title {
    font-weight: 700;
    font-size: 0.9rem;
  }

  .toast-desc {
    font-size: 0.82rem;
    opacity: 0.85;
    line-height: 1.35;
  }

  .toast-close {
    background: none;
    border: none;
    color: var(--muted);
    font-size: 1.2rem;
    line-height: 1;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }

  .toast-close:hover {
    color: var(--ink);
  }

  @keyframes toastIn {
    from {
      opacity: 0;
      transform: translateY(16px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
</style>
