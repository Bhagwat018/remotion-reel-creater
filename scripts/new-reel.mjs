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
  console.error("Usage: npm run new-reel -- <slug>");
  console.error("Example: npm run new-reel -- ai-agents-explained");
  process.exit(1);
}

// Sanitize slug
const sanitizedSlug = slug.toLowerCase().replace(/[^a-z0-9-_]/g, "-");

const templatePath = path.join(rootDir, "reels", "_template", "reel.json");
const targetReelDir = path.join(rootDir, "reels", sanitizedSlug);
const targetReelJson = path.join(targetReelDir, "reel.json");
const targetPublicDir = path.join(rootDir, "public", "reels", sanitizedSlug);

if (!fs.existsSync(templatePath)) {
  console.error(`❌ Template file not found at: ${templatePath}`);
  process.exit(1);
}

if (fs.existsSync(targetReelJson)) {
  console.error(`⚠️ Reel "${sanitizedSlug}" already exists at: ${targetReelJson}`);
  process.exit(1);
}

// Create directories
fs.mkdirSync(targetReelDir, { recursive: true });
fs.mkdirSync(targetPublicDir, { recursive: true });

// Read template and update metadata
const templateContent = JSON.parse(fs.readFileSync(templatePath, "utf-8"));
templateContent.meta.slug = sanitizedSlug;
templateContent.meta.title = sanitizedSlug
  .split("-")
  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  .join(" ");
templateContent.meta.voiceFile = `reels/${sanitizedSlug}/voice.mp3`;

fs.writeFileSync(targetReelJson, JSON.stringify(templateContent, null, 2), "utf-8");

console.log("\n=======================================================");
console.log(`✨ Successfully created new reel: "${sanitizedSlug}"`);
console.log("=======================================================");
console.log(`📁 Reel Config:  reels/${sanitizedSlug}/reel.json`);
console.log(`🎙️ Voice Asset:  public/reels/${sanitizedSlug}/voice.mp3`);
console.log("\nNext Steps:");
console.log(`  1. Place your voiceover file at: public/reels/${sanitizedSlug}/voice.mp3`);
console.log(`  2. Edit scene scripts and headlines in: reels/${sanitizedSlug}/reel.json`);
console.log(`  3. Validate the reel: npm run validate -- ${sanitizedSlug}`);
console.log(`  4. Render the MP4: npm run render:reel -- ${sanitizedSlug}\n`);
