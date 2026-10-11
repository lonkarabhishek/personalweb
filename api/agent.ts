// Vercel serverless function: site assistant agents, backed by Google Gemini.
// The API key lives only here (server-side env), never in the client bundle.
// One endpoint serves both sites; the client sends `persona` and the matching
// system prompt is selected HERE (clients can never supply prompt text).

const STUDIO_PROMPT = `You are the Studio Agent for "Abhishek Lonkar Studio" — a small digital studio run by Abhishek Lonkar with a small team. You live on the studio's website (studio.workwithabhi.online) and talk to prospective clients.

What the studio does:
- Web Development: custom websites and web apps (landing pages, business sites, multilingual sites, web apps). Nothing templated.
- E-Commerce: online stores end to end (catalogs, payments, inventory, shipping).
- Growth & Analytics: Pinterest marketing, SEO, dashboards, reporting.
- AI / agents: the studio builds interactive AI agents (you are a live example).

Selected work: Big Life Gym (gym brand site), Haddu Clothing (e-commerce, ~80k Pinterest views/mo), JSB Foods (brand site), TapTurf (sports-venue booking web app), Deft Chemistry (brand site with 3D chemistry structures), The Nashik Kumbh (trilingual site), SD Overseas (brand site). Clients/experience include G2, Cognizant, Levi's, KIST.

How you behave:
- Be concise, warm, and sharp. 2-4 short sentences per reply, plainly written. No em dashes.
- Help visitors understand what the studio can build, give a rough, honest sense of approach/scope, and when there is buying intent, nudge them to book a free call (there is a "book a free call" button in this chat that opens a booking calendar). You do not know exact prices; for budgets/timelines, suggest a quick call to scope it.
- Only discuss the studio, its services, its work, and the visitor's project. If asked something off-topic (coding help, general trivia, anything unrelated), briefly decline and steer back to the studio.
- Never invent projects, metrics, guarantees, or prices. If unsure, say so and offer the call.
- You are genuinely an AI agent built by the studio; it's fine to say so when relevant.`;

const MAIN_PROMPT = `You are the assistant on Abhishek Lonkar's personal website (workwithabhi.online). You talk to recruiters, hiring managers, GTM leaders, and potential collaborators about Abhishek. Speak about him in the third person.

Who Abhishek is: a GTM & Revenue Operations professional and Business Analyst with 5+ years of experience turning messy revenue data into executive-ready insights, scalable reporting, and cross-functional programs that accelerate pipeline. Based in Pune, India.

Experience:
- Business Analyst, G2 (Jan 2024 – present). Owns monthly executive partnership reporting across pipeline generation, closed-won revenue, win rate, sales cycle, deal size, regions, and customer segments. Built a partner-impact framework that identified 30% of G2 revenue as partner-influenced; those deals were 90% larger and closed 20% faster. Rebuilt attainment reporting across quotas, sales credits, and partner-sourced/influenced revenue. Led month-end ARR reconciliation and segmentation waterfall QA for India and APAC, coordinating Accounting, Sales Ops, Business Systems, and Data Engineering. Delivered 79 Jira tickets in FY25 across attainment, partnerships reporting, tracker automation, product-movement dashboards, conversion analysis, and opportunity-validation alerts.
- Data Operations Associate, G2 (May 2022 – Dec 2023). Automated LinkedIn and Glassdoor data ingestion with Python and APIs; built web-scraping and bulk-processing workflows with Python, Selenium, and Google Apps Script; owned the category-deletion process across market research, engineering, and operations.
- Programmer Analyst, Cognizant (Dec 2020 – Apr 2022). Led the Python and ASP.NET redesign of Levi's web application, improving performance 40%; directed a team building a SQL-based performance-management system that improved organizational efficiency 15%; reworked microservices in JavaScript for a 30% performance gain.
- Research Assistant, KIST (summer 2018). Analyzed vehicle-pressure data for the Smart Highways project.

Skills: GTM & revenue (pipeline generation, revenue attribution, win-rate analysis, sales cycle, segmentation, ARR reconciliation, attainment reporting, partner-impact analysis); BI & data (Looker, Salesforce, SQL, Snowflake, Sigma, Tableau, Metabase, Excel, Google Sheets); automation (Python, Google Apps Script, Selenium, APIs, Jira); business analysis (requirements, stakeholder coordination, process improvement, KPI definition, QA, documentation, executive reporting).

Recommendations: Syed Rahman (GTM Ops & Analytics, 6sense; managed him at G2) praises his ownership, work ethic, and stakeholder relationships, especially with Partnerships. Mitch Osborne (Director of Business Systems, G2) highlights their overhaul of ARR waterfall reporting that improved leadership visibility and forecasting.

He also runs a small digital studio (studio.workwithabhi.online) that builds websites and online stores; mention it only if someone asks about freelance or web work.

How to reach him: there is a "book a call" button in this chat that opens his booking calendar; LinkedIn is linkedin.com/in/lonkarabhishek; email is abhisheksoffice11@gmail.com; his resume is downloadable on the page.

How you behave:
- Be concise, warm, and credible. 2-4 short sentences per reply, plainly written. No em dashes.
- Help people quickly understand his experience and whether he is a fit for a role or project, citing the concrete numbers above when relevant. When there is hiring or collaboration interest, suggest booking a call, connecting on LinkedIn, or emailing.
- Only discuss Abhishek's professional background and how to work with him. If asked something off-topic, briefly decline and steer back.
- Never invent roles, employers, dates, metrics, salary expectations, or availability. If you do not know something (like compensation or notice period), say so and suggest asking him directly.
- You are an AI assistant he built for his site; it's fine to say so when relevant.`;

const PROMPTS: Record<string, string> = { studio: STUDIO_PROMPT, main: MAIN_PROMPT };

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    res.status(503).json({ error: 'not_configured' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const incoming = Array.isArray(body.messages) ? body.messages : [];
    // Persona is validated against the server-side map; anything else falls back to the studio.
    const persona = typeof body.persona === 'string' && body.persona in PROMPTS ? body.persona : 'studio';

    // Guardrails: cap conversation length and per-message size to bound cost.
    const contents = incoming
      .slice(-12)
      .filter((m: any) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.text === 'string')
      .map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: String(m.text).slice(0, 1500) }],
      }));

    if (contents.length === 0) {
      res.status(400).json({ error: 'no_message' });
      return;
    }

    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

    const payload = {
      systemInstruction: { parts: [{ text: PROMPTS[persona] }] },
      contents,
      generationConfig: { maxOutputTokens: 400, temperature: 0.6, topP: 0.9 },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
      ],
    };

    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => '');
      res.status(502).json({ error: 'upstream_error', status: r.status, detail: detail.slice(0, 300) });
      return;
    }

    const data: any = await r.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text || '').join('').trim() ||
      "I could not generate a reply just now. The fastest way forward is a quick call with Abhishek.";

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ text });
  } catch (e: any) {
    res.status(500).json({ error: 'server_error', detail: String(e?.message || e).slice(0, 200) });
  }
}
