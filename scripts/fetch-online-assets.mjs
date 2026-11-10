#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const brollDir = path.join(rootDir, "public", "broll");
const cutoutsDir = path.join(rootDir, "public", "cutouts");
fs.mkdirSync(brollDir, { recursive: true });
fs.mkdirSync(cutoutsDir, { recursive: true });

// Curated high-res vertical B-roll fallback links (verified royalty-free CDNs)
const CURATED_VERTICAL_BROLL = {
  gym: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  money: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  tech: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  traffic: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
};

/**
 * Search and download a script-relevant B-roll video
 */
export async function fetchBroll(keyword, outputName) {
  const cleanName = outputName || keyword.toLowerCase().replace(/[^a-z0-9]+/g, "_");
  const finalFile = path.join(brollDir, `${cleanName}.mp4`);

  if (fs.existsSync(finalFile) && fs.statSync(finalFile).size > 10000) {
    console.log(`ℹ️ B-roll already cached: public/broll/${cleanName}.mp4`);
    return `broll/${cleanName}.mp4`;
  }

  console.log(`🎬 Searching online for vertical B-roll video: "${keyword}"...`);

  // Option 1: Pexels Video API if PEXELS_API_KEY is present
  if (process.env.PEXELS_API_KEY) {
    try {
      const pexelsUrl = `https://api.pexels.com/videos/search?query=${encodeURIComponent(keyword)}&orientation=portrait&per_page=3`;
      const res = await fetch(pexelsUrl, {
        headers: { Authorization: process.env.PEXELS_API_KEY },
      });
      if (res.ok) {
        const data = await res.json();
        const video = data.videos?.[0];
        const file = video?.video_files?.find((f) => f.height > f.width) || video?.video_files?.[0];
        if (file && file.link) {
          console.log(`⬇️ Downloading HD vertical video from Pexels...`);
          const tempRaw = path.join(brollDir, `raw_${cleanName}.mp4`);
          execSync(`curl -sL "${file.link}" -o "${tempRaw}"`);
          // Ensure 1080x1920 60fps vertical format
          execSync(
            `ffmpeg -y -i "${tempRaw}" -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" -r 60 -c:v libx264 -preset fast -crf 22 -an "${finalFile}" 2>/dev/null`
          );
          if (fs.existsSync(tempRaw)) fs.unlinkSync(tempRaw);
          console.log(`✅ Saved vertical B-roll to: public/broll/${cleanName}.mp4`);
          return `broll/${cleanName}.mp4`;
        }
      }
    } catch (e) {
      console.warn("Pexels fetch error:", e.message);
    }
  }

  // Option 2: Wikimedia Commons Free Video Search
  try {
    const wikiUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(keyword + " filetype:video")}&gsrnamespace=6&prop=imageinfo&iiprop=url|mime&formatversion=2`;
    const res = await fetch(wikiUrl, { headers: { "User-Agent": "RemotionStudio/1.0" } });
    if (res.ok) {
      const data = await res.json();
      const page = data.query?.pages?.[0];
      const videoUrl = page?.imageinfo?.[0]?.url;
      if (videoUrl) {
        console.log(`⬇️ Downloading public domain video from Wikimedia Commons...`);
        const tempRaw = path.join(brollDir, `wiki_${cleanName}.webm`);
        execSync(`curl -sL "${videoUrl}" -o "${tempRaw}"`);
        execSync(
          `ffmpeg -y -i "${tempRaw}" -t 15 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" -r 60 -c:v libx264 -preset fast -crf 22 -an "${finalFile}" 2>/dev/null`
        );
        if (fs.existsSync(tempRaw)) fs.unlinkSync(tempRaw);
        console.log(`✅ Converted & saved vertical B-roll to: public/broll/${cleanName}.mp4`);
        return `broll/${cleanName}.mp4`;
      }
    }
  } catch (e) {
    console.warn("Wikimedia video error:", e.message);
  }

  // Option 3: Generate high-tech cinematic dynamic background via FFmpeg if network has no vertical clip
  console.log(`⚡ Synthesizing cinematic atmospheric vertical backdrop with FFmpeg...`);
  const synthFilter = `
    color=c=#080910:s=1080x1920:d=15,
    drawgrid=width=100:height=100:thickness=1:color=white@0.04,
    vignette=PI/3
  `;
  execSync(`ffmpeg -y -f lavfi -i "${synthFilter.replace(/\n/g, "")}" -r 60 -c:v libx264 -pix_fmt yuv420p "${finalFile}" 2>/dev/null`);
  console.log(`✅ Generated atmospheric B-roll to: public/broll/${cleanName}.mp4`);
  return `broll/${cleanName}.mp4`;
}

/**
 * Search and download a transparent or high-res hero image / cutout
 */
export async function fetchHeroCutout(keyword, outputName) {
  const cleanName = outputName || keyword.toLowerCase().replace(/[^a-z0-9]+/g, "_");
  const finalFile = path.join(cutoutsDir, `${cleanName}.png`);

  if (fs.existsSync(finalFile) && fs.statSync(finalFile).size > 5000) {
    console.log(`ℹ️ Hero cutout already cached: public/cutouts/${cleanName}.png`);
    return `cutouts/${cleanName}.png`;
  }

  console.log(`🖼️ Searching online for hero image / cutout: "${keyword}"...`);
  try {
    const wikiUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(keyword)}&gsrnamespace=6&prop=imageinfo&iiprop=url|mime&formatversion=2`;
    const res = await fetch(wikiUrl, { headers: { "User-Agent": "RemotionStudio/1.0" } });
    if (res.ok) {
      const data = await res.json();
      const pages = data.query?.pages || [];
      const imgUrl = pages[0]?.imageinfo?.[0]?.url;
      if (imgUrl) {
        console.log(`⬇️ Downloading hero visual asset from Wikimedia Commons...`);
        const tempRaw = path.join(cutoutsDir, `raw_${cleanName}`);
        execSync(`curl -sL "${imgUrl}" -o "${tempRaw}"`);
        // Format to PNG with max 800x800 bounding box
        execSync(`ffmpeg -y -i "${tempRaw}" -vf "scale=800:800:force_original_aspect_ratio=decrease" "${finalFile}" 2>/dev/null`);
        if (fs.existsSync(tempRaw)) fs.unlinkSync(tempRaw);
        console.log(`✅ Saved hero visual asset to: public/cutouts/${cleanName}.png`);
        return `cutouts/${cleanName}.png`;
      }
    }
  } catch (e) {
    console.warn("Hero cutout fetch error:", e.message);
  }

  return null;
}

// CLI runner
if (process.argv[1] && process.argv[1].endsWith("fetch-online-assets.mjs")) {
  const keyword = process.argv[2] || "petrol pump";
  const type = process.argv[3] || "broll";

  if (type === "cutout") {
    fetchHeroCutout(keyword).then((p) => console.log("Done:", p));
  } else {
    fetchBroll(keyword).then((p) => console.log("Done:", p));
  }
}

