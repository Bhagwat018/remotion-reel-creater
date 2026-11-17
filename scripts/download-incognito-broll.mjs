import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const downloads = [
  {
    name: "phone_clearing_history",
    query: "clear browsing data cache mobile phone screen 4k",
  },
  {
    name: "wifi_router_blinking",
    query: "wifi router blinking lights antenna dark room closeup 4k",
  },
  {
    name: "fiber_optic_cables",
    query: "fiber optic network data cables flashing server datacenter 4k",
  },
  {
    name: "digital_fingerprint_cyber",
    query: "digital fingerprint cyber security scan matrix hud 4k",
  },
  {
    name: "courtroom_lawsuit_gavel",
    query: "courtroom judge gavel lawsuit corporate tech trial 4k",
  },
  {
    name: "vpn_encrypted_tunnel",
    query: "vpn encryption cyber security shield data tunnel 4k",
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

