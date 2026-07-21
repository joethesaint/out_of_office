<script>
  // Concept 3 (concept.txt): "Floating overlay assistant ... almost like a
  // Tamagotchi ... Homepage: Stress Level ██████████ ... As user scrolls:
  // Stress Level ██░░░░░░░░ ... Then: Mental State: Out of Office."
  // Lives on the site the whole time, not just during the hero — reuses the
  // same hero `progress` App.svelte already drives the cube and notification
  // counter with, so all three read as one consistent taper rather than
  // three separately-invented timelines.
  export let progress = 0; // 0..1, hero scroll progress (App.svelte's smoothedProgress)
  export let activated = false;

  const SEGMENTS = 10;
  $: stressPct = Math.round((1 - progress) * 100);
  $: filledSegments = Math.round((1 - progress) * SEGMENTS);
  $: stage = stressPct === 0 ? "zero" : progress < 0.25 ? "high" : "mid";
</script>

<div
  class="stress-meter"
  data-stage={stage}
  role="img"
  aria-label={activated
    ? "Mental state: Out of Office"
    : `Stress level: ${stressPct} percent`}
>
  {#if activated}
    <p class="meter-label state">Mental State: Out of Office</p>
  {:else}
    <p class="meter-label">Stress Level</p>
    <div class="bar" aria-hidden="true">
      {#each Array(SEGMENTS) as _, i (i)}
        <span class="seg" class:filled={i < filledSegments}></span>
      {/each}
    </div>
    <p class="meter-pct" aria-hidden="true">{stressPct}%</p>
  {/if}
</div>

<style>
  .stress-meter {
    position: fixed;
    left: clamp(1rem, 4vw, 1.75rem);
    bottom: clamp(1.5rem, 5vh, 3rem);
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
    padding: 0.6rem 0.85rem;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(14px) saturate(160%);
    -webkit-backdrop-filter: blur(14px) saturate(160%);
    border: 1px solid rgba(255, 255, 255, 0.55);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.1);
  }

  .meter-label {
    margin: 0;
    font-weight: 700;
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink, #181818);
  }
  .meter-label.state {
    color: var(--blue, #00bfff);
    max-width: 14ch;
  }

  .bar {
    display: flex;
    gap: 2px;
  }
  .seg {
    width: 7px;
    height: 14px;
    border-radius: 2px;
    background: rgba(24, 24, 24, 0.15);
    transition: background var(--dur-base, 0.3s) var(--ease-standard, ease);
  }
  .seg.filled {
    background: var(--chaos-red, #e53838);
  }
  .stress-meter[data-stage="mid"] .seg.filled {
    background: #b8860b;
  }
  .stress-meter[data-stage="zero"] .seg.filled {
    background: var(--blue, #00bfff);
  }

  .meter-pct {
    margin: 0;
    font-weight: 700;
    font-size: 0.7rem;
    font-variant-numeric: tabular-nums;
    color: var(--ink, #181818);
  }

  @media (max-width: 700px) {
    .stress-meter {
      display: none;
    }
  }
</style>
