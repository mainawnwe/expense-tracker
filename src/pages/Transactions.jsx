import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useExpenseStore } from '../store/useExpenseStore';
import { Button, Modal, Card } from '../components/ui';
import { FilterBar, ExpenseList, ExpenseForm } from '../components/expense';
import { getMonthKey } from '../utils/date';

export default function Transactions() {
  const transactions = useExpenseStore((s) => s.transactions);
  const filters = useExpenseStore((s) => s.filters);
  const addTransaction = useExpenseStore((s) => s.addTransaction);
  const updateTransaction = useExpenseStore((s) => s.updateTransaction);
  const removeTransaction = useExpenseStore((s) => s.removeTransaction);
  const setFilters = useExpenseStore((s) => s.setFilters);
  const resetFilters = useExpenseStore((s) => s.resetFilters);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const q = filters.search.toLowerCase();
      const matchSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.note?.toLowerCase().includes(q);

      const matchType = filters.type === 'all' || t.type === filters.type;
      const matchCat = !filters.category || t.category === filters.category;
      const matchMonth = !filters.month || getMonthKey(t.date) === filters.month;

      return matchSearch && matchType && matchCat && matchMonth;
    });
  }, [transactions, filters]);

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

  const handleSubmit = async (data) => {
    try {
      if (editing) {
        await updateTransaction(editing.id, data);
      } else {
        await addTransaction(data);
      }
      close();
    } catch (err) {
      alert('Failed: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this transaction?')) return;
    try {
      await removeTransaction(id);
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Transactions</h1>
          <p className="text-sm text-slate-500">
            {filtered.length} of {transactions.length} shown
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus size={16} /> Add
        </Button>
      </div>

      <FilterBar
        filters={filters}
        onChange={setFilters}
        onReset={resetFilters}
      />

      <Card className="overflow-hidden">
        <ExpenseList
          items={filtered}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </Card>

      <Modal
        open={open}
        onClose={close}
        title={editing ? 'Edit Transaction' : 'Add Transaction'}
      >
        <ExpenseForm
          initial={editing}
          onSubmit={handleSubmit}
          onCancel={close}
        />
      </Modal>
    </div>
  );
}