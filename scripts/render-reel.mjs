#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync, spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const args = process.argv.slice(2).filter((arg) => arg !== "--");
const slug = args[0];

if (!slug) {
  console.error("❌ Error: Please specify a reel slug to render.");
  console.error("Usage: npm run render:reel -- <slug>");
  console.error("Example: npm run render:reel -- demo-hallucination");
  process.exit(1);
}

const reelJsonPath = path.join(rootDir, "reels", slug, "reel.json");
const publicReelJson = path.join(rootDir, "public", "reels", slug, "reel.json");

// Sync if user edited or placed reel.json inside public/
if (fs.existsSync(publicReelJson)) {
  if (!fs.existsSync(reelJsonPath)) {
    fs.mkdirSync(path.dirname(reelJsonPath), { recursive: true });
    fs.copyFileSync(publicReelJson, reelJsonPath);
  } else {
    const pubStat = fs.statSync(publicReelJson);
    const rootStat = fs.statSync(reelJsonPath);
    if (pubStat.mtimeMs > rootStat.mtimeMs || pubStat.size > rootStat.size + 100) {
      fs.copyFileSync(publicReelJson, reelJsonPath);
      console.log(`ℹ️ Synced updated public/reels/${slug}/reel.json to reels/${slug}/reel.json`);
    }
  }
}

if (!fs.existsSync(reelJsonPath)) {
  console.error(`❌ reel.json not found at: ${reelJsonPath}`);
  process.exit(1);
}

// 1. Run Validation First
console.log(`\n=======================================================`);
console.log(`🎬 1/2 Validating Reel: "${slug}"`);
console.log(`=======================================================`);

const validateScript = path.join(rootDir, "scripts", "validate-reel.mjs");
const valRes = spawnSync("node", [validateScript, slug], {
  stdio: "inherit",
  cwd: rootDir,
});

if (valRes.status !== 0) {
  console.error(`\n❌ Render aborted: Validation failed for "${slug}".`);
  process.exit(1);
}

// 2. Ensure out directory exists
const outDir = path.join(rootDir, "out");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outputPath = path.join(outDir, `${slug}.mp4`);

// 3. Render via Remotion CLI
console.log(`\n=======================================================`);
console.log(`🎥 2/2 Rendering Reel to: out/${slug}.mp4`);
console.log(`=======================================================`);

const renderCommand = `npx remotion render Reel "${outputPath}" --props="${reelJsonPath}" --port=3001`;

try {
  execSync(renderCommand, {
    stdio: "inherit",
    cwd: rootDir,
  });

  console.log(`\n=======================================================`);
  console.log(`🎉 Render Complete!`);
  console.log(`📁 Output file: out/${slug}.mp4`);
  console.log(`=======================================================\n`);
} catch (renderError) {
  console.error(`\n❌ Remotion render failed:`, renderError.message);
  process.exit(1);
}
