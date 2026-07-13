<script>
  export let progress = 0;

  // Fade out completely by progress 0.55
  $: opacity = Math.max(0, 1 - progress * 1.85);
  $: blurAmount = Math.min(12, progress * 24);
  $: scale = Math.max(0.75, 1 - progress * 0.4);
  $: translateY = progress * -80;
  $: visible = progress < 0.58;
</script>

{#if visible}
  <div
    class="chaos-layer"
    style="opacity: {opacity}; filter: blur({blurAmount}px); transform: translateY({translateY}px) scale({scale});"
    aria-hidden="true"
  >
    <!-- WhatsApp Alert -->
    <div class="popup-card whatsapp" style="top: calc(clamp(52px, 9vh, 72px) + 6.5rem); left: 3%; transform: rotate(-4deg);">
      <div class="popup-header">
        <span class="icon">💬</span>
        <span class="app-name">WhatsApp · Boss (Urgent!)</span>
        <span class="time">now</span>
      </div>
      <p class="popup-body">Where is the updated Q2 budget deck??? We are waiting in the boardroom right now!</p>
    </div>

    <!-- Slack Alert -->
    <div class="popup-card slack" style="top: 65%; left: 5%; transform: rotate(3deg);">
      <div class="popup-header">
        <span class="icon">⚡</span>
        <span class="app-name">Slack · #production-incident</span>
        <span class="time">2m ago</span>
      </div>
      <p class="popup-body"><strong>@here</strong> Server CPU spiking to 99% across 4 instances in af-south-1. Can someone check logs immediately?</p>
    </div>

    <!-- Email Alert -->
    <div class="popup-card email" style="top: calc(clamp(52px, 9vh, 72px) + 6.5rem); right: 4%; transform: rotate(5deg);">
      <div class="popup-header">
        <span class="icon">✉️</span>
        <span class="app-name">Mail · 14 Unread</span>
        <span class="time">5m ago</span>
      </div>
      <p class="popup-body"><strong>ACTION REQUIRED:</strong> Mandatory compliance training overdue. Your access will be restricted by 5 PM.</p>
    </div>

    <!-- Calendar Alert -->
    <div class="popup-card calendar" style="top: 52%; right: 3%; transform: rotate(-3deg);">
      <div class="popup-header">
        <span class="icon">📅</span>
        <span class="app-name">Calendar Reminder</span>
        <span class="time">in 3 min</span>
      </div>
      <p class="popup-body"><strong>Quick 15-min Sync</strong> w/ Legal & Finance (Google Meet link inside)</p>
    </div>

    <!-- Battery Low -->
    <div class="popup-card battery" style="bottom: 5%; left: 42%; transform: rotate(1deg);">
      <div class="popup-header">
        <span class="icon">🔋</span>
        <span class="app-name">System Notification</span>
      </div>
      <p class="popup-body"><strong>Battery Low (9%)</strong> — Connect your Mac to a power adapter soon or it will sleep.</p>
    </div>
  </div>
{/if}

<style>
  .chaos-layer {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 100;
    transition: opacity 0.1s linear, transform 0.1s linear, filter 0.1s linear;
    overflow: visible;
  }

  .popup-card {
    position: absolute;
    width: clamp(210px, 26vw, 290px);
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(10px);
    border-radius: 14px;
    padding: 0.75rem 0.9rem;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18), 0 2px 6px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.8);
    font-family: var(--sans);
    animation: floatChaos 4s ease-in-out infinite alternate;
  }

  /* Give different cards slightly staggered float animations */
  .popup-card.whatsapp { animation-delay: 0s; border-left: 4px solid #25d366; }
  .popup-card.slack { animation-delay: -1.2s; border-left: 4px solid #4a154b; }
  .popup-card.email { animation-delay: -2.4s; border-left: 4px solid #0078d4; }
  .popup-card.calendar { animation-delay: -0.7s; border-left: 4px solid #ea4335; }
  .popup-card.battery { animation-delay: -3.1s; border-left: 4px solid #ff9900; }

  .popup-header {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-bottom: 0.35rem;
    font-size: 0.7rem;
    color: #666;
    font-weight: 600;
  }
  .popup-header .icon {
    font-size: 0.85rem;
  }
  .popup-header .app-name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #222;
  }
  .popup-header .time {
    font-size: 0.65rem;
    color: #888;
    font-weight: 400;
  }

  .popup-body {
    margin: 0;
    font-size: 0.76rem;
    color: #333;
    line-height: 1.35;
  }
  .popup-body strong {
    color: #111;
  }

  @keyframes floatChaos {
    0% {
      transform: translateY(0) rotate(var(--rot, 0deg));
    }
    100% {
      transform: translateY(-6px) rotate(calc(var(--rot, 0deg) + 1.5deg));
    }
  }

  /* Hide on very small screens so they don't cover the mobile text */
  @media (max-width: 680px) {
    .popup-card {
      width: 180px;
      padding: 0.6rem 0.75rem;
    }
    .popup-card.slack,
    .popup-card.calendar,
    .popup-card.email,
    .popup-card.whatsapp {
      display: none;
    }
  }
</style>
