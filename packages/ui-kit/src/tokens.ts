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
      warning: "#a05600",
      danger: "#bf3636",
      info: "#2869d8",
    },
    accentInk: "#4d5c00",
    chart: {
      1: "#728700",
      2: "#2869d8",
      3: "#7d4fc7",
      4: "#087a4f",
      5: "#c15588",
      6: "#d2580f",
      7: "#007f8c",
      8: "#8f5a2a",
    },
    code: {
      keyword: "#4d5c00",
      string: "#027249",
      number: "#9a5300",
      function: "#1d5ecc",
      property: "#8a3fb0",
      comment: "#575f5f",
    },
    codeInverse: {
      keyword: "#d8ff00",
      string: "#a7e8c5",
      number: "#f4cf8b",
      function: "#b8d8ff",
      property: "#e9c1ff",
      comment: "#9ca39f",
    },
    /** Log level inks (default-theme values); 4.5:1 on the inverse surface and every log tint. */
    log: {
      debug: "#c7cbc5",
      trace: "#9ca39f",
      info: "#39c5cf",
      warn: "#e3b341",
      error: "#ff7b72",
      fatal: "#f778ba",
    },
    /** Translucent row/badge tint per log level, composited over the inverse surface. */
    logSubtle: {
      debug: "rgb(199 203 197 / 0.16)",
      trace: "rgb(156 163 159 / 0.16)",
      info: "rgb(57 197 207 / 0.16)",
      warn: "rgb(227 179 65 / 0.16)",
      error: "rgb(255 123 114 / 0.16)",
      fatal: "rgb(247 120 186 / 0.16)",
    },
    /** Text-safe ink per chart colour (light theme values); 4.5:1 on content surfaces. */
    chartInk: {
      1: "#4d5c00",
      2: "#1d5ecc",
      3: "#7749c0",
      4: "#027249",
      5: "#a83e72",
      6: "#ab4403",
      7: "#066f7a",
      8: "#8c5727",
    },
    /** Opaque chip/row tint per chart colour (light theme values); chart ink keeps 4.5:1 on it. */
    chartSubtle: {
      1: "#eef1e0",
      2: "#e5edfa",
      3: "#efeaf8",
      4: "#e1efea",
      5: "#f8ebf1",
      6: "#faebe2",
      7: "#e0f0f1",
      8: "#f2ebe5",
    },
    /** Magnitude ramp (light theme values). Step 1 is nearest the surface; every step keeps 3:1 on it. */
    scaleSeq: {
      1: "#559471",
      2: "#43815f",
      3: "#326e4e",
      4: "#205b3d",
      5: "#0b492d",
      6: "#013720",
      7: "#002614",
    },
    /** Polarity ramp (light theme values). Step 4 is the neutral midpoint; 1 and 7 are the opposite extremes. */
    scaleDiv: {
      1: "#4d1e00",
      2: "#783302",
      3: "#a24c15",
      4: "#888885",
      5: "#3969a6",
      6: "#06498e",
      7: "#012d5d",
    },
  },
  font: {
    ui: '"Switzer", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
    display: '"Switzer", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
    mono: '"Switzer", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
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
      bold: 600,
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

/**
 * Recommended order for assigning categorical series to chart tokens. Adjacent
 * pairs stay at least ΔE 8 apart (OKLab×100) under protanopia/deuteranopia and
 * 15 for typical vision in the default light and dark themes. Past eight series,
 * repeat the colours in this order and tell the repeats apart with a secondary
 * encoding; `chartSeries(index)` switches the `LegendMarker` shape every cycle.
 */
export const ciChartSeriesOrder = [4, 3, 6, 7, 8, 2, 1, 5] as const;
export type CiChartSlot = (typeof ciChartSeriesOrder)[number];

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
    accentInk: "var(--ci-color-accent-ink)",
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
