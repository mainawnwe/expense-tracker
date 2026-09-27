import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storageService } from '../services/storageService';
import { generateId } from '../utils/id';

const DEFAULT_FILTERS = {
  search: '',
  type: 'all',
  category: '',
  month: '',
};

export const useExpenseStore = create(
  persist(
    (set, get) => ({
      // ---------- state ----------
      transactions: [],
      filters: DEFAULT_FILTERS,

      // ---------- actions ----------
      addTransaction: (payload) => {
        const newTx = {
          id: generateId(),
          createdAt: new Date().toISOString(),
          ...payload,
          amount: Number(payload.amount),
        };
        set((state) => ({ transactions: [newTx, ...state.transactions] }));
        return newTx;
      },

      updateTransaction: (id, patch) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id
              ? {
                  ...t,
                  ...patch,
                  amount: Number(patch.amount ?? t.amount),
                  updatedAt: new Date().toISOString(),
                }
              : t
          ),
        }));
      },

      removeTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      clearAll: () => set({ transactions: [] }),

      setFilters: (patch) =>
        set((state) => ({ filters: { ...state.filters, ...patch } })),

      resetFilters: () => set({ filters: DEFAULT_FILTERS }),

      // ---------- helpers ----------
      getById: (id) => get().transactions.find((t) => t.id === id),
    }),
    {
      name: 'store', // → localStorage key: expense-tracker:store
      version: 1,
      storage: createJSONStorage(() => storageService),
      // Only persist transactions, not filters
      partialize: (state) => ({ transactions: state.transactions }),
    }
  )
);
