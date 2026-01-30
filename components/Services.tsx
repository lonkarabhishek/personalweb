import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Section, FadeIn } from './ui/Layout';

const iconColors = [
  'from-purple-500 to-cyan-500',
  'from-cyan-500 to-pink-500',
  'from-pink-500 to-purple-500',
  'from-purple-500 to-pink-500',
  'from-cyan-500 to-purple-500',
];

export const Services: React.FC = () => {
  return (
    <Section id="help" dark>
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
          Services
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-16">What I help with</h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteContent.services.map((service, i) => (
          <FadeIn key={i} delay={i * 0.1} className="h-full">
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white/5 md:backdrop-blur-sm p-8 h-full rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Gradient glow on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-r ${iconColors[i % iconColors.length]}`}
                >
                  <span className="text-white font-bold text-lg">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-4 group-hover:text-primary-light transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/60 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};
