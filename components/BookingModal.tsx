import React from 'react';
import { Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const calendarUrl = "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3eFH-K6IQk-3avWVjGYP3Q-vfQZlAe9I-fYLdOobcFweup66Evk9dST6B_7YCz4Rj0cKxys5_o";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 md:bg-black/40 md:backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl h-[80vh] bg-white rounded-2xl border border-border overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                  }}
                >
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-text-primary font-semibold">Book an Appointment</h3>
                  <p className="text-text-muted text-sm">Choose a time that works for you</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-xl bg-surface-secondary hover:bg-surface-tertiary transition-colors text-text-secondary hover:text-text-primary"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Calendar iframe */}
            <div className="w-full h-[calc(100%-80px)] bg-white">
              <iframe
                src={calendarUrl}
                style={{ border: 0 }}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Book an appointment"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
