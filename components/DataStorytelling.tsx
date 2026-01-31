import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Animated bar chart showing 8/10 failure rate
const FailureChart: React.FC = () => {
  const bars = [
    { height: 85, failed: true },
    { height: 70, failed: true },
    { height: 90, failed: true },
    { height: 65, failed: true },
    { height: 95, failed: false },
    { height: 75, failed: true },
    { height: 80, failed: true },
    { height: 88, failed: false },
    { height: 72, failed: true },
    { height: 78, failed: true },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
      <div className="flex items-end justify-between h-40 gap-2">
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${bar.height}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
            className="flex-1 rounded-t-md relative group cursor-pointer"
            style={{
              background: bar.failed
                ? 'linear-gradient(180deg, #94a3b8 0%, #cbd5e1 100%)'
                : 'linear-gradient(180deg, #7c3aed 0%, #0891b2 100%)',
            }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-4 text-sm text-[#64748b]">
        <span>Websites analyzed</span>
        <span className="font-semibold text-text-primary">8/10 underperforming</span>
      </div>
    </div>
  );
};

// Funnel visualization
const FunnelChart: React.FC = () => {
  const stages = [
    { label: 'Visitors', value: 10000, width: 100 },
    { label: 'Engaged', value: 4200, width: 70 },
    { label: 'Interested', value: 1800, width: 45 },
    { label: 'Converted', value: 320, width: 20 },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
      <div className="space-y-4">
        {stages.map((stage, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative"
          >
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${stage.width}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 + 0.2 }}
                className="h-12 rounded-lg flex items-center justify-end pr-4"
                style={{
                  background: `linear-gradient(90deg, rgba(124, 58, 237, ${0.2 + i * 0.2}) 0%, rgba(8, 145, 178, ${0.2 + i * 0.2}) 100%)`,
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                }}
              >
                <span className="text-sm font-bold text-text-primary">
                  {stage.value.toLocaleString()}
                </span>
              </motion.div>
              <span className="text-sm text-[#64748b] font-medium">{stage.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <span className="text-red-500 font-bold text-lg">96.8% revenue leaked</span>
      </div>
    </div>
  );
};

// Growth chart
const GrowthChart: React.FC = () => {
  const dataPath = "M 0 85 Q 40 80, 80 70 T 160 50 T 240 25 T 320 8";
  const withoutDataPath = "M 0 50 Q 40 55, 80 48 T 160 52 T 240 48 T 320 50";

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
      <div className="relative h-44">
        <svg viewBox="0 0 320 100" className="w-full h-full" preserveAspectRatio="none">
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="0" y1={i * 25} x2="320" y2={i * 25} stroke="#e2e8f0" strokeWidth="1" />
          ))}
          <motion.path
            d={withoutDataPath}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            strokeDasharray="8,8"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <motion.path
            d={dataPath}
            fill="none"
            stroke="url(#growthGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
          />
          <defs>
            <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
          </defs>
          <motion.circle
            cx="320"
            cy="8"
            r="6"
            fill="#0891b2"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.5, type: 'spring' }}
          />
        </svg>
      </div>
      <div className="flex justify-between mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-gray-300" style={{ borderStyle: 'dashed' }} />
          <span className="text-[#64748b]">Without data</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-1 rounded" style={{ background: 'linear-gradient(90deg, #7c3aed, #0891b2)' }} />
          <span className="text-text-primary font-semibold">With data</span>
        </div>
      </div>
    </div>
  );
};

