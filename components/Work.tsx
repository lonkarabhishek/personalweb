import React from 'react';
import { ArrowUpRight, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Section, FadeIn } from './ui/Layout';

export const Work: React.FC = () => {
  return (
    <Section id="work" className="relative overflow-hidden">
      {/* Background decoration - static on mobile */}
      <div
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none opacity-10 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
          top: '20%',
          right: '-10%',
          filter: 'blur(60px)',
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
          Portfolio
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-16">Selected Work</h2>
      </FadeIn>

      <div className="space-y-8 relative z-10">
        {siteContent.work.map((project, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group block p-8 md:p-10 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
                }}
              />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-serif text-white group-hover:text-primary-light transition-colors">
                      {project.title}
                    </h3>
                    {project.inProgress && (
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 text-xs font-medium rounded-full border border-amber-500/30 flex items-center">
                        <Sparkles size={10} className="mr-1" />
                        {project.status}
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-white/60 leading-relaxed mb-6 max-w-2xl">
                    {project.description}
                  </p>

                  {project.note && (
                    <div className="flex items-center text-sm text-white/40 mb-4 italic">
                      <Lock size={14} className="mr-2" />
                      {project.note}
                    </div>
                  )}

                  {project.link && (
                    <motion.a
                      whileHover={{ x: 4 }}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-medium transition-colors"
                      style={{
                        background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {project.linkText}
                      <ArrowUpRight size={18} className="ml-1 text-primary" />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};
