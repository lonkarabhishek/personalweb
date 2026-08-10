import React from 'react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { FadeIn } from './ui/Layout';

const categoryIcons = ['📊', '📈', '⚡', '🔍'];

export const SkillsTools: React.FC = () => {
  return (
    <section id="skills" className="relative overflow-hidden py-20 md:py-32 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#f5f5f0' }}>
      <div className="max-w-6xl mx-auto">
        {/* Background decoration */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 hidden md:block"
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
            bottom: '-20%',
            left: '-10%',
            filter: 'blur(80px)',
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
            Skills & Tools
          </span>
          <h2 className="font-sans text-3xl md:text-4xl text-text-primary mb-16 font-bold tracking-tight">
            What I <span className="italic text-[#64748b]">work with</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {siteContent.skillsTools.categories.map((category, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{categoryIcons[i]}</span>
                  <h3 className="text-lg font-sans font-bold text-text-primary tracking-tight">
                    {category.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, j) => (
                    <motion.span
                      key={j}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-[#f5f5f0] text-[#475569] border border-gray-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
