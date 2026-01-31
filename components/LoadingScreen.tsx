import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  useEffect(() => {
    // Faster loading on mobile
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

  // Simple mobile version
  if (isMobile) {
    return (
      <AnimatePresence>
        {!isExiting && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-dark"
          >
            <div className="relative z-10 flex flex-col items-center text-center px-6">
              <div className="mb-4">
                <h1 className="text-3xl font-serif font-medium text-white mb-3">
                  Hi, I'm{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Abhishek
                  </span>
                </h1>
                <p className="text-lg text-white/60 font-light">
                  It's good to see you.
                </p>
              </div>

              {/* Simple loading bar without motion */}
              <div
                className="relative h-1 bg-white/10 rounded-full overflow-hidden mt-8"
                style={{ width: 200 }}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-200"
                  style={{
                    width: `${Math.min(progress, 100)}%`,
                    background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
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
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(-45deg, #0a0a0f, #1a1a2e, #2d1b4e, #1a1a2e)',
            backgroundSize: '400% 400%',
          }}
        >
          {/* Background orbs - desktop only */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
              top: '-20%',
              left: '-10%',
              filter: 'blur(40px)',
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
              bottom: '-20%',
              right: '-10%',
              filter: 'blur(40px)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-4"
            >
              <h1 className="text-5xl font-serif font-medium text-white mb-3">
                Hi, I'm{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
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
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl text-white/60 font-light"
              >
                It's good to see you.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="relative h-1 bg-white/10 rounded-full overflow-hidden mt-8"
              style={{ width: 200 }}
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
