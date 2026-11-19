#!/usr/bin/env node
/**
 * Instagram Login Setup for NEW Channel (@viralpod.in)
 * =====================================================
 * This script opens a dedicated browser window for logging into @viralpod.in.
 * It saves the session into: clip-engine/.instagram-session-viralpod/
 * The OLD account session (.instagram-session/) is 100% UNTOUCHED and PRESERVED.
 */

import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const userDataDir = path.join(rootDir, ".instagram-session-viralpod");

console.log("\n=======================================================");
console.log("🌐 Instagram Login for NEW Channel: @viralpod.in");
console.log("=======================================================\n");
console.log("🔒 OLD account session is completely SAFE & PRESERVED.");
console.log("📁 New session will be stored in: clip-engine/.instagram-session-viralpod/\n");
console.log("Ek browser window open hogi.");
console.log("1. Apne naye account (@viralpod.in) se login karein.");
console.log("2. Login complete hote hi ye script auto-detect karke session save kar legi.\n");

async function main() {
  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true });
  }

  // Launch browser in HEADED mode with persistent profile
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: { width: 1280, height: 850 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const page = await context.newPage();
  console.log("🌐 Opening Instagram login page...");
  await page.goto("https://www.instagram.com/accounts/login/", { waitUntil: "domcontentloaded" });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  await Promise.race([
    new Promise((resolve) => {
      rl.question(
        "\n👉 Browser me login complete hone ke baad yahan ENTER press karein: ",
        () => {
          rl.close();
          resolve();
        }
      );
    }),
    new Promise(async (resolve) => {
      // Auto-detect login every 2 seconds
      while (true) {
        try {
          if (page.isClosed() || !context.pages().length) {
            resolve();
            break;
          }
          await page.waitForTimeout(2000);
          const loggedIn = await page.evaluate(() => {
            return Boolean(
              document.querySelector('svg[aria-label="Home"]') ||
              document.querySelector('svg[aria-label="New post"]') ||
              document.querySelector('a[href*="/direct/inbox/"]') ||
              document.querySelector('svg[aria-label="Search"]') ||
              document.querySelector('img[alt*="profile picture"]') ||
              document.querySelector('span[role="link"] img')
            );
          }).catch(() => false);

          if (loggedIn) {
            console.log("\n⚡ Auto-detected successful Instagram login for @viralpod.in!");
            rl.close();
            resolve();
            break;
          }
        } catch {
          break;
        }
      }
    })
  ]);

  console.log("\n💾 Saving session to clip-engine/.instagram-session-viralpod...");
  await page.waitForTimeout(3000);
  await context.close();

  console.log("🎉 SUCCESS: @viralpod.in session successfully saved!");
  console.log("Ab future me viralpod ke saare reels auto-post honge background me.\n");
}

main().catch((err) => {
  console.error("❌ Error during login setup:", err);
  process.exit(1);
});
