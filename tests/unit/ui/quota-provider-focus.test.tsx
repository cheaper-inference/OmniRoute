import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import QuotaPage from "../../../src/app/(dashboard)/dashboard/quota/page";
vi.mock("@/shared/components", () => ({ CardSkeleton: () => <div>Loading</div> }));
vi.mock("../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits", () => ({
  default: () => <div>Provider limits</div>,
}));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it("keeps general quota focused on provider limits without fetching OpenAI billing", async () => {
  const fetcher = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
  vi.stubGlobal("fetch", fetcher);
  render(<QuotaPage />);
  expect(screen.getByText("Provider limits")).toBeTruthy();
  await waitFor(() => expect(fetcher).toHaveBeenCalledWith("/api/settings"));
  expect(fetcher.mock.calls.every(([url]) => !String(url).includes("openai-costs"))).toBe(true);
});
