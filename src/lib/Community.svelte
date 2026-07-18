<script>
  import tarkwaBay from '../../docs/brand-reference/flyer-post-nysc-hangout-tarkwa-bay.png';
  import openCanvas from '../../docs/brand-reference/flyer-open-canvas-jaekel-house.png';
  import saveTheDate from '../../docs/brand-reference/flyer-save-the-date-painting.png';
  import MorphText from './MorphText.svelte';

  export let visible = false;

  const POLAROIDS = [
    { src: tarkwaBay, caption: 'Tarkwa Bay 🌊', rotate: -4 },
    { src: openCanvas, caption: 'Open Canvas 🎨', rotate: 3 },
    { src: saveTheDate, caption: 'Save the date', rotate: -2 },
  ];
</script>

<section class="community">
  <div class="text-content">
    <p class="eyebrow"><MorphText text="Community" /></p>
    <h2 class="heading">Leaving yellow Lagos, entering blue Lagos.</h2>

    <div class="manifesto" class:visible>
      <p>For the young and the working, the ones done with NYSC and starting life. It is also for those who want to take a break from the Lagos palava and wahala.</p>
      <p>For the ones who came to Lagos from other states, seeing Lagos for the beauty that it is: the arts and the paintings on the beach, the artists, the creators, the DJs, the engineers. The free people, the Lagos spirits.</p>
      <p>We gather for the silent reading and quiet musings, the serenity, the blue and the ocean. The yogi, the bonfire, the peaceful.</p>
    </div>

    <div class="cta-row" class:visible>
      <button class="btn-join">Join the community</button>
      <button class="btn-volunteer">Volunteer & Sponsor</button>
    </div>
  </div>

  <div class="wall">
    {#each POLAROIDS as p, i}
      <figure class="polaroid" class:visible style="--rotate: {p.rotate}deg; --i: {i};">
        <img src={p.src} alt={p.caption} loading="lazy" />
        <figcaption>{p.caption}</figcaption>
      </figure>
    {/each}
  </div>
</section>

<style>
  .community {
    max-width: 1200px;
    margin: 0 auto;
    padding: clamp(3rem, 10vh, 6rem) 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }
  
  @media (min-width: 900px) {
    .community {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 6rem;
    }
    .text-content {
      flex: 1 1 50%;
    }
    .wall {
      flex: 1 1 50%;
      justify-content: flex-end;
    }
  }

  .eyebrow {
    margin: 0 0 0.5rem;
    font-family: var(--sans);
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--pink-deep);
  }
  .heading {
    margin: 0 0 2.5rem;
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(1.6rem, 4.5vw, 2.4rem);
    color: var(--ink);
    line-height: 1.15;
  }

  .wall {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(1rem, 3vw, 2rem);
  }

  .polaroid {
    margin: 0;
    width: clamp(150px, 20vw, 220px);
    background: var(--card-surface);
    padding: 0.6rem 0.6rem 1.1rem;
    border-radius: 4px;
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.14);
    opacity: 0;
    transform: translateY(28px) rotate(var(--rotate));
    transition: transform 0.6s var(--ease-out-expo), opacity 0.6s var(--ease-out-expo);
    transition-delay: calc(var(--i, 0) * 110ms);
  }
  .polaroid.visible {
    opacity: 1;
    transform: translateY(0) rotate(var(--rotate));
  }
  .polaroid.visible:hover {
    transition-delay: 0s;
    transform: rotate(0deg) scale(1.03);
    z-index: 10;
  }
  .polaroid img {
    display: block;
    width: 100%;
    aspect-ratio: 9 / 16;
    object-fit: cover;
    border-radius: 2px;
  }
  .polaroid figcaption {
    margin-top: 0.6rem;
    font-family: var(--marker);
    font-size: 1rem;
    color: var(--ink);
    text-align: center;
  }

  .manifesto {
    margin: 0 0 2.5rem;
    font-family: var(--sans);
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    line-height: 1.6;
    color: var(--ink);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo);
  }
  .manifesto p {
    margin: 0 0 1rem;
  }
  .manifesto.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s var(--ease-out-expo) 200ms, transform 0.8s var(--ease-out-expo) 200ms;
  }
  .cta-row.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .btn-join {
    font-family: var(--display);
    font-weight: 700;
    font-size: 1rem;
    background: var(--blue);
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(0, 191, 255, 0.25);
    transition: transform var(--dur-fast), box-shadow var(--dur-fast), background var(--dur-fast);
  }
  .btn-join:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 191, 255, 0.4);
    background: #00aceb;
  }

  .btn-volunteer {
    font-family: var(--display);
    font-weight: 600;
    font-size: 1rem;
    background: transparent;
    color: var(--ink);
    border: 2px solid var(--border-soft-deep);
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    cursor: pointer;
    transition: border-color var(--dur-fast), background var(--dur-fast);
  }
  .btn-volunteer:hover {
    border-color: var(--pink-deep);
    background: rgba(252, 156, 224, 0.05);
  }
</style>
