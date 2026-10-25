#!/usr/bin/env node
import http from "http";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(__dirname, "public");
const outDir = path.join(rootDir, "out");
const reelsDir = path.join(rootDir, "reels");
const publicReelsDir = path.join(rootDir, "public", "reels");

const PORT = process.env.PORT || 3030;

// Ensure directories exist
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

// Active render jobs: jobId -> { slug, status, progress, logs: [], sseClients: Set }
const activeJobs = new Map();

/**
 * Helper to strip ANSI codes from child_process output
 */
function stripAnsi(str) {
  return str.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
}

/**
 * Handle Range-enabled video streaming and static files
 */
function serveFile(req, res, filePath, contentType = "application/octet-stream") {
  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
    return;
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    if (start >= fileSize) {
      res.writeHead(416, {
        "Content-Range": `bytes */${fileSize}`,
      });
      res.end();
      return;
    }

    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": contentType,
      "Cache-Control": "no-cache",
    });
    file.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": contentType,
      "Accept-Ranges": "bytes",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0",
    });
    fs.createReadStream(filePath).pipe(res);
  }
}

/**
 * Parse JSON body helper
 */
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      // Allow up to 100MB for base64 audio
      if (body.length > 100 * 1024 * 1024) {
        req.destroy();
        reject(new Error("Payload too large (>100MB)"));
      }
    });
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body || "{}");
        resolve(parsed);
      } catch (err) {
        reject(new Error("Invalid JSON body: " + err.message));
      }
    });
    req.on("error", reject);
  });
}

/**
 * Broadcast event to all SSE subscribers of a job
 */
function broadcastJobEvent(jobId, event, data) {
  const job = activeJobs.get(jobId);
  if (!job) return;

  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const clientRes of job.sseClients) {
    try {
      clientRes.write(payload);
    } catch {
      job.sseClients.delete(clientRes);
    }
  }
}

/**
 * Start render process for a given slug
 */
function startRenderJob(slug, jobId) {
  const job = {
    id: jobId,
    slug,
    status: "running",
    progress: { percent: 0, frame: 0, totalFrames: 0, fps: 0, eta: "" },
    logs: [],
    sseClients: new Set(),
    createdAt: Date.now(),
  };
  activeJobs.set(jobId, job);

  const renderScript = path.join(rootDir, "scripts", "render-reel.mjs");
  const child = spawn("node", [renderScript, slug], {
    cwd: rootDir,
    env: { ...process.env, FORCE_COLOR: "1" },
  });

  const onOutput = (data, isError = false) => {
    const raw = data.toString();
    const clean = stripAnsi(raw);
    const lines = clean.split("\n").filter(Boolean);

    for (const line of lines) {
      job.logs.push({ text: line, time: new Date().toLocaleTimeString(), isError });
      broadcastJobEvent(jobId, "log", { line, isError });

      // Match frame progress: e.g. "Rendering frames (120/900)" or "Rendered frame 120 of 900" or "(25%)"
      const frameMatch = line.match(/(\d+)\s*\/\s*(\d+)/);
      const percentMatch = line.match(/(\d+)%/);
      const fpsMatch = line.match(/([\d.]+)\s*fps/i);
      const etaMatch = line.match(/([\d.]+[smh]?)\s*left/i);

      if (frameMatch || percentMatch) {
        if (frameMatch) {
          job.progress.frame = parseInt(frameMatch[1], 10);
          job.progress.totalFrames = parseInt(frameMatch[2], 10);
          if (job.progress.totalFrames > 0) {
            job.progress.percent = Math.round((job.progress.frame / job.progress.totalFrames) * 100);
          }
        }
        if (percentMatch) {
          job.progress.percent = parseInt(percentMatch[1], 10);
        }
        if (fpsMatch) {
          job.progress.fps = parseFloat(fpsMatch[1]);
        }
        if (etaMatch) {
          job.progress.eta = etaMatch[1];
        }

        broadcastJobEvent(jobId, "progress", job.progress);
      }
    }
  };

  child.stdout.on("data", (d) => onOutput(d, false));
  child.stderr.on("data", (d) => onOutput(d, true));

  child.on("close", (code) => {
    const outputPath = path.join(outDir, `${slug}.mp4`);
    const exists = fs.existsSync(outputPath);

    if (code === 0 && exists) {
      job.status = "completed";
      job.progress.percent = 100;
      broadcastJobEvent(jobId, "progress", { ...job.progress, percent: 100 });
      broadcastJobEvent(jobId, "completed", {
        slug,
        videoUrl: `/out/${slug}.mp4?t=${Date.now()}`,
        downloadUrl: `/out/${slug}.mp4`,
        fileSize: fs.statSync(outputPath).size,
      });
    } else {
      job.status = "failed";
      broadcastJobEvent(jobId, "error", {
        message: `Render failed with exit code ${code}. Check logs for details.`,
      });
    }
  });

  return job;
}

