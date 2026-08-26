import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Mail, Linkedin, Calendar, X, Star } from 'lucide-react';

/* ════════════════════════════════ TOKENS ════════════════════════════════ */
const T = {
  bg: '#faf9f5',
  bgElevated: '#ffffff',
  ink: '#141413',
  text: '#141413',
  textMuted: '#6b6b66',
  textFaint: '#a3a29c',
  accent: '#e63a0f',
  accentSoft: '#fdece7',
  line: 'rgba(20,20,19,0.10)',
  overlay: 'rgba(20,20,19,0.04)',
};

const serif = "'Playfair Display', Georgia, serif";
const sans = "'Inter', system-ui, sans-serif";
const mono = "'Oxygen Mono', 'SF Mono', 'Fira Code', monospace";

/* ════════════════════════════════ UTILS ════════════════════════════════ */
const MonoLabel: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = '', style }) => (
  <span className={`uppercase tracking-[0.08em] ${className}`}
    style={{ fontFamily: mono, fontSize: '12px', color: T.textMuted, ...style }}>
    {children}
  </span>
);

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-15%" }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}>
    {children}
  </motion.div>
);

const LineReveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }> = ({ children, delay = 0, className = '', style }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: '110%' }}
      whileInView={{ y: '0%' }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}>
      {children}
    </motion.div>
  </div>
);

/* ════════════════════════════════ BOOKING MODAL ════════════════════════════════ */
const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0" style={{ background: 'rgba(20,20,19,0.6)', backdropFilter: 'blur(8px)' }} />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl h-[80vh] rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: T.bgElevated, border: `1px solid ${T.line}` }}
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-5" style={{ borderBottom: `1px solid ${T.line}` }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: T.ink }}>
                <Calendar size={18} color={T.bg} />
              </div>
              <div>
                <h3 className="font-semibold" style={{ fontFamily: sans, color: T.text, fontSize: '15px' }}>Book a Call</h3>
                <p style={{ fontFamily: sans, fontSize: '13px', color: T.textMuted }}>Pick a time that works</p>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-2xl flex items-center justify-center transition-colors"
              style={{ color: T.textFaint, background: T.overlay }}
              onMouseEnter={e => e.currentTarget.style.background = T.accentSoft}
              onMouseLeave={e => e.currentTarget.style.background = T.overlay}>
              <X size={18} />
            </button>
          </div>
          <iframe src="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3eFH-K6IQk-3avWVjGYP3Q-vfQZlAe9I-fYLdOobcFweup66Evk9dST6B_7YCz4Rj0cKxys5_o"
            style={{ border: 0 }} width="100%" height="100%" title="Book" className="h-[calc(100%-76px)]" />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ════════════════════════════════ DATA ════════════════════════════════ */
const projects = [
  {
    title: 'Haddu Clothing',
    category: 'E-Commerce',
    desc: 'Online fashion store with end-to-end e-commerce. Inventory, payments, shipping, all set up and running.',
    highlight: '80k monthly views on Pinterest',
    highlightLink: 'https://pin.it/71a3yvH2u',
    link: 'https://www.hadduclothing.com/',
    client: 'Haddu',
  },
  {
    title: 'JSB Foods',
    category: 'Website',
    desc: 'Clean, modern website for a food brand. Built to showcase products and build customer trust.',
    link: 'https://jsb-foods.vercel.app',
    client: 'JSB Foods',
  },
  {
    title: 'TapTurf',
    category: 'Web App',
    desc: 'Sports venue booking platform. Find a turf, pick a time, book it. Simple as that.',
    link: 'https://tapturf.in/',
    client: 'TapTurf',
  },
  {
    title: 'Deft Chemistry',
    category: 'Website',
    desc: 'Web presence for a chemistry brand. Elegant, informative, and built to convert visitors into customers.',
    link: 'https://deft-chemistry-redefined.vercel.app',
    client: 'Deft Chemistry',
  },
  {
    title: 'The Nashik Kumbh',
    category: 'Multilingual',
    desc: 'Website for Nashik Kumbh Mela 2027 in English, Hindi, and Marathi. Bathing dates, travel info, holy sites.',
    link: 'https://thenashikkumbh.com',
    client: 'Nashik Kumbh',
  },
  {
    title: 'SD Overseas',
    category: 'Website',
    desc: 'Website for an international trading company. Professional presence built for global credibility.',
    link: 'https://sd-overseas.vercel.app/',
    client: 'SD Overseas',
  },
];

