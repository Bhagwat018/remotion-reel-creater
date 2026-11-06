import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const slugs = [
  "zepto-blinkit-dark-store-economics",
  "sme-ipo-500x-allotment-trap",
  "digital-arrest-scam-reality-check",
  "is-upi-really-free-hidden-charges",
  "monday-ipo-listing-day-playbook",
  "direct-vs-regular-mutual-funds-truth",
];

console.log("🎙️ Starting Batch Voice Generation for 6 Weekend Reels (Rohan Studio Mic)...");

for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i];
  console.log(`\n=======================================================`);
  console.log(`🎙️ [${i + 1}/${slugs.length}] Generating Voice for: ${slug}`);
  console.log(`=======================================================`);

  try {
    execSync(`node scripts/generate-voice.mjs ${slug} --force`, {
      stdio: "inherit",
      cwd: rootDir,
    });
  } catch (err) {
    console.error(`❌ Failed voice generation for ${slug}:`, err.message);
  }
}

console.log("\n=======================================================");
console.log("📊 Summary of Generated Weekend Voiceovers:");
console.log("=======================================================");

slugs.forEach((slug) => {
  const voicePath = path.join(rootDir, "public", "reels", slug, "voice.mp3");
  if (fs.existsSync(voicePath)) {
    const dur = execSync(
      `ffprobe -i "${voicePath}" -show_entries format=duration -v quiet -of csv="p=0"`
    ).toString().trim();
    console.log(`  • ${slug} ➜ ${parseFloat(dur).toFixed(1)}s (Target: 30-34s)`);
  } else {
    console.log(`  • ${slug} ➜ ❌ File missing`);
  }
});

