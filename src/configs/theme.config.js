// Define theme configuration
export const themeConfig = {
  modes: ["light", "dark"],
  colors: {
    pink: {
      primary: "#fe366e",
      primaryLightGray: "#be123c",
      primaryOpacity: "rgba(237, 33, 93, 0.075)",
    },
    cyan: {
      primary: "#0891b2",
      primaryLightGray: "#107490",
      primaryOpacity: "rgba(16, 116, 144, 0.1)",
    },
    emerald: {
      primary: "#009688",
      primaryLightGray: "#0f766e",
      primaryOpacity: "rgba(0, 150, 136, 0.1)",
    },
    purple: {
      primary: "#8c7cf0",
      primaryLightGray: "#0369A1",
      primaryOpacity: "rgba(110, 23, 203, 0.1)",
    },
    amber: {
      primary: "#c77e23",
      primaryLightGray: "#965e19",
      primaryOpacity: "rgba(199, 126, 35, 0.1)",
    },
  },
  themes: {
    // Define your theme objects if needed
  },
  layouts: ["ltr", "rtl"],
  orientations: ["vertical", "horizontal"],
  players: ["lined", "boxed"],
  fontFamilies: ["fira sans", "roboto", "lato", "inter", "poppins"],
  sidebars: {
    folded: "80",
    full: "200",
  },
};

// Initialize `prefersDark` safely
let prefersDark = false;

if (typeof window !== "undefined") {
  prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// Define `defaultThemeConfig` using `prefersDark`
export const defaultThemeConfig = {
  mode: themeConfig.modes[prefersDark ? 1 : 0] || "light",
  layout: themeConfig.layouts[0] || "ltr",
  color: Object.keys(themeConfig.colors)[2] || "emerald",
  sidebar: Object.keys(themeConfig.sidebars)[1] || "full",
  orientation: themeConfig.orientations[0] || "vertical",
  fontFamily: themeConfig.fontFamilies[0] || "fira sans",
  player: themeConfig.players[0] || "lined",
  borderRadius: 6,
};
