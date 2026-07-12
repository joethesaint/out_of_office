<script>
  export let progress = 0;
  const TICKET_URL = 'https://tix.africa/discover/outofofficeng';
</script>

<section class="tickets-section">
  <div class="header-text">
    <p class="eyebrow">Boarding pass</p>
    <h2 class="heading">Your ticket out of yellow Lagos.</h2>
    <p class="subheading">Destination: Out of Office. Permission to disconnect, granted.</p>
  </div>

  <div class="boarding-pass">
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
        </div>
      </div>

      <div class="details-grid">
        <div class="detail-item">
          <span class="label">PASSENGER</span>
          <span class="value">LAGOS ESCAPER</span>
        </div>
        <div class="detail-item">
          <span class="label">DATE</span>
          <span class="value">ANYTIME</span>
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

      <a class="cta-btn" href={TICKET_URL} target="_blank" rel="noopener noreferrer">
        Claim Boarding Pass →
      </a>
      <span class="fine-print">Powered by tix.africa</span>
    </div>
  </div>
</section>

<style>
  .tickets-section {
    max-width: 920px;
    margin: 0 auto;
    padding: clamp(3rem, 10vh, 7rem) 1.5rem clamp(4rem, 12vh, 8rem);
    font-family: var(--sans);
  }

  .header-text {
    text-align: center;
    margin-bottom: 2.5rem;
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
    font-family: var(--display);
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
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 2px solid #181818;
    display: flex;
    overflow: hidden;
    position: relative;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .boarding-pass:hover {
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
    background: linear-gradient(135deg, #ffffff 0%, #faf8f5 100%);
  }

  .pass-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #181818;
    padding-bottom: 0.8rem;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #555;
  }
  .brand-tag {
    color: #181818;
  }
  .flight-num strong {
    color: var(--blue, #00bfff);
    font-family: var(--display);
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
    font-family: var(--display);
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
    color: #666;
    text-transform: uppercase;
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
    background: #181818;
    position: relative;
  }
  .route-arrow .line::after {
    content: '';
    position: absolute;
    right: 0;
    top: -3px;
    width: 8px;
    height: 8px;
    border-top: 2px solid #181818;
    border-right: 2px solid #181818;
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
    background: #f4f1eb;
    padding: 1.2rem 1.4rem;
    border-radius: 12px;
    border: 1px solid rgba(24, 24, 24, 0.12);
  }
  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }
  .detail-item.col-span {
    grid-column: span 2;
    border-top: 1px dashed rgba(24, 24, 24, 0.2);
    padding-top: 0.8rem;
  }
  .detail-item .label {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #777;
  }
  .detail-item .value {
    font-size: 0.88rem;
    font-weight: 700;
    color: #181818;
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
    background: #ffffff;
  }
  .dash-line {
    height: 100%;
    border-left: 2px dashed #bbb;
  }
  .notch {
    position: absolute;
    width: 24px;
    height: 24px;
    background: var(--bg, #f6f4f1);
    border: 2px solid #181818;
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
    background: #fbf9f6;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    gap: 1.4rem;
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
    color: #888;
  }
  .seat-badge {
    background: #181818;
    color: #fff;
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
      #181818 0px,
      #181818 3px,
      transparent 3px,
      transparent 5px,
      #181818 5px,
      #181818 9px,
      transparent 9px,
      transparent 11px,
      #181818 11px,
      #181818 13px,
      transparent 13px,
      transparent 18px,
      #181818 18px,
      #181818 20px
    );
  }
  .barcode-num {
    font-family: monospace;
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    color: #444;
  }

  .cta-btn {
    display: inline-block;
    width: 100%;
    font-family: var(--display);
    font-weight: 700;
    font-size: 0.95rem;
    color: #fff;
    background: linear-gradient(135deg, var(--blue, #00bfff), var(--pink-deep, #fc9ce0));
    padding: 0.9rem 1rem;
    border-radius: 999px;
    text-decoration: none;
    box-shadow: 0 10px 24px rgba(0, 191, 255, 0.28);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(0, 191, 255, 0.4);
  }
  .fine-print {
    font-size: 0.68rem;
    color: #888;
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
      border-top: 2px dashed #bbb;
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
    .details-grid {
      grid-template-columns: 1fr;
    }
    .detail-item.col-span {
      grid-column: span 1;
    }
  }
</style>
