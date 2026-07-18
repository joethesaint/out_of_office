<script>
  import { onMount, onDestroy } from "svelte";
  export let progress = 0;

  // Fade out completely by progress 0.55
  $: opacity = Math.max(0, 1 - progress * 1.85);
  $: blurAmount = Math.min(12, progress * 24);
  $: scale = Math.max(0.75, 1 - progress * 0.4);
  $: translateY = progress * -80;
  $: visible = progress < 0.58;

  // The System Notification card keeps "re-popping" at a new spot every
  // few seconds instead of sitting fixed over the card's footer.
  const batterySpots = [
    { style: "top: 3%; left: 14%;", rot: -6 },
    { style: "top: 3%; right: 16%;", rot: 5 },
    { style: "top: 46%; left: 6%;", rot: 4 },
    { style: "top: 46%; right: 7%;", rot: -5 },
    { style: "bottom: 3%; left: 24%;", rot: 6 },
    { style: "bottom: 3%; right: 22%;", rot: -4 },
  ];
  let batteryIndex = 0;
  let batteryTimer;

  onMount(() => {
    batteryTimer = setInterval(() => {
      batteryIndex = (batteryIndex + 1) % batterySpots.length;
    }, 4200);
  });
  onDestroy(() => clearInterval(batteryTimer));

  $: batterySpot = batterySpots[batteryIndex];
</script>

