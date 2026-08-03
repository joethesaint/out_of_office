<script>
  import { addToast } from './toastStore.js';
  import { fade, fly } from 'svelte/transition';
  import { cubicIn, cubicOut } from 'svelte/easing';
  import { dialogDuration } from './motion.js';
  import { TICKET_TIERS, payForTicket as startPaystackCheckout } from './tickets.js';

  export let isOpen = false;
  export let onClose = () => {};

  let step = 1;
  let selectedTier = TICKET_TIERS[0].id;
  let attendeeName = '';
  let attendeeEmail = '';
  let confirmedPass = null;
  let paying = false;

  const TIERS = TICKET_TIERS;

  function handleConfirm() {
    if (!attendeeName.trim()) {
      addToast({
        title: 'Name Required',
        description: 'Please enter your name or alias to issue your pass.',
        type: 'warning'
      });
      return;
    }
    if (!attendeeEmail.trim()) {
      addToast({
        title: 'Email Required',
        description: 'Please enter your email so Paystack can send your receipt.',
        type: 'warning'
      });
      return;
    }

    const tierObj = TIERS.find((t) => t.id === selectedTier);
    paying = true;

    startPaystackCheckout(tierObj, attendeeEmail, {
      onError: (message) => {
        paying = false;
        addToast({ title: 'Payment Error', description: message, type: 'warning' });
      },
      onCancel: () => {
        paying = false;
      },
      onSuccess: (transaction) => {
        paying = false;
        confirmedPass = {
          code: transaction.reference,
          name: attendeeName,
          email: attendeeEmail,
          tier: tierObj.name,
          price: tierObj.label,
          issuedAt: new Date().toLocaleDateString()
        };

        step = 3;
        addToast({
          title: 'Pass Issued! 🎉',
          description: `Your pass ${transaction.reference} has been issued to ${attendeeName}.`,
          type: 'success'
        });
      }
    });
  }

  function copyPassInfo() {
    if (!confirmedPass) return;
    const text = `Out of Office Pass #${confirmedPass.code}\nHolder: ${confirmedPass.name}\nTier: ${confirmedPass.tier}\nPrice: ${confirmedPass.price}`;
    navigator.clipboard.writeText(text);
    addToast({
      title: 'Pass Copied',
      description: 'Pass details copied to clipboard.',
      type: 'info'
    });
  }

  function resetAndClose() {
    step = 1;
    confirmedPass = null;
    onClose();
  }
</script>

