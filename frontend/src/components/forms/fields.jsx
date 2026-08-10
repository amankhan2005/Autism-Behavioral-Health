import { forwardRef } from 'react';
import { cn } from '../../lib/cn.js';

const base =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 transition-colors focus:border-brand-400';

function Wrap({ label, htmlFor, required, error, children, className }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
          {label} {required && <span className="text-brand-600">*</span>}
        </label>
      )}
      {children}
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export const Field = forwardRef(function Field({ label, name, error, required, className, ...props }, ref) {
  return (
    <Wrap label={label} htmlFor={name} required={required} error={error} className={className}>
      <input id={name} ref={ref} aria-invalid={!!error} className={cn(base, error && 'border-red-400')} {...props} />
    </Wrap>
  );
});

export const TextArea = forwardRef(function TextArea({ label, name, error, required, className, ...props }, ref) {
  return (
    <Wrap label={label} htmlFor={name} required={required} error={error} className={className}>
      <textarea id={name} ref={ref} rows={5} aria-invalid={!!error} className={cn(base, 'resize-y', error && 'border-red-400')} {...props} />
    </Wrap>
  );
});

export const Select = forwardRef(function Select({ label, name, error, required, className, children, ...props }, ref) {
  return (
    <Wrap label={label} htmlFor={name} required={required} error={error} className={className}>
      <select id={name} ref={ref} aria-invalid={!!error} className={cn(base, 'appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10', error && 'border-red-400')}
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")" }}
        {...props}>
        {children}
      </select>
    </Wrap>
  );
});

export function Checkbox({ label, name, error, ...props }) {
  return (
    <div>
      <label htmlFor={name} className="flex items-start gap-3 text-sm text-muted">
        <input id={name} type="checkbox" className="mt-0.5 h-5 w-5 rounded border-line text-brand-600 focus:ring-brand-500" {...props} />
        <span>{label}</span>
      </label>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Hidden honeypot — real users never fill it; bots often do.
export function Honeypot({ register }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label>Company<input tabIndex={-1} autoComplete="off" {...register('company')} /></label>
    </div>
  );
}
