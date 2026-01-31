import React from 'react';
import { ArrowUpRight, Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { FadeIn } from './ui/Layout';

export const Work: React.FC = () => {
  return (
    <section id="work" className="relative overflow-hidden py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
      {/* Background decoration */}
      <div
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none opacity-30 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(8, 145, 178, 0.15) 0%, transparent 70%)',
          top: '20%',
          right: '-10%',
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
          Portfolio
        </span>
        <h2 className="font-sans text-3xl md:text-4xl text-text-primary mb-16 font-bold tracking-tight">Selected <span className="italic text-[#64748b]">Work</span></h2>
      </FadeIn>

      <div className="space-y-8 relative z-10">
        {siteContent.work.map((project, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group block p-8 md:p-10 bg-white border border-border rounded-3xl hover:border-primary/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.03) 0%, rgba(8, 145, 178, 0.03) 100%)',
                }}
              />

              <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
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

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-sans font-bold text-text-primary tracking-tight">
                      {project.title}
                    </h3>
                    {project.inProgress && (
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-600 text-xs font-medium rounded-full border border-amber-500/30 flex items-center">
                        <Sparkles size={10} className="mr-1" />
                        {project.status}
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-[#64748b] leading-[1.8] mb-6 max-w-2xl">
                    {project.description}
                  </p>

                  {project.note && (
                    <div className="flex items-center text-sm text-[#64748b] mb-4 italic">
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
                        background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
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
      </div>
    </section>
  );
};
