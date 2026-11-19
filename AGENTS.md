# Antigravity Workspace Guidelines: Viral Reel Production Rules (`@techwith.genz`)

This repository (`remotion-reel`) produces viral, broadcast-grade vertical reels for **`@techwith.genz`**. The content covers **Share Market, Stock Analysis, IPO Breakdowns, Financial Mechanisms, Wealth Compounding, and FinTech Architecture** using the proven **HYBRID format** (Cinematic Real Video B-Roll + Floating Dynamic Neo-Cards + Kinetic Subtitles).

---

## ⚡ THE 10 UNIVERSAL PRODUCTION RULES (MANDATORY BEFORE EVERY VIDEO)

Every single new video MUST strictly follow and be validated against these 10 universal rules before publishing:


### 1. Script-Relevant Background Footage & Presenter Hook Anchor (The Visual Hook)

- **First 3 Seconds**: The opening scene MUST feature the **Real Human Presenter Anchor** speaking directly to camera with active hand gestures (`public/broll/presenter/presenter_hook_speaking.mp4`), immediately establishing human connection, trust, and stopping the user's scroll. Alternatively, when a physical macro-financial event is introduced, show the exact physical asset paired with the presenter.
- **Cinematic Continuity**: Maintain moving video background across 100% of the reel scenes (`brollVideo`). Never abruptly drop to a flat light-grey or paper background.


### 2. Granular Scene-by-Scene B-Roll Switching & Abstract Fallback (Zero Video Looping)

- **No Video Looping**: Never repeat or loop the same B-roll clip across multiple scenes.
- **Micro-Targeted Footage**: Every single scene must switch its background footage every 5-8 seconds to match the exact physical subject spoken in that window (e.g. Scene 1 = Real Presenter; Scene 2 = Warehouse / Factory / Mining; Scene 3 = Balance Sheet / Vault; Scene 4 = Live Candlestick / GMP Chart; Scene 5 = Presenter Rule Explaining / Trading Terminal).
- **Abstract Fallback**: When explaining abstract investment rules, ratios, or warnings where no direct physical footage exists, fallback to the **Real Human Presenter** (`public/broll/presenter/presenter_rule_explaining.mp4`) so the user feels the creator is personally explaining the rule.

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
  - **Clean Handle Pronunciation in Voiceover (CRITICAL)**: In voiceover text, NEVER write `@` or `.`. Always write it phonetically as **`techwith genz!`** (e.g., _"Aise hi market aur finance secrets ke liye follow karo techwith genz!"_) so the AI voice never speaks "at the rate dot".

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
  10. [ ] High-CTR Cover Thumbnail generated & verified (Rule 11).
  11. [ ] Viral Hashtags & SEO Caption attached (Rule 12).
  12. [ ] Screen-Dominant UI footprint (960-980px width, 44-58px bold metrics) (Rule 13).
  13. [ ] Kinetic animations: springs, ticking counters, pulsing badges (Rule 14).
  14. [ ] Pure vector SVGs / custom code graphics over plain emojis (Rule 15).
  15. [ ] Direct 1:1 script-to-visual physical mechanism mapping (Rule 16).
  16. [ ] Interactive community poll ticker & FinTech outro architecture (Rule 17).
  17. [ ] Deep navy/slate glassmorphism with top laser accent lines & telemetry tags (Rule 18).
  18. [ ] Real Human Presenter Anchor in Scene 1 & Abstract Rule Fallback (Rule 19).
  19. [ ] Mandatory Hybrid Master Plan artifact formulated & verified before execution (Rule 20).
- **THE LOOP**: If ANY of the above checks fail or show visual/audio defects:
  - **DO NOT deliver the video.**
  - **Loop back immediately**: Refactor code / update JSON / fetch correct b-roll -> re-render MP4 -> re-run Rule 10 Verification.
  - **Repeat the loop continuously** until the video passes 100% of all rules. Only deliver when certified viral-ready and broadcast-grade.

### 11. High-CTR Cover Thumbnail Guarantee (Zero Blank/White Frame 0)

