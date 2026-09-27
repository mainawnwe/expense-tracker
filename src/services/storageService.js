/**
 * Storage Abstraction Layer
 * -------------------------------------------------
 * Currently uses localStorage (synchronous, string-based).
 * Later, replace this whole file with apiService.js that
 * talks to a backend. Components & store stay unchanged.
 */
const PREFIX = 'expense-tracker';

export const storageService = {
  getItem: (name) => {
    try {
      return localStorage.getItem(`${PREFIX}:${name}`);
    } catch (err) {
      console.error('[storage] getItem failed:', err);
      return null;
    }
  },

  setItem: (name, value) => {
    try {
      localStorage.setItem(`${PREFIX}:${name}`, value);
    } catch (err) {
      console.error('[storage] setItem failed (quota?):', err);
    }
  },

  removeItem: (name) => {
    try {
      localStorage.removeItem(`${PREFIX}:${name}`);
    } catch (err) {
      console.error('[storage] removeItem failed:', err);
    }
  },
};
