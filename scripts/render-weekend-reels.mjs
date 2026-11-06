import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const slugs = [
  "sme-ipo-500x-allotment-trap",
  "digital-arrest-scam-reality-check",
  "is-upi-really-free-hidden-charges",
  "monday-ipo-listing-day-playbook",
  "direct-vs-regular-mutual-funds-truth",
];

console.log("🎬 Starting Batch Render for remaining 5 Weekend Reels...");

for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i];
  console.log(`\n=======================================================`);
  console.log(`🎥 [${i + 1}/${slugs.length}] Rendering: ${slug}`);
  console.log(`=======================================================`);

  try {
    execSync(`node scripts/render-reel.mjs "${slug}"`, {
      stdio: "inherit",
      cwd: rootDir,
    });
    console.log(`✅ Successfully finished render for ${slug}`);
  } catch (err) {
    console.error(`❌ Render failed for ${slug}:`, err.message);
  }
}

console.log("\n=======================================================");
console.log("🏁 All 6 Weekend Reels Batch Render Completed!");
console.log("=======================================================");

