<script>
  import { onMount, onDestroy } from "svelte";
  import { DialStore } from "dialkit/store";

  let node;
  let visible = false;
  let observer;

  // Register Dialkit animation config for scroll transitions
  DialStore.registerPanel('scroll-reveal', 'Scroll Reveal Transitions', {
    revealDistance: [40, 10, 100],
    revealDuration: [0.8, 0.2, 2.0],
  });

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
  }
  .reveal-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
