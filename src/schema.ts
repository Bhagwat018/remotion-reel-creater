import { z } from "zod";

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
] as const;

export type SceneType = (typeof VALID_SCENE_TYPES)[number];

const baseSceneSchema = z.object({
  id: z.string().min(1, "Scene id is required"),
  startSec: z.number().min(0).optional(),
  endSec: z.number().min(0).optional(),
  voice: z.string().min(1, "Scene voice line is required"),
  leadIn: z.string().optional(),
  subtitle: z.string().optional(),
});

export const titleSceneSchema = baseSceneSchema
  .extend({
    type: z.literal("title"),
    headline: z.string().min(1, "Headline is required for title scene"),
  })
  .transform((data) => ({
    ...data,
    leadIn: data.leadIn || data.subtitle,
  }));

export const pillsSceneSchema = baseSceneSchema
  .extend({
    type: z.literal("pills"),
    headline: z.string().min(1, "Headline is required for pills scene"),
    items: z.array(z.string()).optional(),
    pills: z.array(z.string()).optional(),
  })
  .transform((data) => ({
    ...data,
    leadIn: data.leadIn || data.subtitle,
    items: data.items || data.pills || [],
  }));

export const cardSceneSchema = baseSceneSchema
  .extend({
    type: z.literal("card"),
    headline: z.string().min(1, "Headline is required for card scene"),
    cardText: z.string().min(1, "cardText is required for card scene"),
    chip: z.string().min(1, "chip label is required for card scene"),
  })
  .transform((data) => ({
    ...data,
    leadIn: data.leadIn || data.subtitle,
  }));

export const codeSceneSchema = baseSceneSchema
  .extend({
    type: z.literal("code"),
    headline: z.string().min(1, "Headline is required for code scene"),
    filename: z.string().min(1, "filename is required for code scene"),
    lines: z.array(z.string()).min(1, "At least one line is required for code scene"),
    highlightLines: z.array(z.number()).optional().default([]),
  })
  .transform((data) => ({
    ...data,
    leadIn: data.leadIn || data.subtitle,
  }));

export const gridSceneSchema = baseSceneSchema
  .extend({
    type: z.literal("grid"),
    headline: z.string().min(1, "Headline is required for grid scene"),
    cells: z.array(z.string()).min(2, "At least two cells are required for grid scene"),
    savedIndex: z.number().int().min(0).default(0),
  })
  .transform((data) => ({
    ...data,
    leadIn: data.leadIn || data.subtitle,
  }));

export const orbitSceneSchema = baseSceneSchema
  .extend({
    type: z.literal("orbit"),
    headline: z.string().min(1, "Headline is required for orbit scene"),
    nodes: z.array(z.string()).optional(),
    orbiting: z.array(z.string()).optional(),
    center: z.string().optional(),
  })
  .transform((data) => ({
    ...data,
    leadIn: data.leadIn || data.subtitle,
    nodes: data.nodes || data.orbiting || [],
  }));

export const stampSceneSchema = baseSceneSchema
  .extend({
    type: z.literal("stamp"),
    headline: z.string().min(1, "Headline is required for stamp scene"),
    stampText: z.string().min(1, "stampText is required for stamp scene"),
  })
  .transform((data) => ({
    ...data,
    leadIn: data.leadIn || data.subtitle,
  }));

export const compareSceneSchema = baseSceneSchema
  .extend({
    type: z.literal("compare"),
    headline: z.string().min(1, "Headline is required for compare scene"),
    left: z
      .object({
        label: z.string(),
        items: z.array(z.string()).default([]),
      })
      .optional(),
    right: z
      .object({
        label: z.string(),
        items: z.array(z.string()).default([]),
      })
      .optional(),
    leftLabel: z.string().optional(),
    rightLabel: z.string().optional(),
  })
  .transform((data) => {
    // Helper to parse "Vertical (Bigger Server)" into label and items
    const parseSide = (
      obj?: { label: string; items: string[] },
      labelStr?: string,
      defaultLabel = "Option"
    ) => {
      if (obj) return obj;
      if (!labelStr) return { label: defaultLabel, items: [] };

      const match = labelStr.match(/^(.*?)\s*\((.*?)\)$/);
      if (match) {
        return {
          label: match[1].trim(),
          items: [match[2].trim()],
        };
      }
      return {
        label: labelStr,
        items: [],
      };
    };

    return {
      ...data,
      leadIn: data.leadIn || data.subtitle,
      left: parseSide(data.left, data.leftLabel, "Before"),
      right: parseSide(data.right, data.rightLabel, "After"),
    };
  });

