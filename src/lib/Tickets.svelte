<script>
  import MorphText from './MorphText.svelte';
  import { muted, toggleMute } from './ambientSound.js';
  import { TICKET_TIERS, SHARED_INCLUSIONS } from './tickets.js';

  export let visible = false;
  export let onOpenDrawer = () => {};

  const TIERS = TICKET_TIERS;
</script>

<section class="tickets-section">
  <div class="header-text" class:visible>
    <p class="eyebrow"><MorphText text="Boarding pass" boost={1.3} /></p>
    <h2 class="heading">Your ticket out of yellow Lagos.</h2>
    <p class="subheading">
      Escape Lagos noise with Release and Unwind Beach Retreat—reconnect with yourself, nature,
      and community through yoga, painting, beach games, picnics, bonfires, and meaningful
      conversations by the ocean. Come for the experience. Leave with the memories.
    </p>
  </div>

  <div class="boarding-pass gamified-float interactive-card" class:visible>
    <!-- Main Pass Body -->
    <div class="pass-main">
      <div class="pass-header">
        <div class="brand-tag">OUT OF OFFICE AIR & MARINE · ONE WAY ESCAPE</div>
        <div class="flight-num">FLIGHT: <strong>OOO-2026</strong></div>
      </div>

      <div class="route-display">
        <div class="route-point">
          <span class="code yellow">LOS</span>
          <span class="city">Yellow Lagos</span>
        </div>
        <div class="route-arrow">
          <span class="travel-icon">⛵</span>
          <div class="line"></div>
          <span class="duration">NON-STOP ESCAPE</span>
        </div>
        <div class="route-point">
          <span class="code blue">OOO</span>
          <span class="city">Blue Lagos (Tarkwa Bay)</span>
          <button
            type="button"
            class="sound-toggle"
            aria-pressed={!$muted}
            aria-label={$muted ? 'Unmute ambient sound' : 'Mute ambient sound'}
            on:click={toggleMute}
          >
            <span aria-hidden="true">{$muted ? '🔇' : '🔊'}</span>
            <span class="sound-toggle-label">{$muted ? 'Sound off' : 'Sound on'}</span>
          </button>
        </div>
      </div>

      <div class="details-grid">
        <div class="detail-item">
          <span class="label">PASSENGER</span>
          <span class="value">LAGOS ESCAPER</span>
        </div>
        <div class="detail-item">
          <span class="label">DATE</span>
          <span class="value">SUN, AUG 16, 2026</span>
        </div>
        <div class="detail-item">
          <span class="label">GATE</span>
          <span class="value">TB-01</span>
        </div>
        <div class="detail-item">
          <span class="label">BOARDING TIME</span>
          <span class="value">IMMEDIATELY</span>
        </div>
        <div class="detail-item col-span">
          <span class="label">SPECIAL INSTRUCTIONS</span>
          <span class="value highlight">Mute work Slack · Leave problems at Marina jetty</span>
        </div>
      </div>
    </div>

    <!-- Perforated Tear Line -->
    <div class="pass-perforation" aria-hidden="true">
      <div class="notch top"></div>
      <div class="dash-line"></div>
      <div class="notch bottom"></div>
    </div>

    <!-- Stub Section -->
    <div class="pass-stub">
      <div class="stub-header">
        <span class="stub-title">STUB COPY</span>
        <span class="seat-badge">SEAT: 1A (SURFSIDE)</span>
      </div>

      <div class="barcode" aria-hidden="true">
        <div class="bars"></div>
        <span class="barcode-num">4 829104 772019 OOO-BNG</span>
      </div>

      <ul class="tier-list">
        {#each TIERS as tier (tier.id)}
          <li class="tier-row">
            <div class="tier-row-main">
              <span class="tier-name">{tier.name}</span>
              <span class="tier-price">{tier.label}</span>
            </div>
            <p class="tier-diff">{tier.sleeping}{#if tier.extras.length} · {tier.extras.join(' · ')}{/if}</p>
          </li>
        {/each}
      </ul>

      <p class="shared-inclusions">
        <strong>Both passes include:</strong> {SHARED_INCLUSIONS.join(' · ')}
      </p>

      <button type="button" class="cta-btn" on:click={onOpenDrawer}>
        Claim Your Pass →
      </button>
      <span class="fine-print">Secured by Paystack · Release & Unwind, Tarkwa Bay</span>
    </div>
  </div>
</section>

<style>
  .tickets-section {
    max-width: 920px;
    margin: 0 auto;
    padding: clamp(3rem, 10vh, 7rem) 1.5rem clamp(4rem, 12vh, 8rem);
    /* warm-sand wash — the ticket is the last stop of the journey (Tarkwa Bay
       arrival), so a beach-sand tint under the boarding pass reads truer to
       concept.txt's escape palette than plain cream. */
    background: radial-gradient(ellipse at 50% 100%, rgba(232, 201, 160, 0.4), transparent 70%);
    border-radius: 32px;
  }

  .header-text {
    text-align: center;
    margin-bottom: 2.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
  }
  .header-text.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .eyebrow {
    margin: 0 0 0.4rem;
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent, #e0568f);
  }
  .heading {
    margin: 0 0 0.5rem;
    font-weight: 700;
    font-size: clamp(2rem, 5vw, 2.8rem);
    color: var(--blue, #00bfff);
  }
  .subheading {
    margin: 0;
    color: #666;
    font-size: 1rem;
  }

  /* Boarding Pass Layout */
  .boarding-pass {
    background: var(--card-surface);
    border-radius: 20px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 2px solid var(--ink);
    display: flex;
    overflow: hidden;
    position: relative;
    font-family: var(--font-mono, 'JetBrains Mono', 'Fira Code', 'Courier New', monospace);
    opacity: 0;
    transform: translateY(32px);
    transition: transform 0.6s var(--ease-out-expo), opacity 0.6s var(--ease-out-expo),
                box-shadow var(--dur-base) var(--ease-standard);
    transition-delay: 140ms;
  }
  .boarding-pass.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .boarding-pass.visible:hover {
    transition-delay: 0s;
    transform: translateY(-4px);
    box-shadow: 0 26px 60px rgba(0, 191, 255, 0.18), 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  /* Left Main Pass */
  .pass-main {
    flex: 1 1 auto;
    padding: 1.8rem 2.2rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    background: var(--card-surface);
  }

  .pass-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid var(--ink);
    padding-bottom: 0.8rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--muted);
  }
  .brand-tag {
    color: var(--ink);
  }
  .flight-num strong {
    color: var(--blue, #00bfff);
    font-size: 0.95rem;
  }

  /* Route Display */
  .route-display {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
  }
  .route-point {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .route-point .code {
    font-weight: 700;
    font-size: clamp(2.2rem, 5vw, 3.2rem);
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .route-point .code.yellow { color: #e6b800; }
  .route-point .code.blue { color: var(--blue, #00bfff); }
  
  .route-point .city {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--muted);
    text-transform: uppercase;
  }

  .sound-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    margin-top: 0.4rem;
    padding: 0.3rem 0.6rem;
    border: 1.5px solid var(--blue, #00bfff);
    border-radius: 999px;
    background: rgba(0, 191, 255, 0.06);
    color: var(--blue, #00bfff);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  }
  .sound-toggle:hover {
    background: rgba(0, 191, 255, 0.14);
    transform: translateY(-1px);
  }
  .sound-toggle:active {
    transform: translateY(0);
  }
  .sound-toggle:focus-visible {
    outline: 2px solid var(--blue, #00bfff);
    outline-offset: 2px;
  }

  .route-arrow {
    flex: 1;
    max-width: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    padding: 0 1rem;
  }
  .travel-icon {
    font-size: 1.4rem;
    animation: boatBob 3s ease-in-out infinite;
  }
  .route-arrow .line {
    width: 100%;
    height: 2px;
    background: var(--ink);
    position: relative;
  }
  .route-arrow .line::after {
    content: '';
    position: absolute;
    right: 0;
    top: -3px;
    width: 8px;
    height: 8px;
    border-top: 2px solid var(--ink);
    border-right: 2px solid var(--ink);
    transform: rotate(45deg);
  }
  .route-arrow .duration {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--accent, #e0568f);
  }

  /* Details Grid */
  .details-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.1rem 1.5rem;
    background: rgba(128, 128, 128, 0.05);
    padding: 1.2rem 1.4rem;
    border-radius: 12px;
    border: 1px solid rgba(128, 128, 128, 0.15);
  }
  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .detail-item.col-span {
    grid-column: span 2;
    border-top: 1px dashed rgba(128, 128, 128, 0.25);
    padding-top: 0.8rem;
  }
  .detail-item .label {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: var(--muted);
  }
  .detail-item .value {
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--ink);
  }
  .detail-item .value.highlight {
    color: var(--accent, #e0568f);
  }

  /* Perforation Section */
  .pass-perforation {
    position: relative;
    width: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--card-surface);
  }
  .dash-line {
    height: 100%;
    border-left: 2px dashed var(--border-dashed);
  }
  .notch {
    position: absolute;
    width: 24px;
    height: 24px;
    background: transparent;
    border: 2px solid var(--ink);
    border-radius: 50%;
    z-index: 2;
  }
  .notch.top {
    top: -14px;
    border-top-color: transparent;
  }
  .notch.bottom {
    bottom: -14px;
    border-bottom-color: transparent;
  }

  /* Stub Section */
  .pass-stub {
    width: clamp(230px, 28vw, 290px);
    padding: 1.8rem 1.6rem;
    background: rgba(128, 128, 128, 0.05);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    gap: 1.4rem;
    transition: transform 0.5s var(--ease-out-expo);
    transform-origin: left center;
  }
  .boarding-pass.visible:hover .pass-stub {
    transform: rotate(2deg) translateX(4px);
  }
  .stub-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .stub-title {
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    color: var(--muted);
  }
  .seat-badge {
    background: var(--ink);
    color: var(--bg);
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.35rem 0.6rem;
    border-radius: 6px;
    letter-spacing: 0.05em;
  }

  .barcode {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }
  .barcode .bars {
    width: 100%;
    height: 48px;
    background: repeating-linear-gradient(
      90deg,
      var(--ink) 0px,
      var(--ink) 3px,
      transparent 3px,
      transparent 5px,
      var(--ink) 5px,
      var(--ink) 9px,
      transparent 9px,
      transparent 11px,
      var(--ink) 11px,
      var(--ink) 13px,
      transparent 13px,
      transparent 18px,
      var(--ink) 18px,
      var(--ink) 20px
    );
  }
  .barcode-num {
    font-family: monospace;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    color: var(--muted);
  }

  .tier-list {
    width: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .tier-row {
    width: 100%;
    padding: 0.6rem 0.9rem;
    border-radius: 12px;
    border: 1.5px solid rgba(128, 128, 128, 0.25);
    text-align: left;
  }
  .tier-row-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tier-name {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--ink);
  }
  .tier-price {
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--blue, #00bfff);
  }

  .tier-diff {
    margin: 0.2rem 0 0;
    font-size: 0.7rem;
    font-weight: 600;
    line-height: 1.4;
    color: var(--muted);
    text-align: left;
  }

  .shared-inclusions {
    margin: 0;
    font-size: 0.68rem;
    line-height: 1.5;
    color: var(--muted);
    text-align: left;
  }

  .shared-inclusions strong {
    color: var(--ink);
  }

  .cta-btn {
    display: inline-block;
    width: 100%;
    font-weight: 700;
    font-size: 0.95rem;
    color: #fff;
    background: var(--blue, #00bfff);
    padding: 0.9rem 1rem;
    border: none;
    border-radius: 999px;
    text-decoration: none;
    box-shadow: 0 10px 24px rgba(0, 191, 255, 0.28);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
    font-family: inherit;
  }
  .cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(0, 191, 255, 0.4);
  }
  .cta-btn:focus-visible {
    outline: 2px solid var(--blue, #00bfff);
    outline-offset: 3px;
  }
  .cta-btn:disabled {
    opacity: 0.7;
    cursor: default;
    transform: none;
  }
  .fine-print {
    font-size: 0.68rem;
    color: var(--muted);
  }

  @keyframes boatBob {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-4px) rotate(6deg); }
  }

  @media (max-width: 760px) {
    .boarding-pass {
      flex-direction: column;
    }
    .pass-perforation {
      width: 100%;
      height: 24px;
      flex-direction: row;
    }
    .dash-line {
      width: 100%;
      height: 0;
      border-left: none;
      border-top: 2px dashed var(--border-dashed);
    }
    .notch.top {
      top: 0;
      left: -14px;
      border-left-color: transparent;
    }
    .notch.bottom {
      bottom: 0;
      right: -14px;
      border-right-color: transparent;
    }
    .pass-stub {
      width: 100%;
    }
    .boarding-pass.visible:hover .pass-stub {
      transform: translateY(4px) rotate(1deg);
      transform-origin: top center;
    }
    .details-grid {
      grid-template-columns: 1fr;
    }
    .detail-item.col-span {
      grid-column: span 1;
    }
  }
</style>