// HTTP Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // 1. Static Web Dashboard Assets
  if (pathname === "/" || pathname === "/index.html") {
    return serveFile(req, res, path.join(publicDir, "index.html"), "text/html");
  }
  if (pathname === "/styles.css") {
    return serveFile(req, res, path.join(publicDir, "styles.css"), "text/css");
  }
  if (pathname === "/app.js") {
    return serveFile(req, res, path.join(publicDir, "app.js"), "application/javascript");
  }

  // 2. Video streaming from /out/<slug>.mp4
  if (pathname.startsWith("/out/")) {
    const filename = path.basename(pathname);
    const filePath = path.join(outDir, filename);
    return serveFile(req, res, filePath, "video/mp4");
  }

  // 3. Audio / asset streaming from /public/reels/<slug>/...
  if (pathname.startsWith("/public/reels/") || pathname.startsWith("/reels/")) {
    const relPath = pathname.replace(/^\/(public\/)?/, "");
    const filePath = path.join(rootDir, "public", relPath);
    let contentType = "application/octet-stream";
    if (filePath.endsWith(".mp3")) contentType = "audio/mpeg";
    if (filePath.endsWith(".json")) contentType = "application/json";
    if (filePath.endsWith(".wav")) contentType = "audio/wav";
    return serveFile(req, res, filePath, contentType);
  }

  // 4. API Endpoints
  // GET /api/templates - pure runtime engine (no static demo presets)
  if (pathname === "/api/templates" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({}));
    return;
  }

  // GET /api/reels - list all existing reels and render status
  if (pathname === "/api/reels" && method === "GET") {
    try {
      const reels = [];
      const reelDirs = fs.existsSync(reelsDir)
        ? fs.readdirSync(reelsDir).filter((d) => !d.startsWith(".") && d !== "_template")
        : [];

      for (const rSlug of reelDirs) {
        const jsonPath = path.join(reelsDir, rSlug, "reel.json");
        const videoPath = path.join(outDir, `${rSlug}.mp4`);
        const voicePath = path.join(publicReelsDir, rSlug, "voice.mp3");

        let meta = { slug: rSlug };
        let sceneCount = 0;
        let durationSec = 0;

        if (fs.existsSync(jsonPath)) {
          try {
            const parsed = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
            meta = parsed.meta || meta;
            sceneCount = parsed.scenes?.length || 0;
            if (parsed.scenes && parsed.scenes.length > 0) {
              const last = parsed.scenes[parsed.scenes.length - 1];
              durationSec = last.endSec || 0;
            }
          } catch {}
        }

        const isRendered = fs.existsSync(videoPath);
        const hasVoice = fs.existsSync(voicePath) || fs.existsSync(path.join(reelsDir, rSlug, "voice.mp3"));

        let videoStat = null;
        if (isRendered) {
          const st = fs.statSync(videoPath);
          videoStat = {
            size: st.size,
            mtime: st.mtime,
          };
        }

        reels.push({
          slug: rSlug,
          title: meta.title || meta.topic || rSlug,
          handle: meta.handle || "@reel",
          sceneCount,
          durationSec,
          hasVoice,
          voiceUrl: hasVoice ? `/public/reels/${rSlug}/voice.mp3` : null,
          isRendered,
          videoUrl: isRendered ? `/out/${rSlug}.mp4` : null,
          videoStat,
        });
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(reels));
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // GET /api/reel-detail?slug=...
  if (pathname === "/api/reel-detail" && method === "GET") {
    const slug = parsedUrl.searchParams.get("slug");
    if (!slug) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing slug parameter" }));
      return;
    }

    const jsonPath = path.join(reelsDir, slug, "reel.json");
    if (!fs.existsSync(jsonPath)) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: `Reel ${slug} not found` }));
      return;
    }

    try {
      const content = fs.readFileSync(jsonPath, "utf-8");
      const hasVoice =
        fs.existsSync(path.join(publicReelsDir, slug, "voice.mp3")) ||
        fs.existsSync(path.join(reelsDir, slug, "voice.mp3"));
      const isRendered = fs.existsSync(path.join(outDir, `${slug}.mp4`));

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          slug,
          jsonText: content,
          hasVoice,
          voiceUrl: hasVoice ? `/public/reels/${slug}/voice.mp3` : null,
          isRendered,
          videoUrl: isRendered ? `/out/${slug}.mp4` : null,
        })
      );
    } catch (err) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // POST /api/validate-json
  if (pathname === "/api/validate-json" && method === "POST") {
    try {
      const payload = await parseJsonBody(req);
      const { reelJson } = payload;
      let data = reelJson;
      if (typeof reelJson === "string") {
        data = JSON.parse(reelJson);
      }

      // Quick syntax & scene check
      if (!data.meta || !data.meta.slug) {
        throw new Error("Missing meta.slug in reel.json");
      }
      if (!Array.isArray(data.scenes) || data.scenes.length === 0) {
        throw new Error("Missing or empty 'scenes' array in reel.json");
      }

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          valid: true,
          slug: data.meta.slug,
          sceneCount: data.scenes.length,
          title: data.meta.title || data.meta.topic || "Untitled",
        })
      );
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ valid: false, error: err.message }));
    }
    return;
  }

  // POST /api/create-and-render
  if (pathname === "/api/create-and-render" && method === "POST") {
    try {
      const body = await parseJsonBody(req);
      let { slug, reelJson, audioBase64 } = body;

      // Extract slug from JSON if not provided
      let jsonObject = null;
      if (typeof reelJson === "string") {
        jsonObject = JSON.parse(reelJson);
      } else if (typeof reelJson === "object") {
        jsonObject = reelJson;
      }

      if (!jsonObject) {
        throw new Error("reelJson is required and must be valid JSON");
      }

      if (!slug) {
        slug = jsonObject.meta?.slug;
      }
      if (!slug) {
        slug = "reel-" + Date.now().toString(36);
      }

      // Clean slug
      slug = slug
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, "-")
        .replace(/^-+|-+$/g, "");

      // Ensure meta.slug matches
      if (!jsonObject.meta) jsonObject.meta = {};
      jsonObject.meta.slug = slug;
      jsonObject.meta.voiceFile = `reels/${slug}/voice.mp3`;

      // 1. Write reel.json to both reels/<slug>/ and public/reels/<slug>/
      const targetReelDir = path.join(reelsDir, slug);
      const targetPubDir = path.join(publicReelsDir, slug);
      fs.mkdirSync(targetReelDir, { recursive: true });
      fs.mkdirSync(targetPubDir, { recursive: true });

      const finalJsonString = JSON.stringify(jsonObject, null, 2);
      fs.writeFileSync(path.join(targetReelDir, "reel.json"), finalJsonString, "utf-8");
      fs.writeFileSync(path.join(targetPubDir, "reel.json"), finalJsonString, "utf-8");

      // 2. Handle audio
      const targetPubVoice = path.join(targetPubDir, "voice.mp3");
      const targetReelVoice = path.join(targetReelDir, "voice.mp3");

      if (audioBase64) {
        // Remove data URL prefix if present (e.g. data:audio/mp3;base64,...)
        const base64Data = audioBase64.replace(/^data:audio\/[a-z0-9]+;base64,/, "");
        const audioBuffer = Buffer.from(base64Data, "base64");
        fs.writeFileSync(targetPubVoice, audioBuffer);
        fs.writeFileSync(targetReelVoice, audioBuffer);
      }

      // 4. Start Render Job
      const jobId = "job-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 6);
      startRenderJob(slug, jobId);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          jobId,
          slug,
          message: `Render job started for reel "${slug}"`,
        })
      );
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // GET /api/render-stream?jobId=...
  if (pathname === "/api/render-stream" && method === "GET") {
    const jobId = parsedUrl.searchParams.get("jobId");
    const job = activeJobs.get(jobId);

    if (!job) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Job not found" }));
      return;
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    job.sseClients.add(res);

    // Send initial history
    res.write(`event: init\ndata: ${JSON.stringify({ status: job.status, progress: job.progress, slug: job.slug })}\n\n`);
    for (const log of job.logs) {
      res.write(`event: log\ndata: ${JSON.stringify({ line: log.text, isError: log.isError })}\n\n`);
    }

    if (job.status === "completed") {
      res.write(
        `event: completed\ndata: ${JSON.stringify({
          slug: job.slug,
          videoUrl: `/out/${job.slug}.mp4?t=${Date.now()}`,
          downloadUrl: `/out/${job.slug}.mp4`,
        })}\n\n`
      );
    } else if (job.status === "failed") {
      res.write(`event: error\ndata: ${JSON.stringify({ message: "Job failed." })}\n\n`);
    }

    req.on("close", () => {
      job.sseClients.delete(res);
    });
    return;
  }

  // Unknown route
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(PORT, () => {
  console.log(`\n=======================================================`);
  console.log(`🚀 Remotion Reel Creator Dashboard is RUNNING!`);
  console.log(`🌐 Localhost URL: http://localhost:${PORT}`);
  console.log(`📁 Reels dir: ${reelsDir}`);
  console.log(`📁 Output dir: ${outDir}`);
  console.log(`=======================================================\n`);
});
