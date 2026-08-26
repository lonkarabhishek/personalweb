import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Mail, Linkedin, Calendar, X, ExternalLink, Star } from 'lucide-react';

/* ──────────────────────────── BOOKING MODAL ──────────────────────────── */
const BookingModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl h-[80vh] rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-200"
          onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
                <Calendar size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Book a Call</h3>
                <p className="text-sm text-gray-500">Pick a time that works for you</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl text-gray-400 hover:text-gray-600 transition-colors">
              <X size={20} />
            </button>
          </div>
          <iframe src="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3eFH-K6IQk-3avWVjGYP3Q-vfQZlAe9I-fYLdOobcFweup66Evk9dST6B_7YCz4Rj0cKxys5_o"
            style={{ border: 0 }} width="100%" height="100%" title="Book" className="h-[calc(100%-80px)]" />
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ──────────────────────────── ANIMATED COUNTER ──────────────────────────── */
const AnimatedCounter: React.FC<{ value: string; inView: boolean }> = ({ value, inView }) => {
  const [display, setDisplay] = useState('0');
  const clean = value.replace(/,/g, '');
  const num = parseInt(clean.replace(/\D/g, '')) || 0;
  const hasComma = value.includes(',');
  const suffix = clean.match(/[+%kK]/)?.[0] || '';

  useEffect(() => {
    if (!inView) { setDisplay('0'); return; }
    const steps = 30;
    const inc = num / steps;
    let cur = 0;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= num) { setDisplay((hasComma ? num.toLocaleString() : num.toString()) + suffix); clearInterval(t); }
      else { const n = Math.floor(cur); setDisplay((hasComma ? n.toLocaleString() : n.toString()) + suffix); }
    }, 1200 / steps);
    return () => clearInterval(t);
  }, [inView, num, hasComma, suffix]);

  return <>{display}</>;
};

/* ──────────────────────────── DATA ──────────────────────────── */
const projects = [
  {
    title: 'Haddu Clothing',
    desc: 'Premium online fashion store with full e-commerce, inventory management, and payment integration.',
    highlight: '80k monthly views on Pinterest',
    highlightLink: 'https://pin.it/71a3yvH2u',
    link: 'https://www.hadduclothing.com/',
    tag: 'E-Commerce + Marketing',
  },
  {
    title: 'JSB Foods',
    desc: 'Clean, modern website for a food brand — built to showcase products and build trust with customers.',
    link: 'https://jsb-foods.vercel.app',
    tag: 'Website',
  },
  {
    title: 'TapTurf',
    desc: 'Sports venue booking platform that makes finding and reserving a turf near you dead simple.',
    link: 'https://tapturf.in/',
    tag: 'Web App',
  },
  {
    title: 'Deft Chemistry',
    desc: 'A refined web presence for a chemistry-focused brand — elegant, informative, and conversion-ready.',
    link: 'https://deft-chemistry-redefined.vercel.app',
    tag: 'Website',
  },
  {
    title: 'The Nashik Kumbh',
    desc: 'Multilingual website (EN/HI/MR) for Nashik Kumbh Mela 2027 — bathing dates, travel info, holy sites.',
    link: 'https://thenashikkumbh.com',
    tag: 'Multilingual · Live',
  },
  {
    title: 'SD Overseas',
    desc: 'Professional website for an international trading company — built to establish global credibility.',
    link: 'https://sd-overseas.vercel.app/',
    tag: 'Website',
  },
  {
    title: 'BarKit',
    desc: '7 handy Mac menu bar apps — clipboard history, screenshot manager, Wi-Fi monitor, and more.',
    link: 'https://workwithabhi.online/#/barkit',
    tag: 'Open Source',
  },
  {
    title: 'One Gram Jewelry',
    desc: 'Online jewelry store in development — focused on making customers feel confident buying online.',
    tag: 'E-Commerce · Coming Soon',
  },
];

const stats = [
  { value: '10+', label: 'Clients' },
  { value: '80k', label: 'Pinterest Views' },
  { value: '100+', label: 'Dashboards' },
  { value: '6+', label: 'Years' },
];

