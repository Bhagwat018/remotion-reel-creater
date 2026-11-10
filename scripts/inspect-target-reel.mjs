import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const userDataDir = path.join(rootDir, ".instagram-session");

async function inspectReel() {
  const url = "https://www.instagram.com/reel/DfcGSLCybP3/";
  console.log(`🔍 Navigating to ${url}...`);

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: true,
    viewport: { width: 1280, height: 900 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(3000);

    // Save screenshot
    const shotPath = path.join(rootDir, "out", "target_reel_preview.png");
    fs.mkdirSync(path.dirname(shotPath), { recursive: true });
    await page.screenshot({ path: shotPath });
    console.log(`📸 Screenshot saved to ${shotPath}`);

    // Extract title / og:title / og:description
    const ogTitle = await page.$eval("meta[property='og:title']", (el) => el.content).catch(() => "");
    const ogDesc = await page.$eval("meta[property='og:description']", (el) => el.content).catch(() => "");
    const pageTitle = await page.title().catch(() => "");

    // Extract caption text from page elements
    const elements = await page.locator("h1, div[role='button'] ~ div, span[dir='auto']").all();
    let longestText = "";
    for (const el of elements) {
      const txt = await el.innerText().catch(() => "");
      if (txt.length > longestText.length) longestText = txt;
    }

    // Try finding video source
    const videoSrc = await page.$eval("video", (el) => el.src).catch(() => "");

    console.log("\n================ REEL DETAILS ================");
    console.log(`Page Title: ${pageTitle}`);
    console.log(`OG Title: ${ogTitle}`);
    console.log(`OG Description: ${ogDesc}`);
    console.log(`Video Src: ${videoSrc ? videoSrc.substring(0, 80) + "..." : "Not found"}`);
    console.log(`Longest Extracted Text:\n${longestText}`);
    console.log("==============================================");

    fs.writeFileSync(
      path.join(rootDir, "out", "target_reel_info.json"),
      JSON.stringify(
        {
          url,
          pageTitle,
          ogTitle,
          ogDesc,
          longestText,
          videoSrc,
        },
        null,
        2
      )
    );
  } catch (err) {
    console.error("❌ Error inspecting reel:", err);
  } finally {
    await context.close();
  }
}

inspectReel();

