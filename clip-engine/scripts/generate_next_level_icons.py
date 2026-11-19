#!/usr/bin/env python3
"""
Generate Next-Level Icon-Dominant Profile Pictures for @viralpod.in
====================================================================
Designed specifically for mobile Instagram circle avatar (readable at 32x32px!):
- Big, bold, screen-dominant central glyphs (fills 65-70% of the circle)
- 0% AI slop: Pure graphic design studio geometry, clean angles & crisp contrast
- Anti-aliased 2x supersampling (2160x2160 -> 1080x1080)
"""

import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).parent.parent
PFP_DIR = ROOT / "assets" / "pfp"
PFP_DIR.mkdir(parents=True, exist_ok=True)

SIZE = 2160
OUT_SIZE = 1080

FONT_ARIAL_BLACK = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
FONT_IMPACT = "/System/Library/Fonts/Supplemental/Impact.ttf"

# ── CONCEPT 1: The "Lightning Play" (Hype, Fast, High Voltage) ────────────────
def generate_icon_lightning_play():
    """
    Massive geometric Play Triangle with an aggressive diagonal lightning cut.
    Colors: Deep Void Black (#060709) + Electric Neon Yellow (#FFE600) + Pure White.
    Instantly recognizable at 24px in comments and stories!
    """
    img = Image.new("RGBA", (SIZE, SIZE), (6, 7, 9, 255))
    draw = ImageDraw.Draw(img)
    cx, cy = SIZE // 2, SIZE // 2

    # Subtle modern outer circular guide ring
    r_outer = int(SIZE * 0.44)
    draw.ellipse(
        [cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer],
        outline=(26, 28, 36, 255),
        width=12
    )

    # Big Play Triangle coordinates (centered with visual optical weight offset)
    # Left base: x = cx - 280, top = cy - 420, bot = cy + 420
    # Right tip: x = cx + 400, cy
    tri_x_left = cx - 250
    tri_x_tip  = cx + 380
    tri_y_top  = cy - 380
    tri_y_bot  = cy + 380

    # Upper polygon of split play triangle (Pure Crisp White)
    draw.polygon([
        (tri_x_left, tri_y_top),
        (tri_x_tip - 30, cy - 30),
        (cx - 30, cy - 30),
        (tri_x_left, cy - 140),
    ], fill=(255, 255, 255, 255))

    # Lower polygon of play triangle (Electric Neon Yellow)
    draw.polygon([
        (tri_x_left, cy + 30),
        (cx + 40, cy + 30),
        (tri_x_tip, cy + 10),
        (tri_x_left, tri_y_bot),
    ], fill=(255, 230, 0, 255))

    # Center High-Voltage Lightning Slash (Connecting & cutting through)
    draw.polygon([
        (cx - 160, cy - 70),
        (cx + 120, cy - 70),
        (cx - 20, cy + 90),
        (cx + 160, cy + 90),
        (cx - 90, cy + 240),
        (cx - 10, cy + 40),
        (cx - 180, cy + 40),
    ], fill=(255, 230, 0, 255))

    final_img = img.resize((OUT_SIZE, OUT_SIZE), Image.Resampling.LANCZOS)
    out_path = PFP_DIR / "icon_01_lightning_play.png"
    final_img.save(out_path, "PNG")
    print(f"✅ Generated: {out_path.name}")
    return out_path

# ── CONCEPT 2: The "Cyber V-Flame" (Viral Equalizer / Podcast Pulse) ────────────
def generate_icon_v_pulse():
    """
    Bold stylized V formed by dynamic audio/frequency pillars.
    Represents podcast mics + audio waves + viral energy.
    Colors: Electric Crimson Red (#FF2233) + Pure White on Dark Obsidian (#08080C).
    """
    img = Image.new("RGBA", (SIZE, SIZE), (8, 8, 12, 255))
    draw = ImageDraw.Draw(img)
    cx, cy = SIZE // 2, SIZE // 2

    # Dynamic 5-pillar V-formation with rounded caps
    # Pillar widths: 110px, spacing: 55px
    pw = 120
    gap = 48
    
    # Coordinates of 5 vertical bars forming a deep dynamic V
    bars = [
        # (offset_x from center, top_y, bottom_y, color)
        (-340, cy - 420, cy + 180, (255, 255, 255, 255)),  # Outer Left
        (-170, cy - 240, cy + 300, (255, 255, 255, 255)),  # Mid Left
        (0,    cy - 60,  cy + 420, (255, 34, 51, 255)),    # Center Base V (Crimson Red)
        (170,  cy - 240, cy + 300, (255, 34, 51, 255)),    # Mid Right (Crimson)
        (340,  cy - 420, cy + 180, (255, 34, 51, 255)),    # Outer Right (Crimson)
    ]

    for bx, by1, by2, col in bars:
        x1 = cx + bx - pw // 2
        x2 = cx + bx + pw // 2
        # Rounded capsule
        radius = pw // 2
        draw.rounded_rectangle([x1, by1, x2, by2], radius=radius, fill=col)

    # Iconic glowing white dot floating right above center bar (recording / live signal)
    dot_r = 45
    draw.ellipse([cx - dot_r, cy - 180 - dot_r, cx + dot_r, cy - 180 + dot_r], fill=(255, 255, 255, 255))

    final_img = img.resize((OUT_SIZE, OUT_SIZE), Image.Resampling.LANCZOS)
    out_path = PFP_DIR / "icon_02_v_pulse_flame.png"
    final_img.save(out_path, "PNG")
    print(f"✅ Generated: {out_path.name}")
    return out_path

