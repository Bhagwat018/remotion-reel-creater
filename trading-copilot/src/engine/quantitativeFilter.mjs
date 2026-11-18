/**
 * Quantitative Stock Screener (The First-Line Safety Gatekeeper)
 * Filters hundreds of candidates down to the Top 3-5 High-Conviction setups.
 */
import { fetchStockTechnicals } from "../scrapers/yahooFinance.mjs";

export async function screenStockUniverse(symbols, settings = {}) {
  const minRsi = settings.riskParameters?.minRsi || 45;
  const maxRsi = settings.riskParameters?.maxRsi || 72;

  const results = [];

  for (const symbol of symbols) {
    try {
      const data = await fetchStockTechnicals(symbol);
      const t = data.technicals;

      // Scoring Model (Max 100 Points)
      let score = 0;
      const reasons = [];

      // 1. Trend Alignment (+25 pts)
      if (t.isStrongUptrend) {
        score += 25;
        reasons.push("Strong Uptrend: Price > EMA20 > EMA50");
      } else if (data.currentPrice > t.ema20) {
        score += 15;
        reasons.push("Moderate Momentum: Above 20 EMA");
      }

      // Long term health (+10 pts)
      if (t.isAbove200EMA) {
        score += 10;
        reasons.push("Bullish Long-term: Above 200 EMA");
      }

      // 2. RSI Health (+20 pts)
      if (t.rsi14 >= 50 && t.rsi14 <= 68) {
        score += 20;
        reasons.push(`Optimal RSI (${t.rsi14}): Strong buying pressure without overbought risk`);
      } else if (t.rsi14 >= minRsi && t.rsi14 <= maxRsi) {
        score += 10;
        reasons.push(`Acceptable RSI (${t.rsi14})`);
      }

      // 3. Volume Expansion (+25 pts)
      if (t.volumeExpansionRatio >= 1.4) {
        score += 25;
        reasons.push(`Institutional Volume Spike: ${t.volumeExpansionRatio}x above 20d avg`);
      } else if (t.volumeExpansionRatio >= 1.0) {
        score += 15;
        reasons.push(`Healthy Volume: ${t.volumeExpansionRatio}x above 20d avg`);
      }

      // 4. Proximity to Breakout / 52w High (+20 pts)
      if (t.isBreakingOut20d) {
        score += 20;
        reasons.push(`20-Day Range Breakout (Resistance @ ₹${t.resistance20d})`);
      } else if (t.distanceTo52wHighPct <= 10) {
        score += 15;
        reasons.push(`Near 52-Week High (-${t.distanceTo52wHighPct}% from ₹${t.high52w})`);
      }

      // Gatekeeper: Must score at least 55 to be considered
      if (score >= 55) {
        results.push({
          ...data,
          score,
          signals: reasons,
        });
      }
    } catch (err) {
      // Continue gracefully on holiday or missing ticker
      continue;
    }
  }

  // Sort descending by highest quantitative score
  results.sort((a, b) => b.score - a.score);

  return results;
}
