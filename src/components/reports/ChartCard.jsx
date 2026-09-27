import { Card } from '../ui';
import { BarChart3 } from 'lucide-react';

export default function ChartCard({ title, subtitle, children, empty }) {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        )}
      </div>

      {empty ? (
        <div className="py-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-400 mb-3">
            <BarChart3 size={20} />
          </div>
          <p className="text-sm text-slate-500">No data yet</p>
        </div>
      ) : (
        <div className="h-72">{children}</div>
      )}
    </Card>
  );
}
