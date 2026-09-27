import { create } from 'zustand';
import { apiService } from '../services/apiService';

const DEFAULT_FILTERS = {
  search: '',
  type: 'all',
  category: '',
  month: '',
};

export const useExpenseStore = create((set, get) => ({
  // ---------- state ----------
  transactions: [],
  filters: DEFAULT_FILTERS,
  isLoading: true,
  error: null,

  // ---------- actions ----------
  loadTransactions: async () => {
    try {
      set({ isLoading: true, error: null });
      const data = await apiService.fetchAll();
      set({ transactions: data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },

  addTransaction: async (payload) => {
    try {
      const newTx = await apiService.create(payload);
      set((state) => ({ transactions: [newTx, ...state.transactions] }));
    } catch (err) {
      console.error('Failed to add transaction:', err);
      // Optionally, you could set an error state here
    }
  },

  updateTransaction: async (id, patch) => {
    try {
      const updated = await apiService.update(id, patch);
      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === id ? updated : t
        ),
      }));
    } catch (err) {
      console.error('Failed to update transaction:', err);
    }
  },

  removeTransaction: async (id) => {
    try {
      await apiService.remove(id);
      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      }));
    } catch (err) {
      console.error('Failed to delete transaction:', err);
    }
  },

    clearAll: async () => {
    try {
      set({ isLoading: true });
      await apiService.removeAll();
      set({ transactions: [], isLoading: false });
    } catch (err) {
      console.error('Failed to clear all:', err);
      set({ isLoading: false });
      throw err;
    }
  },

  setFilters: (patch) =>
    set((state) => ({ filters: { ...state.filters, ...patch } })),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),

  // ---------- helpers ----------
  getById: (id) => get().transactions.find((t) => t.id === id),
}));