- **Never Upload with Blank Cover**: Instagram defaults to Frame 0 which is often dark, blurred, or plain white. This kills feed CTR.
- **Custom Rendered Cover Image**: Always extract or render a high-impact cover frame (`out/<slug>-cover.jpg`) at 1-2 seconds with the big bold hook headline, neon badge, and dark cinematic background.
- **Automated Cover Upload in Browser**: In `post-reel-browser.mjs`, always upload the custom cover image file explicitly AND seek the video scrubber to 20% mark as fallback so Instagram feed always shows a visually striking cover.

### 12. Viral Algorithmic Hashtags & SEO-Engineered Caption

- **High-Reach Hashtag Mix**: Every post MUST include a strategic 3-tier hashtag stack:
  1. _Broad Mega Reach (1M+)_: `#sharemarket #stockmarketindia #nifty50 #investing #business`
  2. _Niche Topic Targeted (100k-500k)_: `#ipo #anthropic #claudeai #techwithgenz #stockanalysis`
  3. _Viral Trending Audio/Format_: `#viralreels #reelsindia #fintech #moneytips #wealth`
- **Engaging Caption Hook**: First 2 lines of caption must ask a controversial/curiosity question (e.g. _"Kya aap is \$1.5 Trillion AI Bubble me invest karoge? 👇"_), followed by 3 bullet takeaways and a clear CTA to follow `@techwith.genz`.

### 13. Screen-Dominant Visual Presence & Big Bold UI Elements (User Rule)

- **Large Screen Footprint**: Foreground UI components must NEVER look shrunken, timid, or cramped. Fill the screen space generously (`maxWidth: 960-980px`, occupying 88-94% of horizontal width).
- **Massive Typography & Metrics**: Primary numbers, valuations, prices, and multipliers must be rendered BIG and BOLD (42px to 58px font size with heavy weights 900+).
- **Heavy Contrast & Glowing Borders**: 3-4px solid borders with vibrant glowing neon shadows (`box-shadow: 0 14px 40px rgba(...)`) so elements pop vividly against the moving cinematic video background.

### 14. Rich Bespoke Geometry & Kinetic Animation Engineering (User Rule)

- **Beyond Plain Rectangles**: Never render plain flat boxes. Use modern futuristic geometry:
  - Angled chamfered corners, HUD bracket accents, and layered pill headers.
  - Dynamic dual-meter gauges, circular progress rings, and segmented risk ladders.
  - Floating metric pods with glowing status nodes and colored laser connectors.
- **Rich Kinetic Animations**: Every scene must feature living animations:
  - Spring-interpolated scale & slide entrances (`damping: 12, stiffness: 140`).
  - Animated number counters ticking from 0 to target value using `interpolate(frame, ...)`.
  - Sinusoidal breathing pulses on danger/warning badges (`Math.sin(frame * 0.2)`).
  - Shimmering gradient flows and kinetic status indicators.

### 15. Pure Vector/SVG Graphic Engineering (Zero Raw Text Emojis as Primary Visuals)

- **No Reliance on Flat Text Emojis**: Plain Unicode emojis (🏠, ❄️, 🚜, 💰, 💣) look amateurish and render inconsistently across platforms.
- **Bespoke Code-Driven Vector Graphics**: All primary mechanism icons must be custom-coded React SVGs or styled Lucide vectors with neon drop shadows:
  - Example (AC & Electricity): Custom SVG air conditioner with sine-wave cool breeze (`acBreezeWave`) + blinking green LED.
  - Example (Power Grid): High-voltage laser conduit line with moving charge packets (`(frame * 14) % 180`).
  - Example (Mining & Fleets): Custom excavator silhouette with hydraulic boom arm and treads; customized forklifts and reach trucks.
  - Example (Balance Sheet): Titanium security shield with glowing verified checkmark; holographic vault door with spinning combination wheel (`frame * 1.8 deg`).
  - Example (Client Brands): Authentic vector brand badges (e.g. Zepto pink lightning, Blinkit yellow quick-basket, Amazon orange fulfillment curve).

### 16. Script-Driven Mechanism Visualization (Direct 1:1 Physical Concept Mapping)

