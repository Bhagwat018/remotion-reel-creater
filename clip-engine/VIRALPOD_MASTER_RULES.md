# 📜 VIRALPOD MASTER PRODUCTION & COMPLIANCE RULES (`@viralpod.in`)
> **The Official Operating Standard for Curation, Transformation, Copyright Protection & Automated Publishing**

---

## ⚡ THE 8 UNIVERSAL RULES OF VIRALPOD (`@viralpod.in`)

Every single clip generated and published by `clip-engine` MUST strictly follow and be validated against these 8 universal rules:

---

### RULE 1: Mandatory Transformative Framing & 3-Zone Architecture (Zero Raw Reuploads)
- **Zero Raw Uploads**: Never re-upload unedited horizontal or raw screen clips. Raw clips trigger Instagram's automated video hashing/Content-ID bots within minutes.
- **Strict 1080 × 1920 (9:16) Canvas**:
  - **Top Zone (0 – 490px)**: Solid black header containing:
    - *Line 1*: Creator / Show Name in **Pure White (`#FFFFFF`)** Impact font with thick black outline (`stroke_width=5`).
    - *Line 2*: Viral Reaction / Climax Hook in **Vibrant Electric Red (`#FF2020`)** with a multi-pass diffuse neon glow (`ImageFilter.GaussianBlur(18)`).
  - **Center Zone**: The 16:9 YouTuber footage centered vertically without stretching or aspect distortion.
  - **Bottom Zone (1430 – 1920px)**: Dark matte framing containing the standardized credit pill (`ORIGINAL: [CREATOR] • [TOPIC]`).

---

### RULE 2: Optimal Climax Window (30s – 55s Max)
- **Attention Span Lock**: Clips must never exceed 60 seconds. The sweet spot for viral retention and loop rate is **35 to 48 seconds**.
- **Context-Before-Climax**: The clip must start **3 to 5 seconds BEFORE** the screaming, laughing, or surprise moment so the viewer understands the context.
- **Punchline Exit**: The clip must cut within **2 seconds after the reaction climax** to maximize completion rate and re-watch loops.

---

### RULE 3: Mandatory Copyright Armor & Caption Compliance
Every single post description on Instagram and YouTube Shorts MUST include the 4-part legal armor:

```text
[CREATOR NAME] Insane Reaction On [TOPIC]! 😱💀

Dekho [CREATOR NAME] ka reaction jab ye scene samne aaya! 👇 Drop your thoughts in comments!

🎥 Video Credit: Original gameplay/stream belongs to @[creator_handle] (YouTube: [Channel Name]).
⚖️ Fair Use Notice: Content curated for entertainment, reaction & commentary purposes.
📩 DM for credit or removal. Prompt removal guaranteed within 1 hour!
.
.
.
#viral #reels #explore #trending #[creator_tag] #[topic_tag] #viralpod
```

---

### RULE 4: Creator Tagging & Collab Protocol
- During automated or manual posting, **always tag the creator's official Instagram handle** in the reel upload metadata.
- Tagging creators respects fair use, demonstrates transparency, and opens the door for creators to repost or like the reel on their stories (which can bring 20k–50k instant followers).

---

### RULE 5: Source Safety Tiering (Zero Tolerance for Bot-Heavy Media)

| Tier | Category / Sources | Safety Status | Action Rule |
| :--- | :--- | :--- | :--- |
| **Tier 1 (Safe)** | Independent YouTubers & Streamers (CarryMinati, Techno Gamerz, Samay Raina, Tanmay Bhat, Total Gaming, Mortal, Kai Cenat, xQc) | 🟢 **95% SAFE** | **PRIMARY FOCUS**. Independent creators love clipping channels for free distribution. |
| **Tier 2 (Safe)** | Independent Podcasters & Interview Shows (BeerBiceps, Raj Shamani, RealHit, Men of Culture, Dostcast) | 🟢 **95% SAFE** | **HIGH VALUE**. Deep conversations and savage quotes drive heavy saves & shares. |
| **Tier 3 (Caution)** | TV Reality Shows & Talent Shows (Bigg Boss, Shark Tank India, India's Got Latent) | 🟡 **MEDIUM RISK** | Max 35s clips. Crop or mask TV broadcaster logos. Always add transformative headers. |
| **Tier 4 (Forbidden)** | Live Cricket / IPL / BCCI, Full Bollywood Songs (T-Series, Zee), Full OTT Series / Movies (Netflix, Prime) | 🔴 **STRICTLY FORBIDDEN** | **NEVER TOUCH**. Broadcasters use automated takedown bots that strike accounts instantly. |

---

### RULE 6: High-CTR Custom Cover Thumbnail Guarantee (Zero Blank Frames)
- **Never rely on Instagram's Frame 0**: Frame 0 is often dark, blurred, or awkward, killing feed CTR.
- **High-Impact Cover Extraction**: Always extract a custom cover frame at **1.5 seconds** (`output/<video_id>-cover.jpg`) featuring the creator's peak facial expression and the glowing header text.
- In `post_reel_viralpod.mjs`, the custom cover image file is uploaded explicitly during the Instagram publishing sequence.

---

### RULE 7: Immediate Removal & Zero-Argument Protocol
- If a creator, their management, or a production house sends a DM or email requesting a clip to be removed:
  - **Action**: Do NOT argue, dispute, or delay.
  - **Timeline**: Delete the reel **permanently within 1 hour**.
  - **Reply**: Send a polite response: *"Done! The clip has been completely removed. Thank you for letting us know."*
  - This 1-hour removal promise is why curation pages survive for years without account strikes.

---

### RULE 8: Verification Quality Gate Before Publishing
Before running `npm run post:viralpod`:
1. [ ] Reel rendered in 1080x1920 with crisp audio (AAC 192kbps, no clipping).
2. [ ] Top header has correct creator name spelling and glowing hook.
3. [ ] Center 16:9 video is centered without stretching.
4. [ ] Bottom attribution pill displays the correct original creator.
5. [ ] Caption includes the 3-tier hashtag stack and copyright/DM removal disclaimer.
6. [ ] Cover thumbnail extracted and verified.

---

*VIRALPOD MASTER RULES v1.0 — Activated & Enforced ✅*
