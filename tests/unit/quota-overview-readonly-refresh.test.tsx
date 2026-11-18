import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../src/i18n/messages/en.json";
import ProviderLimits from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits";
vi.unmock("next-intl");
vi.mock("@/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCard", () => ({
  default: ({ onRefresh }: { onRefresh: () => void }) => (
    <button onClick={onRefresh}>Synthetic card refresh</button>
  ),
}));
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  localStorage.clear();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
function setup(cold: boolean, layout = "overview") {
  vi.useFakeTimers();
  vi.setSystemTime("2099-01-01T00:00:00Z");
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  if (layout !== "overview") localStorage.setItem("omniroute:limits:layoutMode", layout);
  const requests: Array<{ url: string; method: string }> = [];
  const fetchedAt = new Date().toISOString();
  const quota = {
    fetchedAt,
    quotas: { weekly: { remainingPercentage: 80, total: 100, used: 20 } },
  };
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input, init) => {
      const url = String(input),
        method = init?.method || "GET";
      requests.push({ url, method });
      if (url === "/api/providers/client")
        return Response.json({
          connections: [{ id: "probe", provider: "claude", authType: "oauth", isActive: true }],
        });
      if (url === "/api/usage/provider-limits")
        return Response.json({ caches: cold ? {} : { probe: quota } });
      if (url === "/api/usage/probe") return Response.json(quota);
      if (url === "/api/usage/availability")
        return Response.json({
          generatedAt: new Date().toISOString(),
          connections: [
            {
              id: "probe",
              scopes: [],
              account: {
                usable: cold ? null : true,
                blockers: [],
                allowanceReasons: [],
                fetchedAt,
              },
            },
          ],
        });
      if (url === "/api/resilience/cooldowns")
        return Response.json({
          generatedAt: fetchedAt,
          connections: [{ id: "probe", status: "healthy", testStatus: "active", lockouts: [] }],
        });
      if (["/api/providers/quota-windows", "/api/settings"].includes(url)) return Response.json({});
      if (url.startsWith("/api/provider-models?")) return Response.json({ models: [] });
      throw Error(`Unexpected synthetic request: ${method} ${url}`);
    })
  );
  return requests;
}
const advance = (ms = 0) =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
async function mount(interval = 0) {
  render(
    <NextIntlClientProvider
      locale="en"
      timeZone="UTC"
      messages={{ usage: en.usage, common: en.common }}
    >
      <ProviderLimits autoRefreshInterval={interval} />
    </NextIntlClientProvider>
  );
  await advance();
}
it("overview + empty OAuth cache never GETs live usage on mount", async () => {
  const requests = setup(true);
  await mount();
  expect(document.querySelectorAll("[data-account]")).toHaveLength(1);
  expect(requests.filter((r) => r.url === "/api/usage/probe")).toEqual([]);
});
it("overview + 180-second auto refresh never POSTs", async () => {
  const requests = setup(false);
  await mount(180);
  await advance(180_000);
  expect(requests.filter((r) => r.method === "POST")).toEqual([]);
});
it.each(["full", "compact"])(
  "%s retains automatic live fetch for missing OAuth cache",
  async (layout) => {
    const requests = setup(true, layout);
    await mount();
    expect(requests.filter((r) => r.url === "/api/usage/probe")).toEqual([
      { url: "/api/usage/probe", method: "GET" },
    ]);
  }
);
it.each(["full", "compact"])("%s retains 180-second automatic POST", async (layout) => {
  const requests = setup(false, layout);
  await mount(180);
  await advance(179_000);
  expect(requests.filter((r) => r.method === "POST")).toHaveLength(0);
  await advance(1000);
  expect(requests.filter((r) => r.method === "POST")).toEqual([
    { url: "/api/usage/provider-limits", method: "POST" },
  ]);
});
it("overview explicit Refresh all still POSTs", async () => {
  const requests = setup(false);
  await mount();
  fireEvent.click(screen.getByRole("button", { name: /Refresh all/i }));
  await advance();
  expect(requests.filter((r) => r.method === "POST")).toEqual([
    { url: "/api/usage/provider-limits", method: "POST" },
  ]);
});
it("overview expanded account detail retains explicit card refresh", async () => {
  const requests = setup(false);
  await mount();
  fireEvent.click(document.querySelector<HTMLButtonElement>("[data-account]")!);
  fireEvent.click(screen.getByRole("button", { name: "Synthetic card refresh" }));
  await advance();
  expect(requests.filter((r) => r.url === "/api/usage/probe")).toHaveLength(1);
});
it.each(["full", "compact"])(
  "switching overview to %s enables missing-cache fetch, switching back stops timer writes",
  async (layout) => {
    const requests = setup(true);
    await mount(180);
    fireEvent.click(
      screen.getByRole("button", {
        name: layout === "full" ? en.usage.layoutFull : en.usage.layoutCompact,
      })
    );
    await advance();
    expect(requests.filter((r) => r.url === "/api/usage/probe")).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: en.usage.healthOverview }));
    await advance(180_000);
    expect(requests.filter((r) => r.method === "POST")).toHaveLength(0);
  }
);
