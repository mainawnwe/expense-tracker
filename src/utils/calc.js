import { TRANSACTION_TYPES } from '../constants/categories';

export const sumByType = (transactions, type) =>
  transactions
    .filter((t) => t.type === type)
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

export const getTotals = (transactions) => {
  const income = sumByType(transactions, TRANSACTION_TYPES.INCOME);
  const expense = sumByType(transactions, TRANSACTION_TYPES.EXPENSE);
  return { income, expense, balance: income - expense };
};

export const groupByCategory = (transactions) =>
  transactions.reduce((acc, t) => {
    const key = t.category;
    if (!acc[key]) acc[key] = { total: 0, count: 0, type: t.type };
    acc[key].total += Number(t.amount || 0);
    acc[key].count += 1;
    return acc;
  }, {});

export const groupByMonth = (transactions) =>
  transactions.reduce((acc, t) => {
    const key = new Date(t.date).toISOString().slice(0, 7);
    if (!acc[key]) acc[key] = { income: 0, expense: 0 };
    if (t.type === TRANSACTION_TYPES.INCOME) acc[key].income += Number(t.amount);
    else acc[key].expense += Number(t.amount);
    return acc;
  }, {});
