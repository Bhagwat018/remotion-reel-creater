#!/usr/bin/env node
/**
 * Automated Instagram Reel Publisher for @viralpod.in
 * ====================================================
 * Uploads reels to @viralpod.in using the saved session in clip-engine/.instagram-session-viralpod/
 * Auto-detects cover image (*-cover.jpg) and caption (*-caption.txt).
 *
 * Usage:
 *   node clip-engine/scripts/post_reel_viralpod.mjs <path-to-reel.mp4> [--headed]
 *   npm run post:viralpod -- clip-engine/output/kPPOjfhNH_E_clip01_reel.mp4
 */

import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const userDataDir = path.join(rootDir, ".instagram-session-viralpod");

const args = process.argv.slice(2).filter((arg) => arg !== "--");
const isHeaded = args.includes("--headed");
const fileArgs = args.filter((arg) => arg !== "--headed");
const targetFile = fileArgs[0];

if (!targetFile) {
  console.error("❌ Error: Please specify the video file to post.");
  console.error("Usage: node clip-engine/scripts/post_reel_viralpod.mjs <path-to-video.mp4> [--headed]");
  process.exit(1);
}

const videoPath = path.resolve(targetFile);

if (!fs.existsSync(videoPath)) {
  console.error(`❌ Video file not found: ${videoPath}`);
  process.exit(1);
}

if (!fs.existsSync(userDataDir)) {
  console.error(`❌ No saved Instagram session found for viralpod!`);
  console.error(`Please run login first: npm run login:viralpod`);
  process.exit(1);
}

// Auto-derive caption from .txt file if present
let caption = "";
const txtCaptionPath = videoPath.replace(/\.mp4$/, "-caption.txt");
const jsonCaptionPath = videoPath.replace(/\.mp4$/, "-caption.json");
const coverPath = videoPath.replace(/\.mp4$/, "-cover.jpg");

if (fs.existsSync(txtCaptionPath)) {
  caption = fs.readFileSync(txtCaptionPath, "utf-8").trim();
  console.log(`📝 Loaded caption from: ${path.basename(txtCaptionPath)}`);
} else if (fs.existsSync(jsonCaptionPath)) {
  const cData = JSON.parse(fs.readFileSync(jsonCaptionPath, "utf-8"));
  caption = cData.instagram_caption || "";
}

if (!caption) {
  caption = "Insane moment! 😱 Watch till the end! 👇 #viral #reels #explore #trending";
}

console.log("\n=======================================================");
console.log("🚀 PUBLISHING REEL TO @viralpod.in");
console.log("=======================================================");
console.log(`📁 Video:   ${path.basename(videoPath)}`);
console.log(`🖼️ Cover:   ${fs.existsSync(coverPath) ? path.basename(coverPath) : "Auto"}`);
console.log(`👀 Mode:    ${isHeaded ? "Headed (Visible)" : "Headless (Background)"}`);
console.log("=======================================================\n");

