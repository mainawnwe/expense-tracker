import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { formatCurrency } from '../../utils';
import { getCategoryById } from '../../constants';

export default function CategoryPieChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0);

  const chartData = data.map((d) => {
    const cat = getCategoryById(d.id);
    return {
      name: cat.label,
      value: d.value,
      color: cat.color,
      icon: cat.icon,
    };
  });

  const renderLabel = ({ percent }) =>
    percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : '';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={90}
          paddingAngle={2}
          label={renderLabel}
          labelLine={false}
        >
          {chartData.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>

        <Tooltip
          formatter={(value) => formatCurrency(value)}
          contentStyle={{
            borderRadius: 10,
            border: '1px solid #e2e8f0',
            fontSize: 12,
          }}
        />

        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: 12 }}
          formatter={(value, entry) => {
            const item = entry.payload;
            const pct = ((item.value / total) * 100).toFixed(0);
            return `${item.icon} ${value} (${pct}%)`;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
