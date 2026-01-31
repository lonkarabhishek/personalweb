import React from 'react';
import { Linkedin, Mail, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { email, linkedin, location } = siteContent.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-secondary border-t border-border pt-16 pb-8 px-6 md:px-12 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, transparent 70%)',
          bottom: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <motion.img
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                src="/favicon.png"
                alt="Abhishek Lonkar"
                className="w-10 h-10 rounded-xl shadow-md object-cover"
              />
              <span className="text-xl font-sans font-bold text-text-primary group-hover:text-primary transition-colors tracking-tight">
                Abhishek Lonkar
              </span>
            </button>
            <div className="flex items-center text-[#64748b]">
              <MapPin size={16} className="mr-2 text-[#64748b]" />
              <span className="text-sm">{location}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4
              className="text-sm font-medium uppercase tracking-widest"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Contact
            </h4>
            <div className="flex flex-col space-y-3">
              <motion.a
                whileHover={{ x: 4 }}
                href={`mailto:${email}`}
                className="flex items-center text-[#64748b] hover:text-text-primary transition-colors group"
              >
                <Mail size={16} className="mr-2 text-[#64748b] group-hover:text-primary transition-colors" />
                {email}
              </motion.a>
              <motion.a
                whileHover={{ x: 4 }}
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[#64748b] hover:text-text-primary transition-colors group"
              >
                <Linkedin size={16} className="mr-2 text-[#64748b] group-hover:text-primary transition-colors" />
                LinkedIn
              </motion.a>
            </div>
          </div>

          <div className="space-y-4">
            <h4
              className="text-sm font-medium uppercase tracking-widest"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Navigation
            </h4>
            <div className="flex flex-col space-y-3">
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => {
                  const element = document.getElementById('work');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#64748b] hover:text-text-primary transition-colors text-left"
              >
                Work
              </motion.button>
              <motion.div whileHover={{ x: 4 }}>
                <Link to="/resume" className="text-[#64748b] hover:text-text-primary transition-colors">
                  Resume
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#64748b]">
          <p>&copy; {year} Abhishek Lonkar. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Built with <Heart size={14} className="mx-1 text-pink-500" /> and reliability in mind.
          </p>
        </div>
      </div>
    </footer>
  );
};
