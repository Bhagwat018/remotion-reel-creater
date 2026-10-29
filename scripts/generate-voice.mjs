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

// Voice selection: meta.voice > CLI param > default "Rishi"
const requestedVoice = (
  args.find((a) => a.startsWith("--voice="))?.split("=")[1] ||
  reelData.meta?.voice ||
  "Madhur"
).trim();

const speedMultiplier = parseFloat(reelData.meta?.voiceSpeed || 1.05);
const rateWpm = Math.round(180 * speedMultiplier);
const openaiVoices = ["alloy", "echo", "fable", "onyx", "nova", "shimmer"];
const isOpenAIVoice = openaiVoices.includes(requestedVoice.toLowerCase());

console.log(`🎙️ Active Voice: "${requestedVoice}" | Pace: ${speedMultiplier}x (${rateWpm} WPM)`);

let currentCursorSec = 0.0;

for (let i = 0; i < scenes.length; i++) {
  const scene = scenes[i];
  const rawAiff = path.join(tempDir, `scene_${i}.aiff`);
  const sceneMp3 = path.join(tempDir, `scene_${i}.mp3`);

  // Clean voice text (strip markdown and reject placeholder "Scene 1")
  let voiceText = (scene.voice || scene.voiceover || scene.text || "").trim();
  if (!voiceText || /^scene\s*\d+$/i.test(voiceText)) {
    voiceText = `${scene.headline || ""}. ${scene.subtitle || scene.label || scene.cardText || ""}`.trim();
  }
  const cleanVoiceText = (voiceText || `Highlight ${i + 1}`)
    .replace(/[*_#`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // 1. Synthesize audio with ElevenLabs, OpenAI, or Microsoft Neural EdgeTTS
  let synthesized = false;

  // Option A: ElevenLabs if API key configured
  if (process.env.ELEVENLABS_API_KEY) {
    try {
      const voiceId = process.env.ELEVENLABS_VOICE_ID || "pNInz6obpgDQGcFmaJgB"; // Default energetic voice
      const resp = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: cleanVoiceText,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.35,
            similarity_boost: 0.8,
            style: 0.65,
          },
        }),
      });
      if (resp.ok) {
        const buf = Buffer.from(await resp.arrayBuffer());
        fs.writeFileSync(sceneMp3, buf);
        synthesized = true;
      }
    } catch (e) {
      console.warn("ElevenLabs TTS attempt:", e.message);
    }
  }

  // Option B: OpenAI TTS if requested
  if (!synthesized && isOpenAIVoice && process.env.OPENAI_API_KEY) {
    try {
      const resp = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tts-1",
          voice: requestedVoice.toLowerCase(),
          input: cleanVoiceText,
          speed: speedMultiplier,
        }),
      });
      if (resp.ok) {
        const buf = Buffer.from(await resp.arrayBuffer());
        fs.writeFileSync(sceneMp3, buf);
        synthesized = true;
      }
    } catch {}
  }

  // Option C: Microsoft Neural EdgeTTS (High-Energy Viral Creator Mode)
  if (!synthesized) {
    try {
      const { MsEdgeTTS, OUTPUT_FORMAT } = await import("msedge-tts");
      const tts = new MsEdgeTTS();
      
      // Auto-pick voice based on language/gender
      let edgeVoice = "hi-IN-MadhurNeural";
      const vLower = requestedVoice.toLowerCase();
      if (vLower.includes("swara") || vLower.includes("female") || vLower.includes("neerja")) {
        edgeVoice = "hi-IN-SwaraNeural";
      } else if (vLower.includes("prabhat") || vLower.includes("english")) {
        edgeVoice = "en-IN-PrabhatNeural";
      }

      await tts.setMetadata(edgeVoice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      
      // Fast-paced viral reel cadence (+20% rate, +6% pitch)
      const ratePercent = Math.round(18 * speedMultiplier);
      const ssml = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="hi-IN">
          <voice name="${edgeVoice}">
            <prosody rate="+${ratePercent}%" pitch="+6%">
              ${cleanVoiceText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </prosody>
          </voice>
        </speak>
      `;

      const sceneDir = path.join(tempDir, `edge_scene_${i}`);
      fs.mkdirSync(sceneDir, { recursive: true });
      await tts.rawToFile(sceneDir, ssml);
      
      const rawEdgeAudio = path.join(sceneDir, "audio.mp3");
      if (fs.existsSync(rawEdgeAudio) && fs.statSync(rawEdgeAudio).size > 1000) {
        // Broadcast Studio EQ & Vocal Compression via FFmpeg
        execSync(
          `ffmpeg -y -i "${rawEdgeAudio}" -af "equalizer=f=120:width_type=o:width=2:g=4,equalizer=f=3200:width_type=o:width=1.5:g=3,acompressor=threshold=-16dB:ratio=4:attack=5:release=50,loudnorm=I=-14:LRA=7:tp=-1.5" -b:a 192k "${sceneMp3}" 2>/dev/null`
        );
        synthesized = true;
      }
    } catch (edgeErr) {
      console.warn(`⚠️ EdgeTTS warning for scene ${i + 1}: ${edgeErr.message}. Falling back to system say.`);
    }
  }

  // Fallback: macOS say command if everything else fails
  if (!synthesized) {
    const voiceName = isOpenAIVoice ? "Rishi" : requestedVoice;
    try {
      execSync(`say -v "${voiceName}" -r ${rateWpm} "${cleanVoiceText.replace(/"/g, '\\"')}" -o "${rawAiff}"`);
      execSync(`ffmpeg -y -i "${rawAiff}" -codec:a libmp3lame -b:a 192k "${sceneMp3}" 2>/dev/null`);
    } catch (err) {
      try {
        execSync(`say -r ${rateWpm} "${cleanVoiceText.replace(/"/g, '\\"')}" -o "${rawAiff}"`);
        execSync(`ffmpeg -y -i "${rawAiff}" -codec:a libmp3lame -b:a 192k "${sceneMp3}" 2>/dev/null`);
      } catch (fallbackErr) {
        console.error(`❌ Error synthesizing scene ${i + 1}:`, fallbackErr.message);
        process.exit(1);
      }
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
