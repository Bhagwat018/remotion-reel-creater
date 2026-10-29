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

// 1. Audio & Timings (Auto-generate voice and words if missing)
const publicDir = path.join(rootDir, "public", "reels", slug);
const reelsDir = path.join(rootDir, "reels", slug);
const pubVoiceFile = path.join(publicDir, "voice.mp3");
const reelVoiceFile = path.join(reelsDir, "voice.mp3");
const pubWordsFile = path.join(publicDir, "words.json");
const reelWordsFile = path.join(reelsDir, "words.json");

// Auto-generate voice and words if voice.mp3 is missing or stale
let needsVoice = !fs.existsSync(pubVoiceFile) && !fs.existsSync(reelVoiceFile);
if (!needsVoice && (fs.existsSync(pubWordsFile) || fs.existsSync(reelWordsFile))) {
  try {
    const wPath = fs.existsSync(pubWordsFile) ? pubWordsFile : reelWordsFile;
    const wData = JSON.parse(fs.readFileSync(wPath, "utf-8"));
    if (wData.length <= 14 && wData.some((w) => w.word === "Scene")) {
      needsVoice = true;
    }
  } catch {}
}

if (needsVoice || process.argv.includes("--force-voice")) {
  console.log(`🎙️ Auto-generating voice-first audio for "${slug}"...`);
  spawnSync("node", [path.join(rootDir, "scripts", "generate-voice.mjs"), slug, "--force"], {
    stdio: "inherit",
    cwd: rootDir,
  });
}

// Sync audio if present
if (fs.existsSync(pubVoiceFile) && !fs.existsSync(reelVoiceFile)) {
  fs.mkdirSync(reelsDir, { recursive: true });
  fs.copyFileSync(pubVoiceFile, reelVoiceFile);
} else if (!fs.existsSync(pubVoiceFile) && fs.existsSync(reelVoiceFile)) {
  fs.mkdirSync(publicDir, { recursive: true });
  fs.copyFileSync(reelVoiceFile, pubVoiceFile);
}

// 2. Run Validation
console.log(`\n=======================================================`);
console.log(`🎬 1/3 Validating Reel: "${slug}"`);
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

