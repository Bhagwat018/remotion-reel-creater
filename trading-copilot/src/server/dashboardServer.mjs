/**
 * Mobile-First Trading & IPO Copilot Dashboard Server
 * Runs a clean, zero-latency dark-mode web interface accessible on both Mac and Phone.
 */
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchLiveIpos } from "../scrapers/ipoScraper.mjs";
import { fetchStockTechnicals } from "../scrapers/yahooFinance.mjs";
import { calculateTradeSetup } from "../engine/riskManager.mjs";
import { deepResearchStock } from "../engine/aiDeepResearcher.mjs";
import { screenStockUniverse } from "../engine/quantitativeFilter.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../..");

const settings = JSON.parse(
  fs.readFileSync(path.join(rootDir, "config", "settings.json"), "utf-8")
);
const universe = JSON.parse(
  fs.readFileSync(path.join(rootDir, "config", "universe.json"), "utf-8")
);

const PORT = settings.server?.port || 3300;
const HOST = "0.0.0.0"; // Accessible on local Wi-Fi from mobile phone

// Find the latest saved report
function getLatestReport() {
  const dir = path.join(rootDir, "data", "daily_picks");
  if (!fs.existsSync(dir)) return null;
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.startsWith("report_") && f.endsWith(".json"))
    .sort()
    .reverse();

  if (files.length === 0) return null;
  try {
    return JSON.parse(fs.readFileSync(path.join(dir, files[0]), "utf-8"));
  } catch {
    return null;
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // 1. API: Get latest scan data
  if (url.pathname === "/api/picks") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const report = getLatestReport();
    res.end(JSON.stringify(report || { topPicks: [], ipos: [] }));
    return;
  }

  // 2. API: Trigger scan on demand
  if (url.pathname === "/api/scan") {
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
      const topCandidates = await screenStockUniverse(universe.symbols.slice(0, 15), settings);
      const selectedPicks = topCandidates.slice(0, 3);
      const fullReports = [];

      for (const candidate of selectedPicks) {
        const setup = calculateTradeSetup(candidate, settings);
        const aiResearch = await deepResearchStock(candidate, setup);
        fullReports.push({ stock: candidate, setup, aiResearch });
      }

      const ipos = await fetchLiveIpos();

      const todayStr = new Date().toISOString().split("T")[0];
      const reportPath = path.join(rootDir, "data", "daily_picks", `report_${todayStr}.json`);
      fs.mkdirSync(path.dirname(reportPath), { recursive: true });
      const payload = {
        date: todayStr,
        generatedAt: new Date().toISOString(),
        topPicks: fullReports,
        ipos,
      };
      fs.writeFileSync(reportPath, JSON.stringify(payload, null, 2));

      res.end(JSON.stringify({ success: true, payload }));
    } catch (e) {
      res.end(JSON.stringify({ success: false, error: e.message }));
    }
    return;
  }

  // 3. API: Single Stock Analysis on demand
  if (url.pathname === "/api/analyze-stock") {
    const sym = url.searchParams.get("symbol") || "BEL";
    const fullSym = sym.toUpperCase().includes(".NS") ? sym.toUpperCase() : `${sym.toUpperCase()}.NS`;
    res.writeHead(200, { "Content-Type": "application/json" });
    try {
      const stock = await fetchStockTechnicals(fullSym);
      const setup = calculateTradeSetup(stock, settings);
      const aiResearch = await deepResearchStock(stock, setup);
      res.end(JSON.stringify({ success: true, stock, setup, aiResearch }));
    } catch (e) {
      res.end(JSON.stringify({ success: false, error: e.message }));
    }
    return;
  }

  // 4. HTML Dashboard UI (Mobile Optimized, Dark Theme, Tailwind CSS)
  if (url.pathname === "/" || url.pathname === "/index.html") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(renderDashboardHtml());
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

