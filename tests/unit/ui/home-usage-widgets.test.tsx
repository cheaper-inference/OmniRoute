// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, values?: Record<string, unknown>) =>
    values ? `${key} ${JSON.stringify(values)}` : key,
}));

vi.mock("@/shared/components/analytics", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/shared/components/analytics")>()),
  ActivityHeatmap: () => <div data-testid="activity-heatmap" />,
  CustomRangePicker: ({ onApply }: { onApply: (start: string, end: string) => void }) => (
    <button
      type="button"
      onClick={() => onApply("2026-11-01T00:00:00.000Z", "2026-11-05T00:00:00.000Z")}
    >
      apply-custom
    </button>
  ),
}));

import HomeUsageWidgets from "../../../src/app/(dashboard)/home/HomeUsageWidgets";

const analytics = {
  summary: {
    totalRequests: 12,
    promptTokens: 1500,
    completionTokens: 500,
    totalCost: 1.234,
    successRatePct: "75.00",
    fallbackCount: 3,
    fallbackRatePct: 25,
  },
  errorBreakdown: [
    { errorType: "rate_limit", count: 2 },
    { errorType: "unclassified", count: 1 },
  ],
};
const combos = [{ comboName: "coder", requests: 9, inputTokens: 1000, outputTokens: 400 }];

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;
let fetchMock: ReturnType<typeof vi.fn>;

function jsonResponse(body: unknown, ok = true) {
  return Promise.resolve({ ok, json: async () => body } as Response);
}

async function flush() {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
}

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  fetchMock = vi.fn((url: string) =>
    url.startsWith("/api/usage/by-combo") ? jsonResponse({ combos }) : jsonResponse(analytics)
  );
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

describe("HomeUsageWidgets", () => {
  it("requests 1d by default and renders totals and combos with a capitalized name", async () => {
    act(() => root.render(<HomeUsageWidgets />));
    await flush();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/usage/analytics?range=1d&includeFlatRateEstimates=true"
    );
    expect(fetchMock).toHaveBeenCalledWith("/api/usage/by-combo?range=1d");
    const text = container.textContent ?? "";
    expect(text).toContain("totalTokens");
    expect(text).toContain("2.0K");
    expect(text).toContain("inputTokens");
    expect(text).toContain("1.5K");
    expect(text).toContain("outputTokens");
    expect(text).toContain("estCost");
    expect(text).toContain("$1.23");
    expect(text).toContain("Coder");
  });

  it("renders the activity heatmap", async () => {
    act(() => root.render(<HomeUsageWidgets />));
    await flush();

    expect(container.querySelector('[data-testid="activity-heatmap"]')).toBeTruthy();
  });

  it("sums the error breakdown into the errors card", async () => {
    act(() => root.render(<HomeUsageWidgets />));
    await flush();

    const errorsValue = Array.from(container.querySelectorAll("span")).find(
      (p) => p.textContent === "3"
    );
    expect(errorsValue).toBeTruthy();
  });

  it("refetches with the selected range", async () => {
    act(() => root.render(<HomeUsageWidgets />));
    await flush();

    const button = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent === "period7D"
    ) as HTMLButtonElement;
    act(() => button.click());
    await flush();

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/usage/analytics?range=7d&includeFlatRateEstimates=true"
    );
    expect(fetchMock).toHaveBeenCalledWith("/api/usage/by-combo?range=7d");
    expect(button.getAttribute("aria-pressed")).toBe("true");
  });

  it("shows the error message when analytics fails", async () => {
    fetchMock.mockImplementation(() => jsonResponse({}, false));
    act(() => root.render(<HomeUsageWidgets />));
    await flush();

    expect(container.textContent).toContain("usageWidgetsError");
  });

  it("offers 90d, ytd and all ranges", async () => {
    act(() => root.render(<HomeUsageWidgets />));
    await flush();

    for (const [label, range] of [
      ["period90D", "90d"],
      ["periodYTD", "ytd"],
      ["periodAll", "all"],
    ]) {
      const button = Array.from(container.querySelectorAll("button")).find(
        (b) => b.textContent === label
      ) as HTMLButtonElement;
      act(() => button.click());
      await flush();
      expect(fetchMock).toHaveBeenCalledWith(`/api/usage/by-combo?range=${range}`);
    }
  });

  it("sends startDate and endDate for a custom range", async () => {
    act(() => root.render(<HomeUsageWidgets />));
    await flush();

    const custom = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent === "customRange"
    ) as HTMLButtonElement;
    act(() => custom.click());
    const apply = Array.from(container.querySelectorAll("button")).find(
      (b) => b.textContent === "apply-custom"
    ) as HTMLButtonElement;
    act(() => apply.click());
    await flush();

    const expected = new URLSearchParams({
      range: "custom",
      startDate: "2026-11-01T00:00:00.000Z",
      endDate: "2026-11-05T00:00:00.000Z",
    }).toString();
    expect(fetchMock).toHaveBeenCalledWith(`/api/usage/by-combo?${expected}`);
    expect(fetchMock).toHaveBeenCalledWith(
      `/api/usage/analytics?${expected}&includeFlatRateEstimates=true`
    );
  });
});
