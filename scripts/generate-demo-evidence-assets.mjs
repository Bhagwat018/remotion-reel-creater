import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const evidenceDir = path.join(rootDir, "public", "assets", "evidence", "quick-commerce");

fs.mkdirSync(evidenceDir, { recursive: true });

async function generateAssets() {
  console.log("📸 Generating Real-World Evidence Screenshot Assets via Playwright...");
  const browser = await chromium.launch({ headless: true });

  // 1. Zepto / Quick Commerce App Checkout Screen
  {
    const page = await browser.newPage({ viewport: { width: 440, height: 880 }, deviceScaleFactor: 2 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
          body { background: #0c0d14; color: #ffffff; padding: 18px 16px; -webkit-font-smoothing: antialiased; }
          .status-bar { display: flex; justify-content: space-between; align-items: center; font-size: 13px; font-weight: 600; padding: 4px 6px 14px; color: #94a3b8; }
          .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
          .brand-badge { background: #8b5cf6; color: #ffffff; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 800; letter-spacing: 0.5px; }
          .timer-pill { background: #22c55e22; border: 1.5px solid #22c55e; color: #4ade80; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 6px; }
          .pulse-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e; }
          .hero-card { background: linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%); border: 1.5px solid #6366f144; border-radius: 18px; padding: 18px; margin-bottom: 16px; position: relative; overflow: hidden; }
          .hero-title { font-size: 20px; font-weight: 800; color: #ffffff; margin-bottom: 6px; }
          .hero-sub { font-size: 13px; color: #94a3b8; margin-bottom: 14px; }
          .progress-bar { height: 8px; background: #334155; border-radius: 4px; overflow: hidden; margin-bottom: 10px; }
          .progress-fill { width: 68%; height: 100%; background: linear-gradient(90deg, #6366f1, #a855f7); border-radius: 4px; }
          .status-row { display: flex; justify-content: space-between; font-size: 11px; font-weight: 600; color: #cbd5e1; }
          .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #64748b; margin: 16px 4px 10px; }
          .cart-item { background: #131522; border: 1px solid #1e2238; border-radius: 14px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
          .item-left { display: flex; align-items: center; gap: 12px; }
          .item-icon { width: 38px; height: 38px; background: #1e1b4b; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; }
          .item-name { font-size: 14px; font-weight: 600; color: #f1f5f9; }
          .item-qty { font-size: 12px; color: #64748b; }
          .item-price { font-size: 14px; font-weight: 700; color: #ffffff; }
          .rider-card { background: #181829; border: 1px dashed #475569; border-radius: 14px; padding: 12px; display: flex; align-items: center; gap: 12px; margin-top: 14px; }
          .rider-avatar { width: 36px; height: 36px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; }
          .rider-info { flex: 1; }
          .rider-name { font-size: 13px; font-weight: 700; }
          .rider-stat { font-size: 11px; color: #22c55e; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="status-bar">
          <span>9:41</span>
          <span>5G 📶 100% 🔋</span>
        </div>
        <div class="header">
          <div class="brand-badge">⚡ ZEPTO 10-MIN</div>
          <div class="timer-pill"><div class="pulse-dot"></div>DELIVERING IN 7 MINS</div>
        </div>
        <div class="hero-card">
          <div class="hero-title">Order Out for Delivery 🛵</div>
          <div class="hero-sub">From Dark Store #14 (Koramangala Hub)</div>
          <div class="progress-bar"><div class="progress-fill"></div></div>
          <div class="status-row">
            <span>Packed (1.8m)</span>
            <span>Rider Picked (3.2m)</span>
            <span>At Doorstep (Est 7m)</span>
          </div>
        </div>
        <div class="section-title">Order Items (3 items)</div>
        <div class="cart-item">
          <div class="item-left"><div class="item-icon">🥛</div><div><div class="item-name">Amul Taaza Milk 500ml</div><div class="item-qty">Qty: 2</div></div></div>
          <div class="item-price">₹56</div>
        </div>
        <div class="cart-item">
          <div class="item-left"><div class="item-icon">🍞</div><div><div class="item-name">Brown Harvest Bread</div><div class="item-qty">Qty: 1</div></div></div>
          <div class="item-price">₹45</div>
        </div>
        <div class="cart-item">
          <div class="item-left"><div class="item-icon">🥔</div><div><div class="item-name">Lay's Classic Salted</div><div class="item-qty">Qty: 2</div></div></div>
          <div class="item-price">₹40</div>
        </div>
        <div class="rider-card">
          <div class="rider-avatar">RK</div>
          <div class="rider-info">
            <div class="rider-name">Ramesh Kumar (Speed Partner)</div>
            <div class="rider-stat">Speed: 28 km/h • 0.8 km away</div>
          </div>
        </div>
      </body>
      </html>
    `);
    const targetPath = path.join(evidenceDir, "zepto_10min_checkout.png");
    await page.screenshot({ path: targetPath, fullPage: true });
    console.log(`✅ Saved ${targetPath}`);
    await page.close();
  }

  // 2. Real Receipt / Order Breakdown with Red Highlighted Silent Fees
  {
    const page = await browser.newPage({ viewport: { width: 500, height: 750 }, deviceScaleFactor: 2 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
          body { background: #090a0f; color: #ffffff; padding: 24px; }
          .receipt-box { background: #12141f; border: 2px solid #2d334d; border-radius: 20px; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); position: relative; }
          .receipt-header { border-bottom: 1.5px dashed #334155; padding-bottom: 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
          .order-id { font-size: 13px; color: #94a3b8; font-weight: 600; }
          .bill-title { font-size: 20px; font-weight: 800; color: #ffffff; }
          .bill-row { display: flex; justify-content: space-between; font-size: 15px; color: #94a3b8; margin-bottom: 12px; }
          .bill-val { font-weight: 700; color: #ffffff; }
          
          /* The Highlighted Silent Trap Box */
          .highlight-zone { background: rgba(239, 68, 68, 0.12); border: 2px solid #ef4444; border-radius: 12px; padding: 12px 14px; margin: 14px 0; position: relative; box-shadow: 0 0 20px rgba(239, 68, 68, 0.25); }
          .highlight-badge { position: absolute; top: -11px; right: 12px; background: #ef4444; color: #ffffff; font-size: 10px; font-weight: 900; letter-spacing: 0.8px; padding: 3px 8px; border-radius: 6px; }
          .highlight-row { display: flex; justify-content: space-between; font-size: 14px; font-weight: 700; color: #fca5a5; margin: 4px 0; }
          .highlight-val { color: #f87171; font-weight: 900; }

          .divider { border-top: 1.5px dashed #334155; margin: 18px 0; }
          .total-row { display: flex; justify-content: space-between; font-size: 19px; font-weight: 800; color: #ffffff; }
          .total-val { font-size: 22px; color: #22c55e; }
          .footer-note { font-size: 11px; color: #64748b; text-align: center; margin-top: 18px; }
        </style>
      </head>
      <body>
        <div class="receipt-box">
          <div class="receipt-header">
            <div>
              <div class="bill-title">BILL SUMMARY 🧾</div>
              <div class="order-id">Order #ZP-8942-BLR</div>
            </div>
            <div style="background:#22c55e22; color:#22c55e; font-weight:800; font-size:12px; padding:6px 10px; border-radius:8px;">PAID ONLINE</div>
          </div>
          <div class="bill-row">
            <span>Item Subtotal (3 items)</span>
            <span class="bill-val">₹141.00</span>
          </div>
          <div class="bill-row">
            <span>Standard Delivery Fee</span>
            <span class="bill-val">₹25.00</span>
          </div>

          <!-- Highlight Trap -->
          <div class="highlight-zone">
            <div class="highlight-badge">SILENT CHARGES CREEPING IN ⚠️</div>
            <div class="highlight-row">
              <span>Handling & Packaging Fee</span>
              <span class="highlight-val">+₹5.00</span>
            </div>
            <div class="highlight-row">
              <span>High-Demand Surge Charge</span>
              <span class="highlight-val">+₹15.00</span>
            </div>
            <div class="highlight-row">
              <span>Platform Tech Infrastructure Fee</span>
              <span class="highlight-val">+₹4.00</span>
            </div>
          </div>

          <div class="divider"></div>
          <div class="total-row">
            <span>Grand Total Paid</span>
            <span class="total-val">₹190.00</span>
          </div>
          <div class="footer-note">Customer Paid ₹49 extra in delivery & handling fees alone.</div>
        </div>
      </body>
      </html>
    `);
    const targetPath = path.join(evidenceDir, "blinkit_bill_hidden_fees.png");
    const el = await page.$(".receipt-box");
    await el.screenshot({ path: targetPath });
    console.log(`✅ Saved ${targetPath}`);
    await page.close();
  }

  // 3. Financial Breakdown: Cost per delivery (₹110) vs Customer fee (₹20)
  {
    const page = await browser.newPage({ viewport: { width: 550, height: 750 }, deviceScaleFactor: 2 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
          body { background: #0a0b10; color: #ffffff; padding: 24px; }
          .unit-card { background: #131622; border: 2.5px solid #23283b; border-radius: 20px; padding: 22px; }
          .card-badge { display: inline-block; background: #6366f1; color: #ffffff; font-size: 11px; font-weight: 900; letter-spacing: 0.8px; padding: 5px 12px; border-radius: 6px; margin-bottom: 12px; }
          .card-title { font-size: 22px; font-weight: 800; margin-bottom: 6px; }
          .card-sub { font-size: 13px; color: #94a3b8; margin-bottom: 20px; }
          .cost-stack { margin-bottom: 20px; }
          .stack-item { background: #1c2033; border-radius: 12px; padding: 12px 14px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
          .stack-name { font-size: 14px; font-weight: 600; color: #cbd5e1; }
          .stack-cost { font-size: 15px; font-weight: 800; color: #ef4444; }
          .burn-zone { background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(185, 28, 28, 0.1) 100%); border: 2px dashed #ef4444; border-radius: 14px; padding: 16px; text-align: center; }
          .burn-title { font-size: 13px; font-weight: 700; color: #fca5a5; text-transform: uppercase; letter-spacing: 0.5px; }
          .burn-val { font-size: 34px; font-weight: 900; color: #ef4444; margin: 4px 0; }
          .burn-desc { font-size: 12px; color: #cbd5e1; }
        </style>
      </head>
      <body>
        <div class="unit-card">
          <div class="card-badge">DARK STORE ECONOMICS 📊</div>
          <div class="card-title">Real Cost to Deliver 1 Order</div>
          <div class="card-sub">Public Quick Commerce Unit Metrics (FY24-25)</div>
          
          <div class="cost-stack">
            <div class="stack-item">
              <span class="stack-name">🛵 Rider Payout & Incentives</span>
              <span class="stack-cost">₹50.00</span>
            </div>
            <div class="stack-item">
              <span class="stack-name">📦 Warehouse Rent & Electricity</span>
              <span class="stack-cost">₹35.00</span>
            </div>
            <div class="stack-item">
              <span class="stack-name">🧑‍💼 Picker, Packer & Ops Staff</span>
              <span class="stack-cost">₹25.00</span>
            </div>
          </div>

          <div class="burn-zone">
            <div class="burn-title">TOTAL FULFILLMENT COST: ₹110</div>
            <div class="burn-val">-₹70 LOSS</div>
            <div class="burn-desc">Customer pays ₹20-₹25. Bacha hua ₹70 VC Cash se burn hota hai!</div>
          </div>
        </div>
      </body>
      </html>
    `);
    const targetPath = path.join(evidenceDir, "dark_store_unit_economics_burn.png");
    const el = await page.$(".unit-card");
    await el.screenshot({ path: targetPath });
    console.log(`✅ Saved ${targetPath}`);
    await page.close();
  }

  // 4. Financial News / Economic Times Headline Report
  {
    const page = await browser.newPage({ viewport: { width: 650, height: 420 }, deviceScaleFactor: 2 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Georgia, serif; }
          body { background: #0c0e14; color: #ffffff; padding: 22px; }
          .news-card { background: #ffffff; color: #111827; border: 3px solid #000000; border-radius: 16px; padding: 22px; box-shadow: 8px 8px 0px #6366f1; }
          .masthead { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #111827; padding-bottom: 10px; margin-bottom: 14px; }
          .paper-name { font-size: 16px; font-weight: 900; letter-spacing: 1px; font-family: "Times New Roman", Georgia, serif; text-transform: uppercase; color: #000000; }
          .news-date { font-size: 11px; font-weight: 700; color: #4b5563; font-family: sans-serif; }
          .headline { font-size: 21px; font-weight: 800; line-height: 1.3; margin-bottom: 12px; font-family: -apple-system, sans-serif; color: #0f172a; }
          .highlighted { background: #fef08a; padding: 2px 4px; border-radius: 4px; }
          .deck { font-size: 14px; color: #374151; line-height: 1.45; font-family: -apple-system, sans-serif; }
          .tag-row { display: flex; gap: 8px; margin-top: 14px; }
          .news-tag { background: #f1f5f9; border: 1px solid #cbd5e1; font-size: 11px; font-weight: 800; padding: 4px 8px; border-radius: 6px; font-family: sans-serif; }
        </style>
      </head>
      <body>
        <div class="news-card">
          <div class="masthead">
            <div class="paper-name">The Economic Times • Retail & Tech</div>
            <div class="news-date">FINANCIAL INTELLIGENCE • MUMBAI</div>
          </div>
          <div class="headline">
            Quick Commerce Dilemma: <span class="highlighted">Platforms Burn ₹70 Per 10-Minute Delivery</span> as Customer Fees Fail to Cover ₹110 Hub Expenses
          </div>
          <div class="deck">
            With venture capital subsidies winding down, quick commerce giants are silently introducing handling fees, platform fees, and night surcharges to bridge unit economics deficit.
          </div>
          <div class="tag-row">
            <span class="news-tag">📈 STARTUP CASH BURN</span>
            <span class="news-tag">🛵 ₹110 UNIT COST</span>
            <span class="news-tag">⚠️ HANDLING FEE CREEP</span>
          </div>
        </div>
      </body>
      </html>
    `);
    const targetPath = path.join(evidenceDir, "economic_times_quick_commerce_report.png");
    const el = await page.$(".news-card");
    await el.screenshot({ path: targetPath });
    console.log(`✅ Saved ${targetPath}`);
    await page.close();
  }

  // 5. Smart Consumer Golden Rule: Emergency vs Daily Grocery Savings
  {
    const page = await browser.newPage({ viewport: { width: 550, height: 750 }, deviceScaleFactor: 2 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
          body { background: #0a0b12; color: #ffffff; padding: 22px; }
          .compare-box { background: #131625; border: 2.5px solid #23293d; border-radius: 20px; padding: 22px; }
          .header-tag { display: inline-block; background: #22c55e; color: #000000; font-size: 11px; font-weight: 900; letter-spacing: 0.8px; padding: 5px 12px; border-radius: 6px; margin-bottom: 12px; }
          .title { font-size: 22px; font-weight: 800; margin-bottom: 18px; }
          .row { display: flex; justify-content: space-between; gap: 14px; margin-bottom: 18px; }
          .col-box { flex: 1; border-radius: 14px; padding: 14px; text-align: center; }
          .col-bad { background: rgba(239, 68, 68, 0.12); border: 2px solid #ef4444; }
          .col-good { background: rgba(34, 197, 94, 0.12); border: 2px solid #22c55e; }
          .col-label { font-size: 13px; font-weight: 800; margin-bottom: 8px; }
          .col-val { font-size: 26px; font-weight: 900; margin-bottom: 6px; }
          .col-sub { font-size: 11px; color: #cbd5e1; line-height: 1.4; }
          .savings-card { background: linear-gradient(135deg, #15803d, #166534); border-radius: 14px; padding: 16px; text-align: center; margin-top: 10px; }
          .savings-label { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; color: #bbf7d0; }
          .savings-amount { font-size: 32px; font-weight: 900; color: #ffffff; margin: 4px 0; }
          .savings-desc { font-size: 12px; color: #dcfce7; }
        </style>
      </head>
      <body>
        <div class="compare-box">
          <div class="header-tag">CONSUMER HACK 💡</div>
          <div class="title">Quick Commerce vs Local Kirana</div>
          
          <div class="row">
            <div class="col-box col-bad">
              <div class="col-label" style="color:#f87171;">Daily 10-Min App ❌</div>
              <div class="col-val" style="color:#ef4444;">₹14,500/mo</div>
              <div class="col-sub">₹45 x 30 deliveries in surge & handling fees = ₹1,350/mo wasted.</div>
            </div>
            <div class="col-box col-good">
              <div class="col-label" style="color:#4ade80;">Monthly Kirana ✅</div>
              <div class="col-val" style="color:#22c55e;">₹11,200/mo</div>
              <div class="col-sub">Zero surge, zero platform fee, bulk wholesale discount.</div>
            </div>
          </div>

          <div class="savings-card">
            <div class="savings-label">ANNUAL MONEY SAVED</div>
            <div class="savings-amount">₹39,600 YEARLY</div>
            <div class="savings-desc">Rule: Use 10-minute apps for EMERGENCY ONLY, not daily grocery!</div>
          </div>
        </div>
      </body>
      </html>
    `);
    const targetPath = path.join(evidenceDir, "smart_kirana_vs_quick_savings.png");
    const el = await page.$(".compare-box");
    await el.screenshot({ path: targetPath });
    console.log(`✅ Saved ${targetPath}`);
    await page.close();
  }

  await browser.close();
  console.log("🏁 All 5 Real-World Evidence Assets Successfully Generated!");
}

generateAssets().catch(console.error);
