import React from 'react';
import { Hero } from '../components/Hero';
import { GTMCapabilities } from '../components/GTMCapabilities';
import { ImpactMetrics } from '../components/ImpactMetrics';
import { Experience } from '../components/Experience';
import { SkillsTools } from '../components/SkillsTools';
import { Recommendations } from '../components/Recommendations';
import { About } from '../components/About';
import { Companies } from '../components/Companies';
import { Contact } from '../components/Contact';

export const HomePage: React.FC = () => {
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
    </div>
  );
};
