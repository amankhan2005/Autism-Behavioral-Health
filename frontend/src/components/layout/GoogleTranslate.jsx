import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/cn.js';

/**
 * Custom, premium language selector that drives the real Google Translate
 * widget underneath. The native Google combo (.goog-te-combo) is kept in the
 * DOM but visually hidden; selecting a language here sets that combo's value
 * and fires its change event, so actual translation is performed by Google.
 *
 * Google Translate is still initialized exactly once (single script + guards).
 */

// The only 10 languages we expose. `code` is the Google Translate language
// code used on the hidden combo; `cc` is the flag country code (flagcdn).
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

const INCLUDED = LANGUAGES.map((l) => l.code).join(',');
const SCRIPT_ID = 'google-translate-script';

/*
 * React ↔ Google Translate DOM safeguard.
 *
 * The custom selector below is fully React-controlled and marked `notranslate`,
 * so Google never touches it and its state (flag / code / checkmark) always
 * updates correctly on its own. This guard only concerns the rest of the page:
 * Google translates by re-parenting text nodes into <font> wrappers, and when
 * React later removes/moves a node whose parent Google changed (e.g. on route
 * change), the native call throws NotFoundError and white-screens the app.
 *
 * There is no fully reliable way to avoid this for a page that is entirely
 * React-rendered AND translated by Google, so we install the minimal, safe
 * mitigation: call the NATIVE method first and only fall back when it would
 * otherwise throw. Normal DOM operations are never altered — the wrappers only
 * act on the specific error path. Installed once, in the browser only.
 */
if (typeof window !== 'undefined' && !window.__gtDomGuard) {
  window.__gtDomGuard = true;
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function safeRemoveChild(child) {
    try {
      return originalRemoveChild.call(this, child);
    } catch {
      // Node was re-parented by Google Translate — remove from its real parent.
      if (child && child.parentNode && child.parentNode !== this) {
        try { return child.parentNode.removeChild(child); } catch { /* ignore */ }
      }
      return child;
    }
  };
  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function safeInsertBefore(newNode, referenceNode) {
    try {
      return originalInsertBefore.call(this, newNode, referenceNode);
    } catch {
      if (referenceNode && referenceNode.parentNode && referenceNode.parentNode !== this) {
        try { return referenceNode.parentNode.insertBefore(newNode, referenceNode); } catch { /* ignore */ }
      }
      try { return this.appendChild(newNode); } catch { /* ignore */ }
      return newNode;
    }
  };
}

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

// Read the language Google is ACTUALLY showing, from its cookie (e.g. /en/fr).
// This is the source of truth we sync the UI against.
function readGoogleCode() {
  if (typeof document === 'undefined') return 'en';
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match) return 'en';
  const parts = decodeURIComponent(match[1]).split('/').filter(Boolean);
  const target = parts[parts.length - 1];
  return LANGUAGES.some((l) => l.code === target) ? target : 'en';
}

// Drive the hidden Google combo: wait until it exists AND has the target
// option, then set the value and fire a real change event so Google
// translates. `onFired` runs once the change has been dispatched.
function applyLanguage(code, onFired) {
  let tries = 0;
  const tick = () => {
    const combo = document.querySelector('.goog-te-combo');
    const ready = combo && Array.from(combo.options).some((o) => o.value === code);
    // 'en' restores the original; its option may lag, so don't block on it.
    if (combo && (ready || code === 'en')) {
      combo.value = code;
      combo.dispatchEvent(new Event('change', { bubbles: true }));
      onFired?.();
      return;
    }
    if (tries++ < 40) setTimeout(tick, 75);
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

  // Initialize Google Translate once, restricted to our 10 languages.
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      const el = document.getElementById('google_translate_element');
      if (!el || el.childElementCount > 0) return; // already populated
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: INCLUDED,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element',
      );
    };

    if (document.getElementById(SCRIPT_ID)) {
      window.googleTranslateElementInit();
    } else {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // Reflect any already-active translation (persisted via cookie).
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
    // 1) Optimistic UI update (flag, 2-letter code, checkmark) — immediate.
    setCurrent(code);
    // 6) Close the dropdown and return focus to the button.
    setOpen(false);
    buttonRef.current?.focus();

    // 1 & 7) Trigger the REAL Google translation via the hidden combo.
    applyLanguage(code, () => {
      // 2-5) Keep the UI synced with Google's ACTUAL state (the cookie),
      // covering the case where translation succeeds asynchronously or the
      // optimistic value and Google's result ever diverge.
      clearInterval(syncTimer.current);
      let ticks = 0;
      syncTimer.current = setInterval(() => {
        const real = readGoogleCode();
        if (real === code) {
          setCurrent(code);
          clearInterval(syncTimer.current);
        } else if (++ticks >= 12) {
          setCurrent(real); // reflect whatever Google ended up on
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
      {/* Hidden native Google widget — kept functional, visually removed. */}
      <div id="google_translate_element" aria-hidden="true" />

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
