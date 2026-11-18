/**
 * Indian IPO & Live GMP Scraper (100% Free Public Market Intelligence)
 * Tracks ONLY Currently Open and Soon-Upcoming Mainboard & SME IPOs.
 * Filters out all past, closed, and already-listed IPOs so you never see outdated data.
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cacheFile = path.resolve(__dirname, "../../data/live_cache/ipos.json");

const months = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

export function parseIndianDate(str, defaultYear = new Date().getFullYear()) {
  if (!str) return null;
  const match = str.match(/(\d{1,2})-([A-Za-z]{3})/i);
  if (!match) return null;
  const day = parseInt(match[1], 10);
  const monStr = match[2].toLowerCase();
  const month = months[monStr];
  if (month === undefined) return null;

  // Handle year transitions (e.g. today is Dec, date is Jan -> next year)
  let year = defaultYear;
  const currentMonth = new Date().getMonth();
  if (currentMonth === 11 && month === 0) year += 1;
  if (currentMonth === 0 && month === 11) year -= 1;

  return new Date(year, month, day, 23, 59, 59);
}

export function cleanDateString(str) {
  if (!str) return "";
  return str.replace(/GMP:.*$/i, "").trim();
}

export async function fetchLiveIpos({ forceRefresh = false, onlyActive = true } = {}) {
  // Check local cache (< 2 hours old)
  if (!forceRefresh && fs.existsSync(cacheFile)) {
    try {
      const cached = JSON.parse(fs.readFileSync(cacheFile, "utf-8"));
      const ageHours = (Date.now() - new Date(cached.fetchedAt).getTime()) / (1000 * 60 * 60);
      if (ageHours < 2 && Array.isArray(cached.ipos) && cached.ipos.length > 0) {
        return onlyActive ? filterActiveAndUpcoming(cached.ipos) : cached.ipos;
      }
    } catch {}
  }

  console.log("🔍 Fetching live IPOs & Grey Market Premiums from InvestorGain...");
  let browser = null;
  const allIpos = [];

  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    });
    const page = await context.newPage();

    await page.goto("https://www.investorgain.com/report/live-ipo-gmp/331/", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(2000);

    const rows = await page.locator("table tbody tr").all();

    for (const r of rows) {
      try {
        const cells = await r.locator("td").allInnerTexts();
        if (cells.length < 9) continue;

        const rawName = cells[0]?.trim().replace(/\n+/g, " ") || "";
        const rawGmp = cells[1]?.trim().replace(/\n+/g, " ") || "";
        const rawSub = cells[3]?.trim().replace(/\n+/g, " ") || "1x";
        const rawPrice = cells[4]?.trim().replace(/\n+/g, " ") || "100";
        const rawSize = cells[5]?.trim().replace(/\n+/g, " ") || "₹50 Cr";
        const rawLot = cells[6]?.trim().replace(/\n+/g, " ") || "100";
        const rawOpen = cleanDateString(cells[7]?.trim().replace(/\n+/g, " ") || "");
        const rawClose = cleanDateString(cells[8]?.trim().replace(/\n+/g, " ") || "");
        const rawListing = cleanDateString(cells[10]?.trim().replace(/\n+/g, " ") || "");

        // Clean company name
        const cleanName = rawName
          .replace(/BSE\s*SME.*/i, "")
          .replace(/NSE\s*SME.*/i, "")
          .replace(/IPO.*/i, "")
          .replace(/CALLOTTED.*/i, "")
          .trim();

        if (!cleanName || cleanName.length < 3) continue;

        const isSme = /sme/i.test(rawName);

        // Parse GMP ₹ and %
        let gmpPrice = 0;
        let gmpPercent = 0;
        const gmpMatch = rawGmp.match(/₹?([\d.]+)\s*\(([\d.]+)%\)/);
        if (gmpMatch) {
          gmpPrice = parseFloat(gmpMatch[1]);
          gmpPercent = parseFloat(gmpMatch[2]);
        }

        // Parse subscription multiplier
        let subMultiple = 1.0;
        const subMatch = rawSub.match(/([\d.]+)x/i);
        if (subMatch) {
          subMultiple = parseFloat(subMatch[1]);
        }

        // Apply/Avoid Verdict based on capital preservation
        let verdict = "NEUTRAL / WATCH";
        let conviction = "MODERATE";

        if (gmpPercent >= 35 && subMultiple >= 3.0) {
          verdict = "STRONG APPLY (HIGH LISTING GAIN)";
          conviction = "HIGH";
        } else if (gmpPercent >= 18 && subMultiple >= 1.5) {
          verdict = "APPLY WITH CAUTION (DECENT GAIN)";
          conviction = "MODERATE";
        } else if (gmpPercent < 10 || subMultiple < 1.0) {
          verdict = "AVOID / TRAP RISK (LOW LISTING GAIN)";
          conviction = "HIGH";
        }

        // Determine Timing Status (Open Now, Upcoming, or Closed)
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const openDateObj = parseIndianDate(rawOpen);
        const closeDateObj = parseIndianDate(rawClose);

        let status = "UPCOMING";
        let statusLabel = `⏳ Upcoming (Opens ${rawOpen || "Soon"})`;

        if (openDateObj && closeDateObj) {
          if (startOfToday >= new Date(openDateObj.getFullYear(), openDateObj.getMonth(), openDateObj.getDate()) &&
              startOfToday <= closeDateObj) {
            status = "OPEN_NOW";
            statusLabel = `🔥 OPEN NOW (Closes ${rawClose})`;
          } else if (startOfToday > closeDateObj) {
            status = "CLOSED";
            statusLabel = `❌ Closed on ${rawClose}`;
          } else {
            status = "UPCOMING";
            statusLabel = `⏳ Opens on ${rawOpen}`;
          }
        } else if (rawOpen.toLowerCase().includes("tba") || !rawOpen) {
          status = "UPCOMING";
          statusLabel = "⏳ Upcoming (Dates TBA)";
        }

        allIpos.push({
          name: cleanName,
          rawName,
          category: isSme ? "SME IPO" : "Mainboard IPO",
          priceBand: rawPrice,
          issueSize: rawSize,
          lotSize: rawLot,
          gmpPrice: gmpPrice > 0 ? `₹${gmpPrice}` : "--",
          gmpPercent: gmpPercent,
          subscription: `${subMultiple}x`,
          openDate: rawOpen,
          closeDate: rawClose,
          listingDate: rawListing,
          status,
          statusLabel,
          verdict,
          conviction,
        });
      } catch (rowErr) {
        continue;
      }
    }
  } catch (err) {
    console.warn("⚠️ IPO Scraping failed:", err.message);
  } finally {
    if (browser) await browser.close();
  }

  // Cache results
  try {
    fs.mkdirSync(path.dirname(cacheFile), { recursive: true });
    fs.writeFileSync(
      cacheFile,
      JSON.stringify({ fetchedAt: new Date().toISOString(), ipos: allIpos }, null, 2)
    );
  } catch {}

  return onlyActive ? filterActiveAndUpcoming(allIpos) : allIpos;
}

/**
 * Filter out all past/closed IPOs. Keeps ONLY currently open or upcoming ones.
 */
export function filterActiveAndUpcoming(ipos) {
  return ipos.filter((ipo) => ipo.status === "OPEN_NOW" || ipo.status === "UPCOMING");
}
