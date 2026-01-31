import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Section, FadeIn } from './ui/Layout';

export const DataStorytelling: React.FC = () => {
  const { title, copy, examples } = siteContent.dataStorytelling;

  return (
    <Section className="relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute w-[800px] h-[800px] pointer-events-none opacity-20 hidden md:block"
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(124, 58, 237, 0.05), transparent, rgba(8, 145, 178, 0.05), transparent)',
          top: '-50%',
          right: '-30%',
          filter: 'blur(40px)',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <FadeIn>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex items-center justify-center p-4 rounded-2xl mb-8"
            style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(8, 145, 178, 0.1))',
              border: '1px solid rgba(124, 58, 237, 0.2)',
            }}
          >
            <BarChart3 size={32} className="text-primary" />
          </motion.div>
          <h2 className="font-serif text-3xl md:text-4xl text-text-primary mb-6">
            {title}
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            {copy}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white md:backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all"
          >
            <ul className="space-y-5">
              {examples.map((example, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="flex items-start group cursor-default"
                >
                  <div
                    className="w-6 h-6 rounded-lg flex items-center justify-center mr-4 shrink-0 mt-0.5"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                    }}
                  >
                    <TrendingUp size={12} className="text-white" />
                  </div>
                  <span className="text-text-secondary font-light text-lg group-hover:text-text-primary transition-colors">
                    {example}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </FadeIn>
      </div>
    </Section>
  );
};