// Comparison metrics
const ComparisonMetrics: React.FC = () => {
  const metrics = [
    { label: 'Data-driven decisions', withData: 94, withoutData: 12 },
    { label: 'Revenue optimization', withData: 78, withoutData: 23 },
    { label: 'User experience clarity', withData: 89, withoutData: 31 },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg space-y-5">
      {metrics.map((metric, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="text-sm text-text-primary font-medium mb-2">{metric.label}</div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-14">Guessing</span>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${metric.withoutData}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 + 0.2 }}
                  className="h-full bg-gray-300 rounded-full"
                />
              </div>
              <span className="text-xs text-gray-400 w-10 text-right">{metric.withoutData}%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-primary font-medium w-14">Data</span>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${metric.withData}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 + 0.4 }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #7c3aed, #0891b2)' }}
                />
              </div>
              <span className="text-xs font-bold w-10 text-right" style={{ color: '#7c3aed' }}>
                {metric.withData}%
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Slide data
const slides = [
  {
    number: '01',
    title: 'Most Websites',
    titleAccent: 'Fail Quietly',
    content: (
      <div className="space-y-6">
        <p className="text-2xl md:text-3xl text-text-primary font-semibold leading-snug">
          Data shows that 8 out of 10 websites never reach their business potential.
        </p>
        <div className="space-y-2 text-lg md:text-xl text-[#64748b]">
          <p>Not because they are slow.</p>
          <p>Not because they look bad.</p>
          <p className="text-text-primary font-medium">But because no one measures what actually matters.</p>
        </div>
        <div className="border-l-3 border-gray-300 pl-6 space-y-1 text-base md:text-lg text-[#64748b] italic">
          <p>Pages are published. Traffic comes in.</p>
          <p>And decisions are made on instinct.</p>
        </div>
      </div>
    ),
    chart: <FailureChart />,
  },
  {
    number: '02',
    title: 'Data Changes',
    titleAccent: 'the Story',
    content: (
      <div className="space-y-6">
        <p className="text-xl md:text-2xl text-[#64748b]">
          When you track behavior, patterns emerge:
        </p>
        <div className="space-y-3">
          {[
            { icon: '⏸', text: 'where users hesitate' },
            { icon: '↘', text: 'where they drop off' },
            { icon: '💧', text: 'where revenue is silently leaking' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/60 border border-gray-200">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-lg md:text-xl text-text-primary font-medium">{item.text}</span>
            </div>
          ))}
        </div>
        <p className="text-xl md:text-2xl text-text-primary font-semibold pt-2">
          Growth becomes a sequence of informed decisions.
        </p>
      </div>
    ),
    chart: <FunnelChart />,
  },
  {
    number: '03',
    title: 'The Difference Is',
    titleAccent: 'Simple',
    content: (
      <div className="space-y-6">
        <div className="space-y-2 text-xl md:text-2xl text-[#64748b]">
          <p>Most people build websites.</p>
          <p className="text-text-primary font-semibold">A few operate them.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="p-5 rounded-xl bg-gray-100 border border-gray-200">
            <p className="text-text-primary/40 line-through text-base md:text-lg">
              "Does this look good?"
            </p>
          </div>
          <div
            className="p-5 rounded-xl border-2"
            style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(8, 145, 178, 0.08))',
              borderColor: 'rgba(124, 58, 237, 0.4)',
            }}
          >
            <p className="text-text-primary font-semibold text-base md:text-lg">
              "Does this move business forward?"
            </p>
          </div>
        </div>
        <p className="text-2xl md:text-3xl text-text-primary font-bold pt-4">
          That's where outcomes change.
        </p>
      </div>
    ),
    chart: <ComparisonMetrics />,
  },
  {
    number: '04',
    title: 'What I',
    titleAccent: 'Do',
    content: (
      <div className="space-y-6">
        <p className="text-xl md:text-2xl text-text-primary font-medium leading-relaxed">
          I turn raw data into clear stories — stories that explain what's happening, why it's happening, and what to do next.
        </p>
        <div
          className="p-8 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(8, 145, 178, 0.1))',
            border: '2px solid rgba(124, 58, 237, 0.3)',
          }}
        >
          <p className="text-lg md:text-xl text-[#64748b] mb-3">
            So your website doesn't just exist on the internet.
          </p>
          <p
            className="text-3xl md:text-4xl font-bold tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            It works for you.
          </p>
        </div>
      </div>
    ),
    chart: <GrowthChart />,
  },
];

export const DataStorytelling: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.offsetWidth;
      const newActive = Math.round(scrollLeft / slideWidth);
      setActiveSlide(newActive);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return;
    const slideWidth = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: index * slideWidth, behavior: 'smooth' });
  };

  const nextSlide = () => scrollToSlide(Math.min(activeSlide + 1, slides.length - 1));
  const prevSlide = () => scrollToSlide(Math.max(activeSlide - 1, 0));

  return (
    <section
      id="data-storytelling"
      className="relative overflow-hidden py-16 md:py-24 bg-white"
    >
      {/* Section Header */}
      <div className="px-6 md:px-12 lg:px-24 mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <span
              className="font-medium tracking-widest text-xs uppercase mb-2 block"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Data Storytelling
            </span>
            <h2 className="font-sans text-2xl md:text-3xl text-text-primary font-bold tracking-tight">
              The Story <span className="italic text-[#64748b]">Data Tells</span>
            </h2>
          </div>

          {/* Desktop Navigation Arrows */}
          {!isMobile && (
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                disabled={activeSlide === 0}
                className={`p-3 rounded-full border transition-all ${
                  activeSlide === 0
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 text-text-primary hover:border-primary hover:text-primary'
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                disabled={activeSlide === slides.length - 1}
                className={`p-3 rounded-full border transition-all ${
                  activeSlide === slides.length - 1
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-gray-300 text-text-primary hover:border-primary hover:text-primary'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Slides Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full snap-center px-6 md:px-12 lg:px-24"
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[500px] md:min-h-[550px]">
                {/* Left: Content */}
                <div className="order-2 lg:order-1">
                  <div className="flex items-start gap-6 mb-6">
                    <div
                      className="text-6xl md:text-7xl lg:text-8xl font-extralight text-text-primary/20 tracking-tight leading-none"
                      style={{
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontFeatureSettings: '"zero" 1, "ss01" 1',
                      }}
                    >
                      {slide.number}
                    </div>
                    <h3 className="font-sans text-3xl md:text-4xl lg:text-5xl text-text-primary font-bold tracking-tight leading-tight pt-2">
                      {slide.title}<br />
                      <span className="italic text-[#64748b]">{slide.titleAccent}</span>
                    </h3>
                  </div>
                  {slide.content}
                </div>

                {/* Right: Chart */}
                <div className="order-1 lg:order-2">
                  {slide.chart}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-3 mt-8 px-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              activeSlide === index
                ? 'w-8 h-2'
                : 'w-2 h-2 hover:bg-gray-400'
            }`}
            style={{
              background:
                activeSlide === index
                  ? 'linear-gradient(90deg, #7c3aed, #0891b2)'
                  : '#cbd5e1',
            }}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="text-center mt-4">
        <span
          className="text-sm font-medium"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontFeatureSettings: '"zero" 1, "ss01" 1',
          }}
        >
          <span className="text-text-primary">{String(activeSlide + 1).padStart(2, '0')}</span>
          <span className="text-gray-400"> / {String(slides.length).padStart(2, '0')}</span>
        </span>
      </div>

      {/* Hide scrollbar CSS */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
