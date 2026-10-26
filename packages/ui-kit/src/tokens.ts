/**
 * Raw, framework-agnostic token values.
 *
 * `source: "figma"` values were directly observed in the reference frame.
 * The remaining scales normalize those seeds into a usable product system.
 */
export const ciTokens = {
  color: {
    observed: {
      canvas: "#fbfbf8",
      ink: "#040d10",
      body: "#031a1b",
      muted: "#575f5f",
      inverse: "#f1f7f7",
    },
    lime: {
      50: "#fbffe6",
      100: "#f5ffc2",
      200: "#ecff85",
      300: "#e3ff4d",
      400: "#d8ff00",
      500: "#c2e600",
      600: "#9bb800",
      700: "#728700",
      800: "#4d5c00",
      900: "#303a00",
      950: "#1b2100",
    },
    neutral: {
      0: "#ffffff",
      25: "#fbfbf8",
      50: "#f7f7f2",
      100: "#eeeee8",
      200: "#dfe2dc",
      300: "#c7cbc5",
      400: "#9ca39f",
      500: "#737b78",
      600: "#575f5f",
      700: "#394446",
      800: "#1e2c2f",
      900: "#0d191c",
      950: "#040d10",
    },
    status: {
      live: "#cff331",
      success: "#087a4f",
      warning: "#a75a00",
      danger: "#bf3636",
      info: "#2869d8",
    },
    chart: {
      1: "#9bb800",
      2: "#2869d8",
      3: "#7d4fc7",
      4: "#087a4f",
      5: "#c15588",
    },
  },
  font: {
    ui: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
    display: '"Instrument Serif", Georgia, "Times New Roman", serif',
    mono: '"IBM Plex Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace',
    size: {
      12: "0.75rem",
      14: "0.875rem",
      16: "1rem",
      18: "1.125rem",
      20: "1.25rem",
      24: "1.5rem",
      30: "1.875rem",
      36: "2.25rem",
      48: "3rem",
      60: "3.75rem",
      72: "4.5rem",
      100: "6.25rem",
      base: "1rem",
    },
    weight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  space: {
    0: "0",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    30: "7.5rem",
    32: "8rem",
    40: "10rem",
  },
  radius: {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },
  size: {
    controlSm: "2rem",
    controlMd: "2.25rem",
    controlLg: "2.5rem",
    controlXl: "3rem",
    iconSm: "1rem",
    iconXs: "0.75rem",
    iconMd: "1.25rem",
    iconLg: "1.5rem",
  },
  icon: {
    library: "lucide",
    strokeWidth: 2,
  },
  motion: {
    durationFast: "120ms",
    durationBase: "180ms",
    durationSlow: "280ms",
    easeStandard: "cubic-bezier(0.2, 0, 0, 1)",
    easeEmphasized: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  focus: {
    color: "#728700",
    width: "2px",
    offset: "2px",
  },
  shadow: {
    xl: "0 8px 16px rgb(4 13 16 / 0.08), 0 32px 80px rgb(4 13 16 / 0.16)",
  },
  layout: {
    content: "75rem",
    reading: "45rem",
    sidebar: "15rem",
  },
} as const;

/** CSS-variable references for component and application code. */
export const ciTokenReferences = {
  color: {
    background: "var(--ci-color-background)",
    surface: "var(--ci-color-surface)",
    surfaceMuted: "var(--ci-color-surface-muted)",
    foreground: "var(--ci-color-foreground)",
    muted: "var(--ci-color-text-muted)",
    border: "var(--ci-color-border)",
    accent: "var(--ci-color-accent)",
    live: "var(--ci-color-live)",
    focus: "var(--ci-color-focus)",
  },
  font: {
    ui: "var(--ci-font-ui)",
    display: "var(--ci-font-display)",
    dashboardDisplay: "var(--ci-type-dashboard-display-family)",
    mono: "var(--ci-font-mono)",
  },
  radius: {
    control: "var(--ci-radius-control)",
    surface: "var(--ci-radius-surface)",
    pill: "var(--ci-radius-pill)",
  },
} as const;

export type CiTokens = typeof ciTokens;
export type CiTokenReferences = typeof ciTokenReferences;
