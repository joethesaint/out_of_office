<script>
  const TICKET_URL = 'https://tix.africa/discover/outofofficeng';
</script>

<section class="tickets">
  <p class="eyebrow">Boarding pass</p>
  <h2 class="heading">Get your ticket out.</h2>
  <p class="body">
    Destination: Out of Office. Permission to disconnect, granted.
  </p>

  <a class="cta" href={TICKET_URL} target="_blank" rel="noopener noreferrer">
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
    background: linear-gradient(135deg, var(--blue), var(--pink-deep), var(--accent), var(--blue));
    background-size: 300% 300%;
    animation: gradientShift 6s ease infinite;
    padding: 1rem 2.25rem;
    border-radius: 999px;
    text-decoration: none;
    box-shadow: 0 16px 34px rgba(224, 86, 143, 0.28);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .cta:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 20px 40px rgba(224, 86, 143, 0.4);
  }
  .cta:focus-visible {
    outline: 3px solid var(--blue);
    outline-offset: 4px;
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