// Auto-align word timestamps for subtitles if words.json not yet created
if (!fs.existsSync(pubWordsFile) && !fs.existsSync(reelWordsFile)) {
  const activeVoice = fs.existsSync(pubVoiceFile) ? pubVoiceFile : reelVoiceFile;
  let audioDur = 30;
  if (fs.existsSync(activeVoice)) {
    try {
      const probeOut = execSync(
        `ffprobe -i "${activeVoice}" -show_entries format=duration -v quiet -of csv="p=0"`
      ).toString().trim();
      audioDur = parseFloat(probeOut) || 30;
    } catch {}
  }

  const reelDataForWords = JSON.parse(fs.readFileSync(reelJsonPath, "utf-8"));
  const scenes = reelDataForWords.scenes || [];
  const generatedWords = [];

  scenes.forEach((scene, sIdx) => {
    const sStart = scene.startSec ?? (sIdx * (audioDur / scenes.length));
    const sEnd = scene.endSec ?? ((sIdx + 1) * (audioDur / scenes.length));
    const dur = Math.max(0.5, sEnd - sStart);
    const cleanWords = (scene.voice || "")
      .replace(/[*_#`]/g, "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const perWord = cleanWords.length > 0 ? dur / cleanWords.length : 0.3;

    cleanWords.forEach((word, wIdx) => {
      const wStart = parseFloat((sStart + wIdx * perWord).toFixed(2));
      const wEnd = parseFloat((wStart + perWord).toFixed(2));
      generatedWords.push({ word, startSec: wStart, endSec: wEnd });
    });
  });

  fs.writeFileSync(pubWordsFile, JSON.stringify(generatedWords, null, 2), "utf-8");
  fs.writeFileSync(reelWordsFile, JSON.stringify(generatedWords, null, 2), "utf-8");
}

// 3. Prepare resolved props with word timestamps & auto-heal BGM
const reelData = JSON.parse(fs.readFileSync(reelJsonPath, "utf-8"));

// Sanitize & Auto-heal BGM to guarantee no 404 MediaError crashes render
if (reelData.meta) {
  if (typeof reelData.meta.bgm === "string") {
    let cleanBgm = reelData.meta.bgm.replace(/^\/?public\//, "").replace(/^\//, "");
    const directPath = path.join(rootDir, "public", cleanBgm);
    const inBgmSubdir = path.join(rootDir, "public", "bgm", path.basename(cleanBgm));
    const fallbackPath = path.join(rootDir, "public", "bgm", "cyber-groove.mp3");

    if (fs.existsSync(directPath)) {
      reelData.meta.bgm = cleanBgm;
    } else if (fs.existsSync(inBgmSubdir)) {
      reelData.meta.bgm = `bgm/${path.basename(cleanBgm)}`;
    } else if (fs.existsSync(fallbackPath)) {
      console.log(`⚠️ BGM "${reelData.meta.bgm}" not found on disk. Auto-falling back to "bgm/cyber-groove.mp3"`);
      reelData.meta.bgm = "bgm/cyber-groove.mp3";
    } else {
      console.log(`⚠️ BGM "${reelData.meta.bgm}" not found on disk. Disabling BGM.`);
      reelData.meta.bgm = false;
    }

    // Persist healed BGM to reel.json
    fs.writeFileSync(reelJsonPath, JSON.stringify(reelData, null, 2), "utf-8");
    if (fs.existsSync(publicReelJson)) {
      fs.writeFileSync(publicReelJson, JSON.stringify(reelData, null, 2), "utf-8");
    }
  } else if (reelData.meta.bgm === true) {
    reelData.meta.bgm = "bgm/cyber-groove.mp3";
  }
}

let wordsData = null;
if (fs.existsSync(pubWordsFile)) {
  try {
    wordsData = JSON.parse(fs.readFileSync(pubWordsFile, "utf-8"));
  } catch {}
} else if (fs.existsSync(reelWordsFile)) {
  try {
    wordsData = JSON.parse(fs.readFileSync(reelWordsFile, "utf-8"));
  } catch {}
}

const resolvedProps = {
  ...reelData,
  words: wordsData,
};

const resolvedPropsPath = path.join(reelsDir, ".props.resolved.json");
fs.writeFileSync(resolvedPropsPath, JSON.stringify(resolvedProps, null, 2), "utf-8");

// 4. Ensure out directory exists
const outDir = path.join(rootDir, "out");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outputPath = path.join(outDir, `${slug}.mp4`);

// 5. Render via Remotion CLI (let Remotion choose any free port)
console.log(`\n=======================================================`);
console.log(`🎥 2/3 Rendering Reel to: out/${slug}.mp4`);
console.log(`=======================================================`);

const renderCommand = `npx remotion render Reel "${outputPath}" --props="${resolvedPropsPath}"`;

try {
  execSync(renderCommand, {
    stdio: "inherit",
    cwd: rootDir,
  });

  // Also copy to public/reels/<slug>/video.mp4 for immediate dashboard player preview
  const publicVideo = path.join(publicDir, "video.mp4");
  try {
    fs.copyFileSync(outputPath, publicVideo);
  } catch {}

  // 5b. Auto-render High-CTR Cover Thumbnail (Instagram & YouTube Shorts)
  console.log(`\n=======================================================`);
  console.log(`🖼️  Generating High-CTR Cover Thumbnail: out/${slug}-cover.jpg`);
  console.log(`=======================================================`);
  const coverPath = path.join(outDir, `${slug}-cover.jpg`);
  const stillCommand = `npx remotion still Cover "${coverPath}" --props="${resolvedPropsPath}" --image-format=jpeg`;
  try {
    execSync(stillCommand, {
      stdio: "inherit",
      cwd: rootDir,
    });
    const publicCover = path.join(publicDir, "cover.jpg");
    fs.copyFileSync(coverPath, publicCover);
  } catch (stillErr) {
    console.warn(`⚠️ Cover thumbnail generation warning:`, stillErr.message);
  }

  console.log(`\n=======================================================`);
  console.log(`🎉 3/3 Render Complete!`);
  console.log(`📁 Video file: out/${slug}.mp4`);
  console.log(`🖼️ Cover image: out/${slug}-cover.jpg`);
  console.log(`🌐 Dashboard preview: public/reels/${slug}/video.mp4`);
  console.log(`=======================================================\n`);
} catch (renderError) {
  console.error(`\n❌ Remotion render failed:`, renderError.message);
  process.exit(1);
}

