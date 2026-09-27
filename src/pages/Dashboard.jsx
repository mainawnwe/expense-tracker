import { useMemo, useState } from 'react';
import { Plus, ArrowRight, Inbox } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useExpenseStore } from '../store/useExpenseStore';
import { Button, Modal, Card } from '../components/ui';
import { SummaryCards, ExpenseList, ExpenseForm } from '../components/expense';
import { getTotals } from '../utils/calc';
import { isSameMonth } from '../utils/date';
import { ROUTES } from '../constants';

export default function Dashboard() {
  const transactions = useExpenseStore((s) => s.transactions);
  const addTransaction = useExpenseStore((s) => s.addTransaction);
  const updateTransaction = useExpenseStore((s) => s.updateTransaction);
  const removeTransaction = useExpenseStore((s) => s.removeTransaction);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const totals = useMemo(() => getTotals(transactions), [transactions]);

  const thisMonth = useMemo(
    () => transactions.filter((t) => isSameMonth(t.date)),
    [transactions]
  );
  const monthTotals = useMemo(() => getTotals(thisMonth), [thisMonth]);

  const recent = useMemo(() => transactions.slice(0, 5), [transactions]);

  const openAdd = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (item) => {
    setEditing(item);
    setOpen(true);
  };
  const close = () => {
    setOpen(false);
    setEditing(null);
  };
  const handleSubmit = (data) => {
    if (editing) updateTransaction(editing.id, data);
    else addTransaction(data);
    close();
  };
  const handleDelete = (id) => {
    if (confirm('Delete this transaction?')) removeTransaction(id);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Welcome back 👋</h1>
          <p className="text-sm text-slate-500">
            {transactions.length} transactions total
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus size={16} /> Add
        </Button>
      </div>

      <SummaryCards totals={totals} />

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">This Month</h3>
            <p className="text-xs text-slate-400">
              {thisMonth.length} transactions
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-xs text-slate-500 mb-1">Income</p>
            <p className="font-semibold text-green-600">
              +{monthTotals.income.toLocaleString()} MMK
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Expense</p>
            <p className="font-semibold text-red-600">
              −{monthTotals.expense.toLocaleString()} MMK
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Net</p>
            <p
              className={`font-semibold ${
                monthTotals.balance >= 0 ? 'text-blue-600' : 'text-red-600'
              }`}
            >
              {monthTotals.balance.toLocaleString()} MMK
            </p>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800 text-sm">
            Recent Transactions
          </h3>
          <Link
            to={ROUTES.TRANSACTIONS}
            className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
          >
            View all <ArrowRight size={12} />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-3">
              <Inbox size={22} />
            </div>
            <p className="text-slate-500 text-sm">
              No transactions yet. Click "Add" to start.
            </p>
          </div>
        ) : (
          <ExpenseList
            items={recent}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}
      </Card>

      <Modal
        open={open}
        onClose={close}
        title={editing ? 'Edit Transaction' : 'Add Transaction'}
      >
        <ExpenseForm initial={editing} onSubmit={handleSubmit} onCancel={close} />
      </Modal>
    </div>
  );
}