import { useMemo, useState } from 'react';
import { useExpenseStore } from '../store/useExpenseStore';
import { Card, Select } from '../components/ui';
import {
  ChartCard,
  CategoryPieChart,
  MonthlyBarChart,
  IncomeExpenseLineChart,
} from '../components/reports';
import { getTotals, groupByCategory, groupByMonth } from '../utils/calc';
import { getLastNMonths, getMonthLabel, getMonthKey } from '../utils/date';
import { TRANSACTION_TYPES } from '../constants';
import { formatCurrency } from '../utils';

export default function Reports() {
  const transactions = useExpenseStore((s) => s.transactions);
  const [range, setRange] = useState('6');

  // Filter transactions by selected month range
  const scoped = useMemo(() => {
    const months = getLastNMonths(Number(range));
    const monthSet = new Set(months);
    return transactions.filter((t) => monthSet.has(getMonthKey(t.date)));
  }, [transactions, range]);

  const totals = useMemo(() => getTotals(scoped), [scoped]);

  // Pie — expense breakdown by category
  const expenseByCategory = useMemo(() => {
    const expenses = scoped.filter(
      (t) => t.type === TRANSACTION_TYPES.EXPENSE
    );
    const grouped = groupByCategory(expenses);
    return Object.entries(grouped)
      .map(([id, g]) => ({ id, value: g.total }))
      .sort((a, b) => b.value - a.value);
  }, [scoped]);

  // Bar + Line — monthly income/expense + balance
  const monthlyData = useMemo(() => {
    const months = getLastNMonths(Number(range));
    const grouped = groupByMonth(scoped);
    return months.map((m) => {
      const g = grouped[m] ?? { income: 0, expense: 0 };
      return {
        key: m,
        label: getMonthLabel(m).split(' ')[0], // e.g., "Sep"
        income: g.income,
        expense: g.expense,
        balance: g.income - g.expense,
      };
    });
  }, [scoped, range]);

  const hasData = scoped.length > 0;
  const hasExpense = expenseByCategory.length > 0;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Reports</h1>
          <p className="text-sm text-slate-500">
            {scoped.length} transactions in range
          </p>
        </div>
        <div className="w-40">
          <Select value={range} onChange={(e) => setRange(e.target.value)}>
            <option value="3">Last 3 months</option>
            <option value="6">Last 6 months</option>
            <option value="12">Last 12 months</option>
          </Select>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Total Income</p>
          <p className="text-lg font-bold text-green-600">
            {formatCurrency(totals.income)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Total Expense</p>
          <p className="text-lg font-bold text-red-600">
            {formatCurrency(totals.expense)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 mb-1">Net Balance</p>
          <p
            className={`text-lg font-bold ${
              totals.balance >= 0 ? 'text-blue-600' : 'text-red-600'
            }`}
          >
            {formatCurrency(totals.balance)}
          </p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Expense by Category"
          subtitle="Where your money goes"
          empty={!hasExpense}
        >
          <CategoryPieChart data={expenseByCategory} />
        </ChartCard>

        <ChartCard
          title="Balance Trend"
          subtitle="Net income over time"
          empty={!hasData}
        >
          <IncomeExpenseLineChart data={monthlyData} />
        </ChartCard>
      </div>

      <ChartCard
        title="Income vs Expense"
        subtitle="Monthly comparison"
        empty={!hasData}
      >
        <MonthlyBarChart data={monthlyData} />
      </ChartCard>
    </div>
  );
}