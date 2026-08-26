import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Calendar, X } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
   Monochrome light + one electric accent. No cream, no burnt orange, no serif.
   ═══════════════════════════════════════════════════════════════════════════════ */
const T = {
  bg:      '#edece8',   // neutral light, not warm cream
  bgAlt:   '#e4e3de',
  dark:    '#0e0e0c',   // near-black for the single dark chapter
  text:    '#161613',
  muted:   '#6d6d67',
  faint:   '#9c9c95',
  accent:  '#1f3aff',   // electric blue, single locked accent
  onDark:  'rgba(255,255,255,0.92)',
  onDarkMuted: 'rgba(255,255,255,0.52)',
  onDarkFaint: 'rgba(255,255,255,0.30)',
  line:    'rgba(20,20,15,0.14)',
  lineDark:'rgba(255,255,255,0.14)',
};

const F = {
  display: "'Bricolage Grotesque', 'Space Grotesk', system-ui, sans-serif",
  sans:    "'Inter', system-ui, sans-serif",
  mono:    "'Space Mono', ui-monospace, 'SF Mono', monospace",
};

/* ═══════════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════════ */
const projects = [
  { n: '01', title: 'Haddu Clothing', kind: 'E-Commerce', year: '2026', tone: 'dark',
    link: 'https://www.hadduclothing.com/', domain: 'hadduclothing.com',
    desc: 'A full fashion store built from scratch. Catalog, payments, inventory, shipping, and a Pinterest engine doing 80k views a month.' },
  { n: '02', title: 'JSB Foods', kind: 'Brand Site', year: '2026', tone: 'accent',
    link: 'https://jsb-foods.vercel.app', domain: 'jsb-foods.com',
    desc: 'A clean, modern site for a food company. Product showcase, brand story, and trust built into every page.' },
  { n: '03', title: 'TapTurf', kind: 'Web App', year: '2026', tone: 'light',
    link: 'https://tapturf.in/', domain: 'tapturf.in',
    desc: 'A sports venue booking platform. Find a turf, pick a slot, book it. Fast and simple end to end.' },
  { n: '04', title: 'Deft Chemistry', kind: 'Brand Site', year: '2025', tone: 'accent',
    link: 'https://deft-chemistry-redefined.vercel.app', domain: 'deftchemistry.com',
    desc: 'An elegant web presence for a chemistry brand. Informative, credible, and built to convert.' },
  { n: '05', title: 'The Nashik Kumbh', kind: 'Multilingual', year: '2026', tone: 'dark',
    link: 'https://thenashikkumbh.com', domain: 'thenashikkumbh.com',
    desc: 'A trilingual site for Kumbh Mela 2027 in English, Hindi, and Marathi. Bathing dates, travel, and holy sites.' },
  { n: '06', title: 'SD Overseas', kind: 'Brand Site', year: '2025', tone: 'light',
    link: 'https://sd-overseas.vercel.app/', domain: 'sdoverseas.com',
    desc: 'A professional web presence for an international trading company. Built for global credibility.' },
];

const services = [
  {
    title: 'Web Development',
    desc: 'Custom sites and web apps that look right and work right. Nothing templated, everything built for the job.',
    tags: ['Landing Pages', 'Business Sites', 'Web Apps', 'Multilingual', 'Responsive'],
    tone: 'accent',
  },
  {
    title: 'E-Commerce',
    desc: 'Online stores ready to sell. Catalogs, payments, inventory, and shipping, wired end to end.',
    tags: ['Online Stores', 'Payments', 'Inventory', 'Shipping'],
    tone: 'light',
  },
  {
    title: 'Growth & Analytics',
    desc: 'Making your data useful. Pinterest, SEO, and dashboards that move the numbers that matter.',
    tags: ['Pinterest', 'SEO', 'Dashboards', 'Reporting'],
    tone: 'dark',
  },
];

const stats = [
  { value: '10+', label: 'Clients shipped' },
  { value: '80K', label: 'Pinterest views / mo' },
  { value: '100+', label: 'Dashboards built' },
  { value: '6+', label: 'Years building' },
];

const clients = [
  { name: 'G2', logo: '/logos/g2logo.jpg' },
  { name: 'Cognizant', logo: '/logos/cognizantlogo.jpeg' },
  { name: "Levi's", logo: '/logos/levislogo.png' },
  { name: 'Haddu', logo: '/logos/haddulogo.webp' },
  { name: 'Nurturing Green', logo: '/logos/nurturinggreenlogo.png' },
  { name: 'KIST', logo: '/logos/KIST_Logo.jpg' },
];

