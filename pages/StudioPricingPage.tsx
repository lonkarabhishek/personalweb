import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, Minus, Plus } from 'lucide-react';
import { T, F, SPRING_PRESS, SPRING_SOFT, Reveal, Magnetic, BookingModal } from './StudioPage';

/* ═══════════════════════════════════════════════════════════════════════════════
   STUDIO PRICING — studio.workwithabhi.online/pricing
   The page we send to businesses after building their site. Same design
   language as the studio (sharp, mono labels, one electric-blue accent).
   ═══════════════════════════════════════════════════════════════════════════════ */
const EMAIL = 'abhisheksoffice11@gmail.com';
const WHATSAPP = 'https://wa.me/919403612979?text=Hi%20Abhishek%2C%20I%20got%20the%20website%20you%20built%20for%20us.%20I%27d%20like%20to%20talk%20about%20the%20plans.';

type Tier = {
  key: string;
  n: string;
  name: string;
  price: string;
  per: string;
  tagline: string;
  features: string[];
  cta: string;
  flag?: string;        // "Most popular" / "Invite only"
  featured?: boolean;   // the highlighted card
  dark?: boolean;       // the dark, invite-only card
};

const TIERS: Tier[] = [
  {
    key: 'free', n: '01', name: 'Free', price: '₹0', per: 'already yours',
    tagline: 'The website we already built for you.',
    features: [
      'Live on our shareable link',
      'Small "Made by Abhishek Lonkar Studio" badge',
      'No edits and no Google setup',
    ],
    cta: 'This is your current site',
  },
  {
    key: 'growth', n: '02', name: 'Growth', price: '₹1,999', per: 'one-time', flag: 'Most popular', featured: true,
    tagline: 'Make it yours and get found on Google.',
    features: [
      'Badge removed',
      'Your own domain, included for year 1 (renewal at cost after that)',
      'Full SEO and Google Business Profile setup',
      'WhatsApp chat button and contact form',
      'Extra pages: menu, gallery, booking',
      '2 rounds of edits',
    ],
    cta: 'Start with Growth',
  },
  {
    key: 'pro', n: '03', name: 'Pro', price: '₹9,999', per: 'one-time',
    tagline: 'A proper brand, bookings, and a year of support.',
    features: [
      'Everything in Growth',
      'Custom brand identity: logo, colours, fonts',
      'Online booking or ordering',
      'Updates and priority support for 1 year',
      'Counter QR standee',
    ],
    cta: 'Go Pro',
  },
  {
    key: 'signature', n: '04', name: 'Signature', price: '₹99,999', per: 'scoped with you', flag: 'Invite only', dark: true,
    tagline: 'A custom web app and a team behind it.',
    features: [
      'Everything in Pro',
      'Custom web app with online ordering or booking and payments',
      'Social media management for 3 months on Instagram and Facebook: content calendar, 12 posts a month, profile setup',
      'WhatsApp auto-reply setup',
      'Monthly SEO and Google Business updates for 1 year',
      'Priority support for 1 year, plus a featured case study',
    ],
    cta: 'Request an invite',
  },
];

// Comparison rows: a value per tier (true = included, false = not, string = detail).
type Cell = boolean | string;
const COMPARE: { label: string; cells: [Cell, Cell, Cell, Cell] }[] = [
  { label: 'Website live on a shareable link', cells: [true, true, true, true] },
  { label: 'Studio badge', cells: ['Shown', 'Removed', 'Removed', 'Removed'] },
  { label: 'Your own domain', cells: [false, 'Year 1 included', 'Year 1 included', 'Year 1 included'] },
  { label: 'SEO and Google Business Profile', cells: [false, 'Full setup', 'Full setup', 'Setup + monthly updates for 1 year'] },
  { label: 'WhatsApp chat button and contact form', cells: [false, true, true, 'Plus WhatsApp auto-reply'] },
  { label: 'Extra pages (menu, gallery, booking)', cells: [false, true, true, true] },
  { label: 'Edits and updates', cells: [false, '2 rounds', 'Updates for 1 year', 'Updates for 1 year'] },
  { label: 'Custom brand identity', cells: [false, false, 'Logo, colours, fonts', 'Logo, colours, fonts'] },
  { label: 'Online booking or ordering', cells: [false, false, true, 'Custom web app with payments'] },
  { label: 'Counter QR standee', cells: [false, false, true, true] },
  { label: 'Social media management', cells: [false, false, false, '3 months, 12 posts a month'] },
  { label: 'Support', cells: [false, false, 'Priority, 1 year', 'Priority, 1 year'] },
  { label: 'Featured case study', cells: [false, false, false, true] },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'What happens with the domain after year 1?',
    a: 'Growth and above include your own domain for the first year. After that you renew it at the registrar\'s cost price, which we pass on with no markup. The domain is registered in your name, so it is always yours.',
  },
  {
    q: 'How do we start?',
    a: 'Reply to the email you received from us, or message us on WhatsApp, with the plan you want. We send a payment link and a short form for your details (domain name, business hours, photos, menu or services). That is it; we take it from there.',
  },
  {
    q: 'How long does it take?',
    a: 'Your site is already live. Growth upgrades usually go live within 2 to 4 working days of payment. Pro takes 1 to 2 weeks because of the brand work. Signature is scoped on a call and planned with you.',
  },
  {
    q: 'How do we pay?',
    a: 'UPI, bank transfer, or card through a payment link. Growth and Pro are one-time payments. Signature is scoped on a call and invoiced in milestones.',
  },
  {
    q: 'Can we upgrade later?',
    a: 'Yes. Start with Growth and move to Pro whenever you want; you pay only the difference.',
  },
];

