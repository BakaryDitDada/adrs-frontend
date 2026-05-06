import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: 'light',       // safe default
  themeType: 'desktop',
  sidebarOpen: true,
  sidebarCollapsed: false, // mobile drawer state
  user: null, // { id, name, email, role, avatar?, ... }
  notifications: [], // optional
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    updateTheme(state, action) {
      const { newTheme, updatedThemeType} = action.payload;
      state.theme = newTheme;
      state.themeType = updatedThemeType;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
        localStorage.setItem('themeType', updatedThemeType);
      }
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    addNotification: (state, action) => {
      state.notifications.push({ id: Date.now(), ...action.payload });
    },
    clearNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    }
  }
})

export const { 
  updateTheme,
  toggleSidebar,
  setSidebarOpen,
  setUser,
  logout,
  addNotification,
  clearNotification,
  setSidebarCollapsed
} = globalSlice.actions;
export default globalSlice.reducer;

export const selectCurrentTheme = (state) => state.global.theme;
export const selectCurrentThemeType = (state) => state.global.themeType;