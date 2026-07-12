<script>
  const TICKET_URL = 'https://tix.africa/discover/outofofficeng';
</script>

<section class="tickets">
  <p class="eyebrow">Boarding pass</p>
  <h2 class="heading">Get your ticket out.</h2>
  <p class="body">
    Destination: Out of Office. Permission to disconnect, granted.
  </p>

  <a class="cta" href={TICKET_URL} target="_blank" rel="noreferrer">
    Get Tickets →
  </a>

  <p class="fine-print">Terms and conditions apply · Tickets on tix.africa</p>
</section>

<style>
  .tickets {
    max-width: 560px;
    margin: 0 auto;
    padding: clamp(3rem, 10vh, 7rem) 1.5rem clamp(4rem, 12vh, 8rem);
    text-align: center;
  }
  .eyebrow {
    margin: 0 0 0.5rem;
    font-family: var(--sans);
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
  }
  .heading {
    margin: 0 0 0.5rem;
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(2rem, 6vw, 3rem);
    color: var(--blue);
  }
  .body {
    margin: 0 0 2rem;
    font-family: var(--sans);
    color: #5a5a5a;
  }

  .cta {
    display: inline-block;
    font-family: var(--display);
    font-weight: 700;
    font-size: 1.15rem;
    color: #fff;
    background: linear-gradient(135deg, var(--blue), var(--pink-deep));
    padding: 1rem 2.25rem;
    border-radius: 999px;
    text-decoration: none;
    box-shadow: 0 16px 34px rgba(224, 86, 143, 0.28);
    transition: transform 0.2s ease;
  }
  .cta:hover {
    transform: translateY(-2px);
  }

  .fine-print {
    margin: 1.75rem 0 0;
    font-family: var(--sans);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #9a9a9a;
  }
</style>
