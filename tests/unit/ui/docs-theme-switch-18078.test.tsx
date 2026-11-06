// @vitest-environment jsdom
import fs from "node:fs";
import path from "node:path";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const containers: Array<{ root: ReturnType<typeof createRoot>; element: HTMLDivElement }> = [];

function stubSystemTheme(prefersDark: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: prefersDark && query.includes("dark"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

/** Fresh modules per test: the store's persist middleware hydrates at import time. */
async function load() {
  vi.resetModules();
  const switchModule = await import("@/app/docs/DocsThemeSwitch");
  const { default: useThemeStore } = await import("@/store/themeStore");
  return { ...switchModule, useThemeStore };
}

function render(node: React.ReactNode) {
  const element = document.createElement("div");
  document.body.appendChild(element);
  const root = createRoot(element);
  act(() => {
    root.render(node);
  });
  containers.push({ root, element });
  return element;
}

function persistedTheme() {
  return JSON.parse(localStorage.getItem("theme") ?? "{}")?.state?.theme;
}

function isHtmlDark() {
  return document.documentElement.classList.contains("dark");
}

describe("docs theme switch is bound to the root themeStore (#18078)", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
    delete document.documentElement.dataset.theme;
    stubSystemTheme(false);
  });

  afterEach(() => {
    for (const { root, element } of containers.splice(0)) {
      act(() => root.unmount());
      element.remove();
    }
    vi.unstubAllGlobals();
  });

  it("a click flips <html> and persists in the shape the pre-hydration script reads", async () => {
    const { default: DocsThemeSwitch } = await load();
    const element = render(<DocsThemeSwitch />);
    const button = element.querySelector("button[data-theme-toggle]") as HTMLButtonElement;

    expect(isHtmlDark()).toBe(false);
    expect(button.getAttribute("aria-label")).toBe("switchToDarkMode");

    act(() => button.click());
    expect(isHtmlDark()).toBe(true);
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(persistedTheme()).toBe("dark");
    expect(button.getAttribute("aria-label")).toBe("switchToLightMode");

    act(() => button.click());
    expect(isHtmlDark()).toBe(false);
    expect(persistedTheme()).toBe("light");
  });

  it("from the default 'system' theme on a dark OS, the first click changes the page", async () => {
    stubSystemTheme(true);
    const { default: DocsThemeSwitch, useThemeStore } = await load();
    const element = render(<DocsThemeSwitch />);

    expect(useThemeStore.getState().theme).toBe("system");
    expect(isHtmlDark()).toBe(true);

    act(() => (element.querySelector("button") as HTMLButtonElement).click());
    expect(isHtmlDark()).toBe(false);
    expect(persistedTheme()).toBe("light");
  });

  it("marks the active icon and merges the className the Fumadocs slot passes", async () => {
    const { default: DocsThemeSwitch, useThemeStore } = await load();
    const element = render(<DocsThemeSwitch className="ms-auto" />);
    const button = element.querySelector("button") as HTMLButtonElement;
    const [sun, moon] = Array.from(button.querySelectorAll("svg"));

    expect(button.className).toContain("ms-auto");
    expect(sun.getAttribute("class")).toContain("bg-fd-accent");
    expect(moon.getAttribute("class")).not.toContain("bg-fd-accent");

    act(() => useThemeStore.getState().setTheme("dark"));
    expect(sun.getAttribute("class")).not.toContain("bg-fd-accent");
    expect(moon.getAttribute("class")).toContain("bg-fd-accent");
  });

  it("the 'd' hotkey toggles once, and stays out of the way while typing", async () => {
    const { DocsThemeHotKey } = await load();
    const element = render(
      <>
        <DocsThemeHotKey />
        <input />
      </>
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "d" }));
    });
    expect(isHtmlDark()).toBe(true);

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "d", ctrlKey: true }));
    });
    expect(isHtmlDark()).toBe(true);

    const input = element.querySelector("input") as HTMLInputElement;
    act(() => {
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "d", bubbles: true }));
    });
    expect(isHtmlDark()).toBe(true);
  });

  it("the docs layout disables next-themes and fills the slot with the store-bound switch", () => {
    // Source pin: the layout is an async server component that imports the generated Fumadocs
    // source, so it cannot be rendered in jsdom. The switch itself is exercised above.
    const layout = fs.readFileSync(path.resolve("src/app/docs/layout.tsx"), "utf8");

    expect(layout).toMatch(/theme=\{\{ enabled: false \}\}/);
    expect(layout).toMatch(/slots: \{ themeSwitch: DocsThemeSwitch \}/);
    expect(layout).toMatch(/<DocsThemeHotKey \/>/);
    // Ignored once the provider is disabled, so keeping them would mislead readers.
    expect(layout).not.toMatch(/defaultTheme:/);
    expect(layout).not.toMatch(/attribute: "class"/);
  });
});
