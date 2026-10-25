import { loadFont } from "@remotion/google-fonts/Inter";

const { fontFamily } = loadFont("normal", {
  weights: ["500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const theme = {
  colors: {
    background: "#0B0F1A",
    accent: "#00E5A0",
    accentHover: "#10FFB3",
    accentGlow: "rgba(0, 229, 160, 0.4)",
    text: "#FFFFFF",
    mutedText: "#94A3B8",
    cardBg: "rgba(18, 24, 38, 0.8)",
    cardBorder: "rgba(0, 229, 160, 0.25)",
    cardBorderSubtle: "rgba(255, 255, 255, 0.1)",
    danger: "#FF3366",
    dangerGlow: "rgba(255, 51, 102, 0.4)",
    cyan: "#00D2FF",
    purple: "#9D4EDD",
    yellow: "#FFD166",
  },
  handle: "@YOURHANDLE",
  fontFamily,
};
