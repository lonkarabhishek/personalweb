import React from 'react';
import { motion } from 'framer-motion';
import { Section, FadeIn } from '../components/ui/Layout';
import { Download, Briefcase, GraduationCap, Wrench, FolderOpen, FileDown, Linkedin, Mail, Phone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResumePage: React.FC = () => {
  const experience = [
    {
      title: 'Business Analyst',
      company: 'G2',
      date: 'Jan 2024 – Present',
      points: [
        'Utilized K-means clustering algorithms to segment and categorize large datasets from G2 Stack crawler outputs, streamlining identification of key trends and patterns for business strategy development.',
        'Created and maintained a Looker dashboard for daily reporting on G2 Marketplace metrics, enhancing data visualization and stakeholder decision-making capabilities.',
        'Spearheaded a key project to inform price negotiation strategies using Vector Autoregression (VAR) and Granger Causality tests, enabling data-driven decision-making for G2 Track customers.',
        'Expertly used Snowflake, Metabase and MS-SQL for data retrieval, enabling in-depth analysis of G2 Stack and G2 Track data.',
      ],
    },
    {
      title: 'Data Operations Associate',
      company: 'G2',
      date: 'May 2022 – Dec 2023',
      points: [
        'Developed and implemented Python scripts to automate data retrieval from LinkedIn via Lixit API and Glassdoor via Coresignal API, integrating external data sources into the company\'s database.',
        'Utilized Python, Selenium, and Google AppScripts to write and deploy multiple web scraping scripts, increasing data collection efficiency and reliability.',
        'Developed Python code to scrape product information from AWS, IBM, and Infor company websites.',
        'Automated internal processes to invalidate vendors in bulk using Python, reducing manual work.',
        'Process owner of category deletion task requiring coordination with market research, engineering, and operations teams.',
      ],
    },
    {
      title: 'Programmer Analyst',
      company: 'Cognizant',
      date: 'Dec 2020 – Apr 2022',
      points: [
        'Led the redesign of Levi\'s web application using Python and ASP.NET Entity Framework, enhancing web app performance by 40%.',
        'Directed a team in building a performance management system using advanced SQL queries, boosting organizational efficiency by 15%.',
        'Championed an overhaul of web application architecture, integrating JavaScript micro-services resulting in 30% performance boost.',
      ],
    },
    {
      title: 'Research Assistant',
      company: 'Korea Institute of Science and Technology (KIST)',
      date: 'Jun 2018 – Jul 2018',
      points: [
        'Assisted in the Smart Highways project, employing statistical methods to analyze vehicle pressure data, influencing future road infrastructure research.',
      ],
    },
  ];

  const skills = {
    'Programming Languages': ['Python', 'JavaScript', 'C#'],
    'Backend Technologies': ['Metabase', 'DBeaver', 'Snowflake', 'SQL'],
    'Web Technologies': ['Django', 'ASP.NET', 'HTML', 'CSS'],
    'Analytical Tools': ['MS Excel', 'Google Sheets', 'Looker'],
  };

  const projects = [
    {
      name: 'Defeat COVID-19',
      date: 'Mar 2020 – Jun 2020',
      description: 'Developed a web app to track Covid-19 cases, providing real-time heat maps to the public.',
    },
    {
      name: 'Image Colorisation',
      date: 'Aug 2019 – Feb 2020',
      description: 'Trained a Deep Convolutional Neural Network for image colorization, achieving a 90% accuracy rate.',
    },
    {
      name: 'Game of Guts',
      date: 'Aug 2017 – Sep 2017',
      description: 'Developed a virtual bidding game, facilitating a successful event with over 240 participants.',
    },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-30 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
          top: '5%',
          right: '-10%',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-30 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgba(8, 145, 178, 0.1) 0%, transparent 70%)',
          bottom: '10%',
          left: '-5%',
          filter: 'blur(60px)',
        }}
      />

      {/* Back button */}
      <div className="fixed top-6 left-6 z-50 print:hidden">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 text-text-primary hover:border-primary/30 transition-all shadow-sm"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>

      <Section className="pt-24 pb-16 relative z-10">
        <FadeIn>
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <img
                src="/favicon.png"
                alt="Abhishek Lonkar"
                className="w-20 h-20 rounded-2xl shadow-lg object-cover"
              />
            </div>
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-text-primary mb-3 tracking-tight">
              Abhishek Lonkar
            </h1>
            <p
              className="text-xl font-medium mb-6"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Business Analyst
            </p>

            {/* Contact info */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[#64748b] mb-8">
              <a href="mailto:abhisheksoffice11@gmail.com" className="flex items-center hover:text-text-primary transition-colors">
                <Mail size={14} className="mr-2" />
                abhisheksoffice11@gmail.com
              </a>
              <a href="https://www.linkedin.com/in/lonkarabhishek/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-text-primary transition-colors">
                <Linkedin size={14} className="mr-2" />
                LinkedIn
              </a>
              <a href="tel:+919403612979" className="flex items-center hover:text-text-primary transition-colors">
                <Phone size={14} className="mr-2" />
                +91 9403612979
              </a>
            </div>

            {/* Download buttons */}
            <div className="flex flex-wrap gap-3 justify-center print:hidden">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/Abhishek-Lonkar-21022026.pdf"
                download="Abhishek-Lonkar-Resume.pdf"
                className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium text-white shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                }}
              >
                <FileDown size={16} className="mr-2" />
                Download Resume
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.print()}
                className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium text-text-primary border border-gray-200 hover:border-primary/30 transition-colors"
              >
                <Download size={16} className="mr-2" />
                Print
              </motion.button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Professional Experience */}
            <div>
              <div className="flex items-center mb-8">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                  }}
                >
                  <Briefcase size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-sans font-bold text-text-primary tracking-tight">
                  Professional Experience
                </h2>
              </div>

              <div className="space-y-6">
                {experience.map((job, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#f5f5f0] border border-gray-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-text-primary">{job.title}</h3>
                        <p
                          className="font-medium"
                          style={{
                            background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          {job.company}
                        </p>
                      </div>
                      <span className="text-[#64748b] text-sm mt-2 md:mt-0">{job.date}</span>
                    </div>
                    <ul className="space-y-2">
                      {job.points.map((point, j) => (
                        <li key={j} className="flex items-start text-[#64748b] text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center mb-8">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                  style={{
                    background: 'linear-gradient(135deg, #0891b2, #7c3aed)',
                  }}
                >
                  <Wrench size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-sans font-bold text-text-primary tracking-tight">
                  Skills
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(skills).map(([category, items], i) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-[#f5f5f0] border border-gray-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-text-primary mb-3">{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-white text-text-primary border border-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <div className="flex items-center mb-8">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                  }}
                >
                  <FolderOpen size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-sans font-bold text-text-primary tracking-tight">
                  Projects
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="bg-[#f5f5f0] border border-gray-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-text-primary mb-2">{project.name}</h3>
                    <p
                      className="text-xs font-medium mb-2"
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {project.date}
                    </p>
                    <p className="text-[#64748b] text-sm leading-relaxed">{project.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center mb-8">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
                  style={{
                    background: 'linear-gradient(135deg, #0891b2, #7c3aed)',
                  }}
                >
                  <GraduationCap size={24} className="text-white" />
                </div>
                <h2 className="text-2xl font-sans font-bold text-text-primary tracking-tight">
                  Education
                </h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-[#f5f5f0] border border-gray-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">Bachelor of Engineering</h3>
                    <p
                      className="font-medium"
                      style={{
                        background: 'linear-gradient(135deg, #7c3aed, #0891b2)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Electronics and Telecommunications
                    </p>
                    <p className="text-[#64748b] text-sm mt-1">Vishwakarma Institute of Information Technology</p>
                  </div>
                  <span className="text-[#64748b] text-sm mt-2 md:mt-0">Jun 2016 – May 2020</span>
                </div>
                <p className="text-[#64748b] text-sm mt-4 leading-relaxed">
                  Engaged in projects and coursework relevant to data analysis and business intelligence.
                </p>
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* Print styles */}
      <style>{`
        @media print {
          body {
            background: white !important;
          }
          .bg-\\[\\#f5f5f0\\] {
            background: #f9f9f9 !important;
          }
        }
      `}</style>
    </div>
  );
};
