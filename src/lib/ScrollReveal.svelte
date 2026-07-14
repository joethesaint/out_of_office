<script>
  import { onMount, onDestroy } from "svelte";

  let node;
  let visible = false;
  let observer;

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    
    if (node) observer.observe(node);
  });

  onDestroy(() => {
    if (observer) observer.disconnect();
  });
</script>

<div bind:this={node} class="reveal-wrapper" class:visible>
  <slot {visible} />
</div>

<style>
  .reveal-wrapper {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity var(--dur-slow) var(--ease-out-expo),
                transform var(--dur-slow) var(--ease-out-expo);
    will-change: opacity, transform;
  }
  .reveal-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
