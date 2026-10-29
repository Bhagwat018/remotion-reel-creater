#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const args = process.argv.slice(2).filter((arg) => arg !== "--");
const inputSlug = args[0];

if (!inputSlug) {
  console.error("❌ Error: Please specify a reel slug to validate.");
  console.error("Usage: npm run validate -- <slug>");
  console.error("Example: npm run validate -- demo-hallucination");
  process.exit(1);
}

// Support either full path or slug name
let jsonPath = inputSlug;
if (!inputSlug.endsWith(".json")) {
  const rootReelJson = path.join(rootDir, "reels", inputSlug, "reel.json");
  const publicReelJson = path.join(rootDir, "public", "reels", inputSlug, "reel.json");

  // Sync if user edited public/reels/<slug>/reel.json
  if (fs.existsSync(publicReelJson)) {
    if (!fs.existsSync(rootReelJson)) {
      fs.mkdirSync(path.dirname(rootReelJson), { recursive: true });
      fs.copyFileSync(publicReelJson, rootReelJson);
      console.log(`ℹ️ Copied public/reels/${inputSlug}/reel.json to reels/${inputSlug}/reel.json`);
    } else {
      const publicStat = fs.statSync(publicReelJson);
      const rootStat = fs.statSync(rootReelJson);
      if (publicStat.mtimeMs > rootStat.mtimeMs || publicStat.size > rootStat.size + 100) {
        fs.copyFileSync(publicReelJson, rootReelJson);
        console.log(`ℹ️ Synced updated public/reels/${inputSlug}/reel.json to reels/${inputSlug}/reel.json`);
      }
    }
  }

  jsonPath = rootReelJson;
} else if (!path.isAbsolute(inputSlug)) {
  jsonPath = path.resolve(rootDir, inputSlug);
}

if (!fs.existsSync(jsonPath)) {
  console.error(`❌ reel.json not found at: ${jsonPath}`);
  process.exit(1);
}

let rawData;
try {
  rawData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
} catch (e) {
  console.error(`❌ Failed to parse JSON at ${jsonPath}:`, e.message);
  process.exit(1);
}

export const VALID_SCENE_TYPES = [
  "title",
  "pills",
  "card",
  "code",
  "grid",
  "orbit",
  "stamp",
  "compare",
  "stat",
  "steps",
  "quote",
  "cta",
  "diagram",
  "terminal",
  "chart",
  "bot",
  "knobs",
  "stacked",
  "flow",
];

const baseSceneSchema = z.object({
  id: z.string().min(1, "Scene id is required"),
  startSec: z.number().min(0).optional(),
  endSec: z.number().min(0).optional(),
  voice: z.string().min(1, "Scene voice line is required"),
  leadIn: z.string().optional(),
  subtitle: z.string().optional(),
});

