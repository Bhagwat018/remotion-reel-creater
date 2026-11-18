/**
 * Capital Protection & Groww Order Risk Manager
 * Mathematically enforces strict Stop-Loss, Asymmetric Risk-Reward, and Capital Preservation.
 */

export function calculateTradeSetup(stockData, settings = {}) {
  const currentPrice = stockData.currentPrice;
  const atr = stockData.technicals.atr14 || currentPrice * 0.025;
  const maxSlPct = settings.riskParameters?.maxStopLossPercent || 3.5;

  // 1. Calculate Stop Loss based on ATR volatility, capped at maxSlPct (3.5%)
  const atrBasedSl = currentPrice - 1.4 * atr;
  const hardCapSl = currentPrice * (1 - maxSlPct / 100);

  // Take the safer, tighter level so loss is strictly constrained
  const stopLoss = Math.max(atrBasedSl, hardCapSl);
  const stopLossPct = ((currentPrice - stopLoss) / currentPrice) * 100;
  const riskAmount = currentPrice - stopLoss;

  // 2. Targets based on Asymmetric Risk-Reward (Min 1:2.2 for TGT1, 1:3.5 for TGT2)
  const target1 = currentPrice + riskAmount * 2.2;
  const target1Pct = ((target1 - currentPrice) / currentPrice) * 100;

  const target2 = currentPrice + riskAmount * 3.5;
  const target2Pct = ((target2 - currentPrice) / currentPrice) * 100;

  const riskRewardRatio = target1Pct / stopLossPct;

  // 3. Recommended Buy Zone (Slight buffer around current market price)
  const buyMin = currentPrice * 0.995;
  const buyMax = currentPrice * 1.008;

  return {
    symbol: stockData.symbol,
    cleanName: stockData.cleanName,
    currentPrice,
    buyZone: {
      min: parseFloat(buyMin.toFixed(2)),
      max: parseFloat(buyMax.toFixed(2)),
    },
    stopLoss: {
      price: parseFloat(stopLoss.toFixed(2)),
      pct: parseFloat(stopLossPct.toFixed(2)),
    },
    target1: {
      price: parseFloat(target1.toFixed(2)),
      pct: parseFloat(target1Pct.toFixed(2)),
      action: "Book 50% Profit & Move SL to Cost",
    },
    target2: {
      price: parseFloat(target2.toFixed(2)),
      pct: parseFloat(target2Pct.toFixed(2)),
      action: "Book Remaining 50% / Trail Stop-Loss",
    },
    riskRewardRatio: parseFloat(riskRewardRatio.toFixed(2)),
    maxAllocationPct: settings.riskParameters?.maxPortfolioAllocationPerStock || 12,
    orderType: settings.growwDefaults?.orderType || "Limit / Regular Delivery (Cash)",
    holdingPeriod: settings.growwDefaults?.holdingPeriod || "3 to 15 Days (Swing Momentum)",
  };
}
