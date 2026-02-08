import { globalTheme } from "./global";
import { indiaTheme } from "./india";
import { RegionalTheme, Region } from "./types";

export const themes: Record<Region, RegionalTheme> = {
    Global: globalTheme,
    India: indiaTheme,
    USA: globalTheme, // Fallback for now
};

export * from "./types";
export * from "./global";
export * from "./india";
