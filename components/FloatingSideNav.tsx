import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Briefcase, User, BarChart3, Wrench, Linkedin } from 'lucide-react';
import { siteContent } from '../content/site';

const sections = [
  { id: 'capabilities', name: 'GTM Capabilities', icon: TrendingUp },
  { id: 'impact', name: 'Impact', icon: BarChart3 },
  { id: 'experience', name: 'Experience', icon: Briefcase },
  { id: 'skills', name: 'Skills & Tools', icon: Wrench },
  { id: 'about', name: 'About', icon: User },
];

export const FloatingSideNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
      transition={{ duration: 0.3 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center space-y-3"
    >
      {sections.map((section, index) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;

        return (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center"
          >
            {/* Tooltip */}
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-white border border-border shadow-lg text-text-primary text-sm font-medium whitespace-nowrap pointer-events-none"
            >
              {section.name}
            </motion.span>

            {/* Icon button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-br from-primary to-accent shadow-lg'
                  : 'bg-white border border-border hover:border-primary/30 hover:shadow-md'
              }`}
            >
              <Icon
                size={20}
                className={`transition-colors ${
                  isActive ? 'text-white' : 'text-text-muted group-hover:text-primary'
                }`}
              />

              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -left-2 w-1 h-6 rounded-full bg-gradient-to-b from-primary to-accent"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.div>
          </motion.button>
        );
      })}

      {/* Divider */}
      <div className="w-6 h-px bg-border my-2" />

      {/* LinkedIn connect quick action */}
      <motion.a
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        href={siteContent.footer.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center"
      >
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-white border border-border shadow-lg text-text-primary text-sm font-medium whitespace-nowrap pointer-events-none"
        >
          Connect on LinkedIn
        </motion.span>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-accent-pink to-primary shadow-lg"
        >
          <Linkedin size={20} className="text-white" />
        </motion.div>
      </motion.a>
    </motion.div>
  );
};
