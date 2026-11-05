#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const scheduleRunsPath = path.join(rootDir, "data", "schedule_runs.json");

// Daily Production Schedule Synced with IT Work Shift (12:00 PM - 08:30 PM IST)
const SCHEDULE_SLOTS = [
  {
    id: 1,
    name: "Lunchtime Market Pulse",
    time: "13:30", // 1:30 PM IST
    type: "ipo",
    description: "Morning Demand Surge, Subscription X-Ray & Apply/Avoid Decision Point",
  },
  {
    id: 2,
    name: "Market Close Final Tally",
    time: "17:45", // 5:45 PM IST (After 5:00 PM Bidding Closes)
    type: "ipo",
    description: "Final Day 1/2/3 Bidding Numbers, QIB Institutional Rush & Closing GMP",
  },
  {
    id: 3,
    name: "Evening Prime & Tomorrow Listing Alert",
    time: "20:00", // 8:00 PM IST (Right before 8:30 PM Logoff)
    type: "ipo",
    description: "Tomorrow's Listing Gain Gameplan, Traps to Avoid & Overnight Momentum",
  },
];

// Initialize schedule history
if (!fs.existsSync(scheduleRunsPath)) {
  fs.mkdirSync(path.dirname(scheduleRunsPath), { recursive: true });
  fs.writeFileSync(scheduleRunsPath, JSON.stringify({ runs: [] }, null, 2));
}

function getIstTime() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const get = (type) => parts.find((p) => p.type === type)?.value || "";
  const dateStr = `${get("year")}-${get("month")}-${get("day")}`;
  const timeStr = `${get("hour")}:${get("minute")}`;
  const fullStr = `${dateStr} ${timeStr}:${get("second")} IST`;

  return { dateStr, timeStr, fullStr, hour: parseInt(get("hour"), 10), minute: parseInt(get("minute"), 10) };
}

function loadRuns() {
  try {
    return JSON.parse(fs.readFileSync(scheduleRunsPath, "utf-8")).runs || [];
  } catch {
    return [];
  }
}

function saveRun(record) {
  const data = fs.existsSync(scheduleRunsPath)
    ? JSON.parse(fs.readFileSync(scheduleRunsPath, "utf-8"))
    : { runs: [] };
  data.runs.push(record);
  fs.writeFileSync(scheduleRunsPath, JSON.stringify(data, null, 2), "utf-8");
}

function printStatusDashboard() {
  const { dateStr, fullStr } = getIstTime();
  const runs = loadRuns().filter((r) => r.date === dateStr);

  console.log("\n=======================================================");
  console.log("⏰ 3-REELS DAILY AUTOMATION DASHBOARD");
  console.log(`🇮🇳 Current Indian Time: ${fullStr}`);
  console.log(`📅 Target Date:         ${dateStr}`);
  console.log("=======================================================");

  SCHEDULE_SLOTS.forEach((slot) => {
    const executed = runs.find((r) => r.slotId === slot.id);
    const statusIcon = executed ? "✅ COMPLETED" : "⏳ PENDING";
    const slugInfo = executed ? `➜ ${executed.slug}` : "";
    console.log(`\n[Slot ${slot.id}] ${slot.name} (${slot.time} IST)`);
    console.log(`   Focus:  ${slot.description}`);
    console.log(`   Status: ${statusIcon} ${slugInfo}`);
  });
  console.log("\n=======================================================\n");
}

async function executeSlot(slot, isDryRun = false) {
  const { dateStr, fullStr } = getIstTime();
  console.log(`\n🚀 [SLOT TRIGGER] Starting Slot ${slot.id}: "${slot.name}" at ${fullStr}`);
  console.log(`📌 Focus: ${slot.description}`);

  if (isDryRun) {
    console.log("⚡ Dry Run Mode: Skipping actual video rendering & Instagram posting.");
    return { status: "DRY_RUN", slug: `dry-run-slot-${slot.id}` };
  }

  const startTime = Date.now();
  try {
    // Run Studio Pipeline with --post (which publishes Reel AND Story!)
    console.log(`🎬 Executing: npm run studio:reel -- --type=${slot.type} --post`);
    execSync(`node scripts/studio-pipeline.mjs --type=${slot.type} --post`, {
      stdio: "inherit",
      cwd: rootDir,
    });

    // Find the latest slug from competitors_history.json
    const historyPath = path.join(rootDir, "data", "competitors_history.json");
    let producedSlug = "unknown-slug";
    if (fs.existsSync(historyPath)) {
      const history = JSON.parse(fs.readFileSync(historyPath, "utf-8"));
      const last = history.processedReels[history.processedReels.length - 1];
      if (last && last.ourSlug) producedSlug = last.ourSlug;
    }

    const durationMin = ((Date.now() - startTime) / 60000).toFixed(1);
    const runRecord = {
      date: dateStr,
      slotId: slot.id,
      slotName: slot.name,
      scheduledTime: slot.time,
      executedAt: new Date().toISOString(),
      durationMin,
      slug: producedSlug,
      status: "SUCCESS",
    };
    saveRun(runRecord);

    console.log(`\n🎉 [SLOT ${slot.id} SUCCESS] High-Quality Reel published live to @techwith.genz in ${durationMin} mins!`);
    console.log(`🔗 Reel Target: ${producedSlug}`);
    console.log(`📲 Tip: Open Instagram on your phone to 1-tap share this reel to your Story for native video playback!\n`);
    return runRecord;
  } catch (err) {
    console.error(`\n❌ [SLOT ${slot.id} ERROR]:`, err.message);
    const failRecord = {
      date: dateStr,
      slotId: slot.id,
      slotName: slot.name,
      scheduledTime: slot.time,
      executedAt: new Date().toISOString(),
      status: "FAILED",
      error: err.message,
    };
    saveRun(failRecord);
    throw err;
  }
}

