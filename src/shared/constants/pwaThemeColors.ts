/**
 * Page background of the Editions palette, the default look (appearancePalette.ts). The kit's
 * `ciTokens` export carries only the base (Classic) tokens, so these two hex values are the one
 * mirror of `--ci-color-background` in packages/ui-kit/src/ci-editions.css (light block and
 * `data-theme="dark"` block). tests/unit/pwa-theme-colors.test.ts pins them to that file.
 */
export const EDITIONS_PAGE_BACKGROUND = {
  light: "#f3f1e9",
  dark: "#11120f",
} as const;

/**
 * Browser-chrome / PWA colours (viewport `theme-color`, web manifest). Metadata can't read CSS
 * variables or the visitor's stored palette, so they follow the default palette (Editions).
 * Replaced the pre-kit `#0b0f1a` (KEA-7886 P9), then the Classic kit background (neutral-25 /
 * neutral-950 of ci-tokens.css).
 */
export const PWA_THEME_COLORS = EDITIONS_PAGE_BACKGROUND;
