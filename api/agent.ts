// Vercel serverless function: site assistant agents, backed by Claude (Haiku 5.5)
// via the official Anthropic SDK. The API key lives only here (server-side env),
// never in the client bundle. One endpoint serves both sites; the client sends
// `persona` and the matching system prompt is selected HERE (clients can never
// supply prompt text).
import Anthropic from '@anthropic-ai/sdk';
import { WORK, type WorkCard } from '../content/work';

const STUDIO_PROMPT = `You ARE "Abhishek Lonkar Studio" — a small digital studio run by Abhishek Lonkar with a small team. You live on the studio's website (studio.workwithabhi.online) and talk to prospective clients.

Voice (most important):
- You represent the studio. Every answer is the studio talking, in the first person plural: "we", "our", "us". Example: "We build custom websites and online stores. We'd start with a short call to scope it."
- Never refer to the studio in the third person ("the studio does", "they build", "Abhishek's team offers"). Never describe yourself as a bot that works for the studio; you speak as the studio. If someone asks whether they are talking to an AI, say yes, you are the studio's AI assistant, then carry on speaking as the studio.
- Refer to Abhishek by name only when it matters (e.g. "Abhishek will be on the call").

What the studio does:
- Web Development: custom websites and web apps (landing pages, business sites, multilingual sites, web apps). Nothing templated.
- E-Commerce: online stores end to end (catalogs, payments, inventory, shipping).
- Growth & Analytics: Pinterest marketing, SEO, dashboards, reporting.
- AI / agents: the studio builds interactive AI agents (you are a live example).

Selected work (ids for the show_work tool in brackets): Big Life Gym [big-life-gym] (gym brand site), Haddu Clothing [haddu] (e-commerce, ~80k Pinterest views/mo), JSB Foods [jsb-foods] (brand site), TapTurf [tapturf] (sports-venue booking web app), Deft Chemistry [deft-chemistry] (brand site with 3D chemistry structures), The Nashik Kumbh [nashik-kumbh] (trilingual site), SD Overseas [sd-overseas] (brand site). Clients/experience include G2, Cognizant, Levi's, KIST.

Showing our work: whenever the visitor wants to SEE what we've built (portfolio, examples, projects, "show me your work", "what have you made", "something like X", or they describe a project similar to one of ours), call the show_work tool instead of listing projects as text. Pick 2 to 4 ids that fit best (all 4 strongest if they just want to see work: big-life-gym, haddu, tapturf, nashik-kumbh). The message you pass is shown above the cards: one or two warm, proud sentences in our voice, no list. The cards themselves carry the names, descriptions and links, so do not repeat them.

How you behave:
- Be concise, warm, and sharp. 2-4 short sentences per reply, plainly written. No em dashes.
- Help visitors understand what we can build, give a rough, honest sense of our approach/scope, and when there is buying intent, nudge them to book a free call (there is a "book a free call" button in this chat that opens our booking calendar). You do not know exact prices; for budgets/timelines, suggest a quick call so we can scope it.
- Only discuss our studio, our services, our work, and the visitor's project. If asked something off-topic (coding help, general trivia, anything unrelated), briefly decline and steer back to what we do.
- Never invent projects, metrics, guarantees, or prices. If unsure, say so and offer the call.`;

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

Showing his work: whenever someone wants to SEE what he has done (his work, projects, achievements, examples, "show me", "what has he built", "proof", or a role-fit question where concrete results help), call the show_work tool instead of listing it as text. Ids: g2-partner-impact (30% partner-influenced revenue, 90% larger deals, 20% faster), g2-attainment (attainment reporting, 79 FY25 deliverables), g2-arr (ARR reconciliation and waterfall QA), g2-data-ops (Python automation and data pipelines), levis-redesign (40% performance gain at Cognizant), cognizant-perf-system (15% efficiency gain), studio (his side web studio; only when freelance/web work comes up). Pick 2 to 4 that fit best (default: g2-partner-impact, g2-attainment, g2-arr, levis-redesign). The message you pass is shown above the cards: one or two confident sentences, no list, and do not repeat the card contents.

How to reach him: there is a "book a call" button in this chat that opens his booking calendar; LinkedIn is linkedin.com/in/lonkarabhishek; email is abhisheksoffice11@gmail.com; his resume is downloadable on the page.

How you behave:
- Be concise, warm, and credible. 2-4 short sentences per reply, plainly written. No em dashes.
- Help people quickly understand his experience and whether he is a fit for a role or project, citing the concrete numbers above when relevant. When there is hiring or collaboration interest, suggest booking a call, connecting on LinkedIn, or emailing.
- Only discuss Abhishek's professional background and how to work with him. If asked something off-topic, briefly decline and steer back.
- Never invent roles, employers, dates, metrics, salary expectations, or availability. If you do not know something (like compensation or notice period), say so and suggest asking him directly.
- You are an AI assistant he built for his site; it's fine to say so when relevant.`;

