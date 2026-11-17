import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { discoverProspects } from "./discover-prospects.mjs";
import { sendDmToProspect } from "./send-dm.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const settingsPath = path.join(ROOT_DIR, "config", "settings.json");
const prospectsPath = path.join(ROOT_DIR, "data", "prospects.json");
const outreachLogPath = path.join(ROOT_DIR, "data", "outreach-log.json");
const dailyStatsPath = path.join(ROOT_DIR, "data", "daily-stats.json");
const reportsDir = path.join(ROOT_DIR, "reports");

const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));

function loadJson(filePath, defaultValue) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch (e) {
    console.warn(`Could not read ${filePath}:`, e.message);
  }
  return defaultValue;
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isWithinActiveHours() {
  const now = new Date();
  // Get Indian Standard Time (IST) hours
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(now.getTime() + istOffset);
  const currentHour = istDate.getUTCHours();

  const { startHour, endHour } = settings.activeHours || { startHour: 12, endHour: 20 };
  return currentHour >= startHour && currentHour < endHour;
}

export async function runDailyPipeline({ force = false, dryRun = false, limit = null } = {}) {
  console.log(`\n======================================================`);
  console.log(`🚀 [Client Acquisition Engine] Launching Daily Pipeline`);
  console.log(`⏰ Time Check: Active window is ${settings.activeHours.startHour}:00 to ${settings.activeHours.endHour}:00 IST`);

  if (!force && !isWithinActiveHours()) {
    console.log(`⏳ Currently outside active business hours. Pipeline safely pauses until 12:00 PM IST.`);
    console.log(`(Pass --force or --now to override for testing)`);
    return { status: "OUTSIDE_HOURS" };
  }

  // Check today's quota
  const stats = loadJson(dailyStatsPath, { lastDate: "", sentToday: 0, history: {} });
  const today = new Date().toISOString().split("T")[0];

  if (stats.lastDate !== today) {
    stats.lastDate = today;
    stats.sentToday = 0;
    saveJson(dailyStatsPath, stats);
  }

  const dailyCap = limit || settings.dailyDmLimit || 12;
  const remainingQuota = Math.max(0, dailyCap - (stats.sentToday || 0));

  console.log(`📊 Today's Status: ${stats.sentToday || 0}/${dailyCap} DMs sent. Remaining Quota: ${remainingQuota}`);

  if (remainingQuota <= 0) {
    console.log(`🛡️ Daily safe DM limit (${dailyCap}) reached for today! Stopping to protect account.`);
    return { status: "LIMIT_REACHED", sentToday: stats.sentToday };
  }

  // Check pending prospects
  let prospects = loadJson(prospectsPath, []);
  let pending = prospects.filter((p) => p.status === "PENDING");

  if (pending.length < remainingQuota) {
    console.log(`🔍 Pending queue is low (${pending.length} available). Launching discovery for fresh local businesses...`);
    try {
      await discoverProspects({ maxToFind: Math.max(8, remainingQuota * 2) });
      prospects = loadJson(prospectsPath, []);
      pending = prospects.filter((p) => p.status === "PENDING");
    } catch (err) {
      console.warn(`[Pipeline] Discovery warning:`, err.message);
    }
  }

  console.log(`📋 Total Pending Prospects Ready: ${pending.length}`);

  const toProcess = pending.slice(0, remainingQuota);
  const results = [];

  for (let i = 0; i < toProcess.length; i++) {
    const prospect = toProcess[i];
    console.log(`\n[${i + 1}/${toProcess.length}] Processing outreach to @${prospect.username}...`);

    const result = await sendDmToProspect(prospect, { dryRun });
    results.push({ prospect, result });

    // Randomized human pause between DMs
    if (i < toProcess.length - 1) {
      if (dryRun) {
        console.log(`[DRY RUN] Skipping human delay in preview mode.`);
        await sleep(1000);
      } else {
        const minSec = settings.delays?.minBetweenDmsSec || 60;
        const maxSec = settings.delays?.maxBetweenDmsSec || 120;
        const pauseSec = getRandomInt(minSec, maxSec);
        console.log(`☕ Human pause: Waiting ${pauseSec}s before next outreach...`);
        await sleep(pauseSec * 1000);
      }
    }
  }

  // Generate Daily Report
  generateDailyReport(results, today);
  console.log(`\n🎉 [Pipeline Completed] Processed ${results.length} outreaches successfully!`);
  return { status: "SUCCESS", count: results.length, results };
}

function generateDailyReport(results, dateStr) {
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const reportFile = path.join(reportsDir, `report-${dateStr}.md`);
  const lines = [
    `# 🚀 Client Acquisition Daily Report: ${dateStr}`,
    `**Account Used:** \`${settings.accountHandle}\``,
    `**Total Contacted Today:** ${results.length}`,
    `**Timestamp:** ${new Date().toISOString()}`,
    ``,
    `## Outreach Log`,
    `| # | Username | Business Name | Niche | Status | External Link |`,
    `|---|---|---|---|---|---|`
  ];

  results.forEach((item, idx) => {
    const p = item.prospect;
    const r = item.result;
    lines.push(
      `| ${idx + 1} | [@${p.username}](https://instagram.com/${p.username}) | ${p.fullName || "-"} | ${p.niche} | ${r.success ? "✅ Sent" : "❌ Failed"} | ${p.currentLink ? `[Link](${p.currentLink})` : "None"} |`
    );
  });

  lines.push(``);
  lines.push(`## Sample Pitches Delivered`);
  results.forEach((item, idx) => {
    if (item.result?.message) {
      lines.push(`### ${idx + 1}. @${item.prospect.username} (${item.prospect.niche})`);
      lines.push(`> ${item.result.message}`);
      lines.push(``);
    }
  });

  fs.writeFileSync(reportFile, lines.join("\n"), "utf-8");
  console.log(`📄 Daily report saved to: ${reportFile}`);
}

// CLI runner
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const force = process.argv.includes("--force") || process.argv.includes("--now");
  const dryRun = process.argv.includes("--dry-run");
  const limitArg = process.argv.find((a) => a.startsWith("--limit="))?.split("=")[1];
  const limit = limitArg ? parseInt(limitArg, 10) : null;

  runDailyPipeline({ force, dryRun, limit }).then(() => process.exit(0));
}
