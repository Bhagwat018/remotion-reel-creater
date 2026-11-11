# Antigravity Workspace Guidelines: IT Interview Preparation Reels

This repository (`remotion-reel`) produces viral, high-converting vertical reels for `@techwith.genz`. The channel has officially pivoted to **IT Company Interview Preparation (System Design, Backend, Concurrency, Microservices, SQL, FAANG/TCS/Infosys Tech Rounds)**, benchmarking the proven format of `_codewithanshu`.

---

## 1. Golden Hook Rule (MANDATORY)

- **Strict Opening Requirement**: Every video script MUST start with the exact hook formula:
  > **"Interviewer ne pucha agar..."**
  *(e.g., "Interviewer ne pucha agar do users ek sath same bank account se paise withdraw karein, toh deadlock kaise handle karoge?")*
- **Scene 1 (0-7s)**: High-stakes interview question that 95% of candidates fail or answer with a naive rookie approach.
- **Scene 2 (7-18s)**: The rookie mistake breakdown (why standard naive approaches fail in high-traffic production).
- **Scene 3 (18-30s)**: The Senior Engineer / Production Architecture solution (Redis Lock, Kafka Queue, Optimistic Locking, Sharding, Database Indexing).
- **Scene 4 (30-40s)**: Interviewer reaction + High-converting keyword trigger:
  > *"Interviewer impressed ho gaya! Agar top tech companies ke interview questions crack karne hain, toh comment karo 'SYSTEM'!"*

---

## 2. Visual Architecture: Hybrid AI Imagery + Dynamic Video B-Roll + Motion HUD

Reels must combine **Script-Driven Photorealistic AI Visuals + Cinematic Tech Video Backgrounds + Glowing UI Architecture Cards**:

1. **Background Layer**:
   - High-energy vertical tech background video (`brollVideo`) or 8K bespoke photorealistic 9:16 AI image (`bgImage`).
   - Dark atmospheric vignette overlay (`#080c16` with neon cyber glow).
2. **Foreground Motion Cards (`_codewithanshu` Style)**:
   - Candidate Dialog Pill: `[👤 CANDIDATE] "Sir, hum Distributed Redis Lock use karenge..."`
   - Interviewer Question Badge: `[💼 INTERVIEWER: FAANG TECH ROUND]`
   - Visual Architecture Nodes / Flows: Interactive animated diagrams (e.g., Client ➔ API Gateway ➔ Kafka ➔ DB).
   - Problem Warning Callout: `[⚠️ DATABASE DEADLOCK]`
3. **Kinetic Subtitles**: Word-by-word dynamic glowing captions (active highlight `#fbbf24`).
4. **Bottom HUD**: Real-time audio sync visualizer and live system status ticker.

---

## 3. Audio & Voiceover Standard

- **Voice**: **ElevenLabs Charlie** (`charlie` / `IKne3meq5aSn9XLyUdCD`) for high-energy, confident, natural Hindi delivery.
- **Pipeline**:
  1. Generate voice and Whisper word timestamps:
     ```bash
     node scripts/generate-voice.mjs <slug> --force
     ```
  2. Validate reel:
     ```bash
     node scripts/validate-reel.mjs <slug>
     ```

---

## 4. Rendering & Instagram Publishing Pipeline

1. **Render Broadcast MP4**:
   ```bash
   npm run render:reel -- <slug>
   ```
2. **Publish to Instagram**:
   ```bash
   node scripts/post-reel-browser.mjs out/<slug>.mp4 "<Custom Caption with Hashtags>"
   ```
   - Automatically maintains 9:16 aspect ratio.
   - Turns ON official Instagram "AI Label".
