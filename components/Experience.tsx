import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent } from '../content/site';
import { FadeIn } from './ui/Layout';

export const Experience: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="relative overflow-hidden py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Background decoration */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-30 hidden md:block"
          style={{
            background: 'radial-gradient(circle, rgba(8, 145, 178, 0.1) 0%, transparent 70%)',
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
            Experience
          </span>
          <h2 className="font-sans text-3xl md:text-4xl text-text-primary mb-16 font-bold tracking-tight">Where I've <span className="italic text-[#64748b]">made an impact</span></h2>
        </FadeIn>

        <div className="space-y-6 relative z-10">
          {/* Timeline line */}
          <div className="absolute left-[27px] md:left-[31px] top-0 bottom-0 w-px bg-gray-200 hidden md:block" />

          {siteContent.experience.map((exp, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                layout
                className="group relative"
              >
                <div className="flex gap-4 md:gap-8">
                  {/* Timeline dot */}
                  <div className="hidden md:flex flex-col items-center flex-shrink-0">
                    <motion.div
                      animate={{
                        scale: expandedIndex === i ? 1.2 : 1,
                        borderColor: expandedIndex === i ? '#7c3aed' : '#e2e8f0',
                      }}
                      className="w-4 h-4 rounded-full border-2 bg-white z-10 mt-8"
                      style={{
                        boxShadow: expandedIndex === i ? '0 0 0 4px rgba(124, 58, 237, 0.1)' : 'none',
                      }}
                    />
                  </div>

                  {/* Card */}
                  <motion.div
                    layout
                    onClick={() => toggleExpand(i)}
                    className={`flex-1 bg-white border rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
                      expandedIndex === i
                        ? 'border-primary/30 shadow-lg'
                        : 'border-gray-200 hover:border-primary/20 hover:shadow-md'
                    }`}
                  >
                    {/* Header */}
                    <div className="p-6 md:p-8 flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-contain border border-gray-100 p-1 flex-shrink-0"
                        />
                        <div>
                          <h3 className="text-lg md:text-xl font-sans font-bold text-text-primary tracking-tight">
                            {exp.role}
                          </h3>
                          <p className="text-[#64748b] font-medium">{exp.company}</p>
                          <p className="text-sm text-text-muted mt-1">{exp.period}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedIndex === i ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-2 rounded-lg bg-surface-secondary text-text-muted flex-shrink-0"
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </div>

                    {/* Expanded highlights */}
                    <AnimatePresence>
                      {expandedIndex === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-6 md:px-8 pb-6 md:pb-8">
                            <div className="border-t border-gray-100 pt-6">
                              <ul className="space-y-4">
                                {exp.highlights.map((highlight, j) => (
                                  <motion.li
                                    key={j}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: j * 0.05 }}
                                    className="flex gap-3"
                                  >
                                    <span
                                      className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0"
                                      style={{
                                        background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                                      }}
                                    />
                                    <span className="text-[#64748b] leading-[1.7]">{highlight}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Education */}
        <FadeIn delay={0.4}>
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(8, 145, 178, 0.1))',
                }}
              >
                <span className="text-primary text-lg font-bold">🎓</span>
              </div>
              <div>
                <h3 className="text-lg font-sans font-bold text-text-primary tracking-tight">
                  Bachelor of Engineering
                </h3>
                <p className="text-[#64748b]">Electronics & Telecommunications</p>
                <p className="text-sm text-text-muted">Vishwakarma Institute of Information Technology · Jun 2016 – May 2020</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