{#if isOpen}
  <div
    class="overlay"
    on:click={resetAndClose}
    on:keydown={(e) => e.key === 'Escape' && resetAndClose()}
    tabindex="-1"
    role="button"
    transition:fade={{ duration: dialogDuration(180) }}
  >
    <div
      class="sheet"
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
      aria-labelledby="sheet-title"
      tabindex="-1"
      in:fly={{ x: 40, duration: dialogDuration(280), easing: cubicOut }}
      out:fly={{ x: 40, duration: dialogDuration(160), easing: cubicIn }}
    >
      <div class="sheet-header">
        <div>
          <span class="badge">EVENT PASS</span>
          <h2 id="sheet-title" class="sheet-title">Claim OOO Pass</h2>
        </div>
        <button class="close-btn" on:click={resetAndClose} aria-label="Close sheet">&times;</button>
      </div>

      <div class="sheet-body">
        {#if step === 1}
          <div class="step-pane">
            <h3 class="pane-subtitle">1. Select Pass Tier</h3>
            <div class="tier-grid">
              {#each TIERS as t}
                <div
                  class="tier-card"
                  class:active={selectedTier === t.id}
                  on:click={() => (selectedTier = t.id)}
                  role="button"
                  tabindex="0"
                >
                  <div class="tier-top">
                    <span class="tier-name">{t.name}</span>
                    <span class="tier-price">{t.label}</span>
                  </div>
                  <p class="tier-desc">{t.description}</p>
                </div>
              {/each}
            </div>
            <button class="primary-btn" on:click={() => (step = 2)}>Continue to Details &rarr;</button>
          </div>
        {:else if step === 2}
          <div class="step-pane">
            <h3 class="pane-subtitle">2. Attendee Details</h3>
            <div class="form-group">
              <label for="attendee-name">Name / Alias *</label>
              <input
                id="attendee-name"
                type="text"
                class="input"
                placeholder="e.g. Tunde (Offline)"
                bind:value={attendeeName}
              />
            </div>

            <div class="form-group">
              <label for="attendee-email">Email *</label>
              <input
                id="attendee-email"
                type="email"
                class="input"
                placeholder="you@company.com"
                bind:value={attendeeEmail}
              />
            </div>

            <div class="btn-row">
              <button class="sec-btn" on:click={() => (step = 1)}>&larr; Back</button>
              <button class="primary-btn" on:click={handleConfirm} disabled={paying}>
                {paying ? 'Processing…' : 'Pay & Claim Pass'}
              </button>
            </div>
          </div>
        {:else if step === 3 && confirmedPass}
          <div class="step-pane">
            <div class="pass-ticket">
              <div class="ticket-top">
                <span class="t-badge">LAGOS OOO PASS</span>
                <span class="t-code">{confirmedPass.code}</span>
              </div>
              <div class="ticket-name">{confirmedPass.name}</div>
              <div class="ticket-meta">
                <div><span>TIER:</span> {confirmedPass.tier}</div>
                <div><span>PRICE:</span> {confirmedPass.price}</div>
                <div><span>ISSUED:</span> {confirmedPass.issuedAt}</div>
              </div>
            </div>

            <div class="btn-row">
              <button class="sec-btn" on:click={copyPassInfo}>Copy Pass Data</button>
              <button class="primary-btn" on:click={resetAndClose}>Done</button>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: flex-end;
  }

  .sheet {
    width: min(100vw, 480px);
    height: 100%;
    background: var(--bg);
    color: var(--ink);
    border-left: 2px solid var(--border-soft-deep);
    box-shadow: -10px 0 40px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
  }

  .sheet-header {
    padding: 1.5rem;
    border-bottom: 1px solid var(--border-soft-deep);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .badge {
    font-size: 0.65rem;
    font-weight: 700;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    background: var(--blue, #00bfff);
    color: #fff;
    text-transform: uppercase;
  }

  .sheet-title {
    margin: 0.4rem 0 0;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 1.8rem;
    color: var(--muted);
    cursor: pointer;
  }

  .sheet-body {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
  }

  .step-pane {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .pane-subtitle {
    font-size: 1.1rem;
    margin: 0;
    opacity: 0.9;
  }

  .tier-grid {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .tier-card {
    background: var(--card-surface);
    border: 2px solid var(--border-soft-deep);
    border-radius: 12px;
    padding: 1rem;
    cursor: pointer;
    transition: border-color 0.2s ease, transform 0.2s ease;
  }

  .tier-card.active,
  .tier-card:hover {
    border-color: var(--blue, #00bfff);
    transform: translateY(-2px);
  }

  .tier-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;
  }

  .tier-name {
    font-weight: 700;
    font-size: 1rem;
  }

  .tier-price {
    font-weight: 700;
    color: var(--pink-deep, #fc9ce0);
  }

  .tier-desc {
    font-size: 0.85rem;
    margin: 0 0 0.6rem;
    opacity: 0.8;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .form-group label {
    font-size: 0.85rem;
    font-weight: 600;
  }

  .input,
  .select {
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--card-surface);
    color: var(--ink);
    border: 1.5px solid var(--border-soft-deep);
    border-radius: 8px;
    font-family: inherit;
    font-size: 0.95rem;
  }

  .btn-row {
    display: flex;
    gap: 0.8rem;
  }

  .primary-btn {
    flex: 1;
    background: var(--blue, #00bfff);
    color: #fff;
    border: none;
    padding: 0.85rem;
    border-radius: 999px;
    font-weight: 700;
    cursor: pointer;
  }

  .primary-btn:disabled {
    opacity: 0.7;
    cursor: default;
  }

  .sec-btn {
    background: transparent;
    color: var(--ink);
    border: 1.5px solid var(--border-soft-deep);
    padding: 0.85rem 1.2rem;
    border-radius: 999px;
    font-weight: 600;
    cursor: pointer;
  }

  .pass-ticket {
    background: var(--card-surface);
    border: 2px dashed var(--blue, #00bfff);
    border-radius: 14px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .ticket-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .t-badge {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--blue, #00bfff);
  }

  .t-code {
    font-family: monospace;
    font-weight: 700;
  }

  .ticket-name {
    font-size: 1.6rem;
    font-weight: 700;
  }

  .ticket-meta {
    font-size: 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

</style>
