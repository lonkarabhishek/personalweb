import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════════════════════
   AGENT BUILD — a live "agents are constructing this page" intro sequence.
   Streams agent build logs while a wireframe of the page assembles, then reveals
   the finished site. Self-contained; dark + electric-blue to match the studio.
   ═══════════════════════════════════════════════════════════════════════════════ */
const C = {
  bg: '#0e0e0c', fg: '#f4f3ef', muted: 'rgba(255,255,255,0.55)', faint: 'rgba(255,255,255,0.30)',
  accent: '#1f3aff', green: '#46d17f', line: 'rgba(255,255,255,0.13)', panel: 'rgba(255,255,255,0.035)',
};
const MONO = "'Space Mono', ui-monospace, 'SF Mono', monospace";
const DISP = "'Bricolage Grotesque', 'Space Grotesk', system-ui, sans-serif";

type Task = { agent: string; file: string; msg: string; slot: string | null };
const TASKS: Task[] = [
  { agent: 'layout',   file: 'nav.tsx',       msg: 'mounting navigation',        slot: 'nav' },
  { agent: 'layout',   file: 'hero.tsx',      msg: 'drafting hero layout',       slot: 'hero' },
  { agent: 'copy',     file: 'content.ts',    msg: 'writing headline + intro',   slot: 'hero' },
  { agent: 'brand',    file: 'clients.tsx',   msg: 'placing experience strip',   slot: 'marquee' },
  { agent: 'build',    file: 'work.tsx',      msg: 'assembling selected work',   slot: 'work' },
  { agent: 'motion',   file: 'video.tsx',     msg: 'embedding the demo reel',    slot: 'video' },
  { agent: 'systems',  file: 'services.tsx',  msg: 'wiring the services grid',   slot: 'services' },
  { agent: 'copy',     file: 'reviews.ts',    msg: 'pulling client quotes',      slot: 'testi' },
  { agent: 'deploy',   file: 'edge',          msg: 'shipping to the edge',       slot: null },
];
const AGENTS = ['layout', 'copy', 'brand', 'build', 'motion', 'systems', 'deploy'];
const SLOTS: { id: string; kind: 'bar' | 'hero' | 'thin' | 'grid' | 'wide' | 'tiles' | 'lines' }[] = [
  { id: 'nav', kind: 'bar' },
  { id: 'hero', kind: 'hero' },
  { id: 'marquee', kind: 'thin' },
  { id: 'work', kind: 'grid' },
  { id: 'video', kind: 'wide' },
  { id: 'services', kind: 'tiles' },
  { id: 'testi', kind: 'lines' },
];

