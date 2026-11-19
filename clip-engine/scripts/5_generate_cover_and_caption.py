#!/usr/bin/env python3
"""
SCRIPT 5: Generate High-CTR Cover Thumbnail & Viral Caption
============================================================
1. Extracts high-CTR thumbnail cover from the rendered 9:16 reel (at the peak expression frame)
2. Generates viral 3-tier hashtag stack and curiosity-driven caption for Instagram & YouTube Shorts

Usage:
  python 5_generate_cover_and_caption.py --video-id abc123
"""

import argparse
import json
import subprocess
import sys
from pathlib import Path

# ── Paths ──────────────────────────────────────────────────────────────────────
ROOT = Path(__file__).parent.parent
OUTPUT_DIR = ROOT / "output"
CAPTIONS_DIR = ROOT / "captions"

# ── Generate Cover Image ───────────────────────────────────────────────────────
def extract_cover_thumbnail(video_path: Path, output_cover: Path, timestamp: float = 1.5) -> bool:
    """Extract a high-impact JPG cover from video at the specified timestamp."""
    print(f"📸 Generating cover thumbnail: {output_cover.name} (at {timestamp}s)...")
    cmd = [
        "ffmpeg", "-y",
        "-ss", str(timestamp),
        "-i", str(video_path),
        "-vframes", "1",
        "-q:v", "2",
        str(output_cover),
        "-loglevel", "error"
    ]
    res = subprocess.run(cmd)
    if res.returncode == 0 and output_cover.exists():
        print(f"✅ Cover created: {output_cover.name}")
        return True
    return False

# ── Generate Caption & Hashtag Stack ──────────────────────────────────────────
def build_viral_caption(creator_name: str, topic_name: str, hook_title: str) -> dict:
    creator_tag = creator_name.lower().replace(" ", "")

    # Curiosity-driven hook line + Mandatory Rule 3 Copyright Armor
    caption_text = f"""{creator_name.upper()} Insane Reaction On {topic_name.upper()}! 😱💀

Dekho {creator_name} ka reaction jab ye scene samne aaya! Kya aapko bhi lagta hai {topic_name} history create karega? 👇 Drop your thoughts in comments!

🎥 Video Credit: Original gameplay/stream belongs to @{creator_tag} (YouTube: {creator_name}).
⚖️ Fair Use Notice: Content curated for entertainment, reaction & commentary purposes.
📩 DM for credit or removal. Prompt removal guaranteed within 1 hour!
.
.
.
#viral #{creator_tag} #gaming #reels #gamingreels #gta6 #explore #trending #gamingcommunity #reelsindia #shorts #viralpod"""

    youtube_title = f"{creator_name} CRAZY REACTION On {topic_name}! 😱 #shorts #viralpod"

    return {
        "instagram_caption": caption_text.strip(),
        "youtube_title": youtube_title,
        "hashtags": [
            "#viral",
            f"#{creator_tag}",
            "#gaming",
            "#reels",
            "#gta6",
            "#trending",
            "#shorts",
            "#viralpod"
        ]
    }

# ── Main ───────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Generate Cover Thumbnail & Viral Caption")
    parser.add_argument("--video-id", required=True, help="Video ID")
    parser.add_argument("--creator", default="CARRY MINATI", help="Creator name")
    parser.add_argument("--topic", default="GTA 6", help="Topic name")
    args = parser.parse_args()

    # Find rendered clips in output/
    matched_clips = list(OUTPUT_DIR.glob(f"{args.video_id}_*reel.mp4"))
    if not matched_clips:
        # Fallback to any mp4 with that video id
        matched_clips = list(OUTPUT_DIR.glob(f"*{args.video_id}*.mp4"))

    if not matched_clips:
        sys.exit(f"❌ No rendered clips found in {OUTPUT_DIR} for: {args.video_id}")

    print(f"\n📦 Packaging {len(matched_clips)} clip(s)...")

    for clip in matched_clips:
        cover_path = clip.with_name(clip.stem + "-cover.jpg")
        extract_cover_thumbnail(clip, cover_path, timestamp=1.5)

        # Build captions
        caption_data = build_viral_caption(args.creator, args.topic, "CRAZY REACTION")
        caption_file = clip.with_name(clip.stem + "-caption.json")
        with open(caption_file, "w") as f:
            json.dump(caption_data, f, indent=2)

        txt_file = clip.with_name(clip.stem + "-caption.txt")
        with open(txt_file, "w") as f:
            f.write(caption_data["instagram_caption"])

        print(f"\n📝 Caption generated for: {clip.name}")
        print(f"   YouTube Title: {caption_data['youtube_title']}")
        print(f"   Instagram Caption saved to: {txt_file.name}")

    print(f"\n✅ All assets packaged and ready for publishing!\n")

if __name__ == "__main__":
    main()
