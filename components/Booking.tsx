import React, { useState } from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteContent } from '../content/site';
import { Section, FadeIn } from './ui/Layout';
import { BookingModal } from './BookingModal';

export const Booking: React.FC = () => {
  const { primaryBtn } = siteContent.booking;
  const [showCalendar, setShowCalendar] = useState(false);

  const calendarUrl = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3eFH-K6IQk-3avWVjGYP3Q-vfQZlAe9I-fYLdOobcFweup66Evk9dST6B_7YCz4Rj0cKxys5_o";

  return (
    <>
      <Section className="py-32 md:py-40 text-center relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 hidden md:block"
          style={{
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <FadeIn>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-primary mb-8 max-w-4xl mx-auto leading-tight relative z-10">
            If you want to move faster without things breaking later,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7c3aed 0%, #0891b2 50%, #db2777 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              let's talk.
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 relative z-10">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(124, 58, 237, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCalendar(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full font-medium text-white relative overflow-hidden group shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
            }}
          >
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
        </FadeIn>

        {/* Quick booking option */}
        <FadeIn delay={0.4} className="mt-8 relative z-10">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-text-muted hover:text-text-secondary transition-colors text-sm"
          >
            <ExternalLink size={14} className="mr-2" />
            Or open in Google Calendar
          </a>
        </FadeIn>
      </Section>

      {/* Calendar Modal */}
      <BookingModal isOpen={showCalendar} onClose={() => setShowCalendar(false)} />
    </>
  );
};