{#if visible}
  <div
    class="chaos-layer"
    style="opacity: {opacity}; filter: blur({blurAmount}px); transform: translateY({translateY}px) scale({scale});"
    aria-hidden="true"
  >
    <!-- WhatsApp + Slack pile up on the left, overlapping each other —
         the point is a stack of competing alerts, not four tidy corners -->
    <div class="popup-card whatsapp" style="top: calc(clamp(52px, 9vh, 72px) + 5.5rem); left: 1%; transform: rotate(-8deg); z-index: 3;">
      <div class="popup-header">
        <span class="icon">💬</span>
        <span class="app-name">WhatsApp · Boss (Urgent!)</span>
        <span class="time">now</span>
      </div>
      <p class="popup-body">Where is the updated Q2 budget deck??? We are waiting in the boardroom right now!</p>
    </div>

    <div class="popup-card slack" style="top: calc(clamp(52px, 9vh, 72px) + 11.5rem); left: 9%; transform: rotate(7deg) scale(0.96); z-index: 4;">
      <div class="popup-header">
        <span class="icon">⚡</span>
        <span class="app-name">Slack · #production-incident</span>
        <span class="time">2m ago</span>
      </div>
      <p class="popup-body"><strong>@here</strong> Server CPU spiking to 99% across 4 instances in af-south-1. Can someone check logs immediately?</p>
    </div>

    <!-- Email + Calendar mirror the same overlapping pile on the right -->
    <div class="popup-card email" style="top: calc(clamp(52px, 9vh, 72px) + 5.5rem); right: 1%; transform: rotate(9deg); z-index: 3;">
      <div class="popup-header">
        <span class="icon">✉️</span>
        <span class="app-name">Mail · 14 Unread</span>
        <span class="time">5m ago</span>
      </div>
      <p class="popup-body"><strong>ACTION REQUIRED:</strong> Mandatory compliance training overdue. Your access will be restricted by 5 PM.</p>
    </div>

    <div class="popup-card calendar" style="top: calc(clamp(52px, 9vh, 72px) + 11.5rem); right: 8%; transform: rotate(-7deg) scale(0.96); z-index: 4;">
      <div class="popup-header">
        <span class="icon">📅</span>
        <span class="app-name">Calendar Reminder</span>
        <span class="time">in 3 min</span>
      </div>
      <p class="popup-body"><strong>Quick 15-min Sync</strong> w/ Legal & Finance (Google Meet link inside)</p>
    </div>

    <!-- Second wave, doubling the pile: same chaos, more channels -->
    <div class="popup-card twitter" style="top: calc(clamp(52px, 9vh, 72px) + 17.5rem); left: 4%; transform: rotate(5deg) scale(0.95); z-index: 3;">
      <div class="popup-header">
        <span class="icon">🐦</span>
        <span class="app-name">X · DM from Investor</span>
        <span class="time">now</span>
      </div>
      <p class="popup-body">Saw the deck. Can we jump on a call before markets open tomorrow?</p>
    </div>

    <div class="popup-card instagram" style="top: calc(clamp(52px, 9vh, 72px) + 17.5rem); right: 4%; transform: rotate(-6deg) scale(0.95); z-index: 3;">
      <div class="popup-header">
        <span class="icon">📸</span>
        <span class="app-name">Instagram · Client tagged you</span>
        <span class="time">8m ago</span>
      </div>
      <p class="popup-body">"@you why is our stand still not ready?? event is in 2 days 😭"</p>
    </div>

    <div class="popup-card zoom" style="bottom: 20%; left: 3%; transform: rotate(-4deg) scale(0.95); z-index: 4;">
      <div class="popup-header">
        <span class="icon">🎥</span>
        <span class="app-name">Zoom · Meeting starting</span>
        <span class="time">in 1 min</span>
      </div>
      <p class="popup-body"><strong>All-hands:</strong> Q2 targets review. Camera on, please.</p>
    </div>

    <div class="popup-card trello" style="bottom: 20%; right: 3%; transform: rotate(6deg) scale(0.95); z-index: 4;">
      <div class="popup-header">
        <span class="icon">📋</span>
        <span class="app-name">Trello · Card overdue</span>
        <span class="time">3h ago</span>
      </div>
      <p class="popup-body"><strong>"Fix production bug"</strong> is 3 days past due. 4 people are watching.</p>
    </div>

    <div class="popup-card bank" style="top: 62%; left: 1%; transform: rotate(3deg) scale(0.94); z-index: 2;">
      <div class="popup-header">
        <span class="icon">🏦</span>
        <span class="app-name">GTBank · Debit Alert</span>
        <span class="time">1m ago</span>
      </div>
      <p class="popup-body">Debit of ₦45,000 on card **1234. Generator fuel, again.</p>
    </div>

    <!-- System Notification — the one that keeps re-popping in a new spot
         instead of parking itself over the card footer, and reads as
         frosted glass so the card underneath stays partly visible. -->
    {#key batteryIndex}
      <div
        class="popup-card battery glass"
        style="{batterySpot.style} --rot: {batterySpot.rot}deg; z-index: 5;"
      >
        <div class="popup-header">
          <span class="icon">🔋</span>
          <span class="app-name">System Notification</span>
        </div>
        <p class="popup-body"><strong>Battery Low (9%)</strong> — Connect your Mac to a power adapter soon or it will sleep.</p>
      </div>
    {/key}
  </div>
{/if}

<style>
  .chaos-layer {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 100;
    will-change: opacity, filter, transform;
    transition: opacity 0.1s var(--ease-standard), transform 0.1s var(--ease-standard), filter 0.1s var(--ease-standard);
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
  .popup-card.twitter { animation-delay: -1.8s; border-left: 4px solid #14171a; }
  .popup-card.instagram { animation-delay: -3.4s; border-left: 4px solid #e1306c; }
  .popup-card.zoom { animation-delay: -0.4s; border-left: 4px solid #2d8cff; }
  .popup-card.trello { animation-delay: -2.9s; border-left: 4px solid #0079bf; }
  .popup-card.bank { animation-delay: -1.5s; border-left: 4px solid #f7931e; }
  .popup-card.battery { border-left: 4px solid #ff9900; }

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

  /* System Notification: re-pops in a new spot on an interval (see
     batteryIndex/{#key} above), and reads as frosted glass — translucent
     enough to still make out the card underneath, not a flat white card
     like the others. */
  .popup-card.glass {
    background: rgba(255, 255, 255, 0.24);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.4);
    animation: batteryPop 0.5s var(--ease-out-expo) both,
               floatChaos 4s ease-in-out infinite alternate 0.5s;
  }
  .popup-card.glass .popup-header,
  .popup-card.glass .popup-header .app-name {
    color: #181818;
  }
  .popup-card.glass .popup-body {
    color: #1c1c1c;
  }

  @keyframes batteryPop {
    0% {
      opacity: 0;
      transform: scale(0.5) rotate(var(--rot, 0deg));
    }
    55% {
      opacity: 1;
      transform: scale(1.05) rotate(var(--rot, 0deg));
    }
    100% {
      opacity: 1;
      transform: scale(0.94) rotate(var(--rot, 0deg));
    }
  }

  /* Hide on very small screens so they don't cover the mobile text —
     the roaming glass battery card stays, since it's translucent. */
  @media (max-width: 680px) {
    .popup-card {
      width: 180px;
      padding: 0.6rem 0.75rem;
    }
    .popup-card.slack,
    .popup-card.calendar,
    .popup-card.email,
    .popup-card.whatsapp,
    .popup-card.twitter,
    .popup-card.instagram,
    .popup-card.zoom,
    .popup-card.trello,
    .popup-card.bank {
      display: none;
    }
  }
</style>
