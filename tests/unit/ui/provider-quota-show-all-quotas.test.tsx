// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock(
  "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing",
  () => ({
    parseQuotaData: () =>
      [1, 2, 3, 4, 5].map((n) => ({
        name: `quota-${n}`,
        displayName: `quota-${n}`,
        remainingPercentage: 50,
      })),
  })
);

import ProviderQuotaWidget from "../../../src/app/(dashboard)/home/ProviderQuotaWidget";

const CONNECTION = { id: "c1", provider: "claude", authType: "oauth", name: "main" };

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

function jsonResponse(body: unknown) {
  return Promise.resolve({ ok: true, status: 200, json: async () => body }) as Promise<Response>;
}

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  vi.stubGlobal(
    "fetch",
    vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.startsWith("/api/usage/provider-limits")) {
        return jsonResponse({ caches: { c1: { quotas: {} } } });
      }
      return jsonResponse({ connections: [CONNECTION] });
    })
  );
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

async function render(showAllQuotas?: boolean) {
  await act(async () => {
    root.render(<ProviderQuotaWidget showAllQuotas={showAllQuotas} />);
  });
  for (let i = 0; i < 100 && !(container.textContent ?? "").includes("quota-1"); i++) {
    await act(async () => {
      await new Promise((r) => setTimeout(r, 50));
    });
  }
  return container.textContent ?? "";
}

describe("ProviderQuotaWidget active connections", () => {
  it("omits deactivated connections and keeps the ones without an isActive flag", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) =>
        String(input).startsWith("/api/usage/provider-limits")
          ? jsonResponse({ caches: { c1: { quotas: {} }, c2: { quotas: {} }, c3: { quotas: {} } } })
          : jsonResponse({
              connections: [
                { ...CONNECTION, id: "c1", name: "enabled", isActive: true },
                { ...CONNECTION, id: "c2", name: "disabled", isActive: false },
                { ...CONNECTION, id: "c3", name: "unflagged" },
              ],
            })
      )
    );
    const text = await render(true);

    expect(text).toContain("enabled");
    expect(text).toContain("unflagged");
    expect(text).not.toContain("disabled");
  });
});

describe("ProviderQuotaWidget account label", () => {
  const withEmailOnly = () =>
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) =>
        String(input).startsWith("/api/usage/provider-limits")
          ? jsonResponse({ caches: { c1: { quotas: {} } } })
          : jsonResponse({
              connections: [{ ...CONNECTION, name: "", email: "someone.private@example.com" }],
            })
      )
    );

  it("masks the account email unless the email privacy store allows it", async () => {
    withEmailOnly();
    const text = await render(true);

    expect(text).not.toContain("someone.private@example.com");
    expect(text).not.toContain("@");
    expect(text).not.toContain("som");
  });

  it("shows the full email when the email privacy store says visible", async () => {
    const { default: store } = await import("../../../src/store/emailPrivacyStore");
    store.getState().setEmailsVisible(true);
    withEmailOnly();
    const text = await render(true);
    store.getState().setEmailsVisible(false);

    expect(text).toContain("someone.private@example.com");
  });
});

describe("ProviderQuotaWidget accessibility", () => {
  it("exposes each quota bar as a progressbar with its value", async () => {
    await render(true);

    const bars = Array.from(container.querySelectorAll('[role="progressbar"]'));
    expect(bars.length).toBe(5);
    expect(bars[0].getAttribute("aria-valuenow")).toBe("50");
    expect(bars[0].getAttribute("aria-valuemin")).toBe("0");
    expect(bars[0].getAttribute("aria-valuemax")).toBe("100");
    expect(bars[0].getAttribute("aria-label")).toBe("quota-1");
  });
});

describe("ProviderQuotaWidget fillHeight", () => {
  const sizes = [150, 150, 150];

  beforeEach(() => {
    class FakeResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    }
    vi.stubGlobal("ResizeObserver", FakeResizeObserver);
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
      this: HTMLElement
    ) {
      const index = Number(this.dataset.providerIndex ?? -1);
      const height = index >= 0 ? sizes[index] : 0;
      return { height, width: 0, top: 0, left: 0, right: 0, bottom: height, x: 0, y: 0 } as DOMRect;
    });
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(340);
    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) =>
        String(input).startsWith("/api/usage/provider-limits")
          ? jsonResponse({ caches: { a: { quotas: {} }, b: { quotas: {} }, c: { quotas: {} } } })
          : jsonResponse({
              connections: [
                { ...CONNECTION, id: "a", provider: "claude", name: "one" },
                { ...CONNECTION, id: "b", provider: "codex", name: "two" },
                { ...CONNECTION, id: "c", provider: "kiro", name: "three" },
              ],
            })
      )
    );
  });

  afterEach(() => vi.restoreAllMocks());

  async function renderFilled(fillHeight: boolean) {
    await act(async () => {
      root.render(<ProviderQuotaWidget showAllQuotas fillHeight={fillHeight} />);
    });
    for (let i = 0; i < 100 && !container.querySelector("section"); i++) {
      await act(async () => {
        await new Promise((r) => setTimeout(r, 50));
      });
    }
  }

  it("makes the providers scroll inside a card that fills its parent", async () => {
    await renderFilled(true);

    const card = container.querySelector('[data-slot="card"]') as HTMLElement;
    const scroller = container.querySelector("section")?.parentElement as HTMLElement;
    expect(card.className).toContain("h-full");
    expect(scroller.className).toContain("overflow-y-auto");
    expect(scroller.className).toContain("snap-mandatory");
    expect(scroller.getAttribute("tabindex")).toBe("0");
  });

  it("separates the providers with a line but leaves none under the last one", async () => {
    await renderFilled(true);

    const sections = Array.from(container.querySelectorAll("section")) as HTMLElement[];
    expect(sections.length).toBe(3);
    expect(sections[0].className).toContain("border-b");
    expect(sections[1].className).toContain("border-b");
    expect(sections[2].className).not.toContain("border-b");
  });

  it("keeps the natural, non-scrolling layout when fillHeight is off", async () => {
    await renderFilled(false);

    const card = container.querySelector('[data-slot="card"]') as HTMLElement;
    const scroller = container.querySelector("section")?.parentElement as HTMLElement;
    expect(card.className).not.toContain("h-full");
    expect(scroller.className).not.toContain("overflow-y-auto");
    expect(scroller.getAttribute("tabindex")).toBeNull();
  });
});

describe("ProviderQuotaWidget showAllQuotas", () => {
  it("shows only the primary quotas and the toggle by default", async () => {
    const text = await render();

    expect(text).toContain("quota-3");
    expect(text).not.toContain("quota-4");
    expect(container.querySelector("button[aria-expanded]")).toBeTruthy();
  });

  it("shows every quota and no toggle when showAllQuotas is set", async () => {
    const text = await render(true);

    expect(text).toContain("quota-4");
    expect(text).toContain("quota-5");
    expect(container.querySelector("button[aria-expanded]")).toBeNull();
  });
});