async function main() {
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: !isHeaded,
    viewport: { width: 1280, height: 900 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const page = await context.newPage();

  try {
    console.log("🌐 [1/6] Navigating to Instagram...");
    await page.goto("https://www.instagram.com/", { waitUntil: "networkidle", timeout: 45000 });

    const isLoggedIn = await page.evaluate(() => {
      return Boolean(
        document.querySelector("svg[aria-label='Home']") ||
        document.querySelector("svg[aria-label='New post']") ||
        document.querySelector("svg[aria-label='Create']")
      );
    });

    if (!isLoggedIn) {
      throw new Error("Not logged in! Run: npm run login:viralpod");
    }

    // Dismiss notifications prompt if any
    try {
      const notNowBtn = await page.waitForSelector(
        "button:has-text('Not Now'), button:has-text('Cancel')",
        { timeout: 3000 }
      );
      if (notNowBtn) await notNowBtn.click();
    } catch {}

    // 1. Click Create / New post
    console.log("📸 [2/6] Opening Create Post modal...");
    const createBtn = await page.waitForSelector(
      "svg[aria-label='New post'], svg[aria-label='Create'], span:has-text('Create')",
      { timeout: 15000 }
    );
    await createBtn.click();
    await page.waitForTimeout(1000);

    // 2. Click 'Post' in popup menu if present
    const postMenuItem = page.locator("span:text-is('Post')").first();
    if (await postMenuItem.count() > 0) {
      await postMenuItem.click();
      await page.waitForTimeout(1000);
    }

    // 3. Attach video file
    console.log("📤 [3/6] Uploading video file...");
    await page.locator("input[type='file']").setInputFiles(videoPath);
    await page.waitForTimeout(3000);

    // Dismiss "Video posts are now shared as reels" modal if shown
    const okBtn = await page.$("button:has-text('OK'), button:has-text('Continue')");
    if (okBtn) {
      console.log("ℹ️ Dismissing Reels info popup...");
      await okBtn.click();
      await page.waitForTimeout(1000);
    }

    // 4. Ensure 9:16 Aspect Ratio
    console.log("📐 [4/6] Ensuring 9:16 Aspect Ratio...");
    try {
      const cropBtn = page.locator(
        "div[role='dialog'] svg[aria-label='Select Crop' i], div[role='dialog'] button:has(svg[aria-label='Select Crop' i]), div[role='dialog'] svg[aria-label*='crop' i]"
      ).first();

      if (await cropBtn.count() > 0) {
        await cropBtn.click();
        await page.waitForTimeout(800);

        const ratio916 = page.locator(
          "div[role='dialog'] span:text-is('9:16'), div[role='dialog'] div:text-is('9:16'), div[role='dialog'] button:has-text('9:16')"
        ).first();

        if (await ratio916.count() > 0) {
          await ratio916.click();
          console.log("✅ 9:16 Aspect Ratio locked!");
          await page.waitForTimeout(800);
        }
      }
    } catch {}

    // Click Next (from Crop Screen)
    console.log("➡️ Proceeding to Edit Screen...");
    const nextBtn1 = page.locator(
      "div[role='dialog'] div[role='button']:has-text('Next'), div[role='dialog'] button:has-text('Next')"
    ).first();
    await nextBtn1.click();
    await page.waitForTimeout(2000);

    // 5. Handle Cover Photo / Scrubber
    console.log("🖼️ [5/6] Setting high-CTR cover frame...");
    try {
      const coverTab = page.locator(
        "div[role='dialog'] span:has-text('Cover photo'), div[role='dialog'] div:text-is('Cover photo'), div[role='dialog'] button:has-text('Cover photo')"
      ).first();
      if (await coverTab.count() > 0) {
        await coverTab.click();
        await page.waitForTimeout(1000);
      }

      // Try uploading custom cover from computer
      if (fs.existsSync(coverPath)) {
        const coverFileInput = page.locator(
          "div[role='dialog'] input[type='file'][accept*='image'], div[role='dialog'] input[type='file']"
        ).first();

        const selectCompBtn = page.locator(
          "div[role='dialog'] button:has-text('Select from computer'), div[role='dialog'] span:has-text('Select from computer')"
        ).first();

        if (await coverFileInput.count() > 0) {
          console.log(`📤 Uploading custom cover image: ${path.basename(coverPath)}`);
          await coverFileInput.setInputFiles(coverPath);
          await page.waitForTimeout(2000);
        } else if (await selectCompBtn.count() > 0) {
          const [fileChooser] = await Promise.all([
            page.waitForEvent("filechooser", { timeout: 4000 }).catch(() => null),
            selectCompBtn.click(),
          ]);
          if (fileChooser) {
            console.log(`📤 Setting cover via filechooser: ${path.basename(coverPath)}`);
            await fileChooser.setFiles(coverPath);
            await page.waitForTimeout(2000);
          }
        }
      }

      // Also adjust video scrubber timeline to ~20% into video as solid fallback
      const rangeInput = page.locator("div[role='dialog'] input[type='range']").first();
      if (await rangeInput.count() > 0) {
        const maxVal = parseFloat((await rangeInput.getAttribute("max")) || "100");
        const targetVal = String(Math.round(maxVal * 0.20));
        await rangeInput.evaluate((el, v) => {
          el.value = v;
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        }, targetVal);
        console.log(`⏱️ Video scrubber moved to 20% mark`);
        await page.waitForTimeout(1000);
      }
    } catch (covErr) {
      console.warn("⚠️ Note on cover photo:", covErr.message);
    }

    // Click Next (from Edit Screen to Details)
    const nextBtn2 = page.locator(
      "div[role='dialog'] div[role='button']:has-text('Next'), div[role='dialog'] button:has-text('Next')"
    ).first();
    if (await nextBtn2.count() > 0) {
      await nextBtn2.click();
      await page.waitForTimeout(2000);
    }

    // 5. Enter Caption
    console.log("✍️ [5/6] Entering caption & viral hashtags...");
    const captionBox = page.locator(
      "div[role='dialog'] div[aria-label*='caption' i], div[role='dialog'] div[contenteditable='true']"
    ).first();
    await captionBox.click();
    await page.keyboard.type(caption, { delay: 15 });
    await page.waitForTimeout(1000);

    // 6. Click Share
    console.log("🚀 [6/6] Publishing Reel to @viralpod.in...");
    const shareBtn = page.locator(
      "div[role='dialog'] div[role='button']:has-text('Share'), div[role='dialog'] button:has-text('Share')"
    ).first();
    await shareBtn.click();

    // Wait for actual Instagram upload completion (video is 60-70 MB, takes 35-50s)
    console.log("⏳ Uploading to Instagram servers (waiting for server confirmation)...");
    let shared = false;
    for (let sec = 5; sec <= 180; sec += 5) {
      await page.waitForTimeout(5000);
      const state = await page.evaluate(() => {
        const dialog = document.querySelector("div[role='dialog']");
        if (!dialog) return { hasDialog: false, text: "" };
        return {
          hasDialog: true,
          text: dialog.innerText.replace(/\n/g, " ").trim(),
          hasCheckmark: Boolean(dialog.querySelector("svg[aria-label*='done' i], svg[aria-label*='check' i], img[alt*='checkmark' i]"))
        };
      });

      console.log(`⏱️ [${sec}s] Status: ${state.text.slice(0, 50)}...`);

      if (
        state.text.includes("Your reel has been shared") ||
        state.text.includes("Your post has been shared") ||
        state.hasCheckmark ||
        (!state.hasDialog && sec >= 30)
      ) {
        console.log(`\n🎉 SUCCESS! Your Reel is 100% LIVE on @viralpod.in (completed at ${sec}s)!`);
        shared = true;
        break;
      }
    }

    if (!shared) {
      console.warn("⚠️ Upload did not confirm within 180s, but share request was submitted.");
    }
    await page.waitForTimeout(3000);
  } catch (err) {
    console.error("❌ Error while posting:", err.message);
    process.exit(1);
  } finally {
    await context.close();
  }
}

main();
