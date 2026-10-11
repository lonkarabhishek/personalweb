// Work catalog shared by the assistant backend (api/agent.ts) and the chat UI
// (components/SiteAgent.tsx). The model picks ids via the `show_work` tool; the
// server resolves them to these cards; the client renders them as a showcase.

export type WorkCard = {
  id: string;
  kind: 'site' | 'impact';
  title: string;
  tag: string;        // short category label
  desc: string;       // one or two plain sentences
  link?: string;      // live URL (site)
  domain?: string;    // pretty domain (site)
  metric?: string;    // headline number (impact)
  org?: string;       // where it happened (impact)
  logo?: string;      // /logos/... (impact)
  year?: string;
};

export const STUDIO_WORK: WorkCard[] = [
  { id: 'big-life-gym', kind: 'site', title: 'Big Life Gym', tag: 'Brand site', year: '2026',
    link: 'https://big-life-gym.vercel.app', domain: 'big-life-gym.vercel.app',
    desc: 'A bold, high-energy site for a gym. Classes, memberships, trainers and timetables, built to turn visitors into members.' },
  { id: 'haddu', kind: 'site', title: 'Haddu Clothing', tag: 'E-commerce', year: '2026',
    link: 'https://www.hadduclothing.com/', domain: 'hadduclothing.com',
    desc: 'A full fashion store built from scratch. Catalog, payments, inventory, shipping, and a Pinterest engine doing 80k views a month.' },
  { id: 'jsb-foods', kind: 'site', title: 'JSB Foods', tag: 'Brand site', year: '2026',
    link: 'https://jsb-foods.vercel.app', domain: 'jsb-foods.com',
    desc: 'A clean, modern site for a food company. Product showcase, brand story, and trust built into every page.' },
  { id: 'tapturf', kind: 'site', title: 'TapTurf', tag: 'Web app', year: '2026',
    link: 'https://tapturf.in/', domain: 'tapturf.in',
    desc: 'A sports venue booking platform. Find a turf, pick a slot, book it. Fast and simple end to end.' },
  { id: 'deft-chemistry', kind: 'site', title: 'Deft Chemistry', tag: 'Brand site', year: '2025',
    link: 'https://deft-chemistry-redefined.vercel.app', domain: 'deftchemistry.com',
    desc: 'An elegant web presence for a chemistry brand, with 3D molecular structures. Informative, credible, built to convert.' },
  { id: 'nashik-kumbh', kind: 'site', title: 'The Nashik Kumbh', tag: 'Multilingual', year: '2026',
    link: 'https://thenashikkumbh.com', domain: 'thenashikkumbh.com',
    desc: 'A trilingual site for Kumbh Mela 2027 in English, Hindi and Marathi. Bathing dates, travel, and holy sites.' },
  { id: 'sd-overseas', kind: 'site', title: 'SD Overseas', tag: 'Brand site', year: '2025',
    link: 'https://sd-overseas.vercel.app/', domain: 'sdoverseas.com',
    desc: 'A professional web presence for an international trading company. Built for global credibility.' },
];

export const MAIN_WORK: WorkCard[] = [
  { id: 'g2-partner-impact', kind: 'impact', title: 'Partner-impact framework', tag: 'GTM analytics', metric: '30%', org: 'G2', logo: '/logos/g2logo.jpg', year: '2024–',
    desc: 'Identified 30% of G2 revenue as partner-influenced. Those deals were 90% larger and closed 20% faster.' },
  { id: 'g2-attainment', kind: 'impact', title: 'Attainment & partnerships reporting', tag: 'Executive reporting', metric: '79', org: 'G2', logo: '/logos/g2logo.jpg', year: 'FY25',
    desc: 'Rebuilt attainment reporting across quotas, sales credits and partner revenue. 79 Jira deliverables shipped in FY25.' },
  { id: 'g2-arr', kind: 'impact', title: 'ARR reconciliation & waterfall QA', tag: 'Revenue ops', metric: 'APAC', org: 'G2', logo: '/logos/g2logo.jpg', year: '2024–',
    desc: 'Led month-end ARR reconciliation and segmentation waterfall QA for India and APAC across Accounting, Sales Ops, Business Systems and Data Engineering.' },
  { id: 'g2-data-ops', kind: 'impact', title: 'Data pipelines & automation', tag: 'Automation', metric: 'Python', org: 'G2', logo: '/logos/g2logo.jpg', year: '2022–23',
    desc: 'Automated LinkedIn and Glassdoor ingestion with Python and APIs. Built scraping and bulk-processing workflows with Selenium and Apps Script.' },
  { id: 'levis-redesign', kind: 'impact', title: "Levi's web app redesign", tag: 'Engineering', metric: '40%', org: 'Cognizant', logo: '/logos/levislogo.png', year: '2021',
    desc: "Led the Python and ASP.NET redesign of Levi's web application, improving performance by 40%." },
  { id: 'cognizant-perf-system', kind: 'impact', title: 'Performance-management system', tag: 'Engineering', metric: '15%', org: 'Cognizant', logo: '/logos/cognizantlogo.jpeg', year: '2021',
    desc: 'Directed a team building a SQL-based performance-management system that improved organizational efficiency by 15%.' },
  { id: 'studio', kind: 'site', title: 'Abhishek Lonkar Studio', tag: 'Side studio', year: '2025–',
    link: 'https://studio.workwithabhi.online', domain: 'studio.workwithabhi.online',
    desc: 'A small digital studio he runs on the side. Websites and online stores for 10+ clients, including a fashion store doing 80k Pinterest views a month.' },
];

export const WORK: Record<'studio' | 'main', WorkCard[]> = { studio: STUDIO_WORK, main: MAIN_WORK };

// Live screenshot of a site (thum.io renders on demand and CDN-caches the result).
// Same URL shape as the studio's work cards, so the studio's preload warms these too.
export const shotFor = (link: string) => `https://image.thum.io/get/width/1000/crop/750/noanimate/${link}`;
