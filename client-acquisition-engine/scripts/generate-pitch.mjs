import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const WORKSPACE_ROOT = path.resolve(ROOT_DIR, "..");

dotenv.config({ path: path.join(WORKSPACE_ROOT, ".env") });

const settingsPath = path.join(ROOT_DIR, "config", "settings.json");
const nichesPath = path.join(ROOT_DIR, "config", "niches.json");

const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
const nichesData = JSON.parse(fs.readFileSync(nichesPath, "utf-8"));

export async function generatePitch(prospect) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in .env");
  }

  const nicheInfo = nichesData.niches[prospect.niche] || {
    name: "Local Business",
    painPoint: "Managing customer inquiries manually, lack of an official mobile app",
    offerAngle: "High-performance custom website and verified Android app on Google Play Store"
  };

  const prompt = `
You are a senior full-stack developer and mobile app builder reaching out on Instagram DM to a business owner.
Our Core Offering:
- We build high-performance, beautiful custom Websites.
- We build official Android Mobile Apps published live on Google Play Store under their business brand name.
- We offer quick 7-day turnaround at founder-friendly, low rates (NEVER mention any specific price, currency, or numerical fee).

Target Prospect Profile:
- Username: ${prospect.username}
- Business / Doctor / Owner Name: ${prospect.fullName || prospect.username}
- Category: ${nicheInfo.name}
- Bio Details: ${prospect.bio || "Active local business on Instagram"}
- Web Presence: ${prospect.currentLink ? `Has only link: ${prospect.currentLink}` : "No official website or mobile app listed in bio"}
- Core Opportunity / Pain Point: ${nicheInfo.painPoint}
- Tailored Solution: ${nicheInfo.offerAngle}

Writing Instructions:
1. Length: Exactly 3 to 4 short sentences.
2. Opening: Warm, authentic compliment referencing 1 or 2 specific details from their bio (city, specialty, equipment, or service).
3. Value Proposition: Explain how a custom website + their own official Android App on Google Play Store makes them look 10x more premium and helps get more clients/members.
4. Competitive Edge: Mention that we deliver fast at extremely low, budget-friendly rates. (STRICT: Do NOT write any dollar or rupee numbers).
5. Call to Action (Hook): Politely ask if you can share a quick 30-second interactive visual demo/prototype link built for their type of business.
6. Tone: Natural, respectful, conversational human engineer — ZERO hype words or spam phrases.
Output ONLY the final DM message text without greetings like 'Subject:' or quotation marks.
`;

  const modelsToTry = [
    settings.geminiModel || "gemini-flash-lite-latest",
    "gemini-pro-latest",
    "gemini-flash-latest"
  ];

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500
          }
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts) {
        let text = data.candidates[0].content.parts
          .map((p) => p.text)
          .filter(Boolean)
          .join("")
          .trim();
        // Remove surrounding quotes if model added them
        text = text.replace(/^["']|["']$/g, "").trim();
        return text;
      }
    } catch (err) {
      console.warn(`[Gemini] Model ${model} failed, trying next...:`, err.message);
    }
  }

  // High-converting fallback if API is temporarily unavailable
  return `Hey ${prospect.fullName || prospect.username}! Loved seeing your profile and active work. We build custom high-performance websites and official Android apps published directly on Google Play Store under your brand name so your customers can book easily. We deliver quickly at very low, founder-friendly rates. Would it be okay if I share a quick 30-second visual demo link?`;
}

// Quick CLI test
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const sample = {
    username: "shreegym.poweredbyjerai",
    fullName: "Shree Gym | Jerai",
    bio: "Shree gym | Indore 🇮🇳\n🕒 Open 24×7\n🏋🏻 Powered by Jerai Fitness\n📍 3rd Floor, Giriraj Grande, Vijay Nagar",
    niche: "gyms",
    currentLink: "https://facebook.com/shreegym"
  };
  generatePitch(sample).then(res => {
    console.log("--- TEST PITCH ---");
    console.log(res);
    console.log("------------------");
  });
}
