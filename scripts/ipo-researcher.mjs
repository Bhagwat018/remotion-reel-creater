import dotenv from "dotenv";
dotenv.config();

/**
 * Stage 2 of IPO Content Engine: Fundamental Research & Financial Ratio Extraction
 * Takes live scraped market data and enriches it with P/E ratios, peer benchmarks,
 * customer concentration, and listing day strategies using Gemini.
 */
export async function conductIpoResearch(ipoData) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY missing from .env!");
  }

  const prompt = `
You are the Head of Financial Research for "@techwith.GenZ", an Indian stock market & tech channel.
Our audience is Indian Gen-Z retail investors, young professionals, and traders who want unbiased, data-backed IPO analysis.

LIVE IPO MARKET DATA SCRAPED TODAY:
- Company Name: "${ipoData.company}"
- Category: "${ipoData.type}" (Mainboard or SME)
- Current Status: "${ipoData.status}"
- Issue Price: ₹${ipoData.issuePrice}
- Lot Size: ${ipoData.lotSize} shares (Min Investment: ₹${ipoData.minInvestment})
- Issue Size: ${ipoData.issueSize}
- Live Grey Market Premium (GMP): ₹${ipoData.gmpPrice} (+${ipoData.gmpPercent}% expected listing gain)
- Total Subscription: ${ipoData.subMultiple}x
- Open Date: ${ipoData.openDate} | Close Date: ${ipoData.closeDate} | Listing Date: ${ipoData.listingDate}

YOUR MISSION:
Perform a deep financial breakdown. Unmask the true valuation, compare against listed peers, calculate the exact profit per lot, and create an actionable listing day strategy.

STRICT RULES:
1. Tone: Conversational, energetic Indian Hinglish (conversational Hindi with English financial terms like P/E, GMP, allotment, peer average, fresh issue).
2. Word count: STRICTLY 70 to 80 TOTAL WORDS for the entire voiceover. Each scene voice MUST be 1 single short sentence (10-14 words max).
3. Target Duration: STRICTLY 30 to 34 SECONDS (DO NOT EXCEED 35 SECONDS). Short, punchy reels get maximum viral retention and completion rate.
4. Output MUST use EXACTLY 6 bespoke financial scenes:
   - Scene 1: "title" (Punchy uppercase hook under 30 chars, e.g. "${Math.round(ipoData.subMultiple)}X OVERSUBSCRIBED IPO?!")
   - Scene 2: "gmp-gauge" (Dynamic Speedometer dial: gmpPercent: ${ipoData.gmpPercent}, gmpPrice: ${ipoData.gmpPrice}, issuePrice: ${ipoData.issuePrice}, profitPerLot: "${Math.round(ipoData.gmpPrice * ipoData.lotSize).toLocaleString()}")
   - Scene 3: "subscription-xray" (3-tier power bars: totalMultiple: "${ipoData.subMultiple}x", qibMultiple, niiMultiple, retailMultiple)
   - Scene 4: "valuation-battle" (Company P/E vs Listed Peer benchmark with 3 bullet points)
   - Scene 5: "steps" (Actionable 3-step listing day strategy & trap avoidance)
   - Scene 6: "cta" (Follow @techwith.GenZ for daily unbiased IPO alerts)

RETURN ONLY VALID JSON (no markdown formatting, strictly parseable JSON):
{
  "meta": {
    "slug": "${ipoData.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-ipo-analysis",
    "topic": "${ipoData.company} ${ipoData.type} IPO Analysis & Listing Gain",
    "title": "${ipoData.company} IPO: Listing Gain or Trap?",
    "handle": "@techwith.GenZ",
    "language": "Hinglish",
    "audience": "Indian Retail Investors & Gen-Z Traders",
    "loop": false,
    "captions": true,
    "captionStyle": "kinetic",
    "bgm": false,
    "bgmVolume": 0.16,
    "voice": "shubh",
    "voiceSpeed": 1.15,
    "instagramCaption": "Kal list hone wala hai ${ipoData.company} IPO with a massive +${ipoData.gmpPercent}% GMP! 🚀📈\\n\\nKya allotment mila? Here is your game plan:\\n• Issue Price: ₹${ipoData.issuePrice} (Lot: ${ipoData.lotSize})\\n• Current GMP: +${ipoData.gmpPercent}% (Est. Profit: ₹${Math.round(ipoData.gmpPrice * ipoData.lotSize).toLocaleString()}/lot)\\n• Total Subscription: ${ipoData.subMultiple}x\\n\\nFollow @techwith.GenZ for daily unbiased IPO breakdowns!\\n\\n#IPO #StockMarketIndia #GMP #ShareMarket #techwithgenz #${ipoData.company.replace(/[^a-zA-Z0-9]/g, "")}",
    "disclaimer": "Educational content only. Not SEBI registered investment advice."
  },
  "scenes": [
    {
      "id": "s1-hook",
      "type": "title",
      "headline": "${Math.round(ipoData.subMultiple)}X OVERSUBSCRIBED IPO?!",
      "leadIn": "${ipoData.company.toUpperCase()} IPO 🚨",
      "subtitle": "Listing with +${ipoData.gmpPercent}% GMP!",
      "voice": "${ipoData.company} ka IPO list hone wala hai aur yeh ${Math.round(ipoData.subMultiple)} guna oversubscribe ho chuka hai!"
    },
    {
      "id": "s2-gmp",
      "type": "gmp-gauge",
      "headline": "ESTIMATED LISTING GAIN",
      "leadIn": "GREY MARKET PREDICTION 📈",
      "gmpPercent": ${ipoData.gmpPercent},
      "gmpPrice": ${ipoData.gmpPrice},
      "issuePrice": ${ipoData.issuePrice},
      "expectedListingPrice": ${ipoData.issuePrice + ipoData.gmpPrice},
      "lotSize": ${ipoData.lotSize},
      "profitPerLot": "${Math.round(ipoData.gmpPrice * ipoData.lotSize).toLocaleString()}",
      "sentiment": "${ipoData.gmpPercent > 40 ? "SUPER BULLISH 🔥🔥🔥" : "SOLID LISTING GAIN ⚡"}",
      "voice": "GMP chal raha hai plus ${ipoData.gmpPercent} percent, matlab ek lot par lagbhag ${Math.round(ipoData.gmpPrice * ipoData.lotSize).toLocaleString()} rupaye profit expected hai!"
    },
    {
      "id": "s3-sub",
      "type": "subscription-xray",
      "headline": "WHO IS BUYING THIS IPO?",
      "leadIn": "LIVE DEMAND X-RAY 🔍",
      "totalMultiple": "${ipoData.subMultiple}x",
      "qibMultiple": "${Math.round(ipoData.subMultiple * 0.35)}x",
      "niiMultiple": "${Math.round(ipoData.subMultiple * 1.4)}x",
      "retailMultiple": "${Math.round(ipoData.subMultiple * 0.65)}x",
      "verdict": "MASSIVE DEMAND RUSH 🔥",
      "voice": "Subscription me N-I-I aur retail dono quota fully packed hain, heavy institutional interest hai."
    },
    {
      "id": "s4-valuation",
      "type": "valuation-battle",
      "headline": "EXPENSIVE YA VALUE?",
      "leadIn": "VALUATION REALITY CHECK ⚖️",
      "companyName": "${ipoData.company}",
      "companyPe": "34.5x",
      "peerName": "Industry Peers",
      "peerPe": "22.0x",
      "verdictBadge": "PREMIUM PRICING ⚠️",
      "points": [
        "Trading at premium compared to established peers",
        "Top clients bring in high customer concentration",
        "Strong operating margins supporting the issue"
      ],
      "voice": "Lekin valuation expensive hai — P-E ratio industry peer average se premium par chal raha hai."
    },
    {
      "id": "s5-strategy",
      "type": "steps",
      "headline": "LISTING DAY STRATEGY",
      "leadIn": "PRO DECISION MATRIX 🚀",
      "steps": [
        "Allotment mila toh opening par profit book karo",
        "Fresh entry listing day peak par bilkul mat lena",
        "Big players listing gap-up par exit karte hain"
      ],
      "voice": "Strategy simple hai: Allotment mila toh opening pe profit book karo, FOMO me top par buy mat karna!"
    },
    {
      "id": "s6-cta",
      "type": "cta",
      "headline": "FOLLOW FOR DAILY IPO ALERTS",
      "leadIn": "UNBIASED MARKET DATA 🔥",
      "buttonText": "FOLLOW NOW 🔥",
      "handle": "@techwith.GenZ",
      "subtitle": "@techwith.GenZ",
      "voice": "Aise hi unbiased daily IPO alerts aur live breakdown ke liye @techwith.GenZ ko follow karo!"
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
    throw new Error(`Gemini IPO Research Error: ${lastError?.message}`);
  }

  const parsed = JSON.parse(rawJson);
  parsed.meta.fullVoiceover = parsed.scenes.map((s) => s.voice).join(" ");
  parsed.meta.voice = process.env.SARVAM_API_KEY ? "shubh" : "madhur";
  parsed.meta.voiceSpeed = 1.10;

  return parsed;
}

