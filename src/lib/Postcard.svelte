<script>
  import postcardImg from '../../docs/brand-reference/postcard-greetings-from-out-of-office.jpg';
  import stampImg from '../../docs/brand-reference/postcard-out-of-office-stamp.jpg';
  import MorphText from './MorphText.svelte';

  export let visible = false;
</script>

<section class="postcard-section">
  <div class="text-content">
    <p class="eyebrow" class:visible><MorphText text="Wish you were here" /></p>
    <p class="caption" class:visible>A postcard for whenever you're out of office — not just Tarkwa Bay.</p>
  </div>

  <div class="collage" class:visible>
    <figure class="postcard gamified-float interactive-card">
      <img src={postcardImg} alt="Greetings from Out of Office" loading="lazy" />
    </figure>
    <figure class="stamp-photo gamified-float interactive-card">
      <img src={stampImg} alt="Out of Office postage stamp, July 18 to August 18" loading="lazy" />
    </figure>
  </div>
</section>

<style>
  .postcard-section {
    max-width: 900px;
    margin: 0 auto;
    padding: clamp(3rem, 10vh, 6rem) 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }

  @media (min-width: 768px) {
    .postcard-section {
      flex-direction: row;
      justify-content: space-between;
      gap: 4rem;
    }
    .text-content {
      flex: 1 1 40%;
    }
    .collage {
      flex: 1 1 60%;
      margin: 0;
    }
  }

  .eyebrow,
  .collage,
  .caption {
    opacity: 0;
    transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
  }
  .eyebrow.visible,
  .collage.visible,
  .caption.visible {
    opacity: 1;
  }
  .caption.visible { transition-delay: 220ms; }

  .eyebrow {
    margin: 0 0 1rem;
    font-size: clamp(1.4rem, 3.5vw, 1.8rem);
    color: var(--pink-deep);
    transform: translateY(16px);
  }
  .eyebrow.visible {
    transform: translateY(0);
  }

  /* Two photos scattered together like a scrapbook page — the postcard
     sits underneath, the stamp photo overlaps its corner on top */
  .collage {
    position: relative;
    max-width: 100%;
    display: inline-block;
    transform: translateY(24px);
  }
  .collage.visible {
    transform: translateY(0);
  }

  .postcard {
    position: relative;
    margin: 0;
    display: block;
    max-width: 100%;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 24px 50px rgba(0, 0, 0, 0.18);
    transform: rotate(-1.5deg);
  }
  .postcard img {
    display: block;
    width: 100%;
    max-width: 520px;
    height: auto;
  }

  .stamp-photo {
    position: absolute;
    right: -6%;
    bottom: -12%;
    z-index: 1;
    margin: 0;
    width: clamp(120px, 34%, 190px);
    padding: 0.4rem 0.4rem 1.1rem;
    background: var(--card-surface, #fff);
    border-radius: 4px;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.22);
    transform: rotate(6deg);
    transition: opacity 0.6s var(--ease-out-expo) 180ms, transform 0.6s var(--ease-out-expo) 180ms;
    opacity: 0;
  }
  .collage.visible .stamp-photo {
    opacity: 1;
  }
  .stamp-photo img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 2px;
  }

  @media (max-width: 480px) {
    .stamp-photo {
      right: -4%;
      bottom: -10%;
      width: clamp(96px, 38%, 150px);
    }
  }

  .caption {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #6b6b6b;
    transform: translateY(16px);
  }
  .caption.visible {
    transform: translateY(0);
  }
</style>
