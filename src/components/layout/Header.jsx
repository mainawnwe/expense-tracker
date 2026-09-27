import { Menu, ArrowLeft, Home } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';

const titleMap = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/reports': 'Reports',
  '/settings': 'Settings',
};

export default function Header({ onMenuClick }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const title = titleMap[pathname] ?? 'Expense Tracker';
  const isDashboard = pathname === ROUTES.DASHBOARD;

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center gap-2 px-4 sm:px-6 sticky top-0 z-30">
      {/* Hamburger — tablet/mobile မှာပဲ ပေါ် */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 text-slate-600 transition"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Back button — Dashboard မှာ မပေါ် */}
      {!isDashboard && (
        <button
          onClick={() => navigate(-1)}
          className="p-2 -ml-1 md:ml-0 rounded-lg hover:bg-slate-100 text-slate-600 transition"
          aria-label="Go back"
          title="Back"
        >
          <ArrowLeft size={18} />
        </button>
      )}

      <h2 className="font-semibold text-slate-800 flex-1 truncate">{title}</h2>

      {/* Home button — Dashboard မှာ မပေါ် */}
      {!isDashboard && (
        <button
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition"
          aria-label="Go to dashboard"
          title="Home"
        >
          <Home size={18} />
        </button>
      )}
    </header>
  );
}