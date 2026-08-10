import React from 'react';
import { Linkedin, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Section } from './ui/Layout';

export const Contact: React.FC = () => {
  const { linkedinUrl, email } = siteContent.contact;

  return (
    <Section className="py-32 md:py-40 text-center relative overflow-hidden bg-[#0f1419]">
      {/* Subtle glow background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)' }} />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-sans text-3xl md:text-5xl lg:text-6xl text-[#c8d1dc] mb-6 max-w-4xl mx-auto leading-tight relative z-10 font-bold tracking-tight"
      >
        Looking for someone who can{' '}
        <span className="italic text-[#8b9cad]">accelerate your GTM engine?</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-[#6b7a8a] text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10"
      >
        I'd love to chat about how my experience in pipeline ops, revenue reporting, and cross-functional execution can help your team.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10"
      >
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-white relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
          }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 shine-effect" />
          <span className="relative z-10 flex items-center">
            <Linkedin size={18} className="mr-2" />
            Connect on LinkedIn
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </span>
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(135deg, #0891b2, #db2777)',
            }}
          />
        </motion.a>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={`mailto:${email}`}
          className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-[#c8d1dc] border border-[#2a3441] hover:border-primary/50 transition-all"
        >
          <Mail size={18} className="mr-2" />
          Send an Email
        </motion.a>
      </motion.div>

      {/* Quick info */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-12 relative z-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-[#5a6a7a] text-sm"
      >
        <span>📍 Pune, India</span>
        <span className="hidden sm:block">·</span>
        <span>🕐 Open to hybrid opportunities</span>
        <span className="hidden sm:block">·</span>
        <a
          href="/Abhishek-Lonkar-21022026.pdf"
          download
          className="inline-flex items-center hover:text-[#8b9cad] transition-colors"
        >
          <ExternalLink size={14} className="mr-1" />
          Download Resume
        </a>
      </motion.div>

      {/* CSS Animations */}
      <style>{`
        .shine-effect {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shine 2s ease-in-out infinite;
        }
        @keyframes shine {
          0% { transform: translateX(-100%); }
          50%, 100% { transform: translateX(100%); }
        }
      `}</style>
    </Section>
  );
};
