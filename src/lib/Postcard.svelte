<script>
  import postcardImg from '../../docs/brand-reference/postcard-greetings-from-out-of-office.jpg';
</script>

<section class="postcard-section">
  <p class="eyebrow">Wish you were here</p>
  <figure class="postcard">
    <img src={postcardImg} alt="Greetings from Out of Office" loading="lazy" />
    <span class="stamp">
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="3 2" />
        <text x="20" y="17" text-anchor="middle" font-size="7" fill="#fff" font-family="var(--tag)">OOO</text>
        <text x="20" y="27" text-anchor="middle" font-size="6" fill="#fff" font-family="var(--sans)">LAGOS</text>
      </svg>
    </span>
  </figure>
  <p class="caption">A postcard for whenever you're out of office — not just Tarkwa Bay.</p>
</section>

<style>
  .postcard-section {
    max-width: 720px;
    margin: 0 auto;
    padding: clamp(3rem, 10vh, 6rem) 1.5rem;
    text-align: center;
  }
  .eyebrow {
    margin: 0 0 1.5rem;
    font-family: var(--marker);
    font-size: clamp(1.1rem, 3vw, 1.5rem);
    color: var(--pink-deep);
  }

  .postcard {
    position: relative;
    margin: 0;
    display: inline-block;
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

  .stamp {
    position: absolute;
    top: 0.9rem;
    right: 0.9rem;
    width: clamp(44px, 8vw, 56px);
    height: clamp(44px, 8vw, 56px);
    opacity: 0.85;
  }
  .stamp svg {
    width: 100%;
    height: 100%;
  }

  .caption {
    margin: 1.5rem 0 0;
    font-family: var(--sans);
    font-size: 0.85rem;
    color: #6b6b6b;
  }
</style>
