import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import type { WorkCard } from '../content/work';
import { WorkShowcase } from './WorkShowcase';

/* ═══════════════════════════════════════════════════════════════════════════════
   SITE AGENT — an inline assistant panel (Claude via /api/agent) that lives in
   the page flow as a proper section, not a floating widget. It opens compact
   (greeting, quick replies, input) and grows into the conversation in place,
   showing its working steps as it answers. `persona` picks the voice + prompts
   (matched server-side) and the visual theme so it sits naturally on either site.
   ═══════════════════════════════════════════════════════════════════════════════ */
export type Persona = 'studio' | 'main';

type Copy = {
  name: string;
  subtitle: string;
  greeting: string;
  quick: string[];
  steps: string[];
  placeholder: string;
  book: string;
  fallback: string;
};

export type Theme = {
  radius: number;   // panel corners
  bubble: number;   // message-bubble corners
  control: number;  // input / button corners
  bg: string;
  border: string;
  fg: string;
  muted: string;
  faint: string;
  accent: string;
  surface: string;
  shadow: string;
  online: string;
  display: string;
  sans: string;
  label: string;
};

const COPY: Record<Persona, Copy> = {
  studio: {
    name: 'Studio Agent',
    subtitle: 'online · built by the studio',
    greeting: "Hi, this is Abhishek Lonkar Studio. Ask us what we build, how we work, or tell us about your project and we'll help scope it.",
    quick: ['What do you build?', 'Scope my project', 'How do you work?', 'Show me your work'],
    steps: ['Reading your message', 'Pulling studio context', 'Checking the work', 'Composing a reply'],
    placeholder: 'Ask about a project…',
    book: 'or book a free call →',
    fallback: "We're having trouble answering right now. The quickest way forward is a short call with us, use the book a call link below.",
  },
  main: {
    name: "Abhishek's Assistant",
    subtitle: 'online · knows his work',
    greeting: "Hi, I'm Abhishek's assistant. Ask me about his GTM & RevOps experience, what he's built at G2, or whether he'd be a fit for your team.",
    quick: ['What does Abhishek do?', 'Show me his best work', 'Is he a fit for RevOps?', 'How do I reach him?'],
    steps: ['Reading your message', 'Pulling his experience', 'Checking the numbers', 'Composing a reply'],
    placeholder: 'Ask about his experience…',
    book: 'or book a call with Abhishek →',
    fallback: "I'm having trouble reaching my model right now. The quickest way forward is to book a call or message Abhishek on LinkedIn.",
  },
};

// Studio: sharp, monochrome + electric blue, mono labels. Main: soft card, Inter, purple.
const THEME: Record<Persona, Theme> = {
  studio: {
    radius: 0, bubble: 2, control: 0,
    bg: '#ffffff', border: 'rgba(20,20,15,0.14)', fg: '#161613', muted: '#6d6d67', faint: '#9c9c95',
    accent: '#1f3aff', surface: '#f3f2ee', shadow: 'none', online: '#2fb56a',
    display: "'Bricolage Grotesque', 'Space Grotesk', system-ui, sans-serif",
    sans: "'Inter', system-ui, sans-serif",
    label: "'Space Mono', ui-monospace, monospace",
  },
  main: {
    radius: 20, bubble: 14, control: 12,
    bg: '#ffffff', border: '#e5e7eb', fg: '#1a1a2e', muted: '#475569', faint: '#94a3b8',
    accent: '#7c3aed', surface: '#f8fafc', shadow: '0 1px 2px rgba(0,0,0,0.04), 0 10px 32px rgba(15,23,42,0.06)', online: '#22c55e',
    display: "'Inter', system-ui, sans-serif",
    sans: "'Inter', system-ui, sans-serif",
    label: "'Inter', system-ui, sans-serif",
  },
};

type Msg = { role: 'user' | 'assistant'; text: string; cards?: WorkCard[] };

