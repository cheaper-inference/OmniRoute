// @vitest-environment jsdom
/**
 * #18076 (lote 8 follow-up):
 *  - The profile badge grid used raw <button>s with a `kit-exception:` because the kit had no
 *    multi-line tile. Kit 0.0.104 ships `Tile`, so every badge is a kit tile now.
 *  - The tier chip painted the chart colour itself as text (`text-chart-5` on `bg-chart-5/10`,
 *    one light-mode contrast node). The kit pairs each chart token with a text-safe `-ink` and an
 *    opaque `-subtle` tint; the bronze, platinum and diamond tiers use those.
 */
import fs from "node:fs";
import path from "node:path";
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

const PAGE = path.resolve(__dirname, "../../../src/app/(dashboard)/dashboard/profile/page.tsx");
const roots: Array<{ root: ReturnType<typeof createRoot>; container: HTMLDivElement }> = [];

async function renderProfile(currentLevel = 1) {
  const badge = (id: string, name: string, hidden = 0) => ({
    id,
    name,
    description: `${name} description`,
    icon: "rocket",
    category: "usage",
    rarity: "rare",
    criteria: '{"type":"requests","count":10}',
    hidden,
    createdAt: "2026-08-26T00:00:00.000Z",
  });
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/level")) {
        return { ok: true, json: async () => ({ level: { totalXp: 0, currentLevel } }) };
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
          badges: [
            badge("earned-one", "Earned"),
            badge("locked-one", "Locked"),
            badge("hidden-one", "Hidden", 1),
          ],
        }),
      };
    })
  );
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  roots.push({ root, container });
  act(() => root.render(<ProfilePage />));
  for (let i = 0; i < 40 && container.querySelectorAll("button").length < 3; i++) {
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

describe("profile badge grid", () => {
  it("renders every badge as a kit Tile named by the badge title", async () => {
    const container = await renderProfile();
    const tiles = [...container.querySelectorAll<HTMLButtonElement>("[data-slot='tile']")];
    expect(tiles).toHaveLength(3);
    const earned = tiles.find((t) => t.textContent?.includes("Earned description"));
    expect(earned?.tagName).toBe("BUTTON");
    const labelId = earned?.getAttribute("aria-labelledby");
    expect(labelId && document.getElementById(labelId)?.textContent).toBe("Earned");
  });

  it("keeps the hidden locked badge unclickable but at full text ink", async () => {
    const container = await renderProfile();
    const hidden = [...container.querySelectorAll<HTMLButtonElement>("[data-slot='tile']")].find(
      (t) => t.textContent?.includes("???")
    );
    expect(hidden?.disabled).toBe(true);
    // The kit dims disabled tiles to 0.48 opacity; the page restores full ink for the copy.
    expect(hidden?.className).toMatch(/\bopacity-100\b/);
    expect(hidden?.textContent).not.toContain("Hidden description");
  });

  it("leaves no raw <button> tile with a kit-exception in the page source", () => {
    const src = fs.readFileSync(PAGE, "utf8");
    expect(src).not.toMatch(/kit-exception: Multi-line badge tile/);
    expect(src).toMatch(/from "@omniroute\/ui-kit\/tile"/);
  });
});

describe("profile tier chip", () => {
  it.each([
    [1, "text-chart-5-ink", "bg-chart-5-subtle"],
    [60, "text-chart-2-ink", "bg-chart-2-subtle"],
    [90, "text-chart-3-ink", "bg-chart-3-subtle"],
  ])("level %i paints the tier with the -ink text and -subtle tint", async (level, ink, tint) => {
    const container = await renderProfile(level);
    const chip = [...container.querySelectorAll<HTMLElement>("[class*='-subtle']")].find((el) =>
      el.textContent?.includes("tierLabel")
    );
    expect(chip?.className).toContain(ink);
    expect(chip?.className).toContain(tint);
    // No chart colour is used as text without its -ink pair anywhere on the page.
    expect(container.innerHTML).not.toMatch(/\btext-chart-\d(?![\d-])/);
  });
});
