#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
  publishReelToInstagram,
} from "./instagram-publisher.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const args = process.argv.slice(2).filter((arg) => arg !== "--");
const slug = args[0];
const customCaption = args.slice(1).join(" ");

if (!slug) {
  console.error("❌ Error: Please specify a reel slug to post.");
  console.error("Usage: node scripts/post-reel.mjs <slug> [optional-caption]");
  console.error("Example: node scripts/post-reel.mjs bombay-coated-ipo-last-day");
  process.exit(1);
}

const videoPath = path.join(rootDir, "out", `${slug}.mp4`);
const coverPath = path.join(rootDir, "out", `${slug}-cover.jpg`);
const reelJsonPath = path.join(rootDir, "reels", slug, "reel.json");

if (!fs.existsSync(videoPath)) {
  console.error(`❌ Video file not found: ${videoPath}`);
  console.error(`Please render the reel first: npm run render:reel -- ${slug}`);
  process.exit(1);
}

// Auto-derive caption from reel.json if available
let caption = customCaption;
if (!caption && fs.existsSync(reelJsonPath)) {
  try {
    const reelData = JSON.parse(fs.readFileSync(reelJsonPath, "utf-8"));
    const title = reelData.title || reelData.meta?.title || slug;
    const desc = reelData.meta?.description || "";
    const tags = reelData.meta?.tags ? reelData.meta.tags.map(t => `#${t.replace(/^#/, '')}`).join(" ") : "";
    caption = `${title}\n\n${desc}\n\n${tags || "#reels #trending"}`.trim();
  } catch {}
}
if (!caption) {
  caption = `New Reel 🔥 #reels #viral`;
}

console.log(`\n=======================================================`);
console.log(`🎬 Target Reel: ${slug}`);
console.log(`📁 Video: ${videoPath}`);
console.log(`📝 Caption:\n${caption}`);
console.log(`=======================================================\n`);

async function main() {
  let videoUpload = null;
  let coverUpload = null;

  try {
    // 1. Upload Video to Cloudinary
    videoUpload = await uploadToCloudinary(videoPath, "video");

    // Optional: Upload cover image if exists
    if (fs.existsSync(coverPath)) {
      coverUpload = await uploadToCloudinary(coverPath, "image");
    }

    // 2. Publish to Instagram
    await publishReelToInstagram({
      videoUrl: videoUpload.url,
      caption: caption,
      coverUrl: coverUpload ? coverUpload.url : null,
    });

    console.log(`\n✅ Finished successfully!`);
  } catch (err) {
    console.error(`\n❌ Failed to publish reel:`, err.message);
  } finally {
    // 3. Cleanup Cloudinary storage so it remains 100% free
    if (videoUpload?.publicId) {
      await deleteFromCloudinary(videoUpload.publicId, "video");
    }
    if (coverUpload?.publicId) {
      await deleteFromCloudinary(coverUpload.publicId, "image");
    }
  }
}

main();

