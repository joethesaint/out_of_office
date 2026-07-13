<script>
  import { pageProgress } from './scrollProgress.js';

  export let text;
  // Local multiplier lets a caller push its own morph further/less than raw
  // page scroll fraction (e.g. Tickets, being last, can lean fully
  // handwritten well before the literal bottom of the document).
  export let boost = 1;

  $: p = Math.max(0, Math.min(1, $pageProgress * boost));
</script>

<span class="morph-text" style="--p: {p}">
  <span class="mt-corporate" aria-hidden="true">{text}</span>
  <span class="mt-hand" aria-hidden="true">{text}</span>
  <span class="mt-sr-only">{text}</span>
</span>

<style>
  /* Corporate (grotesk, tracked-out caps) crossfades into handwritten
     (marker script) as --p climbs from 0 to 1 — a continuous scroll-tied
     morph rather than a fixed per-element font assignment. Both states
     occupy the same grid cell so there's no layout jump mid-fade. */
  .morph-text {
    position: relative;
    display: inline-grid;
  }
  .mt-corporate,
  .mt-hand {
    grid-area: 1 / 1;
    transition: opacity 0.25s linear;
    white-space: nowrap;
  }
  .mt-corporate {
    opacity: calc(1 - var(--p));
    text-transform: uppercase;
  }
  .mt-hand {
    opacity: var(--p);
    font-family: var(--marker);
    text-transform: none;
    letter-spacing: 0.02em;
    transform: rotate(-3deg);
    color: var(--pink-deep);
  }
  .mt-sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  @media (prefers-reduced-motion: reduce) {
    .mt-corporate,
    .mt-hand {
      transition: none;
    }
  }
</style>
