import { writable } from 'svelte/store';

// Concept 5 (concept.txt), reinterpreted per user direction 2026-07-17:
// a busy/rowdy city sound bed at the top of the page fading into ocean/
// beach ambience near the Tickets boarding pass, with a mute/unmute
// control. Default is unmuted (explicit instruction) — most sites default
// audio off, this one is meant to be heard first.
export const muted = writable(false);

export function toggleMute() {
  muted.update((m) => !m);
}
