import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/cn.js';

/**
 * Custom, premium language selector.
 *
 * It does NOT set up, load, or initialize Google Translate. The real Google
 * Translate widget is created statically in index.html (outside the React
 * root), exactly like the default widget — so Google owns that DOM and there is
 * a single, stable `.goog-te-combo`. This component's ONLY job is to find that
 * real combo and drive it: set the option value + dispatch a native `change`,
 * which makes Google translate the page. No fake translation, no manual text
 * swapping, no DOM monkey-patching, no re-initialization.
 */

// The 10 languages exposed in the custom dropdown. `code` must equal the real
// Google Translate `<option>` value on `.goog-te-combo`. `cc` is the flag code.
const LANGUAGES = [
  { code: 'en', label: 'English', abbr: 'EN', cc: 'us' },
  { code: 'ar', label: 'Arabic', abbr: 'AR', cc: 'sa' },
  { code: 'zh-CN', label: 'Chinese', abbr: 'ZH', cc: 'cn' },
  { code: 'nl', label: 'Dutch', abbr: 'NL', cc: 'nl' },
  { code: 'fr', label: 'French', abbr: 'FR', cc: 'fr' },
  { code: 'de', label: 'German', abbr: 'DE', cc: 'de' },
  { code: 'it', label: 'Italian', abbr: 'IT', cc: 'it' },
  { code: 'pt', label: 'Portuguese', abbr: 'PT', cc: 'pt' },
  { code: 'ru', label: 'Russian', abbr: 'RU', cc: 'ru' },
  { code: 'es', label: 'Spanish', abbr: 'ES', cc: 'es' },
];

// Rectangular flag image (consistent size, subtle border).
function Flag({ cc, label, className }) {
  return (
    <img
      src={`https://flagcdn.com/${cc}.svg`}
      alt={`${label} flag`}
      loading="lazy"
      className={cn('shrink-0 rounded-[3px] object-cover ring-1 ring-black/10', className)}
    />
  );
}

// The language Google is ACTUALLY showing, read from its cookie (e.g. /en/fr).
function readGoogleCode() {
  if (typeof document === 'undefined') return 'en';
  const m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!m) return 'en';
  const parts = decodeURIComponent(m[1]).split('/').filter(Boolean);
  const target = parts[parts.length - 1];
  return LANGUAGES.some((l) => l.code === target) ? target : 'en';
}

// Resolve the REAL option value on the combo for a desired code. We never
// assume the value — we match against the combo's actual <option> values
// (exact, then case-insensitive, then language-prefix, e.g. zh -> zh-CN).
function resolveOptionValue(combo, code) {
  const values = Array.from(combo.options).map((o) => o.value).filter(Boolean);
  if (values.includes(code)) return code;
  const lower = code.toLowerCase();
  const ci = values.find((v) => v.toLowerCase() === lower);
  if (ci) return ci;
  const base = lower.split('-')[0];
  const pref = values.find((v) => v.toLowerCase().split('-')[0] === base);
  return pref || null;
}

// Drive the real hidden Google combo. Waits (polls) until the combo exists and
// the target option is available, then sets the value and fires a native change
// event so Google performs the translation. `onFired(value)` runs after.
function applyLanguage(code, onFired) {
  let tries = 0;
  const tick = () => {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      const value = code === 'en' ? 'en' : resolveOptionValue(combo, code);
      if (value || code === 'en') {
        combo.value = value || 'en';
        // Native change on the real select — this is what Google listens for.
        combo.dispatchEvent(new Event('change', { bubbles: true }));
        onFired?.(combo.value);
        return;
      }
    }
    if (tries++ < 60) {
      setTimeout(tick, 100);
    } else if (typeof console !== 'undefined') {
      // Surfaces the exact failure instead of failing silently.
      // eslint-disable-next-line no-console
      console.warn(
        '[GoogleTranslate] .goog-te-combo not ready or missing option for',
        code,
        '- is the Google widget script in index.html loading? combo:',
        document.querySelector('.goog-te-combo'),
      );
    }
  };
  tick();
}

export default function GoogleTranslate() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('en');
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const optionRefs = useRef([]);
  const syncTimer = useRef(null);

  // Reflect any already-active translation (persisted by Google via cookie).
  useEffect(() => {
    setCurrent(readGoogleCode());
    return () => clearInterval(syncTimer.current);
  }, []);

  // Close on outside click.
  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // When opening, focus the active (current) option for keyboard users.
  useEffect(() => {
    if (open) {
      const idx = Math.max(0, LANGUAGES.findIndex((l) => l.code === current));
      setActiveIndex(idx);
      requestAnimationFrame(() => optionRefs.current[idx]?.focus());
    }
  }, [open, current]);

  const select = (code) => {
    setCurrent(code);           // optimistic UI (flag, 2-letter code, checkmark)
    setOpen(false);             // close dropdown
    buttonRef.current?.focus();

    // Drive the REAL Google combo -> Google translates the page.
    applyLanguage(code, () => {
      // Sync UI to Google's ACTUAL state (cookie) once it settles.
      clearInterval(syncTimer.current);
      let ticks = 0;
      syncTimer.current = setInterval(() => {
        const real = readGoogleCode();
        if (real === code) {
          setCurrent(code);
          clearInterval(syncTimer.current);
        } else if (++ticks >= 16) {
          setCurrent(real);
          clearInterval(syncTimer.current);
        }
      }, 250);
    });
  };

  const onListKeyDown = (e) => {
    const n = LANGUAGES.length;
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = (activeIndex + 1) % n;
      setActiveIndex(i);
      optionRefs.current[i]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const i = (activeIndex - 1 + n) % n;
      setActiveIndex(i);
      optionRefs.current[i]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndex(0);
      optionRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIndex(n - 1);
      optionRefs.current[n - 1]?.focus();
    }
  };

  const currentLang = LANGUAGES.find((l) => l.code === current) || LANGUAGES[0];

  return (
    // notranslate keeps Google from translating our own selector labels.
    <div ref={rootRef} className="notranslate relative" translate="no">
      {/* Compact navbar button: flag + 2-letter code + chevron. */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Select language, current language ${currentLang.label}`}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-2.5 py-1.5 text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        <Flag cc={currentLang.cc} label={currentLang.label} className="h-[13px] w-[19px]" />
        <span className="text-xs font-semibold leading-none tracking-wide">{currentLang.abbr}</span>
        <ChevronDown
          className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Choose a language"
            tabIndex={-1}
            onKeyDown={onListKeyDown}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-[calc(100%+0.5rem)] z-[60] max-h-[70vh] w-56 overflow-auto rounded-2xl border border-line bg-white p-1.5 shadow-lift"
          >
            {LANGUAGES.map((lang, i) => {
              const selected = lang.code === current;
              return (
                <li key={lang.code} role="none">
                  <button
                    ref={(node) => {
                      optionRefs.current[i] = node;
                    }}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    tabIndex={i === activeIndex ? 0 : -1}
                    onClick={() => select(lang.code)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400',
                      selected
                        ? 'bg-brand-50 font-semibold text-brand-800'
                        : 'text-ink hover:bg-surface',
                    )}
                  >
                    <Flag cc={lang.cc} label={lang.label} className="h-5 w-7" />
                    <span className="flex-1">{lang.label}</span>
                    {selected && <Check className="h-4 w-4 text-brand-600" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
