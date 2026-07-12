<script>
  export let progress = 0;
</script>

<div class="boat-container" aria-hidden="true">
  <!-- Boat moves from left to right as progress increases -->
  <div class="boat" style="transform: translateX(calc({progress * 110}vw - 5vw));">
    <svg viewBox="0 0 100 40">
      <!-- simple minimalist boat -->
      <path d="M15 25 L85 25 L75 35 L25 35 Z" fill="var(--ink)"/>
      <path d="M45 5 L45 25 L65 25 Z" fill="var(--accent)"/>
    </svg>
  </div>
  
  <!-- Waves fade in as we get closer to Out of Office -->
  <div class="waves" style="opacity: {progress}">
    <svg viewBox="0 0 100 10" preserveAspectRatio="none">
      <path d="M0 5 Q 12.5 0, 25 5 T 50 5 T 75 5 T 100 5 L 100 10 L 0 10 Z" fill="var(--blue)" opacity="0.3"/>
    </svg>
  </div>
</div>

<style>
  .boat-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: clamp(40px, 8vh, 60px);
    pointer-events: none;
    z-index: 5;
    overflow: hidden;
  }
  .boat {
    position: absolute;
    bottom: 5px;
    left: 0;
    width: clamp(30px, 5vw, 50px);
    height: auto;
    will-change: transform;
  }
  .waves {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 15px;
  }
  .waves svg {
    width: 100%;
    height: 100%;
  }
</style>