// `fill`: stretch to the parent's full height (for a full-screen takeover) instead of
// growing in place with an internal ~460px scroll cap. `autoFocus` focuses the input on mount.
export const SiteAgent: React.FC<{ persona: Persona; onBook: () => void; fill?: boolean; autoFocus?: boolean }> = ({ persona, onBook, fill = false, autoFocus = false }) => {
  const P = COPY[persona];
  const S = THEME[persona];
  const [messages, setMessages] = useState<Msg[]>([{ role: 'assistant', text: P.greeting }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const started = messages.length > 1;

  // Keep the newest message in view inside the panel (the page itself never moves).
  // A reply with work cards is tall, so scroll to ITS top (intro line + first cards)
  // rather than the bottom; everything else scrolls to the end as usual.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const last = messages[messages.length - 1];
    if (!busy && last?.role === 'assistant' && last.cards?.length) {
      const nodes = el.querySelectorAll<HTMLElement>('[data-msg]');
      const node = nodes[nodes.length - 1];
      if (node) {
        const top = node.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop - 10;
        el.scrollTo({ top, behavior: 'smooth' });
        return;
      }
    }
    el.scrollTop = el.scrollHeight;
  }, [messages, busy, stepIdx]);

  useEffect(() => {
    if (!busy) return;
    setStepIdx(0);
    const t = setInterval(() => setStepIdx((i) => Math.min(i + 1, P.steps.length - 1)), 650);
    return () => clearInterval(t);
  }, [busy, P.steps.length]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;
    const next = [...messages, { role: 'user' as const, text }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      const r = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ persona, messages: next.map(({ role, text }) => ({ role, text })) }),
      });
      const data = await r.json().catch(() => ({}));
      const reply = r.ok && data?.text ? data.text : P.fallback;
      const cards: WorkCard[] | undefined = r.ok && Array.isArray(data?.cards) && data.cards.length ? data.cards : undefined;
      setMessages((m) => [...m, { role: 'assistant', text: reply, cards }]);
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', text: "I couldn't connect just now. Try again in a moment, or use the link below to reach Abhishek directly." }]);
    } finally {
      setBusy(false);
    }
  };

  const labelStyle: React.CSSProperties = { fontFamily: S.label, fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', color: S.muted };

  return (
    <div className="w-full" style={{
      background: S.bg, border: `1px solid ${S.border}`, borderRadius: S.radius, boxShadow: S.shadow, overflow: 'hidden', color: S.fg,
      ...(fill ? { height: '100%', display: 'flex', flexDirection: 'column' as const } : {}),
    }}>
      <style>{`@keyframes agBlink{0%,100%{opacity:1}50%{opacity:0.2}}`}</style>

      {/* header */}
      <div className="flex items-center justify-between" style={{ padding: '14px 18px', borderBottom: `1px solid ${S.border}`, flexShrink: 0 }}>
        <div className="flex items-center gap-3">
          <div style={{ width: 32, height: 32, borderRadius: S.control || 6, background: S.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Sparkles size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: S.display, fontWeight: 600, fontSize: 15, lineHeight: 1.2 }}>{P.name}</div>
            <div className="flex items-center gap-1.5 mt-0.5" style={labelStyle}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: S.online }} /> {P.subtitle}
            </div>
          </div>
        </div>
        <span className="hidden sm:block" style={{ ...labelStyle, color: S.faint }}>AI · replies in seconds</span>
      </div>

      {/* conversation — grows in place and scrolls internally past ~460px; in `fill` mode it takes all remaining height */}
      <div ref={scrollRef} style={{ ...(fill ? { flex: 1, minHeight: 0 } : { maxHeight: 460 }), overflowY: 'auto', padding: '18px 18px 6px' }}>
        <div className="flex flex-col gap-3">
          {messages.map((m, i) => (
            <div key={i} data-msg className="flex flex-col gap-2.5" style={{ alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '82%', padding: '10px 14px', fontFamily: S.sans, fontSize: 14.5, lineHeight: 1.55,
                background: m.role === 'user' ? S.accent : S.surface, color: m.role === 'user' ? '#fff' : S.fg,
                border: m.role === 'user' ? 'none' : `1px solid ${S.border}`,
                borderRadius: m.role === 'user' ? `${S.bubble}px ${S.bubble}px 2px ${S.bubble}px` : `${S.bubble}px ${S.bubble}px ${S.bubble}px 2px`,
                whiteSpace: 'pre-wrap',
              }}>
                {m.text}
              </div>
              {/* "show me your work" → the assistant's picks, as real cards */}
              {m.role === 'assistant' && m.cards && m.cards.length > 0 && (
                <WorkShowcase cards={m.cards} S={S} persona={persona} onBook={onBook} />
              )}
            </div>
          ))}

          {/* working steps = visible reasoning */}
          <AnimatePresence>
            {busy && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex" style={{ justifyContent: 'flex-start' }}>
                <div style={{ maxWidth: '82%', padding: '11px 14px', background: S.surface, border: `1px solid ${S.border}`, borderRadius: `${S.bubble}px ${S.bubble}px ${S.bubble}px 2px` }}>
                  {P.steps.map((s, i) => i <= stepIdx && (
                    <div key={i} className="flex items-center gap-2" style={{ fontFamily: S.label, fontSize: 11.5, lineHeight: 1.85, color: i < stepIdx ? S.muted : S.fg }}>
                      <span style={{ color: i < stepIdx ? S.online : S.accent, width: 12 }}>{i < stepIdx ? '✓' : '▸'}</span>
                      <span>{s}{i === stepIdx && <span style={{ animation: 'agBlink 1s infinite' }}> …</span>}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* quick replies (only before the first question) */}
          {!started && !busy && (
            <div className="flex flex-wrap gap-2 mt-1 mb-2">
              {P.quick.map((q) => (
                <button key={q} onClick={() => send(q)}
                  style={{ fontFamily: S.sans, fontSize: 13, color: S.fg, background: 'transparent', border: `1px solid ${S.border}`, padding: '7px 12px', borderRadius: S.radius ? 999 : 0, cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = S.accent; e.currentTarget.style.color = S.accent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = S.border; e.currentTarget.style.color = S.fg; }}>
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* input + book */}
      <div style={{ borderTop: `1px solid ${S.border}`, padding: '12px 14px 10px', flexShrink: 0 }}>
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2">
          <input
            value={input} onChange={(e) => setInput(e.target.value)} disabled={busy} autoFocus={autoFocus}
            placeholder={P.placeholder} aria-label={P.placeholder}
            style={{ flex: 1, minWidth: 0, fontFamily: S.sans, fontSize: 14.5, color: S.fg, background: S.surface, border: `1px solid ${S.border}`, padding: '11px 14px', outline: 'none', borderRadius: S.control }}
            onFocus={(e) => { e.currentTarget.style.borderColor = S.accent; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = S.border; }}
          />
          <button type="submit" disabled={busy || !input.trim()} aria-label="Send"
            style={{ width: 44, height: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: input.trim() && !busy ? S.accent : S.surface, color: input.trim() && !busy ? '#fff' : S.faint, border: `1px solid ${input.trim() && !busy ? S.accent : S.border}`, borderRadius: S.control, cursor: input.trim() && !busy ? 'pointer' : 'default' }}>
            <Send size={16} />
          </button>
        </form>
        <div className="flex items-center justify-between mt-2 px-1">
          <button onClick={onBook} style={{ ...labelStyle, color: S.muted, background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', textTransform: 'none', letterSpacing: '0.04em', fontSize: 11.5 }}>
            {P.book}
          </button>
          <span style={{ ...labelStyle, color: S.faint, fontSize: 10 }}>Claude · Haiku</span>
        </div>
      </div>
    </div>
  );
};
