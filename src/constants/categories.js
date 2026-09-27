export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

export const INCOME_CATEGORIES = [
  { id: 'salary', label: 'Salary', icon: '💼', color: '#16a34a' },
  { id: 'freelance', label: 'Freelance', icon: '💻', color: '#0891b2' },
  { id: 'investment', label: 'Investment', icon: '📈', color: '#7c3aed' },
  { id: 'gift', label: 'Gift', icon: '🎁', color: '#db2777' },
  { id: 'other-income', label: 'Other Income', icon: '💰', color: '#059669' },
];

export const EXPENSE_CATEGORIES = [
  { id: 'food', label: 'Food & Dining', icon: '🍔', color: '#f97316' },
  { id: 'transport', label: 'Transport', icon: '🚗', color: '#3b82f6' },
  { id: 'rent', label: 'Rent', icon: '🏠', color: '#8b5cf6' },
  { id: 'utilities', label: 'Utilities', icon: '💡', color: '#eab308' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️', color: '#ec4899' },
  { id: 'health', label: 'Health', icon: '🏥', color: '#ef4444' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬', color: '#06b6d4' },
  { id: 'education', label: 'Education', icon: '📚', color: '#6366f1' },
  { id: 'other-expense', label: 'Other', icon: '📦', color: '#64748b' },
];

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

export const getCategoriesByType = (type) =>
  type === TRANSACTION_TYPES.INCOME ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

export const getCategoryById = (id) =>
  ALL_CATEGORIES.find((c) => c.id === id) ?? {
    id,
    label: 'Unknown',
    icon: '❓',
    color: '#94a3b8',
  };
