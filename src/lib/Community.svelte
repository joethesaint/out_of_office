<script>
  import tarkwaBay from '../../docs/brand-reference/flyer-post-nysc-hangout-tarkwa-bay.png';
  import openCanvas from '../../docs/brand-reference/flyer-open-canvas-jaekel-house.png';
  import saveTheDate from '../../docs/brand-reference/flyer-save-the-date-painting.png';

  const POLAROIDS = [
    { src: tarkwaBay, caption: 'Tarkwa Bay 🌊', rotate: -4 },
    { src: openCanvas, caption: 'Open Canvas 🎨', rotate: 3 },
    { src: saveTheDate, caption: 'Save the date', rotate: -2 },
  ];
</script>

<section class="community">
  <p class="eyebrow">Community</p>
  <h2 class="heading">Leaving yellow Lagos, entering blue Lagos.</h2>

  <div class="wall">
    {#each POLAROIDS as p}
      <figure class="polaroid" style="--rotate: {p.rotate}deg">
        <img src={p.src} alt={p.caption} loading="lazy" />
        <figcaption>{p.caption}</figcaption>
      </figure>
    {/each}
  </div>
</section>

<style>
  .community {
    max-width: 900px;
    margin: 0 auto;
    padding: clamp(3rem, 10vh, 6rem) 1.5rem;
    text-align: center;
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
    margin: 0 0 3rem;
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(1.6rem, 4.5vw, 2.4rem);
    color: var(--ink);
  }

  .wall {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(1.25rem, 4vw, 2.5rem);
  }

  .polaroid {
    margin: 0;
    width: clamp(160px, 22vw, 220px);
    background: #fff;
    padding: 0.6rem 0.6rem 1.1rem;
    border-radius: 4px;
    box-shadow: 0 16px 30px rgba(0, 0, 0, 0.14);
    transform: rotate(var(--rotate));
    transition: transform 0.25s ease;
  }
  .polaroid:hover {
    transform: rotate(0deg) scale(1.03);
  }
  .polaroid img {
    display: block;
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: 2px;
  }
  .polaroid figcaption {
    margin-top: 0.6rem;
    font-family: var(--marker);
    font-size: 1rem;
    color: var(--ink);
  }
</style>
