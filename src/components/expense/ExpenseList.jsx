import { Inbox } from 'lucide-react';
import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ items, onEdit, onDelete }) {
  if (!items.length) {
    return (
      <div className="p-12 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-3">
          <Inbox size={22} />
        </div>
        <p className="text-slate-500 text-sm">No transactions found.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-100">
      {items.map((item) => (
        <ExpenseItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
