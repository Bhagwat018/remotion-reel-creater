#!/usr/bin/env python3
"""
SCRIPT 4: Clip & Crop to 9:16 Vertical
========================================
Highlight timestamps lelo → FFmpeg se clips cut karo →
9:16 vertical format mein reframe karo (blur background style)
→ clips/ folder mein save karo

Usage:
  python 4_clip_and_crop.py --video-id abc123
  python 4_clip_and_crop.py --video-id abc123 --style center
  python 4_clip_and_crop.py --video-id abc123 --style blur
"""

import argparse
import json
import subprocess
import sys
from pathlib import Path

# ── Paths ──────────────────────────────────────────────────────────────────────
ROOT = Path(__file__).parent.parent
DOWNLOADS_DIR = ROOT / "downloads"
CAPTIONS_DIR  = ROOT / "captions"
CLIPS_DIR     = ROOT / "clips"
CLIPS_DIR.mkdir(exist_ok=True)

# Output: 1080x1920 (9:16 portrait for Reels/Shorts)
OUT_W, OUT_H = 1080, 1920

# ── Find source video ──────────────────────────────────────────────────────────
def find_video(video_id: str) -> Path:
    for ext in [".mp4", ".mkv", ".webm", ".mov"]:
        p = DOWNLOADS_DIR / f"{video_id}{ext}"
        if p.exists():
            return p
    sys.exit(f"❌ Video not found in downloads/ for ID: {video_id}")

# ── Get video dimensions ────────────────────────────────────────────────────────
def get_video_info(video_path: Path) -> dict:
    cmd = [
        "ffprobe", "-v", "quiet",
        "-print_format", "json",
        "-show_streams",
        str(video_path),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    info = json.loads(result.stdout)
    for stream in info.get("streams", []):
        if stream.get("codec_type") == "video":
            return {
                "width": int(stream["width"]),
                "height": int(stream["height"]),
                "duration": float(stream.get("duration", 0)),
            }
    return {"width": 1920, "height": 1080, "duration": 0}

# ── Build FFmpeg filter for 9:16 blur background ───────────────────────────────
def build_blur_filter(src_w: int, src_h: int) -> str:
    """
    Creates cinematic 9:16 output:
    - Background: Scaled + blurred to fill 1080x1920
    - Foreground: Original video centered on top
    """
    # Scale foreground to fit width (1080px wide max)
    fg_w = OUT_W
    fg_h = int(src_h * (OUT_W / src_w))

    # If fg_h > OUT_H, scale by height instead
    if fg_h > OUT_H:
        fg_h = OUT_H
        fg_w = int(src_w * (OUT_H / src_h))

    filter_complex = (
        f"[0:v]scale={OUT_W}:{OUT_H}:force_original_aspect_ratio=increase,"
        f"crop={OUT_W}:{OUT_H},"
        f"boxblur=25:4[bg];"
        f"[0:v]scale={fg_w}:{fg_h}[fg];"
        f"[bg][fg]overlay=(W-w)/2:(H-h)/2[outv]"
    )
    return filter_complex

# ── Build FFmpeg filter for center crop ───────────────────────────────────────
def build_center_crop_filter(src_w: int, src_h: int) -> str:
    """Simple center crop to 9:16."""
    # Crop height to match 9:16 aspect of given width
    crop_h = int(src_w * (OUT_H / OUT_W))
    crop_h = min(crop_h, src_h)
    crop_y = max(0, (src_h - crop_h) // 2)

    filter_complex = (
        f"[0:v]crop={src_w}:{crop_h}:0:{crop_y},"
        f"scale={OUT_W}:{OUT_H}[outv]"
    )
    return filter_complex

# ── Cut + Reframe one clip ─────────────────────────────────────────────────────
def cut_and_crop_clip(
    video_path: Path,
    clip: dict,
    video_info: dict,
    style: str,
    output_path: Path,
) -> bool:
    if output_path.exists():
        print(f"  ✅ Already exists: {output_path.name}")
        return True

    start = clip["start"]
    duration = clip["duration"]
    src_w = video_info["width"]
    src_h = video_info["height"]

    if style == "blur":
        filter_complex = build_blur_filter(src_w, src_h)
    else:
        filter_complex = build_center_crop_filter(src_w, src_h)

    cmd = [
        "ffmpeg", "-y",
        "-ss", str(start),
        "-i", str(video_path),
        "-t", str(duration),
        "-filter_complex", filter_complex,
        "-map", "[outv]",
        "-map", "0:a?",
        "-c:v", "libx264",
        "-crf", "20",
        "-preset", "fast",
        "-c:a", "aac",
        "-b:a", "192k",
        "-movflags", "+faststart",
        str(output_path),
        "-loglevel", "warning",
        "-stats",
    ]

    print(f"\n  ✂️  Cutting clip {clip['clip_number']}: {start}s → {start + duration:.1f}s ({duration:.1f}s)")
    print(f"     Style: {style} | Output: {output_path.name}")

    result = subprocess.run(cmd)
    if result.returncode != 0:
        print(f"  ❌ FFmpeg failed for clip {clip['clip_number']}")
        return False

    size_mb = output_path.stat().st_size / 1024 / 1024
    print(f"  ✅ Saved: {output_path.name} ({size_mb:.1f} MB)")
    return True

# ── Main ───────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Cut & Crop clips to 9:16 vertical")
    parser.add_argument("--video-id", required=True, help="Video ID")
    parser.add_argument("--style", choices=["blur", "center"], default="blur",
                        help="Reframing style: 'blur' (cinematic) or 'center' (simple crop)")
    args = parser.parse_args()

    video_id = args.video_id

    # Load highlights
    highlights_path = CAPTIONS_DIR / f"{video_id}_highlights.json"
    if not highlights_path.exists():
        sys.exit(f"❌ Highlights not found: {highlights_path}\n   Run: python 3_highlight_detect.py --video-id {video_id}")

    with open(highlights_path) as f:
        clips = json.load(f)

    if not clips:
        sys.exit("❌ No clips in highlights JSON.")

    video_path = find_video(video_id)
    video_info = get_video_info(video_path)

    print(f"\n🎬 Source: {video_path.name}")
    print(f"   Resolution: {video_info['width']}x{video_info['height']}")
    print(f"   Duration: {video_info['duration']:.1f}s")
    print(f"   Style: {args.style} | Output: {OUT_W}x{OUT_H} (9:16)")
    print(f"\n✂️  Processing {len(clips)} clips...\n{'─'*50}")

    success_count = 0
    clip_paths = []
    for clip in clips:
        out_name = f"{video_id}_clip{clip['clip_number']:02d}_{args.style}.mp4"
        out_path = CLIPS_DIR / out_name

        ok = cut_and_crop_clip(video_path, clip, video_info, args.style, out_path)
        if ok:
            success_count += 1
            clip_paths.append(str(out_path))
            # Save clip path back to highlight metadata
            clip["cropped_file"] = str(out_path)

    # Update highlights JSON with file paths
    with open(highlights_path, "w") as f:
        json.dump(clips, f, indent=2)

    print(f"\n{'─'*50}")
    print(f"✅ Done! {success_count}/{len(clips)} clips created")
    print(f"\n🔤 Ready to burn captions!")
    print(f"   Run next: python 5_burn_captions.py --video-id {video_id}")

if __name__ == "__main__":
    main()
