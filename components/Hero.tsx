import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Section } from './ui/Layout';
import { BookingModal } from './BookingModal';

export const Hero: React.FC = () => {
  const { headline, subheadline, primaryCta, secondaryCta, stats } = siteContent.hero;
  const [showBooking, setShowBooking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  // Mobile version - no framer-motion animations
  if (isMobile) {
    return (
      <Section className="pt-32 min-h-[100vh] flex flex-col justify-center relative overflow-hidden">
        <div className="max-w-4xl relative z-10">
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Sparkles size={14} className="text-primary mr-2" />
              <span className="text-sm text-white/70">Available for new projects</span>
            </div>

            <h1 className="font-serif text-4xl leading-[1.1] mb-8 font-medium">
              <span className="text-white">I help brands and teams </span>
              <span
                className="inline-block"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                ship work they can trust.
              </span>
            </h1>
          </div>

          <p className="text-xl text-white/60 leading-relaxed max-w-2xl mb-10 font-light">
            {subheadline}
          </p>

          <div className="flex flex-col gap-4 mb-6">
            <button
              onClick={() => setShowBooking(true)}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-white active:scale-95 transition-transform"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              }}
            >
              <span className="flex items-center">
                {primaryCta}
                <ArrowRight size={18} className="ml-2" />
              </span>
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('work');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white rounded-full font-medium active:scale-95 transition-transform"
            >
              {secondaryCta}
            </button>
          </div>

          {/* Contact alternatives */}
          <div className="mb-16">
            <p className="text-white/40 text-sm mb-3">Not ready to meet yet? Send me a message</p>
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

          <div className="border-t border-white/10 pt-8">
            <div className="grid grid-cols-1 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 text-white/60"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                    }}
                  >
                    <CheckCircle2 size={12} className="text-white" />
                  </div>
                  <span className="text-sm font-medium tracking-wide">{stat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
      </Section>
    );
  }

  // Desktop version with animations
  return (
    <Section className="pt-32 md:pt-48 min-h-[100vh] flex flex-col justify-center relative overflow-hidden">
      {/* Background elements - desktop only */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          top: '-30%',
          right: '-20%',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          bottom: '-20%',
          left: '-10%',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Sparkles size={14} className="text-primary mr-2" />
            <span className="text-sm text-white/70">Available for new projects</span>
          </motion.div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-8 font-medium">
            <span className="text-white">I help brands and teams </span>
            <span
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ship work they can trust.
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl mb-10 font-light"
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
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(139, 92, 246, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBooking(true)}
            className="inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-white relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
            }}
          >
            <span className="relative z-10 flex items-center">
              {primaryCta}
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, #06b6d4, #ec4899)',
              }}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('work');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white rounded-full font-medium transition-all hover:border-primary/50"
          >
            {secondaryCta}
          </motion.button>
        </motion.div>

        {/* Contact alternatives */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="mb-16"
        >
          <p className="text-white/40 text-sm mb-3">Not ready to meet yet? Send me a message</p>
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="border-t border-white/10 pt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 text-white/60 group cursor-default"
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  }}
                >
                  <CheckCircle2 size={12} className="text-white" />
                </div>
                <span className="text-sm font-medium tracking-wide group-hover:text-white transition-colors">{stat}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </Section>
  );
};
