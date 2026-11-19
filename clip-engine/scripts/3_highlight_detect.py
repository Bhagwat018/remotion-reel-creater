#!/usr/bin/env python3
"""
SCRIPT 3: AI Highlight Detection (Gemini Flash)
================================================
Whisper transcript lelo → Gemini 2.0 Flash ko bhejo →
AI best 3-5 viral clips detect kare → clips metadata save karo

Usage:
  python 3_highlight_detect.py --video-id abc123
  python 3_highlight_detect.py --video-id abc123 --clips 5 --duration 45
"""

import argparse
import json
import os
import sys
import urllib.request
import urllib.error
from pathlib import Path

# ── Paths ──────────────────────────────────────────────────────────────────────
ROOT = Path(__file__).parent.parent
CAPTIONS_DIR = ROOT / "captions"
ENV_FILE = ROOT.parent / ".env"

# ── Load API Key from .env ─────────────────────────────────────────────────────
def load_gemini_key() -> str:
    key = os.environ.get("GEMINI_API_KEY")
    if key:
        return key
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().splitlines():
            if line.startswith("GEMINI_API_KEY="):
                return line.split("=", 1)[1].strip()
    sys.exit("❌ GEMINI_API_KEY not found. Set in .env or environment.")

# ── Call Gemini API ────────────────────────────────────────────────────────────
def call_gemini(prompt: str, api_key: str) -> str:
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"
    payload = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": 0.3,
            "responseMimeType": "application/json",
        }
    }).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read())
            return data["candidates"][0]["content"]["parts"][0]["text"]
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        sys.exit(f"❌ Gemini API error {e.code}: {body[:300]}")

# ── Build Prompt ───────────────────────────────────────────────────────────────
def build_highlight_prompt(segments: list, clip_count: int, min_dur: int, max_dur: int, topic: str = "") -> str:
    transcript_text = "\n".join(
        f"[{s['start']:.1f}s - {s['end']:.1f}s]: {s['text']}"
        for s in segments
    )
    total_duration = segments[-1]["end"] if segments else 0

    return f"""You are a viral video editor AI. Analyze this YouTube video transcript and find the {clip_count} most viral-worthy highlight clips.

Video topic hint: "{topic if topic else 'Gaming / Trending'}"
Total duration: {total_duration:.0f} seconds

TRANSCRIPT:
{transcript_text}

TASK:
Find exactly {clip_count} clips that are most likely to go viral as a short-form video (YouTube Shorts / Instagram Reels).

Look for moments with:
- Genuine shock, surprise, or hype reactions
- Funny moments, fails, or unexpected events
- Big reveals or first-time reactions
- High-energy peaks or emotional moments
- Quotable or controversial statements

Each clip must be between {min_dur} and {max_dur} seconds long.
Start clips slightly before the peak moment for context.
Do not overlap clips.

Return ONLY a valid JSON array (no markdown, no explanation):
[
  {{
    "clip_number": 1,
    "start": 12.5,
    "end": 55.0,
    "hook_title": "Short punchy title for this clip (max 8 words)",
    "hook_text": "The exact quote or description of the viral moment",
    "viral_score": 95,
    "reason": "Why this clip will go viral (1 sentence)"
  }},
  ...
]"""

# ── Detect Highlights ──────────────────────────────────────────────────────────
def detect_highlights(video_id: str, clip_count: int, min_dur: int, max_dur: int, topic: str = "") -> list:
    transcript_path = CAPTIONS_DIR / f"{video_id}_words.json"
    if not transcript_path.exists():
        sys.exit(f"❌ Transcript not found: {transcript_path}\n   Run: python 2_transcribe.py --file ../downloads/{video_id}.mp4")

    with open(transcript_path) as f:
        data = json.load(f)

    segments = data.get("segments", [])
    if not segments:
        sys.exit("❌ No segments found in transcript. Try re-transcribing.")

    print(f"\n🧠 Sending {len(segments)} segments to Gemini 2.0 Flash...")
    print(f"   Looking for {clip_count} clips of {min_dur}-{max_dur}s each...")

    api_key = load_gemini_key()
    prompt = build_highlight_prompt(segments, clip_count, min_dur, max_dur, topic)
    response_text = call_gemini(prompt, api_key)

    try:
        clips = json.loads(response_text)
    except json.JSONDecodeError:
        # Try extracting JSON array from response
        import re
        match = re.search(r"\[.*\]", response_text, re.DOTALL)
        if match:
            clips = json.loads(match.group())
        else:
            sys.exit(f"❌ Gemini returned invalid JSON:\n{response_text[:500]}")

    # Validate and fix clips
    valid_clips = []
    for c in clips:
        start = float(c.get("start", 0))
        end = float(c.get("end", 0))
        duration = end - start

        if duration < 10:
            print(f"  ⚠️  Clip {c.get('clip_number')} too short ({duration:.1f}s), skipping")
            continue

        # Clamp to requested duration range
        if duration > max_dur:
            end = start + max_dur
        elif duration < min_dur:
            end = start + min_dur

        valid_clips.append({
            "clip_number": c.get("clip_number", len(valid_clips) + 1),
            "start": round(start, 2),
            "end": round(end, 2),
            "duration": round(end - start, 2),
            "hook_title": c.get("hook_title", "Viral Clip"),
            "hook_text": c.get("hook_text", ""),
            "viral_score": c.get("viral_score", 80),
            "reason": c.get("reason", ""),
        })

    # Sort by viral score
    valid_clips.sort(key=lambda x: x["viral_score"], reverse=True)

    # Save results
    output_path = CAPTIONS_DIR / f"{video_id}_highlights.json"
    with open(output_path, "w") as f:
        json.dump(valid_clips, f, indent=2)

    return valid_clips

# ── Main ───────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="AI Highlight Detection with Gemini")
    parser.add_argument("--video-id", required=True, help="Video ID (stem of downloaded file)")
    parser.add_argument("--clips", type=int, default=3, help="Number of clips to find")
    parser.add_argument("--min-dur", type=int, default=30, help="Minimum clip duration in seconds")
    parser.add_argument("--max-dur", type=int, default=60, help="Maximum clip duration in seconds")
    parser.add_argument("--topic", type=str, default="", help="Topic hint for better AI detection")
    args = parser.parse_args()

    clips = detect_highlights(
        video_id=args.video_id,
        clip_count=args.clips,
        min_dur=args.min_dur,
        max_dur=args.max_dur,
        topic=args.topic,
    )

    print(f"\n🎯 Detected {len(clips)} highlight clips:\n")
    for c in clips:
        print(f"  Clip {c['clip_number']} | ⚡ Viral Score: {c['viral_score']}/100")
        print(f"    Title: {c['hook_title']}")
        print(f"    Time:  {c['start']}s → {c['end']}s ({c['duration']}s)")
        print(f"    Why:   {c['reason']}")
        print()

    output_path = CAPTIONS_DIR / f"{args.video_id}_highlights.json"
    print(f"💾 Saved: {output_path}")
    print(f"\n✂️  Ready to cut clips!")
    print(f"   Run next: python 4_clip_and_crop.py --video-id {args.video_id}")

if __name__ == "__main__":
    main()
