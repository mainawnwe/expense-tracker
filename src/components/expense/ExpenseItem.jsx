import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils';
import { getCategoryById, TRANSACTION_TYPES } from '../../constants';
import { cn } from '../../utils/cn';

export default function ExpenseItem({ item, onEdit, onDelete }) {
  const cat = getCategoryById(item.category);
  const isIncome = item.type === TRANSACTION_TYPES.INCOME;

  return (
    <li className="group flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0"
        style={{ backgroundColor: cat.color + '20' }}
      >
        {cat.icon}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-slate-800 truncate">{item.title}</p>
        <p className="text-xs text-slate-500 truncate">
          {cat.label} · {formatDate(item.date)}
          {item.note && <span className="text-slate-400"> · {item.note}</span>}
        </p>
      </div>

      <p
        className={cn(
          'font-semibold text-sm tabular-nums whitespace-nowrap',
          isIncome ? 'text-green-600' : 'text-red-600'
        )}
      >
        {isIncome ? '+' : '−'}
        {formatCurrency(item.amount)}
      </p>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={() => onEdit(item)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition"
          title="Edit"
        >
          <Pencil size={15} />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
          title="Delete"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </li>
  );
}
