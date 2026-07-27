// Dialog motion: 100-250ms band, ease-out enter / ease-in exit, transform+opacity only.
// See ui-skills iart-ai/micro-interaction.
export function dialogDuration(ms) {
  if (typeof window === 'undefined') return ms;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : ms;
}
