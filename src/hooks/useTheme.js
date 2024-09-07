import { useUpdateAccountTheme } from "../lib/actions";
import { defaultThemeConfig } from "../configs";
import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

const THEME_COOKIE_NAME = 'userTheme'; // Define the name of the cookie

export default function useTheme() {
  const { updateTheme, isSubmitting, isSubmitted, error } = useUpdateAccountTheme();

  // Initialize theme state with the theme from cookies or default theme
  const initialTheme = //Cookies.get(THEME_COOKIE_NAME) ? JSON.parse(Cookies.get(THEME_COOKIE_NAME)) :
   defaultThemeConfig;
  const [theme, setThemeState] = useState(initialTheme);
  const [isThemeUpdated, setIsThemeUpdated] = useState(false); // Track if the theme has been updated

  // Update theme with the new configuration
  const updateThemeHandler = useCallback(async (newThemeConfig) => {
    try {
      updateTheme(newThemeConfig, {
        onSuccess: (response) => {
          console.log("Theme set2", response);
          if (response) {
           // console.log("Theme set3", response);
            setThemeState(response); // Update with the actual response
            Cookies.set(THEME_COOKIE_NAME, JSON.stringify(response)); // Save theme to cookies
            setIsThemeUpdated(true); // Mark that the theme has been updated
          }
        },
        onError: (error) => {
          console.error('Error updating theme:', error);
        },
      });
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [updateTheme]);

  useEffect(() => {
    if (isThemeUpdated) {
    //  console.log("Theme set end12", theme);
      setIsThemeUpdated(false); // Reset the flag after logging
    }
  }, [isThemeUpdated, theme]);

  //console.log("Theme set end23", theme);

  return [theme, updateThemeHandler, isSubmitting, isSubmitted, error];
}
