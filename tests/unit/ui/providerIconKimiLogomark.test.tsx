// @vitest-environment jsdom
/**
 * ProviderIcon — Kimi (Moonshot AI) official-partnership theme-aware logomark
 * (2026-07) for the 3 visible Kimi provider cards (kimi-coding, kimi-web,
 * moonshot). Mirrors the "ProviderIcon — Qwen Cloud local asset" pattern in
 * ProviderIcon-icon-url.test.tsx; the lmarena/lma THEMED_SVGS pair is the
 * existing precedent this follows.
 */
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { onError, alt, ...rest } = props as { onError?: () => void; alt?: string } & Record<
      string,
      unknown
    >;
    // eslint-disable-next-line @next/next/no-img-element -- test double for next/image
    return <img data-testid="next-image" alt={alt || ""} onError={onError} {...rest} />;
  },
}));

const { default: ProviderIcon } = await import("@/shared/components/ProviderIcon");
const { default: useThemeStore } = await import("@/store/themeStore");

const containers: HTMLElement[] = [];
const roots: Root[] = [];

function renderIcon(providerId: string): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  roots.push(root);
  act(() => {
    root.render(<ProviderIcon providerId={providerId} size={26} type="color" />);
  });
  return container;
}

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  useThemeStore.getState().setTheme("light");
});

afterEach(async () => {
  // Unmount before the environment goes away. A root left mounted keeps React's
  // scheduler alive, and the theme reset below schedules an update that then
  // runs after jsdom is gone ("ReferenceError: window is not defined"). The
  // await is load-bearing: act() returns a thenable for concurrent roots, and
  // without it the unmount can still be pending when the environment is torn
  // down.
  await act(async () => {
    while (roots.length > 0) {
      roots.pop()?.unmount();
    }
  });
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  useThemeStore.getState().setTheme("light");
});

describe("ProviderIcon — Kimi official-partnership logomark", () => {
  it.each(["kimi-coding", "kimi-web", "moonshot"])(
    "uses the light-background logomark for %s in light theme",
    (providerId) => {
      const container = renderIcon(providerId);
      const img = container.querySelector("img");
      expect(img).not.toBeNull();
      expect(img?.getAttribute("src")).toBe("/providers/kimi-logomark-light.svg");
    }
  );

  it.each(["kimi-coding", "kimi-web", "moonshot"])(
    "uses the dark-background logomark for %s in dark theme",
    (providerId) => {
      useThemeStore.getState().setTheme("dark");
      const container = renderIcon(providerId);
      const img = container.querySelector("img");
      expect(img).not.toBeNull();
      expect(img?.getAttribute("src")).toBe("/providers/kimi-logomark-dark.svg");
    }
  );

  it("does not apply the Kimi logomark to the legacy hidden 'kimi' alias id", () => {
    // "kimi" (legacy, hiddenFromDashboard) intentionally stays on its own
    // KNOWN_SVGS entry (/providers/kimi.svg) — only the 3 visible cards were
    // repointed to the official partnership asset.
    const container = renderIcon("kimi");
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("src")).toBe("/providers/kimi.svg");
  });

  it("does not apply the Kimi logomark to an unrelated provider", () => {
    const container = renderIcon("openai");
    const img = container.querySelector("img");
    expect(img?.getAttribute("src")).not.toContain("kimi-logomark");
  });
});
