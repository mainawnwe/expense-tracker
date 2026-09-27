export const formatCurrency = (amount = 0, currency = 'MMK') => {
  const safe = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(safe);
};

export const formatNumber = (amount = 0) =>
  new Intl.NumberFormat('en-US').format(amount);

export const formatDate = (date, style = 'short') => {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return '—';

  const opts = {
    short: { day: '2-digit', month: 'short', year: 'numeric' },
    long: { day: '2-digit', month: 'long', year: 'numeric', weekday: 'long' },
    time: { hour: '2-digit', minute: '2-digit' },
  }[style];

  return d.toLocaleDateString('en-GB', opts);
};

export const toISODate = (date = new Date()) => {
  const d = date instanceof Date ? date : new Date(date);
  const tzOffset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 10);
};
