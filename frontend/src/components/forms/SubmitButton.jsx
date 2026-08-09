import { Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button.jsx';
import { cn } from '@/lib/cn.js';

export default function SubmitButton({ submitting, disabled, children, className }) {
  const isDisabled = submitting || disabled;
  return (
    <Button
      as="button"
      type="submit"
      size="lg"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={cn(isDisabled && 'cursor-not-allowed opacity-60', className)}
    >
      {submitting && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
      {submitting ? 'Sending…' : children}
    </Button>
  );
}