const testimonials = [
  { text: 'He took real ownership and became a trusted partner. Strong work ethic, genuine curiosity, and he lifted the whole team.',
    name: 'Syed Rahman', role: 'GTM Ops & Analytics, 6sense' },
  { text: 'He rebuilt our ARR waterfall reporting. It gave leadership visibility they never had and made forecasting far more reliable.',
    name: 'Mitch Osborne', role: 'Director of Business Systems, G2' },
];

/* ═══════════════════════════════════════════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════════════════════════════════════════ */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; y?: number; className?: string }> = ({ children, delay = 0, y = 28, className = '' }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}>
      {children}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   BOOKING MODAL
   ═══════════════════════════════════════════════════════════════════════════════ */
const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0" style={{ background: 'rgba(10,10,8,0.72)', backdropFilter: 'blur(10px)' }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 14 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl h-[80vh] overflow-hidden"
          style={{ background: '#fff' }}
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${T.line}` }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center" style={{ background: T.accent }}>
                <Calendar size={15} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontFamily: F.sans, fontSize: '15px', fontWeight: 600, color: T.text }}>Book a call</h3>
                <p style={{ fontFamily: F.sans, fontSize: '13px', color: T.muted }}>Pick a time that works for you</p>
              </div>
            </div>
            <button onClick={onClose} aria-label="Close"
              className="w-9 h-9 flex items-center justify-center"
              style={{ color: T.muted, background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={18} />
            </button>
          </div>
          <iframe src="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3eFH-K6IQk-3avWVjGYP3Q-vfQZlAe9I-fYLdOobcFweup66Evk9dST6B_7YCz4Rj0cKxys5_o"
            style={{ border: 0 }} width="100%" height="100%" title="Book a call" className="h-[calc(100%-65px)]" />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   WORK CARD (branded preview + always-visible detail)
   ═══════════════════════════════════════════════════════════════════════════════ */
const WorkCard: React.FC<{ p: typeof projects[0] }> = ({ p }) => {
  const [hover, setHover] = useState(false);
  const isAccent = p.tone === 'accent';
  const isDark = p.tone === 'dark';
  const panelBg = isAccent ? T.accent : isDark ? T.dark : T.bgAlt;
  const onPanel = isAccent || isDark ? '#fff' : T.text;
  const barBg = isAccent ? 'rgba(255,255,255,0.12)' : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(20,20,15,0.05)';
  const dot = isAccent || isDark ? 'rgba(255,255,255,0.4)' : 'rgba(20,20,15,0.22)';
  const urlColor = isAccent || isDark ? 'rgba(255,255,255,0.7)' : T.muted;

  return (
    <motion.a href={p.link} target="_blank" rel="noopener noreferrer"
      className="group block"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {/* Preview panel with browser chrome */}
      <div className="relative overflow-hidden" style={{ background: panelBg, aspectRatio: '16 / 10' }}>
        {/* browser bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center gap-2 px-4" style={{ height: '40px', background: barBg }}>
          <span style={{ width: 8, height: 8, borderRadius: 9999, background: dot }} />
          <span style={{ width: 8, height: 8, borderRadius: 9999, background: dot }} />
          <span style={{ width: 8, height: 8, borderRadius: 9999, background: dot }} />
          <span className="ml-2 truncate" style={{ fontFamily: F.mono, fontSize: '11px', color: urlColor }}>{p.domain}</span>
        </div>
        {/* wordmark */}
        <div className="absolute inset-0 flex items-center justify-center px-6" style={{ paddingTop: '40px' }}>
          <motion.span animate={{ scale: hover ? 1.04 : 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center" style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', letterSpacing: '-0.03em', lineHeight: 1.05, color: onPanel }}>
            {p.title}
          </motion.span>
        </div>
        {/* visit chip */}
        <motion.div className="absolute bottom-4 right-4 flex items-center gap-1.5"
          animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 6 }} transition={{ duration: 0.35 }}
          style={{ background: onPanel, color: panelBg, padding: '7px 12px', fontFamily: F.mono, fontSize: '11px' }}>
          Visit <ArrowUpRight size={13} />
        </motion.div>
      </div>
      {/* meta */}
      <div className="flex items-center justify-between mt-4" style={{ borderTop: `1px solid ${T.line}`, paddingTop: '14px' }}>
        <span style={{ fontFamily: F.mono, fontSize: '12px', letterSpacing: '0.02em', color: hover ? T.accent : T.muted, transition: 'color 0.3s' }}>
          {p.kind} · {p.year}
        </span>
        <motion.span animate={{ x: hover ? 3 : 0, y: hover ? -3 : 0 }} transition={{ duration: 0.35 }}
          style={{ color: hover ? T.accent : T.faint, transition: 'color 0.3s' }}>
          <ArrowUpRight size={18} />
        </motion.span>
      </div>
      <p className="mt-3" style={{ fontFamily: F.sans, fontSize: '14px', color: T.muted, lineHeight: 1.6 }}>
        {p.desc}
      </p>
    </motion.a>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SERVICE TILE
   ═══════════════════════════════════════════════════════════════════════════════ */
const ServiceTile: React.FC<{ s: typeof services[0]; className?: string }> = ({ s, className = '' }) => {
  const isAccent = s.tone === 'accent';
  const isDark = s.tone === 'dark';
  const bg = isAccent ? T.accent : isDark ? T.dark : T.bgAlt;
  const head = isAccent || isDark ? '#fff' : T.text;
  const body = isAccent ? 'rgba(255,255,255,0.82)' : isDark ? T.onDarkMuted : T.muted;
  const tagBorder = isAccent ? 'rgba(255,255,255,0.30)' : isDark ? T.lineDark : T.line;
  const tagText = isAccent ? 'rgba(255,255,255,0.9)' : isDark ? T.onDarkMuted : T.muted;
  return (
    <div className={`flex flex-col justify-between ${className}`}
      style={{ background: bg, padding: 'clamp(28px, 3vw, 44px)', minHeight: 'clamp(220px, 26vw, 320px)' }}>
      <h3 style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(1.5rem, 2.6vw, 2.3rem)', lineHeight: 1.05, letterSpacing: '-0.025em', color: head }}>
        {s.title}
      </h3>
      <div>
        <p className="mt-4 mb-6" style={{ fontFamily: F.sans, fontSize: '15px', lineHeight: 1.6, color: body, maxWidth: '38ch' }}>
          {s.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <span key={t} style={{
              fontFamily: F.mono, fontSize: '11px', letterSpacing: '0.02em',
              color: tagText, border: `1px solid ${tagBorder}`, padding: '5px 10px',
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   STUDIO PAGE
   ═══════════════════════════════════════════════════════════════════════════════ */
export const StudioPage: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

  useEffect(() => { document.title = 'Abhishek Lonkar Studio'; }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: '100vh', fontFamily: F.sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Space+Mono:wght@400;700&display=swap');
        @keyframes studioMarquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .studio-marquee { animation: studioMarquee 34s linear infinite; }
        #studio-root ::selection { background: rgba(31,58,255,0.18); }
        @media(prefers-reduced-motion:reduce){ .studio-marquee{ animation:none } }
      `}</style>

      <div id="studio-root">
        {/* Film grain */}
        <div aria-hidden style={{
          position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'none', opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }} />

        {/* ═══ NAV ═══ */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
          style={{ background: scrolled ? 'rgba(237,236,232,0.82)' : 'transparent', backdropFilter: scrolled ? 'blur(16px)' : 'none', borderBottom: scrolled ? `1px solid ${T.line}` : '1px solid transparent' }}>
          <div className="max-w-[1500px] mx-auto px-5 md:px-10 flex items-center justify-between" style={{ height: '68px' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2.5">
              <img src="/favicon.png" alt="Abhishek Lonkar" className="w-7 h-7 object-cover" />
              <span style={{ fontFamily: F.mono, fontSize: '13px', letterSpacing: '0.02em', color: T.text }}>Abhishek Lonkar</span>
            </a>
            <div className="flex items-center gap-2 md:gap-7">
              <div className="hidden md:flex items-center gap-7">
                {['Work', 'Services', 'About'].map((l) => (
                  <button key={l} onClick={() => scrollTo(l.toLowerCase())}
                    style={{ fontFamily: F.sans, fontSize: '14px', color: T.muted, background: 'none', border: 'none', cursor: 'pointer' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}>
                    {l}
                  </button>
                ))}
              </div>
              <button onClick={() => setShowBooking(true)}
                style={{ fontFamily: F.sans, fontSize: '13px', fontWeight: 500, color: '#fff', background: T.text, padding: '9px 18px', border: 'none', cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = T.accent)}
                onMouseLeave={(e) => (e.currentTarget.style.background = T.text)}>
                Let's talk
              </button>
            </div>
          </div>
        </motion.nav>

        {/* ═══ HERO ═══ */}
        <section className="relative flex items-center" style={{ minHeight: '100svh', padding: '96px clamp(20px, 4vw, 40px) 40px' }}>
          <div className="max-w-[1500px] mx-auto w-full">
            {/* availability: single real status indicator */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-2.5 mb-8 md:mb-10">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: T.accent }} />
              <span style={{ fontFamily: F.mono, fontSize: '12px', letterSpacing: '0.02em', color: T.muted }}>Available for new projects</span>
            </motion.div>

            {/* headline: max 2 lines, wide container */}
            <h1 className="max-w-[16ch] md:max-w-[20ch]" style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(2.6rem, 8.5vw, 8rem)', lineHeight: 0.98, letterSpacing: '-0.04em' }}>
              <span className="block overflow-hidden">
                <motion.span className="block" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                  Websites that
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span className="block" initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}>
                  grow the business<span style={{ color: T.accent }}>.</span>
                </motion.span>
              </span>
            </h1>

            <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
                style={{ fontFamily: F.sans, fontSize: 'clamp(16px, 1.3vw, 19px)', color: T.muted, lineHeight: 1.6, maxWidth: '46ch' }}>
                A small digital studio. We design, build, and grow websites and online stores for businesses that want to be taken seriously.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0 w-full sm:w-auto">
                <button onClick={() => setShowBooking(true)}
                  className="flex items-center justify-center gap-2.5 w-full sm:w-auto"
                  style={{ fontFamily: F.sans, fontSize: '15px', fontWeight: 500, color: '#fff', background: T.accent, padding: '16px 26px', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = T.text)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = T.accent)}>
                  Let's talk <ArrowRight size={17} />
                </button>
                <button onClick={() => scrollTo('work')}
                  className="flex items-center justify-center w-full sm:w-auto"
                  style={{ fontFamily: F.sans, fontSize: '15px', color: T.text, background: 'none', border: `1px solid ${T.line}`, padding: '16px 26px', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.text; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.line; }}>
                  See the work
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ LOGO MARQUEE (the one marquee) ═══ */}
        <div className="relative overflow-hidden py-6" style={{ borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
          <div className="flex" style={{ width: 'max-content' }}>
            <div className="flex items-center studio-marquee">
              {[...clients, ...clients].map((c, i) => (
                <div key={i} className="flex items-center gap-3 flex-shrink-0" style={{ paddingRight: '64px' }}>
                  <img src={c.logo} alt={c.name} className="w-7 h-7 object-contain" style={{ filter: 'grayscale(1)', opacity: 0.55 }} />
                  <span style={{ fontFamily: F.sans, fontSize: 'clamp(1.1rem, 1.6vw, 1.5rem)', fontWeight: 500, color: T.faint, whiteSpace: 'nowrap' }}>{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ WORK ═══ */}
        <section id="work" style={{ padding: 'clamp(64px, 8vw, 130px) clamp(20px, 4vw, 40px)', scrollMarginTop: '68px' }}>
          <div className="max-w-[1500px] mx-auto">
            <Reveal>
              <h2 className="mb-10 md:mb-14" style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1, letterSpacing: '-0.035em' }}>
                Selected work
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
              {projects.map((p) => (
                <Reveal key={p.n} y={24}><WorkCard p={p} /></Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ SERVICES (bento) ═══ */}
        <section id="services" style={{ padding: 'clamp(64px, 8vw, 130px) clamp(20px, 4vw, 40px)', borderTop: `1px solid ${T.line}`, scrollMarginTop: '68px' }}>
          <div className="max-w-[1500px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
              <Reveal>
                <h2 style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1, letterSpacing: '-0.035em' }}>
                  What I do
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p style={{ fontFamily: F.sans, fontSize: '15px', color: T.muted, lineHeight: 1.6, maxWidth: '40ch' }}>
                  You work with me directly, backed by a small team. No account managers, no tickets. You say what you need, we build it properly.
                </p>
              </Reveal>
            </div>

            <Reveal y={20}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3" style={{ gridAutoFlow: 'dense' }}>
                <ServiceTile s={services[0]} className="md:col-span-7 md:row-span-2" />
                <ServiceTile s={services[1]} className="md:col-span-5" />
                <ServiceTile s={services[2]} className="md:col-span-5" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ STATS + ABOUT ═══ */}
        <section id="about" style={{ padding: 'clamp(64px, 8vw, 130px) clamp(20px, 4vw, 40px)', borderTop: `1px solid ${T.line}`, scrollMarginTop: '68px' }}>
          <div className="max-w-[1500px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 pb-14 md:pb-20" style={{ borderBottom: `1px solid ${T.line}` }}>
              {stats.map((s, i) => (
                <Reveal key={i} delay={i * 0.06} y={18}>
                  <div>
                    <div style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</div>
                    <div className="mt-2" style={{ fontFamily: F.sans, fontSize: '13px', color: T.muted }}>{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-14 md:pt-20">
              <div className="md:col-span-5">
                <Reveal>
                  <h2 style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(2rem, 4vw, 3.4rem)', lineHeight: 1.02, letterSpacing: '-0.035em' }}>
                    Engineer first,<br />builder always.
                  </h2>
                </Reveal>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <Reveal delay={0.1}>
                  <p className="mb-5" style={{ fontFamily: F.sans, fontSize: '17px', lineHeight: 1.75, color: T.muted }}>
                    I started as an engineer, writing code and figuring out how systems connect. That taught me to think clearly and build things that actually work.
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <p className="mb-5" style={{ fontFamily: F.sans, fontSize: '17px', lineHeight: 1.75, color: T.muted }}>
                    Then I joined G2, one of the biggest software review platforms, where I went from crunching data to helping teams make better decisions. Building the right thing matters more than building fast.
                  </p>
                </Reveal>
                <Reveal delay={0.2}>
                  <p style={{ fontFamily: F.sans, fontSize: '17px', lineHeight: 1.75, color: T.text }}>
                    Today I do both. I build websites and stores for businesses, and I help teams make sense of their data. Make it work, keep it simple, earn the trust.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ DARK CHAPTER: testimonials + CTA + footer ═══ */}
        <section style={{ background: T.dark, color: T.onDark }}>
          <div className="max-w-[1500px] mx-auto px-5 md:px-10" style={{ paddingTop: 'clamp(64px, 8vw, 120px)', paddingBottom: 'clamp(48px, 5vw, 72px)' }}>
            {/* testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pb-16 md:pb-24" style={{ borderBottom: `1px solid ${T.lineDark}` }}>
              {testimonials.map((t, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <a href="https://www.linkedin.com/in/lonkarabhishek/details/recommendations/" target="_blank" rel="noopener noreferrer" className="block group">
                    <p style={{ fontFamily: F.display, fontWeight: 500, fontSize: 'clamp(1.3rem, 2vw, 1.9rem)', lineHeight: 1.4, letterSpacing: '-0.015em', color: T.onDark }}>
                      {t.text}
                    </p>
                    <div className="mt-7">
                      <span className="block" style={{ fontFamily: F.sans, fontSize: '14px', fontWeight: 500, color: T.onDark }}>{t.name}</span>
                      <span className="block mt-1" style={{ fontFamily: F.sans, fontSize: '14px', color: T.onDarkMuted }}>{t.role}</span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            {/* CTA */}
            <div className="py-16 md:py-28 text-center">
              <Reveal>
                <h2 style={{ fontFamily: F.display, fontWeight: 600, fontSize: 'clamp(2.6rem, 8vw, 7rem)', lineHeight: 0.98, letterSpacing: '-0.04em', color: T.onDark }}>
                  Have a project?
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <button onClick={() => setShowBooking(true)}
                  className="inline-flex items-center justify-center gap-2.5 mt-9 w-full sm:w-auto"
                  style={{ fontFamily: F.sans, fontSize: '16px', fontWeight: 500, color: '#fff', background: T.accent, padding: '17px 38px', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#fff', e.currentTarget.style.color = T.dark)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = T.accent, e.currentTarget.style.color = '#fff')}>
                  Let's talk <ArrowRight size={18} />
                </button>
              </Reveal>
            </div>

            {/* footer */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-10" style={{ borderTop: `1px solid ${T.lineDark}` }}>
              <div className="flex flex-wrap items-center gap-6">
                {[
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lonkarabhishek/' },
                  { label: 'Email', href: 'mailto:abhisheksoffice11@gmail.com' },
                  { label: 'WhatsApp', href: 'https://wa.me/919403612979?text=Hi%20Abhishek%2C%20I%20saw%20your%20studio%20site.%20Can%20we%20chat%3F' },
                ].map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: F.sans, fontSize: '14px', color: T.onDarkMuted }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = T.onDark)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = T.onDarkMuted)}>
                    {l.label}
                  </a>
                ))}
              </div>
              <span style={{ fontFamily: F.mono, fontSize: '12px', color: T.onDarkFaint }}>Pune, India · {new Date().getFullYear()}</span>
            </div>
          </div>

          {/* oversized wordmark */}
          <div className="overflow-hidden px-5 md:px-10 pb-6" style={{ maxWidth: '1500px', margin: '0 auto' }}>
            <div className="select-none pointer-events-none" style={{ fontFamily: F.display, fontWeight: 700, fontSize: 'clamp(4rem, 19vw, 17rem)', lineHeight: 0.82, letterSpacing: '-0.05em', color: 'rgba(255,255,255,0.055)', whiteSpace: 'nowrap' }}>
              STUDIO
            </div>
          </div>
        </section>
      </div>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
};
