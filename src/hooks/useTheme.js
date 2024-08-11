import useLocalStorage from "use-local-storage";

import { useUpdateAccountTheme } from "@/lib/actions";
import { defaultThemeConfig } from "@/configs";

export default function useTheme() {
  const { updateTheme: setTheme } = useUpdateAccountTheme();
  const [themeLS] = useLocalStorage("groove-theme-config");

  const theme = themeLS || 
   defaultThemeConfig;

  return [theme, setTheme];
}
