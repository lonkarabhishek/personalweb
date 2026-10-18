import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Bot, Check, Mail, Minus, Plus, Sparkles } from 'lucide-react';
import { T, F, SPRING_PRESS, SPRING_SOFT, Reveal } from './StudioPage';

/* ═══════════════════════════════════════════════════════════════════════════════
   PRICING — studio.workwithabhi.online/pricing
   The page we send to businesses after building their site. Premium
   shadcn-style: clean rounded cards, soft shadows, subtle motion. Studio
   typography and the single blue accent keep it on-brand.
   ═══════════════════════════════════════════════════════════════════════════════ */
const BRAND = 'Web Design Studio';
const EMAIL = 'abhisheksoffice11@gmail.com';
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Website plan')}&body=${encodeURIComponent('Hi Abhishek,\n\nWe got the website you built for us. We want to go with the ______ plan.\n\nBusiness name:\nPhone / WhatsApp:\n')}`;
const WHATSAPP = 'https://wa.me/919403612979?text=Hi%20Abhishek%2C%20we%20got%20the%20website%20you%20built%20for%20us.%20We%27d%20like%20to%20go%20ahead%20with%20a%20plan.';

// shadcn-ish surface tokens on top of the studio palette
const C = {
  card: '#ffffff',
  border: '#e4e4e7',
  ring: 'rgba(31,58,255,0.35)',
  radius: 18,
  shadow: '0 1px 2px rgba(16,16,12,0.04), 0 10px 30px rgba(16,16,12,0.06)',
  shadowHover: '0 2px 4px rgba(16,16,12,0.05), 0 22px 48px rgba(16,16,12,0.10)',
  shadowFeatured: '0 0 0 1px rgba(31,58,255,0.45), 0 2px 4px rgba(31,58,255,0.08), 0 24px 56px rgba(31,58,255,0.16)',
};

type Tier = {
  key: string;
  name: string;
  price: string;
  was?: string;          // strikethrough old price
  per: string;
  tagline: string;
  features: string[];
  cta: string;
  href?: string;         // mailto for paid plans
  flag?: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    key: 'free', name: 'Free', price: '0', per: 'already yours',
    tagline: 'The website we already built for you.',
    features: ['Live on our shareable link', `Small "Made by ${BRAND}" badge`],
    cta: "You're here",
  },
  {
    key: 'starter', name: 'Starter', price: '999', per: 'one-time',
    tagline: 'Love the site but want tweaks?',
    features: ['3 rounds of edits to your current website', 'Text, photos, colours and sections'],
    cta: 'Get edits', href: MAILTO,
  },
  {
    key: 'growth', name: 'Growth', price: '1,999', was: '5,999', per: 'one-time', flag: 'Most popular', featured: true,
    tagline: 'Get found, get calls, get customers.',
    features: [
      'Show up on Google Search & Maps',
      'Your own domain (yourbusiness.in) for year 1',
      'WhatsApp button that turns visitors into chats',
      'No badge',
      'Edits till it feels yours',
    ],
    cta: 'Start with Growth', href: MAILTO,
  },
  {
    key: 'pro', name: 'Pro', price: '9,999', was: '19,999', per: 'one-time',
    tagline: 'Everything in Growth, plus a real brand.',
    features: [
      'Everything in Growth',
      'Custom brand identity: logo, colours, fonts',
      'Online booking or ordering',
      '1 year of updates & priority support',
      'Counter QR standee',
    ],
    cta: 'Go Pro', href: MAILTO,
  },
];

const SIGNATURE: Tier = {
  key: 'signature', name: 'Signature', price: '99,999', per: 'invite only', flag: 'Invite only',
  tagline: 'Your business, run by AI.',
  features: [
    '24/7 AI agents that answer queries, take bookings or orders, and follow up leads on WhatsApp & your site',
    'Custom web app with online payments',
    '3 months of social media management (AI-assisted, 12 posts a month)',
    '1 year of monthly SEO, Google Business updates & priority support',
  ],
  cta: 'Request an invite', href: `mailto:${EMAIL}?subject=${encodeURIComponent('Signature plan: request an invite')}`,
};

const ALL = [...TIERS, SIGNATURE];

