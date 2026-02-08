import { RegionalTheme } from "./types";

export const globalTheme: RegionalTheme = {
  name: "Global",
  palette: {
    primary: {
      50: "#fafafa", // Near white - for light mode backgrounds, hover states
      100: "#f5f5f5", // Very light gray - borders on dark backgrounds
      200: "#e5e5e5", // Light gray - disabled states on dark
      300: "#d4d4d4", // Soft gray - placeholder text on dark
      400: "#a3a3a3", // Medium light gray - secondary text
      500: "#737373", // Medium gray - muted text, icons
      600: "#525252", // Medium dark gray - secondary text on light
      700: "#404040", // Dark gray - body text
      800: "#262626", // Very dark gray - headings, primary text
      900: "#171717", // Near black - high contrast text
      950: "#0a0a0a", // Pure black - primary buttons, strongest emphasis
    },
    secondary: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617",
    },
    accent: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
      950: "#082f49",
    },
  },
};
