import React from 'react';
import { Quote, Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Section, FadeIn } from './ui/Layout';

const linkedInRecommendationsUrl = "https://www.linkedin.com/in/lonkarabhishek/details/recommendations/?detailScreenTabIndex=0";

export const Recommendations: React.FC = () => {
  return (
    <Section id="recommendations" className="relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
          top: '10%',
          left: '-10%',
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
          Recommendations
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-16">Trusted by leaders</h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {siteContent.recommendations.map((rec, i) => (
          <FadeIn key={i} delay={i * 0.2}>
            <motion.a
              href={linkedInRecommendationsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="block bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/10 hover:border-primary/30 h-full flex flex-col relative overflow-hidden group cursor-pointer"
            >
              {/* Hover gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(236, 72, 153, 0.05) 100%)',
                }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))',
                    }}
                  >
                    <Quote size={24} className="text-primary" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <ExternalLink size={14} className="text-white/30 group-hover:text-primary transition-colors" />
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed mb-8 italic flex-grow text-lg">
                  "{rec.text}"
                </p>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <p className="text-white font-semibold font-serif text-lg">{rec.name}</p>
                  <p
                    className="text-sm"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {rec.role}
                  </p>
                </div>

                {/* View on LinkedIn hint */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-white/40 flex items-center">
                    View on LinkedIn
                    <ExternalLink size={10} className="ml-1" />
                  </span>
                </div>
              </div>
            </motion.a>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
};
