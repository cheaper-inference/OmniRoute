// @vitest-environment jsdom
/**
 * UI review 2026-11-15. The custom-range button of UsageAnalytics is the trigger of the picker's
 * kit Popover, and the "x" that clears an applied range sits inside that trigger. Radix does not
 * dismiss on a press inside the trigger, and the "x" stops the click that would toggle it, so
 * nothing closed the panel: it stayed open on the dates that had just been cleared, and "Apply"
 * brought the range back. The hand-made panel this replaced closed on any press outside it.
 */
import React from "react";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, expect, it, vi } from "vitest";
import UsageAnalytics from "@/shared/components/UsageAnalytics";

// The kit Table measures itself with ResizeObserver (persistent scrollbar); jsdom lacks it.
beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
});

const translate = (key: string, values?: Record<string, unknown>) =>
  values ? `${key}:${JSON.stringify(values)}` : key;
translate.has = () => true;

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

const analytics = {
  summary: {
    totalTokens: 1200,
    promptTokens: 1000,
    cachedInputTokens: 0,
    cachedInputTokensComplete: true,
    completionTokens: 200,
    totalCost: 0.5,
    totalRequests: 3,
    uniqueAccounts: 1,
    uniqueApiKeys: 1,
    uniqueModels: 1,
    fastRequests: 0,
    fallbackRatePct: 0,
  },
  byProvider: [],
  byApiKey: [],
  byModel: [],
};

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve(analytics) }))
  );
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.unstubAllGlobals();
});

it("clearing an applied custom range from the trigger closes the open panel", async () => {
  const { container } = render(<UsageAnalytics />);
  const trigger = () =>
    container.querySelector<HTMLButtonElement>('button[aria-haspopup="dialog"]')!;
  await waitFor(() => expect(trigger()).not.toBeNull());
  const panel = () => document.querySelector<HTMLElement>('[role="dialog"]');
  const clear = () => trigger().querySelector<HTMLElement>('[role="button"]');

  // Apply a custom range.
  fireEvent.click(trigger());
  expect(panel()).not.toBeNull();
  const [start, end] = Array.from(
    panel()!.querySelectorAll<HTMLInputElement>('input[type="datetime-local"]')
  );
  fireEvent.change(start, { target: { value: "2026-11-01T00:00" } });
  fireEvent.change(end, { target: { value: "2026-11-02T00:00" } });
  const apply = Array.from(panel()!.querySelectorAll("button")).find(
    (button) => button.textContent === "rangeApply"
  )!;
  fireEvent.click(apply);
  expect(panel()).toBeNull();
  expect(trigger().getAttribute("aria-pressed")).toBe("true");
  expect(clear()).not.toBeNull();

  // Reopen the panel, then clear the range with the "x" inside the trigger.
  fireEvent.click(trigger());
  expect(panel()).not.toBeNull();
  fireEvent.click(clear()!);

  expect(panel()).toBeNull();
  expect(trigger().getAttribute("aria-pressed")).toBe("false");
  expect(trigger().textContent).toContain("customRange");
  expect(clear()).toBeNull();
});

it("clearing with the panel closed leaves it closed", async () => {
  const { container } = render(<UsageAnalytics />);
  const trigger = () =>
    container.querySelector<HTMLButtonElement>('button[aria-haspopup="dialog"]')!;
  await waitFor(() => expect(trigger()).not.toBeNull());
  const panel = () => document.querySelector<HTMLElement>('[role="dialog"]');

  fireEvent.click(trigger());
  const [start, end] = Array.from(
    panel()!.querySelectorAll<HTMLInputElement>('input[type="datetime-local"]')
  );
  fireEvent.change(start, { target: { value: "2026-11-01T00:00" } });
  fireEvent.change(end, { target: { value: "2026-11-02T00:00" } });
  fireEvent.click(
    Array.from(panel()!.querySelectorAll("button")).find(
      (button) => button.textContent === "rangeApply"
    )!
  );
  expect(panel()).toBeNull();

  fireEvent.click(trigger().querySelector<HTMLElement>('[role="button"]')!);
  expect(panel()).toBeNull();
  expect(trigger().getAttribute("aria-pressed")).toBe("false");
});