- **Visual Math & Financial Logic**: Every core concept spoken in the script must be translated into an **interactive visual mechanism that visually explains the numbers and reality**:
  - _Desh ki 25% power supply spoken_ ➔ Circular SVG radar gauge with animated ticks + 4-bulb visual matrix (1 glowing amber/cyan bulb vs 3 dim bulbs).
  - _SME 10x lot size spoken_ ➔ 10X capital jump scale (₹15,000 retail lot vs ₹1,47,000 SME lot with pulsing shockwave badge).
  - _Thin GMP & heavy debt spoken_ ➔ Sub-zero frozen thermometer meter + extreme Risk-Reward Asymmetry scale (₹1.47L risk vs ₹14k reward).
  - _1-Day Gain vs Long-Term Dividend spoken_ ➔ Dual strategy split (Red HUD "Strict Avoid" vs Green HUD "Solid Compounder").

### 17. Interactive Community Poll Ticker & FinTech Outro Architecture

- **Never Use Flat Static Outros**: The closing CTA scene must look like a high-tech financial terminal.
- **Animated Community Poll Engine**: Include an interactive audience poll with animated voting bars growing dynamically from 0% to the target percentage:
  - Example: `👍 Yes (Long-Term Dividend Play): 68%` vs `👎 No (Avoid Poor Gain): 32%`.
  - Example: `⚠️ Apply Karunga (Risk Seeker): 18%` vs `🛡️ Avoid (Capital Safe): 82%`.
- **Glowing Cyber Follow HUD**: Sleek `@techwith.genz` branding with pulsing neon radar circle and bold action button.

### 18. Atmospheric Deep Navy/Slate Glassmorphism & Top Laser Accent Lines

- Foreground cards must use deep obsidian/slate glassmorphism (`backgroundColor: "rgba(10, 15, 30, 0.96)"`) to ensure 100% text legibility over any video lighting.
- Every major HUD container must feature a **top laser accent line** with a vibrant multi-color gradient (e.g. `linear-gradient(90deg, #06b6d4, #f59e0b, #10b981)`).
- Include high-tech HUD telemetry tags on top of containers: `[ LIVE TELEMETRY // STATUS ]`, `[ 24x7 THERMAL SUPPLY ]`, `[ CRITICAL VALUE PROPOSITION ]`.

### 19. Real Human Presenter Anchor & Abstract Fallback Protocol (User Rule)

- **Scene 1 Opening Hook (Mandatory Human Presence)**: Every video MUST start with the **Real Human Presenter Anchor** speaking to camera with active hand gestures (`public/broll/presenter/presenter_hook_speaking.mp4`). This creates instant human connection, stops the scroll, and provides high personal authority.
- **Abstract / Rule / Disclaimer Fallback**: When a scene covers abstract rules, mathematical formulas, or investment caveats where direct physical footage is unavailable (e.g., SME 30% GMP rule, tax rules, portfolio ratios), **NEVER show generic or irrelevant stock clips**. Instead, use the Real Human Presenter video (`public/broll/presenter/presenter_rule_explaining.mp4` or `presenter_summary_talk.mp4`) so the viewer perceives the creator as directly explaining the script.
- **Presenter Assets Registry**:
  - `public/broll/presenter/presenter_hook_speaking.mp4` (Scene 1 Opening Hook, 10s)
  - `public/broll/presenter/presenter_rule_explaining.mp4` (Rule / Abstract Fallback, 10s)
  - `public/broll/presenter/presenter_summary_talk.mp4` (Summary / Takeaways / Outro, 10s)

### 20. Mandatory Hybrid Master Plan Before Execution (The Iron Law)

- **Zero Blind Coding**: For EVERY single new video or script provided by the user, **NEVER immediately start writing Remotion code, guessing scene durations, or rendering**.
- **Mandatory Master Plan Artifact First**: Formulate and publish a comprehensive **Hybrid Master Plan** (`<slug>_hybrid_master_plan.md`) in the artifact directory detailing:
  1. Spoken Financial Mechanism & 1:1 Physical Concept Mapping (Rule 16).
  2. Scene-by-Scene Visual Layer Breakdown: Scene 1 Presenter Anchor + Scenes 2-4 Micro-Targeted B-Roll + Scene 5 Fallback/Terminal (Rules 1, 2, 19).
  3. Bespoke React Vector SVG Design & Metric Layout (Rules 13, 14, 15).
  4. Whisper Millisecond Voiceover Synchronization Plan (Rule 9).
  5. Interactive Community Poll & FinTech Outro Architecture (Rule 17).
