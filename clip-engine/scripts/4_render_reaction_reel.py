#!/usr/bin/env python3
"""
SCRIPT 4: Render Reaction Reel (Ashim YT / CarryMinati 9:16 Style)
===================================================================
Composites the 16:9 gameplay stream into a broadcast-grade 1080x1920 vertical reel:
- Top Header: Black background with Line 1 (White Bold Creator) + Line 2 (Glowing Neon Red Hook)
- Center: 16:9 Gameplay & Facecam stream centered without distortion
- Bottom: Clean dark matte footer with subtle creator credit & subtitle space

Usage:
  python 4_render_reaction_reel.py --video-id abc123
  python 4_render_reaction_reel.py --video-id abc123 --creator "CARRY MINATI" --hook "CRAZY REACTION"
"""

import argparse
import json
import math
import os
import subprocess
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ── Paths ──────────────────────────────────────────────────────────────────────
ROOT = Path(__file__).parent.parent
DOWNLOADS_DIR = ROOT / "downloads"
CAPTIONS_DIR  = ROOT / "captions"
CLIPS_DIR     = ROOT / "clips"
OUTPUT_DIR    = ROOT / "output"
ASSETS_DIR    = ROOT / "assets"

CLIPS_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)
ASSETS_DIR.mkdir(exist_ok=True)

OUT_W, OUT_H = 1080, 1920
FONT_PATH = "/System/Library/Fonts/Supplemental/Impact.ttf"
if not os.path.exists(FONT_PATH):
    FONT_PATH = "/System/Library/Fonts/Supplemental/Arial Black.ttf"