export const statSceneSchema = baseSceneSchema
  .extend({
    type: z.literal("stat"),
    headline: z.string().optional(),
    value: z.union([z.number(), z.string()]),
    label: z.string().min(1, "label is required for stat scene"),
  })
  .transform((data) => ({
    ...data,
    leadIn: data.leadIn || data.subtitle,
  }));

export const stepsSceneSchema = baseSceneSchema
  .extend({
    type: z.literal("steps"),
    headline: z.string().min(1, "Headline is required for steps scene"),
    items: z.array(z.string()).optional(),
    steps: z.array(z.string()).optional(),
  })
  .transform((data) => ({
    ...data,
    leadIn: data.leadIn || data.subtitle,
    items: data.items || data.steps || [],
  }));

export const quoteSceneSchema = baseSceneSchema
  .extend({
    type: z.literal("quote"),
    headline: z.string().optional(),
    text: z.string().min(1, "Quote text is required"),
    author: z.string().optional(),
  })
  .transform((data) => ({
    ...data,
    leadIn: data.leadIn || data.subtitle,
  }));

export const ctaSceneSchema = baseSceneSchema
  .extend({
    type: z.literal("cta"),
    headline: z.string().min(1, "Headline is required for cta scene"),
    buttonText: z.string().optional(),
    callToAction: z.string().optional(),
  })
  .transform((data) => ({
    ...data,
    leadIn: data.leadIn || data.subtitle,
    buttonText: data.buttonText || data.callToAction || "FOLLOW FOR MORE",
  }));

export const diagramSceneSchema = baseSceneSchema
  .extend({
    type: z.literal("diagram"),
    headline: z.string().min(1, "Headline is required for diagram scene"),
    flow: z.string().optional().default("load-balancer"),
    sourceLabel: z.string().optional().default("Clients / Users"),
    middleLabel: z.string().optional().default("Load Balancer"),
    targetLabels: z.array(z.string()).optional().default(["Server A", "Server B", "Server C"]),
    steps: z.array(z.string()).optional(),
  })
  .transform((data) => ({
    ...data,
    leadIn: data.leadIn || data.subtitle,
  }));

export const terminalSceneSchema = baseSceneSchema
  .extend({
    type: z.literal("terminal"),
    headline: z.string().optional(),
    subheadline: z.string().optional(),
    command: z.string().optional().default("claude run --agent"),
    path: z.string().optional().default("~/dev/project"),
    branch: z.string().optional().default("main"),
    output: z.array(z.union([z.string(), z.object({ text: z.string(), type: z.string().optional() })])).optional(),
  })
  .transform((data) => ({
    ...data,
    leadIn: data.leadIn || data.subtitle,
  }));

export const chartSceneSchema = baseSceneSchema
  .extend({
    type: z.literal("chart"),
    headline: z.string().optional(),
    subheadline: z.string().optional(),
    chartType: z.enum(["bar", "metric"]).optional().default("bar"),
    maxValue: z.number().optional().default(100),
    items: z
      .array(
        z.object({
          label: z.string(),
          value: z.number(),
          displayValue: z.string().optional(),
          color: z.string().optional(),
          icon: z.string().optional(),
          badge: z.string().optional(),
        })
      )
      .optional(),
    metricValue: z.string().optional(),
    metricLabel: z.string().optional(),
    metricComparison: z.string().optional(),
    metricIcon: z.string().optional(),
  })
  .transform((data) => ({
    ...data,
    leadIn: data.leadIn || data.subtitle,
  }));

export const sceneSchema = z.discriminatedUnion("type", [
  titleSceneSchema,
  pillsSceneSchema,
  cardSceneSchema,
  codeSceneSchema,
  gridSceneSchema,
  orbitSceneSchema,
  stampSceneSchema,
  compareSceneSchema,
  statSceneSchema,
  stepsSceneSchema,
  quoteSceneSchema,
  ctaSceneSchema,
  diagramSceneSchema,
  terminalSceneSchema,
  chartSceneSchema,
]);

