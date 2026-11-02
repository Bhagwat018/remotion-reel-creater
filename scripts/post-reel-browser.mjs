#!/usr/bin/env node
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const userDataDir = path.join(rootDir, ".instagram-session");

const args = process.argv.slice(2).filter((arg) => arg !== "--");
const isHeaded = args.includes("--headed");
const slugArgs = args.filter((arg) => arg !== "--headed");
const slug = slugArgs[0];
const customCaption = slugArgs.slice(1).join(" ");

if (!slug) {
  console.error("❌ Error: Please specify a reel slug to post.");
  console.error("Usage: npm run post:reel:browser -- <slug> [--headed] [custom caption]");
  console.error("Example: npm run post:reel:browser -- bombay-coated-ipo-last-day");
  process.exit(1);
}

const videoPath = path.join(rootDir, "out", `${slug}.mp4`);
const reelJsonPath = path.join(rootDir, "reels", slug, "reel.json");

if (!fs.existsSync(videoPath)) {
  console.error(`❌ Video file not found at: ${videoPath}`);
  console.error(`Please render the reel first: npm run render:reel -- ${slug}`);
  process.exit(1);
}

if (!fs.existsSync(userDataDir)) {
  console.error(`❌ No saved Instagram session found!`);
  console.error(`Please run login setup first: npm run instagram:login`);
  process.exit(1);
}

// Auto-derive caption from reel.json
let caption = customCaption;
if (!caption && fs.existsSync(reelJsonPath)) {
  try {
    const reelData = JSON.parse(fs.readFileSync(reelJsonPath, "utf-8"));
    const title = reelData.title || reelData.meta?.title || slug;
    const desc = reelData.meta?.description || "";
    const tags = reelData.meta?.tags
      ? reelData.meta.tags.map((t) => `#${t.replace(/^#/, "")}`).join(" ")
      : "";
    caption = `${title}\n\n${desc}\n\n${tags || "#reels #trending"}`.trim();
  } catch {}
}
if (!caption) {
  caption = `Trending Reel 🔥 #reels #viral`;
}

// Always ensure AI disclosure tag is included
if (!caption.includes("#AI") && !caption.includes("#MadeWithAI")) {
  caption += "\n\n🤖 #MadeWithAI #AI";
}

console.log("\n=======================================================");
console.log(`🎬 Target Reel: ${slug}`);
console.log(`📁 Video Path: ${videoPath}`);
console.log(`🕶️  Mode: ${isHeaded ? "Headed (Visible Screen)" : "Headless (100% Background)"}`);
console.log(`📝 Caption:\n${caption}`);
console.log("=======================================================\n");

