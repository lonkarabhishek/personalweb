import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { GTMCapabilities } from '../components/GTMCapabilities';
import { ImpactMetrics } from '../components/ImpactMetrics';
import { Experience } from '../components/Experience';
import { SkillsTools } from '../components/SkillsTools';
import { Recommendations } from '../components/Recommendations';
import { About } from '../components/About';
import { Companies } from '../components/Companies';
import { Contact } from '../components/Contact';
import { AskAssistantFloating } from '../components/AskTakeover';
import { BookingModal } from '../components/BookingModal';

export const HomePage: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);
  return (
    <div className="flex flex-col">
      <Hero />
      <GTMCapabilities />
      <ImpactMetrics />
      <Experience />
      <SkillsTools />
      <Recommendations />
      <About />
      <Companies />
      <Contact />
      {/* Floating "Ask my assistant" button → full-screen takeover */}
      <AskAssistantFloating onBook={() => setShowBooking(true)} />
      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
};
