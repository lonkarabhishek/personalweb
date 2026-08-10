import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from './ui/Layout';
import { siteContent } from '../content/site';

const AnimatedMetric: React.FC<{ value: string; inView: boolean }> = ({ value, inView }) => {
  const [displayValue, setDisplayValue] = useState('0');

  const cleanValue = value.replace(/,/g, '');
  const numericValue = parseInt(cleanValue.replace(/\D/g, '')) || 0;
  const suffix = cleanValue.match(/[+%]/) ? cleanValue.match(/[+%]/)?.[0] : '';

  useEffect(() => {
    if (!inView) {
      setDisplayValue('0');
      return;
    }

    const duration = 1800;
    const steps = 50;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue.toString() + suffix);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current).toString() + suffix);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, numericValue, suffix]);

  return <>{displayValue}</>;
};

export const ImpactMetrics: React.FC = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="impact" className="relative overflow-hidden py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-[#0f1419]">
      <div className="max-w-6xl mx-auto" ref={sectionRef}>
        {/* Background decoration */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 hidden md:block"
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
            top: '-20%',
            right: '-10%',
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
            Impact
          </span>
          <h2 className="font-sans text-3xl md:text-4xl text-[#c8d1dc] mb-4 font-bold tracking-tight">
            Numbers that <span className="italic text-[#8b9cad]">tell the story</span>
          </h2>
          <p className="text-[#6b7a8a] text-lg mb-16 max-w-2xl">
            Measurable outcomes from building partner-impact frameworks, revenue reporting systems, and cross-functional programs.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {siteContent.impactMetrics.map((metric, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-[#1a2029] p-8 rounded-2xl border border-[#2a3441] hover:border-primary/30 hover:shadow-xl transition-all group relative overflow-hidden"
              >
                {/* Hover gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.08) 0%, transparent 70%)',
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="text-5xl md:text-6xl font-bold mb-3 tracking-tight"
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontFeatureSettings: '"zero" 1, "ss01" 1',
                      background: 'linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    <AnimatedMetric value={metric.number} inView={inView} />
                  </div>
                  <p className="text-[#c8d1dc] font-medium text-lg mb-2 leading-tight">
                    {metric.label}
                  </p>
                  <p className="text-[#5a6a7a] text-sm">
                    {metric.context}
                  </p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
