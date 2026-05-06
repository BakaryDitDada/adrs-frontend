import { createSlice } from "@reduxjs/toolkit";

// Helper function to get initial state from localStorage
const getInitialState = () => {
  if (typeof window === "undefined") {
    return {
      authMethod: "",
      user: null,
      token: null,
      isAuthenticated: false,
      authSuccess: false,
      authLoading: true,
      verificationToken: "",
      authMessage: "",
    };
  }

  const parseLocalStorage = (key, defaultValue) => {
    const item = localStorage.getItem(key);
    if (item === null || item === "undefined") return defaultValue;
    try {
      return JSON.parse(item);
    } catch (error) {
      return defaultValue;
    }
  };

  return {
    authMethod: parseLocalStorage('authMethod', ""),
    user: parseLocalStorage('user', null),
    token: parseLocalStorage('token', null),
    isAuthenticated: parseLocalStorage('isAuthenticated', false),
    authSuccess: parseLocalStorage('authSuccess', false),
    authLoading: parseLocalStorage('authLoading', true),
    verificationToken: parseLocalStorage('verificationToken', ""),
    authMessage: parseLocalStorage("authMessage", ""),
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setAuthMethod(state, action) {
      state.authMethod = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("authMethod", JSON.stringify(state.authMethod));
      }
    },
    setVerificationToken(state, action) {
      state.verificationToken = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("verificationToken", JSON.stringify(state.verificationToken));
      }
    },
    setAuthMessage(state, action) {
      state.authMessage = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("authMessage", JSON.stringify(state.authMessage));
      }
    },
    setCredentials: (state, action) => {
      const { user, access_token } = action.payload;

      state.user = user;
      state.token = access_token;
      state.isAuthenticated = true;
      state.authLoading = false;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", JSON.stringify(state.token));
        localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
        localStorage.setItem("authLoading", JSON.stringify(state.authLoading));
      }
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.authSuccess = false;
      state.authMethod = ""

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", JSON.stringify(state.token));
        localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
        localStorage.setItem("authMethod", JSON.stringify(state.authMethod));
        localStorage.setItem("authSuccess", JSON.stringify(state.authSuccess));
        localStorage.removeItem("persist", JSON.stringify(false));
      }
    }, 
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));
      }
    },
    setAuthSuccess: (state, action) => {
      state.authSuccess = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("authSuccess", JSON.stringify(state.authSuccess));
      }
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("authLoading", JSON.stringify(state.authLoading));
      }
    }
  },
});

export const {
  setAuthMethod,
  setCredentials,
  signOut,
  setVerificationToken,
  setAuthMessage,
  setIsAuthenticated,
  setAuthLoading,
  setAuthSuccess
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state?.auth?.user;
export const selectCurrentToken = (state) => state?.auth?.token;
export const selectAuthMethod = (state) => state?.auth?.authMethod;
export const selectAuthLoading = (state) => state?.auth?.authLoading;
export const selectAuthMessage = (state) => state?.auth?.authMessage;
export const selectIsAuthenticated = (state) => state?.auth?.isAuthenticated;
export const selectVerificationToken = (state) => state?.auth?.verificationToken;
export const selectAuthSuccess = state => state?.auth?.authSuccess;