import { useEffect, useState } from "react";
import { startCase } from "lodash";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "../hooks";
import { themeConfig, defaultThemeConfig } from "../configs";

const StylesProvider = () => {
  const [themeStorage, setThemeStorage] = useTheme();
  const [isClient, setIsClient] = useState(false);

  console.log("da",themeStorage);
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Ensure hooks are not conditionally called
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const isExtraLargeScreen = useMediaQuery({ query: "(min-width: 1280px)" });

  if (!isClient) {
    return null;
  }

  const {
    mode,
    color,
    sidebar,
    layout,
    orientation,
    fontFamily,
    isMobile,
    borderRadius,
  } = themeStorage || defaultThemeConfig;

  const isHorizontal = orientation === "horizontal";
  const { colors, sidebars } = themeConfig || {};

  const sidebarWidth = isLargeScreen ? (isHorizontal ? 0 : sidebars?.[sidebar] || "0") : 0;
  const aside = 320;
  const asideMobile = isExtraLargeScreen ? aside : 0;
  const navHeight = 80;
  const playerHeight = 70;

  const themeObj = colors?.[color] || {};
  const sT = sidebars?.[sidebar] || "0";

  const {
    neutralBg = "transparent",
    neutralBgOpacity = "transparent",
    neutralBgAlt = "transparent",
    onNeutralBg = "black",
    onNeutralBgSecondary = "grey",
    player = "transparent",
    onNeutralBgDivider = "black",
    switchBg = "transparent",
    cardBg = "transparent",
    cardSkeletonBg = "transparent",
    cardBgHover = "transparent",
  } = themeObj;

  const {
    primary = "#000000",
    primaryOpacity = "rgba(0, 0, 0, 0.1)",
    primaryLightGray = "#cccccc",
  } = colors?.[color] || {};

  const styles = `
    :root {
      --primary: ${primary};
      --primary-light-gray: ${primaryLightGray};
      --primary-opacity: ${primaryOpacity};
      --neutralBg: ${neutralBg};
      --neutralBgOpacity: ${neutralBgOpacity};
      --neutralBgAlt: ${neutralBgAlt};
      --onNeutralBg: ${onNeutralBg};
      --onNeutralBgSecondary: ${onNeutralBgSecondary};
      --playerBg: ${player};
      --onNeutralBgDivider: ${onNeutralBgDivider};
      --switchBg: ${switchBg};
      --cardBg: ${cardBg};
      --cardSkeletonBg: ${cardSkeletonBg};
      --cardBgHover: ${cardBgHover};
      --sidebar-width: ${isMobile ? sidebars["full"] : sT}px;
      --aside-width: ${aside}px;
      --sidebar-horizontal-width: ${sidebarWidth}px;
      --nav-height: ${navHeight}px;
      --nav-width: calc(100vw - ${asideMobile}px);
      --player-height: ${playerHeight}px;
      --logo-width: ${120}px;

      --main-width: calc(100% - ${sidebarWidth}px - ${asideMobile}px);
      --main-margin-top: ${isHorizontal && !isMobile ? `${navHeight * 2}px` : `${navHeight}px`};
      --direction: ${layout};
      --font-family: ${startCase(fontFamily)};
      --border-radius: ${borderRadius}px;
    }
  `;

  return <style>{styles}</style>;
};

export default StylesProvider;
