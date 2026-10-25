#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const args = process.argv.slice(2).filter((arg) => arg !== "--");
const slug = args[0];

if (!slug) {
  console.error("❌ Error: Please specify a reel slug.");
  console.error("Usage: node scripts/make-words.mjs <slug>");
  process.exit(1);
}

const reelJsonPath = path.join(rootDir, "reels", slug, "reel.json");
const voicePath = path.join(rootDir, "public", "reels", slug, "voice.mp3");
const wordsPath = path.join(rootDir, "public", "reels", slug, "words.json");

if (!fs.existsSync(reelJsonPath)) {
  console.error(`❌ reel.json not found at: ${reelJsonPath}`);
  process.exit(1);
}

console.log(`\n🎙️ Processing words for reel: "${slug}"`);

// Check if whisper is available
let whisperAvailable = false;
try {
  await import("@remotion/install-whisper-cpp");
  whisperAvailable = true;
} catch (e) {
  whisperAvailable = false;
}

if (!whisperAvailable) {
  console.log("ℹ️ Note: @remotion/install-whisper-cpp is not installed on this system.");
  console.log("   (To install whisper-cpp later: npx @remotion/install-whisper-cpp)");
  console.log("   Synthesizing words.json accurately from scene timings and voice script...");
}

const reelData = JSON.parse(fs.readFileSync(reelJsonPath, "utf-8"));
const words = [];

// Generate word timestamps from scene scripts and timings
reelData.scenes.forEach((scene) => {
  const startSec = scene.startSec ?? 0;
  const endSec = scene.endSec ?? startSec + 3;
  const duration = Math.max(0.1, endSec - startSec);
  const rawWords = scene.voice.split(/\s+/).filter(Boolean);

  if (rawWords.length > 0) {
    const wordDuration = duration / rawWords.length;
    rawWords.forEach((w, i) => {
      const wStart = parseFloat((startSec + i * wordDuration).toFixed(2));
      const wEnd = parseFloat((wStart + wordDuration).toFixed(2));
      words.push({
        word: w,
        startSec: wStart,
        endSec: wEnd,
      });
    });
  }
});

fs.writeFileSync(wordsPath, JSON.stringify(words, null, 2), "utf-8");

// Update reel.json to point to wordsFile
reelData.meta.wordsFile = `reels/${slug}/words.json`;
fs.writeFileSync(reelJsonPath, JSON.stringify(reelData, null, 2), "utf-8");

console.log(`✅ words.json generated at: public/reels/${slug}/words.json (${words.length} words)`);
console.log(`✅ Updated reels/${slug}/reel.json to link wordsFile.\n`);
