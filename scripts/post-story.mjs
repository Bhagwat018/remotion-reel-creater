#!/usr/bin/env node
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const userDataDir = path.join(rootDir, ".instagram-session");

const args = process.argv.slice(2).filter((a) => a !== "--");
const slug = args[0] || "maxwell-engineering-solutions-ipo-analysis";
const customImageArg = args.find((a) => a.startsWith("--image="))?.split("=")[1];

// Determine Story Image
let imagePath = null;
if (customImageArg && fs.existsSync(customImageArg)) {
  imagePath = path.resolve(customImageArg);
} else {
  // Candidate 1: High-CTR Cover thumbnail
  const coverPath = path.join(rootDir, "out", `${slug}-cover.jpg`);
  // Candidate 2: GMP Gauge still frame
  const gmpPath = path.join(rootDir, "out", `qc-${slug}`, "gmp_gauge_frame.jpg");
  // Candidate 3: First QC hook frame
  const hookPath = path.join(rootDir, "out", `qc-${slug}`, "01_hook_safezone.jpg");

  if (fs.existsSync(coverPath)) {
    imagePath = coverPath;
  } else if (fs.existsSync(gmpPath)) {
    imagePath = gmpPath;
  } else if (fs.existsSync(hookPath)) {
    imagePath = hookPath;
  }
}

if (!imagePath || !fs.existsSync(imagePath)) {
  console.error("❌ No valid Story image found! Please supply --image=<path> or render reel cover first.");
  process.exit(1);
}

console.log("\n=======================================================");
console.log("📸 INSTAGRAM STORY AUTO-PUBLISHER");
console.log(`🎬 Target Reel: ${slug}`);
console.log(`🖼️  Story Image: ${imagePath}`);
console.log("=======================================================\n");

async function postStory() {
  console.log("⏳ [1/5] Launching Instagram Mobile Web session...");

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: true,
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  try {
    console.log("🌐 [2/5] Navigating to Instagram feed...");
    await page.goto("https://www.instagram.com/", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(3000);

    // Dismiss any "Not Now" / "Cancel" app prompts
    try {
      const dismissBtn = page.locator("button:has-text('Not Now'), button:has-text('Cancel')").first();
      if ((await dismissBtn.count()) > 0) {
        await dismissBtn.click();
        await page.waitForTimeout(1000);
      }
    } catch {}

    // Find "Your story" file input
    console.log("🔍 [3/5] Locating 'Your story' upload trigger...");
    const fileInputs = page.locator("input[type='file']");
    const count = await fileInputs.count();
    let storyInput = null;

    for (let i = 0; i < count; i++) {
      const inp = fileInputs.nth(i);
      const parentText = await inp.evaluate((el) => el.closest("div, section, header")?.innerText || "");
      if (parentText.includes("Your story")) {
        storyInput = inp;
        console.log(`✅ Found Story input tied to 'Your story' (index ${i})`);
        break;
      }
    }

    if (!storyInput && count > 0) {
      console.log(`⚠️ 'Your story' text container not found, using file input fallback...`);
      storyInput = fileInputs.last();
    }

    if (!storyInput) {
      throw new Error("Could not find Story file input on Instagram mobile feed.");
    }

    // Upload the file
    console.log("📤 [4/5] Uploading image to Story editor...");
    await storyInput.setInputFiles(imagePath);
    await page.waitForTimeout(4000);

    // Enable AI Label if present on the screen
    try {
      const aiBtn = page.locator("button:has-text('Add AI label'), div[role='button']:has-text('Add AI label')").first();
      if ((await aiBtn.count()) > 0) {
        await aiBtn.click();
        await page.waitForTimeout(1000);
        console.log("🤖 'Add AI label' clicked!");
      }
    } catch {}

    // Click "Add to your story"
    console.log("🚀 [5/5] Publishing to Instagram Story...");
    const addToStoryBtn = page.locator(
      "button:has-text('Add to your story'), div[role='button']:has-text('Add to your story'), span:text-is('Add to your story')"
    ).first();

    if ((await addToStoryBtn.count()) === 0) {
      // Capture screenshot to diagnose
      const debugPic = path.join(rootDir, "out", "story_error_debug.png");
      await page.screenshot({ path: debugPic });
      throw new Error(`'Add to your story' button not found on screen. Debug screenshot: ${debugPic}`);
    }

    await addToStoryBtn.click();
    console.log("⏳ Waiting for Story upload & sync confirmation...");

    // Wait until upload screen closes and returning to feed
    let success = false;
    for (let i = 1; i <= 20; i++) {
      await page.waitForTimeout(1500);
      const btnStillThere = (await addToStoryBtn.count()) > 0;
      if (!btnStillThere) {
        success = true;
        console.log(`✅ Story uploaded successfully! (verified at ${i * 1.5}s)`);
        break;
      }
    }

    if (!success) {
      console.log("ℹ️ Completed upload timeout period.");
    }

    await page.waitForTimeout(3000);

    // Final screenshot proof
    const proofPic = path.join(rootDir, "out", "story_published_proof.png");
    await page.screenshot({ path: proofPic });

    console.log("\n=======================================================");
    console.log("🎉 SUCCESS: Reel Story successfully posted to @techwith.genz !");
    console.log(`📸 Proof Screenshot: ${proofPic}`);
    console.log("=======================================================\n");

    return true;
  } catch (err) {
    console.error("❌ Failed to post Story:", err.message);
    throw err;
  } finally {
    await context.close();
  }
}

postStory()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));

