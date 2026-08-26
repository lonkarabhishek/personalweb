import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ExternalLink, Sparkles, Lock, Globe, Mail, Linkedin, Calendar, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ──────────────────────────── PALETTE ──────────────────────────── */
const C = {
  bg: '#0a0a0f',
  bgCard: '#111118',
  bgCardHover: '#16161f',
  bgSurface: '#0e0e15',
  gold: '#c9a84c',
  goldLight: '#e4cc7a',
  goldDark: '#a88a34',
  cream: '#f5f0e8',
  creamMuted: '#b8b0a2',
  creamDim: '#8a8278',
  border: '#1e1e2a',
  borderLight: '#2a2a38',
  purple: '#7c3aed',
  cyan: '#0891b2',
};

/* ──────────────────────────── BOOKING MODAL ──────────────────────────── */
const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const calendarUrl = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3eFH-K6IQk-3avWVjGYP3Q-vfQZlAe9I-fYLdOobcFweup66Evk9dST6B_7YCz4Rj0cKxys5_o";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: C.bgCard, border: `1px solid ${C.border}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4" style={{ borderBottom: `1px solid ${C.border}` }}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})` }}>
                  <Calendar size={20} color={C.bg} />
                </div>
                <div>
                  <h3 style={{ color: C.cream }} className="font-semibold">Book an Appointment</h3>
                  <p style={{ color: C.creamDim }} className="text-sm">Choose a time that works for you</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl transition-colors" style={{ color: C.creamMuted }}>
                <X size={20} />
              </button>
            </div>
            <div className="w-full h-[calc(100%-80px)]" style={{ background: '#fff' }}>
              <iframe src={calendarUrl} style={{ border: 0 }} width="100%" height="100%" title="Book an appointment" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ──────────────────────────── ANIMATED COUNTER ──────────────────────────── */
const AnimatedCounter: React.FC<{ value: string; inView: boolean }> = ({ value, inView }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const cleanValue = value.replace(/,/g, '');
  const numericValue = parseInt(cleanValue.replace(/\D/g, '')) || 0;
  const hasComma = value.includes(',');
  const suffix = cleanValue.match(/[+%]/) ? cleanValue.match(/[+%]/)?.[0] : '';

  useEffect(() => {
    if (!inView) { setDisplayValue('0'); return; }
    const duration = 1500;
    const steps = 40;
    const increment = numericValue / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        const finalNum = hasComma ? numericValue.toLocaleString() : numericValue.toString();
        setDisplayValue(finalNum + suffix);
        clearInterval(timer);
      } else {
        const currentNum = Math.floor(current);
        const formattedNum = hasComma ? currentNum.toLocaleString() : currentNum.toString();
        setDisplayValue(formattedNum + suffix);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, numericValue, hasComma, suffix]);

  return <>{displayValue}</>;
};

/* ──────────────────────────── STUDIO NAVBAR ──────────────────────────── */
const StudioNav: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  if (isMobile) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between"
        style={{
          background: scrolled ? 'rgba(10,10,15,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
          <img src="/favicon.png" alt="AL" className="w-8 h-8 rounded-lg object-cover" />
          <span style={{ color: C.cream }} className="font-semibold text-sm tracking-wide">STUDIO</span>
        </button>
        <button onClick={onBook}
          className="px-4 py-2 rounded-full text-sm font-medium"
          style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`, color: C.bg }}>
          Book a Call
        </button>
      </div>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed top-0 left-0 right-0 z-50 px-8 pt-4"
    >
      <div className="max-w-6xl mx-auto rounded-2xl transition-all duration-500 ease-out px-6 py-4 flex items-center justify-between"
        style={{
          background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
        }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group flex items-center space-x-3 cursor-pointer">
          <motion.img src="/favicon.png" alt="Abhishek Lonkar" whileHover={{ rotate: 10, scale: 1.1 }} className="w-10 h-10 rounded-xl shadow-md object-cover" />
          <div>
            <span className="text-lg font-bold tracking-tight block" style={{ color: C.cream }}>Abhishek Lonkar</span>
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: C.gold }}>Digital Studio</span>
          </div>
        </button>
        <div className="flex items-center space-x-1">
          {['work', 'services', 'process', 'about'].map((id) => (
            <button key={id} onClick={() => scrollTo(id)}
              className="px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors"
              style={{ color: C.creamMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.cream)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.creamMuted)}>
              {id}
            </button>
          ))}
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onBook}
            className="ml-3 px-6 py-2.5 rounded-full text-sm font-medium shadow-lg"
            style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`, color: C.bg }}>
            Book a Call
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

/* ──────────────────────────── STUDIO HERO ──────────────────────────── */
const StudioHero: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 80]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);

  const stats = [
    { number: '10+', label: 'Happy Clients' },
    { number: '100,000+', label: 'People Reached' },
    { number: '100+', label: 'Dashboards Built' },
    { number: '6+', label: 'Years Experience' },
  ];

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: C.bg }}>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(${C.cream} 1px, transparent 1px), linear-gradient(90deg, ${C.cream} 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Radial glow */}
      <div className="absolute w-[800px] h-[800px] rounded-full pointer-events-none" style={{
        background: `radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)`,
        top: '-20%', right: '-15%', filter: 'blur(80px)',
      }} />
      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none" style={{
        background: `radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)`,
        bottom: '-15%', left: '-10%', filter: 'blur(80px)',
      }} />

      <motion.div style={isMobile ? {} : { opacity, y }} className="w-full px-6 md:px-12 lg:px-24 pt-32 md:pt-40 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
            {/* Left */}
            <div className="flex-1 lg:max-w-2xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 rounded-full mb-8"
                  style={{ background: `${C.gold}10`, border: `1px solid ${C.gold}30` }}>
                  <Sparkles size={14} style={{ color: C.gold }} className="mr-2" />
                  <span className="text-sm" style={{ color: C.creamMuted }}>Taking on new projects</span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.08] mb-8 font-bold tracking-tight">
                  <span style={{ color: C.cream }}>You run the business.</span>
                  <br />
                  <span className="italic" style={{ color: C.creamDim }}>I'll handle the tech.</span>
                </h1>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
                className="text-lg md:text-xl leading-relaxed mb-10 font-light" style={{ color: C.creamMuted }}>
                I build websites, online stores, and dashboards for businesses that want things done right. No tech headaches — just things that work.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onBook}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full font-medium shadow-lg group"
                  style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`, color: C.bg }}>
                  <Calendar size={18} className="mr-2" />
                  Book a free call
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => { const el = document.getElementById('work'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full font-medium transition-all"
                  style={{ color: C.cream, border: `1px solid ${C.borderLight}` }}>
                  See my work
                </motion.button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
                <p className="text-sm mb-3" style={{ color: C.creamDim }}>Not ready for a call? Just say hi</p>
                <div className="flex items-center gap-3">
                  <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://wa.me/919403612979?text=Hi%20Abhishek%2C%20I%20visited%20your%20studio%20site.%20Can%20we%20chat%3F"
                    target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                    style={{ background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', color: '#25D366' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.1, y: -2 }} href="https://www.linkedin.com/in/lonkarabhishek/"
                    target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                    style={{ background: 'rgba(10,102,194,0.1)', border: '1px solid rgba(10,102,194,0.3)', color: '#0A66C2' }}>
                    <Linkedin size={18} />
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.1, y: -2 }} href="mailto:abhisheksoffice11@gmail.com"
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                    style={{ background: `${C.gold}10`, border: `1px solid ${C.gold}30`, color: C.gold }}>
                    <Mail size={18} />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Right — Stats */}
            <motion.div ref={statsRef} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
              className="flex-shrink-0 lg:w-[380px] mt-16 lg:mt-0 lg:pl-12" style={{ borderLeft: isMobile ? 'none' : `1px solid ${C.border}` }}>
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }} className="group cursor-default">
                    <div className="text-3xl lg:text-4xl font-bold mb-1 tracking-tight" style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontFeatureSettings: '"zero" 1, "ss01" 1',
                      background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                      <AnimatedCounter value={stat.number} inView={statsInView} />
                    </div>
                    <div className="text-[10px] font-medium uppercase tracking-wider leading-tight transition-colors"
                      style={{ color: C.creamDim }}>{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 pt-6 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
                <p className="text-xs mb-3" style={{ color: C.creamDim }}>Worked with</p>
                <div className="flex items-center justify-center gap-6">
                  {['/logos/g2logo.jpg', '/logos/cognizantlogo.jpeg', '/logos/levislogo.png'].map((logo, i) => (
                    <img key={i} src={logo} alt="" className="h-5 object-contain opacity-40 hover:opacity-80 transition-opacity" style={{ filter: 'brightness(2) grayscale(1)' }} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            className="hidden md:flex justify-center mt-16">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ color: C.creamDim }}>
              <ChevronDown size={24} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

/* ──────────────────────────── SELECTED WORK ──────────────────────────── */
const projects = [
  {
    title: 'Haddu Clothing',
    description: 'A premium online clothing store. Fast, clean, and built to grow without needing constant fixes.',
    link: 'https://www.hadduclothing.com/',
    linkText: 'hadduclothing.com',
    tag: 'E-Commerce',
  },
  {
    title: 'TapTurf',
    description: 'A sports venue booking app that makes it dead simple to find and book a turf near you.',
    link: 'https://tapturf.in/',
    linkText: 'tapturf.in',
    tag: 'Web App',
  },
  {
    title: 'The Nashik Kumbh',
    description: 'A website for Nashik Kumbh Mela 2027. Covers bathing dates, travel info, and holy sites. Available in English, Hindi, and Marathi.',
    link: 'https://thenashikkumbh.com',
    linkText: 'thenashikkumbh.com',
    tag: 'Multilingual',
    status: 'Live',
  },
  {
    title: 'Data & Analytics',
    description: "I've built 100+ dashboards that help teams understand their revenue, customers, and operations at a glance.",
    link: 'https://public.tableau.com/app/profile/abhishek.lonkar/viz/AbhishekLonkar-RocketlaneAssignmentPartA/Dashboard1?publish=yes',
    linkText: 'View Tableau Dashboard',
    tag: 'Dashboards',
    note: 'Most analytics work is confidential — happy to walk through it on a call.',
  },
  {
    title: 'BarKit',
    description: 'A set of 7 handy Mac apps that sit in your menu bar. Clipboard history, screenshot manager, Wi-Fi monitor, and more.',
    internalRoute: '/barkit',
    linkText: 'View BarKit Tools',
    tag: 'Open Source',
  },
  {
    title: 'One Gram Jewelry Store',
    description: 'An online jewelry store currently in the works. Focused on making customers feel confident buying online.',
    tag: 'E-Commerce',
    inProgress: true,
  },
];

const SelectedWork: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);

  return (
    <section id="work" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ background: C.bg }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="font-medium tracking-[0.2em] text-xs uppercase mb-4 block" style={{ color: C.gold }}>Selected Work</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16" style={{ color: C.cream }}>
            Things I've <span className="italic" style={{ color: C.creamDim }}>built</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <motion.div whileHover={isMobile ? {} : { y: -4, scale: 1.01 }}
                className="group block p-8 md:p-10 rounded-2xl transition-all duration-300 relative overflow-hidden"
                style={{ background: C.bgCard, border: `1px solid ${C.border}` }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${C.gold}40`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; }}>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${C.gold}08 0%, transparent 60%)` }} />

                <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
                  <div className="text-4xl md:text-5xl font-extralight tracking-tight flex-shrink-0" style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontFeatureSettings: '"zero" 1, "ss01" 1',
                    color: `${C.cream}20`,
                  }}>
                    {String(i + 1).padStart(2, '0')}.
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: C.cream }}>{project.title}</h3>
                      <span className="px-3 py-0.5 text-xs font-medium rounded-full" style={{ background: `${C.gold}15`, color: C.gold, border: `1px solid ${C.gold}25` }}>
                        {project.tag}
                      </span>
                      {project.inProgress && (
                        <span className="px-3 py-0.5 text-xs font-medium rounded-full flex items-center" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>
                          <Sparkles size={10} className="mr-1" /> Coming Soon
                        </span>
                      )}
                      {project.status && (
                        <span className="px-3 py-0.5 text-xs font-medium rounded-full flex items-center" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)' }}>
                          <Globe size={10} className="mr-1" /> {project.status}
                        </span>
                      )}
                    </div>
                    <p className="text-lg leading-[1.7] mb-4" style={{ color: C.creamMuted }}>{project.description}</p>

                    {project.note && (
                      <div className="flex items-center text-sm mb-4 italic" style={{ color: C.creamDim }}>
                        <Lock size={14} className="mr-2" /> {project.note}
                      </div>
                    )}

                    {project.internalRoute ? (
                      <Link to={project.internalRoute} className="inline-flex items-center font-medium text-sm" style={{ color: C.gold }}>
                        {project.linkText} <ArrowRight size={16} className="ml-1" />
                      </Link>
                    ) : project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center font-medium text-sm" style={{ color: C.gold }}>
                        {project.linkText} <ArrowUpRight size={16} className="ml-1" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────── SERVICES ──────────────────────────── */
const services = [
  { title: 'Online stores that actually sell', description: 'I build online shops that look great, load fast, and make it easy for your customers to buy. Works perfectly on phones, shows up on Google, and connects to your payment system.' },
  { title: "I don't vanish after launch", description: "You talk directly to me, not a helpdesk. If something breaks or needs changing, I'm the one who fixes it. No chasing, no waiting, no tickets." },
  { title: 'Got a vague idea? I\'ll make it concrete', description: "Most people don't start with a perfect plan, and that's totally fine. I'll help you figure out what you actually need, what it'll cost, and how long it'll take." },
  { title: 'Numbers that actually make sense', description: "I turn your business data into simple dashboards you can actually understand. Know what's working, what's not, and what to do next." },
  { title: 'No drama, no delays', description: "I keep things simple and on schedule. You'll always know what's happening, what's next, and when it'll be done." },
];

const Services: React.FC = () => (
  <section id="services" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ background: C.bgSurface }}>
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="font-medium tracking-[0.2em] text-xs uppercase mb-4 block" style={{ color: C.gold }}>What I Do</span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16" style={{ color: C.cream }}>
          How I can <span className="italic" style={{ color: C.creamDim }}>help you</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -8 }}
            className="p-8 rounded-2xl transition-all duration-300 group relative overflow-hidden"
            style={{ background: C.bgCard, border: `1px solid ${C.border}` }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 0%, ${C.gold}06 0%, transparent 60%)` }} />
            <div className="relative z-10">
              <div className="text-4xl font-extralight mb-6 tracking-tight" style={{
                fontFamily: 'Inter, system-ui, sans-serif', fontFeatureSettings: '"zero" 1, "ss01" 1', color: `${C.gold}40`,
              }}>{String(i + 1).padStart(2, '0')}.</div>
              <h3 className="text-lg font-bold tracking-tight mb-4" style={{ color: C.cream }}>{s.title}</h3>
              <p className="leading-[1.7]" style={{ color: C.creamMuted }}>{s.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ──────────────────────────── PROCESS ──────────────────────────── */
const processSteps = [
  { title: 'We talk about what you need', description: "No forms, no questionnaires. We hop on a call, you tell me what you're trying to do, and I'll ask the right questions." },
  { title: 'I figure out the best way to do it', description: "I'll cut through the noise and keep it simple. No unnecessary features, no bloat. Just the stuff that actually matters." },
  { title: 'I build it properly the first time', description: "Everything is built so it's easy to update later. By me, by you, or by someone else. No mess, no shortcuts." },
  { title: 'I test it like a real person would', description: "I check it on phones, on slow internet, on weird browsers. When your customers use it, it just works." },
  { title: 'I launch it and stick around', description: "I don't disappear on launch day. If something comes up, I'm a message away. Your success is my reputation." },
];

const Process: React.FC = () => (
  <section id="process" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ background: C.bg }}>
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="font-medium tracking-[0.2em] text-xs uppercase mb-4 block" style={{ color: C.gold }}>How It Works</span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16" style={{ color: C.cream }}>
          Simple <span className="italic" style={{ color: C.creamDim }}>process</span>
        </h2>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px hidden md:block" style={{ background: `linear-gradient(180deg, ${C.gold}40, ${C.gold}10)` }} />

        <div className="space-y-12 md:space-y-16">
          {processSteps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex gap-6 md:gap-10">
              <div className="flex-shrink-0 relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: C.bgCard, border: `1px solid ${C.gold}30` }}>
                  <span className="text-lg md:text-xl font-bold" style={{
                    fontFamily: 'Inter, system-ui, sans-serif', fontFeatureSettings: '"zero" 1, "ss01" 1', color: C.gold,
                  }}>{String(i + 1).padStart(2, '0')}</span>
                </div>
              </div>
              <div className="pt-2 md:pt-3">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3" style={{ color: C.cream }}>{step.title}</h3>
                <p className="text-base md:text-lg leading-[1.7]" style={{ color: C.creamMuted }}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ──────────────────────────── TESTIMONIALS ──────────────────────────── */
const testimonials = [
  {
    name: 'Syed Rahman',
    role: 'GTM Ops & Analytics, 6sense',
    text: "I had the pleasure of managing Abhishek during his time at G2. He consistently brought a positive attitude, strong work ethic, and genuine curiosity to his work. What stood out most was how much ownership he took over time. He built strong relationships with stakeholders and became a trusted partner.",
  },
  {
    name: 'Mitch Osborne',
    role: 'Director of Business Systems, G2',
    text: "I worked closely with Abhishek in the RevOps organization at G2, where he supported our GTM teams through reporting and analytics. One of our most impactful collaborations was the overhaul of ARR waterfall reporting. His work improved visibility for senior leadership and supported better forecasting.",
  },
];

const Testimonials: React.FC = () => (
  <section className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ background: C.bgSurface }}>
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="font-medium tracking-[0.2em] text-xs uppercase mb-4 block" style={{ color: C.gold }}>Testimonials</span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-16" style={{ color: C.cream }}>
          People I've <span className="italic" style={{ color: C.creamDim }}>worked with</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t, i) => (
          <motion.a key={i} href="https://www.linkedin.com/in/lonkarabhishek/details/recommendations/" target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            whileHover={{ y: -8 }}
            className="block p-8 md:p-10 rounded-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden"
            style={{ background: C.bgCard, border: `1px solid ${C.border}` }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 0%, ${C.gold}06 0%, transparent 60%)` }} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${C.gold}10` }}>
                  <span style={{ color: C.gold, fontSize: '20px' }}>"</span>
                </div>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
              </div>
              <p className="italic leading-relaxed mb-8 text-lg" style={{ color: C.creamMuted }}>"{t.text}"</p>
              <div className="pt-6" style={{ borderTop: `1px solid ${C.border}` }}>
                <p className="font-semibold text-lg" style={{ color: C.cream }}>{t.name}</p>
                <p className="text-sm" style={{ color: C.gold }}>{t.role}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

/* ──────────────────────────── ABOUT ──────────────────────────── */
const StudioAbout: React.FC = () => (
  <section id="about" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-24" style={{ background: C.bg }}>
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="font-medium tracking-[0.2em] text-xs uppercase mb-4 block" style={{ color: C.gold }}>About Me</span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12" style={{ color: C.cream }}>
          My <span className="italic" style={{ color: C.creamDim }}>story</span>
        </h2>
      </motion.div>

      {[
        "I started out as an engineer, building systems, writing code, and figuring out how things connect. That's where I learned to think clearly and build things that actually work.",
        "Then I joined G2, one of the biggest software review platforms, where I went from crunching data to helping teams make better decisions. I learned that it's not just about building things. It's about building the right things.",
        "Today, I do both. I build websites and online stores for businesses, and I help teams make sense of their data. Whether it's a storefront or a dashboard, the goal is always the same: make it work, keep it simple, and earn your trust.",
      ].map((text, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
          className="flex gap-6 p-6 rounded-2xl mb-6 transition-all group"
          style={{ background: C.bgCard, border: `1px solid ${C.border}` }}>
          <div className="text-4xl md:text-5xl font-extralight tracking-tight flex-shrink-0" style={{
            fontFamily: 'Inter, system-ui, sans-serif', fontFeatureSettings: '"zero" 1, "ss01" 1', color: `${C.gold}40`,
          }}>{String(i + 1).padStart(2, '0')}.</div>
          <p className="text-lg leading-[1.8]" style={{ color: C.creamMuted }}>{text}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

/* ──────────────────────────── COMPANIES ──────────────────────────── */
const StudioCompanies: React.FC = () => {
  const companies = [
    { name: 'Cognizant', logo: '/logos/cognizantlogo.jpeg' },
    { name: "Levi's", logo: '/logos/levislogo.png' },
    { name: 'G2', logo: '/logos/g2logo.jpg' },
    { name: 'Haddu', logo: '/logos/haddulogo.webp' },
    { name: 'Nurturing Green', logo: '/logos/nurturinggreenlogo.png' },
    { name: 'KIST', logo: '/logos/KIST_Logo.jpg' },
    { name: 'EDC', logo: '/logos/entrepreneurship_development_cell_vit_logo.jpeg' },
    { name: 'DefeatCovid', logo: '/logos/defeat_covid_19_logo.jpeg' },
  ];
  const doubled = [...companies, ...companies];

  return (
    <section className="py-16 overflow-hidden" style={{ background: C.bgSurface }}>
      <div className="text-center mb-10 px-6">
        <span className="font-medium tracking-[0.2em] text-xs uppercase mb-4 block" style={{ color: C.gold }}>Experience</span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: C.cream }}>
          Trusted by Leading <span className="italic" style={{ color: C.creamDim }}>Organizations</span>
        </h2>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${C.bgSurface}, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${C.bgSurface}, transparent)` }} />
        <div className="overflow-hidden">
          <div className="flex items-center gap-8 md:gap-12 animate-studio-marquee" style={{ width: 'max-content' }}>
            {doubled.map((c, i) => (
              <div key={`${c.name}-${i}`} className="flex-shrink-0">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl p-3 md:p-4 flex items-center justify-center transition-all"
                  style={{ background: C.bgCard, border: `1px solid ${C.border}` }}>
                  <img src={c.logo} alt={c.name} className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes studioMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-studio-marquee { animation: studioMarquee 18s linear infinite; }
        .animate-studio-marquee:hover { animation-play-state: paused; }
      `}</style>
    </section>
  );
};

/* ──────────────────────────── CTA ──────────────────────────── */
const StudioCTA: React.FC<{ onBook: () => void }> = ({ onBook }) => (
  <section className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 text-center overflow-hidden" style={{ background: C.bg }}>
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-30"
        style={{ background: `radial-gradient(circle, ${C.gold}12 0%, transparent 70%)` }} />
    </div>

    <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="text-3xl md:text-5xl lg:text-6xl max-w-4xl mx-auto leading-tight relative z-10 font-bold tracking-tight" style={{ color: C.cream }}>
      Ready to get your project{' '}
      <span className="italic" style={{ color: C.creamDim }}>up and running?</span>
      {' '}Let's have a quick chat.{' '}
      <span className="italic" style={{ color: C.creamDim }}>It's free.</span>
    </motion.h2>

    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 relative z-10">
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onBook}
        className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-medium shadow-lg relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`, color: C.bg }}>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          animation: 'shine 2s ease-in-out infinite',
        }} />
        <span className="relative z-10 flex items-center">
          <Calendar size={18} className="mr-2" />
          Book a free call
          <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </span>
      </motion.button>
    </motion.div>

    <motion.a initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
      href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3eFH-K6IQk-3avWVjGYP3Q-vfQZlAe9I-fYLdOobcFweup66Evk9dST6B_7YCz4Rj0cKxys5_o"
      target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center mt-8 text-sm relative z-10 transition-colors" style={{ color: C.creamDim }}>
      <ExternalLink size={14} className="mr-2" /> Or open in Google Calendar
    </motion.a>

    <style>{`@keyframes shine { 0% { transform: translateX(-100%); } 50%, 100% { transform: translateX(100%); } }`}</style>
  </section>
);

