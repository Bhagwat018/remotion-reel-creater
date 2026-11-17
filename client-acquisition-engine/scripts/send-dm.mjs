import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generatePitch } from "./generate-pitch.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const WORKSPACE_ROOT = path.resolve(ROOT_DIR, "..");

const settingsPath = path.join(ROOT_DIR, "config", "settings.json");
const prospectsPath = path.join(ROOT_DIR, "data", "prospects.json");
const outreachLogPath = path.join(ROOT_DIR, "data", "outreach-log.json");
const dailyStatsPath = path.join(ROOT_DIR, "data", "daily-stats.json");

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

function getSessionPath() {
  const primary = path.join(WORKSPACE_ROOT, settings.sessionDir);
  const fallback = path.join(WORKSPACE_ROOT, settings.fallbackSessionDir || ".instagram-session");
  if (fs.existsSync(primary)) return primary;
  if (fs.existsSync(fallback)) return fallback;
  return primary;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function sendDmToProspect(prospect, { dryRun = false } = {}) {
  console.log(`\n======================================================`);
  console.log(`[DM Engine] Initiating outreach to: @${prospect.username} (${prospect.fullName || "Owner"})`);
  console.log(`[DM Engine] Category: ${prospect.niche} | Website: ${prospect.currentLink || "None"}`);

  // 1. Generate customized pitch with Gemini
  console.log(`[DM Engine] Generating tailored Gemini pitch...`);
  const pitchMessage = await generatePitch(prospect);
  console.log(`\n💬 Generated Pitch:\n"${pitchMessage}"\n`);

  if (dryRun) {
    console.log(`[DRY RUN] Would send above message to @${prospect.username}. Skipping actual browser action.`);
    return { success: true, dryRun: true, message: pitchMessage };
  }

  const sessionDir = getSessionPath();
  const ctx = await chromium.launchPersistentContext(sessionDir, {
    headless: true,
    channel: "chrome",
    args: ["--disable-blink-features=AutomationControlled"]
  });

  const page = ctx.pages()[0] || (await ctx.newPage());

  try {
    // 2. Open Target Profile
    console.log(`[DM Engine] Navigating to https://www.instagram.com/${prospect.username}/`);
    await page.goto(`https://www.instagram.com/${prospect.username}/`, {
      waitUntil: "domcontentloaded",
      timeout: 25000
    });
    await sleep(getRandomInt(3000, 5000));

    // 3. Human Warmup: Scroll down slightly to view recent posts
    console.log(`[DM Engine] Performing human warmup behavior...`);
    await page.mouse.wheel(0, getRandomInt(200, 400));
    await sleep(getRandomInt(2000, 4000));
    await page.mouse.wheel(0, -getRandomInt(200, 400));
    await sleep(1500);

    // 4. Find Message button
    const messageButton = await page.$(
      "header button:has-text('Message'), header div[role='button']:has-text('Message')"
    );

    if (!messageButton) {
      console.warn(`[DM Engine] No Message button found on @${prospect.username}'s profile. Marking SKIPPED.`);
      updateProspectStatus(prospect.username, "SKIPPED", "No message button");
      return { success: false, reason: "No message button" };
    }

    console.log(`[DM Engine] Clicking Message button...`);
    await messageButton.click();
    await sleep(4000);

    // 5. Dismiss any popups ("Turn on Notifications" / "Not Now")
    try {
      const notNowBtn = await page.$("button:has-text('Not Now'), div[role='dialog'] button:has-text('Not Now')");
      if (notNowBtn) {
        console.log(`[DM Engine] Dismissed popup dialog.`);
        await notNowBtn.click();
        await sleep(1500);
      }
    } catch {}

    // 6. Locate chat input textbox
    const inputSelector = "div[role='textbox'][contenteditable='true'], div[aria-label*='Message'][contenteditable='true']";
    const chatInput = await page.waitForSelector(inputSelector, { timeout: 15000 }).catch(() => null);

    if (!chatInput) {
      console.warn(`[DM Engine] Chat textbox did not appear. Might be restricted.`);
      updateProspectStatus(prospect.username, "SKIPPED", "Textbox not accessible");
      return { success: false, reason: "Textbox not accessible" };
    }

    console.log(`[DM Engine] Chat textbox ready. Typing message with human cadence...`);
    await chatInput.click();
    await sleep(1000);

    // Type with human variation handling Shift+Enter for newlines to prevent premature sending
    const paragraphs = pitchMessage.split("\n").filter((p) => p.trim().length > 0);
    for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
      await page.keyboard.type(paragraphs[pIdx].trim(), { delay: getRandomInt(15, 28) });
      if (pIdx < paragraphs.length - 1) {
        await page.keyboard.down("Shift");
        await page.keyboard.press("Enter");
        await page.keyboard.up("Shift");
        await sleep(400);
      }
    }
    await sleep(1500);

    // 7. Hit Enter to send or click Send button
    console.log(`[DM Engine] Sending DM...`);
    await page.keyboard.press("Enter");
    await sleep(2000);

    // Fallback: check if send button is still present and click if needed
    try {
      const sendBtn = await page.$("div[role='button']:has-text('Send'), button:has-text('Send')");
      if (sendBtn) {
        await sendBtn.click();
        await sleep(2000);
      }
    } catch {}

    await sleep(2500);

    // 8. Log outreach success
    console.log(`✅ [DM Engine] Successfully sent DM to @${prospect.username}!`);
    updateProspectStatus(prospect.username, "CONTACTED", pitchMessage);
    logOutreach({
      username: prospect.username,
      fullName: prospect.fullName,
      niche: prospect.niche,
      message: pitchMessage,
      sentAt: new Date().toISOString(),
      accountUsed: settings.accountHandle
    });
    incrementDailyStats();

    return { success: true, message: pitchMessage };
  } catch (err) {
    console.error(`[DM Engine] Error sending DM to @${prospect.username}:`, err.message);
    updateProspectStatus(prospect.username, "ERROR", err.message);
    return { success: false, error: err.message };
  } finally {
    await ctx.close();
  }
}

function updateProspectStatus(username, status, note = "") {
  const prospects = loadJson(prospectsPath, []);
  const idx = prospects.findIndex((p) => p.username.toLowerCase() === username.toLowerCase());
  if (idx !== -1) {
    prospects[idx].status = status;
    prospects[idx].statusNote = note;
    prospects[idx].lastActionAt = new Date().toISOString();
    saveJson(prospectsPath, prospects);
  }
}

function logOutreach(entry) {
  const log = loadJson(outreachLogPath, []);
  log.push(entry);
  saveJson(outreachLogPath, log);
}

function incrementDailyStats() {
  const stats = loadJson(dailyStatsPath, { lastDate: "", sentToday: 0, history: {} });
  const today = new Date().toISOString().split("T")[0];

  if (stats.lastDate !== today) {
    stats.lastDate = today;
    stats.sentToday = 0;
  }

  stats.sentToday = (stats.sentToday || 0) + 1;
  stats.history[today] = stats.sentToday;
  saveJson(dailyStatsPath, stats);
}

// CLI runner
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const isDryRun = process.argv.includes("--dry-run");
  const targetUsername = process.argv.find((a) => a.startsWith("--user="))?.split("=")[1];

  const prospects = loadJson(prospectsPath, []);
  const target = targetUsername
    ? prospects.find((p) => p.username.toLowerCase() === targetUsername.toLowerCase())
    : prospects.find((p) => p.status === "PENDING");

  if (!target) {
    console.log("No pending prospect found in queue.");
    process.exit(0);
  }

  sendDmToProspect(target, { dryRun: isDryRun }).then(() => process.exit(0));
}