- Only after the Master Plan is established and aligned may production code and rendering proceed.

---

## 🛠️ Step-by-Step Production Protocol

```bash
# 0. Formulate and publish the Hybrid Master Plan Artifact (<slug>_hybrid_master_plan.md)
# Ensure Scene 1 Presenter Anchor, topic b-roll, and bespoke SVG mechanisms are mapped.

# 1. Download topic-specific cinematic b-roll (trading, stocks, economy)
/opt/homebrew/bin/yt-dlp "ytsearch1:<market topic> cinematic 4k slow motion" \
  -f "bestvideo[height<=720][ext=mp4]" -o "public/broll/<name>.%(ext)s" \
  --download-sections "*0-10" --force-overwrites --no-playlist

# 2. Build bespoke UI components tailored to topic mechanism
# src/scenes/...

# 3. Build reel JSON with exact scene alignment & schema
# reels/<slug>/reel.json
# Ensure Scene 1 uses "broll/presenter/presenter_hook_speaking.mp4"

# 4. Generate or sync voiceover & millisecond timestamps
node scripts/generate-voice.mjs <slug> --force

# 5. Validate schema and timing
node scripts/validate-reel.mjs <slug>

# 6. Render broadcast MP4
node scripts/render-reel.mjs <slug>

# 7. EXECUTE RULE 10: Verification Audit & Auto-Improvement Loop
ffmpeg -y -i out/<slug>.mp4 -vf "fps=1/3" /tmp/review_frames/frame_%02d.jpg
# Inspect all extracted frames against all 20 rules. If ANY check fails -> Fix code/JSON -> Re-render -> Re-verify.
# Loop until 100% of rules pass!

# 8. Publish to Instagram (when user requests)
node scripts/post-reel-browser.mjs out/<slug>.mp4 "<Caption with Hashtags>"
```

---

## 🎬 PART B: VIRALPOD PRODUCTION & COMPLIANCE RULES (`@viralpod.in`)

This repository also houses **`clip-engine/`**, a dedicated, isolated curation and clipping engine for **`@viralpod.in`** (Gaming, GTA 6, Reality TV, Bigg Boss, Podcasts, and Indian Pop-Culture).

### The 8 Mandatory ViralPod Rules:
1. **Transformative 3-Zone 9:16 Layout**: Zero raw reuploads. Always 1080x1920 with Top Black Header (White Creator Name + Electric Red Neon Hook), Centered 16:9 Video, and Bottom Attribution Pill.
2. **Optimal 30–55s Climax Window**: Start 3–5s before the reaction/punchline moment; cut within 2s after climax.
3. **Mandatory Copyright Armor in Caption**:
   - Creator credit: `🎥 Video Credit: Original gameplay/stream belongs to @[creator_handle]`
   - Fair use notice: `⚖️ Fair Use Notice: Content curated for entertainment, reaction & commentary purposes.`
   - 1-Hour takedown promise: `📩 DM for credit or removal. Prompt removal guaranteed within 1 hour!`
4. **Creator Tagging Protocol**: Always tag the creator's official Instagram handle in upload metadata.
5. **Strict Source Safety Tiering**:
   - Tier 1 & 2: Independent YouTubers, Streamers, Podcasters (🟢 95% SAFE).
   - Tier 3: Reality TV (Bigg Boss, Shark Tank) (🟡 Max 35s, masked watermarks).
   - Tier 4: Live Cricket / IPL, Full Bollywood Songs, OTT Movies (🔴 FORBIDDEN - Automated Strike Risk).
6. **High-CTR Custom Cover**: Always extract custom cover at 1.5s with bold readable typography.
7. **Immediate 1-Hour Removal Guarantee**: If any creator/agency DMs to remove a clip, delete permanently within 1 hour with zero argument.
8. **Pre-Publish Verification**: Verify video resolution (1080x1920), clean 192k audio, correct creator name, and caption legal armor before running `npm run post:viralpod`.

