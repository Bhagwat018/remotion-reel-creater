import React, { createContext, useContext } from "react";
import { fontFamilies, hasDevanagari, resolveFontFamily } from "./fonts";

export interface ThemeTokens {
  colors: {
    bg: string;
    grid: string;
    ink: string;
    card: string;
    cardText: string;
    muted: string;
    accent: string;
    accentText: string;
  };
  typography: {
    headline: string;
    leadIn: string;
    ui: string;
    mono: string;
    devanagari: string;
  };
  layout: {
    width: number;
    height: number;
    safeTop: number;
    safeBottom: number;
    sideMargin: number;
    handleBottom: number;
    cardRadius: number;
    pillRadius: number;
  };
  motion: {
    fps: number;
    springConfig: {
      damping: number;
      stiffness: number;
      mass: number;
    };
    blurIn: {
      from: number;
      to: number;
      durationFrames: number;
    };
    blurOut: {
      from: number;
      to: number;
      durationFrames: number;
    };
    stagger: number;
    sceneCrossfadeFrames: number;
    stars: {
      count: number;
      minSize: number;
      maxSize: number;
      rotationSpeed: number;
    };
  };
}

export const baseTheme: ThemeTokens = {
  colors: {
    bg: "#E1E1E1",
    grid: "rgba(0, 0, 0, 0.05)",
    ink: "#0E0E0E",
    card: "#202020",
    cardText: "#F2F2F2",
    muted: "#8A8A8A",
    accent: "#2563FF",
    accentText: "#FFFFFF",
  },
  typography: {
    headline: fontFamilies.headline,
    leadIn: fontFamilies.leadIn,
    ui: fontFamilies.ui,
    mono: fontFamilies.mono,
    devanagari: fontFamilies.devanagari,
  },
  layout: {
    width: 1080,
    height: 1920,
    safeTop: 260,
    safeBottom: 380,
    sideMargin: 80,
    handleBottom: 220,
    cardRadius: 24,
    pillRadius: 999,
  },
  motion: {
    fps: 30,
    springConfig: {
      damping: 18,
      stiffness: 100,
      mass: 1,
    },
    blurIn: {
      from: 14,
      to: 0,
      durationFrames: 10,
    },
    blurOut: {
      from: 0,
      to: 14,
      durationFrames: 8,
    },
    stagger: 6,
    sceneCrossfadeFrames: 8,
    stars: {
      count: 4,
      minSize: 200,
      maxSize: 320,
      rotationSpeed: 0.12,
    },
  },
};

/**
 * Returns a theme token object, overriding the accent color if requested.
 */
export const resolveTheme = (accentOverride?: string | null): ThemeTokens => {
  if (!accentOverride) {
    return baseTheme;
  }
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      accent: accentOverride,
    },
  };
};

export const theme = baseTheme;

const ThemeContext = createContext<ThemeTokens>(baseTheme);

export const ThemeProvider: React.FC<{
  theme: ThemeTokens;
  children: React.ReactNode;
}> = ({ theme: currentTheme, children }) => {
  return React.createElement(
    ThemeContext.Provider,
    { value: currentTheme },
    children
  );
};

export const useTheme = (): ThemeTokens => {
  return useContext(ThemeContext);
};

export { hasDevanagari, resolveFontFamily };
