import { RefreshCw } from 'lucide-react';
import { cn } from '../../lib/cn.js';

// Matches the input styling used across the form fields (see fields.jsx).
const inputBase =
  'w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 transition-colors focus:border-brand-400';

// Presentational only — all state lives in useMathCaptcha().
export default function MathCaptcha({ prompt, value, onChange, onRefresh, error }) {
  return (
    <div>
      <label htmlFor="captcha-answer" className="mb-1.5 block text-sm font-medium text-ink">
        Verify you&apos;re human <span className="text-brand-600">*</span>
      </label>
      <div className="flex items-stretch gap-2">
        <div
          className="flex select-none items-center rounded-xl border border-line bg-surface px-4 font-display text-base font-bold tracking-tightish text-ink"
          aria-hidden="true"
        >
          {prompt} =
        </div>
        <input
          id="captcha-answer"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="?"
          value={value}
          onChange={onChange}
          aria-label={`What is ${prompt}?`}
          aria-invalid={!!error}
          className={cn(inputBase, 'max-w-[6rem] text-center', error && 'border-red-400')}
        />
        <button
          type="button"
          onClick={onRefresh}
          aria-label="Generate a new question"
          title="New question"
          className="grid w-12 shrink-0 place-items-center rounded-xl border border-line bg-white text-muted transition-colors hover:border-brand-400 hover:text-brand-600"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  );
}