const services = [
  {
    num: '01',
    title: 'Web Development',
    items: ['LANDING PAGES', 'BUSINESS WEBSITES', 'WEB APPLICATIONS', 'MULTILINGUAL SITES', 'RESPONSIVE DESIGN'],
  },
  {
    num: '02',
    title: 'E-Commerce',
    items: ['ONLINE STORES', 'PAYMENT INTEGRATION', 'INVENTORY SYSTEMS', 'PRODUCT CATALOGS', 'SHIPPING SETUP'],
  },
  {
    num: '03',
    title: 'Growth & Analytics',
    items: ['PINTEREST MARKETING', 'SEO OPTIMIZATION', 'DASHBOARD BUILDS', 'DATA VISUALIZATION', 'SOCIAL STRATEGY'],
  },
];

const clients = [
  { name: 'G2', logo: '/logos/g2logo.jpg' },
  { name: 'Cognizant', logo: '/logos/cognizantlogo.jpeg' },
  { name: "Levi's", logo: '/logos/levislogo.png' },
  { name: 'Haddu', logo: '/logos/haddulogo.webp' },
  { name: 'Nurturing Green', logo: '/logos/nurturinggreenlogo.png' },
  { name: 'KIST', logo: '/logos/KIST_Logo.jpg' },
];

