import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Settings, User, Calendar, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { BookingModal } from './BookingModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section for mobile nav
      const sections = ['about', 'process', 'work'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let found = false;
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            found = true;
            break;
          }
        }
      }
      if (!found && window.scrollY < 300) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work', icon: Briefcase, id: 'work' },
    { name: 'Process', href: '#process', icon: Settings, id: 'process' },
    { name: 'About', href: '#about', icon: User, id: 'about' },
  ];

  const mobileNavLinks = [
    { name: 'Home', icon: Home, id: 'home' },
    { name: 'Work', icon: Briefcase, id: 'work' },
    { name: 'Process', icon: Settings, id: 'process' },
    { name: 'About', icon: User, id: 'about' },
    { name: 'Book', icon: Calendar, id: 'book' },
  ];

  const handleScrollTo = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'book') {
      setShowBooking(true);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Mobile floating bottom navbar
  if (isMobile) {
    return (
      <>
        {/* Simple top header with logo only */}
        <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                }}
              >
                <span className="text-white font-bold text-lg">A</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Floating bottom navigation */}
        <nav className="fixed bottom-4 left-4 right-4 z-50">
          <div className="bg-dark-light/95 border border-white/10 rounded-2xl px-2 py-2 flex items-center justify-around shadow-lg shadow-black/20">
            {mobileNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              const isBook = link.id === 'book';

              return (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className={cn(
                    "flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all",
                    isBook
                      ? "bg-gradient-to-r from-primary to-accent"
                      : isActive
                      ? "bg-white/10"
                      : "bg-transparent"
                  )}
                >
                  <Icon
                    size={20}
                    className={cn(
                      "transition-colors",
                      isBook
                        ? "text-white"
                        : isActive
                        ? "text-primary"
                        : "text-white/50"
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] mt-1 font-medium",
                      isBook
                        ? "text-white"
                        : isActive
                        ? "text-white"
                        : "text-white/50"
                    )}
                  >
                    {link.name}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
      </>
    );
  }

  // Desktop version with animations
  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4"
      >
        <div
          className={cn(
            "max-w-6xl mx-auto rounded-2xl transition-all duration-500 ease-out",
            isScrolled
              ? "bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg shadow-primary/5"
              : "bg-transparent border border-transparent"
          )}
        >
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                }}
              >
                <span className="text-white font-bold text-lg">A</span>
              </motion.div>
              <span className="text-xl font-serif font-semibold text-white tracking-tight group-hover:text-primary-light transition-colors">
                Abhishek Lonkar
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="flex items-center space-x-2">
              {navLinks.map((link, index) => {
                const Icon = link.icon;

                return (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={() => handleScrollTo(link.id)}
                    className="relative group flex items-center px-3 py-2 rounded-xl hover:bg-white/5 transition-all"
                  >
                    <Icon size={18} className="text-white/70 group-hover:text-primary transition-colors" />
                    <motion.span
                      initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                      whileHover={{ width: 'auto', opacity: 1, marginLeft: 8 }}
                      className="overflow-hidden whitespace-nowrap text-sm font-medium text-white"
                    >
                      {link.name}
                    </motion.span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-3/4 transition-all duration-300 rounded-full" />
                  </motion.button>
                );
              })}

              {/* Book a call button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBooking(true)}
                className="ml-2 px-5 py-2.5 text-sm font-medium rounded-full text-white relative overflow-hidden group flex items-center"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                }}
              >
                <span className="relative z-10 flex items-center">
                  <Calendar size={14} className="mr-2" />
                  Book a call
                </span>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4, #ec4899)',
                  }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </>
  );
};
