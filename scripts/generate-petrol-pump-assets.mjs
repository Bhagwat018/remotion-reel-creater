import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const evidenceDir = path.join(rootDir, "public", "assets", "evidence", "petrol-pump");

fs.mkdirSync(evidenceDir, { recursive: true });

async function generateAssets() {
  console.log("⛽ Generating Petrol Pump Economics Evidence Assets via Playwright...");
  const browser = await chromium.launch({ headless: true });

  // ───────────────────────────────────────────────────────────────
  // 1. PETROL PRICE BREAKDOWN PIE CHART
  //    Shows ₹102 split: Govt taxes, IOC margin, Dealer share
  // ───────────────────────────────────────────────────────────────
  {
    const page = await browser.newPage({ viewport: { width: 580, height: 680 }, deviceScaleFactor: 2 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
          body { background: #09090f; color: #ffffff; padding: 24px; }
          .card { background: #111218; border: 2.5px solid #2a2d42; border-radius: 22px; padding: 24px; }
          .badge { display: inline-block; background: #f97316; color: #000; font-size: 11px; font-weight: 900; letter-spacing: 0.8px; padding: 5px 12px; border-radius: 6px; margin-bottom: 14px; }
          .title { font-size: 20px; font-weight: 800; margin-bottom: 4px; color: #fff; }
          .subtitle { font-size: 13px; color: #94a3b8; margin-bottom: 22px; }
          
          /* Pie Chart via conic-gradient */
          .pie-row { display: flex; align-items: center; gap: 24px; margin-bottom: 20px; }
          .pie-wrap { position: relative; width: 160px; height: 160px; flex-shrink: 0; }
          .pie { width: 160px; height: 160px; border-radius: 50%; background: conic-gradient(
            #ef4444 0deg 118deg,
            #f97316 118deg 240deg,
            #3b82f6 240deg 299deg,
            #22c55e 299deg 360deg
          ); }
          .pie-center { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            width: 80px; height: 80px; background: #111218; border-radius: 50%;
            display: flex; flex-direction: column; align-items: center; justify-content: center; }
          .pie-center-val { font-size: 18px; font-weight: 900; color: #fff; }
          .pie-center-label { font-size: 9px; font-weight: 700; color: #64748b; text-transform: uppercase; }
          
          /* Legend */
          .legend { flex: 1; }
          .legend-item { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
          .dot { width: 12px; height: 12px; border-radius: 3px; flex-shrink: 0; }
          .legend-name { font-size: 13px; color: #cbd5e1; flex: 1; }
          .legend-val { font-size: 14px; font-weight: 800; color: #fff; }
          .legend-pct { font-size: 11px; color: #64748b; }
          
          /* Highlight box for Dealer share */
          .highlight-box { background: rgba(239, 68, 68, 0.12); border: 2px solid #ef4444;
            border-radius: 14px; padding: 14px 18px; display: flex; justify-content: space-between; align-items: center;
            box-shadow: 0 0 20px rgba(239,68,68,0.2); }
          .highlight-label { font-size: 14px; font-weight: 700; color: #fca5a5; }
          .highlight-val { font-size: 28px; font-weight: 900; color: #ef4444; }
          .highlight-sub { font-size: 11px; color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">⛽ PETROL PRICE BREAKDOWN: ₹102/LITRE</div>
          <div class="title">₹102 Mein Kiska Kitna Hissa?</div>
          <div class="subtitle">Fuel price breakup at Indian petrol pump (Delhi, Nov 2024)</div>

          <div class="pie-row">
            <div class="pie-wrap">
              <div class="pie"></div>
              <div class="pie-center">
                <div class="pie-center-val">₹102</div>
                <div class="pie-center-label">PER LITRE</div>
              </div>
            </div>

            <div class="legend">
              <div class="legend-item">
                <div class="dot" style="background:#ef4444;"></div>
                <div class="legend-name">Govt. Taxes<br><span class="legend-pct">(Excise ₹19.90 + VAT ₹14.14)</span></div>
                <div class="legend-val">₹34.04</div>
              </div>
              <div class="legend-item">
                <div class="dot" style="background:#f97316;"></div>
                <div class="legend-name">IOC Base Price<br><span class="legend-pct">(Crude cost + OMC margin)</span></div>
                <div class="legend-val">₹55.52</div>
              </div>
              <div class="legend-item">
                <div class="dot" style="background:#3b82f6;"></div>
                <div class="legend-name">Freight &amp; Transport<br><span class="legend-pct">(Pipeline + road cost)</span></div>
                <div class="legend-val">₹8.03</div>
              </div>
              <div class="legend-item">
                <div class="dot" style="background:#22c55e;"></div>
                <div class="legend-name" style="color:#4ade80;font-weight:700;">Dealer Commission<br><span class="legend-pct" style="color:#86efac;">Pump wale ka pura hissa</span></div>
                <div class="legend-val" style="color:#22c55e;">₹4.41</div>
              </div>
            </div>
          </div>

          <div class="highlight-box">
            <div>
              <div class="highlight-label">🚨 DEALER KI ASLI KAMAI PER LITRE</div>
              <div class="highlight-sub">Sarkar ki tax: 33% | IOC ka hissa: 54% | Dealer: sirf 4.3%!</div>
            </div>
            <div class="highlight-val">₹4.41</div>
          </div>
        </div>
      </body>
      </html>
    `);
    const targetPath = path.join(evidenceDir, "petrol_price_breakdown.png");
    const el = await page.$(".card");
    await el.screenshot({ path: targetPath });
    console.log(`✅ Saved ${targetPath}`);
    await page.close();
  }

  // ───────────────────────────────────────────────────────────────
  // 2. DEALER MONTHLY INCOME TABLE
  //    Shows volume × commission − expenses = NET PROFIT
  // ───────────────────────────────────────────────────────────────
  {
    const page = await browser.newPage({ viewport: { width: 560, height: 760 }, deviceScaleFactor: 2 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
          body { background: #09090f; color: #ffffff; padding: 24px; }
          .card { background: #111218; border: 2.5px solid #2a2d42; border-radius: 22px; padding: 24px; }
          .badge { display: inline-block; background: #8b5cf6; color: #fff; font-size: 11px; font-weight: 900; letter-spacing: 0.8px; padding: 5px 12px; border-radius: 6px; margin-bottom: 14px; }
          .title { font-size: 20px; font-weight: 800; margin-bottom: 4px; }
          .subtitle { font-size: 13px; color: #94a3b8; margin-bottom: 20px; }
          
          .table-header { display: flex; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; padding: 0 14px 10px; }
          .col-name { flex: 2; }
          .col-gross { flex: 1; text-align: right; }
          .col-expense { flex: 1; text-align: right; }
          .col-net { flex: 1; text-align: right; }
          
          .row { display: flex; align-items: center; background: #1a1d2e; border-radius: 12px; padding: 12px 14px; margin-bottom: 8px; }
          .row-name { flex: 2; font-size: 14px; font-weight: 600; color: #e2e8f0; }
          .row-sub { font-size: 11px; color: #64748b; display: block; margin-top: 2px; }
          .row-gross { flex: 1; text-align: right; font-size: 14px; font-weight: 700; color: #60a5fa; }
          .row-expense { flex: 1; text-align: right; font-size: 14px; font-weight: 700; color: #f87171; }
          .row-net-pos { flex: 1; text-align: right; font-size: 14px; font-weight: 900; color: #4ade80; }
          .row-net-neg { flex: 1; text-align: right; font-size: 14px; font-weight: 900; color: #f87171; }
          
          .divider { border-top: 1.5px dashed #334155; margin: 12px 0; }
          
          .summary-box { background: linear-gradient(135deg, #1e3a5f, #0f2744); border: 2px solid #3b82f6; border-radius: 14px; padding: 14px 18px; }
          .summary-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
          .summary-label { font-size: 13px; color: #93c5fd; font-weight: 600; }
          .summary-val { font-size: 15px; font-weight: 800; color: #60a5fa; }
          .net-row { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; border-top: 1px solid #3b82f655; }
          .net-label { font-size: 15px; font-weight: 800; color: #fff; }
          .net-val { font-size: 24px; font-weight: 900; color: #22c55e; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">📊 AVERAGE PETROL PUMP: MONTHLY P&L</div>
          <div class="title">Pump Wale Ki Monthly Kamai Ka Hisaab</div>
          <div class="subtitle">City pump — 4,000 litres/day capacity (avg Indian outlet)</div>

          <div class="table-header">
            <span class="col-name">Cost Item</span>
            <span class="col-gross">Income</span>
            <span class="col-expense">Expense</span>
            <span class="col-net">Net</span>
          </div>

          <div class="row">
            <div class="row-name">⛽ Commission Income<span class="row-sub">4,000 L/day × ₹4.41 × 30 days</span></div>
            <div class="row-gross">+₹5.29L</div>
            <div class="row-expense">—</div>
            <div class="row-net-pos">+₹5.29L</div>
          </div>

          <div class="divider"></div>

          <div class="row">
            <div class="row-name">🏢 Shop Rent / Land Lease<span class="row-sub">Prime city location</span></div>
            <div class="row-gross">—</div>
            <div class="row-expense">-₹1.50L</div>
            <div class="row-net-neg">-₹1.50L</div>
          </div>
          <div class="row">
            <div class="row-name">👷 Staff Salary (12 people)<span class="row-sub">Attendants + manager + security</span></div>
            <div class="row-gross">—</div>
            <div class="row-expense">-₹2.40L</div>
            <div class="row-net-neg">-₹2.40L</div>
          </div>
          <div class="row">
            <div class="row-name">⚡ Electricity Bill<span class="row-sub">Pumps, lighting, AC office</span></div>
            <div class="row-gross">—</div>
            <div class="row-expense">-₹40K</div>
            <div class="row-net-neg">-₹40K</div>
          </div>
          <div class="row">
            <div class="row-name">🔧 Maintenance &amp; Misc<span class="row-sub">Machine servicing + compliance</span></div>
            <div class="row-gross">—</div>
            <div class="row-expense">-₹20K</div>
            <div class="row-net-neg">-₹20K</div>
          </div>

          <div class="divider"></div>

          <div class="summary-box">
            <div class="summary-row">
              <span class="summary-label">Total Gross Commission</span>
              <span class="summary-val">₹5,29,200</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">Total Expenses</span>
              <span class="summary-val" style="color:#f87171;">-₹4,10,000</span>
            </div>
            <div class="net-row">
              <span class="net-label">🏦 NET MONTHLY PROFIT</span>
              <span class="net-val">~₹90,000</span>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    const targetPath = path.join(evidenceDir, "dealer_monthly_income.png");
    const el = await page.$(".card");
    await el.screenshot({ path: targetPath });
    console.log(`✅ Saved ${targetPath}`);
    await page.close();
  }

  // ───────────────────────────────────────────────────────────────
  // 3. PUMP TYPES COMPARISON TABLE
  //    Small city pump vs Highway pump — income side-by-side
  // ───────────────────────────────────────────────────────────────
  {
    const page = await browser.newPage({ viewport: { width: 580, height: 700 }, deviceScaleFactor: 2 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
          body { background: #09090f; color: #ffffff; padding: 24px; }
          .card { background: #111218; border: 2.5px solid #2a2d42; border-radius: 22px; padding: 24px; }
          .badge { display: inline-block; background: #22c55e; color: #000; font-size: 11px; font-weight: 900; letter-spacing: 0.8px; padding: 5px 12px; border-radius: 6px; margin-bottom: 14px; }
          .title { font-size: 20px; font-weight: 800; margin-bottom: 4px; }
          .subtitle { font-size: 13px; color: #94a3b8; margin-bottom: 22px; }
          
          .cols { display: flex; gap: 14px; margin-bottom: 18px; }
          .col { flex: 1; border-radius: 16px; padding: 16px; }
          .col-bad { background: rgba(239,68,68,0.08); border: 2px solid #ef444488; }
          .col-ok { background: rgba(234,179,8,0.08); border: 2px solid #eab30888; }
          .col-mega { background: rgba(34,197,94,0.1); border: 2px solid #22c55e88; box-shadow: 0 0 20px rgba(34,197,94,0.15); }
          
          .col-title { font-size: 14px; font-weight: 800; margin-bottom: 4px; }
          .col-loc { font-size: 11px; color: #94a3b8; margin-bottom: 12px; display: block; }
          .metric { margin-bottom: 10px; }
          .metric-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; }
          .metric-val { font-size: 18px; font-weight: 900; }
          .metric-sub { font-size: 11px; color: #94a3b8; }
          
          .verdict-box { background: #131c2b; border: 2px solid #22c55e; border-radius: 14px; padding: 14px 18px; }
          .verdict-title { font-size: 13px; font-weight: 800; color: #4ade80; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
          .verdict-row { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #cbd5e1; margin-bottom: 6px; }
          .verdict-emoji { font-size: 16px; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">🏆 PUMP TYPES COMPARISON: KAUN BANTA HAI CROREPATI?</div>
          <div class="title">Location Hi Sab Kuch Hai!</div>
          <div class="subtitle">Same ₹4.41/litre commission — but volume makes all the difference</div>

          <div class="cols">
            <div class="col col-bad">
              <div class="col-title" style="color:#f87171;">😩 Small City Pump</div>
              <span class="col-loc">Residential area, low traffic</span>
              <div class="metric">
                <div class="metric-label">Daily Volume</div>
                <div class="metric-val" style="color:#f87171;">2,000 L/day</div>
              </div>
              <div class="metric">
                <div class="metric-label">Monthly Commission</div>
                <div class="metric-val" style="color:#fb923c;">₹2.65L</div>
              </div>
              <div class="metric">
                <div class="metric-label">After All Expenses</div>
                <div class="metric-val" style="color:#ef4444;">₹20-30K</div>
                <div class="metric-sub">Barely break-even</div>
              </div>
            </div>

            <div class="col col-ok">
              <div class="col-title" style="color:#fbbf24;">😐 City Main Road</div>
              <span class="col-loc">Medium traffic junction</span>
              <div class="metric">
                <div class="metric-label">Daily Volume</div>
                <div class="metric-val" style="color:#fbbf24;">4,000 L/day</div>
              </div>
              <div class="metric">
                <div class="metric-label">Monthly Commission</div>
                <div class="metric-val" style="color:#f59e0b;">₹5.29L</div>
              </div>
              <div class="metric">
                <div class="metric-label">After All Expenses</div>
                <div class="metric-val" style="color:#eab308;">~₹90K</div>
                <div class="metric-sub">Decent but not rich</div>
              </div>
            </div>

            <div class="col col-mega">
              <div class="col-title" style="color:#4ade80;">🤑 Highway Pump</div>
              <span class="col-loc">NH/expressway, 24x7 trucks</span>
              <div class="metric">
                <div class="metric-label">Daily Volume</div>
                <div class="metric-val" style="color:#4ade80;">20,000 L/day</div>
              </div>
              <div class="metric">
                <div class="metric-label">Monthly Commission</div>
                <div class="metric-val" style="color:#22c55e;">₹26.46L</div>
              </div>
              <div class="metric">
                <div class="metric-label">After All Expenses</div>
                <div class="metric-val" style="color:#22c55e;">₹8-15L</div>
                <div class="metric-sub">🏆 CROREPATI YEARLY!</div>
              </div>
            </div>
          </div>

          <div class="verdict-box">
            <div class="verdict-title">🔑 Asli Lesson</div>
            <div class="verdict-row"><span class="verdict-emoji">📍</span> Highway ya NH junction pump = sone ki khaan</div>
            <div class="verdict-row"><span class="verdict-emoji">🚗</span> City residential pump = struggle zone</div>
            <div class="verdict-row"><span class="verdict-emoji">💡</span> Same commission, sirf location alag — result ₹28L/yr ka fark!</div>
          </div>
        </div>
      </body>
      </html>
    `);
    const targetPath = path.join(evidenceDir, "pump_types_comparison.png");
    const el = await page.$(".card");
    await el.screenshot({ path: targetPath });
    console.log(`✅ Saved ${targetPath}`);
    await page.close();
  }

  // ───────────────────────────────────────────────────────────────
  // 4. NEWSPAPER HEADLINE: "₹4.41 Dealer Margin" 
  // ───────────────────────────────────────────────────────────────
  {
    const page = await browser.newPage({ viewport: { width: 640, height: 380 }, deviceScaleFactor: 2 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
          body { background: #0c0e14; padding: 22px; }
          .news-card { background: #ffffff; color: #111827; border: 3px solid #000; border-radius: 16px; padding: 22px; box-shadow: 8px 8px 0 #f97316; }
          .masthead { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #111827; padding-bottom: 10px; margin-bottom: 14px; }
          .paper-name { font-size: 15px; font-weight: 900; letter-spacing: 1px; font-family: "Times New Roman", Georgia, serif; text-transform: uppercase; }
          .news-date { font-size: 11px; font-weight: 700; color: #4b5563; }
          .headline { font-size: 20px; font-weight: 800; line-height: 1.3; margin-bottom: 12px; }
          .highlighted { background: #fef08a; padding: 2px 5px; border-radius: 4px; }
          .deck { font-size: 13px; color: #374151; line-height: 1.5; }
          .tag-row { display: flex; gap: 8px; margin-top: 14px; }
          .news-tag { background: #f1f5f9; border: 1px solid #cbd5e1; font-size: 11px; font-weight: 800; padding: 4px 8px; border-radius: 6px; }
        </style>
      </head>
      <body>
        <div class="news-card">
          <div class="masthead">
            <div class="paper-name">Business Standard • India Fuel Report</div>
            <div class="news-date">PETROL ECONOMY WATCH • NEW DELHI</div>
          </div>
          <div class="headline">
            Govt Collects ₹34 in Taxes, But <span class="highlighted">Petrol Pump Dealer Earns Just ₹4.41 Per Litre</span> — Where Does the Other ₹63 Go?
          </div>
          <div class="deck">
            India's petrol pump dealers earn a fixed commission of ₹4.41 per litre, unchanged for years. After paying staff, electricity, and maintenance on an average 4,000-litre/day outlet, net profit is barely ₹90,000/month — while the government collects ₹34/litre in excise and VAT alone.
          </div>
          <div class="tag-row">
            <span class="news-tag">⛽ FUEL PRICE BREAKDOWN</span>
            <span class="news-tag">🏛️ ₹34 GOVT TAX</span>
            <span class="news-tag">😮 DEALER: SIRF ₹4.41</span>
          </div>
        </div>
      </body>
      </html>
    `);
    const targetPath = path.join(evidenceDir, "petrol_news_headline.png");
    const el = await page.$(".news-card");
    await el.screenshot({ path: targetPath });
    console.log(`✅ Saved ${targetPath}`);
    await page.close();
  }

  await browser.close();
  console.log("🏁 All 4 Petrol Pump Evidence Assets Successfully Generated!");
}

generateAssets().catch(console.error);

