/**
 * Yahoo Finance OHLCV & Technical Analysis Engine (100% Free, Zero API Keys)
 * Uses high-speed curl transport to pull daily price bars for NSE stocks and computes institutional technical indicators.
 */
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

// Exponential Moving Average
export function calculateEMA(data, period) {
  const k = 2 / (period + 1);
  const ema = [];
  let sum = 0;
  for (let i = 0; i < period; i++) {
    sum += data[i];
  }
  ema[period - 1] = sum / period;

  for (let i = period; i < data.length; i++) {
    ema[i] = data[i] * k + ema[i - 1] * (1 - k);
  }
  return ema;
}

// Relative Strength Index (RSI 14)
export function calculateRSI(closes, period = 14) {
  if (closes.length <= period) return 50;
  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) gains += diff;
    else losses += Math.abs(diff);
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  for (let i = period + 1; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff >= 0) {
      avgGain = (avgGain * (period - 1) + diff) / period;
      avgLoss = (avgLoss * (period - 1)) / period;
    } else {
      avgGain = (avgGain * (period - 1)) / period;
      avgLoss = (avgLoss * (period - 1) + Math.abs(diff)) / period;
    }
  }

  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - 100 / (1 + rs);
}

// Average True Range (ATR 14) for volatility-adjusted Stop Loss
export function calculateATR(highs, lows, closes, period = 14) {
  if (closes.length <= period) return closes[closes.length - 1] * 0.03;
  const trs = [];
  for (let i = 1; i < closes.length; i++) {
    const tr = Math.max(
      highs[i] - lows[i],
      Math.abs(highs[i] - closes[i - 1]),
      Math.abs(lows[i] - closes[i - 1])
    );
    trs.push(tr);
  }

  let atr = trs.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (let i = period; i < trs.length; i++) {
    atr = (atr * (period - 1) + trs[i]) / period;
  }
  return atr;
}

/**
 * Fetch raw candles and calculate technical health for an NSE symbol
 * @param {string} symbol (e.g. "BEL.NS", "TATASTEEL.NS")
 */
export async function fetchStockTechnicals(symbol) {
  const url = `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?range=1y&interval=1d`;

  let json = null;
  try {
    const { stdout } = await execFileAsync(
      "curl",
      [
        "-s",
        "--connect-timeout",
        "5",
        "--max-time",
        "10",
        url,
        "-H",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "-H",
        "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      ],
      { maxBuffer: 10 * 1024 * 1024 }
    );
    json = JSON.parse(stdout);
  } catch (err) {
    throw new Error(`Failed to fetch Yahoo Finance for ${symbol}: ${err.message}`);
  }

  const result = json.chart?.result?.[0];
  if (!result || !result.indicators?.quote?.[0]) {
    throw new Error(`Empty candle data returned for ${symbol}`);
  }

  const meta = result.meta;
  const quote = result.indicators.quote[0];

  // Filter out null / invalid bars
  const validIndices = [];
  for (let i = 0; i < (quote.close || []).length; i++) {
    if (
      quote.open?.[i] !== null &&
      quote.close?.[i] !== null &&
      quote.high?.[i] !== null &&
      quote.low?.[i] !== null &&
      quote.volume?.[i] !== null
    ) {
      validIndices.push(i);
    }
  }

  if (validIndices.length < 50) {
    throw new Error(`Insufficient trading history (${validIndices.length} bars) for ${symbol}`);
  }

  const opens = validIndices.map((i) => quote.open[i]);
  const highs = validIndices.map((i) => quote.high[i]);
  const lows = validIndices.map((i) => quote.low[i]);
  const closes = validIndices.map((i) => quote.close[i]);
  const volumes = validIndices.map((i) => quote.volume[i]);

  const n = closes.length;
  const currentPrice = meta.regularMarketPrice || closes[n - 1];
  const prevClose = meta.chartPreviousClose || closes[n - 2];
  const dayChangePct = ((currentPrice - prevClose) / prevClose) * 100;

  // Technical Calculations
  const ema20Arr = calculateEMA(closes, 20);
  const ema50Arr = calculateEMA(closes, 50);
  const ema200Arr = closes.length >= 200 ? calculateEMA(closes, 200) : null;

  const ema20 = ema20Arr[n - 1] || currentPrice;
  const ema50 = ema50Arr[n - 1] || currentPrice;
  const ema200 = ema200Arr ? ema200Arr[n - 1] : null;

  const rsi14 = calculateRSI(closes, 14);
  const atr14 = calculateATR(highs, lows, closes, 14);

  // Volume metrics
  const lastVolume = volumes[n - 1];
  const last20Vols = volumes.slice(-21, -1);
  const avg20Vol =
    last20Vols.length > 0
      ? last20Vols.reduce((a, b) => a + b, 0) / last20Vols.length
      : lastVolume;
  const volumeExpansionRatio = avg20Vol > 0 ? lastVolume / avg20Vol : 1.0;

  // 52-week High / Low & Resistance levels
  const high52w = meta.fiftyTwoWeekHigh || Math.max(...highs);
  const low52w = meta.fiftyTwoWeekLow || Math.min(...lows);
  const distanceTo52wHighPct = ((high52w - currentPrice) / high52w) * 100;

  // 20-day consolidation breakout level
  const recent20Highs = highs.slice(-21, -1);
  const resistance20d = recent20Highs.length > 0 ? Math.max(...recent20Highs) : currentPrice;
  const isBreakingOut20d = currentPrice >= resistance20d * 0.995;

  // Trend Alignment: Price > EMA20 > EMA50
  const isStrongUptrend = currentPrice > ema20 && ema20 > ema50;
  const isAbove200EMA = ema200 ? currentPrice > ema200 : true;

  return {
    symbol,
    cleanName: symbol.replace(".NS", ""),
    currency: meta.currency || "INR",
    currentPrice: parseFloat(currentPrice.toFixed(2)),
    prevClose: parseFloat(prevClose.toFixed(2)),
    dayChangePct: parseFloat(dayChangePct.toFixed(2)),
    technicals: {
      ema20: parseFloat(ema20.toFixed(2)),
      ema50: parseFloat(ema50.toFixed(2)),
      ema200: ema200 ? parseFloat(ema200.toFixed(2)) : null,
      rsi14: parseFloat(rsi14.toFixed(1)),
      atr14: parseFloat(atr14.toFixed(2)),
      lastVolume,
      avg20Vol: Math.round(avg20Vol),
      volumeExpansionRatio: parseFloat(volumeExpansionRatio.toFixed(2)),
      high52w: parseFloat(high52w.toFixed(2)),
      low52w: parseFloat(low52w.toFixed(2)),
      distanceTo52wHighPct: parseFloat(distanceTo52wHighPct.toFixed(1)),
      resistance20d: parseFloat(resistance20d.toFixed(2)),
      isBreakingOut20d,
      isStrongUptrend,
      isAbove200EMA,
    },
  };
}
