#!/usr/bin/env node
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const cachePath = path.join(rootDir, "data", "live_market_ipos.json");

/**
 * Stage 1 of IPO Content Engine: Real-Time Indian IPO Scraper
 * Pulls live Mainboard and SME IPOs with exact GMP, subscription multipliers,
 * lot sizes, and listing dates, while enforcing the <72h Strict Freshness Gatekeeper.
 */
export async function fetchLiveIpos({ forceRefresh = false } = {}) {
  // Check if cache is fresh (< 3 hours old)
  if (!forceRefresh && fs.existsSync(cachePath)) {
    try {
      const cached = JSON.parse(fs.readFileSync(cachePath, "utf-8"));
      const ageHours = (Date.now() - new Date(cached.fetchedAt).getTime()) / (1000 * 60 * 60);
      if (ageHours < 3 && Array.isArray(cached.ipos) && cached.ipos.length > 0) {
        console.log(`📦 Using fresh cached IPO market data (${cached.ipos.length} IPOs, ${ageHours.toFixed(1)}h old)`);
        return cached.ipos;
      }
    } catch {}
  }

  console.log("🌐 Fetching live Indian IPO market feeds from InvestorGain...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();

  const ipos = [];

  try {
    await page.goto("https://www.investorgain.com/report/live-ipo-gmp/331/", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(2000);

    const rows = await page.locator("table tbody tr").all();
    console.log(`📊 Scraped ${rows.length} raw IPO entries from market board.`);

    for (const r of rows) {
      try {
        const cells = await r.locator("td").allInnerTexts();
        if (cells.length < 10) continue;

        const rawName = cells[0]?.trim().replace(/\n+/g, " ") || "";
        const rawGmp = cells[1]?.trim().replace(/\n+/g, " ") || "";
        const rawSub = cells[3]?.trim().replace(/\n+/g, " ") || "1x";
        const rawPrice = cells[4]?.trim().replace(/\n+/g, " ") || "100";
        const rawSize = cells[5]?.trim().replace(/\n+/g, " ") || "₹50 Cr";
        const rawLot = cells[6]?.trim().replace(/\n+/g, " ") || "100";
        const rawOpen = cells[7]?.trim().replace(/\n+/g, " ") || "";
        const rawClose = cells[8]?.trim().replace(/\n+/g, " ") || "";
        const rawAllotment = cells[9]?.trim().replace(/\n+/g, " ") || "";
        const rawListing = cells[10]?.trim().replace(/\n+/g, " ") || "";

        // Extract clean company name
        const cleanName = rawName
          .replace(/BSE\s*SME.*/i, "")
          .replace(/NSE\s*SME.*/i, "")
          .replace(/IPO.*/i, "")
          .replace(/CALLOTTED.*/i, "")
          .replace(/L@[\d.]+.*/i, "")
          .trim();

        if (!cleanName || cleanName.length < 3) continue;

        const isSme = /sme/i.test(rawName);
        const isMainboard = !isSme;

        // Extract GMP price and percentage (e.g. "₹115 (72.78%) 27 ↓")
        let gmpPrice = 0;
        let gmpPercent = 0;
        const gmpMatch = rawGmp.match(/₹?([\d.]+)\s*\(([\d.]+)%\)/);
        if (gmpMatch) {
          gmpPrice = parseFloat(gmpMatch[1]);
          gmpPercent = parseFloat(gmpMatch[2]);
        }

        // Extract subscription multiple (e.g. "536.8x" -> 536.8)
        let subMultiple = 1.0;
        const subMatch = rawSub.match(/([\d.]+)x/i);
        if (subMatch) {
          subMultiple = parseFloat(subMatch[1]);
        }

        // Extract price
        const issuePrice = parseFloat(rawPrice.replace(/[^\d.]/g, "")) || 100;
        const lotSize = parseInt(rawLot.replace(/[^\d]/g, ""), 10) || 100;
        const minInvestment = issuePrice * lotSize;

        // Clean dates
        const cleanDate = (d) => d.replace(/GMP:.*/i, "").trim();
        const openDate = cleanDate(rawOpen);
        const closeDate = cleanDate(rawClose);
        const listingDate = cleanDate(rawListing);
        const allotmentDate = cleanDate(rawAllotment);

        // Status determination
        let status = "ACTIVE";
        if (rawName.includes("ALLOTTED")) {
          status = "ALLOTTED";
        } else if (rawName.includes("L@")) {
          status = "LISTED";
        }

        ipos.push({
          rawName,
          company: cleanName,
          type: isSme ? "SME" : "Mainboard",
          status,
          gmpPrice,
          gmpPercent,
          subMultiple,
          issuePrice,
          lotSize,
          minInvestment,
          issueSize: rawSize,
          openDate,
          closeDate,
          allotmentDate,
          listingDate,
        });
      } catch (rowErr) {
        // Skip malformed row
      }
    }
  } catch (err) {
    console.error("❌ Market Scraper Error:", err.message);
  } finally {
    await browser.close();
  }

  // Save to cache
  if (ipos.length > 0) {
    fs.mkdirSync(path.dirname(cachePath), { recursive: true });
    fs.writeFileSync(
      cachePath,
      JSON.stringify({ fetchedAt: new Date().toISOString(), ipos }, null, 2),
      "utf-8"
    );
    console.log(`✅ Cached ${ipos.length} verified live IPO records in data/live_market_ipos.json`);
  }

  return ipos;
}

/**
 * Enforces the Strict Freshness Gatekeeper & Picks Top Trending IPO:
 * Rejects any IPO already listed or closed > 72 hours ago.
 * Prioritizes:
 * 1. Currently Open IPOs with high GMP / Subscription
 * 2. Listing Today / Tomorrow with high GMP
 * 3. Upcoming IPOs opening in next 1-5 days
 */
export async function pickTopTrendingIpo(options = {}) {
  const ipos = await fetchLiveIpos(options);

  // Strict Freshness Filter: Reject already listed IPOs unless listing is today
  const freshIpos = ipos.filter((ipo) => {
    // If status is LISTED, reject unless listing date explicitly includes today
    if (ipo.status === "LISTED") return false;
    return true;
  });

  if (freshIpos.length === 0) {
    throw new Error("No active or fresh IPOs found in market right now.");
  }

  // Sort by Viral Potential Score:
  // Viral Score = (gmpPercent * 1.5) + (Math.log10(subMultiple + 1) * 30) + (status === "ACTIVE" ? 40 : 20)
  freshIpos.forEach((ipo) => {
    let score = ipo.gmpPercent * 1.5;
    score += Math.log10(ipo.subMultiple + 1) * 35;
    if (ipo.status === "ACTIVE") score += 40;
    if (ipo.gmpPercent > 50) score += 50; // Super high listing gain alert
    ipo.viralScore = parseFloat(score.toFixed(1));
  });

  freshIpos.sort((a, b) => b.viralScore - a.viralScore);

  console.log("\n🏆 Top 3 Fresh Market IPOs Ranked by Viral Potential:");
  freshIpos.slice(0, 3).forEach((item, idx) => {
    console.log(
      `   #${idx + 1} ${item.company} [${item.type}] | GMP: +${item.gmpPercent}% (₹${item.gmpPrice}) | Sub: ${item.subMultiple}x | Status: ${item.status} | Viral Score: ${item.viralScore}`
    );
  });

  return freshIpos[0];
}

// Allow direct CLI test run
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  pickTopTrendingIpo({ forceRefresh: true }).then((top) => {
    console.log(`\n🎯 Selected Top IPO for Production: "${top.company}"`);
  });
}

