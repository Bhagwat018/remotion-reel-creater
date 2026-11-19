#!/usr/bin/env python3
"""
Generate 2 Ultra-Punchy Media Icons (REC Live Badge & Bold Volt V)
"""

from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).parent.parent
PFP_DIR = ROOT / "assets" / "pfp"
SIZE = 2160
OUT_SIZE = 1080

# ── DESIGN 5: The "REC Live Unfiltered" Badge ──────────────────────────────────
def generate_icon_rec_live():
    """
    Iconic Viewfinder Frame + Glowing Red REC dot + sleek 'V' notch.
    Vibe: Behind the Scenes / Leaked / Raw Footage / Uncut Internet.
    """
    img = Image.new("RGBA", (SIZE, SIZE), (8, 9, 12, 255))
    draw = ImageDraw.Draw(img)
    cx, cy = SIZE // 2, SIZE // 2

    # 4 Viewfinder Corner Brackets (White, thick 28px)
    bw = 360  # half width
    bh = 360  # half height
    arm = 140
    thick = 36

    # Top-Left Bracket
    draw.rectangle([cx - bw, cy - bh, cx - bw + arm, cy - bh + thick], fill=(255, 255, 255, 255))
    draw.rectangle([cx - bw, cy - bh, cx - bw + thick, cy - bh + arm], fill=(255, 255, 255, 255))

    # Top-Right Bracket
    draw.rectangle([cx + bw - arm, cy - bh, cx + bw, cy - bh + thick], fill=(255, 255, 255, 255))
    draw.rectangle([cx + bw - thick, cy - bh, cx + bw, cy - bh + arm], fill=(255, 255, 255, 255))

    # Bottom-Left Bracket
    draw.rectangle([cx - bw, cy + bh - thick, cx - bw + arm, cy + bh], fill=(255, 255, 255, 255))
    draw.rectangle([cx - bw, cy + bh - arm, cx - bw + thick, cy + bh], fill=(255, 255, 255, 255))

    # Bottom-Right Bracket
    draw.rectangle([cx + bw - arm, cy + bh - thick, cx + bw, cy + bh], fill=(255, 255, 255, 255))
    draw.rectangle([cx + bw - thick, cy + bh - arm, cx + bw, cy + bh], fill=(255, 255, 255, 255))

    # Center: Massive Pulsing Crimson Red 'REC' Disc with white play triangle inside!
    disc_r = 210
    draw.ellipse([cx - disc_r, cy - disc_r, cx + disc_r, cy + disc_r], fill=(255, 25, 45, 255))

    # Inner White Play Triangle
    tri_r = 95
    tri_cx = cx + 16
    draw.polygon([
        (tri_cx - tri_r * 0.7, cy - tri_r),
        (tri_cx - tri_r * 0.7, cy + tri_r),
        (tri_cx + tri_r * 1.15, cy),
    ], fill=(255, 255, 255, 255))

    final_img = img.resize((OUT_SIZE, OUT_SIZE), Image.Resampling.LANCZOS)
    out_path = PFP_DIR / "icon_05_rec_viewfinder.png"
    final_img.save(out_path, "PNG")
    print(f"✅ Generated: {out_path.name}")
    return out_path

# ── DESIGN 6: The "Giant Volt V" (Overtime / Nike / Media Heavyweight) ──────────
def generate_icon_giant_volt_v():
    """
    Massive, thick, aerodynamic 'V' with integrated Play Chevron cut.
    Colors: Electric Volt Yellow (#FFE600) on Deep Carbon Black (#060709).
    Fills the entire circle screen — maximum impact at any distance!
    """
    img = Image.new("RGBA", (SIZE, SIZE), (6, 7, 9, 255))
    draw = ImageDraw.Draw(img)
    cx, cy = SIZE // 2, SIZE // 2

    # Outer subtle carbon ring
    cr = int(SIZE * 0.45)
    draw.ellipse([cx - cr, cy - cr, cx + cr, cy + cr], outline=(24, 26, 34, 255), width=16)

    # Massive Bold V Wings
    stroke_w = 230
    v_top = cy - 380
    v_bot = cy + 340
    v_left = cx - 440
    v_right = cx + 440

    # Left thick wing of V (Pure White)
    draw.polygon([
        (v_left, v_top),
        (v_left + stroke_w, v_top),
        (cx, v_bot),
        (cx - stroke_w, v_bot - 100),
    ], fill=(255, 255, 255, 255))

    # Right thick wing of V (Electric Volt Yellow #FFE600)
    draw.polygon([
        (v_right, v_top),
        (v_right - stroke_w, v_top),
        (cx - 30, v_bot - 60),
        (cx, v_bot),
    ], fill=(255, 230, 0, 255))

    # Center floating Play Triangle cutout in Carbon Black
    cut_cx = cx + 18
    cut_cy = cy - 60
    cut_r = 110
    draw.polygon([
        (cut_cx - cut_r * 0.75, cut_cy - cut_r),
        (cut_cx - cut_r * 0.75, cut_cy + cut_r),
        (cut_cx + cut_r * 1.15, cut_cy),
    ], fill=(6, 7, 9, 255))

    final_img = img.resize((OUT_SIZE, OUT_SIZE), Image.Resampling.LANCZOS)
    out_path = PFP_DIR / "icon_06_giant_volt_v.png"
    final_img.save(out_path, "PNG")
    print(f"✅ Generated: {out_path.name}")
    return out_path

if __name__ == "__main__":
    generate_icon_rec_live()
    generate_icon_giant_volt_v()