async function postReel() {
  console.log("⏳ [1/6] Launching Instagram session...");

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: !isHeaded,
    viewport: { width: 1280, height: 900 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  try {
    await page.goto("https://www.instagram.com/", {
      waitUntil: "networkidle",
      timeout: 45000,
    });

    // Check if logged in
    const isLoginScreen = await page.$("input[name='username']");
    if (isLoginScreen) {
      throw new Error(
        "Instagram session expired or not logged in! Run: npm run instagram:login"
      );
    }

    console.log("✅ [2/6] Logged into Instagram successfully.");

    // Dismiss any popups ("Turn on Notifications" or "Save Info")
    try {
      const notNowBtn = await page.waitForSelector(
        "button:has-text('Not Now'), button:has-text('Cancel')",
        { timeout: 4000 }
      );
      if (notNowBtn) await notNowBtn.click();
    } catch {}

    // 1. Click Create / New post
    console.log("📸 [3/6] Opening Create Post modal...");
    const createBtn = await page.waitForSelector(
      "svg[aria-label='New post'], svg[aria-label='Create'], span:has-text('Create')",
      { timeout: 15000 }
    );
    await createBtn.click();
    await page.waitForTimeout(1000);

    // 2. Click exact 'Post' inside the popup menu
    const postMenuItem = page.locator("span:text-is('Post')").first();
    if (await postMenuItem.count() > 0) {
      await postMenuItem.click();
      await page.waitForTimeout(1000);
    }

    // 3. Attach file directly (handles hidden file inputs seamlessly)
    console.log("📤 [4/6] Uploading video file...");
    await page.locator("input[type='file']").setInputFiles(videoPath);
    await page.waitForTimeout(3000);

    // 4. Dismiss "Video posts are now shared as reels" modal if shown
    const okBtn = await page.$("button:has-text('OK'), button:has-text('Continue')");
    if (okBtn) {
      console.log("ℹ️ Dismissing Reels info popup...");
      await okBtn.click();
      await page.waitForTimeout(1000);
    }

    // 5. Ensure 9:16 Aspect Ratio
    console.log("📐 [5a] Ensuring 9:16 Reel aspect ratio...");
    try {
      const cropBtn = page.locator(
        "div[role='dialog'] svg[aria-label='Select crop'], div[role='dialog'] button:has(svg[aria-label='Select crop'])"
      ).first();

      if (await cropBtn.count() > 0) {
        await cropBtn.click();
        await page.waitForTimeout(600);

        const ratio916 = page.locator(
          "div[role='dialog'] span:text-is('9:16'), div[role='dialog'] div:text-is('9:16')"
        ).first();

        if (await ratio916.count() > 0) {
          await ratio916.click();
          console.log("✅ 9:16 Aspect Ratio locked!");
        } else {
          // Re-click to close crop menu if 9:16 was already selected
          await cropBtn.click();
        }
        await page.waitForTimeout(600);
      }
    } catch (cropErr) {
      console.warn("⚠️ Could not adjust crop ratio:", cropErr.message);
    }

    // 6. Click Next #1 (from Crop Screen)
    console.log("➡️ Proceeding through edit screens...");
    const nextBtn1 = page.locator(
      "div[role='dialog'] div[role='button']:has-text('Next'), div[role='dialog'] button:has-text('Next')"
    ).first();
    await nextBtn1.click();
    await page.waitForTimeout(2000);

    // 7. Click Next #2 (from Cover / Filter Screen)
    const nextBtn2 = page.locator(
      "div[role='dialog'] div[role='button']:has-text('Next'), div[role='dialog'] button:has-text('Next')"
    ).first();
    await nextBtn2.click();
    await page.waitForTimeout(2000);

    // 8. Add Caption
    console.log("✍️ [5/6] Adding caption and hashtags...");
    const captionBox = page.locator(
      "div[role='dialog'] div[aria-label*='caption'], div[role='dialog'] div[contenteditable='true']"
    ).first();
    await captionBox.click();
    await page.keyboard.type(caption, { delay: 10 });
    await page.waitForTimeout(1500);

    // 9. Enable Official Instagram "AI Label"
    console.log("🤖 [6/6] Enabling official Instagram 'AI Label'...");
    try {
      const aiSwitch = page.locator("div[role='dialog'] input[role='switch']").first();
      if ((await aiSwitch.count()) > 0) {
        const isChecked = (await aiSwitch.getAttribute("aria-checked")) === "true";
        if (!isChecked) {
          await aiSwitch.click({ force: true });
          await page.waitForTimeout(1000);

          // Handle any confirm popup if shown
          const confirmBtn = await page.$(
            "button:has-text('Turn on'), button:has-text('Turn On'), button:has-text('OK')"
          );
          if (confirmBtn) await confirmBtn.click();

          console.log("✅ Official Instagram 'AI Label' enabled!");
        } else {
          console.log("ℹ️ AI label is already ON.");
        }
      } else {
        console.log("ℹ️ AI label toggle not found on screen, hashtag applied.");
      }
    } catch (aiErr) {
      console.warn("⚠️ Could not toggle AI label switch:", aiErr.message);
    }

    // 10. Click Share
    console.log("🚀 Clicking 'Share' button...");
    const shareBtn = page.locator(
      "div[role='dialog'] div[role='button']:has-text('Share'), div[role='dialog'] button:has-text('Share')"
    ).first();
    await shareBtn.click();

    // 11. Actively Poll Every 2 Seconds for Completion
    console.log("⏳ Monitoring post status every 2 seconds...");
    let isShared = false;
    const maxChecks = 45; // 45 * 2s = 90s max

    for (let i = 1; i <= maxChecks; i++) {
      await page.waitForTimeout(2000);

      // Check for success confirmation text
      const hasSuccessText = await page.evaluate(() => {
        const text = document.body ? document.body.innerText : "";
        return (
          text.includes("Your reel has been shared") ||
          text.includes("Reel shared") ||
          text.includes("Your post has been shared")
        );
      });

      const checkmark = await page.$(
        "svg[aria-label='Animated checkmark'], svg[aria-label='Checkmark']"
      );

      // Check if upload modal has completely closed
      const dialogCount = await page.locator("div[role='dialog']").count();

      if (hasSuccessText || checkmark) {
        console.log(`\n✅ [${i * 2}s] Instagram Confirmation: "Your reel has been shared."`);
        isShared = true;
        break;
      }

      if (dialogCount === 0 && i >= 3) {
        console.log(`\n✅ [${i * 2}s] Upload modal closed. Reel processed and published!`);
        isShared = true;
        break;
      }

      process.stdout.write(`   ⏳ [${i * 2}s] Uploading & Processing... \r`);
    }

    if (isShared) {
      console.log("\n=======================================================");
      console.log("🎉 SUCCESS! Reel has been posted to @techwith.genz !");
      console.log("🔗 Profile: https://www.instagram.com/techwith.genz/reels/");
      console.log("=======================================================\n");
    } else {
      console.log("\n⚠️ Upload took longer than 90s, check your Instagram profile.");
    }
  } catch (err) {
    console.error("\n❌ Upload failed:", err.message);
    if (!isHeaded) {
      console.log(
        "💡 Tip: Run with '--headed' flag to see what went wrong on screen:"
      );
      console.log(`   npm run post:reel:browser -- ${slug} --headed`);
    }
  } finally {
    await page.waitForTimeout(3000);
    await context.close();
  }
}

postReel();
