"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { THEME_CONFIG } from "@/shared/constants/appConfig";

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

/**
 * Apply light/dark to <html>. The CI UI Kit flips its `--ci-*` tokens on `data-theme="dark"`;
 * the `.dark` class stays for the ~1.3k legacy `dark:` utilities until the final wave.
 * Keep this in sync with the pre-hydration inline script in src/app/layout.tsx.
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

const KNOWN_THEMES = ["light", "dark", "system"] as const;

/** A persisted value outside light/dark/system (hand-edited, corrupted) falls back to the default. */
function isKnownTheme(value: unknown): value is (typeof KNOWN_THEMES)[number] {
  return typeof value === "string" && (KNOWN_THEMES as readonly string[]).includes(value);
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: THEME_CONFIG.defaultTheme,
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        set({ theme: next });
        applyTheme(next);
      },
      initTheme: () => applyTheme(get().theme),
    }),
    {
      name: THEME_CONFIG.storageKey,
      // Older builds persisted `colorTheme` / `customColor` (accent presets, retired in the
      // Keak migration — spec D4). Only `theme` survives the merge; unknown keys are dropped.
      partialize: (state) => ({ theme: state.theme }),
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as { theme?: unknown };
        const theme = isKnownTheme(saved.theme) ? saved.theme : current.theme;
        return { ...current, theme };
      },
    }
  )
);

export default useThemeStore;
