'use client'

import { useDispatch, useSelector } from 'react-redux';
import { CiLight } from "react-icons/ci";
import { IoDesktopOutline, IoMoonOutline } from "react-icons/io5";
import { updateTheme, selectCurrentThemeType } from '@/store/globalSlice';
import { TogglerContainer, TogglerButton } from '@/styles/common/themeToggle.styles';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const themeType = useSelector(selectCurrentThemeType);

  const toggleTheme = (value, type) => {
    let newTheme;
    let updatedThemeType;
    
    if (type === "dark" || type === "light") {
      newTheme = value;
      updatedThemeType = value;
    } else {
      const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      newTheme = userPrefersDark ? 'dark' : 'light';
      updatedThemeType = 'desktop';
    }
    
    dispatch(updateTheme({newTheme, updatedThemeType}));
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('themeType', updatedThemeType);
  };

  return (
    <TogglerContainer>
      <TogglerButton 
        title='Light' 
        type='button' 
        onClick={() => toggleTheme("light", "light")} 
        className={themeType === "light" ? 'active' : ''}
      >
        <CiLight size={20} />
      </TogglerButton>
      
      <TogglerButton 
        title='System' 
        type='button' 
        onClick={() => toggleTheme("none", "desktop")} 
        className={themeType === "desktop" ? 'active' : ''}
      >
        <IoDesktopOutline size={20} />
      </TogglerButton>
      
      <TogglerButton 
        title='Dark' 
        type='button' 
        onClick={() => toggleTheme("dark", "dark")} 
        className={themeType === "dark" ? 'active' : ''}
      >
        <IoMoonOutline size={20} />
      </TogglerButton>
    </TogglerContainer>
  );
};

export default ThemeToggle;