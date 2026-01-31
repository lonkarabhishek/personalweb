import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  useEffect(() => {
    const duration = isMobile ? 1500 : 2000;

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, isMobile ? 300 : 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete, isMobile]);

  // Simple mobile version
  if (isMobile) {
    return (
      <AnimatePresence>
        {!isExiting && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-white">
            <div className="relative z-10 flex flex-col items-center text-center px-6">
              {/* Favicon with pulse */}
              <div className="relative mb-6">
                <div
                  className="absolute inset-0 rounded-2xl animate-ping opacity-20"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                  }}
                />
                <img
                  src="/favicon.png"
                  alt="Abhishek Lonkar"
                  className="w-20 h-20 rounded-2xl shadow-lg object-cover relative z-10"
                />
              </div>

              <h1 className="text-2xl font-sans font-bold text-text-primary mb-2 tracking-tight">
                Hi, I'm{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Abhishek
                </span>
              </h1>
              <p className="text-base text-[#64748b] font-normal">
                It's good to see you.
              </p>

              {/* Dots animation */}
              <div className="flex gap-2 mt-8">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                      animationDelay: `${i * 0.15}s`,
                      animationDuration: '0.6s',
                    }}
                  />
                ))}
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
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-purple-50 to-cyan-50"
        >
          {/* Background orbs */}
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

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Favicon with animated rings */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative mb-8"
            >
              {/* Pulsing rings */}
              <motion.div
                animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                }}
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1.3], opacity: [0.3, 0, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
                className="absolute inset-0 rounded-3xl"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                }}
              />
              <motion.img
                src="/favicon.png"
                alt="Abhishek Lonkar"
                className="w-24 h-24 rounded-3xl shadow-xl object-cover relative z-10"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl font-sans font-bold text-text-primary mb-3 tracking-tight">
                Hi, I'm{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Abhishek
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl text-[#64748b] font-normal"
              >
                It's good to see you.
              </motion.p>
            </motion.div>

            {/* Animated dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3 mt-10"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
