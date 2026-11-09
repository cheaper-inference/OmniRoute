"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import useThemeStore from "@/store/themeStore";
import { applyThemeColor } from "@/shared/utils/themeColorMeta";

export function ThemeProvider({ children }) {
  const { initTheme } = useThemeStore();
  const pathname = usePathname();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  // A client navigation can re-mount the viewport `theme-color` tags with their server
  // (Editions) content; point them back at the stored palette after each route change.
  useEffect(() => {
    const { theme, palette } = useThemeStore.getState();
    applyThemeColor(theme, palette);
  }, [pathname]);

  return <>{children}</>;
}
