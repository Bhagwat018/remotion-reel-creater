#!/usr/bin/env python3
"""
VIRALPOD 2.0: Render Reaction Reel Engine
==========================================
Composites 16:9 gameplay streams into broadcast-grade 1080x1920 vertical reels:
- 3 Layout Options:
    1. 'split'  : Top 45% = Streamer Facecam (Zoomed & Centered) + Neon Divider + Bottom 55% = Gameplay Action
    2. 'blur'   : Cinematic moving blurred background + 16:9 center video
    3. 'black'  : Classic matte letterbox (Ashim YT / CarryMinati 3-zone standard)
- Kinetic Karaoke Subtitles (MrBeast / Hormozi active yellow pop) burned via libass
- Studio-grade 60 FPS, Lanczos scaling, unsharp edge mask, CRF 15 (Ultra-HD master)
"""

import argparse
import json
import math
import os
import re
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
MODELS_DIR    = ROOT / "models"

CLIPS_DIR.mkdir(exist_ok=True)
OUTPUT_DIR.mkdir(exist_ok=True)
ASSETS_DIR.mkdir(exist_ok=True)

OUT_W, OUT_H = 1080, 1920
FONT_PATH = "/System/Library/Fonts/Supplemental/Impact.ttf"
if not os.path.exists(FONT_PATH):
    FONT_PATH = "/System/Library/Fonts/Supplemental/Arial Black.ttf"

# FFmpeg with libass support
FFMPEG_BIN = "/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg"
if not os.path.exists(FFMPEG_BIN):
    FFMPEG_BIN = "ffmpeg"

