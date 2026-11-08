"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/shared/hooks/useTheme";
import { cn } from "@/shared/utils/cn";

const noopSubscribe = () => () => {};
const getMountedSnapshot = () => true;
const getServerMountedSnapshot = () => false;

/** The active icon stays neutral until mount: the persisted theme is unknown during SSR. */
function useIsMounted() {
  return useSyncExternalStore(noopSubscribe, getMountedSnapshot, getServerMountedSnapshot);
}

const ICON_CLASS = "size-6.5 p-1.5 text-fd-muted-foreground";
const ACTIVE_ICON_CLASS = "bg-fd-accent text-fd-accent-foreground";

/**
 * Light/dark switch for the docs layout, bound to the root `themeStore`.
 *
 * `RootProvider theme={{ enabled: false }}` removes the next-themes provider, and without it the
 * Fumadocs default switch gets a no-op `setTheme`. This takes its slot and keeps its markup.
 * It goes through `setTheme` with the resolved value because the store's `toggleTheme` reads the
 * raw `theme`: from "system" on a dark OS, that first click would set "dark" and change nothing.
 */
export default function DocsThemeSwitch({ className }: { className?: string }) {
  const { isDark, setTheme } = useTheme();
  const mounted = useIsMounted();
  const t = useTranslations("header");

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center rounded-full border p-1 overflow-hidden *:rounded-full",
        className
      )}
      aria-label={isDark ? t("switchToLightMode") : t("switchToDarkMode")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      data-theme-toggle=""
    >
      <Sun
        fill="currentColor"
        className={cn(ICON_CLASS, mounted && !isDark && ACTIVE_ICON_CLASS)}
      />
      <Moon
        fill="currentColor"
        className={cn(ICON_CLASS, mounted && isDark && ACTIVE_ICON_CLASS)}
      />
    </button>
  );
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return true;
  return target.closest('[role="dialog"]') !== null;
}

/**
 * Keeps the "d" hotkey that Fumadocs mounts only inside its next-themes provider. It lives apart
 * from the switch because the sidebar renders that slot twice (desktop and mobile), and one
 * listener per slot would toggle twice.
 */
export function DocsThemeHotKey() {
  const { isDark, setTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.isComposing) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key.toLowerCase() !== "d" || isTypingTarget(event.target)) return;
      event.preventDefault();
      setTheme(isDark ? "light" : "dark");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDark, setTheme]);

  return null;
}