async function runScheduler() {
  const args = process.argv.slice(2);
  const isDaemon = args.includes("--daemon");
  const isNow = args.includes("--now");
  const isDryRun = args.includes("--dry-run");
  const isStatus = args.includes("--status");
  const slotArg = args.find((a) => a.startsWith("--slot="))?.split("=")[1];

  if (isStatus) {
    printStatusDashboard();
    return;
  }

  // Trigger explicit slot immediately
  if (slotArg) {
    const slotId = parseInt(slotArg, 10);
    const targetSlot = SCHEDULE_SLOTS.find((s) => s.id === slotId);
    if (!targetSlot) {
      console.error(`❌ Invalid slot: ${slotArg}. Choose 1, 2, or 3.`);
      process.exit(1);
    }
    await executeSlot(targetSlot, isDryRun);
    return;
  }

  // Trigger next pending slot immediately
  if (isNow) {
    printStatusDashboard();
    const { dateStr } = getIstTime();
    const runs = loadRuns().filter((r) => r.date === dateStr && r.status === "SUCCESS");
    const executedSlotIds = new Set(runs.map((r) => r.slotId));

    const nextSlot = SCHEDULE_SLOTS.find((s) => !executedSlotIds.has(s.id));
    if (!nextSlot) {
      console.log("🌟 All 3 slots for today have already been completed!");
      console.log("Use --slot=<1|2|3> to force a re-run for a specific slot.");
      return;
    }

    console.log(`🎯 Fast-Forward: Triggering next pending Slot ${nextSlot.id}: "${nextSlot.name}"...`);
    await executeSlot(nextSlot, isDryRun);
    return;
  }

  // Daemon Mode: Continuous schedule listener (Checking every 15 minutes to save CPU)
  if (isDaemon) {
    console.log("\n=======================================================");
    console.log("🤖 24/7 AUTONOMOUS REEL SCHEDULER DAEMON");
    console.log("📡 Tracking Indian Market Hours (Asia/Kolkata)");
    console.log("⏰ Slots: 01:30 PM | 05:45 PM | 08:00 PM IST");
    console.log("🔋 Power-Saver Mode: Checks every 15 minutes (Zero CPU waste)");
    console.log("=======================================================\n");

    printStatusDashboard();

    console.log("👂 Listening for next trigger time (checking every 15 minutes)... Press Ctrl+C to stop.\n");

    const checkAndTrigger = async () => {
      const { dateStr, hour, minute, fullStr } = getIstTime();
      const currentMinutes = hour * 60 + minute;
      const runs = loadRuns().filter((r) => r.date === dateStr && r.status === "SUCCESS");
      const executedSlotIds = new Set(runs.map((r) => r.slotId));

      for (const slot of SCHEDULE_SLOTS) {
        const [sHour, sMin] = slot.time.split(":").map(Number);
        const slotMinutes = sHour * 60 + sMin;

        // Trigger if current time has reached or passed slot time today, and slot has not yet executed
        if (currentMinutes >= slotMinutes && !executedSlotIds.has(slot.id)) {
          console.log(`\n🔔 [ALARM] Current Time (${fullStr}) is due for Slot ${slot.id}: ${slot.name}!`);
          try {
            await executeSlot(slot, false);
          } catch (err) {
            console.error(`Slot ${slot.id} execution failed, will retry on next 15-min tick:`, err.message);
          }
        }
      }
    };

    // Run check immediately on start
    await checkAndTrigger();

    // Then check every 15 minutes (15 * 60 * 1000 ms)
    setInterval(checkAndTrigger, 15 * 60 * 1000);

    return;
  }

  // Default: Show usage and status
  printStatusDashboard();
  console.log("Usage Commands:");
  console.log("  npm run schedule:status     ➜ View today's 3-slot status & pending jobs");
  console.log("  npm run schedule:now        ➜ Immediately produce & post next pending slot");
  console.log("  npm run schedule:slot -- 2  ➜ Force execute Slot 2 (Lunchtime)");
  console.log("  npm run schedule:daemon     ➜ Run 24/7 background scheduler loop");
}

runScheduler().catch((err) => {
  console.error("Scheduler Fatal Error:", err);
  process.exit(1);
});

