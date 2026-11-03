#!/usr/bin/env node
import { execSync, spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const historyPath = path.join(rootDir, "data", "competitors_history.json");

const shouldPost = process.argv.includes("--post");
const passthroughArgs = process.argv.slice(2).filter((arg) => arg !== "--post" && arg !== "--");

console.log("\n=======================================================");
console.log("⚡ 1-CLICK AI SPY, REMIX, RENDER & AUTO-POST PIPELINE");
console.log(`Auto Post: ${shouldPost ? "YES (Will post to Instagram)" : "NO (Render only)"}`);
if (passthroughArgs.length > 0) {
  console.log(`Parameters: ${passthroughArgs.join(" ")}`);
}
console.log("=======================================================\n");

// 1. Run Spy Script
const spyScript = path.join(rootDir, "scripts", "spy-competitors.mjs");
const spyRes = spawnSync("node", [spyScript, ...passthroughArgs], {
  stdio: "inherit",
  cwd: rootDir,
});

if (spyRes.status !== 0) {
  console.error("❌ Spy step failed or stopped.");
  process.exit(1);
}

// 2. Read history to get the latest slug
const history = JSON.parse(fs.readFileSync(historyPath, "utf-8"));
const lastReel = history.processedReels[history.processedReels.length - 1];

if (!lastReel || lastReel.status === "COMPLETED" || lastReel.status === "POSTED") {
  console.log("ℹ️ No new reel was pending for render.");
  process.exit(0);
}

const slug = lastReel.ourSlug;
console.log(`\n🎬 [Step 2/3] Rendering Remotion Reel: "${slug}"...`);

// 3. Render Reel (Video + TTS Voice + Cover)
try {
  execSync(`npm run render:reel -- ${slug}`, {
    stdio: "inherit",
    cwd: rootDir,
  });
  lastReel.status = "RENDERED";
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
} catch (renderErr) {
  console.error(`❌ Render failed: ${renderErr.message}`);
  process.exit(1);
}

// 4. Optionally Post to Instagram
if (shouldPost) {
  console.log(`\n🚀 [Step 3/3] Posting Reel to Instagram (@techwith.genz)...`);
  try {
    execSync(`npm run post:reel:browser -- ${slug}`, {
      stdio: "inherit",
      cwd: rootDir,
    });
    lastReel.status = "POSTED";
    fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
    console.log(`\n🎉 Pipeline Finished! Video rendered & published to Instagram!`);
  } catch (postErr) {
    console.error(`❌ Post failed: ${postErr.message}`);
  }
} else {
  console.log(`\n✅ Render complete! File: out/${slug}.mp4`);
  console.log(`👉 To post to Instagram, run:`);
  console.log(`   npm run post:reel:browser -- ${slug}`);
}

