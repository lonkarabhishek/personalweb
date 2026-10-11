import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { SiteAgent } from './SiteAgent';

/* ═══════════════════════════════════════════════════════════════════════════════
   ASK TAKEOVER (main site) — a floating launcher, bottom-right, that opens a
   full-screen overlay with the assistant filling the screen. Mirrors the studio
   pattern, in the main site's language: purple, rounded, Inter.
   ═══════════════════════════════════════════════════════════════════════════════ */
const PRIMARY = '#7c3aed';
const INK = '#1a1a2e';
const SPRING_PRESS = { type: 'spring', stiffness: 500, damping: 30 } as const;
const SPRING_SOFT = { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 } as const;

const TOPICS = [
  'What he did at G2',
  'Tools & skills',
  'Is he a fit for your team?',
  'How to reach him',
];

export const AskLauncher: React.FC<{ show: boolean; onClick: () => void }> = ({ show, onClick }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        className="fixed z-[120]"
        style={{ right: 'clamp(16px, 2.5vw, 32px)', bottom: 'clamp(16px, 2.5vw, 32px)' }}
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.18 } }}
        transition={SPRING_SOFT}>
        <motion.button
          onClick={onClick}
          aria-label="Ask my assistant"
          className="flex items-center gap-2.5 rounded-full font-sans font-semibold text-white"
          whileHover={{ y: -2, backgroundColor: INK }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING_PRESS}
          style={{ background: PRIMARY, border: 'none', padding: '14px 20px 14px 18px', fontSize: 14, cursor: 'pointer', boxShadow: '0 16px 44px rgba(124,58,237,0.35)' }}>
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full animate-ping" style={{ background: '#4ade80', opacity: 0.7 }} />
            <span className="relative inline-flex w-2 h-2 rounded-full" style={{ background: '#4ade80' }} />
          </span>
          Ask my assistant
          <Sparkles size={15} />
        </motion.button>
      </motion.div>
    )}
  </AnimatePresence>
);

export const AskTakeover: React.FC<{ isOpen: boolean; onClose: () => void; onBook: () => void }> = ({ isOpen, onClose, onBook }) => {
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog" aria-modal="true" aria-label="Ask my assistant"
          className="fixed inset-0 z-[150] flex flex-col font-sans"
          style={{ background: '#f8fafc', color: INK }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }}
          transition={{ duration: 0.3 }}>
          {/* top bar */}
          <div className="flex items-center justify-between px-5 md:px-10 bg-white" style={{ height: 64, borderBottom: '1px solid #e5e7eb', flexShrink: 0 }}>
            <span className="font-bold tracking-tight" style={{ fontSize: 17 }}>
              Abhishek Lonkar<span style={{ color: PRIMARY }}>.</span>
            </span>
            <span className="hidden md:flex items-center gap-2 text-xs font-medium text-text-secondary">
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} /> Ask my assistant
            </span>
            {/* big, unmissable exit (Escape also closes) */}
            <motion.button
              onClick={onClose} aria-label="Close" title="Close (Esc)"
              className="flex items-center justify-center rounded-xl text-white"
              whileHover={{ backgroundColor: PRIMARY, rotate: 90 }}
              whileTap={{ scale: 0.94 }}
              transition={SPRING_PRESS}
              style={{ width: 44, height: 44, background: INK, border: 'none', cursor: 'pointer', flexShrink: 0 }}>
              <X size={22} strokeWidth={2.25} />
            </motion.button>
          </div>

          {/* body */}
          <div className="flex-1 min-h-0 w-full max-w-7xl mx-auto flex lg:gap-12 lg:px-10 lg:py-10">
            <motion.div
              className="hidden lg:flex flex-col justify-between shrink-0"
              style={{ width: 380 }}
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 border border-primary/20 mb-5">
                  <Sparkles size={14} className="text-primary mr-2" />
                  <span className="text-sm text-text-secondary">Ask my assistant</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight leading-tight text-text-primary">
                  Questions about my work? Just ask.
                </h2>
                <p className="text-text-secondary leading-relaxed mt-4 font-light">
                  An assistant I built that knows my experience. Ask what I did at G2, which tools I use, or whether I'd be a fit for your team. For anything specific, book a call.
                </p>
              </div>
              <ul className="flex flex-col border-t border-gray-200">
                {TOPICS.map((label, i) => (
                  <li key={label} className="flex items-baseline gap-4 py-3 border-b border-gray-200">
                    <span className="text-xs font-semibold tabular-nums" style={{ color: PRIMARY }}>{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-text-primary">{label}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="flex-1 min-w-0 min-h-0"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}>
              <SiteAgent persona="main" onBook={onBook} fill autoFocus />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* Convenience: launcher + takeover with their own open state. The launcher waits
   a beat after mount so it arrives after the page, not with it. */
export const AskAssistantFloating: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 900); return () => clearTimeout(t); }, []);
  return (
    <>
      <AskLauncher show={ready && !open} onClick={() => setOpen(true)} />
      <AskTakeover isOpen={open} onClose={() => setOpen(false)} onBook={onBook} />
    </>
  );
};
