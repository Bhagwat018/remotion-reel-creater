#!/usr/bin/env python3
"""
VIRALPOD 2.0: Automated Facecam & Streamer Tracking (Split-Screen Layout Engine)
================================================================================
Uses OpenCV YuNet deep learning to detect streamer facecam in gaming livestreams:
- Samples keyframes across video duration
- Clusters detected faces by spatial consistency (streamers stay in one place)
- Computes optimal Facecam Crop (Top 45% zoom) and Gameplay Crop (Bottom 55%)
- Produces FFmpeg-ready crop filter parameters
"""

import argparse
import json
import os
import sys
from pathlib import Path
import cv2
import numpy as np

ROOT = Path(__file__).parent.parent
MODELS_DIR = ROOT / "models"
MODEL_PATH = MODELS_DIR / "face_detection_yunet_2023mar.onnx"
ASSETS_DIR = ROOT / "assets"
ASSETS_DIR.mkdir(exist_ok=True)

def ensure_model_exists():
    """Ensure YuNet ONNX model is present."""
    if not MODEL_PATH.exists():
        MODELS_DIR.mkdir(exist_ok=True)
        import urllib.request
        url = "https://github.com/opencv/opencv_zoo/raw/main/models/face_detection_yunet/face_detection_yunet_2023mar.onnx"
        print(f"📥 Downloading YuNet Face Detection model (227 KB)...")
        urllib.request.urlretrieve(url, MODEL_PATH)

