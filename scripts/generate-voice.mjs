#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const args = process.argv.slice(2).filter((arg) => arg !== "--");
const slug = args[0] || "redis-caching-explained";

const jsonPath = path.join(rootDir, "reels", slug, "reel.json");
if (!fs.existsSync(jsonPath)) {
  console.error(`❌ reel.json not found for slug: ${slug} at ${jsonPath}`);
  process.exit(1);
}

const hasForce = process.argv.includes("--force");
const existingVoice =
  fs.existsSync(path.join(rootDir, "public", "reels", slug, "voice.mp3")) ||
  fs.existsSync(path.join(rootDir, "reels", slug, "voice.mp3"));

if (existingVoice && !hasForce) {
  console.log(`ℹ️ Existing voice.mp3 found for "${slug}". Skipping TTS overwrite (use --force to overwrite).`);
  process.exit(0);
}

console.log(`🎙️ Generating AI Voiceover for reel: "${slug}" (${scenes.length} scenes)...`);

const tempDir = path.join("/tmp", `remotion_voice_${Date.now()}`);
fs.mkdirSync(tempDir, { recursive: true });

const wordsList = [];
const sceneAudioFiles = [];

// Choose voice: Rishi (English/Hindi Indian)
const voiceName = "Rishi";

for (let i = 0; i < scenes.length; i++) {
  const scene = scenes[i];
  const startSec = scene.startSec ?? i * 5;
  const rawAiff = path.join(tempDir, `scene_${i}.aiff`);
  const sceneMp3 = path.join(tempDir, `scene_${i}.mp3`);

  // Clean voice text
  const cleanVoiceText = scene.voice.replace(/[*_#`]/g, "").trim();

  // 1. Synthesize with say
  try {
    execSync(`say -v "${voiceName}" "${cleanVoiceText.replace(/"/g, '\\"')}" -o "${rawAiff}"`);
    execSync(`ffmpeg -y -i "${rawAiff}" -codec:a libmp3lame -b:a 192k "${sceneMp3}" 2>/dev/null`);
  } catch (err) {
    console.error(`Error synthesizing scene ${i + 1}:`, err.message);
    process.exit(1);
  }

  // 2. Measure actual speech duration
  const probeOut = execSync(
    `ffprobe -i "${sceneMp3}" -show_entries format=duration -v quiet -of csv="p=0"`
  )
    .toString()
    .trim();
  const speechDur = parseFloat(probeOut) || 3.0;

  console.log(`  Scene #${i + 1} (${scene.id}): "${cleanVoiceText.slice(0, 35)}..." [${speechDur.toFixed(1)}s at ${startSec}s]`);

  // 3. Compute word-by-word timestamps
  const words = cleanVoiceText.split(/\s+/).filter(Boolean);
  const timePerWord = words.length > 0 ? speechDur / words.length : 0.3;

  words.forEach((w, wIdx) => {
    const wStart = startSec + wIdx * timePerWord;
    const wEnd = wStart + timePerWord;
    wordsList.push({
      word: w,
      startSec: parseFloat(wStart.toFixed(2)),
      endSec: parseFloat(wEnd.toFixed(2)),
    });
  });

  sceneAudioFiles.push({
    file: sceneMp3,
    startSec,
    duration: speechDur,
  });
}

// 4. Combine audio tracks with accurate timeline positions using ffmpeg
const lastScene = scenes[scenes.length - 1];
const totalDuration = lastScene.endSec || (lastScene.startSec + 5);

const filterInputs = [];
const filterComplex = [];

sceneAudioFiles.forEach((item, idx) => {
  filterInputs.push(`-i "${item.file}"`);
  const delayMs = Math.round(item.startSec * 1000);
  filterComplex.push(`[${idx}:a]adelay=${delayMs}|${delayMs}[a${idx}]`);
});

const mixInputs = sceneAudioFiles.map((_, idx) => `[a${idx}]`).join("");
filterComplex.push(`${mixInputs}amix=inputs=${sceneAudioFiles.length}:dropout_transition=0,volume=1.5[outa]`);

const combinedMp3 = path.join(tempDir, "voice_combined.mp3");
const ffmpegCmd = `ffmpeg -y ${filterInputs.join(" ")} -filter_complex "${filterComplex.join(";")}" -map "[outa]" -t ${totalDuration} "${combinedMp3}" 2>/dev/null`;

try {
  execSync(ffmpegCmd);
} catch (err) {
  console.error("FFmpeg mix error:", err.message);
  process.exit(1);
}

// 5. Save outputs to public and reels directories
const targetDirs = [
  path.join(rootDir, "public", "reels", slug),
  path.join(rootDir, "reels", slug),
];

for (const dir of targetDirs) {
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(combinedMp3, path.join(dir, "voice.mp3"));
  fs.writeFileSync(
    path.join(dir, "words.json"),
    JSON.stringify(wordsList, null, 2),
    "utf-8"
  );
}

// Clean temp directory
fs.rmSync(tempDir, { recursive: true, force: true });

console.log(`\n🎉 Voiceover Generated Successfully!`);
console.log(`🔊 Voice file: public/reels/${slug}/voice.mp3`);
console.log(`📝 Words file: public/reels/${slug}/words.json (${wordsList.length} words timed)`);
