#!/usr/bin/env node
/**
 * Groww AI Trading & IPO Research Copilot (Master CLI Runner)
 * Scans NSE universe, filters high-probability setups, runs AI catalyst research,
 * and prints exact Groww Action Cards.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { screenStockUniverse } from "./engine/quantitativeFilter.mjs";
import { calculateTradeSetup } from "./engine/riskManager.mjs";
import { deepResearchStock } from "./engine/aiDeepResearcher.mjs";
import { formatGrowwStockCard, formatIpoCard } from "./formatters/growwCardFormatter.mjs";
import { fetchLiveIpos } from "./scrapers/ipoScraper.mjs";
import { fetchStockTechnicals } from "./scrapers/yahooFinance.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const settings = JSON.parse(
  fs.readFileSync(path.join(rootDir, "config", "settings.json"), "utf-8")
);
const universe = JSON.parse(
  fs.readFileSync(path.join(rootDir, "config", "universe.json"), "utf-8")
);

async function runCli() {
  const args = process.argv.slice(2);
  const isIpoOnly = args.includes("--ipo");
  const isQuick = args.includes("--quick");
  const stockArg = args.find((a) => a.startsWith("--stock="));

  console.log(`
╔══════════════════════════════════════════════════════════════╗
  🧠 GROWW AI TRADING & IPO RESEARCH COPILOT
  🛡️ Capital Protection & Institutional Intelligence
  ⏰ ${new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "short", day: "numeric" })} | Market Time: ${new Date().toLocaleTimeString("en-IN")}
╚══════════════════════════════════════════════════════════════╝`);

  // 1. Single Stock On-Demand Mode
  if (stockArg) {
    const symbol = stockArg.split("=")[1].toUpperCase().includes(".NS")
      ? stockArg.split("=")[1].toUpperCase()
      : `${stockArg.split("=")[1].toUpperCase()}.NS`;

    console.log(`🔍 Running on-demand deep research for ${symbol}...`);
    try {
      const stock = await fetchStockTechnicals(symbol);
      const setup = calculateTradeSetup(stock, settings);
      const ai = await deepResearchStock(stock, setup);
      console.log(formatGrowwStockCard(stock, setup, ai));
    } catch (err) {
      console.error(`❌ Error analyzing ${symbol}:`, err.message);
    }
    return;
  }

  // 2. IPO Intelligence Scan
  let liveIpos = [];
  try {
    liveIpos = await fetchLiveIpos();
    console.log(`\n📦 Live IPOs Analyzed: ${liveIpos.length} Opportunities`);
    const applyIpos = liveIpos.filter((i) => i.verdict.includes("APPLY"));
    if (applyIpos.length > 0) {
      console.log(`🔥 High Conviction IPOs Found: ${applyIpos.length}`);
      for (const ipo of applyIpos.slice(0, 3)) {
        console.log(formatIpoCard(ipo));
      }
    } else {
      console.log("ℹ️ No High-Conviction IPOs currently open with GMP > 20%. Preserving capital!");
    }
  } catch (ipoErr) {
    console.warn("⚠️ Could not refresh IPOs:", ipoErr.message);
  }

  if (isIpoOnly) return;

  // 3. Stock Universe Screening
  const targetSymbols = isQuick ? universe.symbols.slice(0, 12) : universe.symbols;
  console.log(`\n📊 Screening ${targetSymbols.length} NSE stocks for high-conviction swing breakouts...`);

  const topCandidates = await screenStockUniverse(targetSymbols, settings);
  console.log(`✅ Screener passed: ${topCandidates.length} potential setups found.`);

  // Pick top 3 for deep AI research
  const selectedPicks = topCandidates.slice(0, 3);
  const fullReports = [];

  for (let i = 0; i < selectedPicks.length; i++) {
    const candidate = selectedPicks[i];
    console.log(`\n🤖 Running AI Deep Research on #${i + 1}: ${candidate.cleanName} (Score: ${candidate.score}/100)...`);
    const setup = calculateTradeSetup(candidate, settings);
    const aiResearch = await deepResearchStock(candidate, setup);

    fullReports.push({
      stock: candidate,
      setup,
      aiResearch,
    });

    console.log(formatGrowwStockCard(candidate, setup, aiResearch));
  }

  // Save report to disk
  const todayStr = new Date().toISOString().split("T")[0];
  const reportPath = path.join(rootDir, "data", "daily_picks", `report_${todayStr}.json`);
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        date: todayStr,
        generatedAt: new Date().toISOString(),
        topPicks: fullReports,
        ipos: liveIpos,
      },
      null,
      2
    )
  );

  console.log(`\n💾 Daily intelligence saved to: ${reportPath}`);
  console.log(`💡 You can execute these orders manually inside your Groww app on your phone!`);
}

runCli().catch(console.error);
