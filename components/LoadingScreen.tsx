import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen: React.FC<{ onComplete: () => void; variant?: 'main' | 'studio' }> = ({ onComplete, variant = 'main' }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  useEffect(() => {
    const increment = isMobile ? 15 : 8;
    const interval = isMobile ? 80 : 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsExiting(true);
          setTimeout(onComplete, isMobile ? 300 : 500);
          return 100;
        }
        return prev + Math.random() * increment + 4;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete, isMobile]);

  const isStudio = variant === 'studio';

  // ── Studio loader: bold dark, rotating word, count-up, curtain-wipe reveal ──
  if (isStudio) {
    const D = { bg: '#0e0e0c', fg: '#f4f3ef', muted: 'rgba(255,255,255,0.5)', faint: 'rgba(255,255,255,0.28)', accent: '#1f3aff', line: 'rgba(255,255,255,0.14)' };
    const disp = "'Space Grotesk', 'Bricolage Grotesque', system-ui, sans-serif";
    const mono = "'Space Mono', ui-monospace, monospace";
    const pct = Math.min(Math.round(progress), 100);
    const word = progress < 34 ? 'Design' : progress < 67 ? 'Build' : 'Grow';
    return (
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] overflow-hidden"
            style={{ background: D.bg, color: D.fg }}
          >
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Space+Mono&display=swap');`}</style>
            {/* grain */}
            <div aria-hidden style={{
              position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px',
            }} />

            <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: 'clamp(26px, 5vw, 60px)' }}>
              {/* top: brand */}
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="flex items-center justify-between">
                <div>
                  <div style={{ fontFamily: mono, fontSize: '13px', letterSpacing: '0.02em', color: D.fg }}>Abhishek Lonkar</div>
                  <div style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: D.faint, marginTop: '4px' }}>Digital Studio</div>
                </div>
                <div className="flex items-center gap-2.5">
                  <span style={{ width: 7, height: 7, borderRadius: 999, background: D.accent }} />
                  <span style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: D.muted }}>Loading</span>
                </div>
              </motion.div>

              {/* center: rotating word */}
              <div className="overflow-hidden" style={{ lineHeight: 0.9 }}>
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={word}
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontFamily: disp, fontWeight: 600, fontSize: 'clamp(3.5rem, 15vw, 13rem)', letterSpacing: '-0.04em', color: D.fg, margin: 0 }}
                  >
                    {word}<span style={{ color: D.accent }}>.</span>
                  </motion.h1>
                </AnimatePresence>
              </div>

              {/* bottom: counter + progress line */}
              <div>
                <div className="flex items-end justify-between mb-5">
                  <div style={{ fontFamily: disp, fontWeight: 600, fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', letterSpacing: '-0.03em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                    {String(pct).padStart(3, '0')}<span style={{ color: D.faint }}>%</span>
                  </div>
                  <div className="hidden sm:block text-right" style={{ fontFamily: mono, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: D.faint, maxWidth: '260px' }}>
                    Websites, stores, and growth
                  </div>
                </div>
                <div style={{ position: 'relative', height: '2px', background: D.line, width: '100%' }}>
                  <motion.div
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    style={{ position: 'absolute', top: 0, left: 0, bottom: 0, background: D.accent }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const subtitle = 'GTM & Revenue Ops Professional';
  const gradientStyle = isStudio
    ? { background: '#111', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
    : { background: 'linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' };
  const barGradient = isStudio ? 'linear-gradient(90deg, #111, #555)' : 'linear-gradient(90deg, #7c3aed, #0891b2)';

  // Simple mobile version
  if (isMobile) {
    return (
      <AnimatePresence>
        {!isExiting && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white">
            <div className="relative z-10 flex flex-col items-center text-center px-6">
              <div className="mb-4">
                <h1 className="text-3xl font-sans font-bold text-text-primary mb-3 tracking-tight">
                  Hi, I'm{' '}
                  <span style={gradientStyle as any}>
                    Abhishek
                  </span>
                </h1>
                <p className="text-lg text-[#64748b] font-normal">
                  {subtitle}
                </p>
              </div>

              <div
                className="relative h-1 bg-gray-200 rounded-full overflow-hidden mt-8"
                style={{ width: 200 }}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-200"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    background: barGradient,
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  // Desktop version with animations
  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden ${isStudio ? 'bg-white' : 'bg-gradient-to-br from-white via-purple-50 to-cyan-50'}`}
        >
          {/* Background orbs */}
          {!isStudio && (
            <>
              <div
                className="absolute w-[500px] h-[500px] rounded-full opacity-30"
                style={{
                  background: 'radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 70%)',
                  top: '-20%',
                  left: '-10%',
                  filter: 'blur(40px)',
                }}
              />
              <div
                className="absolute w-[400px] h-[400px] rounded-full opacity-30"
                style={{
                  background: 'radial-gradient(circle, rgba(8, 145, 178, 0.2) 0%, transparent 70%)',
                  bottom: '-20%',
                  right: '-10%',
                  filter: 'blur(40px)',
                }}
              />
            </>
          )}

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-4"
            >
              <h1 className="text-5xl font-sans font-bold text-text-primary mb-3 tracking-tight">
                Hi, I'm{' '}
                <span style={gradientStyle as any}>
                  Abhishek
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl text-[#64748b] font-normal"
              >
                {subtitle}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="relative h-1 bg-gray-200 rounded-full overflow-hidden mt-8"
              style={{ width: 200 }}
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: barGradient,
                  boxShadow: isStudio ? '0 0 20px rgba(0, 0, 0, 0.1)' : '0 0 20px rgba(124, 58, 237, 0.3)',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
