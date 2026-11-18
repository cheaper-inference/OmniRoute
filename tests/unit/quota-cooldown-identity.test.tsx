import { test, expect, vi, afterEach } from "vitest";
import { act, renderHook, cleanup } from "@testing-library/react";
import { useAvailability } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/useAvailability";
import { displayAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay";
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
test("same absolute deadline preserves cooldown class and progress across newer error observations", async () => {
  const t0 = Date.parse("2099-01-01T00:00:00Z"),
    H = 3600000;
  vi.useFakeTimers();
  vi.setSystemTime(t0);
  vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
  let errorAt = t0;
  let until = t0 + 6 * H;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input) => {
      if (String(input) === "/api/usage/availability")
        return Response.json({
          generatedAt: new Date(Date.now()).toISOString(),
          connections: [
            {
              id: "a",
              account: {
                usable: true,
                blockers: [],
                allowanceReasons: [],
                fetchedAt: new Date(Date.now()).toISOString(),
              },
              scopes: [],
            },
          ],
        });
      if (String(input) === "/api/resilience/cooldowns")
        return Response.json({
          generatedAt: new Date(Date.now()).toISOString(),
          connections: [
            {
              id: "a",
              status: "cooling_down",
              testStatus: "unavailable",
              lastErrorAt: new Date(errorAt).toISOString(),
              rateLimitedUntil: new Date(until).toISOString(),
              lockouts: [],
            },
          ],
        });
      throw Error("unexpected synthetic request");
    })
  );
  const connections = [
    {
      id: "a",
      provider: "claude",
      isActive: true,
      testStatus: "active",
      runtimeObservedAt: new Date(t0 - 1).toISOString(),
    },
  ];
  const data = {},
    errors = {};
  const { result } = renderHook(() => useAvailability(connections, data, errors));
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1);
  });
  vi.setSystemTime(t0 + H);
  await act(async () => {
    await result.current.refreshAvailability();
    await vi.advanceTimersByTimeAsync(1);
  });
  const before = displayAccount(result.current.accounts.a, Date.now());
  errorAt = t0 + H;
  vi.setSystemTime(t0 + H + 2);
  await act(async () => {
    await result.current.refreshAvailability();
    await vi.advanceTimersByTimeAsync(1);
  });
  const after = displayAccount(result.current.accounts.a, Date.now());
  console.log(
    "hook same deadline",
    JSON.stringify({
      before: { kind: before.kind, fill: before.fill },
      after: { kind: after.kind, fill: after.fill },
    })
  );
  expect(before.kind).toBe("cdw");
  expect(after.kind).toBe(before.kind);
  expect(after.fill!).toBeGreaterThanOrEqual(before.fill!);
  expect(before.fill!).toBeCloseTo(100 / 6, 4);
  until = t0 + 3 * H;
  errorAt = Date.now();
  vi.setSystemTime(Date.now() + 2);
  await act(async () => {
    await result.current.refreshAvailability();
    await vi.advanceTimersByTimeAsync(1);
  });
  const restarted = displayAccount(result.current.accounts.a, Date.now());
  expect(restarted.kind).toBe("cd5");
  expect(restarted.fill!).toBeLessThan(0.001);
});
