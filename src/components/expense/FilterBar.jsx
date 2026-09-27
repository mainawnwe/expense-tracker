import { Search, X } from 'lucide-react';
import { Input, Select, Button } from '../ui';
import { ALL_CATEGORIES, TRANSACTION_TYPES } from '../../constants';
import { getLastNMonths, getMonthLabel } from '../../utils';

export default function FilterBar({ filters, onChange, onReset }) {
  const months = getLastNMonths(12).reverse();
  const hasFilters =
    filters.search || filters.type !== 'all' || filters.category || filters.month;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10"
            style={{ top: 'calc(50% + 0px)' }}
          />
          <Input
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            className="pl-9"
          />
        </div>

        <Select
          value={filters.type}
          onChange={(e) => onChange({ type: e.target.value })}
        >
          <option value="all">All Types</option>
          <option value={TRANSACTION_TYPES.INCOME}>Income</option>
          <option value={TRANSACTION_TYPES.EXPENSE}>Expense</option>
        </Select>

        <Select
          value={filters.category}
          onChange={(e) => onChange({ category: e.target.value })}
        >
          <option value="">All Categories</option>
          {ALL_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icon} {c.label}
            </option>
          ))}
        </Select>

        <Select
          value={filters.month}
          onChange={(e) => onChange({ month: e.target.value })}
        >
          <option value="">All Months</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {getMonthLabel(m)}
            </option>
          ))}
        </Select>
      </div>

      {hasFilters && (
        <div className="mt-3 flex justify-end">
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X size={14} /> Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
