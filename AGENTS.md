# Antigravity Workspace Guidelines: Viral Reel Production Rules (`@techwith.genz`)

This repository (`remotion-reel`) produces viral, broadcast-grade vertical reels for **`@techwith.genz`**. The content covers **Share Market, Stock Analysis, IPO Breakdowns, Financial Mechanisms, Wealth Compounding, and FinTech Architecture** using the proven **HYBRID format** (Cinematic Real Video B-Roll + Floating Dynamic Neo-Cards + Kinetic Subtitles).

---

## ⚡ THE 10 UNIVERSAL PRODUCTION RULES (MANDATORY BEFORE EVERY VIDEO)

Every single new video MUST strictly follow and be validated against these 10 universal rules before publishing:

### 1. Script-Relevant Background Footage (The Visual Hook)
- **First 3 Seconds**: The opening scene MUST show the **exact real-world financial subject** mentioned in the script (e.g., if the topic is "Stock Market Crash", show actual red market trading floor screens, Wall Street ticker boards, or falling candlestick charts — NEVER a generic irrelevant landscape).
- **Cinematic Continuity**: Maintain moving video background across 100% of the reel scenes (`brollVideo`). Never abruptly drop to a flat light-grey or paper background.

### 2. Granular Scene-by-Scene B-Roll Switching (Zero Video Looping)
- **No Video Looping**: Never repeat or loop the same B-roll clip across multiple scenes.
- **Micro-Targeted Footage**: Every single scene must switch its background footage to match the exact physical subject spoken in that 5-8 second window:
  - Example: Scene 1 = Trading floor bustle; Scene 2 = Balance sheet / SEC filing; Scene 3 = Factory floor or product delivery; Scene 4 = Money counting or bank vault; Scene 5 = Stock chart rebound.

### 3. Topic-Specific Bespoke Animated UI Components (Zero Cookie-Cutter Templates)
- Never blindly reuse the same generic 4-box `flow` or standard 6-bullet `pills` for every video.
- **Topic Mechanism Analysis**: Analyze the script's core financial mechanism and code a **bespoke animated UI component** specifically designed for that topic:
  - Example: IPO Analysis = Live GMP Meter + Subscription X-Ray + Valuation P/E Battle.
  - Example: SIP/Compounding = Interactive Compounding Curve with ₹25L Regular vs Direct Plan Gap.
  - Example: Market Order = Real-time Orderbook Depth & Bid-Ask Spread matching.
  - Write custom React/Remotion graphics tailored to that exact financial mechanism with animations that visually explain the numbers and math.

### 4. Smart Tech Creator Avatar (Mandatory Lip-Synced Presence)
- Every video must feature the smart tech creator avatar (`SpeakingAvatar.tsx`) actively speaking and lip-syncing to the voiceover.
- Premium styling: Matte obsidian techwear jacket with cyan piping, glowing `>_ CODE` chest badge, titanium AR glasses with anti-glare sheen, wireless IEM with green status LED, and dynamic speech bubble with word-by-word highlight.

### 5. Absolute Text Contrast & High Legibility
- **Headlines on Dark Video B-Roll**: Must ALWAYS be rendered in **Pure Crisp White (`#ffffff`)** with a heavy cinematic drop-shadow (`0 6px 24px rgba(0,0,0,0.95)`). Never render black or dark grey text over a dark video layer.
- **Card Content**: Foreground Neo-Brutalist cards (white boxes) must use deep dark ink (`#0f172a`) with bold typography.
- **Vignette Protection**: All scenes with b-roll must include the dark atmospheric gradient overlay (`linear-gradient(to bottom, rgba(5,8,15,0.78) 0%, rgba(5,8,15,0.60) 40%, rgba(5,8,15,0.90) 100%)`) to guarantee text readability against any video lighting.

### 6. Dual Schema & Component Data Integrity (Zero Blank Cards)
- Components (`ArchitectureFlow`, `CompareScene`, `PillsScene`, `GmpGaugeScene`, `ValuationBattleScene`) must safely handle dual naming conventions without failing or dropping text:
  - Supports both `title` AND `label`.
  - Supports both `subtitle` AND `sub`.
  - Supports both `pills` AND `items`.
- **Zero Empty Cards**: Never render an empty or partially missing card. Every node must display its Title, Subtitle, Icon, and Status badge.

