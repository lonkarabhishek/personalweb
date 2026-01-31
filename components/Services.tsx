import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { siteContent } from '../content/site';
import { Section, FadeIn } from './ui/Layout';

const iconColors = [
  'from-purple-500 to-cyan-500',
  'from-cyan-500 to-pink-500',
  'from-pink-500 to-purple-500',
  'from-purple-500 to-pink-500',
  'from-cyan-500 to-purple-500',
];

export const Services: React.FC = () => {
  const [cards, setCards] = useState(siteContent.services.map((s, i) => ({ ...s, id: i })));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const swipeCard = () => {
    setCards(prev => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <section id="help" className="relative py-12 md:py-24 px-6 md:px-12 lg:px-24" style={{ backgroundColor: '#f5f5f0' }}>
      <div className="max-w-6xl mx-auto">
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
            Services
          </span>
          <h2 className="font-sans text-3xl md:text-4xl text-text-primary mb-8 md:mb-16 font-bold tracking-tight">What I <span className="italic text-[#64748b]">help with</span></h2>
          {isMobile && (
            <p className="text-[#64748b] text-sm mb-8 flex items-center justify-center">
              <ChevronLeft size={16} className="mr-1 animate-pulse" />
              Tap to flip through cards
            </p>
          )}
        </FadeIn>

      {/* Mobile: Card deck */}
      {isMobile ? (
        <div className="relative h-[520px] flex items-center justify-center">
          <div
            className="relative w-full max-w-sm h-full flex items-center justify-center"
            style={{ perspective: '1000px' }}
          >
            {cards.slice(0, 5).map((service, index) => {
              const isTop = index === 0;

              return (
                <DeckCard
                  key={service.id}
                  service={service}
                  index={index}
                  isTop={isTop}
                  onTap={swipeCard}
                  iconColor={iconColors[service.id % iconColors.length]}
                  totalCards={Math.min(cards.length, 5)}
                />
              );
            }).reverse()}
          </div>

          {/* Card counter */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-2">
            {siteContent.services.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  cards[0]?.id === i
                    ? 'bg-gradient-to-r from-primary to-accent w-6'
                    : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Desktop: Grid layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteContent.services.map((service, i) => (
            <FadeIn key={i} delay={i * 0.1} className="h-full">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white p-8 h-full rounded-2xl border border-gray-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Gradient glow on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.05) 0%, transparent 70%)',
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="text-5xl font-extralight text-text-primary/70 mb-6 tracking-tight"
                    style={{
                      fontFamily: 'Inter, system-ui, sans-serif',
                      fontFeatureSettings: '"zero" 1, "ss01" 1',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}.
                  </div>
                  <h3 className="text-xl font-sans font-bold text-text-primary mb-4 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-[#64748b] leading-[1.8] font-normal">{service.description}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      )}
      </div>
    </section>
  );
};

interface DeckCardProps {
  service: { title: string; description: string; id: number };
  index: number;
  isTop: boolean;
  onTap: () => void;
  iconColor: string;
  totalCards: number;
}

const DeckCard: React.FC<DeckCardProps> = ({
  service,
  index,
  isTop,
  onTap,
  iconColor,
  totalCards,
}) => {
  const x = useMotionValue(0);
  const dragRotate = useTransform(x, [-200, 200], [-10, 10]);

  // Stack cards straight with offset
  const offsetY = index * 6;
  const scale = 1 - index * 0.03;
  const cardOpacity = 1 - index * 0.15;

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 400) {
      onTap();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: cardOpacity,
        scale: scale,
        y: offsetY,
        zIndex: totalCards - index,
      }}
      exit={{
        x: -350,
        rotateZ: -15,
        opacity: 0,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={isTop ? handleDragEnd : undefined}
      onClick={isTop ? onTap : undefined}
      style={isTop ? { x, rotateZ: dragRotate } : {}}
      className={`absolute w-full bg-white px-6 py-12 rounded-3xl border border-border shadow-2xl min-h-[480px] ${
        isTop ? 'cursor-pointer' : 'pointer-events-none'
      }`}
      whileHover={isTop ? { y: -5 } : undefined}
      whileTap={isTop ? { scale: 0.98 } : undefined}
    >
      {/* Card edge effect */}
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative z-10">
        <div
          className="text-5xl font-extralight text-text-primary/70 mb-5 tracking-tight"
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontFeatureSettings: '"zero" 1, "ss01" 1',
          }}
        >
          {String(service.id + 1).padStart(2, '0')}.
        </div>
        <h3 className="text-2xl md:text-3xl font-sans font-bold text-text-primary mb-4 tracking-tight">
          {service.title}
        </h3>
        <p className="text-[#64748b] leading-[1.8] text-lg md:text-xl font-normal">{service.description}</p>
      </div>

      {/* Deck shadow underneath */}
      {index > 0 && (
        <div
          className="absolute -bottom-1 left-2 right-2 h-4 rounded-b-3xl -z-10"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.05))',
          }}
        />
      )}
    </motion.div>
  );
};
