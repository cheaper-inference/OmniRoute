import { healthyResponse } from "./quota-availability-fixtures";
import React from "react";
import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, render, renderHook } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import en from "../../src/i18n/messages/en.json";
import ProviderLimits from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits";
import { useAvailability } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/useAvailability";
import { displayAccount } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay";
vi.unmock("next-intl");
vi.mock("@/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCard", () => ({
  default: () => null,
}));
const t0 = Date.parse("2099-01-01T00:00:00Z");
const iso = (n: number) => new Date(n).toISOString();
const data = { a: { quotas: [{ name: "weekly", remainingPercentage: 80 }] } };
const errors = {};
const advance = (ms = 0) => act(async () => void (await vi.advanceTimersByTimeAsync(ms)));
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  localStorage.clear();
});
function clock() {
  vi.useFakeTimers();
  vi.setSystemTime(t0);
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
}
it.each(["expired", "banned", "credits_exhausted"])(
  "failed summary polls cannot recover %s using an older active connection",
  async (testStatus) => {
    clock();
    let terminal = false;
    let fail = false;
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input) => {
        if (String(input) === "/api/usage/availability") return healthyResponse(["a"]);
        expect(String(input)).toBe("/api/resilience/cooldowns");
        if (fail) return Response.json({}, { status: 503 });
        return Response.json({
          generatedAt: iso(Date.now()),
          connections: [
            {
              id: "a",
              status: terminal ? "terminal" : "healthy",
              testStatus: terminal ? testStatus : "active",
              lastErrorAt: terminal ? iso(Date.now()) : null,
              lockouts: [],
            },
          ],
        });
      })
    );
    const initial = [
      {
        id: "a",
        provider: "claude",
        isActive: true,
        testStatus: "active",
        runtimeObservedAt: iso(t0),
      },
    ];
    const { result, rerender } = renderHook(
      ({ connections }) => useAvailability(connections, data, errors),
      {
        initialProps: { connections: initial },
      }
    );
    await advance();
    terminal = true;
    await advance(30000);
    expect(displayAccount(result.current.accounts.a, Date.now()).kind).toBe("act");
    fail = true;
    await advance(91000);
    expect(result.current.summaryFailed).toBe(true);
    expect(displayAccount(result.current.accounts.a, Date.now()).kind).toBe("act");
    expect(result.current.accounts.a.runtimeAvailability?.state).not.toBe("AVAILABLE");
    rerender({ connections: [{ ...initial[0], runtimeObservedAt: iso(Date.now()) }] });
    await advance(1);
    expect(displayAccount(result.current.accounts.a, Date.now()).kind).toBe("ok");
    expect(result.current.accounts.a.runtimeAvailability?.state).toBe("AVAILABLE");
  }
);
it("a newer successful healthy summary recovers a terminal after failed polls", async () => {
  clock();
  let mode = "terminal";
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input) => {
      if (String(input) === "/api/usage/availability") return healthyResponse(["a"]);
      expect(String(input)).toBe("/api/resilience/cooldowns");
      if (mode === "failed") return Response.json({}, { status: 503 });
      return Response.json({
        generatedAt: iso(Date.now()),
        connections: [
          {
            id: "a",
            status: mode === "terminal" ? "terminal" : "healthy",
            testStatus: mode === "terminal" ? "expired" : null,
            lockouts: [],
          },
        ],
      });
    })
  );
  const connections = [
    {
      id: "a",
      provider: "claude",
      isActive: true,
      testStatus: "active",
      runtimeObservedAt: iso(t0 - 1000),
    },
  ];
  const { result } = renderHook(() => useAvailability(connections, data, errors));
  await advance();
  mode = "failed";
  await advance(91000);
  expect(result.current.accounts.a.runtimeAvailability?.state).toBe("STALE_TERMINAL");
  expect(displayAccount(result.current.accounts.a, Date.now()).kind).toBe("act");
  mode = "healthy";
  await act(async () => {
    await result.current.refreshAvailability();
  });
  expect(displayAccount(result.current.accounts.a, Date.now()).kind).toBe("ok");
  expect(result.current.accounts.a.runtimeAvailability?.state).toBe("AVAILABLE");
});
it.each(["older", "same-time", "missing-row"])(
  "%s healthy summary is not recovery evidence for a terminal",
  async (mode) => {
    clock();
    let recovered = false;
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input) => {
        if (String(input) === "/api/usage/availability") return healthyResponse(["a"]);
        expect(String(input)).toBe("/api/resilience/cooldowns");
        return Response.json({
          generatedAt: iso(
            recovered && mode === "older"
              ? t0 - 1000
              : recovered && mode === "missing-row"
                ? Date.now()
                : t0
          ),
          connections:
            recovered && mode === "missing-row"
              ? []
              : [
                  {
                    id: "a",
                    status: recovered ? "healthy" : "terminal",
                    testStatus: recovered ? "active" : "expired",
                    lockouts: [],
                  },
                ],
        });
      })
    );
    const connections = [
      {
        id: "a",
        provider: "claude",
        isActive: true,
        testStatus: "active",
        runtimeObservedAt: iso(t0 - 2000),
      },
    ];
    const { result } = renderHook(() => useAvailability(connections, data, errors));
    await advance();
    await advance(1000);
    recovered = true;
    await act(async () => {
      await result.current.refreshAvailability();
    });
    expect(displayAccount(result.current.accounts.a, Date.now()).kind).toBe("act");
  }
);
it("a later DB-only provider response preserves the live model-lock capsule", async () => {
  clock();
  let deliver: (response: Response) => void = () => {
    throw Error("No pending connection response");
  };
  const requests: Array<{ url: string; method: string }> = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input, init) => {
      const url = String(input);
      requests.push({ url, method: init?.method || "GET" });
      if (url === "/api/providers/client")
        return new Promise<Response>((resolve) => {
          deliver = resolve;
        });
      if (url === "/api/usage/availability") return healthyResponse(["a"]);
      if (url === "/api/resilience/cooldowns")
        return Response.json({
          generatedAt: iso(t0),
          connections: [
            {
              id: "a",
              status: "model_locked",
              testStatus: "active",
              rateLimitedUntil: null,
              lockouts: [{ model: "synthetic-model", remainingMs: 60000, reason: "429" }],
            },
          ],
        });
      if (url === "/api/usage/provider-limits")
        return Response.json({
          caches: { a: { quotas: { weekly: { used: 20, total: 100, remainingPercentage: 80 } } } },
        });
      if (["/api/providers/quota-windows", "/api/settings"].includes(url)) return Response.json({});
      if (url.startsWith("/api/provider-models?")) return Response.json({ models: [] });
      throw Error(`Unexpected synthetic request: ${url}`);
    })
  );
  render(
    <NextIntlClientProvider
      locale="en"
      timeZone="UTC"
      messages={{ usage: en.usage, common: en.common }}
    >
      <ProviderLimits />
    </NextIntlClientProvider>
  );
  await advance(1000);
  await act(async () => {
    deliver(
      Response.json({
        connections: [
          {
            id: "a",
            provider: "claude",
            authType: "oauth",
            isActive: true,
            testStatus: "active",
            updatedAt: "2098-12-01T00:00:00Z",
          },
        ],
      })
    );
  });
  await advance(1);
  const capsule = () => document.querySelector('[data-account="a"]');
  expect(capsule()).not.toBeNull();
  expect(capsule()!.getAttribute("data-availability")).toBe("alert");
  await advance(59000);
  expect(capsule()!.getAttribute("data-availability")).toBe("ok");
  expect(
    requests.some((r) => r.method !== "GET" || r.url === "/api/usage/a" || /\/test/.test(r.url))
  ).toBe(false);
});
