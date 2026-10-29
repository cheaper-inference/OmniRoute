// @vitest-environment jsdom

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

async function renderProfile(earned = false) {
  const hiddenBadge = {
    id: "secret-badge",
    name: "Secret Badge Name",
    description: "Secret badge description",
    icon: "rocket",
    category: "secret-category",
    rarity: "legendary",
    criteria: '{"type":"secret-condition"}',
    hidden: 1,
    createdAt: "2026-08-26T00:00:00.000Z",
  };
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
            badges: earned
              ? [{ badgeId: hiddenBadge.id, unlockedAt: "2026-08-26T00:00:00.000Z" }]
              : [],
          }),
        };
      }
      return { ok: true, json: async () => ({ badges: [hiddenBadge] }) };
    })
  );

  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  roots.push({ root, container });
  act(() => root.render(<ProfilePage />));

  for (let i = 0; i < 40 && !container.querySelector("button"); i++) {
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
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

// The badge detail is the kit Dialog (Modal adapter), portalled to document.body, so the
// disclosure checks read the whole document rather than the render container.
describe("Profile hidden badge confidentiality", () => {
  it("does not disclose locked hidden badge metadata when activated", async () => {
    const container = await renderProfile();
    const badgeButton = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("???")
    );
    expect(badgeButton).toBeDefined();
    // The badge glyph is now a kit <Icon> (an svg tagged data-icon), not ligature text.
    expect(document.querySelector('[data-icon="rocket_launch"]')).toBeNull();

    await act(async () => {
      badgeButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(document.body.textContent).not.toContain("Secret Badge Name");
    expect(document.body.textContent).not.toContain("Secret badge description");
    expect(document.body.textContent).not.toContain("secret-category");
    expect(document.body.textContent).not.toContain("legendary");
    expect(document.body.textContent).not.toContain("secret-condition");
  });

  it("reveals an earned hidden badge normally", async () => {
    const container = await renderProfile(true);
    const badgeButton = Array.from(container.querySelectorAll("button")).find((button) =>
      button.textContent?.includes("Secret Badge Name")
    );
    expect(badgeButton).toBeDefined();
    expect((badgeButton as HTMLButtonElement).disabled).toBe(false);

    await act(async () => {
      badgeButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(document.body.textContent).toContain("secret-category");
    expect(document.querySelector('[data-icon="rocket_launch"]')).not.toBeNull();
    expect(document.body.textContent).toContain("Secret Badge Name");
    expect(document.body.textContent).toContain("Secret badge description");
    expect(document.body.textContent).toContain("legendary");
  });
});
