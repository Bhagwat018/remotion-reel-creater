import dotenv from "dotenv";
dotenv.config();

/**
 * Uses Gemini AI to transform an English/Hindi competitor reel
 * into a high-energy, original Hinglish Remotion reel.json configuration.
 */
export async function remixContentWithGemini({ channel, url, caption, topicHint = "" }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from .env!");
  }

  const prompt = `
You are the Lead Creative Director for "@techwith.GenZ", an Indian Instagram tech channel making fast-paced, high-retention 30-40s tech & AI reels.

INPUT COMPETITOR CONTENT:
- Source Channel: @${channel}
- Source URL: ${url}
- Original Caption/Notes:
"""
${caption || topicHint}
"""

YOUR TASK:
Take the core idea/tool/hack from this competitor reel, but DO NOT copy word-for-word.
Completely RE-IMAGINE it for the Indian Gen-Z tech audience:
1. Super punchy, scroll-stopping 3-second hook in natural Hinglish (conversational Hindi + English tech terms).
2. 4 to 6 concise, visual scenes for Remotion video rendering.
3. Scene types must strictly be chosen from: "title", "card", "stat", "pills", "steps", "quote", "cta", "terminal", "code".
4. Voiceover script for each scene must be energetic, crisp Hindi (e.g. "Bhai ye naya AI tool...", "Step 1: seedha is website par jao...").
5. The last scene must include a natural call-to-action: "Aise daily AI updates ke liye follow karo @techwith.GenZ".
6. Generate a slug (lowercase alphanumeric with hyphens, e.g. "free-ai-video-editing-secret").

RETURN ONLY VALID JSON (no markdown fences, no extra text, strictly JSON matching this structure):
{
  "meta": {
    "slug": "unique-slug-here",
    "topic": "Topic in English/Hinglish",
    "title": "Short Punchy Title (max 6 words)",
    "handle": "@techwith.GenZ",
    "language": "Hinglish",
    "audience": "Tech enthusiasts, creators, AI seekers",
    "loop": false,
    "captions": true,
    "avatar": { "enabled": false },
    "captionStyle": "kinetic",
    "bgm": "bgm/cyber-groove.mp3",
    "bgmVolume": 0.16,
    "fullVoiceover": "Combined text of all scene voices",
    "instagramCaption": "Catchy Instagram caption with emojis and hashtags\\n\\nFollow @techwith.GenZ for daily AI tricks!\\n\\n#AI #TechNews #ViralReels #techwithgenz",
    "disclaimer": "Educational content only."
  },
  "scenes": [
    {
      "id": "s1-hook",
      "type": "title",
      "headline": "SHORT HEADLINE (3-5 words)",
      "leadIn": "CATEGORY TAG ⚡",
      "subtitle": "Hook text",
      "voice": "Hindi energetic voice for scene 1 (approx 8-12 words)"
    },
    {
      "id": "s2-point1",
      "type": "card",
      "headline": "KEY BENEFIT OR STEP",
      "leadIn": "STEP 1 🚀",
      "cardText": "Short bullet or card text",
      "voice": "Hindi voice explanation (approx 10-15 words)"
    },
    {
      "id": "s3-point2",
      "type": "stat",
      "headline": "STAT OR FEATURE",
      "leadIn": "SECRET STAT 📊",
      "value": "100% FREE",
      "label": "No Credit Card Needed",
      "voice": "Hindi voice explanation (approx 10-15 words)"
    },
    {
      "id": "s4-point3",
      "type": "card",
      "headline": "HOW TO GET IT",
      "leadIn": "PRO TIP 💡",
      "cardText": "Direct link or tip text",
      "voice": "Hindi voice explanation (approx 10-15 words)"
    },
    {
      "id": "s5-cta",
      "type": "title",
      "headline": "SAVE & SHARE THIS!",
      "leadIn": "DAILY AI TRICKS 🔥",
      "subtitle": "Follow @techwith.GenZ",
      "voice": "Aise aur viral AI tricks ke liye follow karo tech with GenZ!"
    }
  ]
}
`;

  const urlEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;

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
    throw new Error(`Gemini API Error: ${data.error.message}`);
  }

  const rawJson = data.candidates[0].content.parts[0].text.trim();
  const parsed = JSON.parse(rawJson);

  // Sync fullVoiceover and ensure exact natural Rishi voice
  parsed.meta.fullVoiceover = parsed.scenes.map((s) => s.voice).join(" ");
  parsed.meta.voice = "Rishi";
  parsed.meta.voiceSpeed = 1.05;
  return parsed;
}
