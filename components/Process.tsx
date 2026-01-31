import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Section, FadeIn } from './ui/Layout';

export const Process: React.FC = () => {
  return (
    <Section id="process" dark className="relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-20 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
          top: '10%',
          left: '-20%',
          filter: 'blur(60px)',
        }}
      />

      <FadeIn>
        <span
          className="font-medium tracking-widest text-xs uppercase mb-4 block"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Process
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-16">How I work</h2>
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
                background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)',
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
                  background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Phase {step.step}
              </span>
              <h3 className="text-xl md:text-2xl font-serif text-text-primary mb-3 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-text-secondary max-w-xl leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};
