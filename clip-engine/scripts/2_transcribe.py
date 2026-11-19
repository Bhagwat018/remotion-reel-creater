#!/usr/bin/env python3
"""
SCRIPT 2: Transcribe with Whisper
===================================
Video file lelo → Audio extract karo → Whisper se
word-level timestamps generate karo → captions/ folder mein save karo

Usage:
  python 2_transcribe.py --file ../downloads/abc123.mp4
  python 2_transcribe.py --file ../downloads/abc123.mp4 --model small
"""

import argparse
import json
import os
import subprocess
import sys
from pathlib import Path

# ── Paths ──────────────────────────────────────────────────────────────────────
ROOT = Path(__file__).parent.parent
CAPTIONS_DIR = ROOT / "captions"
CAPTIONS_DIR.mkdir(exist_ok=True)

WHISPER_CLI = "/opt/homebrew/bin/whisper-cli"   # from existing remotion-reel setup
WHISPER_MODEL = Path.home() / ".cache" / "whisper" / "ggml-base.bin"

# ── Extract Audio ──────────────────────────────────────────────────────────────
def extract_audio(video_path: Path) -> Path:
    """Extract audio from video as 16kHz mono WAV (Whisper requirement)."""
    audio_path = CAPTIONS_DIR / f"{video_path.stem}_audio.wav"

    if audio_path.exists():
        print(f"✅ Audio already extracted: {audio_path.name}")
        return audio_path

    print(f"\n🔊 Extracting audio from: {video_path.name}")
    cmd = [
        "ffmpeg", "-y",
        "-i", str(video_path),
        "-ar", "16000",       # 16kHz sample rate (Whisper requirement)
        "-ac", "1",           # Mono
        "-c:a", "pcm_s16le",  # 16-bit PCM
        str(audio_path),
        "-loglevel", "error",
    ]
    result = subprocess.run(cmd)
    if result.returncode != 0:
        sys.exit("❌ Audio extraction failed.")

    print(f"✅ Audio saved: {audio_path.name}")
    return audio_path

# ── Transcribe with whisper-cli ────────────────────────────────────────────────
def transcribe_whisper_cli(audio_path: Path, video_id: str, language: str = None) -> dict:
    """Use whisper-cli (already installed in the system) for transcription."""
    output_json = CAPTIONS_DIR / f"{video_id}_words.json"

    if output_json.exists():
        print(f"✅ Transcript already exists: {output_json.name}")
        with open(output_json) as f:
            return json.load(f)

    # Find whisper model
    model_path = None
    search_paths = [
        WHISPER_MODEL,
        Path("/opt/homebrew/share/whisper") / "ggml-base.bin",
        Path.home() / "whisper.cpp" / "models" / "ggml-base.bin",
    ]
    for p in search_paths:
        if p.exists():
            model_path = p
            break

    if not model_path:
        print("⚠️  whisper-cli model not found, trying openai-whisper Python package...")
        return transcribe_openai_whisper(audio_path, video_id, language)

    print(f"\n🧠 Transcribing with whisper-cli (model: {model_path.name})...")
    print(f"   Audio: {audio_path.name}")

    output_base = CAPTIONS_DIR / f"{video_id}_raw"
    cmd = [
        WHISPER_CLI,
        "-m", str(model_path),
        "-f", str(audio_path),
        "--output-json",
        "--output-file", str(output_base),
        "--word-thold", "0.01",
    ]
    if language:
        cmd += ["-l", language]

    result = subprocess.run(cmd, capture_output=True, text=True)

    # whisper-cli outputs <output_base>.json
    raw_json_path = Path(str(output_base) + ".json")
    if not raw_json_path.exists():
        print("⚠️  whisper-cli failed, falling back to openai-whisper...")
        return transcribe_openai_whisper(audio_path, video_id, language)

    with open(raw_json_path) as f:
        raw = json.load(f)

    # Parse whisper-cli JSON → standard word format
    words = []
    for segment in raw.get("transcription", []):
        for token in segment.get("tokens", []):
            word = token.get("text", "").strip()
            if word and not word.startswith("["):
                words.append({
                    "word": word,
                    "start": round(token.get("timestamps", {}).get("from_ms", 0) / 1000, 3),
                    "end": round(token.get("timestamps", {}).get("to_ms", 0) / 1000, 3),
                })

    # Build segments too (for highlight detection)
    segments = []
    for segment in raw.get("transcription", []):
        text = segment.get("text", "").strip()
        if text:
            t = segment.get("timestamps", {})
            segments.append({
                "text": text,
                "start": round(t.get("from_ms", 0) / 1000, 3),
                "end": round(t.get("to_ms", 0) / 1000, 3),
            })

    result_data = {"words": words, "segments": segments, "source": "whisper-cli"}
    with open(output_json, "w") as f:
        json.dump(result_data, f, indent=2)

    print(f"✅ Transcribed {len(words)} words, {len(segments)} segments")
    print(f"   Saved: {output_json.name}")
    return result_data

# ── Fallback: openai-whisper Python package ────────────────────────────────────
def transcribe_openai_whisper(audio_path: Path, video_id: str, language: str = None) -> dict:
    """Fallback: use openai-whisper Python package."""
    output_json = CAPTIONS_DIR / f"{video_id}_words.json"

    try:
        import whisper
    except ImportError:
        sys.exit("❌ whisper not installed. Run: pip install openai-whisper")

    print(f"\n🧠 Transcribing with openai-whisper (base model)...")
    model = whisper.load_model("base")

    decode_options = {"word_timestamps": True}
    if language:
        decode_options["language"] = language

    result = model.transcribe(str(audio_path), **decode_options)

    words = []
    segments = []
    for seg in result["segments"]:
        segments.append({
            "text": seg["text"].strip(),
            "start": round(seg["start"], 3),
            "end": round(seg["end"], 3),
        })
        for w in seg.get("words", []):
            words.append({
                "word": w["word"].strip(),
                "start": round(w["start"], 3),
                "end": round(w["end"], 3),
            })

    result_data = {"words": words, "segments": segments, "source": "openai-whisper"}
    with open(output_json, "w") as f:
        json.dump(result_data, f, indent=2)

    print(f"✅ Transcribed {len(words)} words, {len(segments)} segments")
    print(f"   Saved: {output_json.name}")
    return result_data

# ── Main ───────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Transcribe video with Whisper")
    parser.add_argument("--file", required=True, help="Path to downloaded video file")
    parser.add_argument("--model", default="base", choices=["tiny", "base", "small", "medium"],
                        help="Whisper model size (larger = more accurate but slower)")
    parser.add_argument("--lang", default=None, help="Language code e.g. 'en', 'hi' (auto-detect if not set)")
    args = parser.parse_args()

    video_path = Path(args.file)
    if not video_path.exists():
        sys.exit(f"❌ File not found: {video_path}")

    video_id = video_path.stem
    audio_path = extract_audio(video_path)
    transcript = transcribe_whisper_cli(audio_path, video_id, args.lang)

    # Print a preview
    print(f"\n📝 Transcript preview (first 5 segments):")
    for seg in transcript["segments"][:5]:
        print(f"  [{seg['start']:.1f}s → {seg['end']:.1f}s] {seg['text']}")

    print(f"\n🎯 Ready for highlight detection!")
    print(f"   Run next: python 3_highlight_detect.py --video-id {video_id}")

if __name__ == "__main__":
    main()