function renderDashboardHtml() {
  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>Groww AI Trading & IPO Copilot</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Plus Jakarta Sans', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    }
  </script>
  <style>
    body { background-color: #0b0f19; color: #f3f4f6; }
    .glass-card { background: rgba(17, 24, 39, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); }
    .glass-card:hover { border-color: rgba(99, 102, 241, 0.4); }
  </style>
</head>
<body class="min-h-screen pb-12 antialiased">
  <!-- Top Navigation -->
  <header class="sticky top-0 z-50 border-b border-gray-800 bg-[#0b0f19]/80 backdrop-blur-md px-4 py-3">
    <div class="max-w-4xl mx-auto flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-black shadow-lg shadow-emerald-500/20">
          📈
        </div>
        <div>
          <h1 class="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
            Groww AI Copilot
            <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Capital Guard</span>
          </h1>
          <p class="text-xs text-gray-400">Institutional Swing & IPO Intelligence</p>
        </div>
      </div>
      <button onclick="triggerScan()" id="scanBtn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs transition shadow-md shadow-emerald-500/20">
        <span id="scanSpinner" class="hidden animate-spin">⟳</span>
        <span>Run Scan</span>
      </button>
    </div>
  </header>

  <!-- Main Container -->
  <main class="max-w-4xl mx-auto px-4 pt-6 space-y-6">

    <!-- Quick Status Banner -->
    <div class="glass-card rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
        <div>
          <div class="text-xs text-gray-400 font-medium">Market Guard Status</div>
          <div class="text-sm font-bold text-white">Strict Max 3.5% Stop-Loss • Min 1:2.2 R:R Active</div>
        </div>
      </div>
      <div class="text-xs text-gray-400 font-mono" id="lastUpdated">Loading latest scan...</div>
    </div>

    <!-- On-Demand Stock X-Ray -->
    <div class="glass-card rounded-2xl p-4 space-y-3">
      <div class="text-xs font-bold text-gray-400 uppercase tracking-wider">Instant Stock X-Ray (Any NSE Stock)</div>
      <div class="flex gap-2">
        <input type="text" id="stockInput" placeholder="e.g. TATASTEEL, BEL, HAL, ZOMATO" class="flex-1 bg-gray-900 border border-gray-700 focus:border-emerald-500 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none uppercase font-mono">
        <button onclick="analyzeCustomStock()" class="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold transition">
          Analyze
        </button>
      </div>
      <div id="customStockResult" class="hidden pt-2"></div>
    </div>

    <!-- Section Tabs -->
    <div class="flex border-b border-gray-800 space-x-6 text-sm font-semibold">
      <button onclick="switchTab('stocks')" id="tab-stocks" class="pb-3 text-emerald-400 border-b-2 border-emerald-400">
        🎯 Today's Groww Picks
      </button>
      <button onclick="switchTab('ipos')" id="tab-ipos" class="pb-3 text-gray-400 hover:text-gray-200">
        🚀 Live IPO Radar
      </button>
    </div>

    <!-- Tab 1: Stocks Section -->
    <section id="stocksSection" class="space-y-4">
      <div id="stocksContainer" class="space-y-4">
        <div class="p-8 text-center text-gray-500 text-sm">Loading high-conviction trade setups...</div>
      </div>
    </section>

    <!-- Tab 2: IPOs Section -->
    <section id="iposSection" class="hidden space-y-4">
      <div id="iposContainer" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-8 text-center text-gray-500 text-sm col-span-2">Loading IPO Grey Market data...</div>
      </div>
    </section>
  </main>

  <script>
    let currentData = null;

    async function loadData() {
      try {
        const res = await fetch('/api/picks');
        currentData = await res.json();
        render();
      } catch (e) {
        console.error(e);
      }
    }

    function render() {
      if (!currentData) return;

      document.getElementById('lastUpdated').textContent = 'Last Scan: ' + (currentData.generatedAt ? new Date(currentData.generatedAt).toLocaleTimeString() : 'N/A');

      // Render Stocks
      const sCont = document.getElementById('stocksContainer');
      if (!currentData.topPicks || currentData.topPicks.length === 0) {
        sCont.innerHTML = '<div class="glass-card rounded-2xl p-8 text-center text-gray-400">No active stock setups today. Click "Run Scan" to screen market.</div>';
      } else {
        sCont.innerHTML = currentData.topPicks.map(p => renderStockCard(p.stock, p.setup, p.aiResearch)).join('');
      }

      // Render IPOs (Strictly Active & Upcoming Only - Never past/closed ones)
      const iCont = document.getElementById('iposContainer');
      const activeIpos = (currentData.ipos || []).filter(i => i.status === 'OPEN_NOW' || i.status === 'UPCOMING');
      
      if (activeIpos.length === 0) {
        iCont.innerHTML = '<div class="glass-card rounded-2xl p-8 text-center text-gray-400 col-span-2 space-y-2"><div class="text-base font-bold text-gray-200">No Currently Open or Upcoming IPOs</div><p class="text-xs text-gray-500">Past closed/listed IPOs have been filtered out so you only see actionable opportunities where you can apply on Groww.</p></div>';
      } else {
        iCont.innerHTML = activeIpos.map(renderIpoCard).join('');
      }
    }

    function renderStockCard(stock, setup, ai) {
      const isUp = stock.dayChangePct >= 0;
      const isWithinZone = stock.currentPrice <= setup.buyZone.max && stock.currentPrice >= setup.buyZone.min * 0.98;
      const decisionBadge = ai.decisionBadge || (isWithinZone ? "🟢 ABHI KHAREED SAKTE HAIN (BUY IN ZONE)" : "🟡 THODA WAIT KARO (DIP PAR KHAREEDNA)");
      const isBuy = decisionBadge.includes("ABHI KHAREED");
      const isWait = decisionBadge.includes("WAIT");

      const whyBuyList = (ai.whyBuyHinglish || ai.growthCatalysts || []);
      const riskList = (ai.riskHinglish || ai.downsideRisks || []);

      return `
        <div class="glass-card rounded-2xl p-5 space-y-4 transition duration-200 border-t-2 ${isBuy ? 'border-t-emerald-500' : 'border-t-amber-500'}">
          
          <!-- 1. DECISION HERO BANNER (BIG & UNMISSABLE) -->
          <div class="p-3.5 rounded-xl ${isBuy ? 'bg-emerald-500/15 border border-emerald-500/30' : isWait ? 'bg-amber-500/15 border border-amber-500/30' : 'bg-rose-500/15 border border-rose-500/30'} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
            <div class="flex items-center gap-2.5">
              <span class="text-2xl">${isBuy ? '🟢' : isWait ? '🟡' : '🔴'}</span>
              <div>
                <div class="text-sm sm:text-base font-extrabold ${isBuy ? 'text-emerald-400' : isWait ? 'text-amber-400' : 'text-rose-400'} tracking-tight">
                  ${decisionBadge}
                </div>
                <div class="text-xs text-gray-300 mt-0.5">
                  ${isBuy ? `Price abhi ₹${stock.currentPrice} hai (Sahi Zone ke andar). Groww me Delivery order lagayein.` : `Price abhi thoda bhaag chuka hai. ₹${setup.buyZone.min} - ₹${setup.buyZone.max} zone me wapas aane par hi entry lein.`}
                </div>
              </div>
            </div>
            <div class="text-xs font-mono px-3 py-1.5 rounded-lg bg-gray-900/90 text-gray-200 border border-gray-700/60 whitespace-nowrap self-end sm:self-center font-bold">
              Risk-Reward: 1 : ${setup.riskRewardRatio}
            </div>
          </div>

          <!-- Stock Header -->
          <div class="flex items-start justify-between pt-1">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-xl font-extrabold text-white tracking-tight">${stock.cleanName}</h3>
                <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-300">NSE</span>
                <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  Conviction: ${ai.conviction || 'HIGH'}
                </span>
              </div>
              <p class="text-xs text-gray-400 mt-1">${ai.simpleCompanyIntro || ai.companyMoat || ''}</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-black text-white font-mono">₹${stock.currentPrice}</div>
              <div class="text-xs font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}">
                ${isUp ? '+' : ''}${stock.dayChangePct}% Aaj
              </div>
            </div>
          </div>

          <!-- 4 Core Trading Price Boxes -->
          <div class="bg-gray-950/70 rounded-xl p-4 border border-gray-800/90 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div class="p-2 rounded-lg bg-gray-900/50">
              <div class="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Sahi Khareed Zone</div>
              <div class="text-sm sm:text-base font-extrabold text-white font-mono mt-1">₹${setup.buyZone.min} - ${setup.buyZone.max}</div>
              <div class="text-[10px] text-gray-500 mt-0.5">Iske beech buy karein</div>
            </div>
            <div class="p-2 rounded-lg bg-rose-950/20 border border-rose-500/20">
              <div class="text-[10px] text-rose-400 uppercase font-bold tracking-wider">Strict Stop-Loss 🛡️</div>
              <div class="text-sm sm:text-base font-extrabold text-rose-400 font-mono mt-1">₹${setup.stopLoss.price} (-${setup.stopLoss.pct}%)</div>
              <div class="text-[10px] text-rose-400/80 mt-0.5">Nuksaan yahan roko</div>
            </div>
            <div class="p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
              <div class="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">Pehla Munafa (TGT 1)</div>
              <div class="text-sm sm:text-base font-extrabold text-emerald-400 font-mono mt-1">₹${setup.target1.price} (+${setup.target1.pct}%)</div>
              <div class="text-[10px] text-emerald-400/80 mt-0.5">50% profit book karein</div>
            </div>
            <div class="p-2 rounded-lg bg-cyan-950/20 border border-cyan-500/20">
              <div class="text-[10px] text-cyan-400 uppercase font-bold tracking-wider">Doosra Munafa (TGT 2)</div>
              <div class="text-sm sm:text-base font-extrabold text-cyan-400 font-mono mt-1">₹${setup.target2.price} (+${setup.target2.pct}%)</div>
              <div class="text-[10px] text-cyan-400/80 mt-0.5">Trail SL lagayein</div>
            </div>
          </div>

          <!-- Deep Catalysts & Downside Risks in Hinglish -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
            <div class="bg-emerald-950/25 border border-emerald-500/25 rounded-xl p-3.5 space-y-2">
              <div class="font-bold text-emerald-400 flex items-center gap-1.5 text-xs sm:text-sm">
                <span>🔥</span> Kyun Khareedein? (Upar Jane Ke Reasons):
              </div>
              <ul class="space-y-1.5 text-gray-300">
                ${whyBuyList.map(c => `<li class="flex items-start gap-1.5"><span class="text-emerald-400">•</span><span>${c}</span></li>`).join('')}
              </ul>
            </div>
            <div class="bg-rose-950/25 border border-rose-500/25 rounded-xl p-3.5 space-y-2">
              <div class="font-bold text-rose-400 flex items-center gap-1.5 text-xs sm:text-sm">
                <span>⚠️</span> Khatra Kya Hai? (Kab Exit Karein & Risks):
              </div>
              <ul class="space-y-1.5 text-gray-300">
                ${riskList.map(r => `<li class="flex items-start gap-1.5"><span class="text-rose-400">•</span><span>${r}</span></li>`).join('')}
              </ul>
            </div>
          </div>

          <!-- Step-by-Step Groww Action Box -->
          <div class="bg-blue-950/20 border border-blue-500/30 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div class="flex items-center gap-2 text-gray-200">
              <span class="text-base">📱</span>
              <span><strong>Groww me kya karein:</strong> Stocks ➔ <strong>Delivery (Cash)</strong> chunein (Intraday nahi!). Max <strong>${setup.maxAllocationPct}%</strong> capital hi lagayein.</span>
            </div>
            <div class="text-emerald-400 font-semibold text-[11px] bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 whitespace-nowrap">
              ${setup.holdingPeriod}
            </div>
          </div>

          <!-- Bottom Verdict -->
          <div class="flex items-center justify-between pt-1 text-xs text-gray-400 border-t border-gray-800">
            <div class="flex items-center gap-2">
              <span class="text-emerald-400 font-bold">👉 Aakhri Faisla:</span>
              <span class="text-gray-200">${ai.finalVerdict || ai.verdictHeadline}</span>
            </div>
            <div class="text-gray-500 font-mono text-[11px]">Strict Risk Control</div>
          </div>
        </div>
      `;
    }
        </div>
      \`;
    }

    function renderIpoCard(ipo) {
      const isApply = ipo.verdict && ipo.verdict.includes('APPLY');
      const isAvoid = ipo.verdict && ipo.verdict.includes('AVOID');
      const isOpenNow = ipo.status === 'OPEN_NOW';
      return `
        <div class="glass-card rounded-2xl p-5 space-y-3 flex flex-col justify-between border-t-2 ${isOpenNow ? 'border-t-emerald-500' : 'border-t-blue-500'}">
          <div>
            <div class="flex items-start justify-between gap-2">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full ${isOpenNow ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'}">
                    ${ipo.statusLabel || (isOpenNow ? '🔥 Open Now' : '⏳ Upcoming')}
                  </span>
                  <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-gray-800 text-gray-400">${ipo.category}</span>
                </div>
                <h4 class="text-base font-bold text-white tracking-tight">${ipo.name}</h4>
              </div>
              <div class="text-right">
                <div class="text-base font-bold text-emerald-400 font-mono">${ipo.gmpPrice}</div>
                <div class="text-[11px] text-emerald-400 font-semibold">(+${ipo.gmpPercent}%)</div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2 mt-4 text-xs bg-gray-950/50 p-2.5 rounded-lg border border-gray-800/80">
              <div>
                <span class="text-gray-500">Price Band:</span>
                <span class="font-bold text-gray-200 ml-1">₹${ipo.priceBand}</span>
              </div>
              <div>
                <span class="text-gray-500">Lot Size:</span>
                <span class="font-bold text-gray-200 ml-1">${ipo.lotSize} shares</span>
              </div>
              <div>
                <span class="text-gray-500">Subscription:</span>
                <span class="font-bold text-indigo-400 ml-1">${ipo.subscription}</span>
              </div>
              <div>
                <span class="text-gray-500">Window:</span>
                <span class="font-bold text-gray-200 ml-1">${ipo.openDate} ➔ ${ipo.closeDate}</span>
              </div>
            </div>
          </div>

          <div class="pt-2 border-t border-gray-800 flex items-center justify-between text-xs">
            <span class="font-bold \${isApply ? 'text-emerald-400' : isAvoid ? 'text-rose-400' : 'text-amber-400'}">
              \${isApply ? '✅' : isAvoid ? '❌' : '⚠️'} \${ipo.verdict}
            </span>
            <span class="text-gray-500">\${ipo.conviction} Conviction</span>
          </div>
        </div>
      \`;
    }

    function switchTab(tab) {
      if (tab === 'stocks') {
        document.getElementById('stocksSection').classList.remove('hidden');
        document.getElementById('iposSection').classList.add('hidden');
        document.getElementById('tab-stocks').className = 'pb-3 text-emerald-400 border-b-2 border-emerald-400';
        document.getElementById('tab-ipos').className = 'pb-3 text-gray-400 hover:text-gray-200';
      } else {
        document.getElementById('stocksSection').classList.add('hidden');
        document.getElementById('iposSection').classList.remove('hidden');
        document.getElementById('tab-ipos').className = 'pb-3 text-emerald-400 border-b-2 border-emerald-400';
        document.getElementById('tab-stocks').className = 'pb-3 text-gray-400 hover:text-gray-200';
      }
    }

    async function triggerScan() {
      const btn = document.getElementById('scanBtn');
      const spinner = document.getElementById('scanSpinner');
      btn.disabled = true;
      spinner.classList.remove('hidden');
      try {
        const res = await fetch('/api/scan');
        const d = await res.json();
        if (d.success) {
          currentData = d.payload;
          render();
        }
      } catch (e) {
        alert('Scan error: ' + e.message);
      } finally {
        btn.disabled = false;
        spinner.classList.add('hidden');
      }
    }

    async function analyzeCustomStock() {
      const val = document.getElementById('stockInput').value.trim();
      if (!val) return;
      const resDiv = document.getElementById('customStockResult');
      resDiv.classList.remove('hidden');
      resDiv.innerHTML = '<div class="text-xs text-gray-400 animate-pulse">Running Deep AI Research on ' + val.toUpperCase() + '...</div>';

      try {
        const res = await fetch('/api/analyze-stock?symbol=' + encodeURIComponent(val));
        const d = await res.json();
        if (d.success) {
          resDiv.innerHTML = renderStockCard(d.stock, d.setup, d.aiResearch);
        } else {
          resDiv.innerHTML = '<div class="text-xs text-rose-400">Failed to analyze: ' + d.error + '</div>';
        }
      } catch (e) {
        resDiv.innerHTML = '<div class="text-xs text-rose-400">Error: ' + e.message + '</div>';
      }
    }

    loadData();
  </script>
</body>
</html>`;
}

server.listen(PORT, HOST, () => {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
  🚀 GROWW AI COPILOT DASHBOARD RUNNING!
  💻 Mac Browser:    http://localhost:${PORT}
  📱 Phone Browser:  http://10.10.40.93:${PORT} (Same Wi-Fi)
╚══════════════════════════════════════════════════════════════╝`);
});
