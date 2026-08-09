import { useState, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

function Item({ q, a, open, onToggle }) {
  const id = useId();
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          className="flex w-full items-center justify-between gap-4 py-5 text-left"
        >
          <span className="font-display text-lg font-semibold text-ink">{q}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-brand-600 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 leading-relaxed text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items, single = true }) {
  const [openIdx, setOpenIdx] = useState(0);
  const [openSet, setOpenSet] = useState(new Set([0]));
  const isOpen = (i) => (single ? openIdx === i : openSet.has(i));
  const toggle = (i) => {
    if (single) return setOpenIdx((cur) => (cur === i ? -1 : i));
    setOpenSet((s) => { const n = new Set(s); n.has(i) ? n.delete(i) : n.add(i); return n; });
  };
  return (
    <div className="divide-line">
      {items.map((it, i) => (
        <Item key={i} {...it} open={isOpen(i)} onToggle={() => toggle(i)} />
      ))}
    </div>
  );
}
