import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Section, FadeIn } from './ui/Layout';

export const Process: React.FC = () => {
  return (
    <Section id="process" dark className="relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
          top: '10%',
          left: '-20%',
          filter: 'blur(80px)',
        }}
      />

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
          Process
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-16">How I work</h2>
      </FadeIn>

      <div className="relative ml-4 md:ml-8 space-y-12 md:space-y-16 py-4">
        {/* Animated gradient line */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-accent to-accent-pink" />

        {siteContent.process.map((step, i) => (
          <FadeIn key={i} delay={i * 0.1} className="relative pl-8 md:pl-12">
            {/* Animated dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
              className="absolute -left-[7px] top-2 w-4 h-4 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
              }}
            />

            <motion.div
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group cursor-default"
            >
              <span
                className="text-sm font-medium tracking-widest uppercase mb-1 block"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Phase {step.step}
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-white mb-3 group-hover:text-primary-light transition-colors">
                {step.title}
              </h3>
              <p className="text-white/60 max-w-xl leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};
