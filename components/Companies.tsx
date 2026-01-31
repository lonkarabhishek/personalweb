import React from 'react';
import { Section, FadeIn } from './ui/Layout';

const companies = [
  { name: 'Cognizant', logo: '/logos/cognizantlogo.jpeg' },
  { name: "Levi's", logo: '/logos/levislogo.png' },
  { name: 'G2', logo: '/logos/g2logo.jpg' },
  { name: 'Haddu', logo: '/logos/haddulogo.webp' },
  { name: 'Nurturing Green', logo: '/logos/nurturinggreenlogo.png' },
  { name: 'KIST', logo: '/logos/KIST_Logo.jpg' },
  { name: 'EDC', logo: '/logos/entrepreneurship_development_cell_vit_logo.jpeg' },
  { name: 'DefeatCovid', logo: '/logos/defeat_covid_19_logo.jpeg' },
];

export const Companies: React.FC = () => {
  // Double the array for seamless infinite scroll
  const doubledCompanies = [...companies, ...companies];

  return (
    <Section className="py-16 relative overflow-hidden">
      <FadeIn>
        <div className="text-center mb-10">
          <span
            className="font-medium tracking-widest text-xs uppercase mb-4 block"
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Experience
          </span>
          <h2 className="font-sans text-2xl md:text-3xl text-text-primary font-bold tracking-tight">
            Trusted by Leading <span className="italic text-text-secondary">Organizations</span>
          </h2>
        </div>
      </FadeIn>

      {/* Carousel container */}
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="overflow-hidden">
          <div
            className="flex items-center gap-8 md:gap-12 animate-marquee"
            style={{
              width: 'max-content',
            }}
          >
            {doubledCompanies.map((company, i) => (
              <div
                key={`${company.name}-${i}`}
                className="group flex-shrink-0 relative"
              >
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-white border border-border p-3 md:p-4 flex items-center justify-center transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-lg group-hover:scale-110">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="w-full h-full object-contain transition-all duration-300"
                  />
                </div>
                {/* Tooltip */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  <span className="text-xs font-medium text-text-secondary bg-white px-2 py-1 rounded-lg shadow-sm border border-border">
                    {company.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS for marquee animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </Section>
  );
};
