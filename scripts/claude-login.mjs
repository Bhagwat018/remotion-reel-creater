#!/usr/bin/env node
import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const userDataDir = path.join(rootDir, ".claude-session");

console.log("\n=======================================================");
console.log("🌐 Claude AI 1-Time Browser Login Setup");
console.log("=======================================================\n");
console.log("Ek Chrome browser window aapke samne khul rahi hai.");
console.log("Wahan Claude pe login karein.");
console.log("Jaise hi aap login karenge, session automatically '.claude-session' me save ho jayega!\n");

async function main() {
  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true });
  }

  // Launch browser in HEADED mode (visible to user on Mac) with persistent profile
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: { width: 1280, height: 900 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
  
  console.log("🚀 Opening https://claude.ai/login ...");
  await page.goto("https://claude.ai/login", { waitUntil: "domcontentloaded" });

  // Auto-detect login or wait up to 5 minutes
  let loggedIn = false;
  const startTime = Date.now();
  const maxWaitMs = 5 * 60 * 1000; // 5 minutes

  while (Date.now() - startTime < maxWaitMs) {
    await page.waitForTimeout(2500);
    const url = page.url();
    const isPastLogin = !url.includes("/login") && (url.includes("claude.ai") || url.includes("/new") || url.includes("/chat"));
    const hasChatBox = await page.$("div[contenteditable='true'], textarea, div[data-testid='user-menu-button']").catch(() => null);

    if (isPastLogin && hasChatBox) {
      console.log(`\n🎉 Login detected successfully! (URL: ${url})`);
      loggedIn = true;
      break;
    }
  }

  console.log("\n💾 Saving session...");
  await page.waitForTimeout(3000);
  await context.close();

  if (loggedIn) {
    console.log("✅ SUCCESS: Aapka Claude session '.claude-session' folder me save ho gaya hai!");
    console.log("Ab future me automations background me seamlessly run ho sakenge.\n");
  } else {
    console.log("⚠️ Window closed or timeout reached. Session cookies saved.");
  }
}

main().catch((err) => {
  console.error("❌ Login error:", err.message);
  process.exit(1);
});
