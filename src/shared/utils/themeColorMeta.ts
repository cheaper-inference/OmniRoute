import { normalizeAppearancePalette } from "@/shared/constants/appearancePalette";
import { PAGE_BACKGROUND_BY_PALETTE } from "@/shared/constants/pwaThemeColors";

/**
 * Live `<meta name="theme-color">` (browser bar / installed-PWA title bar) for the active palette.
 *
 * The root layout server-renders the Editions colours as one tag per
 * `media="(prefers-color-scheme: light|dark)"`. Each tag is rewritten to the stored palette's
 * page background:
 * - an explicit "light" / "dark" theme paints every tag in that mode, whatever the OS prefers
 *   (the page is painted in that mode, so the chrome must match);
 * - "system" keeps each media tag on its own scheme, so an OS light/dark flip still switches the
 *   chrome natively; a tag without `media` follows the current system preference.
 * An unknown palette is Editions and an unknown theme is light, as in applyTheme().
 *
 * THEME_BOOT_SCRIPT (src/shared/utils/themeBootScript.ts) is the ES5 copy of this rule that runs
 * before paint; keep the two in sync (tests/unit/theme-boot-script-palette.test.ts and
 * tests/unit/pwa-theme-colors.test.ts run the same matrix against both).
 */

export const THEME_COLOR_META_SELECTOR = 'meta[name="theme-color"]';

/**
 * Marks a tag added because the page had none (the boot script, an error page). Once the
 * server-rendered tags exist it is dropped: being first in tree order, it would otherwise shadow
 * their `media` variants.
 */
export const THEME_COLOR_FALLBACK_ATTRIBUTE = "data-theme-color-fallback";

interface ThemeColorInput {
  palette: unknown;
  theme: unknown;
  /** The tag's `media` attribute, or null when it has none. */
  media: string | null;
  systemDark: boolean;
}

export function resolveThemeColor({ palette, theme, media, systemDark }: ThemeColorInput): string {
  const bg = PAGE_BACKGROUND_BY_PALETTE[normalizeAppearancePalette(palette)];
  let dark: boolean;
  if (theme === "dark") dark = true;
  else if (theme !== "system") dark = false;
  else {
    const query = (media ?? "").replace(/\s+/g, "");
    if (query.includes("prefers-color-scheme:dark")) dark = true;
    else if (query.includes("prefers-color-scheme:light")) dark = false;
    else dark = systemDark;
  }
  return dark ? bg.dark : bg.light;
}

/** Rewrite every theme-color tag (adding one when the page has none) for palette + theme. */
export function applyThemeColor(theme: unknown, palette: unknown) {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const all = Array.from(document.querySelectorAll<HTMLMetaElement>(THEME_COLOR_META_SELECTOR));
  let metas = all.filter((meta) => !meta.hasAttribute(THEME_COLOR_FALLBACK_ATTRIBUTE));
  if (metas.length > 0) {
    for (const meta of all) if (!metas.includes(meta)) meta.remove();
  } else {
    metas = all.slice(0, 1);
    if (metas.length === 0) {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.setAttribute(THEME_COLOR_FALLBACK_ATTRIBUTE, "");
      document.head.appendChild(meta);
      metas = [meta];
    }
  }
  for (const meta of metas) {
    const color = resolveThemeColor({
      palette,
      theme,
      media: meta.getAttribute("media"),
      systemDark,
    });
    if (meta.getAttribute("content") !== color) meta.setAttribute("content", color);
  }
}
