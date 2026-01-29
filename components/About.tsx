import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Section, FadeIn } from './ui/Layout';

export const About: React.FC = () => {
  const { intro, middle, outro } = siteContent.about;

  return (
    <Section id="about" dark className="relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          bottom: '-20%',
          right: '-10%',
          filter: 'blur(80px)',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-4">
          <FadeIn>
            <span
              className="font-medium tracking-widest text-xs uppercase mb-4 block"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              About
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-white">My Journey</h2>

            {/* Decorative element */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 w-20 mt-6 rounded-full origin-left"
              style={{
                background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
              }}
            />
          </FadeIn>
        </div>

        <div className="lg:col-span-8">
          <div className="space-y-8 text-lg text-white/60 leading-relaxed font-light">
            <FadeIn delay={0.1}>
              <motion.p
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all cursor-default"
              >
                {intro}
              </motion.p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <motion.p
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all cursor-default"
              >
                {middle}
              </motion.p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <motion.p
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-accent-pink/30 transition-all cursor-default"
              >
                {outro}
              </motion.p>
            </FadeIn>
          </div>
        </div>
      </div>
    </Section>
  );
};
