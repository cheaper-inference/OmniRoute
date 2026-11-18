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

/*
 * Repainting before hydration without duplicating the tags (#19066).
 *
 * React 19 adopts the server's `<meta>` tags at hydration by their `content` (react-dom's
 * `getHydratableHoistableCache("meta", "content", …)`, which also compares name / property /
 * http-equiv / charset but not `media`). When THEME_BOOT_SCRIPT rewrote that `content` (any
 * stored palette or explicit theme other than the server's Editions default), React no longer
 * found the tags, left them in the head unowned and appended fresh server copies: 4 tags
 * instead of 2. So the boot script leaves each server tag's `content` alone and instead:
 * - parks it: its `media` moves to THEME_COLOR_PARKED_MEDIA_ATTRIBUTE and `media` becomes
 *   `not all`, so the browser skips it while React still adopts it;
 * - puts a copy carrying the stored colour right before it (THEME_COLOR_BOOT_ATTRIBUTE), with
 *   the colour written as `rgb(r g b)`, a string no server tag (hex) can equal, so React never
 *   adopts the copy in place of a server tag.
 * After hydration applyThemeColor() unparks the server tags, drops the copies and repaints:
 * the page keeps exactly the tags the server rendered.
 */

/** Marks a boot-script copy of a parked server tag; removed by applyThemeColor(). */
export const THEME_COLOR_BOOT_ATTRIBUTE = "data-theme-color-boot";

/** On a parked server tag: its original `media` ("" for none) while `media` is `not all`. */
export const THEME_COLOR_PARKED_MEDIA_ATTRIBUTE = "data-theme-color-media";

/** The never-matching media query a parked tag carries until hydration. */
export const THEME_COLOR_PARKED_MEDIA = "not all";

/** `#rrggbb` → `rgb(r g b)`: the same colour, never string-equal to a server (hex) `content`. */
export function themeColorBootValue(hex: string): string {
  const h = hex.replace(/^#/, "");
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h.slice(0, 6);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  return `rgb(${r} ${g} ${b})`;
}

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
  unparkServerTags();
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

/** Undo the boot script's parking: restore the server tags' `media`, drop the boot copies. */
function unparkServerTags() {
  for (const meta of document.querySelectorAll<HTMLMetaElement>(
    `${THEME_COLOR_META_SELECTOR}[${THEME_COLOR_PARKED_MEDIA_ATTRIBUTE}]`
  )) {
    const media = meta.getAttribute(THEME_COLOR_PARKED_MEDIA_ATTRIBUTE);
    if (media) meta.setAttribute("media", media);
    else meta.removeAttribute("media");
    meta.removeAttribute(THEME_COLOR_PARKED_MEDIA_ATTRIBUTE);
  }
  for (const meta of document.querySelectorAll(
    `${THEME_COLOR_META_SELECTOR}[${THEME_COLOR_BOOT_ATTRIBUTE}]`
  )) {
    meta.remove();
  }
}
