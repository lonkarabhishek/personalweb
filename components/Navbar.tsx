import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Briefcase, Settings, User, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { BookingModal } from './BookingModal';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work', icon: Briefcase },
    { name: 'Process', href: '#process', icon: Settings },
    { name: 'About', href: '#about', icon: User },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    // Remove the # from the id
    const sectionId = id.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

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
              ? "bg-white/5 md:backdrop-blur-xl border border-white/10 shadow-lg shadow-primary/5"
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
              <span className="text-xl font-serif font-semibold text-white tracking-tight group-hover:text-primary-light transition-colors hidden sm:block">
                Abhishek Lonkar
              </span>
            </Link>

            {/* Desktop Nav - Icon based with hover reveal */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link, index) => {
                const Icon = link.icon;

                if (link.isRoute) {
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link
                        to={link.href}
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
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    onClick={(e) => handleScrollTo(e, link.href)}
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

            {/* Mobile Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden text-white p-2 rounded-xl bg-white/5 border border-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-4 right-4 mt-2 bg-dark-light/98 border border-white/10 rounded-2xl p-6 flex flex-col space-y-2 md:hidden shadow-xl"
            >
              {navLinks.map((link, index) => {
                const Icon = link.icon;

                if (link.isRoute) {
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Link
                        to={link.href}
                        className="flex items-center px-4 py-3 text-lg font-medium text-white hover:text-primary-light transition-colors rounded-xl hover:bg-white/5"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Icon size={20} className="mr-3 text-primary" />
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="flex items-center px-4 py-3 text-lg font-medium text-white hover:text-primary-light transition-colors rounded-xl hover:bg-white/5 w-full text-left"
                  >
                    <Icon size={20} className="mr-3 text-primary" />
                    {link.name}
                  </motion.button>
                );
              })}

              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowBooking(true);
                }}
                className="w-full text-center px-6 py-4 text-white font-medium rounded-xl mt-4 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                }}
              >
                <Calendar size={18} className="mr-2" />
                Book a call
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Booking Modal */}
      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </>
  );
};
