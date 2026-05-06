'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from 'styled-components';
import { useSelector } from 'react-redux';

import { lightTheme, darkTheme } from "@/config/theme";
import GlobalStyles from '@/styles/GlobalStyles';
import { selectCurrentTheme } from '@/store/globalSlice';

export default function StyledComponentsRegistry({
  children
}) {
  // Get theme from Redux store
  const themeName = useSelector(selectCurrentTheme);
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  /**
   * @description Memoize the current theme to avoid unnecessary recalculations
   * when the themeName changes.
   * @returns {object} The current theme object (light or dark).
   * 
   */
  const currentTheme = useMemo(() => {
    return themeName === 'dark' ? darkTheme : lightTheme;
  }, [themeName]);

  /** 
   * @description Server-side rendering support for styled-components.
   * This hook ensures that the styles generated on the server are correctly
   * injected into the HTML sent to the client, preventing style flickering
   * and ensuring consistent theming.
   */
  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  /** 
   * @description Client-side rendering: Wrap children with ThemeProvider
   * to apply the selected theme. On the server side, use StyleSheetManager
   * to manage styles.
   * @return {JSX.Element} The themed application wrapped with necessary providers.
   */
  if (typeof window !== 'undefined') {
    return (
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    );
  }

  /** 
   * @description Server-side rendering: Use StyleSheetManager to manage
   * styled-components styles during SSR.
   * @return {JSX.Element} The application wrapped with StyleSheetManager and ThemeProvider.
   */
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyleSheetManager>
  );
}