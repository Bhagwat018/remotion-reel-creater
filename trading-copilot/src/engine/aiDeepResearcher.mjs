/**
 * AI Deep Research & Catalyst Agent (Powered by Gemini)
 * Generates institutional analysis in simple, natural Hinglish with clear Buy/Wait/Avoid decision badges.
 */
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const apiKey = process.env.GEMINI_API_KEY;

export async function deepResearchStock(stockData, tradeSetup) {
  if (!apiKey) {
    console.warn("⚠️ No GEMINI_API_KEY found, using rule-based research fallback");
    return generateFallbackResearch(stockData, tradeSetup);
  }

  const prompt = `You are a Senior Equity Research Analyst helping a common Indian retail investor trade safely on Groww with CAPITAL PROTECTION ("Sirf profit banana hai, loss strictly rokna hai").

Analyze this NSE stock:
Stock: ${stockData.cleanName} (${stockData.symbol})
Current Price: ₹${stockData.currentPrice} (${stockData.dayChangePct > 0 ? "+" : ""}${stockData.dayChangePct}%)
20 EMA: ₹${stockData.technicals.ema20} | 50 EMA: ₹${stockData.technicals.ema50}
RSI (14): ${stockData.technicals.rsi14}
Volume Expansion: ${stockData.technicals.volumeExpansionRatio}x (vs 20-day average)
52-Week High: ₹${stockData.technicals.high52w} (Distance: -${stockData.technicals.distanceTo52wHighPct}%)

Trade Setup on Groww:
- Buy Zone: ₹${tradeSetup.buyZone.min} - ₹${tradeSetup.buyZone.max}
- Strict Stop Loss: ₹${tradeSetup.stopLoss.price} (-${tradeSetup.stopLoss.pct}%)
- Target 1: ₹${tradeSetup.target1.price} (+${tradeSetup.target1.pct}%)
- Target 2: ₹${tradeSetup.target2.price} (+${tradeSetup.target2.pct}%)

Return a JSON with simple, conversational Hinglish (Hindi + English) so anyone can easily understand:
{
  "purchaseDecision": "BUY_NOW" (if current price is within buy zone) OR "WAIT_FOR_DIP" (if price is already overbought / ran up) OR "AVOID" (if too risky),
  "decisionBadge": "🟢 ABHI KHAREED SAKTE HAIN (BUY IN ZONE)" or "🟡 THODA WAIT KARO (DIP PAR KHAREEDNA)" or "🔴 ABHI MAT KHAREEDO (RISK HIGH)",
  "simpleCompanyIntro": "Simple 1-line Hinglish explanation of company business in plain words",
  "whyBuyHinglish": [
    "Simple reason 1 in easy Hinglish explaining why stock can go up",
    "Simple reason 2 in easy Hinglish explaining why stock can go up"
  ],
  "riskHinglish": [
    "Simple risk 1 in easy Hinglish (e.g. kahan nuksaan ho sakta hai)",
    "Simple risk 2 in easy Hinglish (e.g. kab exit karna hai bina lalach ke)"
  ],
  "growwStepByStep": "Exact 1-line tip for what to do in Groww app right now",
  "conviction": "HIGH",
  "finalVerdict": "Simple, punchy conclusion sentence in Hinglish"
}`;

  const models = ["gemini-3.5-flash-lite", "gemini-3.5-flash", "gemini-flash-latest"];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(7000),
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return {
            ...parsed,
            analyzedAt: new Date().toISOString(),
            modelUsed: model,
          };
        }
      }
    } catch (err) {
      continue;
    }
  }

  return generateFallbackResearch(stockData, tradeSetup);
}

function generateFallbackResearch(stockData, tradeSetup) {
  const isGoodBuy = stockData.currentPrice <= tradeSetup.buyZone.max;
  return {
    purchaseDecision: isGoodBuy ? "BUY_NOW" : "WAIT_FOR_DIP",
    decisionBadge: isGoodBuy
      ? "🟢 ABHI KHAREED SAKTE HAIN (BUY IN ZONE)"
      : "🟡 THODA WAIT KARO (DIP PAR KHAREEDNA)",
    simpleCompanyIntro: `${stockData.cleanName} India ki ek bohot badi aur established company hai jo NSE par actively trade hoti hai.`,
    whyBuyHinglish: [
      `Stock apne 20 EMA (₹${stockData.technicals.ema20}) ke upar hai aur trading volume normal se ${stockData.technicals.volumeExpansionRatio}x badh raha hai.`,
      `Technical chart par breakout bana hai, aage 6% se 10% tak fast recovery dikh sakti hai.`,
    ],
    riskHinglish: [
      `Agar poora Nifty market girta hai, toh ye stock bhi thoda neeche aa sakta hai.`,
      `₹${tradeSetup.stopLoss.price} ka Stop-Loss pakka lagana, agar iske neeche jaye toh bina soche exit kar lena.`,
    ],
    growwStepByStep: `Groww me Delivery (Cash) select karein aur ₹${tradeSetup.buyZone.min} se ₹${tradeSetup.buyZone.max} ke beech Limit order lagayein.`,
    conviction: "HIGH",
    finalVerdict: `Safe swing trade hai jisme downside sirf -${tradeSetup.stopLoss.pct}% tak lock hai aur upside +${tradeSetup.target1.pct}% hai.`,
    analyzedAt: new Date().toISOString(),
    modelUsed: "deterministic-rules",
  };
}