// Comparison rows: one value per tier (true = included, false = not, string = detail).
type Cell = boolean | string;
const COMPARE: { label: string; cells: Cell[] }[] = [
  { label: 'Website live on a shareable link', cells: [true, true, true, true, true] },
  { label: `"Made by ${BRAND}" badge`, cells: ['Shown', 'Shown', 'Removed', 'Removed', 'Removed'] },
  { label: 'Edits', cells: [false, '3 rounds', 'Till it feels yours', '1 year of updates', '1 year of updates'] },
  { label: 'Google Search & Maps', cells: [false, false, true, true, 'Plus monthly updates for 1 year'] },
  { label: 'Your own domain (year 1)', cells: [false, false, true, true, true] },
  { label: 'WhatsApp button', cells: [false, false, true, true, 'AI agent on WhatsApp, 24/7'] },
  { label: 'Custom brand identity', cells: [false, false, false, 'Logo, colours, fonts', 'Logo, colours, fonts'] },
  { label: 'Online booking or ordering', cells: [false, false, false, true, 'Custom web app with payments'] },
  { label: 'Counter QR standee', cells: [false, false, false, true, true] },
  { label: 'AI agents: queries, bookings, lead follow-up', cells: [false, false, false, false, true] },
  { label: 'Social media management', cells: [false, false, false, false, '3 months, 12 posts a month'] },
  { label: 'Priority support', cells: [false, false, false, '1 year', '1 year'] },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'What happens with the domain after year 1?',
    a: 'Growth and above include your own domain for the first year. After that, you renew it at cost: the registrar\'s price, no markup from us. The domain is registered in your business\'s name, so it is always yours.',
  },
  {
    q: 'How do we start?',
    a: 'Reply to the email you received from us, or message us on WhatsApp, with the plan you want. We confirm, send a payment link, and ask for the few details we need (domain name, business hours, photos, menu or services). Then we get going.',
  },
  {
    q: 'How long does it take?',
    a: 'Your site is already live. Starter edits are done within 2 to 3 working days. Growth is live within a week of payment, including the domain and Google setup. Pro takes 1 to 2 weeks because of the brand work. Signature is scoped on a call and planned with you.',
  },
  {
    q: 'How do we pay?',
    a: 'UPI, bank transfer, or card through a payment link. Starter, Growth and Pro are one-time payments. Signature is scoped on a call and invoiced in milestones.',
  },
];

