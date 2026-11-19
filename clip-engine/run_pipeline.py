#!/usr/bin/env python3
"""
VIRALPOD 2.0: MASTER PIPELINE RUNNER (100% Zero-Cost Autonomous Engine)
========================================================================
End-to-end automated pipeline to turn long streams & viral videos into
high-CTR, broadcast-grade vertical reels for Instagram (@viralpod.in):

PIPELINE STAGES:
1. YouTube Heatmap Auto-Detection: Find exact "Most Replayed" climax (0 guesswork)
2. Partial-Slice Download: Download ONLY the 45s viral window via yt-dlp
3. Whisper Word-Level Transcription: Local Whisper with Apple Silicon GPU acceleration
4. Kinetic Karaoke Subtitle Engine: MrBeast/Hormozi active yellow pop via libass
5. OpenCV Facecam Tracking: Locate streamer webcam & compute optimal crops
6. 60 FPS Ultra-HD Compositor: Split-Screen Meta layout (Top 45% Facecam + Bottom 55% Gameplay)
7. Rule 3 Copyright Armor Packaging: High-CTR cover thumbnail + SEO hashtags + DM takedown disclaimer
8. Automated Publishing: Headless Playwright poster with 9:16 aspect locking

USAGE:
  # Fully automated from YouTube URL with Heatmap Peak + Split Screen + Karaoke Subtitles:
  python run_pipeline.py --url "https://www.youtube.com/watch?v=Ywtya3SHMvU" --auto-peak --creator "CARRY MINATI"

  # Search by topic:
  python run_pipeline.py --topic "Carryminati GTA 6 reaction" --auto-peak --creator "CARRY MINATI"

  # Manual timestamp slice:
  python run_pipeline.py --url "https://www.youtube.com/watch?v=xxxx" --start 120 --duration 45 --creator "CARRY MINATI" --hook "CRAZY REACTION"

  # Auto post to Instagram:
  python run_pipeline.py --url "https://www.youtube.com/watch?v=xxxx" --auto-peak --auto-post
"""

import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent
SCRIPTS_DIR = ROOT / "scripts"
DOWNLOADS_DIR = ROOT / "downloads"
CAPTIONS_DIR = ROOT / "captions"
OUTPUT_DIR = ROOT / "output"
VENV_PYTHON = ROOT / "venv" / "bin" / "python3"

PYTHON = str(VENV_PYTHON) if VENV_PYTHON.exists() else sys.executable

def run_step(step_name: str, cmd: list) -> bool:
    print(f"\n{'='*65}")
    print(f"▶️  STEP: {step_name}")
    print(f"{'='*65}")
    print(f"Executing: {' '.join(str(c) for c in cmd)}\n")
    res = subprocess.run([str(c) for c in cmd])
    if res.returncode != 0:
        print(f"❌ Error during step: {step_name}")
        return False
    return True