# ── Generate Viral Header Overlay PNG ──────────────────────────────────────────
def create_header_overlay(
    creator_name: str,
    hook_text: str,
    output_png: Path,
    glow_color: str = "#FF1A1A",
    subtitle_text: str = None
) -> Path:
    """
    Creates a transparent 1080x1920 overlay image with:
    - Top zone black header (0 to 460px)
    - Line 1: creator_name (Pure White, Bold Impact)
    - Line 2: hook_text (Vibrant Neon with Gaussian Glow)
    - Bottom zone black footer (1460 to 1920px)
    - Optional credit pill
    """
    # 1. Base image: fully transparent RGBA
    img = Image.new("RGBA", (OUT_W, OUT_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 2. Draw Top & Bottom Solid Black Bars
    # Top bar: 0 to 480px
    draw.rectangle([0, 0, OUT_W, 490], fill=(0, 0, 0, 255))
    # Bottom bar: 1430 to 1920px
    draw.rectangle([0, 1430, OUT_W, OUT_H], fill=(0, 0, 0, 255))

    # Subtle gradient edge for smooth video blending
    for i in range(20):
        alpha = int(255 * (1.0 - i / 20.0))
        draw.line([(0, 490 + i), (OUT_W, 490 + i)], fill=(0, 0, 0, alpha))
        draw.line([(0, 1430 - i), (OUT_W, 1430 - i)], fill=(0, 0, 0, alpha))

    # 3. Typography Setup
    font_size_line1 = 82
    font_size_line2 = 94

    font1 = ImageFont.truetype(FONT_PATH, font_size_line1)
    font2 = ImageFont.truetype(FONT_PATH, font_size_line2)

    creator_upper = creator_name.upper().strip()
    hook_upper = hook_text.upper().strip()

    # Calculate bounding boxes
    bbox1 = draw.textbbox((0, 0), creator_upper, font=font1)
    w1, h1 = bbox1[2] - bbox1[0], bbox1[3] - bbox1[1]

    bbox2 = draw.textbbox((0, 0), hook_upper, font=font2)
    w2, h2 = bbox2[2] - bbox2[0], bbox2[3] - bbox2[1]

    # Adjust font2 size if too wide for 1080px (with 60px margin)
    max_w = OUT_W - 80
    if w2 > max_w:
        scale = max_w / w2
        font_size_line2 = max(54, int(font_size_line2 * scale))
        font2 = ImageFont.truetype(FONT_PATH, font_size_line2)
        bbox2 = draw.textbbox((0, 0), hook_upper, font=font2)
        w2, h2 = bbox2[2] - bbox2[0], bbox2[3] - bbox2[1]

    # Positions
    y1 = 150
    x1 = (OUT_W - w1) // 2

    y2 = y1 + h1 + 45
    x2 = (OUT_W - w2) // 2

    # 4. Neon Glow for Line 2 (Hook Text)
    glow_layer = Image.new("RGBA", (OUT_W, OUT_H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)

    # Multi-pass intensive neon red glow
    glow_rgba = (255, 20, 20, 255) if glow_color == "#FF1A1A" else (255, 180, 0, 255)
    for spread in [4, 8, 14, 20, 28]:
        for dx, dy in [(-spread, 0), (spread, 0), (0, -spread), (0, spread), (-spread, -spread), (spread, spread)]:
            glow_draw.text((x2 + dx, y2 + dy), hook_upper, font=font2, fill=glow_rgba)

    # Apply heavy blur to glow layer
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(18))
    img = Image.alpha_composite(img, glow_layer)
    draw = ImageDraw.Draw(img)

    # 5. Draw Crisp Foreground Texts with Black Strokes for maximum pop
    # Line 1: Pure White with black border
    stroke_w1 = 5
    draw.text((x1, y1), creator_upper, font=font1, fill=(255, 255, 255, 255),
              stroke_width=stroke_w1, stroke_fill=(0, 0, 0, 255))

    # Line 2: Vibrant Electric Red with subtle black border
    stroke_w2 = 4
    bright_red = (255, 30, 30, 255) if glow_color == "#FF1A1A" else (255, 210, 0, 255)
    draw.text((x2, y2), hook_upper, font=font2, fill=bright_red,
              stroke_width=stroke_w2, stroke_fill=(30, 0, 0, 255))

    # 6. Bottom Creator Credit Tag (Clean Minimalist Pill)
    credit_font = ImageFont.truetype(FONT_PATH, 28)
    credit_text = f"ORIGINAL: {creator_upper} • GTA 6 REACTION"
    c_bbox = draw.textbbox((0, 0), credit_text, font=credit_font)
    cw, ch = c_bbox[2] - c_bbox[0], c_bbox[3] - c_bbox[1]
    cx = (OUT_W - cw) // 2
    cy = 1780

    # Draw small pill container
    pill_pad_x = 24
    pill_pad_y = 10
    draw.rounded_rectangle(
        [cx - pill_pad_x, cy - pill_pad_y, cx + cw + pill_pad_x, cy + ch + pill_pad_y],
        radius=14,
        fill=(25, 25, 30, 230),
        outline=(60, 60, 75, 255),
        width=2,
    )
    draw.text((cx, cy), credit_text, font=credit_font, fill=(180, 185, 200, 255))

    # Save PNG
    img.save(output_png, "PNG")
    return output_png

# ── Composite Video with FFmpeg ────────────────────────────────────────────────
def render_reel_video(
    source_video: Path,
    start_sec: float,
    duration: float,
    overlay_png: Path,
    output_mp4: Path,
) -> bool:
    """
    FFmpeg pipeline:
    1. Cut source video from start_sec with duration
    2. Scale 16:9 video to 1080 width (height ~608)
    3. Center video on 1080x1920 black canvas
    4. Overlay top header & bottom footer PNG
    5. Clean AAC audio encoding
    """
    print(f"\n🎬 Rendering 9:16 Reel: {output_mp4.name}")
    print(f"   Time window: {start_sec:.1f}s → {start_sec + duration:.1f}s ({duration:.1f}s)")

    filter_complex = (
        f"[0:v]scale={OUT_W}:-2[scaled_vid];"
        f"color=c=black:s={OUT_W}x{OUT_H}:d={duration}[bg];"
        f"[bg][scaled_vid]overlay=(W-w)/2:(H-h)/2[base];"
        f"[base][1:v]overlay=0:0[outv]"
    )

    cmd = [
        "ffmpeg", "-y",
        "-ss", str(start_sec),
        "-i", str(source_video),
        "-i", str(overlay_png),
        "-t", str(duration),
        "-filter_complex", filter_complex,
        "-map", "[outv]",
        "-map", "0:a?",
        "-c:v", "libx264",
        "-crf", "19",
        "-preset", "fast",
        "-c:a", "aac",
        "-b:a", "192k",
        "-ar", "48000",
        "-movflags", "+faststart",
        str(output_mp4),
        "-loglevel", "warning",
    ]

    result = subprocess.run(cmd)
    if result.returncode != 0:
        print(f"❌ FFmpeg composite failed for: {output_mp4.name}")
        return False

    size_mb = output_mp4.stat().st_size / 1024 / 1024
    print(f"✅ Rendered successfully: {output_mp4.name} ({size_mb:.1f} MB)")
    return True

# ── Main ───────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Render 9:16 reaction reel matching CarryMinati/Ashim YT style")
    parser.add_argument("--video-id", required=True, help="Video ID of downloaded file")
    parser.add_argument("--creator", default="CARRY MINATI", help="Creator name for Line 1 (default: CARRY MINATI)")
    parser.add_argument("--hook", default=None, help="Action hook for Line 2 (e.g. CRAZY REACTION)")
    parser.add_argument("--start", type=float, default=None, help="Custom start second (optional)")
    parser.add_argument("--duration", type=float, default=None, help="Custom duration in seconds (optional)")
    args = parser.parse_args()

    video_id = args.video_id

    # Find source video
    source_file = None
    for ext in [".mp4", ".mkv", ".webm"]:
        p = DOWNLOADS_DIR / f"{video_id}{ext}"
        if p.exists():
            source_file = p
            break

    if not source_file:
        sys.exit(f"❌ Source video not found in {DOWNLOADS_DIR} for ID: {video_id}")

    # Check for highlights metadata or manual arguments
    highlights_file = CAPTIONS_DIR / f"{video_id}_highlights.json"
    clips_to_render = []

    if args.start is not None and args.duration is not None:
        clips_to_render.append({
            "clip_number": 1,
            "start": args.start,
            "duration": args.duration,
            "hook_title": args.hook or "CRAZY REACTION",
            "hook_text": args.hook or "CRAZY REACTION"
        })
    elif highlights_file.exists():
        with open(highlights_file) as f:
            highlights = json.load(f)
        for h in highlights:
            clips_to_render.append({
                "clip_number": h.get("clip_number", 1),
                "start": float(h.get("start", 0)),
                "duration": float(h.get("duration", 35)),
                "hook_title": args.hook or h.get("hook_title", "CRAZY REACTION"),
                "hook_text": args.hook or h.get("hook_title", "CRAZY REACTION")
            })
    else:
        # Default fallback clip: 30s starting from 15s
        clips_to_render.append({
            "clip_number": 1,
            "start": 15.0,
            "duration": 40.0,
            "hook_title": args.hook or "CRAZY REACTION",
            "hook_text": args.hook or "CRAZY REACTION"
        })

    print(f"\n🎨 Processing {len(clips_to_render)} reaction clips for ID: {video_id}")
    print(f"   Creator Name: {args.creator}")

    rendered_files = []
    for c in clips_to_render:
        clip_num = c["clip_number"]
        hook_str = c["hook_title"]

        # Generate custom overlay PNG for this clip
        overlay_png = ASSETS_DIR / f"header_overlay_{video_id}_clip{clip_num:02d}.png"
        create_header_overlay(
            creator_name=args.creator,
            hook_text=hook_str,
            output_png=overlay_png,
            glow_color="#FF1A1A"
        )

        out_mp4 = OUTPUT_DIR / f"{video_id}_clip{clip_num:02d}_reel.mp4"
        ok = render_reel_video(
            source_video=source_file,
            start_sec=c["start"],
            duration=c["duration"],
            overlay_png=overlay_png,
            output_mp4=out_mp4,
        )
        if ok:
            rendered_files.append(out_mp4)

    print(f"\n{'='*55}")
    print(f"🎉 Successfully produced {len(rendered_files)} vertical reaction reels!")
    for rf in rendered_files:
        print(f"   ▶ {rf}")
    print(f"{'='*55}\n")

if __name__ == "__main__":
    main()
