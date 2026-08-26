import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Mail, Linkedin, Calendar, X, Star } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════════════════════════════════════ */
const T = {
  bg:        '#faf9f5',
  bgDark:    '#141413',
  white:     '#ffffff',
  text:      '#141413',
  textMuted: '#6b6b66',
  textFaint: '#a3a29c',
  accent:    '#e63a0f',
  accentSoft:'rgba(230,58,15,0.05)',
  line:      'rgba(20,20,19,0.10)',
  lineWhite: 'rgba(255,255,255,0.08)',
};

const F = {
  serif: "'Playfair Display', Georgia, serif",
  sans:  "'Inter', system-ui, sans-serif",
  mono:  "'Oxygen Mono', 'SF Mono', monospace",
};

/* ═══════════════════════════════════════════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════════════════════════════════════════ */
const MonoLabel: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <span className="uppercase" style={{
    fontFamily: F.mono, fontSize: '11px', letterSpacing: '0.12em',
    color: T.textMuted, ...style,
  }}>
    {children}
  </span>
);

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-8%' }}
    transition={{ duration: 1.1, delay, ease: [0.25, 1, 0.5, 1] }}
    className={className}>
    {children}
  </motion.div>
);

const LineReveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }> = ({ children, delay = 0, className = '', style }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: '110%' }}
      whileInView={{ y: '0%' }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}>
      {children}
    </motion.div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════════ */
const projects = [
  {
    title: 'Haddu Clothing',
    category: 'E-Commerce',
    desc: 'Full e-commerce store for a fashion brand. Product catalogs, payments, inventory, and shipping. Built from scratch.',
    highlight: '80k Pinterest views/mo',
    highlightLink: 'https://pin.it/71a3yvH2u',
    link: 'https://www.hadduclothing.com/',
  },
  {
    title: 'JSB Foods',
    category: 'Brand Website',
    desc: 'Clean, modern website for a food company. Product showcase, brand story, and customer trust built in.',
    link: 'https://jsb-foods.vercel.app',
  },
  {
    title: 'TapTurf',
    category: 'Web Application',
    desc: 'Sports venue booking platform. Find a turf, pick a time, book it. Simple as that.',
    link: 'https://tapturf.in/',
  },
  {
    title: 'Deft Chemistry',
    category: 'Brand Website',
    desc: 'Web presence for a chemistry brand. Elegant, informative, and built to convert visitors into customers.',
    link: 'https://deft-chemistry-redefined.vercel.app',
  },
  {
    title: 'The Nashik Kumbh',
    category: 'Multilingual',
    desc: 'Trilingual website for Nashik Kumbh Mela 2027. English, Hindi, and Marathi. Bathing dates, travel info, holy sites.',
    link: 'https://thenashikkumbh.com',
  },
  {
    title: 'SD Overseas',
    category: 'Brand Website',
    desc: 'Professional web presence for an international trading company. Built for global credibility.',
    link: 'https://sd-overseas.vercel.app/',
  },
];