def main():
    parser = argparse.ArgumentParser(description="VIRALPOD 2.0 Master Pipeline Runner")
    parser.add_argument("--url", help="Direct video URL (YouTube, Twitter/X, Twitch)")
    parser.add_argument("--topic", help="Search topic on YouTube (e.g. 'Carryminati GTA 6')")
    parser.add_argument("--creator", default="CARRY MINATI", help="Creator name for top header (default: CARRY MINATI)")
    parser.add_argument("--hook", default=None, help="Hook text for neon header line (default: auto from topic/heatmap)")
    parser.add_argument("--auto-peak", action="store_true", help="Auto-detect YouTube heatmap peak and download only that 45s section")
    parser.add_argument("--layout", choices=["split", "blur", "black"], default="split", help="Video layout: 'split', 'blur', or 'black' (default: split)")
    parser.add_argument("--start", type=float, default=None, help="Specific start time in seconds (optional manual mode)")
    parser.add_argument("--duration", type=float, default=None, help="Clip duration in seconds (default: 40s)")
    parser.add_argument("--no-subtitles", action="store_true", help="Disable kinetic karaoke subtitles")
    parser.add_argument("--auto-post", action="store_true", help="Automatically post rendered reel to Instagram (@viralpod.in)")
    parser.add_argument("--skip-download", action="store_true", help="Skip download if already downloaded")
    args = parser.parse_args()

    if not args.url and not args.topic:
        sys.exit("❌ Please specify either --url or --topic")

    video_id = None
    target_video_id = None

    # ── STEP 1: Search & Download (With Heatmap Auto-Detection) ─────────────────
    if not args.skip_download:
        dl_cmd = [PYTHON, SCRIPTS_DIR / "1_search_and_download.py"]
        if args.url:
            dl_cmd += ["--url", args.url]
            if "v=" in args.url:
                video_id = args.url.split("v=")[1].split("&")[0]
            else:
                video_id = args.url.split("/")[-1].split("?")[0]
        else:
            dl_cmd += ["--topic", args.topic, "--pick", "1"]

        if args.auto_peak:
            dl_cmd.append("--auto-peak")
            target_video_id = f"{video_id}_peak01" if video_id else None

        ok = run_step("1. Search & Download (Heatmap Partial-Slicing)", dl_cmd)
        if not ok:
            sys.exit(1)

    # Resolve target video ID in downloads
    if not target_video_id:
        if video_id:
            # Check if peak version exists
            peak_file = DOWNLOADS_DIR / f"{video_id}_peak01.mp4"
            if peak_file.exists():
                target_video_id = f"{video_id}_peak01"
            else:
                target_video_id = video_id
        else:
            # Find latest file in downloads
            files = sorted(DOWNLOADS_DIR.glob("*.mp4"), key=os.path.getmtime, reverse=True)
            if files:
                target_video_id = files[0].stem
            else:
                sys.exit("❌ Could not determine video_id from downloads directory.")

    source_video = DOWNLOADS_DIR / f"{target_video_id}.mp4"
    if not source_video.exists():
        sys.exit(f"❌ Downloaded source video not found: {source_video}")

    print(f"\n🎯 Active Target Video: {source_video.name}")

    # ── STEP 2: Whisper Transcription ──────────────────────────────────────────
    words_json = CAPTIONS_DIR / f"{target_video_id}_words.json"
    if not words_json.exists():
        tx_cmd = [PYTHON, SCRIPTS_DIR / "2_transcribe.py", "--file", str(source_video)]
        ok = run_step("2. Whisper Word-Level Transcription (Apple GPU Metal)", tx_cmd)
        if not ok:
            print("⚠️ Whisper transcription failed. Continuing without subtitles...")

    # ── STEP 3: Kinetic Karaoke Subtitle Engine ────────────────────────────────
    ass_path = None
    if not args.no_subtitles and words_json.exists():
        ass_path = CAPTIONS_DIR / f"{target_video_id}_karaoke.ass"
        sub_cmd = [
            PYTHON, SCRIPTS_DIR / "generate_karaoke_ass.py",
            "--words-json", str(words_json),
            "--output", str(ass_path)
        ]
        ok = run_step("3. Generate Kinetic Karaoke Subtitles (MrBeast / Hormozi Style)", sub_cmd)
        if not ok:
            ass_path = None

    # ── STEP 4: Render Reaction Reel ───────────────────────────────────────────
    hook_text = args.hook or "CRAZY REACTION"
    render_cmd = [
        PYTHON, SCRIPTS_DIR / "4_render_reaction_reel.py",
        "--video-id", target_video_id,
        "--creator", args.creator,
        "--hook", hook_text,
        "--layout", args.layout
    ]

    # For partial sliced videos, start from 0; else use user start or highlights
    if "_peak" in target_video_id:
        render_cmd += ["--start", "0", "--duration", str(args.duration or 40.0)]
    elif args.start is not None and args.duration is not None:
        render_cmd += ["--start", str(args.start), "--duration", str(args.duration)]

    if ass_path and ass_path.exists():
        render_cmd += ["--ass", str(ass_path)]
    elif args.no_subtitles:
        render_cmd.append("--no-subtitles")

    ok = run_step(f"4. Composite Broadcast 9:16 Reel (Layout: {args.layout.upper()})", render_cmd)
    if not ok:
        sys.exit(1)

    # ── STEP 5: Generate Cover & Captions ──────────────────────────────────────
    pkg_cmd = [
        PYTHON, SCRIPTS_DIR / "5_generate_cover_and_caption.py",
        "--video-id", target_video_id,
        "--creator", args.creator,
        "--topic", args.topic or "GTA 6"
    ]
    ok = run_step("5. High-CTR Cover Thumbnail & Copyright Armor Captions", pkg_cmd)
    if not ok:
        sys.exit(1)

    # Find final rendered reel
    rendered_reels = list(OUTPUT_DIR.glob(f"{target_video_id}_*_{args.layout}_reel.mp4"))
    if not rendered_reels:
        rendered_reels = list(OUTPUT_DIR.glob(f"{target_video_id}_*reel.mp4"))

    final_reel = rendered_reels[0] if rendered_reels else None
    print(f"\n🎬 Master Broadcast Reel Ready: {final_reel}")

    # ── STEP 6: Automated Instagram Publishing (Optional) ──────────────────────
    if args.auto_post and final_reel:
        caption_file = final_reel.with_name(final_reel.stem + "-caption.txt")
        caption_text = ""
        if caption_file.exists():
            caption_text = caption_file.read_text(encoding="utf-8").strip()

        print("\n🚀 Publishing automatically to Instagram (@viralpod.in)...")
        post_cmd = [
            "node", str(SCRIPTS_DIR / "post_reel_viralpod.mjs"),
            str(final_reel),
            caption_text
        ]
        run_step("6. Automated Headless Instagram Publisher", post_cmd)

    print(f"\n{'*'*65}")
    print("🎉 VIRALPOD PIPELINE FINISHED SUCCESSFULLY!")
    print(f"📁 Output files: {OUTPUT_DIR}/")
    print(f"{'*'*65}\n")

if __name__ == "__main__":
    main()
