'use client'

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTheme, selectCurrentTheme, selectCurrentThemeType } from '@/store/globalSlice';

const useCustomTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectCurrentTheme);
  const themeType = useSelector(selectCurrentThemeType);

  useEffect(() => {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    const storedThemeType = localStorage.getItem('themeType');

    let newTheme;
    let updatedThemeType;

    if (storedTheme) {
      newTheme = storedTheme;
      updatedThemeType = storedThemeType;
      dispatch(updateTheme({newTheme, updatedThemeType}));
    } else {
      newTheme = userPrefersDark ? 'dark' : 'light';
      updatedThemeType = 'desktop';
      dispatch(updateTheme({newTheme, updatedThemeType}));
    }
  }, [dispatch]);

  return [theme];
};

export default useCustomTheme;