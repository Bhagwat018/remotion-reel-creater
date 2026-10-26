// Remotion Reel Studio - Pure Runtime Reel Engine
// Clear any browser CacheStorage or ServiceWorkers if present
if (typeof window !== "undefined" && "caches" in window) {
  caches.keys().then((names) => {
    names.forEach((name) => caches.delete(name));
  });
}
if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const r of registrations) r.unregister();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // DOM References
  const reelSlugInput = document.getElementById("reelSlug");
  const jsonEditor = document.getElementById("jsonEditor");
  const lineNumbers = document.getElementById("lineNumbers");
  const jsonStatusBadge = document.getElementById("jsonStatusBadge");
  const jsonStatusText = document.getElementById("jsonStatusText");
  const formatJsonBtn = document.getElementById("formatJsonBtn");
  const copyJsonBtn = document.getElementById("copyJsonBtn");
  const jsonFileInput = document.getElementById("jsonFileInput");

  // Tabs & Views
  const tabCodeBtn = document.getElementById("tabCodeBtn");
  const tabScenesBtn = document.getElementById("tabScenesBtn");
  const tabSceneCount = document.getElementById("tabSceneCount");
  const codeViewContainer = document.getElementById("codeViewContainer");
  const scenesViewContainer = document.getElementById("scenesViewContainer");
  const scenesCardList = document.getElementById("scenesCardList");
  const editorErrorDrawer = document.getElementById("editorErrorDrawer");
  const editorErrorMessage = document.getElementById("editorErrorMessage");

  // Summaries
  const summarySceneCount = document.getElementById("summarySceneCount");
  const summaryDuration = document.getElementById("summaryDuration");
  const summaryCaptions = document.getElementById("summaryCaptions");
  const summaryLoop = document.getElementById("summaryLoop");

  // Audio Controls
  const audioDropzone = document.getElementById("audioDropzone");
  const audioFileInput = document.getElementById("audioFileInput");
  const audioPreview = document.getElementById("audioPreview");
  const audioFileNameDisplay = document.getElementById("audioFileNameDisplay");
  const audioFileSizeDisplay = document.getElementById("audioFileSizeDisplay");
  const audioPlayer = document.getElementById("audioPlayer");
  const audioSourceTag = document.getElementById("audioSourceTag");

  // Render Action
  const createReelBtn = document.getElementById("createReelBtn");
  const createBtnText = document.getElementById("createBtnText");
  const btnSpinner = document.getElementById("btnSpinner");
  const btnIcon = document.getElementById("btnIcon");

  // Device & Preview Elements
  const phoneIdleState = document.getElementById("phoneIdleState");
  const phoneRenderOverlay = document.getElementById("phoneRenderOverlay");
  const videoContainer = document.getElementById("videoContainer");
  const reelVideoPlayer = document.getElementById("reelVideoPlayer");
  const idleTitle = document.getElementById("idleTitle");
  const idleSub = document.getElementById("idleSub");

  // HUD Elements
  const renderPercentDisplay = document.getElementById("renderPercentDisplay");
  const renderProgressBar = document.getElementById("renderProgressBar");
  const renderFramesDisplay = document.getElementById("renderFramesDisplay");
  const renderFpsDisplay = document.getElementById("renderFpsDisplay");
  const renderEtaDisplay = document.getElementById("renderEtaDisplay");
  const renderSlugLabel = document.getElementById("renderSlugLabel");

  // Video Controls
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
  let currentAudioBase64 = null;
  let currentAudioFileName = null;
  let activeEventSource = null;
  let isRendering = false;
  let playbackSpeeds = [1.0, 1.25, 1.5, 2.0, 0.75];
  let speedIndex = 0;

  // Initialize App
  initApp();

  async function initApp() {
    setupEditorSync();
    setupTabs();
    setupAudioHandlers();
    setupVideoPlayerControls();
    setupKeyboardShortcuts();
    await loadReelsGallery();

    // Default runtime starter (Fast-paced 8-scene dynamic motion template)
    const starterJson = {
      meta: {
        topic: "Production Tech Architecture",
        slug: "my-tech-reel",
        handle: "@techwith.GenZ",
        language: "Hinglish",
        lengthSec: 32,
        voiceFile: "reels/my-tech-reel/voice.mp3",
        bgm: "bgm/cyber-groove.mp3",
        bgmVolume: 0.22,
        captionStyle: "bubble",
        coverIntro: true,
        avatar: {
          enabled: true,
          position: "left"
        }
      },
      scenes: [
        {
          id: "s1-hook",
          type: "title",
          direction: "from-top",
          startSec: 0,
          endSec: 4.0,
          voice: "Kya aapka code production me load aate hi crash ho jata hai?",
          headline: "SERVER *CRASHING* UNDER LOAD?"
        },
        {
          id: "s2-code",
          type: "code",
          direction: "from-left",
          startSec: 4.0,
          endSec: 8.0,
          voice: "Yahan par null pointer runtime crash ho raha hai.",
          headline: "UNHANDLED *RUNTIME* CRASH",
          filename: "server.ts",
          lines: [
            "const token = req.headers['auth'];",
            "const user = verifyToken(token); // 💥 Crash!",
            "return res.json(user.profile);"
          ],
          highlightLines: [2]
        },
        {
          id: "s3-badge",
          type: "card",
          direction: "pop-3d",
          startSec: 8.0,
          endSec: 12.0,
          voice: "Miliye Docker aur Kubernetes se. Ye production ko self-healing banate hain.",
          headline: "CONTAINERIZE *ANYTHING*",
          cardText: "Automated container orchestration with zero downtime deployments.",
          chip: "Zero Downtime",
          icon: "docker",
          featuredBadge: {
            icon: "docker",
            title: "Docker",
            subtitle: "Containerization & Microservices Engine",
            chip: "Industry Standard"
          }
        },
        {
          id: "s4-terminal",
          type: "terminal",
          direction: "from-bottom",
          startSec: 12.0,
          endSec: 16.0,
          voice: "Bas ek command se pore cluster me autoscaling pods deploy ho jate hain.",
          headline: "AUTONOMOUS *DEPLOYMENT*",
          command: "kubectl apply -f deployment.yaml",
          path: "~/k8s-cluster",
          branch: "main",
          output: [
            { text: "✓ Created deployment.apps/web-api", type: "success" },
            { text: "⚡ 5 pods active across cluster", type: "info" },
            { text: "✓ LoadBalancer active on port 443", type: "success" }
          ]
        },
        {
          id: "s5-stat",
          type: "stat",
          direction: "from-right",
          startSec: 16.0,
          endSec: 20.0,
          voice: "Throughput speed 10x badh jati hai aur latency bilkul zero.",
          headline: "10X *FASTER* SCALING",
          value: "10x",
          label: "Deployment Speed Multiplier"
        },
        {
          id: "s6-pills",
          type: "pills",
          direction: "from-left",
          startSec: 20.0,
          endSec: 24.0,
          voice: "Server crashes, memory leaks aur vulnerabilities ko auto-heal karein.",
          headline: "SELF-HEALING *CLUSTER*",
          items: [
            "Server Crashes",
            "Security Vulnerabilities",
            "Code Smells"
          ]
        },
        {
          id: "s7-orbit",
          type: "orbit",
          direction: "from-bottom",
          startSec: 24.0,
          endSec: 28.0,
          voice: "Aapka code GitHub se direct Jenkins aur Kubernetes cluster me deploy hota hai.",
          headline: "SEAMLESS *CI/CD* FLOW",
          center: "kubernetes",
          orbiting: [
            "GitHub",
            "GitLab",
            "Jenkins"
          ]
        },
        {
          id: "s8-cta",
          type: "cta",
          direction: "from-top",
          startSec: 28.0,
          endSec: 32.0,
          voice: "Backend engineering seekhne ke liye abhi follow karein @techwith.GenZ ko!",
          headline: "LEVEL UP YOUR *CODE*",
          buttonText: "FOLLOW FOR TECH TIPS"
        }
      ]
    };

    jsonEditor.value = JSON.stringify(starterJson, null, 2);
    reelSlugInput.value = "my-tech-reel";
    updateLineNumbers();
    validateJsonEditor();

    idleTitle.textContent = "Runtime Reel Creator";
    idleSub.textContent = "Paste your JSON script and upload MP3 to render instantly.";
  }

  // 2. Editor Setup & Precision Gutter Line Numbers
  function setupEditorSync() {
    // Input event
    jsonEditor.addEventListener("input", () => {
      updateLineNumbers();
      const val = validateJsonEditor();
      if (val && val.valid && val.data && val.data.meta && val.data.meta.slug) {
        reelSlugInput.value = val.data.meta.slug;
      }
    });

    // Synchronize scrolling between textarea and line numbers gutter
    jsonEditor.addEventListener("scroll", () => {
      lineNumbers.scrollTop = jsonEditor.scrollTop;
    });

    // Tab key indent
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

    // Format JSON
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

    // Copy JSON
    copyJsonBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(jsonEditor.value).then(() => {
        showToast("JSON copied to clipboard", "success");
      });
    });

    // Upload JSON File
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
          showToast(`Loaded "${file.name}"`, "success");
        } catch (err) {
          showToast("Invalid JSON file: " + err.message, "error");
        }
      };
      reader.readAsText(file);
    });

    // Slug sync
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

  // Update line numbers strictly with \n
  function updateLineNumbers() {
    const text = jsonEditor.value;
    const lineCount = text.split("\n").length;
    let numbers = "";
    for (let i = 1; i <= lineCount; i++) {
      numbers += i + "\n";
    }
    lineNumbers.textContent = numbers;
  }

  // Validate JSON schema & update UI
  function validateJsonEditor() {
    try {
      const parsed = JSON.parse(jsonEditor.value);
      jsonStatusBadge.className = "schema-badge schema-valid";
      jsonStatusText.textContent = "Valid JSON";
      editorErrorDrawer.style.display = "none";

      const scenes = Array.isArray(parsed.scenes) ? parsed.scenes : [];
      summarySceneCount.textContent = scenes.length;
      tabSceneCount.textContent = scenes.length;

      let estDur = 0;
      if (scenes.length > 0 && scenes[scenes.length - 1].endSec) {
        estDur = scenes[scenes.length - 1].endSec;
      }
      summaryDuration.textContent = estDur > 0 ? `${estDur}s` : "Auto";
      summaryCaptions.textContent = parsed.meta?.captions !== false ? "Enabled" : "Disabled";
      summaryLoop.textContent = parsed.meta?.loop !== false ? "Active" : "Off";

      // Render Scene Explorer cards
      renderSceneCards(scenes);

      return { valid: true, data: parsed };
    } catch (err) {
      jsonStatusBadge.className = "schema-badge schema-error";
      jsonStatusText.textContent = "Syntax Error";
      editorErrorDrawer.style.display = "flex";
      editorErrorMessage.textContent = err.message;
      return { valid: false, error: err.message };
    }
  }

  // 3. Tab Toggling: Code vs Scene Explorer
  function setupTabs() {
    tabCodeBtn.addEventListener("click", () => {
      tabCodeBtn.classList.add("active");
      tabScenesBtn.classList.remove("active");
      codeViewContainer.style.display = "flex";
      scenesViewContainer.style.display = "none";
    });

    tabScenesBtn.addEventListener("click", () => {
      tabScenesBtn.classList.add("active");
      tabCodeBtn.classList.remove("active");
      codeViewContainer.style.display = "none";
      scenesViewContainer.style.display = "block";
    });
  }

  function renderSceneCards(scenes) {
    if (!scenes || scenes.length === 0) {
      scenesCardList.innerHTML = `<div style="color:var(--text-muted);font-size:0.8rem;text-align:center;padding:24px;">No scenes detected in JSON.</div>`;
      return;
    }

    scenesCardList.innerHTML = scenes
      .map(
        (scene, idx) => `
      <div class="scene-card-item">
        <div class="scene-card-header">
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="scene-id-badge">#${idx + 1} ${escapeHtml(scene.id || "scene")}</span>
            <span class="scene-type-tag">[${escapeHtml(scene.type || "unknown")}]</span>
          </div>
          <span class="scene-time-pill">${scene.startSec ?? 0}s – ${scene.endSec ?? "?"}s</span>
        </div>
        ${scene.headline ? `<div class="scene-headline">${escapeHtml(scene.headline)}</div>` : ""}
        ${scene.voice ? `<div class="scene-voice">"${escapeHtml(scene.voice)}"</div>` : ""}
      </div>
    `
      )
      .join("");
  }

  // 4. Audio Handlers
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
  }

  function handleAudioFile(file) {
    if (!file.type.includes("audio") && !file.name.match(/\.(mp3|wav|m4a|aac)$/i)) {
      showToast("Please upload an audio file (.mp3, .wav, .m4a)", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      currentAudioBase64 = e.target.result;
      currentAudioFileName = file.name;

      audioPlayer.src = URL.createObjectURL(file);
      audioFileNameDisplay.textContent = file.name;
      audioFileSizeDisplay.textContent = `${Math.round(file.size / 1024)} KB`;
      audioSourceTag.textContent = "Custom File Loaded";
      showToast(`Attached audio "${file.name}"`, "success");
    };
    reader.readAsDataURL(file);
  }

  // 5. Keyboard Shortcuts (Cmd+Enter to render)
  function setupKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        createReelBtn.click();
      }
    });
  }

  // 6. Create & Render Execution
  createReelBtn.addEventListener("click", async () => {
    if (isRendering) return;

    const validation = validateJsonEditor();
    if (!validation.valid) {
      showToast("Please fix JSON errors: " + validation.error, "error");
      return;
    }

    let slug = reelSlugInput.value.trim();
    if (!slug) {
      slug = validation.data.meta?.slug || "reel-" + Date.now().toString(36);
      reelSlugInput.value = slug;
    }

    setRenderingState(true, slug);
    logToTerminal(`🚀 Starting render pipeline for slug "${slug}"...`, "info");

    try {
      const payload = {
        slug,
        reelJson: validation.data,
        audioBase64: currentAudioBase64,
      };

      const res = await fetch("/api/create-and-render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to start render");
      }

      logToTerminal(`⚡ Job initialized: ${data.jobId}`, "info");
      connectToRenderStream(data.jobId, slug);
    } catch (err) {
      logToTerminal(`❌ Render error: ${err.message}`, "error");
      showToast(err.message, "error");
      setRenderingState(false);
    }
  });

  // 7. Server-Sent Events (SSE) Stream
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
      logToTerminal(`💥 Render failed. Check logs above.`, "error");
      activeEventSource.close();
      activeEventSource = null;
      setRenderingState(false);
      showToast("Render failed. Check terminal logs.", "error");
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
    logToTerminal(`🎉 RENDER FINISHED! Video output: ${videoUrl}`, "success");
    showToast(`Reel "${slug}" rendered successfully!`, "success");
    setRenderingState(false);

    // Load video player
    reelVideoPlayer.src = videoUrl;
    phoneIdleState.style.display = "none";
    phoneRenderOverlay.style.display = "none";
    videoContainer.style.display = "block";
    playerActionsPanel.style.display = "flex";

    downloadVideoBtn.href = videoUrl;
    downloadVideoBtn.setAttribute("download", `${slug}.mp4`);

    reelVideoPlayer.play().catch(() => {});
    loadReelsGallery();
  }

  function setRenderingState(rendering, slug = "") {
    isRendering = rendering;
    createReelBtn.disabled = rendering;

    if (rendering) {
      createBtnText.textContent = "Rendering Reel Video...";
      btnSpinner.style.display = "inline-block";
      btnIcon.style.display = "none";

      phoneIdleState.style.display = "none";
      videoContainer.style.display = "none";
      phoneRenderOverlay.style.display = "flex";
      renderSlugLabel.textContent = slug;
      renderPercentDisplay.textContent = "0%";
      renderProgressBar.style.width = "0%";
      renderFramesDisplay.textContent = "0 / 0";
      renderFpsDisplay.textContent = "-- fps";
      renderEtaDisplay.textContent = "calculating...";
    } else {
      createBtnText.textContent = "Create & Render Reel (MP4)";
      btnSpinner.style.display = "none";
      btnIcon.style.display = "inline-block";
      phoneRenderOverlay.style.display = "none";
    }
  }

  // 8. Custom Video Player Controls
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
        showToast(`Copied "${relPath}"`, "success");
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

  // 9. Reels Gallery & Library
  refreshReelsBtn.addEventListener("click", () => {
    loadReelsGallery();
  });

  async function loadReelsGallery() {
    try {
      reelsGalleryGrid.innerHTML = `<div class="library-empty">Loading reels...</div>`;
      const res = await fetch("/api/reels");
      if (!res.ok) throw new Error("Failed to load reels");
      const reels = await res.json();

      if (reels.length === 0) {
        reelsGalleryGrid.innerHTML = `<div class="library-empty">No reels found in project.</div>`;
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

      // Card action listeners
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
      reelsGalleryGrid.innerHTML = `<div class="library-empty">Error loading reels: ${err.message}</div>`;
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
      }

      if (data.isRendered && data.videoUrl) {
        onRenderComplete(data.slug, data.videoUrl);
      }

      showToast(`Loaded "${slug}"`, "success");
    } catch (err) {
      showToast(err.message, "error");
    }
  }

  // 10. Terminal Helpers
  function logToTerminal(text, type = "default") {
    const line = document.createElement("div");
    line.className = `log-row ${type}-row`;
    line.textContent = `> ${text}`;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  clearLogsBtn.addEventListener("click", () => {
    terminalOutput.innerHTML = "";
    logToTerminal("Terminal output cleared.", "info");
  });

  // 11. Toast Notifications
  function showToast(message, type = "info") {
    toastNotification.textContent = message;
    toastNotification.className = `app-toast show ${type}`;
    setTimeout(() => {
      toastNotification.className = "app-toast";
    }, 3500);
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text || "";
    return div.innerHTML;
  }
});