const mono: React.CSSProperties = { fontFamily: F.mono, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' };

// Indian Rupee. The display and mono fonts don't carry the ₹ glyph reliably, so
// the symbol is always set in Inter (which does).
const Rupees: React.FC<{ amount: string; size?: string; weight?: number }> = ({ amount, size = '0.78em', weight = 700 }) => (
  <span style={{ whiteSpace: 'nowrap' }}>
    <span style={{ fontFamily: F.sans, fontWeight: weight, fontSize: size, letterSpacing: 0, marginRight: '0.05em' }}>₹</span>{amount}
  </span>
);

/* ── Price block: strikethrough old price + current ─────────────────────────── */
const Price: React.FC<{ t: Tier; dark?: boolean }> = ({ t, dark }) => {
  const color = dark ? '#fff' : t.featured ? T.accent : T.text;
  const wasColor = dark ? 'rgba(255,255,255,0.45)' : T.faint;
  return (
    <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
      <div style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(2.1rem, 2.6vw, 2.7rem)', letterSpacing: '-0.04em', lineHeight: 1, color }}>
        <Rupees amount={t.price} />
      </div>
      {t.was && (
        <div className="pb-1" style={{ fontFamily: F.display, fontWeight: 500, fontSize: '1.15rem', color: wasColor, textDecoration: 'line-through', textDecorationThickness: '2px', letterSpacing: '-0.02em' }}>
          <Rupees amount={t.was} size="0.85em" weight={500} />
        </div>
      )}
      <div className="w-full" style={{ ...mono, color: dark ? 'rgba(255,255,255,0.55)' : T.muted, fontSize: '10.5px' }}>{t.per}</div>
    </div>
  );
};

/* ── CTA button ──────────────────────────────────────────────────────────────── */
const Cta: React.FC<{ t: Tier; dark?: boolean }> = ({ t, dark }) => {
  const reduce = useReducedMotion();
  const idle = !t.href;
  const style: React.CSSProperties = {
    fontFamily: F.sans, fontSize: '14px', fontWeight: 600, padding: '12px 16px', borderRadius: 10, textDecoration: 'none',
    background: idle ? 'transparent' : dark ? '#fff' : t.featured ? T.accent : T.text,
    color: idle ? T.muted : dark ? T.text : '#fff',
    border: `1px solid ${idle ? C.border : 'transparent'}`,
    boxShadow: idle ? 'none' : '0 1px 2px rgba(0,0,0,0.08)',
    cursor: idle ? 'default' : 'pointer',
  };
  if (idle) return <div className="mt-6 w-full flex items-center justify-center" style={style}>{t.cta}</div>;
  return (
    <motion.a href={t.href} className="mt-6 w-full flex items-center justify-center gap-2"
      whileHover={reduce ? undefined : { y: -1 }} whileTap={reduce ? undefined : { scale: 0.98 }} transition={SPRING_PRESS} style={style}>
      {t.cta} <ArrowRight size={15} />
    </motion.a>
  );
};

/* ── Feature row ─────────────────────────────────────────────────────────────── */
const Feature: React.FC<{ text: string; dark?: boolean; accent?: boolean }> = ({ text, dark, accent }) => (
  <li className="flex items-start gap-2.5" style={{ fontFamily: F.sans, fontSize: '13.5px', lineHeight: 1.5, color: dark ? 'rgba(255,255,255,0.88)' : T.text }}>
    <span className="flex items-center justify-center shrink-0 rounded-full" style={{ width: 18, height: 18, marginTop: 2, background: dark ? 'rgba(255,255,255,0.14)' : accent ? 'rgba(31,58,255,0.10)' : 'rgba(22,22,19,0.06)', color: dark ? '#fff' : accent ? T.accent : T.text }}>
      <Check size={11} strokeWidth={3} />
    </span>
    <span>{text}</span>
  </li>
);

/* ── Tier card ───────────────────────────────────────────────────────────────── */
const TierCard: React.FC<{ t: Tier; i: number }> = ({ t, i }) => {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={0.06 + i * 0.06} y={18} className="h-full">
      <motion.div
        className="h-full flex flex-col relative"
        onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)}
        animate={reduce ? undefined : { y: hover ? -4 : 0 }} transition={SPRING_SOFT}
        style={{
          background: C.card, borderRadius: C.radius, padding: 'clamp(20px, 2vw, 26px)',
          border: `1px solid ${t.featured ? 'transparent' : C.border}`,
          boxShadow: t.featured ? C.shadowFeatured : hover ? C.shadowHover : C.shadow,
          transition: 'box-shadow 0.35s ease',
        }}>
        {t.flag && (
          <span className="absolute inline-flex items-center gap-1.5 rounded-full" style={{
            ...mono, fontSize: '10px', top: -12, left: 20, padding: '5px 10px', background: T.accent, color: '#fff', boxShadow: '0 4px 14px rgba(31,58,255,0.35)',
          }}><Sparkles size={10} /> {t.flag}</span>
        )}
        <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: '1.2rem', letterSpacing: '-0.02em', color: t.featured ? T.accent : T.text }}>{t.name}</div>
        <p className="mt-1.5" style={{ fontFamily: F.sans, fontSize: '13.5px', color: T.muted, lineHeight: 1.5, minHeight: '2.6em' }}>{t.tagline}</p>
        <div className="mt-4"><Price t={t} /></div>
        <div className="my-5" style={{ height: 1, background: C.border }} />
        <ul className="flex flex-col gap-2.5 flex-1">
          {t.features.map((f) => <Feature key={f} text={f} accent={t.featured} />)}
        </ul>
        <Cta t={t} />
      </motion.div>
    </Reveal>
  );
};

