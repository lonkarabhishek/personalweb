import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════════
   STUDIO AGENT — a real concierge agent (Gemini via /api/agent) that also shows
   its working steps as it answers. Dark, on-brand. Self-contained widget.
   ═══════════════════════════════════════════════════════════════════════════════ */
const C = {
  bg: '#0e0e0c', panel: '#161614', fg: '#f4f3ef', muted: 'rgba(255,255,255,0.56)',
  faint: 'rgba(255,255,255,0.32)', accent: '#1f3aff', green: '#46d17f', line: 'rgba(255,255,255,0.12)',
};
const MONO = "'Space Mono', ui-monospace, monospace";
const SANS = "'Inter', system-ui, sans-serif";
const DISP = "'Bricolage Grotesque', 'Space Grotesk', system-ui, sans-serif";

const STEPS = ['Reading your message', 'Pulling studio context', 'Checking the work', 'Composing a reply'];
const QUICK = ['What do you build?', 'Scope my project', 'How do you work?', 'Show me your work'];
const GREETING = "Hi, I'm the Studio Agent, built by Abhishek Lonkar Studio. Ask me what we build, and I can help scope your project.";

type Msg = { role: 'user' | 'assistant'; text: string };

export const StudioAgent: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: 'assistant', text: GREETING }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, busy, stepIdx]);

  useEffect(() => {
    if (!busy) return;
    setStepIdx(0);
    const t = setInterval(() => setStepIdx((i) => Math.min(i + 1, STEPS.length - 1)), 650);
    return () => clearInterval(t);
  }, [busy]);

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
        body: JSON.stringify({ messages: next }),
      });
      const data = await r.json().catch(() => ({}));
      const reply = r.ok && data?.text
        ? data.text
        : "I'm having trouble reaching my model right now. The quickest way forward is a short call with Abhishek, use the Book a call button below.";
      setMessages((m) => [...m, { role: 'assistant', text: reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: 'assistant', text: "I couldn't connect just now. Try again in a moment, or book a quick call and Abhishek will reply fast." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {/* launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-4 right-4 z-[90] flex items-center gap-2.5"
            aria-label="Chat with the studio agent"
            style={{ background: C.bg, color: C.fg, border: `1px solid ${C.line}`, padding: '12px 18px', cursor: 'pointer', boxShadow: '0 12px 40px rgba(0,0,0,0.35)' }}>
            <span className="relative flex items-center justify-center" style={{ width: 20, height: 20 }}>
              <Sparkles size={18} color={C.accent} />
            </span>
            <span style={{ fontFamily: SANS, fontSize: '14px', fontWeight: 500 }}>Ask the studio agent</span>
            <span className="w-2 h-2 rounded-full" style={{ background: C.green }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[95] flex flex-col overflow-hidden"
            style={{
              bottom: 16, right: 16, left: 'auto',
              width: 'min(390px, calc(100vw - 32px))', height: 'min(620px, calc(100vh - 32px))',
              background: C.bg, color: C.fg, border: `1px solid ${C.line}`, boxShadow: '0 24px 70px rgba(0,0,0,0.5)',
            }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600&family=Space+Mono&display=swap'); @keyframes agBlink{0%,100%{opacity:1}50%{opacity:0.2}}`}</style>

            {/* header */}
            <div className="flex items-center justify-between flex-shrink-0" style={{ padding: '14px 16px', borderBottom: `1px solid ${C.line}` }}>
              <div className="flex items-center gap-2.5">
                <div style={{ width: 30, height: 30, borderRadius: 8, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={15} color="#fff" />
                </div>
                <div>
                  <div style={{ fontFamily: DISP, fontWeight: 600, fontSize: 14 }}>Studio Agent</div>
                  <div className="flex items-center gap-1.5" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.green }} /> online · built by the studio
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" style={{ color: C.muted, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}><X size={18} /></button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto" style={{ padding: '16px' }}>
              <div className="flex flex-col gap-3">
                {messages.map((m, i) => (
                  <div key={i} className="flex" style={{ justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{
                      maxWidth: '85%', padding: '10px 13px', fontFamily: SANS, fontSize: 14, lineHeight: 1.55,
                      background: m.role === 'user' ? C.accent : C.panel, color: m.role === 'user' ? '#fff' : C.fg,
                      border: m.role === 'user' ? 'none' : `1px solid ${C.line}`,
                      borderRadius: m.role === 'user' ? '12px 12px 3px 12px' : '12px 12px 12px 3px', whiteSpace: 'pre-wrap',
                    }}>
                      {m.text}
                    </div>
                  </div>
                ))}

                {/* working steps = visible reasoning */}
                {busy && (
                  <div className="flex" style={{ justifyContent: 'flex-start' }}>
                    <div style={{ maxWidth: '85%', padding: '11px 13px', background: C.panel, border: `1px solid ${C.line}`, borderRadius: '12px 12px 12px 3px' }}>
                      {STEPS.map((s, i) => i <= stepIdx && (
                        <div key={i} className="flex items-center gap-2" style={{ fontFamily: MONO, fontSize: 11.5, lineHeight: 1.8, color: i < stepIdx ? C.muted : C.fg }}>
                          <span style={{ color: i < stepIdx ? C.green : C.accent, width: 12 }}>{i < stepIdx ? '✓' : '▸'}</span>
                          <span>{s}{i === stepIdx && <span style={{ animation: 'agBlink 1s infinite' }}> …</span>}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* quick replies (only before any user message) */}
                {messages.length === 1 && !busy && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {QUICK.map((q) => (
                      <button key={q} onClick={() => send(q)}
                        style={{ fontFamily: SANS, fontSize: 13, color: C.fg, background: 'transparent', border: `1px solid ${C.line}`, padding: '7px 11px', borderRadius: 999, cursor: 'pointer' }}>
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* input + book */}
            <div className="flex-shrink-0" style={{ borderTop: `1px solid ${C.line}`, padding: '12px' }}>
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2">
                <input
                  value={input} onChange={(e) => setInput(e.target.value)} disabled={busy}
                  placeholder="Ask about a project…"
                  style={{ flex: 1, fontFamily: SANS, fontSize: 14, color: C.fg, background: C.panel, border: `1px solid ${C.line}`, padding: '11px 13px', outline: 'none', borderRadius: 8 }}
                />
                <button type="submit" disabled={busy || !input.trim()} aria-label="Send"
                  style={{ width: 42, height: 42, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: input.trim() && !busy ? C.accent : C.panel, color: '#fff', border: `1px solid ${input.trim() && !busy ? C.accent : C.line}`, borderRadius: 8, cursor: input.trim() && !busy ? 'pointer' : 'default' }}>
                  <Send size={16} />
                </button>
              </form>
              <button onClick={onBook} className="w-full mt-2" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.06em', color: C.muted, background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                or book a free call →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