const sceneTypeMap = {
  title: baseSceneSchema.extend({
    type: z.literal("title"),
    headline: z.string().min(1, "Headline is required for title scene"),
  }),
  pills: baseSceneSchema.extend({
    type: z.literal("pills"),
    headline: z.string().min(1, "Headline is required for pills scene"),
    items: z.array(z.string()).optional(),
    pills: z.array(z.string()).optional(),
  }).refine((d) => (d.items && d.items.length > 0) || (d.pills && d.pills.length > 0), {
    message: "At least one pill item is required (in 'items' or 'pills')",
  }),
  card: baseSceneSchema.extend({
    type: z.literal("card"),
    headline: z.string().optional(),
    cardText: z.string().optional(),
    body: z.string().optional(),
    chip: z.string().optional(),
    badge: z.string().optional(),
  }),
  code: baseSceneSchema.extend({
    type: z.literal("code"),
    headline: z.string().min(1, "Headline is required for code scene"),
    filename: z.string().min(1, "filename is required for code scene"),
    lines: z.array(z.string()).min(1, "At least one line required for code scene"),
    highlightLines: z.array(z.number()).optional(),
  }),
  grid: baseSceneSchema.extend({
    type: z.literal("grid"),
    headline: z.string().min(1, "Headline is required for grid scene"),
    cells: z.array(z.string()).min(2, "At least 2 cells required for grid scene"),
    savedIndex: z.number().int().min(0).optional(),
  }),
  orbit: baseSceneSchema.extend({
    type: z.literal("orbit"),
    headline: z.string().min(1, "Headline is required for orbit scene"),
    nodes: z.array(z.string()).optional(),
    orbiting: z.array(z.string()).optional(),
    center: z.string().optional(),
  }).refine(
    (d) => {
      const arr = d.nodes || d.orbiting;
      return arr && arr.length >= 3 && arr.length <= 5;
    },
    { message: "Orbit nodes must have between 3 and 5 items (in 'nodes' or 'orbiting')" }
  ),
  stamp: baseSceneSchema.extend({
    type: z.literal("stamp"),
    headline: z.string().min(1, "Headline is required for stamp scene"),
    stampText: z.string().min(1, "stampText is required for stamp scene"),
  }),
  compare: baseSceneSchema.extend({
    type: z.literal("compare"),
    headline: z.string().min(1, "Headline is required for compare scene"),
    left: z.object({ label: z.string(), items: z.array(z.string()).optional() }).optional(),
    right: z.object({ label: z.string(), items: z.array(z.string()).optional() }).optional(),
    leftLabel: z.string().optional(),
    rightLabel: z.string().optional(),
  }),
  stat: baseSceneSchema.extend({
    type: z.literal("stat"),
    headline: z.string().optional(),
    value: z.union([z.number(), z.string()]),
    label: z.string().min(1, "label is required for stat scene"),
  }),
  steps: baseSceneSchema.extend({
    type: z.literal("steps"),
    headline: z.string().min(1, "Headline is required for steps scene"),
    items: z.array(z.string()).optional(),
    steps: z.array(z.string()).optional(),
  }).refine((d) => (d.items && d.items.length > 0) || (d.steps && d.steps.length > 0), {
    message: "At least one step item is required (in 'items' or 'steps')",
  }),
  quote: baseSceneSchema.extend({
    type: z.literal("quote"),
    headline: z.string().optional(),
    text: z.string().min(1, "Quote text is required"),
    author: z.string().optional(),
  }),
  cta: baseSceneSchema.extend({
    type: z.literal("cta"),
    headline: z.string().min(1, "Headline is required for cta scene"),
    buttonText: z.string().optional(),
    callToAction: z.string().optional(),
  }).refine((d) => Boolean(d.buttonText || d.callToAction), {
    message: "buttonText or callToAction is required for cta scene",
  }),
  diagram: baseSceneSchema.extend({
    type: z.literal("diagram"),
    headline: z.string().min(1, "Headline is required for diagram scene"),
    flow: z.string().optional(),
    sourceLabel: z.string().optional(),
    middleLabel: z.string().optional(),
    targetLabels: z.array(z.string()).optional(),
    steps: z.array(z.string()).optional(),
  }),
  terminal: baseSceneSchema.extend({
    type: z.literal("terminal"),
    headline: z.string().optional(),
    subheadline: z.string().optional(),
    command: z.string().optional(),
    path: z.string().optional(),
    branch: z.string().optional(),
    output: z.array(z.any()).optional(),
  }),
  chart: baseSceneSchema.extend({
    type: z.literal("chart"),
    headline: z.string().optional(),
    subheadline: z.string().optional(),
    chartType: z.enum(["bar", "metric"]).optional(),
    maxValue: z.number().optional(),
    items: z.array(z.any()).optional(),
    metricValue: z.string().optional(),
    metricLabel: z.string().optional(),
    metricComparison: z.string().optional(),
    metricIcon: z.string().optional(),
  }),
  bot: baseSceneSchema.extend({
    type: z.literal("bot"),
    headline: z.string().optional(),
    strikes: z.array(z.string()).optional(),
    confirmText: z.string().optional(),
    expression: z.enum(["happy", "winking", "curious"]).optional(),
  }),
  knobs: baseSceneSchema.extend({
    type: z.literal("knobs"),
    headline: z.string().optional(),
    mode: z.enum(["knobs", "weights"]).optional(),
    title: z.string().optional(),
    pill1: z.string().optional(),
    pill2: z.string().optional(),
  }),
  stacked: baseSceneSchema.extend({
    type: z.literal("stacked"),
    headline: z.string().optional(),
    cards: z.array(z.any()).optional(),
    isPipeline: z.boolean().optional(),
  }),
  flow: baseSceneSchema.extend({
    type: z.literal("flow"),
    headline: z.string().optional(),
    nodes: z.array(z.any()).optional(),
    steps: z.array(z.any()).optional(),
    flow: z.array(z.any()).optional(),
    brand: z.string().optional(),
  }),
};

