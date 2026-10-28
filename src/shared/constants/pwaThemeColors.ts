import { ciTokens } from "@omniroute/ui-kit/tokens";

/**
 * Browser-chrome / PWA colours (viewport `theme-color`, web manifest). Metadata can't read CSS
 * variables, so these mirror the kit's page background hex: `--ci-color-background` is
 * neutral-25 in light and neutral-950 under `data-theme="dark"` (packages/ui-kit/src/ci-tokens.css).
 * Replaced the pre-kit `#0b0f1a` (KEA-7886 P9).
 */
export const PWA_THEME_COLORS = {
  light: ciTokens.color.neutral[25],
  dark: ciTokens.color.neutral[950],
} as const;
