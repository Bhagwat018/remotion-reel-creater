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

const isDirectFile = fs.existsSync(slug) || fs.existsSync(path.resolve(slug));
const videoPath = isDirectFile
  ? path.resolve(slug)
  : path.join(rootDir, "out", `${slug}.mp4`);
const reelJsonPath = isDirectFile
  ? path.join(rootDir, "reels", path.basename(slug, path.extname(slug)), "reel.json")
  : path.join(rootDir, "reels", slug, "reel.json");

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
    if (reelData.meta?.instagramCaption) {
      caption = reelData.meta.instagramCaption;
    } else {
      const title = reelData.title || reelData.meta?.title || slug;
      const desc = reelData.meta?.description || "";
      const tags = reelData.meta?.tags
        ? reelData.meta.tags.map((t) => `#${t.replace(/^#/, "")}`).join(" ")
        : "";
      caption = `${title}\n\n${desc}\n\n${tags || "#reels #trending"}`.trim();
    }
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
    channel: "chrome",
    headless: !isHeaded,
    viewport: { width: 1280, height: 900 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  try {
    await page.goto("https://www.instagram.com/", {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    await page.waitForTimeout(3000);

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
        "div[role='dialog'] svg[aria-label='Select Crop' i], div[role='dialog'] button:has(svg[aria-label='Select Crop' i]), div[role='dialog'] svg[aria-label*='crop' i]"
      ).first();

      if (await cropBtn.count() > 0) {
        await cropBtn.click();
        await page.waitForTimeout(800);

        const ratio916 = page.locator(
          "div[role='dialog'] span:text-is('9:16'), div[role='dialog'] div:text-is('9:16'), div[role='dialog'] button:has-text('9:16'), div[role='dialog'] svg[aria-label*='portrait' i]"
        ).first();

        if (await ratio916.count() > 0) {
          await ratio916.click();
          console.log("✅ 9:16 Aspect Ratio locked!");
          await page.waitForTimeout(800);
        } else {
          console.warn("⚠️ 9:16 option not found in menu!");
        }
      } else {
        console.warn("⚠️ Select Crop button not found on screen!");
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

    // 7a. Configure Cover Photo (Avoid default blank/white frame 0)
    console.log("🖼️ [5b] Setting high-CTR cover photo (no blank frame)...");
    try {
      // Find candidate cover image on disk
      const candidateCoverPaths = [
        path.join(rootDir, "out", `${path.basename(slug, ".mp4")}-cover.jpg`),
        path.join(rootDir, "out", `${slug}-cover.jpg`),
        "/tmp/review_market/frame_01.jpg",
        path.join(rootDir, "public", "reels", slug, "cover.jpg"),
      ];
      const validCover = candidateCoverPaths.find((p) => fs.existsSync(p));

      // Click "Cover photo" tab if present
      const coverTab = page.locator(
        "div[role='dialog'] span:has-text('Cover photo'), div[role='dialog'] div:text-is('Cover photo'), div[role='dialog'] button:has-text('Cover photo')"
      ).first();
      if (await coverTab.count() > 0) {
        await coverTab.click();
        await page.waitForTimeout(1000);
      }

      // Try uploading custom cover from computer
      let uploadedCover = false;
      if (validCover) {
        const coverFileInput = page.locator(
          "div[role='dialog'] input[type='file'][accept*='image'], div[role='dialog'] input[type='file']"
        ).first();

        const selectCompBtn = page.locator(
          "div[role='dialog'] button:has-text('Select from computer'), div[role='dialog'] span:has-text('Select from computer')"
        ).first();

        if (await coverFileInput.count() > 0) {
          console.log(`📤 Uploading custom cover image: ${validCover}`);
          await coverFileInput.setInputFiles(validCover);
          uploadedCover = true;
          await page.waitForTimeout(2000);
        } else if (await selectCompBtn.count() > 0) {
          const [fileChooser] = await Promise.all([
            page.waitForEvent("filechooser", { timeout: 4000 }).catch(() => null),
            selectCompBtn.click(),
          ]);
          if (fileChooser) {
            console.log(`📤 Setting file via filechooser: ${validCover}`);
            await fileChooser.setFiles(validCover);
            uploadedCover = true;
            await page.waitForTimeout(2000);
          }
        }
      }

      // Also adjust video scrubber timeline to ~2-3 seconds if range input or filmstrip is present
      const rangeInput = page.locator("div[role='dialog'] input[type='range']").first();
      if (await rangeInput.count() > 0) {
        const maxVal = parseFloat((await rangeInput.getAttribute("max")) || "100");
        const targetVal = String(Math.round(maxVal * 0.15)); // ~15% into video
        await rangeInput.evaluate((el, v) => {
          el.value = v;
          el.dispatchEvent(new Event("input", { bubbles: true }));
          el.dispatchEvent(new Event("change", { bubbles: true }));
        }, targetVal);
        console.log(`⏱️ Scrubber moved to frame timestamp at ${targetVal}/${maxVal}`);
        await page.waitForTimeout(1000);
      } else {
        const filmstrip = page.locator(
          "div[role='dialog'] div[role='slider'], div[role='dialog'] div[aria-label*='timeline'], div[role='dialog'] div[aria-label*='cover']"
        ).first();
        if (await filmstrip.count() > 0) {
          const box = await filmstrip.boundingBox();
          if (box) {
            await page.mouse.click(box.x + box.width * 0.20, box.y + box.height * 0.5);
            console.log("⏱️ Clicked filmstrip at 20% mark to select frame with UI");
            await page.waitForTimeout(1000);
          }
        }
      }

      await page.screenshot({ path: path.join(rootDir, "out", "insta_cover_selected.png") });
      console.log("✅ Cover photo configured successfully.");
    } catch (coverErr) {
      console.warn("⚠️ Could not adjust cover photo:", coverErr.message);
    }

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
    await page.screenshot({ path: path.join(rootDir, "out", "insta_before_share.png") });
    const shareBtn = page.locator(
      "div[role='dialog'] div[role='button']:has-text('Share'), div[role='dialog'] button:has-text('Share')"
    ).first();
    await shareBtn.click();

    // 11. Actively Poll Every 2 Seconds for Completion
    console.log("⏳ Monitoring post status every 2 seconds...");
    let isShared = false;
    const maxChecks = 120; // 120 * 2s = 240s max (4 minutes)

    for (let i = 1; i <= maxChecks; i++) {
      await page.waitForTimeout(2000);

      // Check for success confirmation text
      const dialogText = await page.locator("div[role='dialog']").innerText().catch(() => "");
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

      if (hasSuccessText || checkmark || /shared/i.test(dialogText)) {
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

    await page.screenshot({ path: path.join(rootDir, "out", "insta_after_share.png") });

    if (isShared) {
      console.log("\n=======================================================");
      console.log("🎉 SUCCESS! Reel has been posted to @techwith.genz !");
      
      // Let's fetch the new reel URL from the profile
      try {
        console.log("🔍 Fetching new reel link from profile...");
        await page.goto("https://www.instagram.com/techwith.genz/reels/", { waitUntil: "networkidle", timeout: 30000 });
        await page.waitForTimeout(4000);
        const latestReel = await page.evaluate(() => {
          const first = document.querySelector("a[href*='/reel/']");
          return first ? first.href : null;
        });
        if (latestReel) {
          console.log(`🔗 LIVE REEL LINK: ${latestReel}`);
        } else {
          console.log("🔗 Profile: https://www.instagram.com/techwith.genz/reels/");
        }
      } catch (e) {
        console.log("🔗 Profile: https://www.instagram.com/techwith.genz/reels/");
      }
      console.log("=======================================================\n");
    } else {
      console.log("\n⚠️ Upload took longer than 240s, check your Instagram profile.");
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