const metaSchema = z.object({
  slug: z.string().min(1),
  title: z.string().optional(),
  topic: z.string().optional(),
  handle: z.string().min(1),
  voiceFile: z.string().optional(),
  wordsFile: z.string().nullable().optional(),
  loop: z.boolean().default(true),
  accentOverride: z.string().nullable().optional(),
  captions: z.boolean().default(true),
  avatar: z
    .object({
      enabled: z.boolean().optional(),
      position: z.enum(["left", "right"]).optional(),
    })
    .optional(),
  audience: z.string().optional(),
  lengthSec: z.number().optional(),
  language: z.string().optional(),
});

console.log(`\n🔍 Validating reel: ${jsonPath}`);
let hasErrors = false;
const warnings = [];

// Validate Meta
const metaResult = metaSchema.safeParse(rawData.meta);
if (!metaResult.success) {
  hasErrors = true;
  console.error("\n❌ Meta validation failed:");
  metaResult.error.issues.forEach((issue) => {
    console.error(`   - [meta.${issue.path.join(".")}] ${issue.message}`);
  });
}

// Check Voice File
const voiceFilePath = rawData.meta?.voiceFile || `reels/${rawData.meta?.slug || inputSlug}/voice.mp3`;
const voiceFullPath = path.join(rootDir, "public", voiceFilePath);

if (!fs.existsSync(voiceFullPath)) {
  const possiblePaths = [
    path.join(rootDir, "reels", inputSlug, "voice.mp3"),
    rawData.meta?.slug ? path.join(rootDir, "reels", rawData.meta.slug, "voice.mp3") : null,
    path.join(rootDir, "public", "reels", inputSlug, "voice.mp3"),
  ].filter(Boolean);

  let found = false;
  for (const altPath of possiblePaths) {
    if (fs.existsSync(altPath)) {
      fs.mkdirSync(path.dirname(voiceFullPath), { recursive: true });
      fs.copyFileSync(altPath, voiceFullPath);
      console.log(`ℹ️ Auto-copied voice file from ${altPath} to ${voiceFullPath}`);
      found = true;
      break;
    }
  }

  if (!found) {
    hasErrors = true;
    console.error(`❌ Voice file not found at: ${voiceFullPath}`);
    console.error(`   Please place your voice audio at public/${voiceFilePath}`);
  }
}

