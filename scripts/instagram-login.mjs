#!/usr/bin/env node
import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const userDataDir = path.join(rootDir, ".instagram-session");

console.log("\n=======================================================");
console.log("🌐 Instagram 1-Time Browser Login Setup");
console.log("=======================================================\n");
console.log("Ek browser window khulegi.");
console.log("Agar aap already logged in nahi hain, toh Instagram pe login kar lein.");
console.log("Login complete hone ke baad terminal me wapas aakar ENTER press karein.\n");

async function main() {
  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true });
  }

  // Launch browser in HEADED mode (visible to user) with persistent profile
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: false,
    viewport: { width: 1280, height: 800 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const page = await context.newPage();
  await page.goto("https://www.instagram.com/", { waitUntil: "domcontentloaded" });

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
        await page.waitForTimeout(2000);
        try {
          const loggedIn = await page.evaluate(() => {
            return Boolean(
              document.querySelector('svg[aria-label="Home"]') ||
              document.querySelector('svg[aria-label="New post"]') ||
              document.querySelector('a[href*="/direct/inbox/"]') ||
              document.querySelector('svg[aria-label="Search"]')
            );
          });
          if (loggedIn) {
            console.log("\n⚡ Auto-detected successful Instagram login!");
            rl.close();
            resolve();
            break;
          }
        } catch {}
      }
    })
  ]);

  console.log("\n💾 Saving session...");
  await page.waitForTimeout(3000);
  await context.close();

  console.log("🎉 SUCCESS: Aapka Instagram session '.instagram-session' folder me save ho gaya hai!");
  console.log("Ab future me saare reels 100% BACKGROUND me auto-post honge bina screen khole.\n");
}

main().catch((err) => {
  console.error("❌ Error during login setup:", err);
  process.exit(1);
});

