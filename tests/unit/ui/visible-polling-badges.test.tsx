// @vitest-environment jsdom
/**
 * The dashboard's polling badges must not fetch from a hidden tab and must refresh as soon as the
 * tab returns, so a tab switch never leaves them stale for a full polling interval.
 */
import React from "react";
import { act, cleanup, render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import CloudSyncStatus from "@/shared/components/CloudSyncStatus";
import DegradationBadge from "@/shared/components/DegradationBadge";
import MaintenanceBanner from "@/shared/components/MaintenanceBanner";
import TokenHealthBadge from "@/shared/components/TokenHealthBadge";
import messages from "../../../src/i18n/messages/en.json";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/dashboard",
}));

function setVisibility(state: "visible" | "hidden") {
  Object.defineProperty(document, "visibilityState", { configurable: true, value: state });
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  setVisibility("visible");
});

const cases: Array<[string, React.ReactElement, string]> = [
  ["DegradationBadge", <DegradationBadge key="d" />, "/api/health/degradation?summary=true"],
  ["MaintenanceBanner", <MaintenanceBanner key="m" />, "/api/health/ping"],
  ["TokenHealthBadge", <TokenHealthBadge key="t" />, "/api/token-health"],
  ["CloudSyncStatus", <CloudSyncStatus key="c" />, "/api/sync/cloud"],
];

describe.each(cases)("%s", (_name, element, url) => {
  it("does not fetch while hidden and refreshes when the tab returns", async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, json: async () => ({}) }));
    vi.stubGlobal("fetch", fetchMock);
    setVisibility("hidden");

    render(
      <NextIntlClientProvider locale="en" timeZone="UTC" messages={messages}>
        {element}
      </NextIntlClientProvider>
    );
    await act(async () => {
      await Promise.resolve();
    });
    expect(fetchMock).not.toHaveBeenCalled();

    setVisibility("visible");
    await act(async () => {
      document.dispatchEvent(new Event("visibilitychange"));
      await Promise.resolve();
    });
    expect(fetchMock.mock.calls.map((call) => call[0])).toEqual([url]);
  });
});
