import React, { useState, useEffect } from 'react';
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
    setIsMobile(window.innerWidth < 768);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

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

  // Mobile floating right-side vertical navbar (no top header - Hero handles it)
  if (isMobile) {
    return (
      <>
        {/* Floating right-side vertical navigation */}
        <nav className="fixed right-3 top-1/2 -translate-y-1/2 z-40">
          <div className="flex flex-col items-center space-y-2">
            {mobileNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              const isBook = link.id === 'book';

              return (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id)}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-xl transition-all shadow-sm",
                    isBook
                      ? "bg-gradient-to-br from-primary to-accent"
                      : isActive
                      ? "bg-white/90 backdrop-blur-sm"
                      : "bg-white/70 backdrop-blur-sm"
                  )}
                >
                  <Icon
                    size={18}
                    className={cn(
                      "transition-colors",
                      isBook
                        ? "text-white"
                        : isActive
                        ? "text-primary"
                        : "text-text-muted"
                    )}
                  />
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
              ? "bg-white/80 backdrop-blur-xl border border-border shadow-lg"
              : "bg-transparent border border-transparent"
          )}
        >
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center space-x-2 cursor-pointer"
            >
              <motion.img
                src="/favicon.png"
                alt="Abhishek Lonkar"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-xl shadow-md object-cover"
              />
              <span className="text-xl font-sans font-bold text-text-primary tracking-tight group-hover:text-primary transition-colors">
                Abhishek Lonkar
              </span>
            </button>

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
                    className="relative group flex items-center px-3 py-2 rounded-xl hover:bg-surface-secondary transition-all"
                  >
                    <Icon size={18} className="text-text-secondary group-hover:text-primary transition-colors" />
                    <motion.span
                      initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                      whileHover={{ width: 'auto', opacity: 1, marginLeft: 8 }}
                      className="overflow-hidden whitespace-nowrap text-sm font-medium text-text-primary"
                    >
                      {link.name}
                    </motion.span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-3/4 transition-all duration-300 rounded-full" />
                  </motion.button>
                );
              })}

              {/* Book a free call button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowBooking(true)}
                className="ml-2 px-5 py-2.5 text-sm font-medium rounded-full text-white relative overflow-hidden group flex items-center shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                }}
              >
                <span className="relative z-10 flex items-center">
                  <Calendar size={14} className="mr-2" />
                  Book a free call
                </span>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(135deg, #0891b2, #db2777)',
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
