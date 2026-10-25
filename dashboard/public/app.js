// Remotion Reel Studio Pro Frontend Logic
document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const templateSelect = document.getElementById("templateSelect");
  const reelSlugInput = document.getElementById("reelSlug");
  const jsonEditor = document.getElementById("jsonEditor");
  const lineNumbers = document.getElementById("lineNumbers");
  const jsonStatusBadge = document.getElementById("jsonStatusBadge");
  const formatJsonBtn = document.getElementById("formatJsonBtn");
  const jsonFileInput = document.getElementById("jsonFileInput");
  
  const summarySceneCount = document.getElementById("summarySceneCount");
  const summaryDuration = document.getElementById("summaryDuration");
  const summaryCaptions = document.getElementById("summaryCaptions");
  const summaryLoop = document.getElementById("summaryLoop");

  const audioDropzone = document.getElementById("audioDropzone");
  const audioFileInput = document.getElementById("audioFileInput");
  const audioPreview = document.getElementById("audioPreview");
  const audioFileNameDisplay = document.getElementById("audioFileNameDisplay");
  const audioFileSizeDisplay = document.getElementById("audioFileSizeDisplay");
  const audioPlayer = document.getElementById("audioPlayer");
  const audioSourceTag = document.getElementById("audioSourceTag");

  const createReelBtn = document.getElementById("createReelBtn");
  const createBtnText = document.getElementById("createBtnText");

  // Phone Screen Elements
  const phoneIdleState = document.getElementById("phoneIdleState");
  const phoneRenderOverlay = document.getElementById("phoneRenderOverlay");
  const videoContainer = document.getElementById("videoContainer");
  const reelVideoPlayer = document.getElementById("reelVideoPlayer");
  const idleTitle = document.getElementById("idleTitle");
  const idleSub = document.getElementById("idleSub");

  // Render HUD Elements
  const renderPercentDisplay = document.getElementById("renderPercentDisplay");
  const renderProgressBar = document.getElementById("renderProgressBar");
  const renderFramesDisplay = document.getElementById("renderFramesDisplay");
  const renderFpsDisplay = document.getElementById("renderFpsDisplay");
  const renderEtaDisplay = document.getElementById("renderEtaDisplay");
  const renderSlugLabel = document.getElementById("renderSlugLabel");

  // Video Controls Elements
  const playPauseBtn = document.getElementById("playPauseBtn");
  const playIcon = document.getElementById("playIcon");
  const pauseIcon = document.getElementById("pauseIcon");
  const muteBtn = document.getElementById("muteBtn");
  const volumeIcon = document.getElementById("volumeIcon");
  const muteIcon = document.getElementById("muteIcon");
  const videoScrubber = document.getElementById("videoScrubber");
  const scrubberTrack = document.getElementById("scrubberTrack");
  const videoTimeDisplay = document.getElementById("videoTimeDisplay");
  const speedBtn = document.getElementById("speedBtn");
  const fullscreenBtn = document.getElementById("fullscreenBtn");

  // Player Actions
  const playerActionsPanel = document.getElementById("playerActionsPanel");
  const downloadVideoBtn = document.getElementById("downloadVideoBtn");
  const copyVideoPathBtn = document.getElementById("copyVideoPathBtn");
  const reRenderBtn = document.getElementById("reRenderBtn");

  // Terminal & Gallery
  const terminalOutput = document.getElementById("terminalOutput");
  const clearLogsBtn = document.getElementById("clearLogsBtn");
  const refreshReelsBtn = document.getElementById("refreshReelsBtn");
  const reelsGalleryGrid = document.getElementById("reelsGalleryGrid");
  const toastNotification = document.getElementById("toastNotification");

  // State
  let templatesData = {};
  let currentAudioBase64 = null;
  let currentAudioFileName = null;
  let sampleVoiceSlug = "demo-hallucination";
  let activeEventSource = null;
  let isRendering = false;
  let playbackSpeeds = [1.0, 1.25, 1.5, 2.0, 0.75];
  let speedIndex = 0;
  let currentLoadedVideoUrl = null;

  // Initialize
  initApp();

  async function initApp() {
    setupEditorSync();
    setupAudioHandlers();
    setupVideoPlayerControls();
    await loadTemplates();
    await loadReelsGallery();

    // Default select first available template
    if (templatesData["hardcode-topic"]) {
      templateSelect.value = "hardcode-topic";
      applyTemplate("hardcode-topic");
    } else if (templatesData["demo-hallucination"]) {
      templateSelect.value = "demo-hallucination";
      applyTemplate("demo-hallucination");
    }
  }

  // 1. Templates Loading
  async function loadTemplates() {
    try {
      const res = await fetch("/api/templates");
      if (!res.ok) throw new Error("Failed to load templates");
      templatesData = await res.json();
    } catch (err) {
      console.warn("Could not fetch templates:", err);
    }
  }

  templateSelect.addEventListener("change", (e) => {
    applyTemplate(e.target.value);
  });

  function applyTemplate(slug) {
    const tmpl = templatesData[slug];
    if (!tmpl) return;

    reelSlugInput.value = slug;
    jsonEditor.value = JSON.stringify(tmpl.data, null, 2);
    updateLineNumbers();
    validateJsonEditor();

    sampleVoiceSlug = slug;
    currentAudioBase64 = null;
    currentAudioFileName = `${slug}-voice.mp3`;

    if (tmpl.hasVoice && tmpl.voiceSampleUrl) {
      audioPlayer.src = tmpl.voiceSampleUrl;
      audioFileNameDisplay.textContent = `Preset: ${slug}/voice.mp3`;
      audioFileSizeDisplay.textContent = "Attached";
      audioSourceTag.textContent = "Preset Audio Attached";
    }

    idleTitle.textContent = tmpl.title || slug;
    idleSub.textContent = `Template loaded: ${tmpl.sceneCount} scenes. Click "Create & Render Reel" to render.`;
  }

  // 2. Code Editor Sync & Line Numbers
  function setupEditorSync() {
    jsonEditor.addEventListener("input", () => {
      updateLineNumbers();
      validateJsonEditor();
    });

    jsonEditor.addEventListener("scroll", () => {
      lineNumbers.scrollTop = jsonEditor.scrollTop;
    });

    // Tab key support
    jsonEditor.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = jsonEditor.selectionStart;
        const end = jsonEditor.selectionEnd;
        jsonEditor.value = jsonEditor.value.substring(0, start) + "  " + jsonEditor.value.substring(end);
        jsonEditor.selectionStart = jsonEditor.selectionEnd = start + 2;
        updateLineNumbers();
        validateJsonEditor();
      }
    });

    formatJsonBtn.addEventListener("click", () => {
      try {
        const parsed = JSON.parse(jsonEditor.value);
        jsonEditor.value = JSON.stringify(parsed, null, 2);
        updateLineNumbers();
        validateJsonEditor();
        showToast("JSON formatted cleanly", "success");
      } catch (err) {
        showToast("Cannot format invalid JSON: " + err.message, "error");
      }
    });

    jsonFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          jsonEditor.value = JSON.stringify(parsed, null, 2);
          if (parsed.meta && parsed.meta.slug) {
            reelSlugInput.value = parsed.meta.slug;
          }
          updateLineNumbers();
          validateJsonEditor();
          showToast(`Loaded ${file.name}`, "success");
        } catch (err) {
          showToast("Failed to parse JSON file: " + err.message, "error");
        }
      };
      reader.readAsText(file);
    });

    reelSlugInput.addEventListener("input", () => {
      const clean = reelSlugInput.value.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
      reelSlugInput.value = clean;
      try {
        const parsed = JSON.parse(jsonEditor.value);
        if (!parsed.meta) parsed.meta = {};
        parsed.meta.slug = clean;
        jsonEditor.value = JSON.stringify(parsed, null, 2);
      } catch {}
    });
  }

  function updateLineNumbers() {
    const lines = jsonEditor.value.split("\n").length;
    let numbers = "";
    for (let i = 1; i <= lines; i++) {
      numbers += i + "\n";
    }
    lineNumbers.textContent = numbers;
  }

  function validateJsonEditor() {
    try {
      const parsed = JSON.parse(jsonEditor.value);
      jsonStatusBadge.className = "status-badge badge-valid";
      jsonStatusBadge.innerHTML = `<span class="badge-dot"></span><span class="badge-label">Valid JSON</span>`;

      const scenes = Array.isArray(parsed.scenes) ? parsed.scenes : [];
      summarySceneCount.textContent = scenes.length;

      let estDur = 0;
      if (scenes.length > 0 && scenes[scenes.length - 1].endSec) {
        estDur = scenes[scenes.length - 1].endSec;
      }
      summaryDuration.textContent = estDur > 0 ? `${estDur}s` : "Auto";
      summaryCaptions.textContent = parsed.meta?.captions !== false ? "Enabled" : "Disabled";
      summaryLoop.textContent = parsed.meta?.loop !== false ? "Yes" : "No";

      return { valid: true, data: parsed };
    } catch (err) {
      jsonStatusBadge.className = "status-badge badge-error";
      jsonStatusBadge.innerHTML = `<span class="badge-dot"></span><span class="badge-label">Syntax Error</span>`;
      return { valid: false, error: err.message };
    }
  }

  // 3. Audio Handlers & Dropzone
  function setupAudioHandlers() {
    audioDropzone.addEventListener("click", () => audioFileInput.click());

    audioDropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      audioDropzone.classList.add("dragover");
    });

    audioDropzone.addEventListener("dragleave", () => {
      audioDropzone.classList.remove("dragover");
    });

    audioDropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      audioDropzone.classList.remove("dragover");
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleAudioFile(e.dataTransfer.files[0]);
      }
    });

    audioFileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        handleAudioFile(e.target.files[0]);
      }
    });

    // Sample voice chips
    document.querySelectorAll(".btn-chip[data-sample]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetSample = btn.getAttribute("data-sample");
        sampleVoiceSlug = targetSample;
        currentAudioBase64 = null;
        audioPlayer.src = `/public/reels/${targetSample}/voice.mp3`;
        audioFileNameDisplay.textContent = `Sample: ${targetSample}/voice.mp3`;
        audioFileSizeDisplay.textContent = "Preset";
        audioSourceTag.textContent = `Using sample: ${targetSample}`;
        showToast(`Voice set to sample "${targetSample}"`, "success");
      });
    });
  }

  function handleAudioFile(file) {
    if (!file.type.includes("audio") && !file.name.match(/\.(mp3|wav|m4a|aac)$/i)) {
      showToast("Please select an audio file (.mp3, .wav, .m4a)", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      currentAudioBase64 = e.target.result;
      currentAudioFileName = file.name;
      sampleVoiceSlug = null;

      audioPlayer.src = URL.createObjectURL(file);
      audioFileNameDisplay.textContent = file.name;
      audioFileSizeDisplay.textContent = `${Math.round(file.size / 1024)} KB`;
      audioSourceTag.textContent = "Custom File Loaded";
      showToast(`Attached audio file "${file.name}"`, "success");
    };
    reader.readAsDataURL(file);
  }

  // 4. Create & Render Reel Execution
  createReelBtn.addEventListener("click", async () => {
    if (isRendering) return;

    const validation = validateJsonEditor();
    if (!validation.valid) {
      showToast("Please fix JSON errors before rendering: " + validation.error, "error");
      return;
    }

    let slug = reelSlugInput.value.trim();
    if (!slug) {
      slug = validation.data.meta?.slug || "reel-" + Date.now().toString(36);
      reelSlugInput.value = slug;
    }

    // Start UI rendering mode
    setRenderingState(true, slug);
    logToTerminal(`🚀 Preparing render job for slug "${slug}"...`, "info");

    try {
      const payload = {
        slug,
        reelJson: validation.data,
        audioBase64: currentAudioBase64,
        sampleVoiceSlug: sampleVoiceSlug,
      };

      const res = await fetch("/api/create-and-render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to initialize render process");
      }

      logToTerminal(`⚡ Job ID: ${data.jobId} - Connected to render stream.`, "info");
      connectToRenderStream(data.jobId, slug);
    } catch (err) {
      logToTerminal(`❌ Error: ${err.message}`, "error");
      showToast(err.message, "error");
      setRenderingState(false);
    }
  });

  // 5. Server-Sent Events (SSE) Stream
  function connectToRenderStream(jobId, slug) {
    if (activeEventSource) {
      activeEventSource.close();
    }

    activeEventSource = new EventSource(`/api/render-stream?jobId=${jobId}`);

    activeEventSource.addEventListener("log", (e) => {
      const data = JSON.parse(e.data);
      logToTerminal(data.line, data.isError ? "error" : "default");
    });

    activeEventSource.addEventListener("progress", (e) => {
      const p = JSON.parse(e.data);
      updateRenderHUD(p);
    });

    activeEventSource.addEventListener("completed", (e) => {
      const data = JSON.parse(e.data);
      activeEventSource.close();
      activeEventSource = null;
      onRenderComplete(data.slug, data.videoUrl);
    });

    activeEventSource.addEventListener("error", (e) => {
      logToTerminal(`💥 Render process encountered an error.`, "error");
      activeEventSource.close();
      activeEventSource = null;
      setRenderingState(false);
      showToast("Render failed. Check terminal logs for details.", "error");
    });
  }

  function updateRenderHUD(p) {
    const pct = Math.min(100, Math.max(0, p.percent || 0));
    renderPercentDisplay.textContent = `${pct}%`;
    renderProgressBar.style.width = `${pct}%`;

    if (p.totalFrames > 0) {
      renderFramesDisplay.textContent = `${p.frame || 0} / ${p.totalFrames}`;
    }
    if (p.fps) {
      renderFpsDisplay.textContent = `${p.fps} fps`;
    }
    if (p.eta) {
      renderEtaDisplay.textContent = `${p.eta} left`;
    }
  }

  function onRenderComplete(slug, videoUrl) {
    logToTerminal(`🎉 RENDER COMPLETE! Output ready at: ${videoUrl}`, "success");
    showToast(`Reel "${slug}" rendered successfully!`, "success");
    setRenderingState(false);

    // Load video into phone screen
    currentLoadedVideoUrl = videoUrl;
    reelVideoPlayer.src = videoUrl;
    phoneIdleState.style.display = "none";
    phoneRenderOverlay.style.display = "none";
    videoContainer.style.display = "block";
    playerActionsPanel.style.display = "flex";

    downloadVideoBtn.href = videoUrl;
    downloadVideoBtn.setAttribute("download", `${slug}.mp4`);

    reelVideoPlayer.play().catch(() => {
      // autoplay might require interaction on some browsers
    });

    loadReelsGallery();
  }

  function setRenderingState(rendering, slug = "") {
    isRendering = rendering;
    createReelBtn.disabled = rendering;

    if (rendering) {
      createBtnText.textContent = "RENDERING IN PROGRESS...";
      phoneIdleState.style.display = "none";
      videoContainer.style.display = "none";
      phoneRenderOverlay.style.display = "flex";
      renderSlugLabel.textContent = slug;
      renderPercentDisplay.textContent = "0%";
      renderProgressBar.style.width = "0%";
      renderFramesDisplay.textContent = "0 / 0";
      renderFpsDisplay.textContent = "-- fps";
      renderEtaDisplay.textContent = "initializing...";
    } else {
      createBtnText.textContent = "CREATE & RENDER REEL";
      phoneRenderOverlay.style.display = "none";
    }
  }

  // 6. Custom Video Player Controls
  function setupVideoPlayerControls() {
    playPauseBtn.addEventListener("click", () => {
      if (reelVideoPlayer.paused) {
        reelVideoPlayer.play();
      } else {
        reelVideoPlayer.pause();
      }
    });

    reelVideoPlayer.addEventListener("play", () => {
      playIcon.style.display = "none";
      pauseIcon.style.display = "block";
    });

    reelVideoPlayer.addEventListener("pause", () => {
      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
    });

    reelVideoPlayer.addEventListener("timeupdate", () => {
      if (!reelVideoPlayer.duration) return;
      const cur = reelVideoPlayer.currentTime;
      const dur = reelVideoPlayer.duration;
      const pct = (cur / dur) * 100;
      scrubberTrack.style.width = `${pct}%`;
      videoScrubber.value = pct;
      videoTimeDisplay.textContent = `${formatTime(cur)} / ${formatTime(dur)}`;
    });

    videoScrubber.addEventListener("input", (e) => {
      if (!reelVideoPlayer.duration) return;
      const seekTime = (e.target.value / 100) * reelVideoPlayer.duration;
      reelVideoPlayer.currentTime = seekTime;
    });

    muteBtn.addEventListener("click", () => {
      reelVideoPlayer.muted = !reelVideoPlayer.muted;
      if (reelVideoPlayer.muted) {
        volumeIcon.style.display = "none";
        muteIcon.style.display = "block";
      } else {
        volumeIcon.style.display = "block";
        muteIcon.style.display = "none";
      }
    });

    speedBtn.addEventListener("click", () => {
      speedIndex = (speedIndex + 1) % playbackSpeeds.length;
      const spd = playbackSpeeds[speedIndex];
      reelVideoPlayer.playbackRate = spd;
      speedBtn.textContent = `${spd.toFixed(1)}x`;
    });

    fullscreenBtn.addEventListener("click", () => {
      if (reelVideoPlayer.requestFullscreen) {
        reelVideoPlayer.requestFullscreen();
      } else if (reelVideoPlayer.webkitRequestFullscreen) {
        reelVideoPlayer.webkitRequestFullscreen();
      }
    });

    copyVideoPathBtn.addEventListener("click", () => {
      const slug = reelSlugInput.value.trim();
      const relPath = `out/${slug}.mp4`;
      navigator.clipboard.writeText(relPath).then(() => {
        showToast(`Copied "${relPath}" to clipboard`, "success");
      });
    });

    reRenderBtn.addEventListener("click", () => {
      createReelBtn.click();
    });
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  // 7. Reels Library & Gallery
  refreshReelsBtn.addEventListener("click", () => {
    loadReelsGallery();
  });

  async function loadReelsGallery() {
    try {
      reelsGalleryGrid.innerHTML = `<div class="gallery-loading">Scanning workspace reels...</div>`;
      const res = await fetch("/api/reels");
      if (!res.ok) throw new Error("Failed to load reels");
      const reels = await res.json();

      if (reels.length === 0) {
        reelsGalleryGrid.innerHTML = `<div class="gallery-loading">No reels found. Create your first reel above!</div>`;
        return;
      }

      reelsGalleryGrid.innerHTML = "";
      for (const r of reels) {
        const card = document.createElement("div");
        card.className = "reel-card";

        const hasVideo = r.isRendered;
        const sizeMb = r.videoStat ? (r.videoStat.size / (1024 * 1024)).toFixed(1) + " MB" : "";

        card.innerHTML = `
          <div class="reel-card-top">
            <span class="reel-card-slug">${escapeHtml(r.slug)}</span>
            <span class="${hasVideo ? "rendered-pill" : "not-rendered-pill"}">
              ${hasVideo ? "RENDERED" : "UNRENDERED"}
            </span>
          </div>
          <div class="reel-card-title">${escapeHtml(r.title)}</div>
          <div class="reel-card-meta">
            <span>${r.sceneCount} scenes</span>
            <span>•</span>
            <span>${r.durationSec > 0 ? r.durationSec + "s" : "--"}</span>
            ${hasVideo ? `<span>•</span><span>${sizeMb}</span>` : ""}
          </div>
          <div class="reel-card-actions">
            ${
              hasVideo
                ? `<button class="btn-card-action btn-card-play" data-play="${escapeHtml(r.slug)}" data-url="${escapeHtml(r.videoUrl)}">▶ Play Video</button>`
                : ""
            }
            <button class="btn-card-action" data-load="${escapeHtml(r.slug)}">Load Data</button>
          </div>
        `;

        reelsGalleryGrid.appendChild(card);
      }

      // Attach gallery actions
      document.querySelectorAll("[data-play]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const videoUrl = btn.getAttribute("data-url");
          const slug = btn.getAttribute("data-play");
          onRenderComplete(slug, videoUrl);
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      });

      document.querySelectorAll("[data-load]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const slug = btn.getAttribute("data-load");
          await loadReelDetail(slug);
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      });
    } catch (err) {
      reelsGalleryGrid.innerHTML = `<div class="gallery-loading">Failed to load reels: ${err.message}</div>`;
    }
  }

  async function loadReelDetail(slug) {
    try {
      const res = await fetch(`/api/reel-detail?slug=${encodeURIComponent(slug)}`);
      if (!res.ok) throw new Error("Failed to load reel");
      const data = await res.json();

      reelSlugInput.value = data.slug;
      jsonEditor.value = data.jsonText;
      updateLineNumbers();
      validateJsonEditor();

      if (data.hasVoice && data.voiceUrl) {
        audioPlayer.src = data.voiceUrl;
        audioFileNameDisplay.textContent = `reels/${data.slug}/voice.mp3`;
        audioFileSizeDisplay.textContent = "Attached";
        audioSourceTag.textContent = "Reel Voice Attached";
        sampleVoiceSlug = data.slug;
      }

      if (data.isRendered && data.videoUrl) {
        onRenderComplete(data.slug, data.videoUrl);
      }

      showToast(`Loaded reel "${slug}"`, "success");
    } catch (err) {
      showToast(err.message, "error");
    }
  }

  // 8. Terminal Helpers
  function logToTerminal(text, type = "default") {
    const line = document.createElement("div");
    line.className = `term-line ${type}-line`;
    line.textContent = `> ${text}`;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  clearLogsBtn.addEventListener("click", () => {
    terminalOutput.innerHTML = "";
    logToTerminal("Terminal output cleared.", "info");
  });

  // 9. Toast Notification Helper
  function showToast(message, type = "info") {
    toastNotification.textContent = message;
    toastNotification.className = `toast show ${type}`;
    setTimeout(() => {
      toastNotification.className = "toast";
    }, 3800);
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text || "";
    return div.innerHTML;
  }
});