const mono: React.CSSProperties = { fontFamily: F.mono, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' };

/* ── Tier card ───────────────────────────────────────────────────────────────── */
const TierCard: React.FC<{ t: Tier; i: number; onPick: () => void }> = ({ t, i, onPick }) => {
  const bg = t.dark ? T.dark : '#fff';
  const fg = t.dark ? T.onDark : T.text;
  const muted = t.dark ? T.onDarkMuted : T.muted;
  const line = t.dark ? T.lineDark : T.line;
  const isFree = t.key === 'free';
  return (
    <Reveal delay={0.08 + i * 0.07} y={22} className="h-full">
      <motion.div
        className="h-full flex flex-col relative"
        whileHover={{ y: -4 }} transition={SPRING_SOFT}
        style={{
          background: bg, color: fg, padding: 'clamp(22px, 2.2vw, 30px)',
          border: `1px solid ${t.featured ? T.accent : line}`,
          boxShadow: t.featured ? `0 0 0 1px ${T.accent}, 0 24px 60px rgba(31,58,255,0.14)` : 'none',
        }}>
        {t.flag && (
          <span className="absolute" style={{
            ...mono, top: -11, left: 'clamp(22px, 2.2vw, 30px)', padding: '4px 9px',
            background: t.dark ? '#fff' : T.accent, color: t.dark ? T.text : '#fff',
          }}>{t.flag}</span>
        )}
        <div className="flex items-baseline justify-between">
          <span style={{ ...mono, color: t.featured ? T.accent : muted }}>{t.n}</span>
          <span style={{ ...mono, color: muted }}>{t.per}</span>
        </div>
        <h3 className="mt-4" style={{ fontFamily: F.display, fontWeight: 600, fontSize: '1.5rem', letterSpacing: '-0.02em', lineHeight: 1 }}>{t.name}</h3>
        <div className="mt-3" style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(2.4rem, 3.2vw, 3rem)', letterSpacing: '-0.04em', lineHeight: 1, color: t.featured ? T.accent : fg }}>{t.price}</div>
        <p className="mt-3" style={{ fontFamily: F.sans, fontSize: '14px', color: muted, lineHeight: 1.55 }}>{t.tagline}</p>
        <div className="my-5" style={{ height: 1, background: line }} />
        <ul className="flex flex-col gap-2.5 flex-1">
          {t.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5" style={{ fontFamily: F.sans, fontSize: '13.5px', lineHeight: 1.5, color: fg }}>
              <Check size={15} strokeWidth={2.5} style={{ color: t.dark ? '#fff' : T.accent, flexShrink: 0, marginTop: 3 }} />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <motion.button
          onClick={isFree ? undefined : onPick}
          disabled={isFree}
          whileTap={isFree ? undefined : { scale: 0.98 }} transition={SPRING_PRESS}
          className="mt-6 w-full flex items-center justify-center gap-2"
          style={{
            fontFamily: F.sans, fontSize: '14px', fontWeight: 500, padding: '13px 16px', cursor: isFree ? 'default' : 'pointer',
            background: isFree ? 'transparent' : t.dark ? '#fff' : t.featured ? T.accent : T.text,
            color: isFree ? muted : t.dark ? T.text : '#fff',
            border: `1px solid ${isFree ? line : 'transparent'}`,
          }}>
          {t.cta}{!isFree && <ArrowRight size={15} />}
        </motion.button>
      </motion.div>
    </Reveal>
  );
};

/* ── Comparison cell ─────────────────────────────────────────────────────────── */
const CellView: React.FC<{ v: Cell; featured?: boolean }> = ({ v, featured }) => {
  if (v === true) return <Check size={16} strokeWidth={2.5} style={{ color: T.accent }} aria-label="Included" />;
  if (v === false) return <Minus size={14} style={{ color: T.faint }} aria-label="Not included" />;
  return <span style={{ fontFamily: F.sans, fontSize: '13px', color: featured ? T.text : T.muted, lineHeight: 1.4 }}>{v}</span>;
};

/* ── FAQ item ────────────────────────────────────────────────────────────────── */
const FaqItem: React.FC<{ q: string; a: string; open: boolean; onToggle: () => void }> = ({ q, a, open, onToggle }) => (
  <div style={{ borderBottom: `1px solid ${T.line}` }}>
    <button onClick={onToggle} className="w-full flex items-center justify-between gap-6 text-left py-5"
      style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.text }}>
      <span style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)', letterSpacing: '-0.01em' }}>{q}</span>
      <motion.span animate={{ rotate: open ? 45 : 0 }} transition={SPRING_PRESS} style={{ color: T.accent, flexShrink: 0 }}><Plus size={18} /></motion.span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: 'hidden' }}>
          <p className="pb-6" style={{ fontFamily: F.sans, fontSize: '15px', color: T.muted, lineHeight: 1.65, maxWidth: '64ch' }}>{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */
export const StudioPricingPage: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useEffect(() => { document.title = 'Pricing · Abhishek Lonkar Studio'; window.scrollTo(0, 0); }, []);

  const pad = 'clamp(20px, 4vw, 40px)';

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: '100vh', fontFamily: F.sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Space+Mono:wght@400;700&display=swap');
        #pricing-root ::selection { background: rgba(31,58,255,0.18); }
      `}</style>

      <div id="pricing-root">
        {/* nav */}
        <header className="flex items-center justify-between" style={{ padding: `18px ${pad}`, borderBottom: `1px solid ${T.line}` }}>
          <a href="/" className="flex items-center gap-3" style={{ textDecoration: 'none', color: T.text }}>
            <span className="w-9 h-9 flex items-center justify-center" style={{ background: T.text, color: '#fff', fontFamily: F.display, fontWeight: 700, fontSize: 13 }}>AL</span>
            <span style={{ fontFamily: F.mono, fontSize: '13px' }}>Abhishek Lonkar Studio</span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/" className="hidden sm:inline" style={{ ...mono, color: T.muted, textDecoration: 'none' }}>See our work ↗</a>
            <Magnetic strength={0.2}>
              <motion.button onClick={() => setShowBooking(true)} whileTap={{ scale: 0.97 }} transition={SPRING_PRESS}
                style={{ fontFamily: F.sans, fontSize: '14px', background: T.text, color: '#fff', border: 'none', padding: '11px 18px', cursor: 'pointer' }}>
                Let's talk
              </motion.button>
            </Magnetic>
          </div>
        </header>

        {/* hero */}
        <section style={{ padding: `clamp(64px, 9vw, 130px) ${pad} clamp(40px, 5vw, 64px)` }}>
          <div className="max-w-[1500px] mx-auto">
            <Reveal><span style={{ ...mono, color: T.accent }}>Pricing</span></Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-5" style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(2.6rem, 6.4vw, 6.2rem)', lineHeight: 0.98, letterSpacing: '-0.04em', maxWidth: '14ch' }}>
                Your website is already built. Pick how far you want to take it<span style={{ color: T.accent }}>.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-7" style={{ fontFamily: F.sans, fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)', color: T.muted, lineHeight: 1.5, maxWidth: '44ch' }}>
                Agencies charge lakhs. We use AI to build fast and keep it fair.
              </p>
            </Reveal>
          </div>
        </section>

        {/* tiers */}
        <section style={{ padding: `clamp(16px, 2vw, 24px) ${pad} clamp(64px, 8vw, 120px)` }}>
          <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 items-stretch pt-3">
            {TIERS.map((t, i) => <TierCard key={t.key} t={t} i={i} onPick={() => setShowBooking(true)} />)}
          </div>
          <Reveal delay={0.3}>
            <p className="max-w-[1500px] mx-auto mt-5" style={{ ...mono, color: T.faint }}>All prices in INR · Growth and Pro are one-time · Domain renewals at cost</p>
          </Reveal>
        </section>

        {/* comparison */}
        <section style={{ padding: `0 ${pad} clamp(64px, 8vw, 120px)` }}>
          <div className="max-w-[1500px] mx-auto">
            <Reveal>
              <h2 style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(2rem, 4.4vw, 3.6rem)', lineHeight: 1, letterSpacing: '-0.035em' }}>
                Side by side<span style={{ color: T.accent }}>.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 md:hidden" style={{ ...mono, color: T.faint }}>Swipe to compare →</p>
              <div className="mt-3 md:mt-12 overflow-x-auto" style={{ border: `1px solid ${T.line}`, background: '#fff' }}>
                <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: 760 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${T.line}` }}>
                      <th className="text-left" style={{ padding: '16px 18px', ...mono, color: T.muted, fontWeight: 400, width: '32%' }}>What you get</th>
                      {TIERS.map((t) => (
                        <th key={t.key} className="text-left" style={{ padding: '16px 18px', background: t.featured ? 'rgba(31,58,255,0.05)' : undefined }}>
                          <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: '1.05rem', letterSpacing: '-0.01em', color: t.featured ? T.accent : T.text }}>{t.name}</div>
                          <div style={{ ...mono, color: T.muted, marginTop: 3, fontSize: '10.5px' }}>{t.price}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE.map((row, r) => (
                      <tr key={row.label} style={{ borderBottom: r < COMPARE.length - 1 ? `1px solid ${T.line}` : 'none' }}>
                        <td style={{ padding: '14px 18px', fontFamily: F.sans, fontSize: '14px', color: T.text, verticalAlign: 'top' }}>{row.label}</td>
                        {row.cells.map((c, ci) => (
                          <td key={ci} style={{ padding: '14px 18px', verticalAlign: 'top', background: TIERS[ci].featured ? 'rgba(31,58,255,0.05)' : undefined }}>
                            <CellView v={c} featured={TIERS[ci].featured} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>

        {/* faq */}
        <section style={{ padding: `0 ${pad} clamp(64px, 8vw, 120px)` }}>
          <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <Reveal>
                <h2 style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(2rem, 4.4vw, 3.6rem)', lineHeight: 1, letterSpacing: '-0.035em' }}>
                  Questions<span style={{ color: T.accent }}>.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4" style={{ fontFamily: F.sans, fontSize: '15px', color: T.muted, lineHeight: 1.6, maxWidth: '32ch' }}>
                  Anything else, just ask. We reply the same day.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8" style={{ borderTop: `1px solid ${T.line}` }}>
              {FAQ.map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
            </div>
          </div>
        </section>

        {/* contact */}
        <section style={{ background: T.dark, color: T.onDark, padding: `clamp(64px, 9vw, 130px) ${pad}` }}>
          <div className="max-w-[1500px] mx-auto">
            <Reveal><span style={{ ...mono, color: T.onDarkMuted }}>Ready?</span></Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5" style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(2.4rem, 6vw, 5.6rem)', lineHeight: 0.98, letterSpacing: '-0.04em', maxWidth: '16ch' }}>
                Tell us the plan. We'll handle the rest<span style={{ color: T.accent }}>.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Magnetic strength={0.2}>
                  <motion.button onClick={() => setShowBooking(true)} whileTap={{ scale: 0.98 }} transition={SPRING_PRESS}
                    className="flex items-center justify-center gap-2"
                    style={{ fontFamily: F.sans, fontSize: '15px', fontWeight: 500, background: T.accent, color: '#fff', border: 'none', padding: '16px 24px', cursor: 'pointer' }}>
                    Book a free call <ArrowRight size={16} />
                  </motion.button>
                </Magnetic>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                  style={{ fontFamily: F.sans, fontSize: '15px', color: T.onDark, border: `1px solid ${T.lineDark}`, padding: '16px 24px', textDecoration: 'none' }}>
                  WhatsApp us <ArrowUpRight size={16} />
                </a>
                <a href={`mailto:${EMAIL}?subject=Website%20plan`}
                  className="flex items-center justify-center gap-2"
                  style={{ fontFamily: F.sans, fontSize: '15px', color: T.onDark, border: `1px solid ${T.lineDark}`, padding: '16px 24px', textDecoration: 'none' }}>
                  Email us <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>
            <div className="mt-16 flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderTop: `1px solid ${T.lineDark}`, paddingTop: 20 }}>
              <span style={{ ...mono, color: T.onDarkFaint }}>Abhishek Lonkar Studio · Pune, India · {new Date().getFullYear()}</span>
              <a href="/" style={{ ...mono, color: T.onDarkMuted, textDecoration: 'none' }}>studio.workwithabhi.online ↗</a>
            </div>
          </div>
        </section>
      </div>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
};
