import { execSync } from "child_process";
import fs from "fs";

const downloads = [
  {
    name: "damaged_qr_scan",
    query: "scanning damaged torn qr code phone screen closeup 4k",
  },
  {
    name: "barcode_scanner_laser",
    query: "barcode scanner red laser retail checkout supermarket 4k",
  },
  {
    name: "nasa_satellite_deepspace",
    query: "satellite orbiting earth space station solar panels cinematic 4k",
  },
  {
    name: "digital_matrix_blocks",
    query: "digital matrix binary blocks grid futuristic data cyber 4k",
  },
  {
    name: "qr_code_payment_scan",
    query: "phone scanning qr code payment counter store closeup 4k",
  },
];

for (const item of downloads) {
  const dest = `public/broll/${item.name}.mp4`;
  if (fs.existsSync(dest) && fs.statSync(dest).size > 100000) {
    console.log(`✅ ${item.name} already exists. Skipping.`);
    continue;
  }
  console.log(`⬇️ Downloading ${item.name}...`);
  try {
    execSync(
      `/opt/homebrew/bin/yt-dlp "ytsearch1:${item.query}" -f "bestvideo[height<=720][ext=mp4]/best[height<=720]" -o "public/broll/${item.name}.%(ext)s" --download-sections "*0-12" --force-overwrites --no-playlist`,
      { stdio: "inherit" }
    );
    console.log(`✅ Downloaded: ${item.name}`);
  } catch (err) {
    console.error(`❌ Error downloading ${item.name}:`, err.message);
  }
}

