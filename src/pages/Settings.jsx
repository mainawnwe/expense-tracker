import { useState } from 'react';
import { Download, Trash2, RefreshCw, Database } from 'lucide-react';
import { useExpenseStore } from '../store/useExpenseStore';
import { Button, Card } from '../components/ui';

export default function Settings() {
  const transactions = useExpenseStore((s) => s.transactions);
  const clearAll = useExpenseStore((s) => s.clearAll);
  const resetFilters = useExpenseStore((s) => s.resetFilters);
  const [msg, setMsg] = useState('');

  const flash = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 2200);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(transactions, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    flash('✅ Exported successfully');
  };

  const handleClear = () => {
    if (
      confirm(
        `Delete all ${transactions.length} transactions? This cannot be undone.`
      )
    ) {
      clearAll();
      flash('🗑️ All transactions cleared');
    }
  };

  const handleResetFilters = () => {
    resetFilters();
    flash('🔄 Filters reset');
  };

  const stats = [
    { label: 'Total transactions', value: transactions.length },
    {
      label: 'Storage used',
      value:
        (new Blob([JSON.stringify(transactions)]).size / 1024).toFixed(2) +
        ' KB',
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500">
          Manage your local data and preferences
        </p>
      </div>

      <Card className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
            <Database size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Local Data</h3>
            <p className="text-xs text-slate-500">
              Stored in your browser's localStorage
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-500 mb-1">{s.label}</p>
              <p className="font-semibold text-slate-800">{s.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="divide-y divide-slate-100">
        <ActionRow
          icon={Download}
          title="Export Data"
          desc="Download all transactions as JSON"
          button={
            <Button variant="outline" size="sm" onClick={handleExport}>
              Export
            </Button>
          }
        />
        <ActionRow
          icon={RefreshCw}
          title="Reset Filters"
          desc="Clear all active filter settings"
          button={
            <Button variant="outline" size="sm" onClick={handleResetFilters}>
              Reset
            </Button>
          }
        />
        <ActionRow
          icon={Trash2}
          title="Clear All Data"
          desc="Permanently delete every transaction"
          danger
          button={
            <Button variant="danger" size="sm" onClick={handleClear}>
              Delete
            </Button>
          }
        />
      </Card>

      {msg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-slide-up">
          {msg}
        </div>
      )}
    </div>
  );
}

function ActionRow({ icon: Icon, title, desc, button, danger }) {
  return (
    <div className="flex items-center gap-4 p-4">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          danger ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-600'
        }`}
      >
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-slate-800 text-sm">{title}</p>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
      {button}
    </div>
  );
}