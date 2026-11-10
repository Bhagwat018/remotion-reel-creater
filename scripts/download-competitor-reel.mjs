import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const userDataDir = path.join(rootDir, ".instagram-session");

async function downloadReelMedia() {
  const url = "https://www.instagram.com/reel/DfcGSLCybP3/";
  console.log(`🎬 Intercepting video streams from ${url}...`);

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: true,
    viewport: { width: 1280, height: 900 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

  let videoUrl = null;

  page.on("response", async (response) => {
    const rUrl = response.url();
    const contentType = response.headers()["content-type"] || "";
    if (
      (contentType.includes("video/") || rUrl.includes(".mp4")) &&
      !rUrl.includes("blob:")
    ) {
      if (!videoUrl) {
        videoUrl = rUrl;
        console.log(`🎯 Captured Video Stream URL: ${videoUrl.substring(0, 100)}...`);
      }
    }
  });

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });
    console.log("Waiting for video stream response...");

    // Wait until videoUrl is captured or 10s
    for (let i = 0; i < 20; i++) {
      if (videoUrl) break;
      await page.waitForTimeout(500);
    }

    if (videoUrl) {
      const outDir = path.join(rootDir, "out", "spy");
      fs.mkdirSync(outDir, { recursive: true });
      const videoOut = path.join(outDir, "kamai_kitni_petrol.mp4");
      const audioOut = path.join(outDir, "kamai_kitni_petrol.mp3");

      console.log(`⬇️ Downloading stream via Playwright request context...`);
      const response = await page.request.get(videoUrl);
      const buffer = await response.body();
      fs.writeFileSync(videoOut, buffer);
      console.log(`✅ Saved original video: ${fs.statSync(videoOut).size} bytes`);

      // Extract audio with ffmpeg
      execSync(`ffmpeg -y -i "${videoOut}" -vn -ar 44100 -ac 2 -b:a 192k "${audioOut}" 2>/dev/null`);
      console.log(`✅ Extracted audio to ${audioOut}`);
    } else {
      console.log("⚠️ No direct video URL intercepted.");
    }
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await context.close();
  }
}

downloadReelMedia();