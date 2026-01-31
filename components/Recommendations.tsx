import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Section, FadeIn } from './ui/Layout';

const linkedInRecommendationsUrl = "https://www.linkedin.com/in/lonkarabhishek/details/recommendations/?detailScreenTabIndex=0";

export const Recommendations: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    }
  };

  return (
    <Section id="recommendations" className="relative overflow-hidden !overflow-x-visible bg-[#0f1419]">
      {/* Background decoration */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(219, 39, 119, 0.1) 0%, transparent 70%)',
          top: '10%',
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
          Recommendations
        </span>
        <h2 className="font-sans text-3xl md:text-4xl text-[#6b7a8a] mb-16 font-bold tracking-tight">Trusted by <span className="italic text-[#9ba8b8]">leaders</span></h2>
      </FadeIn>

      {/* Mobile Carousel */}
      {isMobile ? (
        <div className="relative z-10">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {siteContent.recommendations.map((rec, i) => {
              const isExpanded = expandedIndex === i;
              return (
                <div
                  key={i}
                  className="flex-shrink-0 w-[85%] mr-4 snap-start bg-[#1a2029] p-6 rounded-2xl border border-[#2a3441] shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-2 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(8, 145, 178, 0.1))',
                      }}
                    >
                      <Quote size={20} className="text-primary" />
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={12} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className={`text-[#8b9cad] leading-relaxed italic text-base ${isExpanded ? '' : 'line-clamp-3'}`}>
                    "{rec.text}"
                  </p>

                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    className="mt-2 text-sm font-medium"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {isExpanded ? 'See less' : 'See more'}
                  </button>

                  <div className="pt-4 mt-4 border-t border-[#2a3441]">
                    <p className="text-[#9ba8b8] font-semibold font-sans">{rec.name}</p>
                    <p
                      className="text-sm"
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {rec.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {siteContent.recommendations.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? 'w-6 bg-gradient-to-r from-primary to-accent'
                    : 'w-1.5 bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Desktop Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {siteContent.recommendations.map((rec, i) => (
            <FadeIn key={i} delay={i * 0.2}>
              <motion.a
                href={linkedInRecommendationsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="block bg-[#1a2029] p-8 md:p-10 rounded-2xl border border-[#2a3441] hover:border-primary/30 hover:shadow-xl h-full flex flex-col relative overflow-hidden group cursor-pointer"
              >
                {/* Hover gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.03) 0%, rgba(219, 39, 119, 0.03) 100%)',
                  }}
                />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="p-3 rounded-xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(8, 145, 178, 0.1))',
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
                      <ExternalLink size={14} className="text-text-muted group-hover:text-primary transition-colors" />
                    </div>
                  </div>

                  <p className="text-[#8b9cad] leading-relaxed mb-8 italic flex-grow text-lg">
                    "{rec.text}"
                  </p>

                  <div className="mt-auto pt-6 border-t border-[#2a3441]">
                    <p className="text-[#9ba8b8] font-semibold font-sans text-lg">{rec.name}</p>
                    <p
                      className="text-sm"
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
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
                    <span className="text-xs text-[#6b7a8a] flex items-center">
                      View on LinkedIn
                      <ExternalLink size={10} className="ml-1" />
                    </span>
                  </div>
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>
      )}
    </Section>
  );
};
