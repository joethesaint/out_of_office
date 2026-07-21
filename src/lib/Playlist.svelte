<script>
  import MorphText from './MorphText.svelte';

  export let visible = false;

</script>

<section class="playlist">
  <div class="text-content">
    <p class="eyebrow"><MorphText text="The mood" boost={1.15} /></p>
    <h2 class="heading">Out of Office, the mixtape</h2>
    <p class="body">Five tracks for disconnecting. Put the phone face down.</p>
  </div>

  <div class="embed-wrapper" class:visible>
    <iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/5uJnnaFGzzaBcunJz6HA0h?utm_source=generator&theme=0&si=bcca622a34564cf1" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
  </div>
</section>

<style>
  .playlist {
    max-width: 960px;
    margin: 0 auto;
    padding: clamp(3rem, 10vh, 6rem) 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  
  @media (min-width: 768px) {
    .playlist {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 4rem;
    }
    .text-content {
      flex: 1 1 40%;
    }
    .embed-wrapper {
      flex: 1 1 60%;
      width: 100%;
    }
  }

  .eyebrow {
    margin: 0 0 0.5rem;
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--blue);
  }
  .heading {
    margin: 0 0 0.75rem;
    font-weight: 700;
    font-size: clamp(1.6rem, 4.5vw, 2.2rem);
    color: var(--ink);
    line-height: 1.15;
  }
  .body {
    margin: 0;
    color: var(--muted);
    line-height: 1.6;
  }

  .embed-wrapper {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
    transition-delay: 200ms;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
    border-radius: 12px;
  }
  .embed-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