### 7. 100% Language & Voice-Visual Synchronization
- **Language Alignment**: The on-screen text, lead-in badges, headlines, italic accents, and subtitles MUST match the voiceover language:
  - If voiceover is **English**: All headlines, accent phrases, and captions must be sharp, natural English.
  - If voiceover is **Hinglish/Hindi**: On-screen copy must follow the exact same Hinglish vocabulary and phrasing.
  - **No Hybrid Confusion**: Never mix Hindi punchlines with English narration.
  - **Clean Handle Pronunciation in Voiceover (CRITICAL)**: In voiceover text, NEVER write `@` or `.`. Always write it phonetically as **`techwith genz!`** (e.g., *"Aise hi market aur finance secrets ke liye follow karo techwith genz!"*) so the AI voice never speaks "at the rate dot".

### 8. Lower-Third Decluttering & Subtitle Breathing Room
- **Kinetic Subtitles Position**: Placed at `bottom: 260px` with word-by-word active highlight (`#fbbf24`).
- **Zero Overlap**: Subtitles must NEVER collide with bottom CTA buttons, pills, or the `AUDIO SYNC` visualizer.
- Any bottom callout pill must sit safely above the subtitle zone (or at the top/center) to preserve visual breathing room.

### 9. Voice-First Whisper Millisecond-Precision Timing
- Never guess or approximate scene durations with generic math.
- Always run local Whisper (`whisper-cli -m ggml-base.bin`) on the master voiceover audio to extract millisecond-accurate word timestamps (`words.json`).
- Snap each scene's `startSec` and `endSec` strictly to sentence pauses in the transcription.

### 10. Continuous Verification & Auto-Fix Quality Gate (The Infinite Loop)
- **Mandatory Quality Gate**: Before any video is considered complete or delivered to the user, it MUST undergo a rigorous 9-point rule verification.
- **Frame Extraction Audit**:
  ```bash
  mkdir -p /tmp/review_frames && ffmpeg -y -i out/<slug>.mp4 -vf "fps=1/3" /tmp/review_frames/frame_%02d.jpg
  ```
- **Verification Checklist**:
  1. [ ] Hook b-roll matches exact topic in first 3s (Rule 1).
  2. [ ] Every scene switches b-roll without repeating/looping (Rule 2).
  3. [ ] Bespoke UI component uniquely engineered for the script's mechanism (Rule 3).
  4. [ ] Smart creator avatar active and lip-synced (Rule 4).
  5. [ ] Pure white headlines with heavy drop-shadow on dark video (Rule 5).
  6. [ ] Zero empty cards or missing text in UI components (Rule 6).
  7. [ ] Voiceover and on-screen language 100% matched; handle spoken as `techwith genz!` (Rule 7).
  8. [ ] Subtitles clearly visible at `bottom: 260px` with zero collision (Rule 8).
  9. [ ] Whisper millisecond timestamps perfectly snapped to scenes (Rule 9).
- **THE LOOP**: If ANY of the above checks fail or show visual/audio defects:
  - **DO NOT deliver the video.**
  - **Loop back immediately**: Refactor code / update JSON / fetch correct b-roll -> re-render MP4 -> re-run Rule 10 Verification.
  - **Repeat the loop continuously** until the video passes 100% of all rules. Only deliver when certified viral-ready and broadcast-grade.

---

## 🛠️ Step-by-Step Production Protocol

```bash
# 1. Download topic-specific cinematic b-roll (trading, stocks, economy)
/opt/homebrew/bin/yt-dlp "ytsearch1:<market topic> cinematic 4k slow motion" \
  -f "bestvideo[height<=720][ext=mp4]" -o "public/broll/<name>.%(ext)s" \
  --download-sections "*0-10" --force-overwrites --no-playlist

# 2. Build bespoke UI components tailored to topic mechanism
# src/scenes/...

# 3. Build reel JSON with exact scene alignment & schema
# reels/<slug>/reel.json

# 4. Generate or sync voiceover & millisecond timestamps
node scripts/generate-voice.mjs <slug> --force

# 5. Validate schema and timing
node scripts/validate-reel.mjs <slug>

# 6. Render broadcast MP4
node scripts/render-reel.mjs <slug>

# 7. EXECUTE RULE 10: Verification Audit & Auto-Improvement Loop
ffmpeg -y -i out/<slug>.mp4 -vf "fps=1/3" /tmp/review_frames/frame_%02d.jpg
# Inspect all extracted frames. If ANY check fails -> Fix code/JSON -> Re-render -> Re-verify.
# Loop until 100% of rules pass!

# 8. Publish to Instagram (when user requests)
node scripts/post-reel-browser.mjs out/<slug>.mp4 "<Caption with Hashtags>"
```
