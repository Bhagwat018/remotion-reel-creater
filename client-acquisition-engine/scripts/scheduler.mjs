import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { runDailyPipeline } from "./run-daily-outreach.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const WORKSPACE_ROOT = path.resolve(ROOT_DIR, "..");

const settingsPath = path.join(ROOT_DIR, "config", "settings.json");
const dailyStatsPath = path.join(ROOT_DIR, "data", "daily-stats.json");
const settings = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));

function isWithinActiveHours() {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(now.getTime() + istOffset);
  const currentHour = istDate.getUTCHours();

  const { startHour, endHour } = settings.activeHours || { startHour: 12, endHour: 20 };
  return currentHour >= startHour && currentHour < endHour;
}

function hasReachedQuotaToday() {
  if (!fs.existsSync(dailyStatsPath)) return false;
  try {
    const stats = JSON.parse(fs.readFileSync(dailyStatsPath, "utf-8"));
    const today = new Date().toISOString().split("T")[0];
    return stats.lastDate === today && (stats.sentToday || 0) >= (settings.dailyDmLimit || 12);
  } catch {
    return false;
  }
}

async function checkAndRun() {
  const nowStr = new Date().toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" });
  console.log(`\n[Scheduler] Heartbeat at ${nowStr} IST...`);

  if (!isWithinActiveHours()) {
    console.log(`[Scheduler] Currently outside active window (${settings.activeHours.startHour}:00 - ${settings.activeHours.endHour}:00 IST). Waiting...`);
    return;
  }

  if (hasReachedQuotaToday()) {
    console.log(`[Scheduler] Daily limit already achieved for today. Sleeping until tomorrow.`);
    return;
  }

  console.log(`[Scheduler] Inside active window and quota remaining. Triggering outreach batch...`);
  try {
    await runDailyPipeline();
  } catch (err) {
    console.error(`[Scheduler] Error during scheduled run:`, err.message);
  }
}

// Check every 30 minutes
const INTERVAL_MS = 30 * 60 * 1000;

console.log(`🚀 [Scheduler Daemon Started]`);
console.log(`Active Hours: ${settings.activeHours.startHour}:00 to ${settings.activeHours.endHour}:00 IST`);
console.log(`Daily Safe Limit: ${settings.dailyDmLimit} DMs / day`);
console.log(`Polling interval: 30 minutes`);

checkAndRun();
setInterval(checkAndRun, INTERVAL_MS);
