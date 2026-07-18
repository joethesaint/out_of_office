<script>
  export let progress = 0;

  // Boat crosses right-to-left during the first half of the scroll journey
  // (danfo bus takes the second half, see DanfoBus.svelte) — mirrors the
  // brief's "boat = arrival" beat, now tied to actual scroll position
  // instead of a wall-clock timer.
  const START = 0.08;
  const END = 0.45;
  const FADE = 0.12; // fraction of the [START,END] window used for fade in/out

  $: t = Math.max(0, Math.min(1, (progress - START) / (END - START)));
  $: left = progress <= START ? 115 : progress >= END ? -40 : 115 + (-30 - 115) * t;
  $: opacity =
    progress <= START || progress >= END
      ? 0
      : Math.min(1, t / FADE, (1 - t) / FADE);
</script>

<div class="boat-track" aria-hidden="true">
  <div class="boat-travel" style="transform: translateX({left}vw); opacity: {opacity};">
    <div class="boat-rig">
      <svg viewBox="0 0 160 90" class="boat-svg">
        <!-- Water wake / ripples -->
        <path d="M5 75 Q 30 82, 60 75 T 120 75" fill="none" stroke="var(--blue, #00bfff)" stroke-width="2.5" stroke-linecap="round" opacity="0.6" />
        <path d="M15 82 Q 45 88, 85 82 T 145 82" fill="none" stroke="var(--pink-deep, #fc9ce0)" stroke-width="2" stroke-linecap="round" opacity="0.4" />

        <!-- Boat Hull (sleek Tarkwa Bay speed/ferry boat) -->
        <path d="M15 52 L135 52 L120 72 L30 72 Z" fill="#f6f4f1" stroke="#181818" stroke-width="3.5" stroke-linejoin="round" />

        <!-- Hull Stripe -->
        <path d="M22 62 L127 62 L122 68 L28 68 Z" fill="var(--blue, #00bfff)" />

        <!-- Cabin / Canopy -->
        <path d="M45 52 L55 30 L105 30 L115 52 Z" fill="var(--pink-deep, #fc9ce0)" stroke="#181818" stroke-width="3" stroke-linejoin="round" />

        <!-- Windows -->
        <rect x="58" y="36" width="12" height="10" rx="2" fill="#181818" />
        <rect x="74" y="36" width="12" height="10" rx="2" fill="#181818" />
        <rect x="90" y="36" width="12" height="10" rx="2" fill="#181818" />

        <!-- Outboard Motor on left / rear -->
        <rect x="6" y="46" width="12" height="24" rx="3" fill="#333" stroke="#181818" stroke-width="2.5" transform="rotate(-8, 12, 58)" />
        <path d="M2,66 C0,72 8,76 14,70" fill="none" stroke="#fff" stroke-width="2" opacity="0.8" />

        <!-- Small OOO Flag waving -->
        <line x1="108" y1="30" x2="108" y2="16" stroke="#181818" stroke-width="2.5" stroke-linecap="round" />
        <path d="M108 16 L126 21 L108 26 Z" fill="var(--blue, #00bfff)" stroke="#181818" stroke-width="2" stroke-linejoin="round" />
      </svg>
    </div>
  </div>
</div>

<style>
  .boat-track {
    position: absolute;
    left: 0;
    bottom: 16%;
    width: 100%;
    height: 65px;
    pointer-events: none;
    z-index: 0;
    overflow: visible;
  }

  /* On the mobile stacked hero layout the cube sits in this same vertical
     band; drop the boat below it so they don't cross. */
  @media (max-width: 700px) {
    .boat-track {
      bottom: 2%;
      height: 44px;
    }
  }

  .boat-travel {
    position: absolute;
    top: 0;
    width: 140px;
    height: 100%;
    transition: opacity var(--dur-base) var(--ease-standard);
  }

  .boat-rig {
    width: 100%;
    height: 100%;
    animation: boatBob 12s ease-in-out infinite;
  }

  .boat-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  /* horizontal position/opacity now come from the `progress` prop (see
     script block) so the boat's crossing is tied to actual scroll rather
     than a wall-clock loop; this keyframe only handles the idle bob/rock. */
  @keyframes boatBob {
    0%,
    10% {
      transform: translateY(0) rotate(0deg);
    }
    15% {
      transform: translateY(4px) rotate(2deg);
    }
    22% {
      transform: translateY(-3px) rotate(-1.5deg);
    }
    29% {
      transform: translateY(4px) rotate(2deg);
    }
    36% {
      transform: translateY(-3px) rotate(-1deg);
    }
    44% {
      transform: translateY(3px) rotate(1.5deg);
    }
    50%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
  }
</style>
