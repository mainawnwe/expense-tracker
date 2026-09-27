import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  Settings as SettingsIcon,
  Wallet,
} from 'lucide-react';
import { ROUTES } from '../../constants';
import { cn } from '../../utils/cn';

const navItems = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.TRANSACTIONS, label: 'Transactions', icon: Receipt },
  { to: ROUTES.REPORTS, label: 'Reports', icon: BarChart3 },
  { to: ROUTES.SETTINGS, label: 'Settings', icon: SettingsIcon },
];

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="h-full w-64 bg-white border-r border-slate-100 flex flex-col">
      <div className="h-16 flex items-center gap-2 px-5 border-b border-slate-100">
        <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center">
          <Wallet size={18} />
        </div>
        <div className="leading-tight">
          <p className="font-bold text-slate-800 text-sm">Expense</p>
          <p className="text-xs text-slate-400 -mt-0.5">Tracker</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === ROUTES.DASHBOARD}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition',
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <p className="text-xs text-slate-400">v1.0 · Local Storage</p>
      </div>
    </aside>
  );
}
