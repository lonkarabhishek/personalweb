import React, { useState } from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Section } from './ui/Layout';
import { BookingModal } from './BookingModal';

export const Booking: React.FC = () => {
  const { primaryBtn } = siteContent.booking;
  const [showCalendar, setShowCalendar] = useState(false);

  const calendarUrl = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3eFH-K6IQk-3avWVjGYP3Q-vfQZlAe9I-fYLdOobcFweup66Evk9dST6B_7YCz4Rj0cKxys5_o";

  return (
    <>
      <Section className="py-32 md:py-40 text-center relative overflow-hidden bg-[#0f1419]">
        {/* Subtle glow background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)' }} />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-sans text-3xl md:text-5xl lg:text-6xl text-[#6b7a8a] mb-10 max-w-4xl mx-auto leading-tight relative z-10 font-bold tracking-tight"
        >
          If you want to move{' '}
          <span className="italic text-[#9ba8b8]">faster</span>
          {' '}without things breaking later,{' '}
          <span className="italic text-[#9ba8b8]">let's talk.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 relative z-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCalendar(true)}
            className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-white relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
            }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 shine-effect" />
            <span className="relative z-10 flex items-center">
              <Calendar size={18} className="mr-2" />
              {primaryBtn}
            </span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(135deg, #0891b2, #db2777)',
              }}
            />
          </motion.button>
        </motion.div>

        {/* Quick booking option */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3 }}
          className="mt-8 relative z-10"
        >
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#5a6a7a] hover:text-[#8b9cad] transition-colors text-sm"
          >
            <ExternalLink size={14} className="mr-2" />
            Or open in Google Calendar
          </a>
        </motion.div>

        {/* CSS Animations */}
        <style>{`
          .shine-effect {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            animation: shine 2s ease-in-out infinite;
          }
          @keyframes shine {
            0% { transform: translateX(-100%); }
            50%, 100% { transform: translateX(100%); }
          }
        `}</style>
      </Section>

      {/* Calendar Modal */}
      <BookingModal isOpen={showCalendar} onClose={() => setShowCalendar(false)} />
    </>
  );
};
