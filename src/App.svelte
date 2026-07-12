<script>
  import RotatingCube from './lib/RotatingCube.svelte';
</script>

<main>
  <div class="stage">
    <RotatingCube />
  </div>
</main>

<style>
  :global(html, body) {
    margin: 0;
    height: 100%;
    background: #111114;
  }
  main {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .stage {
    width: min(70vh, 90vw);
    height: min(70vh, 90vw);
  }
</style>
