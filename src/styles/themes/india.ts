import { RegionalTheme } from "./types";

export const indiaTheme: RegionalTheme = {
  name: "India",
  palette: {
    primary: {
      50: "#fafafa", // Near white
      100: "#f5f5f5", // Very light gray
      200: "#e5e5e5", // Light gray
      300: "#d4d4d4", // Soft gray
      400: "#a3a3a3", // Medium light gray
      500: "#737373", // Medium gray
      600: "#525252", // Medium dark gray
      700: "#404040", // Dark gray
      800: "#262626", // Very dark gray
      900: "#171717", // Near black
      950: "#0a0a0a", // Pure black
    },
    secondary: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e", // Green 500
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
      950: "#052e16",
    },
    accent: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1", // Indigo/Navy-ish
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
      950: "#1e1b4b", // Deep Navy
    },
  },
};
