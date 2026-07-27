import { writable } from 'svelte/store';

export const toasts = writable([]);

export function addToast({ title, description, type = 'info', duration = 3500 }) {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast = { id, title, description, type, timestamp: Date.now() };
  
  toasts.update((current) => [newToast, ...current].slice(0, 5));

  setTimeout(() => {
    removeToast(id);
  }, duration);
}

export function removeToast(id) {
  toasts.update((current) => current.filter((t) => t.id !== id));
}

export function clearAllToasts() {
  toasts.set([]);
}
