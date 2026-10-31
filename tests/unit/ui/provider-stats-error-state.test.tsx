// @vitest-environment jsdom
import React from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

// Key-returning translator: the assertions below read stable i18n keys, not English copy.
vi.mock("next-intl", () => ({
  useTranslations: (namespace: string) => (key: string) => `${namespace}.${key}`,
}));

const PAGE = "../../../src/app/(dashboard)/dashboard/provider-stats/page";
const originalFetch = globalThis.fetch;

// Warm the page module outside the per-test budget (cold kit transform on a loaded runner).
beforeAll(async () => {
  await import(PAGE);
}, 60_000);

afterEach(() => {
  cleanup();
  globalThis.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("ProviderStatsPage error-only state (KEA-7886 lote 9, review I1)", () => {
  it("keeps the page header and a retry affordance after the error alert is dismissed", async () => {
    // Every request fails: /api/provider-stats (the page) and /api/provider-nodes (name map).
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({}),
    }) as unknown as typeof fetch;

    const { default: ProviderStatsPage } = await import(PAGE);
    render(<ProviderStatsPage />);

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toContain("providerStats.loadFailed");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("providerStats.title");

    fireEvent.click(screen.getByRole("button", { name: "common.close" }));

    await waitFor(() => expect(screen.queryByRole("alert")).toBeNull());
    // The frame survives the dismissal: title plus the header's refresh (retry) button.
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("providerStats.title");
    const refresh = screen.getByRole("button", { name: "providerStats.refresh" });
    const callsBefore = (globalThis.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls.length;
    fireEvent.click(refresh);
    await waitFor(() =>
      expect(
        (globalThis.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls.length
      ).toBeGreaterThan(callsBefore)
    );
  });
});
