const baseTheme = {
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    mono: "'JetBrains Mono', 'Courier New', monospace",
  },

  fontSizes: {
    xs: '1.2rem',
    sm: '1.3rem',
    caption: '1.3rem',
    body: '1.4rem',
    bodyLg: '1.6rem',

    h4: '1.8rem',
    h3: '2rem',
    h2: '2.4rem',
    h1: '3.2rem',
  },

  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  typography: {
    elements: {
      h1: {
        fontSize: 'clamp(2.4rem, 2vw + 1rem, 4rem)', // scales between 24px and 40px
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: 'clamp(2rem, 1.5vw + 1rem, 3.2rem)',
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h3: {
        fontSize: '2.4rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      p: {
        fontSize: '1.6rem',
        fontWeight: 400,
        lineHeight: 1.6,
      },
      small: {
        fontSize: '1.4rem',
        fontWeight: 400,
        lineHeight: 1.5,
      },
    },
  },

  spacing: {
    xxs: '0.4rem', // 4
    xs: '0.8rem',  // 8
    sm: '1.2rem',  // 12
    md: '1.6rem',  // 16
    lg: '2rem',    // 20
    xl: '2.4rem',  // 24
    xxl: '3.2rem', // 32
  },

  radii: {
    sm: '0.6rem',
    md: '0.8rem',
    lg: '1.2rem',
    xl: '1.6rem',
    xxl: '2rem',
    full: '9999px',
  },

  shadows: {
    low: '0 1px 2px rgba(0,0,0,0.2)',
    medium: '0 8px 24px rgba(0,0,0,0.24)',
    high: '0 16px 40px rgba(0,0,0,0.3)',

    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
    xl: '0 20px 25px rgba(0,0,0,0.1)',
  },

  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    largeDesktop: '1440px',
  },

  elevation: {
    low: '0 1px 2px rgba(0,0,0,0.2)',
    medium: '0 8px 24px rgba(0,0,0,0.24)',
    high: '0 16px 40px rgba(0,0,0,0.3)',
  },

  surface: {
    page: '#020817',
    card: '#0f172a',
    elevated: '#111827',
    hover: '#1e293b',
    active: '#2563eb15',
  },

  motion: {
    fast: '120ms ease',
    normal: '180ms ease',
    slow: '260ms ease',
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    modal: 1300,
    toast: 1500,
  },

  layout: {
    sidebarWidth: '28rem',
    contentMax: '160rem',
    headerHeight: '6.4rem',
  }
};

// Light Theme
export const lightTheme = {
  ...baseTheme,
  mode: 'light',
  colors: {
    primary: '#2563eb',
    primaryDark: '#1d4ed8',
    primaryLight: '#3b82f6',

    secondary: '#7c3aed',
    secondaryDark: '#6d28d9',
    secondaryLight: '#8b5cf6',
    accent: '#10b981',

    white: "#fff",
    black: "#000",
    red: "red",
    blue: "blue",

    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
      light: '#9ca3af',
      inverse: '#ffffff',
    },

    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
    },

    border: '#e5e7eb',
    borderSecondary: '#e5e7eb',
    borderLight: '#929aa4',

    neutral: {
      white: '#ffffff',
      gray100: '#f3f4f6',
      gray200: '#e5e7eb',
      gray300: '#d1d5db',
      gray400: '#9ca3af',
      black: '#111827',
    },

    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
};

// Dark Theme
export const darkTheme = {
  ...baseTheme,
  mode: 'dark',
  colors: {
    primary: '#3b82f6',
    primaryDark: '#60a5fa',
    primaryLight: '#1d4ed8',

    secondary: '#8b5cf6',
    accent: '#34d399',

    text: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
      light: '#9ca3af',
      inverse: '#1f2937',
    },

    background: {
      primary: '#111827',
      secondary: '#1f2937',
      tertiary: '#374151',
    },

    // border: '#4b5563',
    border: 'rgba(255,255,255,0.07)',
    borderSecondary: 'rgba(255,255,255,0.25)',
    borderLight: '#929aa4',

    neutral: {
      white: '#ffffff',
      gray100: '#f3f4f6',
      gray200: '#e5e7eb',
      gray300: '#d1d5db',
      gray400: '#9ca3af',
      black: '#111827',
    },

    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa',
  },
};

export default lightTheme;