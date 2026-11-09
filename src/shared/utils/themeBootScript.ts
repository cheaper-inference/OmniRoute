import { THEME_CONFIG } from "@/shared/constants/appConfig";
import {
  APPEARANCE_ATTRIBUTE,
  EDITIONS_APPEARANCE_VALUE,
} from "@/shared/constants/appearancePalette";
import { PAGE_BACKGROUND_BY_PALETTE } from "@/shared/constants/pwaThemeColors";
import {
  THEME_COLOR_BOOT_ATTRIBUTE,
  THEME_COLOR_FALLBACK_ATTRIBUTE,
  THEME_COLOR_META_SELECTOR,
  THEME_COLOR_PARKED_MEDIA,
  THEME_COLOR_PARKED_MEDIA_ATTRIBUTE,
  themeColorBootValue,
} from "@/shared/utils/themeColorMeta";

const bootValues = (bg: { light: string; dark: string }) => ({
  light: themeColorBootValue(bg.light),
  dark: themeColorBootValue(bg.dark),
});

/**
 * Pre-hydration theme + palette script, inlined in the root layout's <head> so the first paint
 * already has the right look (no flash of the wrong theme or palette).
 *
 * It reads the persisted `theme` store (zustand `persist`: `{ state: { theme, palette } }`) and:
 * - resolves light/dark (stored theme, or the system preference for "system"/nothing stored)
 *   onto `.dark`, `data-theme` and `color-scheme`;
 * - keeps `data-ci-appearance="editions"` (the server-rendered default) unless the stored
 *   palette is exactly "classic", in which case it removes the attribute;
 * - points the browser chrome (`<meta name="theme-color">`) at the stored palette's page
 *   background for the active mode — the rule of resolveThemeColor() in
 *   src/shared/utils/themeColorMeta.ts — adding one if the page has none yet. A server tag
 *   (Editions) whose colour differs is not rewritten but parked behind a copy, so React can
 *   still adopt it at hydration (see the note in themeColorMeta.ts, #19066).
 *
 * Keep in sync with applyTheme()/applyPalette() in src/store/themeStore.ts and with
 * themeColorMeta.ts. Plain ES5 on purpose: it runs before any bundle, in every browser the
 * dashboard supports.
 */
export const THEME_BOOT_SCRIPT = `try {
  var root = document.documentElement;
  var stored = localStorage.getItem(${JSON.stringify(THEME_CONFIG.storageKey)});
  var parsed = stored ? JSON.parse(stored) : null;
  var state = (parsed && parsed.state) || {};
  var theme = state.theme || ${JSON.stringify(THEME_CONFIG.defaultTheme)};
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var dark = theme === "dark" || (theme === "system" && systemDark);
  root.classList.toggle("dark", dark);
  root.dataset.theme = dark ? "dark" : "light";
  root.style.colorScheme = dark ? "dark" : "light";
  var classic = state.palette === "classic";
  if (classic) root.removeAttribute(${JSON.stringify(APPEARANCE_ATTRIBUTE)});
  else root.setAttribute(${JSON.stringify(APPEARANCE_ATTRIBUTE)}, ${JSON.stringify(EDITIONS_APPEARANCE_VALUE)});
  var bg = classic ? ${JSON.stringify(PAGE_BACKGROUND_BY_PALETTE.classic)} : ${JSON.stringify(PAGE_BACKGROUND_BY_PALETTE.editions)};
  var copyBg = classic ? ${JSON.stringify(bootValues(PAGE_BACKGROUND_BY_PALETTE.classic))} : ${JSON.stringify(bootValues(PAGE_BACKGROUND_BY_PALETTE.editions))};
  var metas = document.querySelectorAll(${JSON.stringify(THEME_COLOR_META_SELECTOR)});
  if (!metas.length) {
    var meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.setAttribute(${JSON.stringify(THEME_COLOR_FALLBACK_ATTRIBUTE)}, "");
    document.head.appendChild(meta);
    metas = [meta];
  }
  for (var i = 0; i < metas.length; i++) {
    var tag = metas[i];
    if (tag.hasAttribute(${JSON.stringify(THEME_COLOR_BOOT_ATTRIBUTE)}) || tag.hasAttribute(${JSON.stringify(THEME_COLOR_PARKED_MEDIA_ATTRIBUTE)})) continue;
    var rawMedia = tag.getAttribute("media") || "";
    var media = rawMedia.replace(/\\s+/g, "");
    var metaDark = theme === "dark" ? true : theme !== "system" ? false
      : media.indexOf("prefers-color-scheme:dark") >= 0 ? true
      : media.indexOf("prefers-color-scheme:light") >= 0 ? false : systemDark;
    var color = metaDark ? bg.dark : bg.light;
    if (tag.hasAttribute(${JSON.stringify(THEME_COLOR_FALLBACK_ATTRIBUTE)})) {
      tag.setAttribute("content", color);
    } else if (tag.getAttribute("content") !== color) {
      var copy = document.createElement("meta");
      copy.setAttribute("name", "theme-color");
      if (rawMedia) copy.setAttribute("media", rawMedia);
      copy.setAttribute(${JSON.stringify(THEME_COLOR_BOOT_ATTRIBUTE)}, "");
      copy.setAttribute("content", metaDark ? copyBg.dark : copyBg.light);
      tag.parentNode.insertBefore(copy, tag);
      tag.setAttribute(${JSON.stringify(THEME_COLOR_PARKED_MEDIA_ATTRIBUTE)}, rawMedia);
      tag.setAttribute("media", ${JSON.stringify(THEME_COLOR_PARKED_MEDIA)});
    }
  }
} catch (e) {}`;
