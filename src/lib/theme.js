import { writable, derived } from 'svelte/store';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('ooo_theme');
    if (stored === 'dark' || stored === 'light') return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'light';
};

export const theme = writable(getInitialTheme());
export const isDark = derived(theme, ($theme) => $theme === 'dark');

export function toggleTheme() {
  theme.update((current) => {
    const next = current === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      localStorage.setItem('ooo_theme', next);
      document.documentElement.setAttribute('data-theme', next);
    }
    return next;
  });
}

if (typeof window !== 'undefined') {
  theme.subscribe(($theme) => {
    document.documentElement.setAttribute('data-theme', $theme);
  });
}
