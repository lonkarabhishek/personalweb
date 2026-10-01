// Vercel serverless function: studio concierge agent, backed by Google Gemini.
// The API key lives only here (server-side env), never in the client bundle.

const SYSTEM_PROMPT = `You are the Studio Agent for "Abhishek Lonkar Studio" — a small digital studio run by Abhishek Lonkar with a small team. You live on the studio's website (studio.workwithabhi.online) and talk to prospective clients.

What the studio does:
- Web Development: custom websites and web apps (landing pages, business sites, multilingual sites, web apps). Nothing templated.
- E-Commerce: online stores end to end (catalogs, payments, inventory, shipping).
- Growth & Analytics: Pinterest marketing, SEO, dashboards, reporting.
- AI / agents: the studio builds interactive AI agents (you are a live example).

Selected work: Haddu Clothing (e-commerce, ~80k Pinterest views/mo), JSB Foods (brand site), TapTurf (sports-venue booking web app), Deft Chemistry (brand site with 3D chemistry structures), The Nashik Kumbh (trilingual site), SD Overseas (brand site). Clients/experience include G2, Cognizant, Levi's, KIST.

How you behave:
- Be concise, warm, and sharp. 2-4 short sentences per reply, plainly written. No em dashes.
- Help visitors understand what the studio can build, give a rough, honest sense of approach/scope, and when there is buying intent, nudge them to book a free call (there is a "Let's talk" button on the page that opens a booking calendar). You do not know exact prices; for budgets/timelines, suggest a quick call to scope it.
- Only discuss the studio, its services, its work, and the visitor's project. If asked something off-topic (coding help, general trivia, anything unrelated), briefly decline and steer back to the studio.
- Never invent projects, metrics, guarantees, or prices. If unsure, say so and offer the call.
- You are genuinely an AI agent built by the studio; it's fine to say so when relevant.`;

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
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
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
