#!/usr/bin/env node
import { execSync } from "child_process";
import http from "http";

console.log(`
🎙️ ========================================================
   VoiceStudio (Open Source ElevenLabs Alternative) Setup
   Targeted for: Indian Hinglish Accent & Voice Cloning
========================================================
`);

const VS_URL = process.env.VOICESTUDIO_URL || "http://localhost:3900";

async function checkStatus() {
  console.log(`🔍 Checking if VoiceStudio is active at ${VS_URL}...`);
  try {
    const res = await fetch(`${VS_URL}/health`, { signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      console.log(`✅ VoiceStudio is RUNNING and healthy at ${VS_URL}!`);
      console.log(`\n🎉 You can now generate 100% free Indian voices with:`);
      console.log(`   npm run render:reel -- <slug> --voice=voicestudio\n`);
      return true;
    }
  } catch (e) {
    console.log(`⚠️ VoiceStudio is currently NOT running locally.`);
  }

  console.log(`
📋 HOW TO START VOICESTUDIO ON YOUR MAC:

Option 1: Start VoiceStudio via Docker (One-Command, 100% Free):
----------------------------------------------------------------
docker run -d --name voicestudio \\
  -p 127.0.0.1:3900:3900 \\
  -v voicestudio-data:/app/omnivoice_data \\
  ghcr.io/debpalash/voicestudio:stable

Option 2: Run VoiceStudio Electron App (UI with Voice Cloning):
----------------------------------------------------------------
1. git clone https://github.com/debpalash/VoiceStudio.git
2. cd VoiceStudio && npm install && npm run dev
3. Enable "Local API" in Settings (Runs on port 3900)

💡 CURRENT ACTIVE INDIAN VOICE ALTERNATIVES IN REPO:
----------------------------------------------------------------
1. Sarvam AI (Native Indian Bulbul V3 - Rohan / Shubh / Bulbul)
   → Configured in .env (Active & Studio Mastered)
2. Microsoft Neural EdgeTTS (hi-IN-MadhurNeural / hi-IN-SwaraNeural)
   → 100% Free, zero-setup, built-in fallback
`);
  return false;
}

checkStatus();

