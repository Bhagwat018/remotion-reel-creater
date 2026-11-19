#!/usr/bin/env python3
"""
Generate Broadcast-Grade Brand Profile Pictures for @viralpod.in
==================================================================
Creates 3 ultra-clean, minimalist, human-designer quality profile pictures:
- Not AI-generated (no weird 3D chrome, no uncanny AI artefacts)
- True Swiss typography + bold geometric iconography
- 1080x1080 resolution, 100% circle-safe for Instagram
"""

import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).parent.parent
PFP_DIR = ROOT / "assets" / "pfp"
PFP_DIR.mkdir(parents=True, exist_ok=True)

# Render size: 2160x2160 for high-end 2x supersampling anti-aliasing
SIZE = 2160
OUT_SIZE = 1080

FONT_IMPACT = "/System/Library/Fonts/Supplemental/Impact.ttf"
FONT_ARIAL_BLACK = "/System/Library/Fonts/Supplemental/Arial Black.ttf"

def make_circle_mask(size):
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size, size), fill=255)
    return mask

# ── DESIGN 1: The Modern Media Monogram (Electric Yellow + Obsidian) ───────────
def generate_design_1():
    """
    Sleek, iconic monogram: Bold geometric 'V' with integrated play-arrow & soundwave accent.
    Palette: Matte Charcoal Obsidian (#090A0F) + Electric Signal Yellow (#FFE500) + Pure White.
    Vibe: Overtime / Complex / High-end Media Brand.
    """
    img = Image.new("RGBA", (SIZE, SIZE), (9, 10, 15, 255))
    draw = ImageDraw.Draw(img)

    cx, cy = SIZE // 2, SIZE // 2

    # Subtle inner circular border ring (adds depth to Instagram circle crop)
    ring_radius = int(SIZE * 0.45)
    draw.ellipse(
        [cx - ring_radius, cy - ring_radius, cx + ring_radius, cy + ring_radius],
        outline=(25, 28, 38, 255),
        width=10,
    )

    # Main Geometric 'V' Monogram + Play Glyph
    # Left arm of V (Crisp White)
    v_top_y = cy - 380
    v_bot_y = cy + 220
    v_left_x = cx - 360
    v_center_x = cx - 50

    draw.polygon([
        (v_left_x, v_top_y),
        (v_left_x + 160, v_top_y),
        (v_center_x + 80, v_bot_y),
        (v_center_x - 60, v_bot_y),
    ], fill=(255, 255, 255, 255))

    # Right arm of V that transforms into an Electric Yellow Play Arrow / Wedge
    v_right_x = cx + 360
    draw.polygon([
        (v_right_x, v_top_y),
        (v_right_x - 160, v_top_y),
        (v_center_x + 30, v_bot_y - 80),
        (v_center_x + 130, v_bot_y - 20),
    ], fill=(255, 229, 0, 255))

    # Centered glowing Play Dot / Satellite in Electric Yellow
    dot_radius = 50
    dot_cx = cx + 80
    dot_cy = cy - 140
    draw.ellipse(
        [dot_cx - dot_radius, dot_cy - dot_radius, dot_cx + dot_radius, dot_cy + dot_radius],
        fill=(255, 229, 0, 255)
    )

    # Wordmark below: 'VIRALPOD' in ultra-bold tracked font
    font_sub = ImageFont.truetype(FONT_ARIAL_BLACK, 110)
    text = "VIRALPOD"
    bbox = draw.textbbox((0, 0), text, font=font_sub)
    tw = bbox[2] - bbox[0]
    draw.text((cx - tw // 2, cy + 440), text, font=font_sub, fill=(255, 255, 255, 255))

    # Downscale with high quality Lanczos
    final_img = img.resize((OUT_SIZE, OUT_SIZE), Image.Resampling.LANCZOS)
    out_path = PFP_DIR / "viralpod_pfp_option1_iconic_yellow.png"
    final_img.save(out_path, "PNG")
    print(f"✅ Generated: {out_path.name}")
    return out_path

# ── DESIGN 2: Editorial Street/Media Wordmark (Bold Red Accent) ────────────────
def generate_design_2():
    """
    Massive 'VP' typography mark with electric red dot on deep black.
    Vibe: Hypebeast / Barstool / Netflix / Editorial.
    """
    img = Image.new("RGBA", (SIZE, SIZE), (6, 6, 8, 255))
    draw = ImageDraw.Draw(img)

    cx, cy = SIZE // 2, SIZE // 2 - 40

    # Massive Bold Monogram 'VP'
    font_vp = ImageFont.truetype(FONT_IMPACT, 720)
    text_vp = "VP"
    bbox = draw.textbbox((0, 0), text_vp, font=font_vp)
    vw, vh = bbox[2] - bbox[0], bbox[3] - bbox[1]

    draw.text((cx - vw // 2, cy - vh // 2 - 40), text_vp, font=font_vp, fill=(255, 255, 255, 255))

    # Electric Crimson Dot on the P
    dot_radius = 70
    dot_cx = cx + vw // 2 + 50
    dot_cy = cy + vh // 2 - 120
    draw.ellipse(
        [dot_cx - dot_radius, dot_cy - dot_radius, dot_cx + dot_radius, dot_cy + dot_radius],
        fill=(255, 30, 45, 255)
    )

    # Sleek bottom subtitle badge: 'VIRALPOD.IN'
    font_badge = ImageFont.truetype(FONT_ARIAL_BLACK, 95)
    text_b = "VIRALPOD.IN"
    b_bbox = draw.textbbox((0, 0), text_b, font=font_badge)
    bw, bh = b_bbox[2] - b_bbox[0], b_bbox[3] - b_bbox[1]
    bx = cx - bw // 2
    by = cy + 460

    # Red accent line above badge
    line_w = 400
    draw.line([(cx - line_w // 2, by - 40), (cx + line_w // 2, by - 40)], fill=(255, 30, 45, 255), width=12)
    draw.text((bx, by), text_b, font=font_badge, fill=(230, 230, 235, 255))

    final_img = img.resize((OUT_SIZE, OUT_SIZE), Image.Resampling.LANCZOS)
    out_path = PFP_DIR / "viralpod_pfp_option2_bold_vp.png"
    final_img.save(out_path, "PNG")
    print(f"✅ Generated: {out_path.name}")
    return out_path

# ── DESIGN 3: Minimalist Modern Media Disc (Broadcast Wave / Play Button) ───────
def generate_design_3():
    """
    Sleek Broadcast Radar + Play Icon.
    Palette: Matte Black + Neon Cyan / Cobalt Blue (#00E5FF).
    Vibe: Modern Tech & Entertainment Media / Podcast Studio.
    """
    img = Image.new("RGBA", (SIZE, SIZE), (8, 9, 14, 255))
    draw = ImageDraw.Draw(img)

    cx, cy = SIZE // 2, SIZE // 2 - 50

    # Modern segmented outer soundwave / radar rings
    for r, width, color in [
        (480, 16, (35, 40, 55, 255)),
        (380, 20, (0, 229, 255, 140)),
        (280, 26, (0, 229, 255, 255)),
    ]:
        # Draw clean arc segments (broadcasting feel)
        draw.arc([cx - r, cy - r, cx + r, cy + r], start=30, end=150, fill=color, width=width)
        draw.arc([cx - r, cy - r, cx + r, cy + r], start=210, end=330, fill=color, width=width)

    # Solid Center Circle
    inner_r = 180
    draw.ellipse(
        [cx - inner_r, cy - inner_r, cx + inner_r, cy + inner_r],
        fill=(0, 229, 255, 255)
    )

    # Sharp Black Play Triangle inside center circle
    tri_size = 85
    tri_x = cx + 15
    draw.polygon([
        (tri_x - tri_size * 0.7, cy - tri_size),
        (tri_x - tri_size * 0.7, cy + tri_size),
        (tri_x + tri_size * 1.1, cy),
    ], fill=(8, 9, 14, 255))

    # Clean typography at bottom
    font_main = ImageFont.truetype(FONT_ARIAL_BLACK, 115)
    text = "VIRALPOD"
    bbox = draw.textbbox((0, 0), text, font=font_main)
    tw = bbox[2] - bbox[0]
    draw.text((cx - tw // 2, cy + 460), text, font=font_main, fill=(255, 255, 255, 255))

    final_img = img.resize((OUT_SIZE, OUT_SIZE), Image.Resampling.LANCZOS)
    out_path = PFP_DIR / "viralpod_pfp_option3_cyan_broadcast.png"
    final_img.save(out_path, "PNG")
    print(f"✅ Generated: {out_path.name}")
    return out_path

if __name__ == "__main__":
    generate_design_1()
    generate_design_2()
    generate_design_3()
    print("\n🎉 All 3 profile pictures successfully rendered in: assets/pfp/")
