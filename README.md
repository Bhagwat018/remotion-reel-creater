# Universal Remotion Reel System

A data-driven, zero-hardcoding Instagram Tech Reel generation engine built with Remotion 4, React 19, and TypeScript.

Every new tech reel is created by **only adding one small JSON file and one voiceover audio file**.
All design, typography, safe margins, transitions, captions, handle badges, and deterministic animations are governed centrally by `src/theme/theme.ts`. No component code ever needs to be touched for a new reel.

---

## 🚀 Web Dashboard (GUI)

Run the interactive web dashboard on localhost:

```bash
npm run dashboard
```

Then open **[http://localhost:3030](http://localhost:3030)** in your browser!

### Dashboard Features:

1. **Drop & Paste**: Paste or upload your `reel.json` and drag-and-drop your `voice.mp3` file.
2. **Audio Player**: Preview and listen to the voiceover before rendering.
3. **1-Click Preset Templates**: Load high-traffic systems (Hindi), AI hallucination, or 12-scene showcase presets in one click.
4. **Live Render HUD**: Real-time progress bar, frames counter, encoding speed, and streaming terminal logs.
5. **Interactive Video Controller**: Once rendered, the reel immediately loads into a 9:16 smartphone player with play/pause, seek scrubber, speed adjustment, and direct MP4 download!

---

## ⚡ The 5-Step Workflow

### Step 1: Scaffold a New Reel

Run the scaffolding command with your desired reel slug:

```bash
npm run new-reel -- my-reel-slug
```

This automatically:

- Copies `reels/_template/reel.json` to `reels/my-reel-slug/reel.json`
- Creates your media asset folder at `public/reels/my-reel-slug/`
- Pre-configures metadata and relative asset paths

---

### Step 2: Add Your Voice File

Place your spoken voiceover track into the newly created folder:

```text
public/reels/my-reel-slug/voice.mp3
```

_(Optional)_ Generate word timestamps for word-by-word highlighted captions:

```bash
npm run make-words -- my-reel-slug
```

If you don't generate word timestamps, the engine automatically splits spoken lines evenly across each scene duration.

---

### Step 3: Edit `reel.json`

Open `reels/my-reel-slug/reel.json` and configure your scenes.

#### Example Reel Config:

```json
{
  "meta": {
    "slug": "ai-hallucination",
    "title": "Why AI lies with confidence",
    "handle": "@yourhandle",
    "voiceFile": "reels/ai-hallucination/voice.mp3",
    "wordsFile": null,
    "loop": true,
    "accentOverride": null,
    "captions": true
  },
  "scenes": [
    {
      "id": "s1",
      "type": "title",
      "startSec": 0,
      "endSec": 3.5,
      "voice": "Your AI just lied to you, and it had no idea.",
      "leadIn": "heads up,",
      "headline": "YOUR AI *LIED* TO YOU"
    }
  ]
}
```

#### Formatting Rules:

- **Accent highlights**: Wrap any word in asterisks (e.g., `*highlighted*`) to dynamically paint it with the brand accent color.
- **Auto-fit headlines**: Headlines dynamically scale font size to guarantee they never overflow Instagram's safe zones.
- **Hindi / Devanagari**: Any text containing Devanagari characters (हिंदी / मराठी / etc.) automatically switches to `Noto Sans Devanagari Bold`.
- **Loop echo**: When `"loop": true`, the final scene's headline should visually echo the first scene's headline for seamless Instagram looping.

---

### Step 4: Validate Your Reel

Before rendering, check for schema validity, missing assets, overlapping timings, or safe-zone overflows:

```bash
npm run validate -- my-reel-slug
```

Validation confirms:

- Strict Zod schema compliance for all scene types
- Audio and optional words file existence in `public/`
- Monotonic, non-overlapping scene timings
- Headline length checks
- Loop echo verification

---

### Step 5: Preview & Render

#### Live Interactive Preview in Remotion Studio

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to scrub through frames, inspect animations, and switch reel presets in the props panel.

#### High-Quality MP4 Render

```bash
npm run render:reel -- my-reel-slug
```

The finished video is rendered deterministically at 30 fps (1080x1920) and saved to:

```text
out/my-reel-slug.mp4
```

---

## 🎨 Supported Scene Types

| Type      | Key Props                                                           | Description                                                 |
| --------- | ------------------------------------------------------------------- | ----------------------------------------------------------- |
| `title`   | `leadIn`, `headline`                                                | Huge centered hook headline with blur-in slide              |
| `pills`   | `leadIn`, `headline`, `items[]`                                     | Staggered stack of dark UI pills with sparkle icons         |
| `card`    | `leadIn`, `headline`, `cardText`, `chip`                            | Dark prompt card with character typing effect & chip badge  |
| `code`    | `leadIn`, `headline`, `filename`, `lines[]`, `highlightLines[]`     | Terminal code window with line numbers & accent highlights  |
| `grid`    | `leadIn`, `headline`, `cells[]`, `savedIndex`                       | Grid of small dark cards with an accent badge on one item   |
| `orbit`   | `leadIn`, `headline`, `nodes[]` (3–5)                               | Dotted orbit path with orbiting pills and travelling dot    |
| `stamp`   | `leadIn`, `headline`, `stampText`                                   | Accent badge slamming down with scale impact at -8°         |
| `compare` | `leadIn`, `headline`, `left{label,items[]}`, `right{label,items[]}` | Side-by-side comparison (Wrong ✕ vs Right ✓)                |
| `stat`    | `leadIn`, `headline?`, `value`, `label`                             | Large stat counter counting up from 0 (e.g., `10x`, `98%`)  |
| `steps`   | `leadIn`, `headline`, `items[]`                                     | Sequential numbered step cards (01, 02, 03...)              |
| `quote`   | `leadIn`, `headline?`, `text`, `author?`                            | Styled quote box with quotation mark accent & author credit |
| `cta`     | `leadIn`, `headline`, `buttonText`                                  | Accent action button with flying cursor clicking it         |

---

## 📐 Layout & Theme Configuration

The look and feel is completely controlled by `src/theme/theme.ts`:

- **Dimensions**: 1080 × 1920 (9:16 vertical Reel)
- **Safe Zone**: `safeTop: 260px`, `safeBottom: 380px`, `sideMargin: 80px`
- **Colors**:
  - `bg`: `#E1E1E1` (light grey with animated subtle 40px grid)
  - `ink`: `#0E0E0E` (headlines & sharp corner stars)
  - `card`: `#202020` (dark UI surfaces)
  - `accent`: `#2563FF` (electric brand blue, or overridden per-reel via `meta.accentOverride`)
- **Typography**: Anton (Headlines), Inter (UI, lead-ins, captions), JetBrains Mono (Code, handle), Noto Sans Devanagari Bold (Devanagari script).
- **Motion**: Deterministic spring curves (<=5% overshoot), 10-frame blur-in, 8-frame blur-out, 8-frame scene crossfades.

-->>>>
ye mp3 h make a perfect video not compomized to work fi required make new compoents but matcg proper script vai scence

tum her video me same compoents kuu use kr raho ho her video same compoents se hi start ho rhi. or middle me her her video me sam things

scence ke accrdoign new compoents kiuuu nhi banatee hooo her barr

is video ke liye proper compoents banaooo scence ke accroding .....
