import { ciTokens } from "@omniroute/ui-kit/tokens";
import type { AppearancePalette } from "@/shared/constants/appearancePalette";

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
 * Page background of the Classic palette: `--ci-color-background` of the kit's base tokens
 * (packages/ui-kit/src/ci-tokens.css: neutral-25 in light, neutral-950 under `data-theme="dark"`),
 * read from the kit's own token export. tests/unit/pwa-theme-colors.test.ts pins it to the CSS.
 */
export const CLASSIC_PAGE_BACKGROUND = {
  light: ciTokens.color.neutral[25],
  dark: ciTokens.color.neutral[950],
} as const;

/** Browser-chrome colour (live `theme-color`) per palette and light/dark mode. */
export const PAGE_BACKGROUND_BY_PALETTE: Record<
  AppearancePalette,
  { readonly light: string; readonly dark: string }
> = {
  editions: EDITIONS_PAGE_BACKGROUND,
  classic: CLASSIC_PAGE_BACKGROUND,
};

/**
 * Server-rendered browser-chrome / PWA colours (viewport `theme-color`, web manifest). Metadata
 * can't read the visitor's stored palette (it lives in localStorage), so they are the default
 * palette (Editions); the live `theme-color` is then switched to the stored palette by
 * THEME_BOOT_SCRIPT before paint and by the theme store afterwards (src/shared/utils/themeColorMeta.ts).
 * The installed-PWA manifest stays Editions: it is fetched once per install, without the preference.
 */
export const PWA_THEME_COLORS = EDITIONS_PAGE_BACKGROUND;
