import { useUpdateAccountTheme } from "../lib/actions";
import { defaultThemeConfig } from "../configs";
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const THEME_COOKIE_NAME = 'userTheme';

export default function useTheme() {
  const { updateTheme, isSubmitting, isSubmitted, error } = useUpdateAccountTheme();

  // State to hold the theme, initialized with a default value
  const [theme, setTheme] = useState(defaultThemeConfig);

  useEffect(() => {
    // Update the theme state with the value from cookies if available
    const cookieTheme = Cookies.get(THEME_COOKIE_NAME);
    if (cookieTheme) {
      try {
        const parsedTheme = JSON.parse(cookieTheme);
        setTheme(parsedTheme);
      } catch (e) {
        console.error('Error parsing theme from cookie:', e);
        setTheme(defaultThemeConfig); // Fallback to default theme
      }
    }
  }, []);

  return [theme, updateTheme, isSubmitting, isSubmitted, error];
}
