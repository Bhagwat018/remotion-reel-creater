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
const pubJsonPath = path.join(rootDir, "public", "reels", slug, "reel.json");

if (!fs.existsSync(jsonPath) && !fs.existsSync(pubJsonPath)) {
  console.error(`❌ reel.json not found for slug: "${slug}"`);
  process.exit(1);
}

const activeJsonPath = fs.existsSync(jsonPath) ? jsonPath : pubJsonPath;
const reelData = JSON.parse(fs.readFileSync(activeJsonPath, "utf-8"));
const scenes = reelData.scenes || [];

if (scenes.length === 0) {
  console.error(`❌ No scenes found in reel "${slug}".`);
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

console.log(`\n🎙️ =======================================================`);
console.log(`🎙️ Voice-First Pipeline: Generating Audio for "${slug}"`);
console.log(`   Scenes: ${scenes.length} | Voice-driven dynamic timestamps`);
console.log(`=======================================================\n`);

const tempDir = path.join("/tmp", `remotion_voice_${Date.now()}`);
fs.mkdirSync(tempDir, { recursive: true });

const wordsList = [];
const sceneAudioFiles = [];

// Choose voice: Rishi (English/Hindi Indian) or Samantha fallback
const voiceName = "Rishi";

let currentCursorSec = 0.0;

for (let i = 0; i < scenes.length; i++) {
  const scene = scenes[i];
  const rawAiff = path.join(tempDir, `scene_${i}.aiff`);
  const sceneMp3 = path.join(tempDir, `scene_${i}.mp3`);

  // Clean voice text (strip markdown)
  const cleanVoiceText = (scene.voice || scene.voiceover || `Scene ${i + 1}`)
    .replace(/[*_#`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // 1. Synthesize audio with say
  try {
    execSync(`say -v "${voiceName}" "${cleanVoiceText.replace(/"/g, '\\"')}" -o "${rawAiff}"`);
    execSync(`ffmpeg -y -i "${rawAiff}" -codec:a libmp3lame -b:a 192k "${sceneMp3}" 2>/dev/null`);
  } catch (err) {
    // Fallback without specific voice if Rishi fails
    try {
      execSync(`say "${cleanVoiceText.replace(/"/g, '\\"')}" -o "${rawAiff}"`);
      execSync(`ffmpeg -y -i "${rawAiff}" -codec:a libmp3lame -b:a 192k "${sceneMp3}" 2>/dev/null`);
    } catch (fallbackErr) {
      console.error(`❌ Error synthesizing scene ${i + 1}:`, fallbackErr.message);
      process.exit(1);
    }
  }

  // 2. Measure actual speech duration using ffprobe
  let speechDur = 3.0;
  try {
    const probeOut = execSync(
      `ffprobe -i "${sceneMp3}" -show_entries format=duration -v quiet -of csv="p=0"`
    )
      .toString()
      .trim();
    speechDur = parseFloat(probeOut) || 3.0;
  } catch (probeErr) {
    console.warn(`⚠️ Warning: ffprobe failed for scene ${i + 1}, using estimate`);
  }

  // 3. SAHI ORDER: Dynamic Scene Timings derived from speech duration!
  const startSec = parseFloat(currentCursorSec.toFixed(2));
  // Breathing pause between scenes (0.35s standard, 0.6s on final scene)
  const pause = i === scenes.length - 1 ? 0.6 : 0.35;
  const sceneDuration = parseFloat((speechDur + pause).toFixed(2));
  const endSec = parseFloat((startSec + sceneDuration).toFixed(2));

  // Update scene timing in reel data
  scene.startSec = startSec;
  scene.endSec = endSec;
  currentCursorSec = endSec;

  console.log(`  Scene #${i + 1} [${scene.type}]: "${cleanVoiceText.slice(0, 36)}..."`);
  console.log(`    ➜ Voice Duration: ${speechDur.toFixed(2)}s | Scene Window: ${startSec}s ➜ ${endSec}s`);

  // 4. Compute Word-by-Word Timestamps locked to speech
  const words = cleanVoiceText.split(/\s+/).filter(Boolean);
  const timePerWord = words.length > 0 ? speechDur / words.length : 0.3;

  words.forEach((w, wIdx) => {
    const wStart = parseFloat((startSec + wIdx * timePerWord).toFixed(2));
    const wEnd = parseFloat((wStart + timePerWord).toFixed(2));
    wordsList.push({
      word: w,
      startSec: wStart,
      endSec: wEnd,
    });
  });

  sceneAudioFiles.push({
    file: sceneMp3,
    startSec,
    duration: speechDur,
  });
}

// 5. Check if OpenAI Whisper is available for true word-level precision
if (process.env.OPENAI_API_KEY) {
  console.log(`🤖 OpenAI API Key detected: Could refine with Whisper word timestamps if needed.`);
}

// 6. Combine scene audio tracks into master voice.mp3 using ffmpeg adelay
const totalDuration = parseFloat(currentCursorSec.toFixed(2));

const filterInputs = [];
const filterComplex = [];

sceneAudioFiles.forEach((item, idx) => {
  filterInputs.push(`-i "${item.file}"`);
  const delayMs = Math.round(item.startSec * 1000);
  filterComplex.push(`[${idx}:a]adelay=${delayMs}|${delayMs}[a${idx}]`);
});

const mixInputs = sceneAudioFiles.map((_, idx) => `[a${idx}]`).join("");
filterComplex.push(`${mixInputs}amix=inputs=${sceneAudioFiles.length}:dropout_transition=0,volume=1.4[outa]`);

const combinedMp3 = path.join(tempDir, "voice_combined.mp3");
const ffmpegCmd = `ffmpeg -y ${filterInputs.join(" ")} -filter_complex "${filterComplex.join(";")}" -map "[outa]" -t ${totalDuration} "${combinedMp3}" 2>/dev/null`;

try {
  execSync(ffmpegCmd);
} catch (err) {
  console.error("❌ FFmpeg audio mix error:", err.message);
  process.exit(1);
}

// 7. Update reelData meta with duration & file paths
if (!reelData.meta) reelData.meta = {};
reelData.meta.durationSec = Math.ceil(totalDuration);
reelData.meta.voiceFile = `reels/${slug}/voice.mp3`;
reelData.meta.wordsFile = `reels/${slug}/words.json`;

// 8. Save updated reel.json, voice.mp3, and words.json to both directories
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
  fs.writeFileSync(
    path.join(dir, "reel.json"),
    JSON.stringify(reelData, null, 2),
    "utf-8"
  );
}

// Clean temp directory
fs.rmSync(tempDir, { recursive: true, force: true });

console.log(`\n✅ Voice-First Pipeline Complete!`);
console.log(`🔊 Master Voiceover: public/reels/${slug}/voice.mp3 (${totalDuration}s)`);
console.log(`📝 Word Timestamps:  public/reels/${slug}/words.json (${wordsList.length} words timed)`);
console.log(`⏱️ Auto-synced Scenes: reels/${slug}/reel.json (Total ${Math.ceil(totalDuration)}s)\n`);
