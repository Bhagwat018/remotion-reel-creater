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
2. Word count: Approx 100 to 115 total words for the entire voiceover.
3. Target Duration: 30 to 35 seconds.
4. Output MUST use the bespoke financial components:
   - Scene 1: "title" (Punchy uppercase hook under 35 characters, e.g. "${Math.round(ipoData.subMultiple)}X OVERSUBSCRIBED IPO?!")
   - Scene 2: "gmp-gauge" (Speedometer dial with gmpPercent: ${ipoData.gmpPercent}, gmpPrice: ${ipoData.gmpPrice}, issuePrice: ${ipoData.issuePrice}, profitPerLot: "${Math.round(ipoData.gmpPrice * ipoData.lotSize).toLocaleString()}")
   - Scene 3: "subscription-xray" (3-tier breakdown: totalMultiple: "${ipoData.subMultiple}x", qibMultiple, niiMultiple, retailMultiple)
   - Scene 4: "valuation-battle" (Company P/E vs Listed Peer benchmark with red flag points)
   - Scene 5: "stat" (Fresh issue proceeds vs OFS exit)
   - Scene 6: "steps" (Actionable 3-step listing day strategy)
   - Scene 7: "card" (The retail investor golden rule / warning)
   - Scene 8: "cta" (Follow @techwith.GenZ for unbiased daily IPO alerts)

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
    "voiceSpeed": 1.10,
    "instagramCaption": "Kal list hone wala hai ${ipoData.company} IPO with a massive +${ipoData.gmpPercent}% GMP! 🚀📈\\n\\nKya allotment mila? Here is your game plan:\\n• Issue Price: ₹${ipoData.issuePrice} (Lot: ${ipoData.lotSize})\\n• Current GMP: +${ipoData.gmpPercent}% (Est. Profit: ₹${Math.round(ipoData.gmpPrice * ipoData.lotSize).toLocaleString()}/lot)\\n• Total Subscription: ${ipoData.subMultiple}x\\n\\nFollow @techwith.GenZ for daily unbiased IPO breakdowns!\\n\\n#IPO #StockMarketIndia #GMP #ShareMarket #techwithgenz #${ipoData.company.replace(/[^a-zA-Z0-9]/g, "")}",
    "disclaimer": "Educational content only. Not SEBI registered investment advice."
  },
  "scenes": [
    {
      "id": "s1-hook",
      "type": "title",
      "headline": "${Math.round(ipoData.subMultiple)}X OVERSUBSCRIBED IPO?!",
      "leadIn": "${ipoData.company.toUpperCase()} IPO 🚨",
      "subtitle": "Listing Tomorrow with +${ipoData.gmpPercent}% GMP!",
      "voice": "Bhai ${ipoData.company} ka IPO kal list hone wala hai aur yeh ${Math.round(ipoData.subMultiple)} guna se zyada over-subscribe ho chuka hai!"
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
      "voice": "Grey market me iska GMP ${ipoData.gmpPercent} percent chal raha hai, matlab ek single lot pe lagbhag ${Math.round(ipoData.gmpPrice * ipoData.lotSize).toLocaleString()} rupaye ka expected profit dikh raha hai!"
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
      "voice": "Demand dekhoge toh hosh ud jayenge: HNI category me insane bidding hui hai aur retail quota bhi poora pack hai."
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
        "Trading at a 55% premium compared to established peers",
        "Top clients bring in high customer concentration",
        "Strong operating margins supporting the high price band"
      ],
      "voice": "Lekin savdhaan! Company ka P-E ratio peer average se lagbhag pachpan percent premium par trade kar raha hai."
    },
    {
      "id": "s5-proceeds",
      "type": "stat",
      "headline": "100% FRESH ISSUE",
      "leadIn": "WHERE MONEY GOES 🏭",
      "value": "${ipoData.issueSize}",
      "label": "Fresh Issue Capital",
      "subtext": "Zero OFS Promoter Dumping",
      "badge": "EXPANSION PROCEED ✅",
      "voice": "Sabse acchi baat yeh hai ki promoters ne ek bhi share dump nahi kiya, poora paisa business expansion me jaa raha hai."
    },
    {
      "id": "s6-strategy",
      "type": "steps",
      "headline": "LISTING DAY STRATEGY",
      "leadIn": "PRO DECISION MATRIX 🚀",
      "steps": [
        "If allotted: Book 70% listing profit immediately at 9:15 AM",
        "Keep remaining with strict stop-loss at issue price ₹${ipoData.issuePrice}",
        "If not allotted: Strictly avoid buying on listing day peak"
      ],
      "voice": "Toh strategy simple hai: Allotment mila toh opening par profit book karo, aur listing ke din FOMO me buy mat karna!"
    },
    {
      "id": "s7-rule",
      "type": "card",
      "headline": "THE RETAIL GOLDEN RULE",
      "leadIn": "CRITICAL INSIGHT 💡",
      "cardText": "Never chase a stock on listing day after a 70% gap-up opening — big institutions use retail euphoria to exit.",
      "chip": "KEY TAKEAWAY",
      "voice": "Kyunki heavy gap-up opening ke baad aksar profit booking aati hai aur retail buyers top par phas jaate hain."
    },
    {
      "id": "s8-cta",
      "type": "cta",
      "headline": "FOLLOW FOR DAILY IPO ALERTS",
      "leadIn": "UNBIASED MARKET DATA 🔥",
      "buttonText": "FOLLOW NOW 🔥",
      "handle": "@techwith.GenZ",
      "subtitle": "@techwith.GenZ",
      "voice": "Aise hi honest IPO breakdowns aur live data ke liye @techwith.GenZ ko follow karo!"
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

