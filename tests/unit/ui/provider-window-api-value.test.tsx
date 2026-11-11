// @vitest-environment jsdom
import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../../src/i18n/messages/en.json";
import zh from "../../../src/i18n/messages/zh-CN.json";
import ProviderUsdCostModal from "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/ProviderUsdCostModal";

vi.unmock("next-intl");

// Keep the real modal content, fetch lifecycle and next-intl translations; the
// presentation shell/slider are not the subject of this disclosure regression.
vi.mock("@/shared/components/Modal", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("@omniroute/ui-kit/slider", () => ({
  Slider: ({ disabled }: { disabled: boolean }) => <input type="range" disabled={disabled} />,
}));
vi.mock("@/shared/components/Icon", () => ({ default: () => null }));
vi.mock("@/shared/components/Loading", () => ({ Spinner: () => null }));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const payload = {
  provider: "claude",
  connectionId: "illustrative-connection",
  windowStartAt: "2026-06-25T23:00:00.000Z",
  windowResetAt: "2026-07-02T23:00:00.000Z",
  windowSource: "provider_weekly_reset",
  windowStartSource: "inferred_from_reset_at",
  quotaName: "weekly",
  quotaUsedPercent: 50,
  quotaRemainingPercent: 50,
  totalCostUsd: 2,
  estimatedFullQuotaUsd: null,
  unpricedRequests: 1,
  rows: [],
};

async function show(messages = en, overrides: Record<string, unknown> = {}) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify({ ...payload, ...overrides })))
  );
  render(
    <NextIntlClientProvider
      locale={messages === zh ? "zh-CN" : "en"}
      messages={{ usageLimits: messages.usageLimits, teamCosts: messages.teamCosts }}
      timeZone="UTC"
    >
      <ProviderUsdCostModal
        isOpen
        onClose={() => {}}
        connection={{ provider: "claude", id: "illustrative-connection" }}
        providerLabel="Claude"
        accountLabel="Illustrative"
      />
    </NextIntlClientProvider>
  );
  await screen.findByText(messages.usageLimits.apiValueNotice);
}

it("explains current configured API value, budget separation and uncertain projection", async () => {
  await show();
  expect(screen.getByText(en.usageLimits.apiValueNotice).textContent).toContain(
    "current configured API prices"
  );
  expect(screen.getByText(en.usageLimits.apiValueNotice).textContent).toContain(
    "not a subscription charge or a key budget deduction"
  );
  expect(screen.getByRole("status").textContent).toContain(en.teamCosts.unpricedReport);
  expect(screen.getByRole("status").textContent).toContain("(1)");
  expect((screen.getByRole("slider") as HTMLInputElement).disabled).toBe(true);
});

it("uses the selected locale for the explanation and incomplete-price notice", async () => {
  await show(zh);
  expect(screen.getByRole("status").textContent).toContain(zh.teamCosts.unpricedReport);
  expect(screen.queryByText(en.usageLimits.apiValueNotice)).toBeNull();
});

it("does not mark fully priced or older compatible payloads incomplete", async () => {
  await show(en, { unpricedRequests: undefined, estimatedFullQuotaUsd: 4 });
  await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
  expect((screen.getByRole("slider") as HTMLInputElement).disabled).toBe(false);
});