# ── CONCEPT 3: The "Interlocking VP Monogram" (Luxury Streetwear / Media House) ──
def generate_icon_interlocking_vp():
    """
    Interlocking modern 'V' and 'P' monogram.
    Clean architectural angles, high fashion & media house vibe (like Off-White / Fear of God / Complex).
    Colors: Charcoal (#0A0B0E) + Ultra White + Safety Orange / Hot Gold accent (#FF9900).
    """
    img = Image.new("RGBA", (SIZE, SIZE), (10, 11, 14, 255))
    draw = ImageDraw.Draw(img)
    cx, cy = SIZE // 2, SIZE // 2

    # Circular rim accent
    r_circle = int(SIZE * 0.44)
    draw.ellipse(
        [cx - r_circle, cy - r_circle, cx + r_circle, cy + r_circle],
        outline=(30, 32, 42, 255),
        width=10
    )

    # Thick, precision-crafted interlocking VP strokes
    stroke_w = 140

    # 1. The 'V' Geometry (White)
    v_left_x = cx - 360
    v_tip_x = cx - 60
    v_tip_y = cy + 340
    v_top_y = cy - 340

    # Left leg of V
    draw.polygon([
        (v_left_x, v_top_y),
        (v_left_x + stroke_w, v_top_y),
        (v_tip_x + stroke_w // 2, v_tip_y),
        (v_tip_x - stroke_w // 2, v_tip_y),
    ], fill=(255, 255, 255, 255))

    # Right leg of V (rises up to join P)
    draw.polygon([
        (v_tip_x - stroke_w // 2, v_tip_y),
        (v_tip_x + stroke_w // 2, v_tip_y),
        (cx + 140, cy - 80),
        (cx + 20, cy - 80),
    ], fill=(255, 255, 255, 255))

    # 2. The 'P' Geometry (Electric Gold/Orange #FF9900)
    p_stem_x = cx + 80
    p_top_y = cy - 340
    p_bot_y = cy + 340

    # Vertical stem of P
    draw.rounded_rectangle(
        [p_stem_x, p_top_y, p_stem_x + stroke_w, p_bot_y],
        radius=30,
        fill=(255, 153, 0, 255)
    )

    # Loop of P
    p_loop_r = 180
    draw.ellipse(
        [p_stem_x, p_top_y, p_stem_x + stroke_w + p_loop_r * 2 - 40, p_top_y + p_loop_r * 2 - 20],
        fill=(255, 153, 0, 255)
    )
    # Inner cutout of P loop (revealing black background)
    inner_pad = stroke_w - 20
    draw.ellipse(
        [p_stem_x + inner_pad, p_top_y + inner_pad, p_stem_x + stroke_w + p_loop_r * 2 - 40 - inner_pad, p_top_y + p_loop_r * 2 - 20 - inner_pad],
        fill=(10, 11, 14, 255)
    )

    final_img = img.resize((OUT_SIZE, OUT_SIZE), Image.Resampling.LANCZOS)
    out_path = PFP_DIR / "icon_03_interlocking_vp.png"
    final_img.save(out_path, "PNG")
    print(f"✅ Generated: {out_path.name}")
    return out_path

# ── CONCEPT 4: The "Broadcast Play Capsule" (Minimalist Swiss Media) ───────────
def generate_icon_broadcast_capsule():
    """
    Sleek tilted media capsule with a massive cutout play button.
    Very clean, looks like Spotify / Sony Music / Red Bull Media House.
    Colors: Matte Obsidian (#07080B) + Hyper Electric Lime/Neon (#00FF88).
    """
    img = Image.new("RGBA", (SIZE, SIZE), (7, 8, 11, 255))
    draw = ImageDraw.Draw(img)
    cx, cy = SIZE // 2, SIZE // 2

    # Circular disc background with radiant neon ring
    r_disc = int(SIZE * 0.40)
    draw.ellipse(
        [cx - r_disc, cy - r_disc, cx + r_disc, cy + r_disc],
        fill=(16, 18, 24, 255),
        outline=(0, 255, 136, 255),
        width=18
    )

    # Inner glowing neon play icon (Large, bold, perfectly balanced)
    tri_r = 210
    tri_cx = cx + 25  # optical center adjustment
    draw.polygon([
        (tri_cx - tri_r * 0.75, cy - tri_r),
        (tri_cx - tri_r * 0.75, cy + tri_r),
        (tri_cx + tri_r * 1.15, cy),
    ], fill=(0, 255, 136, 255))

    # Two dynamic soundwave arcs outside the ring
    for arc_r, width in [(r_disc + 70, 14), (r_disc + 130, 10)]:
        draw.arc([cx - arc_r, cy - arc_r, cx + arc_r, cy + arc_r], start=35, end=145, fill=(0, 255, 136, 180), width=width)
        draw.arc([cx - arc_r, cy - arc_r, cx + arc_r, cy + arc_r], start=215, end=325, fill=(0, 255, 136, 180), width=width)

    final_img = img.resize((OUT_SIZE, OUT_SIZE), Image.Resampling.LANCZOS)
    out_path = PFP_DIR / "icon_04_broadcast_capsule.png"
    final_img.save(out_path, "PNG")
    print(f"✅ Generated: {out_path.name}")
    return out_path

if __name__ == "__main__":
    generate_icon_lightning_play()
    generate_icon_v_pulse()
    generate_icon_interlocking_vp()
    generate_icon_broadcast_capsule()
    print("\n🎉 All 4 brand icons generated successfully!")
