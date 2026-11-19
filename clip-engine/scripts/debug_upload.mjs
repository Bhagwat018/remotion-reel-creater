import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const userDataDir = path.join(rootDir, ".instagram-session-viralpod");

async function main() {
  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: true,
    viewport: { width: 1280, height: 900 },
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const page = await context.newPage();

  console.log("🌐 1. Navigating to Instagram...");
  await page.goto("https://www.instagram.com/", { waitUntil: "networkidle", timeout: 35000 });
  await page.waitForTimeout(2000);

  // Click Create
  console.log("📸 2. Clicking Create...");
  const createBtn = await page.waitForSelector("svg[aria-label='New post'], svg[aria-label='Create'], span:has-text('Create')", { timeout: 15000 });
  await createBtn.click();
  await page.waitForTimeout(1000);

  const postMenuItem = page.locator("span:text-is('Post')").first();
  if (await postMenuItem.count() > 0) {
    await postMenuItem.click();
    await page.waitForTimeout(1000);
  }

  // Upload video
  console.log("📤 3. Selecting file...");
  const videoFile = path.resolve(rootDir, "output/Ywtya3SHMvU_peak01_clip01_split_reel.mp4");
  const fileInput = page.locator("input[type='file']").first();
  await fileInput.setInputFiles(videoFile);
  await page.waitForTimeout(4000);
  await page.screenshot({ path: "/tmp/debug_1_upload.png" });

  // Check OK button
  const okBtn = page.locator("button:has-text('OK'), button:has-text('Continue')").first();
  if (await okBtn.count() > 0) {
    console.log("ℹ️ Dismissing info modal...");
    await okBtn.click();
    await page.waitForTimeout(1500);
  }
  await page.screenshot({ path: "/tmp/debug_2_after_ok.png" });

  // Crop 9:16
  console.log("📐 4. Crop selector...");
  const cropBtn = page.locator("div[role='dialog'] svg[aria-label='Select Crop' i], div[role='dialog'] button:has(svg[aria-label='Select Crop' i]), div[role='dialog'] svg[aria-label*='crop' i]").first();
  if (await cropBtn.count() > 0) {
    await cropBtn.click();
    await page.waitForTimeout(1000);
    const ratio916 = page.locator("div[role='dialog'] span:text-is('9:16'), div[role='dialog'] div:text-is('9:16')").first();
    if (await ratio916.count() > 0) {
      await ratio916.click();
      console.log("✅ 9:16 selected!");
      await page.waitForTimeout(1000);
    }
  }
  await page.screenshot({ path: "/tmp/debug_3_crop.png" });

  // Next 1
  console.log("➡️ 5. Clicking Next (Crop -> Edit)...");
  const nextBtn1 = page.locator("div[role='dialog'] div[role='button']:has-text('Next'), div[role='dialog'] button:has-text('Next')").first();
  await nextBtn1.click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "/tmp/debug_4_edit.png" });

  // Next 2
  console.log("➡️ 6. Clicking Next (Edit -> Details)...");
  const nextBtn2 = page.locator("div[role='dialog'] div[role='button']:has-text('Next'), div[role='dialog'] button:has-text('Next')").first();
  await nextBtn2.click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "/tmp/debug_5_details.png" });

  // Inspect details screen
  const details = await page.evaluate(() => {
    return {
      buttons: Array.from(document.querySelectorAll("div[role='dialog'] button, div[role='dialog'] div[role='button']")).map(b => b.innerText.trim()).filter(Boolean),
      dialogText: document.querySelector("div[role='dialog']")?.innerText.slice(0, 300)
    };
  });
  console.log("Details screen buttons:", details.buttons);
  console.log("Dialog preview:\n", details.dialogText);

  // Enter caption
  console.log("✍️ 7. Typing caption...");
  const captionBox = page.locator("div[role='dialog'] div[aria-label*='caption' i], div[role='dialog'] div[contenteditable='true']").first();
  await captionBox.click();
  await page.keyboard.type("CarryMinati Insane Reaction! 😱 #viral #carryminati #gaming #viralpod");
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "/tmp/debug_6_caption.png" });

  // Check Share button
  console.log("🚀 8. Locating Share button...");
  const shareBtn = page.locator("div[role='dialog'] div[role='button']:has-text('Share'), div[role='dialog'] button:has-text('Share')").first();
  console.log("Share button count:", await shareBtn.count());

  if (await shareBtn.count() > 0) {
    console.log("Clicking Share button...");
    await shareBtn.click();
    await page.waitForTimeout(5000);
    await page.screenshot({ path: "/tmp/debug_7_after_share_5s.png" });

    // Monitor until upload completes (up to 180 seconds)
    console.log("⏳ Uploading to Instagram servers (waiting up to 180s)...");
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

      console.log(`⏱️ [${sec}s] Dialog state: hasDialog=${state.hasDialog} | text="${state.text.slice(0, 80)}" | checkmark=${state.hasCheckmark}`);

      if (
        state.text.includes("Your reel has been shared") ||
        state.text.includes("Your post has been shared") ||
        state.hasCheckmark ||
        (!state.hasDialog && sec >= 25)
      ) {
        console.log(`\n🎉 CONFIRMED: Reel upload successfully completed at ${sec}s!`);
        shared = true;
        await page.screenshot({ path: "/tmp/debug_upload_success.png" });
        break;
      }
    }

    if (!shared) {
      console.warn("⚠️ Upload did not confirm within 180s. Saving final state screenshot...");
      await page.screenshot({ path: "/tmp/debug_upload_timeout.png" });
    }
  }

  await context.close();
}

main().catch(err => {
  console.error("DEBUG ERROR:", err);
  process.exit(1);
});
