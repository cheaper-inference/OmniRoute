import { afterEach, expect, it, vi } from "vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { useAvailability } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/useAvailability";
import { displayAccount } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay";
const fetchedAt = "2099-01-01T00:00:00Z";
const connection = {
  id: "account@example.test",
  provider: "claude",
  email: "account@example.test",
  isActive: true,
};
const connections = [connection];
const quotaData = {
  [connection.id]: { raw: { fetchedAt }, quotas: [{ name: "weekly", remainingPercentage: 10 }] },
};
const errors = {};
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
function fixture(cooling = false, durationMs = 2000, failQuota = false) {
  vi.useFakeTimers();
  vi.setSystemTime(fetchedAt);
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  let fail = false;
  const requests: string[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string, init: RequestInit) => {
      expect(init.method).toBe("GET");
      expect(init.cache).toBe("no-store");
      requests.push(input);
      if (input === "/api/usage/availability") {
        if (fail && failQuota)
          return Response.json({ error: "synthetic failure" }, { status: 503 });
        return Response.json({
          generatedAt: new Date().toISOString(),
          connections: [
            {
              id: connection.id,
              account: { usable: true, blockers: [], allowanceReasons: [], fetchedAt },
              scopes: [],
            },
          ],
        });
      }
      expect(input).toBe("/api/resilience/cooldowns");
      if (fail) return Response.json({ error: "synthetic failure" }, { status: 503 });
      return Response.json({
        generatedAt: new Date().toISOString(),
        connections: [
          {
            id: connection.id,
            status: cooling ? "cooling_down" : "healthy",
            cooldownRemainingMs: cooling
              ? Math.max(0, Date.parse(fetchedAt) + durationMs - Date.now())
              : 0,
            lockouts: [],
          },
        ],
      });
    })
  );
  return {
    requests,
    fail: () => {
      fail = true;
    },
    succeed: () => {
      fail = false;
    },
  };
}
const advance = async (ms: number) =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
it("ticks locally and polls both read-only summaries every 30 seconds", async () => {
  const f = fixture(true);
  const { result } = renderHook(() => useAvailability(connections, quotaData, errors));
  await advance(0);
  expect(result.current.accounts[connection.id].status).toBe("critical");
  expect(result.current.accounts[connection.id].recoverAt).toBe("2099-01-01T00:00:02.000Z");
  await advance(3000);
  expect(result.current.accounts[connection.id].status).toBe("ok");
  expect(f.requests).toEqual(["/api/resilience/cooldowns", "/api/usage/availability"]);
  await advance(27_000);
  expect(f.requests).toEqual([
    "/api/resilience/cooldowns",
    "/api/usage/availability",
    "/api/resilience/cooldowns",
    "/api/usage/availability",
  ]);
  await advance(300_000);
  expect(result.current.accounts[connection.id].status).toBe("ok");
  expect(f.requests.filter((x) => x === "/api/usage/availability")).toHaveLength(12);
});
it("keeps successful cooldown summaries for 90s, then uses connection runtime evidence", async () => {
  const f = fixture();
  const { result } = renderHook(() => useAvailability(connections, quotaData, errors));
  await advance(0);
  f.fail();
  await act(async () => {
    await result.current.refreshAvailability();
  });
  expect(result.current.summaryFailed).toBe(false);
  await advance(91_000);
  expect(result.current.summaryFailed).toBe(true);
  expect(result.current.accounts[connection.id].status).toBe("ok");
});
it("expires a failed server quota summary after 90s without inferring from meters", async () => {
  const f = fixture(false, 2000, true);
  const { result } = renderHook(() => useAvailability(connections, quotaData, errors));
  await advance(0);
  f.fail();
  await advance(90_000);
  expect(result.current.accounts[connection.id].status).toBe("ok");
  await advance(1000);
  expect(result.current.accounts[connection.id].status).toBe("empty");
});
it("a successful read within 90s of failure replaces the summary without resetting cooldown fill or kind", async () => {
  const f = fixture(true, 120_000);
  const { result } = renderHook(() => useAvailability(connections, quotaData, errors));
  await advance(0);
  await advance(1);
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
  await advance(30_000);
  f.fail();
  await act(async () => {
    await result.current.refreshAvailability();
  });
  expect(result.current.summaryFailed).toBe(false);
  const failed = displayAccount(result.current.accounts[connection.id], Date.now());
  expect(failed.kind).toBe("cd5");
  expect(failed.fill).toBeCloseTo(25, 1);
  expect(failed.runtimeObservedAt).toBe("2099-01-01T00:00:00.000Z");
  await advance(10_000);
  const before = displayAccount(result.current.accounts[connection.id], Date.now());
  f.succeed();
  await act(async () => {
    await result.current.refreshAvailability();
  });
  await advance(1);
  const after = displayAccount(result.current.accounts[connection.id], Date.now());
  expect(result.current.summaryFailed).toBe(false);
  expect(after.runtimeObservedAt).toBe("2099-01-01T00:00:40.001Z");
  expect(after.kind).toBe(before.kind);
  expect(after.fill).toBeCloseTo(before.fill!, 2);
  expect(after.recoverAt).toBe(before.recoverAt);
  expect(after.recoverAt).toBe("2099-01-01T00:02:00.000Z");
  await advance(60_000);
  expect(result.current.summaryFailed).toBe(false);
  expect(displayAccount(result.current.accounts[connection.id], Date.now()).kind).toBe("cd5");
});
it("does not poll hidden pages; returning visible immediately reads both summaries", async () => {
  const f = fixture();
  renderHook(() => useAvailability(connections, quotaData, errors));
  await advance(0);
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
  await advance(60_000);
  expect(f.requests).toHaveLength(2);
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  await act(async () => {
    document.dispatchEvent(new Event("visibilitychange"));
  });
  expect(f.requests).toEqual([
    "/api/resilience/cooldowns",
    "/api/usage/availability",
    "/api/resilience/cooldowns",
    "/api/usage/availability",
  ]);
});
