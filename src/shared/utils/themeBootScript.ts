import { THEME_CONFIG } from "@/shared/constants/appConfig";
import {
  APPEARANCE_ATTRIBUTE,
  EDITIONS_APPEARANCE_VALUE,
} from "@/shared/constants/appearancePalette";

/**
 * Pre-hydration theme + palette script, inlined in the root layout's <head> so the first paint
 * already has the right look (no flash of the wrong theme or palette).
 *
 * It reads the persisted `theme` store (zustand `persist`: `{ state: { theme, palette } }`) and:
 * - resolves light/dark (stored theme, or the system preference for "system"/nothing stored)
 *   onto `.dark`, `data-theme` and `color-scheme`;
 * - keeps `data-ci-appearance="editions"` (the server-rendered default) unless the stored
 *   palette is exactly "classic", in which case it removes the attribute.
 *
 * Keep in sync with applyTheme()/applyPalette() in src/store/themeStore.ts. Plain ES5 on
 * purpose: it runs before any bundle, in every browser the dashboard supports.
 */
export const THEME_BOOT_SCRIPT = `try {
  var root = document.documentElement;
  var stored = localStorage.getItem(${JSON.stringify(THEME_CONFIG.storageKey)});
  var parsed = stored ? JSON.parse(stored) : null;
  var state = (parsed && parsed.state) || {};
  var theme = state.theme || ${JSON.stringify(THEME_CONFIG.defaultTheme)};
  var dark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", dark);
  root.dataset.theme = dark ? "dark" : "light";
  root.style.colorScheme = dark ? "dark" : "light";
  if (state.palette === "classic") root.removeAttribute(${JSON.stringify(APPEARANCE_ATTRIBUTE)});
  else root.setAttribute(${JSON.stringify(APPEARANCE_ATTRIBUTE)}, ${JSON.stringify(EDITIONS_APPEARANCE_VALUE)});
} catch (e) {}`;
