// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from "vitest";

const LEGACY_PERSISTED = JSON.stringify({
  state: { theme: "dark", colorTheme: "violet", customColor: "#8b5cf6" },
  version: 0,
});

/** Fresh store module per test: persist hydrates at import time, so order must not matter. */
async function loadStore() {
  return import("@/store/themeStore");
}

describe("themeStore ↔ CI UI Kit bridge", () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    const root = document.documentElement;
    root.className = "";
    delete root.dataset.theme;
    root.style.colorScheme = "";
    root.style.removeProperty("--color-primary");
    root.style.removeProperty("--color-primary-hover");
  });

  it("applies dark as both the .dark class and data-theme=dark (kit contract)", async () => {
    const { applyTheme } = await loadStore();
    applyTheme("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
    applyTheme("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("ignores the retired colorTheme/customColor keys persisted by older builds (Review Focus 1)", async () => {
    localStorage.setItem("theme", LEGACY_PERSISTED);
    const { default: useThemeStore } = await loadStore();
    await useThemeStore.persist.rehydrate();
    const state = useThemeStore.getState() as Record<string, unknown>;
    expect(state.theme).toBe("dark");
    expect("colorTheme" in state).toBe(false);
    expect("customColor" in state).toBe(false);
    expect("setColorTheme" in state).toBe(false);
    // ThemeProvider / useTheme call initTheme() on mount: the legacy payload must land as dark.
    expect(() => useThemeStore.getState().initTheme()).not.toThrow();
    const root = document.documentElement;
    expect(root.classList.contains("dark")).toBe(true);
    expect(root.dataset.theme).toBe("dark");
    expect(root.style.colorScheme).toBe("dark");
    // The old store painted the persisted preset from initTheme() (applyColorTheme), so this is
    // the point where a surviving preset would show: the kit's accent must stay token-driven.
    expect(root.style.getPropertyValue("--color-primary")).toBe("");
    expect(root.style.getPropertyValue("--color-primary-hover")).toBe("");
  });

  it("falls back to the default theme when the persisted value is not light/dark/system", async () => {
    localStorage.setItem("theme", JSON.stringify({ state: { theme: "foo" }, version: 0 }));
    const { default: useThemeStore } = await loadStore();
    await useThemeStore.persist.rehydrate();
    expect(useThemeStore.getState().theme).toBe("system");
  });

  it("toggleTheme flips dark ↔ light and persists only the theme", async () => {
    const { default: useThemeStore } = await loadStore();
    useThemeStore.getState().setTheme("light");
    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe("dark");
    expect(JSON.parse(localStorage.getItem("theme")!).state).toEqual({ theme: "dark" });
  });
});
