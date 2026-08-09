import { useState } from 'react';
import { api } from '@/lib/api.js';
import { useToast } from '@/components/ui/toast.jsx';

// Posts form data to `endpoint`, surfaces success/error toasts, resets on success.
export function useSubmitForm(endpoint, { reset } = {}) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const { data } = await api.post(endpoint, values);
      toast({ type: 'success', message: data?.message || 'Thank you — we’ll be in touch soon.' });
      setDone(true);
      reset?.();
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        (err?.code === 'ERR_NETWORK' ? 'We couldn’t reach the server. Please try again.' : 'Something went wrong. Please try again.');
      toast({ type: 'error', message });
    } finally {
      setSubmitting(false);
    }
  };

  return { onSubmit, submitting, done };
}
