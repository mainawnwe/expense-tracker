import { cn } from '../../utils/cn';

export default function Select({
  label,
  error,
  className,
  containerClassName,
  children,
  ...props
}) {
  return (
    <div className={cn('w-full', containerClassName)}>
      {label && (
        <label className="block text-xs font-medium text-slate-600 mb-1.5">
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full h-10 px-3 rounded-lg border bg-white text-sm',
          'border-slate-200 outline-none transition cursor-pointer',
          'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20',
          error && 'border-red-400',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
