# 🎮 Viral Gaming & Reaction Clip Engine

> **Dedicated Auto-Clipping Engine for YouTube Gaming & Trending Event Reactions**  
> *Completely isolated from the stock/finance reel generator.*

---

## ⚡ Quick Start: 1-Command Pipeline

```bash
cd clip-engine
source venv/bin/activate

# Example 1: Run with Direct YouTube URL
python run_pipeline.py \
  --url "https://www.youtube.com/watch?v=kPPOjfhNH_E" \
  --creator "CARRY MINATI" \
  --hook "CRAZY REACTION" \
  --start 15 --duration 35

# Example 2: Search YouTube Automatically by Topic
python run_pipeline.py \
  --topic "Carryminati GTA 6 reaction" \
  --creator "CARRY MINATI" \
  --hook "GTA 6 REACTION" \
  --clips 3
```

---

## 📁 Output Artifacts (Ready to Post)

All rendered reels and publishing assets are stored in:
`clip-engine/output/`

For every video, it produces:
1. `*_reel.mp4` — Broadcast-grade 1080x1920 vertical video (9:16)
2. `*-cover.jpg` — High-CTR thumbnail cover frame
3. `*-caption.txt` — SEO-optimized Instagram caption with 3-tier viral hashtags
4. `*-caption.json` — Metadata JSON for automated scheduling & posting

---

## 🛠️ Modular Pipeline Architecture

```
clip-engine/
├── run_pipeline.py                 ← 🚀 Master one-command runner
├── CLAUDE_PROMPT_VIRAL_CLIPPER.md  ← Full prompt spec for Claude/AI
├── config/
│   └── topics.json                 ← Trending topics database (GTA 6, Apple Event, etc.)
├── downloads/                      ← Raw 1080p source videos
├── captions/                       ← Whisper timestamps & AI highlight metadata
├── assets/                         ← Auto-generated header PNG overlays
├── output/                         ← Final ready-to-post 9:16 vertical reels
└── scripts/
    ├── 1_search_and_download.py    ← yt-dlp search & filtered download
    ├── 2_transcribe.py             ← Whisper audio transcription (word timestamps)
    ├── 3_highlight_detect.py       ← Gemini 2.0 Flash viral highlight detection
    ├── 4_render_reaction_reel.py   ← 9:16 layout compositor (Ashim YT / CarryMinati style)
    └── 5_generate_cover_and_caption.py ← Cover thumbnail extraction & viral hashtags
```

---

## 🎨 Visual Layout (Ashim YT / CarryMinati Benchmark)

- **Canvas**: 1080 × 1920 (9:16 portrait)
- **Top Zone (0–490px)**:
  - Line 1: `CARRY MINATI` — Pure White Bold (Impact Font) with black border
  - Line 2: `CRAZY REACTION` — Multi-pass Neon Red Glow with Electric Red fill
- **Center Zone**: Original 16:9 gameplay & facecam stream without stretching
- **Bottom Zone**: Minimalist dark framing with creator attribution pill

---

## 💡 Custom Commands

### Render a custom clip from an already downloaded video:
```bash
python scripts/4_render_reaction_reel.py \
  --video-id "kPPOjfhNH_E" \
  --creator "TECHNO GAMERZ" \
  --hook "INSANE POLICE CHASE" \
  --start 120 --duration 45
```

### Generate cover & caption for existing clip:
```bash
python scripts/5_generate_cover_and_caption.py \
  --video-id "kPPOjfhNH_E" \
  --creator "TECHNO GAMERZ" \
  --topic "GTA 6"
```