export const AgentBuild: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const reduce = useReducedMotion();
  const [logs, setLogs] = useState<(Task & { done: boolean })[]>([]);
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [doneSlots, setDoneSlots] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) { onComplete(); return; }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const STEP = 300;
    const start = performance.now();
    const tick = setInterval(() => setElapsed(performance.now() - start), 55);

    let i = 0;
    const run = () => {
      if (i >= TASKS.length) {
        clearInterval(tick);
        setElapsed(performance.now() - start);
        timers.push(setTimeout(() => setFinished(true), 260));
        timers.push(setTimeout(() => onComplete(), 260 + 820));
        return;
      }
      const t = TASKS[i];
      const idx = i;
      setLogs((prev) => [...prev, { ...t, done: false }]);
      if (t.slot) setActiveSlot(t.slot);
      timers.push(setTimeout(() => {
        setLogs((prev) => prev.map((l, j) => (j === idx ? { ...l, done: true } : l)));
        if (t.slot) setDoneSlots((prev) => (prev.includes(t.slot!) ? prev : [...prev, t.slot!]));
        setProgress(Math.round(((idx + 1) / TASKS.length) * 100));
        i++;
        run();
      }, STEP));
    };
    run();
    return () => { timers.forEach(clearTimeout); clearInterval(tick); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [logs]);

  if (reduce) return null;

  const secs = (elapsed / 1000).toFixed(1);

  const slotState = (id: string) => (doneSlots.includes(id) ? 'built' : activeSlot === id ? 'active' : 'idle');
  const slotStyle = (id: string): React.CSSProperties => {
    const s = slotState(id);
    return {
      background: s === 'built' ? 'rgba(31,58,255,0.16)' : s === 'active' ? 'rgba(255,255,255,0.05)' : 'transparent',
      border: `1px ${s === 'built' ? 'solid' : 'dashed'} ${s === 'built' ? 'rgba(31,58,255,0.55)' : s === 'active' ? C.accent : C.line}`,
      transition: 'all 0.35s ease',
    };
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[120] overflow-hidden"
      style={{ background: C.bg, color: C.fg }}
      aria-label="Building the page">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Space+Grotesk:wght@500;600;700&family=Space+Mono:wght@400;700&display=swap');
        @keyframes bldBlink{0%,100%{opacity:1}50%{opacity:0}} @keyframes bldScan{0%{top:0}100%{top:100%}}`}</style>
      <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }} />

      <div className="absolute inset-0 flex flex-col" style={{ padding: 'clamp(20px, 4vw, 48px)' }}>
        {/* top bar */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div style={{ width: 40, height: 40, borderRadius: 9, background: C.fg, color: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISP, fontWeight: 700, fontSize: 17 }}>AL</div>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 13, color: C.fg }}>Abhishek Lonkar Studio</div>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.faint, marginTop: 3 }}>
                {finished ? 'build complete' : 'building this page, live'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div style={{ fontFamily: DISP, fontWeight: 600, fontSize: 'clamp(1.1rem,2vw,1.6rem)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{secs}s</div>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.faint }}>{AGENTS.length} agents</div>
          </div>
        </div>

        {/* main */}
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-8 md:mt-12">
          {/* terminal */}
          <div className="min-h-0 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span style={{ width: 8, height: 8, borderRadius: 999, background: finished ? C.green : C.accent }} />
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted }}>agent console</span>
            </div>
            <div ref={logRef} className="flex-1 min-h-0 overflow-hidden" style={{ fontFamily: MONO, fontSize: 'clamp(11px,1vw,13px)', lineHeight: 1.9 }}>
              {logs.map((l, j) => (
                <div key={j} className="flex items-baseline gap-2" style={{ color: l.done ? C.muted : C.fg }}>
                  <span style={{ color: l.done ? C.green : C.accent, width: 14, flexShrink: 0 }}>{l.done ? '✓' : '▸'}</span>
                  <span style={{ color: C.accent, flexShrink: 0 }}>agent·{l.agent}</span>
                  <span style={{ color: C.faint, flexShrink: 0 }}>{l.file}</span>
                  <span className="truncate">{l.msg}{!l.done && <span style={{ color: C.accent }}> …</span>}</span>
                </div>
              ))}
              {!finished && (
                <div className="flex items-center gap-2" style={{ color: C.fg }}>
                  <span style={{ color: C.accent }}>$</span>
                  <span style={{ display: 'inline-block', width: 9, height: 15, background: C.accent, animation: 'bldBlink 1s step-end infinite' }} />
                </div>
              )}
            </div>
          </div>

          {/* wireframe */}
          <div className="hidden md:flex min-h-0 flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted }}>live preview</span>
            </div>
            <div className="relative flex-1 min-h-0 overflow-hidden" style={{ border: `1px solid ${C.line}`, background: C.panel, padding: 14 }}>
              {!finished && <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent,rgba(31,58,255,0.8),transparent)', animation: 'bldScan 2.2s linear infinite', zIndex: 2 }} />}
              <div className="flex flex-col gap-2.5 h-full">
                {SLOTS.map((s) => {
                  const st = slotStyle(s.id);
                  if (s.kind === 'bar') return <div key={s.id} style={{ ...st, height: 26, flexShrink: 0 }} />;
                  if (s.kind === 'thin') return <div key={s.id} style={{ ...st, height: 18, flexShrink: 0 }} />;
                  if (s.kind === 'hero') return <div key={s.id} style={{ ...st, flex: 2.2 }} />;
                  if (s.kind === 'wide') return <div key={s.id} style={{ ...st, flex: 1.4 }} />;
                  if (s.kind === 'grid') return (
                    <div key={s.id} className="grid grid-cols-2 gap-2.5" style={{ flex: 2 }}>
                      {[0, 1, 2, 3].map((n) => <div key={n} style={st} />)}
                    </div>
                  );
                  if (s.kind === 'tiles') return (
                    <div key={s.id} className="grid grid-cols-3 gap-2.5" style={{ flex: 1.2 }}>
                      {[0, 1, 2].map((n) => <div key={n} style={st} />)}
                    </div>
                  );
                  return (
                    <div key={s.id} className="flex flex-col gap-1.5" style={{ flex: 1 }}>
                      <div style={{ ...st, height: 10 }} /><div style={{ ...st, height: 10, width: '80%' }} /><div style={{ ...st, height: 10, width: '60%' }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* footer: progress + skip */}
        <div className="mt-8 md:mt-10">
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.08em', color: C.muted }}>
              {finished ? 'done' : `compiling · ${progress}%`}
            </span>
            <button onClick={onComplete} style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.faint, background: 'none', border: `1px solid ${C.line}`, padding: '7px 14px', cursor: 'pointer' }}>
              Skip
            </button>
          </div>
          <div style={{ position: 'relative', height: 2, background: C.line, width: '100%' }}>
            <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.25, ease: 'easeOut' }} style={{ position: 'absolute', top: 0, left: 0, bottom: 0, background: C.accent }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