# ── Generate Viral Header Overlay PNG ──────────────────────────────────────────
def create_header_overlay(
    creator_name: str,
    hook_text: str,
    output_png: Path,
    glow_color: str = "#FF1A1A",
    layout: str = "black",
    credit_suffix: str = "GTA 6 REACTION",
) -> Path:
    """
    Creates a transparent 1080x1920 overlay image matching the layout.
    """
    img = Image.new("RGBA", (OUT_W, OUT_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    creator_upper = creator_name.upper().strip()
    hook_upper = hook_text.upper().strip()

    if layout == "split":
        # Split Layout: Compact top header bar (0 to 220px)
        draw.rectangle([0, 0, OUT_W, 220], fill=(0, 0, 0, 255))

        font_size_line1 = 54
        font_size_line2 = 66
        font1 = ImageFont.truetype(FONT_PATH, font_size_line1)
        font2 = ImageFont.truetype(FONT_PATH, font_size_line2)

        b1 = draw.textbbox((0, 0), creator_upper, font=font1)
        w1, h1 = b1[2] - b1[0], b1[3] - b1[1]

        b2 = draw.textbbox((0, 0), hook_upper, font=font2)
        w2, h2 = b2[2] - b2[0], b2[3] - b2[1]

        max_w = OUT_W - 80
        if w2 > max_w:
            scale = max_w / w2
            font_size_line2 = max(44, int(font_size_line2 * scale))
            font2 = ImageFont.truetype(FONT_PATH, font_size_line2)
            b2 = draw.textbbox((0, 0), hook_upper, font=font2)
            w2, h2 = b2[2] - b2[0], b2[3] - b2[1]

        y1 = 45
        x1 = (OUT_W - w1) // 2
        y2 = y1 + h1 + 18
        x2 = (OUT_W - w2) // 2

        # Neon Glow for Hook Text
        glow_layer = Image.new("RGBA", (OUT_W, OUT_H), (0, 0, 0, 0))
        glow_draw = ImageDraw.Draw(glow_layer)
        glow_rgba = (255, 20, 20, 255) if glow_color == "#FF1A1A" else (255, 180, 0, 255)
        for spread in [4, 8, 14, 20]:
            for dx, dy in [(-spread, 0), (spread, 0), (0, -spread), (0, spread)]:
                glow_draw.text((x2 + dx, y2 + dy), hook_upper, font=font2, fill=glow_rgba)
        glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(14))
        img = Image.alpha_composite(img, glow_layer)
        draw = ImageDraw.Draw(img)

        # Draw Crisp Text
        draw.text((x1, y1), creator_upper, font=font1, fill=(255, 255, 255, 255),
                  stroke_width=4, stroke_fill=(0, 0, 0, 255))
        bright_red = (255, 30, 30, 255) if glow_color == "#FF1A1A" else (255, 210, 0, 255)
        draw.text((x2, y2), hook_upper, font=font2, fill=bright_red,
                  stroke_width=4, stroke_fill=(30, 0, 0, 255))

        # Facecam Side Vignette / Feathering (y = 220 to 930)
        vignette_layer = Image.new("RGBA", (OUT_W, OUT_H), (0, 0, 0, 0))
        v_draw = ImageDraw.Draw(vignette_layer)
        for i in range(80):
            alpha = int(255 * (1.0 - i / 80.0) ** 1.5)
            v_draw.line([(i, 220), (i, 930)], fill=(0, 0, 0, alpha))
            v_draw.line([(OUT_W - 1 - i, 220), (OUT_W - 1 - i, 930)], fill=(0, 0, 0, alpha))
        img = Image.alpha_composite(img, vignette_layer)
        draw = ImageDraw.Draw(img)

        # Split Separator Laser Line at y = 932
        split_y = 932
        laser_glow = Image.new("RGBA", (OUT_W, OUT_H), (0, 0, 0, 0))
        laser_draw = ImageDraw.Draw(laser_glow)
        laser_draw.rectangle([0, split_y - 6, OUT_W, split_y + 6], fill=(255, 20, 20, 180))
        laser_glow = laser_glow.filter(ImageFilter.GaussianBlur(8))
        img = Image.alpha_composite(img, laser_glow)
        draw = ImageDraw.Draw(img)
        draw.rectangle([0, split_y - 2, OUT_W, split_y + 2], fill=(255, 60, 60, 255))

        # Bottom Bar: 1546 to 1920px (Deep obsidian black for subtitles)
        draw.rectangle([0, 1546, OUT_W, OUT_H], fill=(0, 0, 0, 255))

        # Bottom Attribution Pill at y = 1850
        arial_path = "/System/Library/Fonts/Supplemental/Arial.ttf"
        if not os.path.exists(arial_path):
            arial_path = FONT_PATH
        font_pill = ImageFont.truetype(arial_path, 24)
        pill_text = f"ORIGINAL: {creator_upper} • {credit_suffix.upper()}"
        pb = draw.textbbox((0, 0), pill_text, font=font_pill)
        pw, ph = pb[2] - pb[0], pb[3] - pb[1]
        px = (OUT_W - pw) // 2
        py = 1850

        pad_x, pad_y = 28, 10
        draw.rounded_rectangle([px - pad_x, py - pad_y, px + pw + pad_x, py + ph + pad_y],
                               radius=16, fill=(20, 20, 25, 240), outline=(60, 60, 70, 255), width=1)
        draw.text((px, py), pill_text, font=font_pill, fill=(200, 200, 210, 255))

    else:
        # Black / Blur Layout: Standard 3-Zone (0 to 490px top, 1430 to 1920px bottom)
        draw.rectangle([0, 0, OUT_W, 490], fill=(0, 0, 0, 255))
        draw.rectangle([0, 1430, OUT_W, OUT_H], fill=(0, 0, 0, 255))

        for i in range(20):
            alpha = int(255 * (1.0 - i / 20.0))
            draw.line([(0, 490 + i), (OUT_W, 490 + i)], fill=(0, 0, 0, alpha))
            draw.line([(0, 1430 - i), (OUT_W, 1430 - i)], fill=(0, 0, 0, alpha))

        font_size_line1 = 82
        font_size_line2 = 94
        font1 = ImageFont.truetype(FONT_PATH, font_size_line1)
        font2 = ImageFont.truetype(FONT_PATH, font_size_line2)

        b1 = draw.textbbox((0, 0), creator_upper, font=font1)
        w1, h1 = b1[2] - b1[0], b1[3] - b1[1]

        b2 = draw.textbbox((0, 0), hook_upper, font=font2)
        w2, h2 = b2[2] - b2[0], b2[3] - b2[1]

        max_w = OUT_W - 80
        if w2 > max_w:
            scale = max_w / w2
            font_size_line2 = max(54, int(font_size_line2 * scale))
            font2 = ImageFont.truetype(FONT_PATH, font_size_line2)
            b2 = draw.textbbox((0, 0), hook_upper, font=font2)
            w2, h2 = b2[2] - b2[0], b2[3] - b2[1]

        y1 = 150
        x1 = (OUT_W - w1) // 2
        y2 = y1 + h1 + 45
        x2 = (OUT_W - w2) // 2

        glow_layer = Image.new("RGBA", (OUT_W, OUT_H), (0, 0, 0, 0))
        glow_draw = ImageDraw.Draw(glow_layer)
        glow_rgba = (255, 20, 20, 255) if glow_color == "#FF1A1A" else (255, 180, 0, 255)
        for spread in [4, 8, 14, 20, 28]:
            for dx, dy in [(-spread, 0), (spread, 0), (0, -spread), (0, spread), (-spread, -spread), (spread, spread)]:
                glow_draw.text((x2 + dx, y2 + dy), hook_upper, font=font2, fill=glow_rgba)
        glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(18))
        img = Image.alpha_composite(img, glow_layer)
        draw = ImageDraw.Draw(img)

        draw.text((x1, y1), creator_upper, font=font1, fill=(255, 255, 255, 255),
                  stroke_width=5, stroke_fill=(0, 0, 0, 255))
        bright_red = (255, 30, 30, 255) if glow_color == "#FF1A1A" else (255, 210, 0, 255)
        draw.text((x2, y2), hook_upper, font=font2, fill=bright_red,
                  stroke_width=4, stroke_fill=(30, 0, 0, 255))

    # Bottom Creator Credit Pill (for black / blur layout)
    if layout != "split":
        credit_font = ImageFont.truetype(FONT_PATH, 28)
        credit_text = f"ORIGINAL: {creator_upper} • {credit_suffix.upper()}"
        c_bbox = draw.textbbox((0, 0), credit_text, font=credit_font)
        cw, ch = c_bbox[2] - c_bbox[0], c_bbox[3] - c_bbox[1]
        cx = (OUT_W - cw) // 2
        cy = 1780

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

    img.save(output_png, "PNG")
    return output_png

