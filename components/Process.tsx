import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteContent } from '../content/site';

// Mobile step component with intersection observer for highlighting
const MobileStep: React.FC<{ step: { title: string; description: string }; index: number }> = ({ step, index }) => {
  const [isInView, setIsInView] = useState(false);
  const stepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={stepRef} className="flex relative">
      {/* Number in circle */}
      <div className="mr-4 z-10">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
            isInView ? 'border-primary/50 bg-[#f5f5f0]' : 'border-gray-300 bg-[#f5f5f0]'
          }`}
        >
          <span
            className={`text-lg font-extralight tracking-tight leading-none transition-all duration-500 ${
              isInView ? 'text-text-primary' : 'text-text-primary/40'
            }`}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontFeatureSettings: '"zero" 1, "ss01" 1',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className={`flex-1 pb-6 transition-opacity duration-500 ${
          isInView ? 'opacity-100' : 'opacity-40'
        }`}
      >
        <h3 className="text-xl font-sans font-bold text-text-primary mb-2 leading-tight tracking-tight">
          {step.title}
        </h3>
        <p className="text-[#64748b] leading-[1.7] text-base font-normal">
          {step.description}
        </p>
      </div>
    </div>
  );
};

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const windowHeight = window.innerHeight;

      // Only enable scroll-snap on desktop
      if (!isMobile) {
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const inSection = sectionRect.top < windowHeight * 0.5 && sectionRect.bottom > windowHeight * 0.5;

        if (inSection) {
          document.documentElement.style.scrollSnapType = 'y proximity';
        } else {
          document.documentElement.style.scrollSnapType = '';
        }
      }

      // Update active step based on which step is in view
      stepsRef.current.forEach((stepEl, index) => {
        if (!stepEl) return;
        const rect = stepEl.getBoundingClientRect();
        const stepMiddle = rect.top + rect.height / 2;

        if (stepMiddle > windowHeight * 0.35 && stepMiddle < windowHeight * 0.65) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.style.scrollSnapType = '';
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative"
      style={{ backgroundColor: '#f5f5f0' }}
    >
      {/* The sticky left side - header + number anchored to screen */}
      {!isMobile && (
        <div className="sticky top-0 h-screen pointer-events-none z-10">
          <div className="absolute inset-0 flex flex-col justify-center pl-6 md:pl-12 lg:pl-24 py-20">
            <div className="max-w-6xl w-full">
              {/* Anchored header */}
              <div className="mb-8">
                <span
                  className="font-medium tracking-widest text-xs uppercase mb-4 block"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Process
                </span>
                <h2 className="font-sans text-3xl md:text-4xl text-text-primary font-bold tracking-tight">
                  How I <span className="italic text-text-secondary">work</span>
                </h2>
              </div>

              {/* Anchored number */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-[180px] lg:text-[240px] xl:text-[280px] font-extralight text-text-primary/90 leading-none select-none tracking-tight -ml-3"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontFeatureSettings: '"zero" 1, "ss01" 1',
                  }}
                >
                  {String(activeStep + 1).padStart(2, '0')}.
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* Content that scrolls over the fixed elements */}
      <div className={`relative ${!isMobile ? '-mt-[100vh]' : ''}`}>
        <div className="px-6 md:px-12 lg:px-24 py-8 md:py-32">
          <div className="max-w-6xl mx-auto">
            {/* Mobile: Vertical timeline list with scroll highlighting */}
            {isMobile && (
              <div>
                <div className="mb-8">
                  <span
                    className="font-medium tracking-widest text-[10px] uppercase mb-2 block"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Process
                  </span>
                  <h2 className="font-sans text-2xl text-text-primary font-bold tracking-tight">
                    How I <span className="italic text-[#64748b]">work</span>
                  </h2>
                </div>

                {/* All steps with timeline */}
                <div className="relative">
                  {/* Vertical line connecting circles */}
                  <div className="absolute left-[23px] top-12 bottom-12 w-0.5 bg-gray-300" />

                  <div className="space-y-6">
                    {siteContent.process.map((step, i) => (
                      <MobileStep key={i} step={step} index={i} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Desktop: Steps positioned to the right so they scroll over the number */}
            {!isMobile && (
              <div className="ml-auto max-w-xl lg:max-w-2xl">
                {siteContent.process.map((step, i) => (
                  <div
                    key={i}
                    ref={(el) => { stepsRef.current[i] = el; }}
                    className="h-[70vh] flex items-center"
                    style={{
                      scrollSnapAlign: 'center',
                      scrollSnapStop: 'always',
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0.3 }}
                      animate={{
                        opacity: activeStep === i ? 1 : 0.15,
                        scale: activeStep === i ? 1 : 0.98,
                      }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full"
                    >
                      <h3
                        className={`font-sans font-bold mb-4 leading-tight tracking-tight transition-colors duration-500 text-3xl lg:text-4xl xl:text-5xl ${
                          activeStep === i ? 'text-text-primary' : 'text-text-muted/50'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`leading-[1.8] font-normal transition-colors duration-500 text-lg lg:text-xl ${
                          activeStep === i ? 'text-[#64748b]' : 'text-text-muted/30'
                        }`}
                      >
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