const PROMPTS: Record<string, string> = { studio: STUDIO_PROMPT, main: MAIN_PROMPT };

// Per-persona canned replies, kept in the same voice as the prompts (studio = "we").
const FALLBACK: Record<string, string> = {
  studio: 'We could not put together a reply just now. The fastest way forward is a quick call with us.',
  main: 'I could not put together a reply just now. The fastest way forward is a quick call with Abhishek.',
};
const REFUSAL: Record<string, string> = {
  studio: "We can't help with that one here. Happy to talk about our work, or you can book a call with us.",
  main: "I can't help with that one here. Happy to talk about Abhishek's work, or you can book a call with him.",
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  // The SDK reads ANTHROPIC_API_KEY itself; we check up front so a missing key
  // yields a clean 503 the widget can fall back on, not an auth error mid-call.
  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(503).json({ error: 'not_configured' });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const incoming = Array.isArray(body.messages) ? body.messages : [];
    // Persona is validated against the server-side map; anything else falls back to the studio.
    const persona = typeof body.persona === 'string' && body.persona in PROMPTS ? body.persona : 'studio';

    // Guardrails: cap conversation length and per-message size to bound cost.
    const messages: Anthropic.MessageParam[] = incoming
      .slice(-12)
      .filter((m: any) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.text === 'string')
      .map((m: any) => ({ role: m.role as 'user' | 'assistant', content: String(m.text).slice(0, 1500) }));

    // The widget's transcript opens with the assistant greeting; the API requires
    // the first message to be from the user, so drop any leading assistant turns.
    while (messages.length && messages[0].role !== 'user') messages.shift();

    if (messages.length === 0) {
      res.status(400).json({ error: 'no_message' });
      return;
    }

    const client = new Anthropic();
    const model = process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5';
    const catalog = WORK[persona as 'studio' | 'main'];

    // One tool: the model "shows" work by naming catalog ids + a short intro. We
    // resolve the ids server-side and the chat renders them as cards, so the
    // model never has to describe the portfolio in prose (and never invents it).
    const showWork: Anthropic.Tool = {
      name: 'show_work',
      description: 'Show selected work as rich visual cards in the chat (previews, descriptions, links). Use whenever the visitor wants to see work, projects, examples, achievements or proof. Pass 2 to 4 ids that fit the request best.',
      input_schema: {
        type: 'object',
        properties: {
          message: { type: 'string', description: 'One or two sentences shown above the cards, in your usual voice. Do not list the projects; the cards do that.' },
          ids: { type: 'array', items: { type: 'string', enum: catalog.map((c) => c.id) }, minItems: 1, maxItems: 4, description: 'Catalog ids to show, most relevant first.' },
        },
        required: ['message', 'ids'],
      },
    };

    const response = await client.messages.create({
      model,
      // Replies are deliberately short (2-4 sentences); this is a cost cap, not a typical budget.
      max_tokens: 700,
      // Static per-persona prompt first so it is a stable, cacheable prefix.
      system: [{ type: 'text', text: PROMPTS[persona], cache_control: { type: 'ephemeral' } }],
      tools: [showWork],
      tool_choice: { type: 'auto' },
      // Chat-style route: low effort keeps it fast and cheap; adaptive thinking stays on by default.
      output_config: { effort: 'low' },
      messages,
    });

    let text = FALLBACK[persona];
    let cards: WorkCard[] = [];
    if (response.stop_reason === 'refusal') {
      text = REFUSAL[persona];
    } else {
      const joined = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === 'text')
        .map((b) => b.text)
        .join('')
        .trim();
      if (joined) text = joined;

      const call = response.content.find((b): b is Anthropic.ToolUseBlock => b.type === 'tool_use' && b.name === 'show_work');
      if (call) {
        const input = (call.input || {}) as { message?: unknown; ids?: unknown };
        const ids = Array.isArray(input.ids) ? input.ids.filter((x): x is string => typeof x === 'string') : [];
        cards = ids.map((id) => catalog.find((c) => c.id === id)).filter((c): c is WorkCard => Boolean(c)).slice(0, 4);
        const msg = typeof input.message === 'string' ? input.message.trim() : '';
        if (msg) text = msg;
        else if (!joined) text = persona === 'studio' ? "Here's some of what we've built." : "Here's some of what he has built.";
      }
    }

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(cards.length ? { text, cards } : { text });
  } catch (error: any) {
    // Most specific first; every branch keeps the JSON shape the widget falls back on.
    if (error instanceof Anthropic.AuthenticationError) {
      res.status(503).json({ error: 'not_configured', detail: 'invalid API key' });
    } else if (error instanceof Anthropic.RateLimitError) {
      res.status(429).json({ error: 'rate_limited' });
    } else if (error instanceof Anthropic.APIError) {
      res.status(502).json({ error: 'upstream_error', status: error.status, detail: String(error.message).slice(0, 300) });
    } else {
      res.status(500).json({ error: 'server_error', detail: String(error?.message || error).slice(0, 200) });
    }
  }
}
