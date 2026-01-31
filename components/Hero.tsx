import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Linkedin, Mail, MessageCircle, Calendar } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { siteContent } from '../content/site';
import { Section } from './ui/Layout';
import { BookingModal } from './BookingModal';

// Counter component for animated numbers
const AnimatedCounter: React.FC<{ value: string; inView: boolean }> = ({ value, inView }) => {
  const [displayValue, setDisplayValue] = useState('0');

  // Parse the original value to extract number and format
  const cleanValue = value.replace(/,/g, ''); // Remove commas
  const numericValue = parseInt(cleanValue.replace(/\D/g, '')) || 0;
  const hasComma = value.includes(',');
  const suffix = cleanValue.match(/[+%]/) ? cleanValue.match(/[+%]/)?.[0] : '';

  useEffect(() => {
    if (!inView) {
      setDisplayValue('0');
      return;
    }

    const duration = 1500;
    const steps = 40;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        // Format final number with comma if original had it
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

export const Hero: React.FC = () => {
  const { headline, subheadline, stats } = siteContent.hero;
  const [showBooking, setShowBooking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileStatsInView, setMobileStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const mobileStatsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Mobile intersection observer
  useEffect(() => {
    if (!mobileStatsRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMobileStatsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(mobileStatsRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  // Mobile version - redesigned with top bar
  if (isMobile) {
    return (
      <>
        {/* Fixed Top Bar for Mobile */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 active:scale-95 transition-transform"
            >
              <img
                src="/favicon.png"
                alt="Abhishek Lonkar"
                className="w-9 h-9 rounded-xl shadow-sm object-cover"
              />
              <span className="font-semibold text-text-primary text-sm">Abhishek</span>
            </button>
            <button
              onClick={() => setShowBooking(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium shadow-md active:scale-95 transition-transform"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
              }}
            >
              <Calendar size={14} />
              Book Now
            </button>
          </div>
        </div>

        <Section className="pt-20 pb-8 relative overflow-hidden">
          <div className="py-6">
            <div className="max-w-4xl relative z-10">
              {/* Available badge */}
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/5 border border-primary/20 mb-4">
                <Sparkles size={12} className="text-primary mr-1.5" />
                <span className="text-xs text-text-secondary">Available for new projects</span>
              </div>

              {/* Main headline */}
              <h1 className="font-sans text-3xl leading-[1.15] mb-5 font-bold tracking-tight">
                <span className="text-text-primary">I help brands and teams </span>
                <span className="italic text-text-secondary">
                  ship work they can trust.
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base text-text-secondary leading-relaxed mb-6 font-light">
                {subheadline}
              </p>

              {/* Stats Grid - Prominent placement */}
              <div ref={mobileStatsRef} className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat: { number: string; label: string }, i: number) => (
                    <div
                      key={i}
                      className="bg-[#f5f5f0] rounded-2xl p-4 border border-gray-200"
                    >
                      <div
                        className="text-2xl font-bold text-text-primary mb-0.5 tracking-tight"
                        style={{
                          fontFamily: 'Inter, system-ui, sans-serif',
                          fontFeatureSettings: '"zero" 1, "ss01" 1',
                        }}
                      >
                        <AnimatedCounter value={stat.number} inView={mobileStatsInView} />
                      </div>
                      <div className="text-[10px] text-[#64748b] font-medium uppercase tracking-wider leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trusted by */}
              <div className="mb-6 text-center">
                <p className="text-[#64748b] text-xs mb-3">Trusted by teams from</p>
                <div className="flex items-center justify-center gap-5">
                  <img src="/logos/g2logo.jpg" alt="G2" className="h-5 object-contain grayscale opacity-50" />
                  <img src="/logos/cognizantlogo.jpeg" alt="Cognizant" className="h-5 object-contain grayscale opacity-50" />
                  <img src="/logos/levislogo.png" alt="Levi's" className="h-5 object-contain grayscale opacity-50" />
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 mb-6">
                <button
                  onClick={() => setShowBooking(true)}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-white active:scale-95 transition-transform shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                  }}
                >
                  <span className="flex items-center">
                    Book a free call
                    <ArrowRight size={18} className="ml-2" />
                  </span>
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById('work');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center px-8 py-4 border border-border text-text-primary rounded-full font-medium active:scale-95 transition-transform hover:bg-surface-secondary"
                >
                  See selected work
                </button>
              </div>

              {/* Alternative contact */}
              <div>
                <p className="text-text-muted text-xs mb-3">Not ready to meet yet? Send me a message</p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://wa.me/919403612979?text=Hi%20Abhishek%2C%20I%20got%20your%20number%20from%20your%20website.%20Can%20we%20chat%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] active:scale-95 transition-transform"
                    title="WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/lonkarabhishek/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/30 flex items-center justify-center text-[#0A66C2] active:scale-95 transition-transform"
                    title="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={`mailto:${siteContent.footer.email}`}
                    className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary active:scale-95 transition-transform"
                    title="Email"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
      </>
    );
  }

  // Desktop version with animations
  return (
    <Section className="pt-32 md:pt-40 min-h-[100vh] flex flex-col justify-center relative overflow-hidden">
      {/* Background elements - desktop only */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
          top: '-30%',
          right: '-20%',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(8, 145, 178, 0.08) 0%, transparent 70%)',
          bottom: '-20%',
          left: '-10%',
          filter: 'blur(60px)',
        }}
      />

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 relative z-10">
        {/* Left side - Hero content */}
        <div className="flex-1 lg:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 border border-primary/20 mb-6"
            >
              <Sparkles size={14} className="text-primary mr-2" />
              <span className="text-sm text-text-secondary">Available for new projects</span>
            </motion.div>

            <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6 font-bold tracking-tight">
              <span className="text-text-primary">I help brands and teams </span>
              <span className="italic text-text-secondary">
                ship work they can trust.
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 font-light"
          >
            {subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="flex flex-col sm:flex-row gap-4 mb-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(124, 58, 237, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBooking(true)}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-white relative overflow-hidden group shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
              }}
            >
              <span className="relative z-10 flex items-center">
                Book a free call
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, #0891b2, #db2777)',
                }}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#f8fafc' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('work');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 border border-border text-text-primary rounded-full font-medium transition-all hover:border-primary/50"
            >
              See selected work
            </motion.button>
          </motion.div>

          {/* Contact alternatives */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <p className="text-text-muted text-sm mb-3">Not ready to meet yet? Send me a message</p>
            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/919403612979?text=Hi%20Abhishek%2C%20I%20got%20your%20number%20from%20your%20website.%20Can%20we%20chat%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-all"
                title="WhatsApp"
              >
                <MessageCircle size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/lonkarabhishek/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 border border-[#0A66C2]/30 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50 transition-all"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${siteContent.footer.email}`}
                className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/20 hover:border-primary/50 transition-all"
                title="Email"
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Right side - Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="flex-shrink-0 lg:w-[420px] mt-12 lg:mt-0 lg:border-l lg:border-gray-200 lg:pl-12"
        >
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat: { number: string; label: string }, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-default"
              >
                <motion.div
                  className="text-3xl lg:text-4xl font-bold mb-1 tracking-tight"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 4,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontFeatureSettings: '"zero" 1, "ss01" 1',
                    background: 'linear-gradient(90deg, #1a1a2e 0%, #64748b 25%, #1a1a2e 50%, #64748b 75%, #1a1a2e 100%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  <AnimatedCounter value={stat.number} inView={statsInView} />
                </motion.div>
                <div className="text-[10px] text-[#64748b] font-medium uppercase tracking-wider group-hover:text-text-primary transition-colors leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-[#64748b] text-xs mb-3">Trusted by teams from</p>
            <div className="flex items-center justify-center gap-6">
              <img src="/logos/g2logo.jpg" alt="G2" className="h-6 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
              <img src="/logos/cognizantlogo.jpeg" alt="Cognizant" className="h-6 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
              <img src="/logos/levislogo.png" alt="Levi's" className="h-6 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
            </div>
          </div>
        </motion.div>
      </div>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </Section>
  );
};
