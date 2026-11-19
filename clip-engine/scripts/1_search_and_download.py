#!/usr/bin/env python3
"""
SCRIPT 1: Search & Download
=============================
Trending topic/keyword lelo → YouTube pe top videos search karo
→ Most viewed video download karo → downloads/ folder mein save karo

Usage:
  python 1_search_and_download.py --topic "GTA 6 launch reaction"
  python 1_search_and_download.py --url "https://youtube.com/watch?v=xxxx"
  python 1_search_and_download.py --topic "GTA 6" --max-results 5
"""

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path

# ── Paths ──────────────────────────────────────────────────────────────────────
ROOT = Path(__file__).parent.parent
DOWNLOADS_DIR = ROOT / "downloads"
DOWNLOADS_DIR.mkdir(exist_ok=True)

YTDLP = "/opt/homebrew/bin/yt-dlp"  # fallback to system yt-dlp

def find_ytdlp():
    for candidate in ["/opt/homebrew/bin/yt-dlp", "yt-dlp"]:
        try:
            subprocess.run([candidate, "--version"], capture_output=True, check=True)
            return candidate
        except Exception:
            continue
    sys.exit("❌ yt-dlp not found. Install: pip install yt-dlp")

# ── Search YouTube ─────────────────────────────────────────────────────────────
def search_youtube(topic: str, max_results: int = 5, max_duration_mins: int = 45) -> list[dict]:
    """Search YouTube and return top videos sorted by view count, filtering out long 5-10hr streams."""
    ytdlp = find_ytdlp()
    print(f"\n🔍 Searching YouTube: '{topic}' (top {max_results} results, <= {max_duration_mins} mins)...")

    cmd = [
        ytdlp,
        f"ytsearch{max_results * 3}:{topic}",
        "--print", "%(id)s|%(title)s|%(view_count)s|%(duration)s|%(uploader)s",
        "--no-playlist",
        "--skip-download",
        "--quiet",
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)
    videos = []

    for line in result.stdout.strip().splitlines():
        parts = line.split("|")
        if len(parts) >= 5:
            try:
                dur = int(parts[3].strip()) if parts[3].strip().isdigit() else 0
                # Filter out videos longer than max_duration_mins (e.g. 45 mins)
                if dur > max_duration_mins * 60 or dur < 60:
                    continue

                videos.append({
                    "id": parts[0].strip(),
                    "title": parts[1].strip(),
                    "views": int(parts[2].strip()) if parts[2].strip().isdigit() else 0,
                    "duration": dur,
                    "uploader": parts[4].strip(),
                    "url": f"https://www.youtube.com/watch?v={parts[0].strip()}"
                })
            except Exception:
                pass

    # Sort by views descending
    videos.sort(key=lambda x: x["views"], reverse=True)
    videos = videos[:max_results]

    print(f"\n📊 Found {len(videos)} videos:")
    for i, v in enumerate(videos):
        mins = v["duration"] // 60
        secs = v["duration"] % 60
        print(f"  {i+1}. [{v['views']:,} views] [{mins}:{secs:02d}] {v['title'][:60]}...")
        print(f"      Channel: {v['uploader']} | URL: {v['url']}")

    return videos

# ── Download Video ─────────────────────────────────────────────────────────────
def download_video(url: str, video_id: str = None) -> Path:
    """Download video in best quality to downloads/ folder."""
    ytdlp = find_ytdlp()

    if not video_id:
        # Extract ID from URL
        video_id = url.split("v=")[-1].split("&")[0] if "v=" in url else url.split("/")[-1]

    output_path = DOWNLOADS_DIR / f"{video_id}.%(ext)s"
    final_path = DOWNLOADS_DIR / f"{video_id}.mp4"

    if final_path.exists():
        print(f"\n✅ Already downloaded: {final_path.name}")
        return final_path

    print(f"\n⬇️  Downloading: {url}")
    print(f"   Output: {output_path}")

    cmd = [
        ytdlp,
        url,
        "-f", "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=1080]+bestaudio/best[height<=1080]",
        "--merge-output-format", "mp4",
        "-o", str(output_path),
        "--no-playlist",
        "--progress",
    ]

    result = subprocess.run(cmd)

    if result.returncode != 0:
        sys.exit(f"❌ Download failed for: {url}")

    # Find the actual downloaded file
    downloaded = list(DOWNLOADS_DIR.glob(f"{video_id}.*"))
    if not downloaded:
        sys.exit("❌ File not found after download.")

    actual_file = downloaded[0]
    print(f"\n✅ Downloaded: {actual_file.name} ({actual_file.stat().st_size / 1024 / 1024:.1f} MB)")

    # Save metadata
    meta_path = DOWNLOADS_DIR / f"{video_id}_meta.json"
    with open(meta_path, "w") as f:
        json.dump({
            "id": video_id,
            "url": url,
            "file": str(actual_file),
        }, f, indent=2)

    return actual_file

# ── Main ───────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Search & Download YouTube videos for clipping")
    parser.add_argument("--topic", type=str, help='Search topic e.g. "GTA 6 launch reaction"')
    parser.add_argument("--url", type=str, help="Direct YouTube URL to download")
    parser.add_argument("--max-results", type=int, default=5, help="Max search results to show")
    parser.add_argument("--pick", type=int, default=1, help="Which result to download (1 = top viewed)")
    args = parser.parse_args()

    if not args.topic and not args.url:
        parser.error("Provide either --topic or --url")

    if args.url:
        # Direct download
        downloaded = download_video(args.url)
        print(f"\n🎬 Ready for transcription: {downloaded}")
        print(f"   Run next: python 2_transcribe.py --file {downloaded}")
    else:
        # Search then download
        videos = search_youtube(args.topic, args.max_results)
        if not videos:
            sys.exit("❌ No videos found.")

        pick_idx = min(args.pick - 1, len(videos) - 1)
        chosen = videos[pick_idx]
        print(f"\n🎯 Picking video #{args.pick}: {chosen['title']}")

        downloaded = download_video(chosen["url"], chosen["id"])
        print(f"\n🎬 Ready for transcription: {downloaded}")
        print(f"   Run next: python 2_transcribe.py --file \"{downloaded}\"")

        # Save search results for reference
        results_path = DOWNLOADS_DIR / f"{chosen['id']}_search_results.json"
        with open(results_path, "w") as f:
            json.dump({"query": args.topic, "results": videos}, f, indent=2)

if __name__ == "__main__":
    main()