/* ──────────────────────────── PAGE ──────────────────────────── */
export const StudioPage: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ─── NAV ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3">
            <img src="/favicon.png" alt="AL" className="w-9 h-9 rounded-xl object-cover shadow-sm" />
            <div className="hidden sm:block">
              <span className="font-semibold text-sm text-gray-900 block leading-tight">Abhishek Lonkar</span>
              <span className="text-[11px] text-gray-400 tracking-wide uppercase">Digital Studio</span>
            </div>
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="https://workwithabhi.online" className="text-sm text-gray-500 hover:text-gray-900 transition-colors px-3 py-2 hidden sm:block">
              Main Site
            </a>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setShowBooking(true)}
              className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors">
              Book a Call
            </motion.button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="pt-32 sm:pt-40 pb-20 sm:pb-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
              <span className="text-sm text-emerald-700 font-medium">Available for new projects</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="text-[2.5rem] sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
            I build websites & stores{' '}
            <span className="text-gray-400">for businesses that want things done right.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Websites, online stores, dashboards, and digital marketing. No tech headaches — just things that work and grow your business.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setShowBooking(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors group">
              <Calendar size={18} className="mr-2" />
              Book a free call
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <a href="#work"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-gray-200 text-gray-700 font-medium rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all">
              See my work
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div ref={statsRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-4 gap-4 sm:gap-8 mt-16 sm:mt-20 max-w-xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                  <AnimatedCounter value={s.value} inView={statsInView} />
                </div>
                <div className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── WORK ─── */}
      <section id="work" className="py-20 sm:py-28 px-6 bg-gray-50/70">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Selected Work</h2>
            <p className="text-gray-500 text-lg">Real projects, real clients, real results.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="bg-white rounded-2xl p-7 sm:p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all h-full flex flex-col group">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400 px-3 py-1 rounded-full bg-gray-50 border border-gray-100">
                      {p.tag}
                    </span>
                    <span className="text-3xl font-extralight text-gray-200 leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-500 leading-relaxed mb-4 flex-grow">{p.desc}</p>

                  {p.highlight && (
                    <a href={p.highlightLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200 mb-4 group/hl hover:bg-amber-100 transition-colors">
                      <Star size={14} className="text-amber-500 fill-amber-500" />
                      <span className="text-sm font-medium text-amber-800">{p.highlight}</span>
                      <ArrowUpRight size={14} className="text-amber-500 group-hover/hl:translate-x-0.5 group-hover/hl:-translate-y-0.5 transition-transform" />
                    </a>
                  )}

                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors mt-auto">
                      Visit site <ArrowUpRight size={15} className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400 mt-auto">Coming soon</span>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU GET ─── */}
      <section className="py-20 sm:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">What You Get</h2>
            <p className="text-gray-500 text-lg">No middlemen, no tickets, no drama.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: '🛒', title: 'Online Stores That Sell', desc: 'Fast, beautiful shops that work on every device. Payment, inventory, shipping — all handled.' },
              { emoji: '📊', title: 'Dashboards That Clarify', desc: '100+ dashboards built. I turn your data into decisions you can actually act on.' },
              { emoji: '📌', title: 'Marketing That Reaches', desc: 'Pinterest, social, SEO — I help your brand get seen. 80k monthly views for one client.' },
              { emoji: '🤝', title: 'Direct Communication', desc: "You talk to me, not a helpdesk. Something breaks? I fix it. No chasing, no waiting." },
              { emoji: '🚀', title: 'Launch & Beyond', desc: "I don't disappear on launch day. Your success is my reputation — I stick around." },
              { emoji: '💡', title: 'Vague Idea? No Problem', desc: "Most people don't start with a perfect plan. I'll help you figure out what you actually need." },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="p-7 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all h-full bg-white">
                  <span className="text-3xl mb-4 block">{s.emoji}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{s.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 sm:py-28 px-6 bg-gray-50/70">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">What People Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <motion.a key={i} href="https://www.linkedin.com/in/lonkarabhishek/details/recommendations/"
                target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all h-full cursor-pointer group">
                  <div className="flex items-center gap-1 mb-5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 italic text-lg">"{t.text}"</p>
                  <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                    <div>
                      <p className="font-semibold text-gray-900">{t.name}</p>
                      <p className="text-sm text-gray-400">{t.role}</p>
                    </div>
                    <ArrowUpRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                  </div>
                </motion.div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPANIES MARQUEE ─── */}
      <section className="py-14 overflow-hidden border-y border-gray-100">
        <div className="text-center mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">Worked with & Trusted by</p>
        </div>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
          <div className="overflow-hidden">
            <div className="flex items-center gap-10 animate-studio-marquee" style={{ width: 'max-content' }}>
              {[...Array(2)].flatMap(() => [
                { name: 'G2', logo: '/logos/g2logo.jpg' },
                { name: 'Cognizant', logo: '/logos/cognizantlogo.jpeg' },
                { name: "Levi's", logo: '/logos/levislogo.png' },
                { name: 'Haddu', logo: '/logos/haddulogo.webp' },
                { name: 'Nurturing Green', logo: '/logos/nurturinggreenlogo.png' },
                { name: 'KIST', logo: '/logos/KIST_Logo.jpg' },
                { name: 'EDC', logo: '/logos/entrepreneurship_development_cell_vit_logo.jpeg' },
              ]).map((c, i) => (
                <div key={i} className="flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100">
                  <img src={c.logo} alt={c.name} className="w-8 h-8 rounded-lg object-contain" />
                  <span className="text-sm font-medium text-gray-500 whitespace-nowrap">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @keyframes studioMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-studio-marquee { animation: studioMarquee 22s linear infinite; }
          .animate-studio-marquee:hover { animation-play-state: paused; }
        `}</style>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 sm:py-32 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            Have a project in mind?{' '}
            <span className="text-gray-400">Let's talk — it's free.</span>
          </motion.h2>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setShowBooking(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors group">
              <Calendar size={18} className="mr-2" />
              Book a free call
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-8">
            <a href="https://wa.me/919403612979?text=Hi%20Abhishek%2C%20I%20visited%20your%20studio%20site.%20Can%20we%20chat%3F"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              WhatsApp
            </a>
            <span className="text-gray-300">·</span>
            <a href="mailto:abhisheksoffice11@gmail.com" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              <Mail size={16} /> Email
            </a>
            <span className="text-gray-300">·</span>
            <a href="https://www.linkedin.com/in/lonkarabhishek/" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
              <Linkedin size={16} /> LinkedIn
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="AL" className="w-7 h-7 rounded-lg object-cover" />
            <div>
              <span className="font-semibold text-sm text-gray-900">Abhishek Lonkar</span>
              <span className="text-xs text-gray-400 ml-2">Pune, India</span>
            </div>
          </div>
          <div className="flex items-center gap-5 text-sm text-gray-400">
            <a href="https://workwithabhi.online" className="hover:text-gray-900 transition-colors font-medium">
              Main Site →
            </a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
};
