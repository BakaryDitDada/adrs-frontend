'use client';

import React, { createContext, useContext } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import useCustomTheme from '@/hooks/common/useCustomTheme';

// Create context
const ThemeContext = createContext();

// Custom hook to use theme
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children, themes }) => {
  const themeState = useCustomTheme();
  const { theme, mounted } = themeState;

  // Don't render until we know the theme (avoid hydration mismatch)
  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    );
  }

  // Get the current theme object
  const currentTheme = theme === 'dark' ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={themeState}>
      <StyledThemeProvider theme={currentTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Simple hook for styled-components
export const useTheme = () => {
  const { theme } = useThemeContext();
  return theme === 'dark' ? 'dark' : 'light';
};