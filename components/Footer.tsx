import React from 'react';
import { Linkedin, Mail, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const { email, linkedin, location } = siteContent.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-light border-t border-white/10 pt-16 pb-8 px-6 md:px-12 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          bottom: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                }}
              >
                <span className="text-white font-bold text-lg">A</span>
              </motion.div>
              <span className="text-xl font-serif font-semibold text-white group-hover:text-primary-light transition-colors">
                Abhishek Lonkar
              </span>
            </Link>
            <div className="flex items-center text-white/50">
              <MapPin size={16} className="mr-2 text-primary" />
              <span className="text-sm">{location}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4
              className="text-sm font-medium uppercase tracking-widest"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
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
                className="flex items-center text-white/70 hover:text-white transition-colors group"
              >
                <Mail size={16} className="mr-2 text-primary group-hover:text-accent transition-colors" />
                {email}
              </motion.a>
              <motion.a
                whileHover={{ x: 4 }}
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white/70 hover:text-white transition-colors group"
              >
                <Linkedin size={16} className="mr-2 text-primary group-hover:text-accent transition-colors" />
                LinkedIn
              </motion.a>
            </div>
          </div>

          <div className="space-y-4">
            <h4
              className="text-sm font-medium uppercase tracking-widest"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
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
                className="text-white/70 hover:text-white transition-colors text-left"
              >
                Work
              </motion.button>
              <motion.div whileHover={{ x: 4 }}>
                <Link to="/resume" className="text-white/70 hover:text-white transition-colors">
                  Resume
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>&copy; {year} Abhishek Lonkar. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Built with <Heart size={14} className="mx-1 text-accent-pink" /> and reliability in mind.
          </p>
        </div>
      </div>
    </footer>
  );
};
