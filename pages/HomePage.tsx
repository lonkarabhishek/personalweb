import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Work } from '../components/Work';
import { Process } from '../components/Process';
import { DataStorytelling } from '../components/DataStorytelling';
import { Recommendations } from '../components/Recommendations';
import { About } from '../components/About';
import { Companies } from '../components/Companies';
import { Booking } from '../components/Booking';
import { FloatingSideNav } from '../components/FloatingSideNav';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <FloatingSideNav />
      <Hero />
      <Services />
      <Work />
      <Process />
      <DataStorytelling />
      <Recommendations />
      <About />
      <Companies />
      <Booking />
    </div>
  );
};
