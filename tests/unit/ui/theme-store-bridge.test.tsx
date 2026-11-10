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
    root.removeAttribute("data-ci-appearance");
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

  it("toggleTheme flips dark ↔ light and persists only the theme and the palette", async () => {
    const { default: useThemeStore } = await loadStore();
    useThemeStore.getState().setTheme("light");
    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().theme).toBe("dark");
    expect(JSON.parse(localStorage.getItem("theme")!).state).toEqual({
      theme: "dark",
      palette: "editions",
    });
  });
});

describe("themeStore palette (Editions default, Classic option)", () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    document.documentElement.removeAttribute("data-ci-appearance");
  });

  it("defaults to Editions with nothing stored, and initTheme puts the kit attribute on <html>", async () => {
    const { default: useThemeStore } = await loadStore();
    await useThemeStore.persist.rehydrate();
    expect(useThemeStore.getState().palette).toBe("editions");
    useThemeStore.getState().initTheme();
    expect(document.documentElement.getAttribute("data-ci-appearance")).toBe("editions");
  });

  it("a pre-Editions store (theme only) lands on Editions and keeps its theme", async () => {
    localStorage.setItem("theme", JSON.stringify({ state: { theme: "light" }, version: 0 }));
    const { default: useThemeStore } = await loadStore();
    await useThemeStore.persist.rehydrate();
    expect(useThemeStore.getState().theme).toBe("light");
    expect(useThemeStore.getState().palette).toBe("editions");
  });

  it("setPalette('classic') removes the attribute live and persists the choice", async () => {
    const { default: useThemeStore } = await loadStore();
    const root = document.documentElement;
    useThemeStore.getState().initTheme();
    expect(root.getAttribute("data-ci-appearance")).toBe("editions");
    useThemeStore.getState().setPalette("classic");
    expect(root.hasAttribute("data-ci-appearance")).toBe(false);
    expect(JSON.parse(localStorage.getItem("theme")!).state.palette).toBe("classic");
    useThemeStore.getState().setPalette("editions");
    expect(root.getAttribute("data-ci-appearance")).toBe("editions");
    expect(JSON.parse(localStorage.getItem("theme")!).state.palette).toBe("editions");
  });

  it("a stored Classic choice survives a reload and is applied by initTheme", async () => {
    localStorage.setItem(
      "theme",
      JSON.stringify({ state: { theme: "dark", palette: "classic" }, version: 0 })
    );
    const { default: useThemeStore } = await loadStore();
    await useThemeStore.persist.rehydrate();
    expect(useThemeStore.getState().palette).toBe("classic");
    document.documentElement.setAttribute("data-ci-appearance", "editions"); // server default
    useThemeStore.getState().initTheme();
    expect(document.documentElement.hasAttribute("data-ci-appearance")).toBe(false);
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("an unknown persisted or requested palette falls back to Editions", async () => {
    localStorage.setItem("theme", JSON.stringify({ state: { palette: "violet" }, version: 0 }));
    const { default: useThemeStore } = await loadStore();
    await useThemeStore.persist.rehydrate();
    expect(useThemeStore.getState().palette).toBe("editions");
    useThemeStore.getState().setPalette("violet" as never);
    expect(useThemeStore.getState().palette).toBe("editions");
    expect(document.documentElement.getAttribute("data-ci-appearance")).toBe("editions");
  });

  it("applyPalette is the single DOM rule: only 'classic' drops the attribute", async () => {
    const { applyPalette } = await loadStore();
    const root = document.documentElement;
    applyPalette("classic");
    expect(root.hasAttribute("data-ci-appearance")).toBe(false);
    applyPalette("editions");
    expect(root.getAttribute("data-ci-appearance")).toBe("editions");
    applyPalette("anything-else");
    expect(root.getAttribute("data-ci-appearance")).toBe("editions");
  });
});

