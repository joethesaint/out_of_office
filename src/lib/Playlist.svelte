<script>
  const TRACKS = [
    { title: 'Salt Air', artist: 'Late Bloom', length: '3:12' },
    { title: 'Slow Tide', artist: 'Nightswim', length: '4:01' },
    { title: 'Soft Static', artist: 'Coastline Radio', length: '2:47' },
    { title: 'No Signal', artist: 'Harmattan', length: '3:35' },
    { title: 'Soul Battery', artist: 'Blue Lagos', length: '3:58' },
  ];
</script>

<section class="playlist">
  <p class="eyebrow">The mood</p>
  <h2 class="heading">Out of Office, the mixtape</h2>
  <p class="body">Five tracks for disconnecting. Press play, put the phone face down.</p>

  <ol class="tracks">
    {#each TRACKS as t, i}
      <li class="track">
        <span class="index">{String(i + 1).padStart(2, '0')}</span>
        <span class="names">
          <span class="title">{t.title}</span>
          <span class="artist">{t.artist}</span>
        </span>
        <span class="length">{t.length}</span>
      </li>
    {/each}
  </ol>
</section>

<style>
  .playlist {
    max-width: 560px;
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
    color: var(--blue);
  }
  .heading {
    margin: 0 0 0.5rem;
    font-family: var(--display);
    font-weight: 700;
    font-size: clamp(1.6rem, 4.5vw, 2.2rem);
    color: var(--ink);
  }
  .body {
    margin: 0 0 2.5rem;
    font-family: var(--sans);
    color: #6b6b6b;
  }

  .tracks {
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: left;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
    overflow: hidden;
  }
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.9rem 1.25rem;
    border-bottom: 1px solid #f0ece5;
  }
  .track:last-child {
    border-bottom: none;
  }
  .index {
    font-family: var(--bungee);
    font-size: 0.7rem;
    color: var(--pink-deep);
    flex: none;
    width: 1.6rem;
  }
  .names {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .title {
    font-family: var(--sans);
    font-weight: 500;
    font-size: 0.95rem;
    color: var(--ink);
  }
  .artist {
    font-family: var(--sans);
    font-size: 0.8rem;
    color: #8a8a8a;
  }
  .length {
    font-family: var(--sans);
    font-size: 0.8rem;
    color: #8a8a8a;
    flex: none;
  }
</style>