/* ════════════════════════════════ MARQUEE ════════════════════════════════ */
const Marquee: React.FC<{ items: typeof clients; speed?: number }> = ({ items, speed = 25 }) => {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-10" style={{ borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${T.bg}, transparent)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${T.bg}, transparent)` }} />
      <div className="overflow-hidden">
        <div className="flex items-center gap-16 animate-studio-marquee" style={{ width: 'max-content' }}>
          {doubled.map((c, i) => (
            <div key={i} className="flex items-center gap-4 flex-shrink-0">
              <img src={c.logo} alt={c.name} className="w-10 h-10 rounded-xl object-contain" style={{ filter: 'grayscale(1)', opacity: 0.5 }} />
              <span style={{ fontFamily: mono, fontSize: '12px', letterSpacing: '0.08em', color: T.textFaint, textTransform: 'uppercase' }}>{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════ SERVICE ROW ════════════════════════════════ */
const ServiceRow: React.FC<{ label: string; index: number }> = ({ label, index }) => {
  const [hovered, setHovered] = useState(false);
  const repeated = Array(12).fill(label).join('   •   ');

  return (
    <Reveal delay={index * 0.04}>
      <div
        className="relative py-4 cursor-default overflow-hidden transition-all"
        style={{ borderBottom: `1px solid ${T.line}` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: hovered ? '-10%' : '0%' }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
            className="whitespace-nowrap"
            style={{
              fontFamily: mono,
              fontSize: '13px',
              letterSpacing: '0.08em',
              color: hovered ? T.accent : T.textMuted,
              transition: 'color 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
            }}>
            {repeated}
          </motion.div>
        </div>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: T.accentSoft }}
        />
      </div>
    </Reveal>
  );
};

/* ════════════════════════════════ PAGE ════════════════════════════════ */
export const StudioPage: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: '100vh', fontFamily: sans }}>

      {/* ═══ STYLES ═══ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oxygen+Mono&display=swap');
        @keyframes studioMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-studio-marquee { animation: studioMarquee 25s linear infinite; }
        .animate-studio-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .animate-studio-marquee { animation: none; }
        }
      `}</style>

      {/* ═══ NAV ═══ */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? `${T.bg}ee` : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${T.line}` : '1px solid transparent',
        }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
          <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 group">
            <img src="/favicon.png" alt="AL" className="w-8 h-8 rounded-xl object-cover" />
            <motion.span
              animate={{ opacity: scrolled ? 0 : 1, x: scrolled ? -10 : 0 }}
              transition={{ duration: 0.3 }}
              className="hidden sm:block font-semibold tracking-tight"
              style={{ fontFamily: sans, fontSize: '15px', color: T.text }}>
              Abhishek Lonkar
            </motion.span>
          </a>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              {['WORK', 'SERVICES', 'ABOUT'].map(label => (
                <a key={label} href={`#${label.toLowerCase()}`}
                  className="transition-colors"
                  style={{ fontFamily: mono, fontSize: '12px', letterSpacing: '0.08em', color: T.textMuted }}
                  onMouseEnter={e => e.currentTarget.style.color = T.text}
                  onMouseLeave={e => e.currentTarget.style.color = T.textMuted}>
                  {label}
                </a>
              ))}
            </div>

            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setShowBooking(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-colors"
              style={{ background: T.ink, color: T.bg, fontFamily: mono, fontSize: '12px', letterSpacing: '0.08em' }}>
              <span style={{ color: T.accent, fontSize: '16px', lineHeight: 1 }}>*</span>
              START A PROJECT
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
        {/* Warm gradient bg */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 80% 60% at 70% 30%, rgba(230,58,15,0.04) 0%, transparent 70%),
                       radial-gradient(ellipse 60% 50% at 20% 70%, rgba(230,180,120,0.06) 0%, transparent 70%)`,
        }} />

        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <Reveal>
            <div className="flex items-center gap-3 mb-12">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
              <MonoLabel>Available for new projects</MonoLabel>
            </div>
          </Reveal>

          <div className="mb-16">
            <LineReveal>
              <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(2.8rem, 8vw, 7.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: T.text }}>
                I design and build
              </h1>
            </LineReveal>
            <LineReveal delay={0.08}>
              <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 'clamp(2.8rem, 8vw, 7.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: T.text }}>
                digital experiences<span style={{ color: T.accent }}>.</span>
              </h1>
            </LineReveal>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <Reveal delay={0.2}>
              <p className="max-w-lg leading-relaxed" style={{ fontFamily: sans, fontSize: '18px', color: T.textMuted, lineHeight: 1.7 }}>
                Websites, online stores, dashboards, and digital marketing
                for businesses that want things done right. No fluff, no middlemen.
                Just work that performs.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex items-center gap-4">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setShowBooking(true)}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full group"
                  style={{ background: T.accent, color: '#fff', fontFamily: mono, fontSize: '12px', letterSpacing: '0.08em' }}>
                  BOOK A FREE CALL
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <a href="#work"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full transition-colors"
                  style={{ border: `1px solid ${T.line}`, fontFamily: mono, fontSize: '12px', letterSpacing: '0.08em', color: T.textMuted }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.text; e.currentTarget.style.color = T.text; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.line; e.currentTarget.style.color = T.textMuted; }}>
                  SEE WORK
                </a>
              </div>
            </Reveal>
          </div>

          {/* Stats row */}
          <Reveal delay={0.4}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-10" style={{ borderTop: `1px solid ${T.line}` }}>
              {[
                { value: '10+', label: 'CLIENTS' },
                { value: '80K', label: 'PINTEREST VIEWS' },
                { value: '100+', label: 'DASHBOARDS BUILT' },
                { value: '6+', label: 'YEARS EXPERIENCE' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: serif, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: T.text, lineHeight: 1.1 }}>
                    {s.value}
                  </div>
                  <MonoLabel className="mt-2 block" style={{ fontSize: '11px', color: T.textFaint }}>{s.label}</MonoLabel>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CLIENT MARQUEE ═══ */}
      <Marquee items={clients} />

      {/* ═══ STATEMENT ═══ */}
      <section className="py-32 md:py-44 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="md:ml-auto md:max-w-3xl">
            <LineReveal>
              <p style={{ fontFamily: sans, fontSize: 'clamp(1.5rem, 3.5vw, 3rem)', fontWeight: 400, lineHeight: 1.25, color: T.text, letterSpacing: '-0.01em' }}>
                I help businesses show up online the right way. From idea to launch, I handle the design, the code, and the marketing so you can focus on what you do best.
              </p>
            </LineReveal>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED WORK ═══ */}
      <section id="work" className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="flex items-end justify-between mb-20">
              <div>
                <span style={{ fontFamily: serif, fontSize: 'clamp(1.2rem, 2vw, 2rem)', fontWeight: 400, color: T.textFaint, fontStyle: 'italic' }}>
                  Featured work
                </span>
                <h2 className="mt-2" style={{ fontFamily: sans, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', color: T.text }}>
                  Selected<br />Projects
                </h2>
              </div>
              <MonoLabel className="hidden md:block pb-2" style={{ color: T.textFaint }}>
                {String(projects.length).padStart(2, '0')} PROJECTS
              </MonoLabel>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <motion.a
                  href={p.link} target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="block rounded-3xl overflow-hidden group cursor-pointer"
                  style={{ background: T.bgElevated, border: `1px solid ${T.line}` }}>

                  {/* Card header */}
                  <div className="p-8 pb-0">
                    <div className="flex items-center justify-between mb-6">
                      <MonoLabel>{p.category}</MonoLabel>
                      <span style={{ fontFamily: serif, fontSize: '48px', fontWeight: 400, color: T.line, lineHeight: 1 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="mb-3" style={{ fontFamily: sans, fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', fontWeight: 600, color: T.text, letterSpacing: '-0.01em' }}>
                      {p.title}
                    </h3>
                    <p className="mb-6" style={{ fontSize: '15px', lineHeight: 1.7, color: T.textMuted }}>
                      {p.desc}
                    </p>

                    {p.highlight && (
                      <a href={p.highlightLink} target="_blank" rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 transition-colors"
                        style={{ background: T.accentSoft, border: `1px solid rgba(230,58,15,0.15)` }}>
                        <Star size={13} className="fill-current" style={{ color: T.accent }} />
                        <span style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.05em', color: T.accent }}>{p.highlight.toUpperCase()}</span>
                      </a>
                    )}
                  </div>

                  {/* Card footer */}
                  <div className="px-8 py-5 flex items-center justify-between" style={{ borderTop: `1px solid ${T.line}` }}>
                    <MonoLabel style={{ color: T.textFaint }}>{p.client}</MonoLabel>
                    <div className="flex items-center gap-2 transition-colors"
                      style={{ fontFamily: mono, fontSize: '12px', letterSpacing: '0.08em', color: T.textMuted }}>
                      <span className="group-hover:hidden">VIEW</span>
                      <span className="hidden group-hover:inline" style={{ color: T.accent }}>VISIT SITE</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>

          {/* More work bar */}
          <Reveal delay={0.2}>
            <a href="https://workwithabhi.online/#/barkit"
              className="mt-10 flex items-center justify-between px-8 py-6 rounded-2xl group transition-colors"
              style={{ background: T.accent, color: '#fff' }}>
              <span style={{ fontFamily: mono, fontSize: '13px', letterSpacing: '0.08em' }}>SEE ALL WORK</span>
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <span style={{ fontFamily: serif, fontSize: 'clamp(1.2rem, 2vw, 2rem)', fontWeight: 400, color: T.textFaint, fontStyle: 'italic' }}>
              What I do
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-2xl mt-6 mb-20" style={{ fontFamily: sans, fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', lineHeight: 1.7, color: T.textMuted }}>
              I work directly with you. No account managers, no tickets, no waiting.
              You tell me what you need, I figure out the best way to do it, and I build it properly.
            </p>
          </Reveal>

          <div className="space-y-20">
            {services.map((svc, si) => (
              <div key={si}>
                <Reveal>
                  <div className="flex items-baseline gap-6 mb-8">
                    <span style={{ fontFamily: serif, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 400, color: T.textFaint, lineHeight: 1 }}>
                      {svc.num}
                    </span>
                    <h3 style={{ fontFamily: sans, fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 500, letterSpacing: '-0.02em', color: T.text, lineHeight: 1 }}>
                      {svc.title}
                    </h3>
                  </div>
                </Reveal>
                <div style={{ borderTop: `1px solid ${T.line}` }}>
                  {svc.items.map((item, ii) => (
                    <ServiceRow key={ii} label={item} index={ii} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-24 md:py-32 px-6 md:px-12" style={{ background: T.ink }}>
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <span style={{ fontFamily: serif, fontSize: 'clamp(1.2rem, 2vw, 2rem)', fontWeight: 400, color: T.textFaint, fontStyle: 'italic' }}>
              Kind words
            </span>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {[
              {
                name: 'Syed Rahman',
                role: 'GTM Ops & Analytics, 6sense',
                text: "He consistently brought a positive attitude, strong work ethic, and genuine curiosity. What stood out most was how much ownership he took. He became a trusted partner.",
              },
              {
                name: 'Mitch Osborne',
                role: 'Director of Business Systems, G2',
                text: "One of our most impactful collaborations was the overhaul of ARR waterfall reporting. His work improved visibility for senior leadership and supported better forecasting.",
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <a href="https://www.linkedin.com/in/lonkarabhishek/details/recommendations/"
                  target="_blank" rel="noopener noreferrer"
                  className="block p-10 rounded-3xl transition-all group cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid rgba(255,255,255,0.08)` }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                  <div className="flex items-center gap-1 mb-8">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="fill-current" style={{ color: T.accent }} />
                    ))}
                  </div>
                  <p className="italic mb-10" style={{ fontFamily: serif, fontSize: '20px', lineHeight: 1.7, color: T.bg }}>
                    "{t.text}"
                  </p>
                  <div className="flex items-center justify-between pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div>
                      <p className="font-semibold" style={{ fontFamily: sans, fontSize: '15px', color: T.bg }}>{t.name}</p>
                      <MonoLabel style={{ color: T.textFaint, fontSize: '11px' }}>{t.role}</MonoLabel>
                    </div>
                    <ArrowUpRight size={16} style={{ color: T.textFaint }} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <Reveal>
                <span style={{ fontFamily: serif, fontSize: 'clamp(1.2rem, 2vw, 2rem)', fontWeight: 400, color: T.textFaint, fontStyle: 'italic' }}>
                  About
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-4" style={{ fontFamily: sans, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.1, color: T.text }}>
                  Abhishek Lonkar
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <MonoLabel className="mt-3 block">PUNE, INDIA</MonoLabel>
              </Reveal>
            </div>
            <div>
              <Reveal delay={0.1}>
                <p className="mb-6" style={{ fontSize: '17px', lineHeight: 1.8, color: T.textMuted }}>
                  I started as an engineer, building systems, writing code, and figuring out how things connect.
                  That taught me to think clearly and build things that actually work.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mb-6" style={{ fontSize: '17px', lineHeight: 1.8, color: T.textMuted }}>
                  Then I joined G2, one of the biggest software review platforms, where I went from crunching data
                  to helping teams make better decisions. I learned that building things is only half the job.
                  Building the right things is what matters.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ fontSize: '17px', lineHeight: 1.8, color: T.textMuted }}>
                  Today, I do both. I build websites and online stores for businesses, and I help teams
                  make sense of their data. Whether it is a storefront or a dashboard, the goal is always the same:
                  make it work, keep it simple, and earn your trust.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-32 md:py-44 px-6 md:px-12" style={{ borderTop: `1px solid ${T.line}` }}>
        <div className="max-w-[1400px] mx-auto text-center">
          <LineReveal>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', color: T.text }}>
              Have a project?
            </h2>
          </LineReveal>
          <LineReveal delay={0.08}>
            <h2 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem, 7vw, 6rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', color: T.textFaint, fontStyle: 'italic' }}>
              Let's see it through<span style={{ color: T.accent }}>.</span>
            </h2>
          </LineReveal>

          <Reveal delay={0.2}>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setShowBooking(true)}
              className="mt-16 inline-flex items-center gap-3 px-10 py-5 rounded-full group"
              style={{ background: T.accent, color: '#fff', fontFamily: mono, fontSize: '13px', letterSpacing: '0.08em' }}>
              <span style={{ fontSize: '18px', lineHeight: 1 }}>*</span>
              START A PROJECT
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-16">
              {[
                { icon: <Mail size={16} />, label: 'EMAIL', href: 'mailto:abhisheksoffice11@gmail.com' },
                { icon: <Linkedin size={16} />, label: 'LINKEDIN', href: 'https://www.linkedin.com/in/lonkarabhishek/' },
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>, label: 'WHATSAPP', href: 'https://wa.me/919403612979?text=Hi%20Abhishek%2C%20I%20visited%20your%20studio%20site.%20Can%20we%20chat%3F' },
              ].map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors"
                  style={{ color: T.textMuted, fontFamily: mono, fontSize: '12px', letterSpacing: '0.08em' }}
                  onMouseEnter={e => e.currentTarget.style.color = T.text}
                  onMouseLeave={e => e.currentTarget.style.color = T.textMuted}>
                  {c.icon}
                  {c.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="px-6 md:px-12 pt-12 pb-8 overflow-hidden" style={{ borderTop: `1px solid ${T.line}` }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/lonkarabhishek/' },
                { label: 'EMAIL', href: 'mailto:abhisheksoffice11@gmail.com' },
                { label: 'WHATSAPP', href: 'https://wa.me/919403612979' },
              ].map((l, i) => (
                <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ fontFamily: mono, fontSize: '12px', letterSpacing: '0.08em', color: T.textMuted }}
                  onMouseEnter={e => e.currentTarget.style.color = T.text}
                  onMouseLeave={e => e.currentTarget.style.color = T.textMuted}>
                  {l.label}
                </a>
              ))}
            </div>
            <MonoLabel style={{ color: T.textFaint }}>&copy; {new Date().getFullYear()}</MonoLabel>
          </div>

          {/* Oversized wordmark */}
          <div className="relative h-[12vw] md:h-[10vw] overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 translate-y-[30%] text-center select-none pointer-events-none"
              style={{
                fontFamily: serif,
                fontWeight: 400,
                fontSize: 'clamp(5rem, 14vw, 14rem)',
                lineHeight: 1,
                color: T.line,
                letterSpacing: '-0.03em',
              }}>
              Abhishek Lonkar
            </div>
          </div>
        </div>
      </footer>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
};
