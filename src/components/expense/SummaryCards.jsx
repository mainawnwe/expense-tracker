import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { formatCurrency } from '../../utils';
import { cn } from '../../utils/cn';

export default function SummaryCards({ totals }) {
  const items = [
    {
      label: 'Income',
      value: totals.income,
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Expense',
      value: totals.expense,
      icon: TrendingDown,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: 'Balance',
      value: totals.balance,
      icon: Wallet,
      color: totals.balance >= 0 ? 'text-blue-600' : 'text-red-600',
      bg: totals.balance >= 0 ? 'bg-blue-50' : 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-500">
                {item.label}
              </span>
              <div className={cn('p-2 rounded-lg', item.bg, item.color)}>
                <Icon size={16} />
              </div>
            </div>
            <p className={cn('text-xl font-bold', item.color)}>
              {formatCurrency(item.value)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