/* ──────────────────────────── STUDIO FOOTER ──────────────────────────── */
const StudioFooter: React.FC = () => (
  <footer className="py-12 px-6 md:px-12 lg:px-24" style={{ background: C.bgSurface, borderTop: `1px solid ${C.border}` }}>
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src="/favicon.png" alt="AL" className="w-8 h-8 rounded-lg object-cover" />
          <div>
            <span className="font-bold text-sm block" style={{ color: C.cream }}>Abhishek Lonkar</span>
            <span className="text-xs" style={{ color: C.creamDim }}>Digital Studio · Pune, India</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm" style={{ color: C.creamDim }}>
          <a href="mailto:abhisheksoffice11@gmail.com" className="hover:opacity-80 transition-opacity">Email</a>
          <a href="https://www.linkedin.com/in/lonkarabhishek/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">LinkedIn</a>
          <Link to="/" className="hover:opacity-80 transition-opacity" style={{ color: C.gold }}>Main Site →</Link>
        </div>
      </div>
      <div className="mt-8 pt-6 text-center text-xs" style={{ borderTop: `1px solid ${C.border}`, color: C.creamDim }}>
        © {new Date().getFullYear()} Abhishek Lonkar. All rights reserved.
      </div>
    </div>
  </footer>
);

/* ──────────────────────────── MAIN PAGE ──────────────────────────── */
export const StudioPage: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div style={{ background: C.bg, color: C.cream, minHeight: '100vh' }}>
      <StudioNav onBook={() => setShowBooking(true)} />
      <StudioHero onBook={() => setShowBooking(true)} />
      <SelectedWork />
      <Services />
      <Process />
      <Testimonials />
      <StudioAbout />
      <StudioCompanies />
      <StudioCTA onBook={() => setShowBooking(true)} />
      <StudioFooter />
      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
};
