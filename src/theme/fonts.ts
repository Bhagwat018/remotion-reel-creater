import { delayRender, continueRender } from "remotion";
import { loadFont as loadAnton } from "@remotion/google-fonts/Anton";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadDevanagari } from "@remotion/google-fonts/NotoSansDevanagari";

// Load Google Fonts
const antonFont = loadAnton("normal", {
  subsets: ["latin"],
});
const interFont = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});
const monoFont = loadMono("normal", {
  weights: ["400", "500", "700"],
  subsets: ["latin"],
  ignoreTooManyRequestsWarning: true,
});
const devanagariFont = loadDevanagari("normal", {
  weights: ["700"],
  subsets: ["devanagari", "latin"],
  ignoreTooManyRequestsWarning: true,
});

export const fontFamilies = {
  headline: antonFont.fontFamily,
  leadIn: interFont.fontFamily,
  ui: interFont.fontFamily,
  mono: monoFont.fontFamily,
  devanagari: devanagariFont.fontFamily,
};

// Regex to detect Devanagari Unicode characters (Hindi, Marathi, Nepali, Sanskrit, etc.)
const DEVANAGARI_REGEX = /[\u0900-\u097F]/;

/**
 * Returns true if text contains Devanagari characters.
 */
export const hasDevanagari = (text?: string | null): boolean => {
  if (!text) return false;
  return DEVANAGARI_REGEX.test(text);
};

/**
 * Automatically resolves font family, picking Noto Sans Devanagari if Devanagari script is detected.
 */
export const resolveFontFamily = (
  text: string | undefined | null,
  fallbackFamily: string
): string => {
  if (hasDevanagari(text)) {
    return `${fontFamilies.devanagari}, sans-serif`;
  }
  return fallbackFamily;
};

let fontLoadPromise: Promise<void> | null = null;

/**
 * Ensures all fonts are loaded before Remotion continues rendering.
 * Safe to call at root or scene level.
 */
export const ensureFontsLoaded = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  if (!fontLoadPromise) {
    const handle = delayRender("Loading fonts via @remotion/google-fonts");
    fontLoadPromise = Promise.all([
      antonFont.waitUntilDone(),
      interFont.waitUntilDone(),
      monoFont.waitUntilDone(),
      devanagariFont.waitUntilDone(),
    ])
      .then(() => {
        continueRender(handle);
      })
      .catch((err) => {
        console.warn("Font loading error:", err);
        continueRender(handle);
      });
  }
};
