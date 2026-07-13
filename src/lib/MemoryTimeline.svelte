<script>
  export let visible = false;

  const MEMORIES = [
    {
      stamp: 'OOO 001',
      title: 'Open Canvas',
      meta: 'Jaekel House Garden · May 30',
      note: 'You don’t need to know how to paint. Just come with an open mind to create.',
    },
    {
      stamp: 'OOO 002',
      title: 'The Post-NYSC Hangout',
      meta: 'Tarkwa Bay Beach · Apr 11 · 12pm till daybreak',
      note: 'The calming embrace of ocean waves. The soothing breeze. The tranquility of nature.',
    },
    {
      stamp: 'OOO 003',
      title: '???',
      meta: 'Coming soon',
      note: 'Stay tuned.',
      pending: true,
    },
  ];
</script>

<section class="timeline">
  <p class="eyebrow">Memory timeline</p>
  <h2 class="heading">Every escape gets a stamp.</h2>

  <ol class="list">
    {#each MEMORIES as m, i}
      <li class="entry" class:pending={m.pending} class:visible style="--i: {i};">
        <span class="stamp">{m.stamp}</span>
        <div class="details">
          <span class="title">{m.title}</span>
          <span class="meta">{m.meta}</span>
          <span class="note">{m.note}</span>
        </div>
      </li>
    {/each}
  </ol>
</section>

<style>
  .timeline {
    max-width: 640px;
    margin: 0 auto;
    padding: clamp(3rem, 10vh, 6rem) 1.5rem;
  }
  .eyebrow {
    margin: 0 0 0.5rem;
    font-family: var(--sans);
    font-weight: 600;
    font-size: 0.8rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    text-align: center;
  }
  .heading {
    margin: 0 0 3rem;
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(1.6rem, 4.5vw, 2.4rem);
    color: var(--ink);
    text-align: center;
  }

  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-left: 2px solid #e4dfd8;
  }

  .entry {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 0 0 0 1.5rem;
    margin-left: -2px;
    border-left: 2px solid var(--blue);
    position: relative;
    opacity: 0;
    transform: translateX(-16px);
    transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
    transition-delay: calc(var(--i, 0) * 130ms);
  }
  .entry.visible {
    opacity: 1;
    transform: translateX(0);
  }
  .entry.pending {
    border-left-color: #d8d2c8;
  }

  .stamp {
    flex: none;
    font-family: var(--bungee);
    font-size: 0.75rem;
    color: #fff;
    background: var(--blue);
    padding: 0.35rem 0.6rem;
    border-radius: 6px;
    white-space: nowrap;
  }
  .entry.pending .stamp {
    background: #b8b2a8;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    padding-bottom: 0.5rem;
  }
  .title {
    font-family: var(--serif);
    font-weight: 700;
    font-size: clamp(1.2rem, 3.5vw, 1.5rem);
    color: var(--ink);
  }
  .meta {
    font-family: var(--sans);
    font-size: 0.85rem;
    color: var(--pink-deep);
    font-weight: 500;
  }
  .note {
    font-family: var(--sans);
    font-size: 0.9rem;
    color: #6b6b6b;
    margin-top: 0.15rem;
  }
</style>
