import { useEffect, useState } from 'react';
import { Button, Input, Select } from '../ui';
import { getCategoriesByType, TRANSACTION_TYPES } from '../../constants';
import { toISODate, validateTransaction } from '../../utils';

const emptyForm = () => ({
  title: '',
  amount: '',
  type: TRANSACTION_TYPES.EXPENSE,
  category: 'food',
  date: toISODate(),
  note: '',
});

export default function ExpenseForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setForm({ ...initial, amount: String(initial.amount) });
    } else {
      setForm(emptyForm());
    }
    setErrors({});
  }, [initial]);

  const categories = getCategoriesByType(form.type);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'type') {
        const cats = getCategoriesByType(value);
        next.category = cats[0].id;
      }
      return next;
    });
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { valid, errors: errs } = validateTransaction(form);
    if (!valid) {
      setErrors(errs);
      return;
    }
    onSubmit({ ...form, amount: Number(form.amount) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        name="title"
        placeholder="e.g., Lunch at cafe"
        value={form.title}
        onChange={handleChange}
        error={errors.title}
        autoFocus
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Amount"
          name="amount"
          type="number"
          placeholder="0"
          value={form.amount}
          onChange={handleChange}
          error={errors.amount}
          min="0"
        />
        <Select
          label="Type"
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value={TRANSACTION_TYPES.EXPENSE}>Expense</option>
          <option value={TRANSACTION_TYPES.INCOME}>Income</option>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          error={errors.category}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.icon} {c.label}
            </option>
          ))}
        </Select>
        <Input
          label="Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          error={errors.date}
        />
      </div>

      <Input
        label="Note (optional)"
        name="note"
        placeholder=""
        value={form.note}
        onChange={handleChange}
      />

      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          {initial ? 'Update' : 'Add'}
        </Button>
      </div>
    </form>
  );
}
