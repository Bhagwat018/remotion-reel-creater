# 🎬 MASTER PROMPT & SPECIFICATION: AI VIRAL CLIPPING ENGINE
> **Task Description for Claude / AI Engineer:** Build an Automated AI Video Clipper that extracts the most viral 30–60 second moments from top YouTube creators (Gaming, GTA 6, Tech, Reactions) and formats them into broadcast-grade 9:16 Reels/Shorts matching top viral Instagram clipping channels.

---

```markdown
# MISSION: BUILD THE ULTIMATE VIRAL CLIPPING ENGINE (YOUTUBE TO 9:16 REELS)

You are an expert full-stack media automation engineer specializing in Python, FFmpeg, Whisper AI, Computer Vision, and Remotion.

### 🎯 THE OBJECTIVE
We are launching a new automated clipping channel (separate from stock/finance content).
When a major cultural or gaming event drops (e.g., **GTA 6 Launch**, Apple Keynote, Viral Drama), we do **NOT** create AI videos from scratch. 
Instead, we take long-form YouTube videos/streams from **TOP CREATORS** (e.g., *CarryMinati, Techno Gamerz, Total Gaming, Kai Cenat, xQc, PewDiePie, IGN*), automatically detect the most insane, funny, shock, or high-energy reaction moments, cut them into 30–60 second clips, reformat them into high-CTR 9:16 vertical reels, and prepare them for publishing.

---

## 🖼️ VISUAL REFERENCE & LAYOUT ARCHITECTURE (MANDATORY BENCHMARK)

Our target layout is based on viral reaction reels (e.g. `ashim_ytt` CarryMinati GTA 6 reaction):

### 1. Canvas Specifications
- **Resolution**: 1080 x 1920 (9:16 vertical aspect ratio).
- **Framerate**: 30 FPS / 60 FPS.
- **Audio**: AAC Stereo 192kbps, normalized loudness (-14 LUFS).

### 2. Layout Structure (3-Zone Stacking)
- **TOP ZONE (0px – 450px) — THE HOOK HEADER**:
  - Dark matte/black background (`#000000`).
  - **Line 1**: Creator Name in bold clean white (`#FFFFFF`), all-caps, font: *Montserrat Black / Anton / Impact* (e.g. `CARRY MINATI`).
  - **Line 2**: Viral Reaction Hook in glowing neon red/amber (`#FF1E1E` or `#FFB800`) with intense outer glow (`text-shadow: 0 0 20px rgba(255,30,30,0.8)`), italic/slanted uppercase (e.g. `CRAZY REACTION` or `INSANE GTA 6 GRAPHICS`).
  - Large font size (64px–80px), commanding maximum scroll-stopping power.

- **MIDDLE ZONE (450px – 1470px) — THE CONTENT FEED**:
  - The original 16:9 YouTuber footage (centered vertically, 1080px wide × ~608px high).
  - Preserves 100% of the game screen and the creator's facecam without weird stretching.
  - Optional subtle separation border or glow between the video and header/footer.

- **BOTTOM ZONE (1470px – 1920px) — CAPTIONS & SUBTITLES**:
  - Black matte background.
  - Kinetic, word-by-word active pop subtitles generated from Whisper timestamps.
  - Active spoken word highlighted in vibrant yellow (`#FFE600`) or cyan (`#00F0FF`).
  - Safe zone: Sits comfortably above Instagram/YouTube UI overlay icons (leaving bottom 200px clear).

---

## ⚙️ END-TO-END AUTOMATION PIPELINE (TECH STACK)

```
[YouTube Video / Stream URL]
             │
             ▼
     1. Ingestion (yt-dlp)
     Download 1080p MP4 + Extract 16kHz WAV Audio
             │
             ▼
     2. Transcription (Whisper AI)
     Generate word-by-word millisecond timestamps (words.json)
             │
             ▼
     3. Viral Highlight Detection (LLM: Claude 3.5 Sonnet / Gemini Flash)
     Score transcripts for:
     - Laughing / Screaming / Shock
     - Swear words / Slang / High excitement ("Bhai ye kya hai!", "OMG", "Look at this!")
     - Audio volume spikes / pitch intensity
     Output: Top 3-5 clips with [startSec, endSec, Hook Title, Viral Score]
             │
             ▼
     4. Smart Video Re-framing & Header Generation (FFmpeg / Canvas)
     - 1080x1920 canvas setup
     - Render Top Header with Creator Name + Glowing Punchline
     - Overlay 16:9 gameplay in center
             │
             ▼
     5. Kinetic Subtitle Burning
     - Burn word-by-word synchronized karaoke captions
             │
             ▼
     6. Packaging & Export
     - Output: out/<clip_name>.mp4
     - Generate High-CTR Cover Thumbnail (out/<clip_name>-cover.jpg)
     - Generate Viral SEO Caption + 3-Tier Hashtags (#gta6 #carryminati #viralreels)
```

