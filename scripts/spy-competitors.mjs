#!/usr/bin/env node
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { remixContentWithGemini } from "./ai-remixer.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const historyPath = path.join(rootDir, "data", "competitors_history.json");
const userDataDir = path.join(rootDir, ".instagram-session");

// Read history
if (!fs.existsSync(historyPath)) {
  fs.mkdirSync(path.dirname(historyPath), { recursive: true });
  fs.writeFileSync(
    historyPath,
    JSON.stringify({ channels: [], processedReels: [] }, null, 2)
  );
}

const history = JSON.parse(fs.readFileSync(historyPath, "utf-8"));
const processedSet = new Set(
  history.processedReels.map((r) => r.shortcode || r.url)
);

const channels = history.channels || [
  "adilet.fndr",
  "mrcreates.ai",
  "techstackbro",
  "oruim.tech",
];

console.log("\n=======================================================");
console.log("🕵️  AI COMPETITOR SPY & REMIX ENGINE");
console.log(`📡 Monitored Channels: ${channels.map((c) => `@${c}`).join(", ")}`);
console.log(`📚 Already Processed Reels: ${processedSet.size}`);
console.log("=======================================================\n");

async function main() {
  const explicitUrlArg =
    process.argv.find((a) => a.startsWith("--url="))?.split("=")[1] ||
    (process.argv.indexOf("--url") !== -1
      ? process.argv[process.argv.indexOf("--url") + 1]
      : null);

  const explicitTopicArg =
    process.argv.find((a) => a.startsWith("--topic="))?.split("=")[1] ||
    (process.argv.indexOf("--topic") !== -1
      ? process.argv[process.argv.indexOf("--topic") + 1]
      : null);

  // Fast-track: Direct Topic Mode without browser
  if (explicitTopicArg) {
    console.log(`💡 Instant Topic Mode: "${explicitTopicArg}"`);
    console.log(`🤖 Calling Gemini 3.5 Flash to design Indian Gen-Z tech reel...`);
    const remixedReel = await remixContentWithGemini({
      channel: "tech-trends",
      url: "https://instagram.com/techwith.genz",
      caption: explicitTopicArg,
      topicHint: explicitTopicArg,
    });

    const slug = remixedReel.meta.slug || `reel-${Date.now()}`;
    const targetDir = path.join(rootDir, "reels", slug);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, "reel.json"), JSON.stringify(remixedReel, null, 2));

    history.processedReels.push({
      channel: "custom-topic",
      shortcode: `topic-${Date.now()}`,
      url: "https://instagram.com/techwith.genz",
      originalTopic: remixedReel.meta.topic || explicitTopicArg,
      ourSlug: slug,
      processedAt: new Date().toISOString(),
      status: "READY_TO_RENDER",
    });
    fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));

    console.log("\n=======================================================");
    console.log(`🎉 SUCCESS: New Reel Created: "${slug}"`);
    console.log(`📄 Path: reels/${slug}/reel.json`);
    console.log(`🔥 Title: "${remixedReel.meta.title}"`);
    console.log(`🎙️ Scenes: ${remixedReel.scenes.length} Scenes in Hindi`);
    console.log("=======================================================\n");
    return;
  }

  const context = await chromium.launchPersistentContext(userDataDir, {
    headless: true,
    viewport: { width: 1280, height: 900 },
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    args: ["--disable-blink-features=AutomationControlled"],
  });

  const page = context.pages()[0] || (await context.newPage());

  let targetReel = null;

  if (explicitUrlArg) {
    console.log(`🎯 Targeted URL Mode: ${explicitUrlArg}`);
    const parts = explicitUrlArg.split("/").filter(Boolean);
    const shortcode = parts[parts.length - 1];
    targetReel = {
      channel: "direct-link",
      shortcode,
      url: explicitUrlArg,
    };
  } else {
    for (const ch of channels) {
      console.log(`🔍 Scanning @${ch}...`);
      try {
        await page.goto(`https://www.instagram.com/${ch}/`, {
          waitUntil: "domcontentloaded",
          timeout: 25000,
        });
        await page.waitForTimeout(2000);

        const allLinks = await page.locator("a").all();
        const reelUrls = [];

        for (const a of allLinks) {
          const h = await a.getAttribute("href");
          if (h && (h.includes("/reel/") || h.includes("/p/"))) {
            const clean = h.split("?")[0];
            if (!reelUrls.includes(clean)) reelUrls.push(clean);
          }
        }

        console.log(`   Found ${reelUrls.length} media posts for @${ch}`);

        // Check for unprocessed reel
        for (const rPath of reelUrls) {
          const parts = rPath.split("/").filter(Boolean);
          const shortcode = parts[parts.length - 1];
          const fullUrl = `https://www.instagram.com${rPath}`;

          if (!processedSet.has(shortcode) && !processedSet.has(fullUrl)) {
            console.log(`   ✨ NEW UNPROCESSED REEL FOUND: ${fullUrl}`);
            targetReel = {
              channel: ch,
              shortcode,
              url: fullUrl,
            };
            break;
          } else {
            console.log(`   ⏭️  Already processed: ${shortcode}`);
          }
        }

        if (targetReel) break; // Found fresh reel, proceed to extraction
      } catch (err) {
        console.warn(`   ⚠️ Could not scan @${ch}: ${err.message}`);
      }
    }
  }

  if (!targetReel) {
    console.log(
      "\n☕ Sabhi latest reels already process ho chuki hain! Koi naya reel nahi mila."
    );
    await context.close();
    return;
  }

  // Fetch full details of target reel
  console.log(`\n📥 Fetching content from @${targetReel.channel}...`);
  await page.goto(targetReel.url, { waitUntil: "domcontentloaded", timeout: 25000 });
  await page.waitForTimeout(2000);

  const captionElements = await page.locator("h1, div[role='button'] ~ div, span[dir='auto']").all();
  let fullCaption = "";
  for (const el of captionElements) {
    const text = await el.innerText().catch(() => "");
    if (text.length > fullCaption.length) fullCaption = text;
  }

  console.log(`📝 Original Caption extracted (${fullCaption.length} chars)`);
  console.log(`Preview: "${fullCaption.substring(0, 140).replace(/\n+/g, " ")}..."`);

  await context.close();

  // Pass to Gemini AI Remixer
  console.log(`\n🤖 Calling Gemini 3.5 Flash to remix into Indian Gen-Z Hindi...`);
  const remixedReel = await remixContentWithGemini({
    channel: targetReel.channel,
    url: targetReel.url,
    caption: fullCaption,
    topicHint: targetReel.channel,
  });

  const slug = remixedReel.meta.slug || `reel-${Date.now()}`;
  const targetDir = path.join(rootDir, "reels", slug);
  fs.mkdirSync(targetDir, { recursive: true });

  const reelJsonPath = path.join(targetDir, "reel.json");
  fs.writeFileSync(reelJsonPath, JSON.stringify(remixedReel, null, 2));

  // Save to history so it is never repeated
  history.processedReels.push({
    channel: targetReel.channel,
    shortcode: targetReel.shortcode,
    url: targetReel.url,
    originalTopic: remixedReel.meta.topic,
    ourSlug: slug,
    processedAt: new Date().toISOString(),
    status: "READY_TO_RENDER",
  });
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));

  console.log("\n=======================================================");
  console.log("🎉 SUCCESS: New Remotion Reel Created!");
  console.log(`📁 Slug: ${slug}`);
  console.log(`📄 Saved at: reels/${slug}/reel.json`);
  console.log(`🔥 Title: "${remixedReel.meta.title}"`);
  console.log(`🎙️ Scenes: ${remixedReel.scenes.length} Scenes in Hindi`);
  console.log(`🔒 Deduplication: Recorded in data/competitors_history.json`);
  console.log("=======================================================\n");

  console.log("🚀 Run these commands to render and post:");
  console.log(`   1. Render Video: npm run render:reel -- ${slug}`);
  console.log(`   2. Post to Instagram: npm run post:reel:browser -- ${slug}`);
}

main().catch((err) => {
  console.error("❌ Spy process failed:", err);
  process.exit(1);
});
