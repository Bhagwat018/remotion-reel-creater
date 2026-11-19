#!/usr/bin/env python3
"""
🚀 CLIP ENGINE: MASTER PIPELINE RUNNER
=======================================
End-to-end automated pipeline to turn long YouTube gaming/reaction videos
into viral 9:16 Shorts/Reels matching the CarryMinati/Ashim YT style.

USAGE:
  # Option 1: Direct YouTube URL
  python run_pipeline.py --url "https://www.youtube.com/watch?v=EXAMPLE" --creator "CARRY MINATI"

  # Option 2: Search by Topic
  python run_pipeline.py --topic "Carryminati GTA 6 reaction" --creator "CARRY MINATI"

  # Option 3: Fast Demo with Custom Timestamps
  python run_pipeline.py --url "https://www.youtube.com/watch?v=EXAMPLE" --start 30 --duration 45 --creator "CARRY MINATI" --hook "CRAZY REACTION"
"""

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent
SCRIPTS_DIR = ROOT / "scripts"
DOWNLOADS_DIR = ROOT / "downloads"
OUTPUT_DIR = ROOT / "output"
VENV_PYTHON = ROOT / "venv" / "bin" / "python3"

# Fallback to system python3 if venv not present
PYTHON = str(VENV_PYTHON) if VENV_PYTHON.exists() else sys.executable

def run_step(step_name: str, cmd: list) -> bool:
    print(f"\n{'='*60}")
    print(f"▶️  STEP: {step_name}")
    print(f"{'='*60}")
    print(f"Executing: {' '.join(str(c) for c in cmd)}\n")
    res = subprocess.run([str(c) for c in cmd])
    if res.returncode != 0:
        print(f"❌ Error during step: {step_name}")
        return False
    return True

def main():
    parser = argparse.ArgumentParser(description="Run the end-to-end viral clipping pipeline")
    parser.add_argument("--url", help="Direct YouTube URL to download and clip")
    parser.add_argument("--topic", help="Search topic on YouTube (e.g. 'Carryminati GTA 6 reaction')")
    parser.add_argument("--creator", default="CARRY MINATI", help="Creator name for top header (default: CARRY MINATI)")
    parser.add_argument("--hook", default="CRAZY REACTION", help="Hook text for neon glowing header line")
    parser.add_argument("--clips", type=int, default=1, help="Number of viral clips to produce")
    parser.add_argument("--start", type=float, default=None, help="Specific start time in seconds (optional manual mode)")
    parser.add_argument("--duration", type=float, default=None, help="Clip duration in seconds (default: 35-50s)")
    parser.add_argument("--skip-download", action="store_true", help="Skip download if file already in downloads/")
    parser.add_argument("--skip-transcribe", action="store_true", help="Skip Whisper transcription")
    args = parser.parse_args()

    if not args.url and not args.topic:
        sys.exit("❌ Please specify either --url or --topic")

    video_id = None

    # ── STEP 1: Search & Download ──────────────────────────────────────────────
    if not args.skip_download:
        dl_cmd = [PYTHON, SCRIPTS_DIR / "1_search_and_download.py"]
        if args.url:
            dl_cmd += ["--url", args.url]
            # Extract video_id from URL
            if "v=" in args.url:
                video_id = args.url.split("v=")[1].split("&")[0]
            else:
                video_id = args.url.split("/")[-1].split("?")[0]
        else:
            dl_cmd += ["--topic", args.topic, "--pick", "1"]

        ok = run_step("1. Search & Download Video", dl_cmd)
        if not ok:
            sys.exit(1)

    # If video_id not yet known, inspect downloads directory
    if not video_id:
        # Find latest file in downloads
        files = sorted(DOWNLOADS_DIR.glob("*.mp4"), key=os.path.getmtime, reverse=True)
        if files:
            video_id = files[0].stem
        else:
            sys.exit("❌ Could not determine video_id from downloads directory.")

    print(f"\n🎯 Active Video ID: {video_id}")

    # ── STEP 2 & 3: Transcribe & Highlight Detection (if not manual) ───────────
    if args.start is None:
        if not args.skip_transcribe:
            # Transcribe
            source_file = DOWNLOADS_DIR / f"{video_id}.mp4"
            tx_cmd = [PYTHON, SCRIPTS_DIR / "2_transcribe.py", "--file", str(source_file)]
            ok = run_step("2. Whisper Audio Transcription", tx_cmd)
            if not ok:
                print("⚠️ Transcription failed or skipped. Continuing with fallback highlight detection...")

        # Detect Highlights
        hl_cmd = [
            PYTHON, SCRIPTS_DIR / "3_highlight_detect.py",
            "--video-id", video_id,
            "--clips", str(args.clips),
            "--topic", args.topic or f"{args.creator} reaction"
        ]
        ok = run_step("3. AI Highlight Detection (Gemini 2.0 Flash)", hl_cmd)
        if not ok:
            print("⚠️ Highlight detection failed. Using default highlight window...")

    # ── STEP 4: Render 9:16 Reaction Reel ───────────────────────────────────────
    render_cmd = [
        PYTHON, SCRIPTS_DIR / "4_render_reaction_reel.py",
        "--video-id", video_id,
        "--creator", args.creator,
        "--hook", args.hook
    ]
    if args.start is not None and args.duration is not None:
        render_cmd += ["--start", str(args.start), "--duration", str(args.duration)]

    ok = run_step("4. Composite 9:16 Reaction Reel (Ashim YT / CarryMinati Style)", render_cmd)
    if not ok:
        sys.exit(1)

    # ── STEP 5: Generate Cover & Captions ──────────────────────────────────────
    pkg_cmd = [
        PYTHON, SCRIPTS_DIR / "5_generate_cover_and_caption.py",
        "--video-id", video_id,
        "--creator", args.creator,
        "--topic", "GTA 6"
    ]
    ok = run_step("5. High-CTR Cover & Viral SEO Captions", pkg_cmd)
    if not ok:
        sys.exit(1)

    # Final Announcement
    print(f"\n{'*'*65}")
    print("🚀 PIPELINE FINISHED SUCCESSFULLY!")
    print(f"📁 Check your final ready-to-post clips in: {OUTPUT_DIR}/")
    print(f"{'*'*65}\n")

if __name__ == "__main__":
    main()
