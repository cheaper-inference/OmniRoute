// @vitest-environment jsdom
// ComboHealthTab fetch "/api/usage/combo-health-dashboard?range=${range}&horizon=${horizon}" (ComboHealthTab.tsx:817-820) au mount ;
// on intercept global.fetch et on mount the réel composant.
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const translate = (key: string, params?: Record<string, unknown>) =>
  params && "value" in params ? String(params.value) : key;
vi.mock("next-intl", () => ({ useTranslations: () => translate }));

const ComboHealthTab = (
  await import("../../../src/app/(dashboard)/dashboard/analytics/ComboHealthTab")
).default;

const NULL_COMBO = {
  comboId: "c1",
  comboName: "null-quota",
  strategy: "auto",
  models: ["m1"],
  quotaHealth: {
    providers: [
      { provider: "openrouter", remainingPct: null, isExhausted: false, trend: "stable" },
    ],
    worstRemainingPct: null,
  },
  usageSkew: { modelDistribution: [], giniCoefficient: 0 },
  performance: { avgLatencyMs: 0, successRate: 0, totalRequests: 0 },
};
//%20Enveloppe%20r%C3%A9elle%20lue%20par%20ComboHealthTab.tsx:828-836%20:%20result.health%20+%20result.errors%20|||%20%20%2 0%20%20//%20via%20formatPercent(successRate*100)%20m%C3%AAme%20post-fix%20%E2%80%94%20un%20not.toContain(%220%%22)%20global
// (pas {combos:[…]} — sinon setData(undefined), liste vide, jamais de n/a).
const NULL_PAYLOAD = {
  health: { timeRange: "24h", combos: [NULL_COMBO] },
  forecast: null,
  autopilot: null,
  scoring: null,
  errors: {},
};

function mount() {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  return { el, root };
}

describe("combo health null quota", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: unknown) => {
        expect(String(url)).toContain("/api/usage/combo-health-dashboard");
        return new Response(JSON.stringify(NULL_PAYLOAD), { status: 200 });
      })
    );
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.innerHTML = "";
  });

  it("renders n/a in the quota section, bar width 0%", async () => {
    const { el, root } = mount();
    await act(async () => {
      root.render(<ComboHealthTab />);
    });
    // Assertion scopée à la section quota (C1) : le bloc perf yield "0.0%" legitimate
    // via formatPercent(successRate*100) même post-fix — un not.toContain("0%") global
    // serait un faux-positif permanent.
    const quotaSection = el.querySelector("section") as HTMLElement | null;
    const quotaText = quotaSection?.textContent ?? "";
    expect(quotaText).toContain("n/a");
    const bar = quotaSection?.querySelector('[style*="width"]') as HTMLElement | null;
    expect(bar?.style.width).toBe("0%");
  });
});
