"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { THEME_CONFIG } from "@/shared/constants/appConfig";
import {
  APPEARANCE_ATTRIBUTE,
  DEFAULT_APPEARANCE_PALETTE,
  EDITIONS_APPEARANCE_VALUE,
  isAppearancePalette,
  type AppearancePalette,
} from "@/shared/constants/appearancePalette";

interface ThemeState {
  theme: string;
  palette: AppearancePalette;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
  setPalette: (palette: AppearancePalette) => void;
  initTheme: () => void;
}

/**
 * Apply light/dark to <html>. The CI UI Kit flips its `--ci-*` tokens on `data-theme="dark"`;
 * the `.dark` class stays for the ~1.3k legacy `dark:` utilities until the final wave.
 * Keep this in sync with THEME_BOOT_SCRIPT (src/shared/utils/themeBootScript.ts).
 */
export function applyTheme(theme: string) {
  if (typeof window === "undefined") return;
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && systemDark);
  root.classList.toggle("dark", isDark);
  root.dataset.theme = isDark ? "dark" : "light";
  root.style.colorScheme = isDark ? "dark" : "light";
}

/**
 * Apply the colour palette to <html>: Editions is the kit's `data-ci-appearance="editions"`,
 * Classic is the attribute's absence (the base kit tokens). Same rule as THEME_BOOT_SCRIPT.
 */
export function applyPalette(palette: string) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (palette === "classic") root.removeAttribute(APPEARANCE_ATTRIBUTE);
  else root.setAttribute(APPEARANCE_ATTRIBUTE, EDITIONS_APPEARANCE_VALUE);
}

const KNOWN_THEMES = ["light", "dark", "system"] as const;

/** A persisted value outside light/dark/system (hand-edited, corrupted) falls back to the default. */
function isKnownTheme(value: unknown): value is (typeof KNOWN_THEMES)[number] {
  return typeof value === "string" && (KNOWN_THEMES as readonly string[]).includes(value);
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: THEME_CONFIG.defaultTheme,
      palette: DEFAULT_APPEARANCE_PALETTE,
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        set({ theme: next });
        applyTheme(next);
      },
      setPalette: (palette) => {
        const next = isAppearancePalette(palette) ? palette : DEFAULT_APPEARANCE_PALETTE;
        set({ palette: next });
        applyPalette(next);
      },
      initTheme: () => {
        applyTheme(get().theme);
        applyPalette(get().palette);
      },
    }),
    {
      name: THEME_CONFIG.storageKey,
      // Older builds persisted `colorTheme` / `customColor` (accent presets, retired in the
      // Keak migration — spec D4). Only `theme` and `palette` survive the merge; unknown keys
      // are dropped, and an unknown palette (or none, as every pre-Editions store) is Editions.
      partialize: (state) => ({ theme: state.theme, palette: state.palette }),
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as { theme?: unknown; palette?: unknown };
        const theme = isKnownTheme(saved.theme) ? saved.theme : current.theme;
        const palette = isAppearancePalette(saved.palette) ? saved.palette : current.palette;
        return { ...current, theme, palette };
      },
    }
  )
);

export default useThemeStore;
