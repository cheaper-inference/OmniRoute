// @vitest-environment jsdom
/**
 * F4 (KEA-7886, lote 8 pendência): locked badge tiles on /dashboard/profile were dimmed with a
 * tile-wide `opacity-50 grayscale`, which dragged the badge name and description under AA
 * (36 axe color-contrast nodes). The locked look now lives in the border, the surface, a dimmed
 * glyph and a lock mark; the text keeps full token ink and the state is announced.
 */
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const translate = (key: string) => key;
vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => Object.assign(translate, { has: () => false }),
}));

const { default: ProfilePage } = await import("@/app/(dashboard)/dashboard/profile/page");

const roots: Array<{ root: ReturnType<typeof createRoot>; container: HTMLDivElement }> = [];

async function renderProfile() {
  const badge = (id: string, name: string) => ({
    id,
    name,
    description: `${name} description`,
    icon: "rocket",
    category: "usage",
    rarity: "common",
    criteria: '{"type":"requests","count":10}',
    hidden: 0,
    createdAt: "2026-08-26T00:00:00.000Z",
  });
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/level")) {
        return { ok: true, json: async () => ({ level: { totalXp: 0, currentLevel: 1 } }) };
      }
      if (url.endsWith("/earned")) {
        return {
          ok: true,
          json: async () => ({
            badges: [{ badgeId: "earned-one", unlockedAt: "2026-08-26T00:00:00.000Z" }],
          }),
        };
      }
      return {
        ok: true,
        json: async () => ({
          badges: [badge("earned-one", "Earned"), badge("locked-one", "Locked")],
        }),
      };
    })
  );
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  roots.push({ root, container });
  act(() => root.render(<ProfilePage />));
  for (let i = 0; i < 40 && container.querySelectorAll("button").length < 2; i++) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
  }
  return container;
}

afterEach(() => {
  for (const { root, container } of roots.splice(0)) {
    act(() => root.unmount());
    container.remove();
  }
  vi.unstubAllGlobals();
});

const tile = (container: HTMLElement, text: string) =>
  Array.from(container.querySelectorAll("button")).find((b) =>
    b.textContent?.includes(`${text} description`)
  )!;

describe("Profile locked badge tiles", () => {
  it("keeps the name and description at full opacity and marks the tile as locked", async () => {
    const container = await renderProfile();
    const locked = tile(container, "Locked");
    expect(locked).toBeDefined();
    expect(locked.className).not.toMatch(/\bopacity-|\bgrayscale\b/);
    for (const text of [...locked.querySelectorAll("p")]) {
      expect(text.closest("[class*='opacity-']")).toBeNull();
    }
    expect(locked.getAttribute("data-locked")).toBe("true");
    expect(locked.className).toContain("border-dashed");
    expect(locked.textContent).toContain("badgeLocked");
  });

  it("leaves earned tiles without the lock mark", async () => {
    const container = await renderProfile();
    const earned = tile(container, "Earned");
    expect(earned.getAttribute("data-locked")).toBeNull();
    expect(earned.textContent).not.toContain("badgeLocked");
  });
});