export type TitleSceneProps = z.infer<typeof titleSceneSchema>;
export type PillsSceneProps = z.infer<typeof pillsSceneSchema>;
export type CardSceneProps = z.infer<typeof cardSceneSchema>;
export type CodeSceneProps = z.infer<typeof codeSceneSchema>;
export type GridSceneProps = z.infer<typeof gridSceneSchema>;
export type OrbitSceneProps = z.infer<typeof orbitSceneSchema>;
export type StampSceneProps = z.infer<typeof stampSceneSchema>;
export type CompareSceneProps = z.infer<typeof compareSceneSchema>;
export type StatSceneProps = z.infer<typeof statSceneSchema>;
export type StepsSceneProps = z.infer<typeof stepsSceneSchema>;
export type QuoteSceneProps = z.infer<typeof quoteSceneSchema>;
export type CtaSceneProps = z.infer<typeof ctaSceneSchema>;
export type DiagramSceneProps = z.infer<typeof diagramSceneSchema>;
export type TerminalSceneProps = z.infer<typeof terminalSceneSchema>;
export type ChartSceneProps = z.infer<typeof chartSceneSchema>;

export type SceneData =
  | TitleSceneProps
  | PillsSceneProps
  | CardSceneProps
  | CodeSceneProps
  | GridSceneProps
  | OrbitSceneProps
  | StampSceneProps
  | CompareSceneProps
  | StatSceneProps
  | StepsSceneProps
  | QuoteSceneProps
  | CtaSceneProps
  | DiagramSceneProps
  | TerminalSceneProps
  | ChartSceneProps;

export const avatarSchema = z.object({
  enabled: z.boolean().default(true),
  position: z.enum(["left", "right"]).default("left"),
});

export type AvatarConfig = z.infer<typeof avatarSchema>;

export const metaSchema = z
  .object({
    slug: z.string().min(1, "Slug is required"),
    title: z.string().optional(),
    topic: z.string().optional(),
    handle: z.string().min(1, "Handle is required").default("@techwith.GenZ"),
    voiceFile: z.string().optional(),
    wordsFile: z.string().nullable().optional(),
    loop: z.boolean().default(true),
    accentOverride: z.string().nullable().optional(),
    captions: z.boolean().default(true),
    avatar: avatarSchema.optional().default({ enabled: true, position: "left" }),
    audience: z.string().optional(),
    lengthSec: z.number().optional(),
    language: z.string().optional(),
    bgm: z.union([z.boolean(), z.string()]).optional().default(true),
    bgmVolume: z.number().min(0).max(1).optional().default(0.18),
    captionStyle: z.enum(["bubble", "kinetic", "both", "none"]).optional().default("bubble"),
    showSafeZone: z.boolean().optional().default(false),
    coverIntro: z.boolean().optional().default(false),
  })
  .transform((meta) => {
    const slug = meta.slug;
    return {
      ...meta,
      title: meta.title || meta.topic || slug,
      handle: (!meta.handle || meta.handle === "@yourhandle") ? "@techwith.GenZ" : meta.handle,
      voiceFile: meta.voiceFile || `reels/${slug}/voice.mp3`,
      loop: meta.loop ?? true,
      captions: meta.captions ?? true,
      avatar: meta.avatar ?? { enabled: true, position: "left" },
      bgm: meta.bgm ?? true,
      bgmVolume: meta.bgmVolume ?? 0.18,
      captionStyle: meta.captionStyle ?? "bubble",
      showSafeZone: meta.showSafeZone ?? false,
      coverIntro: meta.coverIntro ?? false,
    };
  });

export type ReelMeta = z.infer<typeof metaSchema>;

export const reelSchema = z.object({
  meta: metaSchema,
  scenes: z.array(sceneSchema).min(1, "At least one scene is required"),
});

export type ReelData = {
  meta: ReelMeta;
  scenes: SceneData[];
};

export const wordTimestampSchema = z.object({
  word: z.string(),
  startSec: z.number(),
  endSec: z.number(),
});

export type WordTimestamp = z.infer<typeof wordTimestampSchema>;