/* ── Signature: wide dark premium card ───────────────────────────────────────── */
const SignatureCard: React.FC = () => {
  const reduce = useReducedMotion();
  const t = SIGNATURE;
  return (
    <Reveal delay={0.3} y={20}>
      <motion.div
        className="relative overflow-hidden"
        whileHover={reduce ? undefined : { y: -3 }} transition={SPRING_SOFT}
        style={{
          borderRadius: C.radius, color: '#fff',
          background: 'linear-gradient(135deg, #0f0f0d 0%, #15151c 55%, #0f1230 100%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2), 0 28px 70px rgba(10,10,30,0.35)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
        {/* glow */}
        <div aria-hidden className="absolute pointer-events-none" style={{ right: -120, top: -140, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(31,58,255,0.45), rgba(31,58,255,0))' }} />
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" style={{ padding: 'clamp(24px, 3vw, 40px)' }}>
          <div className="lg:col-span-5 flex flex-col">
            <span className="inline-flex items-center gap-1.5 rounded-full self-start" style={{ ...mono, fontSize: '10px', padding: '5px 10px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.14)' }}>
              <Bot size={11} /> {t.flag}
            </span>
            <div className="mt-5" style={{ fontFamily: F.display, fontWeight: 600, fontSize: '1.6rem', letterSpacing: '-0.025em' }}>{t.name}</div>
            <p className="mt-2" style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {t.tagline}
            </p>
            <div className="mt-6"><Price t={t} dark /></div>
            <div className="mt-auto pt-8" style={{ maxWidth: 360 }}>
              <Cta t={t} dark />
            </div>
          </div>
          <div className="lg:col-span-7 lg:pt-1">
            <div style={{ ...mono, color: 'rgba(255,255,255,0.5)' }}>Everything in Pro, plus</div>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-3 rounded-xl" style={{ padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: F.sans, fontSize: '14px', lineHeight: 1.5, color: 'rgba(255,255,255,0.9)' }}>
                  <span className="flex items-center justify-center shrink-0 rounded-full" style={{ width: 20, height: 20, marginTop: 1, background: T.accent, color: '#fff' }}><Check size={12} strokeWidth={3} /></span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
};

/* ── Comparison cell ─────────────────────────────────────────────────────────── */
const CellView: React.FC<{ v: Cell; featured?: boolean }> = ({ v, featured }) => {
  if (v === true) return <span className="inline-flex items-center justify-center rounded-full" style={{ width: 20, height: 20, background: featured ? 'rgba(31,58,255,0.12)' : 'rgba(22,22,19,0.06)', color: featured ? T.accent : T.text }}><Check size={12} strokeWidth={3} aria-label="Included" /></span>;
  if (v === false) return <Minus size={14} style={{ color: '#c4c4c0' }} aria-label="Not included" />;
  return <span style={{ fontFamily: F.sans, fontSize: '13px', color: featured ? T.text : T.muted, lineHeight: 1.4 }}>{v}</span>;
};

/* ── FAQ item ────────────────────────────────────────────────────────────────── */
const FaqItem: React.FC<{ q: string; a: string; open: boolean; onToggle: () => void }> = ({ q, a, open, onToggle }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, boxShadow: open ? C.shadow : 'none', transition: 'box-shadow 0.3s ease' }}>
    <button onClick={onToggle} aria-expanded={open} className="w-full flex items-center justify-between gap-5 text-left"
      style={{ padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', color: T.text }}>
      <span style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', letterSpacing: '-0.01em' }}>{q}</span>
      <motion.span animate={{ rotate: open ? 45 : 0 }} transition={SPRING_PRESS} className="shrink-0 inline-flex items-center justify-center rounded-full" style={{ width: 28, height: 28, background: open ? T.accent : 'rgba(22,22,19,0.06)', color: open ? '#fff' : T.text }}>
        <Plus size={15} />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
          <p style={{ padding: '0 20px 20px', fontFamily: F.sans, fontSize: '14.5px', color: T.muted, lineHeight: 1.65, maxWidth: '64ch' }}>{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */
export const StudioPricingPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => { document.title = `Pricing · ${BRAND}`; window.scrollTo(0, 0); }, []);

  const pad = 'clamp(16px, 4vw, 40px)';
  const h2: React.CSSProperties = { fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', lineHeight: 1.02, letterSpacing: '-0.035em' };

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: '100vh', fontFamily: F.sans, overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Space+Mono:wght@400;700&display=swap');
        #pricing-root ::selection { background: rgba(31,58,255,0.18); }
        #pricing-root * { min-width: 0; }
        .pricing-scroll { -webkit-overflow-scrolling: touch; scrollbar-width: thin; }
      `}</style>

      <div id="pricing-root">
        {/* nav */}
        <header className="sticky top-0 z-40 flex items-center justify-between" style={{ padding: `14px ${pad}`, background: 'rgba(237,236,232,0.85)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${T.line}` }}>
          <a href="/" className="flex items-center gap-2.5 min-w-0" style={{ textDecoration: 'none', color: T.text }}>
            <span className="w-8 h-8 shrink-0 flex items-center justify-center rounded-lg" style={{ background: T.text, color: '#fff', fontFamily: F.display, fontWeight: 700, fontSize: 12 }}>AL</span>
            <span className="truncate" style={{ fontFamily: F.mono, fontSize: '13px' }}>{BRAND}</span>
          </a>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <a href="/" className="hidden sm:inline" style={{ ...mono, color: T.muted, textDecoration: 'none' }}>Our work ↗</a>
            <motion.a href={MAILTO} whileTap={{ scale: 0.97 }} transition={SPRING_PRESS}
              className="inline-flex items-center gap-2 rounded-lg"
              style={{ fontFamily: F.sans, fontSize: '13.5px', fontWeight: 600, background: T.text, color: '#fff', padding: '9px 14px', textDecoration: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              <Mail size={14} /> Email us
            </motion.a>
          </div>
        </header>

        {/* hero */}
        <section style={{ padding: `clamp(56px, 9vw, 120px) ${pad} clamp(36px, 5vw, 56px)` }}>
          <div className="max-w-[1400px] mx-auto">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full" style={{ ...mono, color: T.accent, padding: '6px 12px', background: 'rgba(31,58,255,0.08)', border: '1px solid rgba(31,58,255,0.18)' }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: T.accent }} /> Pricing
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6" style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(2.2rem, 6vw, 5.6rem)', lineHeight: 1, letterSpacing: '-0.04em', maxWidth: '15ch', overflowWrap: 'anywhere' }}>
                Your website is already built. Pick how far you want to take it<span style={{ color: T.accent }}>.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6" style={{ fontFamily: F.sans, fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', color: T.muted, lineHeight: 1.55, maxWidth: '46ch' }}>
                Agencies charge lakhs. We use AI to build fast and keep it fair.
              </p>
            </Reveal>
          </div>
        </section>

        {/* tiers */}
        <section style={{ padding: `12px ${pad} clamp(56px, 7vw, 100px)` }}>
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch pt-3">
              {TIERS.map((t, i) => <TierCard key={t.key} t={t} i={i} />)}
            </div>
            <div className="mt-5"><SignatureCard /></div>
            <Reveal delay={0.3}>
              <p className="mt-5" style={{ ...mono, color: T.faint, fontSize: '10.5px', lineHeight: 1.8 }}>All prices in Indian Rupees · Starter, Growth and Pro are one-time · Domain renewals at cost</p>
            </Reveal>
          </div>
        </section>

        {/* comparison */}
        <section style={{ padding: `0 ${pad} clamp(56px, 7vw, 100px)` }}>
          <div className="max-w-[1400px] mx-auto">
            <Reveal><h2 style={h2}>Side by side<span style={{ color: T.accent }}>.</span></h2></Reveal>
            <Reveal delay={0.08}>
              <p className="mt-3 md:hidden" style={{ ...mono, color: T.faint, fontSize: '10.5px' }}>Swipe to compare →</p>
              <div className="mt-4 md:mt-10 pricing-scroll overflow-x-auto" style={{ border: `1px solid ${C.border}`, background: C.card, borderRadius: 16, boxShadow: C.shadow }}>
                <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: 0, minWidth: 880 }}>
                  <thead>
                    <tr>
                      <th className="text-left sticky left-0" style={{ padding: '16px 18px', ...mono, color: T.muted, fontWeight: 400, width: '28%', background: C.card, borderBottom: `1px solid ${C.border}`, zIndex: 1 }}>What you get</th>
                      {ALL.map((t) => (
                        <th key={t.key} className="text-left" style={{ padding: '16px 18px', background: t.featured ? 'rgba(31,58,255,0.05)' : undefined, borderBottom: `1px solid ${C.border}` }}>
                          <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: '1rem', letterSpacing: '-0.01em', color: t.featured ? T.accent : T.text }}>{t.name}</div>
                          <div className="flex items-baseline gap-2" style={{ ...mono, color: T.muted, marginTop: 3, fontSize: '10.5px' }}>
                            <Rupees amount={t.price} size="1em" weight={500} />
                            {t.was && <span style={{ textDecoration: 'line-through', color: T.faint }}><Rupees amount={t.was} size="1em" weight={500} /></span>}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE.map((row, r) => {
                      const last = r === COMPARE.length - 1;
                      return (
                        <tr key={row.label}>
                          <td className="sticky left-0" style={{ padding: '14px 18px', fontFamily: F.sans, fontSize: '14px', color: T.text, verticalAlign: 'top', background: C.card, borderBottom: last ? 'none' : `1px solid ${C.border}`, zIndex: 1, boxShadow: '1px 0 0 rgba(228,228,231,0.9)' }}>{row.label}</td>
                          {row.cells.map((c, ci) => (
                            <td key={ci} style={{ padding: '14px 18px', verticalAlign: 'top', background: ALL[ci].featured ? 'rgba(31,58,255,0.05)' : undefined, borderBottom: last ? 'none' : `1px solid ${C.border}` }}>
                              <CellView v={c} featured={ALL[ci].featured} />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* faq */}
        <section style={{ padding: `0 ${pad} clamp(56px, 7vw, 100px)` }}>
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
            <div className="md:col-span-4">
              <Reveal><h2 style={h2}>Questions<span style={{ color: T.accent }}>.</span></h2></Reveal>
              <Reveal delay={0.08}>
                <p className="mt-3" style={{ fontFamily: F.sans, fontSize: '15px', color: T.muted, lineHeight: 1.6, maxWidth: '32ch' }}>
                  Anything else, just email us. We reply the same day.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8 flex flex-col gap-3">
              {FAQ.map((f, i) => (
                <Reveal key={f.q} delay={0.06 + i * 0.05} y={14}>
                  <FaqItem q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* cta */}
        <section style={{ padding: `0 ${pad} clamp(56px, 7vw, 100px)` }}>
          <Reveal>
            <div className="max-w-[1400px] mx-auto relative overflow-hidden" style={{ background: T.dark, color: T.onDark, borderRadius: 24, padding: `clamp(36px, 6vw, 80px) clamp(24px, 5vw, 72px)`, boxShadow: '0 28px 70px rgba(10,10,30,0.3)' }}>
              <div aria-hidden className="absolute pointer-events-none" style={{ left: -160, bottom: -200, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(31,58,255,0.35), rgba(31,58,255,0))' }} />
              <div className="relative">
                <span style={{ ...mono, color: T.onDarkMuted }}>Ready?</span>
                <h2 className="mt-4" style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(1.9rem, 5vw, 4.4rem)', lineHeight: 1, letterSpacing: '-0.04em', maxWidth: '16ch' }}>
                  Email us the plan. We'll handle the rest<span style={{ color: T.accent }}>.</span>
                </h2>
                <p className="mt-4" style={{ fontFamily: F.sans, fontSize: '15px', color: T.onDarkMuted, lineHeight: 1.6, maxWidth: '48ch' }}>
                  One line is enough: your business name and the plan you want. We reply the same day with next steps.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <motion.a href={MAILTO} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} transition={SPRING_PRESS}
                    className="inline-flex items-center justify-center gap-2 rounded-xl"
                    style={{ fontFamily: F.sans, fontSize: '15px', fontWeight: 600, background: T.accent, color: '#fff', padding: '15px 22px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(31,58,255,0.35)' }}>
                    <Mail size={16} /> {EMAIL}
                  </motion.a>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl"
                    style={{ fontFamily: F.sans, fontSize: '15px', color: T.onDark, border: `1px solid ${T.lineDark}`, padding: '15px 22px', textDecoration: 'none' }}>
                    WhatsApp instead <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* footer */}
        <footer style={{ padding: `0 ${pad} 36px` }}>
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderTop: `1px solid ${T.line}`, paddingTop: 20 }}>
            <span style={{ fontFamily: F.sans, fontSize: '13.5px', color: T.text }}>
              Abhishek Lonkar <span style={{ color: T.faint }}>·</span> Founder <span style={{ color: T.faint }}>·</span> {BRAND}
            </span>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <a href={`mailto:${EMAIL}`} style={{ ...mono, color: T.muted, textDecoration: 'none', fontSize: '10.5px' }}>{EMAIL}</a>
              <a href="/" style={{ ...mono, color: T.muted, textDecoration: 'none', fontSize: '10.5px' }}>studio.workwithabhi.online ↗</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
