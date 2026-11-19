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
def search_youtube(topic: str, max_results: int = 5, max_duration_mins: int = 180) -> list[dict]:
    """Search YouTube and return top videos sorted by view count, filtering out 5-10hr streams."""
    ytdlp = find_ytdlp()
    print(f"\n🔍 Searching YouTube: '{topic}' (top {max_results} results, <= {max_duration_mins} mins)...")

    cmd = [
        ytdlp,
        f"ytsearch{max_results * 3}:{topic}",
        "--print", "%(id)s\t%(duration)s\t%(view_count)s\t%(uploader)s\t%(title)s",
        "--no-playlist",
        "--skip-download",
        "--quiet",
    ]

    result = subprocess.run(cmd, capture_output=True, text=True)
    videos = []

    for line in result.stdout.strip().splitlines():
        parts = line.split("\t")
        if len(parts) >= 5:
            try:
                raw_dur = parts[1].strip()
                dur = int(raw_dur) if raw_dur.isdigit() else 0
                if dur > max_duration_mins * 60 or dur < 30:
                    continue

                raw_views = parts[2].strip()
                views = int(raw_views) if raw_views.isdigit() else 0

                videos.append({
                    "id": parts[0].strip(),
                    "duration": dur,
                    "views": views,
                    "uploader": parts[3].strip(),
                    "title": parts[4].strip(),
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
def download_video(url: str, video_id: str = None, section: str = None, filename_suffix: str = "") -> Path:
    """Download video in best quality to downloads/ folder, with optional partial section slicing."""
    ytdlp = find_ytdlp()

    if not video_id:
        video_id = url.split("v=")[-1].split("&")[0] if "v=" in url else url.split("/")[-1]

    target_name = f"{video_id}{filename_suffix}"
    output_path = DOWNLOADS_DIR / f"{target_name}.%(ext)s"
    final_path = DOWNLOADS_DIR / f"{target_name}.mp4"

    if final_path.exists():
        print(f"\n✅ Already downloaded: {final_path.name}")
        return final_path

    print(f"\n⬇️  Downloading: {url}")
    if section:
        print(f"   ⚡ Slicing Section: {section} (Partial Download - Fast!)")
    print(f"   Output: {output_path}")

    cmd = [
        ytdlp,
        url,
        "-f", "bestvideo[height<=2160][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=2160]+bestaudio/best[height<=2160]/best",
        "--merge-output-format", "mp4",
        "-o", str(output_path),
        "--no-playlist",
        "--progress",
    ]
    if os.path.exists("/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg"):
        cmd += ["--ffmpeg-location", "/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg"]
    if section:
        cmd += ["--download-sections", section, "--force-keyframes-at-cuts"]

    result = subprocess.run(cmd)

    if result.returncode != 0:
        sys.exit(f"❌ Download failed for: {url}")

    downloaded = list(DOWNLOADS_DIR.glob(f"{target_name}.*"))
    if not downloaded:
        sys.exit("❌ File not found after download.")

    actual_file = downloaded[0]
    print(f"\n✅ Downloaded: {actual_file.name} ({actual_file.stat().st_size / 1024 / 1024:.1f} MB)")

    # Save metadata
    meta_path = DOWNLOADS_DIR / f"{target_name}_meta.json"
    with open(meta_path, "w") as f:
        json.dump({
            "id": video_id,
            "target_name": target_name,
            "url": url,
            "file": str(actual_file),
            "section": section,
        }, f, indent=2)

    return actual_file

# ── Main ───────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Search & Download YouTube videos for clipping")
    parser.add_argument("--topic", type=str, help='Search topic e.g. "GTA 6 launch reaction"')
    parser.add_argument("--url", type=str, help="Direct YouTube URL to download")
    parser.add_argument("--max-results", type=int, default=5, help="Max search results to show")
    parser.add_argument("--pick", type=int, default=1, help="Which result to download (1 = top viewed)")
    parser.add_argument("--auto-peak", action="store_true", help="Auto-detect YouTube heatmap viral peak & download only that 45s slice")
    args = parser.parse_args()

    # Import heatmap peak extractor if auto-peak requested
    extract_peaks_fn = None
    if args.auto_peak:
        try:
            from detect_heatmap_peaks import extract_heatmap_peaks
            extract_peaks_fn = extract_heatmap_peaks
        except ImportError:
            sys.path.insert(0, str(Path(__file__).parent))
            from detect_heatmap_peaks import extract_heatmap_peaks
            extract_peaks_fn = extract_heatmap_peaks

    if args.url:
        target_url = args.url
        v_id = target_url.split("v=")[-1].split("&")[0] if "v=" in target_url else target_url.split("/")[-1]
        
        section_slice = None
        suffix = ""
        if args.auto_peak and extract_peaks_fn:
            peaks = extract_peaks_fn(target_url, top_k=1, clip_duration=45)
            if peaks:
                section_slice = peaks[0]["section_syntax"]
                suffix = "_peak01"
                print(f"\n⚡ Auto-Peak Locked: {peaks[0]['timestamp_str']} ({section_slice})")

        downloaded = download_video(target_url, v_id, section=section_slice, filename_suffix=suffix)
        print(f"\n🎬 Ready for processing: {downloaded}")
    else:
        # Search then download
        videos = search_youtube(args.topic, args.max_results)
        if not videos:
            sys.exit("❌ No videos found.")

        pick_idx = min(args.pick - 1, len(videos) - 1)
        chosen = videos[pick_idx]
        print(f"\n🎯 Picking video #{args.pick}: {chosen['title']}")

        section_slice = None
        suffix = ""
        if args.auto_peak and extract_peaks_fn:
            peaks = extract_peaks_fn(chosen["url"], top_k=1, clip_duration=45)
            if peaks:
                section_slice = peaks[0]["section_syntax"]
                suffix = "_peak01"
                print(f"\n⚡ Auto-Peak Locked: {peaks[0]['timestamp_str']} ({section_slice})")

        downloaded = download_video(chosen["url"], chosen["id"], section=section_slice, filename_suffix=suffix)
        print(f"\n🎬 Ready for processing: {downloaded}")

        # Save search results for reference
        results_path = DOWNLOADS_DIR / f"{chosen['id']}_search_results.json"
        with open(results_path, "w") as f:
            json.dump({"query": args.topic, "results": videos}, f, indent=2)

if __name__ == "__main__":
    main()
