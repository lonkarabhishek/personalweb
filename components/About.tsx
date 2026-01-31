import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { FadeIn } from './ui/Layout';

export const About: React.FC = () => {
  const { intro, middle, outro } = siteContent.about;
  const paragraphs = [intro, middle, outro];

  return (
    <section id="about" className="relative overflow-hidden py-20 md:py-32 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#f5f5f0' }}>
      <div className="max-w-6xl mx-auto">
      {/* Background decoration */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
          bottom: '-20%',
          right: '-10%',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10">
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
            About
          </span>
          <h2 className="font-sans text-3xl md:text-4xl text-text-primary font-bold tracking-tight mb-12">My <span className="italic text-[#64748b]">Journey</span></h2>
        </FadeIn>

        <div className="space-y-8">
          {paragraphs.map((text, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex gap-6 p-6 rounded-2xl bg-white border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all cursor-default"
              >
                {/* Number */}
                <div
                  className="text-4xl md:text-5xl font-extralight text-text-primary/70 tracking-tight flex-shrink-0"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontFeatureSettings: '"zero" 1, "ss01" 1',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}.
                </div>
                <p className="text-lg text-[#64748b] leading-[1.8] font-normal">
                  {text}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};
