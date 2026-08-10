import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Phone, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import { site } from '../../content/site.js';
import { answer, greeting, suggestions } from '../../lib/chatbot/knowledge.js';

let msgId = 0;
const nextId = () => ++msgId;

// Renders a single action chip based on its kind (tel / mailto / link / external).
function ActionChip({ action, onNavigate }) {
  const cls =
    'inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 transition-colors hover:bg-brand-100';
  const icon = {
    tel: <Phone className="h-3.5 w-3.5" aria-hidden="true" />,
    mailto: <Mail className="h-3.5 w-3.5" aria-hidden="true" />,
    external: <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />,
    link: <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />,
  }[action.kind];

  if (action.kind === 'link') {
    return (
      <Link to={action.href} className={cls} onClick={onNavigate}>
        {icon}
        {action.label}
      </Link>
    );
  }
  const external = action.kind === 'external';
  return (
    <a
      href={action.href}
      className={cls}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {icon}
      {action.label}
    </a>
  );
}

function Bubble({ from, text, actions, onNavigate }) {
  const isBot = from === 'bot';
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] ${isBot ? '' : 'items-end'}`}>
        <div
          className={
            isBot
              ? 'whitespace-pre-line rounded-2xl rounded-tl-md bg-surface px-4 py-2.5 text-sm leading-relaxed text-ink ring-1 ring-line'
              : 'whitespace-pre-line rounded-2xl rounded-tr-md bg-brand-600 px-4 py-2.5 text-sm leading-relaxed text-white'
          }
        >
          {text}
        </div>
        {isBot && actions?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {actions.map((a) => (
              <ActionChip key={a.label} action={a} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-md bg-surface px-4 py-3 ring-1 ring-line" aria-label="Assistant is typing">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 animate-bounce rounded-full bg-muted/60"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: nextId(), from: 'bot', text: greeting.text }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Keep the latest message in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  // Focus the input when the window opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const send = (raw) => {
    const question = raw.trim();
    if (!question || typing) return;
    setShowSuggestions(false);
    setMessages((m) => [...m, { id: nextId(), from: 'user', text: question }]);
    setInput('');
    setTyping(true);

    // Brief, human-feeling delay before the local knowledge base replies.
    timerRef.current = setTimeout(() => {
      const res = answer(question);
      setMessages((m) => [...m, { id: nextId(), from: 'bot', text: res.text, actions: res.actions }]);
      setTyping(false);
    }, 500);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-brand-600 text-white shadow-lift transition-all duration-200 hover:bg-brand-700 hover:shadow-lg active:translate-y-px"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'x' : 'chat'}
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with us"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-[5.5rem] right-5 z-[60] flex h-[min(32rem,calc(100vh-8rem))] w-[calc(100vw-2.5rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-line"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-brand-600 px-5 py-4 text-white">
              <div>
                <p className="font-display text-base font-bold leading-tight">How can we help?</p>
                <p className="text-xs text-white/80">{site.shortName}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid h-8 w-8 place-items-center rounded-full text-white/90 transition-colors hover:bg-white/15"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <Bubble key={m.id} from={m.from} text={m.text} actions={m.actions} onNavigate={() => setOpen(false)} />
              ))}
              {typing && <TypingDots />}

              {showSuggestions && !typing && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-brand-400 hover:text-brand-700"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-line p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type your question…"
                  aria-label="Type your message"
                  className="w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-brand-400"
                />
                <button
                  type="button"
                  onClick={() => send(input)}
                  disabled={!input.trim() || typing}
                  aria-label="Send message"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
