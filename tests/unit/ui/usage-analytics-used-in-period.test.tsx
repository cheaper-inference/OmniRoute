// @vitest-environment jsdom
// KEA-9391: the four figures of the first block on Usage > Analytics are distinct accounts,
// providers, API keys and models that served a request in the selected period. They were
// headed "Infrastructure", which reads as what the workspace has configured, so a workspace
// with connections and no traffic in the period showed "Infrastructure: 0 / 0 / 0 / 0".
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import UsageAnalytics from "@/shared/components/UsageAnalytics";
import enMessages from "@/i18n/messages/en.json";

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const analyticsMessages = enMessages.analytics as Record<string, unknown>;

/** The real English `analytics` strings; any other namespace echoes the key. */
const translate = (key: string) => {
  const value = analyticsMessages[key];
  return typeof value === "string" ? value : key;
};
translate.has = (key: string) => typeof analyticsMessages[key] === "string";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => translate,
}));

vi.mock("@/shared/components/analytics/rechartsCore", () => ({
  loadRecharts: vi.fn(),
  useRecharts: () => null,
  ChartLoadingCard: () => <div data-testid="chart-loading" />,
  DarkTooltip: () => null,
}));

/** A workspace with configured connections and keys but no request in the period. */
const noTrafficAnalytics = {
  summary: {
    totalTokens: 0,
    promptTokens: 0,
    completionTokens: 0,
    totalCost: 0,
    totalRequests: 0,
    uniqueAccounts: 0,
    uniqueApiKeys: 0,
    uniqueModels: 0,
    fastRequests: 0,
    fallbackRatePct: 0,
  },
  byProvider: [],
  byApiKey: [],
  byModel: [],
};

const withTrafficAnalytics = {
  ...noTrafficAnalytics,
  summary: {
    ...noTrafficAnalytics.summary,
    totalRequests: 12,
    uniqueAccounts: 3,
    uniqueApiKeys: 2,
    uniqueModels: 5,
  },
  byProvider: [
    { provider: "anthropic", requests: 7, totalTokens: 10, cost: 0 },
    { provider: "openai", requests: 5, totalTokens: 10, cost: 0 },
  ],
};

describe("Usage Analytics: the 'used in this period' block (KEA-9391)", () => {
  let container: HTMLElement;
  let root: Root | undefined;

  beforeEach(() => {
    (globalThis as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    localStorage.clear();
  });

  afterEach(() => {
    if (root) {
      act(() => {
        root!.unmount();
      });
      root = undefined;
    }
    container.remove();
    document.body.innerHTML = "";
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  async function renderWith(payload: unknown) {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockImplementation(() =>
          Promise.resolve({ ok: true, json: () => Promise.resolve(payload) })
        )
    );
    root = createRoot(container);
    await act(async () => {
      root!.render(<UsageAnalytics />);
    });
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 30));
    });
  }

  function usedInPeriodSection(): HTMLElement {
    const section = container.querySelector('[data-testid="analytics-used-in-period"]');
    expect(section).not.toBeNull();
    return section as HTMLElement;
  }

  /** The figure shown beside a label inside the block. */
  function figure(section: HTMLElement, label: string): string | undefined {
    const row = Array.from(section.querySelectorAll("div")).find(
      (el) => el.children.length === 2 && el.children[0].textContent?.trim() === label
    );
    return row?.children[1].textContent?.trim();
  }

  it("says the figures count what served requests in the period, not what is configured", async () => {
    await renderWith(noTrafficAnalytics);

    const section = usedInPeriodSection();
    expect(section.textContent).toContain("Used in this period");
    expect(section.textContent).toContain(
      "Accounts, providers, API keys and models that handled at least one request in the selected period. Connections and keys without traffic are not counted."
    );
    // The old heading read as an inventory of the workspace.
    expect(container.textContent).not.toContain("Infrastructure");
  });

  it("keeps the four figures: distinct accounts, providers, API keys and models with traffic", async () => {
    await renderWith(withTrafficAnalytics);

    const section = usedInPeriodSection();
    expect(figure(section, "Accounts")).toBe("3");
    expect(figure(section, "Providers")).toBe("2");
    expect(figure(section, "API Keys")).toBe("2");
    expect(figure(section, "Models")).toBe("5");
  });

  it("shows zeros, still under the period heading, when nothing was requested", async () => {
    await renderWith(noTrafficAnalytics);

    const section = usedInPeriodSection();
    for (const label of ["Accounts", "Providers", "API Keys", "Models"]) {
      expect(figure(section, label)).toBe("0");
    }
  });
});
