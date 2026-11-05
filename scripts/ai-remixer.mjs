import dotenv from "dotenv";
import { conductStudioResearch } from "./studio-researcher.mjs";
dotenv.config();

/**
 * Professional Studio AI Remixer & Component Architect
 * Builds high-retention 30-35s Reels with 7-9 rapid visual scenes,
 * featuring Architecture Flowcharts, Split Battles, Live Terminals, and Roadmaps.
 */
export async function remixContentWithGemini({ channel, url, caption, topicHint = "" }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from .env!");
  }

  // 1. Conduct Deep Technical Research
  console.log("   🔬 [Phase 1/4] Conducting Technical Research & Architecture Extraction...");
  const research = await conductStudioResearch({
    topic: topicHint || caption.slice(0, 100) || "AI Technology",
    competitorCaption: caption,
    channel,
  });

  console.log(`   💡 Core Concept: ${research.coreConcept}`);
  console.log(`   🎯 Selected Hook: "${research.recommendedHook}"`);

  // 2. Generate 7-9 Scene Rapid Storyboard (30-35 Seconds)
  console.log("   🎨 [Phase 2/4] Engineering 7-9 Scene Visual Storyboard (30-35s Target)...");

  const prompt = `
You are the Executive Video Director for "@techwith.GenZ", an Indian Instagram tech channel making fast-paced, visually stunning 30-35s tech reels.

TECHNICAL RESEARCH DATA (USE THESE EXACT COMPONENTS):
- Selected Hook: "${research.recommendedHook}"
- Core Concept: "${research.coreConcept}"
- System Architecture Nodes: ${JSON.stringify(research.technicalArchitecture.nodes)}
- Split Comparison Battle: ${JSON.stringify(research.comparisonBattle)}
- Terminal Command: ${JSON.stringify(research.terminalCommand)}
- Key Metric: ${JSON.stringify(research.keyMetrics[0] || { value: "100%", label: "Automated" })}
- Actionable Steps: ${JSON.stringify(research.actionableSteps)}

VIDEO SPECIFICATIONS (STRICT RULES):
1. Target Duration: STRICTLY 30 to 35 SECONDS MAX (Short, punchy video for maximum viral watch time & completion rate).
2. Scene Count: STRICTLY 6 high-impact scenes (Scene cuts every 4.0 to 5.0 seconds).
3. Total Spoken Words: STRICTLY 75 to 85 WORDS in high-energy, conversational Indian Hinglish. Each scene voice must be 1 single punchy sentence (10-14 words max).
4. MANDATORY VISUAL SCENES:
   - Scene 1: "title" (Punchy uppercase hook under 30 chars, e.g. "1 FOLDER SE AUTO REELS?!", with subtitle explaining "${research.recommendedHook}")
   - Scene 2: "compare" (Split-screen battle using the comparisonBattle data)
   - Scene 3: "flow" (Architecture pipeline with glowing nodes using technicalArchitecture.nodes)
   - Scene 4: "terminal" (Real CLI command and output logs using terminalCommand data)
   - Scene 5: "steps" (3 actionable steps roadmap under 10 words per step using actionableSteps data)
   - Scene 6: "cta" (Call-to-action to follow @techwith.GenZ for daily deep dives)
5. VOICE SCRIPT:
   - Natural conversational Indian creator tone (Shubh voice).
   - Fast, confident, zero fluff, zero "comment karo" spam in the middle.
   - High information density per second.

RETURN ONLY VALID JSON (no markdown fences, strictly JSON):
{
  "meta": {
    "slug": "unique-slug-here",
    "topic": "${research.coreConcept}",
    "title": "Short Punchy Title (max 6 words)",
    "handle": "@techwith.GenZ",
    "language": "Hinglish",
    "audience": "Developers, AI enthusiasts, Tech creators",
    "loop": false,
    "captions": true,
    "captionStyle": "kinetic",
    "bgm": false,
    "bgmVolume": 0.16,
    "voice": "${process.env.SARVAM_API_KEY ? "rohan" : "madhur"}",
    "voiceSpeed": 1.10,
    "instagramCaption": "SEO-friendly caption with emojis, 3-bullet technical summary, and hashtags\\n\\nFollow @techwith.GenZ for daily AI tricks!\\n\\n#AI #TechNews #ViralReels #techwithgenz",
    "disclaimer": "Educational content only."
  },
  "scenes": [
    {
      "id": "s1-hook",
      "type": "title",
      "headline": "SHORT HOOK HEADLINE",
      "leadIn": "INSANE AI SECRET ⚡",
      "subtitle": "Hook subtext",
      "voice": "Hindi energetic voice for scene 1 (approx 10-12 words)"
    },
    {
      "id": "s2-compare",
      "type": "compare",
      "headline": "THE REAL COMPARISON",
      "leadIn": "OLD VS NEW ⚔️",
      "leftTitle": "${research.comparisonBattle.leftTitle}",
      "leftBadge": "${research.comparisonBattle.leftBadge}",
      "leftItems": ${JSON.stringify(research.comparisonBattle.leftItems)},
      "rightTitle": "${research.comparisonBattle.rightTitle}",
      "rightBadge": "${research.comparisonBattle.rightBadge}",
      "rightItems": ${JSON.stringify(research.comparisonBattle.rightItems)},
      "voice": "Hindi explanation comparing the two approaches (approx 12-15 words)"
    },
    {
      "id": "s3-flow",
      "type": "flow",
      "headline": "${research.technicalArchitecture.systemTitle || "ARCHITECTURE PIPELINE"}",
      "leadIn": "SYSTEM DESIGN 🧠",
      "nodes": ${JSON.stringify(research.technicalArchitecture.nodes)},
      "voice": "Hindi explanation of how the architecture flows (approx 12-15 words)"
    },
    {
      "id": "s4-stat",
      "type": "stat",
      "headline": "THE PERFORMANCE JUMP",
      "leadIn": "PROVEN STATS 📊",
      "value": "${research.keyMetrics[0]?.value || "10x"}",
      "label": "${research.keyMetrics[0]?.label || "Faster Production"}",
      "voice": "Hindi explanation of the massive metric improvement (approx 10-12 words)"
    },
    {
      "id": "s5-terminal",
      "type": "terminal",
      "headline": "LIVE EXECUTION",
      "leadIn": "DEV WORKFLOW 💻",
      "command": "${research.terminalCommand.command}",
      "output": ${JSON.stringify(research.terminalCommand.output)},
      "voice": "Hindi explanation of running the real CLI tool (approx 10-12 words)"
    },
    {
      "id": "s6-steps",
      "type": "steps",
      "headline": "HOW YOU CAN DO IT",
      "leadIn": "3-STEP BLUEPRINT 🚀",
      "steps": ${JSON.stringify(research.actionableSteps)},
      "voice": "Hindi walkthrough of the 3 simple steps (approx 12-15 words)"
    },
    {
      "id": "s7-twist",
      "type": "card",
      "headline": "THE PRO SECRET",
      "leadIn": "INSIDER HACK 💡",
      "cardText": "The real secret that top 1% creators use to automate everything",
      "chip": "KEY TAKEAWAY",
      "voice": "Hindi explanation of the core insider takeaway (approx 10-12 words)"
    },
    {
      "id": "s8-cta",
      "type": "cta",
      "headline": "FOLLOW FOR DAILY HACKS",
      "leadIn": "DAILY TECH BREAKDOWNS 🔥",
      "buttonText": "FOLLOW NOW 🔥",
      "handle": "@techwith.GenZ",
      "subtitle": "@techwith.GenZ",
      "voice": "Aise hi real-world tech aur system architecture breakdowns ke liye @techwith.GenZ ko follow karo!"
    }
  ]
}
`;

  const candidateModels = [
    "gemini-3.5-flash-lite",
    "gemini-3.5-flash",
    "gemini-flash-latest",
  ];

  let rawJson = null;
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
          rawJson = data.candidates[0].content.parts[0].text.trim();
          break;
        }
      } catch (err) {
        lastError = err;
        console.warn(`   ⚠️ Gemini attempt ${attempt} on ${model} warning: ${err.message}. Retrying...`);
        await new Promise((r) => setTimeout(r, 1500 * attempt));
      }
    }
    if (rawJson) break;
  }

  if (!rawJson) {
    throw new Error(`Gemini API Error (all fallbacks exhausted): ${lastError?.message}`);
  }

  const parsed = JSON.parse(rawJson);

  parsed.meta.fullVoiceover = parsed.scenes.map((s) => s.voice).join(" ");
  parsed.meta.voice = process.env.SARVAM_API_KEY ? "rohan" : "madhur";
  parsed.meta.voiceSpeed = 1.10;

  return parsed;
}