const services = [
  {
    num: '01',
    title: 'Web Development',
    desc: 'Custom websites that look right and work right. Landing pages, business sites, web apps, multilingual builds. Everything is custom, nothing is templated.',
    tags: ['Landing Pages', 'Business Websites', 'Web Applications', 'Multilingual Sites', 'Responsive Design'],
  },
  {
    num: '02',
    title: 'E-Commerce',
    desc: 'Online stores ready to sell. Product catalogs, payment flows, inventory management, shipping. End to end, ready to launch.',
    tags: ['Online Stores', 'Payment Integration', 'Inventory Systems', 'Product Catalogs', 'Shipping Setup'],
  },
  {
    num: '03',
    title: 'Growth & Analytics',
    desc: 'Make your data useful. Pinterest marketing, SEO, dashboards, and strategies that actually move the numbers.',
    tags: ['Pinterest Marketing', 'SEO Optimization', 'Dashboard Builds', 'Data Visualization', 'Social Strategy'],
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

/* ═══════════════════════════════════════════════════════════════════════════════
   BOOKING MODAL
   ═══════════════════════════════════════════════════════════════════════════════ */
const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0" style={{ background: 'rgba(20,20,19,0.7)', backdropFilter: 'blur(12px)' }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl h-[80vh] overflow-hidden"
          style={{ background: T.white, border: `1px solid ${T.line}` }}
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-5" style={{ borderBottom: `1px solid ${T.line}` }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center" style={{ background: T.bgDark }}>
                <Calendar size={16} color={T.bg} />
              </div>
              <div>
                <h3 style={{ fontFamily: F.sans, fontSize: '15px', fontWeight: 600, color: T.text }}>Book a Call</h3>
                <p style={{ fontFamily: F.sans, fontSize: '13px', color: T.textMuted }}>Pick a time that works for you</p>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center transition-colors"
              style={{ color: T.textFaint, background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.color = T.text}
              onMouseLeave={e => e.currentTarget.style.color = T.textFaint}>
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

/* ═══════════════════════════════════════════════════════════════════════════════
   PROJECT ROW
   ═══════════════════════════════════════════════════════════════════════════════ */
const ProjectRow: React.FC<{ project: typeof projects[0]; index: number }> = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative"
      style={{ borderTop: `1px solid ${T.line}` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* Hover fill */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        style={{ background: T.accentSoft }}
      />

      <div className="relative py-6 md:py-8 px-2 md:px-6">
        {/* Main row */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-0">
          {/* Number */}
          <div className="md:w-[100px] flex-shrink-0">
            <motion.span
              animate={{ color: hovered ? T.accent : T.textFaint }}
              transition={{ duration: 0.4 }}
              style={{
                fontFamily: F.serif,
                fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)',
                fontWeight: 400,
                fontStyle: 'italic',
              }}>
              {String(index + 1).padStart(2, '0')}
            </motion.span>
          </div>

          {/* Title */}
          <div className="flex-grow min-w-0">
            <motion.h3
              animate={{ x: hovered ? 12 : 0 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              style={{
                fontFamily: F.serif,
                fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                fontWeight: 400,
                color: T.text,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}>
              {project.title}
            </motion.h3>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 md:gap-8 flex-shrink-0 md:ml-8">
            {project.highlight && (
              <a href={project.highlightLink} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="hidden lg:flex items-center gap-2"
                style={{ padding: '4px 10px', background: T.accentSoft, border: '1px solid rgba(230,58,15,0.12)' }}>
                <Star size={10} className="fill-current" style={{ color: T.accent }} />
                <span style={{ fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.08em', color: T.accent }}>
                  80K PINTEREST
                </span>
              </a>
            )}
            <MonoLabel style={{ color: T.textFaint, fontSize: '10px' }}>
              {project.category.toUpperCase()}
            </MonoLabel>
            <motion.div
              animate={{
                x: hovered ? 4 : 0,
                y: hovered ? -4 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              style={{ color: hovered ? T.accent : T.textFaint, transition: 'color 0.4s' }}>
              <ArrowUpRight size={22} />
            </motion.div>
          </div>
        </div>

        {/* Description on hover */}
        <motion.div
          initial={false}
          animate={{
            height: hovered ? 'auto' : 0,
            opacity: hovered ? 1 : 0,
            marginTop: hovered ? 16 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="overflow-hidden"
          style={{ paddingLeft: '0', }}>
          <p className="md:pl-[100px]" style={{ fontFamily: F.sans, fontSize: '15px', color: T.textMuted, lineHeight: 1.6, maxWidth: '600px' }}>
            {project.desc}
          </p>
        </motion.div>
      </div>
    </motion.a>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════════
   SERVICE ROW (marquee on hover)
   ═══════════════════════════════════════════════════════════════════════════════ */
const ServiceRow: React.FC<{ label: string; index: number }> = ({ label, index }) => {
  const [hovered, setHovered] = useState(false);
  const repeated = Array(14).fill(label.toUpperCase()).join('   ·   ');

  return (
    <div
      className="relative py-3 cursor-default overflow-hidden"
      style={{ borderBottom: `1px solid ${T.line}` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: T.accentSoft }}
      />
      <div className="relative overflow-hidden">
        <motion.div
          animate={{ x: hovered ? [0, -500] : 0 }}
          transition={hovered ? { duration: 12, repeat: Infinity, repeatType: 'loop', ease: 'linear' } : { duration: 0.3 }}
          className="whitespace-nowrap"
          style={{
            fontFamily: F.mono,
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: hovered ? T.accent : T.textMuted,
            transition: 'color 0.3s',
          }}>
          {hovered ? repeated : label.toUpperCase()}
        </motion.div>
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
  const heroY = useTransform(scrollY, [0, 700], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    document.title = 'Abhishek Lonkar Studio';
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ background: T.bg, color: T.text, minHeight: '100vh', fontFamily: F.sans }}>

      {/* ═══ GLOBAL STYLES ═══ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oxygen+Mono&display=swap');
        @keyframes marqueeScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .marquee-track { animation: marqueeScroll 30s linear infinite; }
        .marquee-fast  { animation: marqueeScroll 20s linear infinite; }
        ::selection { background: rgba(230,58,15,0.15); }
        @media(prefers-reduced-motion:reduce){ .marquee-track,.marquee-fast{animation:none} }
      `}</style>

      {/* Film grain overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 100, pointerEvents: 'none', opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px',
      }} />

      {/* ═══ NAVIGATION ═══ */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
        style={{
          background: scrolled ? `${T.bg}f0` : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
        }}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-5 md:py-6 flex items-center justify-between">
          <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3">
            <img src="/favicon.png" alt="AL" className="w-7 h-7 object-cover" style={{ borderRadius: '4px' }} />
            <span className="hidden md:block" style={{
              fontFamily: F.mono, fontSize: '11px', letterSpacing: '0.12em',
              color: T.textMuted, textTransform: 'uppercase',
            }}>
              Studio
            </span>
          </a>

          <div className="flex items-center gap-6 md:gap-8">
            <div className="hidden md:flex items-center gap-8">
              {['Work', 'Services', 'About'].map(label => (
                <button key={label} onClick={() => scrollTo(label.toLowerCase())}
                  className="transition-colors duration-300"
                  style={{
                    fontFamily: F.sans, fontSize: '14px', color: T.textMuted,
                    background: 'none', border: 'none', cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = T.text}
                  onMouseLeave={e => e.currentTarget.style.color = T.textMuted}>
                  {label}
                </button>
              ))}
            </div>

            <button onClick={() => setShowBooking(true)}
              className="transition-all duration-300"
              style={{
                fontFamily: F.mono, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: T.bg, background: T.bgDark, padding: '10px 20px',
                border: 'none', cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = T.accent}
              onMouseLeave={e => e.currentTarget.style.background = T.bgDark}>
              Let's Talk
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden"
        style={{ padding: 'clamp(100px, 12vh, 160px) clamp(24px, 4vw, 64px) clamp(32px, 4vh, 56px)' }}>

        {/* Subtle warm radial */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 70% 50% at 80% 20%, rgba(230,58,15,0.03) 0%, transparent 60%),
                       radial-gradient(ellipse 50% 40% at 10% 80%, rgba(200,160,100,0.04) 0%, transparent 60%)`,
        }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10">
          {/* Status label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-3 mb-6 md:mb-8">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
            <MonoLabel style={{ fontSize: '10px' }}>Available for projects</MonoLabel>
          </motion.div>

          {/* Giant name */}
          <div className="max-w-[1600px]">
            <LineReveal delay={0.1}>
              <h1 style={{
                fontFamily: F.serif, fontWeight: 400,
                fontSize: 'clamp(3rem, 11vw, 11rem)',
                lineHeight: 0.95, letterSpacing: '-0.03em', color: T.text,
              }}>
                Abhishek
              </h1>
            </LineReveal>
            <LineReveal delay={0.2}>
              <h1 style={{
                fontFamily: F.serif, fontWeight: 400, fontStyle: 'italic',
                fontSize: 'clamp(3rem, 11vw, 11rem)',
                lineHeight: 0.95, letterSpacing: '-0.03em', color: T.text,
              }}>
                Lonkar<span style={{ color: T.accent, fontStyle: 'normal' }}>.</span>
              </h1>
            </LineReveal>
          </div>

          {/* Tagline right under the name */}
          <Reveal delay={0.4}>
            <p className="mt-6 md:mt-8" style={{
              fontFamily: F.sans, fontSize: 'clamp(15px, 1.2vw, 18px)',
              color: T.textMuted, lineHeight: 1.7, maxWidth: '480px',
            }}>
              Digital studio for websites, online stores, and growth.
              I design it, build it, and help you grow it.
            </p>
          </Reveal>
        </motion.div>

        {/* Bottom: stats + scroll indicator */}
        <div className="relative z-10 mt-auto">
          <Reveal delay={0.5}>
            <div className="flex flex-wrap items-end justify-between gap-6 pt-8" style={{ borderTop: `1px solid ${T.line}` }}>
              <div className="flex flex-wrap gap-x-10 gap-y-4">
                {[
                  { value: '10+', label: 'Clients' },
                  { value: '80K', label: 'Pinterest Views' },
                  { value: '100+', label: 'Dashboards' },
                  { value: '6+', label: 'Years Exp.' },
                ].map((s, i) => (
                  <div key={i} className="flex items-baseline gap-2">
                    <span style={{ fontFamily: F.serif, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 400, color: T.text }}>
                      {s.value}
                    </span>
                    <span className="uppercase" style={{ fontFamily: F.mono, fontSize: '9px', letterSpacing: '0.1em', color: T.textFaint }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ color: T.textFaint }}>
                <ArrowDown size={18} />
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ TEXT MARQUEE ═══ */}
      <div className="overflow-hidden" style={{ borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, padding: '20px 0' }}>
        <div className="flex items-center gap-16 marquee-track" style={{ width: 'max-content' }}>
          {[...Array(3)].flatMap(() => ['DESIGN', 'BUILD', 'GROW', 'MARKET', 'SHIP']).map((word, i) => (
            <React.Fragment key={i}>
              <span style={{
                fontFamily: F.sans, fontSize: 'clamp(1.5rem, 3vw, 3rem)',
                fontWeight: 500, color: T.text, letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}>
                {word}
              </span>
              <span style={{ color: T.accent, fontSize: '6px', lineHeight: 1 }}>●</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ═══ CLIENT LOGOS MARQUEE ═══ */}
      <div className="relative overflow-hidden py-8" style={{ borderBottom: `1px solid ${T.line}` }}>
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${T.bg}, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${T.bg}, transparent)` }} />
        <div className="flex items-center gap-16 marquee-fast" style={{ width: 'max-content' }}>
          {[...clients, ...clients].map((c, i) => (
            <div key={i} className="flex items-center gap-3 flex-shrink-0">
              <img src={c.logo} alt={c.name} className="w-8 h-8 object-contain"
                style={{ filter: 'grayscale(1)', opacity: 0.4, borderRadius: '4px' }} />
              <span style={{
                fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.1em',
                color: T.textFaint, textTransform: 'uppercase',
              }}>
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ STATEMENT ═══ */}
      <section style={{ padding: 'clamp(48px, 6vw, 100px) clamp(24px, 4vw, 64px)' }}>
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <MonoLabel style={{ display: 'block', marginBottom: '24px', fontSize: '10px' }}>About the studio</MonoLabel>
          </Reveal>
          <div className="md:ml-auto md:max-w-4xl">
            <LineReveal>
              <p style={{
                fontFamily: F.serif,
                fontSize: 'clamp(1.4rem, 3vw, 2.8rem)',
                fontWeight: 400, fontStyle: 'italic',
                lineHeight: 1.3, color: T.text, letterSpacing: '-0.01em',
              }}>
                I help businesses show up online the right way. From the first sketch to the final launch,
                I handle the design, the code, and the marketing so you can focus on running your business.
              </p>
            </LineReveal>
          </div>
        </div>
      </section>

      {/* ═══ SELECTED WORK ═══ */}
      <section id="work" style={{ padding: 'clamp(48px, 5vw, 80px) clamp(24px, 4vw, 64px)' }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-10 md:mb-16">
            <div>
              <Reveal>
                <MonoLabel style={{ display: 'block', marginBottom: '16px', fontSize: '10px' }}>Selected work</MonoLabel>
              </Reveal>
              <LineReveal delay={0.1}>
                <h2 style={{
                  fontFamily: F.serif, fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                  fontWeight: 400, lineHeight: 1, letterSpacing: '-0.03em', color: T.text,
                }}>
                  Projects
                </h2>
              </LineReveal>
            </div>
            <Reveal delay={0.2}>
              <MonoLabel style={{ color: T.textFaint, fontSize: '10px', paddingBottom: '8px' }}>
                ({String(projects.length).padStart(2, '0')})
              </MonoLabel>
            </Reveal>
          </div>

          {/* Project rows */}
          <div>
            {projects.map((p, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <ProjectRow project={p} index={i} />
              </Reveal>
            ))}
            <div style={{ borderTop: `1px solid ${T.line}` }} />
          </div>

          {/* View all link */}
          <Reveal delay={0.1}>
            <div className="mt-12 flex justify-end">
              <a href="https://workwithabhi.online/#/barkit"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 group transition-colors duration-300"
                style={{
                  fontFamily: F.mono, fontSize: '11px', letterSpacing: '0.1em',
                  color: T.textMuted, textTransform: 'uppercase',
                }}
                onMouseEnter={e => e.currentTarget.style.color = T.accent}
                onMouseLeave={e => e.currentTarget.style.color = T.textMuted}>
                View all projects
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" style={{
        padding: 'clamp(48px, 5vw, 80px) clamp(24px, 4vw, 64px)',
        borderTop: `1px solid ${T.line}`,
      }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
            <div>
              <Reveal>
                <MonoLabel style={{ display: 'block', marginBottom: '12px', fontSize: '10px' }}>What I do</MonoLabel>
              </Reveal>
              <LineReveal delay={0.1}>
                <h2 style={{
                  fontFamily: F.serif, fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                  fontWeight: 400, lineHeight: 1, letterSpacing: '-0.03em', color: T.text,
                }}>
                  Services
                </h2>
              </LineReveal>
            </div>
            <Reveal delay={0.2}>
              <p style={{ fontFamily: F.sans, fontSize: '15px', color: T.textMuted, lineHeight: 1.7, maxWidth: '400px' }}>
                I work directly with you. No account managers, no tickets, no waiting.
                You tell me what you need. I build it properly.
              </p>
            </Reveal>
          </div>

          {/* Service blocks with marquee sub-rows */}
          <div className="space-y-12">
            {services.map((svc, si) => (
              <Reveal key={si} delay={si * 0.08}>
                <div>
                  <div className="flex items-baseline gap-5 mb-4" style={{ borderTop: `1px solid ${T.line}`, paddingTop: '24px' }}>
                    <span style={{
                      fontFamily: F.serif, fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                      fontWeight: 400, color: T.textFaint, fontStyle: 'italic', lineHeight: 1,
                    }}>
                      {svc.num}
                    </span>
                    <h3 style={{
                      fontFamily: F.sans, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                      fontWeight: 500, color: T.text, letterSpacing: '-0.02em', lineHeight: 1.1,
                    }}>
                      {svc.title}
                    </h3>
                  </div>
                  <p className="mb-4 md:pl-[52px]" style={{ fontFamily: F.sans, fontSize: '14px', color: T.textMuted, lineHeight: 1.7, maxWidth: '500px' }}>
                    {svc.desc}
                  </p>
                  {/* Sub-item rows with marquee hover */}
                  <div className="md:pl-[52px]">
                    {svc.tags.map((tag, ti) => (
                      <ServiceRow key={ti} label={tag} index={ti} />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ background: T.bgDark, padding: 'clamp(48px, 5vw, 80px) clamp(24px, 4vw, 64px)' }}>
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <MonoLabel style={{ display: 'block', marginBottom: '32px', fontSize: '10px', color: T.textFaint }}>
              Kind words
            </MonoLabel>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: T.lineWhite }}>
            {[
              {
                text: 'He consistently brought a positive attitude, strong work ethic, and genuine curiosity. What stood out most was how much ownership he took. He became a trusted partner.',
                name: 'Syed Rahman',
                role: 'GTM Ops & Analytics, 6sense',
              },
              {
                text: 'One of our most impactful collaborations was the overhaul of ARR waterfall reporting. His work improved visibility for senior leadership and supported better forecasting.',
                name: 'Mitch Osborne',
                role: 'Director of Business Systems, G2',
              },
            ].map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <a href="https://www.linkedin.com/in/lonkarabhishek/details/recommendations/"
                  target="_blank" rel="noopener noreferrer"
                  className="block group transition-colors duration-500"
                  style={{ background: T.bgDark, padding: 'clamp(32px, 4vw, 56px)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = T.bgDark}>

                  {/* Large quote mark */}
                  <span style={{
                    fontFamily: F.serif, fontSize: '6rem', lineHeight: 0.5,
                    color: 'rgba(255,255,255,0.05)', display: 'block', marginBottom: '32px',
                    userSelect: 'none',
                  }}>
                    &ldquo;
                  </span>

                  <p style={{
                    fontFamily: F.serif, fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)',
                    fontStyle: 'italic', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)',
                    marginBottom: '40px',
                  }}>
                    {t.text}
                  </p>

                  <div className="flex items-center justify-between"
                    style={{ borderTop: `1px solid ${T.lineWhite}`, paddingTop: '20px' }}>
                    <div>
                      <p style={{ fontFamily: F.sans, fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.9)' }}>
                        {t.name}
                      </p>
                      <span className="uppercase" style={{
                        fontFamily: F.mono, fontSize: '10px', letterSpacing: '0.08em', color: T.textFaint,
                      }}>
                        {t.role}
                      </span>
                    </div>
                    <ArrowUpRight size={14} style={{ color: T.textFaint }}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ padding: 'clamp(48px, 5vw, 80px) clamp(24px, 4vw, 64px)' }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Left column */}
            <div className="md:col-span-4">
              <Reveal>
                <MonoLabel style={{ display: 'block', marginBottom: '16px', fontSize: '10px' }}>About</MonoLabel>
              </Reveal>
              <LineReveal delay={0.1}>
                <h2 style={{
                  fontFamily: F.serif, fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', color: T.text,
                }}>
                  Abhishek<br />Lonkar
                </h2>
              </LineReveal>
              <Reveal delay={0.2}>
                <MonoLabel style={{ display: 'block', marginTop: '12px', fontSize: '10px', color: T.textFaint }}>
                  Pune, India
                </MonoLabel>
              </Reveal>
            </div>

            {/* Right column */}
            <div className="md:col-span-7 md:col-start-6">
              <Reveal delay={0.1}>
                <p style={{ fontFamily: F.sans, fontSize: '16px', lineHeight: 1.8, color: T.textMuted, marginBottom: '24px' }}>
                  I started as an engineer, building systems, writing code, figuring out how things connect.
                  That taught me to think clearly and build things that actually work.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p style={{ fontFamily: F.sans, fontSize: '16px', lineHeight: 1.8, color: T.textMuted, marginBottom: '24px' }}>
                  Then I joined G2, one of the biggest software review platforms, where I went from crunching data
                  to helping teams make better decisions. I learned that building things is only half the job.
                  Building the right things is what matters.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ fontFamily: F.sans, fontSize: '16px', lineHeight: 1.8, color: T.textMuted }}>
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
      <section style={{
        padding: 'clamp(56px, 6vw, 100px) clamp(24px, 4vw, 64px)',
        borderTop: `1px solid ${T.line}`,
      }}>
        <div className="max-w-[1600px] mx-auto text-center">
          <LineReveal>
            <h2 style={{
              fontFamily: F.serif, fontSize: 'clamp(2.5rem, 6vw, 6rem)',
              fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.03em', color: T.text,
            }}>
              Have a project?
            </h2>
          </LineReveal>
          <LineReveal delay={0.1}>
            <h2 style={{
              fontFamily: F.serif, fontSize: 'clamp(2.5rem, 6vw, 6rem)',
              fontWeight: 400, fontStyle: 'italic', lineHeight: 0.95,
              letterSpacing: '-0.03em', color: T.textFaint,
            }}>
              Let's talk<span style={{ color: T.accent, fontStyle: 'normal' }}>.</span>
            </h2>
          </LineReveal>

          <Reveal delay={0.2}>
            <button onClick={() => setShowBooking(true)}
              className="mt-10 inline-flex items-center gap-3 group transition-all duration-300"
              style={{
                background: T.accent, color: '#fff', border: 'none', cursor: 'pointer',
                fontFamily: F.mono, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '16px 40px',
              }}
              onMouseEnter={e => e.currentTarget.style.background = T.bgDark}
              onMouseLeave={e => e.currentTarget.style.background = T.accent}>
              Book a free call
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex items-center justify-center gap-10 mt-8">
              {[
                { label: 'Email', href: 'mailto:abhisheksoffice11@gmail.com' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lonkarabhishek/' },
                { label: 'WhatsApp', href: 'https://wa.me/919403612979?text=Hi%20Abhishek%2C%20I%20visited%20your%20studio%20site.%20Can%20we%20chat%3F' },
              ].map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noopener noreferrer"
                  className="transition-colors duration-300"
                  style={{ fontFamily: F.sans, fontSize: '14px', color: T.textMuted }}
                  onMouseEnter={e => e.currentTarget.style.color = T.text}
                  onMouseLeave={e => e.currentTarget.style.color = T.textMuted}>
                  {c.label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{
        borderTop: `1px solid ${T.line}`,
        padding: '48px clamp(24px, 4vw, 64px) 32px',
        overflow: 'hidden',
      }}>
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
            <div className="flex flex-wrap items-center gap-8">
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lonkarabhishek/' },
                { label: 'Email', href: 'mailto:abhisheksoffice11@gmail.com' },
                { label: 'WhatsApp', href: 'https://wa.me/919403612979' },
              ].map((l, i) => (
                <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                  className="transition-colors duration-300 uppercase"
                  style={{ fontFamily: F.mono, fontSize: '11px', letterSpacing: '0.1em', color: T.textMuted }}
                  onMouseEnter={e => e.currentTarget.style.color = T.text}
                  onMouseLeave={e => e.currentTarget.style.color = T.textMuted}>
                  {l.label}
                </a>
              ))}
            </div>
            <MonoLabel style={{ color: T.textFaint, fontSize: '10px' }}>
              &copy; {new Date().getFullYear()}
            </MonoLabel>
          </div>

          {/* Oversized wordmark */}
          <div className="relative" style={{ height: 'clamp(60px, 10vw, 120px)', overflow: 'hidden' }}>
            <div className="absolute bottom-0 left-0 right-0 select-none pointer-events-none"
              style={{
                fontFamily: F.serif, fontWeight: 400,
                fontSize: 'clamp(5rem, 16vw, 18rem)',
                lineHeight: 0.85, color: 'rgba(20,20,19,0.06)',
                letterSpacing: '-0.04em', textAlign: 'center',
                transform: 'translateY(35%)',
              }}>
              STUDIO
            </div>
          </div>
        </div>
      </footer>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
};