describe("themeStore → live theme-color (browser chrome follows the palette)", () => {
  const LIGHT_MEDIA = "(prefers-color-scheme: light)";
  const DARK_MEDIA = "(prefers-color-scheme: dark)";

  /** Server-render the layout's two Editions tags and fake the OS scheme. */
  function serverHead(systemDark = false) {
    document.head.innerHTML =
      `<meta name="theme-color" media="${LIGHT_MEDIA}" content="#f3f1e9">` +
      `<meta name="theme-color" media="${DARK_MEDIA}" content="#11120f">`;
    window.matchMedia = ((query: string) => ({
      matches: query === DARK_MEDIA && systemDark,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    })) as unknown as typeof window.matchMedia;
  }

  const themeColors = () =>
    Object.fromEntries(
      [...document.querySelectorAll('meta[name="theme-color"]')].map((m) => [
        m.getAttribute("media") ?? "",
        m.getAttribute("content"),
      ])
    );

  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    document.documentElement.removeAttribute("data-ci-appearance");
  });

  it("switching the palette live re-points every tag, in light and in dark", async () => {
    serverHead();
    const { default: useThemeStore } = await loadStore();
    const { CLASSIC_PAGE_BACKGROUND: C, EDITIONS_PAGE_BACKGROUND: E } =
      await import("@/shared/constants/pwaThemeColors");
    const store = useThemeStore.getState();
    store.setTheme("light");
    expect(themeColors()).toEqual({ [LIGHT_MEDIA]: E.light, [DARK_MEDIA]: E.light });
    useThemeStore.getState().setPalette("classic");
    expect(themeColors()).toEqual({ [LIGHT_MEDIA]: C.light, [DARK_MEDIA]: C.light });
    useThemeStore.getState().setTheme("dark");
    expect(themeColors()).toEqual({ [LIGHT_MEDIA]: C.dark, [DARK_MEDIA]: C.dark });
    useThemeStore.getState().toggleTheme();
    expect(themeColors()).toEqual({ [LIGHT_MEDIA]: C.light, [DARK_MEDIA]: C.light });
    useThemeStore.getState().setPalette("editions");
    expect(themeColors()).toEqual({ [LIGHT_MEDIA]: E.light, [DARK_MEDIA]: E.light });
  });

  it("the system theme keeps one colour per scheme, so an OS flip still works natively", async () => {
    serverHead(true);
    const { default: useThemeStore } = await loadStore();
    const { CLASSIC_PAGE_BACKGROUND: C } = await import("@/shared/constants/pwaThemeColors");
    useThemeStore.getState().setTheme("system");
    useThemeStore.getState().setPalette("classic");
    expect(themeColors()).toEqual({ [LIGHT_MEDIA]: C.light, [DARK_MEDIA]: C.dark });
  });

  it("initTheme applies a stored Classic choice over the server's Editions tags", async () => {
    serverHead();
    localStorage.setItem(
      "theme",
      JSON.stringify({ state: { theme: "dark", palette: "classic" }, version: 0 })
    );
    const { default: useThemeStore } = await loadStore();
    const { CLASSIC_PAGE_BACKGROUND: C } = await import("@/shared/constants/pwaThemeColors");
    await useThemeStore.persist.rehydrate();
    useThemeStore.getState().initTheme();
    expect(themeColors()).toEqual({ [LIGHT_MEDIA]: C.dark, [DARK_MEDIA]: C.dark });
  });

  it("adds a theme-color tag when the page has none (error pages, tests)", async () => {
    serverHead();
    document.head.innerHTML = "";
    const { default: useThemeStore } = await loadStore();
    const { CLASSIC_PAGE_BACKGROUND: C } = await import("@/shared/constants/pwaThemeColors");
    useThemeStore.getState().setTheme("dark");
    useThemeStore.getState().setPalette("classic");
    expect(themeColors()).toEqual({ "": C.dark });
    expect(document.querySelectorAll("meta[data-theme-color-fallback]")).toHaveLength(1);
    useThemeStore.getState().setTheme("light");
    expect(themeColors()).toEqual({ "": C.light });
    expect(document.querySelectorAll('meta[name="theme-color"]')).toHaveLength(1);
  });

  it("drops the boot script's fallback tag once the server tags exist, so it can't shadow them", async () => {
    serverHead(true);
    const fallback = document.createElement("meta");
    fallback.name = "theme-color";
    fallback.setAttribute("data-theme-color-fallback", "");
    fallback.content = "#000000";
    document.head.prepend(fallback);
    const { default: useThemeStore } = await loadStore();
    const { CLASSIC_PAGE_BACKGROUND: C } = await import("@/shared/constants/pwaThemeColors");
    useThemeStore.getState().setTheme("system");
    useThemeStore.getState().setPalette("classic");
    expect(document.querySelector("meta[data-theme-color-fallback]")).toBeNull();
    expect(themeColors()).toEqual({ [LIGHT_MEDIA]: C.light, [DARK_MEDIA]: C.dark });
  });
});
