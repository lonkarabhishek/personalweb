import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Hero } from '../components/Hero';
import { GTMCapabilities } from '../components/GTMCapabilities';
import { ImpactMetrics } from '../components/ImpactMetrics';
import { Experience } from '../components/Experience';
import { SkillsTools } from '../components/SkillsTools';
import { Recommendations } from '../components/Recommendations';
import { About } from '../components/About';
import { Companies } from '../components/Companies';
import { Contact } from '../components/Contact';
import { Section } from '../components/ui/Layout';
import { SiteAgent } from '../components/SiteAgent';
import { BookingModal } from '../components/BookingModal';

// Inline assistant, placed right after the hero so visitors can ask before scrolling.
const AskAssistant: React.FC<{ onBook: () => void }> = ({ onBook }) => (
  <Section className="py-10 md:py-16">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <div className="lg:col-span-4">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 border border-primary/20 mb-5">
          <Sparkles size={14} className="text-primary mr-2" />
          <span className="text-sm text-text-secondary">Ask my assistant</span>
        </div>
        <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight leading-tight text-text-primary">
          Questions about my work? Just ask.
        </h2>
        <p className="text-text-secondary leading-relaxed mt-4 font-light">
          An assistant I built that knows my experience. Ask what I did at G2, which tools I use, or whether I'd be a fit for your team. For anything specific, book a call.
        </p>
      </div>
      <div className="lg:col-span-8">
        <SiteAgent persona="main" onBook={onBook} />
      </div>
    </div>
  </Section>
);

export const HomePage: React.FC = () => {
  const [showBooking, setShowBooking] = useState(false);
  return (
    <div className="flex flex-col">
      <Hero />
      <AskAssistant onBook={() => setShowBooking(true)} />
      <GTMCapabilities />
      <ImpactMetrics />
      <Experience />
      <SkillsTools />
      <Recommendations />
      <About />
      <Companies />
      <Contact />
      <BookingModal isOpen={showBooking} onClose={() => setShowBooking(false)} />
    </div>
  );
};
