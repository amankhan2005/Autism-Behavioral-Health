import { createContext, useCallback, useContext, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const ToastCtx = createContext(null);
export const useToast = () => useContext(ToastCtx);

let id = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const dismiss = useCallback((tid) => setToasts((t) => t.filter((x) => x.id !== tid)), []);
  const toast = useCallback(
    ({ type = 'success', message }) => {
      const tid = ++id;
      setToasts((t) => [...t, { id: tid, type, message }]);
      setTimeout(() => dismiss(tid), 5000);
    },
    [dismiss]
  );

  return (
    <ToastCtx.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex flex-col items-center gap-2 px-4" aria-live="polite" aria-atomic="true">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = t.type === 'error' ? AlertCircle : CheckCircle2;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                className="pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-lift ring-1 ring-line"
                role="status"
              >
                <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${t.type === 'error' ? 'text-red-500' : 'text-brand-600'}`} aria-hidden="true" />
                <p className="flex-1 text-sm text-ink">{t.message}</p>
                <button onClick={() => dismiss(t.id)} aria-label="Dismiss" className="text-muted hover:text-ink">
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}