# ── Generate Outro Card Overlay PNG ───────────────────────────────────────────
def create_outro_overlay(
    output_png: Path,
    question_text: str = "GTA 6 WORTH THE 12-YEAR WAIT? 👇",
    tag_text: str = "⚡ VIRAL GAMING COMMUNITY",
    cta_text: str = "🔥 FOLLOW @viralpod.in FOR DAILY BANGERS",
) -> Path:
    """
    Renders a futuristic dark glassmorphism Outro Card in the lower zone (y = 1530 to 1830)
    to drive high follower conversion and comment debate.
    """
    img = Image.new("RGBA", (OUT_W, OUT_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    card_x1, card_y1 = 60, 1530
    card_x2, card_y2 = OUT_W - 60, 1830

    draw.rounded_rectangle([card_x1, card_y1, card_x2, card_y2], radius=24, fill=(10, 15, 25, 245), outline=(255, 30, 30, 255), width=3)
    draw.line([(card_x1 + 30, card_y1), (card_x2 - 30, card_y1)], fill=(255, 80, 80, 255), width=5)

    arial_bold = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
    if not os.path.exists(arial_bold):
        arial_bold = FONT_PATH

    font_tag = ImageFont.truetype(arial_bold, 22)
    font_q = ImageFont.truetype(FONT_PATH, 44)
    font_cta = ImageFont.truetype(arial_bold, 24)

    tb = draw.textbbox((0, 0), tag_text, font=font_tag)
    tw = tb[2] - tb[0]
    draw.text(((OUT_W - tw) // 2, card_y1 + 20), tag_text, font=font_tag, fill=(255, 190, 0, 255))

    qb = draw.textbbox((0, 0), question_text, font=font_q)
    qw = qb[2] - qb[0]
    draw.text(((OUT_W - qw) // 2, card_y1 + 65), question_text, font=font_q, fill=(255, 255, 255, 255))

    btn_w, btn_h = 640, 62
    btn_x = (OUT_W - btn_w) // 2
    btn_y = card_y1 + 145
    draw.rounded_rectangle([btn_x, btn_y, btn_x + btn_w, btn_y + btn_h], radius=31, fill=(255, 20, 40, 255))
    bb = draw.textbbox((0, 0), cta_text, font=font_cta)
    bw = bb[2] - bb[0]
    draw.text(((OUT_W - bw) // 2, btn_y + 18), cta_text, font=font_cta, fill=(255, 255, 255, 255))

    img.save(output_png, "PNG")
    return output_png

# ── Composite Video with FFmpeg ────────────────────────────────────────────────
def render_reel_video(
    source_video: Path,
    start_sec: float,
    duration: float,
    overlay_png: Path,
    output_mp4: Path,
    fps: int = 60,
    layout: str = "black",
    ass_path: Path = None,
    split_crops: dict = None,
    enable_outro: bool = True,
    outro_question: str = "GTA 6 WORTH THE 12-YEAR WAIT? 👇",
) -> bool:
    """
    Broadcast-grade FFmpeg compositor supporting:
    - 3 Layouts: 'split' (facecam + full 16:9 gameplay), 'blur', 'black'
    - Embedded kinetic karaoke subtitles (.ass)
    - Animated Outro Card in last 2.8s for engagement retention
    - EBU R128 loudness normalization (-14 LUFS standard)
    - 60 FPS Studio Master (CRF 15, Lanczos + Unsharp)
    """
    print(f"\n🎬 Rendering Broadcast 9:16 Reel: {output_mp4.name}")
    print(f"   Time window: {start_sec:.1f}s → {start_sec + duration:.1f}s ({duration:.1f}s)")
    print(f"   Layout: {layout.upper()} | Subtitles: {'YES' if ass_path else 'NO'} | FPS: {fps}")

    # Prepare subtitle filter string if enabled
    ass_filter = ""
    if ass_path and ass_path.exists():
        escaped_ass = str(ass_path).replace("\\", "/").replace(":", "\\:").replace("'", "\\'")
        ass_filter = f",ass='{escaped_ass}'"

    # Outro Card setup
    outro_png = None
    outro_start = 0.0
    if enable_outro and duration > 6.0:
        outro_start = round(duration - 2.8, 2)
        outro_png = ASSETS_DIR / f"outro_{output_mp4.stem}.png"
        create_outro_overlay(outro_png, question_text=outro_question)

    inputs = [
        FFMPEG_BIN, "-y",
        "-ss", str(start_sec),
        "-i", str(source_video),
        "-i", str(overlay_png),
    ]
    if outro_png and outro_png.exists():
        inputs += ["-i", str(outro_png)]

    inputs += ["-t", str(duration)]

    if layout == "split":
        # Split layout: Facecam Top + Full 16:9 Gameplay Bottom (Zero Character Cut-off)
        fc = split_crops["facecam_crop"]
        gp = split_crops["gameplay_crop"]

        filter_complex = (
            f"[0:v]split=2[v_fc][v_gp];"
            f"[v_fc]crop={fc['w']}:{fc['h']}:{fc['x']}:{fc['y']},"
            f"scale={OUT_W}:710:flags=lanczos,"
            f"unsharp=5:5:0.7:5:5:0.0[fc_scaled];"
            f"[v_gp]scale={OUT_W}:608:flags=lanczos,"
            f"unsharp=5:5:0.6:5:5:0.0,"
            f"eq=contrast=1.06:brightness=0.01:saturation=1.12[gp_scaled];"
            f"color=c=black:s={OUT_W}x{OUT_H}:r={fps}:d={duration}[bg];"
            f"[bg][fc_scaled]overlay=0:220[bg_fc];"
            f"[bg_fc][gp_scaled]overlay=0:938[v_split];"
            f"[v_split][1:v]overlay=0:0:format=auto[v_over]"
        )
        if outro_png and outro_png.exists():
            filter_complex += f";[v_over][2:v]overlay=0:0:enable='gte(t,{outro_start})':format=auto{ass_filter}[outv]"
        else:
            filter_complex += f";[v_over]null{ass_filter}[outv]"

    elif layout == "blur":
        # Cinematic blurred background + sharpened 16:9 center video
        filter_complex = (
            f"[0:v]scale={OUT_W}:{OUT_H}:force_original_aspect_ratio=increase,"
            f"crop={OUT_W}:{OUT_H},"
            f"boxblur=30:5,"
            f"colorchannelmixer=aa=1:rr=0.45:gg=0.45:bb=0.45[bg];"
            f"[0:v]scale={OUT_W}:-2:flags=lanczos,"
            f"unsharp=5:5:0.7:5:5:0.0[scaled_vid];"
            f"[bg][scaled_vid]overlay=(W-w)/2:(H-h)/2[base];"
            f"[base][1:v]overlay=0:0:format=auto[v_over]"
        )
        if outro_png and outro_png.exists():
            filter_complex += f";[v_over][2:v]overlay=0:0:enable='gte(t,{outro_start})':format=auto{ass_filter}[outv]"
        else:
            filter_complex += f";[v_over]null{ass_filter}[outv]"

    else:
        # Inky deep black letterbox
        filter_complex = (
            f"[0:v]scale={OUT_W}:-2:flags=lanczos,"
            f"unsharp=5:5:0.7:5:5:0.0[scaled_vid];"
            f"color=c=black:s={OUT_W}x{OUT_H}:r={fps}:d={duration}[bg];"
            f"[bg][scaled_vid]overlay=(W-w)/2:(H-h)/2[base];"
            f"[base][1:v]overlay=0:0:format=auto[v_over]"
        )
        if outro_png and outro_png.exists():
            filter_complex += f";[v_over][2:v]overlay=0:0:enable='gte(t,{outro_start})':format=auto{ass_filter}[outv]"
        else:
            filter_complex += f";[v_over]null{ass_filter}[outv]"

    cmd = inputs + [
        "-filter_complex", filter_complex,
        "-map", "[outv]",
        "-map", "0:a?",
        "-af", "loudnorm=I=-14:LRA=7:tp=-1.5",
        "-c:v", "libx264",
        "-profile:v", "high",
        "-level", "4.2",
        "-crf", "15",
        "-preset", "slow",
        "-b:v", "12M",
        "-maxrate", "16M",
        "-bufsize", "24M",
        "-pix_fmt", "yuv420p",
        "-colorspace", "bt709",
        "-color_primaries", "bt709",
        "-color_trc", "bt709",
        "-color_range", "pc",
        "-r", str(fps),
        "-c:a", "aac",
        "-b:a", "320k",
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
    print(f"✅ Rendered in Master Ultra-HD: {output_mp4.name} ({size_mb:.1f} MB, {fps}fps)")
    return True

# ── Main ───────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Render 9:16 reaction reel matching CarryMinati/Ashim YT style")
    parser.add_argument("--video-id", required=True, help="Video ID of downloaded file")
    parser.add_argument("--creator", default="CARRY MINATI", help="Creator name for Line 1 (default: CARRY MINATI)")
    parser.add_argument("--hook", default=None, help="Action hook for Line 2 (e.g. CRAZY REACTION)")
    parser.add_argument("--start", type=float, default=None, help="Custom start second (optional)")
    parser.add_argument("--duration", type=float, default=None, help="Custom duration in seconds (optional)")
    parser.add_argument("--layout", choices=["black", "blur", "split"], default="split", help="Layout: 'split', 'black', or 'blur' (default: split)")
    parser.add_argument("--ass", help="Path to custom .ass karaoke subtitle file")
    parser.add_argument("--no-subtitles", action="store_true", help="Disable karaoke subtitles")
    parser.add_argument("--outro-question", default="GTA 6 WORTH THE 12-YEAR WAIT? 👇", help="Question for the outro card")
    parser.add_argument("--no-outro", action="store_true", help="Disable outro card")
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

    # Subtitles detection
    ass_path = None
    if not args.no_subtitles:
        if args.ass:
            p = Path(args.ass)
            if p.exists():
                ass_path = p
        else:
            default_ass = CAPTIONS_DIR / f"{video_id}_karaoke.ass"
            if default_ass.exists():
                ass_path = default_ass

    # Facecam crops detection for split layout
    split_crops = None
    if args.layout == "split":
        # Check if detect_facecam can be run
        from detect_facecam import detect_streamer_facecam
        print("\n🔍 Running OpenCV Facecam & Streamer Tracking...")
        split_crops = detect_streamer_facecam(source_file, num_samples=12)

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
        clips_to_render.append({
            "clip_number": 1,
            "start": 0.0,
            "duration": 40.0,
            "hook_title": args.hook or "CRAZY REACTION",
            "hook_text": args.hook or "CRAZY REACTION"
        })

    print(f"\n🎨 Processing {len(clips_to_render)} reaction clips for ID: {video_id}")
    print(f"   Creator Name: {args.creator} | Layout: {args.layout.upper()}")

    rendered_files = []
    for c in clips_to_render:
        clip_num = c["clip_number"]
        hook_str = c["hook_title"]

        # Generate custom overlay PNG for this clip
        overlay_png = ASSETS_DIR / f"header_overlay_{video_id}_clip{clip_num:02d}_{args.layout}.png"
        create_header_overlay(
            creator_name=args.creator,
            hook_text=hook_str,
            output_png=overlay_png,
            glow_color="#FF1A1A",
            layout=args.layout,
        )

        out_name = f"{video_id}_clip{clip_num:02d}_{args.layout}_reel.mp4"
        out_mp4 = OUTPUT_DIR / out_name
        ok = render_reel_video(
            source_video=source_file,
            start_sec=c["start"],
            duration=c["duration"],
            overlay_png=overlay_png,
            output_mp4=out_mp4,
            layout=args.layout,
            ass_path=ass_path,
            split_crops=split_crops,
            enable_outro=not args.no_outro,
            outro_question=args.outro_question,
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
