import { writable, derived } from 'svelte/store';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('ooo_theme');
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (e) {
      // Ignore storage errors when cookies/storage are blocked
    }
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
      try {
        localStorage.setItem('ooo_theme', next);
      } catch (e) {
        // Ignore storage errors when cookies/storage are blocked
      }
    }
    return next;
  });
}

if (typeof window !== 'undefined') {
  theme.subscribe(($theme) => {
    document.documentElement.setAttribute('data-theme', $theme);
  });
}