---

## 🛠️ REQUIRED SCRIPTS TO BUILD IN `clip-engine/`

Please build/refactor the following modular scripts in `clip-engine/scripts/`:

### 1. `1_search_and_download.py`
- Accepts `--topic "GTA 6 reaction"` or `--url "<youtube_url>"`.
- If topic: Queries YouTube via `yt-dlp` search, filters for top-viewed videos (from channels like CarryMinati, Techno Gamerz, etc.), downloads 1080p MP4.
- Outputs into `downloads/<video_id>.mp4` and writes `downloads/<video_id>_meta.json`.

### 2. `2_transcribe.py`
- Extracts 16kHz mono WAV from source video using FFmpeg.
- Runs Whisper (using `whisper-cli` or `openai-whisper`) to extract word-level timestamps.
- Outputs `captions/<video_id>_words.json` containing:
  ```json
  {
    "segments": [{"start": 12.4, "end": 18.2, "text": "Arre bhai ye kya gaadi hai!"}],
    "words": [{"word": "Arre", "start": 12.4, "end": 12.8}]
  }
  ```

### 3. `3_highlight_detect.py`
- Reads `captions/<video_id>_words.json`.
- Uses Claude / Gemini to analyze the dialogue + sentiment + pacing.
- Detects the **top 3 viral clips** (duration 30s to 55s).
- Prompt instructions to LLM:
  - "Identify the exact climax moment where the YouTuber is screaming, laughing, or making an insane reaction."
  - "Snap `start` 3–5 seconds before the climax for context, and `end` 2 seconds after the punchline."
  - "Generate an aggressive, curiosity-driven 2-line header: Line 1 = Creator Name, Line 2 = Action Hook (e.g. `CARRY MINATI` / `INSANE GTA 6 GRAPHICS`)."
- Outputs `captions/<video_id>_highlights.json`.

### 4. `4_render_reaction_reel.py`
- Takes the cropped clip timestamps and generates the complete 1080x1920 reel:
  - Creates the top 2-line header with bold typography and glowing neon effects.
  - Places the 16:9 gameplay in the center with zero distortion.
  - Adds word-by-word synchronized subtitles in the bottom zone.
- Supports two modes:
  - **Mode A (FFmpeg Filter)**: Fast, single-pass rendering using FFmpeg `filter_complex`.
  - **Mode B (Remotion / HTML Canvas)**: Broadcast-grade with animated glowing text and bounce animations.
- Outputs ready-to-post vertical videos in `output/<video_id>_clip_01.mp4`.

### 5. `5_generate_cover_and_caption.py`
- Extracts high-contrast cover image at the peak facial expression moment.
- Generates Instagram & YouTube Shorts description with hook question, creator credit, and 3-tier hashtags:
  - Tier 1: Mega hashtags (`#gta6 #gaming #reelsindia`)
  - Tier 2: Creator specific (`#carryminati #technogamerz`)
  - Tier 3: Engagement tags (`#viral #trending #fyp`)

### 6. `run_pipeline.py` (Master One-Command Runner)
- Executes the entire chain with one single command:
  ```bash
  python run_pipeline.py --url "https://www.youtube.com/watch?v=EXAMPLE" --clips 3
  # OR
  python run_pipeline.py --topic "GTA 6 carryminati reaction" --clips 2
  ```

---

## ⚡ CODING GUIDELINES & CONSTRAINTS

1. **Keep Existing Project Untouched**: The existing stock/finance reel code in `reels/`, `src/`, and root `scripts/` MUST remain completely untouched. All new code belongs strictly inside `clip-engine/`.
2. **Handle Fonts & Graphics Gracefully**: Use standard system fonts (`Impact`, `Arial Black`, `Helvetica Neue Bold`, or download `Montserrat-Black.ttf` into `clip-engine/assets/fonts/`).
3. **Robust Fallbacks**:
   - If Whisper cannot find a local model, fall back gracefully to audio peak detection or subtitle tracks.
   - If Gemini/Claude key is missing, allow manual timestamp input `--start 45 --end 85`.
4. **Creator Attribution**: Always include small, clean credit tag on video: `Credit: Original Creator Channel Name` to respect fair use.

Now, implement this complete clipping engine cleanly, test it with a real YouTube gaming video, and deliver the output!
```
