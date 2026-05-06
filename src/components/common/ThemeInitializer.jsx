'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTheme } from '@/store/globalSlice';

export function ThemeInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedThemeType = localStorage.getItem('themeType');

    if (savedTheme && savedThemeType) {
      dispatch(updateTheme({
        newTheme: savedTheme,
        updatedThemeType: savedThemeType
      }));
      return;
    }

    const prefersDark =
      window.matchMedia?.('(prefers-color-scheme: dark)').matches;

    dispatch(updateTheme({
      newTheme: prefersDark ? 'dark' : 'light',
      updatedThemeType: 'desktop'
    }));
  }, [dispatch]);

  return null;
}

export default ThemeInitializer;