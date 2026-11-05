import dotenv from "dotenv";
dotenv.config();

/**
 * Stage 1 of Studio Pipeline: Topic Deep Research & Technical Intelligence
 * Extracts real architecture layers, numbers, benchmarks, and 3 viral hook angles.
 */
export async function conductStudioResearch({ topic, competitorCaption = "", channel = "" }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing from .env!");
  }

  const prompt = `
You are the Senior Technical Research Director for "@techwith.GenZ", an Indian Instagram tech channel.
Our audience is smart developers, tech entrepreneurs, and Gen-Z creators in India.

INPUT TOPIC / COMPETITOR CONCEPT:
Topic: "${topic}"
Source Channel: "${channel}"
Original Caption / Raw Notes:
"""
${competitorCaption}
"""

YOUR MISSION:
Perform a deep technical and architectural breakdown of this topic. Do NOT write generic superficial fluff.
Extract real engineering substance, tools, math, and architecture so that we can build heavy visual diagrams and flowchart animations.

Return strictly a JSON object with this exact structure:
{
  "coreConcept": "1-line explanation of the real underlying tech / system",
  "viralHookAngles": [
    "Shocking / Contrarian Hook 1 in Hinglish (e.g. Why X company actually loses money on Y)",
    "Curiosity / Secret Hook 2 in Hinglish (e.g. How 1 single folder runs an entire automated AI business)",
    "Hard Numbers Hook 3 in Hinglish (e.g. How to replace a ₹50,000 tool with an open-source model in 30 seconds)"
  ],
  "recommendedHook": "The single best hook from above with the highest CTR & retention potential",
  "technicalArchitecture": {
    "systemTitle": "Short title for the architecture flowchart (e.g. AI Content Pipeline)",
    "nodes": [
      { "title": "Input Layer", "subtitle": "Web Scraper / RSS", "icon": "🌐", "status": "ACTIVE", "accentColor": "#60a5fa" },
      { "title": "AI Director", "subtitle": "Gemini 3.5 Flash", "icon": "🧠", "status": "SYNTHESIZED", "accentColor": "#c084fc" },
      { "title": "Audio Studio", "subtitle": "Sarvam AI Shubh", "icon": "🎙️", "status": "24kHz HI-RES", "accentColor": "#fb923c" },
      { "title": "Render Engine", "subtitle": "Remotion 9:16", "icon": "⚡", "status": "60FPS 1080p", "accentColor": "#4ade80" }
    ]
  },
  "comparisonBattle": {
    "headline": "THE REAL COMPARISON",
    "leftTitle": "Legacy / Paid Way",
    "leftBadge": "EXPENSIVE & SLOW",
    "leftItems": ["₹5,000/mo Subscriptions", "4-6 Hours Manual Editing", "Complex Video Timelines"],
    "rightTitle": "Autonomous AI Way",
    "rightBadge": "100% AUTOMATED",
    "rightItems": ["₹0 Open-Source Tech", "30-Sec Automated Render", "Instant 9:16 Vertical Video"]
  },
  "terminalCommand": {
    "headline": "LIVE EXECUTION",
    "command": "npx remotion render --composition=Reel --9:16",
    "output": [
      "[INFO] Spying competitor channels... DONE",
      "[INFO] Synthesizing Sarvam AI Audio (Shubh)... DONE",
      "[SUCCESS] Video rendered in 32 seconds!"
    ]
  },
  "keyMetrics": [
    { "value": "100%", "label": "Fully Autonomous" },
    { "value": "30s", "label": "Render Speed" }
  ],
  "actionableSteps": [
    "Step 1: Scrape viral competitor concepts using headless browser",
    "Step 2: Remix script with Gemini into 7-scene rapid storyboard",
    "Step 3: Generate studio voiceover & render 9:16 Remotion reel"
  ]
}
`;

  const candidateModels = [
    "gemini-3.5-flash-lite",
    "gemini-3.5-flash",
    "gemini-flash-latest",
  ];

  let lastError = null;

  for (const model of candidateModels) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const urlEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const res = await fetch(urlEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
            },
          }),
        });

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error.message || JSON.stringify(data.error));
        }

        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
          const rawJson = data.candidates[0].content.parts[0].text.trim();
          return JSON.parse(rawJson);
        }
      } catch (err) {
        lastError = err;
        console.warn(`   ⚠️ Gemini attempt ${attempt} on ${model} warning: ${err.message}. Retrying...`);
        await new Promise((r) => setTimeout(r, 1500 * attempt));
      }
    }
  }

  throw new Error(`Gemini Research Error (all fallbacks exhausted): ${lastError?.message}`);
}

