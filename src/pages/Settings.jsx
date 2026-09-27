import { useState } from 'react';
import { Download, Trash2, RefreshCw, Cloud, TrendingUp, TrendingDown } from 'lucide-react';
import { useExpenseStore } from '../store/useExpenseStore';
import { Button, Card } from '../components/ui';
import { getTotals } from '../utils/calc';
import { formatCurrency } from '../utils';
import { TRANSACTION_TYPES } from '../constants';

export default function Settings() {
  const transactions = useExpenseStore((s) => s.transactions);
  const clearAll = useExpenseStore((s) => s.clearAll);
  const resetFilters = useExpenseStore((s) => s.resetFilters);
  const [msg, setMsg] = useState('');
  const [clearing, setClearing] = useState(false);

  const flash = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(''), 2200);
  };

  const totals = getTotals(transactions);
  const incomeCount = transactions.filter(
    (t) => t.type === TRANSACTION_TYPES.INCOME
  ).length;
  const expenseCount = transactions.filter(
    (t) => t.type === TRANSACTION_TYPES.EXPENSE
  ).length;

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

  const handleClear = async () => {
    if (
      !confirm(
        `Delete all ${transactions.length} transactions from the cloud? This cannot be undone.`
      )
    )
      return;

    try {
      setClearing(true);
      await clearAll();
      flash('🗑️ All transactions cleared from Supabase');
    } catch (err) {
      flash('❌ Failed to clear: ' + err.message);
    } finally {
      setClearing(false);
    }
  };

  const handleResetFilters = () => {
    resetFilters();
    flash('🔄 Filters reset');
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500">
          Manage your cloud data and preferences
        </p>
      </div>

      {/* Cloud Data card */}
      <Card className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
            <Cloud size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">
              Cloud Data
            </h3>
            <p className="text-xs text-slate-500">
              Synced with Supabase · Singapore region
            </p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatBox label="Transactions" value={transactions.length} />
          <StatBox
            label="Income"
            value={incomeCount}
            icon={TrendingUp}
            color="text-green-600"
          />
          <StatBox
            label="Expense"
            value={expenseCount}
            icon={TrendingDown}
            color="text-red-600"
          />
          <StatBox
            label="Balance"
            value={formatCurrency(totals.balance)}
            valueClass={totals.balance >= 0 ? 'text-blue-600' : 'text-red-600'}
          />
        </div>
      </Card>

      {/* Actions */}
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
          desc="Permanently delete every transaction from Supabase"
          danger
          button={
            <Button
              variant="danger"
              size="sm"
              onClick={handleClear}
              disabled={clearing || transactions.length === 0}
            >
              {clearing ? 'Clearing…' : 'Delete'}
            </Button>
          }
        />
      </Card>

      {msg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-slide-up z-50">
          {msg}
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value, icon: Icon, color = 'text-slate-800', valueClass }) {
  return (
    <div className="bg-slate-50 rounded-lg p-3">
      <div className="flex items-center gap-1.5 mb-1">
        {Icon && <Icon size={12} className={color} />}
        <p className="text-xs text-slate-500">{label}</p>
      </div>
      <p className={`font-semibold text-sm ${valueClass ?? color}`}>{value}</p>
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