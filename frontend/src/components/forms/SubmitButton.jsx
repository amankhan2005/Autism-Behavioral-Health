import { Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button.jsx';

export default function SubmitButton({ submitting, children, className }) {
  return (
    <Button as="button" type="submit" size="lg" disabled={submitting} className={className}>
      {submitting && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
      {submitting ? 'Sending…' : children}
    </Button>
  );
}
