import React from 'react';
import { motion } from 'framer-motion';
import { Section, FadeIn } from './ui/Layout';

const companies = [
  { name: 'Cognizant', type: 'Corporate', logo: '/logos/cognizantlogo.jpeg' },
  { name: "Levi's", type: 'Brand', logo: '/logos/levislogo.png' },
  { name: 'G2', type: 'Tech', logo: '/logos/g2logo.jpg' },
  { name: 'Haddu', type: 'Ecommerce', logo: '/logos/haddulogo.webp' },
  { name: 'Nurturing Green', type: 'Startup', logo: '/logos/nurturinggreenlogo.png' },
  { name: 'KIST', type: 'Research', fullName: 'Korea Institute of Science & Technology', logo: '/logos/KIST_Logo.jpg' },
  { name: 'EDC', type: 'Institution', fullName: 'Entrepreneurship Development Cell', logo: '/logos/entrepreneurship_development_cell_vit_logo.jpeg' },
  { name: 'DefeatCovid', type: 'Initiative', logo: '/logos/defeat_covid_19_logo.jpeg' },
];

export const Companies: React.FC = () => {
  return (
    <Section className="py-20 relative overflow-hidden">
      {/* Background glow - hidden on mobile for performance */}
      <div
        className="absolute w-full h-full pointer-events-none opacity-10 hidden md:block"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        }}
      />

      <FadeIn>
        <div className="text-center mb-12">
          <span
            className="font-medium tracking-widest text-xs uppercase mb-4 block"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Experience
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-white">
            Companies & Organizations I've Worked With
          </h2>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
          {companies.map((company, i) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative bg-white/5 md:backdrop-blur-sm border border-white/10 hover:border-primary/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all cursor-default"
            >
              {/* Hover gradient */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10 flex flex-col items-center">
                {/* Logo */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-white flex items-center justify-center mb-4 p-2">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="text-base md:text-lg font-semibold text-white group-hover:text-primary-light transition-colors">
                  {company.name}
                </h3>
                {company.fullName && (
                  <p className="text-xs text-white/40 mt-1 hidden md:block">
                    {company.fullName}
                  </p>
                )}
                <span
                  className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs"
                  style={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))',
                    color: 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {company.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
};
