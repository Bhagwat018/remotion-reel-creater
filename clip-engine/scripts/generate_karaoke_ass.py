#!/usr/bin/env python3
"""
VIRALPOD 2.0: Kinetic Karaoke Subtitle Engine (MrBeast / Hormozi Style)
========================================================================
Converts Whisper word-level timestamps into broadcast-grade Advanced SubStation
Alpha (.ass) karaoke subtitles:
- 3-5 word readable chunks (never blocks the screen)
- Active spoken word POPS in Neon Yellow (&H0000FFFF&) with 110% scale
- Inactive words stay crisp white with heavy black outline
- Positioned in bottom safe zone (MarginV = 280px)

Usage:
  python generate_karaoke_ass.py --video-id abc123
  python generate_karaoke_ass.py --words-json ../captions/abc123_words.json --output ../captions/abc123_karaoke.ass
"""

import argparse
import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
CAPTIONS_DIR = ROOT / "captions"

# ASS Color Codes (format: &HAABBGGRR)
COLOR_WHITE       = "&H00FFFFFF&"
COLOR_NEON_YELLOW = "&H0000FFFF&"   # Yellow: B=00, G=FF, R=FF
COLOR_CYAN        = "&H00FFFF00&"   # Cyan:   B=FF, G=FF, R=00
COLOR_BLACK       = "&H00000000&"

def format_ass_time(seconds: float) -> str:
    """Format seconds into ASS timestamp: H:MM:SS.cc"""
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = seconds % 60
    return f"{h}:{m:02d}:{s:05.2f}"

def build_ass_header(font_name: str = "Impact", font_size: int = 52, margin_v: int = 210) -> str:
    return f"""[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: KaraokeWord,{font_name},{font_size},{COLOR_WHITE},&H000000FF&,{COLOR_BLACK},&H80000000&,-1,0,0,0,100,100,2,0,1,6,3,2,60,60,{margin_v},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""

def generate_karaoke_ass(
    words_data: list[dict],
    output_ass: Path,
    words_per_line: int = 4,
    highlight_color: str = "&H0000FFFF&",
    font_name: str = "Impact",
    font_size: int = 52,
    margin_v: int = 210,
    time_offset: float = 0.0,
) -> Path:
    """
    Takes an array of word objects: [{"word": "HELLO", "start": 1.2, "end": 1.5}, ...]
    and produces a kinetic karaoke ASS subtitle file.
    """
    if not words_data:
        print("⚠️ No words provided to generate karaoke subtitles.")
        return None

    # Filter & normalize words
    valid_words = []
    import re
    for w in words_data:
        raw_text = str(w.get("word", "")).strip().upper()
        # Strip brackets, tags
        if not raw_text or raw_text.startswith("[") or raw_text.startswith("<"):
            continue
        
        # If it's purely punctuation and we already have a previous word, attach it
        if re.fullmatch(r"[,.!?:;\"'-]+", raw_text):
            if valid_words:
                valid_words[-1]["word"] += raw_text
            continue

        start = max(0.0, float(w.get("start", 0)) - time_offset)
        end = max(start + 0.05, float(w.get("end", start + 0.3)) - time_offset)
        valid_words.append({
            "word": raw_text,
            "start": start,
            "end": end
        })

    if not valid_words:
        print("⚠️ No valid words found after filtering.")
        return None

    # Group words into 3-5 word chunks
    chunks = []
    current_chunk = []
    for i, w in enumerate(valid_words):
        current_chunk.append(w)
        # Split on sentence pauses or max word count
        is_pause = False
        if i < len(valid_words) - 1:
            pause_gap = valid_words[i + 1]["start"] - w["end"]
            if pause_gap > 0.4:
                is_pause = True

        if len(current_chunk) >= words_per_line or is_pause or i == len(valid_words) - 1:
            chunks.append(current_chunk)
            current_chunk = []

    # Generate ASS dialogue events
    dialogue_lines = []

    for chunk in chunks:
        chunk_start = chunk[0]["start"]
        chunk_end = chunk[-1]["end"]

        # For each word in this chunk, create a sub-event where this word is highlighted
        for target_idx, active_word in enumerate(chunk):
            w_start = active_word["start"]
            w_end = active_word["end"]

            # Format the line: active word gets highlight tag + scale pop
            words_in_line = []
            for j, w in enumerate(chunk):
                if j == target_idx:
                    # Active word: glowing yellow + 110% scale pop
                    pop_tag = f"{{\\c{highlight_color}\\fscx108\\fscy108}}{w['word']}{{\\r}}"
                    words_in_line.append(pop_tag)
                else:
                    words_in_line.append(w["word"])

            rendered_text = " ".join(words_in_line)
            start_str = format_ass_time(w_start)
            end_str = format_ass_time(w_end)

            dialogue_lines.append(
                f"Dialogue: 0,{start_str},{end_str},KaraokeWord,,0,0,0,,{rendered_text}"
            )

    ass_content = build_ass_header(font_name, font_size, margin_v) + "\n".join(dialogue_lines) + "\n"

    with open(output_ass, "w", encoding="utf-8") as f:
        f.write(ass_content)

    print(f"✅ Generated Kinetic Karaoke Subtitles: {output_ass.name} ({len(dialogue_lines)} events)")
    return output_ass

def main():
    parser = argparse.ArgumentParser(description="Generate Kinetic Karaoke ASS Subtitles")
    parser.add_argument("--video-id", help="Video ID to read from captions/<video_id>_words.json")
    parser.add_argument("--words-json", help="Direct path to words JSON file")
    parser.add_argument("--output", help="Path to output .ass file")
    parser.add_argument("--offset", type=float, default=0.0, help="Time offset in seconds (e.g. clip start second)")
    parser.add_argument("--font-size", type=int, default=58, help="Font size in px (default: 58)")
    args = parser.parse_args()

    words_file = None
    if args.words_json:
        words_file = Path(args.words_json)
    elif args.video_id:
        words_file = CAPTIONS_DIR / f"{args.video_id}_words.json"

    if not words_file or not words_file.exists():
        sys.exit(f"❌ Words file not found: {words_file}")

    with open(words_file) as f:
        data = json.load(f)

    words = data.get("words", [])
    if not words and isinstance(data, list):
        words = data

    out_path = Path(args.output) if args.output else CAPTIONS_DIR / f"{words_file.stem}_karaoke.ass"
    generate_karaoke_ass(words, out_path, time_offset=args.offset, font_size=args.font_size)

if __name__ == "__main__":
    main()
