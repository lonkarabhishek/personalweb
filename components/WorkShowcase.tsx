import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { shotFor, type WorkCard } from '../content/work';
import type { Persona, Theme } from './SiteAgent';

/* ═══════════════════════════════════════════════════════════════════════════════
   WORK SHOWCASE — rendered inside the chat when the assistant "shows" work.
   Site cards get a live preview (thum.io, wordmark fallback), tag, title,
   domain and a visit link. Impact cards lead with the headline number.
   Themed by the same tokens as the panel so it belongs on either site.
   ═══════════════════════════════════════════════════════════════════════════════ */
const SPRING_SOFT = { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 } as const;

const Preview: React.FC<{ card: WorkCard; S: Theme }> = ({ card, S }) => {
  const [ok, setOk] = useState(true);
  const initial = card.title.trim().charAt(0).toUpperCase();
  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 3', background: S.surface }}>
      {ok && card.link ? (
        <img
          src={shotFor(card.link)} alt={`${card.title} website preview`} loading="lazy" decoding="async"
          onError={() => setOk(false)}
          className="agwk-img absolute inset-0 w-full h-full object-cover object-top"
          style={{ transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1"
          style={{ background: `linear-gradient(135deg, ${S.accent} 0%, ${S.fg} 140%)`, color: '#fff' }}>
          <span style={{ fontFamily: S.display, fontWeight: 700, fontSize: 40, lineHeight: 1, letterSpacing: '-0.04em' }}>{initial}</span>
          <span style={{ fontFamily: S.label, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8 }}>{card.domain}</span>
        </div>
      )}
      <span className="absolute left-2 top-2" style={{
        fontFamily: S.label, fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase',
        background: 'rgba(255,255,255,0.92)', color: S.fg, padding: '4px 7px', borderRadius: S.control ? 999 : 0,
      }}>{card.tag}</span>
    </div>
  );
};

const SiteCard: React.FC<{ card: WorkCard; S: Theme }> = ({ card, S }) => (
  <motion.a
    href={card.link} target="_blank" rel="noopener noreferrer"
    className="agwk block overflow-hidden"
    whileHover={{ y: -3 }} transition={SPRING_SOFT}
    style={{ background: S.bg, border: `1px solid ${S.border}`, borderRadius: S.bubble, color: S.fg, textDecoration: 'none', boxShadow: S.shadow }}>
    <Preview card={card} S={S} />
    <div style={{ padding: '11px 12px 12px' }}>
      <div className="flex items-start justify-between gap-2">
        <div style={{ fontFamily: S.display, fontWeight: 600, fontSize: 14.5, lineHeight: 1.2 }}>{card.title}</div>
        <ArrowUpRight size={15} style={{ color: S.accent, flexShrink: 0, marginTop: 1 }} />
      </div>
      <div style={{ fontFamily: S.label, fontSize: 10, letterSpacing: '0.06em', color: S.faint, marginTop: 3 }}>{card.domain}{card.year ? ` · ${card.year}` : ''}</div>
      <p style={{
        fontFamily: S.sans, fontSize: 12.5, lineHeight: 1.5, color: S.muted, marginTop: 7,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>{card.desc}</p>
    </div>
  </motion.a>
);

const ImpactCard: React.FC<{ card: WorkCard; S: Theme }> = ({ card, S }) => (
  <motion.div
    className="agwk flex flex-col"
    whileHover={{ y: -3 }} transition={SPRING_SOFT}
    style={{ background: S.bg, border: `1px solid ${S.border}`, borderRadius: S.bubble, padding: '14px 14px 13px', boxShadow: S.shadow, minHeight: 150 }}>
    <div className="flex items-start justify-between gap-2">
      <div style={{ fontFamily: S.display, fontWeight: 700, fontSize: 30, lineHeight: 1, letterSpacing: '-0.03em', color: S.accent }}>{card.metric}</div>
      {card.org && (
        <div className="flex items-center gap-1.5" style={{ fontFamily: S.label, fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: S.muted }}>
          {card.logo && <img src={card.logo} alt="" width={18} height={18} style={{ borderRadius: 4, objectFit: 'cover' }} />}
          {card.org}
        </div>
      )}
    </div>
    <div style={{ fontFamily: S.display, fontWeight: 600, fontSize: 14.5, lineHeight: 1.25, marginTop: 10 }}>{card.title}</div>
    <p style={{ fontFamily: S.sans, fontSize: 12.5, lineHeight: 1.5, color: S.muted, marginTop: 6, flex: 1 }}>{card.desc}</p>
    <div style={{ fontFamily: S.label, fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: S.faint, marginTop: 10 }}>
      {card.tag}{card.year ? ` · ${card.year}` : ''}
    </div>
  </motion.div>
);

export const WorkShowcase: React.FC<{ cards: WorkCard[]; S: Theme; persona: Persona; onBook: () => void }> = ({ cards, S, persona, onBook }) => {
  const label: React.CSSProperties = { fontFamily: S.label, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: S.muted };
  const heading = persona === 'studio' ? 'Selected work' : 'Highlights';
  const pride = persona === 'studio' ? 'Built by us, start to finish' : 'Real results, real numbers';
  const cta = persona === 'studio' ? 'Want something like this?' : 'Want the full story?';
  return (
    <motion.div className="w-full" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={SPRING_SOFT}>
      <style>{`.agwk:hover .agwk-img{transform:scale(1.045)}`}</style>
      <div className="flex items-center justify-between" style={{ padding: '2px 2px 8px' }}>
        <span style={label}>{heading} · {String(cards.length).padStart(2, '0')}</span>
        <span className="flex items-center gap-1.5" style={{ ...label, color: S.faint }}>
          <span className="inline-block w-1.5 h-1.5" style={{ background: S.accent, borderRadius: S.control ? 999 : 0 }} /> {pride}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 10 }}>
        {cards.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...SPRING_SOFT, delay: 0.08 + i * 0.09 }}>
            {c.kind === 'site' ? <SiteCard card={c} S={S} /> : <ImpactCard card={c} S={S} />}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="flex items-center justify-between gap-3 flex-wrap"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + cards.length * 0.09 }}
        style={{ marginTop: 10, padding: '10px 12px', background: S.surface, border: `1px solid ${S.border}`, borderRadius: S.bubble }}>
        <span style={{ fontFamily: S.sans, fontSize: 13, color: S.fg }}>{cta}</span>
        <button onClick={onBook} className="flex items-center gap-1.5"
          style={{ fontFamily: S.sans, fontSize: 12.5, fontWeight: 600, color: '#fff', background: S.accent, border: 'none', padding: '8px 12px', borderRadius: S.control, cursor: 'pointer' }}>
          <Calendar size={13} /> Book a call
        </button>
      </motion.div>
    </motion.div>
  );
};
