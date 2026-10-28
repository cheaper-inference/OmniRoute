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
const t0 = Date.parse("2099-01-01T00:00:00Z");
type Request = { url: string; method: string };
// Local catalog reads from useVisibleQuotaData.ts use the provider-models route.
const allowed = [
  "/api/resilience/cooldowns",
  "/api/usage/availability",
  "/api/usage/provider-limits",
  "/api/providers/client",
  "/api/providers/quota-windows",
  "/api/settings",
];
function readOnly(requests: Request[]) {
  expect(
    requests.filter(
      (r) =>
        r.method !== "GET" ||
        !(allowed.includes(r.url) || r.url.startsWith("/api/provider-models?provider="))
    )
  ).toEqual([]);
}
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  localStorage.clear();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
const advance = (ms = 0) =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
function setup({ layout = "overview", cold = true, stale = false, deferred = false } = {}) {
  vi.useFakeTimers();
  vi.setSystemTime(t0);
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  localStorage.setItem("omniroute:limits:layoutMode", layout);
  const requests: Request[] = [];
  const quota = {
    quotas: {
      weekly: {
        used: stale ? 100 : 20,
        total: 100,
        resetAt: new Date(t0 + (stale ? -1 : 86400000)).toISOString(),
      },
    },
  };
  let resolveLive: (r: Response) => void = () => {
    throw Error("No pending live request");
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
      if (url === "/api/usage/probe")
        return deferred
          ? new Promise<Response>((resolve) => {
              resolveLive = resolve;
            })
          : Response.json(quota);
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
                fetchedAt: new Date().toISOString(),
              },
            },
          ],
        });
      if (url === "/api/resilience/cooldowns")
        return Response.json({
          generatedAt: new Date().toISOString(),
          connections: [{ id: "probe", status: "healthy", testStatus: "active", lockouts: [] }],
        });
      if (["/api/settings", "/api/providers/quota-windows"].includes(url)) return Response.json({});
      if (url.startsWith("/api/provider-models?provider=")) return Response.json({ models: [] });
      throw Error(`Unexpected ${method} ${url}`);
    })
  );
  return { requests, resolve: () => resolveLive(Response.json(quota)) };
}
async function mount(interval = 0) {
  const view = render(
    <NextIntlClientProvider
      locale="en"
      timeZone="UTC"
      messages={{ usage: en.usage, common: en.common }}
    >
      <ProviderLimits autoRefreshInterval={interval} />
    </NextIntlClientProvider>
  );
  await advance();
  return view;
}
function overview() {
  fireEvent.click(screen.getByRole("button", { name: en.usage.healthOverview }));
}
it.each([false, true])(
  "Overview cold cache mount, stale=%s, timers and browser events are read-only",
  async (stale) => {
    const { requests } = setup({ stale });
    await mount(30);
    await advance(310000);
    fireEvent(document, new Event("visibilitychange"));
    fireEvent(window, new Event("focus"));
    await advance();
    readOnly(requests);
    expect(requests.some((r) => r.url === "/api/providers/client")).toBe(true);
  }
);
it("Overview cached staleAfterReset stays read-only", async () => {
  const { requests } = setup({ cold: false, stale: true });
  await mount(30);
  await advance(61000);
  readOnly(requests);
});
it.each(["full", "compact"])(
  "%s in-flight auto response cannot schedule live work after Overview switch",
  async (layout) => {
    const { requests, resolve } = setup({ layout, stale: true, deferred: true });
    await mount(30);
    expect(requests.filter((r) => r.url === "/api/usage/probe")).toHaveLength(1);
    overview();
    const start = requests.length;
    await act(async () => {
      resolve();
    });
    await advance(61000);
    readOnly(requests.slice(start));
  }
);
it.each(["full", "compact"])(
  "%s pending 5s stale retry is cancelled on layout switch",
  async (layout) => {
    const { requests } = setup({ layout, stale: true });
    await mount();
    expect(requests.filter((r) => r.url === "/api/usage/probe")).toHaveLength(1);
    overview();
    const start = requests.length;
    await advance(10000);
    readOnly(requests.slice(start));
  }
);
it.each(["full", "compact"])("%s unmount cancels pending live retries", async (layout) => {
  const { requests } = setup({ layout, stale: true });
  const view = await mount();
  view.unmount();
  const start = requests.length;
  await advance(10000);
  expect(requests.slice(start)).toEqual([]);
});
it.each(["full", "compact"])(
  "%s preserves 5s retry and automatic refresh timing",
  async (layout) => {
    const { requests } = setup({ layout, stale: true });
    await mount(30);
    await advance(4999);
    expect(requests.filter((r) => r.url === "/api/usage/probe")).toHaveLength(1);
    await advance(1);
    expect(requests.filter((r) => r.url === "/api/usage/probe")).toHaveLength(2);
    await advance(24999);
    expect(requests.filter((r) => r.method === "POST")).toHaveLength(0);
    await advance(1);
    expect(requests.filter((r) => r.method === "POST")).toEqual([
      { url: "/api/usage/provider-limits", method: "POST" },
    ]);
  }
);
it("Overview explicit Refresh all still POSTs", async () => {
  const { requests } = setup();
  await mount();
  fireEvent.click(screen.getByRole("button", { name: /Refresh all/i }));
  await advance();
  expect(requests.filter((r) => r.method === "POST")).toEqual([
    { url: "/api/usage/provider-limits", method: "POST" },
  ]);
});
it("Overview explicit card refresh still GETs live usage but its stale retry is automatic", async () => {
  const { requests } = setup({ cold: false, stale: true });
  await mount();
  fireEvent.click(document.querySelector<HTMLButtonElement>("[data-account]")!);
  fireEvent.click(screen.getByRole("button", { name: "Synthetic card refresh" }));
  await advance();
  expect(requests.filter((r) => r.url === "/api/usage/probe")).toHaveLength(1);
  const start = requests.length;
  await advance(10000);
  readOnly(requests.slice(start));
});
