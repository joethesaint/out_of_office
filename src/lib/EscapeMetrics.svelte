<script>
  export let visible = false;

  const STATS = [
    { value: '87', label: 'Emails ignored', color: 'var(--blue)' },
    { value: '62%', label: 'Stress reduced', color: 'var(--sunset-orange)' },
    { value: '∞', label: 'New friendships', color: 'var(--muted-green)' },
    { value: '100%', label: 'Battery recharged', color: 'var(--pink-deep)' },
  ];
</script>

<section class="metrics">
  <p class="eyebrow" class:visible>The auto reply</p>
  <h2 class="heading" class:visible>I am currently unavailable.</h2>
  <p class="body" class:visible>
    I'm painting. Playing board games. Watching sunsets. Making memories.
    I will return when my soul battery is charged.
  </p>

  <div class="grid">
    {#each STATS as stat, i}
      <div class="tile" class:visible style="--i: {i};">
        <span class="value" style="color: {stat.color}">{stat.value}</span>
        <span class="label">{stat.label}</span>
      </div>
    {/each}
  </div>
</section>

<style>
  .metrics {
    max-width: 640px;
    margin: 0 auto;
    padding: clamp(3rem, 10vh, 6rem) 1.5rem;
    text-align: center;
  }
  .eyebrow,
  .heading,
  .body,
  .tile {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
  }
  .eyebrow.visible,
  .heading.visible,
  .body.visible,
  .tile.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .heading.visible { transition-delay: 90ms; }
  .body.visible { transition-delay: 160ms; }
  .tile.visible { transition-delay: calc(220ms + var(--i, 0) * 90ms); }

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
    margin: 0 0 0.75rem;
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(1.8rem, 5vw, 2.6rem);
    color: var(--ink);
  }
  .body {
    margin: 0 auto 2.5rem;
    max-width: 34ch;
    font-family: var(--sans);
    font-size: 1rem;
    color: #5a5a5a;
    line-height: 1.6;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  .tile {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1.5rem 1rem;
    border-radius: 16px;
    background: #ffffff;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
  }
  .value {
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(1.8rem, 6vw, 2.4rem);
  }
  .label {
    font-family: var(--sans);
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #6b6b6b;
  }
</style>
