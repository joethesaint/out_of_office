import { writable } from 'svelte/store';

// Whole-document scroll fraction (0 at the top, 1 at the bottom) — distinct
// from App.svelte's hero-only `progress`/`smoothedProgress`, which only
// covers the 220vh cube track. Drives the corporate->handwritten typography
// morph (concept.txt: "modern corporate, then gradually handwritten...
// going from work mode to human mode") across the whole page, not just the
// hero. Updated from App.svelte's existing rAF-batched scroll handler.
export const pageProgress = writable(0);
