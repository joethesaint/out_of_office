<script>
  export let progress = 0;
  
  // Clutter fades out as progress goes from 0 to 0.7
  $: opacity = Math.max(0, 1 - (progress * 1.4));
</script>

<div class="clutter-layer" style="opacity: {opacity}; pointer-events: {opacity > 0.1 ? 'auto' : 'none'};" aria-hidden="true">
  <!-- Fake UI elements -->
  <div class="toast slack pop-1">
    <div class="icon">#</div>
    <div class="content">
      <strong>marketing-team</strong>
      <span>@here can we get those numbers EOD?</span>
    </div>
  </div>
  
  <div class="toast email pop-2">
    <div class="icon">@</div>
    <div class="content">
      <strong>URGENT: Revisions</strong>
      <span>Need this updated ASAP before the call.</span>
    </div>
  </div>
  
  <div class="toast whatsapp pop-3">
    <div class="icon">💬</div>
    <div class="content">
      <strong>Aunty</strong>
      <span>When are you coming to visit us?</span>
    </div>
  </div>
  
  <div class="toast cal pop-4">
    <div class="icon">🗓️</div>
    <div class="content">
      <strong>Sync: Alignment</strong>
      <span>Starting in 5 minutes</span>
    </div>
  </div>
  
  <div class="battery">
    <span>10%</span>
    <div class="battery-icon"></div>
  </div>
</div>

<style>
  .clutter-layer {
    position: absolute;
    inset: 0;
    z-index: 0; /* behind the hero content */
    overflow: hidden;
    transition: opacity 0.1s ease-out;
  }
  
  .toast {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    font-family: var(--sans);
    font-size: 0.75rem;
    color: var(--ink);
    border-left: 4px solid var(--blue);
    transform: rotate(var(--rot)) scale(var(--s));
    will-change: transform;
    animation: floatLayer 6s ease-in-out infinite alternate;
  }
  
  .toast .icon {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--blue);
  }
  
  .toast .content {
    display: flex;
    flex-direction: column;
  }
  
  .toast strong {
    font-weight: 600;
  }
  
  .toast span {
    color: #6b6b6b;
  }
  
  .slack {
    top: 15%;
    left: 8%;
    --rot: -5deg;
    --s: 1;
    border-color: #e01e5a;
  }
  .slack .icon { color: #e01e5a; }
  
  .email {
    top: 60%;
    right: 5%;
    --rot: 3deg;
    --s: 1.1;
    border-color: #0078d4;
  }
  .email .icon { color: #0078d4; }
  
  .whatsapp {
    bottom: 20%;
    left: 15%;
    --rot: 8deg;
    --s: 0.95;
    border-color: #25d366;
  }
  .whatsapp .icon { font-size: 1.1rem; }
  
  .cal {
    top: 25%;
    right: 12%;
    --rot: -7deg;
    --s: 0.9;
    border-color: #fc9ce0;
  }
  
  .battery {
    position: absolute;
    top: 8%;
    right: 5%;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-family: var(--sans);
    font-size: 0.75rem;
    font-weight: 700;
    color: #ff3b30;
    transform: rotate(15deg);
  }
  
  .battery-icon {
    width: 24px;
    height: 12px;
    border: 2px solid #ff3b30;
    border-radius: 3px;
    position: relative;
    background: linear-gradient(90deg, #ff3b30 15%, transparent 15%);
  }
  .battery-icon::after {
    content: '';
    position: absolute;
    top: 2px;
    right: -4px;
    width: 2px;
    height: 4px;
    background: #ff3b30;
    border-radius: 1px;
  }
  
  @keyframes floatLayer {
    0% { transform: rotate(var(--rot)) scale(var(--s)) translateY(0); }
    100% { transform: rotate(calc(var(--rot) + 2deg)) scale(var(--s)) translateY(-15px); }
  }
</style>
