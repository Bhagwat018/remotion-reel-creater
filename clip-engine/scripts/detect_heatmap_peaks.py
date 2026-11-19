#!/usr/bin/env python3
"""
VIRALPOD 2.0: YouTube Heatmap Auto-Peak Detector
==================================================
Extracts YouTube's internal 'Most Replayed' heatmap data in 2-3 seconds
without downloading the video. Pinpoints the exact seconds where millions
of viewers rewinded and replayed the video the most!

Usage:
  python detect_heatmap_peaks.py --url "https://www.youtube.com/watch?v=EXAMPLE"
  python detect_heatmap_peaks.py --url "https://www.youtube.com/watch?v=EXAMPLE" --top 3 --clip-duration 45
"""

import argparse
import json
import subprocess
import sys
from pathlib import Path
from yt_dlp import YoutubeDL

ROOT = Path(__file__).parent.parent
CAPTIONS_DIR = ROOT / "captions"
CAPTIONS_DIR.mkdir(exist_ok=True)

def format_time(seconds: float) -> str:
    m = int(seconds // 60)
    s = int(seconds % 60)
    return f"{m:02d}:{s:02d}"

def extract_heatmap_peaks(
    url: str,
    top_k: int = 3,
    clip_duration: int = 45,
    min_gap_sec: int = 60
) -> list[dict]:
    """
    Extracts YouTube 'Most Replayed' heatmap data and returns the top viral clip windows.
    Zero-download, runs in ~2-3 seconds.
    """
    print(f"\n🔍 Querying YouTube Heatmap ('Most Replayed') for:")
    print(f"   {url}")

    ydl_opts = {
        "skip_download": True,
        "quiet": True,
        "no_warnings": True,
    }

    try:
        with YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
    except Exception as e:
        print(f"❌ Failed to extract metadata: {e}")
        return []

    title = info.get("title", "Unknown Title")
    duration = info.get("duration", 0)
    uploader = info.get("uploader", "Unknown Creator")
    video_id = info.get("id", "unknown")
    heatmap = info.get("heatmap")

    print(f"📺 Title:    {title[:65]}...")
    print(f"👤 Creator:  {uploader} ({format_time(duration)})")

    if not heatmap:
        print("⚠️  No public Heatmap available for this video (video may be brand new or unindexed).")
        return []

    print(f"🔥 Heatmap found with {len(heatmap)} measurement points!")

    # Sort heatmap points by intensity value descending
    sorted_points = sorted(heatmap, key=lambda x: x.get("value", 0), reverse=True)

    peaks = []
    half_dur = clip_duration // 2

    for pt in sorted_points:
        t_center = (pt.get("start_time", 0) + pt.get("end_time", 0)) / 2.0
        val = pt.get("value", 0)

        # Skip points too close to video start or end
        if t_center < 10 or t_center > (duration - 15):
            continue

        # Check for minimum gap with already selected peaks to prevent duplicates
        too_close = False
        for existing in peaks:
            if abs(t_center - existing["center_sec"]) < min_gap_sec:
                too_close = True
                break
        if too_close:
            continue

        # Calculate clip start and end (clamped to video boundaries)
        # Offset start slightly before center (e.g. 18s before, 27s after) for context
        start_sec = max(0, t_center - 18)
        end_sec = min(duration, start_sec + clip_duration)
        start_sec = max(0, end_sec - clip_duration)

        peaks.append({
            "rank": len(peaks) + 1,
            "center_sec": round(t_center, 1),
            "start_sec": round(start_sec, 1),
            "end_sec": round(end_sec, 1),
            "duration": round(end_sec - start_sec, 1),
            "intensity": round(val, 3),
            "timestamp_str": f"{format_time(start_sec)} - {format_time(end_sec)}",
            "section_syntax": f"*{int(start_sec)}-{int(end_sec)}"
        })

        if len(peaks) >= top_k:
            break

    # Save to captions/
    out_file = CAPTIONS_DIR / f"{video_id}_heatmap_peaks.json"
    with open(out_file, "w") as f:
        json.dump({
            "video_id": video_id,
            "title": title,
            "uploader": uploader,
            "duration": duration,
            "peaks": peaks
        }, f, indent=2)

    print(f"\n🎯 Found Top {len(peaks)} Verified Viral Climax Peaks:")
    for p in peaks:
        bar_len = int(p["intensity"] * 20)
        bar = "█" * bar_len + "░" * (20 - bar_len)
        print(f"  #{p['rank']} [{bar}] Score: {p['intensity']:.2f}")
        print(f"     Time:   {p['timestamp_str']} ({p['start_sec']}s → {p['end_sec']}s)")
        print(f"     Slicer: --download-sections \"{p['section_syntax']}\"")
        print()

    print(f"💾 Saved metadata: {out_file.name}")
    return peaks

def main():
    parser = argparse.ArgumentParser(description="Extract YouTube Heatmap Most Replayed Viral Peaks")
    parser.add_argument("--url", required=True, help="YouTube video URL")
    parser.add_argument("--top", type=int, default=3, help="Number of peaks to find (default: 3)")
    parser.add_argument("--clip-duration", type=int, default=45, help="Clip duration in seconds (default: 45)")
    args = parser.parse_args()

    extract_heatmap_peaks(args.url, top_k=args.top, clip_duration=args.clip_duration)

if __name__ == "__main__":
    main()