def detect_streamer_facecam(
    video_path: Path,
    num_samples: int = 12,
    min_confidence: float = 0.70,
    face_padding_scale: float = 2.4,
    save_preview: bool = True,
) -> dict:
    """
    Analyzes video keyframes to locate the streamer's facecam box.
    Returns crop coordinates for both facecam and gameplay.
    """
    ensure_model_exists()

    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        print(f"❌ Error opening video: {video_path}")
        return None

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    duration = total_frames / fps
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    detector = cv2.FaceDetectorYN_create(str(MODEL_PATH), "", (w, h), min_confidence)

    # Sample timestamps evenly (avoiding extreme 0s start)
    sample_times = np.linspace(min(2.0, duration * 0.1), duration * 0.9, num_samples)
    detected_faces = []
    preview_frames = []

    for t in sample_times:
        frame_idx = int(t * fps)
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        if not ret:
            continue

        if len(preview_frames) < 3:
            preview_frames.append((t, frame.copy()))

        detector.setInputSize((w, h))
        _, faces = detector.detect(frame)
        if faces is not None:
            for f in faces:
                bx, by, bw, bh = f[0:4]
                conf = float(f[-1])
                detected_faces.append({
                    "time": t,
                    "x": float(bx),
                    "y": float(by),
                    "w": float(bw),
                    "h": float(bh),
                    "conf": conf,
                    "cx": float(bx + bw / 2.0),
                    "cy": float(by + bh / 2.0),
                })

    cap.release()

    if not detected_faces:
        print("⚠️ No streamer face detected across sampled frames. Using fallback center-crop.")
        return get_fallback_crops(w, h)

    # Cluster detected faces by spatial center proximity (grid of 80px)
    clusters = []
    for f in detected_faces:
        matched = False
        for c in clusters:
            # Distance between centers
            dist = np.hypot(f["cx"] - c["cx"], f["cy"] - c["cy"])
            if dist < 180: # within 180px in 2K/1080p frame
                c["items"].append(f)
                # Update running average center
                c["cx"] = np.mean([item["cx"] for item in c["items"]])
                c["cy"] = np.mean([item["cy"] for item in c["items"]])
                matched = True
                break
        if not matched:
            clusters.append({
                "cx": f["cx"],
                "cy": f["cy"],
                "items": [f]
            })

    # The streamer face is the cluster with the MOST detections across time
    clusters.sort(key=lambda c: len(c["items"]), reverse=True)
    best_cluster = clusters[0]

    cluster_faces = best_cluster["items"]
    avg_cx = float(np.mean([item["cx"] for item in cluster_faces]))
    avg_cy = float(np.mean([item["cy"] for item in cluster_faces]))
    avg_w = float(np.mean([item["w"] for item in cluster_faces]))
    avg_h = float(np.mean([item["h"] for item in cluster_faces]))
    avg_conf = float(np.mean([item["conf"] for item in cluster_faces]))

    # Calculate Facecam Crop Box (Head + Upper Body)
    # Target top portion size in 1080x1920 reel: 1080 x 710 (aspect ratio 1.52)
    # Use 2.8x face width to capture head, expression, headset and chair tightly
    target_crop_w = int(avg_w * 2.8)
    target_crop_h = int(target_crop_w * (710.0 / 1080.0))

    # Center crop around face, 44% headroom for natural eye-line framing
    crop_x = int(avg_cx - target_crop_w / 2)
    crop_y = int(avg_cy - target_crop_h * 0.44)

    # Clamp to video bounds
    crop_x = max(0, min(crop_x, w - target_crop_w))
    crop_y = max(0, min(crop_y, h - target_crop_h))
    target_crop_w = min(target_crop_w, w - crop_x)
    target_crop_h = min(target_crop_h, h - crop_y)

    # Gameplay Crop Box: FULL UN-CROPPED 16:9 GAMEPLAY (100% Character & Action Visibility)
    # Display the full 16:9 frame without horizontal cropping so center characters and UI never get cut off
    gp_x = 0
    gp_y = 0
    gameplay_w = w
    gameplay_h = h

    result = {
        "video_w": w,
        "video_h": h,
        "face_detected": True,
        "streamer_cluster_size": len(cluster_faces),
        "total_samples": len(sample_times),
        "confidence": round(avg_conf, 2),
        "face_box": {
            "x": int(avg_cx - avg_w / 2),
            "y": int(avg_cy - avg_h / 2),
            "w": int(avg_w),
            "h": int(avg_h),
        },
        "facecam_crop": {
            "x": crop_x,
            "y": crop_y,
            "w": target_crop_w,
            "h": target_crop_h,
        },
        "gameplay_crop": {
            "x": gp_x,
            "y": gp_y,
            "w": gameplay_w,
            "h": gameplay_h,
        }
    }

    # Save visual preview image
    if save_preview and preview_frames:
        t, p_frame = preview_frames[0]
        # Draw facecam crop box (Cyan)
        cv2.rectangle(
            p_frame,
            (crop_x, crop_y),
            (crop_x + target_crop_w, crop_y + target_crop_h),
            (255, 255, 0),
            4
        )
        # Draw face box (Green)
        fb = result["face_box"]
        cv2.rectangle(
            p_frame,
            (fb["x"], fb["y"]),
            (fb["x"] + fb["w"], fb["y"] + fb["h"]),
            (0, 255, 0),
            3
        )
        # Draw gameplay crop box (Orange)
        cv2.rectangle(
            p_frame,
            (gp_x, gp_y),
            (gp_x + gameplay_w, gp_y + gameplay_h),
            (0, 140, 255),
            4
        )
        preview_path = ASSETS_DIR / f"facecam_preview_{video_path.stem}.jpg"
        cv2.imwrite(str(preview_path), p_frame)
        result["preview_image"] = str(preview_path)
        print(f"📸 Saved Facecam & Gameplay Detection Preview: {preview_path.name}")

    print(f"🎯 Streamer Facecam Found: {len(cluster_faces)}/{len(sample_times)} frames | Conf: {avg_conf:.2f}")
    print(f"   Facecam Crop: x={crop_x}, y={crop_y}, w={target_crop_w}, h={target_crop_h}")
    print(f"   Gameplay Crop: x={gp_x}, y={gp_y}, w={gameplay_w}, h={gameplay_h}")
    return result

def get_fallback_crops(w: int, h: int) -> dict:
    """Fallback if no face is detected."""
    return {
        "video_w": w,
        "video_h": h,
        "face_detected": False,
        "confidence": 0.0,
        "facecam_crop": {
            "x": 0,
            "y": 0,
            "w": int(w * 0.4),
            "h": int(h * 0.5),
        },
        "gameplay_crop": {
            "x": 0,
            "y": 0,
            "w": w,
            "h": h,
        }
    }

def main():
    parser = argparse.ArgumentParser(description="Detect Streamer Facecam & Gameplay for Split-Screen Layout")
    parser.add_argument("--video", required=True, help="Path to video file")
    parser.add_argument("--samples", type=int, default=12, help="Number of sampled frames")
    parser.add_argument("--json-out", help="Path to output JSON")
    args = parser.parse_args()

    vpath = Path(args.video)
    if not vpath.exists():
        sys.exit(f"❌ Video not found: {vpath}")

    res = detect_streamer_facecam(vpath, num_samples=args.samples)
    if args.json_out:
        with open(args.json_out, "w") as f:
            json.dump(res, f, indent=2)
        print(f"💾 Saved crop metadata to: {args.json_out}")
    else:
        print(json.dumps(res, indent=2))

if __name__ == "__main__":
    main()