// Check & Auto-Heal BGM File
if (rawData.meta?.bgm) {
  if (typeof rawData.meta.bgm === "string") {
    const cleanBgm = rawData.meta.bgm.replace(/^\/?public\//, "").replace(/^\//, "");
    const bgmFullPath = path.join(rootDir, "public", cleanBgm);
    const bgmSubdirPath = path.join(rootDir, "public", "bgm", path.basename(cleanBgm));
    const fallbackPath = path.join(rootDir, "public", "bgm", "cyber-groove.mp3");

    if (!fs.existsSync(bgmFullPath)) {
      if (fs.existsSync(bgmSubdirPath)) {
        rawData.meta.bgm = `bgm/${path.basename(cleanBgm)}`;
        console.log(`ℹ️ Auto-resolved BGM to: ${rawData.meta.bgm}`);
      } else if (fs.existsSync(fallbackPath)) {
        console.log(`⚠️ Warning: BGM file "${cleanBgm}" not found. Auto-healed to "bgm/cyber-groove.mp3"`);
        rawData.meta.bgm = "bgm/cyber-groove.mp3";
      } else {
        warnings.push(`BGM file "${cleanBgm}" not found and no fallback available.`);
        rawData.meta.bgm = false;
      }

      // Write healed config back
      fs.writeFileSync(jsonPath, JSON.stringify(rawData, null, 2), "utf-8");
      const altReelJson = jsonPath.includes("/public/reels/")
        ? jsonPath.replace("/public/reels/", "/reels/")
        : jsonPath.replace("/reels/", "/public/reels/");
      if (fs.existsSync(path.dirname(altReelJson))) {
        fs.writeFileSync(altReelJson, JSON.stringify(rawData, null, 2), "utf-8");
      }
    }
  }
}

// Validate Scenes
if (!Array.isArray(rawData.scenes) || rawData.scenes.length === 0) {
  hasErrors = true;
  console.error("❌ Scenes validation failed: 'scenes' must be a non-empty array.");
} else {
  let modified = false;
  rawData.scenes = rawData.scenes.map((scene, idx) => {
    const s = { ...scene };
    if (!s.id) { s.id = `scene-${idx + 1}`; modified = true; }
    if (s.type === "card") {
      const text = s.cardText || s.body || s.text || s.content || s.desc || s.description || s.headline || "Key Takeaway";
      const chip = s.chip || s.badge || s.tag || s.leadIn || "KEY HIGHLIGHT";
      if (s.cardText !== text || s.chip !== chip) {
        s.cardText = text;
        s.chip = chip;
        modified = true;
      }
    }
    if (s.type === "pills") {
      if (!Array.isArray(s.items) && Array.isArray(s.pills)) { s.items = s.pills; modified = true; }
    }
    if (s.type === "cta") {
      if (!s.buttonText && s.callToAction) { s.buttonText = s.callToAction; modified = true; }
    }
    return s;
  });

  if (modified) {
    fs.writeFileSync(jsonPath, JSON.stringify(rawData, null, 2), "utf-8");
    const altReelJson = jsonPath.includes("/public/reels/")
      ? jsonPath.replace("/public/reels/", "/reels/")
      : jsonPath.replace("/reels/", "/public/reels/");
    if (fs.existsSync(path.dirname(altReelJson))) {
      fs.writeFileSync(altReelJson, JSON.stringify(rawData, null, 2), "utf-8");
    }
  }

  rawData.scenes.forEach((scene, idx) => {
    const scenePrefix = `Scene #${idx + 1} (${scene.id || "no-id"})`;
    if (!scene.type) {
      hasErrors = true;
      console.error(`❌ ${scenePrefix}: Missing 'type'. Valid types: ${VALID_SCENE_TYPES.join(", ")}`);
      return;
    }

    if (!VALID_SCENE_TYPES.includes(scene.type)) {
      hasErrors = true;
      console.error(
        `❌ ${scenePrefix}: Unknown scene type "${scene.type}". Valid types are: ${VALID_SCENE_TYPES.join(", ")}`
      );
      return;
    }

    const schema = sceneTypeMap[scene.type];
    const res = schema.safeParse(scene);
    if (!res.success) {
      hasErrors = true;
      console.error(`❌ ${scenePrefix} [type: ${scene.type}] failed validation:`);
      res.error.issues.forEach((issue) => {
        console.error(`   - [${issue.path.join(".")}] ${issue.message}`);
      });
    }
  });
}

// Check Words File if specified
if (rawData.meta?.wordsFile) {
  const wordsFullPath = path.join(rootDir, "public", rawData.meta.wordsFile);
  if (!fs.existsSync(wordsFullPath)) {
    warnings.push(`wordsFile specified (${rawData.meta.wordsFile}) but not found. Fallback even-split will be used.`);
  }
}

// Check Timings & Overlaps
if (Array.isArray(rawData.scenes)) {
  for (let i = 0; i < rawData.scenes.length - 1; i++) {
    const s1 = rawData.scenes[i];
    const s2 = rawData.scenes[i + 1];
    if (typeof s1.endSec === "number" && typeof s2.startSec === "number") {
      if (s1.endSec > s2.startSec) {
        warnings.push(
          `Overlapping scene times: Scene ${s1.id} ends at ${s1.endSec}s but Scene ${s2.id} starts at ${s2.startSec}s.`
        );
      }
    }
  }

  // Check Headline Lengths
  rawData.scenes.forEach((scene) => {
    if (scene.headline) {
      const cleanLen = scene.headline.replace(/\*/g, "").trim().length;
      if (cleanLen > 60) {
        warnings.push(
          `Scene ${scene.id} headline is very long (${cleanLen} chars). It will auto-shrink, but consider shortening.`
        );
      }
    }
  });

  // Check Loop Echo
  if (rawData.meta?.loop) {
    const firstScene = rawData.scenes[0];
    const lastScene = rawData.scenes[rawData.scenes.length - 1];
    if (firstScene?.headline && lastScene?.headline) {
      const norm1 = firstScene.headline.toLowerCase().replace(/[^\w]/g, "");
      const norm2 = lastScene.headline.toLowerCase().replace(/[^\w]/g, "");
      if (!norm2.includes(norm1) && !norm1.includes(norm2)) {
        warnings.push(
          `Missing loop echo: meta.loop is true, but final scene headline ("${lastScene.headline}") does not echo the first scene headline ("${firstScene.headline}").`
        );
      }
    }
  }
}

if (warnings.length > 0) {
  console.warn("\n⚠️ Warnings:");
  warnings.forEach((w) => console.warn(`   - ${w}`));
}

if (hasErrors) {
  console.error("\n💥 Validation failed. Please fix the errors listed above.\n");
  process.exit(1);
} else {
  console.log("\n✅ Validation passed successfully! Reel is ready for preview and rendering.\n");
  process.exit(0);
}
