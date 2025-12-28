/**
 * Minimal server-side analyzer for Hormone Tracker
 * ------------------------------------------------
 * npm i express cors openai
 * node server.js
 *
 * .env:
 *   OPENAI_API_KEY=...
 *   PORT=3000
 */
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function buildSystemMessage() {
  return `You are an empathetic, caution-first interpreter of structured personality/hormone data.
Rules you MUST follow exactly:
1) Non-diagnostic language only. Never present a clinical diagnosis. Use probabilistic phrasing such as "may suggest", "is consistent with", "could reflect", and include uncertainty.
2) No manipulative or coercive suggestions. Do not suggest ways to influence or manipulate others. Do not provide scripts or tactics for coercion, deception, or emotional manipulation.
3) No violent or illegal advice. Refuse politely if asked to provide such content.
4) Do not claim clinical expertise. Recommend professionals for mental health, medical, legal, or safety-critical issues.
5) Be concise. Produce clearly labeled sections. Each section must begin with a one-sentence summary (2-18 words).
6) When asked for personality labels (MBTI, etc.), provide these as "possible interpretations" with confidence levels (Low/Medium/High). Do not assert them as facts.
7) For partner/job/sports/communication suggestions: produce safe, realistic, non-prescriptive recommendations, and include a short rationale (1-2 sentences) plus one practical next step.
8) Each output must finish with a short "uncertainty & next steps" paragraph reminding the user this is exploratory.
9) Output must be valid JSON only, matching the OUTPUT_SCHEMA exactly.`;
}

function buildOutputSchema(modules) {
  return {
    meta: {
      generatedAt: "<ISO timestamp>",
      modules,
      tone: "non-manipulative"
    },
    results: {
      AttachmentStyle: {
        summary: "Short 1-line summary",
        confidence: "Low|Medium|High",
        explanation: "2-3 sentences explaining why",
        practicalTips: ["one-line actionable tip", "another..."]
      },
      Jobs: {
        summary: "...",
        confidence: "Low|Medium|High",
        recommendations: [
          { role: "e.g. Research Analyst", why: "1-2 sentence rationale", nextStep: "e.g. take X course" }
        ]
      },
      PartnerProfile: {
        summary: "...",
        confidence: "Low|Medium|High",
        matchTraits: ["calm under stress", "affectionate", "low-competition"],
        communicationTips: ["use 'I' statements", "schedule check-ins"],
        avoidBehaviors: ["brusque criticism", "ambiguous plans"]
      },
      Sports: {
        summary: "...",
        confidence: "Low|Medium|High",
        recommendations: [{ sport: "e.g. Yoga", why: "...", howStart: "..." }]
      },
      CommunicationGuide: {
        summary: "...",
        do: ["3 bullets"],
        dont: ["3 bullets"],
        shortScript: "Optional 1-2 sentence example phrase (non-manipulative)"
      },
      Personality: {
        mbti: { possible: "INFP", confidence: "Low|Medium|High", explanation: "1 sentence" },
        big5: { openness: 7, conscientiousness: 4, extraversion: 3, agreeableness: 6, neuroticism: 5 },
        notes: "free text 2-3 sentences"
      }
    },
    disclaimer:
      "This readout is an exploratory, non-diagnostic interpretation based on your answers. It’s intended to offer gentle, practical suggestions — not to replace clinical or professional advice. The report will avoid definitive labels and won’t recommend manipulation or harm. Use responsibly."
  };
}

function pickModules(inputData) {
  const order = ["AttachmentStyle", "Jobs", "PartnerProfile", "Sports", "CommunicationGuide", "Personality"];
  const req = inputData?.settings?.requestedModules;
  if (Array.isArray(req) && req.length) return order.filter(m => req.includes(m));
  return ["AttachmentStyle", "CommunicationGuide", "Personality"];
}

app.post("/api/analyze", async (req, res) => {
  try {
    const inputData = req.body?.inputData;
    if (!inputData || typeof inputData !== "object") {
      return res.status(400).json({ error: "Missing inputData object." });
    }

    const modules = pickModules(inputData);
    const outputSchema = buildOutputSchema(modules);

    const userMessage = [
      "Below is the inputData JSON. Use the system directions to interpret it.",
      "Do not output anything except JSON matching OUTPUT_SCHEMA.",
      "",
      "inputData:",
      JSON.stringify(inputData, null, 2),
      "",
      "OUTPUT_SCHEMA:",
      JSON.stringify(outputSchema, null, 2)
    ].join("\n");

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        { role: "system", content: buildSystemMessage() },
        { role: "user", content: userMessage }
      ]
    });

    const text = completion.choices?.[0]?.message?.content || "";
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      return res.status(502).json({ error: "Model did not return valid JSON.", raw: text.slice(0, 4000) });
    }

    // Light validation (keep it non-brittle)
    if (!parsed.meta || !parsed.results) {
      return res.status(502).json({ error: "JSON missing required top-level keys meta/results.", raw: parsed });
    }

    res.json(parsed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
